export const SESSION_META = {
  Deep: { color: "#ef4444", bg: "#2d1515", label: "DEEP", dot: "🔴", mins: "15 min" },
  Medium: { color: "#f59e0b", bg: "#2d2210", label: "MEDIUM", dot: "🟡", mins: "7–10 min" },
  Quick: { color: "#3b82f6", bg: "#101e35", label: "QUICK", dot: "🔵", mins: "3–5 min" },
};

export const LEVELS = [
  {
    id: "l1",
    emoji: "🟡",
    label: "Level 1",
    subtitle: "No Study Habit",
    tagline: "Zero pressure. Build trust first.",
    accent: "#f59e0b",
    accentBg: "#1c1700",
    kpis: [
      ["5", "Study Days/Week"],
      ["15–30", "Mins/Day"],
      ["1", "Subject/Day"],
      ["Week 4", "First Full Review"],
    ],
    phases: [
      {
        days: "Days 1–7",
        title: "Phase 1 — Trust Building & Baseline Discovery",
        sessions: "Deep ×2 · Medium ×3 · Quick ×2",
        goal: "No pressure. Build rapport. Find the real reason behind no study habit. Get one small study win before Week 2.",
        rows: [
          {
            day: 1,
            title: "First Connection",
            type: "Deep",
            bullets: [
              "Friendly intro — let student talk freely",
              "Ask about school, friends, favourite subject",
              "Do NOT discuss study plans yet",
              "Goal: student feels safe and comfortable",
            ],
          },
          {
            day: 2,
            title: "Casual Follow-up",
            type: "Quick",
            bullets: ["\"How was school today?\"", "Ask about one class they enjoyed", "Listen more, advise less"],
          },
          {
            day: 3,
            title: "Homework Discovery",
            type: "Medium",
            bullets: [
              "Casually ask what homework was given",
              "Identify which subject feels hardest",
              "Observe only — no pressure yet",
            ],
          },
          {
            day: 4,
            title: "Root Cause Probe",
            type: "Deep",
            bullets: [
              "Ask why studying feels difficult",
              "Identify: fear, distraction, no routine, or boredom",
              "Record root cause in notes",
              "Empathy — zero judgment",
            ],
          },
          {
            day: 5,
            title: "First Micro Goal",
            type: "Medium",
            bullets: [
              "Propose just 15-min study today",
              "\"Let's try one subject for 15 mins\"",
              "Follow up in the evening",
            ],
          },
          {
            day: 6,
            title: "Celebrate the Attempt",
            type: "Quick",
            bullets: [
              "Did student try studying yesterday?",
              "Celebrate even partial effort warmly",
              "\"That's a great start. I'm proud of you.\"",
            ],
          },
          {
            day: 7,
            title: "Week 1 Review",
            type: "Medium",
            bullets: [
              "Did student attempt study this week at all?",
              "Identify top emotional or discipline barrier",
              "Prepare Week 2 micro-plan",
              "Parent: brief friendly first update call",
            ],
          },
        ],
      },
      {
        days: "Days 8–14",
        title: "Phase 2 — Habit Ignition (Micro Routine)",
        sessions: "Deep ×2 · Medium ×3 · Quick ×2",
        goal: "Lock in a daily fixed study time. Even 15–20 mins counts. Celebrate consistency over duration at this stage.",
        rows: [
          {
            day: 8,
            title: "Fix a Study Time",
            type: "Deep",
            bullets: [
              "Agree on a fixed 20-min study slot daily",
              "Ideal: evening after school snack",
              "One subject only — easiest or favourite",
              "Create simple plan together",
            ],
          },
          {
            day: 9,
            title: "Morning Trigger",
            type: "Quick",
            bullets: ["Send morning reminder: \"Study at 6 PM today!\"", "Brief check on yesterday's attempt"],
          },
          {
            day: 10,
            title: "Completion Check",
            type: "Medium",
            bullets: [
              "\"Did you sit for study time yesterday?\"",
              "Yes → celebrate strongly",
              "No → find why, adjust slot without scolding",
            ],
          },
          {
            day: 11,
            title: "Homework First Rule",
            type: "Medium",
            bullets: [
              "Introduce: \"Homework always comes first\"",
              "Ask what homework was given today",
              "Help plan a 20-min homework block",
            ],
          },
          {
            day: 12,
            title: "Distraction Conversation",
            type: "Deep",
            bullets: [
              "\"What distracts you most during study time?\"",
              "Discuss: phone, games, TV",
              "Agree on one small control step together",
            ],
          },
          {
            day: 13,
            title: "Reinforcement Message",
            type: "Quick",
            bullets: ["Praise specific positive behaviour this week", "\"You studied 3 days this week — amazing!\""],
          },
          {
            day: 14,
            title: "Week 2 Review",
            type: "Medium",
            bullets: [
              "Count study days completed",
              "Note any habit-forming signs",
              "Parent call: share small wins, ask for home support",
              "Adjust plan for Week 3 if needed",
            ],
          },
        ],
      },
      {
        days: "Days 15–21",
        title: "Phase 3 — Strengthening Habit + Emotional Growth",
        sessions: "Deep ×2 · Medium ×3 · Quick ×2",
        goal: "Student is building routine. Now add a first personal goal and introduce one basic study skill naturally.",
        rows: [
          {
            day: 15,
            title: "Expand Duration",
            type: "Medium",
            bullets: [
              "If 15-min is stable — expand to 25–30 mins",
              "Add a second subject (simple one)",
              "Keep tone encouraging, not demanding",
            ],
          },
          {
            day: 16,
            title: "Progress Reflection",
            type: "Deep",
            bullets: [
              "\"Look how much you've changed in 2 weeks!\"",
              "Show student their own progress with specifics",
              "Boost confidence through concrete examples",
            ],
          },
          {
            day: 17,
            title: "First Study Skill",
            type: "Medium",
            bullets: [
              "Introduce: \"Read lesson, then explain in own words\"",
              "Apply to one topic studied today",
              "Make it feel easy and natural",
            ],
          },
          {
            day: 18,
            title: "Emotional Check",
            type: "Quick",
            bullets: ["\"How do you feel about studying now vs before?\"", "Listen and validate their experience"],
          },
          {
            day: 19,
            title: "Goal Setting Intro",
            type: "Deep",
            bullets: [
              "\"What do you want to improve this month?\"",
              "Set ONE clear, simple goal together",
              "Note it — refer back at Day 27",
            ],
          },
          {
            day: 20,
            title: "Responsibility Talk",
            type: "Quick",
            bullets: ["\"Your effort creates results — no one else can do it for you\"", "Brief and positive"],
          },
          {
            day: 21,
            title: "Week 3 Review",
            type: "Medium",
            bullets: [
              "Study days count — target: 4–5 days",
              "Emotional improvement noted?",
              "Parent call: explain progress + next week goal",
              "Is student approaching Level 2 readiness?",
            ],
          },
        ],
      },
      {
        days: "Days 22–30",
        title: "Phase 4 — Consolidation + Month-End Review",
        sessions: "Deep ×2 · Medium ×3 · Quick ×4",
        goal: "Confirm habit is real and self-sustaining. Begin parent retention conversation. Set up Month 2 with clearer direction.",
        rows: [
          {
            day: 22,
            title: "Habit Strength Test",
            type: "Medium",
            bullets: [
              "\"Did you study without me reminding you?\"",
              "Yes → strong habit-forming signal",
              "Reinforce growing independence",
            ],
          },
          {
            day: 23,
            title: "Subject Confidence Check",
            type: "Quick",
            bullets: ["Which subject feels less scary now?", "Celebrate any positive attitude shift"],
          },
          {
            day: 24,
            title: "Personal Growth Talk",
            type: "Medium",
            bullets: [
              "\"How have you changed in 3 weeks?\"",
              "Responsibility, discipline, attitude",
              "Student reflects on their own growth",
            ],
          },
          {
            day: 25,
            title: "Study Environment Check",
            type: "Quick",
            bullets: [
              "\"Are your books ready before study time?\"",
              "Encourage physical study space discipline",
            ],
          },
          {
            day: 26,
            title: "Weak Subject ID",
            type: "Deep",
            bullets: [
              "Identify which subject still needs most focus",
              "Create simple extra attention plan for it",
              "Introduce idea of rotating all subjects in a week",
            ],
          },
          {
            day: 27,
            title: "Goal Progress Check",
            type: "Quick",
            bullets: ["Revisit Day 19 goal — any progress?", "Quick celebrate or gentle redirect"],
          },
          {
            day: 28,
            title: "Retention Conversation",
            type: "Deep",
            bullets: [
              "Gauge parent satisfaction level",
              "Share student transformation story with parent",
              "Discuss what Month 2 should focus on",
            ],
          },
          {
            day: 29,
            title: "Student Reflection",
            type: "Quick",
            bullets: ["\"What changed for you this month?\"", "Let student own their progress verbally"],
          },
          {
            day: 30,
            title: "Month-End Full Review",
            type: "Medium",
            bullets: [
              "Review: habit days, goal achievement, emotional state",
              "Ready to upgrade to Level 2 approach?",
              "Parent call: month summary + Month 2 roadmap",
              "Dashboard: update student priority level",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "l2",
    emoji: "🔵",
    label: "Level 2",
    subtitle: "Moderate Habit",
    tagline: "Structure + smart study methods.",
    accent: "#38bdf8",
    accentBg: "#071520",
    kpis: [
      ["5–6", "Study Days/Week"],
      ["60–90", "Mins/Day"],
      ["2", "Subjects/Day"],
      ["Week 2", "First Subject Review"],
    ],
    phases: [
      {
        days: "Days 1–7",
        title: "Phase 1 — Assessment & Structure Design",
        sessions: "Deep ×2 · Medium ×3 · Quick ×2",
        goal: "Understand the inconsistency pattern. Build a subject-balanced weekly plan. Establish clear accountability from Day 1.",
        rows: [
          {
            day: 1,
            title: "Academic Baseline",
            type: "Deep",
            bullets: [
              "Discuss all subjects — strong vs weak",
              "Ask about last test scores",
              "Understand current study pattern",
              "Find what makes student inconsistent",
            ],
          },
          {
            day: 2,
            title: "Routine Snapshot",
            type: "Medium",
            bullets: ["\"Walk me through your typical evening\"", "Identify gaps — when does study get skipped?"],
          },
          {
            day: 3,
            title: "Subject Rotation Plan",
            type: "Medium",
            bullets: [
              "Design weekly subject rotation together",
              "All subjects must appear in the week",
              "Weak subject gets an extra slot",
            ],
          },
          {
            day: 4,
            title: "Homework First Rule",
            type: "Quick",
            bullets: ["Confirm: homework always first — no exceptions", "Check if today's homework is done"],
          },
          {
            day: 5,
            title: "Confidence & Stress Check",
            type: "Deep",
            bullets: [
              "\"How confident do you feel about your studies?\"",
              "Identify stress: exams, parents, comparison",
              "Validate feelings, share reassurance",
            ],
          },
          {
            day: 6,
            title: "Quick Accountability",
            type: "Quick",
            bullets: ["Did student follow subject plan yesterday?", "Quick correction if deviated"],
          },
          {
            day: 7,
            title: "Week 1 Review",
            type: "Medium",
            bullets: [
              "Consistency — how many days studied?",
              "Which subjects were actually covered?",
              "Parent call: introduce yourself + share Week 1 plan",
            ],
          },
        ],
      },
      {
        days: "Days 8–14",
        title: "Phase 2 — Smart Study Methods Introduction",
        sessions: "Deep ×2 · Medium ×3 · Quick ×2",
        goal: "Embed smart study methods — active recall and spaced revision. Study sessions must now count, not just happen.",
        rows: [
          {
            day: 8,
            title: "Active Recall Intro",
            type: "Deep",
            bullets: [
              "Teach: \"After reading — close book and recall\"",
              "Practice on one topic studied today",
              "Make this a daily habit after every study block",
            ],
          },
          {
            day: 9,
            title: "Evening Plan Check",
            type: "Quick",
            bullets: ["Ask what subjects are planned for tonight", "Confirm time slots are assigned"],
          },
          {
            day: 10,
            title: "Weak Subject Session",
            type: "Medium",
            bullets: [
              "Focus entirely on weakest subject today",
              "\"What exactly feels hard — concept or practice?\"",
              "Design targeted improvement step",
            ],
          },
          {
            day: 11,
            title: "Recall Practice Test",
            type: "Medium",
            bullets: [
              "Ask student to explain one topic studied",
              "Assess depth of real understanding",
              "Praise effort, gently correct gaps",
            ],
          },
          {
            day: 12,
            title: "Spaced Revision System",
            type: "Deep",
            bullets: [
              "Introduce: revise same topic after 2 days, then 7 days",
              "Pick one topic — plan its revision schedule now",
              "Explain why: memory fades without review",
            ],
          },
          {
            day: 13,
            title: "Motivation Boost",
            type: "Quick",
            bullets: ["Share specific improvement noticed this week", "\"You covered all subjects this week — real progress!\""],
          },
          {
            day: 14,
            title: "Week 2 Review",
            type: "Medium",
            bullets: [
              "Subject balance achieved? Recall practiced?",
              "Visible improvement in weak subject?",
              "Parent call: share plan + note progress",
            ],
          },
        ],
      },
      {
        days: "Days 15–21",
        title: "Phase 3 — Discipline Deepening + Academic Tracking",
        sessions: "Deep ×2 · Medium ×3 · Quick ×2",
        goal: "Student is now consistent — sharpen study quality. Introduce mistake analysis. Give student ownership over their own goals.",
        rows: [
          {
            day: 15,
            title: "Mistake Analysis Intro",
            type: "Deep",
            bullets: [
              "Ask about any recent test or assessment",
              "Go through mistakes: concept gap or careless?",
              "Make a correction plan for those topics",
            ],
          },
          {
            day: 16,
            title: "Time Management Talk",
            type: "Medium",
            bullets: [
              "Is student staying on schedule during study?",
              "\"What breaks your schedule?\"",
              "Adjust plan if a slot consistently fails",
            ],
          },
          {
            day: 17,
            title: "Concept Understanding Test",
            type: "Medium",
            bullets: [
              "Pick a topic — ask student to explain it fully",
              "Rate: clear / partial / confused",
              "Plan re-learning if confused",
            ],
          },
          {
            day: 18,
            title: "Personal Growth Talk",
            type: "Quick",
            bullets: [
              "\"How have you grown as a student this month?\"",
              "Student names their own improvements",
            ],
          },
          {
            day: 19,
            title: "Goal Setting Session",
            type: "Deep",
            bullets: [
              "Academic goal: \"Improve Maths by next test\"",
              "Personal goal: \"No phone during study time\"",
              "Write both — refer back at Day 27",
            ],
          },
          {
            day: 20,
            title: "Accountability Check",
            type: "Quick",
            bullets: ["Revisit Day 19 goals — any early progress?", "Quick celebrate or redirect"],
          },
          {
            day: 21,
            title: "Week 3 Review",
            type: "Medium",
            bullets: [
              "Academic tracking: subject coverage, understanding level",
              "Emotional stability check",
              "Parent call: 3-week progress + goals shared",
            ],
          },
        ],
      },
      {
        days: "Days 22–30",
        title: "Phase 4 — Consolidation + Retention Planning",
        sessions: "Deep ×2 · Medium ×3 · Quick ×4",
        goal: "Cement the structured system. Begin retention and Month 2 planning. Explore suitable add-on programs.",
        rows: [
          {
            day: 22,
            title: "Revision Cycle Check",
            type: "Medium",
            bullets: [
              "Are topics from Week 1–2 being revisited on schedule?",
              "Reinforce spaced revision discipline firmly",
            ],
          },
          {
            day: 23,
            title: "Exam Readiness Intro",
            type: "Quick",
            bullets: ["Ask about any upcoming tests or exams", "Start basic exam prep awareness conversation"],
          },
          {
            day: 24,
            title: "Communication Practice",
            type: "Medium",
            bullets: [
              "Ask student to explain 3 topics from memory",
              "Improve ability to articulate knowledge clearly",
            ],
          },
          {
            day: 25,
            title: "Escalation Check",
            type: "Quick",
            bullets: [
              "Any subject needing faculty concept support?",
              "If yes: escalate to academic team immediately",
            ],
          },
          {
            day: 26,
            title: "Lifestyle & Habit Check",
            type: "Deep",
            bullets: [
              "Sleep schedule, phone use, study space quality",
              "Address any lifestyle barrier affecting study",
            ],
          },
          {
            day: 27,
            title: "Goal Progress Review",
            type: "Quick",
            bullets: ["Revisit Day 19 goals — achieved or in progress?", "Adjust for Month 2 if not yet met"],
          },
          {
            day: 28,
            title: "Parent Retention Call",
            type: "Deep",
            bullets: [
              "Share transformation evidence with parent clearly",
              "Discuss Month 2 academic direction",
              "Gauge satisfaction and any concerns",
            ],
          },
          {
            day: 29,
            title: "Student Self-Review",
            type: "Quick",
            bullets: ["\"Rate your Month 1 effort out of 10\"", "Student reflects — mentor adds perspective"],
          },
          {
            day: 30,
            title: "Month-End Full Review",
            type: "Medium",
            bullets: [
              "Full assessment: consistency, subject coverage, smart study",
              "Ready for Level 3 approach in Month 2?",
              "Dashboard update: priority level + Month 2 plan",
              "Add-on program check: exam prep or crash course suitable?",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "l3",
    emoji: "🟢",
    label: "Level 3",
    subtitle: "Good Habit",
    tagline: "Precision, strategy, exam excellence.",
    accent: "#34d399",
    accentBg: "#071510",
    kpis: [
      ["6–7", "Study Days/Week"],
      ["90–120", "Mins/Day"],
      ["3+", "Subjects/Day"],
      ["Month-End", "Score Target Review"],
    ],
    phases: [
      {
        days: "Days 1–7",
        title: "Phase 1 — Deep Academic Assessment & Strategy Design",
        sessions: "Deep ×3 · Medium ×2 · Quick ×2",
        goal: "Move beyond habit — build a precision academic strategy. Set measurable targets. Focus on WHY and HOW, not just WHAT.",
        rows: [
          {
            day: 1,
            title: "Academic Deep Dive",
            type: "Deep",
            bullets: [
              "Get last 2–3 test scores for all subjects",
              "Identify strongest and weakest chapters precisely",
              "Understand student's academic ambitions",
              "Set measurable month-end score target",
            ],
          },
          {
            day: 2,
            title: "Strategy Audit",
            type: "Medium",
            bullets: [
              "How does student currently study — what method?",
              "Are they using recall, revision, practice problems?",
              "Identify specific strategy gaps to fill",
            ],
          },
          {
            day: 3,
            title: "Build Full Timetable",
            type: "Deep",
            bullets: [
              "Full weekly plan: all subjects + revision slots",
              "Practice problem sessions per subject",
              "Weak subject gets priority days (Mon + Wed)",
            ],
          },
          {
            day: 4,
            title: "Recall Mastery Check",
            type: "Medium",
            bullets: [
              "Test current recall ability on 2 topics",
              "Upgrade recall method if only surface-level",
              "Teach: explain → check → correct → re-recall",
            ],
          },
          {
            day: 5,
            title: "Goal Architecture",
            type: "Deep",
            bullets: [
              "Set short-term, monthly, and long-term goals",
              "Goals must be specific and measurable",
              "Student writes goals — ownership matters",
            ],
          },
          {
            day: 6,
            title: "Confidence Check",
            type: "Quick",
            bullets: [
              "\"Which subject still makes you nervous and why?\"",
              "Design a confidence-building plan around it",
            ],
          },
          {
            day: 7,
            title: "Week 1 Confirm",
            type: "Quick",
            bullets: [
              "Plan in place and being followed?",
              "Parent call: share month target + strategy",
              "Establish benchmark scores for measurement",
            ],
          },
        ],
      },
      {
        days: "Days 8–14",
        title: "Phase 2 — Strategic Execution + Weak Topic Elimination",
        sessions: "Deep ×2 · Medium ×3 · Quick ×2",
        goal: "Execute the strategy precisely. Attack weak chapters. Practice, recall, and revise in a complete daily cycle.",
        rows: [
          {
            day: 8,
            title: "Weak Chapter Attack",
            type: "Deep",
            bullets: [
              "Identify specific weak chapters — not just subjects",
              "Create chapter-by-chapter improvement plan",
              "Concept gap detected → escalate to faculty",
            ],
          },
          {
            day: 9,
            title: "Practice Problem Check",
            type: "Medium",
            bullets: ["Is student solving practice questions daily?", "Review answers — spot recurring error patterns"],
          },
          {
            day: 10,
            title: "Revision Cycle Audit",
            type: "Medium",
            bullets: ["Are Week 1 topics being revisited now?", "Enforce spaced revision cycle discipline"],
          },
          {
            day: 11,
            title: "Communication Build",
            type: "Quick",
            bullets: [
              "Ask student to explain a complex topic clearly",
              "Coach on expressing ideas confidently",
            ],
          },
          {
            day: 12,
            title: "Mistake Analysis",
            type: "Deep",
            bullets: [
              "Go through any test errors in detail",
              "Classify: concept gap / careless / time pressure",
              "Build correction strategy for each type",
            ],
          },
          {
            day: 13,
            title: "Independence Check",
            type: "Quick",
            bullets: ["Is student following plan without reminders?", "Reinforce self-discipline and ownership"],
          },
          {
            day: 14,
            title: "Week 2 Review",
            type: "Medium",
            bullets: [
              "Concepts cleared? Practice done? Errors corrected?",
              "Weak chapter improvement visible?",
              "Parent call: mid-month academic update",
            ],
          },
        ],
      },
      {
        days: "Days 15–21",
        title: "Phase 3 — Exam Readiness + Performance Coaching",
        sessions: "Deep ×3 · Medium ×2 · Quick ×2",
        goal: "Shift to exam performance mindset. Move from learning mode to performance mode. Precision and strategy, not just effort.",
        rows: [
          {
            day: 15,
            title: "Exam Mindset Coaching",
            type: "Deep",
            bullets: [
              "Address exam anxiety proactively",
              "\"Preparation removes fear — let's track prep\"",
              "Create exam prep checklist for each subject",
            ],
          },
          {
            day: 16,
            title: "Timed Practice Intro",
            type: "Medium",
            bullets: [
              "Is student doing sample / previous year questions?",
              "Introduce timed practice sessions if not already",
            ],
          },
          {
            day: 17,
            title: "Chapter Prioritization",
            type: "Medium",
            bullets: [
              "\"Which chapters carry most marks in exams?\"",
              "Ensure high-weight chapters are mastered first",
            ],
          },
          {
            day: 18,
            title: "Comparison Handling",
            type: "Quick",
            bullets: [
              "Is student comparing themselves to classmates?",
              "Redirect firmly to personal progress metrics",
            ],
          },
          {
            day: 19,
            title: "Goal Progress Audit",
            type: "Deep",
            bullets: [
              "Review Day 5 goals — on track?",
              "Adjust targets based on real data",
              "Celebrate any milestone reached",
            ],
          },
          {
            day: 20,
            title: "Lifestyle Performance Check",
            type: "Quick",
            bullets: [
              "Sleep, phone control, study environment quality",
              "For Level 3: these details drive peak performance",
            ],
          },
          {
            day: 21,
            title: "Week 3 Deep Review",
            type: "Deep",
            bullets: [
              "Full performance review — score tracking vs baseline",
              "Improvement visible from Day 1?",
              "Parent call: detailed progress + exam readiness report",
            ],
          },
        ],
      },
      {
        days: "Days 22–30",
        title: "Phase 4 — Performance Lock-in + Growth Planning",
        sessions: "Deep ×2 · Medium ×3 · Quick ×4",
        goal: "Lock in high-performance habits. Student should be strategic, independent, exam-ready. Plan Month 2 for peak academic results.",
        rows: [
          {
            day: 22,
            title: "Final Weak Topic Push",
            type: "Medium",
            bullets: ["Final audit: any remaining chapter gaps?", "Intensive focus if exam approaching"],
          },
          {
            day: 23,
            title: "Confidence Reinforcement",
            type: "Quick",
            bullets: [
              "List 5 concrete improvements from this month",
              "Student states them — mentor confirms with evidence",
            ],
          },
          {
            day: 24,
            title: "Communication Excellence",
            type: "Medium",
            bullets: [
              "Student explains 5 topics from memory clearly",
              "Coach on depth, structure, confidence of expression",
            ],
          },
          {
            day: 25,
            title: "Final Escalation Check",
            type: "Quick",
            bullets: ["Any unresolved concept gap needing faculty?", "Act immediately — no delays at this stage"],
          },
          {
            day: 26,
            title: "Long-Term Ambition Talk",
            type: "Deep",
            bullets: [
              "Discipline, independence, confidence — how far came?",
              "Discuss long-term academic ambition openly",
              "Plant seeds for Month 2 higher targets",
            ],
          },
          {
            day: 27,
            title: "Add-On Program Check",
            type: "Quick",
            bullets: ["Advanced program or exam-focus course suitable?", "Note interest level — coordinate with team"],
          },
          {
            day: 28,
            title: "Parent Growth Call",
            type: "Deep",
            bullets: [
              "Present clear evidence of academic growth",
              "Share Month 2 advancement plan with specifics",
              "Discuss add-on program opportunity",
            ],
          },
          {
            day: 29,
            title: "Student Ownership",
            type: "Quick",
            bullets: [
              "Student presents their own Month 1 summary",
              "What worked, what to improve, Month 2 personal target",
            ],
          },
          {
            day: 30,
            title: "Month-End Performance Review",
            type: "Medium",
            bullets: [
              "Academic: score movement, chapter mastery, exam readiness",
              "Personal: confidence, independence, communication growth",
              "Dashboard: update priority + add-on recommendation",
              "Finalize Month 2 advanced plan with parent approval",
            ],
          },
        ],
      },
    ],
  },
];
