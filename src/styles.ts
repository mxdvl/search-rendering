import { source } from "./deps.ts";
import { transform } from "./css.ts";
import { fontFaces } from "./fonts.ts";

const version = (major: number, minor = 0, patch = 0) =>
  (major << 16) | (minor << 8) | (patch << 4);

const columnWidth = 300;
const gap = 20;

const styles = `
body {
  margin: 1rem auto;

  --columns: 1;
  --gaps: var(--columns) - 1;
  width: calc(var(--columns) * ${columnWidth}px + (var(--gaps)) * ${gap}px);

  ${source.body.medium()}
}

${Array.from({ length: 6 }, (_, i) => i * gap + (i + 1) * columnWidth)
  .map(
    (width, columns) =>
      `@media screen and (min-width: ${width}px) { body { --columns: ${columns}; } }`
  )
  .join("\n")}

h1 {
  ${source.titlepiece.small()};
  color: ${source.brand[400]};
}

#results {
  display: grid;
  padding: 0;
  list-style-type: none;
  width: min-content;

  grid-template-columns: repeat(var(--columns), ${columnWidth}px);
  gap: ${gap}px;
}

.result {
  position: relative;
  color: var(--text, black);
  background-color: var(--background, #eee);
}

.result a {
  display: block;
  text-decoration: none;
  color: inherit;
}

.result :is(h2, h3, h4) {
  margin: 0;
}

.result h2 {
  ${source.headline.xsmall()};
}

.result img {
  display: block;
  aspect-ratio: 5 / 3;
  width: 100%;
}

.result:hover {
  --text: #333;
  --background: #ccc;
}

${fontFaces.join("\n")}
`;

export const build = (extras: string[]) => {
  const start = performance.now();

  const { code } = transform({
    filename: "styles.css",
    code: new TextEncoder().encode([styles].concat(extras).join("\n\n")),
    minify: false,
    targets: {
      chrome: version(88),
    },
    // There’s a &:hover Sass declaration in Source
    errorRecovery: true,
  });

  const css = new TextDecoder().decode(code);

  const duration = Math.ceil(performance.now() - start);

  console.info(`Compiled CSS in ${duration}ms`);
  return css;
};
