import type {CookieOptions, Response} from "express";
import type {Arr, Dict} from "@leyyo/common";
import type {HttpData, HttpHeaders, HttpStatus} from "../shared";

export interface ResponseLocal {}
export type ResponseCookies = Dict<ResponseCookie>;
export type ResponseData = Arr|HttpData|string|number|boolean|unknown;
export type ResponseErrorCallback = (e?: Error) => void;

export interface MockServicePreparedResponse<R = ResponseData> {
    status: HttpStatus;
    statusMessage: string;
    headers: HttpHeaders;
    cookies: ResponseCookies;
    clearedCookies: Dict<CookieOptions>;
    data: R;
}
export type MockResponseResolve<R> = (dto: MockServicePreparedResponse<R>) => void;
export interface ResponseCookie {
    value: string|number;
    opt: CookieOptions;
}
export interface MockResponseLike<R extends ResponseData, L extends ResponseLocal = ResponseLocal> extends Response<R, L> {
    readonly isFake: boolean;
    [another: string]: unknown;
}
