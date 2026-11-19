// =========================================================
//  Portfolio content — edit this file to add or change items.
//  The homepage shows items marked `featured: true`;
//  the Projects and Certificates pages show everything.
//
//  Certificates: use `url` for an online verify link, or `image`
//  for a picture of the certificate (opens full-size on the page).
// =========================================================

const PROJECTS = [
  {
    title: "KitaWork — Smart Community Employment System",
    short: "KitaWork",
    description:
      "A live job platform for the CarCanMadCarLan area. Job seekers, household hirers and businesses sign up, get verified by PESO, and find work that fits their schedule. My capstone project at NEMSU (2026).",
    tags: ["Web App", "Capstone", "Live"],
    live: "https://www.smartkitawork.com/login",
    source: "",
    caseStudy: "#kitawork",
    image: "images/kitawork-login.png",
    theme: "t1",
    featured: true,
  },
  // Add more projects here — copy the block above and edit it.
];

const CERTIFICATES = [
  {
    title: "Claude Code in Action",
    issuer: "Anthropic Education",
    date: "2026-08-06",
    badge: "CC",
    color: "b4",
    url: "https://verify.skilljar.com/c/54kvvbwo9iwy",
    featured: true,
  },
  {
    title: "Claude 101",
    issuer: "Anthropic Education",
    date: "2026-07-30",
    badge: "C",
    color: "b1",
    url: "https://verify.skilljar.com/c/d8qf64bq27y2",
    featured: false,
  },
  {
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy · Python Institute",
    date: "2026-07-18",
    badge: "Py",
    color: "b3",
    // NetAcad's verify page needs a login, so show the certificate image instead
    image: "certificates/python-essentials-1.png",
    url: "",
    credentialId: "aac75ec8-7045-4672-b2c9-2298b4a7faa2",
    featured: true,
  },
];

// Kept in sync with resume.pdf
const TECH_STACK = {
  "Web development": ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "PHP"],
  "Databases": ["SQL", "PostgreSQL", "Supabase"],
  "Tools & office": ["Git", "VS Code", "Canva", "MS Word", "MS Excel", "MS PowerPoint"],
};

// Quick facts shown in the About sections
const FACTS = [
  { label: "School", value: "NEMSU Cantilan · BSIT, 4th year" },
  { label: "Graduating", value: "2027" },
  { label: "Looking for", value: "An IT internship" },
];

const EDUCATION = [
  {
    school: "North Eastern Mindanao State University",
    detail: "Bachelor of Science in Information Technology · 4th Year",
    place: "Cantilan Campus, Surigao del Sur · Expected graduation 2027",
    when: "2023 – Present",
  },
  {
    school: "Felibesto Verano National High School",
    detail: "Senior High School",
    place: "Cortes, Surigao del Sur",
    when: "Graduated 2023",
  },
  {
    school: "Uba Elementary School",
    detail: "Primary Education",
    place: "Surigao del Sur",
    when: "Graduated 2017",
  },
];

const EXTRAS = {
  Coursework: ["Computer hardware & troubleshooting", "Computer networking", "Database management", "Web & software development"],
  Strengths: ["Teamwork", "Communication", "Time management", "Problem solving"],
  Languages: ["English", "Filipino", "Surigaonon"],
};
