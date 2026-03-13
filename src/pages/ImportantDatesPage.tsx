import { Link } from "react-router-dom";
import { Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { getUpcomingDates, formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export default function ImportantDatesPage() {
  const dates = getUpcomingDates();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Important Dates</h1>
          <p className="text-gray-600">All upcoming government exam dates in one place</p>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {dates.map((d, i) => (
          <Link key={i} to={`/exams/${d.examSlug}`}>
            <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50 mb-3">
              <div className="shrink-0 w-20 rounded-lg bg-blue-50 px-3 py-2 text-center">
                <p className="text-xs font-medium text-blue-600">{formatDate(d.date).split(" ")[1]}</p>
                <p className="text-xl font-bold text-blue-700">{formatDate(d.date).split(" ")[0]}</p>
                <p className="text-[10px] text-blue-500">{formatDate(d.date).split(" ")[2]}</p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">{d.event}</p>
                <p className="text-sm text-gray-500">{d.exam}</p>
              </div>
              <div className="flex items-center gap-2">
                {d.isConfirmed ? (
                  <><CheckCircle2 className="h-4 w-4 text-green-500" /><Badge variant="active">Confirmed</Badge></>
                ) : (
                  <><AlertCircle className="h-4 w-4 text-amber-500" /><Badge variant="upcoming">Tentative</Badge></>
                )}
              </div>
            </div>
          </Link>
        ))}

        {dates.length === 0 && <p className="py-12 text-center text-gray-500">No upcoming dates found.</p>}
      </div>
    </div>
  );
}
