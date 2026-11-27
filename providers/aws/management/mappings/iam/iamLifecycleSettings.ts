import { iamService } from "@tradedal/aws-client-iam";
import { resourceTiming } from "../../resourceTiming.js";

export const iamLifecycleSettings = {
  service: iamService,
  missingErrors: ["NoSuchEntity"],
  timeout: resourceTiming.iam,
};
