interface ModelPickerProps {
  value: string
  onChange: (value: string) => void
}

const MODELS = ['gpt-5.2-codex', 'gpt-4.1', 'claude-sonnet']

export function ModelPicker({ value, onChange }: ModelPickerProps) {
  return (
    <label>
      Model:&nbsp;
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {MODELS.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </label>
  )
}
