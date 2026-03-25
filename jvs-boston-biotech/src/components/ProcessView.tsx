import { motion } from 'motion/react';
import { ProcessStage, UIStrings } from '../data';
import { ChevronRight, Info } from 'lucide-react';

export default function ProcessView({ stage, ui }: { stage: ProcessStage; ui: UIStrings }) {
  return (
    <motion.div
      key={stage.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto p-6 md:p-10 space-y-10"
    >
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{stage.title}</h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">{stage.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <ChevronRight className="w-6 h-6 text-teal-600" />
            {ui.processSteps}
          </h2>
          <div className="space-y-4">
            {stage.steps.map((step, index) => (
              <div key={index} className="flex gap-5 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-base">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-800 mb-2">{step.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Info className="w-6 h-6 text-teal-600" />
            {ui.keyTerms}
          </h2>
          <div className="space-y-4">
            {stage.keyTerms.map((term, index) => (
              <div key={index} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="text-sm font-semibold text-teal-800 mb-1">{term.term}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{term.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
