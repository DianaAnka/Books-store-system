export function limitHandler(limit: number) {
  return isNaN(+limit) || limit > 20 ? 20 : Math.ceil(limit);
}

export function pageHandler(page: number) {
  return isNaN(+page) ? 1 : Math.ceil(page);
}
