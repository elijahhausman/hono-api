import { Placeholder } from "@/components/placeholder";
import { getOutings } from "../actions/get-outings";
import { OutingItem } from "./outing-item";

async function OutingsList() {
	const result = await getOutings();

	if (!result.success) {
		return <Placeholder info={result.error} />;
	}

	const outings = result.data.outings;
	const statusOrder = { PUBLISHED: 0, DRAFT: 1, CLOSED: 2 };

	const sortedOutings = [...outings].sort(
		(a, b) => statusOrder[a.status] - statusOrder[b.status],
	);

	return (
		<div className="flex w-full flex-1 animate-fade-from-top flex-col items-center justify-center gap-y-4">
			{sortedOutings.map((outing) => (
				<OutingItem key={outing.id} outing={outing} />
			))}
		</div>
	);
}

export { OutingsList };
