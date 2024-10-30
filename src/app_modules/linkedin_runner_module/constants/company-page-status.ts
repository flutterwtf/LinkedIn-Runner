export const COMPANY_PAGE_STATUS = {
  notExist: 'Not Exist',
  unclaimed: 'Unclaimed',
  valid: 'Valid',
};
export type TCompanyPageStatus = (typeof COMPANY_PAGE_STATUS)[keyof typeof COMPANY_PAGE_STATUS];
