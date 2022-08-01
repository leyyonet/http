import {Application, CookieOptions, Errback, Request, Response} from "express";
import {RecLike, leyyo, logger, OneOrMore, FuncLike, Key, emptyFn} from "@leyyo/core";
import {OutgoingHttpHeader, OutgoingHttpHeaders} from "http";
import {Socket} from "net";
import mime from "mime";
import {
    MockResponseLike,
    MockResponseResolve,
    ResponseCookie,
    ResponseData,
    ResponseErrorCallback
} from "./index-types";
import {Fqn} from "@leyyo/fqn";
import {FQN_NAME} from "../internal-component";
import {MockApplication} from "../application";


// noinspection JSUnusedGlobalSymbols
@Fqn(...FQN_NAME)
export class MockResponse<D = ResponseData, L extends RecLike = RecLike> implements MockResponseLike<D, L>, RecLike {
    private _headersSent: boolean; // after send it is true
    readonly isFake: boolean;

    [key: string]: unknown;
    private readonly _resolver: MockResponseResolve;
    readonly app: Application;
    readonly locals: L;
    sendDate: boolean;
    statusMessage: string;
    private _headers: RecLike<OneOrMore<string>>;
    private _cookies: RecLike<ResponseCookie>;
    private _clearedCookies: RecLike<CookieOptions>;
    private _data: ResponseData;
    private _status: number;
    charset: string;
    chunkedEncoding: boolean;
    destroyed: boolean;
    readonly connection: Socket | null;
    finished: boolean;
    readonly req: Request;
    useChunkedEncodingByDefault: boolean;
    readonly writable: boolean;
    readonly writableCorked: number;
    readonly writableEnded: boolean;
    readonly writableFinished: boolean;
    readonly writableHighWaterMark: number;
    readonly writableLength: number;
    readonly writableObjectMode: boolean;
    shouldKeepAlive: boolean;
    readonly socket: Socket | null;
    statusCode: number;
    writeHead: ((statusCode: number, statusMessage?: string, headers?: (OutgoingHttpHeaders | OutgoingHttpHeader[])) => this) & ((statusCode: number, headers?: (OutgoingHttpHeaders | OutgoingHttpHeader[])) => this);
    closed: boolean;
    errored: Error;
    writableNeedDrain: boolean;

    constructor(resolver: MockResponseResolve, origin?: Response) {
        if (typeof resolver != "function") {
            resolver = (dto => {
                emptyFn();
            }) as MockResponseResolve;
        }
        this._resolver = resolver;
        this.isFake = true;
        if (!origin?.app) {
            this.app = new MockApplication() as Application;
        } else {
            this.app = origin.app;
        }
        this.locals = (leyyo.is.object(origin.locals) ? {...origin.locals} : {}) as L;
        this._headersSent = false;
        this._clear();
    }


    // region private


    private _send(data?: ResponseData): this {
        if (!this._headersSent) {
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
                locals: this.locals,
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

    _construct(callback?: ResponseErrorCallback): void {
        emptyFn();
    }

    _destroy(error: Error | null, callback: ResponseErrorCallback): void {
        emptyFn();
    }

    _final(callback: ResponseErrorCallback): void {
        emptyFn();
    }

    _write(chunk: unknown, encoding: BufferEncoding, callback: ResponseErrorCallback): void {
        emptyFn();
    }

    _writev(chunks: Array<{ chunk: unknown; encoding: BufferEncoding }>, callback: ResponseErrorCallback): void {
        emptyFn();
    }

    addTrailers(headers: OutgoingHttpHeaders | Array<[string, string]>): void {
        emptyFn();
    }

    assignSocket(socket: Socket): void {
        emptyFn();
    }
    get headersSent(): boolean {
        return this._headersSent;
    }


    cork(): void {
        emptyFn();
    }

    destroy(error: Error | undefined): this {
        return this;
    }

    detachSocket(socket: Socket): void {
        emptyFn();
    }

    flushHeaders(): void {
        this._headers = {};
    }

    getHeader(name: string): number | string | string[] | undefined {
        return this.get(name);
    }

    getHeaderNames(): string[] {
        return [];
    }

    getHeaders(): OutgoingHttpHeaders {
        return {};
    }

    hasHeader(name: string): boolean {
        return false;
    }

    json(data: D): this {
        this._setHeader('Content-Type', 'application/json');
        this._send(data);
        return this;
    }

    jsonp(data: D): this {
        this._setHeader('Content-Type', 'application/json');
        this._send(data);
        return this;
    }

    pipe<T>(destination: T, options: { end?: boolean | undefined } | undefined): T {
        return destination;
    }

    removeHeader(name: string): void {
        emptyFn();
    }


    send(body?: unknown): this {
        this._send(body);
        return this;
    }

    setDefaultEncoding(encoding: BufferEncoding): this {
        return this;
    }

    setHeader(name: string, value: number | string | ReadonlyArray<string>): this {
        return this;
    }

    setTimeout(msecs: number, callback: (() => void) | undefined): this {
        return this;
    }

    uncork(): void {
        emptyFn();
    }



    writeContinue(callback: (() => void) | undefined): void {
        emptyFn();
    }


    writeProcessing(): void {
        emptyFn();
    }

    addListener(eventName: string | symbol, listener: FuncLike): this {
        return undefined;
    }

    append(key: string, value?: OneOrMore<string>): this {
        return this._setHeader(key, value);
    }

    attachment(filename?: string): this {
        filename = filename ? `; filename="${filename}"` : '';
        return this._setHeader('Content-Disposition', `attachment${filename}`);
    }

    clearCookie(name: string, options?: CookieOptions): this {
        this._clearedCookies[name] = options;
        return this;
    }

    contentType(type: string): this {
        return this.type(type);
    }

    cookie(key: string, value: unknown, option?: CookieOptions): this {
        if (typeof key === 'string') {
            this._cancelCookieClear(key);
            return this._setCookie(key, value as string, option);
        }
        if (leyyo.is.object(key)) {
            for (const [k, v] of Object.entries(key)) {
                this._cancelCookieClear(k);
                this._setCookie(k, v as string, value ?? option);
            }
        }
        return this;
    }

    download(path: string, fn?: Errback | string, err?: unknown, errBack?: Errback): void {
        LOG.warn('unsupported.feature', {fn: 'download', path});
    }

    emit(eventName: string | symbol, ...args: unknown[]): boolean {
        return false;
    }

    end(): this {
        this._clear();
        this._send();
        return this;
    }
    eventNames(): Array<string | symbol> {
        return [];
    }

    format(obj: unknown): this {
        LOG.warn('unsupported.feature', {fn: 'format', obj});
        return this;
    }

    get(field: string): string {
        return (typeof field === 'string') ? this._headers[field] as string : undefined;
    }

    getMaxListeners(): number {
        return 0;
    }

    header(field: unknown, value?: OneOrMore<string>): this {
        return this._setHeader(field as string, value);
    }

    links(map: unknown): this {
        if (leyyo.is.object(map)) {
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

    listenerCount(eventName: string | symbol): number {
        return 0;
    }

    listeners(eventName: string | symbol): Array<FuncLike> {
        return [];
    }

    location(url: string): this {
        LOG.warn('unsupported.feature', {fn: 'location', url});
        return this;
    }

    off(eventName: string | symbol, listener: FuncLike): this {
        return this;
    }

    on(eventName: string | symbol, listener: FuncLike): this {
        return this;
    }

    once(eventName: string | symbol, listener: FuncLike): this {
        return this;
    }

    prependListener(eventName: string | symbol, listener: FuncLike): this {
        return this;
    }

    prependOnceListener(eventName: string | symbol, listener: FuncLike): this {
        return this;
    }

    rawListeners(eventName: string | symbol): Function[] {
        return [];
    }

    redirect(url: Key, status?: Key): void {
        LOG.warn('unsupported.feature', {fn: 'redirect', url, status});
    }

    removeAllListeners(event?: string | symbol): this {
        return this;
    }

    removeListener(eventName: string | symbol, listener: FuncLike): this {
        return this;
    }

    render(view: string, options?: RecLike | ((err: Error, html: string) => void), callback?: (err: Error, html: string) => void): void {
        LOG.warn('unsupported.feature', {fn: 'render'});
    }

    sendFile(path: string, fn?: unknown, err?: Errback): void {
        LOG.warn('unsupported.feature', {fn: 'sendFile', path});
    }

    sendStatus(status: number): this {
        this._status = status;
        this._send();
        return this;
    }

    sendfile(path: string, options?: unknown, fn?: Errback): void {
        LOG.warn('unsupported.feature', {fn: 'render'});
    }

    set(field: unknown, value?: string | string[]): this {
        if (typeof field === 'string') {
            return this._setHeader(field, value as string);
        }
        if (leyyo.is.object(field)) {
            for (const [k, v] of Object.entries(field)) {
                this._setHeader(k, v as string);
            }
        }
        return this;
    }

    setMaxListeners(n: number): this {
        return this;
    }

    status(status: number): this {
        this._status = status;
        return this;
    }

    type(type: string): this {
        if (typeof type === 'string') {
            if (type.includes('/')) {
                this.header('Content-Type', type);
            } else {
                this.header('Content-Type', mime.getType(type));
            }
        }
        return this;
    }

    vary(field: string): this {
        this.header('Vary', field);
        return this;
    }

    write(buffer: Uint8Array | string, cb?: ResponseErrorCallback | BufferEncoding, cb2?: ResponseErrorCallback): boolean {
        return false;
    }

    // endregion private
}
const LOG = logger.assign(MockResponse);