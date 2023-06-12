import { check } from "k6";
import http, { StructuredRequestBody } from "k6/http";
import { Trend } from "k6/metrics";
import { logWaitingTime } from "../utils/logger";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

// Metrics that we want to track
const metrics = {
  getUserResponseTime: new Trend("get_user_response_time", true),
  updateUserResponseTime: new Trend("update_user_response_time", true),
  deleteUserResponseTime: new Trend("delete_user_response_time", true),
};

// Endpoint that we test against
const reqResUrl = "https://reqres.in/api";

// Common response type for all requests
type Response<T> = {
  data: T;
  statusCode: number;
};

/**
 * getUser makes a GET request to the /users/:id endpoint and asserts
 * that the response is 200 and that the user id and email match the
 * user object that was passed in. 
 * @param user 
 * @returns Response<User>
 */
export const getUser = (user: User): Response<User> => {
  const url = reqResUrl;
  const params = {
    headers: {},
  };

  const res = http.get(`${url}/users/${user.id}`, params);
  const jsonRes = res.json() as { data: User };
  logWaitingTime({
    metric: metrics.getUserResponseTime,
    response: res,
    messageType: `Get User`,
  });

  check(res, {
    "Get User By Id: is 200": (r) => r.status === 200,
    "Get User By Id: has correct id": (_) => jsonRes.data.id === user.id,
    "Get User By Id: has correct email": (_) =>
      jsonRes.data.email === user.email,
  });

  return {
    data: jsonRes.data,
    statusCode: res.status,
  };
};

type UpdateUserResponse = {
  updatedAt: string;
  job: string;
}

export const updateUser = (user: User): Response<UpdateUserResponse> => {
  const url = reqResUrl;
  const params = {
    headers: {},
  };
  const jobTitle = "QA Engineer";
  const payload: StructuredRequestBody = {
    job: jobTitle,
  };


  const res = http.patch(`${url}/users/${user.id}`, payload, params);
  const jsonRes = res.json() as UpdateUserResponse
  logWaitingTime({
    metric: metrics.updateUserResponseTime,
    response: res,
    messageType: `Update User`,
  });

  check(res, {
    "Update User By Id: is 200": (r) => r.status === 200,
    "Update User By Id: has correct updatedAt": (_) => jsonRes.updatedAt !== "",
    "Update User By Id: has correct job title": (_) => jsonRes.job === jobTitle,
  });

  return {    
    data: jsonRes,
    statusCode: res.status,
  };
};

export const deleteUser = (userId: number): Response<{}> => {
  const url = reqResUrl;

  const res = http.del(`${url}/users/${userId}`);
  logWaitingTime({
    metric: metrics.deleteUserResponseTime,
    response: res,
    messageType: `Delete User`,
  });

  check(res, {
    "Delete User By Id: is 204": (r) => r.status === 204,
  });

  return {
    data: {},
    statusCode: res.status,
  };
};
