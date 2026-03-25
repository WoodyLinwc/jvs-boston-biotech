import { BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { StudyMaterial, UIStrings } from "../data";

interface MaterialViewProps {
  material: StudyMaterial;
  ui: UIStrings;
}

export default function MaterialView({ material, ui: _ui }: MaterialViewProps) {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8">
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 shrink-0">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {material.title}
        </h1>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 p-5 sm:p-8 md:p-10 space-y-6 md:space-y-8">
        <p className="text-base sm:text-lg text-slate-600 border-b border-slate-100 pb-4 sm:pb-6 leading-relaxed">
          {material.description}
        </p>

        <div
          className="prose prose-sm sm:prose-base prose-slate max-w-none text-slate-700 leading-relaxed
          prose-headings:font-bold prose-headings:text-slate-900
          prose-h1:text-xl sm:prose-h1:text-2xl
          prose-h2:text-lg sm:prose-h2:text-xl
          prose-h3:text-base sm:prose-h3:text-lg
          prose-p:text-sm sm:prose-p:text-base
          prose-li:text-sm sm:prose-li:text-base
          prose-code:text-xs sm:prose-code:text-sm
        "
        >
          <ReactMarkdown>{material.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
