export const index = 1;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import("../entries/fallbacks/error.svelte.js"))
    .default);
export const imports = [
  "_app/immutable/nodes/1.q8FQxBBb.js",
  "_app/immutable/chunks/GuR79IhO.js",
  "_app/immutable/chunks/CqlScXHw.js",
  "_app/immutable/chunks/Btlpk4dg.js",
  "_app/immutable/chunks/CBCN7sLG.js",
  "_app/immutable/chunks/BK8VanFS.js",
  "_app/immutable/chunks/BxWs5J67.js",
  "_app/immutable/chunks/C2cQS2Uo.js",
];
export const stylesheets = [];
export const fonts = [];
