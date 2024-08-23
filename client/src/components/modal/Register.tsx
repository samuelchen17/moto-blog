import React from "react";
import { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

interface RegisterProps {
  errorMsg: string;
  setErrorMsg: (msg: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setRegisterOpen: (isOpen: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({
  errorMsg,
  setErrorMsg,
  loading,
  setLoading,
  setRegisterOpen,
}) => {
  const defaultForm = {
    username: "",
    email: "",
    password: "",
  };

  const [registerForm, setRegisterForm] = useState<RegisterForm>(defaultForm);

  const handleChange = (e: any) => {
    // .trim() to remove the spaces
    setRegisterForm({ ...registerForm, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      !registerForm.username ||
      !registerForm.email ||
      !registerForm.password
    ) {
      return setErrorMsg("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
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
          Create an account
        </h3>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your username" />
          </div>
          <TextInput
            type="text"
            id="username"
            // required
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            type="email"
            id="email"
            placeholder="name@company.com"
            // required
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            // required
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" />
                <span>Loading...</span>
              </>
            ) : (
              "Register"
            )}
          </Button>
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
          Have an account?&nbsp;
          <button
            onClick={() => setRegisterOpen(false)}
            className="text-cyan-700 hover:underline dark:text-cyan-500"
          >
            Log in
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

export default Register;
