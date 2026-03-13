import type { Exam, ExamCategory, ExamResult } from "./types";
import examsData from "@/data/exams.json";
import resultsData from "@/data/results.json";

export function getAllExams(): Exam[] {
  return examsData as Exam[];
}

export function getExamBySlug(slug: string): Exam | undefined {
  return getAllExams().find((e) => e.slug === slug);
}

export function getExamsByCategory(category: ExamCategory): Exam[] {
  return getAllExams().filter((e) => e.category === category);
}

export function getUpcomingDates() {
  const allDates: { exam: string; examSlug: string; event: string; date: string; isConfirmed: boolean }[] = [];
  for (const exam of getAllExams()) {
    for (const d of exam.importantDates) {
      if (d.date !== "To be announced") {
        allDates.push({ exam: exam.shortName, examSlug: exam.slug, event: d.event, date: d.date, isConfirmed: d.isConfirmed });
      }
    }
  }
  return allDates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function formatDate(dateStr: string): string {
  if (dateStr === "To be announced") return dateStr;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function getAllResults(): ExamResult[] {
  return resultsData as ExamResult[];
}

export function getResultByExamSlug(slug: string): ExamResult | undefined {
  return getAllResults().find((r) => r.examSlug === slug);
}

export function getResultsByCategory(category: ExamCategory): ExamResult[] {
  return getAllResults().filter((r) => r.category === category);
}

export function getResultsByStatus(status: string): ExamResult[] {
  return getAllResults().filter((r) => r.resultStatus === status);
}

export function getDeclaredResults(): ExamResult[] {
  return getAllResults().filter((r) => r.resultStatus === "declared");
}

export function getLatestResults(): ExamResult[] {
  return getAllResults()
    .sort((a, b) => new Date(b.resultDate).getTime() - new Date(a.resultDate).getTime());
}

export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
