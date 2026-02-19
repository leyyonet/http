const literals = ["query", "body", "header", "path"] as const;

/**
 * Http Place
 * */
export type HttpPlace = (typeof literals)[number];
// noinspection JSUnusedGlobalSymbols
/**
 * @type {ReadonlyArray<HttpPlace>}
 * */
export const HttpPlaceItems: ReadonlyArray<HttpPlace> = literals;
