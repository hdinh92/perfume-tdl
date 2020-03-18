const validate = values => {
  const errors = {};
  const { email, password ,firstName,checkbox} = values;
  if (!email) {
    errors.email = "Vui lòng nhập email đăng nhập";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Email không đúng định dạng";
  } else if (!password) {
    errors.password = " Vui lòng nhập password";
  }else if(!firstName){
    errors.firstName = "Vui lòng điền tên "
  } else if (password.length<6) {
    errors.password = 'Mật khẩu từ 6 ký tự'
  }else if(!checkbox){
    errors.checkbox = 'Bạn đồng ý với điều khoản ? Vui lòng check'
  }
  return errors;
};

export default validate;
