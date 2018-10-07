export const formatYupErrors = err => {
  console.log("err", err);
  const errors = [];
  if (err && err.inner) {
    err.inner.forEach(e => {
      errors.push({
        path: e.path,
        message: e.message
      });
    });
  }

  return errors;
};
