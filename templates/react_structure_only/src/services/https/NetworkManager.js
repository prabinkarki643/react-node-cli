import axios, { AxiosRequestConfig, AxiosPromise } from "axios";
import httpUrl from "./httpUrl";
import { log } from "../../utils/app.debug";

const appAxiosInstance = axios.create({
  baseURL: httpUrl.API_URL,
});

/**
 * Request interceptor that will add auth token to every request,
 * Uncomment below line if you want to send token in every request.
 */
appAxiosInstance.interceptors.request.use(function (config) {
  // const token = sessionStore.getAccessToken //Get token from where you have stored
  // if (token) {
  //   config.headers["Authorization"] = `Bearer ${token}`;
  // }
  return config;
});

/**
 * Any request to server with proper error handeling and request interceptor to add token to every request
 * This function can be very useful if you want to do some kind of global operation such as : refresh token on unauthorized, global error handling etc.
 * This function will accept all params that axios accepts.
 * @param {AxiosRequestConfig} config
 * @returns {AxiosPromise<any>}
 */
export function AppWebRequest(config) {
  var responseError = {};
  return appAxiosInstance(config).catch((error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Case for refresh token
        // alert("Your session is invalid. Please log in again")
        // sessionStore.logout() //Logout user from session
      }
      log("error response", error.response);
      responseError = {
        ...error.response?.data,
        ...getProperErrorMessageFromError(error.response?.data),
        status: error.response.status,
        headers: error.response.headers,
      };
    } else if (error.request) {
      responseError = {
        ...error,
        message: "Can not made connection to the server",
      };
    } else {
      responseError = {
        ...error,
        message: "Unexpected error occured!",
      };
    }
    log("exactual error", error);
    log("responseError", responseError);
    return Promise.reject(responseError);
  });
}

/**
 * Get the proper message from error obj, This way all our apicall error will have message filed in it.
 * @param {any} error
 * @returns {{message:string,errorData:any[]}}
 */
function getProperErrorMessageFromError(error) {
  const errorObj = {
    message: "",
    errorData: [],
  };

  if (typeof error?.message == "string") {
    errorObj.message = error?.message;
  } else if (
    Array.isArray(error?.message) &&
    typeof error?.message[0] == "string"
  ) {
    errorObj.errorData = error?.message;
    errorObj.message = error?.message[0];
  } else {
    errorObj.message = error?.error || "Unexpected error occures";
  }

  return errorObj;
}
