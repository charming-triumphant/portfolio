interface PathSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const PATHS = [
  { value: 'project', label: 'I have a project' },
  { value: 'role', label: 'Hiring or collaborating' },
] as const;

export default function PathSelector({ value, onChange }: PathSelectorProps) {
  return (
    <fieldset>
      <legend className="block text-body-small text-text-primary mb-2">
        What brings you here? <span className="text-text-muted">*</span>
      </legend>
      <div className="flex gap-3">
        {PATHS.map((path) => (
          <label
            key={path.value}
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md border text-body-small font-medium cursor-pointer transition-colors min-h-[44px] ${
              value === path.value
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border bg-surface text-text-secondary hover:border-text-muted'
            }`}
          >
            <input
              type="radio"
              name="enquiry_type"
              value={path.value}
              checked={value === path.value}
              onChange={() => onChange(path.value)}
              className="sr-only"
              required
            />
            {path.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
