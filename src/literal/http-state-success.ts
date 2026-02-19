// noinspection JSUnusedGlobalSymbols
export enum HttpStateSuccess {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  ALREADY_REPORTED = 208,
  THIS_IS_FINE = 218,
  IM_USED = 226,
}

// as '200'
// noinspection JSUnusedGlobalSymbols
export type HttpStateSuccessStr = `${HttpStateSuccess}`;

// as 200
// noinspection JSUnusedGlobalSymbols
export type HttpStateSuccessNum = `${HttpStateSuccess}` extends `${infer T extends number}`
  ? T
  : never;
