export interface SocialLink {
  label: string;
  href: string;
  icon: "mail" | "linkedin" | "github" | "instagram" | "whatsapp";
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:aliffahriaditya10@gmail.com",
    icon: "mail",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aliffahriaditya/",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/zeeinz-ux",
    icon: "github",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/zeeeinz?igsh=MThpYzRrb3p6bGd1Nw==",
    icon: "instagram",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6285285944423",
    icon: "whatsapp",
  },
];

export const CONTACT_EMAIL = "aliffahriaditya10@gmail.com";
