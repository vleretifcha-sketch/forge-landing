export function ForgeLogo({ className }: { className?: string }) {
  return (
    <img
      src="/icons/logo-forge.png"
      alt="Forge"
      width={491}
      height={58}
      className={className}
    />
  );
}

export function MailIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
        stroke="white"
        strokeWidth="1.7"
      />
      <path d="M5.5 7.25 12 12.25l6.5-5" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="#0f1115" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MinusIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 10h12" stroke="#0f1115" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
