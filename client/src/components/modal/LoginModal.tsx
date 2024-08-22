import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

interface LoginModalProps {
  emailInputRef: React.RefObject<HTMLInputElement>;
}

const LoginModal: React.FC<LoginModalProps> = ({ emailInputRef }) => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState({});
  const [loginForm, setLoginForm] = useState({});
  const handleChange = (e: any) => {
    setRegisterForm({ ...registerForm, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });
    } catch (error) {}
  };

  console.log(registerForm);
  return (
    <>
      <Modal.Header />
      <Modal.Body>
        {!registerOpen && (
          <form>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
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
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput id="password" type="password" required />
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
                <Button type="submit">Log in to your account</Button>
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
            </div>
          </form>
        )}
        {registerOpen && (
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
                  required
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
                  required
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
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <Button type="submit">Create account</Button>
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
            </div>
          </form>
        )}
      </Modal.Body>
    </>
  );
};

export default LoginModal;
