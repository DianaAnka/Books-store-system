import * as yup from "yup";

const bookValidate = yup.object().shape({
  author: yup.string().required(),
  title: yup.string().required(),
  abstract: yup.string(),
  content: yup.string(),
  tags: yup.array().of(yup.string()),
});

export default bookValidate;
