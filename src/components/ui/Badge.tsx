import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  upcoming: "bg-amber-100 text-amber-800",
  closed: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};

export default function Badge({ variant = "default", children, className }: {
  variant?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", variants[variant] || variants.default, className)}>
      {children}
    </span>
  );
}
