import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import ExamsPage from "@/pages/ExamsPage";
import ExamDetailPage from "@/pages/ExamDetailPage";
import CategoryPage from "@/pages/CategoryPage";
import SearchPage from "@/pages/SearchPage";
import ImportantDatesPage from "@/pages/ImportantDatesPage";
import ResultsPage from "@/pages/ResultsPage";
import ResultCheckPage from "@/pages/ResultCheckPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/exams/:slug" element={<ExamDetailPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/important-dates" element={<ImportantDatesPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/results/:slug" element={<ResultCheckPage />} />
          <Route path="*" element={
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900">404</h1>
                <p className="mt-2 text-gray-500">Page not found</p>
                <a href="/" className="mt-4 inline-block text-blue-600 hover:underline">Go home</a>
              </div>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
