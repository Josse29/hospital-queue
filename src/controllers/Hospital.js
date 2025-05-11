import Hospital from "../models/Hospital.js";
import {
  capitalizeWord,
  validateEmail,
  validateLoadImg1,
} from "../utils/index.js";

const getHospital = async (req, res) => {
  const { search } = req.query;
  try {
    const keyword = search ? { name: { $regex: search, $options: "i" } } : {};
    const hospital = await Hospital.find(keyword);
    return res.status(200).json(hospital);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};
const updateHospital = async (req, res) => {
  const { id } = req.params;
  const {
    HospitalName,
    HospitalAddress,
    HospitalPhone,
    HospitalEmail,
    HospitalLogo,
    HospitalInfo,
    HospitalMarquee,
  } = req.body;
  try {
    if (!HospitalName || !HospitalMarquee || !HospitalEmail) {
      return res.status(400).json({
        errMsg:
          "Hospital Name, Hospital Email, Hospital Marquee are Required !",
      });
    }
    const HospitalNameVal = capitalizeWord(HospitalName);
    const HospitalEmailVal = HospitalEmail.trim();
    const isEmail = validateEmail(HospitalEmailVal);
    if (!isEmail) {
      return res.status(400).json({ errMsg: "Invalid Email!" });
    }
    const isImg = await validateLoadImg1(HospitalLogo);
    if (
      isImg === "Invalid Image File" ||
      isImg === "Invalid Image Size (Maximize 1 MB)"
    ) {
      return res.status(400).json({ errMsg: isImg });
    }
    const updated = await Hospital.findByIdAndUpdate(
      id,
      {
        HospitalName: HospitalNameVal,
        HospitalAddress,
        HospitalPhone,
        HospitalEmail: HospitalEmailVal,
        HospitalLogo,
        HospitalInfo,
        HospitalMarquee,
      },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ errMsg: "Hospital is not Found!" });
    }
    return res
      .status(200)
      .json({ msg: `${HospitalNameVal} - has been Updated !` });
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};
export { getHospital, updateHospital };
