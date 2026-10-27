import {
  Executive,
  AcademicPart,
  Article,
  Newsletter,
  EventItem,
  CourseQuiz,
  GalleryAlbum,
  AlumniRecord,
  Role,
  AdminUser
} from '../types';

export const ASSON_EXECUTIVES: Executive[] = [
  {
    name: 'Jacobs Odunayo M.',
    position: 'President',
    phone: '09052029197',
    image: '/assets/executives/president.jpg',
    department: 'Statistics',
    bio: 'Presiding over the Association of Statistics Students of Nigeria (ASSON), OAU Chapter. Dedicated to statistical excellence, empirical research, student capacity building, and industry linkages.'
  },
  {
    name: 'Qazeem Anuoluwapo M.',
    position: 'Vice President',
    phone: '07089225441',
    image: '/assets/executives/vice_president.jpg',
    department: 'Statistics',
    bio: 'Overseeing internal committee operations, academic welfare programs, and collaborative student initiatives.'
  },
  {
    name: 'Adeyemi Adesewa',
    position: 'General Secretary',
    phone: '09138904056',
    image: '/assets/executives/gen_sec.jpg',
    department: 'Statistics',
    bio: 'Directing official association correspondence, records, and administrative proceedings.'
  },
  {
    name: 'Adetola Emmanuel',
    position: 'Assistant General Secretary',
    phone: '08081995085',
    image: '/assets/executives/ass_gen_sec.jpg',
    department: 'Statistics',
    bio: 'Assisting in administrative workflows, meeting records, and student notices.'
  },
  {
    name: 'Osuolale Anuoluwapo',
    position: 'Academic Director',
    phone: '08050230712',
    image: '/assets/executives/academic_dir.jpg',
    department: 'Statistics',
    bio: 'Curating study repositories, organizing tutorial sessions, managing course quizzes, and past question archives.'
  },
  {
    name: 'Adekunle Ibukunoluwa A.',
    position: 'Editor in Chief',
    phone: '08142717108',
    image: '/assets/executives/eic.jpg',
    department: 'Statistics',
    bio: 'Directing the Editorial Board, publications of The Yellow Times, and intellectual student thought leadership.'
  },
  {
    name: 'Akintunde Oluwafisayomi',
    position: 'Treasurer',
    phone: '07025138913',
    image: '/assets/executives/treasurer.jpg',
    department: 'Statistics',
    bio: 'Overseeing association funds, financial stewardship, and budgeting for ASSON programs.'
  },
  {
    name: 'Olatayo Excellence',
    position: 'Librarian',
    phone: '0705466453',
    image: '/assets/executives/lib.jpg',
    department: 'Statistics',
    bio: 'Managing digital and physical departmental statistical references and software documentation.'
  },
  {
    name: 'Emmanuel Isaac V.',
    position: 'Financial Secretary',
    phone: '08166786346',
    image: '/assets/executives/fin_sec.jpg',
    department: 'Statistics',
    bio: 'Maintaining accounting books, dues reconciliations, and financial transparency reports.'
  },
  {
    name: 'Idowu Esther',
    position: 'Assistant Librarian',
    phone: '08104397406',
    image: '/assets/executives/ass_lib.jpg',
    department: 'Statistics',
    bio: 'Supporting library resource catalogs and student study groups.'
  },
  {
    name: 'Adesoye Qodir A.',
    position: 'Director Socials',
    phone: '07016560860',
    image: '/assets/executives/dir_social.jpg',
    department: 'Statistics',
    bio: 'Organizing social retreats, the annual dinner & awards, fresher welcomes, and community engagement.'
  },
  {
    name: 'Kewulola Murisuq O.',
    position: 'Director Sports',
    phone: '07016411404',
    image: '/assets/executives/dir_sports.jpg',
    department: 'Statistics',
    bio: 'Managing sports fixtures, inter-level tournaments, and athletic welfare for statisticians.'
  },
  {
    name: 'Oyekanmi Titiloye',
    position: 'PRO',
    phone: '07067846902',
    image: '/assets/executives/pro.jpg',
    department: 'Statistics',
    bio: 'Public relations officer leading publicity, media broadcasting, and external campus relations.'
  }
];

export const STATISTICS_RESOURCES: AcademicPart[] = [
  {
    part: 1,
    level: '100 Level',
    title: 'Statistics Part 1',
    driveUrl: 'https://drive.google.com/drive/folders/1-W24U4w9fM6X20fbcRZYrORTqI_QwRX3',
    courses: [
      'STA 101 - Introduction to Statistics I',
      'STA 102 - Introduction to Statistics II',
      'STA 104 - Probability Foundations',
      'MTH 101 - Elementary Mathematics for Physical Sciences'
    ],
    description: 'Foundations of statistical science: frequency distributions, measures of central tendency, variance, combinatorial probability, and sample spaces.'
  },
  {
    part: 2,
    level: '200 Level',
    title: 'Statistics Part 2',
    driveUrl: 'https://drive.google.com/drive/folders/1-d-HNxZJURvDfNKpsRBW3AMhnfSDsA5d',
    courses: [
      'STA 201 - Probability & Distribution Theory I',
      'STA 202 - Statistical Inference I',
      'STA 203 - Biometry & Demographic Statistics',
      'STA 204 - Sample Survey Methods'
    ],
    description: 'Continuous and discrete random distributions (Binomial, Poisson, Normal), point estimation, maximum likelihood, and sampling techniques.'
  },
  {
    part: 3,
    level: '300 Level',
    title: 'Statistics Part 3',
    driveUrl: 'https://drive.google.com/drive/folders/1-oZz6plZndmeC3AoDh27UxPDYAywot0m',
    courses: [
      'STA 301 - Regression Analysis',
      'STA 303 - Design & Analysis of Experiments',
      'STA 305 - Statistical Computing (R & Python)',
      'STA 307 - Operations Research'
    ],
    description: 'Multiple linear models, ANOVA, factorial blocks, Monte Carlo simulations, computational statistics in R, Python, and hypothesis testing.'
  },
  {
    part: 4,
    level: '400 Level',
    title: 'Statistics Part 4',
    driveUrl: 'https://drive.google.com/drive/folders/1-hlTV9alLI39JjR21sObZAJ_y9XpW9uK',
    courses: [
      'STA 401 - Multivariate Data Analysis',
      'STA 403 - Stochastic Processes & Markov Chains',
      'STA 405 - Time Series Analysis & Forecasting',
      'STA 499 - Final Year Research Project'
    ],
    description: 'Principal Component Analysis (PCA), factor analysis, ARIMA modeling, econometric forecasting, and graduating capstone projects.'
  }
];

export const COURSE_QUIZZES: CourseQuiz[] = [
  {
    courseCode: 'STA 101',
    title: 'Introduction to Statistics I',
    level: '100 Level',
    description: 'Test your knowledge on frequency tables, central tendencies, standard deviation, and basic probability.',
    durationMinutes: 10,
    questions: [
      {
        id: 'q1',
        question: 'Which measure of central tendency is least affected by extreme outliers in a skewed dataset?',
        options: ['Mean', 'Median', 'Mode', 'Mid-range'],
        correctAnswer: 1,
        explanation: 'The median is based on positional ranking rather than arithmetic sum, making it resistant to extreme outliers.'
      },
      {
        id: 'q2',
        question: 'If a fair six-sided die is rolled once, what is the probability of obtaining an even number or a number greater than 4?',
        options: ['1/2', '2/3', '5/6', '1/3'],
        correctAnswer: 1,
        explanation: 'Even numbers: {2, 4, 6}. Numbers > 4: {5, 6}. Union: {2, 4, 5, 6} = 4 outcomes out of 6, which is 4/6 = 2/3.'
      },
      {
        id: 'q3',
        question: 'What is the sum of deviations of all observations from their arithmetic mean?',
        options: ['Always Zero', 'Always Positive', 'Equal to Variance', 'Sample Size n'],
        correctAnswer: 0,
        explanation: 'By mathematical definition, ∑(x_i - x̄) = ∑x_i - n·x̄ = n·x̄ - n·x̄ = 0.'
      },
      {
        id: 'q4',
        question: 'The positive square root of the variance is known as the:',
        options: ['Mean Absolute Deviation', 'Standard Deviation', 'Coefficient of Variation', 'Interquartile Range'],
        correctAnswer: 1,
        explanation: 'Standard deviation is defined precisely as the positive square root of the variance: σ = √Var(X).'
      }
    ]
  },
  {
    courseCode: 'STA 201',
    title: 'Probability & Distribution Theory',
    level: '200 Level',
    description: 'Evaluate your grasp of discrete and continuous distributions, expected values, and Poisson/Normal properties.',
    durationMinutes: 12,
    questions: [
      {
        id: 'q5',
        question: 'For a Poisson distribution with parameter λ, what is the ratio of the mean to the variance?',
        options: ['λ', '1/λ', '1', 'λ²'],
        correctAnswer: 2,
        explanation: 'In a Poisson distribution, both the mean and variance equal λ. Therefore, Mean / Variance = λ / λ = 1.'
      },
      {
        id: 'q6',
        question: 'What percentage of observations lie within 2 standard deviations of the mean in a standard normal distribution?',
        options: ['68.27%', '95.45%', '99.73%', '90.00%'],
        correctAnswer: 1,
        explanation: 'Under the empirical rule for normal distributions, approximately 95.45% of the data lies within μ ± 2σ.'
      },
      {
        id: 'q7',
        question: 'If X and Y are independent random variables, Var(2X - 3Y) is equal to:',
        options: ['2Var(X) - 3Var(Y)', '4Var(X) - 9Var(Y)', '4Var(X) + 9Var(Y)', '2Var(X) + 3Var(Y)'],
        correctAnswer: 2,
        explanation: 'By variance properties, Var(aX + bY) = a²Var(X) + b²Var(Y) for independent variables. Thus (-3)² = +9.'
      }
    ]
  },
  {
    courseCode: 'STA 301',
    title: 'Regression Analysis & ANOVA',
    level: '300 Level',
    description: 'Questions on ordinary least squares (OLS) assumptions, multicollinearity, R-squared, and F-test statistics.',
    durationMinutes: 15,
    questions: [
      {
        id: 'q8',
        question: 'Under the Gauss-Markov theorem, the OLS estimators are BLUE. What does the "B" in BLUE stand for?',
        options: ['Bounded', 'Best (Minimum Variance)', 'Biased', 'Bayesian'],
        correctAnswer: 1,
        explanation: 'BLUE stands for Best Linear Unbiased Estimator, where "Best" means possessing minimum variance among linear unbiased estimators.'
      },
      {
        id: 'q9',
        question: 'A coefficient of determination R² = 0.85 means that:',
        options: [
          '85% of total variation in Y is explained by the independent variables in the model',
          'The correlation between X and Y is exactly 0.85',
          '85% of sample observations were correctly classified',
          'The probability that the null hypothesis is true is 0.15'
        ],
        correctAnswer: 0,
        explanation: 'R² represents the proportion of total sum of squares explained by the regression model (SSR / SST).'
      },
      {
        id: 'q10',
        question: 'Which test is commonly used to detect first-order autocorrelation in regression residuals?',
        options: ['Durbin-Watson Test', 'Breusch-Pagan Test', 'White Test', 'Shapiro-Wilk Test'],
        correctAnswer: 0,
        explanation: 'The Durbin-Watson statistic tests for first-order autoregressive serial correlation in the residuals.'
      }
    ]
  },
  {
    courseCode: 'STA 305',
    title: 'Statistical Computing (R & Python)',
    level: '300 Level',
    description: 'Test computational data analysis skills, vectorization, tidyverse, and statistical hypothesis testing commands.',
    durationMinutes: 10,
    questions: [
      {
        id: 'q11',
        question: 'In R, which function is used to perform a two-sample Student\'s t-test?',
        options: ['t.test()', 'ttest()', 'sample.test()', 'stats::student()'],
        correctAnswer: 0,
        explanation: '`t.test(x, y)` is the standard base R function to compute one- and two-sample t-tests.'
      },
      {
        id: 'q12',
        question: 'In Python\'s pandas library, which method generates summary descriptive statistics (mean, std, min, max)?',
        options: ['.summary()', '.describe()', '.aggregate()', '.info()'],
        correctAnswer: 1,
        explanation: '`df.describe()` calculates count, mean, std, min, percentiles, and max for numeric DataFrame columns.'
      }
    ]
  }
];

export const ARTICLES: Article[] = [
  {
    _id: '69e6ec9ad98b602d66c933e3',
    title: 'The cost of ignoring data in modern national development',
    slug: 'the-cost-of-ignoring-data',
    author: 'Hibatullah Omotola Luqman',
    authorRole: 'Contributor & Statistical Data Analyst',
    category: 'Statistics & Data Science',
    publishDate: '2026-04-21',
    readTime: '5 min read',
    views: 142,
    likes: 31,
    featuredImage: '/src/assets/images/article_data_science_1793142128872.jpg',
    excerpt: 'In today’s world, almost every system depends on data to function effectively. From transportation planning to population management and environmental forecasting, data plays a key role in helping institutions make informed decisions.',
    content: `In today’s world, almost every system depends on data to function effectively. From transportation planning to population management and environmental forecasting, data plays a key role in helping institutions make informed decisions.

When data is ignored, organizations and governments operate blindly. Policies are built on assumptions, budgets are misallocated, and systemic inefficiencies multiply. In developing nations, the consequences of data neglect are stark: census counts that are out of date, urban traffic networks planned on intuition rather than flow dynamics, and healthcare distributions that miss acute outbreak epicenters.

As statistical science students, our training in probability distributions, regression modeling, and stochastic processes is not an isolated academic exercise. It is the practical framework needed to structure chaos into clarity. Whether developing algorithmic pipelines or validating survey methodologies, the cost of sidelining rigorous data collection is ultimately paid in wasted public resources, economic volatility, and missed opportunities for structural progress.

Modern mathematical models provide the guardrails. Embracing data-driven governance is no longer a luxury; it is the fundamental precondition for sustainable growth.`
  },
  {
    _id: 'art-data-ethics-2026',
    title: 'Empowering Student Statisticians in the Age of Generative AI',
    slug: 'empowering-student-statisticians-ai',
    author: 'Adekunle Ibukunoluwa A.',
    authorRole: 'Editor in Chief, ASSON OAU',
    category: 'Research & Innovation',
    publishDate: '2026-03-14',
    readTime: '6 min read',
    views: 189,
    likes: 54,
    featuredImage: '/src/assets/images/article_biostatistics_1793142128924.jpg',
    excerpt: 'Behind every neural network and large language model is mathematical statistics: gradient estimation, Bayesian priors, cross-entropy minimization, and latent distributions.',
    content: `Behind every modern machine learning model and generative AI architecture is classical and computational statistics.

From backpropagation and loss functions to Markov chain Monte Carlo (MCMC) sampling, variance reduction, and attention mechanics, the foundations were built by statisticians and mathematicians.

At Obafemi Awolowo University, our curriculum in the Department of Statistics trains students not just to click buttons on pre-packaged software, but to understand what happens inside the black box. When a model exhibits hallucination or algorithmic bias, it is a statistical problem of out-of-distribution drift and flawed sampling frames.

By combining rigorous statistical theory with modern computational tooling in R, Python, and SQL, ASSONites are uniquely positioned to lead the data economy across Africa and globally.`
  },
  {
    _id: '691eb7c86a51d9539343ee06',
    title: 'Statistics in a Developing Economy: Facts With Reliable Figures',
    slug: 'statistics-in-a-developing-economy',
    author: 'Jacobs Odunayo M.',
    authorRole: 'President, ASSON OAU Chapter',
    category: 'Opinion & Editorials',
    publishDate: '2025-11-20',
    readTime: '7 min read',
    views: 310,
    likes: 62,
    featuredImage: '/src/assets/images/hero_stats_conference_1793142127421.jpg',
    excerpt: 'Our departmental motto is "Facts with reliable figures". In an era of rampant misinformation and economic volatility, objective statistical rigor is the single most vital compass for societal progress.',
    content: `Our departmental motto is "Facts with reliable figures". In an era of rampant misinformation and economic volatility, objective statistical rigor is the single most vital compass for societal progress.

Governments cannot alleviate poverty without accurate poverty headcounts and Gini coefficients. Banks cannot price risk without actuarial distributions. Epidemiologists cannot curb pandemics without stochastic transmission curves.

As students in the Department of Statistics at Obafemi Awolowo University, we bear the responsibility of upholding scientific integrity. Every survey we design, every hypothesis test we evaluate, and every statistical inference we draw must be rooted in truth.

ASSON OAU will continue to champion student workshops, hackathons, and research symposiums that bridge classroom learning with high-impact industry applications.`
  }
];

export const NEWSLETTERS: Newsletter[] = [
  {
    _id: '695b04eddb8e209b42569a95',
    volume: 3,
    title: 'The Yellow Times, Volume 3 — Must every Stats Student do Tech?',
    description: 'This edition of The Yellow Times explores the intersection between mathematical statistics and modern tech careers. Includes an honest interview with OAU alumnus Ayobami Adebesin, unpacking data science, algorithmic thinking, and diverse industry pathways.\n\nInside, you’ll find insightful features on biostatistics, econometric modeling, and student life at Great Ife.',
    publishDate: '2026-01-05',
    pdfUrl: 'https://res.cloudinary.com/dawbehmur/image/upload/v1767572716/namssn/kn2f8hn0pkxn9l9ttdbv.pdf',
    downloadCount: 48
  },
  {
    _id: '692ed9e54390be3897a75354',
    volume: 2,
    title: 'The Yellow Times, Volume 2 — Student Life; Stats Life',
    description: 'Exploring the balance between rigorous statistical theory and everyday student experiences in the Department of Statistics. Featuring alumni spotlight interviews, campus happenings, and academic advice for junior levels.\n\nDive in for stories, reflections, highlights, and community voices that close out the academic session.',
    publishDate: '2025-12-02',
    pdfUrl: 'https://res.cloudinary.com/dawbehmur/image/upload/v1764678116/namssn/md4x1wpsrf23r20cp8ug.pdf',
    downloadCount: 41
  },
  {
    _id: '690af096b6d38e77332f2961',
    volume: 1,
    title: 'The Yellow Times, Volume 1 — Welcome Back to ASSON',
    description: 'Welcoming ASSONites back to campus with a special address from the President, important departmental announcements, introduction of course tutorial timetables, and the official ASSON study repository.\n\nThis marks the beginning of an empowering academic session for the Association of Statistics Students of Nigeria.',
    publishDate: '2025-11-05',
    pdfUrl: 'https://res.cloudinary.com/dawbehmur/image/upload/v1762324629/namssn/fqsutdhgktpcrjybezkc.pdf',
    downloadCount: 65
  }
];

export const EVENTS: EventItem[] = [
  {
    _id: 'ev-conference-2026',
    title: 'ASSON-ASA 1st International Hybrid Conference 2026',
    description: 'Empowering Student Statisticians for Data-Driven Innovation and Sustainable Development in the Digital Era. Keynotes by leading academic professors, paper presentations, and corporate data analytics panels.',
    date: '2026-11-24',
    time: '9:00 AM WAT',
    location: 'Oduduwa Hall & Virtual Livestream, OAU Ile-Ife',
    category: 'International Conference',
    status: 'upcoming',
    image: '/src/assets/images/hero_stats_conference_1793142127421.jpg',
    gallery: [
      '/src/assets/images/hero_stats_conference_1793142127421.jpg',
      '/src/assets/images/event_symposium_1793142128923.jpg'
    ],
    speakers: [
      'Prof. G.A. Olatunde (Keynote Speaker, Empirical Methods)',
      'Dr. (Mrs) K.F. Adeleke (Lead Biostatistician, WHO Affiliate)',
      'Jacobs Odunayo M. (President, ASSON OAU Chapter)'
    ],
    registrationUrl: 'https://asson-oau.org/register'
  },
  {
    _id: 'ev-hackathon-2026',
    title: 'Great Ife Statistical Data Science Hackathon',
    description: 'A 48-hour hands-on statistical hackathon challenging teams to build predictive models on Nigerian public health and macroeconomic datasets using R, Python, and statistical inference.',
    date: '2026-12-12',
    time: '10:00 AM WAT',
    location: 'Department of Statistics Computer Lab, OAU',
    category: 'Hackathon & Competition',
    status: 'upcoming',
    image: '/src/assets/images/gallery_hackathon_1793142129565.jpg',
    gallery: [
      '/src/assets/images/gallery_hackathon_1793142129565.jpg'
    ],
    speakers: ['ASSON Technical Committee', 'Industry Guest Judges']
  },
  {
    _id: 'ev-workshop-2026',
    title: 'ASSON-ASA National Workshop 2026',
    description: 'Privacy, Transparency, and Trust in the Digital Age: Statistical Modeling, Differential Privacy, and Ethics in Modern Data Practice.',
    date: '2026-02-18',
    time: '10:00 AM WAT',
    location: 'Faculty of Science Lecture Theatre, OAU Ile-Ife',
    category: 'National Workshop',
    status: 'completed',
    image: '/src/assets/images/event_symposium_1793142128923.jpg',
    gallery: [
      '/src/assets/images/event_symposium_1793142128923.jpg'
    ]
  },
  {
    _id: '691df57b01304432f685a7c5',
    title: 'The ASSON Legacy Cup & Sports Derby',
    description: 'The annual ASSON Legacy Cup bringing alumni and student statisticians together in thrilling football fixtures celebrating unity, heritage, and teamwork.',
    date: '2025-11-15',
    time: '10:00 AM WAT',
    location: 'Main Bowl, OAU Sports Complex, Ile-Ife',
    category: 'Athletics & Alumni',
    status: 'completed',
    image: 'https://res.cloudinary.com/dawbehmur/image/upload/v1763571064/namssn/h2cv4yje4xb1werugc87.jpg',
    gallery: [
      'https://res.cloudinary.com/dawbehmur/image/upload/v1763571064/namssn/h2cv4yje4xb1werugc87.jpg'
    ]
  }
];

export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 'alb-1',
    title: 'ASSON-ASA 1st Hybrid Conference & Workshop',
    date: '2026',
    category: 'Conferences',
    coverImage: '/src/assets/images/hero_stats_conference_1793142127421.jpg',
    images: [
      {
        url: '/src/assets/images/hero_stats_conference_1793142127421.jpg',
        caption: 'Keynote lecture on Sustainable Development in the Digital Era'
      },
      {
        url: '/src/assets/images/event_symposium_1793142128923.jpg',
        caption: 'General session with delegates, lecturers, and student researchers'
      }
    ]
  },
  {
    id: 'alb-2',
    title: 'Great Ife Data Analytics Hackathon',
    date: '2026',
    category: 'Academics',
    coverImage: '/src/assets/images/gallery_hackathon_1793142129565.jpg',
    images: [
      {
        url: '/src/assets/images/gallery_hackathon_1793142129565.jpg',
        caption: 'Student teams collaborating on Python & R statistical models'
      },
      {
        url: '/src/assets/images/article_data_science_1793142128872.jpg',
        caption: 'Data wrangling and exploratory data analysis presentation'
      }
    ]
  },
  {
    id: 'alb-3',
    title: 'ASSON Legacy Cup Football Derby',
    date: '2025',
    category: 'Sports',
    coverImage: 'https://res.cloudinary.com/dawbehmur/image/upload/v1763571064/namssn/h2cv4yje4xb1werugc87.jpg',
    images: [
      {
        url: 'https://res.cloudinary.com/dawbehmur/image/upload/v1763571064/namssn/h2cv4yje4xb1werugc87.jpg',
        caption: 'Match kick-off at OAU Sports Complex Main Bowl'
      }
    ]
  },
  {
    id: 'alb-4',
    title: 'Statistics Freshers Welcome & Induction Ceremony',
    date: '2025',
    category: 'Induction',
    coverImage: '/src/assets/images/event_symposium_1793142128923.jpg',
    images: [
      {
        url: '/src/assets/images/event_symposium_1793142128923.jpg',
        caption: 'Welcoming the new Part 1 Statistics students into Faculty of Science'
      }
    ]
  }
];

// Alumni records strictly list full names organized by year
export const ALUMNI_RECORDS: AlumniRecord[] = [
  // Class of 2024
  { id: 'alm-24-1', name: 'Oluwaseun Alabi', gradYear: 2024 },
  { id: 'alm-24-2', name: 'Chinedu Eze', gradYear: 2024 },
  { id: 'alm-24-3', name: 'Amina Bello', gradYear: 2024 },
  { id: 'alm-24-4', name: 'Temiloluwa Akinyemi', gradYear: 2024 },
  { id: 'alm-24-5', name: 'Kolawole Sanusi', gradYear: 2024 },
  { id: 'alm-24-6', name: 'Faithfulness Abiodun', gradYear: 2024 },

  // Class of 2023
  { id: 'alm-23-1', name: 'Kehinde Oyewole', gradYear: 2023 },
  { id: 'alm-23-2', name: 'Tolulope Oladipupo', gradYear: 2023 },
  { id: 'alm-23-3', name: 'Blessing Adeleke', gradYear: 2023 },
  { id: 'alm-23-4', name: 'Damilola Fashola', gradYear: 2023 },
  { id: 'alm-23-5', name: 'Ibrahim Olatunbosun', gradYear: 2023 },

  // Class of 2022
  { id: 'alm-22-1', name: 'Babatunde Olatunji', gradYear: 2022 },
  { id: 'alm-22-2', name: 'Chiamaka Nnamdi', gradYear: 2022 },
  { id: 'alm-22-3', name: 'Samson Omotoso', gradYear: 2022 },
  { id: 'alm-22-4', name: 'Olamide Bakare', gradYear: 2022 },
  { id: 'alm-22-5', name: 'Rasheed Adebayo', gradYear: 2022 },

  // Class of 2021
  { id: 'alm-21-1', name: 'Ayobami Adebesin', gradYear: 2021 },
  { id: 'alm-21-2', name: 'Titilayo Balogun', gradYear: 2021 },
  { id: 'alm-21-3', name: 'Victor Ogundipe', gradYear: 2021 },
  { id: 'alm-21-4', name: 'Simisola Davies', gradYear: 2021 },

  // Class of 2020
  { id: 'alm-20-1', name: 'Blessing Okonkwo', gradYear: 2020 },
  { id: 'alm-20-2', name: 'Femi Awolowo', gradYear: 2020 },
  { id: 'alm-20-3', name: 'Ngozi Chukwu', gradYear: 2020 },
  { id: 'alm-20-4', name: 'Bamidele Ojo', gradYear: 2020 },

  // Class of 2019
  { id: 'alm-19-1', name: 'Emmanuel Balogun', gradYear: 2019 },
  { id: 'alm-19-2', name: 'Grace Adebayo', gradYear: 2019 },
  { id: 'alm-19-3', name: 'Ifeoluwa Ogunleye', gradYear: 2019 },

  // Class of 2018
  { id: 'alm-18-1', name: 'Dr. Folashade Adeleke', gradYear: 2018 },
  { id: 'alm-18-2', name: 'Taofeek Jimoh', gradYear: 2018 },
  { id: 'alm-18-3', name: 'Morufat Yusuf', gradYear: 2018 }
];

export const ASSON_ROLES: Role[] = [
  {
    id: 'role-superadmin',
    name: 'Super Admin',
    description: 'Full unrestricted governance, role assignment, content editing, and system management.',
    permissions: [
      'manage_events',
      'manage_articles',
      'manage_alumni',
      'manage_quizzes',
      'manage_gallery',
      'manage_roles',
      'manage_users'
    ]
  },
  {
    id: 'role-gensec',
    name: 'General Secretary',
    description: 'Manages association communications, official events, notices, and alumni directories.',
    permissions: [
      'manage_events',
      'manage_articles',
      'manage_alumni'
    ]
  },
  {
    id: 'role-academic',
    name: 'Academic Director & Quiz Master',
    description: 'Curates course materials, designs test questions, and supervises quizzes.',
    permissions: [
      'manage_quizzes',
      'manage_articles'
    ]
  },
  {
    id: 'role-pro',
    name: 'PRO & Media Editor',
    description: 'Oversees public relations, media gallery updates, and publication editorial drafts.',
    permissions: [
      'manage_articles',
      'manage_gallery'
    ]
  }
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'user-1',
    name: 'Jacobs Odunayo M.',
    email: 'admin@asson-oau.org',
    roleId: 'role-superadmin',
    roleName: 'Super Admin'
  },
  {
    id: 'user-2',
    name: 'Adeyemi Adesewa',
    email: 'gensec@asson-oau.org',
    roleId: 'role-gensec',
    roleName: 'General Secretary'
  },
  {
    id: 'user-3',
    name: 'Osuolale Anuoluwapo',
    email: 'academic@asson-oau.org',
    roleId: 'role-academic',
    roleName: 'Academic Director & Quiz Master'
  },
  {
    id: 'user-4',
    name: 'Adekunle Ibukunoluwa A.',
    email: 'pro@asson-oau.org',
    roleId: 'role-pro',
    roleName: 'PRO & Media Editor'
  }
];

export const CONSTITUTION_ARTICLES = [
  {
    title: 'Preamble',
    content: `We, the students of the Department of Statistics, Faculty of Science, Obafemi Awolowo University, Ile-Ife, Osun State, Nigeria;\n\nAWARE of the fundamental role of mathematical and statistical sciences in technological innovation, economic planning, and national transformation;\n\nDETERMINED to foster solidarity, intellectual vigor, empirical integrity, and professional discipline amongst all statistics students;\n\nDO HEREBY ENACT, DECREE, AND GIVE UNTO OURSELVES this official Constitution for the governance of the Association of Statistics Students of Nigeria (ASSON), Obafemi Awolowo University Chapter.`
  },
  {
    title: 'Chapter 1: Name, Supremacy and Motto',
    content: `Section 1: The official name of the association shall be the "Association of Statistics Students of Nigeria (ASSON)", Obafemi Awolowo University Chapter.\n\nSection 2: This Constitution is supreme and its provisions shall have binding force on all authorities and members of ASSON OAU.\n\nSection 3: The motto of the association shall be: "Facts with reliable figures".\n\nSection 4: The official colors shall be Ocean Blue (#1A759F) representing empirical depth and discipline, and Vibrant Sky Blue (#34A0A4) representing intellect and innovation, with Energizing Orange (#FF7A00) as active heraldic accent.`
  },
  {
    title: 'Chapter 2: Aims and Objectives',
    content: `Section 1: To promote academic excellence, scientific rigor, and advanced data literacy among all registered students in the Department of Statistics.\n\nSection 2: To organize workshops, bootcamps, and hackathons in statistical programming (R, Python, SAS, SPSS, STATA, Julia, SQL) and empirical research methodologies.\n\nSection 3: To protect and advance the academic, professional, and general welfare of all members.\n\nSection 4: To foster healthy relationship and intellectual exchange with faculty lecturers, the Nigerian Statistical Association (NSA), the Royal Statistical Society (RSS), and industry data organizations.\n\nSection 5: To maintain an active alumni network that connects current students with mentorship, internship, and career pathways.`
  },
  {
    title: 'Chapter 3: Membership & Rights',
    content: `Section 1: Every bona-fide student duly matriculated and registered in the Department of Statistics, Obafemi Awolowo University, shall be an ordinary member of ASSON OAU.\n\nSection 2: Every member shall have the right to attend all general meetings, participate in academic tutorials, access study repositories, and vote in general elections, subject to payment of annual association dues.\n\nSection 3: Every member shall conduct themselves with dignity, upholding the academic integrity of Obafemi Awolowo University.`
  },
  {
    title: 'Chapter 4: The Executive Council & Governance',
    content: `Section 1: The executive power of the association shall be vested in the Executive Council consisting of:\n1. The President\n2. The Vice President\n3. The General Secretary\n4. The Assistant General Secretary\n5. The Academic Director\n6. The Editor-in-Chief\n7. The Financial Secretary\n8. The Treasurer\n9. The Public Relations Officer (PRO)\n10. The Director of Socials\n11. The Director of Sports\n12. The Librarian\n13. The Assistant Librarian\n\nSection 2: The President shall be the principal executive officer, presiding over meetings of the council and representing the association in official university and faculty delegations.\n\nSection 3: The tenure of the Executive Council shall run for one standard academic session.`
  },
  {
    title: 'Chapter 5: Finance, Dues and Audit',
    content: `Section 1: The funds of the association shall be derived from annual membership dues, donations, sponsorship grants, and revenue from editorial publications.\n\nSection 2: All funds shall be lodged in a designated commercial bank account in the name of the association, with the President, Treasurer, and Financial Secretary as mandatory signatories.\n\nSection 3: The financial accounts of the association shall be audited at least twice per academic session by an independent audit committee appointed by the General Assembly.`
  }
];
