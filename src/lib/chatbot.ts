import Fuse from "fuse.js";
import { getAllExams, formatDate } from "@/lib/utils";
import type { Exam } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import { knowledgeBase } from "@/lib/knowledge-base";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface KnowledgeEntry {
  examSlug: string;
  category: string;
  question: string;
  keywords: string[];
  answer: string;
  source?: string;
}

export interface ChatResponse {
  text: string;
  links?: { label: string; to: string }[];
  verified: boolean;
  source?: string;
}

// ---------------------------------------------------------------------------
// Fuse instances (lazy-initialised so import order doesn't matter)
// ---------------------------------------------------------------------------

let examFuse: Fuse<Exam> | null = null;
let kbFuse: Fuse<KnowledgeEntry> | null = null;

function getExamFuse(): Fuse<Exam> {
  if (!examFuse) {
    examFuse = new Fuse(getAllExams(), {
      keys: [
        { name: "name", weight: 2 },
        { name: "shortName", weight: 2.5 },
        { name: "tags", weight: 1.5 },
        { name: "description", weight: 1 },
        { name: "conductingBody", weight: 1 },
        { name: "category", weight: 0.8 },
        { name: "syllabus.subjects.name", weight: 0.7 },
        { name: "syllabus.subjects.topics", weight: 0.5 },
      ],
      threshold: 0.4,
      includeScore: true,
    });
  }
  return examFuse;
}

function getKBFuse(): Fuse<KnowledgeEntry> {
  if (!kbFuse) {
    const kb: KnowledgeEntry[] = (knowledgeBase ?? []) as KnowledgeEntry[];
    kbFuse = new Fuse(kb, {
      keys: [
        { name: "question", weight: 2 },
        { name: "keywords", weight: 2.5 },
        { name: "category", weight: 1 },
        { name: "examSlug", weight: 1.5 },
        { name: "answer", weight: 0.5 },
      ],
      threshold: 0.35,
      includeScore: true,
    });
  }
  return kbFuse;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function findExam(query: string): Exam | null {
  const results = getExamFuse().search(query, { limit: 1 });
  return results.length > 0 && (results[0].score ?? 1) < 0.5
    ? results[0].item
    : null;
}

function findExams(query: string, limit = 5): Exam[] {
  return getExamFuse()
    .search(query, { limit })
    .map((r) => r.item);
}

function findKBEntries(query: string, limit = 3): { item: KnowledgeEntry; score: number }[] {
  return getKBFuse()
    .search(query, { limit })
    .map((r) => ({ item: r.item, score: r.score ?? 1 }));
}

function verified(text: string, links?: { label: string; to: string }[], source?: string): ChatResponse {
  return { text, links, verified: true, source };
}

function unverified(text: string, links?: { label: string; to: string }[]): ChatResponse {
  return { text, links, verified: false };
}

// ---------------------------------------------------------------------------
// Intent detection helpers
// ---------------------------------------------------------------------------

interface Intent {
  name: string;
  pattern: RegExp;
}

const INTENTS: Intent[] = [
  { name: "syllabus", pattern: /syllabus|topics?|subjects?|what to (study|read|prepare)|curriculum/ },
  { name: "pattern", pattern: /pattern|format|structure|how many (questions|marks|papers)|duration|time limit|paper\s*pattern/ },
  { name: "eligibility", pattern: /eligib|age\s*(limit)?|qualification|education|who can|criteria|requirement|can i (apply|appear)/ },
  { name: "dates", pattern: /date|when|schedule|calendar|deadline|last date|notification|form\s*date/ },
  { name: "preparation", pattern: /how to prepare|preparation|strategy|study\s*plan|topper|tips for prep|preparation tips/ },
  { name: "books", pattern: /best books?|recommended books?|study material|books? for|reference books?/ },
  { name: "cutoff", pattern: /cut[\s-]?off|cutoff|minimum marks|qualifying marks|cut off marks/ },
  { name: "salary", pattern: /salary|pay\s*scale|in[\s-]?hand|ctc|compensation|monthly salary|pay band|grade pay/ },
  { name: "selection", pattern: /selection process|stages of selection|how (are|is) .*(selected|chosen)|recruitment process/ },
  { name: "admitcard", pattern: /admit\s*card|hall\s*ticket|download.*admit|admit.*download|call letter/ },
  { name: "result", pattern: /result|merit\s*list|score\s*card|when.*result|result.*date|result.*come/ },
  { name: "answerkey", pattern: /answer\s*key|response\s*sheet|objection|answer.*key/ },
  { name: "physical", pattern: /physical\s*(test|standard|fitness|efficiency)|PET|PST|medical\s*(test|exam|standard)|height|chest|running/ },
  { name: "documents", pattern: /document|verification|documents?\s*(needed|required|for)|doc\s*verification/ },
  { name: "reservation", pattern: /reserv(ation|ed)|SC\s*ST|OBC|EWS|quota|category\s*wise|relaxation.*category/ },
  { name: "negativemarking", pattern: /negative\s*marking|penalty|deduction|minus\s*marks|negative.*marks/ },
  { name: "youtube", pattern: /youtube|channel|video|best\s*channel|youtube.*channel/ },
  { name: "coaching", pattern: /coaching|institute|academy|best\s*coaching|coaching.*for|online\s*coaching/ },
  { name: "mocktest", pattern: /mock\s*test|practice\s*(test|paper)|test\s*series|free\s*mock|online\s*test/ },
  { name: "currentaffairs", pattern: /current\s*affairs?|gk|general\s*knowledge|current.*source|news\s*source/ },
  { name: "tips", pattern: /tips|last\s*minute|quick\s*tips|exam\s*day|revision|tricks/ },
  { name: "postpreference", pattern: /post\s*preference|best\s*post|job\s*profile|posting|which\s*post/ },
  { name: "comparison", pattern: /compare|difference|vs\.?|between|which.*better/ },
  { name: "download", pattern: /download|pdf|save|print/ },
];

function detectIntent(msg: string): string | null {
  for (const intent of INTENTS) {
    if (intent.pattern.test(msg)) return intent.name;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Exam-specific response builders
// ---------------------------------------------------------------------------

function buildSyllabusResponse(exam: Exam): ChatResponse {
  const syllabusInfo = exam.syllabus
    .map((s) => {
      const subs = s.subjects
        .map(
          (sub) =>
            `  - **${sub.name}**: ${sub.topics.slice(0, 5).join(", ")}${sub.topics.length > 5 ? "..." : ""}`
        )
        .join("\n");
      return `**${s.stageName}**\n${subs}`;
    })
    .join("\n\n");
  return unverified(
    `**${exam.shortName} Syllabus:**\n\n${syllabusInfo}\n\nDownload the full syllabus as PDF from the exam page.`,
    [{ label: `${exam.shortName} Full Details`, to: `/exams/${exam.slug}` }]
  );
}

function buildPatternResponse(exam: Exam): ChatResponse {
  const patternInfo = exam.examPattern.stages
    .map((s) => {
      const subs = s.subjects
        .map((sub) => `  - ${sub.name}: ${sub.questions} Qs, ${sub.marks} marks`)
        .join("\n");
      return `**${s.name}**\n  Total: ${s.totalQuestions} questions, ${s.totalMarks} marks, ${s.duration}\n  Type: ${s.type}\n${subs}`;
    })
    .join("\n\n");
  return unverified(
    `**${exam.shortName} Exam Pattern:**\n\nMode: ${exam.examPattern.mode}\nNegative Marking: ${exam.examPattern.negativeMarking || "None"}\nLanguages: ${exam.examPattern.language.join(", ")}\n\n${patternInfo}`,
    [{ label: `${exam.shortName} Details`, to: `/exams/${exam.slug}` }]
  );
}

function buildEligibilityResponse(exam: Exam): ChatResponse {
  let eligText = `**${exam.shortName} Eligibility:**\n\n`;
  eligText += `- Education: ${exam.eligibility.educationRequired}\n`;
  if (exam.eligibility.ageLimit.min > 0 || exam.eligibility.ageLimit.max > 0) {
    eligText += `- Age: ${exam.eligibility.ageLimit.min}-${exam.eligibility.ageLimit.max} years\n`;
  }
  if (Object.keys(exam.eligibility.ageRelaxation).length > 0) {
    const relaxation = Object.entries(exam.eligibility.ageRelaxation)
      .map(([cat, val]) => `${cat}: ${val}`)
      .join(", ");
    eligText += `- Age Relaxation: ${relaxation}\n`;
  }
  if (exam.eligibility.attempts) {
    eligText += `- Attempts: ${exam.eligibility.attempts}\n`;
  }
  eligText += `- Nationality: ${exam.eligibility.nationality}`;
  return unverified(eligText, [
    { label: `${exam.shortName} Full Details`, to: `/exams/${exam.slug}` },
  ]);
}

function buildDatesResponse(exam: Exam): ChatResponse {
  const datesInfo = exam.importantDates
    .map(
      (d) =>
        `- ${d.event}: **${formatDate(d.date)}** ${d.isConfirmed ? "(Confirmed)" : "(Tentative)"}`
    )
    .join("\n");
  return unverified(
    `**${exam.shortName} Important Dates (${exam.year}):**\n\n${datesInfo}\n\nStatus: ${exam.applicationStatus === "active" ? "Applications Open" : exam.applicationStatus === "upcoming" ? "Upcoming" : "Closed"}`,
    [{ label: `${exam.shortName} Details`, to: `/exams/${exam.slug}` }]
  );
}

function buildNegativeMarkingResponse(exam: Exam): ChatResponse {
  const nm = exam.examPattern.negativeMarking;
  const text = nm
    ? `**${exam.shortName} Negative Marking:**\n\n${nm}\n\nMode: ${exam.examPattern.mode}\nThis applies to all MCQ-based stages of the exam.`
    : `**${exam.shortName}** does not have negative marking (or it has not been specified). Please verify from the official notification.`;
  return unverified(text, [
    { label: `${exam.shortName} Exam Pattern`, to: `/exams/${exam.slug}` },
  ]);
}

function buildDownloadResponse(exam: Exam): ChatResponse {
  return unverified(
    `You can download the **${exam.shortName}** complete syllabus PDF from the exam detail page. Click the button below to go there and hit "Download Syllabus PDF".`,
    [{ label: `Download ${exam.shortName} Syllabus`, to: `/exams/${exam.slug}` }]
  );
}

function buildOverviewResponse(exam: Exam): ChatResponse {
  return unverified(
    `**${exam.shortName}** -- ${exam.name}\n\n${exam.description}\n\n- Conducting Body: ${exam.conductingBody}\n- Mode: ${exam.examPattern.mode}\n- Education: ${exam.eligibility.educationRequired}\n- Status: ${exam.applicationStatus === "active" ? "Applications Open" : exam.applicationStatus === "upcoming" ? "Upcoming" : "Closed"}\n\nAsk me about its syllabus, pattern, eligibility, dates, salary, cut-off, or preparation tips!`,
    [{ label: `View ${exam.shortName} Details`, to: `/exams/${exam.slug}` }]
  );
}

function buildComparisonResponse(a: Exam, b: Exam): ChatResponse {
  return unverified(
    `**${a.shortName} vs ${b.shortName}:**\n\n| | ${a.shortName} | ${b.shortName} |\n|---|---|---|\n| Body | ${a.conductingBody} | ${b.conductingBody} |\n| Education | ${a.eligibility.educationRequired.split(" ").slice(0, 4).join(" ")} | ${b.eligibility.educationRequired.split(" ").slice(0, 4).join(" ")} |\n| Mode | ${a.examPattern.mode} | ${b.examPattern.mode} |\n| Neg. Marking | ${a.examPattern.negativeMarking || "None"} | ${b.examPattern.negativeMarking || "None"} |\n| Status | ${a.applicationStatus} | ${b.applicationStatus} |`,
    [
      { label: a.shortName, to: `/exams/${a.slug}` },
      { label: b.shortName, to: `/exams/${b.slug}` },
    ]
  );
}

// ---------------------------------------------------------------------------
// Knowledge-base lookup
// ---------------------------------------------------------------------------

function tryKnowledgeBase(msg: string, examSlug?: string): ChatResponse | null {
  const entries = findKBEntries(msg, 5);
  if (entries.length === 0) return null;

  // If we know the exam, prefer entries matching that exam
  let best = entries[0];
  if (examSlug) {
    const examMatch = entries.find(
      (e) => e.item.examSlug === examSlug || e.item.examSlug === "general"
    );
    if (examMatch && examMatch.score < 0.5) {
      best = examMatch;
    }
  }

  if (best.score > 0.45) return null; // not confident enough

  const entry = best.item;
  const links: { label: string; to: string }[] = [];
  if (entry.examSlug && entry.examSlug !== "general") {
    links.push({ label: `${entry.examSlug.toUpperCase()} Details`, to: `/exams/${entry.examSlug}` });
  }

  return verified(entry.answer, links.length > 0 ? links : undefined, entry.source);
}

// ---------------------------------------------------------------------------
// Intent-specific fallback responses (when KB has no answer)
// ---------------------------------------------------------------------------

function buildIntentFallback(intent: string, exam: Exam | null): ChatResponse | null {
  const examName = exam ? exam.shortName : "this exam";
  const examLink = exam ? `/exams/${exam.slug}` : "/exams";

  const fallbacks: Record<string, () => ChatResponse> = {
    preparation: () =>
      unverified(
        `**How to Prepare for ${examName}:**\n\n- Start with the official syllabus and understand the exam pattern\n- Make a realistic study schedule (4-6 months for most exams)\n- Focus on NCERT books first, then move to advanced material\n- Practice previous year papers regularly\n- Take mock tests weekly and analyze your performance\n- Follow a good current affairs source daily\n- Join a study group or online community for motivation\n\nAsk me about specific topics, books, or mock tests!`,
        exam ? [{ label: `${examName} Syllabus`, to: examLink }] : undefined
      ),
    books: () =>
      unverified(
        `**Best Books for ${examName}:**\n\nI don't have a specific book list for this exam right now, but here are some general recommendations:\n\n- **Reasoning**: RS Aggarwal, MK Pandey\n- **Quantitative Aptitude**: RS Aggarwal, Rakesh Yadav\n- **English**: SP Bakshi, Plinth to Paramount\n- **General Knowledge**: Lucent GK, Manorama Yearbook\n\nFor subject-specific books, check the exam detail page.`,
        exam ? [{ label: `${examName} Details`, to: examLink }] : undefined
      ),
    cutoff: () =>
      unverified(
        `**${examName} Cut-off Marks:**\n\nCut-off marks vary each year and depend on:\n- Number of vacancies\n- Difficulty level of the paper\n- Number of candidates\n- Category (General/OBC/SC/ST/EWS)\n\nCheck the official website or our exam detail page for the latest cut-off information.`,
        exam ? [{ label: `${examName} Details`, to: examLink }] : undefined
      ),
    salary: () =>
      unverified(
        `**${examName} Salary Information:**\n\nSalary details depend on the specific post and pay level. I don't have the exact figures right now.\n\nCheck the exam detail page or official notification for pay scale information.`,
        exam ? [{ label: `${examName} Details`, to: examLink }] : undefined
      ),
    selection: () =>
      unverified(
        `**${examName} Selection Process:**\n\nThe selection process typically includes:\n- Written Examination (Tier-I, Tier-II, etc.)\n- Physical Test (for applicable posts)\n- Document Verification\n- Medical Examination\n- Final Merit List\n\nCheck the exam detail page for the exact stages.`,
        exam ? [{ label: `${examName} Details`, to: examLink }] : undefined
      ),
    admitcard: () =>
      unverified(
        `**${examName} Admit Card:**\n\nAdmit cards are typically released 1-2 weeks before the exam on the official website.\n\n**Steps to Download:**\n1. Visit the official website\n2. Go to Admit Card section\n3. Enter Registration Number and Date of Birth\n4. Download and take a printout\n\nKeep checking the official website and our Important Dates page.`,
        [{ label: "Important Dates", to: "/important-dates" }]
      ),
    result: () =>
      unverified(
        `**${examName} Result:**\n\nResults are usually declared on the official website. Keep checking:\n- Official website of the conducting body\n- Our Important Dates page for updates\n\nResults typically take 1-3 months after the exam.`,
        [{ label: "Important Dates", to: "/important-dates" }]
      ),
    answerkey: () =>
      unverified(
        `**${examName} Answer Key:**\n\nAnswer keys are usually released within a few days of the exam.\n\n**Steps:**\n1. Visit the official website\n2. Look for "Answer Key" in the latest notifications\n3. Download and check your answers\n4. File objections if any (within the given window)\n\nResponse sheets are also released along with answer keys in most exams.`,
        exam ? [{ label: `${examName} Details`, to: examLink }] : undefined
      ),
    physical: () =>
      unverified(
        `**${examName} Physical Test:**\n\nPhysical standards vary by exam and post. I don't have specific details right now.\n\nCommon physical tests include:\n- Running (1.6 km in a set time)\n- Height and chest measurements\n- Medical fitness test\n\nCheck the official notification for exact requirements.`,
        exam ? [{ label: `${examName} Details`, to: examLink }] : undefined
      ),
    documents: () =>
      unverified(
        `**Documents Required for ${examName}:**\n\nCommonly required documents:\n- 10th & 12th Marksheets and Certificates\n- Graduation Degree/Marksheets\n- Photo ID (Aadhar/PAN/Passport)\n- Category Certificate (if applicable)\n- Domicile Certificate\n- Recent Passport-size Photos\n- PWD Certificate (if applicable)\n\nCarry both originals and photocopies for verification.`,
        exam ? [{ label: `${examName} Details`, to: examLink }] : undefined
      ),
    reservation: () =>
      unverified(
        `**Reservation Policy for ${examName}:**\n\nGovernment exams follow the standard reservation policy:\n- SC: 15%\n- ST: 7.5%\n- OBC (Non-Creamy Layer): 27%\n- EWS: 10%\n\nAge relaxation is also provided for reserved categories. Check the specific exam notification for exact details.`,
        exam ? [{ label: `${examName} Eligibility`, to: examLink }] : undefined
      ),
    youtube: () =>
      unverified(
        `**Best YouTube Channels for ${examName} Preparation:**\n\nI don't have a specific channel list right now, but here are some popular ones:\n\n- **Unacademy** - Wide range of government exam content\n- **Adda247** - Banking, SSC, Railway exams\n- **Study IQ** - UPSC and general studies\n- **Wifistudy** - SSC, Banking, Railway\n- **PW (PhysicsWallah)** - Competitive exams\n\nSearch for "${examName} preparation" on YouTube for more.`
      ),
    coaching: () =>
      unverified(
        `**Coaching for ${examName}:**\n\nPopular coaching options:\n\n**Online:**\n- Unacademy, Testbook, Adda247, BYJU'S Exam Prep\n\n**Offline (Delhi-based):**\n- Paramount, KD Campus (SSC)\n- Career Power, IBT (Banking)\n- Vajiram & Ravi, Vision IAS (UPSC)\n\n**Tip:** Many toppers prepare through self-study with online resources. Coaching is helpful but not mandatory.`
      ),
    mocktest: () =>
      unverified(
        `**Mock Tests for ${examName}:**\n\nFree & paid platforms for mock tests:\n\n- **Testbook** - All exams, affordable\n- **Adda247** - Banking & SSC focus\n- **Oliveboard** - Banking exams\n- **Gradeup/BYJU'S Exam Prep** - All exams\n- **SSC Official** - Free mocks on ssc.nic.in\n\n**Tip:** Take at least 20-30 mock tests before the exam and analyze each one thoroughly.`
      ),
    currentaffairs: () =>
      unverified(
        `**Best Current Affairs Sources:**\n\n- **The Hindu / Indian Express** - Daily newspaper reading\n- **PIB (Press Information Bureau)** - Government source\n- **Monthly magazines**: Pratiyogita Darpan, Competition Success Review\n- **Apps**: Adda247, Testbook, GradeUp\n- **YouTube**: Study IQ Daily Current Affairs\n\n**Tip:** Make short notes daily and revise weekly.`
      ),
    tips: () =>
      unverified(
        `**Exam Tips for ${examName}:**\n\n- **Before Exam:** Get 7-8 hours of sleep, eat light\n- **During Exam:**\n  - Read all questions carefully\n  - Attempt easy questions first\n  - Don't spend too much time on one question\n  - Mark questions for review if unsure\n  - Be careful with negative marking\n- **Time Management:** Divide time equally among sections\n- **Last Minute:** Revise formulas, short notes, and current affairs`
      ),
    postpreference: () =>
      unverified(
        `**Post Preferences for ${examName}:**\n\nPost selection depends on your priorities:\n- **Salary & perks** - Higher grade posts\n- **Job location** - Posts with metro city postings\n- **Growth** - Posts with promotion opportunities\n- **Work-life balance** - Administrative posts\n\nCheck the official notification for the complete list of posts and their details.`,
        exam ? [{ label: `${examName} Details`, to: examLink }] : undefined
      ),
  };

  const handler = fallbacks[intent];
  if (handler) return handler();
  return null;
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export function getBotResponse(message: string): ChatResponse {
  const msg = message.toLowerCase().trim();

  // ---- Greetings ----
  if (
    /^(hi|hello|hey|namaste|hii+|good\s*(morning|evening|afternoon|night)|namaskar|kaise ho)/i.test(
      msg
    )
  ) {
    return unverified(
      "Hello! I'm your SarkariExamHub assistant. I can help you with:\n\n" +
        "- Exam syllabus, pattern & eligibility\n" +
        "- Important dates & application status\n" +
        "- Preparation strategy & best books\n" +
        "- Cut-off marks & salary details\n" +
        "- Selection process & admit cards\n" +
        "- Mock tests, coaching & YouTube channels\n" +
        "- Post comparisons (SSC CGL vs CHSL)\n\n" +
        "Just ask me about any government exam like SSC CGL, NEET, UPSC, IBPS PO, etc!"
    );
  }

  // ---- Help ----
  if (/^(help|what can you do|commands|options|menu)/i.test(msg)) {
    return unverified(
      "Here's what you can ask me:\n\n" +
        '- "SSC CGL syllabus" -- Get syllabus details\n' +
        '- "NEET exam pattern" -- Get exam pattern\n' +
        '- "UPSC eligibility" -- Get eligibility criteria\n' +
        '- "IBPS PO dates" -- Get important dates\n' +
        '- "SSC CGL salary" -- Salary information\n' +
        '- "SSC CGL cut off" -- Cut-off marks\n' +
        '- "How to prepare for UPSC" -- Preparation tips\n' +
        '- "Best books for NEET" -- Book recommendations\n' +
        '- "SSC CGL vs CHSL" -- Compare exams\n' +
        '- "Best coaching for JEE" -- Coaching info\n' +
        '- "Free mock tests" -- Mock test sources\n' +
        '- "Which exams are open?" -- Active applications'
    );
  }

  // ---- List all exams ----
  if (/^(list|show|all)\s*(all)?\s*exams?$/i.test(msg)) {
    const exams = getAllExams();
    const list = exams
      .map((e) => `- ${e.shortName} (${e.conductingBody})`)
      .join("\n");
    return unverified(`Here are all ${exams.length} exams we cover:\n\n${list}`, [
      { label: "Browse All Exams", to: "/exams" },
    ]);
  }

  // ---- Active/open applications ----
  if (/open|active|apply|application.*open|registration|form\s*(open|fill|submit)/i.test(msg)) {
    const active = getAllExams().filter((e) => e.applicationStatus === "active");
    if (active.length === 0) {
      return unverified(
        "No exams have open applications right now. Check back soon or visit the Important Dates page!",
        [{ label: "Important Dates", to: "/important-dates" }]
      );
    }
    const list = active
      .map(
        (e) =>
          `- **${e.shortName}** -- ${e.applicationLink ? "Apply online" : "Check official site"}`
      )
      .join("\n");
    return unverified(`These exams have applications open right now:\n\n${list}`, [
      ...active.map((e) => ({
        label: `${e.shortName} Details`,
        to: `/exams/${e.slug}`,
      })),
    ]);
  }

  // ---- Upcoming dates (general) ----
  if (/^(upcoming|next|important)\s*(dates?|exams?|deadlines?)/i.test(msg)) {
    return unverified(
      "Check the Important Dates page for all upcoming government exam deadlines in one place.",
      [{ label: "View Important Dates", to: "/important-dates" }]
    );
  }

  // ---- Category-based queries ----
  for (const cat of CATEGORIES) {
    const catTerms = [
      cat.slug,
      cat.name.toLowerCase(),
      cat.name.replace(" Exams", "").toLowerCase(),
    ];
    if (catTerms.some((t) => msg.includes(t))) {
      const exams = getAllExams().filter((e) => e.category === cat.slug);
      if (exams.length === 0) break;

      const list = exams
        .map((e) => {
          const status =
            e.applicationStatus === "active" ? " (Applications Open)" : "";
          return `- **${e.shortName}**${status}`;
        })
        .join("\n");

      return unverified(`Here are the ${cat.name} we cover:\n\n${list}`, [
        { label: `Browse ${cat.name}`, to: `/category/${cat.slug}` },
      ]);
    }
  }

  // ---- Detect intent ----
  const intent = detectIntent(msg);

  // ---- Try knowledge base first for specific intents ----
  if (intent) {
    const kbResult = tryKnowledgeBase(msg);
    if (kbResult) return kbResult;
  }

  // ---- Comparison queries (before single-exam) ----
  if (intent === "comparison" || /compare|vs\.?|between/i.test(msg)) {
    const matches = findExams(msg, 2);
    if (matches.length >= 2) {
      return buildComparisonResponse(matches[0], matches[1]);
    }
  }

  // ---- Exam-specific queries ----
  const exam = findExam(msg);
  if (exam) {
    // Try KB with exam context
    const kbResult = tryKnowledgeBase(msg, exam.slug);
    if (kbResult) {
      // Enrich KB result with exam link if missing
      if (!kbResult.links || kbResult.links.length === 0) {
        kbResult.links = [
          { label: `${exam.shortName} Details`, to: `/exams/${exam.slug}` },
        ];
      }
      return kbResult;
    }

    // Intent-based exam responses from structured data
    switch (intent) {
      case "syllabus":
        return buildSyllabusResponse(exam);
      case "pattern":
        return buildPatternResponse(exam);
      case "eligibility":
        return buildEligibilityResponse(exam);
      case "dates":
        return buildDatesResponse(exam);
      case "negativemarking":
        return buildNegativeMarkingResponse(exam);
      case "download":
        return buildDownloadResponse(exam);
      default:
        break;
    }

    // Intent-based fallbacks (generic but contextual)
    if (intent) {
      const fallback = buildIntentFallback(intent, exam);
      if (fallback) return fallback;
    }

    // General exam overview
    return buildOverviewResponse(exam);
  }

  // ---- No exam found but we have an intent ----
  if (intent) {
    // Try KB without exam context
    const kbResult = tryKnowledgeBase(msg);
    if (kbResult) return kbResult;

    // Generic intent fallback
    const fallback = buildIntentFallback(intent, null);
    if (fallback) return fallback;
  }

  // ---- Thank you ----
  if (/thank|thanks|dhanyavaad|shukriya/i.test(msg)) {
    return unverified(
      "You're welcome! All the best for your exam preparation. Feel free to ask anything else!"
    );
  }

  // ---- Goodbye ----
  if (/bye|goodbye|see you|tata|alvida/i.test(msg)) {
    return unverified(
      "Goodbye! Best of luck with your preparation. Come back anytime you need exam info!"
    );
  }

  // ---- Fuzzy fallback ----
  // Try KB one more time
  const kbFallback = tryKnowledgeBase(msg);
  if (kbFallback) return kbFallback;

  // Fuzzy exam matches
  const fuzzyMatches = findExams(msg, 3);
  if (fuzzyMatches.length > 0) {
    const suggestions = fuzzyMatches
      .map((e) => `- **${e.shortName}** -- ${e.description.substring(0, 80)}...`)
      .join("\n");
    return unverified(
      `I found these related exams:\n\n${suggestions}\n\nTry asking about a specific exam's syllabus, pattern, eligibility, dates, salary, or preparation tips.`,
      fuzzyMatches.map((e) => ({ label: e.shortName, to: `/exams/${e.slug}` }))
    );
  }

  // ---- Ultimate fallback ----
  return unverified(
    "I'm not sure about that. I can help you with:\n\n" +
      "- Exam syllabus & pattern\n" +
      "- Eligibility & age criteria\n" +
      "- Important dates & deadlines\n" +
      "- Salary & cut-off marks\n" +
      "- Preparation tips & best books\n" +
      "- Mock tests & coaching\n" +
      "- Selection process & post preferences\n\n" +
      'Try asking something like "SSC CGL syllabus" or "NEET eligibility" or "How to prepare for UPSC"'
  );
}

// ---------------------------------------------------------------------------
// Context-aware suggestion chips
// ---------------------------------------------------------------------------

export function getSuggestionsForContext(
  lastBotMessage: string,
  lastUserMessage: string
): string[] {
  const msg = (lastUserMessage + " " + lastBotMessage).toLowerCase();

  // After syllabus query
  if (/syllabus/i.test(msg)) {
    return [
      "Exam pattern",
      "Best books",
      "How to prepare",
      "Download PDF",
      "Eligibility",
    ];
  }

  // After pattern query
  if (/pattern|marking/i.test(msg)) {
    return [
      "Syllabus",
      "Cut-off marks",
      "Negative marking",
      "Mock tests",
      "Eligibility",
    ];
  }

  // After eligibility query
  if (/eligib/i.test(msg)) {
    return [
      "Important dates",
      "Application status",
      "Age relaxation",
      "Reservation policy",
      "Selection process",
    ];
  }

  // After dates query
  if (/date|deadline/i.test(msg)) {
    return [
      "How to apply",
      "Admit card",
      "Result",
      "Syllabus",
      "Eligibility",
    ];
  }

  // After salary query
  if (/salary/i.test(msg)) {
    return [
      "Post preferences",
      "Selection process",
      "Cut-off marks",
      "SSC CGL vs CHSL",
      "Job profile",
    ];
  }

  // After preparation query
  if (/prepar/i.test(msg)) {
    return [
      "Best books",
      "Mock tests",
      "YouTube channels",
      "Coaching",
      "Current affairs",
    ];
  }

  // Default suggestions
  return [
    "Which exams are open?",
    "SSC CGL syllabus",
    "NEET exam pattern",
    "UPSC eligibility",
    "IBPS PO salary",
    "How to prepare for SSC",
  ];
}
