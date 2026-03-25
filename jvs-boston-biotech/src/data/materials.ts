import { StudyMaterial } from './types';
import introContent from './materials/intro.md?raw';
import gmpContent from './materials/gmp.md?raw';
import facilityContent from './materials/facility.md?raw';

export const materialsEn: StudyMaterial[] = [
  { 
    id: 'intro', 
    title: 'Intro to Biopharma', 
    icon: 'FileText', 
    description: 'Overview of the biopharmaceutical industry and drug development lifecycle.',
    content: introContent
  },
  { 
    id: 'gmp', 
    title: 'GMP Guidelines', 
    icon: 'BookOpen', 
    description: 'Good Manufacturing Practice basics and regulatory compliance.',
    content: gmpContent
  },
  { 
    id: 'facility', 
    title: 'Facility Design', 
    icon: 'Layout', 
    description: 'Cleanroom classifications, HVAC, and facility design principles.',
    content: facilityContent
  },
];
