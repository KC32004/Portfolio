export const PERSONAL = {
  name: 'K Chandana',
  title: 'AI & Data Science Graduate',
  tagline: 'Turning data into decisions, ideas into intelligent systems.',
  email: 'kchandana.200432@gmail.com',
  location: 'Bengaluru, Karnataka, India',
  github: 'https://github.com/KC32004',
  linkedin: 'https://linkedin.com/in/k-chandana-ai',
  cgpa: '8.48',
  college: 'SDM Institute of Technology, Ujire'
}

export const SKILLS = {
  'Programming Languages': [
    { name: 'Python', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'C#', level: 75 },
    { name: 'Java', level: 65 },
    { name: 'Scala', level: 60 }
  ],
  'Web Technologies': [
    { name: 'HTML / CSS', level: 85 },
    { name: 'React.js', level: 65 },
    { name: 'Node.js', level: 60 },
    { name: 'Express.js', level: 60 },
    { name: 'ASP.NET Core MVC', level: 75 }
  ],
  'AI & Data Science': [
    { name: 'Machine Learning', level: 80 },
    { name: 'Deep Learning', level: 72 },
    { name: 'Computer Vision', level: 75 },
    { name: 'Data Analytics', level: 78 },
    { name: 'Power BI', level: 65 }
  ],
  'Databases & Tools': [
    { name: 'MongoDB', level: 72 },
    { name: 'SQL Server', level: 70 },
    { name: 'Git / GitHub', level: 80 },
    { name: 'Solidity', level: 60 },
    { name: 'OpenCV', level: 72 }
  ]
}

export const PROJECTS = [
  {
    id: 1,
    title: 'Smart Asset Management System',
    shortDesc: 'Enterprise-grade centralised asset tracking and management platform',
    description: 'A full-featured web application built with ASP.NET Core MVC and C# that empowers organisations to track, manage, and monitor assets across departments. Features a real-time analytics dashboard, maintenance scheduling, asset allocation workflows, and secure multi-user authentication backed by SQL Server.',
    tags: ['ASP.NET Core', 'C#', 'SQL Server', 'Entity Framework', 'Bootstrap'],
    category: 'Web Development',
    github: 'https://github.com/KC32004/Smart-Asset-Management-',
    demo: null,
    highlights: ['Real-time dashboard analytics', 'Asset allocation & maintenance tracking', 'User authentication system', 'Centralised database management'],
    color: 'blue'
  },
  {
    id: 2,
    title: 'VogueVista — AI Virtual Try-On',
    shortDesc: 'AI-powered fashion technology enabling virtual outfit try-on via computer vision',
    description: 'An innovative AI-powered fashion tech platform that uses Python and OpenCV to allow users to virtually try on outfits in real-time. Leverages computer vision models to detect body pose and overlay garments accurately, solving a real e-commerce pain point with cutting-edge deep learning.',
    tags: ['Python', 'OpenCV', 'Computer Vision', 'Flask', 'Deep Learning'],
    category: 'AI / Computer Vision',
    github: 'https://github.com/KC32004',
    demo: null,
    highlights: ['Real-time body pose detection', 'Accurate garment overlay using CV', 'Web interface for seamless UX', 'Fashion-tech e-commerce application'],
    color: 'violet'
  },
  {
    id: 3,
    title: 'ToDo Smart Contract — Blockchain dApp',
    shortDesc: 'Decentralised task management system on Ethereum using Solidity smart contracts',
    description: 'A blockchain-based decentralised application (dApp) where task data is stored immutably on the Ethereum network. Built with Solidity smart contracts and connected to a web frontend via MetaMask — demonstrating secure, trustless task creation and management without any centralised backend.',
    tags: ['Solidity', 'Ethereum', 'MetaMask', 'JavaScript', 'Web3'],
    category: 'Blockchain',
    github: 'https://github.com/KC32004/ToDo-Smart-Contract',
    demo: null,
    highlights: ['Immutable on-chain task storage', 'MetaMask wallet integration', 'Solidity smart contract architecture', 'Trustless task management'],
    color: 'amber'
  },
  {
    id: 4,
    title: 'ClariSchool — Student Progress Tracker',
    shortDesc: 'Academic monitoring platform with performance visualisation and learning insights',
    description: 'A student performance monitoring system that tracks academic progress across subjects, visualises performance trends through dynamic charts, and generates data-driven learning insights for educators and students. Built with MongoDB, HTML, CSS, and JavaScript.',
    tags: ['MongoDB', 'JavaScript', 'HTML/CSS', 'Data Viz', 'Node.js'],
    category: 'Web Development',
    github: 'https://github.com/KC32004',
    demo: null,
    highlights: ['Academic progress tracking dashboard', 'Performance trend visualisation', 'Learning gap identification', 'Data-driven insights for educators'],
    color: 'green'
  },
  {
    id: 5,
    title: 'PantryPal — Smart Inventory Solution',
    shortDesc: '6th place Anveshana Hackathon — intelligent pantry management with Python & MongoDB',
    description: 'A collaborative hackathon project that secured 6th place at the Anveshana Hackathon. PantryPal is a smart inventory management system that tracks pantry items, predicts restocking needs using consumption patterns, and reduces food waste through intelligent alerts and analytics.',
    tags: ['Python', 'MongoDB', 'Flask', 'Analytics'],
    category: 'AI / Data Science',
    github: 'https://github.com/KC32004',
    demo: null,
    highlights: ['Smart restocking predictions', 'Consumption pattern analysis', 'Waste reduction analytics', 'Hackathon awarded — 6th place'],
    color: 'teal'
  }
]

export const EXPERIENCE = [
  {
    role: 'Web Development & Industrial Training Intern',
    company: 'Hindustan Aeronautics Limited (HAL)',
    location: 'Bengaluru, India',
    period: 'Jan 2026 – May 2026',
    type: 'Internship',
    description: 'Contributed to internal web application development at one of India\'s premier defence-aerospace organisations, while gaining hands-on exposure to aerospace manufacturing processes.',
    responsibilities: [
      'Designed and developed web interfaces using HTML, CSS, and the ASP.NET Framework as part of internal enterprise applications',
      'Gained hands-on exposure to aerospace manufacturing processes within the foundry and forge divisions',
      'Developed understanding of machining operations and industrial quality standards in a real-world aerospace environment',
      'Collaborated with senior engineers to align software deliverables with operational requirements'
    ],
    technologies: ['HTML', 'CSS', '.NET Framework', 'C#', 'SQL Server'],
    color: 'blue'
  }
]

export const EDUCATION = [
  {
    degree: 'B.E. — Artificial Intelligence & Data Science',
    institution: 'SDM Institute of Technology, Ujire',
    period: '2022 – 2026',
    cgpa: '8.48',
    coursework: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Data Structures & Algorithms', 'Database Management Systems', 'Web Technologies', 'Blockchain Fundamentals'],
    achievements: ['Consistent academic performer with 8.48 CGPA', '1st Place — Ideathon, Yugma TechFest 1.0', 'NCC \'A\' Certificate Holder']
  },
  {
    degree: 'Class 11–12 (PCMB)',
    institution: 'Amritha Vidhyalayam, Bengaluru',
    period: 'Pre-University',
    percentage: '79.8%',
    coursework: ['Physics', 'Chemistry', 'Mathematics', 'Biology']
  },
  {
    degree: 'Grade 10 (SSLC)',
    institution: 'Nirman International Public School, Bengaluru',
    period: 'Secondary School',
    percentage: '79.6%',
    coursework: []
  }
]

export const CERTIFICATIONS = [
  { name: 'Digital Marketing Fundamentals', issuer: 'IIDE', year: '2025', category: 'Marketing' },
  { name: 'Full Stack Development', issuer: 'SDMIT, Ujire', year: 'Oct 2024', category: 'Development' },
  { name: 'Developing with MongoDB', issuer: 'Infosys Springboard', year: 'May 2024', category: 'Database' },
  { name: 'Introduction to Artificial Intelligence', issuer: 'Infosys Springboard', year: 'Jan 2024', category: 'AI/ML' },
  { name: 'Introduction to Python', issuer: 'Infosys Springboard', year: 'Jun 2024', category: 'Programming' },
  { name: 'Scala Programming', issuer: 'Infosys Springboard', year: 'May–Jun 2024', category: 'Programming' },
  { name: 'Entrepreneurship Development Program', issuer: 'RUDSETI', year: '2024', category: 'Business' }
]

export const ACHIEVEMENTS = [
  { rank: '🥇 1st', event: 'Ideathon — Yugma TechFest 1.0', org: 'JNNCE Shivamogga', desc: 'Won first place in a competitive ideathon, collaborating with a teammate to deliver the winning idea.' },
  { rank: '6th', event: 'Anveshana Hackathon', org: 'PantryPal Project', desc: 'Ranked 6th with a smart inventory management solution using Python and MongoDB.' },
  { rank: 'National', event: 'FusionTechathon 3.0', org: 'AIET 2024', desc: 'Competed nationally, developing a Waste Management solution in a 24-hour sprint.' },
  { rank: '🏅', event: 'IdeaStorm Award', org: 'Sustainable Agriculture Track', desc: 'Recognised for an innovative solution addressing Sustainable Agriculture and Urban Living.' },
  { rank: '💡', event: 'INNOVATE-A-THON', org: 'Edu-Tech Lifetools', desc: '12-hour hackathon developing a technology-based solution for Edu-Tech Lifetools.' }
]

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' }
]
