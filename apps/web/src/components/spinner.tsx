import { LucideLoader } from "lucide-react";

function Spinner() {
	return (
		<div className="flex flex-1 items-center justify-center self-center">
			<LucideLoader className="h-4 w-4 animate-spin" />
		</div>
	);
}

export { Spinner };
