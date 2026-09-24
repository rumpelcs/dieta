import { useMemo, useState } from 'react'
import { MEAL_SLOTS, MEAL_OPTIONS, getOption } from './data/mealPlan.js'
import { useHistory, todayKey } from './hooks/useHistory.js'

const WEEKDAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

function formatDateLabel(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const weekday = WEEKDAYS[date.getDay()]
  return `${weekday}, ${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}`
}

function shiftDateKey(dateKey, deltaDays) {
  const [y, m, d] = dateKey.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + deltaDays)
  return todayKey(date)
}

function sumDay(dayChoices) {
  const totals = { p: 0, c: 0, g: 0, kcal: 0, count: 0 }
  if (!dayChoices) return totals
  for (const slot of MEAL_SLOTS) {
    const optionId = dayChoices[slot.key]
    if (!optionId) continue
    const option = getOption(slot.optionsKey, optionId)
    if (!option) continue
    totals.p += option.p
    totals.c += option.c
    totals.g += option.g
    totals.kcal += option.kcal
    totals.count += 1
  }
  return totals
}

function MealOptionCard({ option, selected, onSelect }) {
  return (
    <button
      className={`option-card${selected ? ' option-card--selected' : ''}`}
      onClick={onSelect}
      type="button"
    >
      <div className="option-card__head">
        <span className="option-card__name">{option.nome}</span>
        {selected && <span className="option-card__check">✓ comido</span>}
      </div>
      <p className="option-card__desc">{option.descricao}</p>
      {option.obs && <p className="option-card__obs">{option.obs}</p>}
      <div className="option-card__macros">
        <span>P {option.p}g</span>
        <span>C {option.c}g</span>
        <span>G {option.g}g</span>
        <span className="option-card__kcal">{option.kcal} kcal</span>
      </div>
    </button>
  )
}

function MealSlotSection({ slot, selectedOptionId, onSelect }) {
  const options = MEAL_OPTIONS[slot.optionsKey]
  return (
    <section className="meal-slot">
      <h2 className="meal-slot__title">
        <span>{slot.emoji}</span> {slot.label}
      </h2>
      <div className="option-grid">
        {options.map((option) => (
          <MealOptionCard
            key={option.id}
            option={option}
            selected={selectedOptionId === option.id}
            onSelect={() => onSelect(slot.key, option.id)}
          />
        ))}
      </div>
    </section>
  )
}

function DaySummary({ totals }) {
  return (
    <div className="summary-card">
      <div className="summary-card__item">
        <span className="summary-card__value">{totals.count}/4</span>
        <span className="summary-card__label">refeições</span>
      </div>
      <div className="summary-card__item">
        <span className="summary-card__value">{totals.p}g</span>
        <span className="summary-card__label">proteínas</span>
      </div>
      <div className="summary-card__item">
        <span className="summary-card__value">{totals.c}g</span>
        <span className="summary-card__label">carboidratos</span>
      </div>
      <div className="summary-card__item">
        <span className="summary-card__value">{totals.g}g</span>
        <span className="summary-card__label">gorduras</span>
      </div>
      <div className="summary-card__item summary-card__item--kcal">
        <span className="summary-card__value">{totals.kcal}</span>
        <span className="summary-card__label">kcal</span>
      </div>
    </div>
  )
}

function HistoryPanel({ history, selectedDateKey, onSelectDate }) {
  const days = useMemo(() => {
    const keys = Object.keys(history).sort((a, b) => (a < b ? 1 : -1))
    return keys.slice(0, 10)
  }, [history])

  if (days.length === 0) {
    return (
      <section className="history">
        <h2>📅 Histórico</h2>
        <p className="history__empty">Nenhuma refeição registrada ainda. Marque o que você comeu acima!</p>
      </section>
    )
  }

  return (
    <section className="history">
      <h2>📅 Histórico</h2>
      <ul className="history__list">
        {days.map((dateKey) => {
          const totals = sumDay(history[dateKey])
          return (
            <li key={dateKey}>
              <button
                className={`history__row${dateKey === selectedDateKey ? ' history__row--active' : ''}`}
                onClick={() => onSelectDate(dateKey)}
                type="button"
              >
                <span className="history__date">{formatDateLabel(dateKey)}</span>
                <span className="history__stats">
                  {totals.count}/4 refeições · {totals.kcal} kcal · P{totals.p} C{totals.c} G{totals.g}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default function App() {
  const { history, setMealChoice } = useHistory()
  const [selectedDateKey, setSelectedDateKey] = useState(() => todayKey())

  const isToday = selectedDateKey === todayKey()
  const dayChoices = history[selectedDateKey]
  const totals = useMemo(() => sumDay(dayChoices), [dayChoices])

  return (
    <div className="app">
      <header className="app-header">
        <h1>🥗 Dieta do Gabriel</h1>
        <p className="app-header__subtitle">
          Escolha o que você comeu em cada refeição. Tudo fica salvo automaticamente no seu navegador.
        </p>
      </header>

      <div className="date-nav">
        <button type="button" onClick={() => setSelectedDateKey((d) => shiftDateKey(d, -1))}>
          ← anterior
        </button>
        <div className="date-nav__current">
          <strong>{formatDateLabel(selectedDateKey)}</strong>
          {isToday && <span className="date-nav__badge">hoje</span>}
        </div>
        <button
          type="button"
          onClick={() => setSelectedDateKey((d) => shiftDateKey(d, 1))}
          disabled={isToday}
        >
          próximo →
        </button>
      </div>

      <DaySummary totals={totals} />

      <main>
        {MEAL_SLOTS.map((slot) => (
          <MealSlotSection
            key={slot.key}
            slot={slot}
            selectedOptionId={dayChoices?.[slot.key]}
            onSelect={(slotKey, optionId) => setMealChoice(selectedDateKey, slotKey, optionId)}
          />
        ))}
      </main>

      <HistoryPanel history={history} selectedDateKey={selectedDateKey} onSelectDate={setSelectedDateKey} />

      <footer className="app-footer">
        <p>
          ⚠️ Os valores de macros são estimativas. Óleo, molhos, queijo e cortes diferentes de carne podem
          alterar calorias e gorduras.
        </p>
      </footer>
    </div>
  )
}
