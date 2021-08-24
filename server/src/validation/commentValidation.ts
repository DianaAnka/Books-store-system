import * as yup from "yup";

const commentValidate = yup.object().shape({
  content: yup.string().required().max(30),
});

export default commentValidate;
