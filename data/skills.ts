export interface SkillItem {
  name: string;
  icon: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: SkillItem[];
}

export const SKILLS: SkillCategory[] = [
  {
    name: "Frontend",
    icon: "🎨",
    skills: [
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Tailwind", icon: "tailwindcss" },
      { name: "Bootstrap", icon: "bootstrap" },
    ],
  },
  {
    name: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Python", icon: "python" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Laravel", icon: "laravel" },
      { name: "Node.js", icon: "nodedotjs" },
    ],
  },
  {
    name: "Mobile",
    icon: "📱",
    skills: [
      { name: "Flutter", icon: "flutter" },
      { name: "Dart", icon: "dart" },
    ],
  },
  {
    name: "Database",
    icon: "🗄️",
    skills: [
      { name: "MySQL", icon: "mysql" },
      { name: "Firebase", icon: "firebase" },
      { name: "Firestore", icon: "firebase" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "DBeaver", icon: "dbeaver" },
    ],
  },
  {
    name: "Tools",
    icon: "🛠️",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "vscode" },
      { name: "Postman", icon: "postman" },
    ],
  },
  {
    name: "UI / UX",
    icon: "✏️",
    skills: [{ name: "Figma", icon: "figma" }],
  },
  {
    name: "Infrastructure",
    icon: "🖥️",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "Linux", icon: "linux" },
      { name: "cPanel", icon: "cpanel" },
    ],
  },
];
