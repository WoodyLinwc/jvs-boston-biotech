import { useState } from 'react';
import { FlaskConical, Filter, Droplets, Package, Menu, X, BookOpen, Globe, BookA, FileText, Layout } from 'lucide-react';
import { translations, Language, StageId, MaterialId } from './data';
import ProcessView from './components/ProcessView';
import VocabularyView from './components/VocabularyView';
import MaterialView from './components/MaterialView';
import { cn } from './lib/utils';

type Tab = StageId | 'vocabulary' | MaterialId;

const iconMap: Record<string, React.ElementType> = {
  FlaskConical,
  Filter,
  Droplets,
  Package,
  FileText,
  BookOpen,
  Layout
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<Tab>('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const data = translations[lang];
  const activeStage = data.processStages.find(s => s.id === activeTab);
  const activeMaterial = data.studyMaterials.find(m => m.id === activeTab);

  const LanguageSwitcher = () => (
    <div className="flex items-center gap-2 px-4 py-3 mt-auto border-t border-slate-100">
      <Globe className="w-5 h-5 text-slate-500" />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as Language)}
        className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer w-full"
      >
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );

  const NavLinks = () => (
    <div className="space-y-1 flex flex-col h-full">
      <div className="px-4 mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
        {data.ui.studyMaterials}
      </div>
      {data.studyMaterials.map(material => {
        const Icon = iconMap[material.icon] || FileText;
        return (
          <button
            key={material.id}
            onClick={() => { setActiveTab(material.id); setIsMobileMenuOpen(false); }}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1",
              activeTab === material.id
                ? "bg-teal-50 text-teal-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <Icon className="w-5 h-5" />
            {material.title}
          </button>
        );
      })}

      <div className="px-4 mt-8 mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
        {data.ui.processStages}
      </div>
      {data.processStages.map(stage => {
        const Icon = iconMap[stage.icon];
        return (
          <button
            key={stage.id}
            onClick={() => { setActiveTab(stage.id); setIsMobileMenuOpen(false); }}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
              activeTab === stage.id
                ? "bg-teal-50 text-teal-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <Icon className="w-5 h-5" />
            {stage.title}
          </button>
        );
      })}

      <div className="px-4 mt-10 mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
        {data.ui.selfLearning}
      </div>
      <button
        onClick={() => { setActiveTab('vocabulary'); setIsMobileMenuOpen(false); }}
        className={cn(
          "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1",
          activeTab === 'vocabulary'
            ? "bg-teal-50 text-teal-700"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )}
      >
        <BookA className="w-5 h-5" />
        {data.ui.vocabulary}
      </button>

      <div className="flex-1"></div>
      <LanguageSwitcher />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 fixed inset-y-0 z-10">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-sm">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">{data.ui.appTitle}</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 flex flex-col">
          <NavLinks />
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-bold text-base text-slate-900">{data.ui.appTitle}</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-10 p-4 overflow-y-auto flex flex-col">
          <NavLinks />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-72 pt-16 md:pt-0 min-h-screen">
        {activeMaterial && <MaterialView material={activeMaterial} ui={data.ui} />}
        {activeStage && <ProcessView stage={activeStage} ui={data.ui} />}
        {activeTab === 'vocabulary' && <VocabularyView categories={data.vocabulary} ui={data.ui} />}
      </main>
    </div>
  );
}
