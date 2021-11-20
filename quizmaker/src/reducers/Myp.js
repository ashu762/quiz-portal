export const Addreducer = (state = { qty: 0 }, action) => {
  if (action.type === "ADD_ITEM") {
    return {
      ...state,
      qty: state.qty + action.payload.qty,
    };
  } else
    return {
      ...state,
    };
};
