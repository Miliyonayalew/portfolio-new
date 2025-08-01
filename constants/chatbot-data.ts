// Chatbot knowledge base data
export const CHATBOT_DATA = {
  // Personal Information
  personal: {
    name: "Miliyon Ayalew",
    title: "Full-Stack Developer and AI Enthusiast",
    location: "Addis Ababa, Ethiopia",
    contact: {
      email: "miliayalew@gmail.com",
      phone: "+251922765739",
    },
  },

  // Education
  education: [
    {
      degree: "BSc in Software Engineering",
      institution: "Haramaya University",
      period: "2017 - 2022",
      location: "Haramaya, Ethiopia",
      description:
        "Graduated with distinction. Focused on software engineering principles, algorithms, and full-stack development.",
      highlights: [
        "Graduated with distinction",
        "Developed a final-year project called a web-based online learning system",
      ],
    },
    {
      degree: "Full Stack Web Development Program",
      institution: "Microverse",
      period: "2022 - 2023",
      location: "Remote - San Francisco, USA",
      description:
        "Completed 1300+ hours of full-stack development and algorithm training.",
      highlights: [
        "Completed 1300+ hours of full-stack development and algorithm training",
        "Built projects with Ruby, Rails, React",
        "Collaborated remotely using GitHub and agile workflows",
      ],
    },
  ],

  // Current Role
  currentRole: {
    title: "Front-end Developer",
    company: "10 Academy",
    period: "August 2023 - Present",
    location: "Remote - Santa Clara, USA",
    achievements: [
      "Integrated an AI-driven assignment system with chatbot and real-time analytics, cutting grading time by 50% and supporting 10k+ users efficiently",
      "Developed reusable UI components with Ant Design and TailwindCSS, speeding up development by 40% and ensuring accessibility across devices",
      "Built advanced content and performance tracking features with personalized learning paths, interactive dashboards, and automated end-to-end tests using Playwright",
    ],
  },

  // Technical Skills
  skills: {
    frontend: [
      "JavaScript",
      "React",
      "Redux",
      "Vue",
      "CSS3",
      "TypeScript",
      "Vite",
      "TailwindCSS",
      "AntD",
    ],
    backend: [
      "Ruby",
      "Ruby on Rails",
      "Strapi",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "NodeJS",
      "Express",
      "GraphQL",
    ],
    ai: ["Machine Learning", "LLMs", "NLP"],
    testing: ["vitest", "Jest", "TDD", "Playwright", "Chrome Dev Tools"],
    tools: ["Git", "GitHub", "VS Code", "Cursor", "AWS"],
  },

  // Projects
  projects: [
    {
      title: "Hotel Reservation System",
      description:
        "Built a hotel reservation web app with React/Redux frontend and Ruby on Rails backend API",
      tech: ["React", "TypeScript", "PostgreSQL", "RoR", "TailwindCSS"],
      github: "https://github.com/Miliyonayalew/Marriott-Reservation-Backend",
      live: "https://marriott-reservation.netlify.app",
    },
    {
      title: "Space Traveler's Hub",
      description:
        "Web application for space travel company using SpaceX API for booking rockets and missions",
      tech: ["React", "Redux", "CSS"],
      github: "https://github.com/Miliyonayalew/space-travelers-hub",
      live: "https://rad-cat-cbc90c.netlify.app/",
    },
    {
      title: "Crypto-App",
      description:
        "Track top 100 crypto values and prices through a web app for the cryptocurrency market",
      tech: ["React", "Redux", "Jest"],
      github: "https://github.com/Miliyonayalew/crypto-app",
      live: "https://poetic-lokum-2abf1e.netlify.app/",
    },
    {
      title: "TenxSaaS Apply",
      description:
        "A SaaS application for Tenx to manage their applicants and their applications",
      tech: ["React", "Redux", "Strapi", "AntD", "PostgreSQL"],
      github: "#",
      live: "https://apply.10academy.org/",
    },
    {
      title: "Tenx E-Learning",
      description:
        "A SaaS application for Tenx to manage their e-learning platform",
      tech: ["React", "Redux", "Strapi", "AntD", "PostgreSQL"],
      github: "#",
      live: "http://tenx.10academy.org/",
    },
    {
      title: "Food Delivery App",
      description:
        "A food delivery app built for mobile devices using a cross-platform framework and rapid development tools",
      tech: ["React Native", "Expo", "NodeJS", "Appwrite", "PostgreSQL"],
      github: "#",
      live: "#",
      featured: true,
    },
  ],

  // Work Experience
  experience: [
    {
      title: "Front-end Developer",
      company: "10 Academy",
      period: "August 2023 - Present",
      location: "Remote - Santa Clara, USA",
      description:
        "Developing user interfaces and implementing front-end logic for web applications. Collaborating with designers and back-end developers to deliver high-quality products.",
      achievements: [
        "Integrated an AI-driven assignment system with chatbot and real-time analytics, cutting grading time by 50% and supporting 10k+ users efficiently",
        "Developed reusable UI components with Ant Design and TailwindCSS, speeding up development by 40% and ensuring accessibility across devices",
        "Built advanced content and performance tracking features with personalized learning paths, interactive dashboards, and automated end-to-end tests using Playwright",
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
        "Designed dynamic workflows for skill assessments and applications in TenX Apply, simplifying onboarding and boosting completion rates by 75%",
        "Implemented multi-step, user-friendly assessment creation interfaces that reduced setup time for career teams by over 60%",
        "Built interactive review components with real-time feedback to improve applicant experience and reduce support requests",
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
        "Built a tiered commodity distribution app with Next.js, TypeScript, and Node.js, improving efficiency and traceability by 20% for government clients",
        "Designed multilingual dashboards and UIs with TailwindCSS, shadcn/ui, and React Query, reducing communication delays by 30% and enabling real-time monitoring",
        "Implemented secure authentication with JWT and role-based access, integrating MongoDB to ensure data integrity and reduce unauthorized access",
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
        "Mentored junior developers and provided guidance on software engineering best practices",
        "Assisted students in completing coding projects",
        "Provided feedback on code quality and maintainability",
        "Helped students improve their problem-solving skills and technical knowledge",
      ],
    },
  ],

  // Testimonials
  testimonials: [
    {
      name: "Oscar Fernández Muñoz",
      role: "Software Engineer",
      company: "Torre",
      content:
        "I had the pleasure of pair-programming with Miliyon during Microverse. He's detail-oriented, writes clean, accessible code, and consistently looks for UI improvements. On top of that, he's approachable and easy to collaborate with. Highly recommended!",
    },
    {
      name: "Cesar Valencia Aguilar",
      role: "Full Stack Developer",
      company: "Microverse",
      content:
        "Miliyon is punctual, knowledgeable, and always willing to help. His deep understanding of JavaScript, Ruby, React, and Redux made working with him a great experience.",
    },
    {
      name: "Matias Belete",
      role: "Data Scientist & Lecturer",
      company: "Haramaya University",
      content:
        "Miliyon is a skilled and passionate developer. During our time at Haramaya University, he showed strong problem-solving abilities and was a supportive team player. I'd gladly work with him again.",
    },
  ],
};

// Helper function to generate system prompt
export function generateSystemPrompt(): string {
  const data = CHATBOT_DATA;

  return `You are a helpful AI assistant for Miliyon Ayalew's portfolio website. You should be friendly, professional, and knowledgeable about Miliyon's background, skills, projects, and experience.

MILIYON'S BACKGROUND:
- ${data.personal.title}
- Software Engineering graduate from Haramaya University (2017-2022)
- Completed Microverse Full Stack Web Development Program (2022-2023)
- Based in ${data.personal.location}
- Contact: ${data.personal.contact.email}, Phone: ${data.personal.contact.phone}

CURRENT ROLE:
- ${data.currentRole.title} at ${data.currentRole.company} (${
    data.currentRole.period
  })
- ${data.currentRole.location}
- Key achievements: ${data.currentRole.achievements.slice(0, 2).join(", ")}

TECHNICAL SKILLS:
Frontend: ${data.skills.frontend.join(", ")}
Backend: ${data.skills.backend.join(", ")}
AI/ML: ${data.skills.ai.join(", ")}
Testing: ${data.skills.testing.join(", ")}
Tools: ${data.skills.tools.join(", ")}

PROJECTS:
${data.projects
  .map(
    (project, index) =>
      `${index + 1}. ${project.title} - ${project.description}`
  )
  .join("\n")}

WORK EXPERIENCE:
${data.experience
  .map((exp) => `- ${exp.title} at ${exp.company} (${exp.period})`)
  .join("\n")}

EDUCATION:
${data.education
  .map((edu) => `- ${edu.degree} from ${edu.institution} (${edu.period})`)
  .join("\n")}

Keep responses concise but informative. Be specific about Miliyon's actual experience and projects when answering questions.`;
}
