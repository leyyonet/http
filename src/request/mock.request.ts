import type {Application, MediaType, NextFunction, Request, Response} from "express";
import type {Socket} from "net";
import type {IncomingHttpHeaders} from "http";
import type RangeParser from "range-parser";
import type {
    MockRequestLike,
    MockServiceRequest,
    PipeOption,
    RequestBody,
    RequestErrorCallback,
    RequestLocal
} from "./index.types";
import type {
    _StreamAbort,
    _StreamBool,
    _StreamCompose,
    _StreamGeneric,
    _StreamIterator,
    _StreamReduce,
    _StreamVoid,
    HttpCookies,
    HttpMethod,
    HttpParams,
    HttpProtocol,
    HttpQuery,
    HttpStatus
} from "../shared";
import {HttpEvent} from '../shared';
import type {Dict, Fnc, Logger, Mutable, OneOrMore} from "@leyyo/common";
import {$log} from "@leyyo/common";
import {delay} from "@leyyo/common";
import type {ArrayOptions, Readable} from "node:stream";

let _firstOrigin: Request;

// noinspection JSUnusedGlobalSymbols
export class MockRequest<B extends RequestBody = RequestBody, L extends RequestLocal = RequestLocal> extends HttpEvent<Request> implements MockRequestLike<B, L> {
    // region property
    readonly isFake: boolean;
    readonly locals: L;

    [another: string]: unknown;

    // endregion property

    // region static
    static setFirstOrigin(origin: Request): void {
        if ( !_firstOrigin && origin) {
            _firstOrigin = origin;
            delete _firstOrigin.headers;
            delete _firstOrigin.body;
            delete _firstOrigin.cookies;
            delete _firstOrigin.params;
            _removePath(_firstOrigin);
            try {
                delete (_firstOrigin as Mutable<Request>).path;
            } catch (e) {
                // nothing
            }
        }
    }
    static get firstOrigin(): Request {
        return _firstOrigin;
    }

    // endregion static

    // region constructor
    constructor(service?: MockServiceRequest<B>, origin?: Request, custom?: Dict) {
        super(origin);
        _attachOrigin(this, origin);
        _attachService(this, service);
        _attachCustom(this, custom);
        _checkRoute(this);
    }

    // endregion constructor

    // region express
    accepted: MediaType[];
    readonly protocol: HttpProtocol;
    readonly secure: boolean;
    readonly ip: string;
    readonly ips: string[];
    readonly subdomains: string[];
    readonly path: string;
    readonly host: string;
    readonly hostname: string;
    readonly httpVersion: string;
    readonly httpVersionMajor: number;
    readonly httpVersionMinor: number;
    readonly fresh: boolean;
    readonly stale: boolean;
    readonly xhr: boolean;
    body: RequestBody;
    cookies: any;
    method: HttpMethod;
    params: HttpParams;
    query: HttpQuery;
    route: any;
    signedCookies: HttpCookies;
    originalUrl: string;
    url: string;
    baseUrl: string;
    app: Application;
    res?: Response<unknown, L>;
    next?: NextFunction;

    headers: IncomingHttpHeaders;

    is(t: OneOrMore<string>): string | false | null {
        return this._origin?.is(t) ?? false;
    }

    get(n: "set-cookie"): string[] | undefined;
    get(n: string): string | undefined;
    get(n: "set-cookie" | string): string[] | undefined | string {
        return this.header(n);
    }

    header(n: "set-cookie"): string[] | undefined;
    header(n: string): string | undefined;
    header(n: "set-cookie" | string): string[] | undefined | string {
        return (typeof n === 'string') ? this.headers[n] as string : undefined;
    }

    accepts(): string[];
    accepts(t: string): string | false;
    accepts(t: string[]): string | false;
    accepts(...t: string[]): string | false;
    accepts(...t: OneOrMore<string>[]): string[] | string | false {
        return this._origin?.accepts(...t as Array<string>);
    }

    acceptsCharsets(): string[];
    acceptsCharsets(c: string): string | false;
    acceptsCharsets(c: string[]): string | false;
    acceptsCharsets(...c: string[]): string | false;
    acceptsCharsets(...c: OneOrMore<string>[]): string[] | string | false {
        return this._origin?.acceptsCharsets(...c as Array<string>);
    }

    acceptsEncodings(): string[];
    acceptsEncodings(e: string): string | false;
    acceptsEncodings(e: string[]): string | false;
    acceptsEncodings(...e: string[]): string | false;
    acceptsEncodings(...e: OneOrMore<string>[]): string[] | string | false {
        return this._origin?.acceptsEncodings(...e as Array<string>);
    }

    acceptsLanguages(): string[];
    acceptsLanguages(l: string): string | false;
    acceptsLanguages(l: string[]): string | false;
    acceptsLanguages(...l: string[]): string | false;
    acceptsLanguages(...l: OneOrMore<string>[]): string[] | string | false {
        return this._origin?.acceptsLanguages(...l as Array<string>);
    }

    range(s: number, o?: RangeParser.Options): RangeParser.Ranges | RangeParser.Result | undefined {
        return this._origin?.range(s, o) ?? -1;
    }

    // endregion express

    // region http
    aborted: boolean;
    complete: boolean;
    statusCode: HttpStatus | undefined;
    statusMessage: string | undefined;
    socket: Socket;
    headersDistinct: NodeJS.Dict<string[]>;
    rawHeaders: string[];
    trailers: Record<string, string>;
    rawTrailers: string[];
    trailersDistinct: NodeJS.Dict<string[]>;

    get connection(): Socket {
        logger.warn('Should not be called', {fn: 'connection'});
        return this.socket;
    }

    destroy(_e?: Error): this {
        logger.warn('Should not be called', {fn: 'destroy'});
        return this;
    }

    setTimeout(_m: number, _c?: Fnc): this {
        logger.warn('Should not be called', {fn: 'setTimeout'});
        return this;
    }

    // endregion http

    // region stream
    [Symbol.asyncIterator](): AsyncIterableIterator<any> {
        logger.warn('Should not be called', {fn: 'asyncIterator'});
        return this._origin ? this._origin[Symbol.asyncIterator]() : undefined;
    }

    [Symbol.asyncDispose](): Promise<void> {
        logger.warn('Should not be called', {fn: 'asyncDispose'});
        return this._origin ? this._origin[Symbol.asyncDispose]() : delay(100);
    }

    readonly closed: boolean;
    readonly errored: Error;
    destroyed: boolean;
    readonly readableDidRead: boolean;
    readonly readableEncoding: BufferEncoding | null;
    readonly readableEnded: boolean;
    readonly readableAborted: boolean;
    readonly readableFlowing: boolean | null;
    readonly readableHighWaterMark: number;
    readonly readableLength: number;
    readonly readableObjectMode: boolean;
    readable: boolean;

    _construct(_c: RequestErrorCallback): void {
        logger.warn('Should not be called', {fn: '_construct'});
    }

    _destroy(_e: Error | null, _c: RequestErrorCallback): void {
        logger.warn('Should not be called', {fn: '_destroy'});
    }

    _read(_s: number): void {
        logger.warn('Should not be called', {fn: '_read'});
    }

    read(_s: number | undefined): string | Buffer {
        logger.warn('Should not be called', {fn: 'read'});
        return undefined;
    }

    push(_c: any, _e?: BufferEncoding): boolean {
        logger.warn('Should not be called', {fn: 'push'});
        return false;
    }

    isPaused(): boolean {
        logger.warn('Should not be called', {fn: 'isPaused'});
        return false;
    }

    resume(): this {
        logger.warn('Should not be called', {fn: 'resume'});
        return this;
    }

    pause(): this {
        logger.warn('Should not be called', {fn: 'pause'});
        return this;
    }

    pipe<T extends NodeJS.WritableStream>(_d: T, _o?: PipeOption): T {
        logger.warn('Should not be called', {fn: 'pipe'});
        return undefined;
    }

    setEncoding(_e: BufferEncoding): this {
        logger.warn('Should not be called', {fn: 'setEncoding'});
        return this;
    }

    unpipe(_d?: NodeJS.WritableStream): this {
        logger.warn('Should not be called', {fn: 'unpipe'});
        return this;
    }

    unshift(_c: string | Uint8Array, _e?: BufferEncoding): void {
        logger.warn('Should not be called', {fn: 'unshift'});
    }

    wrap(_s: NodeJS.ReadableStream): this {
        logger.warn('Should not be called', {fn: 'wrap'});
        return this;
    }

    asIndexedPairs(_o: _StreamAbort | undefined): Readable {
        logger.warn('Should not be called', {fn: 'asIndexedPairs'});
        return undefined;
    }

    compose<T extends NodeJS.ReadableStream>(_s: _StreamCompose | Iterable<T> | AsyncIterable<T> | T, _o: _StreamAbort | undefined): T {
        logger.warn('Should not be called', {fn: 'compose'});
        return undefined;
    }

    drop(_l: number, _o: _StreamAbort | undefined): Readable {
        logger.warn('Should not be called', {fn: 'drop'});
        return undefined;
    }

    every(_f: _StreamBool, _o: ArrayOptions | undefined): Promise<boolean> {
        logger.warn('Should not be called', {fn: 'every'});
        return delay(10, false);
    }

    filter(_f: _StreamBool, _o: ArrayOptions | undefined): Readable {
        logger.warn('Should not be called', {fn: 'filter'});
        return undefined;
    }

    find<T>(_f: _StreamGeneric<T>, _o: ArrayOptions | undefined): Promise<T | undefined> {
        logger.warn('Should not be called', {fn: 'find'});
        return delay(10);
    }

    flatMap(_f: _StreamGeneric<any>, _o: ArrayOptions | undefined): Readable {
        logger.warn('Should not be called', {fn: 'flatMap'});
        return undefined;
    }

    forEach(_f: _StreamVoid, _o: ArrayOptions | undefined): Promise<void> {
        logger.warn('Should not be called', {fn: 'forEach'});
        return delay(10);
    }

    iterator(_o: _StreamIterator | undefined): NodeJS.AsyncIterator<any> {
        logger.warn('Should not be called', {fn: 'iterator'});
        return undefined;
    }

    map(_f: _StreamGeneric<any>, _o: ArrayOptions | undefined): Readable {
        logger.warn('Should not be called', {fn: 'map'});
        return undefined;
    }

    reduce<T>(_f: _StreamReduce<T>, _i: undefined, _o: _StreamAbort | undefined): Promise<T> {
        logger.warn('Should not be called', {fn: 'reduce'});
        return delay(10);
    }

    some(_f: _StreamBool, _o: ArrayOptions | undefined): Promise<boolean> {
        logger.warn('Should not be called', {fn: 'some'});
        return delay(10, false);
    }

    take(_l: number, _o: _StreamAbort | undefined): Readable {
        logger.warn('Should not be called', {fn: 'take'});
        return undefined;
    }

    toArray(_o: _StreamAbort | undefined): Promise<any[]> {
        logger.warn('Should not be called', {fn: 'toArray'});
        return delay(10, []);
    }

    // endregion stream

    // region method
    param(name: string, defaultValue?: any): string {
        return this.params[name] ?? defaultValue;
    }

    // endregion method

}
const logger: Logger = $log.create(MockRequest);
// region functions
function _removePath(req: Request): void {
    try {
        delete (req as Mutable<Request>).path;
    } catch (e) {
        // nothing
    }
}

function _attachService(req: Request, service: MockServiceRequest): void {
    if ( !service) {
        service = {
            method: 'get',
            url: '/',
            body: undefined,
            headers: {},
            cookies: {},
            signedCookies: {},
        };
    }
    (req as Mutable<Request>)['isFake'] = true;
    req.method = service.method ?? 'get';
    req.url = service.url ?? '';
    req.body = service.body;
    req.headers = service.headers ?? {};
    req.cookies = service?.cookies ?? {};
    req.signedCookies = service?.signedCookies ?? {};
}

function _attachOrigin(req: Request, origin: Request): void {
    origin = origin ?? _firstOrigin;
    if (origin) {
        origin.body = undefined;
        origin.params = {};
        _removePath(origin);
    }
}

function _attachCustom(req: Request, custom: Dict): void {
    if (custom) {
        for (const [key, value] of Object.entries(custom)) {
            if (typeof req[key] === undefined) {
                req[key] = value;
            }
        }
    }
}

function _checkRoute(req: Request): void {
    if ( !req.route) {
        req.route = {
            path: req.path,
            stack: [],
            methods: {[req.method]: true,},
        };
    }
}
// endregion functions
