import { useState, type FormEvent } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const FORM_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please add your name.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 10) e.message = 'A few more words, please (10+ characters).';
  return e;
}

/** "Send a message" form via Formspree, same approach as Marzouk's portfolio. */
export default function ContactForm() {
  if (!FORM_ID) {
    return (
      <div className="letter">
        <FormFields disabled errors={{}} />
        <p className="form-note">
          The contact form isn’t connected yet. Set <code>VITE_FORMSPREE_ID</code> in <code>.env.local</code>.
        </p>
      </div>
    );
  }
  return <LiveForm formId={FORM_ID} />;
}

function LiveForm({ formId }: { formId: string }) {
  const [state, submit] = useForm(formId);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    const data = new FormData(ev.currentTarget);
    const fields = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    };
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      ev.preventDefault();
      const first = ev.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }
    return submit(ev);
  };

  if (state.succeeded) {
    return (
      <div className="letter form-success" role="status">
        <Seal />
        <h3>Your letter has been sealed and sent.</h3>
        <p>Thank you for writing. I’ll reply as soon as I can.</p>
      </div>
    );
  }

  const serverError = state.errors && !state.submitting && state.errors.getFormErrors().length > 0;

  return (
    <form className="letter" onSubmit={onSubmit} noValidate>
      <FormFields errors={errors} state={state} />
      <div className="form-actions">
        <p className={`form-status${serverError ? ' is-error' : ''}`} role="status" aria-live="polite">
          {state.submitting
            ? 'Sending…'
            : serverError
              ? 'Something went wrong sending your message. Please try again.'
              : ''}
        </p>
        <button type="submit" className="btn btn-seal" disabled={state.submitting}>
          {state.submitting ? 'Sealing…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}

function FormFields({
  errors,
  state,
  disabled,
}: {
  errors: Errors;
  state?: ReturnType<typeof useForm>[0];
  disabled?: boolean;
}) {
  const field = (name: keyof Fields, label: string, input: React.ReactNode) => (
    <div className="field">
      <label htmlFor={`cf-${name}`}>{label}</label>
      {input}
      {errors[name] && (
        <span className="field-error" id={`cf-${name}-error`}>
          {errors[name]}
        </span>
      )}
      {state && <ValidationError className="field-error" field={name} errors={state.errors} />}
    </div>
  );

  const aria = (name: keyof Fields) => ({
    id: `cf-${name}`,
    name,
    disabled,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `cf-${name}-error` : undefined,
  });

  return (
    <fieldset style={{ border: 'none', margin: 0, padding: 0 }} disabled={disabled}>
      {field('name', 'Your name', <input type="text" autoComplete="name" {...aria('name')} />)}
      {field('email', 'Your email', <input type="email" autoComplete="email" {...aria('email')} />)}
      {field('message', 'Your message', <textarea rows={6} {...aria('message')} />)}
    </fieldset>
  );
}

function Seal() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="30" fill="#6b1e22" />
      <circle cx="36" cy="36" r="24" fill="none" stroke="#d4b373" strokeWidth="1.5" strokeDasharray="2 3" />
      <g fill="none" stroke="#d4b373" strokeWidth="2" strokeLinecap="round">
        <path d="M36 22v26M28 48h16M24 28h24" />
        <path d="M26 28l-4 9h8zM46 28l-4 9h8z" />
      </g>
    </svg>
  );
}
