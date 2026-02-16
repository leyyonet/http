import {Application, MediaType, NextFunction, Request, Response} from "express";
import {Socket} from "net";
import {IncomingHttpHeaders} from "http";
import RangeParser from "range-parser";
import {
    MockRequestLike,
    MockServiceRequest,
    PipeOption,
    RequestBody,
    RequestErrorCallback,
    RequestLocal
} from "./index.types.js";
import {
    _StreamAbort,
    _StreamBool,
    _StreamCompose,
    _StreamGeneric,
    _StreamIterator,
    _StreamReduce,
    _StreamVoid,
    HttpCookies,
    HttpEvent,
    HttpParams,
    HttpQuery
} from "../event/index.js";
import {delay, Dict, Fnc, HttpStatus, logCommon, Logger, Mutable, OneOrMore} from "@leyyo/common";
import {ArrayOptions, Readable} from "node:stream";
import {HttpMethod, HttpProtocol} from "../enum/index.js";

let _firstOrigin: Request;

// noinspection JSUnusedGlobalSymbols
export class MockRequest<B extends RequestBody = RequestBody, L extends RequestLocal = RequestLocal> extends HttpEvent<Request> implements MockRequestLike<B, L> {
    // region property
    /** @inheritDoc */
    readonly isFake: boolean;

    /** @inheritDoc */
    readonly locals: L;

    /** @inheritDoc */
    [another: string]: unknown;

    // endregion property

    // region constructor
    /**
     * Constructor
     *
     * @param {MockServiceRequest} service - for bulk request
     * @param {Request} origin - first real request
     * @param {object} custom - custom values
     * */
    constructor(service?: MockServiceRequest<B>, origin?: Request, custom?: Dict) {
        super(origin);
        _attachOrigin(this, origin);
        _attachService(this, service);
        _attachCustom(this, custom);
        _checkRoute(this);
    }

    // endregion constructor

    // region express
    /** @inheritDoc*/
    accepted: MediaType[];

    /** @inheritDoc*/
    readonly protocol: HttpProtocol;

    /** @inheritDoc*/
    readonly secure: boolean;

    /** @inheritDoc*/
    readonly ip: string;

    /** @inheritDoc*/
    readonly ips: string[];

    /** @inheritDoc*/
    readonly subdomains: string[];

    /** @inheritDoc*/
    readonly path: string;

    /** @inheritDoc*/
    readonly host: string;

    /** @inheritDoc*/
    readonly hostname: string;

    /** @inheritDoc*/
    readonly httpVersion: string;

    /** @inheritDoc*/
    readonly httpVersionMajor: number;

    /** @inheritDoc*/
    readonly httpVersionMinor: number;

    /** @inheritDoc*/
    readonly fresh: boolean;

    /** @inheritDoc*/
    readonly stale: boolean;

    /** @inheritDoc*/
    readonly xhr: boolean;

    /** @inheritDoc*/
    body: RequestBody;

    /** @inheritDoc*/
    cookies: any;

    /** @inheritDoc*/
    method: HttpMethod;

    /** @inheritDoc*/
    params: HttpParams;

    /** @inheritDoc*/
    query: HttpQuery;

    /** @inheritDoc*/
    route: any;

    /** @inheritDoc*/
    signedCookies: HttpCookies;

    /** @inheritDoc*/
    originalUrl: string;

    /** @inheritDoc*/
    url: string;

    /** @inheritDoc*/
    baseUrl: string;

    /** @inheritDoc*/
    app: Application;

    /** @inheritDoc*/
    res?: Response<unknown, L>;

    /** @inheritDoc*/
    next?: NextFunction;

    /** @inheritDoc*/
    headers: IncomingHttpHeaders;


    /** @inheritDoc*/
    is(t: OneOrMore<string>): string | false | null {
        return this._origin?.is(t) ?? false;
    }

    /** @inheritDoc*/
    get(n: "set-cookie"): string[] | undefined;

    /** @inheritDoc*/
    get(n: string): string | undefined;

    /** @inheritDoc*/
    get(n: "set-cookie" | string): string[] | undefined | string {
        return this.header(n);
    }

    /** @inheritDoc*/
    header(n: "set-cookie"): string[] | undefined;

    /** @inheritDoc*/
    header(n: string): string | undefined;

    /** @inheritDoc*/
    header(n: "set-cookie" | string): string[] | undefined | string {
        return (typeof n === 'string') ? this.headers[n] as string : undefined;
    }

    /** @inheritDoc*/
    accepts(): string[];

    /** @inheritDoc*/
    accepts(t: string): string | false;

    /** @inheritDoc*/
    accepts(t: string[]): string | false;

    /** @inheritDoc*/
    accepts(...t: string[]): string | false;

    /** @inheritDoc*/
    accepts(...t: OneOrMore<string>[]): string[] | string | false {
        return this._origin?.accepts(...t as Array<string>);
    }

    /** @inheritDoc*/
    acceptsCharsets(): string[];

    /** @inheritDoc*/
    acceptsCharsets(c: string): string | false;

    /** @inheritDoc*/
    acceptsCharsets(c: string[]): string | false;

    /** @inheritDoc*/
    acceptsCharsets(...c: string[]): string | false;

    /** @inheritDoc*/
    acceptsCharsets(...c: OneOrMore<string>[]): string[] | string | false {
        return this._origin?.acceptsCharsets(...c as Array<string>);
    }

    /** @inheritDoc*/
    acceptsEncodings(): string[];

    /** @inheritDoc*/
    acceptsEncodings(e: string): string | false;

    /** @inheritDoc*/
    acceptsEncodings(e: string[]): string | false;

    /** @inheritDoc*/
    acceptsEncodings(...e: string[]): string | false;

    /** @inheritDoc*/
    acceptsEncodings(...e: OneOrMore<string>[]): string[] | string | false {
        return this._origin?.acceptsEncodings(...e as Array<string>);
    }

    /** @inheritDoc*/
    acceptsLanguages(): string[];

    /** @inheritDoc*/
    acceptsLanguages(l: string): string | false;

    /** @inheritDoc*/
    acceptsLanguages(l: string[]): string | false;

    /** @inheritDoc*/
    acceptsLanguages(...l: string[]): string | false;

    /** @inheritDoc*/
    acceptsLanguages(...l: OneOrMore<string>[]): string[] | string | false {
        return this._origin?.acceptsLanguages(...l as Array<string>);
    }

    /** @inheritDoc*/
    range(s: number, o?: RangeParser.Options): RangeParser.Ranges | RangeParser.Result | undefined {
        return this._origin?.range(s, o) ?? -1;
    }

    // endregion express

    // region http

    /** @inheritDoc*/
    aborted: boolean;

    /** @inheritDoc*/
    complete: boolean;

    /** @inheritDoc*/
    statusCode: HttpStatus | undefined;

    /** @inheritDoc*/
    statusMessage: string | undefined;

    /** @inheritDoc*/
    socket: Socket;

    /** @inheritDoc*/
    headersDistinct: NodeJS.Dict<string[]>;

    /** @inheritDoc*/
    rawHeaders: string[];

    /** @inheritDoc*/
    trailers: Record<string, string>;

    /** @inheritDoc*/
    rawTrailers: string[];

    /** @inheritDoc*/
    trailersDistinct: NodeJS.Dict<string[]>;


    /** @inheritDoc*/
    get connection(): Socket {
        logger.warn('Should not be called', {fn: 'connection'});
        return this.socket;
    }

    /** @inheritDoc*/
    destroy(_e?: Error): this {
        logger.warn('Should not be called', {fn: 'destroy'});
        return this;
    }

    /** @inheritDoc*/
    setTimeout(_m: number, _c?: Fnc): this {
        logger.warn('Should not be called', {fn: 'setTimeout'});
        return this;
    }

    // endregion http

    // region stream
    /** @inheritDoc*/
    [Symbol.asyncIterator](): AsyncIterableIterator<any> {
        logger.warn('Should not be called', {fn: 'asyncIterator'});
        return this._origin ? this._origin[Symbol.asyncIterator]() : undefined;
    }

    /** @inheritDoc*/
    [Symbol.asyncDispose](): Promise<void> {
        logger.warn('Should not be called', {fn: 'asyncDispose'});
        return this._origin ? this._origin[Symbol.asyncDispose]() : delay(100);
    }

    /** @inheritDoc*/
    readonly closed: boolean;

    /** @inheritDoc*/
    readonly errored: Error;

    /** @inheritDoc*/
    destroyed: boolean;

    /** @inheritDoc*/
    readonly readableDidRead: boolean;

    /** @inheritDoc*/
    readonly readableEncoding: BufferEncoding | null;

    /** @inheritDoc*/
    readonly readableEnded: boolean;

    /** @inheritDoc*/
    readonly readableAborted: boolean;

    /** @inheritDoc*/
    readonly readableFlowing: boolean | null;

    /** @inheritDoc*/
    readonly readableHighWaterMark: number;

    /** @inheritDoc*/
    readonly readableLength: number;

    /** @inheritDoc*/
    readonly readableObjectMode: boolean;

    /** @inheritDoc*/
    readable: boolean;

    /** @inheritDoc*/
    _construct(_c: RequestErrorCallback): void {
        logger.warn('Should not be called', {fn: '_construct'});
    }

    /** @inheritDoc*/
    _destroy(_e: Error | null, _c: RequestErrorCallback): void {
        logger.warn('Should not be called', {fn: '_destroy'});
    }

    /** @inheritDoc*/
    _read(_s: number): void {
        logger.warn('Should not be called', {fn: '_read'});
    }

    /** @inheritDoc*/
    read(_s: number | undefined): string | Buffer {
        logger.warn('Should not be called', {fn: 'read'});
        return undefined;
    }

    /** @inheritDoc*/
    push(_c: any, _e?: BufferEncoding): boolean {
        logger.warn('Should not be called', {fn: 'push'});
        return false;
    }

    /** @inheritDoc*/
    isPaused(): boolean {
        logger.warn('Should not be called', {fn: 'isPaused'});
        return false;
    }

    /** @inheritDoc*/
    resume(): this {
        logger.warn('Should not be called', {fn: 'resume'});
        return this;
    }

    /** @inheritDoc*/
    pause(): this {
        logger.warn('Should not be called', {fn: 'pause'});
        return this;
    }

    /** @inheritDoc*/
    pipe<T extends NodeJS.WritableStream>(_d: T, _o?: PipeOption): T {
        logger.warn('Should not be called', {fn: 'pipe'});
        return undefined;
    }

    /** @inheritDoc*/
    setEncoding(_e: BufferEncoding): this {
        logger.warn('Should not be called', {fn: 'setEncoding'});
        return this;
    }

    /** @inheritDoc*/
    unpipe(_d?: NodeJS.WritableStream): this {
        logger.warn('Should not be called', {fn: 'unpipe'});
        return this;
    }

    /** @inheritDoc*/
    unshift(_c: string | Uint8Array, _e?: BufferEncoding): void {
        logger.warn('Should not be called', {fn: 'unshift'});
    }

    /** @inheritDoc*/
    wrap(_s: NodeJS.ReadableStream): this {
        logger.warn('Should not be called', {fn: 'wrap'});
        return this;
    }

    /** @inheritDoc*/
    asIndexedPairs(_o: _StreamAbort | undefined): Readable {
        logger.warn('Should not be called', {fn: 'asIndexedPairs'});
        return undefined;
    }

    /** @inheritDoc*/
    compose<T extends NodeJS.ReadableStream>(_s: _StreamCompose | Iterable<T> | AsyncIterable<T> | T, _o: _StreamAbort | undefined): T {
        logger.warn('Should not be called', {fn: 'compose'});
        return undefined;
    }

    /** @inheritDoc*/
    drop(_l: number, _o: _StreamAbort | undefined): Readable {
        logger.warn('Should not be called', {fn: 'drop'});
        return undefined;
    }

    /** @inheritDoc*/
    every(_f: _StreamBool, _o: ArrayOptions | undefined): Promise<boolean> {
        logger.warn('Should not be called', {fn: 'every'});
        return delay(10, false);
    }

    /** @inheritDoc*/
    filter(_f: _StreamBool, _o: ArrayOptions | undefined): Readable {
        logger.warn('Should not be called', {fn: 'filter'});
        return undefined;
    }

    /** @inheritDoc*/
    find<T>(_f: _StreamGeneric<T>, _o: ArrayOptions | undefined): Promise<T | undefined> {
        logger.warn('Should not be called', {fn: 'find'});
        return delay(10);
    }

    /** @inheritDoc*/
    flatMap(_f: _StreamGeneric<any>, _o: ArrayOptions | undefined): Readable {
        logger.warn('Should not be called', {fn: 'flatMap'});
        return undefined;
    }

    /** @inheritDoc*/
    forEach(_f: _StreamVoid, _o: ArrayOptions | undefined): Promise<void> {
        logger.warn('Should not be called', {fn: 'forEach'});
        return delay(10);
    }

    /** @inheritDoc*/
    iterator(_o: _StreamIterator | undefined): NodeJS.AsyncIterator<any> {
        logger.warn('Should not be called', {fn: 'iterator'});
        return undefined;
    }

    /** @inheritDoc*/
    map(_f: _StreamGeneric<any>, _o: ArrayOptions | undefined): Readable {
        logger.warn('Should not be called', {fn: 'map'});
        return undefined;
    }

    /** @inheritDoc*/
    reduce<T>(_f: _StreamReduce<T>, _i: undefined, _o: _StreamAbort | undefined): Promise<T> {
        logger.warn('Should not be called', {fn: 'reduce'});
        return delay(10);
    }

    /** @inheritDoc*/
    some(_f: _StreamBool, _o: ArrayOptions | undefined): Promise<boolean> {
        logger.warn('Should not be called', {fn: 'some'});
        return delay(10, false);
    }

    /** @inheritDoc*/
    take(_l: number, _o: _StreamAbort | undefined): Readable {
        logger.warn('Should not be called', {fn: 'take'});
        return undefined;
    }

    /** @inheritDoc*/
    toArray(_o: _StreamAbort | undefined): Promise<any[]> {
        logger.warn('Should not be called', {fn: 'toArray'});
        return delay(10, []);
    }

    // endregion stream

    // region method
    /** @inheritDoc*/
    param(name: string, defaultValue?: any): string {
        return this.params[name] ?? defaultValue;
    }

    // endregion method

    // region static
    /**
     * Set first real request
     *
     * @param {Request} origin
     * */
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

    /**
     * Get first real request
     *
     * @return {Request}
     * */
    static get firstOrigin(): Request {
        return _firstOrigin;
    }

    // endregion static
}

const logger: Logger = logCommon.of(MockRequest);

// region functions
function _removePath(req: Request): void {
    try {
        delete (req as Mutable<Request>).path;
    } catch (e) {
        // nothing
    }
}

/**
 * Attach service to request
 *
 * @param {Request} req - request
 * @param {MockServiceRequest} service - service request object
 * */
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

/**
 * Attach first real request
 *
 * @param {Request} _req
 * @param {Request} origin
 * */
function _attachOrigin(_req: Request, origin: Request): void {
    origin = origin ?? _firstOrigin;
    if (origin) {
        // Clear specific values
        origin.body = undefined;
        origin.params = {};
        _removePath(origin);
    }
}

/**
 * Attach custom object to request
 *
 * @param {Request} req
 * @param {object} custom
 * */
function _attachCustom(req: Request, custom: Dict): void {
    if (custom) {
        for (const [key, value] of Object.entries(custom)) {
            if (typeof req[key] === undefined) {
                req[key] = value;
            }
        }
    }
}

/**
 * Check route
 *
 * @param {Request} req
 * */
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
