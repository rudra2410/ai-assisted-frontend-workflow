import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('AI assistant settings', () => {
  it('renders the default preferences', () => {
    render(<App />)

    expect(screen.getByLabelText('Assistant name')).toHaveValue('Nova')
    expect(screen.getByLabelText('Response style')).toHaveValue('balanced')
    expect(screen.getByLabelText('Preferred language')).toHaveValue('English')
    expect(screen.getByLabelText(/email product updates/i)).toBeChecked()
  })

  it('announces an error when the assistant name is blank', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.clear(screen.getByLabelText('Assistant name'))
    await user.click(screen.getByRole('button', { name: 'Save settings' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Enter an assistant name.')
    expect(screen.getByLabelText('Assistant name')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('saves valid settings and trims the assistant name', async () => {
    const user = userEvent.setup()
    render(<App />)

    const nameInput = screen.getByLabelText('Assistant name')
    await user.clear(nameInput)
    await user.type(nameInput, '  Atlas  ')
    await user.selectOptions(screen.getByLabelText('Response style'), 'concise')
    await user.click(screen.getByRole('button', { name: 'Save settings' }))

    expect(nameInput).toHaveValue('Atlas')
    expect(screen.getByRole('status')).toHaveTextContent('Settings saved successfully.')
  })

  it('restores every setting to its default value', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.clear(screen.getByLabelText('Assistant name'))
    await user.type(screen.getByLabelText('Assistant name'), 'Atlas')
    await user.selectOptions(screen.getByLabelText('Preferred language'), 'Gujarati')
    await user.click(screen.getByLabelText(/email product updates/i))
    await user.click(screen.getByRole('button', { name: 'Reset' }))

    expect(screen.getByLabelText('Assistant name')).toHaveValue('Nova')
    expect(screen.getByLabelText('Preferred language')).toHaveValue('English')
    expect(screen.getByLabelText(/email product updates/i)).toBeChecked()
    expect(screen.getByRole('status')).toHaveTextContent('Settings reset to defaults.')
  })
})
