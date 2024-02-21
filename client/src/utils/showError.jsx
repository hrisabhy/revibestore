export const showError = (errors, name) => {
  const exist = errors.find((err) => err.path === name);
  if (exist) {
    return exist.msg;
  } else {
    return false;
  }
};
