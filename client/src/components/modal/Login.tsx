import React from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  Label,
  Spinner,
  TextInput,
  Checkbox,
} from "flowbite-react";

interface LoginForm {
  loginInput: string;
  password: string;
}

interface LoginProps {
  errorMsg: string;
  setErrorMsg: (msg: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setRegisterOpen: (isOpen: boolean) => void;
}

const Login: React.FC<LoginProps> = ({
  errorMsg,
  setErrorMsg,
  loading,
  setLoading,
  setRegisterOpen,
}) => {
  const defaultForm = {
    loginInput: "",
    password: "",
  };

  const [loginForm, setLoginForm] = useState<LoginForm>(defaultForm);

  const handleChange = (e: any) => {
    // .trim() to remove the spaces
    setLoginForm({ ...loginForm, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!loginForm.loginInput || !loginForm.password) {
      return setErrorMsg("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(setLoginForm),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        return setErrorMsg(data.message);
      }
      if (res.ok) {
        setRegisterOpen(false);
      }
    } catch (error) {
      setErrorMsg((error as Error).message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Login
        </h3>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="loginInput" value="Username or Email" />
          </div>
          <TextInput
            type="text"
            id="loginInput"
            // required
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            // required
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <a
            href="#"
            className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
          >
            Lost Password?
          </a>
        </div>
        <div className="w-full">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="ml-2">Loading...</span>
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?&nbsp;
          <button
            onClick={() => setRegisterOpen(true)}
            className="text-cyan-700 hover:underline dark:text-cyan-500"
          >
            Register
          </button>
        </div>
        {errorMsg && (
          <Alert className="" color="failure">
            {errorMsg}
          </Alert>
        )}
      </div>
    </form>
  );
};

export default Login;

{
  /* <form>
    <div>
      <div className="mb-2 block">
        <Label htmlFor="email" value="Your email" />
      </div>
      <TextInput
        type="email"
        id="email"
        ref={emailInputRef}
        placeholder="name@company.com"
        required
      />
    </div>
 
    <div className="w-full">
      <Button type="submit">Log in to your account</Button>
    </div>
    <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
      Not registered?&nbsp;
      
    </div>
  </div>
</form>; */
}
// fix login page
