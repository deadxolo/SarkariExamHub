export type ExamCategory = "ssc" | "banking" | "railway" | "upsc" | "defence" | "teaching";
export type ConductingBody = "SSC" | "NTA" | "UPSC" | "RRB" | "IBPS" | "MoD" | "OTHER";
export type ApplicationStatus = "upcoming" | "active" | "closed";

export interface Exam {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  conductingBody: ConductingBody;
  category: ExamCategory;
  description: string;
  officialWebsite: string;
  applicationLink: string | null;
  applicationStatus: ApplicationStatus;
  eligibility: Eligibility;
  examPattern: ExamPattern;
  syllabus: SyllabusSection[];
  importantDates: ImportantDate[];
  lastUpdated: string;
  year: number;
  tags: string[];
}

export interface Eligibility {
  educationRequired: string;
  ageLimit: { min: number; max: number };
  ageRelaxation: Record<string, string>;
  attempts: string | null;
  nationality: string;
}

export interface ExamPattern {
  stages: ExamStage[];
  mode: "Online" | "Offline" | "Both";
  language: string[];
  negativeMarking: string | null;
}

export interface ExamStage {
  name: string;
  subjects: PatternSubject[];
  totalMarks: number;
  duration: string;
  totalQuestions: number;
  type: "MCQ" | "Descriptive" | "Skill Test" | "Interview";
}

export interface PatternSubject {
  name: string;
  questions: number;
  marks: number;
}

export interface SyllabusSection {
  stageName: string;
  subjects: SyllabusSubject[];
}

export interface SyllabusSubject {
  name: string;
  topics: string[];
}

export interface ImportantDate {
  event: string;
  date: string;
  isConfirmed: boolean;
}

export interface CategoryInfo {
  name: string;
  slug: ExamCategory;
  description: string;
  color: string;
  bgColor: string;
  icon: string;
}

export type ResultStatus = "declared" | "upcoming" | "awaited" | "answer_key";

export interface ExamResult {
  id: string;
  examSlug: string;
  examName: string;
  shortName: string;
  conductingBody: string;
  category: ExamCategory;
  resultStatus: ResultStatus;
  resultDate: string;
  resultUrl: string;
  scoreCardUrl: string | null;
  answerKeyUrl: string | null;
  cutOffUrl: string | null;
  meritListUrl: string | null;
  officialWebsite: string;
  year: number;
  session: string;
  howToCheck: string[];
  requiredDetails: string[];
  highlights: string[];
  cutOff: CutOffData | null;
  previousResults: PreviousResult[];
  importantLinks: ResultLink[];
  nextStage: string;
  lastUpdated: string;
}

export interface CutOffData {
  year: number;
  session: string;
  categories: CutOffCategory[];
}

export interface CutOffCategory {
  category: string;
  cutoff: number;
  maxMarks: number;
}

export interface PreviousResult {
  year: number;
  session: string;
  generalCutoff: number;
  totalQualified: number;
  resultDate: string;
}

export interface ResultLink {
  label: string;
  url: string;
  type: "result" | "scorecard" | "answerkey" | "cutoff" | "notification";
}
