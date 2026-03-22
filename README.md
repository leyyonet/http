# Leyyo: Http
> Http common library for Leyyo framework
> It manages fake express request/response manipulation especially for not-created request instances
> 
> Samples:
> - consuming events
> - running cron jobs
> - CLI usage
> 
> It also provides most used http related enumerations

## Import
- `npm i @leyyo/http`

## Blueprint

#### Items
| Type        | Name                                                                | Props       | Description               |
|-------------|---------------------------------------------------------------------|-------------|---------------------------|
| `class`     | [MockApplication](src/items/mock-application.ts)                    | `f`         | application               |
| `class`     | [MockRequest](src/items/mock.request.ts)                            | `f`         | request                   |
| `class`     | [MockResponse](src/items/mock-response.ts)                          | `f`         | response                  |
| `abstract`  | [HttpEvent](src/items/http-event.ts)                                | `f`         | event for above           |
| `instance`  | [httpCommon](src/items/http-common.ts)                              | `f`         | http utility              |
| `literal`   | [HttpMethod](./src/literal/http-method.ts)                          | `f` `p` `i` | methods                   |
| `literal`   | [HttpPlace](./src/literal/http-place.ts)                            | `f` `p` `i` | places                    |
| `literal`   | [HttpPlaceExtended](./src/literal/http-place-extended.ts)           | `f` `p` `i` | places with file & cookie |
| `literal`   | [HttpProtocol](./src/literal/http-protocol.ts)                      | `f` `p` `i` | protocols                 |
| `enum`      | [HttpStateError](./src/literal/http-state-error.ts)                 | `f` `p` `i` | error state (4xx, 5xx)    |
| `enum`      | [HttpStateInformational](./src/literal/http-state-informational.ts) | `f` `p` `i` | information state (1xx)   |
| `enum`      | [HttpStateRedirect](./src/literal/http-state-redirect.ts)           | `f` `p` `i` | redirect state (3xx)      |
| `enum`      | [HttpStateSuccess](./src/literal/http-state-success.ts)             | `f` `p` `i` | success state (2xx)       |
| `predictor` | [leyyoHttpPredictor](src/loader/leyyo-http-predictor.ts)            |             |                           |
| `lazy`      | [leyyoHttpLazy](src/loader/leyyo-http-lazy.ts)                      |             |                           |
> Props: `p`: **predictor**, `f`: **FQN**, `e`: **Emit**, `i`: **I18N**

### Dependencies
| Name            | Framework | Description |
|-----------------|-----------|-------------|
| `@leyyo/common` | √         |             |
| `mime-types`    | -         |             |

## Standards
- Language: `TS`
- Eslint: `Yes`
- Static Code Analysis: `Yes` *IntelliJ Code Inspections*
- DDD - Document Driven: `Yes`
- DDD - Domain Driven: `Yes`
- EDD - Exception Driven: `Yes`
- TDD - Test Driven: `Yes`
- LDD - Log Driven: `Yes`
- 12FA - 12 Factor-App: `50%` *Partially*

---
### Prepared by
- Mustafa Yelmer
- mustafayelmer(at)gmail.com
- `2022-07-08`
