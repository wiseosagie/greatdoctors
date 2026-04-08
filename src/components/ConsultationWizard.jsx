import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

// ─────────────────────────────────────────────────────────────────────────────
// Individual question renderers
// ─────────────────────────────────────────────────────────────────────────────

function RadioQuestion({ question, value, onChange }) {
  return (
    <div className="q-options">
      {question.options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`q-option q-option--radio ${value === opt ? 'selected' : ''}`}
          onClick={() => onChange(opt)}
        >
          <span className="q-option__radio" />
          <span className="q-option__label">{opt}</span>
          {value === opt && (
            <motion.span className="q-option__check" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </motion.span>
          )}
        </button>
      ))}
    </div>
  )
}

function CheckboxQuestion({ question, value = [], onChange }) {
  const toggle = (opt) => {
    if (opt === 'None of the above' || opt === "I don't have any of these symptoms") {
      onChange([opt])
      return
    }
    const filtered = value.filter(v => v !== 'None of the above' && v !== "I don't have any of these symptoms")
    onChange(filtered.includes(opt) ? filtered.filter(v => v !== opt) : [...filtered, opt])
  }
  return (
    <div className="q-options q-options--grid">
      {question.options.map((opt) => {
        const checked = value.includes(opt)
        return (
          <button key={opt} type="button"
            className={`q-option q-option--checkbox ${checked ? 'selected' : ''}`}
            onClick={() => toggle(opt)}
          >
            <span className={`q-option__box ${checked ? 'checked' : ''}`}>
              {checked && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
            </span>
            <span className="q-option__label">{opt}</span>
          </button>
        )
      })}
    </div>
  )
}

function RadioWithTextQuestion({ question, value = {}, onChange }) {
  const selected = value.choice || ''
  const text = value.text || ''
  const showText = selected === question.textTriggerValue

  return (
    <div>
      <div className="q-options">
        {question.options.map((opt) => (
          <button key={opt} type="button"
            className={`q-option q-option--radio ${selected === opt ? 'selected' : ''}`}
            onClick={() => onChange({ choice: opt, text: selected === opt ? text : '' })}
          >
            <span className="q-option__radio" />
            <span className="q-option__label">{opt}</span>
            {selected === opt && (
              <motion.span className="q-option__check" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </motion.span>
            )}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
          >
            <textarea
              className="q-textarea"
              placeholder={question.textLabel}
              value={text}
              onChange={e => onChange({ choice: selected, text: e.target.value })}
              rows={3}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CheckboxBlockerQuestion({ question, value = [], onChange, onBlock }) {
  const toggle = (opt) => {
    if (opt === question.safeValue) {
      onChange([opt])
      return
    }
    if (question.blockerValues.includes(opt)) {
      onBlock(question.blockerMessage)
      return
    }
    const filtered = value.filter(v => v !== question.safeValue)
    onChange(filtered.includes(opt) ? filtered.filter(v => v !== opt) : [...filtered, opt])
  }
  return (
    <div className="q-options">
      {question.options.map((opt) => {
        const isBlocker = question.blockerValues.includes(opt)
        const checked = value.includes(opt)
        return (
          <button key={opt} type="button"
            className={`q-option q-option--radio ${isBlocker ? 'q-option--danger' : ''} ${checked ? 'selected' : ''}`}
            onClick={() => toggle(opt)}
          >
            <span className="q-option__radio" />
            <span className="q-option__label">
              {isBlocker && <span className="q-option__warn">⚠ </span>}
              {opt}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function AcknowledgmentQuestion({ question, value, onChange }) {
  return (
    <button type="button"
      className={`q-ack ${value ? 'checked' : ''}`}
      onClick={() => onChange(!value)}
    >
      <span className={`q-ack__box ${value ? 'checked' : ''}`}>
        {value && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
      </span>
      <span>{question.label}</span>
    </button>
  )
}

function TextQuestion({ question, value = '', onChange }) {
  const inputType = ['date', 'tel', 'email'].includes(question.type) ? question.type : 'text'
  return (
    <input
      className="q-input"
      type={inputType}
      placeholder={question.placeholder || question.label}
      value={value}
      onChange={e => onChange(e.target.value)}
      autoComplete={inputType === 'tel' ? 'tel' : inputType === 'email' ? 'email' : undefined}
    />
  )
}

function TermsQuestion({ value, onChange }) {
  return (
    <div className="q-terms">
      <div className="q-terms__box">
        <p>By submitting this consultation you agree to our <a href="/contact" target="_blank">Terms of Use</a> and <a href="/contact" target="_blank">Privacy Policy</a>. Your information is encrypted and HIPAA-compliant. It will never be sold or shared.</p>
      </div>
      <button type="button"
        className={`q-ack ${value ? 'checked' : ''}`}
        onClick={() => onChange(!value)}
      >
        <span className={`q-ack__box ${value ? 'checked' : ''}`}>
          {value && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
        </span>
        <span>I accept the Terms and Conditions</span>
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Blocker screen
// ─────────────────────────────────────────────────────────────────────────────
function BlockerScreen({ message, onBack }) {
  return (
    <motion.div className="blocker" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="blocker__icon">🚨</div>
      <h3 className="blocker__title">Unable to Proceed</h3>
      <p className="blocker__msg">{message}</p>
      <p className="blocker__sub">If you are experiencing a medical emergency, please call <strong>911</strong> immediately.</p>
      <button className="btn-outline" onClick={onBack} style={{ marginTop: 16 }}>← Go Back</button>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Success screen
// ─────────────────────────────────────────────────────────────────────────────
function SuccessScreen({ condition }) {
  return (
    <motion.div className="success" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
      <motion.div className="success__icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </motion.div>
      <h2 className="success__title">Consultation Submitted!</h2>
      <p className="success__sub">
        Dr. Evbu Osunde will personally review your responses. During business hours, expect your treatment plan within <strong>2–4 hours</strong>.
      </p>
      <div className="success__steps">
        {['Your responses are encrypted & stored securely', 'Dr. Osunde reviews your case', 'Prescription sent to your pharmacy', 'Pick up same day'].map((s, i) => (
          <motion.div key={s} className="success__step" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
            <span className="success__step-num">{i + 1}</span>
            <span>{s}</span>
          </motion.div>
        ))}
      </div>
      <a href="/" className="btn-primary" style={{ marginTop: 24 }}>Back to Home</a>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Question renderer dispatcher
// ─────────────────────────────────────────────────────────────────────────────
function QuestionField({ question, value, onChange, onBlock }) {
  switch (question.type) {
    case 'radio':
      return <RadioQuestion question={question} value={value} onChange={onChange} />
    case 'checkbox':
      return <CheckboxQuestion question={question} value={value} onChange={onChange} />
    case 'radio_with_text':
      return <RadioWithTextQuestion question={question} value={value} onChange={onChange} />
    case 'checkbox_blocker':
      return <CheckboxBlockerQuestion question={question} value={value} onChange={onChange} onBlock={onBlock} />
    case 'acknowledgment':
      return <AcknowledgmentQuestion question={question} value={value} onChange={onChange} />
    case 'text':
    case 'date':
    case 'tel':
    case 'email':
      return <TextQuestion question={question} value={value} onChange={onChange} />
    case 'terms':
      return <TermsQuestion value={value} onChange={onChange} />
    default:
      return null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Wizard
// ─────────────────────────────────────────────────────────────────────────────
export default function ConsultationWizard({ condition, onSubmit }) {
  const { user } = useAuth()
  const [stepIdx, setStepIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [blocker, setBlocker] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [direction, setDirection] = useState(1)
  const [hasProfile, setHasProfile] = useState(false)
  const topRef = useRef(null)

  // Pre-fill patient info from last submission and skip the step if found
  useEffect(() => {
    if (!user) return
    supabase
      .from('submissions')
      .select('patient_info')
      .eq('user_id', user.id)
      .order('submitted_at', { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => {
        if (!data?.patient_info) return
        const pi = data.patient_info
        if (!pi.firstName || !pi.phone) return // incomplete profile, show step
        setHasProfile(true)
        setAnswers(prev => ({
          ...prev,
          first_name: pi.firstName || '',
          last_name:  pi.lastName  || '',
          phone:      pi.phone     || '',
          email:      pi.email     || '',
          dob:        pi.dob       || '',
          gender:     pi.gender    || '',
        }))
      })
  }, [user])

  // Filter out patient_info step if user already has a profile
  const steps = condition.steps.filter(s => !(hasProfile && s.id === 'patient_info'))
  const currentStep = steps[stepIdx]
  const progress = ((stepIdx) / steps.length) * 100

  const setAnswer = (qId, val) => {
    setAnswers(prev => ({ ...prev, [qId]: val }))
    setErrors(prev => { const e = { ...prev }; delete e[qId]; return e })
  }

  const isConditionalVisible = (q) => {
    if (!q.conditional) return true
    const depVal = answers[q.conditional.dependsOn]
    if (typeof depVal === 'object' && depVal?.choice) return depVal.choice === q.conditional.value
    return depVal === q.conditional.value
  }

  const validateStep = () => {
    const newErrors = {}
    for (const q of currentStep.questions) {
      if (!q.required) continue
      if (!isConditionalVisible(q)) continue
      const val = answers[q.id]
      if (q.type === 'terms' && !val) { newErrors[q.id] = 'You must accept the terms to continue.'; continue }
      if (!val || (Array.isArray(val) && val.length === 0)) newErrors[q.id] = 'This field is required.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validateStep()) {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    if (stepIdx < steps.length - 1) {
      setDirection(1)
      setStepIdx(i => i + 1)
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (blocker) { setBlocker(null); return }
    if (stepIdx > 0) {
      setDirection(-1)
      setStepIdx(i => i - 1)
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const id = `${condition.id}-${Date.now()}`

      const patientInfo = {
        firstName: answers?.first_name || '',
        lastName:  answers?.last_name  || '',
        phone:     answers?.phone      || '',
        email:     answers?.email      || '',
        dob:       answers?.dob        || '',
        gender:    answers?.gender     || '',
      }

      await supabase.from('submissions').insert({
        id,
        user_id:      user?.id || null,
        condition:    condition.name,
        condition_id: condition.id,
        patient_info: patientInfo,
        answers,
      })

    } finally {
      setSubmitting(false)
      setSubmitted(true)
    }
  }

  if (submitted) return <SuccessScreen condition={condition} />
  if (blocker) return <BlockerScreen message={blocker} onBack={() => setBlocker(null)} />

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  }

  return (
    <div className="wizard" ref={topRef}>
      {/* Progress bar */}
      <div className="wizard__progress-wrap">
        <div className="wizard__progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* Step pills */}
      <div className="wizard__steps-nav">
        {steps.map((s, i) => (
          <div key={s.id} className={`wizard__step-pill ${i === stepIdx ? 'active' : ''} ${i < stepIdx ? 'done' : ''}`}>
            <span className="wizard__step-pill-icon">
              {i < stepIdx ? '✓' : s.icon}
            </span>
            <span className="wizard__step-pill-label">{s.title}</span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={stepIdx}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="wizard__step"
        >
          <div className="wizard__step-header">
            <span className="wizard__step-emoji">{currentStep.icon}</span>
            <div>
              <p className="wizard__step-num">Step {stepIdx + 1} of {steps.length}</p>
              <h2 className="wizard__step-title">{currentStep.title}</h2>
            </div>
          </div>

          <div className="wizard__questions">
            {currentStep.questions.map((q) => {
              if (!isConditionalVisible(q)) return null
              return (
                <motion.div
                  key={q.id}
                  className="wizard__question"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {q.type !== 'terms' && (
                    <label className="wizard__q-label">
                      {q.label}
                      {q.required && <span className="wizard__q-required"> *</span>}
                    </label>
                  )}
                  <QuestionField
                    question={q}
                    value={answers[q.id]}
                    onChange={(val) => setAnswer(q.id, val)}
                    onBlock={(msg) => setBlocker(msg)}
                  />
                  {errors[q.id] && (
                    <motion.p className="wizard__error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                      ⚠ {errors[q.id]}
                    </motion.p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="wizard__nav">
        {stepIdx > 0 && (
          <button className="btn-outline wizard__back" onClick={handleBack}>
            ← Back
          </button>
        )}
        <button
          className="btn-primary wizard__next"
          onClick={handleNext}
          disabled={submitting}
        >
          {submitting ? (
            <span className="wizard__spinner" />
          ) : stepIdx === steps.length - 1 ? (
            <>Submit Consultation <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></>
          ) : (
            <>Continue <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg></>
          )}
        </button>
      </div>

      <style>{`
        .wizard {
          max-width: 680px;
          margin: 0 auto;
        }

        /* Progress */
        .wizard__progress-wrap {
          height: 5px;
          background: var(--teal-l);
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 28px;
        }
        .wizard__progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--teal), #0ecebe);
          border-radius: 99px;
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }

        /* Step pills */
        .wizard__steps-nav {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .wizard__step-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 99px;
          background: var(--sky);
          border: 1px solid var(--border);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--muted);
          transition: all 0.2s;
        }
        .wizard__step-pill.active {
          background: var(--teal);
          border-color: var(--teal);
          color: white;
        }
        .wizard__step-pill.done {
          background: var(--teal-l);
          border-color: var(--teal);
          color: var(--teal);
        }
        .wizard__step-pill-icon { font-size: 0.85rem; }
        .wizard__step-pill-label { display: none; }
        .wizard__step-pill.active .wizard__step-pill-label,
        .wizard__step-pill.done .wizard__step-pill-label { display: inline; }

        /* Step */
        .wizard__step-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
        }
        .wizard__step-emoji {
          font-size: 2.2rem;
          width: 60px;
          height: 60px;
          background: var(--teal-l);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .wizard__step-num {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--teal);
          margin-bottom: 4px;
        }
        .wizard__step-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--navy);
          font-weight: 400;
          letter-spacing: -0.02em;
        }

        /* Questions */
        .wizard__questions {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .wizard__question { display: flex; flex-direction: column; gap: 12px; }
        .wizard__q-label {
          font-size: 0.925rem;
          font-weight: 600;
          color: var(--ink);
          line-height: 1.5;
        }
        .wizard__q-required { color: var(--teal); }
        .wizard__error {
          font-size: 0.78rem;
          color: #e53e3e;
          font-weight: 500;
        }

        /* Options */
        .q-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .q-options--grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        .q-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--border);
          background: white;
          cursor: pointer;
          text-align: left;
          transition: all 0.18s ease;
          font-family: var(--font-sans);
          position: relative;
          overflow: hidden;
        }
        .q-option::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--teal-l);
          opacity: 0;
          transition: opacity 0.18s;
        }
        .q-option:hover::before { opacity: 1; }
        .q-option:hover { border-color: var(--teal); }
        .q-option.selected {
          border-color: var(--teal);
          background: var(--teal-l);
        }
        .q-option.selected::before { opacity: 0; }
        .q-option--danger:hover { border-color: #e53e3e; }
        .q-option--danger:hover::before { background: #fff5f5; opacity: 1; }
        .q-option--danger .q-option__warn { color: #e53e3e; }

        .q-option__radio {
          width: 18px; height: 18px;
          border-radius: 50%;
          border: 2px solid var(--border-m);
          flex-shrink: 0;
          transition: border-color 0.15s;
          position: relative;
          z-index: 1;
        }
        .q-option.selected .q-option__radio {
          border-color: var(--teal);
          background: var(--teal);
        }
        .q-option__box {
          width: 18px; height: 18px;
          border-radius: 4px;
          border: 2px solid var(--border-m);
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
          position: relative;
          z-index: 1;
        }
        .q-option__box.checked { background: var(--teal); border-color: var(--teal); }
        .q-option__label {
          font-size: 0.875rem;
          font-weight: 400;
          color: var(--ink);
          flex: 1;
          position: relative;
          z-index: 1;
        }
        .q-option.selected .q-option__label { color: var(--teal-d); font-weight: 500; }
        .q-option__check {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: var(--teal);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }

        /* Acknowledgment */
        .q-ack {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 18px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--border);
          background: var(--sky);
          cursor: pointer;
          text-align: left;
          font-family: var(--font-sans);
          font-size: 0.875rem;
          color: var(--ink);
          line-height: 1.6;
          transition: all 0.18s;
        }
        .q-ack:hover { border-color: var(--teal); }
        .q-ack.checked { border-color: var(--teal); background: var(--teal-l); }
        .q-ack__box {
          width: 20px; height: 20px; min-width: 20px;
          border-radius: 4px;
          border: 2px solid var(--border-m);
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px;
          transition: all 0.15s;
        }
        .q-ack__box.checked { background: var(--teal); border-color: var(--teal); }

        /* Textarea / Input */
        .q-textarea, .q-input {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--ink);
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-md);
          background: white;
          resize: none;
          transition: border-color 0.2s;
          outline: none;
        }
        .q-textarea:focus, .q-input:focus {
          border-color: var(--teal);
          box-shadow: 0 0 0 3px rgba(10,155,140,0.1);
        }

        /* Terms */
        .q-terms { display: flex; flex-direction: column; gap: 14px; }
        .q-terms__box {
          background: var(--sky);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 18px;
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.7;
        }
        .q-terms__box a { color: var(--teal); text-decoration: underline; }

        /* Navigation */
        .wizard__nav {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }
        .wizard__back { }
        .wizard__next { min-width: 160px; justify-content: center; padding: 13px 28px; }
        .wizard__spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Blocker */
        .blocker {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 16px; padding: 48px 24px;
          background: #fff5f5;
          border: 2px solid #fc8181;
          border-radius: var(--radius-lg);
        }
        .blocker__icon { font-size: 3rem; }
        .blocker__title { font-family: var(--font-serif); font-size: 1.8rem; color: #c53030; font-weight: 400; }
        .blocker__msg { font-size: 1rem; color: #742a2a; line-height: 1.7; max-width: 480px; }
        .blocker__sub { font-size: 0.85rem; color: #9b2c2c; }

        /* Success */
        .success {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 16px; padding: 48px 24px;
        }
        .success__icon {
          width: 80px; height: 80px;
          background: var(--teal-l);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .success__title {
          font-family: var(--font-serif);
          font-size: 2rem; color: var(--navy); font-weight: 400;
        }
        .success__sub { font-size: 0.95rem; color: var(--muted); line-height: 1.7; max-width: 460px; }
        .success__steps {
          display: flex; flex-direction: column; gap: 12px;
          width: 100%; max-width: 400px; margin-top: 8px; text-align: left;
        }
        .success__step {
          display: flex; align-items: center; gap: 12px;
          font-size: 0.875rem; color: var(--muted);
        }
        .success__step-num {
          width: 26px; height: 26px; border-radius: 50%;
          background: var(--teal); color: white;
          font-size: 0.72rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 600px) {
          .q-options--grid { grid-template-columns: 1fr; }
          .wizard__step-pill-label { display: none !important; }
        }
      `}</style>
    </div>
  )
}
