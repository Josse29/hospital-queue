import { Bell } from "../assets";
const speechBell = async (text) => {
  try {
    const bell = new Audio(Bell);
    await bell.play();
    await new Promise((resolve) => {
      bell.onended = resolve;
    });
    const utterance = new SpeechSynthesisUtterance(text);
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
