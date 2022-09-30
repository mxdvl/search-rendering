import { source } from "./deps.ts";

const styles: Record<
  Pillar,
  { border: string; headline: string; text: string; background: string }
> = {
  news: {
    border: source.news[400],
    headline: source.news[300],
    text: source.neutral[10],
    background: source.neutral[97],
  },
  culture: {
    border: source.culture[500],
    headline: source.culture[400],
    text: source.neutral[10],
    background: source.neutral[97],
  },
  opinion: {
    border: source.opinion[400],
    headline: source.opinion[400],
    text: source.neutral[10],
    background: source.opinion[800],
  },
  sport: {
    border: source.sport[400],
    headline: source.sport[400],
    text: source.neutral[10],
    background: source.neutral[97],
  },
  lifestyle: {
    border: source.lifestyle[400],
    headline: source.lifestyle[300],
    text: source.neutral[10],
    background: source.neutral[97],
  },
};

export const pillarStyles = (pillar: Pillar) =>
  [
    `.${pillar} {`,
    `--border: ${styles[pillar].border};`,
    `--headline: ${styles[pillar].headline};`,
    `--text: ${styles[pillar].text};`,
    `--background: ${styles[pillar].background};`,
    `}`,
  ].join("\n");

type PillarId = keyof typeof pillars;
export type Pillar = typeof pillars[PillarId];

export const isPillarId = (pillar = "none"): pillar is PillarId =>
  pillar in pillars;
export const isPillar = (pillar: string): pillar is Pillar =>
  Object.values(pillars).includes(pillar as Pillar);

export const pillars = {
  "pillar/news": "news",
  "pillar/opinion": "opinion",
  "pillar/sport": "sport",
  "pillar/lifestyle": "lifestyle",
  "pillar/arts": "culture",
  "pillar/books": "culture",
} as const;
