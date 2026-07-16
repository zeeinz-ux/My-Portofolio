export interface Project {
  title: string;
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  caseStudyUrl: string;
  gradient: string;
  accentColor: string;
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Hotel Ticketing System',
    description:
      'A comprehensive web-based hotel ticketing and reservation platform with real-time availability tracking, multi-room booking, and integrated payment flow — designed for efficiency at scale.',
    tech: ['Laravel', 'MySQL', 'Bootstrap', 'JavaScript', 'AJAX'],
    demoUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
    gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    accentColor: '#7c6ef5',
    image: 'Frame 68.webp',
  },
  {
    title: 'Hotel Asset Audit Mobile App',
    description:
      'A Flutter mobile application for hotel asset inventory and auditing. Features fingerprint authentication, QR code scanning per asset, offline-first architecture, and real-time sync via Firebase.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Biometrics'],
    demoUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
    gradient: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1c2128 100%)',
    accentColor: '#58a6ff',
    image: 'Frame 69.webp',
  },
  {
    title: 'Herbal Atsiri E-Commerce',
    description:
      'Full-featured e-commerce platform for herbal and essential oil products. Includes product catalog with filters, shopping cart, order management, and a full admin dashboard.',
    tech: ['PHP Native', 'MySQL', 'CSS3', 'JavaScript'],
    demoUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #0d4a3a 50%, #1a5c3a 100%)',
    accentColor: '#3fb950',
    image: "Frame 70.webp",
  },
  {
    title: 'Digital Safety Permit System',
    description:
      'A web-based safety permit application developed for PT. Petro Jordan Abadi to streamline workplace safety approvals. The system features specific role-based access controls for SHE (Safety, Health, and Environment) officers and Supervisors, complete with an automated approval workflow and direct PDF export functionality for documentation.',
    tech: ['CodeIgniter 4', 'MySQL', 'Bootstrap', 'DomPDF'],
    demoUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #2d1a4a 50%, #3d2060 100%)',
    accentColor: '#d2a8ff',
    image:"Frame 72.webp",
  },
  {
    title: 'Company Profile CMS',
    description:
      'A dynamic company profile website paired with a custom CMS, enabling non-technical staff to independently manage content, update project portfolios, and publish team member information.',
    tech: ['Laravel', 'MySQL', 'Tailwind CSS', 'Alpine.js'],
    demoUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
    gradient: 'linear-gradient(135deg, #1a0505 0%, #3d1010 50%, #5c1a1a 100%)',
    accentColor: '#f78166',
    image:"Frame 71.webp",
  },
];
