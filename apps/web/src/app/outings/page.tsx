"use client";

import { LucideAlertCircle, LucideLoader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOutings } from "@/features/outings/actions/getOutings";
import type { Outing, OutingStatus } from "@/features/outings/types";

function Home() {
	const [outings, setOutings] = useState<Outing[]>();
	const [error, setError] = useState<string>();

	useEffect(() => {
		const fetchData = async () => {
			const result = await getOutings();

			if (!result.success) {
				setError(result.error || "An unknown error has occured :(");
				return;
			}

			const outings = result.data?.outings as Outing[];

			const statusOrder: Record<OutingStatus, number> = {
				PUBLISHED: 0,
				DRAFT: 1,
				CLOSED: 2,
			};

			setOutings(
				[...outings].sort(
					(a, b) => statusOrder[a.status] - statusOrder[b.status],
				),
			);
		};

		fetchData();
	}, []);

	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="flex flex-col items-center justify-center space-y-8 px-4 md:px-6">
				<p className="max-w-175 md:text-xl">
					Here are the outings in response to your API call:
				</p>

				{error && (
					<Alert variant="destructive" className="w-full max-w-lg">
						<LucideAlertCircle />
						{error}
					</Alert>
				)}

				{outings && (
					<div className="flex w-full flex-1 flex-col items-center justify-center gap-y-4">
						{outings.map((outing) => (
							<Card key={outing.id} className="w-full max-w-lg">
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

								<CardContent>{outing.description}</CardContent>
							</Card>
						))}
					</div>
				)}

				{!outings && !error && (
					<LucideLoader className="h-4 w-4 animate-spin" />
				)}

				<Button variant="default" asChild>
					<Link href="/">Reload outings</Link>
				</Button>
			</div>
		</section>
	);
}

export default Home;
