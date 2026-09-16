import { createOutingSchema } from "@workspace/schemas";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createOuting } from "@/features/outings/actions/create-outing";

async function createOutingAction(formData: FormData) {
	"use server";

	const parsed = createOutingSchema.safeParse({
		title: formData.get("title"),
		description: formData.get("description"),
		status: formData.get("status"),
	});

	if (!parsed.success) {
		throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
	}

	const outing = await createOuting(parsed.data);
	console.log(outing);
}

function CreateOutingPage() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="mx-auto max-w-md px-4 md:px-6">
				<form action={createOutingAction}>
					<FieldSet>
						<FieldLegend>New outing</FieldLegend>

						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="title">Title</FieldLabel>

								<Input id="title" name="title" required />
							</Field>

							<Field>
								<FieldLabel htmlFor="description">Description</FieldLabel>

								<Textarea id="description" name="description" required />

								<FieldDescription>
									Shown on the outing's public page.
								</FieldDescription>
							</Field>

							<Field>
								<FieldLabel htmlFor="status">Status</FieldLabel>

								<Select name="status" defaultValue="DRAFT">
									<SelectTrigger id="status">
										<SelectValue placeholder="Select a status" />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="DRAFT">Draft</SelectItem>
										<SelectItem value="PUBLISHED">Published</SelectItem>
										<SelectItem value="CLOSED">Closed</SelectItem>
									</SelectContent>
								</Select>
							</Field>
						</FieldGroup>

						<Button className="mt-6 w-full">Create outing</Button>
					</FieldSet>
				</form>
			</div>
		</section>
	);
}

export default CreateOutingPage;
