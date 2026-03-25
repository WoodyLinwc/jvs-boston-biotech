import { VocabularyCategory } from "./types";
import { generalEn } from "./vocabulary/general";
import { upstreamEn } from "./vocabulary/upstream";
import { harvestEn } from "./vocabulary/harvest";
import { downstreamEn } from "./vocabulary/downstream";
import { fillFinishEn } from "./vocabulary/fill-finish";
import { labSuppliesEn } from "./vocabulary/lab-supplies";

export const vocabularyEn: VocabularyCategory[] = [
  { id: "general", title: "General", terms: generalEn },
  { id: "lab-supplies", title: "Lab Supplies", terms: labSuppliesEn },
  { id: "upstream", title: "Upstream", terms: upstreamEn },
  { id: "harvest", title: "Harvest", terms: harvestEn },
  { id: "downstream", title: "Downstream", terms: downstreamEn },
  { id: "fill-finish", title: "Fill/Finish", terms: fillFinishEn },
];
