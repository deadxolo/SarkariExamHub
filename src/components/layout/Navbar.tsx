import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, BookOpen, Trophy } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Sarkari<span className="text-blue-600">ExamHub</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <Link to="/exams" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">All Exams</Link>
            <Link to="/results" className="rounded-lg px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50 flex items-center gap-1">
              <Trophy className="h-4 w-4" /> Results
            </Link>
            {CATEGORIES.slice(0, 3).map((cat) => (
              <Link key={cat.slug} to={`/category/${cat.slug}`} className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                {cat.name.replace(" Exams", "")}
              </Link>
            ))}
            <Link to="/important-dates" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Dates</Link>
            <Link to="/search" className="ml-2 rounded-lg p-2 text-gray-500 hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </Link>
          </div>

          <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link to="/exams" className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>All Exams</Link>
            <Link to="/results" className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-emerald-700 hover:bg-emerald-50" onClick={() => setMobileOpen(false)}>
              <Trophy className="h-4 w-4" /> Results
            </Link>
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} to={`/category/${cat.slug}`} className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>
                {cat.name}
              </Link>
            ))}
            <Link to="/important-dates" className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>Important Dates</Link>
            <Link to="/search" className="block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(false)}>Search</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
