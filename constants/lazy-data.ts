// Heavy data loaded lazily to improve performance

// About section detailed content
export const ABOUT_CONTENT = {
  sectionTitle: "My Journey",
  description: [
    "From my early days at Haramaya University to my current role as a Full-Stack Developer, I've always been driven by a passion for technology and a desire to create meaningful solutions.",
    "I thrive on challenges and enjoy working with cutting-edge technologies to build scalable and efficient applications. My goal is to leverage my skills and experience to make a positive impact on the world.",
  ],
  qualities: [
    { label: "Clean Code" },
    { label: "Performance" },
    { label: "Responsive" },
    { label: "Accessible" },
  ],
  skillRatings: [
    { skill: "Problem Solving", rating: 5 },
    { skill: "Team Collaboration", rating: 4 },
    { skill: "Learning Agility", rating: 5 },
  ],
};

// Skills organized by category (pre-computed for performance)
const RAW_SKILLS = [
  { name: "JavaScript", category: "frontend", icon: "☕️" },
  { name: "React", category: "frontend", icon: "⚛️" },
  { name: "Redux", category: "frontend", icon: "✨" },
  { name: "Vue", category: "frontend", icon: "🟩" },
  { name: "CSS3", category: "frontend", icon: "🎨" },
  { name: "vitest", category: "testing", icon: "⚡" },
  { name: "TypeScript", category: "frontend", icon: "📘" },
  { name: "Vite", category: "frontend", icon: "📦" },
  { name: "TailwindCSS", category: "frontend", icon: "💨" },
  { name: "AntD", category: "frontend", icon: "🐜" },
  { name: "Ruby", category: "backend", icon: "💎" },
  { name: "Ruby on Rails", category: "backend", icon: "🛤️" },
  { name: "Strapi", category: "backend", icon: "🚀" },
  { name: "MongoDB", category: "backend", icon: "🍃" },
  { name: "MySQL", category: "backend", icon: "🐬" },
  { name: "PostgreSQL", category: "backend", icon: "🐘" },
  { name: "NodeJS", category: "backend", icon: "🟢" },
  { name: "Express", category: "backend", icon: "⚡️" },
  { name: "GraphQL", category: "backend", icon: "📊" },
  { name: "Machine Learning", category: "ai", icon: "🤖" },
  { name: "LLMs", category: "ai", icon: "🧠" },
  { name: "NLP", category: "ai", icon: "🗣️" },
  { name: "Vite", category: "testing", icon: "⚡" },
  { name: "Jest", category: "testing", icon: "🃏" },
  { name: "TDD", category: "testing", icon: "✅" },
  { name: "Playwright", category: "testing", icon: "🎭" },
  { name: "Chrome Dev Tools", category: "testing", icon: "⚙️" },
  { name: "Git", category: "tools", icon: "🌱" },
  { name: "GitHub", category: "tools", icon: "🐙" },
  { name: "VS Code", category: "tools", icon: "💻" },
  { name: "Cursor", category: "tools", icon: "🗂️" },
  { name: "AWS", category: "tools", icon: "☁️" },
];

export const SKILLS_CATEGORIES = [
  {
    title: "Frontend Development",
    description:
      "Creating responsive, interactive user interfaces with modern frameworks and libraries.",
    category: "frontend",
    skills: RAW_SKILLS.filter((skill) => skill.category === "frontend"),
  },
  {
    title: "Backend Development",
    description:
      "Building scalable server-side applications and APIs with robust architecture.",
    category: "backend",
    skills: RAW_SKILLS.filter((skill) => skill.category === "backend"),
  },
  {
    title: "AI & Machine Learning",
    description:
      "Developing AI solutions and implementing machine learning algorithms.",
    category: "ai",
    skills: RAW_SKILLS.filter((skill) => skill.category === "ai"),
  },
  {
    title: "Testing",
    description:
      "Implementing testing strategies to ensure the reliability and performance of web applications.",
    category: "testing",
    skills: RAW_SKILLS.filter((skill) => skill.category === "testing"),
  },
  {
    title: "Tools & CI/CD",
    description:
      "Implementing CI/CD pipelines and managing cloud infrastructure for optimal performance.",
    category: "tools",
    skills: RAW_SKILLS.filter((skill) => skill.category === "tools"),
  },
];

// Projects data
export const PROJECTS_DATA = [
  {
    title: "Hotel Reservation System",
    description:
      "Built a hotel reservation web app with React/Redux frontend and Ruby on Rails backend API.",
    image: "/hotelreservation.webp?height=200&width=300",
    tech: ["React", "TypeScript", "PostgreSQL", "RoR", "TailwindCSS"],
    github: "https://github.com/Miliyonayalew/Marriott-Reservation-Backend",
    live: "https://marriott-reservation.netlify.app",
    featured: false,
    stats: { users: "10K+", revenue: "$500K+" },
  },
  {
    title: "Space Traveler's Hub",
    description:
      "Web application for space travel company using SpaceX API for booking rockets and missions.",
    image: "/spacetraveler.webp?height=200&width=300",
    tech: ["React", "Redux", "CSS"],
    github: "https://github.com/Miliyonayalew/space-travelers-hub",
    live: "https://rad-cat-cbc90c.netlify.app/",
    featured: false,
    stats: { teams: "200+", tasks: "50K+" },
  },
  {
    title: "Crypto-App",
    description:
      "Track top 100 crypto values and prices through a web app for the cryptocurrency market.",
    image: "/crypto.webp?height=200&width=300",
    tech: ["React", "Redux", "Jest"],
    github: "https://github.com/Miliyonayalew/crypto-app",
    live: "https://poetic-lokum-2abf1e.netlify.app/",
    featured: false,
    stats: { content: "1M+", users: "5K+" },
  },
  {
    title: "Tv Show",
    description:
      "The app showcases TV show info, and ratings/comments, with show card details and comment functionality. ",
    image: "/movie.webp?height=200&width=300",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Miliyonayalew/Capstone-II",
    live: "https://jfoyarzo.github.io/Capstone-II/",
    featured: false,
    stats: { properties: "2K+", views: "100K+" },
  },
  {
    title: "TenxSaaS Apply",
    description:
      "A SaaS application for Tenx to manage their applicants and their applications.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["React", "Redux", "Strapi", "AntD", "PostgreSQL"],
    github: "#",
    live: "https://apply.10academy.org/",
    featured: false,
    stats: { content: "100K+", users: "15K+" },
  },
  {
    title: "Tenx E-Learning",
    description:
      "A SaaS application for Tenx to manage their e-learning platform.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["React", "Redux", "Strapi", "AntD", "PostgreSQL"],
    github: "#",
    live: "http://tenx.10academy.org/",
    featured: false,
    stats: { content: "200K+", users: "20K+" },
  },
  {
    title: "Food Delivery App",
    description:
      "A food delivery app built for mobile devices using a cross-platform framework and rapid development tools.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["React Native", "Expo", "NodeJS", "Appwrite", "PostgreSQL"],
    github: "#",
    live: "#",
    featured: true,
    stats: { content: "100K+", users: "15K+" },
  },
];

// Project-related content
export const PROJECT_CONTENT = {
  featuredBadge: "Featured",
  buttons: {
    code: "Code",
    liveDemo: "Live Demo",
  },
};

// Testimonials data
export const TESTIMONIALS_DATA = [
  {
    name: "Oscar Fernández Muñoz",
    role: "Software Engineer",
    company: "Torre",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "I had the pleasure of pair-programming with Miliyon during Microverse. He's detail-oriented, writes clean, accessible code, and consistently looks for UI improvements. On top of that, he's approachable and easy to collaborate with. Highly recommended!",
    rating: 5,
  },
  {
    name: "Cesar Valencia Aguilar",
    role: "Full Stack Developer",
    company: "Microverse",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Miliyon is punctual, knowledgeable, and always willing to help. His deep understanding of JavaScript, Ruby, React, and Redux made working with him a great experience.",
    rating: 5,
  },
  {
    name: "Matias Belete",
    role: "Data Scientist & Lecturer",
    company: "Haramaya University",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Miliyon is a skilled and passionate developer. During our time at Haramaya University, he showed strong problem-solving abilities and was a supportive team player. I'd gladly work with him again.",
    rating: 5,
  },
  {
    name: "Jonathan Kayizzi",
    role: "Software Engineer",
    company: "Microverse",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "I collaborated with Miliyon on a React project at Microverse. He has solid JavaScript skills and confidently contributes valuable ideas.",
    rating: 5,
  },
  {
    name: "Felipe Oyarzo Contreras",
    role: "Junior Software Engineer",
    company: "Microverse",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "I worked with Miliyon on a Microverse capstone project, and it was a great experience. He’s a skilled problem solver and would be a valuable asset to any team.",
    rating: 5,
  },
];

// Experience data
export const EXPERIENCE_DATA = [
  {
    title: "Front-end Developer",
    company: "10 Academy",
    period: "August 2023 - Present",
    location: "Remote - Santa Clara, USA",
    description:
      "Developing user interfaces and implementing front-end logic for web applications. Collaborating with designers and back-end developers to deliver high-quality products.",
    achievements: [
      "Developed and maintained responsive web applications using React and related technologies.",
      "Collaborated with designers to implement UI/UX designs and ensure a seamless user experience.",
      "Participated in code reviews and contributed to improving code quality and maintainability.",
      "Integrated front-end components with back-end APIs and data sources.",
      "Implemented testing strategies to ensure the reliability and performance of web applications.",
    ],
  },
  {
    title: "Intern",
    company: "10 Academy",
    period: "July 2023 - August 2023",
    location: "Remote - Santa Clara, USA",
    description:
      "Assisted senior developers in building and maintaining web applications. Gained experience in front-end development and software engineering best practices.",
    achievements: [
      "Assisted in the development of new features and enhancements for existing web applications.",
      "Participated in code reviews and learned about software engineering best practices.",
      "Contributed to the improvement of code quality and maintainability.",
      "Worked with a team of developers to deliver high-quality products.",
      "Gained experience in front-end development and software engineering.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Ibex Technology",
    period: "January 2023 - June 2023",
    location: "Remote - Addis Ababa, Ethiopia",
    description:
      "Developed and maintained full-stack web applications using modern technologies. Collaborated with designers and product managers to deliver high-quality products.",
    achievements: [
      "Developed and maintained full-stack web applications using React, Node.js, and related technologies.",
      "Collaborated with designers and product managers to implement UI/UX designs and ensure a seamless user experience.",
      "Participated in code reviews and contributed to improving code quality and maintainability.",
      "Integrated front-end components with back-end APIs and data sources.",
      "Implemented testing strategies to ensure the reliability and performance of web applications.",
    ],
  },
  {
    title: "Mentor",
    company: "MICROVERSE",
    period: "September 2022 - October 2022",
    location: "Remote - San Francisco, USA",
    description:
      "Mentored junior developers and provided guidance on software engineering best practices. Assisted students in completing coding projects and preparing for technical interviews.",
    achievements: [
      "Mentored junior developers and provided guidance on software engineering best practices.",
      "Assisted students in completing coding projects and preparing for technical interviews.",
      "Provided feedback on code quality and maintainability.",
      "Helped students improve their problem-solving skills and technical knowledge.",
      "Contributed to the success of the Microverse program.",
    ],
  },
];

export const EDUCATION_DATA = [
  {
    degree: "BSc in Software Engineering",
    institution: "Haramaya University",
    period: "2017 - 2022",
    location: "Dire Dawa, Ethiopia",
    description:
      "Graduated with distinction. Focused on software engineering principles, algorithms, and full-stack development. Relevant Courses: Data Structures & Algorithms, Web Development, Database Systems, Software Architecture, Artificial Intelligence, Distributed Systems, Object Oriented Programming ",
    highlights: [
      "Graduated with distinction",
      "Developed a final-year project called a web-based online learning system",
    ],
  },
  {
    degree: "Full Stack Web Development Program Full-Time",
    institution: "Microverse",
    period: "2022 - 2023",
    location: "Remote - San Francisco, USA",
    description:
      "Completed 1300+ hours of full-stack development and algorithm training, building projects with Ruby, Rails, React, and collaborating remotely using GitHub and agile workflows. ",
    highlights: [
      "Completed 1300+ hours of full-stack development and algorithm training",
      "Built projects with Ruby, Rails, React",
      "Collaborated remotely using GitHub and agile workflows",
    ],
  },
];

// Contact form content
export const CONTACT_CONTENT = {
  sectionTitle: "Let's work together",
  description:
    "Whether you have a project in mind or just want to chat about technology, I'd love to hear from you.",
  contactInfo: {
    email: "miliayalew@gmail.com",
    location: "Addis Ababa, Ethiopia",
    phone: "+251922765739",
  },
  form: {
    title: "Send me a message",
    fields: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      subject: "Subject",
      subjectPlaceholder: "Project inquiry",
      message: "Message",
      messagePlaceholder: "Tell me about your project...",
    },
    buttons: {
      send: "Send Message",
      sending: "Sending...",
    },
    success: {
      title: "Message Sent!",
      message: "Thank you for reaching out. I'll get back to you soon!",
    },
  },
};
