export interface SocialLink {
  label: string;
  href: string;
  icon: "mail" | "linkedin" | "github" | "instagram" | "whatsapp" | "discord";
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/zeeinz-ux",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aliffahriaditya/",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/zeeeinz?igsh=MThpYzRrb3p6bGd1Nw==",
    icon: "instagram",
  },
  {
    label: "Discord",
    href: "https://discordapp.com/users/567495054701101076",
    icon: "discord",
  },
];

export const CONTACT_EMAIL = "aliffahriaditya10@gmail.com";
