import { Prisma } from "../generated/prisma/client.ts";

const STATUS_BY_CODE: Record<string, number> = {
	P1000: 401,
	P1001: 503,
	P1002: 503,
	P1003: 503,
	P1013: 400,
	P2000: 400,
	P2002: 409,
	P2003: 409,
	P2010: 400,
	P2011: 400,
	P2017: 409,
	P2024: 503,
	P2025: 404,
	P2034: 409,
};

const MESSAGE_BY_CODE: Record<string, string> = {
	P1000: "Database credentials are invalid.",
	P1001: "Database server is unreachable.",
	P1002: "Database connection timed out.",
	P1003: "Database does not exist.",
	P1013: "The provided database connection string is invalid.",
	P2000: "The provided value is too long for the column type.",
	P2002: "Unique constraint failed.",
	P2003: "Foreign key constraint failed.",
	P2010: "Raw query failed.",
	P2011: "Required field is missing.",
	P2017: "The selected records are not connected by this relation.",
	P2024: "Timed out while waiting for a database connection from the pool.",
	P2025: "One or more required records were not found.",
	P2034: "Transaction failed due to a write conflict. Please retry again.",
};

export type PrismaError = {
	status: number;
	error: { code: string; message: string };
};

export function handlePrismaError(error: unknown): PrismaError | null {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		return {
			status: STATUS_BY_CODE[error.code] || 400,
			error: {
				code: error.code,
				message: MESSAGE_BY_CODE[error.code] || error.message,
			},
		};
	}

	if (error instanceof Prisma.PrismaClientInitializationError) {
		const code = error.errorCode || "PRISMA_INITIALIZATION_ERROR";

		return {
			status: 503,
			error: {
				code: code,
				message: "Prisma failed to initialize a database connection.",
			},
		};
	}

	if (error instanceof Prisma.PrismaClientValidationError) {
		return {
			status: 400,
			error: {
				code: "PRISMA_VALIDATION_ERROR",
				message: "Prisma rejected the query shape or argument types.",
			},
		};
	}

	return null;
}

export function isPrismaError(result: unknown): result is PrismaError {
	if (typeof result !== "object" || result === null) return false;

	if (!("status" in result) || !("error" in result)) return false;

	const error = result.error;

	if (typeof error !== "object" || error === null) return false;

	return "code" in error && "message" in error;
}
