import { useParams } from 'react-router-dom';

export function CreatureDetailsPage() {
  const { id } = useParams();

  return (
    <section>
      <h2>Creature Details</h2>
      <p>Creature ID: {id}</p>
    </section>
  );
}