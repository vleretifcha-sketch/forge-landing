import type { Metadata } from "next";
import { LegalShell } from "@/components/landing/legal-shell";
import { CONTACT_INBOX } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacy Policy — Forge",
  description: "How Forge collects and uses personal data on this website.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy">
      <p>
        This policy explains how Gust Design (“we”, “us”), operating the Forge brand, handles personal data on
        this marketing website. It does not replace the data-processing terms that apply inside a customer’s
        Forge app (athlete logs, check-ins, and similar), where the coach is the controller.
      </p>

      <h2>1. Who is responsible</h2>
      <p>
        For data collected on this website, Gust Design is the controller. Contact:{" "}
        <a href={`mailto:${CONTACT_INBOX}`}>{CONTACT_INBOX}</a>.
      </p>

      <h2>2. Data we collect</h2>
      <ul>
        <li>
          <strong>Contact form:</strong> last name, first name, email, company (optional), interest
          (Founding Member or Multi-coaches), and your message.
        </li>
        <li>
          <strong>Discovery calls:</strong> name, email, and scheduling details you enter in Calendly.
        </li>
        <li>
          <strong>Technical data:</strong> IP address, browser, and similar logs generated when you load the
          site or send a form, as needed to operate and secure the service.
        </li>
      </ul>
      <p>We do not ask for payment-card numbers on this website.</p>

      <h2>3. Why we use it</h2>
      <ul>
        <li>to answer your request and discuss a Forge subscription (pre-contract steps);</li>
        <li>to schedule and run a discovery call;</li>
        <li>to keep the site secure and diagnose errors;</li>
        <li>to send follow-ups related to your enquiry, until you ask us to stop.</li>
      </ul>
      <p>We do not sell your data and we do not use it for unrelated advertising lists.</p>

      <h2>4. Legal bases</h2>
      <p>Depending on where you live, we rely on:</p>
      <ul>
        <li>steps at your request before a contract (replying to a founding or multi-coach enquiry);</li>
        <li>our legitimate interest in running and securing this website;</li>
        <li>consent, where a tool only runs if you use it (for example Calendly when you pick a slot);</li>
        <li>a legal obligation, if we must keep a record.</li>
      </ul>

      <h2>5. Who we share it with</h2>
      <p>We share data only with processors that help us run this site:</p>
      <ul>
        <li>
          <strong>Hosting:</strong> Vercel Inc. hosts the website.
        </li>
        <li>
          <strong>Contact delivery:</strong> messages may be sent through FormSubmit and/or email to our inbox.
        </li>
        <li>
          <strong>Scheduling:</strong> Calendly processes booking data under its own terms when you use the
          widget. See{" "}
          <a href="https://calendly.com/privacy" target="_blank" rel="noreferrer">
            Calendly’s privacy policy
          </a>
          .
        </li>
      </ul>
      <p>These providers may process data outside your country, including in the United States.</p>

      <h2>6. Cookies</h2>
      <p>
        This site itself does not set advertising cookies. Essential cookies or local storage may be used for
        the site to function. The Calendly embed may set its own cookies when you interact with the booking
        widget. You can control cookies in your browser.
      </p>

      <h2>7. Retention</h2>
      <p>
        Enquiry data is kept for up to 24 months after the last meaningful contact, then deleted or archived
        if the law requires a longer hold (for example accounting if you become a customer). Server logs are
        kept for a short period unless needed to investigate an incident.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Depending on applicable law (including GDPR and Australian Privacy Principles where they apply), you
        may ask to access, correct, delete, or export your data, to object to or restrict certain processing,
        and to withdraw consent. You may also lodge a complaint with your local supervisory authority.
      </p>
      <p>
        To exercise these rights, email <a href={`mailto:${CONTACT_INBOX}`}>{CONTACT_INBOX}</a>. We will
        respond within the time the law allows.
      </p>

      <h2>9. Security and children</h2>
      <p>
        We take reasonable technical and organisational measures to protect data. No method of transmission is
        fully secure. This website is not directed at children under 16, and we do not knowingly collect their
        data.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update this policy. The date at the top of the page is the latest version. Material changes
        will be reflected here before they apply to new collection.
      </p>
    </LegalShell>
  );
}
