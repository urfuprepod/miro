import { setupWorker } from "msw/browser";
import { boardsHandlers } from "./handlers/board";
import { authHandlers } from "./handlers/auth";

export const worker = setupWorker(...boardsHandlers, ...authHandlers);
