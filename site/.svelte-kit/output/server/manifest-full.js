export const manifest = (() => {
  function __memo(fn) {
    let value;
    return () => (value ??= value = fn());
  }

  return {
    appDir: "_app",
    appPath: "_app",
    assets: new Set(["favicon.png"]),
    mimeTypes: { ".png": "image/png" },
    _: {
      client: {
        start: "_app/immutable/entry/start.zFb_3h1k.js",
        app: "_app/immutable/entry/app.KmR81HKd.js",
        imports: [
          "_app/immutable/entry/start.zFb_3h1k.js",
          "_app/immutable/chunks/BK8VanFS.js",
          "_app/immutable/chunks/CqlScXHw.js",
          "_app/immutable/chunks/BxWs5J67.js",
          "_app/immutable/chunks/C2cQS2Uo.js",
          "_app/immutable/entry/app.KmR81HKd.js",
          "_app/immutable/chunks/CqlScXHw.js",
          "_app/immutable/chunks/CBCN7sLG.js",
          "_app/immutable/chunks/GuR79IhO.js",
          "_app/immutable/chunks/h6T7E_wY.js",
          "_app/immutable/chunks/C2cQS2Uo.js",
        ],
        stylesheets: [],
        fonts: [],
        uses_env_dynamic_public: false,
      },
      nodes: [
        __memo(() => import("./nodes/0.js")),
        __memo(() => import("./nodes/1.js")),
        __memo(() => import("./nodes/2.js")),
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null,
        },
      ],
      prerendered_routes: new Set([]),
      matchers: async () => {
        return {};
      },
      server_assets: {},
    },
  };
})();
