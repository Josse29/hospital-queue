import { Bell } from "../assets";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const speechBell = async (txt) => {
  try {
    const bell = new Audio(Bell);
    bell.load();
    await delay(5000);
    await bell.play();
    await new Promise((resolve) => {
      bell.onended = resolve;
    });
    const utterance = new SpeechSynthesisUtterance(txt);
    utterance.lang = "id-ID";
    await new Promise((resolve) => {
      utterance.onend = resolve;
      speechSynthesis.speak(utterance);
    });
  } catch (error) {
    console.warn("error voice", error);
    throw error;
  }
};

export default speechBell;
