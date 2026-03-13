import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Trophy, ExternalLink, Calendar, ChevronRight, CheckCircle2,
  Clock, AlertCircle, Download, FileText, BarChart3, Users,
  TrendingUp, Award, ArrowUpRight, Shield, ClipboardList,
  Info, ChevronDown, ChevronUp,
} from "lucide-react";
import { getResultByExamSlug, getExamBySlug, formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

const linkTypeIcons: Record<string, React.ReactNode> = {
  result: <Trophy className="h-4 w-4" />,
  scorecard: <FileText className="h-4 w-4" />,
  answerkey: <ClipboardList className="h-4 w-4" />,
  cutoff: <BarChart3 className="h-4 w-4" />,
  notification: <Info className="h-4 w-4" />,
};

const linkTypeColors: Record<string, string> = {
  result: "bg-green-600 hover:bg-green-700",
  scorecard: "bg-blue-600 hover:bg-blue-700",
  answerkey: "bg-purple-600 hover:bg-purple-700",
  cutoff: "bg-amber-600 hover:bg-amber-700",
  notification: "bg-gray-600 hover:bg-gray-700",
};

export default function ResultCheckPage() {
  const { slug } = useParams<{ slug: string }>();
  const result = getResultByExamSlug(slug || "");
  const exam = getExamBySlug(slug || "");
  const [showPrevious, setShowPrevious] = useState(false);
  const [showHowTo, setShowHowTo] = useState(true);

  if (!result) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Trophy className="mx-auto h-12 w-12 text-gray-300" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Result Not Found</h1>
          <p className="mt-2 text-gray-500">This exam result is not available yet.</p>
          <Link to="/results" className="mt-4 inline-block text-emerald-600 hover:underline">Browse all results</Link>
        </div>
      </div>
    );
  }

  const statusLabel = result.resultStatus === "declared" ? "Result Declared" : result.resultStatus === "upcoming" ? "Upcoming" : result.resultStatus === "awaited" ? "Result Awaited" : "Answer Key Released";
  const statusBadge = result.resultStatus === "declared" ? "active" : result.resultStatus === "upcoming" ? "upcoming" : "upcoming";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
        <Link to="/" className="hover:text-emerald-600">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/results" className="hover:text-emerald-600">Results</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-900">{result.shortName}</span>
      </nav>

      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-200 uppercase">{result.conductingBody} | {result.category.toUpperCase()}</p>
            <h1 className="mt-2 text-3xl font-bold">{result.examName}</h1>
            <p className="mt-1 text-lg text-emerald-100">{result.session}</p>
          </div>
          <Badge variant={statusBadge} className="shrink-0 text-sm px-4 py-1.5">
            {statusLabel}
          </Badge>
        </div>

        {/* Important action buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={result.resultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow hover:bg-emerald-50 transition cursor-pointer"
          >
            <Trophy className="h-4 w-4" /> Check Result on Official Website
            <ArrowUpRight className="h-4 w-4" />
          </a>
          {result.scoreCardUrl && (
            <a href={result.scoreCardUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
              <Download className="h-4 w-4" /> Download Score Card
            </a>
          )}
          {result.answerKeyUrl && (
            <a href={result.answerKeyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
              <ClipboardList className="h-4 w-4" /> View Answer Key
            </a>
          )}
          <a href={result.officialWebsite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
            <ExternalLink className="h-4 w-4" /> Official Website
          </a>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Result Highlights */}
          {result.highlights.length > 0 && (
            <Card hover={false}>
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <TrendingUp className="h-5 w-5 text-emerald-600" /> Result Highlights
              </h2>
              <ul className="mt-4 space-y-2">
                {result.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-sm text-gray-700">{h}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* How to Check Result */}
          <Card hover={false}>
            <button
              onClick={() => setShowHowTo(!showHowTo)}
              className="flex w-full items-center justify-between cursor-pointer"
            >
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <ClipboardList className="h-5 w-5 text-emerald-600" /> How to Check {result.shortName} Result
              </h2>
              {showHowTo ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </button>
            {showHowTo && (
              <div className="mt-4">
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 mb-4">
                  <p className="text-sm font-medium text-emerald-800">Required Details:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {result.requiredDetails.map((d, i) => (
                      <span key={i} className="rounded-full bg-white border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-700">{d}</span>
                    ))}
                  </div>
                </div>
                <ol className="space-y-3">
                  {result.howToCheck.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-700 pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
                <a
                  href={result.resultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700 transition"
                >
                  <Trophy className="h-4 w-4" /> Go to Official Result Portal
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </Card>

          {/* Cut-Off Marks */}
          {result.cutOff && (
            <Card hover={false}>
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <BarChart3 className="h-5 w-5 text-emerald-600" /> Cut-Off Marks — {result.cutOff.session}
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Cut-Off</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Max Marks</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.cutOff.categories.map((cat, i) => {
                      const pct = ((cat.cutoff / cat.maxMarks) * 100).toFixed(1);
                      return (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="px-4 py-3 font-medium text-gray-800">{cat.category}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-sm font-semibold text-emerald-700">
                              {cat.cutoff}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center text-gray-600">{cat.maxMarks}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="h-2 w-16 rounded-full bg-gray-200">
                                <div
                                  className="h-2 rounded-full bg-emerald-500"
                                  style={{ width: `${Math.min(parseFloat(pct), 100)}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-600">{pct}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {result.cutOffUrl && (
                <a
                  href={result.cutOffUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  View detailed cut-off on official website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </Card>
          )}

          {/* Previous Year Results */}
          {result.previousResults.length > 0 && (
            <Card hover={false}>
              <button
                onClick={() => setShowPrevious(!showPrevious)}
                className="flex w-full items-center justify-between cursor-pointer"
              >
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                  <TrendingUp className="h-5 w-5 text-emerald-600" /> Previous Year Results
                </h2>
                {showPrevious ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
              </button>
              {showPrevious && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Year</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Session</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">General Cut-Off</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Total Qualified</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-700">Result Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.previousResults.map((prev, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="px-4 py-3 font-medium text-gray-800">{prev.year}</td>
                          <td className="px-4 py-3 text-gray-600">{prev.session}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="font-semibold text-gray-800">{prev.generalCutoff}</span>
                          </td>
                          <td className="px-4 py-3 text-center text-gray-600">
                            {prev.totalQualified.toLocaleString("en-IN")}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-600">{formatDate(prev.resultDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Result Check */}
          <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <Trophy className="h-5 w-5 text-emerald-600" /> Quick Result Check
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Click the button below to check your result directly on the official website.
            </p>
            <a
              href={result.resultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700 transition"
            >
              <Trophy className="h-4 w-4" /> Check Result Now
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-center text-xs text-gray-500">Opens {result.officialWebsite}</p>
          </div>

          {/* Important Links */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <ExternalLink className="h-5 w-5 text-emerald-600" /> Important Links
            </h3>
            <div className="mt-4 space-y-2">
              {result.importantLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-white transition ${linkTypeColors[link.type]}`}
                >
                  {linkTypeIcons[link.type]}
                  <span className="flex-1">{link.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                </a>
              ))}
            </div>
          </div>

          {/* Result Info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <Info className="h-5 w-5 text-emerald-600" /> Result Info
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <Badge variant={statusBadge}>{statusLabel}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Result Date</span>
                <span className="font-medium text-gray-800">{formatDate(result.resultDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Conducting Body</span>
                <span className="font-medium text-gray-800">{result.conductingBody}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Year</span>
                <span className="font-medium text-gray-800">{result.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Updated</span>
                <span className="font-medium text-gray-800">{formatDate(result.lastUpdated)}</span>
              </div>
            </div>
          </div>

          {/* Next Stage */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <Clock className="h-5 w-5 text-blue-600" /> What's Next?
            </h3>
            <p className="mt-2 text-sm text-gray-700">{result.nextStage}</p>
          </div>

          {/* Exam Details Link */}
          {exam && (
            <Link to={`/exams/${exam.slug}`} className="block">
              <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-emerald-200 hover:shadow-md">
                <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <FileText className="h-5 w-5 text-emerald-600" /> View Full Exam Details
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Syllabus, exam pattern, eligibility & important dates for {result.shortName}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
                  Go to exam page <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          )}

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs text-amber-800">
              <strong>Disclaimer:</strong> Result information is collected from official sources.
              Always check your result on the{" "}
              <a href={result.officialWebsite} target="_blank" rel="noopener noreferrer" className="underline">
                official website
              </a>{" "}
              for the most accurate and up-to-date information. We are NOT affiliated with any government body.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
