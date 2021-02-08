/**
 * library that will build, process the api requests
 *
 * @format
 * @author: Alok Yaday & Joel D'Souza
 * @package ajax
 */

import { fromNullable, tryCatch } from "./functional";

/**
 * type of form values that ajax function will get from react component.
 */
export interface RequestForm<T> {
  method: string;
  body: T;
  headers: Headers;
}

/**
 * type specification for integration function that will call the backend.
 */
export interface AjaxFunction<R> {
  <T>(form?: T): Promise<R>;
}

/**
 * interface for simple timeout promise function used to cut off api call if it crosses the time.
 */
export interface AjaxTimeout {
  <T>(time: number, promise: Promise<T>): Promise<T>;
}

/**
 * ajax function type which will do a generic typed request and get a generic typed response.
 */
export interface Ajax {
  <T, R>(url: string, form?: Partial<RequestForm<T>>): Promise<R>;
}

/**
 * ajax configuration object type, right now it is all mandatory for proper functioning.
 */
export interface AjaxConfig {
  client: string;
  onNetworkError: () => void;
  onServerError: () => void;
  onDeAuthentication: () => void;
  timeout: number;
}

/**
 *  semi group for request object building
 * @param req pass in the request init object
 */
function request(req: RequestInit = {}) {
  return {
    req,
    add: (o: RequestInit) => request({ ...req, ...o }),
    empty: () => request({}),
    get: () => req,
  };
}

/**
 * builds the request depending on the data we receive from the client.
 * @param form data that we get from the frontend
 */
const requestBuilder = <T>(form: Partial<RequestForm<T>>): RequestInit => {
  // check for keys and create a request init object
  const req = fromNullable(form)
    .fold(
      (e) =>
        request({
          method: "GET",
        }),
      (s) => request({ method: s.method, body: JSON.stringify(s.body) })
    )
    .add({
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": "en-US;en-IN;q=0.9,en-US;q=0.7,en-GB;q=0.6",
      }),
    })
    .get();
  // logic
  return req;
};

/**
 *
 * @param url endpoint of the service
 * @param client server address
 */
const getUrl = (url: string, client: string): string => {
  return url.startsWith("http") ? url : `${client}${url}`;
};

/**
 *
 * @param config contains server configuration for ajax
 */
const ajaxBuilder = (config: AjaxConfig) => ajax(config);

/**
 * time out for an async task.
 * particularly useful to wrap api req to have a time limit.
 * @param time specify the max time request should go
 * @param promise task that needs to be done.
 */
const timeout: AjaxTimeout = (time, promise) => {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      reject("");
    }, time);
    promise.then(
      (res) => {
        clearTimeout(id);
        resolve(res);
      },
      (err) => {
        clearTimeout(id);
        reject(err);
      }
    );
  });
};

/**
 *
 * @param client server endpoint
 */
const ajax = (config: AjaxConfig): Ajax => (url, form) => {
  const targetUrl = getUrl(url, config.client);
  const options = requestBuilder(form!);
  return timeout(
    config.timeout,
    new Promise((resolve, reject) => {
      fetch(targetUrl, options)
        .then((response) => {
          const { status } = response;
          if (!response.ok && status >= 400 && status < 500) {
            if (status === 401) {
              config.onDeAuthentication();
            }
            response.text().then((t) =>
              tryCatch(() => JSON.parse(t)).fold(
                (err) => reject(t),
                (data) => reject(data)
              )
            );
          }

          // server error check
          if (status >= 500 && status < 599) {
            response.json().then((data) => {
              config.onServerError();
              reject(data);
            });
          }
          if (response.ok) {
            response.json().then((d) => resolve(d));
          }
        })
        .catch((error) => {
          config.onNetworkError();
          tryCatch(() => JSON.parse(error)).fold(
            (err) => reject(error),
            (data) => reject(data)
          );
        });
    })
  );
};

export default ajaxBuilder;
