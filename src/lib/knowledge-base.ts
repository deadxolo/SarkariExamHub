import type { KnowledgeEntry } from "@/lib/chatbot";

export const knowledgeBase: KnowledgeEntry[] = [
  // ── SSC CGL ──────────────────────────────────────────────
  {
    examSlug: "ssc-cgl",
    category: "salary",
    question: "SSC CGL salary",
    keywords: ["ssc cgl salary", "cgl in-hand salary", "cgl pay", "cgl grade pay", "ssc cgl in hand"],
    answer:
      "**SSC CGL Salary (2025):**\n\n| Post | Pay Level | In-Hand Salary |\n|---|---|---|\n| Inspector (Income Tax / CBI) | Level 7 | Rs 44,900 - 1,42,400 |\n| Assistant (CSS / MEA) | Level 7 | Rs 44,900 - 1,42,400 |\n| Sub-Inspector (NIA / CBI) | Level 7 | Rs 44,900 - 1,42,400 |\n| Auditor / Accountant | Level 5 | Rs 29,200 - 92,300 |\n| Tax Assistant | Level 4 | Rs 25,500 - 81,100 |\n| UDC | Level 4 | Rs 25,500 - 81,100 |\n\nIn-hand salary for Level 7 posts is approximately Rs 52,000 - 58,000 per month (varies by city).",
    source: "https://ssc.nic.in",
  },
  {
    examSlug: "ssc-cgl",
    category: "cutoff",
    question: "SSC CGL cut off marks",
    keywords: ["ssc cgl cut off", "cgl cut off 2025", "cgl qualifying marks", "ssc cgl minimum marks"],
    answer:
      "**SSC CGL Cut-Off Marks (Recent Years):**\n\n| Year | General | OBC | SC | ST | EWS |\n|---|---|---|---|---|---|\n| 2023 | 175.92 | 157.74 | 143.63 | 126.80 | 155.97 |\n| 2022 | 180.04 | 164.98 | 146.95 | 130.00 | 160.00 |\n\nCut-off varies by tier and post. These are Tier-I cut-off marks (out of 200). Tier-II cut-offs are released separately.\n\n**Note:** Cut-off changes every year based on difficulty, vacancies, and number of candidates.",
    source: "https://ssc.nic.in",
  },
  {
    examSlug: "ssc-cgl",
    category: "preparation",
    question: "How to prepare for SSC CGL",
    keywords: ["ssc cgl preparation", "prepare for cgl", "ssc cgl strategy", "cgl study plan"],
    answer:
      "**SSC CGL Preparation Strategy:**\n\n**1. Know the Syllabus & Pattern**\n- Tier I: 100 MCQs, 60 mins, 200 marks\n- Focus: Quant, Reasoning, English, GK\n\n**2. Best Books:**\n- Quant: Rakesh Yadav, RS Aggarwal\n- Reasoning: MK Pandey, Kiran Prakashan\n- English: SP Bakshi, Neetu Singh\n- GK: Lucent GK + Monthly CA\n\n**3. Daily Schedule (6 months plan):**\n- 2 hrs Quant, 2 hrs Reasoning\n- 1 hr English, 1 hr GK/CA\n- Weekend: Full mock test + analysis\n\n**4. Mock Tests:**\n- Start mocks after 2 months of prep\n- Take 30+ mocks before exam\n- Analyze every mock thoroughly\n\n**5. Previous Year Papers:**\n- Solve last 10 years papers\n- Kiran SSC CGL books are excellent",
  },
  {
    examSlug: "ssc-cgl",
    category: "books",
    question: "Best books for SSC CGL",
    keywords: ["best books ssc cgl", "cgl books", "ssc cgl study material", "ssc cgl reference books"],
    answer:
      "**Best Books for SSC CGL:**\n\n**Quantitative Aptitude:**\n- Rakesh Yadav Class Notes\n- RS Aggarwal (Basics)\n- Kiran SSC Maths\n\n**Reasoning:**\n- MK Pandey (BSC Publication)\n- Kiran Reasoning\n\n**English:**\n- SP Bakshi (Arihant)\n- Neetu Singh (KD Campus)\n- Plinth to Paramount\n\n**General Knowledge:**\n- Lucent GK\n- Arihant General Knowledge\n\n**Current Affairs:**\n- Monthly Pratiyogita Darpan\n- Adda247 Monthly Capsule\n\n**Previous Year Papers:**\n- Kiran SSC CGL Solved Papers",
  },
  {
    examSlug: "ssc-cgl",
    category: "postpreference",
    question: "Best posts in SSC CGL",
    keywords: ["ssc cgl best post", "cgl post preference", "cgl job profile", "best posting ssc cgl"],
    answer:
      "**Best Posts in SSC CGL (by popularity):**\n\n**Top Picks:**\n1. **Assistant in CSS** - Work in central ministries, Delhi posting\n2. **Inspector (Income Tax)** - Good salary + perks\n3. **Inspector (CBI)** - Prestigious, investigative role\n4. **Assistant in MEA** - Chance for foreign postings\n\n**Stable Picks:**\n5. **Auditor (C&AG)** - Accounting role, less pressure\n6. **Tax Assistant (CBDT/CBIC)** - Good work-life balance\n\n**Factors to Consider:**\n- Salary & allowances\n- City of posting\n- Promotion prospects\n- Work pressure\n- Transfer frequency",
  },

  // ── SSC CHSL ─────────────────────────────────────────────
  {
    examSlug: "ssc-chsl",
    category: "salary",
    question: "SSC CHSL salary",
    keywords: ["ssc chsl salary", "chsl in-hand salary", "chsl pay", "ldc salary", "deo salary ssc"],
    answer:
      "**SSC CHSL Salary:**\n\n| Post | Pay Level | Basic Pay |\n|---|---|---|\n| LDC / JSA | Level 2 | Rs 19,900 - 63,200 |\n| Postal Assistant / SA | Level 4 | Rs 25,500 - 81,100 |\n| DEO | Level 4 | Rs 25,500 - 81,100 |\n\nIn-hand salary (with DA, HRA):\n- LDC: Rs 22,000 - 28,000/month\n- PA/SA: Rs 30,000 - 38,000/month\n- DEO: Rs 30,000 - 38,000/month\n\nHRA varies by city (X, Y, Z category).",
    source: "https://ssc.nic.in",
  },

  // ── SSC CGL vs CHSL ──────────────────────────────────────
  {
    examSlug: "general",
    category: "comparison",
    question: "SSC CGL vs CHSL difference",
    keywords: ["ssc cgl vs chsl", "difference cgl chsl", "cgl or chsl", "chsl vs cgl which better"],
    answer:
      "**SSC CGL vs CHSL Comparison:**\n\n| Feature | CGL | CHSL |\n|---|---|---|\n| Education | Graduation | 12th Pass |\n| Pay Level | Level 4-7 | Level 2-4 |\n| Salary | Rs 25,500 - 1,42,400 | Rs 19,900 - 81,100 |\n| Posts | Inspector, Assistant, Auditor | LDC, PA, DEO |\n| Difficulty | Higher | Moderate |\n| Tiers | Tier I + II | Tier I + II + Typing |\n| Promotion | Faster | Slower |\n\n**Verdict:** If you are a graduate, go for CGL. Higher salary, better posts, faster promotions.",
  },

  // ── IBPS PO ──────────────────────────────────────────────
  {
    examSlug: "ibps-po",
    category: "salary",
    question: "IBPS PO salary",
    keywords: ["ibps po salary", "po in-hand salary", "bank po salary", "ibps po pay"],
    answer:
      "**IBPS PO Salary:**\n\n- Basic Pay: Rs 36,000 (starting)\n- DA: ~Rs 13,000\n- HRA: Rs 3,600 - 5,400\n- Other Allowances: Rs 3,000 - 5,000\n\n**In-Hand Salary: Rs 52,000 - 58,000/month** (varies by city)\n\n**Additional Perks:**\n- Leased accommodation or HRA\n- Medical insurance for family\n- Pension (NPS)\n- Loan facilities at reduced rates\n- Festival advance\n\n**After 3 years:** Promotion to Senior Officer, salary Rs 65,000+",
    source: "https://ibps.in",
  },

  // ── UPSC ─────────────────────────────────────────────────
  {
    examSlug: "upsc-cse",
    category: "preparation",
    question: "How to prepare for UPSC",
    keywords: ["upsc preparation", "ias preparation", "upsc strategy", "how to crack upsc", "upsc study plan"],
    answer:
      "**UPSC CSE Preparation Strategy:**\n\n**Phase 1: Foundation (3-4 months)**\n- Read NCERTs (Class 6-12) for History, Geography, Polity, Economy, Science\n- Build newspaper reading habit (The Hindu / Indian Express)\n\n**Phase 2: Main Study (6-8 months)**\n- History: Spectrum (Modern), Tamil Nadu Board (Ancient & Medieval)\n- Polity: Laxmikanth\n- Geography: Majid Husain + NCERT\n- Economy: Ramesh Singh / Sriram IAS notes\n- Science & Tech: Current affairs based\n- Essay: Practice weekly\n\n**Phase 3: Revision & Mocks (3-4 months)**\n- Take Prelims test series (Vision IAS, ForumIAS)\n- Write Mains answer practice daily\n- Revise current affairs compilations\n\n**Key Tips:**\n- Optional subject: Choose based on interest + scoring\n- CSAT: Practice basic Maths + Comprehension\n- 12-14 months minimum preparation needed",
  },
  {
    examSlug: "upsc-cse",
    category: "selection",
    question: "UPSC selection process",
    keywords: ["upsc selection process", "ias selection", "upsc stages", "civil services stages"],
    answer:
      "**UPSC Civil Services Selection Process:**\n\n**Stage 1: Prelims (June)**\n- Paper I: General Studies (100 MCQs, 200 marks)\n- Paper II: CSAT (80 MCQs, qualifying - 33%)\n- Only Paper I marks count for qualification\n\n**Stage 2: Mains (September)**\n- 9 Papers (total 1750 marks)\n- 4 GS Papers + 1 Essay + 2 Optional + 2 Language (qualifying)\n- Descriptive examination\n\n**Stage 3: Interview (March-April)**\n- Personality Test: 275 marks\n- Panel of 5 members, 30-45 minutes\n\n**Final Merit:** Mains (1750) + Interview (275) = 2025 marks\n\nTotal process takes about 1 year from Prelims to final result.",
    source: "https://upsc.gov.in",
  },

  // ── NEET ─────────────────────────────────────────────────
  {
    examSlug: "neet",
    category: "books",
    question: "Best books for NEET physics",
    keywords: ["neet physics books", "best books neet", "physics for neet", "neet study material physics"],
    answer:
      "**Best Books for NEET Physics:**\n\n**Must-Have:**\n- NCERT Physics (Class 11 & 12) - Most Important!\n- DC Pandey (Arihant) - Theory + Problems\n- HC Verma (Concepts of Physics) - Conceptual clarity\n\n**Practice:**\n- Irodov (Advanced problems)\n- MTG NEET previous year chapter-wise\n- Disha 40 Years NEET Solved Papers\n\n**Tips:**\n- NCERT is the Bible for NEET Physics\n- Focus on Mechanics, Optics, Modern Physics\n- Practice numerical problems daily\n- 60% questions come directly from NCERT concepts",
  },
  {
    examSlug: "neet",
    category: "negativemarking",
    question: "NEET negative marking scheme",
    keywords: ["neet negative marking", "neet marking scheme", "neet penalty", "neet minus marks"],
    answer:
      "**NEET Negative Marking Scheme:**\n\n**Section A (35 questions per subject):**\n- Correct Answer: +4 marks\n- Wrong Answer: -1 mark\n- Unanswered: 0 marks\n\n**Section B (15 questions, attempt any 10):**\n- Correct Answer: +4 marks\n- Wrong Answer: -1 mark\n- Unanswered: 0 marks\n\n**Total:** 200 questions, 720 marks (180 counted)\n\n**Strategy:**\n- Don't guess randomly (25% chance - not worth the risk)\n- If you can eliminate 2 options, it's worth attempting\n- Leave truly unknown questions blank",
    source: "https://neet.nta.nic.in",
  },

  // ── General / Cross-exam ─────────────────────────────────
  {
    examSlug: "general",
    category: "currentaffairs",
    question: "Best current affairs source for government exams",
    keywords: ["current affairs", "best source current affairs", "current affairs for ssc", "gk source", "current affairs app"],
    answer:
      "**Best Current Affairs Sources:**\n\n**Daily:**\n- The Hindu / Indian Express newspaper\n- PIB (Press Information Bureau)\n- Adda247 Daily Quiz\n\n**Monthly:**\n- Pratiyogita Darpan\n- Competition Success Review\n- Adda247 Monthly Capsule (Free PDF)\n\n**Apps:**\n- Testbook (Daily GK)\n- Adda247\n- GradeUp / BYJU's Exam Prep\n\n**YouTube:**\n- Study IQ Daily Current Affairs\n- Adda247 Daily Show\n\n**Tip:** Spend 30 minutes daily on current affairs. Make short notes and revise weekly.",
  },
  {
    examSlug: "general",
    category: "mocktest",
    question: "Free mock tests for government exams",
    keywords: ["free mock test", "online mock test", "practice test", "test series free", "mock test banking ssc"],
    answer:
      "**Free Mock Test Platforms:**\n\n- **Testbook** - 1 free mock per exam + affordable plans\n- **Adda247** - Free mocks for banking & SSC\n- **Oliveboard** - Free banking mocks\n- **Gradeup / BYJU's Exam Prep** - Free sectional tests\n- **SSC Official** - Free mocks on ssc.nic.in\n- **IBPS Official** - Free pre-exam training\n- **Embibe** - Free JEE/NEET mocks\n\n**Paid (Best Value):**\n- Testbook: Rs 499/year (all exams)\n- Adda247: Rs 299/month\n- Oliveboard: Rs 499/6 months\n\n**Tip:** Take at least 25-30 full mocks before any exam. Analysis is more important than the score.",
  },
  {
    examSlug: "general",
    category: "youtube",
    question: "Best YouTube channels for government exam preparation",
    keywords: ["youtube channel", "best youtube", "youtube for upsc", "youtube ssc", "youtube banking"],
    answer:
      "**Best YouTube Channels by Exam:**\n\n**SSC/Banking:**\n- Rakesh Yadav Readers Publication\n- Adda247\n- Wifistudy (by Unacademy)\n- KD Live\n\n**UPSC:**\n- StudyIQ IAS\n- Drishti IAS\n- Vision IAS\n- Unacademy UPSC\n\n**NEET/JEE:**\n- PhysicsWallah\n- Unacademy JEE/NEET\n- Vedantu\n\n**General:**\n- Khan Sir (Patna) - GK & Reasoning\n- Dear Sir - English\n- CareerWill App\n\n**Tip:** Don't watch too many channels. Pick 1-2 per subject and be consistent.",
  },
  {
    examSlug: "general",
    category: "coaching",
    question: "Best coaching for government exams",
    keywords: ["best coaching", "coaching institute", "coaching for ssc", "coaching for banking", "coaching for upsc", "online coaching"],
    answer:
      "**Best Coaching Institutes:**\n\n**Online (All Exams):**\n- Unacademy\n- Testbook\n- Adda247 (BYJU's Exam Prep)\n- PhysicsWallah (JEE/NEET)\n\n**SSC (Offline - Delhi):**\n- Paramount Coaching\n- KD Campus\n- Pinnacle Coaching\n\n**Banking (Offline):**\n- Career Power\n- IBT Institute\n- Mahendra's\n\n**UPSC (Offline - Delhi):**\n- Vajiram & Ravi\n- Vision IAS\n- Drishti IAS\n- Forum IAS\n\n**Tip:** Online coaching is now equally effective and much cheaper. Many toppers prepare through self-study + online resources.",
  },
  {
    examSlug: "general",
    category: "documents",
    question: "Documents needed for government exam verification",
    keywords: ["documents needed", "document verification", "documents for ssc", "documents required", "doc verification list"],
    answer:
      "**Documents Required for Government Exam Verification:**\n\n**Identity:**\n- Aadhar Card\n- PAN Card\n- Voter ID / Passport\n\n**Education:**\n- 10th Marksheet & Certificate\n- 12th Marksheet & Certificate\n- Graduation Degree & Marksheets\n- Post-Graduation (if applicable)\n\n**Category:**\n- Caste Certificate (SC/ST/OBC)\n- EWS Certificate\n- PWD Certificate (if applicable)\n- Ex-Serviceman Certificate (if applicable)\n\n**Other:**\n- Recent Passport-size Photos (4-6)\n- Domicile Certificate\n- NOC from current employer (if working)\n- Character Certificate\n\n**Tip:** Get all certificates attested. Carry both originals AND 2 sets of photocopies.",
  },
  {
    examSlug: "general",
    category: "reservation",
    question: "Reservation policy in government exams",
    keywords: ["reservation", "sc st reservation", "obc reservation", "ews reservation", "quota government exam"],
    answer:
      "**Reservation Policy in Government Exams:**\n\n| Category | Reservation | Age Relaxation |\n|---|---|---|\n| SC | 15% | +5 years |\n| ST | 7.5% | +5 years |\n| OBC (Non-Creamy Layer) | 27% | +3 years |\n| EWS | 10% | Varies |\n| PWD (General) | - | +10 years |\n| PWD (OBC) | - | +13 years |\n| PWD (SC/ST) | - | +15 years |\n| Ex-Serviceman | - | +5 years (after deducting military service) |\n\n**Note:**\n- OBC candidates must have Non-Creamy Layer certificate\n- EWS certificate is valid for 1 financial year\n- Reservation percentage may vary for state-level exams",
    source: "https://dopt.gov.in",
  },

  // ── SSC GD ───────────────────────────────────────────────
  {
    examSlug: "ssc-gd",
    category: "physical",
    question: "SSC GD physical test standards",
    keywords: ["ssc gd physical", "ssc gd height", "ssc gd running", "ssc gd physical test", "ssc gd pet pst"],
    answer:
      "**SSC GD Physical Standards:**\n\n**Height (Male):**\n- General/OBC: 170 cm\n- SC/ST: 162.5 cm\n\n**Height (Female):**\n- General/OBC: 157 cm\n- SC/ST: 150 cm\n\n**Chest (Male only):**\n- Unexpanded: 80 cm\n- Expanded: 85 cm (5 cm expansion)\n\n**Running (PET):**\n- Male: 5 km in 24 minutes\n- Female: 1.6 km in 8.5 minutes\n\n**Note:** Relaxations apply for candidates from hill areas, NE states, and certain categories. Medical examination checks eyesight (6/6 and 6/9 without glasses), hearing, and general fitness.",
    source: "https://ssc.nic.in",
  },

  // ── NDA ──────────────────────────────────────────────────
  {
    examSlug: "nda",
    category: "physical",
    question: "NDA medical test and physical standards",
    keywords: ["nda medical test", "nda physical", "nda medical standards", "nda height weight", "nda fitness"],
    answer:
      "**NDA Physical & Medical Standards:**\n\n**Height:**\n- Army: 157 cm (minimum)\n- Navy: 157 cm\n- Air Force: 162.5 cm\n\n**Weight:** Proportional to height (BMI based)\n\n**Eyesight:**\n- Army: 6/6 in better eye, 6/9 in worse eye (without glasses)\n- Air Force: 6/6 in each eye (without glasses)\n- Navy: 6/6, 6/9\n\n**Medical Fitness:**\n- No flat foot, knock knee, or bow legs\n- No color blindness\n- Good hearing\n- No chronic diseases\n\n**SSB Interview (5 days):**\n- Day 1: Screening (OIR + PPDT)\n- Day 2-4: Psychological Tests, GTO, Interview\n- Day 5: Conference\n\n**Tip:** Start physical training 6 months before the SSB date.",
    source: "https://upsc.gov.in",
  },

  // ── IBPS PO vs SBI PO ────────────────────────────────────
  {
    examSlug: "general",
    category: "comparison",
    question: "IBPS PO vs SBI PO",
    keywords: ["ibps po vs sbi po", "sbi po vs ibps po", "which better ibps sbi", "difference ibps sbi po"],
    answer:
      "**IBPS PO vs SBI PO Comparison:**\n\n| Feature | IBPS PO | SBI PO |\n|---|---|---|\n| Conducting Body | IBPS | SBI |\n| Banks | 11 Public Sector Banks | SBI only |\n| Vacancies | 3,000-5,000 | 2,000-3,000 |\n| Basic Pay | Rs 36,000 | Rs 41,960 |\n| In-Hand | Rs 52,000-58,000 | Rs 56,000-62,000 |\n| Difficulty | Moderate | Higher |\n| Posting | Across India | Across India |\n| Prelims | 100 marks, 60 min | 100 marks, 60 min |\n\n**SBI PO** offers slightly higher salary and brand value.\n**IBPS PO** has more vacancies and options across 11 banks.\n\n**Tip:** Prepare for both simultaneously -- the syllabus is 90% same.",
  },

  // ── SBI PO ──────────────────────────────────────────────
  {
    examSlug: "sbi-po",
    category: "salary",
    question: "SBI PO salary",
    keywords: ["sbi po salary", "sbi po in hand", "sbi po pay", "sbi po compensation"],
    answer:
      "**SBI PO Salary:**\n\n- Basic Pay: Rs 41,960 (starting)\n- DA: ~Rs 15,500\n- HRA: Rs 4,200 - 6,300\n- Other Allowances: Rs 4,000 - 6,000\n\n**In-Hand Salary: Rs 56,000 - 62,000/month** (varies by city)\n\n**Additional Perks:**\n- Leased accommodation or HRA\n- Medical insurance for family\n- Pension (NPS)\n- Loan at concessional rates\n- Leave Fare Concession (LFC)\n- Festival advance\n\nSBI PO salary is ~Rs 4,000-5,000 higher than IBPS PO.",
    source: "https://sbi.co.in",
  },
  {
    examSlug: "sbi-po",
    category: "preparation",
    question: "How to prepare for SBI PO",
    keywords: ["sbi po preparation", "sbi po strategy", "sbi po study plan", "how to crack sbi po"],
    answer:
      "**SBI PO Preparation Strategy:**\n\n**Prelims (100 marks, 60 min):**\n- English: 30Q, Reasoning: 35Q, Quant: 35Q\n- Sectional time limits, sectional cutoff\n\n**Mains (200 marks, 3 hrs):**\n- Reasoning & Computer: 45Q\n- Data Analysis: 35Q\n- General/Economy/Banking: 40Q\n- English: 35Q\n- Descriptive: Essay + Letter (50 marks)\n\n**Best Books:**\n- Quant: RS Aggarwal, Arun Sharma\n- Reasoning: MK Pandey\n- English: SP Bakshi, Word Power Made Easy\n- Banking Awareness: Arihant Banking\n\n**Key Tips:**\n- Master DI & Puzzles (highest weightage)\n- Practice essay writing weekly\n- Follow RBI policies & banking news daily",
  },
  {
    examSlug: "sbi-po",
    category: "books",
    question: "Best books for SBI PO",
    keywords: ["sbi po books", "best books sbi po", "sbi po study material"],
    answer:
      "**Best Books for SBI PO:**\n\n**Quantitative Aptitude:**\n- RS Aggarwal\n- Arun Sharma (CAT level for Mains)\n- Rajesh Verma (Data Interpretation)\n\n**Reasoning:**\n- MK Pandey (BSC Publication)\n- Arihant Reasoning\n\n**English:**\n- SP Bakshi\n- Word Power Made Easy (vocabulary)\n- High School Grammar by Wren & Martin\n\n**Banking & General Awareness:**\n- Arihant Banking Awareness\n- Pratiyogita Darpan\n- The Hindu Business Line\n\n**Computer Knowledge:**\n- Arihant Computer Awareness\n- Kiran Computer\n\n**Previous Year Papers:**\n- Kiran SBI PO Solved Papers",
  },

  // ── IBPS Clerk ──────────────────────────────────────────
  {
    examSlug: "ibps-clerk",
    category: "salary",
    question: "IBPS Clerk salary",
    keywords: ["ibps clerk salary", "bank clerk salary", "clerk in hand", "ibps clerk pay"],
    answer:
      "**IBPS Clerk Salary:**\n\n- Basic Pay: Rs 19,900 (starting)\n- DA: ~Rs 7,400\n- HRA: Rs 2,000 - 3,000\n- Special Allowance: Rs 2,000\n\n**In-Hand Salary: Rs 28,000 - 35,000/month**\n\n**Perks:**\n- Medical insurance\n- Pension (NPS)\n- Loan benefits\n- Leave benefits\n\n**Promotion Path:**\n- Clerk → Officer (after 3-5 years through internal exam)\n- Many clerks become POs within 5 years",
    source: "https://ibps.in",
  },
  {
    examSlug: "ibps-clerk",
    category: "preparation",
    question: "How to prepare for IBPS Clerk",
    keywords: ["ibps clerk preparation", "ibps clerk strategy", "clerk exam prep"],
    answer:
      "**IBPS Clerk Preparation Strategy:**\n\n**Prelims (100 marks, 60 min):**\n- English: 30Q, Reasoning: 35Q, Quant: 35Q\n\n**Mains (200 marks, 160 min):**\n- Reasoning & Computer: 50Q, 60 min\n- English: 40Q, 35 min\n- Quant: 50Q, 45 min\n- General Awareness: 50Q, 25 min\n\n**3-Month Plan:**\n- Month 1: Basics of all subjects\n- Month 2: Practice & sectional tests\n- Month 3: Full mocks + revision\n\n**Tips:**\n- Focus on speed & accuracy\n- Practice 50 quant questions daily\n- Read The Hindu for vocabulary & awareness\n- Take 20+ full mocks before exam",
  },

  // ── SSC MTS ─────────────────────────────────────────────
  {
    examSlug: "ssc-mts",
    category: "salary",
    question: "SSC MTS salary",
    keywords: ["ssc mts salary", "mts in hand", "mts pay scale", "ssc mts compensation"],
    answer:
      "**SSC MTS Salary:**\n\n- Pay Level: Level 1\n- Basic Pay: Rs 18,000 - 56,900\n- DA: ~Rs 6,700\n- HRA: Rs 1,800 - 2,700\n\n**In-Hand Salary: Rs 22,000 - 26,000/month**\n\n**Posts:** Multi-Tasking Staff, Havaldar (CBIC/CBN)\n\n**Perks:**\n- Job security (government job)\n- Medical benefits\n- Pension (NPS)\n- Festival holidays\n- Promotion to LDC after 3-5 years",
    source: "https://ssc.nic.in",
  },
  {
    examSlug: "ssc-mts",
    category: "preparation",
    question: "How to prepare for SSC MTS",
    keywords: ["ssc mts preparation", "ssc mts strategy", "mts exam prep"],
    answer:
      "**SSC MTS Preparation Strategy:**\n\n**Paper I (CBE - 90 min):**\n- Numerical Aptitude: 25Q\n- Reasoning: 25Q\n- English/Hindi: 25Q\n- General Awareness: 25Q\n\n**Level:** 10th standard (easier than CGL/CHSL)\n\n**Best Books:**\n- Maths: RS Aggarwal (basics only)\n- Reasoning: MK Pandey (easy chapters)\n- English: Lucent English Grammar\n- GK: Lucent GK + Monthly CA\n\n**Tips:**\n- Focus on basics - questions are simple\n- Speed is key (90 min for 100 questions)\n- NCERT Class 8-10 books are sufficient\n- 2-3 months preparation is enough",
  },

  // ── SSC GD ──────────────────────────────────────────────
  {
    examSlug: "ssc-gd",
    category: "salary",
    question: "SSC GD Constable salary",
    keywords: ["ssc gd salary", "gd constable salary", "ssc gd pay", "constable in hand"],
    answer:
      "**SSC GD Constable Salary:**\n\n- Pay Level: Level 3\n- Basic Pay: Rs 21,700 - 69,100\n- DA: ~Rs 8,000\n- HRA: Rs 2,200 - 3,300\n\n**In-Hand Salary: Rs 28,000 - 35,000/month**\n\n**Forces:**\n- BSF, CISF, CRPF, SSB, ITBP, AR, NIA, SSF\n\n**Additional Benefits:**\n- Free ration & accommodation\n- Canteen facilities\n- Medical for family\n- Annual leave\n- Promotion to Head Constable in 5-7 years",
    source: "https://ssc.nic.in",
  },
  {
    examSlug: "ssc-gd",
    category: "preparation",
    question: "How to prepare for SSC GD",
    keywords: ["ssc gd preparation", "ssc gd strategy", "gd constable prep"],
    answer:
      "**SSC GD Preparation Strategy:**\n\n**CBE (60 min, 80Q):**\n- General Intelligence & Reasoning: 20Q\n- General Knowledge & Awareness: 20Q\n- Elementary Mathematics: 20Q\n- English/Hindi: 20Q\n\n**Physical Test:**\n- Male: 5 km run in 24 min\n- Female: 1.6 km run in 8.5 min\n\n**Best Books:**\n- Kiran SSC GD Solved Papers\n- Lucent GK\n- RS Aggarwal (basics)\n\n**Key Tips:**\n- Questions are 10th level - focus on speed\n- Start physical training 3 months early\n- Practice running daily\n- 2-3 months study is sufficient\n- GK from Lucent + monthly current affairs",
  },

  // ── RRB NTPC ────────────────────────────────────────────
  {
    examSlug: "rrb-ntpc",
    category: "salary",
    question: "RRB NTPC salary",
    keywords: ["rrb ntpc salary", "railway ntpc salary", "ntpc in hand", "railway pay"],
    answer:
      "**RRB NTPC Salary (by Level):**\n\n| Level | Post | Basic Pay |\n|---|---|---|\n| Level 5 | Station Master, Goods Guard | Rs 29,200 - 92,300 |\n| Level 3 | Commercial Clerk, Ticket Collector | Rs 21,700 - 69,100 |\n| Level 2 | Accounts Clerk, Junior Clerk | Rs 19,900 - 63,200 |\n\n**In-Hand Salary:**\n- Level 5: Rs 38,000 - 45,000/month\n- Level 3: Rs 28,000 - 35,000/month\n- Level 2: Rs 25,000 - 30,000/month\n\n**Perks:** Free rail pass, medical, quarters, DA",
    source: "https://www.rrbcdg.gov.in",
  },
  {
    examSlug: "rrb-ntpc",
    category: "preparation",
    question: "How to prepare for RRB NTPC",
    keywords: ["rrb ntpc preparation", "railway ntpc strategy", "ntpc study plan"],
    answer:
      "**RRB NTPC Preparation Strategy:**\n\n**CBT-1 (90 min, 100Q):**\n- Mathematics: 30Q\n- General Intelligence & Reasoning: 30Q\n- General Awareness: 40Q\n\n**CBT-2 (90 min, 120Q):**\n- Mathematics: 35Q\n- General Intelligence: 35Q\n- General Awareness: 50Q\n\n**Best Books:**\n- Maths: RS Aggarwal, Rakesh Yadav\n- Reasoning: MK Pandey\n- GK: Lucent GK + Railway-specific GK\n\n**Tips:**\n- GK has highest weightage - focus here\n- Study Railway-specific knowledge\n- Practice previous year papers\n- 4-month preparation plan is ideal",
  },
  {
    examSlug: "rrb-ntpc",
    category: "books",
    question: "Best books for RRB NTPC",
    keywords: ["rrb ntpc books", "best books railway", "ntpc study material"],
    answer:
      "**Best Books for RRB NTPC:**\n\n**Mathematics:**\n- RS Aggarwal\n- Rakesh Yadav Class Notes\n- Kiran Railway Maths\n\n**Reasoning:**\n- MK Pandey\n- Arihant Reasoning\n\n**General Awareness:**\n- Lucent GK (must-have)\n- Railway GK by Kiran\n- Arihant Railway General Knowledge\n\n**Current Affairs:**\n- Monthly Pratiyogita Darpan\n- Adda247 Railway Capsule\n\n**Previous Years:**\n- Kiran RRB NTPC Solved Papers\n- Youth Competition Times Railway Papers",
  },

  // ── RRB Group D ─────────────────────────────────────────
  {
    examSlug: "rrb-group-d",
    category: "salary",
    question: "RRB Group D salary",
    keywords: ["rrb group d salary", "railway group d pay", "group d in hand"],
    answer:
      "**RRB Group D Salary:**\n\n- Pay Level: Level 1\n- Basic Pay: Rs 18,000 - 56,900\n- DA: ~Rs 6,700\n- HRA: Rs 1,800 - 2,700\n\n**In-Hand Salary: Rs 22,000 - 27,000/month**\n\n**Posts:** Track Maintainer, Helper, Porter, Pointsman\n\n**Perks:**\n- Free rail pass (for self & family)\n- Medical benefits\n- Quarters (subject to availability)\n- Job security\n- Promotion to next level in 3-5 years",
    source: "https://www.rrbcdg.gov.in",
  },
  {
    examSlug: "rrb-group-d",
    category: "physical",
    question: "RRB Group D physical test",
    keywords: ["rrb group d physical", "group d running", "group d pet", "railway group d fitness"],
    answer:
      "**RRB Group D Physical Efficiency Test (PET):**\n\n**Male:**\n- Lift & carry 35 kg for 100 metres in 2 minutes\n- Run 1000 metres in 4 min 15 sec\n\n**Female:**\n- Lift & carry 20 kg for 100 metres in 2 minutes\n- Run 1000 metres in 5 min 40 sec\n\n**Relaxations:**\n- PwBD candidates: Exempted from PET\n\n**Tips:**\n- Practice weight carrying with backpack\n- Running practice: Start 2 months before\n- Interval training for speed\n- PET is qualifying only (no marks)",
    source: "https://www.rrbcdg.gov.in",
  },

  // ── UPSC CDS ────────────────────────────────────────────
  {
    examSlug: "cds",
    category: "salary",
    question: "CDS salary after training",
    keywords: ["cds salary", "cds officer salary", "army officer salary", "cds pay"],
    answer:
      "**CDS Officer Salary (after training):**\n\n- Pay Level: Level 10\n- Basic Pay: Rs 56,100\n- Military Service Pay: Rs 15,500\n- DA: ~Rs 21,000\n\n**In-Hand Salary: Rs 80,000 - 90,000/month** (Lieutenant)\n\n**Promotion Path:**\n- Lieutenant → Captain (2 yrs) → Major (6 yrs)\n- Major salary: Rs 1,00,000+/month\n\n**Additional Perks:**\n- Free accommodation (cantonment)\n- Free medical for family\n- Canteen facilities (subsidized)\n- Annual leave + casual leave\n- Pension after 20 years",
    source: "https://upsc.gov.in",
  },
  {
    examSlug: "cds",
    category: "physical",
    question: "CDS physical and SSB",
    keywords: ["cds ssb", "cds physical", "cds ssb interview", "cds medical test"],
    answer:
      "**CDS SSB Interview & Physical Standards:**\n\n**SSB Interview (5 days):**\n- Day 1: Screening (OIR + PPDT)\n- Day 2: Psychological Tests (TAT, WAT, SRT, SD)\n- Day 3: GTO Tasks (GD, GPE, PGT, HGT, etc.)\n- Day 4: Personal Interview + remaining GTO\n- Day 5: Conference\n\n**Physical Standards:**\n- Height: 157.5 cm (Male), varies by entry\n- Weight: Proportional to height\n- Eyesight: 6/6 (varies by arm)\n- No flat feet, knock knees\n\n**Tip:** SSB preparation takes 2-3 months. Practice public speaking, group discussions, and outdoor activities.",
    source: "https://upsc.gov.in",
  },

  // ── AFCAT ───────────────────────────────────────────────
  {
    examSlug: "afcat",
    category: "salary",
    question: "AFCAT salary",
    keywords: ["afcat salary", "air force salary", "iaf officer salary", "afcat pay"],
    answer:
      "**AFCAT Officer Salary:**\n\n- Pay Level: Level 10\n- Basic Pay: Rs 56,100\n- MSP: Rs 15,500\n- Flying Allowance: Rs 25,000 (for flying branch)\n\n**In-Hand Salary:**\n- Flying Branch: Rs 1,00,000 - 1,10,000/month\n- Ground Duty: Rs 80,000 - 90,000/month\n\n**Perks:**\n- Free accommodation in Air Force station\n- Free medical for family\n- Canteen/CSD facilities\n- Annual leave: 60 days\n- Air travel concessions",
    source: "https://afcat.cdac.in",
  },
  {
    examSlug: "afcat",
    category: "preparation",
    question: "How to prepare for AFCAT",
    keywords: ["afcat preparation", "afcat strategy", "air force exam prep"],
    answer:
      "**AFCAT Preparation Strategy:**\n\n**Written Exam (2 hrs, 300 marks):**\n- General Awareness: 50Q\n- Verbal Ability (English): 25Q\n- Numerical Ability: 18Q\n- Reasoning & Military Aptitude: 22Q\n\n**Best Books:**\n- RS Aggarwal (Quant & Reasoning)\n- Arihant AFCAT Guide\n- Lucent GK + Defence-specific GK\n\n**After Written:**\n- AFSB Interview (similar to SSB)\n- Medical Examination\n\n**Tips:**\n- Focus on defence & air force specific GK\n- Practice current affairs (defence focus)\n- Start AFSB preparation early\n- Physical fitness is assessed at AFSB",
  },

  // ── NDA ─────────────────────────────────────────────────
  {
    examSlug: "nda",
    category: "salary",
    question: "NDA salary and stipend",
    keywords: ["nda salary", "nda stipend", "nda officer salary", "nda pay"],
    answer:
      "**NDA Salary:**\n\n**During Training (3 years at NDA):**\n- Stipend: Rs 56,100/month (fixed)\n\n**After Commissioning (as Lieutenant):**\n- Basic Pay: Rs 56,100\n- MSP: Rs 15,500\n- DA: ~Rs 21,000\n\n**In-Hand: Rs 80,000 - 90,000/month**\n\n**Career Growth:**\n- Captain (4 yrs): Rs 90,000+\n- Major (10 yrs): Rs 1,10,000+\n- Lt Colonel: Rs 1,30,000+\n\n**Perks:** Free accommodation, medical, canteen, leave travel, pension after 20 years of service",
    source: "https://upsc.gov.in",
  },
  {
    examSlug: "nda",
    category: "preparation",
    question: "How to prepare for NDA exam",
    keywords: ["nda preparation", "nda strategy", "nda study plan", "how to crack nda"],
    answer:
      "**NDA Preparation Strategy:**\n\n**Paper I - Maths (300 marks, 2.5 hrs):**\n- Topics: Algebra, Calculus, Trigonometry, Vectors, Statistics\n- Books: RS Aggarwal, RD Sharma, NCERT 11-12\n\n**Paper II - GAT (600 marks, 2.5 hrs):**\n- English: Grammar, vocabulary, comprehension\n- GK: Physics, Chemistry, History, Geography, Current Affairs\n- Books: Lucent GK, Arihant NDA Guide, NCERT\n\n**Key Tips:**\n- Start preparation from Class 11\n- Maths is scoring - master formulas\n- Practice mental maths for speed\n- Read newspapers for current affairs\n- Physical fitness: Run, push-ups, pull-ups daily\n- SSB prep: Join NCC, develop leadership skills",
  },
  {
    examSlug: "nda",
    category: "books",
    question: "Best books for NDA exam",
    keywords: ["nda books", "best books nda", "nda study material"],
    answer:
      "**Best Books for NDA:**\n\n**Mathematics:**\n- RS Aggarwal (Quantitative Aptitude)\n- RD Sharma (Class 11-12)\n- Pathfinder NDA Maths (Arihant)\n\n**English:**\n- Wren & Martin Grammar\n- Word Power Made Easy (vocabulary)\n- SP Bakshi (Arihant)\n\n**General Knowledge:**\n- Lucent GK\n- Arihant NDA/NA Guide\n- NCERT History, Geography, Science (6-12)\n\n**Practice:**\n- Arihant NDA Solved Papers (last 10 years)\n- Pathfinder NDA/NA Entrance Exam\n\n**For SSB:**\n- Let's Crack SSB by Arihant\n- Word Association Test practice books",
  },

  // ── JEE Main ────────────────────────────────────────────
  {
    examSlug: "jee-main",
    category: "preparation",
    question: "How to prepare for JEE Main",
    keywords: ["jee main preparation", "jee strategy", "jee study plan", "how to crack jee"],
    answer:
      "**JEE Main Preparation Strategy:**\n\n**Phase 1: Concept Building (6 months)**\n- Complete NCERT thoroughly (Class 11 & 12)\n- Build concepts in Physics, Chemistry, Maths\n\n**Phase 2: Practice (3 months)**\n- Solve previous year papers (last 10 years)\n- Topic-wise problem practice\n\n**Phase 3: Mock Tests (3 months)**\n- Take 2 full mocks per week\n- Analyze mistakes and weak areas\n\n**Subject-wise Strategy:**\n- **Physics:** HC Verma → DC Pandey → PYQs\n- **Chemistry:** NCERT → MS Chauhan (Organic) → VK Jaiswal (Inorganic)\n- **Maths:** RD Sharma → Cengage → Arihant\n\n**Key Tips:**\n- JEE Main has 2 attempts (Jan & Apr)\n- Score 250+ for top NITs\n- NCERT Chemistry is very important",
  },
  {
    examSlug: "jee-main",
    category: "books",
    question: "Best books for JEE Main",
    keywords: ["jee main books", "best books jee", "jee study material"],
    answer:
      "**Best Books for JEE Main:**\n\n**Physics:**\n- NCERT (Class 11 & 12)\n- HC Verma (Concepts of Physics)\n- DC Pandey (Arihant)\n- Irodov (for advanced practice)\n\n**Chemistry:**\n- NCERT (Most Important!)\n- MS Chauhan (Organic)\n- VK Jaiswal (Inorganic)\n- N Avasthi (Physical)\n\n**Mathematics:**\n- RD Sharma (Basics)\n- Cengage (Advanced)\n- Arihant (Chapter-wise)\n- SL Loney (Trigonometry)\n\n**Practice:**\n- 41 Years JEE Solved Papers (Arihant)\n- Disha JEE Main Chapter-wise",
  },
  {
    examSlug: "jee-main",
    category: "cutoff",
    question: "JEE Main cut off for NIT",
    keywords: ["jee main cut off", "jee main nit cutoff", "jee qualifying marks", "jee main rank"],
    answer:
      "**JEE Main Cut-Off (General Category):**\n\n**For JEE Advanced eligibility:**\n- General: ~90 percentile\n- OBC: ~75 percentile\n- SC: ~55 percentile\n- ST: ~45 percentile\n\n**For Top NITs (approximate ranks):**\n- NIT Trichy/Surathkal: Under 5,000\n- NIT Warangal/Calicut: Under 10,000\n- Other NITs: Under 25,000\n\n**Score → Percentile (approximate):**\n- 250+ marks → 99+ percentile\n- 200+ marks → 97+ percentile\n- 150+ marks → 95+ percentile\n- 100+ marks → 90+ percentile\n\n**Note:** Cut-off varies each session. JEE Main has 300 marks total.",
    source: "https://jeemain.nta.nic.in",
  },
  {
    examSlug: "jee-main",
    category: "negativemarking",
    question: "JEE Main negative marking",
    keywords: ["jee main negative marking", "jee marking scheme", "jee main penalty"],
    answer:
      "**JEE Main Marking Scheme:**\n\n**Section A (MCQ - 20 questions per subject):**\n- Correct: +4 marks\n- Wrong: -1 mark\n- Unanswered: 0\n\n**Section B (Numerical - 10 questions, attempt 5):**\n- Correct: +4 marks\n- Wrong: -1 mark\n- Unanswered: 0\n\n**Total:** 300 marks (75 questions, attempt 75)\n\n**Strategy:**\n- Attempt all Section A questions (eliminate 2 options = worth it)\n- Section B: Only attempt if confident\n- Time management: 20 min per subject ideal",
    source: "https://jeemain.nta.nic.in",
  },

  // ── NEET UG ─────────────────────────────────────────────
  {
    examSlug: "neet-ug",
    category: "preparation",
    question: "How to prepare for NEET",
    keywords: ["neet preparation", "neet strategy", "neet study plan", "how to crack neet"],
    answer:
      "**NEET Preparation Strategy:**\n\n**Most Important Rule: NCERT is Bible for NEET!**\n\n**Physics (180 marks):**\n- NCERT → HC Verma → DC Pandey\n- Focus: Mechanics, Modern Physics, Optics\n- 60% questions from NCERT directly\n\n**Chemistry (180 marks):**\n- NCERT → MS Chauhan (Organic)\n- Physical: Practice numericals daily\n- Inorganic: Memorize from NCERT tables\n\n**Biology (360 marks - Most Important!):**\n- NCERT (read line by line, memorize diagrams)\n- Trueman's Biology for practice\n- Focus: Human Physiology, Genetics, Ecology\n\n**Daily Schedule (12 months):**\n- 3 hrs Biology, 2 hrs Physics, 2 hrs Chemistry\n- 1 hr revision, 1 mock test (weekly)\n\n**Score 650+ for top government medical colleges**",
  },
  {
    examSlug: "neet-ug",
    category: "cutoff",
    question: "NEET cut off marks",
    keywords: ["neet cut off", "neet qualifying marks", "neet cutoff 2025", "neet minimum marks"],
    answer:
      "**NEET Cut-Off Marks:**\n\n**Qualifying Percentile:**\n- General: 50th percentile\n- OBC/SC/ST: 40th percentile\n- PWD: 45th percentile\n\n**For Government Medical Colleges (approximate score):**\n- AIIMS Delhi: 700+\n- Top Government Colleges: 650+\n- State Government Colleges: 550-650\n- Private Colleges: 450-550\n\n**All India Quota (AIQ):**\n- 15% seats filled through AIQ counselling\n- Remaining 85% through state counselling\n\n**Note:** Total marks = 720. Competition is very high with 20+ lakh candidates.",
    source: "https://neet.nta.nic.in",
  },
  {
    examSlug: "neet-ug",
    category: "books",
    question: "Best books for NEET Biology",
    keywords: ["neet biology books", "biology for neet", "neet biology study material"],
    answer:
      "**Best Books for NEET Biology:**\n\n**Must-Have:**\n- NCERT Biology (Class 11 & 12) - READ LINE BY LINE!\n- Trueman's Elementary Biology (practice)\n\n**Additional:**\n- Pradeep's Biology\n- MTG Objective NCERT (chapter-wise MCQs)\n- MTG NEET Previous Year Papers\n\n**For Diagrams:**\n- AC Dutta (Botany diagrams)\n- Atlas of Human Anatomy\n\n**Important Chapters (High Weightage):**\n- Human Physiology (Body Fluids, Neural Control)\n- Genetics & Evolution\n- Plant Physiology\n- Ecology & Biodiversity\n\n**Tip:** Biology = 360/720 marks. Master NCERT Biology and you're halfway to a good score!",
  },
  {
    examSlug: "neet-ug",
    category: "salary",
    question: "Doctor salary after NEET",
    keywords: ["doctor salary", "mbbs salary", "neet salary", "medical salary india"],
    answer:
      "**Doctor Salary After MBBS (NEET):**\n\n**During Internship (1 year):**\n- Government Hospital: Rs 30,000 - 50,000/month\n\n**After MBBS:**\n- Government Doctor: Rs 60,000 - 90,000/month\n- Private Hospital: Rs 40,000 - 80,000/month\n\n**After MD/MS (Specialist):**\n- Government: Rs 1,00,000 - 1,80,000/month\n- Private: Rs 1,50,000 - 5,00,000/month\n\n**Super Specialist (DM/MCh):**\n- Rs 3,00,000 - 10,00,000+/month\n\n**Own Practice:**\n- Rs 2,00,000 - 50,00,000+/month (varies)\n\n**Note:** Government doctors also get pension, housing, and other benefits.",
  },

  // ── CUET UG ─────────────────────────────────────────────
  {
    examSlug: "cuet-ug",
    category: "preparation",
    question: "How to prepare for CUET UG",
    keywords: ["cuet preparation", "cuet strategy", "cuet ug prep", "how to crack cuet"],
    answer:
      "**CUET UG Preparation Strategy:**\n\n**Sections:**\n- Section IA: Language (13 languages)\n- Section IB: Language (20 languages)\n- Section II: Domain-specific (27 subjects)\n- Section III: General Test\n\n**Key Strategy:**\n- NCERT Class 12 is the primary source\n- Domain subjects based on Class 12 syllabus\n- General Test: Quant, Reasoning, GK, Current Affairs\n\n**Best Books:**\n- NCERT Class 12 (for domain subjects)\n- Arihant CUET Guide\n- Lucent GK (for General Test)\n\n**Tips:**\n- Most questions from NCERT directly\n- Practice time management\n- 45 min per section\n- No negative marking in some sections",
    source: "https://cuet.nta.nic.in",
  },
  {
    examSlug: "cuet-ug",
    category: "cutoff",
    question: "CUET UG cut off for DU",
    keywords: ["cuet cut off", "cuet du cutoff", "delhi university cutoff", "cuet minimum marks"],
    answer:
      "**CUET UG Cut-Off for Delhi University:**\n\nCut-offs vary by college and course. Approximate ranges:\n\n**Top Colleges (General):**\n- SRCC (B.Com Hons): 800+ out of 800\n- Hindu College: 780+\n- Miranda House: 770+\n- St. Stephen's: 760+\n\n**Mid-Tier Colleges:**\n- Daulat Ram, Gargi: 650-700\n- Deshbandhu, SPM: 550-650\n\n**Note:** CUET scores are used by 200+ universities, not just DU. Each university sets its own cut-off based on CUET percentile/score.",
    source: "https://cuet.nta.nic.in",
  },

  // ── UGC NET ─────────────────────────────────────────────
  {
    examSlug: "ugc-net",
    category: "preparation",
    question: "How to prepare for UGC NET",
    keywords: ["ugc net preparation", "net exam strategy", "ugc net study plan"],
    answer:
      "**UGC NET Preparation Strategy:**\n\n**Paper I (General - Common for all):**\n- Teaching Aptitude\n- Research Methodology\n- Reading Comprehension\n- Communication\n- Reasoning & Data Interpretation\n- ICT, Higher Education, Governance\n\n**Paper II (Subject-specific):**\n- Deep knowledge of your subject\n- Previous year paper analysis is key\n\n**Best Books (Paper I):**\n- Arihant UGC NET Paper 1\n- Trueman's UGC NET Paper 1\n- KVS Madaan (for Teaching & Research)\n\n**Tips:**\n- Paper I is common - scoring opportunity\n- Study previous 10 years papers for Paper II\n- Join NET coaching for subject guidance\n- 3-4 months preparation sufficient for Paper I",
  },
  {
    examSlug: "ugc-net",
    category: "salary",
    question: "UGC NET salary assistant professor",
    keywords: ["ugc net salary", "assistant professor salary", "net jrf stipend", "professor pay"],
    answer:
      "**UGC NET - Career Benefits:**\n\n**JRF (Junior Research Fellowship):**\n- Stipend: Rs 37,000/month (first 2 years)\n- After 2 years (SRF): Rs 42,000/month\n- HRA: 24% additional\n\n**Assistant Professor Salary:**\n- Pay Level: Academic Level 10\n- Basic Pay: Rs 57,700\n- DA: ~Rs 21,000\n- HRA: Rs 5,770 - 8,655\n\n**In-Hand: Rs 75,000 - 95,000/month**\n\n**Career Path:**\n- Assistant Professor → Associate Professor (8 yrs)\n- Associate Professor → Professor (10 yrs)\n- Professor salary: Rs 1,44,200 (basic)\n\n**Note:** NET qualification makes you eligible for Assistant Professor. JRF enables PhD fellowship.",
    source: "https://ugcnet.nta.nic.in",
  },

  // ── CTET ────────────────────────────────────────────────
  {
    examSlug: "ctet",
    category: "preparation",
    question: "How to prepare for CTET",
    keywords: ["ctet preparation", "ctet strategy", "ctet study plan", "how to crack ctet"],
    answer:
      "**CTET Preparation Strategy:**\n\n**Paper I (Classes I-V):**\n- Child Development & Pedagogy: 30Q\n- Language I: 30Q\n- Language II: 30Q\n- Mathematics: 30Q\n- Environmental Studies: 30Q\n\n**Paper II (Classes VI-VIII):**\n- CDP: 30Q, Language I: 30Q, Language II: 30Q\n- Maths & Science OR Social Studies: 60Q\n\n**Best Books:**\n- Arihant CTET Guide\n- Child Development: Himanshi Singh notes\n- NCERT (Class 1-8 textbooks)\n\n**Tips:**\n- CDP is most important - study child psychology theories\n- Language sections: Focus on comprehension\n- NCERT-based pedagogy questions\n- Previous year papers are very helpful\n- 60% is qualifying marks",
  },
  {
    examSlug: "ctet",
    category: "salary",
    question: "CTET teacher salary",
    keywords: ["ctet salary", "teacher salary", "kvs salary", "government teacher pay"],
    answer:
      "**Government Teacher Salary (with CTET):**\n\n**KVS (Kendriya Vidyalaya):**\n- PRT (Primary): Rs 35,400 - 1,12,400 (Level 6)\n- TGT: Rs 44,900 - 1,42,400 (Level 7)\n- PGT: Rs 47,600 - 1,51,100 (Level 8)\n\n**In-Hand Salary:**\n- PRT: Rs 45,000 - 55,000/month\n- TGT: Rs 55,000 - 65,000/month\n- PGT: Rs 60,000 - 72,000/month\n\n**NVS (Navodaya):**\n- Similar pay scales as KVS\n- Additional campus facilities\n\n**DSSSB (Delhi):**\n- Guest Teacher: Rs 30,000-50,000/month\n- Regular: Same as KVS scale\n\n**Perks:** Summer/winter vacations, medical, pension, job security",
  },

  // ── UPSC CSE Salary ─────────────────────────────────────
  {
    examSlug: "upsc-cse",
    category: "salary",
    question: "IAS officer salary",
    keywords: ["ias salary", "upsc salary", "ias officer pay", "civil services salary", "ips salary"],
    answer:
      "**UPSC Civil Services Salary:**\n\n| Rank | Pay Level | Basic Pay |\n|---|---|---|\n| IAS/IPS/IFS (Entry) | Level 10 | Rs 56,100 |\n| After 4 years | Level 11 | Rs 67,700 |\n| Joint Secretary | Level 13 | Rs 1,18,500 |\n| Additional Secretary | Level 14 | Rs 1,44,200 |\n| Secretary | Level 17 | Rs 2,25,000 |\n| Cabinet Secretary | Level 18 | Rs 2,50,000 |\n\n**IAS Entry Level In-Hand: Rs 80,000 - 1,00,000/month**\n\n**Perks:**\n- Free government bungalow\n- Car with driver\n- Security\n- Medical for life\n- Pension\n- Domestic help\n\nThe real value of IAS is power and service, not just salary.",
    source: "https://upsc.gov.in",
  },
  {
    examSlug: "upsc-cse",
    category: "books",
    question: "Best books for UPSC",
    keywords: ["upsc books", "best books upsc", "ias books", "upsc study material"],
    answer:
      "**Best Books for UPSC CSE:**\n\n**History:**\n- Ancient: Tamil Nadu Board / RS Sharma\n- Medieval: Satish Chandra\n- Modern: Spectrum (Rajiv Ahir)\n- Art & Culture: Nitin Singhania\n\n**Geography:**\n- NCERT Class 6-12\n- Majid Husain (Indian & World)\n- GC Leong (Physical Geography)\n\n**Polity:**\n- Indian Polity by M Laxmikanth (Bible!)\n\n**Economy:**\n- Indian Economy by Ramesh Singh\n- Sriram IAS Economy Notes\n\n**Environment:**\n- Shankar IAS Environment\n\n**Current Affairs:**\n- The Hindu / Indian Express\n- Yojana & Kurukshetra magazines\n- Vision IAS Monthly Current Affairs",
  },
  {
    examSlug: "upsc-cse",
    category: "cutoff",
    question: "UPSC CSE cut off marks",
    keywords: ["upsc cut off", "ias cut off", "upsc qualifying marks", "upsc prelims cutoff"],
    answer:
      "**UPSC CSE Cut-Off Marks (Recent):**\n\n**Prelims (Paper I out of 200):**\n- General: 92-98 marks\n- OBC: 84-90 marks\n- SC: 74-80 marks\n- ST: 70-75 marks\n\n**Mains + Interview (out of 2025):**\n- General (Last rank): ~950-1000 marks\n- IAS (Top 100): ~1050+ marks\n- IPS: ~1000+ marks\n- IFS: ~980+ marks\n\n**Key Facts:**\n- ~10 lakh apply, 5 lakh appear\n- ~15,000 qualify Prelims\n- ~3,000 qualify Mains\n- ~1,000 selected finally\n- Success rate: ~0.1%\n\nPrelims is qualifying, Mains + Interview determines final ranking.",
    source: "https://upsc.gov.in",
  },

  // ── SSC CHSL Prep & Books ───────────────────────────────
  {
    examSlug: "ssc-chsl",
    category: "preparation",
    question: "How to prepare for SSC CHSL",
    keywords: ["ssc chsl preparation", "chsl strategy", "chsl study plan"],
    answer:
      "**SSC CHSL Preparation Strategy:**\n\n**Tier I (60 min, 100Q, 200 marks):**\n- English: 25Q\n- General Intelligence: 25Q\n- Quantitative Aptitude: 25Q\n- General Awareness: 25Q\n\n**Tier II (2.5 hrs):**\n- Session I: Maths + Reasoning (60 min)\n- Session II: English + GK (60 min)\n- Session III: Typing/Skill Test\n\n**Books:**\n- Kiran SSC CHSL Solved Papers\n- RS Aggarwal (Maths)\n- SP Bakshi (English)\n- Lucent GK\n\n**Tips:**\n- Difficulty is moderate (12th level)\n- Focus on English - highest scoring\n- Practice typing 35 WPM (for LDC post)\n- 3-4 months preparation is enough\n- Take 20+ mock tests",
  },
  {
    examSlug: "ssc-chsl",
    category: "books",
    question: "Best books for SSC CHSL",
    keywords: ["ssc chsl books", "chsl study material", "best books chsl"],
    answer:
      "**Best Books for SSC CHSL:**\n\n**English:**\n- SP Bakshi (Arihant) - Grammar + Vocabulary\n- Plinth to Paramount (KD Campus)\n- Neetu Singh (for Tier II)\n\n**Quantitative Aptitude:**\n- RS Aggarwal (basics)\n- Kiran SSC Maths\n\n**Reasoning:**\n- MK Pandey\n- Kiran Reasoning\n\n**General Knowledge:**\n- Lucent GK\n- Arihant General Knowledge\n\n**Previous Year Papers:**\n- Kiran SSC CHSL Solved Papers (best resource)\n\n**Tip:** CHSL questions repeat from previous years. Solving 10 years' papers = 80% preparation done.",
  },

  // ── General Tips ────────────────────────────────────────
  {
    examSlug: "general",
    category: "tips",
    question: "Exam day tips for government exams",
    keywords: ["exam day tips", "exam tips", "last minute tips", "exam day strategy"],
    answer:
      "**Exam Day Tips:**\n\n**Before Exam:**\n- Sleep 7-8 hours the night before\n- Eat a light, healthy meal\n- Reach exam center 1 hour early\n- Carry: Admit card, Photo ID, pen, watch\n\n**During Exam:**\n- Read instructions carefully (5 minutes)\n- Attempt easy questions first\n- Don't spend more than 1 minute per question\n- Mark difficult questions for review\n- Be careful with negative marking\n\n**Time Strategy:**\n- First 10 min: Scan entire paper\n- Next 40 min: Attempt confident questions\n- Last 10 min: Attempt remaining, review marked\n\n**Don'ts:**\n- Don't panic if paper seems tough\n- Don't discuss paper during break\n- Don't change answers unless very sure\n- Don't leave early - use all time",
  },
  {
    examSlug: "general",
    category: "admitcard",
    question: "How to download admit card",
    keywords: ["download admit card", "admit card", "hall ticket download", "admit card process"],
    answer:
      "**How to Download Admit Card:**\n\n**General Steps (for any exam):**\n1. Visit the official website\n2. Go to 'Admit Card' or 'Download' section\n3. Enter Registration Number / Roll Number\n4. Enter Date of Birth or Password\n5. Click 'Download' or 'Submit'\n6. Save PDF and take 2-3 printouts\n\n**Important:**\n- Download well before exam date (servers crash on last day)\n- Check all details: Name, Photo, Exam Center, Date, Time\n- Report any discrepancy immediately\n- Carry original Photo ID along with admit card\n\n**Websites:**\n- SSC: ssc.nic.in\n- IBPS: ibps.in\n- UPSC: upsc.gov.in\n- NTA: nta.ac.in\n- RRB: rrbcdg.gov.in",
  },
  {
    examSlug: "general",
    category: "result",
    question: "How to check government exam result",
    keywords: ["check result", "exam result", "result check", "how to check result"],
    answer:
      "**How to Check Exam Results:**\n\n**Steps:**\n1. Visit official website of conducting body\n2. Go to 'Results' section\n3. Enter Roll Number / Registration Number\n4. Download scorecard\n\n**Result Timeline (typical):**\n- SSC exams: 1-2 months after exam\n- IBPS exams: 1-2 months\n- UPSC Prelims: 15-20 days\n- UPSC Mains: 3-4 months\n- Railway exams: 2-3 months\n\n**Also check:**\n- Category-wise cut-off marks\n- Merit list PDF\n- Score normalization details\n\n**Tip:** Save screenshots of your result immediately. Sometimes result links expire.",
  },

  // ── More exam-specific entries ──────────────────────────
  {
    examSlug: "ssc-cgl",
    category: "selection",
    question: "SSC CGL selection process",
    keywords: ["ssc cgl selection", "cgl stages", "ssc cgl recruitment process"],
    answer:
      "**SSC CGL Selection Process:**\n\n**Tier I (Computer Based Exam):**\n- 100 MCQs, 200 marks, 60 minutes\n- Sections: Quant, Reasoning, English, GK\n- Negative marking: 0.50 per wrong answer\n\n**Tier II (Computer Based Exam):**\n- Session I: Mathematical Abilities + Reasoning (390 marks)\n- Session II: English + GK (390 marks)\n- Session III: Statistics/General Studies (for specific posts)\n\n**Tier III (Document Verification):**\n- Original documents verified\n- Qualifying in nature\n\n**Final Merit:**\n- Based on Tier I + Tier II combined marks\n- Post allocation based on merit and preference",
    source: "https://ssc.nic.in",
  },
  {
    examSlug: "ibps-po",
    category: "cutoff",
    question: "IBPS PO cut off marks",
    keywords: ["ibps po cut off", "ibps po cutoff", "bank po qualifying marks"],
    answer:
      "**IBPS PO Cut-Off (Recent):**\n\n**Prelims Cut-Off (out of 100):**\n- General: 55-62\n- OBC: 50-56\n- SC: 42-48\n- ST: 35-42\n\n**Mains Cut-Off (out of 225):**\n- General: 85-95\n- OBC: 78-88\n- SC: 65-75\n- ST: 55-65\n\n**Sectional Cut-Off applies:**\n- Must clear each section individually\n- Then overall cut-off\n\n**Note:** Cut-off varies year to year based on vacancies and difficulty. Mains has sectional time limits which makes it trickier.",
    source: "https://ibps.in",
  },
  {
    examSlug: "ibps-po",
    category: "books",
    question: "Best books for IBPS PO",
    keywords: ["ibps po books", "best books bank po", "ibps po study material"],
    answer:
      "**Best Books for IBPS PO:**\n\n**Quantitative Aptitude:**\n- RS Aggarwal\n- Arun Sharma (for DI)\n- Rajesh Verma (Data Interpretation)\n\n**Reasoning:**\n- MK Pandey (BSC Publication)\n- Arihant Reasoning\n- Puzzles & Seating Arrangement: Practice from Oliveboard/Adda247\n\n**English:**\n- SP Bakshi\n- Word Power Made Easy\n- The Hindu for vocabulary\n\n**Banking & Financial Awareness:**\n- Arihant Banking Awareness\n- RBI website for policies\n- Pratiyogita Darpan Banking\n\n**Computer:**\n- Arihant Computer Awareness\n- Kiran Computer for Banking",
  },
  {
    examSlug: "ssc-cgl",
    category: "negativemarking",
    question: "SSC CGL negative marking",
    keywords: ["ssc cgl negative marking", "cgl penalty", "ssc cgl deduction"],
    answer:
      "**SSC CGL Negative Marking:**\n\n**Tier I:**\n- Correct: +2 marks\n- Wrong: -0.50 marks\n- Unanswered: 0 marks\n\n**Tier II:**\n- Session I & II: +3 marks (correct), -1 mark (wrong)\n- Session III: +3 marks (correct), -1 mark (wrong)\n\n**Strategy:**\n- Don't guess blindly\n- If you can eliminate 2 options, attempt\n- 1 wrong = 4 correct answers wasted (Tier II)\n- Better to leave than guess\n\n**Tip:** In Tier I, with 0.25 penalty ratio, even educated guessing is worth it if you can eliminate 1 option.",
    source: "https://ssc.nic.in",
  },
  {
    examSlug: "general",
    category: "preparation",
    question: "Government exam preparation after 12th",
    keywords: ["exam after 12th", "government exam 12th pass", "ssc after 12th", "railway after 12th"],
    answer:
      "**Government Exams After 12th:**\n\n**12th Pass Exams:**\n- SSC CHSL (LDC, PA, DEO)\n- SSC GD Constable (BSF, CISF, CRPF)\n- RRB Group D (Track Maintainer, Helper)\n- NDA (Army, Navy, Air Force)\n- Indian Coast Guard (Navik)\n- Indian Navy SSR/AA\n- AFCAT (12th with Physics & Maths)\n\n**Best Strategy:**\n1. Decide: Defence or Civil job\n2. For Defence: NDA (best option after 12th)\n3. For Civil: SSC CHSL + SSC GD\n4. Prepare for graduation exam simultaneously\n5. After graduation: SSC CGL, IBPS PO, UPSC\n\n**Tip:** Don't skip graduation. It opens SSC CGL, Banking, and UPSC doors.",
  },
  {
    examSlug: "general",
    category: "preparation",
    question: "Government exam preparation for beginners",
    keywords: ["beginner preparation", "how to start", "first time government exam", "where to start"],
    answer:
      "**Government Exam Preparation - Beginner's Guide:**\n\n**Step 1: Choose Your Exam**\n- 10th pass: SSC MTS, RRB Group D\n- 12th pass: SSC CHSL, SSC GD, NDA\n- Graduate: SSC CGL, IBPS PO, UPSC\n\n**Step 2: Understand the Exam**\n- Read official notification carefully\n- Know syllabus, pattern, cut-off\n- Check eligibility (age, education)\n\n**Step 3: Get Study Material**\n- NCERT books (free online)\n- 1-2 standard books per subject\n- Previous year papers\n\n**Step 4: Make a Timetable**\n- 4-6 hours daily study\n- Cover all subjects weekly\n- Weekend: Mock tests\n\n**Step 5: Practice & Revise**\n- Take mock tests from month 2\n- Analyze every mistake\n- Revise notes weekly\n\n**Free Resources:** YouTube, NCERT, ssc.nic.in mock tests",
  },
];
