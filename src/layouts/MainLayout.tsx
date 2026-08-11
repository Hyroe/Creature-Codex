import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div>
      <header>
        <nav>
          <h1>Creature Codex</h1>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}