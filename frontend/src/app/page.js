import React from "react";
// import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../components/LogIn"), { ssr: false });

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
