export type Language = 'en' | 'zh';
export type StageId = 'upstream' | 'harvest' | 'downstream' | 'fill-finish';
export type MaterialId = 'intro' | 'gmp' | 'facility';

export interface ProcessStep {
  name: string;
  description: string;
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface VocabularyTerm {
  term: string;
  definition: string;
  imageUrl?: string;
}

export interface VocabularyCategory {
  id: string;
  title: string;
  terms: VocabularyTerm[];
}

export interface StudyMaterial {
  id: MaterialId;
  title: string;
  icon: string;
  description: string;
  content: string;
}

export interface ProcessStage {
  id: StageId;
  title: string;
  icon: string;
  description: string;
  steps: ProcessStep[];
  keyTerms: KeyTerm[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UIStrings {
  processStages: string;
  selfLearning: string;
  knowledgeCheck: string;
  quizComplete: string;
  youScored: (score: number, total: number) => string;
  retakeQuiz: string;
  questionXofY: (current: number, total: number) => string;
  explanation: string;
  nextQuestion: string;
  finishQuiz: string;
  processSteps: string;
  keyTerms: string;
  appTitle: string;
  vocabulary: string;
  searchTerms: string;
  noResults: string;
  studyMaterials: string;
  materialPlaceholder: string;
}

export interface AppData {
  ui: UIStrings;
  processStages: ProcessStage[];
  vocabulary: VocabularyCategory[];
  studyMaterials: StudyMaterial[];
}
