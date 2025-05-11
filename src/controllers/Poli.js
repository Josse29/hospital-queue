import Poli from "../models/Poli.js";
import { capitalizeWord, formatDateTime } from "../utils/index.js";
const createPoli = async (req, res) => {
  const { PoliName, PoliCode, PoliColor } = req.body;
  try {
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
      PoliName: PoliNameVal,
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
  const { search } = req.query;
  try {
    const keyword = search ? { name: { $regex: search, $options: "i" } } : {};
    const poli = await Poli.find(keyword);
    return res.status(200).json(poli);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};
const updatePoli = async (req, res) => {
  const { id } = req.params;
  const { PoliName, PoliCode, PoliColor } = req.body;
  try {
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
  const { id } = req.params;
  try {
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
const printPoliQueue = async (req, res) => {
  const { id } = req.params;
  try {
    const poli = await Poli.findById(id);
    if (!poli) return res.status(404).json({ errMsg: "Poli is not found" });
    const { FormatDate, Time } = formatDateTime();
    const sameDateQueues = poli.PoliQueue.filter(
      (el) => el.Date === FormatDate
    );
    const nextNo = sameDateQueues.length + 1 || 1;
    const data = {
      No: nextNo,
      Date: FormatDate,
      Time,
      PoliName: poli.PoliName,
      PoliCode: poli.PoliCode,
      CallTimes: 0,
    };
    poli.PoliQueue.push(data);
    poli.PoliQueue.sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return a.Time.localeCompare(b.Time);
    });
    await poli.save();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};
const ringPoliQueue = async (req, res) => {
  const { id } = req.params;
  const { No, Date } = req.body;
  try {
    const poli = await Poli.findById(id);
    if (!poli) return res.status(404).json({ errMsg: "Poli is not found" });
    const poliQueue = poli.PoliQueue;
    const poliQueueI = poliQueue.findIndex((el) => {
      return el.No === No && el.Date === Date;
    });
    if (poliQueueI === -1) {
      return res.status(404).json({ errMsg: "Poli Queue is not found" });
    }
    if (poliQueue[poliQueueI].CallTimes === 3) {
      return res.status(404).json({
        errMsg: `Ring Bell ${poli.PoliName} No - ${No} is already 3 times`,
      });
    }
    poliQueue[poliQueueI].CallTimes += 1;
    poli.markModified("PoliQueue");
    await poli.save();
    return res
      .status(200)
      .json({
        msg: `Poli Queue No - ${poliQueue[poliQueueI].CallTimes} is called`,
      });
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};
export {
  createPoli,
  readPoli,
  updatePoli,
  deletePoli,
  printPoliQueue,
  ringPoliQueue,
};
