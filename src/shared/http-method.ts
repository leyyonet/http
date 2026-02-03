const literals = [
    'delete',
    'get',
    'head',
    'link',
    'options',
    'patch',
    'post',
    'purge',
    'put',
    'unlink',
] as const;
/**
 * Http Method
 * */
type _HttpMethod = typeof literals[number];
export type HttpMethod = _HttpMethod | Uppercase<_HttpMethod>
/**
 * @type {ReadonlyArray<HttpMethod>}
 * */
export const HttpMethodItems: ReadonlyArray<HttpMethod> = literals;

