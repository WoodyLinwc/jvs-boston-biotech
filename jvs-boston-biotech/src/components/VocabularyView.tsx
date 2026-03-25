import { useState } from 'react';
import { Search, BookA } from 'lucide-react';
import { VocabularyCategory, UIStrings } from '../data';
import { cn } from '../lib/utils';

interface VocabularyViewProps {
  categories: VocabularyCategory[];
  ui: UIStrings;
}

export default function VocabularyView({ categories, ui }: VocabularyViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Flatten terms with their category title for easier filtering/rendering
  const allTerms = categories.flatMap(cat => 
    cat.terms.map(term => ({ ...term, categoryTitle: cat.title }))
  );

  const allCategories = categories.map(cat => cat.title);

  const filteredTerms = allTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || term.categoryTitle === activeCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const indexA = allCategories.indexOf(a.categoryTitle);
    const indexB = allCategories.indexOf(b.categoryTitle);
    if (indexA !== indexB) return indexA - indexB;
    return a.term.localeCompare(b.term);
  });

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600">
            <BookA className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{ui.vocabulary}</h1>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition-colors"
            placeholder={ui.searchTerms}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('All')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeCategory === 'All'
              ? "bg-teal-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          )}
        >
          All
        </button>
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeCategory === cat
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredTerms.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <p className="text-slate-500 text-lg">{ui.noResults}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredTerms.map((term, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-teal-800">{term.term}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                  {term.categoryTitle}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm flex-1">{term.definition}</p>
              
              {term.imageUrl && (
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-100">
                  <img 
                    src={term.imageUrl} 
                    alt={term.term} 
                    className="w-full h-48 object-cover"
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
