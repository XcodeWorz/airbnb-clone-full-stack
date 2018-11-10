import { removeUserSession } from '../../../utils/removeUserSession';

export const logout = async (_, __, { session, redis, res }) => {
  const { userId } = session;
  if (userId) {
    removeUserSession(userId, redis);
    session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });
    res.clearCookie('qid');
    return true;
  }

  return false;
};
