// Everything Sarah-specific lives here. Edit this file to update the site's text.
// TODO(content): replace placeholders with Sarah's real details.

export const profile = {
  name: 'Sarah',
  title: 'Law · Justice · Human Rights',
  tagline: 'Fiat justitia ruat caelum',
  bio: [
    'Placeholder bio. A few sentences about Sarah, her studies, and the causes she works for.',
  ],
  photo: '/images/sarah.jpg',
};

export const skills: { group: string; items: string[] }[] = [
  { group: 'Legal', items: ['Legal research', 'Brief writing', 'Case analysis'] },
  { group: 'Advocacy', items: ['Public speaking', 'Policy analysis'] },
];

export const projects: { title: string; description: string; links?: { label: string; href: string }[] }[] = [
  { title: 'Project One', description: 'One or two lines about the project.' },
  { title: 'Project Two', description: 'One or two lines about the project.' },
];

export const sections = [
  { id: 'about', label: 'About', numeral: 'I' },
  { id: 'skills', label: 'Skills', numeral: 'II' },
  { id: 'projects', label: 'Projects', numeral: 'III' },
  { id: 'contact', label: 'Contact', numeral: 'IV' },
] as const;
