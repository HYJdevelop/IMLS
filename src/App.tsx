import { useState, type FormEvent } from 'react'
import { decodePassword } from './data/decodeCredential'
import { encodedCredentials } from './data/credentials.generated'
import './Lookup.css'

function App() {
  const [studentId, setStudentId] = useState('')
  const [credential, setCredential] = useState<{ account: string; password: string } | null>(null)
  const [message, setMessage] = useState('')
  const [notEnrolled, setNotEnrolled] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCredential(null)
    setMessage('')
    setNotEnrolled(false)

    const normalizedId = studentId.trim()
    if (!/^\d+$/.test(normalizedId)) {
      setMessage('請輸入不含 s 的數字學號。')
      return
    }

    const encoded = encodedCredentials[normalizedId]
    if (!encoded) {
      setNotEnrolled(true)
      return
    }

    setLoading(true)
    try {
      const password = await decodePassword(normalizedId, encoded)
      setCredential({ account: `s${normalizedId}`, password })
    } catch {
      setMessage('無法解碼查詢資料，請重新產生帳密資料後再試。')
    } finally {
      setLoading(false)
    }
  }

  async function copyValue(value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setMessage('已複製到剪貼簿。')
    } catch {
      setMessage('無法使用剪貼簿，請手動選取並複製。')
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="資訊科技與媒體識讀帳密系統首頁">
          <img className="brand-logo" src="https://www.hyjdevelop.com/logo.png" alt="HYJdevelop 標誌" referrerPolicy="no-referrer" />
          <span>資訊科技與媒體識讀帳密系統</span>
        </a>
      </header>

      <section className="lookup-layout" aria-labelledby="page-title">
        <div className="intro">
          <p className="eyebrow">ACCOUNT ACCESS <span>／</span> STUDENT</p>
          <h1 id="page-title">帳號與密碼</h1>
          <p className="intro-copy">登入系統密碼查詢</p>
          <div className="graphic" aria-hidden="true">
            <span className="graphic-ring" />
            <span className="graphic-line" />
            <span className="graphic-tag">STUDENT<br />IDENTITY</span>
            <span className="graphic-number">01</span>
          </div>
        </div>

        <div className="form-panel">
          <form className="lookup-form" onSubmit={handleSubmit}>
            <label htmlFor="student-id">學生學號</label>
            <div className="input-wrap">
              <input
                id="student-id"
                name="student_id"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="輸入學號"
                value={studentId}
                onChange={(event) => setStudentId(event.target.value)}
                aria-describedby="student-id-hint lookup-message"
                required
              />
              <span className="input-mark" aria-hidden="true">#</span>
            </div>
            <p className="field-hint" id="student-id-hint">輸入數字即可，不需要加上 s</p>
            <button className="submit-button" type="submit" disabled={loading}>
              <span>{loading ? '查詢中' : '查詢帳密'}</span>
              <span className="button-arrow" aria-hidden="true">→</span>
            </button>
            <p className={`form-message${message || notEnrolled ? ' is-visible' : ''}`} id="lookup-message" role="status" aria-live="polite">
              {notEnrolled ? (
                <>
                  您未加入這門課。若有問題，請聯絡{' '}
                  <a href="mailto:hyjdevelop@gmail.com">hyjdevelop@gmail.com</a>，我們會幫你維護名單。
                </>
              ) : message}
            </p>
          </form>

          {credential && (
            <section className="credential-result" aria-live="polite">
              <div className="result-heading">
                <span className="result-check" aria-hidden="true">✓</span>
                <div>
                  <h2>查詢完成</h2>
                  <p>請妥善保管個人登入資料</p>
                </div>
              </div>
              <div className="credential-row">
                <span className="credential-label">帳號</span>
                <output className="credential-value">{credential.account}</output>
                <button className="copy-button" type="button" onClick={() => void copyValue(credential.account)} aria-label="複製帳號" title="複製帳號">
                  <CopyIcon />
                </button>
              </div>
              <div className="credential-row">
                <span className="credential-label">密碼</span>
                <output className="credential-value">{credential.password}</output>
                <button className="copy-button" type="button" onClick={() => void copyValue(credential.password)} aria-label="複製密碼" title="複製密碼">
                  <CopyIcon />
                </button>
              </div>
              <button className="reset-button" type="button" onClick={() => { setCredential(null); setStudentId(''); setMessage('') }}>
                查詢其他學號
              </button>
            </section>
          )}
        </div>
      </section>

      <footer className="page-footer">
        <span>資訊科技與媒體識讀帳密系統</span>
        <span className="footer-attribution">
          請勿將密碼提供給他人 · 由{' '}
          <a href="https://hyjdevelop.com" target="_blank" rel="noreferrer">HYJdevelop</a> 開發
        </span>
      </footer>
    </main>
  )
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
    </svg>
  )
}

export default App
