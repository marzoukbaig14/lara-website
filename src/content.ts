// Everything Sarah-specific lives here. Edit this file to update the site's text.
// TODO(content): replace placeholders with Sarah's real details.

export const profile = {
  name: 'Sarah',
  eyebrow: 'Portfolio',
  title: 'Law · Justice · Human Rights',
  bio: [
    'Placeholder bio. A few sentences introducing Sarah: what she studies, where, and the questions of law and justice that drive her work.',
    'A second paragraph on the causes she cares about, the experience she has gathered, and what she is looking for next.',
  ],
  facts: [
    { label: 'Studying', value: 'Placeholder — degree, school' },
    { label: 'Focus', value: 'Human rights, international law' },
    { label: 'Based in', value: 'Placeholder — city' },
  ],
  // Put the photo in public/images/ and set the path, e.g. '/images/sarah.jpg'.
  // Leave empty to show a monogram placeholder.
  photo: '',
  photoCaption: 'Sarah',
  // Optional links shown in the footer.
  links: [] as { label: string; href: string }[],
};

export const skills: { group: string; items: string[] }[] = [
  { group: 'Legal Practice', items: ['Legal research', 'Brief & memo writing', 'Case analysis', 'Moot court'] },
  { group: 'Advocacy', items: ['Public speaking', 'Policy analysis', 'Community outreach'] },
  { group: 'Languages & Tools', items: ['English', 'Westlaw / LexisNexis', 'Microsoft Office'] },
];

export const projects: {
  title: string;
  description: string;
  year?: string;
  tags?: string[];
  links?: { label: string; href: string }[];
}[] = [
  {
    title: 'Project One',
    description: 'One or two lines on the project: the question, Sarah’s role, and the outcome.',
    year: '2026',
    tags: ['Research'],
    links: [{ label: 'Read', href: '#' }],
  },
  {
    title: 'Project Two',
    description: 'One or two lines on the project: the question, Sarah’s role, and the outcome.',
    year: '2025',
    tags: ['Advocacy'],
  },
  {
    title: 'Project Three',
    description: 'One or two lines on the project: the question, Sarah’s role, and the outcome.',
    year: '2025',
    tags: ['Writing'],
  },
];

export const sections = [
  {
    id: 'about',
    label: 'About',
    numeral: 'I',
    maxim: 'Nosce te ipsum',
    translation: 'Know thyself',
  },
  {
    id: 'skills',
    label: 'Skills',
    numeral: 'II',
    maxim: 'Lex est ratio summa',
    translation: 'Law is the highest reason — Cicero',
  },
  {
    id: 'projects',
    label: 'Projects',
    numeral: 'III',
    maxim: 'Fiat justitia ruat caelum',
    translation: 'Let justice be done, though the heavens fall',
  },
  {
    id: 'contact',
    label: 'Contact',
    numeral: 'IV',
    maxim: 'Audi alteram partem',
    translation: 'Hear the other side',
  },
] as const;

export type SectionId = (typeof sections)[number]['id'];
