"use client";

import type { FormEvent } from "react";
import type { Messages } from "@/messages/vi";
import { Button } from "@/components/ui/Button";

type Labels = Messages["contact"]["form"];

/** Builds a mailto: URL from the form values (exported for tests). */
export function buildMailto(
  to: string,
  values: { name: string; email: string; subject: string; message: string },
  defaultSubject: string,
): string {
  const subject = values.subject.trim() || defaultSubject;
  const body = [values.message.trim(), "", `— ${values.name.trim()}`, values.email.trim()].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const fields = [
  { id: "name", type: "text", autoComplete: "name", required: true },
  { id: "email", type: "email", autoComplete: "email", required: true },
  { id: "subject", type: "text", autoComplete: "off", required: false },
] as const;

/**
 * Design contact form without a backend: submitting opens the visitor's mail app
 * with everything pre-filled (no data reaches our server — Privacy §2).
 */
export function ContactForm({ to, labels }: { to: string; labels: Labels }) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "");
    window.location.href = buildMailto(
      to,
      { name: value("name"), email: value("email"), subject: value("subject"), message: value("message") },
      labels.defaultSubject,
    );
  };

  return (
    <form aria-label={labels.label} onSubmit={onSubmit} className="panel flex flex-col gap-5.5 rounded-2xl p-6 md:p-9">
      {fields.map((field) => (
        <div key={field.id} className="flex flex-col gap-2">
          <label htmlFor={`ct-${field.id}`} className="text-xs font-medium">
            {labels[field.id]}
          </label>
          <input
            id={`ct-${field.id}`}
            name={field.id}
            type={field.type}
            autoComplete={field.autoComplete}
            required={field.required}
            placeholder={labels[`${field.id}Placeholder`]}
            className="field"
          />
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <label htmlFor="ct-message" className="text-xs font-medium">
          {labels.message}
        </label>
        <textarea
          id="ct-message"
          name="message"
          rows={5}
          required
          placeholder={labels.messagePlaceholder}
          className="field resize-y"
        />
      </div>
      <Button type="submit" size="lg" className="w-full">
        {labels.submit}
      </Button>
      <p className="text-xs text-fg-muted">{labels.hint}</p>
    </form>
  );
}
