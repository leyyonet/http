import {ArraySome, OneOrMore, Primitive, RecLike} from "@leyyo/core";
import {CookieOptions, Response} from "express";

export type ResponseData = ArraySome|RecLike|string|number|boolean|unknown;
export type ResponseErrorCallback = (error?: Error) => void;

export interface MockServicePreparedResponse {
    status: number;
    statusMessage: string;
    headers: RecLike<OneOrMore<string>>;
    cookies: RecLike<ResponseCookie>;
    clearedCookies: RecLike<CookieOptions>;
    data: ResponseData;
    locals: RecLike;
}
export type MockResponseResolve = (dto: MockServicePreparedResponse) => void;
export interface ResponseCookie {
    value: Primitive;
    opt: CookieOptions;
}
export interface MockResponseLike<D = ResponseData, L = RecLike> extends Response<D, L> {
    isFake: boolean;
}
