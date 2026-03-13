import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import PathSelector from '@/components/ui/PathSelector';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const FORMSPREE_URL = `https://formspree.io/f/${import.meta.env.PUBLIC_FORMSPREE_ID || 'test'}`;

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [path, setPath] = useState('project');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          enquiry_type: path,
          message,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const transition: Transition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };
  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition,
      };

  return (
    <div className="w-full max-w-lg">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            {...motionProps}
            className="text-center py-space-8"
            role="status"
            aria-live="polite"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
              <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-h3 font-display font-semibold text-text-primary">
              Thanks{name ? ` ${name}` : ''} — I'll reply within 24 hours.
            </h3>
            <p className="mt-2 text-body-small text-text-secondary">
              Check your inbox for a confirmation from Formspree.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            {...motionProps}
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            <div>
              <label htmlFor="contact-name" className="block text-body-small text-text-primary mb-2">
                Name <span className="text-text-muted">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-border rounded-md text-body-small text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-body-small text-text-primary mb-2">
                Email <span className="text-text-muted">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-border rounded-md text-body-small text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <PathSelector value={path} onChange={setPath} />

            <div>
              <label htmlFor="contact-message" className="block text-body-small text-text-primary mb-2">
                Message <span className="text-text-muted">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-border rounded-md text-body-small text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-y"
                placeholder="Tell me about your project or what you're looking for..."
              />
            </div>

            {status === 'error' && (
              <div className="p-3 rounded-md bg-error/10 border border-error/20" role="alert">
                <p className="text-body-small text-error">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-body-small font-medium rounded-md transition-colors min-h-[44px]"
            >
              {status === 'submitting' ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                'Send it'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
