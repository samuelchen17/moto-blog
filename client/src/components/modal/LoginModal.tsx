import { Modal } from "flowbite-react";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

interface LoginModalProps {
  emailInputRef: React.RefObject<HTMLInputElement>;
}

const LoginModal: React.FC<LoginModalProps> = ({}) => {
  const [registerOpen, setRegisterOpen] = useState(false);

  // const [loginForm, setLoginForm] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal.Header />
      <Modal.Body>
        {!registerOpen && (
          <Login
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            loading={loading}
            setLoading={setLoading}
            setRegisterOpen={setRegisterOpen}
          />
        )}
        {registerOpen && (
          <Register
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            loading={loading}
            setLoading={setLoading}
            setRegisterOpen={setRegisterOpen}
          />
        )}
      </Modal.Body>
    </>
  );
};

export default LoginModal;
