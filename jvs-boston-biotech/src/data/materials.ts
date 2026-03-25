import { StudyMaterial } from "./types";
import introContent from "./materials/intro.md?raw";
import gmpContent from "./materials/gmp.md?raw";
import facilityContent from "./materials/facility.md?raw";

export const materialsEn: StudyMaterial[] = [
  {
    id: "intro",
    title: "Intro to Biomanufacturing",
    icon: "FileText",
    description:
      "Overview of biomanufacturing — what it is, how it differs from traditional pharma, and the four main phases of a typical production campaign.",
    content: introContent,
  },
  {
    id: "gmp",
    title: "GMP Guidelines",
    icon: "BookOpen",
    description:
      "Good Manufacturing Practice fundamentals — the regulatory framework, core principles, and how GMP shapes daily operations in a biomanufacturing facility.",
    content: gmpContent,
  },
  {
    id: "facility",
    title: "Facility Design",
    icon: "Layout",
    description:
      "Cleanroom classifications, HVAC systems, personnel and material flow, critical utilities, and the design principles that underpin compliant biotech manufacturing facilities.",
    content: facilityContent,
  },
];
