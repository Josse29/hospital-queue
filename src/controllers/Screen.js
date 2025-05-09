import Screen from "../models/Screen.js";
import { capitalizeWord } from "../utils/index.js";

const createScreen = async (req, res) => {
  try {
    // receive all request from client
    const { ScreenName, ScreenPoli } = req.body;
    const ScreenNameVal = capitalizeWord(ScreenName);
    if (!ScreenNameVal || !ScreenPoli) {
      return res
        .status(400)
        .json({ errMsg: "Upppps, All Input are Required !" });
    }
    // validated is already name layar
    const screenNameExisted = await Screen.findOne({
      ScreenName: ScreenNameVal,
    });
    if (screenNameExisted) {
      return res
        .status(409)
        .json({ errMsg: `${ScreenNameVal} - is already Existed !` });
    }
    const newScreen = new Screen({
      ScreenName: ScreenNameVal,
      ScreenPoli,
    });
    await newScreen.save();
    return res.status(200).json({ msg: `${ScreenNameVal} - Has Been Added` });
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};
const readScreen = async (req, res) => {
  try {
    const keyword = req.query.search
      ? { name: { $regex: req.query.search, $options: "i" } }
      : {};
    const screen = await Screen.find(keyword).populate("ScreenPoli");
    return res.status(200).json(screen);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};
const readScreenId = async (req, res) => {
  try {
    const { id } = req.params;
    const screen = await Screen.findById(id).populate("ScreenPoli");
    if (!screen) {
      return res.status(404).json({ errMsg: `Screen - Not Found !` });
    }
    return res.status(200).json(screen);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};
const updateScreen = async (req, res) => {
  try {
    const { id } = req.params;
    const { ScreenName, ScreenPoli } = req.body;
    const ScreenNameVal = capitalizeWord(ScreenName);
    if (!ScreenNameVal || !ScreenPoli) {
      return res
        .status(400)
        .json({ errMsg: "Upppps, All Input are Required !" });
    }
    const sreenNameExisted = await Screen.findOne({
      ScreenName: ScreenNameVal,
    });
    if (sreenNameExisted && sreenNameExisted._id.toString() !== id) {
      return res
        .status(409)
        .json({ errMsg: `${ScreenNameVal} is already Existed !` });
    }
    const updated = await Screen.findByIdAndUpdate(
      id,
      {
        $set: {
          ScreenName: ScreenNameVal,
          ScreenPoli,
        },
      },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ errMsg: `Screen - Not Found !` });
    }
    return res.status(200).json({ msg: `${ScreenNameVal} has been Updated ` });
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};
const deleteScreen = async (req, res) => {
  try {
    const { id } = req.params;
    const screen = await Screen.findByIdAndDelete(id);
    if (!screen) {
      return res.status(404).json({ errMsg: `Screen is not found !` });
    }
    return res
      .status(200)
      .json({ msg: `${screen.ScreenName} has been deleted !` });
  } catch (error) {
    return res.status(404).json({ errMsg: error.message });
  }
};
export { createScreen, readScreen, readScreenId, updateScreen, deleteScreen };
