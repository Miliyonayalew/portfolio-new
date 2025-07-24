// Core content needed for initial page load
export const CORE_CONTENT = {
  // Navigation
  navigation: {
    logo: {
      firstName: "Miliyon",
      lastName: "Ayalew",
    },
    menuItems: ["home", "about", "skills", "projects", "experience", "contact"],
  },

  // Hero Section
  hero: {
    greeting: "Hello, I'm",
    name: "Miliyon Ayalew",
    typingTexts: [
      "Full-Stack Developer",
      "AI Enthusiast",
      "Problem Solver",
      "Software Engineer",
    ],
    description:
      "A passionate and versatile full-stack developer with a knack for crafting innovative solutions. Dedicated to continuous learning and pushing the boundaries of what's possible.",
    buttons: {
      viewWork: "View My Work",
      getInTouch: "Get In Touch",
      resume: "Resume",
    },
    stats: {
      projectsCompleted: "Projects Completed",
      happyClients: "Happy Clients",
      cupsOfCoffee: "Cups of Coffee",
      yearsExperience: "Years Experience",
    },
  },

  // Section titles only (content loaded dynamically)
  sections: {
    about: {
      title: "About Me",
      subtitle:
        "A Full-Stack Developer with a background in Software Engineering from Haramaya University. Passionate about creating innovative solutions and dedicated to continuous learning.",
    },
    skills: {
      title: "Technical Skills",
      subtitle: "Technologies and tools I use to bring ideas to life",
    },
    projects: {
      title: "Featured Projects",
      subtitle:
        "Here are some of my recent projects that showcase my skills and experience.",
    },
    experience: {
      title: "Professional Experience",
      subtitle:
        "My journey through different roles and the impact I've made at each company.",
    },
    testimonials: {
      title: "What People Say",
      subtitle:
        "Testimonials from colleagues, clients, and mentees I've worked with.",
    },
    contact: {
      title: "Get In Touch",
      subtitle:
        "I'm always open to discussing new opportunities and interesting projects.",
    },
  },

  // Footer
  footer: {
    copyright:
      "All rights reserved. Built with ❤️ using Next.js & Tailwind CSS",
  },
};
