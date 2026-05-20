'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { COUNTRY_META, COUNTRY_STEPS } from '../../lib/content';

// ─── Helpers ────────────────────────────────────────────────
function getVisibleSteps(allSteps, userType) {
  if (userType === 'pyme') return allSteps.filter(s => !s.isIntro);
  return allSteps;
}

function isCompleted(step, progress) {
  if (!step.progressStep) return false;
  return !!progress[`step${step.progressStep}`];
}

function isUnlocked(steps, idx, progress) {
  if (idx === 0) return true;
  const prev = steps[idx - 1];
  if (!prev.progressStep) return true;
  return !!progress[`step${prev.progressStep}`];
}

function getSidebarStatus(step, idx, steps, progress) {
  if (!step.progressStep) return step.statusLabel || 'Información';
  if (isCompleted(step, progress)) return 'Completado';
  return isUnlocked(steps, idx, progress) ? 'Pendiente' : 'Bloqueado';
}

// ─── Toast ───────────────────────────────────────────────────
function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  return { toasts, show };
}

const TOAST_ICONS = { success: '✓', danger: '✕', info: 'ℹ', warning: '⚠' };
const TOAST_COLORS = {
  success: 'rgba(34,197,94,.35)',
  danger: 'rgba(239,68,68,.35)',
  info: 'rgba(48,171,169,.35)',
  warning: 'rgba(245,158,11,.4)',
};
const TOAST_TEXT_COLORS = {
  success: 'var(--success)', danger: 'var(--danger)',
  info: 'var(--primary)', warning: 'var(--warning)',
};

export default function OnboardingPage() {
  const router = useRouter();
  const { toasts, show: showToast } = useToast();

  // ── Sesión ───────────────────────────────────────────────
  const [session, setSession] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState({});
  const [showFinal, setShowFinal] = useState(false);
  const [saving, setSaving] = useState(false);

  // Feedback final
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('session');
    if (!raw) { router.replace('/'); return; }
    const sess = JSON.parse(raw);
    const allSteps = COUNTRY_STEPS[sess.country] || [];
    const visible = getVisibleSteps(allSteps, sess.userType);
    const prog = sess.progress || {};

    setSession(sess);
    setSteps(visible);
    setProgress(prog);

    // Si no hay ningún progreso, empezar desde el inicio (índice 0)
    const hasAnyProgress = visible.some(s => s.progressStep && prog[`step${s.progressStep}`]);
    if (!hasAnyProgress) { setCurrentIdx(0); return; }

    // Hay progreso: ir al primer paso pendiente
    const allDone = visible.every(s => !s.progressStep || !!prog[`step${s.progressStep}`]);
    if (allDone) { setShowFinal(true); return; }

    for (let i = 0; i < visible.length; i++) {
      if (visible[i].progressStep && !prog[`step${visible[i].progressStep}`]) {
        setCurrentIdx(i);
        return;
      }
    }
  }, [router]);

  // ── Navegar paso ─────────────────────────────────────────
  function goToStep(idx) {
    if (idx < 0 || idx >= steps.length) return;
    if (!isUnlocked(steps, idx, progress)) {
      showToast('Completa el paso anterior primero.', 'warning');
      return;
    }
    setShowFinal(false);
    setCurrentIdx(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToFinal() {
    setShowFinal(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Completar paso ───────────────────────────────────────
  async function completeStep(step) {
    if (!step.progressStep || saving) return;
    const key = `step${step.progressStep}`;
    if (progress[key]) return; // ya completado

    setSaving(true);
    const newProgress = { ...progress, [key]: true };
    setProgress(newProgress);

    // Actualizar sessionStorage
    const sess = JSON.parse(sessionStorage.getItem('session'));
    sess.progress = newProgress;
    sessionStorage.setItem('session', JSON.stringify(sess));

    try {
      await fetch('/api/gas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'saveProgress',
          email: session.email,
          stepNumber: step.progressStep,
          dateISO: new Date().toISOString(),
        }),
      });
      showToast('¡Paso completado! 🎉', 'success');
    } catch {
      showToast('No se pudo guardar en línea, pero tu progreso está registrado localmente.', 'warning');
    }

    setSaving(false);

    // Navegar directo sin verificar bloqueo — el paso acaba de completarse
    const nextIdx = currentIdx + 1;
    if (nextIdx < steps.length) {
      setTimeout(() => {
        setShowFinal(false);
        setCurrentIdx(nextIdx);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 600);
    } else {
      setTimeout(() => goToFinal(), 600);
    }
  }

  // ── Feedback final ───────────────────────────────────────
  async function submitFeedback() {
    if (!rating) { showToast('Selecciona una calificación.', 'warning'); return; }
    setSaving(true);
    try {
      await fetch('/api/gas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'saveFeedback', email: session.email, rating, comments }),
      });
      setFeedbackSent(true);
      showToast('¡Gracias por tu respuesta!', 'success');
    } catch {
      showToast('Error al enviar. Intenta de nuevo.', 'danger');
    }
    setSaving(false);
  }

  // ── Cerrar sesión ────────────────────────────────────────
  function signOut() {
    sessionStorage.removeItem('session');
    router.replace('/');
  }

  if (!session) return null;

  const meta = COUNTRY_META[session.country];
  const currentStep = steps[currentIdx];
  const allDone = steps.every(s => !s.progressStep || !!progress[`step${s.progressStep}`]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <header style={{
        padding: '0 28px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--surface)', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 20,
        boxShadow: '0 1px 4px rgba(0,0,0,.05)',
      }}>
        {/* Izquierda: logo + título */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="https://ayuda.alegra.com/hubfs/ALEGRA%20LOGO.png" alt="Alegra" style={{ height: 24, objectFit: 'contain' }} />
          <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-muted)' }}>Asistente de activación</span>
        </div>

        {/* Derecha: info sesión + salir */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 10px', borderRadius: 8,
            background: 'var(--surface-2)', border: '1px solid var(--border)',
          }}>
            <span className={`flag ${meta.flagClass}`} />
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)' }}>{meta.name}</span>
            <div style={{ width: 1, height: 12, background: 'var(--border)' }} />
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
              {session.userType === 'contador' ? 'Contador' : 'PYME'}
            </span>
            <div style={{ width: 1, height: 12, background: 'var(--border)' }} />
            <span style={{ fontSize: 14, color: 'var(--text-faint)' }}>{session.email}</span>
          </div>
          <button
            onClick={signOut}
            style={{
              fontSize: 14, fontWeight: 500, padding: '5px 12px', borderRadius: 8,
              border: '1px solid var(--border)', background: 'transparent',
              color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'background .15s',
            }}
          >
            Salir
          </button>
        </div>
      </header>

      {/* ── Layout ─────────────────────────────────────────── */}
      <div className="app-layout" style={{
        display: 'grid',
        gridTemplateColumns: '280px minmax(0,1fr)',
        maxWidth: 1280, margin: '28px auto', gap: 20, padding: '0 20px 56px',
        width: '100%', alignItems: 'start',
      }}>

        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside style={{
          background: 'var(--surface)', borderRadius: 16,
          border: '1px solid var(--border)',
          position: 'sticky', top: 72, height: 'fit-content',
          boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
        }}>
          {/* Cabecera del sidebar */}
          <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
              Tu ruta de activación
            </h2>
            <ProgressBar steps={steps} progress={progress} />
          </div>

          {/* Pasos */}
          <div style={{ padding: '10px 10px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {steps.map((step, idx) => {
              const status = getSidebarStatus(step, idx, steps, progress);
              const isActive = !showFinal && idx === currentIdx;
              const done = isCompleted(step, progress);
              const locked = !isUnlocked(steps, idx, progress);
              const isIntroStep = !step.progressStep && step.isIntro;

              return (
                <button
                  key={step.id}
                  className="sidebar-item"
                  onClick={() => goToStep(idx)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 10px', borderRadius: 9, textAlign: 'left',
                    border: `1px solid ${isActive ? 'var(--primary-border)' : 'transparent'}`,
                    background: isActive ? 'var(--primary-soft)' : done ? 'var(--success-soft)' : 'transparent',
                    cursor: locked ? 'default' : 'pointer',
                    opacity: locked ? .4 : 1,
                    fontFamily: 'inherit', width: '100%',
                  }}
                >
                  <span style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700,
                    background: done ? 'var(--success)' : isActive ? 'var(--primary)' : 'var(--surface-off)',
                    color: done || isActive ? '#fff' : 'var(--text-faint)',
                    border: `1.5px solid ${done ? 'var(--success)' : isActive ? 'var(--primary)' : 'var(--border)'}`,
                  }}>
                    {done ? '✓' : isIntroStep ? '★' : step.displayNumber}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontSize: 14, fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--text)' : done ? 'var(--text)' : locked ? 'var(--text-faint)' : 'var(--text-muted)',
                      lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {step.sidebarTitle}
                    </div>
                    <div style={{
                      fontSize: 14, marginTop: 1, fontWeight: 500,
                      color: done ? 'var(--success)' : isActive ? 'var(--primary)' : 'var(--text-faint)',
                    }}>
                      {status}
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Botón final */}
            {allDone && (
              <button
                className="sidebar-item"
                onClick={goToFinal}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 9, textAlign: 'left', marginTop: 4,
                  border: `1px solid ${showFinal ? 'var(--primary-border)' : 'transparent'}`,
                  background: showFinal ? 'var(--primary-soft)' : 'transparent',
                  cursor: 'pointer', fontFamily: 'inherit', width: '100%',
                }}
              >
                <span style={{
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                  background: 'var(--primary)', color: '#fff',
                }}>🎉</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Completar onboarding</div>
                  <div style={{ fontSize: 14, color: 'var(--primary)', fontWeight: 500 }}>Enviar calificación</div>
                </div>
              </button>
            )}
          </div>
        </aside>

        {/* ── Contenido principal ───────────────────────────── */}
        <main>
          {showFinal ? (
            <FinalCard
              email={session.email}
              rating={rating}
              setRating={setRating}
              comments={comments}
              setComments={setComments}
              onSubmit={submitFeedback}
              sent={feedbackSent}
              saving={saving}
            />
          ) : currentStep ? (
            <StepCard
              step={currentStep}
              stepIdx={currentIdx}
              steps={steps}
              progress={progress}
              onComplete={() => completeStep(currentStep)}
              onNext={() => {
                const next = currentIdx + 1;
                if (next < steps.length) goToStep(next);
                else goToFinal();
              }}
              onPrev={() => currentIdx > 0 && goToStep(currentIdx - 1)}
              saving={saving}
            />
          ) : null}
        </main>
      </div>

      {/* ── Toasts ──────────────────────────────────────────── */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column-reverse', gap: 10 }}>
        {toasts.map(t => (
          <div key={t.id} className="toast-enter" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '13px 18px', borderRadius: 12, maxWidth: 380,
            background: 'var(--surface)', border: `1px solid ${TOAST_COLORS[t.type]}`,
            boxShadow: '0 8px 28px rgba(40,37,29,.13)', fontSize: 14, fontWeight: 500,
          }}>
            <span style={{ color: TOAST_TEXT_COLORS[t.type], fontSize: 16 }}>{TOAST_ICONS[t.type]}</span>
            {t.msg}
          </div>
        ))}
      </div>

    </div>
  );
}

// ─── Barra de progreso global ────────────────────────────────
function ProgressBar({ steps, progress }) {
  const total = steps.filter(s => s.progressStep).length;
  const done  = steps.filter(s => s.progressStep && progress[`step${s.progressStep}`]).length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>
          {done === total && total > 0 ? '¡Completado!' : `${done} de ${total} pasos`}
        </span>
        <span style={{
          fontSize: 14, fontWeight: 700, color: pct === 100 ? 'var(--success)' : 'var(--primary)',
          background: pct === 100 ? 'var(--success-soft)' : 'var(--primary-soft)',
          padding: '2px 7px', borderRadius: 999,
        }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: 5, borderRadius: 999, background: 'var(--surface-off)' }}>
        <div style={{
          height: '100%', borderRadius: 999,
          width: `${pct}%`,
          background: pct === 100
            ? 'var(--success)'
            : 'linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%)',
          transition: 'width .6s cubic-bezier(.16,1,.3,1)',
        }} />
      </div>
    </div>
  );
}

// ─── Tarjeta de paso ─────────────────────────────────────────
function StepCard({ step, stepIdx, steps, progress, onComplete, onNext, onPrev, saving }) {
  const done = isCompleted(step, progress);
  const isLast = stepIdx === steps.length - 1;

  return (
    <div style={{
      background: 'var(--surface)', borderRadius: 18,
      border: '1px solid var(--border)',
      boxShadow: '0 2px 12px rgba(40,37,29,.07)',
      overflow: 'hidden',
    }}>

      {/* ── Banda superior de estado ── */}
      {done && (
        <div style={{
          background: 'linear-gradient(90deg, rgba(34,197,94,.1) 0%, rgba(34,197,94,.04) 100%)',
          borderBottom: '1px solid rgba(34,197,94,.2)',
          padding: '8px 28px', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: 'var(--success)', fontSize: 14 }}>✓</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--success)' }}>Paso completado</span>
        </div>
      )}

      <div style={{ padding: '26px 28px 28px' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            {/* Número de paso */}
            {step.displayNumber && (
              <div style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 800,
                background: done ? 'var(--success)' : 'var(--primary)',
                color: '#fff',
              }}>
                {done ? '✓' : step.displayNumber}
              </div>
            )}
            {/* Tag */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '3px 10px', borderRadius: 999,
              background: 'var(--primary-soft)', border: '1px solid var(--primary-border)',
              fontSize: 14, fontWeight: 700, color: 'var(--primary)',
            }}>
              {step.tag}
            </span>
          </div>
          <h2 style={{ fontSize: 21, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
            {step.heading}
          </h2>
        </div>

        {/* ── Video prominente arriba ── */}
        {step.mediaSrc && (
          <div style={{ marginBottom: 24 }}>
            <div style={{
              borderRadius: 14, overflow: 'hidden',
              border: '1px solid var(--border)',
              background: '#111',
              aspectRatio: '16/9',
              maxHeight: 420,
              boxShadow: '0 8px 32px rgba(40,37,29,.14)',
            }}>
              {step.mediaType === 'video' ? (
                <video controls muted loop playsInline
                  style={{ width: '100%', height: '100%', display: 'block' }}>
                  <source src={step.mediaSrc} type="video/mp4" />
                </video>
              ) : (
                <img src={step.mediaSrc} alt={step.heading}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#f9f8f5' }} />
              )}
            </div>
          </div>
        )}

        {/* ── Contenido textual ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="step-prose" dangerouslySetInnerHTML={{ __html: step.body }} />

          {/* Tip */}
          {step.tip && (
            <div style={{
              background: 'rgba(48,171,169,.07)', borderRadius: 10,
              padding: '11px 14px', borderLeft: '3px solid var(--primary)',
              display: 'flex', gap: 9, alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>💡</span>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: step.tip }} />
            </div>
          )}

          {/* Nota */}
          {step.note && (
            <div style={{
              background: 'rgba(245,158,11,.07)', borderRadius: 10,
              padding: '11px 14px', borderLeft: '3px solid var(--warning)',
              display: 'flex', gap: 9, alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>⚠️</span>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>
                <strong style={{ color: '#b45309' }}>Importante: </strong>
                <span dangerouslySetInnerHTML={{ __html: step.note }} />
              </p>
            </div>
          )}

          {/* Badges */}
          {step.badges && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {step.badges.map(b => (
                <span key={b} style={{
                  fontSize: 14, fontWeight: 700, padding: '5px 12px', borderRadius: 999,
                  background: 'var(--primary-soft)', border: '1px solid var(--primary-border)',
                  color: 'var(--primary)',
                }}>
                  {b}
                </span>
              ))}
            </div>
          )}

          {/* Link ayuda */}
          {step.helpLink && (
            <div style={{
              background: 'var(--surface-2)', borderRadius: 10,
              border: '1px solid var(--border)',
              padding: '12px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: 'var(--primary-soft)', border: '1px solid var(--primary-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16,
                }}>
                  ❓
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                    ¿Tienes dudas con este paso?
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)', marginTop: 1 }}>
                    Consulta la guía oficial de Alegra
                  </p>
                </div>
              </div>
              <a
                href={step.helpLink.url} target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '7px 14px', borderRadius: 7, flexShrink: 0,
                  background: 'var(--primary)', color: '#fff',
                  fontSize: 14, fontWeight: 600, textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(48,171,169,.25)',
                }}
              >
                Ver guía
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* ── Barra de acción ── */}
        <div style={{
          marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          {/* Lado izquierdo */}
          <div>
            {stepIdx > 0 && (
              <button onClick={onPrev} style={btnSecondary}>
                ← Paso anterior
              </button>
            )}
          </div>

          {/* Lado derecho — CTA principal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {done ? (
              <button onClick={onNext} style={btnPrimary}>
                {isLast ? 'Ver resumen final →' : 'Continuar →'}
              </button>
            ) : step.isIntro ? (
              <button onClick={onNext} style={btnPrimary}>
                Entendido, comenzar →
              </button>
            ) : (
              <button
                onClick={onComplete}
                disabled={saving}
                style={{
                  ...btnPrimary,
                  opacity: saving ? .6 : 1,
                  padding: '11px 22px',
                  fontSize: 14,
                  background: 'linear-gradient(135deg, #30aba9 0%, #239e9c 100%)',
                  boxShadow: '0 4px 16px rgba(48,171,169,.32)',
                }}
              >
                {saving ? 'Guardando…' : '✓  Ya lo hice, continuar'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Pantalla final / Feedback ───────────────────────────────
function FinalCard({ email, rating, setRating, comments, setComments, onSubmit, sent, saving }) {
  if (sent) {
    return (
      <div style={{
        background: 'var(--surface)', borderRadius: 18,
        border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)',
        padding: '64px 32px', textAlign: 'center',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', margin: '0 auto 20px',
          background: 'var(--success-soft)', border: '2px solid var(--success)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
        }}>✓</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>
          ¡Gracias por tu calificación!
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 380, margin: '0 auto' }}>
          Tu agente asignado estará en contacto para acompañarte en los próximos pasos.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--surface)', borderRadius: 18,
      border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)',
      overflow: 'hidden',
    }}>
      {/* Banner de celebración */}
      <div style={{
        background: 'linear-gradient(135deg, #30aba9 0%, #1d8785 100%)',
        padding: '36px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: 20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,.04)' }} />
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
          ¡Cuenta lista para operar!
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,.8)', lineHeight: 1.6, maxWidth: 400, margin: '0 auto' }}>
          Completaste todos los pasos del proceso de activación de Alegra.
        </p>
      </div>

      {/* Formulario de feedback */}
      <div style={{ padding: '32px' }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 4, textAlign: 'center' }}>
          ¿Cómo calificarías tu experiencia de activación?
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 24 }}>
          Tu opinión nos ayuda a mejorar el proceso para otros usuarios
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
          {[
            { val: 'positivo', emoji: '😊', label: 'Excelente', desc: 'Sin inconvenientes' },
            { val: 'regular',  emoji: '😐', label: 'Regular',   desc: 'Tuve algunas dudas' },
            { val: 'negativo', emoji: '😞', label: 'Difícil',   desc: 'Tuve inconvenientes' },
          ].map(opt => (
            <button
              key={opt.val}
              onClick={() => setRating(opt.val)}
              style={{
                flex: 1, maxWidth: 160,
                padding: '16px 12px', borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                border: `2px solid ${rating === opt.val ? 'var(--primary)' : 'var(--border)'}`,
                background: rating === opt.val ? 'var(--primary-soft)' : 'var(--surface-2)',
                fontFamily: 'inherit', transition: 'all .18s',
                boxShadow: rating === opt.val ? '0 0 0 3px var(--primary-soft)' : 'none',
              }}
            >
              <div style={{ fontSize: 30, marginBottom: 6 }}>{opt.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{opt.label}</div>
              <div style={{ fontSize: 14, color: 'var(--text-faint)', marginTop: 2 }}>{opt.desc}</div>
            </button>
          ))}
        </div>

        <textarea
          value={comments}
          onChange={e => setComments(e.target.value)}
          placeholder="¿Hay algo que podríamos mejorar o que te gustaría destacar? (opcional)"
          rows={3}
          style={{
            width: '100%', padding: '11px 14px', borderRadius: 10,
            border: '1px solid var(--border)', background: 'var(--surface-2)',
            color: 'var(--text)', fontSize: 14, resize: 'none',
            outline: 'none', marginBottom: 16, fontFamily: 'inherit', lineHeight: 1.65,
            transition: 'border-color .15s',
          }}
        />

        <button
          onClick={onSubmit}
          disabled={saving || !rating}
          style={{
            ...btnPrimary,
            width: '100%', justifyContent: 'center',
            padding: '13px', fontSize: 14,
            opacity: (!rating || saving) ? .45 : 1,
            cursor: (!rating || saving) ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? 'Enviando…' : 'Enviar calificación'}
        </button>
      </div>
    </div>
  );
}

// ─── Estilos de botones ──────────────────────────────────────
const btnPrimary = {
  padding: '10px 20px', borderRadius: 10, border: 'none',
  background: 'var(--primary)', color: '#fff', fontSize: 14, fontWeight: 600,
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
  boxShadow: '0 2px 8px rgba(48,171,169,.3)', fontFamily: 'inherit',
  transition: 'background .15s, box-shadow .15s',
};

const btnSecondary = {
  padding: '10px 16px', borderRadius: 10,
  border: '1px solid var(--border-strong)', background: 'var(--surface-2)',
  color: 'var(--text-muted)', fontSize: 14, fontWeight: 500,
  cursor: 'pointer', fontFamily: 'inherit', transition: 'background .15s',
};
