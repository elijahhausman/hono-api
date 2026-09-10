export type OutingStatus = "DRAFT" | "PUBLISHED" | "CLOSED";

export type Outing = {
	id: string;
	title: string;
	description: string;
	status: OutingStatus;
	createdAt: Date;
	updatedAt: Date;
};
