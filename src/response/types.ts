import {ObjectLike, OneOrMore, Primitive, RecLike} from "@leyyo/core";
import http from "http";
import {HttpRequest} from "../request";
import {HttpApplication, HttpAppRenderLambda} from "../application";
import {AbstractEventLike} from "../event";

export interface HttpResponseCookieOption {
    maxAge?: number | undefined;
    signed?: boolean | undefined;
    expires?: Date | undefined;
    httpOnly?: boolean | undefined;
    path?: string | undefined;
    domain?: string | undefined;
    secure?: boolean | undefined;
    encode?: HttpResponseCookieLambda;
    sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
}

export type HttpResponseCookieLambda = (val: string) => string;

export interface HttpResponseFakeResult {
    status: number;
    statusMessage: string;
    headers: RecLike<OneOrMore<string>>;
    cookies: RecLike<HttpResponseCookie>;
    clearedCookies: RecLike<HttpResponseCookieOption>;
    data: unknown;
    locals: RecLike;
}
export type HttpResponseFakeResolver = (dto: HttpResponseFakeResult) => void;
export interface HttpResponseCookie {
    value: Primitive;
    opt: HttpResponseCookieOption;
}
export type HttpResponseErrorLambda = (err: Error) => void;

export interface HttpResponse extends http.ServerResponse, Express.Response, Omit<AbstractEventLike<HttpResponse>, keyof http.ServerResponse> {
    // region custom
    get duration(): number;
    get error(): Error;
    $setRelations(app: HttpApplication, req: HttpRequest): void;
    // endregion custom

    // region properties
    headersSent: boolean;
    locals: RecLike;
    charset: string;
    app: HttpApplication;
    req: HttpRequest;
    // endregion properties

    // region methods
    status(code: number): this;
    sendStatus(code: number): this;
    links(links: any): this;
    send(body?: unknown): this;
    json(body?: unknown): this;
    jsonp(body?: unknown): this;
    sendFile(path: string, fn?: HttpResponseErrorLambda): void;
    sendFile(path: string, options: any, fn?: HttpResponseErrorLambda): void;
    download(path: string, fn?: HttpResponseErrorLambda): void;
    download(path: string, filename: string, fn?: HttpResponseErrorLambda): void;
    download(path: string, filename: string, options: any, fn?: HttpResponseErrorLambda): void;
    contentType(type: string): this;
    type(type: string): this;
    format(obj: any): this;
    attachment(filename?: string): this;
    set(field: any): this;
    set(field: string, value?: OneOrMore<string>): this;
    header(field: any): this;
    header(field: string, value?: OneOrMore<string>): this;
    get(field: string): string|undefined;
    clearCookie(name: string, options?: HttpResponseCookieOption): this;
    cookie(name: string, val: string, options: HttpResponseCookieOption): this;
    cookie(name: string, val: any, options: HttpResponseCookieOption): this;
    cookie(name: string, val: any): this;
    location(url: string): this;
    redirect(url: string): void;
    redirect(status: number, url: string): void;
    render(view: string, options?: RecLike|ObjectLike, callback?: HttpAppRenderLambda): void;
    render(view: string, callback?: HttpAppRenderLambda): void;
    vary(field: string): this;
    append(field: string, value?: Array<string> | string): this;
    // endregion methods
}
