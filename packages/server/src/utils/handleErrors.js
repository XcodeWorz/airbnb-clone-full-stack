export const handleErrors = (path, message) => {
  return {
    errors: [
      {
        path,
        message
      }
    ]
  };
};
