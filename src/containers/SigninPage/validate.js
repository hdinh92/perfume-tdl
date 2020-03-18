const validate = values => {
  const errors = {};
  const { email, password } = values;
  if (!email) {
    errors.email = "Vui lòng nhập email đăng nhập";
  }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Email không đúng định dạng'
  } 
  else if (!password) {
    errors.password = " Vui lòng nhập password";
  }
  return errors;
};

export default validate;
