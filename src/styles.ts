import { source } from "./deps.ts";
import { transform } from "./css.ts";

const version = (major: number, minor = 0, patch = 0) =>
  (major << 16) | (minor << 8) | (patch << 4);

const _styles = `
body {
    font-family: ${source.body.medium()};
}
`;

export const build = (extras: string[]) => {
  const start = performance.now();

  const { code } = transform({
    filename: "styles.css",
    code: new TextEncoder().encode([...extras].join("\n\n")),
    minify: false,
    targets: {
      chrome: version(88),
    },
  });

  const css = new TextDecoder().decode(code);

  const duration = Math.ceil(performance.now() - start);

  console.info(`Compiled CSS in ${duration}ms`);
  return css;
};
