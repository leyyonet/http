import type {Application, Request, Response} from "express";
import type {MockResponseResolve, ResponseData} from "./response";
import type {MockServiceRequest} from "./request";
import type {Dict} from "@leyyo/common";

export type HttpMockTuple = [Request, Response, Application];
export interface HttpMockLike {
    init(req: Request): void;
    fork(): HttpMockTuple;
    forBulk<R = ResponseData>(req: Request, service: MockServiceRequest<R>, resolver: MockResponseResolve<R>, custom?: Dict): HttpMockTuple;
}
