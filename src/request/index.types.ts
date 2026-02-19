import { Request } from "express";
import { ResponseData } from "../response/index.js";
import { Arr } from "@leyyo/common";
import { HttpCookies, HttpData, HttpHeaders, HttpParams, HttpQuery } from "../event/index.js";
import { HttpMethod } from "../literal/index.js";

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
