import { body } from "./deps.ts";
import { transform } from "./css.ts";

const version = (major: number, minor = 0, patch = 0) =>
  (major << 16) | (minor << 8) | (patch << 4);

const styles = `
${["news", "sports", "culture"]}

body {
    font-family: ${body.medium()};
}
`;

export const build = () => {
  const start = performance.now();

  const { code } = transform({
    filename: "styles.css",
    code: new TextEncoder().encode(styles),
    minify: false,
    targets: {
      chrome: version(91),
    },
  });

  const css = new TextDecoder().decode(code);

  const duration = Math.ceil(performance.now() - start);

  console.info(`Compiled CSS in ${duration}ms`);
  return css;
};
