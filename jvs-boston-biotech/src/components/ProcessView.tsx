import { motion } from "motion/react";
import { ProcessStage, UIStrings } from "../data";
import { ChevronRight, Info } from "lucide-react";

export default function ProcessView({
  stage,
  ui,
}: {
  stage: ProcessStage;
  ui: UIStrings;
}) {
  return (
    <motion.div
      key={stage.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 md:space-y-10"
    >
      <div className="space-y-2 md:space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {stage.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          {stage.description}
        </p>
      </div>

      {/* On mobile/tablet: stack vertically. On large screens: 3-col grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-10">
        {/* Steps — takes 2 cols on large screens */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 flex items-center gap-2">
            <ChevronRight className="w-5 h-5 text-teal-600 shrink-0" />
            {ui.processSteps}
          </h2>
          <div className="space-y-3 md:space-y-4">
            {stage.steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-3 sm:gap-5 p-4 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm sm:text-base">
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-1 sm:mb-2">
                    {step.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Terms — full width on mobile/tablet, 1 col on large */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Info className="w-5 h-5 text-teal-600 shrink-0" />
            {ui.keyTerms}
          </h2>
          {/* On mobile, show terms in a 2-col grid; on lg+ stack them */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
            {stage.keyTerms.map((term, index) => (
              <div
                key={index}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <h4 className="text-sm font-semibold text-teal-800 mb-1">
                  {term.term}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {term.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
