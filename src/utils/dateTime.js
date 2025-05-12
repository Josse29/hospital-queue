const formatDateTime = () => {
  const now = new Date();
  const optionsDDMY = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateNow = now.toLocaleString("en-US", optionsDDMY);
  const hourNow = ("0" + now.getHours()).slice(-2);
  const minuteNow = ("0" + now.getMinutes()).slice(-2);
  const secondNow = ("0" + now.getSeconds()).slice(-2);
  const timeNow = `${hourNow}:${minuteNow}:${secondNow}`;
  return {
    dateNow,
    timeNow,
  };
};
export { formatDateTime };
