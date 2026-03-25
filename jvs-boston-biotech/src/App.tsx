import { useState } from "react";
import {
  FlaskConical,
  Filter,
  Droplets,
  Package,
  Menu,
  X,
  BookOpen,
  Globe,
  BookA,
  FileText,
  Layout,
  ClipboardList,
  BookMarked,
} from "lucide-react";
import { translations, Language, StageId, MaterialId } from "./data";
import ProcessView from "./components/ProcessView";
import VocabularyView from "./components/VocabularyView";
import MaterialView from "./components/MaterialView";
import QuizView from "./components/QuizView";
import PdfMaterialsView from "./components/PdfMaterialsView";
import { cn } from "./lib/utils";

type Tab = StageId | MaterialId | "vocabulary" | "quiz" | "pdf-materials";

const iconMap: Record<string, React.ElementType> = {
  FlaskConical,
  Filter,
  Droplets,
  Package,
  FileText,
  BookOpen,
  Layout,
  ClipboardList,
  BookMarked,
};

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [activeTab, setActiveTab] = useState<Tab>("intro");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const data = translations[lang];
  const activeStage = data.processStages.find((s) => s.id === activeTab);
  const activeMaterial = data.studyMaterials.find((m) => m.id === activeTab);

  const LanguageSwitcher = () => (
    <div className="flex items-center gap-2 px-4 py-3 mt-auto border-t border-slate-100">
      <Globe className="w-5 h-5 text-slate-500 shrink-0" />
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

  const NavButton = ({
    tab,
    icon: Icon,
    label,
  }: {
    tab: Tab;
    icon: React.ElementType;
    label: string;
  }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false);
      }}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
        activeTab === tab
          ? "bg-teal-50 text-teal-700"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  );

  const NavLinks = () => (
    <div className="space-y-1 flex flex-col h-full">
      {/* Study Materials */}
      <div className="px-4 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
        {data.ui.studyMaterials}
      </div>
      {data.studyMaterials.map((material) => {
        const Icon = iconMap[material.icon] || FileText;
        return (
          <NavButton
            key={material.id}
            tab={material.id}
            icon={Icon}
            label={material.title}
          />
        );
      })}

      {/* Process Stages */}
      <div className="px-4 mt-6 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
        {data.ui.processStages}
      </div>
      {data.processStages.map((stage) => {
        const Icon = iconMap[stage.icon];
        return (
          <NavButton
            key={stage.id}
            tab={stage.id}
            icon={Icon}
            label={stage.title}
          />
        );
      })}

      {/* Self Learning */}
      <div className="px-4 mt-6 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
        {data.ui.selfLearning}
      </div>
      <NavButton tab="vocabulary" icon={BookA} label={data.ui.vocabulary} />
      <NavButton tab="quiz" icon={ClipboardList} label={data.ui.quiz} />
      <NavButton
        tab="pdf-materials"
        icon={BookMarked}
        label={data.ui.pdfMaterials}
      />

      <div className="flex-1" />
      <LanguageSwitcher />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans overflow-x-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-slate-200 fixed inset-y-0 z-10">
        <div className="p-5 flex items-center gap-3 border-b border-slate-100 shrink-0">
          <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-bold text-base text-slate-900 tracking-tight truncate">
            {data.ui.appTitle}
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 flex flex-col">
          <NavLinks />
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-slate-900 truncate">
            {data.ui.appTitle}
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 shrink-0"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-white z-10 p-4 overflow-y-auto flex flex-col">
          <NavLinks />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 lg:ml-72 pt-14 md:pt-0 min-h-screen w-full overflow-x-hidden">
        {activeMaterial && (
          <MaterialView material={activeMaterial} ui={data.ui} />
        )}
        {activeStage && <ProcessView stage={activeStage} ui={data.ui} />}
        {activeTab === "vocabulary" && (
          <VocabularyView categories={data.vocabulary} ui={data.ui} />
        )}
        {activeTab === "quiz" && <QuizView ui={data.ui} />}
        {activeTab === "pdf-materials" && <PdfMaterialsView ui={data.ui} />}
      </main>
    </div>
  );
}
