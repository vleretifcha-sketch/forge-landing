import type { Metadata } from "next";
import { LegalShell } from "@/components/landing/legal-shell";
import { CONTACT_INBOX } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Legal Notice — Forge",
  description: "Legal notice and publisher information for the Forge website.",
};

export default function LegalNoticePage() {
  return (
    <LegalShell title="Legal Notice">
      <h2>Publisher</h2>
      <p>
        This website presents Forge, a white-labeled coaching platform. It is published by Gust Design,
        operating the Forge brand.
      </p>
      <p>
        Contact: <a href={`mailto:${CONTACT_INBOX}`}>{CONTACT_INBOX}</a>
        <br />
        Instagram:{" "}
        <a href="https://www.instagram.com/forge.coaching.app/" target="_blank" rel="noreferrer">
          @forge.coaching.app
        </a>
      </p>

      <h2>Hosting</h2>
      <p>
        The site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States.
        <br />
        Website:{" "}
        <a href="https://vercel.com" target="_blank" rel="noreferrer">
          vercel.com
        </a>
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Forge name, logo, copy, layout, and visuals on this site are owned by Gust Design or used with
        permission. You may not copy, scrape, or reuse them commercially without written consent, except for
        short quotations with credit, or as allowed by mandatory law.
      </p>

      <h2>Liability for content</h2>
      <p>
        We take care to keep this site accurate. Information about features and pricing may change. The{" "}
        <a href="/terms">Terms of Sale</a> prevail over marketing copy if there is a conflict. External links
        (including Calendly and Instagram) are the responsibility of their publishers.
      </p>

      <h2>Personal data</h2>
      <p>
        How we process personal data on this website is described in the <a href="/privacy">Privacy Policy</a>.
      </p>
    </LegalShell>
  );
}
