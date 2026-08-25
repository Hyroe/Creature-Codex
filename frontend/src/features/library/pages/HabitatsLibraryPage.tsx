import { habitats } from "../../creatures/data/habitats";
import { LibrarySection } from "../components/LibrarySection";

export function HabitatsLibraryPage() {
  return (
    <LibrarySection
      eyebrow="Library"
      title="Habitats"
      description="Known environments and ecosystems inhabited by documented creatures."
      entities={habitats}
      basePath="/library/habitats"
    />
  );
}
