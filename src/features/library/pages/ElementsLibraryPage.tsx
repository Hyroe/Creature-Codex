import { LibrarySection } from '../components/LibrarySection';

import { elements } from '../../creatures/data/elements';

export function ElementsLibraryPage() {
  return (
    <LibrarySection
      eyebrow="Library"
      title="Elements"
      description="Elemental affinities documented throughout the Creature Codex."
      entities={elements}
      basePath="/library/elements"
    />
  );
}