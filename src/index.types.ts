import {Application, Request, Response} from "express";
import {MockResponseResolve, ResponseData} from "./response/index.js";
import {MockServiceRequest} from "./request/index.js";
import {Dict} from "@leyyo/common";

export type HttpMockTuple = [Request, Response, Application];

/**
 * Http mock interface
 * */
export interface HttpMockLike {

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
    forBulk<R = ResponseData>(req: Request, service: MockServiceRequest<R>, resolver: MockResponseResolve<R>, custom?: Dict): HttpMockTuple;
}
