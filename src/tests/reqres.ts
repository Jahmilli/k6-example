import { SharedArray } from "k6/data";
import { vu } from "k6/execution";
import { Options } from "k6/options";
import { deleteUser, getUser, updateUser } from "../apis/reqres";
import { users } from "../data/users";
import { logger } from "../utils/logger";

const data = new SharedArray("users", function () {
  return users;
});

export const options: Options = {
  scenarios: {
    login: {
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 10,
      maxDuration: '1h30m',
    },
  },
};

export default function test () {
  // Get a random user from data that isn't currently being tested
  const user = data[vu.idInTest - 1];

  logger.info(
    `Running iteration ${vu.iterationInInstance} for user id ${user.id} with name ${user.first_name} ${user.last_name}`
  );

  getUser(user);
  updateUser(user);
  deleteUser(user.id);
}
