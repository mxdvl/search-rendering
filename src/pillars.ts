import { source } from "./deps.ts";

export const pillarStyles = (pillar: Pillar) => {
  switch (pillar) {
    case "news":
      return [
        `.news {`,
        `--text: ${source.news[400]};`,
        `--background: ${source.news[800]};`,
        `}`,
      ].join("\n");
    case "culture":
      return [
        `.culture {`,
        `--text: ${source.culture[400]};`,
        `--background: ${source.culture[700]};`,
        `}`,
      ].join("\n");
    default:
      return `/* no styles for ${pillar} */`;
  }
};

type PillarId = keyof typeof pillars;
export type Pillar = typeof pillars[PillarId];

export const isPillarId = (pillar: string): pillar is PillarId =>
  pillar in pillars;
export const isPillar = (pillar: string): pillar is Pillar =>
  Object.values(pillars).includes(pillar as Pillar);

export const pillars = {
  "pillar/news": "news",
  "pillar/arts": "culture",
  "pillar/books": "culture",
} as const;
