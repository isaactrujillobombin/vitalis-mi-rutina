import { useState } from 'react';
import { ui } from '../content/exercises';
import { list } from '../data/sessionRepository';
import { weekSummary } from '../features/session/weekSummary';
import { Card } from './Card';
import { Icon } from './Icon';

/**
 * RF-20: los 7 días de la semana con un círculo por día.
 * S-2: un día sin sesión es un círculo vacío, nunca una cruz ni un color de alarma.
 */
export function WeekSummaryCard() {
  // Se lee al montar Inicio: al volver de registrar una sesión, Inicio se monta de nuevo.
  const [{ days, daysDone }] = useState(() => weekSummary(list()));
  const t = ui.home.week;

  return (
    <Card aria-labelledby="semana" className="week">
      <div className="week__head">
        <h2 id="semana" className="card__title">
          {t.title}
        </h2>
        {daysDone > 0 && <p className="week__count">{t.daysDone(daysDone)}</p>}
      </div>

      <ol className="week__days" aria-label={t.listLabel}>
        {days.map((day) => {
          const state = day.done ? t.dayDone : day.isFuture ? t.dayFuture : t.dayNotDone;
          const classes = ['week__day'];
          if (day.done) classes.push('week__day--done');
          if (day.isToday) classes.push('week__day--today');
          return (
            <li key={day.long} className={classes.join(' ')}>
              <span className="week__dot" aria-hidden="true">
                {day.done && <Icon name="check" size={18} />}
              </span>
              <span className="week__label" aria-hidden="true">
                {day.short}
              </span>
              <span className="sr-only">
                {day.long}
                {day.isToday ? `, ${t.today}` : ''}: {state}
              </span>
            </li>
          );
        })}
      </ol>

      {daysDone === 0 && <p className="muted">{t.empty}</p>}
    </Card>
  );
}
