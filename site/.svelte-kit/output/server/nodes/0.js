import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BE-0hKHH.js","_app/immutable/chunks/DiTHEMLZ.js","_app/immutable/chunks/h5jICo5o.js","_app/immutable/chunks/CCYBy9ZN.js"];
export const stylesheets = ["_app/immutable/assets/0.BE3rZykT.css"];
export const fonts = [];
