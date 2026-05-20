'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const COUNTRIES = [
  { code: 'colombia',    name: 'Colombia',         flagClass: 'flag-colombia' },
  { code: 'costarica',   name: 'Costa Rica',        flagClass: 'flag-costarica' },
  { code: 'dominicana',  name: 'Rep. Dominicana',   flagClass: 'flag-dominicana' },
  { code: 'mexico',      name: 'México',            flagClass: 'flag-mexico' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [nit, setNit]           = useState('');
  const [country, setCountry]   = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const emailOk  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isInternal = emailOk && email.trim().toLowerCase().endsWith('@alegra.com');
  const nitOk    = isInternal || nit.trim().length > 0;
  const canSubmit = emailOk && nitOk && country && userType && !loading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/gas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action:   'registerOrGetUser',
          email:    email.trim(),
          nit:      isInternal ? '' : nit.trim(),
          userType,
          country,
        }),
      });
      const data = await res.json();

      if (data.error) {
        setError('Error de conexión. Intenta de nuevo.');
        setLoading(false);
        return;
      }

      sessionStorage.setItem('session', JSON.stringify({
        email:    email.trim(),
        country,
        userType,
        progress: data.progress || {},
      }));
      router.push('/onboarding');
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>

      {/* Topbar */}
      <header style={{
        padding: '16px 32px', display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--surface)', borderBottom: '1px solid var(--border)',
        boxShadow: '0 1px 3px rgba(40,37,29,.07)',
      }}>
        <img src="https://ayuda.alegra.com/hubfs/ALEGRA%20LOGO.png" alt="Alegra" style={{ height: 28, objectFit: 'contain' }} />
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Asistente de activación</span>
      </header>

      {/* Contenido */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px 56px' }}>
        <div style={{
          width: '100%', maxWidth: 500,
          background: 'var(--surface)', borderRadius: 20, padding: '40px 38px 36px',
          border: '1px solid var(--border)', boxShadow: '0 12px 40px rgba(40,37,29,.1)',
        }}>
          {/* Banner de bienvenida */}
          <div style={{
            background: 'linear-gradient(135deg, #30aba9 0%, #1d8785 100%)',
            borderRadius: 14, padding: '22px 22px 20px', marginBottom: 28,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -18, right: -18, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,.08)' }} />
            <div style={{ position: 'absolute', bottom: -24, right: 32, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🚀</div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6, lineHeight: 1.3 }}>
                Bienvenido a tu proceso de activación
              </h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.82)', lineHeight: 1.6, margin: 0 }}>
                Te guiaremos paso a paso para que tu cuenta quede lista en menos de una hora.
              </p>
            </div>
          </div>

          {/* Steps preview */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 26, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Configura tu empresa', 'Importa contactos', 'Habilita facturación', 'Listo'].map((label, i, arr) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', fontSize: 14, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: i === arr.length - 1 ? 'var(--primary-soft)' : 'var(--surface-off)',
                    color: i === arr.length - 1 ? 'var(--primary)' : 'var(--text-faint)',
                    border: `1px solid ${i === arr.length - 1 ? 'var(--primary-border)' : 'var(--border)'}`,
                  }}>
                    {i === arr.length - 1 ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: 9.5, color: 'var(--text-faint)', whiteSpace: 'nowrap', fontWeight: 500 }}>{label}</span>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: 18, height: 1, background: 'var(--border)', marginBottom: 14, flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>

          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 22, lineHeight: 1.6, textAlign: 'center' }}>
            Completa los datos con los que te registraste en Alegra.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <label style={{ fontSize: 14, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 7 }}>
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setNit(''); }}
              placeholder="correo@empresa.com"
              style={{
                width: '100%', padding: '10px 14px', borderRadius: 10,
                border: `1px solid ${emailOk && email ? 'var(--primary-border)' : 'var(--border)'}`,
                background: 'var(--surface-2)', color: 'var(--text)', fontSize: 14,
                outline: 'none', marginBottom: 16, fontFamily: 'inherit',
                boxShadow: emailOk && email ? '0 0 0 3px var(--primary-soft)' : 'none',
                transition: 'all .18s',
              }}
            />

            {/* NIT — se muestra solo si el correo no es @alegra.com */}
            {emailOk && !isInternal && (
              <>
                <label style={{ fontSize: 14, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 7 }}>
                  NIT / RUC de tu empresa
                </label>
                <input
                  type="text"
                  value={nit}
                  onChange={e => setNit(e.target.value)}
                  placeholder="Ej. 900123456"
                  autoFocus
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 10,
                    border: `1px solid ${nit.trim() ? 'var(--primary-border)' : 'var(--border)'}`,
                    background: 'var(--surface-2)', color: 'var(--text)', fontSize: 14,
                    outline: 'none', marginBottom: 22, fontFamily: 'inherit',
                    boxShadow: nit.trim() ? '0 0 0 3px var(--primary-soft)' : 'none',
                    transition: 'all .18s',
                  }}
                />
              </>
            )}

            {/* Espaciado cuando no se muestra NIT */}
            {(!emailOk || isInternal) && <div style={{ marginBottom: 6 }} />}

            {/* Tipo de usuario */}
            <label style={{ fontSize: 14, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 10 }}>
              Tipo de usuario
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 22 }}>
              {[
                { value: 'contador', label: 'Contador', desc: 'Gestiono múltiples empresas', emoji: '🧮' },
                { value: 'pyme',     label: 'PYME',     desc: 'Administro mi propia empresa', emoji: '🏢' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setUserType(opt.value)}
                  style={{
                    padding: '12px 14px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                    border: `1px solid ${userType === opt.value ? 'var(--primary)' : 'var(--border)'}`,
                    background: userType === opt.value ? 'var(--primary-soft)' : 'var(--surface-2)',
                    transition: 'all .18s',
                    boxShadow: userType === opt.value ? '0 0 0 2px var(--primary-soft)' : 'none',
                  }}
                >
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{opt.emoji}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{opt.label}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 2 }}>{opt.desc}</div>
                </button>
              ))}
            </div>

            {/* País */}
            <label style={{ fontSize: 14, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 10 }}>
              País / Versión
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 26 }}>
              {COUNTRIES.map(c => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCountry(c.code)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
                    border: `1px solid ${country === c.code ? 'var(--primary)' : 'var(--border)'}`,
                    background: country === c.code ? 'var(--primary-soft)' : 'var(--surface-2)',
                    fontSize: 14, fontWeight: country === c.code ? 700 : 400,
                    color: country === c.code ? 'var(--text)' : 'var(--text-muted)',
                    transition: 'all .18s',
                    boxShadow: country === c.code ? '0 0 0 2px var(--primary-soft)' : 'none',
                  }}
                >
                  <span className={`flag ${c.flagClass}`} />
                  {c.name}
                </button>
              ))}
            </div>

            {/* Error */}
            {error && (
              <p style={{ fontSize: 14, color: 'var(--danger)', textAlign: 'center', marginBottom: 14 }}>{error}</p>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={!canSubmit}
              style={{
                width: '100%', padding: '12px', borderRadius: 10, border: 'none',
                background: canSubmit ? 'var(--primary)' : '#ccc',
                color: '#fff', fontSize: 14, fontWeight: 700,
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                boxShadow: canSubmit ? '0 3px 14px rgba(48,171,169,.3)' : 'none',
                transition: 'all .18s', fontFamily: 'inherit',
                opacity: loading ? .7 : 1,
              }}
            >
              {loading ? 'Iniciando…' : 'Continuar →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
