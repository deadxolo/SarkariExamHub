import jsPDF from "jspdf";
import type { Exam } from "@/lib/types";

export function downloadSyllabusPDF(exam: Exam) {
  const doc = new jsPDF();
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 2 * margin;
  let y = 20;

  function checkPage(needed = 20) {
    if (y + needed > 280) {
      doc.addPage();
      y = 20;
    }
  }

  function heading(text: string, size = 16) {
    checkPage(15);
    doc.setFontSize(size);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 64, 175);
    doc.text(text, margin, y);
    y += size * 0.5 + 4;
  }

  function subheading(text: string, size = 12) {
    checkPage(12);
    doc.setFontSize(size);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text(text, margin, y);
    y += size * 0.4 + 3;
  }

  function bodyText(text: string, indent = 0) {
    checkPage(8);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    for (const line of lines) {
      checkPage(6);
      doc.text(line, margin + indent, y);
      y += 5;
    }
  }

  function separator() {
    checkPage(10);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  }

  // ===== HEADER =====
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(`${exam.shortName} - Syllabus ${exam.year}`, margin, 18);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(exam.name, margin, 28);
  doc.setFontSize(8);
  doc.text(`Conducting Body: ${exam.conductingBody} | Mode: ${exam.examPattern.mode} | ${exam.officialWebsite}`, margin, 35);
  y = 50;

  // ===== EXAM PATTERN =====
  heading("Exam Pattern");
  bodyText(`Languages: ${exam.examPattern.language.join(", ")}`);
  if (exam.examPattern.negativeMarking) {
    bodyText(`Negative Marking: ${exam.examPattern.negativeMarking}`);
  }
  y += 3;

  for (const stage of exam.examPattern.stages) {
    subheading(stage.name, 11);
    bodyText(`${stage.totalQuestions} Questions | ${stage.totalMarks} Marks | ${stage.duration} | ${stage.type}`);
    y += 2;

    // Table header
    checkPage(10);
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y - 3, contentWidth, 7, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50, 50, 50);
    doc.text("Subject", margin + 2, y + 1);
    doc.text("Qs", margin + contentWidth * 0.7, y + 1);
    doc.text("Marks", margin + contentWidth * 0.85, y + 1);
    y += 7;

    doc.setFont("helvetica", "normal");
    for (const sub of stage.subjects) {
      checkPage(7);
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      doc.text(sub.name, margin + 2, y);
      doc.text(String(sub.questions), margin + contentWidth * 0.7, y);
      doc.text(String(sub.marks), margin + contentWidth * 0.85, y);
      y += 5;
    }

    // Total row
    checkPage(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 64, 175);
    doc.text("Total", margin + 2, y);
    doc.text(String(stage.totalQuestions), margin + contentWidth * 0.7, y);
    doc.text(String(stage.totalMarks), margin + contentWidth * 0.85, y);
    y += 8;
  }

  separator();

  // ===== SYLLABUS =====
  heading("Detailed Syllabus");

  for (const section of exam.syllabus) {
    subheading(section.stageName, 12);
    y += 2;

    for (const sub of section.subjects) {
      subheading(sub.name, 10);
      bodyText(sub.topics.join("  |  "), 3);
      y += 4;
    }
    y += 3;
  }

  separator();

  // ===== ELIGIBILITY =====
  heading("Eligibility");
  bodyText(`Education: ${exam.eligibility.educationRequired}`);
  if (exam.eligibility.ageLimit.min > 0 || exam.eligibility.ageLimit.max > 0) {
    bodyText(`Age Limit: ${exam.eligibility.ageLimit.min} - ${exam.eligibility.ageLimit.max} years`);
  }
  if (exam.eligibility.attempts) {
    bodyText(`Attempts: ${exam.eligibility.attempts}`);
  }
  bodyText(`Nationality: ${exam.eligibility.nationality}`);

  if (Object.keys(exam.eligibility.ageRelaxation).length > 0) {
    y += 2;
    subheading("Age Relaxation", 9);
    for (const [cat, val] of Object.entries(exam.eligibility.ageRelaxation)) {
      bodyText(`${cat}: ${val}`, 3);
    }
  }

  separator();

  // ===== IMPORTANT DATES =====
  heading("Important Dates");
  for (const d of exam.importantDates) {
    const status = d.isConfirmed ? "(Confirmed)" : "(Tentative)";
    bodyText(`${d.event}: ${d.date} ${status}`);
  }

  y += 10;
  separator();

  // ===== FOOTER =====
  checkPage(15);
  doc.setFontSize(7);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(150, 150, 150);
  doc.text("Generated from SarkariExamHub | For informational purposes only.", margin, y);
  y += 4;
  doc.text("Always verify on the official website before making any decisions.", margin, y);

  doc.save(`${exam.slug}-syllabus-${exam.year}.pdf`);
}
