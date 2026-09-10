import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";
import type * as React from "react";

const badgeVariants = cva(
	"group/badge dark:aria-invalid:!ring-destructive/40 inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-4xl border border-transparent px-2 py-0.5 font-medium text-xs transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3!",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
				secondary:
					"bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
				destructive:
					"dark:!bg-destructive/20 dark:focus-visible:!ring-destructive/40 [a]:hover:!bg-destructive/20 bg-destructive/10 text-destructive focus-visible:ring-destructive/20",
				draft:
					"dark:!bg-blue-300/20 dark:!text-blue-300 dark:focus-visible:!ring-blue-300/40 [a]:hover:!bg-blue-300/20 bg-blue-500/10 text-blue-500 focus-visible:ring-blue-500/20",
				published:
					"dark:!bg-purple-300/20 dark:!text-purple-300 dark:focus-visible:!ring-purple-300/40 [a]:hover:!bg-purple-300/20 bg-purple-500/10 text-purple-500 focus-visible:ring-purple-500/20",
				closed:
					"dark:!bg-gray-300/20 dark:!text-gray-300 dark:focus-visible:!ring-gray-300/40 [a]:hover:!bg-gray-300/20 bg-gray-500/10 text-gray-500 focus-visible:ring-gray-500/20",
				outline:
					"border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
				ghost:
					"dark:hover:!bg-muted/50 hover:bg-muted hover:text-muted-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Badge({
	className,
	variant = "default",
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot.Root : "span";

	return (
		<Comp
			data-slot="badge"
			data-variant={variant}
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
