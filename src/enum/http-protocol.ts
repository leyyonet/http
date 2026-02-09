const literals = [
    'http',
    'https',
] as const;
/**
 * Http Protocol
 * */
export type HttpProtocol = typeof literals[number];
// noinspection JSUnusedGlobalSymbols
/**
 * @type {ReadonlyArray<HttpProtocol>}
 * */
export const HttpProtocolItems: ReadonlyArray<HttpProtocol> = literals;

