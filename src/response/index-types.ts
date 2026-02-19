import { CookieOptions, Response } from "express";
import { Arr, Dict, HttpStatus } from "@leyyo/common";
import { HttpData, HttpHeaders } from "../event/index.js";

/**
 * Response local storage
 * */
export interface ResponseLocal {}

/**
 * Response cookies
 * */
export type ResponseCookies = Dict<ResponseCookie>;

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
  clearedCookies: Dict<CookieOptions>;

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
