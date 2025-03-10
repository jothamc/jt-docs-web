import React from "react";
import sideImage from "../../../public/pexels-iriser-1381679.jpg";
import Image from "next/image";

const Login = () => {
  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="w-1/3 h-[90vh] rounded-xl overflow-hidden">
        <Image className="h-full w-full object-cover" alt="l" src={sideImage} />
      </div>
      <div className="w-2/3">
        <h3>Login to your account</h3>
      </div>
    </div>
  );
};

export default Login;
