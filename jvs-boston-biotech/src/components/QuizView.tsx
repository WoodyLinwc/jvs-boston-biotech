import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QuizQuestion, UIStrings } from "../data";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "../lib/utils";

export default function QuizView({
  questions,
  ui,
}: {
  questions: QuizQuestion[];
  ui: UIStrings;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = questions[currentQuestion];

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-4 sm:p-6 text-center space-y-6 sm:space-y-8 mt-12 sm:mt-20"
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {ui.quizComplete}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600">
            {ui.youScored(score, questions.length)}
          </p>
        </div>
        <button
          onClick={resetQuiz}
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors text-sm sm:text-base"
        >
          <RotateCcw className="w-5 h-5" />
          {ui.retakeQuiz}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-4 sm:p-6 md:p-10 mt-2 sm:mt-4 md:mt-8"
    >
      <div className="mb-5 sm:mb-8 flex justify-between items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          {ui.knowledgeCheck}
        </h2>
        <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 whitespace-nowrap shrink-0">
          {ui.questionXofY(currentQuestion + 1, questions.length)}
        </span>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
        <h3 className="text-base sm:text-xl font-medium text-slate-800 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showResult}
                className={cn(
                  "w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex justify-between items-center text-sm sm:text-base",
                  !showResult &&
                    "border-slate-200 hover:border-teal-500 hover:bg-teal-50 text-slate-700",
                  showCorrect && "border-green-500 bg-green-50 text-green-800",
                  showIncorrect && "border-red-500 bg-red-50 text-red-800",
                  showResult &&
                    !showCorrect &&
                    !showIncorrect &&
                    "border-slate-200 bg-slate-50 text-slate-400 opacity-50",
                )}
              >
                <span className="font-medium">{option}</span>
                {showCorrect && (
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 shrink-0 ml-3" />
                )}
                {showIncorrect && (
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 shrink-0 ml-3" />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 sm:pt-6">
                <div className="p-4 sm:p-6 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900 space-y-1 sm:space-y-2">
                  <p className="font-bold text-sm sm:text-base">
                    {ui.explanation}
                  </p>
                  <p className="text-blue-800/90 leading-relaxed text-sm sm:text-base">
                    {question.explanation}
                  </p>
                </div>
                <div className="mt-5 sm:mt-8 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors text-sm sm:text-base"
                  >
                    {currentQuestion < questions.length - 1
                      ? ui.nextQuestion
                      : ui.finishQuiz}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
