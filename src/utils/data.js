export const profile = {
  name: 'Md Abdullah Mulla',
  shortName: 'Abdullah',
  monogram: 'AM',
  role: 'Software Developer · Web Developer · Problem Solver',
  location: 'Barguna, Bangladesh',
  headline:
    'I build interactive digital experiences, scalable web applications, and products with code, curiosity, and obsessive attention to detail.',
  about: [
    "I'm Md Abdullah Mulla, a Computer Science & Technology student and aspiring Software Developer from Bangladesh.",
    'I enjoy turning ideas into functional digital products and continuously improving my problem-solving and engineering skills.',
  ],
  focus: [
    'Software Development',
    'Full-Stack Web Development',
    'Data Structures & Algorithms',
    'Problem Solving',
    'Modern Web Technologies',
  ],
  portrait: '/images/portrait.webp',
  portraitFallback: '/images/portrait.jpg',
}

/* Replace these placeholders with live profiles before shipping. */
export const socials = {
  email: 'md.abdullah.mulla@gmail.com',
  phone: '+880 1XXX-XXXXXX',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
  facebook: 'https://www.facebook.com/',
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export const heroTags = [
  { label: 'Code', x: '12%', y: '22%' },
  { label: 'Web Development', x: '78%', y: '18%' },
  { label: 'Problem Solving', x: '8%', y: '62%' },
  { label: 'JavaScript', x: '84%', y: '42%' },
  { label: 'React', x: '18%', y: '80%' },
  { label: 'Node.js', x: '72%', y: '76%' },
  { label: 'C++', x: '88%', y: '64%' },
  { label: 'DSA', x: '6%', y: '38%' },
]

export const skillGroups = [
  {
    id: 'languages',
    label: 'Languages',
    items: [
      { name: 'C++', info: 'Primary language for DSA, competitive programming, and systems-level thinking.' },
      { name: 'JavaScript', info: 'The language of the web — from the DOM to Node.js services.' },
      { name: 'Python', info: 'Used for scripting, rapid prototyping, and algorithmic practice.' },
      { name: 'Java', info: 'Object-oriented foundations and structured application design.' },
      { name: 'PHP', info: 'Server-side applications, CRUD systems, and MySQL-backed products.' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'HTML', info: 'Semantic structure as the skeleton of every interface I ship.' },
      { name: 'CSS', info: 'Layout, motion, and visual systems — not just decoration.' },
      { name: 'Tailwind CSS', info: 'Utility-first systems for fast, consistent product UI.' },
      { name: 'JavaScript', info: 'Interface behaviour, motion, and the glue between systems.' },
      { name: 'React', info: 'Component architecture for interactive, stateful web experiences.' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: 'Node.js', info: 'JavaScript on the server for APIs and real-time applications.' },
      { name: 'Express.js', info: 'Minimal, pragmatic HTTP APIs and middleware pipelines.' },
      { name: 'PHP', info: 'Practical backend for database-driven web products.' },
      { name: 'MySQL', info: 'Relational modeling, queries, and production data integrity.' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      { name: 'Git', info: 'Version control as a daily engineering habit, not an afterthought.' },
      { name: 'GitHub', info: 'Collaboration, portfolios of work, and open development.' },
      { name: 'VS Code', info: 'The environment where most of the thinking happens.' },
      { name: 'Netlify', info: 'Shipping static and JAMstack experiences to the edge.' },
    ],
  },
  {
    id: 'core',
    label: 'Core',
    items: [
      { name: 'DSA', info: 'Data structures and algorithms as the grammar of good software.' },
      { name: 'Problem Solving', info: 'Breaking ambiguous problems into precise, testable steps.' },
      { name: 'Algorithms', info: 'Complexity, correctness, and choosing the right approach.' },
      { name: 'OOP', info: 'Modeling systems with clear boundaries and responsibilities.' },
      { name: 'Database', info: 'Designing schemas that stay honest as products grow.' },
    ],
  },
]

export const projects = [
  {
    id: 'expense-tracker',
    index: '01',
    name: 'Expense Tracker',
    kicker: 'Full-stack CRUD · Personal finance',
    description:
      'A full CRUD expense management application built with PHP and MySQL — designed to make everyday money tracking structured, searchable, and honest.',
    problem:
      'Casual spending disappears into memory. The product gives a single, reliable ledger for income, categories, and history.',
    stack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Add expenses',
      'Edit expenses',
      'Delete expenses',
      'Expense tracking',
      'Database integration',
      'CRUD operations',
    ],
    image: '/images/expense-ui.jpg',
    github: 'https://github.com/',
    live: '#',
  },
  {
    id: 'visualgo',
    index: '02',
    name: 'Visualgo',
    kicker: 'Education · Algorithms',
    description:
      'An interactive algorithm visualizer that turns abstract complexity into something you can watch, pause, and understand — built to teach myself while teaching others.',
    problem:
      'DSA is often learned as static text. Visualgo makes sorting and search algorithms spatial, timed, and inspectable.',
    stack: ['React', 'JavaScript', 'CSS', 'Algorithms'],
    features: [
      'Step-through controls',
      'Merge & quick sort',
      'Complexity labels',
      'Pseudocode sync',
      'Playback speed',
      'Responsive canvas',
    ],
    image: '/images/algo-ui.jpg',
    github: 'https://github.com/',
    live: '#',
  },
  {
    id: 'devnotes',
    index: '03',
    name: 'DevNotes',
    kicker: 'Productivity · Knowledge',
    description:
      'A focused markdown workspace for engineering notes — DSA patterns, React internals, SQL, and the fragments that usually live in ten different places.',
    problem:
      'Learning compounds only if it is captured. DevNotes is a quiet, dark editor built for long-form technical memory.',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Local Storage'],
    features: [
      'Markdown editing',
      'Folder structure',
      'Syntax highlighting',
      'Autosave',
      'Search',
      'Distraction-free mode',
    ],
    image: '/images/notes-ui.jpg',
    github: 'https://github.com/',
    live: '#',
  },
]

export const journey = [
  {
    year: '2023',
    title: 'Started my Diploma journey',
    body: 'Enrolled in Computer Science & Technology at Barguna Polytechnic Institute. The first step from curiosity toward a formal engineering path.',
  },
  {
    year: '2024',
    title: 'Exploring programming and the web',
    body: 'Wrote the first serious programs. HTML, CSS, JavaScript, and the realization that software is a craft you can practice every day.',
  },
  {
    year: '2025',
    title: 'Projects and freelancing',
    body: 'Shipped practical work. Took on freelance and digital work, learned how clients think, and started treating code as a product — not just an assignment.',
  },
  {
    year: '2026',
    title: 'Fifth semester. Serious preparation.',
    body: 'Completed the 5th semester and began structured software development preparation — DSA, full-stack systems, and a higher bar for everything I build.',
  },
  {
    year: '2026+',
    title: 'Foundations, still being poured',
    body: 'Building durable skill in DSA, web development, and software engineering. The work is unfinished on purpose.',
  },
]

export const education = [
  {
    program: 'Diploma in Engineering',
    field: 'Computer Science & Technology',
    place: 'Barguna Polytechnic Institute',
    note: 'Currently progressing through the Diploma program.',
  },
  {
    program: 'Secondary School Certificate',
    field: 'SSC',
    place: 'Rajshahi Board — 2023',
    note: 'Completed secondary education before entering engineering studies.',
  },
]

export const proof = [
  { value: '01+', label: 'Completed Semester Journey', detail: 'Diploma in CST, still in motion.' },
  { value: '01', label: 'Full CRUD Project', detail: 'Expense Tracker, PHP + MySQL.' },
  { value: '34', label: 'Districts Explored', detail: 'Bangladesh, beyond the screen.' },
  { value: '∞', label: 'Things Still Left To Build', detail: 'The only honest metric.' },
]

export const experience = [
  { title: 'Practical projects', text: 'Shipped complete applications with real databases and user flows.' },
  { title: 'Freelancing', text: 'Client work that taught scope, communication, and delivery.' },
  { title: 'SEO', text: 'Understanding how people actually find things on the web.' },
  { title: 'Digital marketing', text: 'A product is unfinished if nobody can discover it.' },
  { title: 'Phitron Campus Ambassador', text: 'Representing a programming community while learning in public.' },
  { title: 'Programming practice', text: 'Daily reps — problems, patterns, and patience.' },
  { title: 'DSA learning journey', text: 'Treating algorithms as a long apprenticeship, not a checklist.' },
]
