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
  stages: [
    // Ramp up to 12 users over 30 seconds
    { duration: "1m", target: 12 },
    // Maintain steady state of 12 users over the next two minutes
    { duration: "2m", target: 12 },
    // Ramp down to 0 users over the next 30 seconds
    { duration: "30s", target: 0 },
  ],
};

export default function test() {
  // Get a random user from data that isn't currently being tested
  const user = data[vu.idInTest - 1];

  logger.info(
    `Running iteration ${vu.iterationInInstance} for user id ${user.id} with name ${user.first_name} ${user.last_name}`
  );

  getUser(user);
  updateUser(user);
  deleteUser(user.id);
}
