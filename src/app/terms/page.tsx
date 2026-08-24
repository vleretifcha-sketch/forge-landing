import type { Metadata } from "next";
import { LegalShell } from "@/components/landing/legal-shell";
import { CONTACT_INBOX } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Terms of Sale — Forge",
  description: "Terms of sale for the Forge white-labeled coaching platform.",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Sale">
      <p>
        These terms govern the sale of Forge, the white-labeled coaching platform operated by Gust Design
        (“we”, “us”). By requesting a founding spot, booking a call, or paying for Forge, you agree to them.
        They sit alongside our <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>1. Who these terms are for</h2>
      <p>
        Forge is sold to professional coaches and coaching businesses. You confirm that you are acting in a
        professional capacity, not as a consumer buying for private use. Mandatory consumer protections that
        cannot be waived still apply where the law requires it.
      </p>

      <h2>2. The service</h2>
      <p>
        Forge is a white-labeled app for coaches and their athletes: check-ins, diets, training, supplements,
        bloodwork, and related tracking, under your brand (logo, colors, favicon). Exact features are those
        described on this website at the time of order, plus anything we confirm in writing.
      </p>
      <p>
        We do not provide medical, nutritional, or training advice. You remain solely responsible for the
        programs, protocols, and substances you assign, and for complying with the laws that apply to your
        coaching practice.
      </p>

      <h2>3. Offers</h2>
      <ul>
        <li>
          <strong>Solo Coach — Founding Member:</strong> 990 AUD one-time setup, then 49 AUD per month, locked
          for life for that account. After founding spots close, the monthly rate for new solo coaches is 99 AUD.
        </li>
        <li>
          <strong>Multi-coaches:</strong> custom scope, hierarchy, and pricing, agreed after a discovery call.
        </li>
      </ul>
      <p>
        Prices are in Australian dollars. Applicable taxes (including GST or VAT) are added if required. A
        founding rate is locked only once we have confirmed your order in writing and the setup fee has been
        paid.
      </p>

      <h2>4. How a contract is formed</h2>
      <p>
        The website is an invitation to treat, not a binding offer. You request a spot or a call through the
        contact form or Calendly. A contract is formed when we accept in writing (email is enough) and you pay
        the setup fee, or when we both sign a separate agreement for a multi-coach project.
      </p>
      <p>
        Founding spots are limited. We may refuse an order, including if spots are gone or if we cannot deliver
        for your use case.
      </p>

      <h2>5. Setup and delivery</h2>
      <p>
        After payment of the setup fee we configure your white-labeled instance (branding and access). Timing
        is confirmed by email. Delivery is electronic: you get access to the coach dashboard and athlete app.
        You must give us the assets we need (logo, colors, favicon) without undue delay.
      </p>

      <h2>6. Subscription, billing, cancellation</h2>
      <p>
        After setup, the monthly fee is billed in advance. The founding monthly rate stays locked for the life
        of that Solo Coach account while the subscription remains active. If you cancel and later return, the
        rate then in force may apply.
      </p>
      <p>
        You may cancel the monthly subscription at any time by emailing{" "}
        <a href={`mailto:${CONTACT_INBOX}`}>{CONTACT_INBOX}</a>. Cancellation takes effect at the end of the
        period already paid. We do not prorate a started month unless the law requires it.
      </p>

      <h2>7. Refunds</h2>
      <p>
        The 990 AUD setup covers onboarding and white-label configuration. It is refundable in full if we have
        not started work. Once branding work or instance setup has started, the setup fee is non-refundable,
        except where mandatory law says otherwise.
      </p>
      <p>
        Monthly fees already paid are not refunded for time unused, except where mandatory law says otherwise.
        If we permanently stop providing Forge to you for a reason that is not your breach, we will refund any
        prepaid unused monthly period.
      </p>

      <h2>8. Your account and athlete data</h2>
      <p>
        You are responsible for your coaches’ and athletes’ use of the app, for the accuracy of the data you
        enter, and for having a lawful basis to collect athlete data. For athlete and coaching data processed
        inside the product, you are the controller; we process it on your instructions to run Forge. This
        marketing site is covered separately by the <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>9. Acceptable use</h2>
      <p>You must not:</p>
      <ul>
        <li>resell Forge as your own platform without a written reseller agreement;</li>
        <li>probe, disrupt, or overload the service;</li>
        <li>use Forge to send unlawful content or to process data you have no right to process.</li>
      </ul>
      <p>We may suspend access if these terms are breached, after notice where reasonably possible.</p>

      <h2>10. Availability and changes</h2>
      <p>
        We aim for a stable service but do not guarantee uninterrupted access. We may update features as long
        as the service remains a white-labeled coaching platform of equivalent purpose. We may update these
        terms; the new version applies after we post it here and, for material changes, after we email you.
      </p>

      <h2>11. Liability</h2>
      <p>
        We are not liable for coaching outcomes, athlete health, or decisions you make from data in the app.
        To the extent allowed by law, our total liability for a claim is limited to the fees you paid us in
        the 12 months before the claim. We do not exclude liability that the law does not allow us to exclude
        (including for fraud, or death or personal injury caused by negligence where that rule applies).
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${CONTACT_INBOX}`}>{CONTACT_INBOX}</a> or the{" "}
        <a href="/#contact">contact form</a>.
      </p>
    </LegalShell>
  );
}
