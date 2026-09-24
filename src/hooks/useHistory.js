import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'dieta-gabriel-historico'

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10) // YYYY-MM-DD
}

export function useHistory() {
  const [history, setHistory] = useState(loadHistory)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    } catch {
      // localStorage indisponível (ex: modo privado) — ignora silenciosamente
    }
  }, [history])

  const setMealChoice = useCallback((dateKey, slotKey, optionId) => {
    setHistory((prev) => {
      const day = { ...(prev[dateKey] ?? {}) }
      if (day[slotKey] === optionId) {
        delete day[slotKey] // clicar de novo desmarca
      } else {
        day[slotKey] = optionId
      }
      return { ...prev, [dateKey]: day }
    })
  }, [])

  return { history, setMealChoice }
}
