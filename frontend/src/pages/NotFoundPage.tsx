import { EmptyState } from '../components/common/EmptyState';

export function NotFoundPage() {
  return (
    <EmptyState
      title="Specimen Not Found"
      description="The requested entry could not be found in the Creature Codex."
      actionLabel="Return Home"
      actionTo="/"
    />
  );
}