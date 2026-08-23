import { ForgeLogo, InstagramIcon } from "@/components/landing/icons";
import { Button, Container } from "@/components/landing/ui";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#use-case", label: "Use Case" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-[80px] w-full pb-[140px] md:mt-[100px] md:pb-[180px]">
      <Container>
        <div className="flex flex-col gap-8 rounded-3xl bg-ink p-8 md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <a
              href="#top"
              aria-label="Forge"
              className="flex h-12 w-fit shrink-0 items-center rounded-xl bg-white px-3.5"
            >
              <ForgeLogo className="h-4 w-auto" />
            </a>

            <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-bold tracking-[-0.32px] text-white/70 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <Button href="#contact" variant="solid-white" className="w-fit">
              Get your own app
            </Button>
          </div>

          <div className="h-px w-full bg-white/10" />

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium tracking-[-0.28px] text-white/50">
              © {new Date().getFullYear()} Forge. All rights reserved.
            </p>
            <a
              href="https://www.instagram.com/forge.coaching.app/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex size-8 items-center justify-center text-white/50 hover:text-white"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
