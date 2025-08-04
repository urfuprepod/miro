import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { CONFIG } from "@/shared/model/config";
import type { ApiPaths, ApiSchemas } from "./schema";
import { useSession } from "../model/session";

export const fetchClient = createFetchClient<ApiPaths>({
    baseUrl: CONFIG.API_BASE_URL,
});

export const rqClient = createClient(fetchClient);

export const publicFetchClient = createFetchClient<ApiPaths>({
    baseUrl: CONFIG.API_BASE_URL,
});

export const publicRqClient = createClient(fetchClient);

fetchClient.use({
    onRequest({ request }) {
        const token = useSession.getState().token;
        if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
        } else {
            return new Response(
                JSON.stringify({
                    code: "Not Authorized",
                    message: 'You are not authorized'
                } as ApiSchemas["Error"]), {
                  status: 401,
                  headers: {
                    "Content-Type": 'application/json'
                  }
                }
            );
        }
    },
});
