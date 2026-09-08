import type { UserManagementAccessToken } from "@workos-inc/node";
import { createMiddleware } from "hono/factory";
import { type JWTPayload, jwtVerify } from "jose";

import { env } from "../data/env.js";
import { JWKS } from "../lib/workos.js";

type AccessTokenClaims = JWTPayload & UserManagementAccessToken;

export type AccessTokenEnv = {
  Variables: {
    session: {
      userId: string;
      sessionId: string;
      organizationId: string | null;
      role: string | null;
      roles: string[];
      permissions: string[];
    };
  };
};

export const requireAuth = createMiddleware<AccessTokenEnv>(async (c, next) => {
  const header = c.req.header("Authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token || token.trim() === "") {
    return c.json({ error: "missing_token" }, 401);
  }

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      audience: env.WORKOS_TOKEN_AUDIENCE,
      issuer: env.WORKOS_TOKEN_ISSUER,
      clockTolerance: 5,
    });

    const claims = payload as AccessTokenClaims;

    if (!claims.sub || !claims.sid) {
      return c.json({ error: "invalid_token" }, 401);
    }

    c.set("session", {
      userId: claims.sub,
      sessionId: claims.sid,
      organizationId: claims.org_id ?? null,
      role: claims.role ?? null,
      roles: claims.roles ?? [],
      permissions: claims.permissions ?? [],
    });

    await next();
  } catch (error: any) {
    const code = error?.code;

    if (code === "ERR_JWT_EXPIRED") {
      return c.json({ error: "token_expired" }, 401);
    }

    if (code === "ERR_JWKS_TIMEOUT") {
      c.header("Retry-After", "5");

      return c.json({ error: "verification_unavailable" }, 503);
    }

    if (typeof code === "string" && code.startsWith("ERR_")) {
      return c.json({ error: "invalid_token" }, 401);
    }

    throw error;
  }
});
