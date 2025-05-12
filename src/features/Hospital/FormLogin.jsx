import React, { useEffect, useRef, useState } from "react";
import { Button, InputPassword, InputText } from "../../components";
import { useNavigate } from "react-router";

const FormLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const userName = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    userName.current.focus();
  }, []);
  return (
    <form>
      <InputText
        title="Username :"
        htmlForId="username"
        className="focus:outline-teal-600 mb-5"
        placeholder="Ex : hospital112"
        ref={userName}
      />
      <InputPassword className="mb-6">
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
      <Button
        title="Login"
        type="button"
        onClick={() => navigate("/queue-ring")}
        className="w-full font-bold bg-teal-600 hover:bg-teal-700 hover:cursor-pointer  hover:ring-teal-700"
      />
    </form>
  );
};

export default FormLogin;
