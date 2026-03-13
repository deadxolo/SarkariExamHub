import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">Sarkari<span className="text-blue-600">ExamHub</span></span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">Your one-stop destination for all government exam information.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Exam Categories</h3>
            <ul className="mt-3 space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}><Link to={`/category/${cat.slug}`} className="text-sm text-gray-500 hover:text-blue-600">{cat.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li><Link to="/exams" className="text-sm text-gray-500 hover:text-blue-600">All Exams</Link></li>
              <li><Link to="/results" className="text-sm text-gray-500 hover:text-blue-600">Exam Results</Link></li>
              <li><Link to="/important-dates" className="text-sm text-gray-500 hover:text-blue-600">Important Dates</Link></li>
              <li><Link to="/search" className="text-sm text-gray-500 hover:text-blue-600">Search</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Official Websites</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="https://ssc.gov.in" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-600">SSC (ssc.gov.in)</a></li>
              <li><a href="https://nta.ac.in" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-600">NTA (nta.ac.in)</a></li>
              <li><a href="https://upsc.gov.in" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-600">UPSC (upsc.gov.in)</a></li>
              <li><a href="https://rrbcdg.gov.in" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-600">RRB (rrbcdg.gov.in)</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-xs text-gray-400">
            <strong>Disclaimer:</strong> SarkariExamHub is an independent informational platform.
            We are NOT affiliated with SSC, NTA, UPSC, RRB, IBPS or any government body.
            Always verify information on official websites before making any decisions.
          </p>
          <p className="mt-2 text-center text-xs text-gray-400">&copy; {new Date().getFullYear()} SarkariExamHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
