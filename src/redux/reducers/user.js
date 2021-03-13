const INITIAL_STATE = {
  isLoggedIn: false
};
export default function userReducer(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  switch(type) {
    default:
      return state;
  }
}
