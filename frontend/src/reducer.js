const initialState = {
  formValues: {
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    accept: false,
    password: "",
  },
  valid: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FORMVALUES":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: action.value,
        },
      };
    case "SET_VALID":
      return {
        ...state,
        valid: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
