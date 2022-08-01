import {ArraySome, HttpMethod, OneOrMore, RecLike} from "@leyyo/core";
import {Request} from "express";
import {ResponseData} from "../response";

export type RequestBody = ArraySome|RecLike|string|unknown;
export type RequestErrorCallback = (error?: Error) => void;

export interface MockServiceRequest {
    method: HttpMethod;
    url: string;
    body?: RequestBody;
    headers?: RecLike<OneOrMore<string>>;
    cookies?: RecLike;
    signedCookies?: RecLike;
}
export interface MockRequestLike<B = RequestBody, L extends RecLike = RecLike> extends Request<RecLike, B, ResponseData, RecLike, L> {
    isFake?: boolean;
    locals?: L;
}
export interface PipeOption {
    end?: boolean;
}
