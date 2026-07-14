import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

function App() {
  const [assistantName, setAssistantName] = useState('Nova')
  const [responseStyle, setResponseStyle] = useState('balanced')
  const [language, setLanguage] = useState('English')
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!assistantName.trim()) {
      setMessage('Please enter an assistant name.')
      return
    }

    setMessage('Your AI assistant settings have been saved.')
  }

  return (
    <main className="page-shell">
      <section className="settings-card">
        <div className="heading-block">
          <p className="eyebrow">Workspace preferences</p>
          <h1>AI assistant settings</h1>
          <p>Choose how your assistant responds and keeps you updated.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Assistant name
            <input
              value={assistantName}
              onChange={(event) => setAssistantName(event.target.value)}
              placeholder="Enter a name"
            />
          </label>

          <label>
            Response style
            <select
              value={responseStyle}
              onChange={(event) => setResponseStyle(event.target.value)}
            >
              <option value="concise">Concise</option>
              <option value="balanced">Balanced</option>
              <option value="detailed">Detailed</option>
            </select>
          </label>

          <label>
            Preferred language
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Gujarati</option>
            </select>
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={emailUpdates}
              onChange={(event) => setEmailUpdates(event.target.checked)}
            />
            Email me product tips and updates
          </label>

          <button type="submit">Save settings</button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </section>
    </main>
  )
}

export default App
