import { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import { getAllExams } from "@/lib/utils";
import type { Exam } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SearchInput from "@/components/ui/SearchInput";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [results, setResults] = useState<Exam[]>([]);

  const fuse = useMemo(() => {
    return new Fuse(getAllExams(), {
      keys: [
        { name: "name", weight: 2 },
        { name: "shortName", weight: 2 },
        { name: "tags", weight: 1.5 },
        { name: "description", weight: 1 },
        { name: "conductingBody", weight: 1 },
        { name: "category", weight: 0.8 },
      ],
      threshold: 0.4,
    });
  }, []);

  useEffect(() => {
    if (!q) {
      setResults([]);
      return;
    }
    const res = fuse.search(q, { limit: 20 }).map((r) => r.item);
    setResults(res);
  }, [q, fuse]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Search Exams</h1>
      <div className="mt-4">
        <SearchInput placeholder="Search by exam name, subject, or keyword..." large />
      </div>

      {q && <p className="mt-4 text-sm text-gray-500">{results.length} results for "{q}"</p>}

      <div className="mt-6 space-y-4">
        {results.map((exam) => (
          <Link key={exam.slug} to={`/exams/${exam.slug}`}>
            <Card className="group cursor-pointer mb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">{exam.conductingBody} | {exam.category}</p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-blue-600">{exam.shortName}</h3>
                  <p className="mt-1 text-sm text-gray-500">{exam.name}</p>
                </div>
                <Badge variant={exam.applicationStatus}>
                  {exam.applicationStatus === "active" ? "Apply Now" : exam.applicationStatus === "upcoming" ? "Upcoming" : "Closed"}
                </Badge>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-gray-500">{exam.description}</p>
            </Card>
          </Link>
        ))}

        {!q && (
          <div className="py-20 text-center text-gray-400">
            <Search className="mx-auto h-12 w-12" />
            <p className="mt-4 text-lg">Search for any government exam</p>
            <p className="mt-1 text-sm">Try "SSC CGL", "NEET", "UPSC", "Railway", "Bank PO"...</p>
          </div>
        )}

        {q && results.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <p className="text-lg">No exams found for "{q}"</p>
            <p className="mt-1 text-sm">Try different keywords or browse by category</p>
          </div>
        )}
      </div>
    </div>
  );
}
