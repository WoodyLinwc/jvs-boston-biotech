import { ProcessStage } from './types';

export const stagesEn: ProcessStage[] = [
  {
    id: 'upstream',
    title: 'Upstream Processing',
    icon: 'FlaskConical',
    description: 'The initial phase where cells are cultivated and expanded to produce the target therapeutic protein (e.g., monoclonal antibodies).',
    steps: [
      { name: 'Cell Bank Thaw', description: 'A cryopreserved vial from the Working Cell Bank (WCB) is carefully thawed and transferred into growth media.' },
      { name: 'Seed Train Expansion', description: 'Cells are grown in progressively larger vessels (e.g., shake flasks, wave bags, seed bioreactors) to achieve the necessary cell mass.' },
      { name: 'Production Bioreactor', description: 'The final cultivation stage in a large bioreactor (often 2,000L to 20,000L) where cells produce the maximum amount of the target protein over several days to weeks. Key parameters like pH, dissolved oxygen (DO), and temperature are strictly controlled.' }
    ],
    keyTerms: [
      { term: 'Bioreactor', definition: 'A closed vessel that provides a controlled environment for cellular growth and product formation.' },
      { term: 'Media', definition: 'A complex, nutrient-rich liquid solution designed to support cell growth and viability.' },
      { term: 'Titer', definition: 'The concentration of the target protein produced in the bioreactor, usually measured in grams per liter (g/L).' }
    ]
  },
  {
    id: 'harvest',
    title: 'Harvest & Recovery',
    icon: 'Filter',
    description: 'The process of separating the product-containing fluid from the cells and cellular debris.',
    steps: [
      { name: 'Centrifugation', description: 'Uses centrifugal force to separate the heavy cells and large debris from the lighter liquid containing the protein.' },
      { name: 'Depth Filtration', description: 'Passes the fluid through a thick, porous filter medium to remove smaller cellular debris and impurities not removed by centrifugation.' },
      { name: 'Sterile Filtration', description: 'A final 0.22 µm filtration step to remove any remaining bioburden (bacteria) before the fluid enters downstream processing.' }
    ],
    keyTerms: [
      { term: 'Centrifugation', definition: 'A separation technique driven by density differences under high-speed rotation.' },
      { term: 'Clarification', definition: 'The overall process of removing insoluble particles to yield a clear liquid (centrate or filtrate).' }
    ]
  },
  {
    id: 'downstream',
    title: 'Downstream Processing',
    icon: 'Droplets',
    description: 'The purification phase where the target protein is isolated from host cell proteins, DNA, viruses, and other impurities.',
    steps: [
      { name: 'Capture Chromatography', description: 'Often uses Protein A affinity chromatography to specifically bind monoclonal antibodies while impurities wash away.' },
      { name: 'Viral Inactivation', description: 'The product pool is held at a low pH for a specific time to irreversibly inactivate enveloped viruses.' },
      { name: 'Polishing Chromatography', description: 'Ion exchange (AEX/CEX) or hydrophobic interaction chromatography (HIC) steps used to remove remaining trace impurities (e.g., host cell proteins, DNA, aggregates).' },
      { name: 'Viral Filtration', description: 'A specialized nanofiltration step designed to physically remove small non-enveloped viruses.' },
      { name: 'Ultrafiltration/Diafiltration (UF/DF)', description: 'Concentrates the protein (UF) and exchanges the buffer (DF) to formulate the product into its final stable solution.' }
    ],
    keyTerms: [
      { term: 'Chromatography', definition: 'A separation technique based on the differential interaction of molecules with a stationary phase (resin) and a mobile phase (buffer).' },
      { term: 'Elution', definition: 'The process of releasing the bound target protein from the chromatography resin by changing the buffer conditions.' }
    ]
  },
  {
    id: 'fill-finish',
    title: 'Formulation & Fill/Finish',
    icon: 'Package',
    description: 'The final manufacturing steps where the purified drug substance is formulated, sterilized, and packaged into its final container.',
    steps: [
      { name: 'Final Formulation', description: 'Excipients (stabilizers, buffers, sugars) are added to ensure the protein remains stable over its shelf life.' },
      { name: 'Sterile Filtration', description: 'A final 0.22 µm filtration immediately prior to filling to ensure absolute sterility.' },
      { name: 'Aseptic Filling', description: 'The formulated drug is filled into vials, syringes, or cartridges in a highly controlled, sterile environment (Grade A/ISO 5).' },
      { name: 'Lyophilization (Optional)', description: 'A freeze-drying process used for products that are unstable in liquid form, removing water to create a stable powder.' },
      { name: 'Inspection & Packaging', description: 'Containers are visually inspected for particulates or defects, then labeled and packaged for distribution.' }
    ],
    keyTerms: [
      { term: 'Aseptic Processing', definition: 'Handling sterile materials in a controlled environment to prevent microbial contamination.' },
      { term: 'Excipient', definition: 'An inactive substance formulated alongside the active pharmaceutical ingredient to provide stability or bulk.' }
    ]
  }
];
