import React from "react";
import LoginForm from "./_components/LoginForm";

export const metadata = {
  title: "Login",
  description: "Enter your email and password to access admin panel",
};

export default function Login() {
  return <LoginForm />;
}
