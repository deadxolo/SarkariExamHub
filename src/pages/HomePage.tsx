import { Link } from "react-router-dom";
import {
  Building2, Landmark, TrainFront, Award, Shield, GraduationCap,
  ArrowRight, Calendar, Download, FileText, Trophy, CheckCircle2,
  Clock, AlertCircle,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { getAllExams, getUpcomingDates, getLatestResults, formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SearchInput from "@/components/ui/SearchInput";

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-8 w-8" />,
  Landmark: <Landmark className="h-8 w-8" />,
  TrainFront: <TrainFront className="h-8 w-8" />,
  Award: <Award className="h-8 w-8" />,
  Shield: <Shield className="h-8 w-8" />,
  GraduationCap: <GraduationCap className="h-8 w-8" />,
};

export default function HomePage() {
  const exams = getAllExams();
  const upcomingDates = getUpcomingDates().slice(0, 8);
  const activeExams = exams.filter((e) => e.applicationStatus === "active");
  const trendingExams = exams.slice(0, 6);
  const latestResults = getLatestResults().slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Your Gateway to<br /><span className="text-blue-200">Government Exams</span>
            </h1>
            <p className="mt-4 text-lg text-blue-100">
              Get complete syllabus, exam pattern, important dates & eligibility for SSC, UPSC, NTA, Railway, Banking & Defence exams. Download syllabus PDFs instantly.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-xl">
                <SearchInput placeholder="Search exams — SSC CGL, NEET, UPSC, IBPS PO..." large />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-1.5"><FileText className="h-4 w-4" /><span>{exams.length}+ Exams Covered</span></div>
              <div className="flex items-center gap-1.5"><Download className="h-4 w-4" /><span>Free Syllabus PDFs</span></div>
              <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /><span>Updated Daily</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Applications */}
      {activeExams.length > 0 && (
        <section className="border-b border-green-200 bg-green-50">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="shrink-0 text-sm font-semibold text-green-800">Applications Open:</span>
              {activeExams.map((exam) => (
                <Link key={exam.id} to={`/exams/${exam.slug}`} className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 hover:bg-green-200">
                  {exam.shortName}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Results */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-emerald-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-100 p-2">
                <Trophy className="h-6 w-6 text-emerald-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Latest Exam Results</h2>
                <p className="mt-0.5 text-gray-600">Check your result from official sources</p>
              </div>
            </div>
            <Link to="/results" className="hidden text-sm font-medium text-emerald-600 hover:text-emerald-700 sm:block">
              View all results <ArrowRight className="inline h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestResults.map((r) => (
              <Link key={r.id} to={`/results/${r.examSlug}`}>
                <div className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-emerald-200 hover:shadow-md">
                  <div className="mt-0.5">
                    {r.resultStatus === "declared" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : r.resultStatus === "awaited" ? (
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">{r.shortName}</h3>
                      <Badge variant={r.resultStatus === "declared" ? "active" : "upcoming"}>
                        {r.resultStatus === "declared" ? "Declared" : r.resultStatus === "awaited" ? "Awaited" : "Upcoming"}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">{r.session}</p>
                    <p className="mt-1.5 text-xs text-gray-500">
                      {r.resultStatus === "declared" ? "Declared: " : "Expected: "}
                      {formatDate(r.resultDate)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link to="/results" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
              View all results <ArrowRight className="inline h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Browse by Category</h2>
          <p className="mt-2 text-gray-600">Find exams organized by conducting body and category</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const count = exams.filter((e) => e.category === cat.slug).length;
            return (
              <Link key={cat.slug} to={`/category/${cat.slug}`}>
                <Card className="group cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-lg p-3 ${cat.bgColor} ${cat.color}`}>{iconMap[cat.icon]}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{cat.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{cat.description}</p>
                      <p className="mt-2 text-sm font-medium text-blue-600">{count} exams <ArrowRight className="inline h-3.5 w-3.5" /></p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trending Exams */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Popular Exams</h2>
              <p className="mt-1 text-gray-600">Most searched government exams</p>
            </div>
            <Link to="/exams" className="hidden text-sm font-medium text-blue-600 hover:text-blue-700 sm:block">
              View all exams <ArrowRight className="inline h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trendingExams.map((exam) => (
              <Link key={exam.id} to={`/exams/${exam.slug}`}>
                <Card className="group h-full cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">{exam.conductingBody}</p>
                      <h3 className="mt-1 font-semibold text-gray-900 group-hover:text-blue-600">{exam.shortName}</h3>
                    </div>
                    <Badge variant={exam.applicationStatus}>
                      {exam.applicationStatus === "active" ? "Apply Now" : exam.applicationStatus === "upcoming" ? "Upcoming" : "Closed"}
                    </Badge>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">{exam.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                    <span>Mode: {exam.examPattern.mode}</span>
                    <span>|</span>
                    <span>{exam.eligibility.educationRequired.split(" ").slice(0, 3).join(" ")}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Dates */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Important Dates</h2>
            <p className="mt-1 text-gray-600">Don't miss any deadline</p>
          </div>
          <Link to="/important-dates" className="hidden text-sm font-medium text-blue-600 hover:text-blue-700 sm:block">
            View all dates <ArrowRight className="inline h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {upcomingDates.map((d, i) => (
            <Link key={i} to={`/exams/${d.examSlug}`}>
              <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                <div className="shrink-0 rounded-lg bg-blue-50 px-3 py-2 text-center">
                  <p className="text-xs font-medium text-blue-600">{formatDate(d.date).split(" ")[1]}</p>
                  <p className="text-lg font-bold text-blue-700">{formatDate(d.date).split(" ")[0]}</p>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900">{d.event}</p>
                  <p className="text-sm text-gray-500">{d.exam}</p>
                </div>
                {d.isConfirmed ? <Badge variant="active">Confirmed</Badge> : <Badge variant="upcoming">Tentative</Badge>}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
