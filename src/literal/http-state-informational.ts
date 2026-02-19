// noinspection JSUnusedGlobalSymbols
export enum HttpStateInformational {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLY_HINTS = 103,
}

// as '100'
// noinspection JSUnusedGlobalSymbols
export type HttpStateInformationalStr = `${HttpStateInformational}`;

// as 100
// noinspection JSUnusedGlobalSymbols
export type HttpStateInformationalNum =
  `${HttpStateInformational}` extends `${infer T extends number}` ? T : never;
