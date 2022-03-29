export const emailCheck = (email: string) => {
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
  return regex.test(email);
};

// 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상
export const passwordCheck = (password: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/;
  return regex.test(password);
};
