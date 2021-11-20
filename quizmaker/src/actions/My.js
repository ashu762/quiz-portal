export const add = (qty) => (dispatch) => {
  dispatch({
    type: "ADD_ITEM",
    payload: {
      qty: qty * 1.0,
    },
  });
};
