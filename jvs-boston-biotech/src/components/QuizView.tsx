import { ClipboardList } from "lucide-react";
import { UIStrings } from "../data";

interface QuizViewProps {
  ui: UIStrings;
}

export default function QuizView({ ui: _ui }: QuizViewProps) {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 shrink-0">
          <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Quiz
        </h1>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-5 min-h-64">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
          <ClipboardList className="w-8 h-8 text-slate-400" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-700">
            Coming Soon
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Quiz questions will appear here. Check back once content has been
            added.
          </p>
        </div>
        <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-100">
          Not yet implemented
        </span>
      </div>
    </div>
  );
}
