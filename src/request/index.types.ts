import type {Request} from "express";
import type {ResponseData} from "../response";
import type {Arr} from "@leyyo/common";
import type {HttpCookies, HttpData, HttpHeaders, HttpMethod, HttpParams, HttpQuery} from "../shared";

export interface RequestLocal {}

export type RequestBody = Arr|HttpData|string|unknown;
export type RequestErrorCallback = (error?: Error) => void;

export interface MockServiceRequest<B extends RequestBody = RequestBody> {
    method: HttpMethod;
    url: string;
    body?: B;
    headers?: HttpHeaders;
    cookies?: HttpCookies;
    signedCookies?: HttpCookies;
}
export interface MockRequestLike<B extends RequestBody = RequestBody, L extends RequestLocal = RequestLocal> extends Request<HttpParams, B, ResponseData, HttpQuery, L> {
    readonly isFake?: boolean;
    readonly locals?: L;

    param(name: string, defaultValue?: any): string;
    [another: string]: unknown;
}
export interface PipeOption {
    end?: boolean;
}
