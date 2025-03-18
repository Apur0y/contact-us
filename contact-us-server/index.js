require("dotenv").config();
const express = require('express');
const bcrypt = require('bcryptjs');

const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@thelaststand.sh6jy.mongodb.net/?retryWrites=true&w=majority&appName=thelaststand`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const usersCollection = client.db("ContactInfo").collection("users");
    const infoCollection = client.db("ContactInfo").collection("userInfo");

    app.post("/submiteddata",async(req,res)=>{

      const data  = req.body;
      const result = await infoCollection.insertOne(data);
      res.send(result)

    });

    app.post('/signup', async (req, res) => {
      const { email, password } = req.body;
      try {
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) throw new Error('User already exists');
        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({ email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully' });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
  res.send("Contact Server")
})

app.listen(port,(req,res)=>{
  console.log(`Here is the port, ${port}`);
})

