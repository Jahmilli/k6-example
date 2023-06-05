import { SharedArray } from "k6/data";
import { scenario } from "k6/execution";
import { users } from "../data/users";
import { logger } from "../utils/logger";
import { USER_ITERATIONS, VUs } from "./config";

const data = new SharedArray("users", function () {
  return users;
});

export const options = {
  scenarios: {
    "use-all-the-data": {
      executor: "shared-iterations",
      vus: VUs,
      iterations: VUs,
      maxDuration: "1h",
    },
  },
};

export default function () {
  console.log("hi");
}
