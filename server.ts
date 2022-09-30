import { Handler, serve } from "https://deno.land/std@0.158.0/http/server.ts";
const port = 8080;

const handler: Handler = async ({ url }) => {
  const { startTime } = performance.mark("start");

  const { pathname, searchParams } = new URL(url);

  if (pathname !== "/") return new Response("Not found", { status: 404 });

  const index = new URL(import.meta.resolve("./public/index.html"));

  const body = await Deno.readFile(index);

  const duration = Math.ceil(performance.now() - startTime);
  
  console.info({
    search: searchParams.get("search"),
    duration,
  });

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
      "X-Render-Time": `${duration}ms`,
    },
  });
};

await serve(handler, { port });
