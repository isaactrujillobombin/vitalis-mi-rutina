import { Icon } from './Icon';
import { Card } from './Card';
import { sitToStand } from '../content/exercises';

/** S-4: siempre antes de las instrucciones, también en móvil (RF-04). */
export function PreparationChecklist() {
  return (
    <Card aria-labelledby="preparacion">
      <h2 id="preparacion" className="card__title">
        {sitToStand.preparation.title}
      </h2>
      <ul className="checklist">
        {sitToStand.preparation.items.map((item) => (
          <li key={item}>
            <span className="checklist__mark">
              <Icon name="check" size={18} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
