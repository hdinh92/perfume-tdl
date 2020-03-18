const validate = values => {
  const isUrlValid = userInput => {
    var res = userInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res == null) return false;
    else return true;
  };
  const errors = {};
  const { name, code, image, price ,} = values;
  if (!name) {
    errors.name = "Vui lòng nhập tên sản phẩm";
  } else if (!code) {
    errors.code = " Vui lòng mã sản phẩm ";
  } else if (!image) {
    errors.image = " Vui lòng nhập URL hình ";
  } else if (!isUrlValid(image)) {
    errors.image = "  Phải bắt đầu từ http:// hoặc url://";
  } else if (!price) {
    errors.price = " Vui lòng nhập giá sản phẩm";
  } else if (isNaN(Number(price))) {
    errors.price = "Giá phải là số";
  }
  return errors;
};

export default validate;
