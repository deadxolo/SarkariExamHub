import { useParams, Link } from "react-router-dom";
import {
  Download, ExternalLink, Calendar, GraduationCap, Clock,
  FileText, CheckCircle2, AlertCircle, ChevronRight, Trophy,
} from "lucide-react";
import { getExamBySlug, getResultByExamSlug, formatDate } from "@/lib/utils";
import { downloadSyllabusPDF } from "@/lib/pdf/generator";
import Badge from "@/components/ui/Badge";

export default function ExamDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const exam = getExamBySlug(slug || "");
  const result = getResultByExamSlug(slug || "");

  if (!exam) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Exam Not Found</h1>
          <Link to="/exams" className="mt-4 inline-block text-blue-600 hover:underline">Browse all exams</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/exams" className="hover:text-blue-600">Exams</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={`/category/${exam.category}`} className="hover:text-blue-600 capitalize">{exam.category}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-900">{exam.shortName}</span>
      </nav>

      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-200 uppercase">{exam.conductingBody} | {exam.category.toUpperCase()} Exam</p>
            <h1 className="mt-2 text-3xl font-bold">{exam.name}</h1>
            <p className="mt-2 max-w-2xl text-blue-100">{exam.description}</p>
          </div>
          <Badge variant={exam.applicationStatus} className="shrink-0 text-sm px-4 py-1.5">
            {exam.applicationStatus === "active" ? "Applications Open" : exam.applicationStatus === "upcoming" ? "Upcoming" : "Applications Closed"}
          </Badge>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {result && (
            <Link
              to={`/results/${exam.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-600"
            >
              <Trophy className="h-4 w-4" /> Check Result
              {result.resultStatus === "declared" && <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">Declared</span>}
            </Link>
          )}
          <button
            onClick={() => downloadSyllabusPDF(exam)}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 shadow hover:bg-blue-50 cursor-pointer"
          >
            <Download className="h-4 w-4" /> Download Syllabus PDF
          </button>
          {exam.applicationLink && exam.applicationStatus === "active" && (
            <a href={exam.applicationLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
              <ExternalLink className="h-4 w-4" /> Apply Online
            </a>
          )}
          <a href={exam.officialWebsite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
            <ExternalLink className="h-4 w-4" /> Official Website
          </a>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Exam Pattern */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <FileText className="h-6 w-6 text-blue-600" /> Exam Pattern
            </h2>
            <div className="mt-2 text-sm text-gray-500">
              Mode: <strong>{exam.examPattern.mode}</strong> | Languages: {exam.examPattern.language.join(", ")}
              {exam.examPattern.negativeMarking && <> | Negative Marking: {exam.examPattern.negativeMarking}</>}
            </div>

            {exam.examPattern.stages.map((stage, idx) => (
              <div key={idx} className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">{stage.name}</h3>
                <p className="text-sm text-gray-500">{stage.totalQuestions} Questions | {stage.totalMarks} Marks | {stage.duration} | {stage.type}</p>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-2.5 text-left font-semibold text-gray-700">Subject</th>
                        <th className="px-4 py-2.5 text-center font-semibold text-gray-700">Questions</th>
                        <th className="px-4 py-2.5 text-center font-semibold text-gray-700">Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stage.subjects.map((sub, si) => (
                        <tr key={si} className="border-b border-gray-100">
                          <td className="px-4 py-2.5 text-gray-800">{sub.name}</td>
                          <td className="px-4 py-2.5 text-center text-gray-600">{sub.questions}</td>
                          <td className="px-4 py-2.5 text-center text-gray-600">{sub.marks}</td>
                        </tr>
                      ))}
                      <tr className="bg-blue-50 font-semibold">
                        <td className="px-4 py-2.5 text-blue-800">Total</td>
                        <td className="px-4 py-2.5 text-center text-blue-800">{stage.totalQuestions}</td>
                        <td className="px-4 py-2.5 text-center text-blue-800">{stage.totalMarks}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </section>

          {/* Syllabus */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                <GraduationCap className="h-6 w-6 text-blue-600" /> Detailed Syllabus
              </h2>
              <button onClick={() => downloadSyllabusPDF(exam)} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer">
                <Download className="h-3.5 w-3.5" /> PDF
              </button>
            </div>

            {exam.syllabus.map((section, si) => (
              <div key={si} className="mt-6">
                <h3 className="rounded-t-lg bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white">{section.stageName}</h3>
                <div className="rounded-b-lg border border-t-0 border-gray-200">
                  {section.subjects.map((sub, sbi) => (
                    <div key={sbi} className="border-b border-gray-100 last:border-0 p-4">
                      <h4 className="font-semibold text-gray-800">{sub.name}</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {sub.topics.map((topic, ti) => (
                          <span key={ti} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">{topic}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Important Dates */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <Calendar className="h-5 w-5 text-blue-600" /> Important Dates
            </h3>
            <div className="mt-4 space-y-3">
              {exam.importantDates.map((d, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {d.isConfirmed ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-amber-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{d.event}</p>
                    <p className="text-sm text-gray-500">{formatDate(d.date)}{!d.isConfirmed && " (Tentative)"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <GraduationCap className="h-5 w-5 text-blue-600" /> Eligibility
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-700">Education</p>
                <p className="text-gray-600">{exam.eligibility.educationRequired}</p>
              </div>
              {(exam.eligibility.ageLimit.min > 0 || exam.eligibility.ageLimit.max > 0) && (
                <div>
                  <p className="font-medium text-gray-700">Age Limit</p>
                  <p className="text-gray-600">
                    {exam.eligibility.ageLimit.min > 0 && `Min: ${exam.eligibility.ageLimit.min} years`}
                    {exam.eligibility.ageLimit.min > 0 && exam.eligibility.ageLimit.max > 0 && " | "}
                    {exam.eligibility.ageLimit.max > 0 && `Max: ${exam.eligibility.ageLimit.max} years`}
                  </p>
                </div>
              )}
              {Object.keys(exam.eligibility.ageRelaxation).length > 0 && (
                <div>
                  <p className="font-medium text-gray-700">Age Relaxation</p>
                  {Object.entries(exam.eligibility.ageRelaxation).map(([cat, val]) => (
                    <p key={cat} className="text-gray-600">{cat}: {val}</p>
                  ))}
                </div>
              )}
              {exam.eligibility.attempts && (
                <div>
                  <p className="font-medium text-gray-700">Attempts</p>
                  <p className="text-gray-600">{exam.eligibility.attempts}</p>
                </div>
              )}
              <div>
                <p className="font-medium text-gray-700">Nationality</p>
                <p className="text-gray-600">{exam.eligibility.nationality}</p>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <Clock className="h-5 w-5 text-blue-600" /> Quick Info
            </h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Conducting Body</span><span className="font-medium text-gray-800">{exam.conductingBody}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Exam Mode</span><span className="font-medium text-gray-800">{exam.examPattern.mode}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Year</span><span className="font-medium text-gray-800">{exam.year}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Last Updated</span><span className="font-medium text-gray-800">{formatDate(exam.lastUpdated)}</span></div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs text-amber-800">
              <strong>Disclaimer:</strong> Information is collected from official sources and updated regularly.
              Always verify on{" "}
              <a href={exam.officialWebsite} target="_blank" rel="noopener noreferrer" className="underline">the official website</a>{" "}
              before making any decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
