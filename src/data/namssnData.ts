import { Executive, AcademicPart, Article, Newsletter, EventItem } from '../types';

export const EXECUTIVES: Executive[] = [
  {
    name: 'Jacobs Odunayo M.',
    position: 'President',
    phone: '09052029197',
    image: '/assets/executives/president.jpg',
    department: 'Mathematics',
    bio: 'Leading the vision of the Nigerian Association of Mathematical Science Students of Nigeria, OAU Chapter. Dedicated to academic rigour, student empowerment, and strategic industry partnerships.'
  },
  {
    name: 'Qazeem Anuoluwapo M.',
    position: 'Vice President',
    phone: '07089225441',
    image: '/assets/executives/vice_president.jpg',
    department: 'Mathematics',
    bio: 'Overseeing internal committee operations, academic welfare programs, and collaborative student initiatives.'
  },
  {
    name: 'Adeyemi Adesewa',
    position: 'General Secretary',
    phone: '09138904056',
    image: '/assets/executives/gen_sec.jpg',
    department: 'Mathematics',
    bio: 'Managing official correspondence, record-keeping, and association governance documentation.'
  },
  {
    name: 'Adetola Emmanuel',
    position: 'Assistant General Secretary',
    phone: '08081995085',
    image: '/assets/executives/ass_gen_sec.jpg',
    department: 'Mathematics',
    bio: 'Assisting in administrative workflows, meeting coordination, and student notices.'
  },
  {
    name: 'Osuolale Anuoluwapo',
    position: 'Academic Director',
    phone: '08050230712',
    image: '/assets/executives/academic_dir.jpg',
    department: 'Mathematics',
    bio: 'Curating study repositories, organizing tutorial sessions, and managing past questions for all parts.'
  },
  {
    name: 'Adekunle Ibukunoluwa A.',
    position: 'Editor in Chief',
    phone: '08142717108',
    image: '/assets/executives/eic.jpg',
    department: 'Mathematics',
    bio: 'Directing the Editorial Board, publications of The Yellow Times, and intellectual student thought leadership.'
  },
  {
    name: 'Akintunde Oluwafisayomi',
    position: 'Treasurer',
    phone: '07025138913',
    image: '/assets/executives/treasurer.jpg',
    department: 'Mathematics',
    bio: 'Overseeing association funds, financial stewardship, and event budgeting.'
  },
  {
    name: 'Olatayo Excellence',
    position: 'Librarian',
    phone: '0705466453',
    image: '/assets/executives/lib.jpg',
    department: 'Mathematics',
    bio: 'Managing physical and digital departmental library assets and mathematical literature.'
  },
  {
    name: 'Emmanuel Isaac V.',
    position: 'Financial Secretary',
    phone: '08166786346',
    image: '/assets/executives/fin_sec.jpg',
    department: 'Mathematics',
    bio: 'Maintaining meticulous accounts, dues reconciliations, and financial records.'
  },
  {
    name: 'Idowu Esther',
    position: 'Assistant Librarian',
    phone: '08104397406',
    image: '/assets/executives/ass_lib.jpg',
    department: 'Mathematics',
    bio: 'Supporting library access, study groups, and resource cataloguing.'
  },
  {
    name: 'Adesoye Qodir A.',
    position: 'Director Socials',
    phone: '07016560860',
    image: '/assets/executives/dir_social.jpg',
    department: 'Mathematics',
    bio: 'Organizing social retreats, departmental dinners, fresher welcomes, and community engagement.'
  },
  {
    name: 'Kewulola Murisuq O.',
    position: 'Director Sports',
    phone: '07016411404',
    image: '/assets/executives/dir_sports.jpg',
    department: 'Mathematics',
    bio: 'Managing sports leagues, football fixtures, the Legacy Cup, and athletic wellness.'
  },
  {
    name: 'Oyekanmi Titiloye',
    position: 'PRO',
    phone: '07067846902',
    image: '/assets/executives/pro.jpg',
    department: 'Mathematics',
    bio: 'Public relations officer leading publicity, social media broadcasting, and external campus relations.'
  }
];

export const MATHEMATICS_RESOURCES: AcademicPart[] = [
  {
    part: 1,
    level: '100 Level',
    title: 'Mathematics Part 1',
    driveUrl: 'https://drive.google.com/drive/folders/1-W24U4w9fM6X20fbcRZYrORTqI_QwRX3',
    courses: ['MTH 101 - Elementary Mathematics I (Algebra & Trigonometry)', 'MTH 102 - Elementary Mathematics II (Calculus)', 'MTH 104 - Vectors & Dynamics', 'MTH 106 - Introductory Coordinate Geometry'],
    description: 'Foundational calculus, set theory, analytical geometry, and algebra past questions, lecture slide packs, and tutorial worksheets.'
  },
  {
    part: 2,
    level: '200 Level',
    title: 'Mathematics Part 2',
    driveUrl: 'https://drive.google.com/drive/folders/1-d-HNxZJURvDfNKpsRBW3AMhnfSDsA5d',
    courses: ['MTH 201 - Mathematical Methods I', 'MTH 202 - Elementary Differential Equations', 'MTH 203 - Linear Algebra I', 'MTH 204 - Real Analysis I'],
    description: 'Core pure and applied mathematics: multivariable calculus, linear algebra, introductory ODEs, and real analysis materials.'
  },
  {
    part: 3,
    level: '300 Level',
    title: 'Mathematics Part 3',
    driveUrl: 'https://drive.google.com/drive/folders/1-oZz6plZndmeC3AoDh27UxPDYAywot0m',
    courses: ['MTH 301 - Abstract Algebra I (Groups & Rings)', 'MTH 303 - Complex Analysis', 'MTH 305 - Ordinary Differential Equations II', 'MTH 307 - Metric Spaces'],
    description: 'Advanced theoretical proofs, modern algebra, complex variable theory, metric topology, and differential equation methods.'
  },
  {
    part: 4,
    level: '400 Level',
    title: 'Mathematics Part 4',
    driveUrl: 'https://drive.google.com/drive/folders/1-hlTV9alLI39JjR21sObZAJ_y9XpW9uK',
    courses: ['MTH 401 - Functional Analysis', 'MTH 403 - General Topology', 'MTH 405 - Partial Differential Equations', 'MTH 499 - Final Year Project Guide'],
    description: 'Capstone level advanced functional analysis, PDEs, measure theory, numerical optimization, and graduating project repositories.'
  }
];

export const STATISTICS_RESOURCES: AcademicPart[] = [
  {
    part: 1,
    level: '100 Level',
    title: 'Statistics Part 1',
    driveUrl: 'https://drive.google.com/drive/folders/1-W24U4w9fM6X20fbcRZYrORTqI_QwRX3',
    courses: ['STA 101 - Introduction to Statistics I', 'STA 102 - Introduction to Statistics II', 'STA 104 - Probability Foundations'],
    description: 'Descriptive statistics, empirical distributions, sample spaces, combinatorial probability, and data summaries.'
  },
  {
    part: 2,
    level: '200 Level',
    title: 'Statistics Part 2',
    driveUrl: 'https://drive.google.com/drive/folders/1-d-HNxZJURvDfNKpsRBW3AMhnfSDsA5d',
    courses: ['STA 201 - Probability & Distribution Theory I', 'STA 202 - Statistical Inference I', 'STA 204 - Sample Survey Methods'],
    description: 'Random variables, standard continuous/discrete distributions, sampling techniques, and parameter estimations.'
  },
  {
    part: 3,
    level: '300 Level',
    title: 'Statistics Part 3',
    driveUrl: 'https://drive.google.com/drive/folders/1-oZz6plZndmeC3AoDh27UxPDYAywot0m',
    courses: ['STA 301 - Regression Analysis', 'STA 303 - Design & Analysis of Experiments', 'STA 305 - Statistical Computing (R/Python)'],
    description: 'Multiple linear models, ANOVA, experimental blocks, computational statistics in R and Python, and hypothesis testing.'
  },
  {
    part: 4,
    level: '400 Level',
    title: 'Statistics Part 4',
    driveUrl: 'https://drive.google.com/drive/folders/1-hlTV9alLI39JjR21sObZAJ_y9XpW9uK',
    courses: ['STA 401 - Multivariate Data Analysis', 'STA 403 - Stochastic Processes', 'STA 405 - Time Series & Forecasting', 'STA 499 - Research Project'],
    description: 'PCA, factor analysis, Markov chains, econometric forecasting, ARIMA modeling, and applied data science research.'
  }
];

export const NEWSLETTERS: Newsletter[] = [
  {
    _id: '695b04eddb8e209b42569a95',
    volume: 3,
    title: 'The Yellow Times, Volume 3 — Must every Maths Student do Tech?',
    description: 'This edition of The Yellow Times leans into a question many of us feel but rarely say out loud: Must every maths student do tech? In a world where “What are you building?” and “Have you started data science?” echo through our timelines, it can be hard to know whether we are chasing interest or just escaping anxiety.\n\nInside, you’ll find an honest interview with our alumnus Ayobami Adebesin, who journeyed from OAU Mathematics into the tech space, along with carefully selected articles that unpack how maths can lead into tech and how it can lead elsewhere with equal depth and dignity.',
    publishDate: '2026-01-05',
    pdfUrl: 'https://res.cloudinary.com/dawbehmur/image/upload/v1767572716/namssn/kn2f8hn0pkxn9l9ttdbv.pdf',
    downloadCount: 42
  },
  {
    _id: '692ed9e54390be3897a75354',
    volume: 2,
    title: 'The Yellow Times, Volume 2 — Student Life; Maths Life',
    description: 'This month’s edition explores the balance between academic rigour and everyday student experience in the Department of Mathematics and Statistics. From our feature article “Student Life, Maths Life” to insightful interviews, alumni perspectives, and a fresh roundup of campus happenings, this issue captures what it truly means to live, learn, and thrive as a maths student at OAU.\n\nDive in for stories, reflections, highlights, and community voices that close out the year with depth and clarity.',
    publishDate: '2025-12-02',
    pdfUrl: 'https://res.cloudinary.com/dawbehmur/image/upload/v1764678116/namssn/md4x1wpsrf23r20cp8ug.pdf',
    downloadCount: 38
  },
  {
    _id: '690af096b6d38e77332f2961',
    volume: 1,
    title: 'The Yellow Times, Volume 1 — Welcome Back',
    description: 'In this inaugural edition of The Yellow Times, we welcome NAMSSNites back to campus and introduce the vision behind our newly rebranded newsletter.\n\nInside, you’ll find a special message from the President, important departmental updates, and a glimpse into what’s coming — including our upcoming website, the NAMSSN Book Club, and a call for passionate writers to join the Editorial Team.\n\nThis marks the beginning of a new storytelling era for NAMSSN.',
    publishDate: '2025-11-05',
    pdfUrl: 'https://res.cloudinary.com/dawbehmur/image/upload/v1762324629/namssn/fqsutdhgktpcrjybezkc.pdf',
    downloadCount: 56
  }
];

export const ARTICLES: Article[] = [
  {
    _id: '69e6ec9ad98b602d66c933e3',
    title: 'The cost of ignoring data',
    slug: 'the-cost-of-ignoring-data',
    author: 'HIBATULLAH OMOTOLA LUQMAN',
    authorRole: 'Contributor & Data Analyst',
    category: 'Statistics & Data Science',
    publishDate: '2026-04-21',
    readTime: '5 min read',
    views: 128,
    likes: 24,
    excerpt: 'In today’s world, almost every system depends on data to function effectively. From transportation planning to population management and environmental forecasting, data plays a key role in helping institutions make informed decisions.',
    content: `In today’s world, almost every system depends on data to function effectively. From transportation planning to population management and environmental forecasting, data plays a key role in helping institutions make informed decisions.

When data is ignored, organizations and governments operate blindly. Policies are built on assumptions, budgets are misallocated, and systemic inefficiencies multiply. In developing nations, the consequences of data neglect are stark: census counts that are out of date, urban traffic networks planned on intuition rather than flow dynamics, and healthcare distributions that miss acute outbreak epicenters.

As mathematical science students, our training in probability distributions, regression modeling, and stochastic processes is not an isolated academic exercise. It is the practical framework needed to structure chaos into clarity. Whether developing algorithmic pipelines or validating survey methodologies, the cost of sidelining rigorous data collection is ultimately paid in wasted public resources, economic volatility, and missed opportunities for structural progress.

Modern mathematical models provide the guardrails. Embracing data-driven governance is no longer a luxury; it is the fundamental precondition for sustainable growth.`
  },
  {
    _id: '691eb7c86a51d9539343ee06',
    title: 'Mathematics in a Country That Didn’t Ask for It',
    slug: 'mathematics-in-a-country-that-didnt-ask-for-it',
    author: 'Adekunle Ibukunoluwa A.',
    authorRole: 'Editor in Chief, NAMSSN OAU',
    category: 'Opinion & Editorials',
    publishDate: '2025-11-20',
    readTime: '7 min read',
    views: 242,
    likes: 47,
    featuredImage: 'https://res.cloudinary.com/dawbehmur/image/upload/v1763619608/namssn/af7lfqjg9gd1nonh2hhn.png',
    excerpt: 'In mathematics departments across Nigeria, a new generation of mathematicians are being raised. We’re taught to be rigorous thinkers, precise problem-solvers, and abstract visionaries. We construct proofs and model complex systems.',
    content: `In mathematics departments across Nigeria, a new generation of mathematicians are being raised. We’re taught to be rigorous thinkers, precise problem-solvers, and abstract visionaries. We construct proofs, model complex systems, analyze data, and study the invisible logic that governs technology, finance, health, cryptography, and artificial intelligence.

Our professors remind us often with pride that mathematics is the engine behind every serious industry. And we believe them, because they're right.

But then we look around. And we begin to ask: Where are these industries going? Because while our theorems remain consistent, the broader economy does not.

Take major technological and multinational departures. In 2024, Microsoft shut down its African Development Centre in Lagos. It wasn’t just a tech hub, it was a symbol of opportunity for young mathematicians and engineers working at the edge of data science, algorithm design, and AI. Sanofi, a company that once hired analysts and researchers versed in logistics modeling and biostatistics, withdrew from direct operations. Shell exited onshore energy sectors, divesting major assets. Oil exploration and reservoir engineering rely directly on nonlinear systems, differential modeling, and risk analytics.

This is not a coincidence. When macroeconomic fundamentals face pressure, companies downsize, outsource, or dissolve. Red tape strangles innovation, access to capital narrows, and research funding remains scarce. In this landscape, even the most mathematically sound theoretical models struggle to find native application pipelines.

Still, we graduate every year armed with mastery in probability, real analysis, machine learning foundations, numerical methods, and abstract algebra. But where do our graduates go?

Some freelance. Some migrate. Some wait. Others abandon the discipline entirely for unrelated administrative roles. The few local sectors capable of absorbing pure analytical rigor—fintech, quantitative insurance, enterprise data science—remain intensely competitive and disconnected from academic institutions.

It is a quiet hemorrhage. We are raising thinkers with nowhere to think, builders with nothing to build, problem-solvers with no domestic industrial problems invited to solve. And the result is a slow loss of national capacity.

This isn’t just about mathematics. It is about the future. Mathematicians are the architects of modern possibility: from epidemiological transmission models to cryptographic security protocols, from financial actuarial models to AI agents. A nation that does not actively cultivate its mathematical talent does not comprehend its own technological tomorrow.

Yet this paradox can be solved. We need deliberate policy bridges that connect departmental research directly to Nigerian industrial challenges. We need computational labs, industry-sponsored capstone problems, and national investment in fundamental research.

Because mathematics remains the bedrock of civilization. And our task as NAMSSNites is to keep pushing the boundaries of critical thinking, sharpening our craft, and building solutions that endure.`
  }
];

export const EDITORIAL_CATEGORIES = [
  'All',
  'Statistics & Data Science',
  'Opinion & Editorials',
  'Mathematics',
  'Applied Mathematics',
  'Research & Innovation',
  'Career & Development',
  'Campus & Culture'
];

export const EVENTS: EventItem[] = [
  {
    _id: '691df57b01304432f685a7c5',
    title: 'The NAMSSN Legacy Cup',
    description: 'The NAMSSN Legacy Cup brings alumni and current students head-to-head in a thrilling friendly football tournament celebrating our unity, heritage, and competitive spirit.',
    date: '2025-11-15',
    time: '10:00 AM',
    location: 'Main Bowl, OAU Sports Complex, Ile-Ife',
    category: 'Sports & Alumni',
    status: 'completed',
    gallery: [
      'https://res.cloudinary.com/dawbehmur/image/upload/v1763571064/namssn/h2cv4yje4xb1werugc87.jpg'
    ]
  },
  {
    _id: 'ev-math-symposium-2026',
    title: 'Great Ife Mathematical Science Symposium & Career Expo',
    description: 'An intensive seminar with distinguished OAU alumni working in Quantitative Finance, Machine Learning, Cryptography, and Higher Education. Featuring panel talks, resume clinics, and networking.',
    date: '2026-11-18',
    time: '11:00 AM',
    location: 'Department of Mathematics Lecture Theatre, OAU',
    category: 'Academic & Career',
    status: 'upcoming',
    gallery: []
  },
  {
    _id: 'ev-freshers-orientation-2026',
    title: 'Freshers Welcome & Academic Induction',
    description: 'Welcoming the new Part 1 students into the Department of Mathematics. Course registration guides, tips on acing MTH 101/102, and mentorship pairing with senior NAMSSNites.',
    date: '2026-12-05',
    time: '1:00 PM',
    location: 'Maths Department Hall B, OAU Ile-Ife',
    category: 'Orientation',
    status: 'upcoming',
    gallery: []
  }
];
