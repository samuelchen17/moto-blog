import React from "react";
import IPageProps from "../interfaces/page.interface";
import { Button, Label, TextInput } from "flowbite-react";

const RegisterPage = (props: IPageProps) => {
  return (
    <div className="min-h-screen">
      <div></div>
      <div>
        <form>
          <div>
            <Label value="Your username" />
            <TextInput type="text" placeholder="Username" id="username" />
          </div>
          <div>
            <Label value="Your email" />
            <TextInput type="text" placeholder="Email" id="email" />
          </div>
          <div>
            <Label value="Your password" />
            <TextInput type="text" placeholder="Password" id="password" />
          </div>
          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
