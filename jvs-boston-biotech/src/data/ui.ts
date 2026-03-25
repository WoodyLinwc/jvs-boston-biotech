import { Language, UIStrings } from "./types";

const en: UIStrings = {
  processStages: "Process Stages",
  selfLearning: "Self Learning",
  knowledgeCheck: "Knowledge Check",
  quizComplete: "Quiz Complete!",
  youScored: (score, total) => `You scored ${score} out of ${total}`,
  retakeQuiz: "Retake Quiz",
  questionXofY: (current, total) => `Question ${current} of ${total}`,
  explanation: "Explanation:",
  nextQuestion: "Next Question",
  finishQuiz: "Finish Quiz",
  processSteps: "Process Steps",
  keyTerms: "Key Terms",
  appTitle: "BioTech Learn",
  vocabulary: "Vocabulary",
  searchTerms: "Search terms...",
  noResults: "No terms found.",
  studyMaterials: "Study Materials",
  materialPlaceholder:
    "Content coming soon. You can add your PDFs, videos, or notes here.",
  quiz: "Quiz",
  pdfMaterials: "Class Materials",
};

export const uiTranslations: Record<Language, UIStrings> = {
  en,
  zh: en,
};
