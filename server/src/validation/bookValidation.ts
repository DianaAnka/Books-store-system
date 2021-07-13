import * as yup from "yup";

const bookValidate = yup.object().shape({
  author: yup.string().required(),
  title: yup.string().required(),
  userId: yup.string().required(),
});

export default bookValidate;
