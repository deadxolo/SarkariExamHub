import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Trophy, Search, Filter, ExternalLink, Calendar,
  CheckCircle2, Clock, AlertCircle, TrendingUp,
  ArrowRight, X, BarChart3, Award,
} from "lucide-react";
import { getAllResults, formatDate } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import type { ResultStatus } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

const statusConfig: Record<ResultStatus, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  declared: { label: "Declared", color: "text-green-700", bgColor: "bg-green-50 border-green-200", icon: <CheckCircle2 className="h-4 w-4 text-green-600" /> },
  upcoming: { label: "Upcoming", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200", icon: <Clock className="h-4 w-4 text-blue-600" /> },
  awaited: { label: "Awaited", color: "text-amber-700", bgColor: "bg-amber-50 border-amber-200", icon: <AlertCircle className="h-4 w-4 text-amber-600" /> },
  answer_key: { label: "Answer Key", color: "text-purple-700", bgColor: "bg-purple-50 border-purple-200", icon: <BarChart3 className="h-4 w-4 text-purple-600" /> },
};

export default function ResultsPage() {
  const allResults = getAllResults();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredResults = useMemo(() => {
    let results = allResults;
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (r) =>
          r.examName.toLowerCase().includes(q) ||
          r.shortName.toLowerCase().includes(q) ||
          r.conductingBody.toLowerCase().includes(q) ||
          r.session.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      results = results.filter((r) => r.resultStatus === statusFilter);
    }
    if (categoryFilter !== "all") {
      results = results.filter((r) => r.category === categoryFilter);
    }
    return results.sort((a, b) => new Date(b.resultDate).getTime() - new Date(a.resultDate).getTime());
  }, [allResults, search, statusFilter, categoryFilter]);

  const declaredCount = allResults.filter((r) => r.resultStatus === "declared").length;
  const awaitedCount = allResults.filter((r) => r.resultStatus === "awaited").length;
  const upcomingCount = allResults.filter((r) => r.resultStatus === "upcoming").length;

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  const hasFilters = search || statusFilter !== "all" || categoryFilter !== "all";

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
              <Trophy className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Exam Results
            </h1>
            <p className="mt-3 text-emerald-100">
              Check results for all government exams — SSC, UPSC, Railway, Banking, NTA & Defence.
              Direct links to official result portals with cut-off marks and score cards.
            </p>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-4">
            <button onClick={() => setStatusFilter("declared")} className="rounded-xl bg-white/10 px-4 py-3 text-center transition hover:bg-white/20 cursor-pointer">
              <p className="text-2xl font-bold">{declaredCount}</p>
              <p className="text-sm text-emerald-200">Declared</p>
            </button>
            <button onClick={() => setStatusFilter("awaited")} className="rounded-xl bg-white/10 px-4 py-3 text-center transition hover:bg-white/20 cursor-pointer">
              <p className="text-2xl font-bold">{awaitedCount}</p>
              <p className="text-sm text-emerald-200">Awaited</p>
            </button>
            <button onClick={() => setStatusFilter("upcoming")} className="rounded-xl bg-white/10 px-4 py-3 text-center transition hover:bg-white/20 cursor-pointer">
              <p className="text-2xl font-bold">{upcomingCount}</p>
              <p className="text-sm text-emerald-200">Upcoming</p>
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search & Filters */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search results — SSC CGL, NEET, IBPS PO..."
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-8 text-sm text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="all">All Status</option>
                  <option value="declared">Declared</option>
                  <option value="awaited">Awaited</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="answer_key">Answer Key</option>
                </select>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none rounded-lg border border-gray-300 bg-white py-2.5 px-4 text-sm text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          {hasFilters && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-gray-500">{filteredResults.length} result(s) found</span>
              <button onClick={clearFilters} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 cursor-pointer">
                <X className="h-3 w-3" /> Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Latest Declared Banner */}
        {statusFilter === "all" && !search && (
          <div className="mt-6 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-1.5">
                <TrendingUp className="h-4 w-4 text-green-700" />
              </div>
              <span className="text-sm font-semibold text-green-800">Latest Results:</span>
              <div className="flex flex-wrap gap-2">
                {allResults
                  .filter((r) => r.resultStatus === "declared")
                  .sort((a, b) => new Date(b.resultDate).getTime() - new Date(a.resultDate).getTime())
                  .slice(0, 5)
                  .map((r) => (
                    <Link
                      key={r.id}
                      to={`/results/${r.examSlug}`}
                      className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 hover:bg-green-200 transition"
                    >
                      {r.shortName}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResults.map((result) => {
            const status = statusConfig[result.resultStatus];
            return (
              <Link key={result.id} to={`/results/${result.examSlug}`}>
                <Card className="group h-full cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium text-gray-500 uppercase">{result.conductingBody}</p>
                        <span className="text-gray-300">|</span>
                        <p className="text-xs text-gray-400 capitalize">{result.category}</p>
                      </div>
                      <h3 className="mt-1.5 font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {result.shortName}
                      </h3>
                      <p className="mt-0.5 text-xs text-gray-500">{result.session}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${status.bgColor} ${status.color}`}>
                      {status.icon}
                      {status.label}
                    </div>
                  </div>

                  {result.highlights.length > 0 && (
                    <p className="mt-3 line-clamp-2 text-sm text-gray-500">{result.highlights[0]}</p>
                  )}

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{result.resultStatus === "declared" ? "Declared: " : "Expected: "}{formatDate(result.resultDate)}</span>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 group-hover:text-emerald-700">
                      Check Result <ArrowRight className="inline h-3 w-3" />
                    </span>
                  </div>

                  {result.cutOff && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                      <Award className="h-3.5 w-3.5 text-amber-500" />
                      <span>Cut-off: {result.cutOff.categories[0]?.category} — {result.cutOff.categories[0]?.cutoff}/{result.cutOff.categories[0]?.maxMarks}</span>
                    </div>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredResults.length === 0 && (
          <div className="mt-12 text-center">
            <Trophy className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="mt-4 text-sm font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer">
              Clear all filters
            </button>
          </div>
        )}

        {/* How to Check Info */}
        <section className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-bold text-gray-900">How to Check Your Exam Result</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "Select Exam", desc: "Find your exam from the list above or use the search bar" },
              { step: "2", title: "Visit Result Page", desc: "Click on the exam to see detailed result information" },
              { step: "3", title: "Go to Official Portal", desc: "Use the direct link to visit the official result website" },
              { step: "4", title: "Enter Details", desc: "Enter your roll number / registration details to check result" },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="mt-0.5 text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Access by Category */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">Results by Category</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((cat) => {
              const count = allResults.filter((r) => r.category === cat.slug).length;
              const declared = allResults.filter((r) => r.category === cat.slug && r.resultStatus === "declared").length;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setCategoryFilter(cat.slug === categoryFilter ? "all" : cat.slug)}
                  className={`rounded-xl border p-4 text-center transition cursor-pointer ${
                    categoryFilter === cat.slug
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <p className="text-sm font-semibold text-gray-800">{cat.name.replace(" Exams", "")}</p>
                  <p className="mt-1 text-xs text-gray-500">{count} results</p>
                  <p className="text-xs text-green-600">{declared} declared</p>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
