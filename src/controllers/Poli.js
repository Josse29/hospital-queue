import Poli from "../models/Poli.js";
import { capitalizeWord } from "../utils/index.js";
const createPoli = async (req, res) => {
  try {
    // receive request
    const { PoliName, PoliCode, PoliColor } = req.body;
    const PoliNameVal = capitalizeWord(PoliName);
    const PoliCodeVal = PoliCode.toUpperCase().trim();
    // receive request shouldn't empty
    if (!PoliNameVal || !PoliCodeVal) {
      return res
        .status(400)
        .json({ errMsg: "Upppps, All Input are Required !" });
    }
    //valid exsited name Poli
    const namePoliExsited = await Poli.findOne({
      PoliName: PoliNameVal,
    });
    if (namePoliExsited) {
      return res.status(409).json({
        errMsg: `Upppss, Poli Name : ${PoliNameVal} - is already Existed !`,
      });
    }
    // valid exsited code Poli
    const codePoliExsited = await Poli.findOne({ PoliCode: PoliCodeVal });
    if (codePoliExsited) {
      return res.status(409).json({
        errMsg: `Uppssss, Poli Code : ${PoliCodeVal} is already Existed !`,
      });
    }
    // create new user
    const newPoli = new Poli({
      PoliName: capitalizeWord(PoliName),
      PoliCode: PoliCodeVal,
      PoliColor,
    });
    //save poli
    await newPoli.save();
    // respond to client
    return res.status(200).json({
      msg: `${PoliNameVal} has been added`,
    });
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};
const readPoli = async (req, res) => {
  try {
    const keyword = req.query.search
      ? { name: { $regex: req.query.search, $options: "i" } }
      : {};
    const poli = await Poli.find(keyword);
    return res.status(200).json(poli);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};
const updatePoli = async (req, res) => {
  try {
    const { id } = req.params;
    const { PoliName, PoliCode, PoliColor } = req.body;
    const PoliNameVal = capitalizeWord(PoliName);
    const PoliCodeVal = PoliCode.toUpperCase().trim();
    // receive request shouldn't empty
    if (!PoliNameVal || !PoliCodeVal) {
      return res
        .status(400)
        .json({ errMsg: "Upppps, All Input are Required !" });
    }
    // valid exsited name
    const namePoliExsited = await Poli.findOne({
      PoliName: PoliNameVal,
    });
    if (namePoliExsited && namePoliExsited._id.toString() !== id) {
      return res.status(409).json({
        errMsg: `Upppps, Poli Name : ${PoliNameVal} is already Existed !`,
      });
    }
    // valid codePoli is already
    const codePoliExsited = await Poli.findOne({
      PoliCode: PoliCodeVal,
    });
    if (codePoliExsited && codePoliExsited._id.toString() !== id) {
      return res.status(409).json({
        errMsg: `Upppps, Poli Code : ${PoliCodeVal} is Already Existed !`,
      });
    }
    // Update poli by id
    const updated = await Poli.findByIdAndUpdate(
      id,
      {
        PoliName: PoliNameVal,
        PoliCode: PoliCodeVal,
        PoliColor,
      },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ errMsg: "Poli Not Found!" });
    }
    return res.status(200).json({
      msg: `${PoliNameVal} - has been Updated`,
    });
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};
const deletePoli = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Poli.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ errMsg: `Poli is not found !` });
    }
    return res
      .status(200)
      .json({ message: `${result.PoliName} - has been Deleted ` });
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};
const updatePoliQueue = async (req, res) => {
  const poli = await Poli.findById(poliId);
  if (!poli) return res.status(404).json({ message: "Poli not found" });

  // Menentukan nomor antrian selanjutnya
  const nextNo =
    poli.nomor.length > 0 ? poli.nomor[poli.nomor.length - 1].no + 1 : 1;

  // Menambahkan data antrian ke array nomor
  poli.nomor.push({
    no: nextNo,
    status: "",
    date: new Date(),
  });

  // Sorting berdasarkan 'date' setelah penambahan
  poli.nomor.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Menyimpan perubahan
  await poli.save();
};
export { createPoli, readPoli, updatePoli, deletePoli };
