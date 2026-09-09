import type { UserManagementAccessToken } from "@workos-inc/node";
import { createMiddleware } from "hono/factory";
import { type JWTPayload, jwtVerify } from "jose";
import {
  JOSEError,
  JWKSNoMatchingKey,
  JWKSTimeout,
  JWTClaimValidationFailed,
  JWTExpired,
} from "jose/errors";

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
  } catch (error: unknown) {
    if (error instanceof JWTExpired) {
      return c.json({ message: "Your session has expired. Please sign in again." }, 401);
    }

    if (error instanceof JWTClaimValidationFailed) {
      if (error.claim === "aud" || error.claim === "iss") {
        return c.json({ message: "You don't have access to this resource." }, 403);
      }
    }

    if (error instanceof JWKSTimeout || error instanceof JWKSNoMatchingKey) {
      return c.json({ message: "The service is temporarily unavailable." }, 503);
    }

    if (error instanceof JOSEError) {
      return c.json({ message: "Invalid authentication token provided." }, 401);
    }

    throw error;
  }
});
