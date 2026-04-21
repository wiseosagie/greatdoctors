import { useState, useRef, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import PaymentStep from './PaymentStep'

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
// Success screen (moved to ConsultationSuccessPage)
// ─────────────────────────────────────────────────────────────────────────────
// function SuccessScreen({ condition, patientEmail, isLoggedIn }) {
//   const navigate = useNavigate()
//   const accountUrl = patientEmail
//     ? `/auth?email=${encodeURIComponent(patientEmail)}&mode=signup`
//     : '/auth?mode=signup'

//   return (
//     <motion.div className="success" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>

//       {/* Icon + heading */}
//       <motion.div className="success__icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
//         <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
//         </svg>
//       </motion.div>

//       <h2 className="success__title">You're all set!</h2>
//       <p className="success__sub">Your consultation has been received and payment confirmed.</p>
//       <p className="success__sub">
//         One of our doctors will personally review your case and send your treatment plan within <strong>2 to 4 hours</strong> during business hours.
//       </p>

//       {/* What happens next */}
//       <div className="success__steps">
//         {[
//           { icon: '🔒', text: 'Your responses are encrypted and stored securely' },
//           { icon: '👨‍⚕️', text: 'One of our doctors reviews your case personally' },
//           { icon: '💊', text: 'Your treatment plan is sent within 2 to 4 hours' },
//           { icon: '✅', text: 'Pick up your medication — same day in most cases' },
//         ].map((s, i) => (
//           <motion.div key={s.text} className="success__step" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
//             <span className="success__step-emoji">{s.icon}</span>
//             <span>{s.text}</span>
//           </motion.div>
//         ))}
//       </div>

//       {/* CTA */}
//       {isLoggedIn ? (
//         <motion.div className="success__actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
//           <button className="btn-primary" onClick={() => navigate('/dashboard')}>
//             View My Visits
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
//             </svg>
//           </button>
//           <a href="/" className="btn-outline">Back to Home</a>
//         </motion.div>
//       ) : (
//         <motion.div className="success__account-prompt" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
//           <div className="success__account-prompt__inner">
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
//               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
//             </svg>
//             <div>
//               <p className="success__account-prompt__title">Skip the form on your next visit</p>
//               <p className="success__account-prompt__sub">Create a free account and your personal details will be saved — no re-entering next time.</p>
//             </div>
//           </div>
//           <div className="success__account-prompt__actions">
//             <button className="btn-primary success__account-btn" onClick={() => navigate(accountUrl)}>
//               Create Free Account
//             </button>
//           </div>
//           <div style={{ marginTop: 12 }}>
//             <a href="/" className="success__account-skip">Return to Home</a>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   )
// }

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
  const [errors, setErrors] = useState({})
  const [direction, setDirection] = useState(1)
  const [hasProfile, setHasProfile] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
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
      setShowPayment(true)
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

  if (blocker) return <BlockerScreen message={blocker} onBack={() => setBlocker(null)} />
  const priceInCents = condition.price
    ? Math.round(parseFloat(condition.price.replace(/[^0-9.]/g, '')) * 100)
    : 4999

  const patientName = answers.name
    || [answers.first_name, answers.last_name].filter(Boolean).join(' ')
    || ''

  if (showPayment) return (
    <PaymentStep
      condition={condition}
      amount={priceInCents}
      patientName={patientName}
      answers={answers}
      userId={user?.id || null}
      onBack={() => setShowPayment(false)}
    />
  )

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

          {currentStep.id === 'patient_info' && !user && (
            <motion.div
              className="wizard__login-nudge"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Already have an account?</span>
              <a href="/auth" className="wizard__login-nudge__link">Log in to skip this step</a>
            </motion.div>
          )}

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
        >
          {stepIdx === steps.length - 1 ? (
            <>Continue to Payment <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></>
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

        /* Login nudge */
        .wizard__login-nudge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: var(--teal-l);
          border: 1px solid var(--teal);
          border-radius: var(--radius-md);
          font-size: 0.83rem;
          color: var(--teal-d);
          margin-bottom: 8px;
        }
        .wizard__login-nudge svg { flex-shrink: 0; color: var(--teal); }
        .wizard__login-nudge__link {
          font-weight: 700;
          color: var(--teal-d);
          text-decoration: underline;
          white-space: nowrap;
        }
        .wizard__login-nudge__link:hover { color: var(--navy); }

        /* Success */
        .success {
          max-width: 420px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          text-align: center;
        }
        .success__icon {
          display: flex;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .success__title {
          font-size: 22px;
          font-weight: 500;
          margin: 0 0 8px;
        }
        .success__sub {
          font-size: 16px;
          line-height: 1.7;
          color: var(--text-muted);
          margin: 0 0 8px;
        }
        .success__sub strong { font-weight: 500; color: var(--text); }
        .success__steps {
          border: 0.5px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          margin: 1.25rem 0 1.5rem;
          text-align: left;
        }
        .success__step {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px;
          font-size: 16px; line-height: 1.7;
          color: var(--text-muted);
          border-bottom: 0.5px solid var(--border);
        }
        .success__step:last-child { border-bottom: none; }
        .success__step-emoji { font-size: 18px; flex-shrink: 0; }
        .success__actions {
          display: flex; gap: 12px; flex-wrap: wrap;
          justify-content: center; margin-top: 8px;
        }
        .success__account-prompt {
          background: var(--surface);
          border-radius: 8px;
          padding: 14px 16px;
          text-align: left;
        }
        .success__account-prompt__inner {
          display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px;
        }
        .success__account-prompt__title {
          margin: 0 0 4px; font-size: 16px; font-weight: 500; color: var(--text);
        }
        .success__account-prompt__sub {
          margin: 0; font-size: 16px; line-height: 1.7; color: var(--text-muted);
        }
        .success__account-prompt__actions { margin-top: 10px; }
        .success__account-btn {
          display: block; width: 100%; box-sizing: border-box; text-align: center;
        }
        .success__account-skip {
          display: inline-block; font-size: 16px; color: var(--text-muted);
          text-decoration: none; border-bottom: 0.5px solid var(--border);
        }
        .success__account-skip:hover { color: var(--navy); }

        @media (max-width: 600px) {
          .q-options--grid { grid-template-columns: 1fr; }
          .wizard__step-pill-label { display: none !important; }
        }
      `}</style>
    </div>
  )
}
