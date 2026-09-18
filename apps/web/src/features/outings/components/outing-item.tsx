import type { Outing } from "@workspace/schemas";
import { clsx } from "cn";
import { LucideExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { outingPath } from "@/lib/paths";

type OutingItemProps = {
	outing: Outing;
	isDetail?: boolean;
};

function OutingItem({ outing, isDetail }: OutingItemProps) {
	return (
		<div className="flex flex-row gap-x-2">
			<Card
				className={clsx("w-full max-w-md", {
					"min-w-xl": isDetail,
				})}
			>
				<CardHeader>
					<div className="flex flex-row justify-between">
						<CardTitle>{outing.title}</CardTitle>

						<Badge
							variant={
								outing.status === "PUBLISHED"
									? "published"
									: outing.status === "DRAFT"
										? "draft"
										: "closed"
							}
						>
							{outing.status.charAt(0).toUpperCase() +
								outing.status.slice(1).toLowerCase()}
						</Badge>
					</div>
				</CardHeader>

				<CardContent>
					<span
						className={clsx("whitespace-break-spaces", {
							"line-clamp-3": !isDetail,
						})}
					>
						{outing.description}
					</span>
				</CardContent>
			</Card>

			{!isDetail && (
				<Button variant="outline" size="icon" asChild>
					<Link prefetch href={outingPath(outing.id)}>
						<LucideExternalLink />
					</Link>
				</Button>
			)}
		</div>
	);
}

export { OutingItem };
