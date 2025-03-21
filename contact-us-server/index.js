require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const PDFDocument = require('pdfkit');
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@thelaststand.sh6jy.mongodb.net/?retryWrites=true&w=majority&appName=thelaststand`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const usersCollection = client.db("ContactInfo").collection("users");
    const infoCollection = client.db("ContactInfo").collection("userInfo");

    app.post("/submiteddata", async (req, res) => {
      const data = req.body;
      const result = await infoCollection.insertOne(data);
      res.send(result);
    });

    app.get("/submiteddata", async (req, res) => {
    
      const result = await infoCollection.find().toArray();
      res.send(result);
    });

    app.delete("/submiteddata/:id", async (req, res) => {
    const id = req.params.id;
    console.log("id here");
      const result = await infoCollection.deleteOne({_id: new ObjectId(id)});
      res.send(result);
    });

    app.post("/signup", async (req, res) => {
      const data = req.body;
      const { email, password } = data;
      try {
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) throw new Error("User already exists");
        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne(data);
        res.status(201).json({ message: "User created successfully" });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

    app.post("/login", async (req, res) => {
      const datas = req.body;
      const { email, password } = datas;
      try {
        const existingUsers = await usersCollection.findOne({ email });
        if (!existingUsers) throw new Error("User Not Find!");
   
        if (password != existingUsers.password) {
          throw new Error("Password Incorrect")
        } else {
          console.log("Login id", existingUsers._id.toString());
          const token = jwt.sign(
            { userId: existingUsers._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.json({ token, existingUsers });
  
        }
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

    app.get('/download-pdf', async (req, res) => {
      const submissionsCollection = infoCollection;
      const submissions = await submissionsCollection.find().toArray();
    
      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=submissions.pdf');
    
      submissions.forEach((submission, index) => {
        if (index > 0) {
          doc.addPage();
        }
        doc.fontSize(16).text('Submission Details', { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(`Name: ${submission.fullName || 'N/A'}`);
        doc.text(`Email: ${submission.email || 'N/A'}`);
        doc.text(`Message: ${submission.message || 'N/A'}`);
      });
    
      doc.pipe(res);
      doc.end();
    });

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Contact Server");
});

app.listen(port, (req, res) => {
  console.log(`Here is the port, ${port}`);
});
