import { Link } from "react-router-dom";

const Thanks = () => {
 
  

   
 
  

  return (
    <div className="bg-[#E2ECFF] min-h-screen flex justify-center items-center">
      <div className="bg-gradient-to-br from-[#bfd7fd] to-[#e9f1ff] md:shadow-md rounded-lg flex flex-col md:flex-row justify-around  items-center  md:w-3/5 md:h-[500px]">
        <div>
          <div>
            <img src="/mainicon.png" className="w-xs" alt="" />
         
          </div>
          <div className="mt-9">
            <p className="text-black text-center text-xl">Thank you so much for your nice <br /> contribution for today.</p>
          </div>
        <div className="flex flex-col items-center w-full gap-3 mt-3">
      <Link to='/login'>
      <button className="btn">
            Go Back to Login.
        </button>
      </Link>
       <Link to='/'>
       <button className="btn">
            Go Back to Home.
        </button>
       </Link>
        </div>
        </div>
      

        </div>
      </div>
      
  
  );
};

export default Thanks;
