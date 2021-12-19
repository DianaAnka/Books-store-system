import * as yup from "yup";
const userValidate = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(30),
});
export default userValidate;
