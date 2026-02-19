import { EventEmitter } from "node:events";
import { RequestParamHandler, Router } from "express";
import type http from "http";

/**
 * Http mock application, it extends express application
 * */
export interface MockApplicationLike extends EventEmitter {
  // region proeprties

  /** @inheritDoc */
  _router: any;

  /** @inheritDoc */
  locals: Record<string, any>;

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
  // endregion proeprties

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
