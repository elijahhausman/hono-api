import { z } from "zod";

// Enums

export const outingStatusSchema = z.enum([
	"DRAFT",
	"PUBLISHED",
	"CLOSED",
	"CANCELLED",
]);
export type OutingStatus = z.infer<typeof outingStatusSchema>;

export const outingDifficultySchema = z.enum(["EASY", "MEDIUM", "HARD"]);
export type OutingDifficulty = z.infer<typeof outingDifficultySchema>;

export const outingTypeSchema = z.enum(["HIKING", "BACKPACKING"]);
export type OutingType = z.infer<typeof outingTypeSchema>;

export const signupStatusSchema = z.enum(["GOING", "CANCELLED"]);
export type SignupStatus = z.infer<typeof signupStatusSchema>;

export const alertVariantSchema = z.enum(["DEFAULT", "WARNING", "DESTRUCTIVE"]);
export type AlertVariant = z.infer<typeof alertVariantSchema>;

// Outing

export const outingSchema = z.object({
	id: z.string().min(1),
	slug: z.string().min(1),
	title: z.string().min(1),
	description: z.string().max(1024).nullable(),
	distance: z.number().positive(),
	cost: z.number().nonnegative().nullable(),

	startDate: z.coerce.date(),
	endDate: z.coerce.date().nullable(),
	startTime: z.coerce.date().nullable(),
	location: z.string().nullable(),

	status: outingStatusSchema,
	difficulty: outingDifficultySchema,
	type: outingTypeSchema,

	publishedAt: z.coerce.date().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type Outing = z.infer<typeof outingSchema>;

export const createOutingSchema = outingSchema.omit({
	id: true,
	publishedAt: true,
	createdAt: true,
	updatedAt: true,
});
export const updateOutingSchema = createOutingSchema.partial();

export type CreateOuting = z.infer<typeof createOutingSchema>;
export type UpdateOuting = z.infer<typeof updateOutingSchema>;

// Signup

export const outingSignupSchema = z.object({
	id: z.string().min(1),
	outingId: z.string().min(1),
	userId: z.string().min(1),
	status: signupStatusSchema,
	createdAt: z.coerce.date(),
});

export type OutingSignup = z.infer<typeof outingSignupSchema>;

export const createOutingSignupSchema = outingSignupSchema.omit({
	id: true,
	createdAt: true,
});

export type CreateOutingSignup = z.infer<typeof createOutingSignupSchema>;

// Photo

export const outingPhotoSchema = z.object({
	id: z.string().min(1),
	outingId: z.string().min(1),
	userId: z.string().nullable(),
	url: z.url(),
	caption: z.string().nullable(),
	createdAt: z.coerce.date(),
});

export type OutingPhoto = z.infer<typeof outingPhotoSchema>;

export const createOutingPhotoSchema = outingPhotoSchema.omit({
	id: true,
	createdAt: true,
});

export type CreateOutingPhoto = z.infer<typeof createOutingPhotoSchema>;

// File

export const outingFileSchema = z.object({
	id: z.string().min(1),
	outingId: z.string().min(1),
	url: z.url(),
	label: z.string().nullable(),
	createdAt: z.coerce.date(),
});

export type OutingFile = z.infer<typeof outingFileSchema>;

export const createOutingFileSchema = outingFileSchema.omit({
	id: true,
	createdAt: true,
});

export type CreateOutingFile = z.infer<typeof createOutingFileSchema>;

// Feature

export const outingFeatureSchema = z.object({
	id: z.string().min(1),
	outingId: z.string().min(1),
	name: z.string().min(1),
});

export type OutingFeature = z.infer<typeof outingFeatureSchema>;

export const createOutingFeatureSchema = outingFeatureSchema.omit({ id: true });
export type CreateOutingFeature = z.infer<typeof createOutingFeatureSchema>;

// Alert

export const outingAlertSchema = z.object({
	id: z.string().min(1),
	outingId: z.string().min(1),
	variant: alertVariantSchema,
	title: z.string().min(1),
	body: z.string().min(1),
	createdAt: z.coerce.date(),
});

export type OutingAlert = z.infer<typeof outingAlertSchema>;

export const createOutingAlertSchema = outingAlertSchema.omit({
	id: true,
	createdAt: true,
});

export type CreateOutingAlert = z.infer<typeof createOutingAlertSchema>;

// Planner

export const outingPlannerSchema = z.object({
	id: z.string().min(1),
	outingId: z.string().min(1),
	userId: z.string().min(1),
});

export type OutingPlanner = z.infer<typeof outingPlannerSchema>;

export const createOutingPlannerSchema = outingPlannerSchema.omit({ id: true });
export type CreateOutingPlanner = z.infer<typeof createOutingPlannerSchema>;

// Packing item

export const outingPackingItemSchema = z.object({
	id: z.string().min(1),
	outingId: z.string().min(1),
	label: z.string().min(1),
	required: z.boolean(),
	comment: z.string().nullable(),
});

export type OutingPackingItem = z.infer<typeof outingPackingItemSchema>;

export const createOutingPackingItemSchema = outingPackingItemSchema.omit({
	id: true,
});

export type CreateOutingPackingItem = z.infer<
	typeof createOutingPackingItemSchema
>;
