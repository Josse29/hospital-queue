import React, { useEffect, useRef, useState } from "react";
import { Button, InputPassword, InputText } from "../../components";
import { useNavigate } from "react-router";
import { loginAPI } from "../../services/hospital";
import Swal from "sweetalert2";

const FormLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const userName = useRef();
  const [formData, setFormData] = useState({
    HospitalId: "",
    HospitalPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    userName.current.focus();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginAPI(formData);
      const result = await Swal.fire({
        title: data.msg || success,
        icon: "success",
        confirmButtonText: "Login",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      if (result.isConfirmed) {
        localStorage.setItem("verifyToken", JSON.stringify(data.token));
        setFormData({
          UserNameVal: "",
          UserPasswordVal: "",
        });
        navigate("/queue-ring");
      }
    } catch (err) {
      Swal.fire({
        title: err.response.data.errMsg || err,
        icon: "error",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputText
        title="Username :"
        htmlForId="username"
        className="focus:outline-teal-600 mb-5"
        placeholder="Ex : hospital112"
        ref={userName}
        onChange={handleChange}
        name="HospitalId"
        value={formData.HospitalId}
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
          onChange={handleChange}
          name="HospitalPassword"
          value={formData.HospitalPassword}
        />
      </InputPassword>
      <Button
        title={loading ? "wait...." : "Login"}
        type="submit"
        className={`w-full font-bold bg-teal-600 hover:bg-teal-700 hover:ring-teal-700 ${
          loading
            ? "opacity-30 cursor-not-allowed"
            : "opacity-100 cursor-pointer"
        }`}
        disabled={loading ? true : false}
      />
    </form>
  );
};

export default FormLogin;
