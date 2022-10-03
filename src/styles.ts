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

${Array.from({ length: 8 }, (_, i) => i - 1 * gap + i * columnWidth)
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

.result a {
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  
  color: var(--text, ${source.neutral[10]});
  background-color: var(--background, ${source.neutral[97]});

  padding: 0.25rem;
  gap: 0.25rem;
  box-sizing: border-box;
  height: 100%;
}

.result :is(h2, h3, h4, p) {
  margin: 0;
  padding: 0
}

.result .date {
  text-align: right;
  ${source.textSans.xsmall()};
}

.result h2 {
  color: var(--headline);
  ${source.headline.xsmall()};
}

.result .spacer {
  flex-basis: 0;
  flex-grow: 1;
}

.result img {
  margin: -0.25rem;
  margin-bottom: 0;
  display: block;
}

.result:hover {
  --background: ${source.neutral[86]};
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
