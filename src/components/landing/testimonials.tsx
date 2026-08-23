import { Container, SectionBadge, SectionTitle } from "@/components/landing/ui";

const REVIEWS = [
  {
    quote:
      "Check-ins used to live in a Google Form. Now the template is mine — weight, photos, whatever I need — and I see who’s still due before I open the rest of the day.",
    name: "Maya Chen",
    role: "Online coach",
    initials: "MC",
    tone: "#131515",
  },
  {
    quote:
      "I open the app and today’s meals are already there. I tick them off, log my session set by set, and I don’t have to message my coach a screenshot of a spreadsheet.",
    name: "Jordan Hale",
    role: "Athlete",
    initials: "JH",
    tone: "#0023ff",
  },
  {
    quote:
      "Clients think it’s our software. Logo on login, our colors on the tab bar. We’re not sending people to a generic tool with someone else’s name on it.",
    name: "Luca Rossi",
    role: "Gym owner",
    initials: "LR",
    tone: "#0db596",
  },
  {
    quote:
      "Prep check-ins are photos, measurements, and a few scales — not a wall of questions. I built it once, assigned it, and the photos land in one place to compare.",
    name: "Priya Nair",
    role: "Prep coach",
    initials: "PN",
    tone: "#9d00ff",
  },
  {
    quote:
      "They log weight and reps while they train. I see the session fill in live — not a summary two days later when the numbers are already fuzzy.",
    name: "Sam Okonkwo",
    role: "Strength coach",
    initials: "SO",
    tone: "#131515",
  },
  {
    quote:
      "I build the diet once, training-day and rest-day. Macros update as I add foods. They only see the variant that applies today — I’m not explaining two PDFs.",
    name: "Elena Voss",
    role: "Nutrition coach",
    initials: "EV",
    tone: "#ff0149",
  },
  {
    quote:
      "Steps, cardio, check-ins, the next session — it used to be four apps and a shared Drive. Now I look at one dashboard and I know who actually needs me.",
    name: "Chris Park",
    role: "Personal trainer",
    initials: "CP",
    tone: "#002aff",
  },
  {
    quote:
      "The athlete side is a phone. Five tabs, today’s plan, nothing extra. That’s why they actually fill the check-in instead of ignoring another link.",
    name: "Amira Benali",
    role: "Studio owner",
    initials: "AB",
    tone: "#0b2cff",
  },
  {
    quote:
      "Protocols, supplements, bloodwork, and training sit in the same workspace. I stopped chasing markers across chats because the week is already there.",
    name: "Nate Brooks",
    role: "Bodybuilding coach",
    initials: "NB",
    tone: "#131515",
  },
] as const;

function Card({
  quote,
  name,
  role,
  initials,
  tone,
}: (typeof REVIEWS)[number]) {
  return (
    <article className="flex w-full flex-col gap-[54px] rounded-3xl bg-chip p-6">
      <p className="text-lg font-medium leading-[1.3] tracking-[-0.36px] text-muted">{quote}</p>
      <div className="flex items-center gap-3">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-bold tracking-[-0.28px] text-white"
          style={{ backgroundColor: tone }}
          aria-hidden
        >
          {initials}
        </div>
        <div className="flex h-[43px] flex-col justify-between">
          <p className="text-lg font-bold leading-[1.3] tracking-[-0.36px] text-[#131515]">{name}</p>
          <p className="text-sm font-bold leading-[1.3] tracking-[-0.28px] text-muted">{role}</p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="mt-[80px] w-full md:mt-[135px]">
      <Container className="flex flex-col items-center gap-14">
        <div className="flex w-full flex-col items-center gap-2">
          <SectionBadge>Testimonials</SectionBadge>
          <SectionTitle align="center">
            How people use their
            <br />
            app everyday.
          </SectionTitle>
        </div>
        <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <Card key={review.name} {...review} />
          ))}
        </div>
      </Container>
    </section>
  );
}
