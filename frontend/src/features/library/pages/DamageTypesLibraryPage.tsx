import { damageTypes } from "../../creatures/data/damageTypes";
import { LibrarySection } from "../components/LibrarySection";

export function DamageTypesLibraryPage() {
  return (
    <LibrarySection
      eyebrow="Library"
      title="Damage Types"
      description="Physical damage classifications used to describe how attacks affect creatures."
      entities={damageTypes}
      basePath="/library/damage-types"
    />
  );
}
