import type { CSSProperties, ReactNode } from "react";

const paths: Record<string, ReactNode> = {
  arrow: <path d="M5 19 19 5M5 5h14v14" />,
  down: <path d="M12 3v18m-7-7 7 7 7-7" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12 4 4L19 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  users: <><circle cx="9" cy="7" r="4" /><path d="M2 21v-3a6 6 0 0 1 12 0v3M16 3a4 4 0 0 1 0 8m2 3a6 6 0 0 1 4 5v2" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  home: <><path d="m3 10 9-7 9 7v11H3Z" /><path d="M9 21v-8h6v8" /></>,
  user: <><circle cx="12" cy="7" r="4" /><path d="M3 21a9 9 0 0 1 18 0" /></>,
  wallet: <><path d="M3 7V5l15-3v5M3 7h18v14H3Z" /><path d="M21 12h-6v5h6m-3-2.5h.1" /></>,
  target: <><circle cx="11" cy="13" r="9" /><circle cx="11" cy="13" r="4" /><path d="m11 13 9-9m-4 0h4v-3" /></>,
  receipt: <><path d="M5 2h14v20l-3-2-4 2-4-2-3 2Z" /><path d="M8 7h8M8 11h8M8 15h4" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 2v6m10-6v6M3 11h18m-13 4h1m6 0h1m-8 3h1" /></>,
  chart: <path d="M3 22h19M5 18v-6h4v6Zm6 0V7h4v11Zm6 0V2h4v16Z" />,
  food: <path d="M4 2v7a3 3 0 0 0 6 0V2M7 2v20M19 2c-4 4-5 8 0 10V2Zm0 10v10" />,
  mountain: <><path d="m2 17 7-11 6 9 3-5 4 7M2 21c3-3 5 3 8 0s5 3 8 0 3 0 4 0" /><circle cx="18" cy="4" r="2" /></>,
};

export function MarketingIcon({ name = "arrow", className, style }: { name?: string; className?: string; style?: CSSProperties }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} style={style}>{paths[name] ?? paths.arrow}</svg>;
}
