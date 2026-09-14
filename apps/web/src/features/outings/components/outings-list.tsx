import { Placeholder } from "@/components/placeholder";
import { getOutings } from "../actions/get-outings";
import { OutingItem } from "./outing-item";

async function OutingsList() {
	const result = await getOutings();

	if (!result.success) {
		return <Placeholder info={result.error} />;
	}

	const outings = result.data.outings;

	return (
		<div className="flex w-full flex-1 flex-col items-center justify-center gap-y-4">
			{outings.map((outing) => (
				<OutingItem key={outing.id} outing={outing} />
			))}
		</div>
	);
}

export { OutingsList };
