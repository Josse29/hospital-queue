import { Bell } from "../assets";
const speechAndBell = async (params) => {
  const { text, setLoading } = params;
  setLoading(true);
  try {
    const bell = new Audio(Bell);
    await bell.play();
    await new Promise((resolve) => {
      bell.onended = resolve;
    });
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    speechSynthesis.speak(utterance);
  } catch (error) {
    console.warn("error voice", error);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    speechSynthesis.speak(utterance);
  } finally {
    setLoading(false);
  }
};
export default speechAndBell;
