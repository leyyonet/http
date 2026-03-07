import { Application, Request } from "express";
import { MockApplication } from "./index.js";
import { Rec, setFqn } from "@leyyo/common";
import { PCK } from "../internal.js";
import {
  HttpCommonLike,
  HttpMockTuple,
  MockResponseResolve,
  MockServiceRequest,
  ResponseData,
} from "../type.js";
import { MockRequest } from "./mock-request.js";
import { MockResponse } from "./mock-response.js";

/**
 * Http common class
 * */
class HttpCommon implements HttpCommonLike {
  /**
   * Is it initialized?
   * */
  private _initialized: boolean;

  /** @inheritDoc */
  init(req: Request): void {
    if (this._initialized) {
      return;
    }
    this._initialized = true;
    MockRequest.setFirstOrigin(req);
    MockResponse.setFirstOrigin(req.res);
    MockApplication.setFirstOrigin(req.app);
  }

  /** @inheritDoc */
  fork(): HttpMockTuple {
    return [MockRequest.firstOrigin, MockResponse.firstOrigin, MockApplication.firstOrigin];
  }

  /** @inheritDoc */
  forBulk<R = ResponseData>(
    req: Request,
    service: MockServiceRequest<R>,
    resolver: MockResponseResolve<R>,
    custom?: Rec,
  ): HttpMockTuple {
    const newReq = new MockRequest(service, req, custom);
    const newRes = new MockResponse(resolver, req.res);
    const newApp =
      MockApplication.firstOrigin ?? (new MockApplication(req.app) as unknown as Application);
    return [newReq, newRes, newApp];
  }
}
setFqn(HttpCommon, PCK);

// noinspection JSUnusedGlobalSymbols
/**
 * Http common instance
 *
 * @type {HttpCommonLike}
 * */
export const httpCommon: HttpCommonLike = new HttpCommon();
