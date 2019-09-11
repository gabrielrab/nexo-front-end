export const isAutenticated = () => {
  return Boolean(localStorage.getItem("TOKEN"));
};
