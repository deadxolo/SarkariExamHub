import { cn } from "@/lib/utils";

export default function Card({ children, className, hover = true }: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white p-6 shadow-sm", hover && "transition-shadow hover:shadow-md", className)}>
      {children}
    </div>
  );
}
