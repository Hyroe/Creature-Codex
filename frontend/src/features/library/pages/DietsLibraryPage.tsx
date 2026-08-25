import { diets } from "../../creatures/data/diets";
import { LibrarySection } from "../components/LibrarySection";

export function DietsLibraryPage() {
  return (
    <LibrarySection
      eyebrow="Library"
      title="Diets"
      description="Dietary classifications used to describe the feeding behavior of creatures."
      entities={diets}
      basePath="/library/diets"
    />
  );
}
