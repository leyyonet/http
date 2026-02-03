import type {Application, CookieOptions, Errback, Request, Response} from "express";
import type {Socket} from "net";
import * as mime from "mime-types";
import type {
    MockResponseLike,
    MockResponseResolve,
    ResponseCookies,
    ResponseData,
    ResponseErrorCallback,
    ResponseLocal
} from "./index-types";
import {$log} from "@leyyo/common";
import type {Dict, KeyValue, Logger, OneOrMore} from "@leyyo/common";
import {HttpEvent, type HttpHeaders, type HttpStatus} from "../shared";
import type {OutgoingHttpHeader, OutgoingHttpHeaders} from "node:http";

let _firstOrigin: Response;

export class MockResponse<R extends ResponseData, L extends ResponseLocal = ResponseLocal> extends HttpEvent<Response> implements MockResponseLike<R, L> {
    // region property
    private _headersSent: boolean; // after send it is true
    private readonly _resolver: MockResponseResolve<R>;
    private _headers: HttpHeaders;
    private _cookies: ResponseCookies;
    private _clearedCookies: Dict<CookieOptions>;
    private _data: R;
    private _status: number;
    readonly locals: L;
    readonly isFake: boolean;
    [another: string]: unknown;
    // endregion property

    // region static
    // noinspection JSUnusedGlobalSymbols
    static setFirstOrigin(origin: Response): void {
        if (!_firstOrigin && origin) {
            _firstOrigin = origin;
        }
    }
    static get firstOrigin(): Response {
        return _firstOrigin;
    }
    // endregion static

    // region constructor
    constructor(resolver: MockResponseResolve<R>, origin?: Response) {
        super(origin);
        if (typeof resolver != "function") {
            resolver = (() => {
            }) as MockResponseResolve<R>;
        }
        this._resolver = resolver;
        this.isFake = true;
        this._headersSent = false;

        this.locals = (origin?.locals ?? {}) as L;
        this._clear();
    }
    // endregion constructor

    // region private
    private _send(data?: R): this {
        if ( !this._headersSent) {
            this._headersSent = true;
            if (data !== undefined) {
                this._data = data;
            }
            this._resolver({
                status: this._status,
                statusMessage: this.statusMessage,
                headers: this._headers,
                cookies: this._cookies,
                clearedCookies: this._clearedCookies,
                data: this._data,
            });
        }
        return this;
    }

    private _setHeader(key: string, value: OneOrMore<string>): this {
        this._headers[key] = value;
        return this;
    }

    private _setCookie(key: string, value: string, opt?: CookieOptions): this {
        this._cookies[key] = {value, opt};
        return this;
    }

    private _cancelCookieClear(key: string): boolean {
        if (this._clearedCookies[key] !== undefined) {
            delete this._clearedCookies[key];
            return true
        }
        return false;
    }

    private _clear() {
        this.statusMessage = undefined;
        this._headers = {}
        this._cookies = {};
        this._clearedCookies = {};
        this._data = undefined;
        this._status = 200;
    }
    // endregion private

    // region stream
    destroyed: boolean;
    closed: boolean;
    errored: Error;
    readonly writable: boolean;
    readonly writableAborted: boolean;
    readonly writableCorked: number;
    readonly writableEnded: boolean;
    readonly writableFinished: boolean;
    readonly writableHighWaterMark: number;
    readonly writableLength: number;
    readonly writableObjectMode: boolean;
    writableNeedDrain: boolean;
    _construct(_c?: ResponseErrorCallback): void {
        logger.warn('Should not be called', {fn: '_construct'});
    }

    _destroy(_e: Error | null, _c: ResponseErrorCallback): void {
        logger.warn('Should not be called', {fn: '_destroy'});
    }

    _final(_c: ResponseErrorCallback): void {
        logger.warn('Should not be called', {fn: '_final'});
    }

    _write(_c: unknown, _e: BufferEncoding, _r: ResponseErrorCallback): void {
        logger.warn('Should not be called', {fn: '_write'});
    }

    _writev(_c: Array<{ chunk: unknown; encoding: BufferEncoding }>, _b: ResponseErrorCallback): void {
        logger.warn('Should not be called', {fn: '_writev'});
    }
    cork(): void {
        logger.warn('Should not be called', {fn: 'cork'});
    }

    destroy(_e: Error | undefined): this {
        logger.warn('Should not be called', {fn: 'destroy'});
        return this;
    }
    pipe<T extends NodeJS.WritableStream>(_d: T, _o: { end?: boolean | undefined } | undefined): T {
        logger.warn('Should not be called', {fn: 'pipe'});
        return undefined;
    }
    setDefaultEncoding(_e: BufferEncoding): this {
        logger.warn('Should not be called', {fn: 'setDefaultEncoding'});
        return this;
    }
    uncork(): void {
        logger.warn('Should not be called', {fn: 'uncork'});
    }

    end(): this {
        this._clear();
        this._send();
        return this;
    }

    write(_b: Uint8Array | string, _c?: ResponseErrorCallback | BufferEncoding, _d?: ResponseErrorCallback): boolean {
        logger.warn('Should not be called', {fn: 'write'});
        return false;
    }

    compose<T>(_s: ComposeFnParam | Iterable<T> | AsyncIterable<T> | T, _o: {
        signal: AbortSignal
    } | undefined): T {
        logger.warn('Should not be called', {fn: 'compose'});
        return undefined;
    }
    // endregion stream

    // region http
    sendDate: boolean;
    statusMessage: string;
    chunkedEncoding: boolean;
    shouldKeepAlive: boolean;
    finished: boolean;
    get connection(): Socket {return this.socket;}
    useChunkedEncodingByDefault: boolean;
    readonly socket: Socket | null;
    statusCode: number;
    writeHead: ((statusCode: number, statusMessage?: string, headers?: (OutgoingHttpHeaders | OutgoingHttpHeader[])) => this) & ((statusCode: number, headers?: (OutgoingHttpHeaders | OutgoingHttpHeader[])) => this);
    strictContentLength: boolean;
    addTrailers(_h: OutgoingHttpHeaders | Array<[string, string]>): void {
        logger.warn('Should not be called', {fn: 'addTrailers'});
    }
    assignSocket(_s: Socket): void {
        logger.warn('Should not be called', {fn: 'assignSocket'});
    }
    detachSocket(_s: Socket): void {
        logger.warn('Should not be called', {fn: 'detachSocket'});
    }
    flushHeaders(): void {
        this._headers = {};
    }

    getHeader(name: string): number | string | string[] | undefined {
        return this.get(name);
    }

    getHeaderNames(): string[] {
        return Object.keys(this._headers);
    }

    getHeaders(): OutgoingHttpHeaders {
        return this._headers;
    }

    hasHeader(name: string): boolean {
        return this._headers[name] !== undefined;
    }
    removeHeader(name: string): void {
        if (this._headers[name] !== undefined) {
            delete this._headers[name];
        }
    }
    setHeader(name: string, value: number | string | ReadonlyArray<string>): this {
        this._headers[name] = value as string;
        return this;
    }
    setTimeout(_m: number, _c: (() => void) | undefined): this {
        logger.warn('Should not be called', {fn: 'setTimeout'});
        return this;
    }
    writeContinue(_c: (() => void) | undefined): void {
        logger.warn('Should not be called', {fn: 'writeContinue'});
    }


    writeProcessing(): void {
        logger.warn('Should not be called', {fn: 'writeProcessing'});
    }


    appendHeader(name: string, value: string | readonly string[]): this {
        if (this._headers[name] === undefined) {
            this._headers[name] = [];
        }
        else if ( !Array.isArray(this._headers[name])) {
            this._headers[name] = [this._headers[name] as string];
        }
        if (Array.isArray(value)) {
            (this._headers[name] as Array<string>).push(...value);
        }
        else {
            (this._headers[name] as Array<string>).push(value as string);
        }
        return this;
    }


    setHeaders(headers: Headers | Map<string, number | string | readonly string[]>): this {
        this._headers = {};
        if (headers instanceof Map) {
            for (const [k, v] of headers.entries()) {
                this._headers[k as string] = v as string;
            }
        }
        else {
            for (const [k, v] of Object.entries(headers)) {
                this._headers[k as string] = v as string;
            }
        }
        return this;
    }

    writeEarlyHints(_h: Record<string, string | string[]>, _c: (() => void) | undefined): void {
        logger.warn('Should not be called', {fn: 'writeEarlyHints'});
    }
    // endregion http

    // region express
    readonly app: Application;
    charset: string;
    readonly req: Request;
    get headersSent(): boolean {
        return this._headersSent;
    }

    json(data: R): this {
        this._setHeader('Content-Type', 'application/json');
        this._send(data);
        return this;
    }

    jsonp(data: R): this {
        this._setHeader('Content-Type', 'application/json');
        this._send(data);
        return this;
    }
    send(body?: unknown): this {
        this._send(body as R);
        return this;
    }
    attachment(filename?: string): this {
        filename = filename ? `; filename="${filename}"` : '';
        return this._setHeader('Content-Disposition', `attachment${filename}`);
    }

    clearCookie(name: string, options?: CookieOptions): this {
        this._clearedCookies[name] = options;
        return this;
    }
    append(key: string, value?: OneOrMore<string>): this {
        return this._setHeader(key, value);
    }
    contentType(type: string): this {
        return this.type(type);
    }

    cookie(key: string, value: unknown, option?: CookieOptions): this {
        if (typeof key === 'string') {
            this._cancelCookieClear(key);
            return this._setCookie(key, value as string, option);
        }
        if (key) {
            for (const [k, v] of Object.entries(key)) {
                this._cancelCookieClear(k);
                this._setCookie(k, v as string, value ?? option);
            }
        }
        return this;
    }

    download(path: string, _fn?: Errback | string, _err?: unknown, _errBack?: Errback): void {
        logger.warn('unsupported.feature', {fn: 'download', path});
    }

    format(obj: unknown): this {
        logger.warn('unsupported.feature', {fn: 'format', obj});
        return this;
    }

    get(field: string): string {
        return (typeof field === 'string') ? this._headers[field] as string : undefined;
    }

    header(field: unknown, value?: OneOrMore<string>): this {
        return this._setHeader(field as string, value);
    }

    links(map: unknown): this {
        if (map) {
            const values = [];
            for (const [k, v] of Object.entries(map)) {
                values.push(`<${v}>; rel="${k}"`);
            }
            if (values.length > 0) {
                this._setHeader('Link', values);
            }
        }
        return this;
    }

    location(url: string): this {
        logger.warn('unsupported.feature', {fn: 'location', url});
        return this;
    }

    redirect(url: KeyValue, status?: KeyValue): void {
        logger.warn('unsupported.feature', {fn: 'redirect', url, status});
    }

    render(_v: string, _o?: Dict | ((err: Error, html: string) => void), _c?: (err: Error, html: string) => void): void {
        logger.warn('unsupported.feature', {fn: 'render'});
    }

    sendFile(path: string, _fn?: unknown, _err?: Errback): void {
        logger.warn('unsupported.feature', {fn: 'sendFile', path});
    }

    sendStatus(status: number): this {
        this._status = status;
        this._send();
        return this;
    }

    set(field: unknown, value?: string | string[]): this {
        if (typeof field === 'string') {
            return this._setHeader(field, value as string);
        }
        if (field) {
            for (const [k, v] of Object.entries(field)) {
                this._setHeader(k, v as string);
            }
        }
        return this;
    }

    status(status: HttpStatus): this {
        this._status = status;
        return this;
    }

    type(type: string): this {
        if (typeof type === 'string') {
            if (type.includes('/')) {
                this.header('Content-Type', type);
            }
            else {
                this.header('Content-Type', mime.lookup(type) as string);
            }
        }
        return this;
    }

    vary(field: string): this {
        this.header('Vary', field);
        return this;
    }
    // endregion express
}
const logger: Logger = $log.create(MockResponse);

type ComposeFnParam = (source: any) => void;
