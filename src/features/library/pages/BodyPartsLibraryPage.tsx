import { bodyParts } from "../../creatures/data/bodyParts";
import { LibrarySection } from "../components/LibrarySection";

export function BodyPartsLibraryPage() {
  return (
    <LibrarySection
      eyebrow="Library"
      title="Body Parts"
      description="Anatomical targets documented for creature identification and combat analysis."
      entities={bodyParts}
      basePath="/library/body-parts"
    />
  );
}
