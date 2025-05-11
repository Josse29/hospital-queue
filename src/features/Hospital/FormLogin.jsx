import React, { useState } from "react";
import { Button, InputPassword, InputText } from "../../components";

const FormLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <form>
      <InputText
        title="Username :"
        htmlForId="username"
        className="focus:outline-teal-600 mb-4"
        placeholder="Ex : Hospital112"
      />
      <InputPassword className="mb-4">
        <InputPassword.Label
          htmlFor="password"
          title="Password :"
          passwordVisible={passwordVisible}
          setPasswordVisible={setPasswordVisible}
        />
        <InputPassword.Input
          id="password"
          passwordVisible={passwordVisible}
          className="focus:outline-teal-600"
        />
      </InputPassword>
      <Button title="Login" className="bg-teal-600" />
    </form>
  );
};

export default FormLogin;
