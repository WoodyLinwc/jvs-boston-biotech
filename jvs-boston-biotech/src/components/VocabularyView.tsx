import { useState } from "react";
import { Search, BookA } from "lucide-react";
import { VocabularyCategory, UIStrings } from "../data";
import { cn } from "../lib/utils";

interface VocabularyViewProps {
  categories: VocabularyCategory[];
  ui: UIStrings;
}

export default function VocabularyView({
  categories,
  ui,
}: VocabularyViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const allTerms = categories.flatMap((cat) =>
    cat.terms.map((term) => ({ ...term, categoryTitle: cat.title })),
  );

  const allCategories = categories.map((cat) => cat.title);

  const filteredTerms = allTerms
    .filter((term) => {
      const matchesSearch =
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || term.categoryTitle === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const indexA = allCategories.indexOf(a.categoryTitle);
      const indexB = allCategories.indexOf(b.categoryTitle);
      if (indexA !== indexB) return indexA - indexB;
      return a.term.localeCompare(b.term);
    });

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 space-y-5 md:space-y-8">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 shrink-0">
            <BookA className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {ui.vocabulary}
          </h1>
        </div>

        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm transition-colors"
            placeholder={ui.searchTerms}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category filter chips — scroll horizontally on very small screens */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={cn(
            "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap",
            activeCategory === "All"
              ? "bg-teal-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50",
          )}
        >
          All
        </button>
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap",
              activeCategory === cat
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredTerms.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-slate-200">
          <p className="text-slate-500 text-base sm:text-lg">{ui.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {filteredTerms.map((term, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex justify-between items-start gap-2 mb-2 sm:mb-3">
                <h3 className="text-base sm:text-lg font-bold text-teal-800 leading-tight">
                  {term.term}
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 whitespace-nowrap shrink-0">
                  {term.categoryTitle}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm flex-1">
                {term.definition}
              </p>

              {term.imageUrl && (
                <div className="mt-3 sm:mt-4 rounded-xl overflow-hidden border border-slate-100">
                  <img
                    src={term.imageUrl}
                    alt={term.term}
                    className="w-full h-36 sm:h-48 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
