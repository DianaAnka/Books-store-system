// import * as yup from "yup";

// const paginationValidate = yup.object().shape({
//   page: yup.number().min(1),
//   limit: yup.number().min(1).max(20),
// });

export function paginationValidate(params: { limit: number; page: number }) {
  params.limit = isNaN(+params.limit) || params.limit > 20 ? 20 : params.limit;
  params.page = isNaN(+params.page) ? 1 : params.page;
  return params;
}
