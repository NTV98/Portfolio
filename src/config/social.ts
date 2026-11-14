/**
 * Contact channels. Leave a value undefined to hide it — no dead links are rendered.
 * While the email is a placeholder the contact form stays disabled (honest state).
 */
export const social: {
  email?: string;
  /** Phone shown as text + tel: link, e.g. "0912 345 678". */
  phone?: string;
  /**
   * Zalo phone number (digits, e.g. "0912345678") → renders a "Chat Zalo" button linking to https://zalo.me/<number>.
   * Usually the same number as `phone`.
   */
  zalo?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  others: { label: string; url: string }[];
} = {
  email: "tuanvuab@gmail.com",
  phone: undefined,
  zalo: undefined,
  github: "https://github.com/NTV98",
  linkedin: undefined,
  facebook: undefined,
  others: [],
};
