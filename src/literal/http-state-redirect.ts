// noinspection JSUnusedGlobalSymbols
export enum HttpStateRedirect {
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  MOVED_TEMPORARILY = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  SWITCH_PROXY = 306,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
}

// as '300'
// noinspection JSUnusedGlobalSymbols
export type HttpStateRedirectStr = `${HttpStateRedirect}`;

// as 300
// noinspection JSUnusedGlobalSymbols
export type HttpStateRedirectNum = `${HttpStateRedirect}` extends `${infer T extends number}`
  ? T
  : never;
