import { Link } from "react-router-dom";
import { getAllExams } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export default function ExamsPage() {
  const exams = getAllExams();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">All Government Exams</h1>
      <p className="mt-2 text-gray-600">Browse {exams.length} exams across all categories</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link to="/exams" className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-medium text-white">All</Link>
        {CATEGORIES.map((cat) => (
          <Link key={cat.slug} to={`/category/${cat.slug}`} className="rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100">
            {cat.name}
          </Link>
        ))}
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
              <div className="mt-4 space-y-1 text-xs text-gray-500">
                <p>Education: {exam.eligibility.educationRequired.substring(0, 50)}...</p>
                <p>Mode: {exam.examPattern.mode} | Year: {exam.year}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
