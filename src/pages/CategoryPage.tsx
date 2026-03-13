import { useParams, Link } from "react-router-dom";
import { CATEGORIES } from "@/lib/constants";
import { getExamsByCategory } from "@/lib/utils";
import type { ExamCategory } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const cat = CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category Not Found</h1>
          <Link to="/exams" className="mt-4 inline-block text-blue-600 hover:underline">Browse all exams</Link>
        </div>
      </div>
    );
  }

  const exams = getExamsByCategory(category as ExamCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className={`rounded-xl ${cat.bgColor} p-8`}>
        <h1 className={`text-3xl font-bold ${cat.color}`}>{cat.name}</h1>
        <p className="mt-2 text-gray-600">{cat.description}</p>
        <p className="mt-1 text-sm text-gray-500">{exams.length} exams in this category</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <Link key={exam.id} to={`/exams/${exam.slug}`}>
            <Card className="group h-full cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase">{exam.conductingBody}</p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-blue-600">{exam.shortName}</h3>
                </div>
                <Badge variant={exam.applicationStatus}>
                  {exam.applicationStatus === "active" ? "Apply Now" : exam.applicationStatus === "upcoming" ? "Upcoming" : "Closed"}
                </Badge>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-gray-500">{exam.description}</p>
              <div className="mt-4 text-xs text-gray-500">
                <p>{exam.eligibility.educationRequired.substring(0, 60)}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {exams.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-gray-500">No exams found in this category yet.</p>
          <Link to="/exams" className="mt-2 text-sm text-blue-600 hover:underline">Browse all exams</Link>
        </div>
      )}
    </div>
  );
}
