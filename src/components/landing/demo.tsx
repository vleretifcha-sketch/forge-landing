import { Container, SectionBadge, SectionTitle } from "@/components/landing/ui";

export function DemoSection() {
  return (
    <section id="demo" className="mt-[80px] w-full md:mt-[135px]">
      <Container className="flex flex-col items-center gap-12">
        <div className="flex w-full flex-col items-center gap-2">
          <SectionBadge>Demo</SectionBadge>
          <SectionTitle align="center">
            See Forge
            <br />
            in action.
          </SectionTitle>
        </div>

        <div className="demo-video w-full overflow-hidden rounded-3xl bg-ink">
          <video
            src="/videos/demo.mp4"
            controls
            playsInline
            preload="metadata"
            className="aspect-[1920/1202] w-full bg-ink"
          />
        </div>
      </Container>
    </section>
  );
}
