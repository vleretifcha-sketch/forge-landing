import type { ReactNode } from "react";
import { SiteFooter } from "@/components/landing/footer";
import { FooterBlur, Header } from "@/components/landing/hero";
import { Container } from "@/components/landing/ui";
import { LEGAL_NAV, LEGAL_UPDATED } from "@/lib/legal";

export function LegalShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-clip bg-page">
      <Header />
      <FooterBlur />
      <main className="pt-28 md:pt-[180px]">
        <Container className="pb-8">
          <div className="max-w-[760px]">
          <a href="/" className="text-sm font-bold tracking-[-0.28px] text-muted hover:text-ink">
            ← Back to Forge
          </a>
          <h1 className="mt-6 font-[family-name:var(--font-cabinet)] text-[36px] font-medium leading-none tracking-[-0.72px] text-ink md:text-[52px] md:tracking-[-1.04px]">
            {title}
          </h1>
          <p className="mt-3 text-sm font-medium tracking-[-0.28px] text-muted">Last updated {LEGAL_UPDATED}</p>
          <div className="legal-copy mt-10">{children}</div>
          <nav className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-black/10 pt-6" aria-label="Legal">
            {LEGAL_NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold tracking-[-0.28px] text-muted hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}
