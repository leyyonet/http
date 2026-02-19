import { Application, RequestParamHandler, Router } from "express";
import * as http from "http";
import { MockApplicationLike } from "./index.types.js";
import { HttpEvent } from "../event/index.js";
import { logCommon, Logger, setFqn } from "@leyyo/common";
import { FQN } from "../internal.js";

let _firstOrigin: Application;

// noinspection JSUnusedGlobalSymbols
/**
 * Http mock application, it extends express application
 * */
export class MockApplication extends HttpEvent<Application> implements MockApplicationLike {
  // region properties

  /** @inheritDoc */
  _router: any;

  /** @inheritDoc */
  locals: Record<string, any>;

  /** @inheritDoc */
  map: any;

  /** @inheritDoc */
  mountpath: string | string[];

  constructor(origin?: Application) {
    super(origin);
  }

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
  "m-search"(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "m-search" });
    return this;
  }

  /** @inheritDoc */
  options(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "options" });
    return this;
  }

  /** @inheritDoc */
  patch(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "patch" });
    return this;
  }

  /** @inheritDoc */
  post(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "post" });
    return this;
  }

  /** @inheritDoc */
  propfind(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "propfind" });
    return this;
  }

  /** @inheritDoc */
  proppatch(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "proppatch" });
    return this;
  }

  /** @inheritDoc */
  purge(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "purge" });
    return this;
  }

  /** @inheritDoc */
  put(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "put" });
    return this;
  }

  /** @inheritDoc */
  report(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "report" });
    return this;
  }

  /** @inheritDoc */
  link(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "link" });
    return this;
  }

  /** @inheritDoc */
  unlink(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "unlink" });
    return this;
  }

  /** @inheritDoc */
  all(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "all" });
    return this;
  }

  /** @inheritDoc */
  checkout(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "checkout" });
    return this;
  }

  /** @inheritDoc */
  connect(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "connect" });
    return this;
  }

  /** @inheritDoc */
  copy(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "copy" });
    return this;
  }

  /** @inheritDoc */
  delete(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "delete" });
    return this;
  }

  /** @inheritDoc */
  get(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "get" });
    return this;
  }

  /** @inheritDoc */
  head(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "head" });
    return this;
  }

  /** @inheritDoc */
  lock(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "lock" });
    return this;
  }

  /** @inheritDoc */
  merge(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "merge" });
    return this;
  }

  /** @inheritDoc */
  mkactivity(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "mkactivity" });
    return this;
  }

  /** @inheritDoc */
  mkcol(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "mkcol" });
    return this;
  }

  /** @inheritDoc */
  move(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "move" });
    return this;
  }

  /** @inheritDoc */
  notify(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "notify" });
    return this;
  }

  /** @inheritDoc */
  search(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "search" });
    return this;
  }

  /** @inheritDoc */
  subscribe(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "subscribe" });
    return this;
  }

  /** @inheritDoc */
  trace(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "trace" });
    return this;
  }

  /** @inheritDoc */
  unlock(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "unlock" });
    return this;
  }

  /** @inheritDoc */
  unsubscribe(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "unsubscribe" });
    return this;
  }

  /** @inheritDoc */
  use(..._a: Array<unknown>): this {
    logger.warn("Should not be called", { fn: "use" });
    return this;
  }

  // endregion http-methods

  // region methods
  /** @inheritDoc */
  defaultConfiguration(): void {
    logger.warn("Should not be called", { fn: "defaultConfiguration" });
  }

  /** @inheritDoc */
  disable(_s: string): this {
    logger.warn("Should not be called", { fn: "disable" });
    return this;
  }

  /** @inheritDoc */
  disabled(_s: string): boolean {
    logger.warn("Should not be called", { fn: "disabled" });
    return false;
  }

  /** @inheritDoc */
  enable(_s: string): this {
    logger.warn("Should not be called", { fn: "enable" });
    return this;
  }

  /** @inheritDoc */
  enabled(_s: string): boolean {
    logger.warn("Should not be called", { fn: "enabled" });
    return false;
  }

  /** @inheritDoc */
  engine(
    _e: string,
    _f: (path: string, options: object, callback: (e: any, rendered?: string) => void) => void,
  ): this {
    logger.warn("Should not be called", { fn: "engine" });
    return this;
  }

  /** @inheritDoc */
  init(): void {
    logger.warn("Should not be called", { fn: "init" });
  }

  /** @inheritDoc */
  listen(
    _p?: any,
    _h?: string | (() => void),
    _b?: number | (() => void),
    _c?: () => void,
  ): http.Server {
    logger.warn("Should not be called", { fn: "listen" });
    return undefined;
  }

  /** @inheritDoc */
  param(
    name: string | string[] | ((name: string, matcher: RegExp) => RequestParamHandler),
    handler?: RequestParamHandler,
  ): this {
    return this._origin?.param(name as string, handler) as unknown as this;
  }

  /** @inheritDoc */
  path(): string {
    return this._origin?.path();
  }

  /** @inheritDoc */
  render(
    _n: string,
    _o?: object | ((err: Error, html: string) => void),
    _c?: (err: Error, html: string) => void,
  ): void {
    logger.warn("Should not be called", { fn: "render" });
  }

  /** @inheritDoc */
  route(_p: unknown): any {
    logger.warn("Should not be called", { fn: "route" });
  }

  /** @inheritDoc */
  set(_s: string, _v: any): this {
    logger.warn("Should not be called", { fn: "set" });
    return this;
  }
  // endregion methods

  // region static
  // noinspection JSUnusedGlobalSymbols
  /**
   * Set real application
   *
   * @param {Application} origin
   * */
  static setFirstOrigin(origin: Application): void {
    if (!_firstOrigin && origin) {
      _firstOrigin = origin;
    }
  }

  /**
   * Get real application
   *
   * @return {Application}
   * */
  static get firstOrigin(): Application {
    return _firstOrigin;
  }

  // endregion static
}
setFqn(MockApplication, FQN);
const logger: Logger = logCommon.of(MockApplication);
