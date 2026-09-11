import { WorkOS } from "@workos-inc/node";
import { createRemoteJWKSet } from "jose";

import { env } from "../data/env.ts";

const workos = new WorkOS(env.WORKOS_API_KEY);

export const JWKS = createRemoteJWKSet(
  new URL(workos.userManagement.getJwksUrl(env.WORKOS_CLIENT_ID)),
);

export async function getUserName(userId: string) {
  try {
    const user = await workos.userManagement.getUser(userId);

    return `${user.firstName} ${user.lastName}`;
  } catch {
    return null;
  }
}
