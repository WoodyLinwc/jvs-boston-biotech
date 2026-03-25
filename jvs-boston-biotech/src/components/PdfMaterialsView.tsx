import { FileUp, FileText, BookMarked } from "lucide-react";
import { UIStrings } from "../data";

interface PdfMaterialsViewProps {
  ui: UIStrings;
}

// Placeholder entries to show what the section will look like when populated
const placeholderFiles = [
  {
    name: "Lecture 1 – Intro to Biopharma.pdf",
    size: "2.4 MB",
    date: "Add your file",
  },
  {
    name: "Lecture 2 – GMP Overview.pdf",
    size: "1.8 MB",
    date: "Add your file",
  },
  {
    name: "Lecture 3 – Facility Design.pdf",
    size: "3.1 MB",
    date: "Add your file",
  },
];

export default function PdfMaterialsView({ ui: _ui }: PdfMaterialsViewProps) {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 shrink-0">
          <BookMarked className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Class Materials
        </h1>
      </div>

      <div className="space-y-5">
        {/* Upload drop zone — shell only, not yet wired up */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-dashed border-slate-300 p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-4 hover:border-teal-400 hover:bg-teal-50/30 transition-colors cursor-not-allowed">
          <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center">
            <FileUp className="w-7 h-7 text-slate-400" />
          </div>
          <div className="space-y-1 max-w-sm">
            <p className="text-sm sm:text-base font-semibold text-slate-700">
              Attach PDF class materials
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              PDF upload functionality will be wired up here. Drag and drop or
              click to select files.
            </p>
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold border border-teal-100">
            Not yet implemented
          </span>
        </div>

        {/* Placeholder file list — shows intended layout */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">
              Uploaded Files
            </h2>
            <span className="text-xs text-slate-400 italic">
              Example layout — not real files
            </span>
          </div>
          <ul className="divide-y divide-slate-100">
            {placeholderFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-4 opacity-40"
              >
                <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {file.size} · {file.date}
                  </p>
                </div>
                <span className="text-xs text-slate-300 shrink-0">—</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
