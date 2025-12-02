'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

type Participant = {
  id: string
  name: string
  amount: number
}

type SplitMethod = 'equal' | 'custom'

export function ExpenseCalculator() {
  const [totalAmount, setTotalAmount] = useState<string>('15000')
  const [splitMethod, setSplitMethod] = useState<SplitMethod>('equal')
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'Tú', amount: 0 },
    { id: '2', name: 'Amigo 1', amount: 0 },
    { id: '3', name: 'Amigo 2', amount: 0 },
  ])

  const calculateSplit = () => {
    const total = parseFloat(totalAmount) || 0
    if (splitMethod === 'equal') {
      const perPerson = total / participants.length
      return participants.map(p => ({ ...p, amount: perPerson }))
    }
    return participants
  }

  const splits = calculateSplit()

  const addParticipant = () => {
    if (participants.length >= 8) return
    setParticipants([
      ...participants,
      { id: Date.now().toString(), name: `Amigo ${participants.length}`, amount: 0 },
    ])
    trackEvent('calculator_add_participant', { count: participants.length + 1 })
  }

  const removeParticipant = (id: string) => {
    if (participants.length <= 2) return
    setParticipants(participants.filter(p => p.id !== id))
    trackEvent('calculator_remove_participant', { count: participants.length - 1 })
  }

  const updateParticipantName = (id: string, name: string) => {
    setParticipants(participants.map(p => (p.id === id ? { ...p, name } : p)))
  }

  const updateParticipantAmount = (id: string, amount: string) => {
    const numAmount = parseFloat(amount) || 0
    setParticipants(participants.map(p => (p.id === id ? { ...p, amount: numAmount } : p)))
  }

  const handleTotalChange = (value: string) => {
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setTotalAmount(value)
      trackEvent('calculator_total_changed', { amount: value })
    }
  }

  const handleMethodChange = (method: SplitMethod) => {
    setSplitMethod(method)
    trackEvent('calculator_method_changed', { method })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const customTotal = splitMethod === 'custom'
    ? participants.reduce((sum, p) => sum + p.amount, 0)
    : parseFloat(totalAmount) || 0

  const isCustomBalanced = splitMethod === 'custom' && Math.abs(customTotal - (parseFloat(totalAmount) || 0)) < 0.01

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-soft">
        {/* Total Amount Input */}
        <div className="mb-6">
          <label htmlFor="total" className="block text-sm font-medium text-slate-700 mb-2">
            Monto total del gasto
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
              $
            </span>
            <input
              id="total"
              type="text"
              inputMode="decimal"
              value={totalAmount}
              onChange={(e) => handleTotalChange(e.target.value)}
              className="w-full pl-8 pr-4 py-3 text-2xl font-bold text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand focus:border-transparent transition"
              placeholder="0"
            />
          </div>
        </div>

        {/* Split Method Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            ¿Cómo dividir?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleMethodChange('equal')}
              className={`px-4 py-3 rounded-xl font-semibold transition ${
                splitMethod === 'equal'
                  ? 'bg-brand text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Partes iguales
            </button>
            <button
              onClick={() => handleMethodChange('custom')}
              className={`px-4 py-3 rounded-xl font-semibold transition ${
                splitMethod === 'custom'
                  ? 'bg-brand text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Personalizado
            </button>
          </div>
        </div>

        {/* Participants List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-slate-700">
              Participantes ({participants.length})
            </label>
            <button
              onClick={addParticipant}
              disabled={participants.length >= 8}
              className="text-sm font-medium text-brand hover:text-brand-dark disabled:text-slate-400 disabled:cursor-not-allowed transition"
            >
              + Agregar
            </button>
          </div>

          <div className="space-y-3">
            {splits.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
              >
                <input
                  type="text"
                  value={participant.name}
                  onChange={(e) => updateParticipantName(participant.id, e.target.value)}
                  className="flex-1 px-3 py-2 text-sm font-medium bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition"
                  placeholder="Nombre"
                />

                {splitMethod === 'custom' ? (
                  <div className="relative w-32">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={participant.amount || ''}
                      onChange={(e) => updateParticipantAmount(participant.id, e.target.value)}
                      className="w-full pl-5 pr-2 py-2 text-sm font-semibold bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition"
                      placeholder="0"
                    />
                  </div>
                ) : (
                  <div className="w-32 px-3 py-2 text-sm font-semibold text-right text-brand bg-white rounded-lg border border-emerald-100">
                    {formatCurrency(participant.amount)}
                  </div>
                )}

                {participants.length > 2 && (
                  <button
                    onClick={() => removeParticipant(participant.id)}
                    className="p-2 text-slate-400 hover:text-red-600 transition"
                    aria-label={`Eliminar ${participant.name}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Custom Split Validation */}
        {splitMethod === 'custom' && (
          <div className={`mb-4 p-3 rounded-xl border ${
            isCustomBalanced
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="flex items-center gap-2 text-sm">
              {isCustomBalanced ? (
                <>
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-emerald-800">División balanceada</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-medium text-amber-800">
                    Faltan {formatCurrency(Math.abs((parseFloat(totalAmount) || 0) - customTotal))}
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
            <span>Total</span>
            <span className="font-semibold">{formatCurrency(parseFloat(totalAmount) || 0)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Por persona (promedio)</span>
            <span className="font-semibold">
              {formatCurrency((parseFloat(totalAmount) || 0) / participants.length)}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 pt-6 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-600 mb-3">
            ¿Te gusta cómo funciona? Descarga Teilen y divide gastos con tu grupo
          </p>
          <a
            href="/api/download"
            className="inline-block px-6 py-3 bg-brand text-white rounded-xl font-semibold hover:bg-brand-dark transition shadow-soft"
            onClick={() => trackEvent('calculator_cta_click')}
          >
            Descargar Teilen gratis
          </a>
        </div>
      </div>
    </div>
  )
}
