import { Handler, serve } from "https://deno.land/std@0.158.0/http/server.ts";
import { parseHTML } from "https://esm.sh/linkedom@0.14.16";
import { zod } from "./src/deps.ts";
import { fetchJSON } from "./src/json.ts";

type Result = zod.output<typeof result>;
const result = zod.object({
  pillarId: zod.string(),
  webPublicationDate: zod.string(),
  webTitle: zod.string(),
  webUrl: zod.string(),
});
const schema = zod.object({
  response: zod.object({
    status: zod.literal("ok"),
    results: zod.array(result),
  }),
});

const getResults = async (q: string | null): Promise<Result[]> => {
  if (!q) return [];

  const params = new URLSearchParams({
    q,
    "api-key": "test",
  });

  const url = new URL(
    `search?${params.toString()}`,
    "https://content.guardianapis.com/"
  );

  const {
    response: { results },
  } = await fetchJSON(url, { parser: schema.parse });

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

  const duration = Math.ceil(performance.now() - startTime);

  console.info({
    search,
    results: results.length,
    duration,
  });

  const input = document.querySelector<HTMLInputElement>("input[name=search]");
  input?.setAttribute("value", search ?? "");

  const ul = document.querySelector("ul");
  for (const { webUrl, webTitle, webPublicationDate } of results) {
    const li = document.createElement("li");
    li.innerHTML = `
    <a href="${webUrl}">${webTitle}</a> ${new Date(webPublicationDate)
      .toISOString()
      .slice(0, 10)}
    `;
    ul?.appendChild(li);
  }

  return new Response(document.toString(), {
    status: 200,
    headers: {
      "Content-Type": "text/html",
      "X-Render-Time": `${duration}ms`,
    },
  });
};

await serve(handler, { port: 8080 });
