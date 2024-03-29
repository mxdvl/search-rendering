import { Handler, serve } from "https://deno.land/std@0.167.0/http/server.ts";
import { parseHTML } from "https://esm.sh/linkedom@0.14.16";

import { libs, zod } from "./src/deps.ts";
import { fontBase, fonts } from "./src/fonts.ts";
import { fetchJSON } from "./src/json.ts";
import { isPillarId, Pillar, pillars, pillarStyles } from "./src/pillars.ts";
import { build } from "./src/styles.ts";

const fields = zod.object({
  thumbnail: zod.string().optional(),
  trailText: zod.string().optional(),
  byline: zod.string().optional(),
});

type Result = zod.output<typeof result>;
const result = zod.object({
  pillarId: zod.string().optional(),
  webPublicationDate: zod.string(),
  webTitle: zod.string(),
  webUrl: zod.string(),
  fields,
});

const schema = zod.object({
  response: zod.object({
    status: zod.literal("ok"),
    results: zod.array(result),
  }),
});

const cache = new Map<string, Result[]>();

const getResults = async (q: string | null): Promise<Result[]> => {
  if (!q) return [];

  const cached = cache.get(q);
  if (cached) return cached;

  const params = new URLSearchParams({
    q,
    orderBy: "newest", // not "relevance"
    "page-size": String(24),
    "show-fields": ["thumbnail", "trailText", "byline"].join(","),
    "api-key": "test",
  });

  const url = new URL(
    `search?${params.toString()}`,
    "https://content.guardianapis.com/",
  );

  console.log(url.toString());

  const {
    response: { results },
  } = await fetchJSON(url, { parser: schema.parse });

  cache.set(q, results);

  setTimeout(() => cache.delete(q), 12_000);

  return results;
};

const handler: Handler = async ({ url }) => {
  const { startTime } = performance.mark("start");

  const { pathname, searchParams } = new URL(url);

  if (pathname !== "/") return new Response("Not found", { status: 404 });

  const index = new URL(import.meta.resolve("./public/index.html"));

  const body = await Deno.readTextFile(index);

  const { document } = parseHTML(body);

  const search = searchParams.get("search");
  const results = await getResults(search);

  const input = document.querySelector<HTMLInputElement>("input[name=search]");
  input?.setAttribute("value", search ?? "");

  const resultPillars = new Set<Pillar>();

  const ul = document.querySelector("ul");
  for (
    const {
      webUrl,
      webTitle,
      webPublicationDate,
      pillarId,
      fields: { trailText, thumbnail, byline },
    } of results
  ) {
    const li = document.createElement("li");
    li.classList.add("result");
    if (isPillarId(pillarId)) {
      const pillar = pillars[pillarId];
      resultPillars.add(pillar);
      li.classList.add(pillar);
    }

    const date = libs.timeAgo(new Date(webPublicationDate).getTime());

    li.innerHTML = `
<a href="${webUrl}">
    ${
      thumbnail
        ? `<img src="${thumbnail}" role="presentation" width="300" height="180" />`
        : ""
    }
    <h2>${webTitle}</h2>
    <h3>${byline}</h3>
    ${trailText && `<p>${trailText}</p>`}
    <span class="spacer"></span>
    <p class="date">${date}</p>
</a>`;

    ul?.appendChild(li);
  }

  const styles = document.createElement("style");
  styles.innerText = build([...resultPillars].map(pillarStyles));
  document.head.appendChild(styles);

  for (const { file } of fonts) {
    const link = document.createElement("link");
    link.setAttribute("rel", "preload");
    link.setAttribute("as", "font");
    link.setAttribute("crossorigin", "");
    link.setAttribute("href", `${fontBase}/${file}.woff2`);

    document.head.appendChild(link);
  }

  const duration = Math.ceil(performance.now() - startTime);

  console.info({
    search,
    results: results.length,
    duration,
  });

  document
    .querySelector("#duration")
    ?.prepend(document.createTextNode(String(duration)));

  return new Response(document.toString(), {
    status: 200,
    headers: {
      "Content-Type": "text/html",
      "X-Render-Time": `${duration}ms`,
    },
  });
};

await serve(handler, { port: 8080 });
