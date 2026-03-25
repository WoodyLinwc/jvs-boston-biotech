import { Language, AppData } from './types';
import { uiTranslations } from './ui';
import { stagesEn } from './stages.en';
import { quizQuestions } from './quiz';
import { vocabularyEn } from './vocabulary';
import { materialsEn } from './materials';

export const translations: Record<Language, AppData> = {
  en: {
    ui: uiTranslations.en,
    processStages: stagesEn,
    vocabulary: vocabularyEn,
    studyMaterials: materialsEn,
  },
  zh: {
    ui: uiTranslations.en,
    processStages: stagesEn,
    vocabulary: vocabularyEn,
    studyMaterials: materialsEn,
  }
};

export { quizQuestions };
export * from './types';
