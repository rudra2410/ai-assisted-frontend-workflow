import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type ResponseStyle = 'concise' | 'balanced' | 'detailed'
type Language = 'English' | 'Hindi' | 'Gujarati'

interface AssistantSettings {
  assistantName: string
  responseStyle: ResponseStyle
  language: Language
  emailUpdates: boolean
}

const DEFAULT_SETTINGS: AssistantSettings = {
  assistantName: 'Nova',
  responseStyle: 'balanced',
  language: 'English',
  emailUpdates: true,
}

function validateAssistantName(value: string): string {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return 'Enter an assistant name.'
  }

  if (trimmedValue.length < 2) {
    return 'Use at least 2 characters.'
  }

  if (trimmedValue.length > 30) {
    return 'Use 30 characters or fewer.'
  }

  return ''
}

function App() {
  const [settings, setSettings] = useState<AssistantSettings>(DEFAULT_SETTINGS)
  const [nameError, setNameError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  const updateSetting = <Key extends keyof AssistantSettings>(
    key: Key,
    value: AssistantSettings[Key],
  ): void => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value,
    }))
    setStatusMessage('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const validationMessage = validateAssistantName(settings.assistantName)
    setNameError(validationMessage)

    if (validationMessage) {
      setStatusMessage('')
      return
    }

    setSettings((currentSettings) => ({
      ...currentSettings,
      assistantName: currentSettings.assistantName.trim(),
    }))
    setStatusMessage('Settings saved successfully.')
  }

  const handleReset = (): void => {
    setSettings(DEFAULT_SETTINGS)
    setNameError('')
    setStatusMessage('Settings reset to defaults.')
  }

  return (
    <main className="page-shell">
      <section className="settings-card" aria-labelledby="settings-title">
        <header className="heading-block">
          <p className="eyebrow">Workspace preferences</p>
          <h1 id="settings-title">AI assistant settings</h1>
          <p>Control how your assistant responds and sends product updates.</p>
        </header>

        <form noValidate onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="assistant-name">Assistant name</label>
            <input
              id="assistant-name"
              name="assistantName"
              value={settings.assistantName}
              maxLength={31}
              aria-describedby={nameError ? 'assistant-name-error' : 'assistant-name-hint'}
              aria-invalid={Boolean(nameError)}
              onChange={(event) => {
                updateSetting('assistantName', event.target.value)
                if (nameError) setNameError('')
              }}
            />
            {nameError ? (
              <p id="assistant-name-error" className="field-error" role="alert">
                {nameError}
              </p>
            ) : (
              <p id="assistant-name-hint" className="field-hint">
                Use 2 to 30 characters.
              </p>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="response-style">Response style</label>
            <select
              id="response-style"
              name="responseStyle"
              value={settings.responseStyle}
              onChange={(event) =>
                updateSetting('responseStyle', event.target.value as ResponseStyle)
              }
            >
              <option value="concise">Concise</option>
              <option value="balanced">Balanced</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="language">Preferred language</label>
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={(event) => updateSetting('language', event.target.value as Language)}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Gujarati">Gujarati</option>
            </select>
          </div>

          <label className="checkbox-row" htmlFor="email-updates">
            <input
              id="email-updates"
              name="emailUpdates"
              type="checkbox"
              checked={settings.emailUpdates}
              onChange={(event) => updateSetting('emailUpdates', event.target.checked)}
            />
            <span>
              <strong>Email product updates</strong>
              <small>Receive occasional feature tips and release notes.</small>
            </span>
          </label>

          <div className="form-actions">
            <button className="secondary-button" type="button" onClick={handleReset}>
              Reset
            </button>
            <button className="primary-button" type="submit">
              Save settings
            </button>
          </div>

          {statusMessage && (
            <p className="status-message" role="status">
              {statusMessage}
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

export default App
