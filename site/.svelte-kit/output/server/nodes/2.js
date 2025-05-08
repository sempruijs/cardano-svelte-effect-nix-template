export const index = 2;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import("../entries/pages/_page.svelte.js"))
    .default);
export const imports = [
  "_app/immutable/nodes/2.BCXQep2S.js",
  "_app/immutable/chunks/GuR79IhO.js",
  "_app/immutable/chunks/CqlScXHw.js",
  "_app/immutable/chunks/CBCN7sLG.js",
  "_app/immutable/chunks/h6T7E_wY.js",
  "_app/immutable/chunks/BxWs5J67.js",
  "_app/immutable/chunks/C2cQS2Uo.js",
  "_app/immutable/chunks/C29bKZCE.js",
  "_app/immutable/chunks/Btlpk4dg.js",
];
export const stylesheets = [];
export const fonts = [];
