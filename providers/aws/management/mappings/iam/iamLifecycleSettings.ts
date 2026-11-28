import { iamService } from "@nomoss/aws/iam";
import { resourceTiming } from "../../resourceTiming.js";

export const iamLifecycleSettings = {
  service: iamService,
  missingErrors: ["NoSuchEntity"],
  timeout: resourceTiming.iam,
};
