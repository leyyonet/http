import {HttpMethodLike, OneOrMore, RecLike} from "@leyyo/core";
import {HttpResponse} from "../response";
import http from "http";
import {Options as RangeParserOptions, Ranges as RangeParserRanges, Result as RangeParserResult} from "range-parser";
import {HttpApplication, HttpNext} from "../application";
import {AbstractEventLike} from "../event";
import {EventEmitter} from "events";

export interface HttpBaseLike extends RecLike {
    startedAt?: Date;
    finishedAt?: Date;
    offsetDate?: Date;
}
export type HttpContextLike = RecLike;
export interface HttpRequestLocalsInner<C extends HttpContextLike = HttpContextLike> extends RecLike {
    context: C;
    base: HttpBaseLike;
    isolated: RecLike;
    cache: RecLike;
    endpoint?: unknown;
}

export interface HttpRequestLocals<C extends HttpContextLike = HttpContextLike> extends RecLike {
    ly: HttpRequestLocalsInner<C>;
}
export interface HttpRequestFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}
export interface HttpRequestMedia {
    value: string;
    quality: number;
    type: string;
    subtype: string;
}
export interface HttpRequestService {
    method: HttpMethodLike;
    url: string;
    body?: unknown;
    headers?: RecLike<OneOrMore<string>>;
    cookies?: RecLike;
    signedCookies?: RecLike;
}
export interface HttpRequest<C extends HttpContextLike = HttpContextLike, L extends HttpRequestLocals<C> = HttpRequestLocals<C>> extends http.IncomingMessage, Express.Request, Omit<AbstractEventLike<HttpRequest>, keyof EventEmitter> {
    // region custom
    $setRelations(app: HttpApplication, res: HttpResponse, next?: HttpNext): void;
    locals: L;
    // endregion custom

    // region properties
    accepted: Array<HttpRequestMedia>;
    protocol: string;
    secure: boolean;
    ip: string;
    ips: Array<string>;
    subdomains: Array<string>;
    path: string;
    hostname: string;
    host: string;
    fresh: boolean;
    stale: boolean;
    xhr: boolean;
    body: unknown;
    cookies: any; // todo
    method: string;
    params: RecLike;
    query: RecLike;
    files: RecLike<HttpRequestFile>;
    route: any; // todo
    signedCookies: any; // todo
    originalUrl: string;
    url: string;
    baseUrl: string;
    app: HttpApplication;
    res: HttpResponse;
    next: HttpNext;
    // endregion properties

    // region methods
    get(name?: string): OneOrMore<string>;
    header(name?: string): OneOrMore<string>;
    accepts(...type: Array<string>): OneOrMore<string> | false;
    acceptsCharsets(...charset: Array<string>): OneOrMore<string> | false;
    acceptsEncodings(...encoding: Array<string>): OneOrMore<string> | false;
    acceptsLanguages(...lang: Array<string>): OneOrMore<string> | false;
    range(size: number, options?: RangeParserOptions): RangeParserRanges | RangeParserResult;
    param(name: string, defaultValue?: any): string;
    is(type: OneOrMore<string>): string | false;
    // endregion methods

}

