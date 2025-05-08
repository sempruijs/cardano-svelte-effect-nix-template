export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.DSuyw2M9.js",app:"_app/immutable/entry/app.D3Kz0Ijh.js",imports:["_app/immutable/entry/start.DSuyw2M9.js","_app/immutable/chunks/Di4YpW_g.js","_app/immutable/chunks/h5jICo5o.js","_app/immutable/chunks/DCU4qwos.js","_app/immutable/chunks/Bgt6hl5a.js","_app/immutable/entry/app.D3Kz0Ijh.js","_app/immutable/chunks/h5jICo5o.js","_app/immutable/chunks/DZgTnA9k.js","_app/immutable/chunks/DiTHEMLZ.js","_app/immutable/chunks/zGI5IlZp.js","_app/immutable/chunks/Bgt6hl5a.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
