import { HttpPlaceItems } from "./http-place.js";

const literals = [...HttpPlaceItems, "cookie", "file"] as const;

/**
 * Http Place Extended with cookie and file
 * */
export type HttpPlaceExtended = (typeof literals)[number];
// noinspection JSUnusedGlobalSymbols
/**
 * @type {ReadonlyArray<HttpPlaceExtended>}
 * */
export const HttpPlaceExtendedItems: ReadonlyArray<HttpPlaceExtended> = literals;
