

export const firstGenerateResponse = import('./bengangfirstpage');
export const secondGenerateResponse = import('./bengangsecondpage');
export const thirdGenerateResponse = import('./bengangthirdpage');
export const fourthGenerateResponse = import('./bengangfourthpage');


const apiArrList: any = {
  firstGenerateResponse : import('./bengangfirstpage'),
  secondGenerateResponse : import('./bengangsecondpage'),
  thirdGenerateResponse : import('./bengangthirdpage'),
  fourthGenerateResponse : import('./bengangfourthpage'),
}
export function generateData(apiRoute: string, params: any = {}) {
  return apiArrList[apiRoute];
}
