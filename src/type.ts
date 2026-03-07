import {
  Application,
  CookieOptions,
  Request,
  RequestParamHandler,
  Response,
  Router,
} from "express";
import { Arr, HttpStatus, OneOrMore, Rec } from "@leyyo/common";
import { HttpMethod } from "./literal/index.js";
import { EventEmitter } from "node:events";
import * as http from "node:http";

// region common
export type HttpMockTuple = [Request, Response, Application];

/**
 * Http mock interface
 * */
export interface HttpCommonLike {
  /**
   * Initialize http mock
   *
   * @param {Request} req
   * */
  init(req: Request): void;

  /**
   * Fork http mock as tuple
   *
   * @return {HttpMockTuple}
   * */
  fork(): HttpMockTuple;

  /**
   * Run it for http bulk
   *
   * @param {Request} req - real request
   * @param {MockServiceRequest} service - service payloads
   * @param {MockResponseResolve} resolver - response resolver to collect response
   * @param {object} custom - custom parameters
   * @return {HttpMockTuple}
   * */
  forBulk<R = ResponseData>(
    req: Request,
    service: MockServiceRequest<R>,
    resolver: MockResponseResolve<R>,
    custom?: Rec,
  ): HttpMockTuple;
}
// endregion common

// region event
/**
 * Http path params parameters
 * */
export interface HttpParams {
  [key: string]: string | undefined;
}

// { string; remember: boolean; }
/**
 * Http cookie parameters
 * */
export interface HttpCookies {
  [key: string]: string | undefined;
}

/**
 * Http headers
 * */
export interface HttpHeaders {
  [key: string]: OneOrMore<string> | undefined;
}

/**
 * Http query parameters
 * */
export interface HttpQuery {
  [key: string]: undefined | OneOrMore<string | HttpQuery>;
}

/**
 * Http data
 * */
export interface HttpData {}

export type _StreamCompose = (source: any) => void;
export type _StreamBool = (data: any, options?: _StreamAbort) => boolean | Promise<boolean>;
export type _StreamVoid = (data: any, options?: _StreamAbort) => void | Promise<void>;
export type _StreamGeneric<T> = (data: any, options?: _StreamAbort) => data is T;
export type _StreamReduce<T> = (previous: any, data: any, options?: _StreamAbort) => T;

export interface _StreamIterator {
  destroyOnReturn?: boolean;
}

export interface _StreamAbort {
  signal: AbortSignal;
}
// endregion event

// region app
/**
 * Http mock application, it extends express application
 * */
export interface MockApplicationLike extends EventEmitter {
  // region properties

  /** @inheritDoc */
  _router: any;

  /** @inheritDoc */
  locals: Rec;

  /** @inheritDoc */
  map: any;

  /** @inheritDoc */
  mountpath: string | string[];

  /** @inheritDoc */
  resource: any;

  /** @inheritDoc */
  router: Router;

  /** @inheritDoc */
  routes: any;

  /** @inheritDoc */
  settings: any;

  /** @inheritDoc */
  stack: any[];
  // endregion properties

  // region http-methods

  /** @inheritDoc */
  "m-search"(...a: Array<unknown>): this;

  /** @inheritDoc */
  options(...a: Array<unknown>): this;

  /** @inheritDoc */
  patch(...a: Array<unknown>): this;

  /** @inheritDoc */
  post(...a: Array<unknown>): this;

  /** @inheritDoc */
  propfind(...a: Array<unknown>): this;

  /** @inheritDoc */
  proppatch(...a: Array<unknown>): this;

  /** @inheritDoc */
  purge(...a: Array<unknown>): this;

  /** @inheritDoc */
  put(...a: Array<unknown>): this;

  /** @inheritDoc */
  report(...a: Array<unknown>): this;

  /** @inheritDoc */
  link(...a: Array<unknown>): this;

  /** @inheritDoc */
  unlink(...a: Array<unknown>): this;

  /** @inheritDoc */
  all(...a: Array<unknown>): this;

  /** @inheritDoc */
  checkout(...a: Array<unknown>): this;

  /** @inheritDoc */
  connect(...a: Array<unknown>): this;

  /** @inheritDoc */
  copy(...a: Array<unknown>): this;

  /** @inheritDoc */
  delete(...a: Array<unknown>): this;

  /** @inheritDoc */
  get(name: string): any;

  /** @inheritDoc */
  get(...a: Array<unknown>): this;

  /** @inheritDoc */
  head(...a: Array<unknown>): this;

  /** @inheritDoc */
  lock(...a: Array<unknown>): this;

  /** @inheritDoc */
  merge(...a: Array<unknown>): this;

  /** @inheritDoc */
  mkactivity(...a: Array<unknown>): this;

  /** @inheritDoc */
  mkcol(...a: Array<unknown>): this;

  /** @inheritDoc */
  move(...a: Array<unknown>): this;

  /** @inheritDoc */
  notify(...a: Array<unknown>): this;

  /** @inheritDoc */
  search(...a: Array<unknown>): this;

  /** @inheritDoc */
  subscribe(...a: Array<unknown>): this;

  /** @inheritDoc */
  trace(...a: Array<unknown>): this;

  /** @inheritDoc */
  unlock(...a: Array<unknown>): this;

  /** @inheritDoc */
  unsubscribe(...a: Array<unknown>): this;

  /** @inheritDoc */
  use(...a: Array<unknown>): this;

  // endregion http-methods

  // region methods

  /** @inheritDoc */
  defaultConfiguration(): void;

  /** @inheritDoc */
  disable(_s: string): this;

  /** @inheritDoc */
  disabled(_s: string): boolean;

  /** @inheritDoc */
  enable(_s: string): this;

  /** @inheritDoc */
  enabled(_s: string): boolean;

  /** @inheritDoc */
  engine(
    _e: string,
    _f: (path: string, options: object, callback: (e: any, rendered?: string) => void) => void,
  ): this;

  /** @inheritDoc */
  init(): void;

  /** @inheritDoc */
  listen(
    _p?: any,
    _h?: string | (() => void),
    _b?: number | (() => void),
    _c?: () => void,
  ): http.Server;

  /** @inheritDoc */
  param(
    name: string | string[] | ((name: string, matcher: RegExp) => RequestParamHandler),
    handler?: RequestParamHandler,
  ): this;

  /** @inheritDoc */
  path(): string;

  /** @inheritDoc */
  render(
    _n: string,
    _o?: object | ((err: Error, html: string) => void),
    _c?: (err: Error, html: string) => void,
  ): void;

  /** @inheritDoc */
  route(_p: unknown): any;

  /** @inheritDoc */
  set(_s: string, _v: any): this;
  // endregion methods
}
// endregion app

// region request
export interface RequestLocal {}

export type RequestBody = Arr | HttpData | string | unknown;
export type RequestErrorCallback = (error?: Error) => void;

/**
 * It's used for bulk http calls
 * */
export interface MockServiceRequest<B extends RequestBody = RequestBody> {
  /**
   * Http method
   * */
  method: HttpMethod;
  /**
   * Local path
   * */
  url: string;

  /**
   * Request payload
   * */
  body?: B;

  /**
   * Custom headers
   * */
  headers?: HttpHeaders;

  /**
   * Client cookies
   * */
  cookies?: HttpCookies;

  /**
   * Server cookies
   * */
  signedCookies?: HttpCookies;
}

/**
 * Http mock request, it extends express request
 * */
export interface MockRequestLike<
  B extends RequestBody = RequestBody,
  L extends RequestLocal = RequestLocal,
> extends Request<HttpParams, B, ResponseData, HttpQuery, L> {
  /**
   * Indicates that it's fake/mock request
   * */
  readonly isFake?: boolean;

  /**
   * Temporary local storage
   * */
  readonly locals?: L;

  /**
   * Get query parameter
   * */
  param(name: string, defaultValue?: any): string;

  /**
   * Custom properties
   * */
  [another: string]: unknown;
}

export interface PipeOption {
  end?: boolean;
}
// endregion request

// region response
/**
 * Response local storage
 * */
export interface ResponseLocal {}

/**
 * Response cookies
 * */
export type ResponseCookies = Rec<ResponseCookie>;

/**
 * Response data
 * */
export type ResponseData = Arr | HttpData | string | number | boolean | unknown;

/**
 * Response error callback
 * */
export type ResponseErrorCallback = (e?: Error) => void;

/**
 * Service mock result for http bulk calls
 * */
export interface MockServicePreparedResponse<R = ResponseData> {
  /**
   * Response status
   * */
  status: HttpStatus;

  /**
   * Response status message
   * */
  statusMessage: string;

  /**
   * Response headers
   * */
  headers: HttpHeaders;

  /**
   * Response cookies
   * */
  cookies: ResponseCookies;

  /**
   * Response cleared cookies, Them should be cleared after all calls
   * */
  clearedCookies: Rec<CookieOptions>;

  /**
   * Response data
   * */
  data: R;
}

/**
 * Response resolver lambda
 * */
export type MockResponseResolve<R> = (dto: MockServicePreparedResponse<R>) => void;

/**
 * Response cookie with options
 * */
export interface ResponseCookie {
  value: string | number;
  opt: CookieOptions;
}

/**
 * Http mock response, it extends express response
 * */
export interface MockResponseLike<
  R extends ResponseData,
  L extends ResponseLocal = ResponseLocal,
> extends Response<R, L> {
  /**
   * Indicates that it's fake/mock response
   * */
  readonly isFake: boolean;

  [another: string]: unknown;
}
// endregion response
