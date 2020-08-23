export const setValues = (value = "", name = "") => {
  return {
    type: "SET_FORMVALUES",
    value: value,
    name: name,
  };
};
