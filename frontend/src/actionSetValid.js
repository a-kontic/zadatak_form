export const setValid = (value = "false") => {
  return {
    type: "SET_VALID",
    value: value,
  };
};
