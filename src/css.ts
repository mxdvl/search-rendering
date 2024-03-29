import init, {
  transform as untypedTransform,
} from "https://unpkg.com/lightningcss-wasm@1.14.0/index.js";

import type {
  TransformOptions,
  TransformResult,
} from "https://esm.sh/lightningcss-wasm@1.14.0/index.js";

/**
 * Why are we declaring this here?
 *
 * - esm.sh has d.ts, but no wasm
 * - unpkg has wasm, but no d.ts
 * - skypack has nothing
 */
const transform = (options: TransformOptions): TransformResult =>
  untypedTransform(options);

await init();

export { transform };
