import * as yup from "yup";

const uploadImageValidate = yup.object().shape({
  file: yup
    .mixed()
    .required()
});

export default uploadImageValidate;
