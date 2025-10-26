import React from "react";
// import Footer from "./components/Footer";

const Home: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen">

        
        <main className="text-center p-6 w-full">
          <h1 className="text-3xl font-bold">Welcome to the Home Page!</h1>
          <p>This is the protected content visible only after login.</p>
         
        </main>
   
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
