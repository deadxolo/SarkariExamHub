import type { CategoryInfo } from "./types";

export const SITE_NAME = "SarkariExamHub";

export const CATEGORIES: CategoryInfo[] = [
  {
    name: "SSC Exams",
    slug: "ssc",
    description: "Staff Selection Commission exams including CGL, CHSL, MTS, GD & more",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    icon: "Building2",
  },
  {
    name: "Banking Exams",
    slug: "banking",
    description: "IBPS, SBI, RBI and other banking recruitment exams",
    color: "text-green-700",
    bgColor: "bg-green-50",
    icon: "Landmark",
  },
  {
    name: "Railway Exams",
    slug: "railway",
    description: "RRB NTPC, Group D, ALP, JE and other railway exams",
    color: "text-red-700",
    bgColor: "bg-red-50",
    icon: "TrainFront",
  },
  {
    name: "UPSC Exams",
    slug: "upsc",
    description: "Civil Services, CDS, NDA, CAPF and other UPSC conducted exams",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    icon: "Award",
  },
  {
    name: "Defence Exams",
    slug: "defence",
    description: "NDA, CDS, AFCAT, Navy and other defence recruitment exams",
    color: "text-slate-700",
    bgColor: "bg-slate-100",
    icon: "Shield",
  },
  {
    name: "Teaching Exams",
    slug: "teaching",
    description: "CTET, UGC NET, KVS, NVS and other teaching recruitment exams",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    icon: "GraduationCap",
  },
];
