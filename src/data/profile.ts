import type { Profile } from '@/types';

/**
 * Profile data — single source of truth for personal information.
 *
 * TRUTHFUL CONTENT RULES:
 *   - Only verified facts. Do NOT add titles, employers, dates, awards,
 *     or links you have not personally verified.
 *   - Mark unknowns with // TODO(Khaled): ...
 *   - No lorem ipsum or invented copy.
 */
export const profile: Profile = {
  name: 'Khaled Mahmoud Helaly',
  headline: 'Software Engineering · MERN Stack',
  photo: '/images/profile/khaled.webp',
  photoAlt: 'Portrait of Khaled Mahmoud Helaly',
  resumeUrl: '/cv/khaled-helaly-cv.pdf',

  aboutParagraphs: [
    "I'm Khaled Mahmoud Helaly, a Senior Computer Science student at Suez University and a MERN Stack developer.",
    "I'm especially interested in frontend development and UI/UX.",
    "I'm looking for internships, training programs and frontend opportunities, and I'm open to freelance work.",
  ],
};