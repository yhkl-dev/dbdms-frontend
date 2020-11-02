const getters = {
  token: (state: { user: { token: string } }) => state.user.token
};

export default getters;
