const capitalizeWord = (val) => {
  if (!val) {
    return "";
  } else {
    const capitalize = val
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return capitalize.trim();
  }
};

export { capitalizeWord };
