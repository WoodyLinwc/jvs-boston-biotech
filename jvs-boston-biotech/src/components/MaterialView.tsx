import { BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { StudyMaterial, UIStrings } from '../data';

interface MaterialViewProps {
  material: StudyMaterial;
  ui: UIStrings;
}

export default function MaterialView({ material, ui }: MaterialViewProps) {
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{material.title}</h1>
      </div>
      
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10 space-y-8">
        <p className="text-lg text-slate-600 border-b border-slate-100 pb-6">{material.description}</p>
        
        <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed">
          <ReactMarkdown>{material.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
