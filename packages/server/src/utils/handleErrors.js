export const handleErrors = (path, message) => ({
  errors: [
    {
      path,
      message,
    },
  ],
});
