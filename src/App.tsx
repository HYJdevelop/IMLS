import './Lookup.css'

function App() {
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
          <form action="/lookup" method="post">
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
                pattern="[0-9]+"
                title="請輸入不含 s 的數字學號"
                required
              />
              <span className="input-mark" aria-hidden="true">#</span>
            </div>
            <p className="field-hint">輸入數字即可，不需要加上 s</p>
            <button className="submit-button" type="submit">
              <span>查詢帳密</span>
              <span className="button-arrow" aria-hidden="true">→</span>
            </button>
          </form>
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

export default App
