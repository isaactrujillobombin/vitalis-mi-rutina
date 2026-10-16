import { sitToStand } from '../content/exercises';

/** S-4: siempre antes de las instrucciones, también en móvil (RF-04). */
export function PreparationChecklist() {
  return (
    <section className="card" aria-labelledby="preparacion">
      <h2 id="preparacion" className="card__title">
        {sitToStand.preparation.title}
      </h2>
      <ul className="checklist">
        {sitToStand.preparation.items.map((item) => (
          <li key={item}>
            <span className="checklist__mark" aria-hidden="true">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
