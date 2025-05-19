import React, { useContext, useEffect, useRef, useState } from "react";
import { getHospitalAPI, updateHospitalAPI } from "../../services/hospital";
import { Button, InputImg, InputText, TextArea } from "../../components";
import Swal from "sweetalert2";
import { AllContext } from "../../context/AllProvider";

const FormUpdateHospital = () => {
  const { getHospital1 } = useContext(AllContext);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    HospitalId: "",
    HospitalName: "",
    HospitalAddress: "",
    HospitalPhone: "",
    HospitalEmail: "",
    HospitalInfo: "",
    HospitalMarquee: "",
    img: "",
  });
  const [img, setImg] = useState(false);
  const imgRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {
      HospitalId,
      HospitalName,
      HospitalAddress,
      HospitalPhone,
      HospitalEmail,
      img,
      HospitalInfo,
      HospitalMarquee,
    } = formData;
    try {
      const req = {
        HospitalId,
        HospitalName,
        HospitalAddress,
        HospitalPhone,
        HospitalEmail,
        HospitalLogo: img,
        HospitalInfo,
        HospitalMarquee,
      };
      const successMsg = await updateHospitalAPI(req);
      await getHospital();
      await getHospital1();
      Swal.fire({
        title: successMsg.data.msg || successMsg,
        icon: "success",
      });
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
  const getHospital = async () => {
    setLoading(true);
    try {
      const { data } = await getHospitalAPI();
      console.log(data);
      const {
        _id,
        HospitalName,
        HospitalAddress,
        HospitalPhone,
        HospitalEmail,
        HospitalLogo,
        HospitalInfo,
        HospitalMarquee,
      } = data;
      setFormData({
        HospitalId: _id,
        HospitalName,
        HospitalAddress,
        HospitalPhone,
        HospitalEmail,
        img: HospitalLogo,
        HospitalInfo,
        HospitalMarquee,
      });
      if (HospitalLogo) {
        setImg(true);
      } else {
        setImg(false);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getHospital();
  }, []);
  return (
    <form className="w-[500px]" onSubmit={handleSubmit}>
      {/* Hospital Name */}
      <div className="mb-5">
        <InputText
          title="Hospital Name"
          htmlForId="hospitalName"
          className="outline-teal-400 capitalize"
          onChange={handleChange}
          value={formData.HospitalName}
          name="HospitalName"
          placeholder="Ex : Hospital Name"
        />
      </div>
      {/* Hospital Address */}
      <div className="mb-5">
        <InputText
          title="Hospital Address"
          htmlForId="hospitalAddress"
          className="outline-teal-400 capitalize"
          onChange={handleChange}
          value={formData.HospitalAddress}
          name="HospitalAddress"
          placeholder="Ex : Medan"
        />
      </div>
      {/* Hospital Phone */}
      <div className="mb-5">
        <InputText
          title="Hospital Phone"
          htmlForId="hospitalPhone"
          className="outline-teal-400"
          onChange={handleChange}
          value={formData.HospitalPhone}
          name="HospitalPhone"
          placeholder="Ex : 0812xxxx"
        />
      </div>
      {/* Hospital Email */}
      <div className="mb-5">
        <InputText
          title="Hospital Email"
          htmlForId="hospitalEmail"
          className="outline-teal-400"
          onChange={handleChange}
          value={formData.HospitalEmail}
          name="HospitalEmail"
          placeholder="Ex : hospital@gmail.com"
        />
      </div>
      {/* hospital logo */}
      <div className="mb-5">
        <InputImg
          title="Hospital Image"
          className="outline-teal-500"
          img={img}
          setImg={setImg}
          imgRef={imgRef}
          formData={formData}
          setFormData={setFormData}
          setLoading={setLoading}
        />
      </div>
      {/* HospitalInfo */}
      <div className="mb-5">
        <TextArea
          title="Hospital Information"
          htmlForId="hospitalInfo"
          className="outline-teal-400 capitalize"
          onChange={handleChange}
          value={formData.HospitalInfo}
          name="HospitalInfo"
          placeholder="Ex : Furhter Information ....."
        />
      </div>
      {/* Hospital Marquee */}
      <div className="mb-4">
        <TextArea
          title="Hospital Marquee"
          htmlForId="hospitalMarquee"
          className="outline-teal-400 capitalize"
          onChange={handleChange}
          value={formData.HospitalMarquee}
          name="HospitalMarquee"
          placeholder="Ex : Layanan informasi Buka Jam 09.00 - 17.00"
        />
      </div>
      {/* button submit */}
      <Button
        title="Save"
        type="submit"
        className={`w-full bg-teal-600 hover:bg-teal-700 hover:ring-teal-700 ${
          loading
            ? "opacity-35 cursor-not-allowed"
            : "opacity-100 cursor-pointer"
        }`}
        disabled={loading ? true : false}
      />
    </form>
  );
};

export default FormUpdateHospital;
