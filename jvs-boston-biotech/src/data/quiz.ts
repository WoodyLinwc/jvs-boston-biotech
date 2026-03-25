import { QuizQuestion } from './types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which chromatography technique is most commonly used as the capture step for monoclonal antibodies?',
    options: ['Ion Exchange (IEX)', 'Size Exclusion (SEC)', 'Protein A Affinity', 'Hydrophobic Interaction (HIC)'],
    correctAnswer: 2,
    explanation: 'Protein A affinity chromatography is the industry standard for capturing monoclonal antibodies because Protein A binds specifically to the Fc region of antibodies, providing very high purity in a single step.'
  },
  {
    id: 'q2',
    question: 'What is the primary purpose of the Viral Inactivation step (often low pH hold)?',
    options: ['To remove host cell DNA', 'To irreversibly inactivate enveloped viruses', 'To concentrate the protein', 'To filter out bacteria'],
    correctAnswer: 1,
    explanation: 'Low pH hold is a highly effective method for inactivating enveloped viruses by disrupting their lipid envelope, rendering them non-infectious.'
  },
  {
    id: 'q3',
    question: 'During which stage are cells grown from a single vial to a large production volume?',
    options: ['Seed Train Expansion', 'Diafiltration', 'Clarification', 'Aseptic Filling'],
    correctAnswer: 0,
    explanation: 'Seed train expansion involves moving the cells through progressively larger vessels to build up the cell mass required to inoculate the production bioreactor.'
  },
  {
    id: 'q4',
    question: 'What does UF/DF (Ultrafiltration/Diafiltration) accomplish?',
    options: ['Removes viruses', 'Concentrates the protein and exchanges the buffer', 'Separates cells from liquid', 'Sterilizes the product'],
    correctAnswer: 1,
    explanation: 'Ultrafiltration (UF) concentrates the protein by removing water, while Diafiltration (DF) washes out the old buffer salts and replaces them with the final formulation buffer.'
  }
];
