const INITIAL_STATE = {
  // TODO: Remove dummy data
  isLoggedIn: true,
  profile: {
    firstname: 'Ahmed',
    lastname: 'Magdy',
    email: 'ahmedmagdy@mail.com',
    profilePicture: 'http://picsum.photos/200',
    id: 1,
    token: 'token'
  }
};
export default function userReducer(state = INITIAL_STATE, action) {
  const {type, payload, error} = action;
  switch(type) {
    default:
      return state;
  }
}
