import { notFound } from "next/navigation";
import { Placeholder } from "@/components/placeholder";
import { getOuting } from "@/features/outings/actions/get-outing";
import { OutingItem } from "@/features/outings/components/outing-item";

type OutingPageProps = {
	params: {
		id: string;
	};
};

async function OutingPage({ params }: OutingPageProps) {
	const { id } = await params;
	const result = await getOuting(id);

	if (!result.success) {
		return <Placeholder info={result.error} />;
	}

	const outing = result.data.outing;

	if (!outing) {
		notFound();
	}

	return (
		<div className="flex w-full justify-center">
			<OutingItem outing={outing} isDetail />
		</div>
	);
}

export default OutingPage;
