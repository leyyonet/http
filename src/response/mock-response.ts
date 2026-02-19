import { Application, CookieOptions, Errback, Request, Response } from "express";
import { Socket } from "net";
import * as mime from "mime-types";
import {
  MockResponseLike,
  MockResponseResolve,
  ResponseCookies,
  ResponseData,
  ResponseErrorCallback,
  ResponseLocal,
} from "./index-types.js";
import { Dict, HttpStatus, KeyValue, logCommon, Logger, OneOrMore, setFqn } from "@leyyo/common";
import { HttpEvent, HttpHeaders } from "../event/index.js";
import { OutgoingHttpHeader, OutgoingHttpHeaders } from "node:http";
import { FQN } from "../internal.js";

let _firstOrigin: Response;

export class MockResponse<R extends ResponseData, L extends ResponseLocal = ResponseLocal>
  extends HttpEvent<Response>
  implements MockResponseLike<R, L>
{
  // region property
  /**
   * is header already sent?
   * */
  private _headersSent: boolean; // after send it is true

  /**
   * Response resolver lambda
   * */
  private readonly _resolver: MockResponseResolve<R>;

  /**
   * Response headers
   * */
  private _headers: HttpHeaders;

  /**
   * Response cookies
   * */
  private _cookies: ResponseCookies;

  /**
   * Response cleared cookies
   * */
  private _clearedCookies: Dict<CookieOptions>;

  /**
   * Response data
   * */
  private _data: R;

  /**
   * Response status
   * */
  private _status: HttpStatus;

  /**
   * Response local vale
   * */
  readonly locals: L;

  /** @inheritDoc */
  readonly isFake: boolean;

  [another: string]: unknown;

  // endregion property

  // region constructor
  /**
   * Constructor
   *
   * @param {MockResponseResolve} resolver - response resolver
   * @param {Response} origin - first origin/real response
   * */
  constructor(resolver: MockResponseResolve<R>, origin?: Response) {
    super(origin);
    if (typeof resolver != "function") {
      resolver = (() => {}) as MockResponseResolve<R>;
    }
    this._resolver = resolver;
    this.isFake = true;
    this._headersSent = false;

    this.locals = (origin?.locals ?? {}) as L;
    this._clear();
  }

  // endregion constructor

  // region private
  /**
   * It's used for in place of original sen data
   *
   * It collects data and trigger resolver
   *
   * @param {any} data
   * */
  private _send(data?: R): this {
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
      });
    }
    return this;
  }

  /**
   * Set header
   *
   * @param {string} key - header key
   * @param {(string|string[])} value - header value
   * */
  private _setHeader(key: string, value: OneOrMore<string>): this {
    this._headers[key] = value;
    return this;
  }

  /**
   * Set cookie
   *
   * @param {string} key - cookie key
   * @param {string} value - cookie value
   * @param {CookieOptions} opt
   * */
  private _setCookie(key: string, value: string, opt?: CookieOptions): this {
    this._cookies[key] = { value, opt };
    return this;
  }

  /**
   * Remove a key from cleared cookies
   *
   * @param {string} key - cookie key
   * @return {boolean} - is removed?
   * */
  private _cancelCookieClear(key: string): boolean {
    if (this._clearedCookies[key] !== undefined) {
      delete this._clearedCookies[key];
      return true;
    }
    return false;
  }

  /**
   * Clear response
   * */
  private _clear() {
    this.statusMessage = undefined;
    this._headers = {};
    this._cookies = {};
    this._clearedCookies = {};
    this._data = undefined;
    this._status = 200;
  }

  // endregion private

  // region stream

  /** @inheritDoc */
  "[unknown]"<K>(..._args: Array<unknown>): void {}

  /** @inheritDoc */
  [Symbol.asyncDispose](): Promise<void> {
    return Promise.resolve(undefined);
  }

  /** @inheritDoc */
  destroyed: boolean;

  /** @inheritDoc */
  closed: boolean;

  /** @inheritDoc */
  errored: Error;

  /** @inheritDoc */
  readonly writable: boolean;

  /** @inheritDoc */
  readonly writableAborted: boolean;

  /** @inheritDoc */
  readonly writableCorked: number;

  /** @inheritDoc */
  readonly writableEnded: boolean;

  /** @inheritDoc */
  readonly writableFinished: boolean;

  /** @inheritDoc */
  readonly writableHighWaterMark: number;

  /** @inheritDoc */
  readonly writableLength: number;

  /** @inheritDoc */
  readonly writableObjectMode: boolean;

  /** @inheritDoc */
  writableNeedDrain: boolean;

  /** @inheritDoc */
  _construct(_c?: ResponseErrorCallback): void {
    logger.warn("Should not be called", { fn: "_construct" });
  }

  /** @inheritDoc */
  _destroy(_e: Error | null, _c: ResponseErrorCallback): void {
    logger.warn("Should not be called", { fn: "_destroy" });
  }

  /** @inheritDoc */
  _final(_c: ResponseErrorCallback): void {
    logger.warn("Should not be called", { fn: "_final" });
  }

  /** @inheritDoc */
  _write(_c: unknown, _e: BufferEncoding, _r: ResponseErrorCallback): void {
    logger.warn("Should not be called", { fn: "_write" });
  }

  /** @inheritDoc */
  _writev(
    _c: Array<{ chunk: unknown; encoding: BufferEncoding }>,
    _b: ResponseErrorCallback,
  ): void {
    logger.warn("Should not be called", { fn: "_writev" });
  }

  /** @inheritDoc */
  cork(): void {
    logger.warn("Should not be called", { fn: "cork" });
  }

  /** @inheritDoc */
  destroy(_e: Error | undefined): this {
    logger.warn("Should not be called", { fn: "destroy" });
    return this;
  }

  /** @inheritDoc */
  pipe<T extends NodeJS.WritableStream>(_d: T, _o: { end?: boolean | undefined } | undefined): T {
    logger.warn("Should not be called", { fn: "pipe" });
    return undefined;
  }

  /** @inheritDoc */
  setDefaultEncoding(_e: BufferEncoding): this {
    logger.warn("Should not be called", { fn: "setDefaultEncoding" });
    return this;
  }

  /** @inheritDoc */
  uncork(): void {
    logger.warn("Should not be called", { fn: "uncork" });
  }

  /** @inheritDoc */
  end(): this {
    this._clear();
    this._send();
    return this;
  }

  /** @inheritDoc */
  write(
    _b: Uint8Array | string,
    _c?: ResponseErrorCallback | BufferEncoding,
    _d?: ResponseErrorCallback,
  ): boolean {
    logger.warn("Should not be called", { fn: "write" });
    return false;
  }

  /** @inheritDoc */
  compose<T>(
    _s: ComposeFnParam | Iterable<T> | AsyncIterable<T> | T,
    _o:
      | {
          signal: AbortSignal;
        }
      | undefined,
  ): T {
    logger.warn("Should not be called", { fn: "compose" });
    return undefined;
  }

  // endregion stream

  // region http
  /** @inheritDoc */
  sendDate: boolean;

  /** @inheritDoc */
  statusMessage: string;

  /** @inheritDoc */
  chunkedEncoding: boolean;

  /** @inheritDoc */
  shouldKeepAlive: boolean;

  /** @inheritDoc */
  finished: boolean;

  /** @inheritDoc */
  get connection(): Socket {
    return this.socket;
  }

  /** @inheritDoc */
  useChunkedEncodingByDefault: boolean;

  /** @inheritDoc */
  readonly socket: Socket | null;

  /** @inheritDoc */
  statusCode: number;

  /** @inheritDoc */
  writeHead: ((
    statusCode: number,
    statusMessage?: string,
    headers?: OutgoingHttpHeaders | OutgoingHttpHeader[],
  ) => this) &
    ((statusCode: number, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[]) => this);

  /** @inheritDoc */
  strictContentLength: boolean;

  /** @inheritDoc */
  addTrailers(_h: OutgoingHttpHeaders | Array<[string, string]>): void {
    logger.warn("Should not be called", { fn: "addTrailers" });
  }

  /** @inheritDoc */
  assignSocket(_s: Socket): void {
    logger.warn("Should not be called", { fn: "assignSocket" });
  }

  /** @inheritDoc */
  detachSocket(_s: Socket): void {
    logger.warn("Should not be called", { fn: "detachSocket" });
  }

  /** @inheritDoc */
  flushHeaders(): void {
    this._headers = {};
  }

  /** @inheritDoc */
  getHeader(name: string): number | string | string[] | undefined {
    return this.get(name);
  }

  /** @inheritDoc */
  getHeaderNames(): string[] {
    return Object.keys(this._headers);
  }

  /** @inheritDoc */
  getHeaders(): OutgoingHttpHeaders {
    return this._headers;
  }

  /** @inheritDoc */
  hasHeader(name: string): boolean {
    return this._headers[name] !== undefined;
  }

  /** @inheritDoc */
  removeHeader(name: string): void {
    if (this._headers[name] !== undefined) {
      delete this._headers[name];
    }
  }

  /** @inheritDoc */
  setHeader(name: string, value: number | string | ReadonlyArray<string>): this {
    this._headers[name] = value as string;
    return this;
  }

  /** @inheritDoc */
  setTimeout(_m: number, _c: (() => void) | undefined): this {
    logger.warn("Should not be called", { fn: "setTimeout" });
    return this;
  }

  /** @inheritDoc */
  writeContinue(_c: (() => void) | undefined): void {
    logger.warn("Should not be called", { fn: "writeContinue" });
  }

  /** @inheritDoc */
  writeProcessing(): void {
    logger.warn("Should not be called", { fn: "writeProcessing" });
  }

  /** @inheritDoc */
  appendHeader(name: string, value: string | readonly string[]): this {
    if (this._headers[name] === undefined) {
      this._headers[name] = [];
    } else if (!Array.isArray(this._headers[name])) {
      this._headers[name] = [this._headers[name] as string];
    }
    if (Array.isArray(value)) {
      (this._headers[name] as Array<string>).push(...value);
    } else {
      (this._headers[name] as Array<string>).push(value as string);
    }
    return this;
  }

  /** @inheritDoc */
  setHeaders(headers: Headers | Map<string, number | string | readonly string[]>): this {
    this._headers = {};
    if (headers instanceof Map) {
      for (const [k, v] of headers.entries()) {
        this._headers[k as string] = v as string;
      }
    } else {
      for (const [k, v] of Object.entries(headers)) {
        this._headers[k as string] = v as string;
      }
    }
    return this;
  }

  /** @inheritDoc */
  writeEarlyHints(_h: Record<string, string | string[]>, _c: (() => void) | undefined): void {
    logger.warn("Should not be called", { fn: "writeEarlyHints" });
  }

  // endregion http

  // region express
  /** @inheritDoc */
  readonly app: Application;

  /** @inheritDoc */
  charset: string;

  /** @inheritDoc */
  readonly req: Request;

  /** @inheritDoc */
  get headersSent(): boolean {
    return this._headersSent;
  }

  /** @inheritDoc */
  json(data: R): this {
    this._setHeader("Content-Type", "application/json");
    this._send(data);
    return this;
  }

  /** @inheritDoc */
  jsonp(data: R): this {
    this._setHeader("Content-Type", "application/json");
    this._send(data);
    return this;
  }

  /** @inheritDoc */
  send(body?: unknown): this {
    this._send(body as R);
    return this;
  }

  /** @inheritDoc */
  attachment(filename?: string): this {
    filename = filename ? `; filename="${filename}"` : "";
    return this._setHeader("Content-Disposition", `attachment${filename}`);
  }

  /** @inheritDoc */
  clearCookie(name: string, options?: CookieOptions): this {
    this._clearedCookies[name] = options;
    return this;
  }

  /** @inheritDoc */
  append(key: string, value?: OneOrMore<string>): this {
    return this._setHeader(key, value);
  }

  /** @inheritDoc */
  contentType(type: string): this {
    return this.type(type);
  }

  /** @inheritDoc */
  cookie(key: string, value: unknown, option?: CookieOptions): this {
    if (typeof key === "string") {
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

  /** @inheritDoc */
  download(path: string, _fn?: Errback | string, _err?: unknown, _errBack?: Errback): void {
    logger.warn("unsupported.feature", { fn: "download", path });
  }

  /** @inheritDoc */
  format(obj: unknown): this {
    logger.warn("unsupported.feature", { fn: "format", obj });
    return this;
  }

  /** @inheritDoc */
  get(field: string): string {
    return typeof field === "string" ? (this._headers[field] as string) : undefined;
  }

  /** @inheritDoc */
  header(field: unknown, value?: OneOrMore<string>): this {
    return this._setHeader(field as string, value);
  }

  /** @inheritDoc */
  links(map: unknown): this {
    if (map) {
      const values = [];
      for (const [k, v] of Object.entries(map)) {
        values.push(`<${v}>; rel="${k}"`);
      }
      if (values.length > 0) {
        this._setHeader("Link", values);
      }
    }
    return this;
  }

  /** @inheritDoc */
  location(url: string): this {
    logger.warn("unsupported.feature", { fn: "location", url });
    return this;
  }

  /** @inheritDoc */
  redirect(url: KeyValue, status?: KeyValue): void {
    logger.warn("unsupported.feature", { fn: "redirect", url, status });
  }

  /** @inheritDoc */
  render(
    _v: string,
    _o?: Dict | ((err: Error, html: string) => void),
    _c?: (err: Error, html: string) => void,
  ): void {
    logger.warn("unsupported.feature", { fn: "render" });
  }

  /** @inheritDoc */
  sendFile(path: string, _fn?: unknown, _err?: Errback): void {
    logger.warn("unsupported.feature", { fn: "sendFile", path });
  }

  /** @inheritDoc */
  sendStatus(status: number): this {
    this._status = status;
    this._send();
    return this;
  }

  /** @inheritDoc */
  set(field: unknown, value?: string | string[]): this {
    if (typeof field === "string") {
      return this._setHeader(field, value as string);
    }
    if (field) {
      for (const [k, v] of Object.entries(field)) {
        this._setHeader(k, v as string);
      }
    }
    return this;
  }

  /** @inheritDoc */
  status(status: HttpStatus): this {
    this._status = status;
    return this;
  }

  /** @inheritDoc */
  type(type: string): this {
    if (typeof type === "string") {
      if (type.includes("/")) {
        this.header("Content-Type", type);
      } else {
        this.header("Content-Type", mime.lookup(type) as string);
      }
    }
    return this;
  }

  /** @inheritDoc */
  vary(field: string): this {
    this.header("Vary", field);
    return this;
  }

  // endregion express

  // region static
  // noinspection JSUnusedGlobalSymbols
  /**
   * Set first real response
   *
   * @param {Response} origin
   * */
  static setFirstOrigin(origin: Response): void {
    if (!_firstOrigin && origin) {
      _firstOrigin = origin;
    }
  }

  /**
   * Get first real response
   *
   * @return {Response}
   * */
  static get firstOrigin(): Response {
    return _firstOrigin;
  }

  // endregion static
}
setFqn(MockResponse, FQN);

const logger: Logger = logCommon.of(MockResponse);

type ComposeFnParam = (source: any) => void;
