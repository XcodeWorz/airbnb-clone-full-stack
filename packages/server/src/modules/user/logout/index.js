export const logout = async (_, __, { session }) => new Promise((res) => {
  session.destroy((err) => {
    if (err) throw new Error(err);

    res(true);
  });
});
