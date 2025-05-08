var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) =>
  member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (
  __accessCheck(obj, member, "read from private field"),
  getter ? getter.call(obj) : member.get(obj)
);
var __privateAdd = (obj, member, value) =>
  member.has(obj)
    ? __typeError("Cannot add the same private member more than once")
    : member instanceof WeakSet
      ? member.add(obj)
      : member.set(obj, value);
var _a, _b, _e2, _t2, _n2, _r, _a2, _o, _s, _i, _c, _e3, _d, _e4, _e5;
import {
  n as _e,
  ar as _t,
  am as T,
  k as x,
  O as P,
  an as mt,
} from "./CqlScXHw.js";
import "./BxWs5J67.js";
import { o as $e } from "./C2cQS2Uo.js";
const F = [];
function Se(e, t = _e) {
  let n = null;
  const r = /* @__PURE__ */ new Set();
  function a(o) {
    if (_t(e, o) && ((e = o), n)) {
      const c = !F.length;
      for (const l of r) l[1](), F.push(l, e);
      if (c) {
        for (let l = 0; l < F.length; l += 2) F[l][0](F[l + 1]);
        F.length = 0;
      }
    }
  }
  function s(o) {
    a(o(e));
  }
  function i(o, c = _e) {
    const l = [o, c];
    return (
      r.add(l),
      r.size === 1 && (n = t(a, s) || _e),
      o(e),
      () => {
        r.delete(l), r.size === 0 && n && (n(), (n = null));
      }
    );
  }
  return { set: a, update: s, subscribe: i };
}
new URL("sveltekit-internal://");
function yt(e, t) {
  return e === "/" || t === "ignore"
    ? e
    : t === "never"
      ? e.endsWith("/")
        ? e.slice(0, -1)
        : e
      : t === "always" && !e.endsWith("/")
        ? e + "/"
        : e;
}
function wt(e) {
  return e.split("%25").map(decodeURI).join("%25");
}
function vt(e) {
  for (const t in e) e[t] = decodeURIComponent(e[t]);
  return e;
}
function me({ href: e }) {
  return e.split("#")[0];
}
function bt(e, t, n, r = false) {
  const a = new URL(e);
  Object.defineProperty(a, "searchParams", {
    value: new Proxy(a.searchParams, {
      get(i, o) {
        if (o === "get" || o === "getAll" || o === "has")
          return (l) => (n(l), i[o](l));
        t();
        const c = Reflect.get(i, o);
        return typeof c == "function" ? c.bind(i) : c;
      },
    }),
    enumerable: true,
    configurable: true,
  });
  const s = ["href", "pathname", "search", "toString", "toJSON"];
  r && s.push("hash");
  for (const i of s)
    Object.defineProperty(a, i, {
      get() {
        return t(), e[i];
      },
      enumerable: true,
      configurable: true,
    });
  return a;
}
function kt(...e) {
  let t = 5381;
  for (const n of e)
    if (typeof n == "string") {
      let r = n.length;
      for (; r; ) t = (t * 33) ^ n.charCodeAt(--r);
    } else if (ArrayBuffer.isView(n)) {
      const r = new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
      let a = r.length;
      for (; a; ) t = (t * 33) ^ r[--a];
    } else throw new TypeError("value must be a string or TypedArray");
  return (t >>> 0).toString(36);
}
function At(e) {
  const t = atob(e),
    n = new Uint8Array(t.length);
  for (let r = 0; r < t.length; r++) n[r] = t.charCodeAt(r);
  return n.buffer;
}
const St = window.fetch;
window.fetch = (e, t) => (
  (e instanceof Request
    ? e.method
    : (t == null ? void 0 : t.method) || "GET") !== "GET" && H.delete(Ee(e)),
  St(e, t)
);
const H = /* @__PURE__ */ new Map();
function Et(e, t) {
  const n = Ee(e, t),
    r = document.querySelector(n);
  if (r == null ? void 0 : r.textContent) {
    let { body: a, ...s } = JSON.parse(r.textContent);
    const i = r.getAttribute("data-ttl");
    return (
      i && H.set(n, { body: a, init: s, ttl: 1e3 * Number(i) }),
      r.getAttribute("data-b64") !== null && (a = At(a)),
      Promise.resolve(new Response(a, s))
    );
  }
  return window.fetch(e, t);
}
function Rt(e, t, n) {
  if (H.size > 0) {
    const r = Ee(e, n),
      a = H.get(r);
    if (a) {
      if (
        performance.now() < a.ttl &&
        ["default", "force-cache", "only-if-cached", void 0].includes(
          n == null ? void 0 : n.cache,
        )
      )
        return new Response(a.body, a.init);
      H.delete(r);
    }
  }
  return window.fetch(t, n);
}
function Ee(e, t) {
  let r = `script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request ? e.url : e)}]`;
  if ((t == null ? void 0 : t.headers) || (t == null ? void 0 : t.body)) {
    const a = [];
    t.headers && a.push([...new Headers(t.headers)].join(",")),
      t.body &&
        (typeof t.body == "string" || ArrayBuffer.isView(t.body)) &&
        a.push(t.body),
      (r += `[data-hash="${kt(...a)}"]`);
  }
  return r;
}
const It = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function Ut(e) {
  const t = [];
  return {
    pattern:
      e === "/"
        ? /^\/$/
        : new RegExp(
            `^${Tt(e)
              .map((r) => {
                const a = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);
                if (a)
                  return (
                    t.push({
                      name: a[1],
                      matcher: a[2],
                      optional: false,
                      rest: true,
                      chained: true,
                    }),
                    "(?:/(.*))?"
                  );
                const s = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);
                if (s)
                  return (
                    t.push({
                      name: s[1],
                      matcher: s[2],
                      optional: true,
                      rest: false,
                      chained: true,
                    }),
                    "(?:/([^/]+))?"
                  );
                if (!r) return;
                const i = r.split(/\[(.+?)\](?!\])/);
                return (
                  "/" +
                  i
                    .map((c, l) => {
                      if (l % 2) {
                        if (c.startsWith("x+"))
                          return ye(
                            String.fromCharCode(parseInt(c.slice(2), 16)),
                          );
                        if (c.startsWith("u+"))
                          return ye(
                            String.fromCharCode(
                              ...c
                                .slice(2)
                                .split("-")
                                .map((m) => parseInt(m, 16)),
                            ),
                          );
                        const d = It.exec(c),
                          [, h, u, f, p] = d;
                        return (
                          t.push({
                            name: f,
                            matcher: p,
                            optional: !!h,
                            rest: !!u,
                            chained: u ? l === 1 && i[0] === "" : false,
                          }),
                          u ? "(.*?)" : h ? "([^/]*)?" : "([^/]+?)"
                        );
                      }
                      return ye(c);
                    })
                    .join("")
                );
              })
              .join("")}/?$`,
          ),
    params: t,
  };
}
function Lt(e) {
  return !/^\([^)]+\)$/.test(e);
}
function Tt(e) {
  return e.slice(1).split("/").filter(Lt);
}
function xt(e, t, n) {
  const r = {},
    a = e.slice(1),
    s = a.filter((o) => o !== void 0);
  let i = 0;
  for (let o = 0; o < t.length; o += 1) {
    const c = t[o];
    let l = a[o - i];
    if (
      (c.chained &&
        c.rest &&
        i &&
        ((l = a
          .slice(o - i, o + 1)
          .filter((d) => d)
          .join("/")),
        (i = 0)),
      l === void 0)
    ) {
      c.rest && (r[c.name] = "");
      continue;
    }
    if (!c.matcher || n[c.matcher](l)) {
      r[c.name] = l;
      const d = t[o + 1],
        h = a[o + 1];
      d && !d.rest && d.optional && h && c.chained && (i = 0),
        !d && !h && Object.keys(r).length === s.length && (i = 0);
      continue;
    }
    if (c.optional && c.chained) {
      i++;
      continue;
    }
    return;
  }
  if (!i) return r;
}
function ye(e) {
  return e
    .normalize()
    .replace(/[[\]]/g, "\\$&")
    .replace(/%/g, "%25")
    .replace(/\//g, "%2[Ff]")
    .replace(/\?/g, "%3[Ff]")
    .replace(/#/g, "%23")
    .replace(/[.*+?^${}()|\\]/g, "\\$&");
}
function Pt({ nodes: e, server_loads: t, dictionary: n, matchers: r }) {
  const a = new Set(t);
  return Object.entries(n).map(([o, [c, l, d]]) => {
    const { pattern: h, params: u } = Ut(o),
      f = {
        id: o,
        exec: (p) => {
          const m = h.exec(p);
          if (m) return xt(m, u, r);
        },
        errors: [1, ...(d || [])].map((p) => e[p]),
        layouts: [0, ...(l || [])].map(i),
        leaf: s(c),
      };
    return (
      (f.errors.length = f.layouts.length =
        Math.max(f.errors.length, f.layouts.length)),
      f
    );
  });
  function s(o) {
    const c = o < 0;
    return c && (o = ~o), [c, e[o]];
  }
  function i(o) {
    return o === void 0 ? o : [a.has(o), e[o]];
  }
}
function We(e, t = JSON.parse) {
  try {
    return t(sessionStorage[e]);
  } catch {}
}
function De(e, t, n = JSON.stringify) {
  const r = n(t);
  try {
    sessionStorage[e] = r;
  } catch {}
}
const U =
    ((_a = globalThis.__sveltekit_86he1f) == null ? void 0 : _a.base) ?? "",
  Ct = ((_b = globalThis.__sveltekit_86he1f) == null ? void 0 : _b.assets) ?? U,
  Ot = "1746643250455",
  Ye = "sveltekit:snapshot",
  ze = "sveltekit:scroll",
  Je = "sveltekit:states",
  Nt = "sveltekit:pageurl",
  B = "sveltekit:history",
  z = "sveltekit:navigation",
  j = { tap: 1, hover: 2, viewport: 3, eager: 4, off: -1, false: -1 },
  le = location.origin;
function Xe(e) {
  if (e instanceof URL) return e;
  let t = document.baseURI;
  if (!t) {
    const n = document.getElementsByTagName("base");
    t = n.length ? n[0].href : document.URL;
  }
  return new URL(e, t);
}
function Re() {
  return { x: pageXOffset, y: pageYOffset };
}
function V(e, t) {
  return e.getAttribute(`data-sveltekit-${t}`);
}
const Fe = { ...j, "": j.hover };
function Ze(e) {
  let t = e.assignedSlot ?? e.parentNode;
  return (t == null ? void 0 : t.nodeType) === 11 && (t = t.host), t;
}
function Qe(e, t) {
  for (; e && e !== t; ) {
    if (e.nodeName.toUpperCase() === "A" && e.hasAttribute("href")) return e;
    e = Ze(e);
  }
}
function be(e, t, n) {
  let r;
  try {
    if (
      ((r = new URL(
        e instanceof SVGAElement ? e.href.baseVal : e.href,
        document.baseURI,
      )),
      n && r.hash.match(/^#[^/]/))
    ) {
      const o = location.hash.split("#")[1] || "/";
      r.hash = `#${o}${r.hash}`;
    }
  } catch {}
  const a = e instanceof SVGAElement ? e.target.baseVal : e.target,
    s =
      !r ||
      !!a ||
      fe(r, t, n) ||
      (e.getAttribute("rel") || "").split(/\s+/).includes("external"),
    i = (r == null ? void 0 : r.origin) === le && e.hasAttribute("download");
  return { url: r, external: s, target: a, download: i };
}
function te(e) {
  let t = null,
    n = null,
    r = null,
    a = null,
    s = null,
    i = null,
    o = e;
  for (; o && o !== document.documentElement; )
    r === null && (r = V(o, "preload-code")),
      a === null && (a = V(o, "preload-data")),
      t === null && (t = V(o, "keepfocus")),
      n === null && (n = V(o, "noscroll")),
      s === null && (s = V(o, "reload")),
      i === null && (i = V(o, "replacestate")),
      (o = Ze(o));
  function c(l) {
    switch (l) {
      case "":
      case "true":
        return true;
      case "off":
      case "false":
        return false;
      default:
        return;
    }
  }
  return {
    preload_code: Fe[r ?? "off"],
    preload_data: Fe[a ?? "off"],
    keepfocus: c(t),
    noscroll: c(n),
    reload: c(s),
    replace_state: c(i),
  };
}
function Ve(e) {
  const t = Se(e);
  let n = true;
  function r() {
    (n = true), t.update((i) => i);
  }
  function a(i) {
    (n = false), t.set(i);
  }
  function s(i) {
    let o;
    return t.subscribe((c) => {
      (o === void 0 || (n && c !== o)) && i((o = c));
    });
  }
  return { notify: r, set: a, subscribe: s };
}
const et = { v: () => {} };
function jt() {
  const { set: e, subscribe: t } = Se(false);
  let n;
  async function r() {
    clearTimeout(n);
    try {
      const a = await fetch(`${Ct}/_app/version.json`, {
        headers: { pragma: "no-cache", "cache-control": "no-cache" },
      });
      if (!a.ok) return false;
      const i = (await a.json()).version !== Ot;
      return i && (e(true), et.v(), clearTimeout(n)), i;
    } catch {
      return false;
    }
  }
  return { subscribe: t, check: r };
}
function fe(e, t, n) {
  return e.origin !== le || !e.pathname.startsWith(t)
    ? true
    : n
      ? !(
          e.pathname === t + "/" ||
          e.pathname === t + "/index.html" ||
          (e.protocol === "file:" &&
            e.pathname.replace(/\/[^/]+\.html?$/, "") === t)
        )
      : false;
}
function bn(e) {}
function Be(e) {
  const t = Dt(e),
    n = new ArrayBuffer(t.length),
    r = new DataView(n);
  for (let a = 0; a < n.byteLength; a++) r.setUint8(a, t.charCodeAt(a));
  return n;
}
const $t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function Dt(e) {
  e.length % 4 === 0 && (e = e.replace(/==?$/, ""));
  let t = "",
    n = 0,
    r = 0;
  for (let a = 0; a < e.length; a++)
    (n <<= 6),
      (n |= $t.indexOf(e[a])),
      (r += 6),
      r === 24 &&
        ((t += String.fromCharCode((n & 16711680) >> 16)),
        (t += String.fromCharCode((n & 65280) >> 8)),
        (t += String.fromCharCode(n & 255)),
        (n = r = 0));
  return (
    r === 12
      ? ((n >>= 4), (t += String.fromCharCode(n)))
      : r === 18 &&
        ((n >>= 2),
        (t += String.fromCharCode((n & 65280) >> 8)),
        (t += String.fromCharCode(n & 255))),
    t
  );
}
const Ft = -1,
  Vt = -2,
  Bt = -3,
  qt = -4,
  Mt = -5,
  Gt = -6;
function Ht(e, t) {
  if (typeof e == "number") return a(e, true);
  if (!Array.isArray(e) || e.length === 0) throw new Error("Invalid input");
  const n = e,
    r = Array(n.length);
  function a(s, i = false) {
    if (s === Ft) return;
    if (s === Bt) return NaN;
    if (s === qt) return 1 / 0;
    if (s === Mt) return -1 / 0;
    if (s === Gt) return -0;
    if (i) throw new Error("Invalid input");
    if (s in r) return r[s];
    const o = n[s];
    if (!o || typeof o != "object") r[s] = o;
    else if (Array.isArray(o))
      if (typeof o[0] == "string") {
        const c = o[0],
          l = t == null ? void 0 : t[c];
        if (l) return (r[s] = l(a(o[1])));
        switch (c) {
          case "Date":
            r[s] = new Date(o[1]);
            break;
          case "Set":
            const d = /* @__PURE__ */ new Set();
            r[s] = d;
            for (let f = 1; f < o.length; f += 1) d.add(a(o[f]));
            break;
          case "Map":
            const h = /* @__PURE__ */ new Map();
            r[s] = h;
            for (let f = 1; f < o.length; f += 2) h.set(a(o[f]), a(o[f + 1]));
            break;
          case "RegExp":
            r[s] = new RegExp(o[1], o[2]);
            break;
          case "Object":
            r[s] = Object(o[1]);
            break;
          case "BigInt":
            r[s] = BigInt(o[1]);
            break;
          case "null":
            const u = /* @__PURE__ */ Object.create(null);
            r[s] = u;
            for (let f = 1; f < o.length; f += 2) u[o[f]] = a(o[f + 1]);
            break;
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "BigInt64Array":
          case "BigUint64Array": {
            const f = globalThis[c],
              p = o[1],
              m = Be(p),
              _ = new f(m);
            r[s] = _;
            break;
          }
          case "ArrayBuffer": {
            const f = o[1],
              p = Be(f);
            r[s] = p;
            break;
          }
          default:
            throw new Error(`Unknown type ${c}`);
        }
      } else {
        const c = new Array(o.length);
        r[s] = c;
        for (let l = 0; l < o.length; l += 1) {
          const d = o[l];
          d !== Vt && (c[l] = a(d));
        }
      }
    else {
      const c = {};
      r[s] = c;
      for (const l in o) {
        const d = o[l];
        c[l] = a(d);
      }
    }
    return r[s];
  }
  return a(0);
}
const tt = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config",
]);
[...tt];
const Kt = /* @__PURE__ */ new Set([...tt]);
[...Kt];
function Wt(e) {
  return e.filter((t) => t != null);
}
class ue {
  constructor(t, n) {
    (this.status = t),
      typeof n == "string"
        ? (this.body = { message: n })
        : n
          ? (this.body = n)
          : (this.body = { message: `Error: ${t}` });
  }
  toString() {
    return JSON.stringify(this.body);
  }
}
class Ie {
  constructor(t, n) {
    (this.status = t), (this.location = n);
  }
}
class Ue extends Error {
  constructor(t, n, r) {
    super(r), (this.status = t), (this.text = n);
  }
}
const Yt = "x-sveltekit-invalidated",
  zt = "x-sveltekit-trailing-slash";
function ne(e) {
  return e instanceof ue || e instanceof Ue ? e.status : 500;
}
function Jt(e) {
  return e instanceof Ue ? e.text : "Internal Error";
}
let S, J, we;
const Xt =
  $e.toString().includes("$$") || /function \w+\(\) \{\}/.test($e.toString());
Xt
  ? ((S = {
      data: {},
      form: null,
      error: null,
      params: {},
      route: { id: null },
      state: {},
      status: -1,
      url: new URL("https://example.com"),
    }),
    (J = { current: null }),
    (we = { current: false }))
  : ((S = new ((_c = class {
      constructor() {
        __privateAdd(this, _e2, T({}));
        __privateAdd(this, _t2, T(null));
        __privateAdd(this, _n2, T(null));
        __privateAdd(this, _r, T({}));
        __privateAdd(this, _a2, T({ id: null }));
        __privateAdd(this, _o, T({}));
        __privateAdd(this, _s, T(-1));
        __privateAdd(this, _i, T(new URL("https://example.com")));
      }
      get data() {
        return x(__privateGet(this, _e2));
      }
      set data(t) {
        P(__privateGet(this, _e2), t);
      }
      get form() {
        return x(__privateGet(this, _t2));
      }
      set form(t) {
        P(__privateGet(this, _t2), t);
      }
      get error() {
        return x(__privateGet(this, _n2));
      }
      set error(t) {
        P(__privateGet(this, _n2), t);
      }
      get params() {
        return x(__privateGet(this, _r));
      }
      set params(t) {
        P(__privateGet(this, _r), t);
      }
      get route() {
        return x(__privateGet(this, _a2));
      }
      set route(t) {
        P(__privateGet(this, _a2), t);
      }
      get state() {
        return x(__privateGet(this, _o));
      }
      set state(t) {
        P(__privateGet(this, _o), t);
      }
      get status() {
        return x(__privateGet(this, _s));
      }
      set status(t) {
        P(__privateGet(this, _s), t);
      }
      get url() {
        return x(__privateGet(this, _i));
      }
      set url(t) {
        P(__privateGet(this, _i), t);
      }
    }),
    (_e2 = new WeakMap()),
    (_t2 = new WeakMap()),
    (_n2 = new WeakMap()),
    (_r = new WeakMap()),
    (_a2 = new WeakMap()),
    (_o = new WeakMap()),
    (_s = new WeakMap()),
    (_i = new WeakMap()),
    _c)()),
    (J = new ((_d = class {
      constructor() {
        __privateAdd(this, _e3, T(null));
      }
      get current() {
        return x(__privateGet(this, _e3));
      }
      set current(t) {
        P(__privateGet(this, _e3), t);
      }
    }),
    (_e3 = new WeakMap()),
    _d)()),
    (we = new ((_e5 = class {
      constructor() {
        __privateAdd(this, _e4, T(false));
      }
      get current() {
        return x(__privateGet(this, _e4));
      }
      set current(t) {
        P(__privateGet(this, _e4), t);
      }
    }),
    (_e4 = new WeakMap()),
    _e5)()),
    (et.v = () => (we.current = true)));
function Zt(e) {
  Object.assign(S, e);
}
const Qt = "/__data.json",
  en = ".html__data.json";
function tn(e) {
  return e.endsWith(".html")
    ? e.replace(/\.html$/, en)
    : e.replace(/\/$/, "") + Qt;
}
const nn = /* @__PURE__ */ new Set([
    "icon",
    "shortcut icon",
    "apple-touch-icon",
  ]),
  D = We(ze) ?? {},
  X = We(Ye) ?? {},
  N = { url: Ve({}), page: Ve({}), navigating: Se(null), updated: jt() };
function Le(e) {
  D[e] = Re();
}
function rn(e, t) {
  let n = e + 1;
  for (; D[n]; ) delete D[n], (n += 1);
  for (n = t + 1; X[n]; ) delete X[n], (n += 1);
}
function M(e) {
  return (location.href = e.href), new Promise(() => {});
}
async function nt() {
  if ("serviceWorker" in navigator) {
    const e = await navigator.serviceWorker.getRegistration(U || "/");
    e && (await e.update());
  }
}
function qe() {}
let Te, ke, re, C, Ae, v;
const ae = [],
  oe = [];
let O = null;
const ee = /* @__PURE__ */ new Map(),
  rt = /* @__PURE__ */ new Set(),
  an = /* @__PURE__ */ new Set(),
  K = /* @__PURE__ */ new Set();
let w = { branch: [], error: null, url: null },
  xe = false,
  se = false,
  Me = true,
  Z = false,
  G = false,
  at = false,
  Pe = false,
  ot,
  k,
  I,
  $;
const W = /* @__PURE__ */ new Set();
async function En(e, t, n) {
  var _a3, _b2, _c2, _d2;
  document.URL !== location.href && (location.href = location.href),
    (v = e),
    await ((_b2 = (_a3 = e.hooks).init) == null ? void 0 : _b2.call(_a3)),
    (Te = Pt(e)),
    (C = document.documentElement),
    (Ae = t),
    (ke = e.nodes[0]),
    (re = e.nodes[1]),
    ke(),
    re(),
    (k = (_c2 = history.state) == null ? void 0 : _c2[B]),
    (I = (_d2 = history.state) == null ? void 0 : _d2[z]),
    k ||
      ((k = I = Date.now()),
      history.replaceState({ ...history.state, [B]: k, [z]: I }, ""));
  const r = D[k];
  r && ((history.scrollRestoration = "manual"), scrollTo(r.x, r.y)),
    n
      ? await gn(Ae, n)
      : await Y({
          type: "enter",
          url: Xe(v.hash ? mn(new URL(location.href)) : location.href),
          replace_state: true,
        }),
    pn();
}
function on() {
  (ae.length = 0), (Pe = false);
}
function st(e) {
  oe.some((t) => (t == null ? void 0 : t.snapshot)) &&
    (X[e] = oe.map((t) => {
      var _a3;
      return (_a3 = t == null ? void 0 : t.snapshot) == null
        ? void 0
        : _a3.capture();
    }));
}
function it(e) {
  var _a3;
  (_a3 = X[e]) == null
    ? void 0
    : _a3.forEach((t, n) => {
        var _a4, _b2;
        (_b2 = (_a4 = oe[n]) == null ? void 0 : _a4.snapshot) == null
          ? void 0
          : _b2.restore(t);
      });
}
function Ge() {
  Le(k), De(ze, D), st(I), De(Ye, X);
}
async function ct(e, t, n, r) {
  return Y({
    type: "goto",
    url: Xe(e),
    keepfocus: t.keepFocus,
    noscroll: t.noScroll,
    replace_state: t.replaceState,
    state: t.state,
    redirect_count: n,
    nav_token: r,
    accept: () => {
      t.invalidateAll && (Pe = true), t.invalidate && t.invalidate.forEach(hn);
    },
  });
}
async function sn(e) {
  if (e.id !== (O == null ? void 0 : O.id)) {
    const t = {};
    W.add(t),
      (O = {
        id: e.id,
        token: t,
        promise: ut({ ...e, preload: t }).then(
          (n) => (
            W.delete(t), n.type === "loaded" && n.state.error && (O = null), n
          ),
        ),
      });
  }
  return O.promise;
}
async function ve(e) {
  var _a3;
  const t = (_a3 = await he(e, false)) == null ? void 0 : _a3.route;
  t &&
    (await Promise.all(
      [...t.layouts, t.leaf].map((n) => (n == null ? void 0 : n[1]())),
    ));
}
function lt(e, t, n) {
  var _a3;
  w = e.state;
  const r = document.querySelector("style[data-sveltekit]");
  if (
    (r && r.remove(),
    Object.assign(S, e.props.page),
    (ot = new v.root({
      target: t,
      props: { ...e.props, stores: N, components: oe },
      hydrate: n,
      sync: false,
    })),
    it(I),
    n)
  ) {
    const a = {
      from: null,
      to: {
        params: w.params,
        route: { id: ((_a3 = w.route) == null ? void 0 : _a3.id) ?? null },
        url: new URL(location.href),
      },
      willUnload: false,
      type: "enter",
      complete: Promise.resolve(),
    };
    K.forEach((s) => s(a));
  }
  se = true;
}
function ie({
  url: e,
  params: t,
  branch: n,
  status: r,
  error: a,
  route: s,
  form: i,
}) {
  let o = "never";
  if (U && (e.pathname === U || e.pathname === U + "/")) o = "always";
  else
    for (const f of n)
      (f == null ? void 0 : f.slash) !== void 0 && (o = f.slash);
  (e.pathname = yt(e.pathname, o)), (e.search = e.search);
  const c = {
    type: "loaded",
    state: { url: e, params: t, branch: n, error: a, route: s },
    props: { constructors: Wt(n).map((f) => f.node.component), page: je(S) },
  };
  i !== void 0 && (c.props.form = i);
  let l = {},
    d = !S,
    h = 0;
  for (let f = 0; f < Math.max(n.length, w.branch.length); f += 1) {
    const p = n[f],
      m = w.branch[f];
    (p == null ? void 0 : p.data) !== (m == null ? void 0 : m.data) &&
      (d = true),
      p &&
        ((l = { ...l, ...p.data }), d && (c.props[`data_${h}`] = l), (h += 1));
  }
  return (
    (!w.url ||
      e.href !== w.url.href ||
      w.error !== a ||
      (i !== void 0 && i !== S.form) ||
      d) &&
      (c.props.page = {
        error: a,
        params: t,
        route: { id: (s == null ? void 0 : s.id) ?? null },
        state: {},
        status: r,
        url: new URL(e),
        form: i ?? null,
        data: d ? l : S.data,
      }),
    c
  );
}
async function Ce({
  loader: e,
  parent: t,
  url: n,
  params: r,
  route: a,
  server_data_node: s,
}) {
  var _a3, _b2, _c2;
  let i = null,
    o = true;
  const c = {
      dependencies: /* @__PURE__ */ new Set(),
      params: /* @__PURE__ */ new Set(),
      parent: false,
      route: false,
      url: false,
      search_params: /* @__PURE__ */ new Set(),
    },
    l = await e();
  if ((_a3 = l.universal) == null ? void 0 : _a3.load) {
    let d = function (...u) {
      for (const f of u) {
        const { href: p } = new URL(f, n);
        c.dependencies.add(p);
      }
    };
    const h = {
      route: new Proxy(a, { get: (u, f) => (o && (c.route = true), u[f]) }),
      params: new Proxy(r, { get: (u, f) => (o && c.params.add(f), u[f]) }),
      data: (s == null ? void 0 : s.data) ?? null,
      url: bt(
        n,
        () => {
          o && (c.url = true);
        },
        (u) => {
          o && c.search_params.add(u);
        },
        v.hash,
      ),
      async fetch(u, f) {
        u instanceof Request &&
          (f = {
            body:
              u.method === "GET" || u.method === "HEAD"
                ? void 0
                : await u.blob(),
            cache: u.cache,
            credentials: u.credentials,
            headers: [...u.headers].length ? u.headers : void 0,
            integrity: u.integrity,
            keepalive: u.keepalive,
            method: u.method,
            mode: u.mode,
            redirect: u.redirect,
            referrer: u.referrer,
            referrerPolicy: u.referrerPolicy,
            signal: u.signal,
            ...f,
          });
        const { resolved: p, promise: m } = ft(u, f, n);
        return o && d(p.href), m;
      },
      setHeaders: () => {},
      depends: d,
      parent() {
        return o && (c.parent = true), t();
      },
      untrack(u) {
        o = false;
        try {
          return u();
        } finally {
          o = true;
        }
      },
    };
    i = (await l.universal.load.call(null, h)) ?? null;
  }
  return {
    node: l,
    loader: e,
    server: s,
    universal: ((_b2 = l.universal) == null ? void 0 : _b2.load)
      ? { type: "data", data: i, uses: c }
      : null,
    data: i ?? (s == null ? void 0 : s.data) ?? null,
    slash:
      ((_c2 = l.universal) == null ? void 0 : _c2.trailingSlash) ??
      (s == null ? void 0 : s.slash),
  };
}
function ft(e, t, n) {
  let r = e instanceof Request ? e.url : e;
  const a = new URL(r, n);
  a.origin === n.origin && (r = a.href.slice(n.origin.length));
  const s = se ? Rt(r, a.href, t) : Et(r, t);
  return { resolved: a, promise: s };
}
function He(e, t, n, r, a, s) {
  if (Pe) return true;
  if (!a) return false;
  if ((a.parent && e) || (a.route && t) || (a.url && n)) return true;
  for (const i of a.search_params) if (r.has(i)) return true;
  for (const i of a.params) if (s[i] !== w.params[i]) return true;
  for (const i of a.dependencies)
    if (ae.some((o) => o(new URL(i)))) return true;
  return false;
}
function Oe(e, t) {
  return (e == null ? void 0 : e.type) === "data"
    ? e
    : (e == null ? void 0 : e.type) === "skip"
      ? (t ?? null)
      : null;
}
function cn(e, t) {
  if (!e) return new Set(t.searchParams.keys());
  const n = /* @__PURE__ */ new Set([
    ...e.searchParams.keys(),
    ...t.searchParams.keys(),
  ]);
  for (const r of n) {
    const a = e.searchParams.getAll(r),
      s = t.searchParams.getAll(r);
    a.every((i) => s.includes(i)) &&
      s.every((i) => a.includes(i)) &&
      n.delete(r);
  }
  return n;
}
function Ke({ error: e, url: t, route: n, params: r }) {
  return {
    type: "loaded",
    state: { error: e, url: t, route: n, params: r, branch: [] },
    props: { page: je(S), constructors: [] },
  };
}
async function ut({
  id: e,
  invalidating: t,
  url: n,
  params: r,
  route: a,
  preload: s,
}) {
  if ((O == null ? void 0 : O.id) === e) return W.delete(O.token), O.promise;
  const { errors: i, layouts: o, leaf: c } = a,
    l = [...o, c];
  i.forEach((g) => (g == null ? void 0 : g().catch(() => {}))),
    l.forEach((g) => (g == null ? void 0 : g[1]().catch(() => {})));
  let d = null;
  const h = w.url ? e !== ce(w.url) : false,
    u = w.route ? a.id !== w.route.id : false,
    f = cn(w.url, n);
  let p = false;
  const m = l.map((g, y) => {
    var _a3;
    const b = w.branch[y],
      A =
        !!(g == null ? void 0 : g[0]) &&
        ((b == null ? void 0 : b.loader) !== g[1] ||
          He(p, u, h, f, (_a3 = b.server) == null ? void 0 : _a3.uses, r));
    return A && (p = true), A;
  });
  if (m.some(Boolean)) {
    try {
      d = await pt(n, m);
    } catch (g) {
      const y = await q(g, { url: n, params: r, route: { id: e } });
      return W.has(s)
        ? Ke({ error: y, url: n, params: r, route: a })
        : de({ status: ne(g), error: y, url: n, route: a });
    }
    if (d.type === "redirect") return d;
  }
  const _ = d == null ? void 0 : d.nodes;
  let R = false;
  const E = l.map(async (g, y) => {
    var _a3;
    if (!g) return;
    const b = w.branch[y],
      A = _ == null ? void 0 : _[y];
    if (
      (!A || A.type === "skip") &&
      g[1] === (b == null ? void 0 : b.loader) &&
      !He(R, u, h, f, (_a3 = b.universal) == null ? void 0 : _a3.uses, r)
    )
      return b;
    if (((R = true), (A == null ? void 0 : A.type) === "error")) throw A;
    return Ce({
      loader: g[1],
      url: n,
      params: r,
      route: a,
      parent: async () => {
        var _a4;
        const pe = {};
        for (let ge = 0; ge < y; ge += 1)
          Object.assign(pe, (_a4 = await E[ge]) == null ? void 0 : _a4.data);
        return pe;
      },
      server_data_node: Oe(
        A === void 0 && g[0] ? { type: "skip" } : (A ?? null),
        g[0] ? (b == null ? void 0 : b.server) : void 0,
      ),
    });
  });
  for (const g of E) g.catch(() => {});
  const L = [];
  for (let g = 0; g < l.length; g += 1)
    if (l[g])
      try {
        L.push(await E[g]);
      } catch (y) {
        if (y instanceof Ie) return { type: "redirect", location: y.location };
        if (W.has(s))
          return Ke({
            error: await q(y, { params: r, url: n, route: { id: a.id } }),
            url: n,
            params: r,
            route: a,
          });
        let b = ne(y),
          A;
        if (_ == null ? void 0 : _.includes(y))
          (b = y.status ?? b), (A = y.error);
        else if (y instanceof ue) A = y.body;
        else {
          if (await N.updated.check()) return await nt(), await M(n);
          A = await q(y, { params: r, url: n, route: { id: a.id } });
        }
        const Q = await ln(g, L, i);
        return Q
          ? ie({
              url: n,
              params: r,
              branch: L.slice(0, Q.idx).concat(Q.node),
              status: b,
              error: A,
              route: a,
            })
          : await ht(n, { id: a.id }, A, b);
      }
    else L.push(void 0);
  return ie({
    url: n,
    params: r,
    branch: L,
    status: 200,
    error: null,
    route: a,
    form: t ? void 0 : null,
  });
}
async function ln(e, t, n) {
  for (; e--; )
    if (n[e]) {
      let r = e;
      for (; !t[r]; ) r -= 1;
      try {
        return {
          idx: r + 1,
          node: {
            node: await n[e](),
            loader: n[e],
            data: {},
            server: null,
            universal: null,
          },
        };
      } catch {
        continue;
      }
    }
}
async function de({ status: e, error: t, url: n, route: r }) {
  const a = {};
  let s = null;
  if (v.server_loads[0] === 0)
    try {
      const o = await pt(n, [true]);
      if (o.type !== "data" || (o.nodes[0] && o.nodes[0].type !== "data"))
        throw 0;
      s = o.nodes[0] ?? null;
    } catch {
      (n.origin !== le || n.pathname !== location.pathname || xe) &&
        (await M(n));
    }
  try {
    const o = await Ce({
        loader: ke,
        url: n,
        params: a,
        route: r,
        parent: () => Promise.resolve({}),
        server_data_node: Oe(s),
      }),
      c = {
        node: await re(),
        loader: re,
        universal: null,
        server: null,
        data: null,
      };
    return ie({
      url: n,
      params: a,
      branch: [o, c],
      status: e,
      error: t,
      route: null,
    });
  } catch (o) {
    if (o instanceof Ie) return ct(new URL(o.location, location.href), {}, 0);
    throw o;
  }
}
async function fn(e) {
  const t = e.href;
  if (ee.has(t)) return ee.get(t);
  let n;
  try {
    const r = (async () => {
      let a =
        (await v.hooks.reroute({
          url: new URL(e),
          fetch: async (s, i) => ft(s, i, e).promise,
        })) ?? e;
      if (typeof a == "string") {
        const s = new URL(e);
        v.hash ? (s.hash = a) : (s.pathname = a), (a = s);
      }
      return a;
    })();
    ee.set(t, r), (n = await r);
  } catch {
    ee.delete(t);
    return;
  }
  return n;
}
async function he(e, t) {
  if (e && !fe(e, U, v.hash)) {
    const n = await fn(e);
    if (!n) return;
    const r = un(n);
    for (const a of Te) {
      const s = a.exec(r);
      if (s)
        return { id: ce(e), invalidating: t, route: a, params: vt(s), url: e };
    }
  }
}
function un(e) {
  return (
    wt(
      v.hash
        ? e.hash.replace(/^#/, "").replace(/[?#].+/, "")
        : e.pathname.slice(U.length),
    ) || "/"
  );
}
function ce(e) {
  return (v.hash ? e.hash.replace(/^#/, "") : e.pathname) + e.search;
}
function dt({ url: e, type: t, intent: n, delta: r }) {
  let a = false;
  const s = Ne(w, n, e, t);
  r !== void 0 && (s.navigation.delta = r);
  const i = {
    ...s.navigation,
    cancel: () => {
      (a = true), s.reject(new Error("navigation cancelled"));
    },
  };
  return Z || rt.forEach((o) => o(i)), a ? null : s;
}
async function Y({
  type: e,
  url: t,
  popped: n,
  keepfocus: r,
  noscroll: a,
  replace_state: s,
  state: i = {},
  redirect_count: o = 0,
  nav_token: c = {},
  accept: l = qe,
  block: d = qe,
}) {
  const h = $;
  $ = c;
  const u = await he(t, false),
    f =
      e === "enter"
        ? Ne(w, u, t, e)
        : dt({
            url: t,
            type: e,
            delta: n == null ? void 0 : n.delta,
            intent: u,
          });
  if (!f) {
    d(), $ === c && ($ = h);
    return;
  }
  const p = k,
    m = I;
  l(),
    (Z = true),
    se &&
      f.navigation.type !== "enter" &&
      N.navigating.set((J.current = f.navigation));
  let _ = u && (await ut(u));
  if (!_) {
    if (fe(t, U, v.hash)) return await M(t);
    _ = await ht(
      t,
      { id: null },
      await q(new Ue(404, "Not Found", `Not found: ${t.pathname}`), {
        url: t,
        params: {},
        route: { id: null },
      }),
      404,
    );
  }
  if (((t = (u == null ? void 0 : u.url) || t), $ !== c))
    return f.reject(new Error("navigation aborted")), false;
  if (_.type === "redirect")
    if (o >= 20)
      _ = await de({
        status: 500,
        error: await q(new Error("Redirect loop"), {
          url: t,
          params: {},
          route: { id: null },
        }),
        url: t,
        route: { id: null },
      });
    else return await ct(new URL(_.location, t).href, {}, o + 1, c), false;
  else
    _.props.page.status >= 400 &&
      (await N.updated.check()) &&
      (await nt(), await M(t));
  if (
    (on(),
    Le(p),
    st(m),
    _.props.page.url.pathname !== t.pathname &&
      (t.pathname = _.props.page.url.pathname),
    (i = n ? n.state : i),
    !n)
  ) {
    const g = s ? 0 : 1,
      y = { [B]: (k += g), [z]: (I += g), [Je]: i };
    (s ? history.replaceState : history.pushState).call(history, y, "", t),
      s || rn(k, I);
  }
  if (((O = null), (_.props.page.state = i), se)) {
    (w = _.state), _.props.page && (_.props.page.url = t);
    const g = (
      await Promise.all(Array.from(an, (y) => y(f.navigation)))
    ).filter((y) => typeof y == "function");
    if (g.length > 0) {
      let y = function () {
        g.forEach((b) => {
          K.delete(b);
        });
      };
      g.push(y),
        g.forEach((b) => {
          K.add(b);
        });
    }
    ot.$set(_.props), Zt(_.props.page), (at = true);
  } else lt(_, Ae, false);
  const { activeElement: R } = document;
  await mt();
  const E = n ? n.scroll : a ? Re() : null;
  if (Me) {
    const g =
      t.hash &&
      document.getElementById(
        decodeURIComponent(
          v.hash ? (t.hash.split("#")[2] ?? "") : t.hash.slice(1),
        ),
      );
    E ? scrollTo(E.x, E.y) : g ? g.scrollIntoView() : scrollTo(0, 0);
  }
  const L =
    document.activeElement !== R && document.activeElement !== document.body;
  !r && !L && _n(),
    (Me = true),
    _.props.page && Object.assign(S, _.props.page),
    (Z = false),
    e === "popstate" && it(I),
    f.fulfil(void 0),
    K.forEach((g) => g(f.navigation)),
    N.navigating.set((J.current = null));
}
async function ht(e, t, n, r) {
  return e.origin === le && e.pathname === location.pathname && !xe
    ? await de({ status: r, error: n, url: e, route: t })
    : await M(e);
}
function dn() {
  let e, t, n;
  C.addEventListener("mousemove", (o) => {
    const c = o.target;
    clearTimeout(e),
      (e = setTimeout(() => {
        s(c, j.hover);
      }, 20));
  });
  function r(o) {
    o.defaultPrevented || s(o.composedPath()[0], j.tap);
  }
  C.addEventListener("mousedown", r),
    C.addEventListener("touchstart", r, { passive: true });
  const a = new IntersectionObserver(
    (o) => {
      for (const c of o)
        c.isIntersecting && (ve(new URL(c.target.href)), a.unobserve(c.target));
    },
    { threshold: 0 },
  );
  async function s(o, c) {
    const l = Qe(o, C),
      d = l === t && c >= n;
    if (!l || d) return;
    const { url: h, external: u, download: f } = be(l, U, v.hash);
    if (u || f) return;
    const p = te(l),
      m = h && ce(w.url) === ce(h);
    if (!(p.reload || m))
      if (c <= p.preload_data) {
        (t = l), (n = j.tap);
        const _ = await he(h, false);
        if (!_) return;
        sn(_);
      } else c <= p.preload_code && ((t = l), (n = c), ve(h));
  }
  function i() {
    a.disconnect();
    for (const o of C.querySelectorAll("a")) {
      const { url: c, external: l, download: d } = be(o, U, v.hash);
      if (l || d) continue;
      const h = te(o);
      h.reload ||
        (h.preload_code === j.viewport && a.observe(o),
        h.preload_code === j.eager && ve(c));
    }
  }
  K.add(i), i();
}
function q(e, t) {
  if (e instanceof ue) return e.body;
  const n = ne(e),
    r = Jt(e);
  return (
    v.hooks.handleError({ error: e, event: t, status: n, message: r }) ?? {
      message: r,
    }
  );
}
function hn(e) {
  if (typeof e == "function") ae.push(e);
  else {
    const { href: t } = new URL(e, location.href);
    ae.push((n) => n.href === t);
  }
}
function pn() {
  var _a3;
  (history.scrollRestoration = "manual"),
    addEventListener("beforeunload", (t) => {
      let n = false;
      if ((Ge(), !Z)) {
        const r = Ne(w, void 0, null, "leave"),
          a = {
            ...r.navigation,
            cancel: () => {
              (n = true), r.reject(new Error("navigation cancelled"));
            },
          };
        rt.forEach((s) => s(a));
      }
      n
        ? (t.preventDefault(), (t.returnValue = ""))
        : (history.scrollRestoration = "auto");
    }),
    addEventListener("visibilitychange", () => {
      document.visibilityState === "hidden" && Ge();
    }),
    ((_a3 = navigator.connection) == null ? void 0 : _a3.saveData) || dn(),
    C.addEventListener("click", async (t) => {
      if (
        t.button ||
        t.which !== 1 ||
        t.metaKey ||
        t.ctrlKey ||
        t.shiftKey ||
        t.altKey ||
        t.defaultPrevented
      )
        return;
      const n = Qe(t.composedPath()[0], C);
      if (!n) return;
      const { url: r, external: a, target: s, download: i } = be(n, U, v.hash);
      if (!r) return;
      if (s === "_parent" || s === "_top") {
        if (window.parent !== window) return;
      } else if (s && s !== "_self") return;
      const o = te(n);
      if (
        (!(n instanceof SVGAElement) &&
          r.protocol !== location.protocol &&
          !(r.protocol === "https:" || r.protocol === "http:")) ||
        i
      )
        return;
      const [l, d] = (v.hash ? r.hash.replace(/^#/, "") : r.href).split("#"),
        h = l === me(location);
      if (a || (o.reload && (!h || !d))) {
        dt({ url: r, type: "link" }) ? (Z = true) : t.preventDefault();
        return;
      }
      if (d !== void 0 && h) {
        const [, u] = w.url.href.split("#");
        if (u === d) {
          if (
            (t.preventDefault(),
            d === "" ||
              (d === "top" && n.ownerDocument.getElementById("top") === null))
          )
            window.scrollTo({ top: 0 });
          else {
            const f = n.ownerDocument.getElementById(decodeURIComponent(d));
            f && (f.scrollIntoView(), f.focus());
          }
          return;
        }
        if (((G = true), Le(k), e(r), !o.replace_state)) return;
        G = false;
      }
      t.preventDefault(),
        await new Promise((u) => {
          requestAnimationFrame(() => {
            setTimeout(u, 0);
          }),
            setTimeout(u, 100);
        }),
        await Y({
          type: "link",
          url: r,
          keepfocus: o.keepfocus,
          noscroll: o.noscroll,
          replace_state: o.replace_state ?? r.href === location.href,
        });
    }),
    C.addEventListener("submit", (t) => {
      if (t.defaultPrevented) return;
      const n = HTMLFormElement.prototype.cloneNode.call(t.target),
        r = t.submitter;
      if (
        ((r == null ? void 0 : r.formTarget) || n.target) === "_blank" ||
        ((r == null ? void 0 : r.formMethod) || n.method) !== "get"
      )
        return;
      const i = new URL(
        ((r == null ? void 0 : r.hasAttribute("formaction")) &&
          (r == null ? void 0 : r.formAction)) ||
          n.action,
      );
      if (fe(i, U, false)) return;
      const o = t.target,
        c = te(o);
      if (c.reload) return;
      t.preventDefault(), t.stopPropagation();
      const l = new FormData(o),
        d = r == null ? void 0 : r.getAttribute("name");
      d && l.append(d, (r == null ? void 0 : r.getAttribute("value")) ?? ""),
        (i.search = new URLSearchParams(l).toString()),
        Y({
          type: "form",
          url: i,
          keepfocus: c.keepfocus,
          noscroll: c.noscroll,
          replace_state: c.replace_state ?? i.href === location.href,
        });
    }),
    addEventListener("popstate", async (t) => {
      var _a4;
      if ((_a4 = t.state) == null ? void 0 : _a4[B]) {
        const n = t.state[B];
        if ((($ = {}), n === k)) return;
        const r = D[n],
          a = t.state[Je] ?? {},
          s = new URL(t.state[Nt] ?? location.href),
          i = t.state[z],
          o = w.url ? me(location) === me(w.url) : false;
        if (i === I && (at || o)) {
          a !== S.state && (S.state = a),
            e(s),
            (D[k] = Re()),
            r && scrollTo(r.x, r.y),
            (k = n);
          return;
        }
        const l = n - k;
        await Y({
          type: "popstate",
          url: s,
          popped: { state: a, scroll: r, delta: l },
          accept: () => {
            (k = n), (I = i);
          },
          block: () => {
            history.go(-l);
          },
          nav_token: $,
        });
      } else if (!G) {
        const n = new URL(location.href);
        e(n), v.hash && location.reload();
      }
    }),
    addEventListener("hashchange", () => {
      G &&
        ((G = false),
        history.replaceState(
          { ...history.state, [B]: ++k, [z]: I },
          "",
          location.href,
        ));
    });
  for (const t of document.querySelectorAll("link"))
    nn.has(t.rel) && (t.href = t.href);
  addEventListener("pageshow", (t) => {
    t.persisted && N.navigating.set((J.current = null));
  });
  function e(t) {
    (w.url = S.url = t), N.page.set(je(S)), N.page.notify();
  }
}
async function gn(
  e,
  {
    status: t = 200,
    error: n,
    node_ids: r,
    params: a,
    route: s,
    server_route: i,
    data: o,
    form: c,
  },
) {
  xe = true;
  const l = new URL(location.href);
  let d;
  ({ params: a = {}, route: s = { id: null } } = (await he(l, false)) || {}),
    (d = Te.find(({ id: f }) => f === s.id));
  let h,
    u = true;
  try {
    const f = r.map(async (m, _) => {
        const R = o[_];
        return (
          (R == null ? void 0 : R.uses) && (R.uses = gt(R.uses)),
          Ce({
            loader: v.nodes[m],
            url: l,
            params: a,
            route: s,
            parent: async () => {
              const E = {};
              for (let L = 0; L < _; L += 1)
                Object.assign(E, (await f[L]).data);
              return E;
            },
            server_data_node: Oe(R),
          })
        );
      }),
      p = await Promise.all(f);
    if (d) {
      const m = d.layouts;
      for (let _ = 0; _ < m.length; _++) m[_] || p.splice(_, 0, void 0);
    }
    h = ie({
      url: l,
      params: a,
      branch: p,
      status: t,
      error: n,
      form: c,
      route: d ?? null,
    });
  } catch (f) {
    if (f instanceof Ie) {
      await M(new URL(f.location, location.href));
      return;
    }
    (h = await de({
      status: ne(f),
      error: await q(f, { url: l, params: a, route: s }),
      url: l,
      route: s,
    })),
      (e.textContent = ""),
      (u = false);
  }
  h.props.page && (h.props.page.state = {}), lt(h, e, u);
}
async function pt(e, t) {
  var _a3;
  const n = new URL(e);
  (n.pathname = tn(e.pathname)),
    e.pathname.endsWith("/") && n.searchParams.append(zt, "1"),
    n.searchParams.append(Yt, t.map((s) => (s ? "1" : "0")).join(""));
  const r = window.fetch,
    a = await r(n.href, {});
  if (!a.ok) {
    let s;
    throw (
      ((
        (_a3 = a.headers.get("content-type")) == null
          ? void 0
          : _a3.includes("application/json")
      )
        ? (s = await a.json())
        : a.status === 404
          ? (s = "Not Found")
          : a.status === 500 && (s = "Internal Error"),
      new ue(a.status, s))
    );
  }
  return new Promise(async (s) => {
    var _a4;
    const i = /* @__PURE__ */ new Map(),
      o = a.body.getReader(),
      c = new TextDecoder();
    function l(h) {
      return Ht(h, {
        ...v.decoders,
        Promise: (u) =>
          new Promise((f, p) => {
            i.set(u, { fulfil: f, reject: p });
          }),
      });
    }
    let d = "";
    for (;;) {
      const { done: h, value: u } = await o.read();
      if (h && !d) break;
      for (
        d +=
          !u && d
            ? `
`
            : c.decode(u, { stream: true });
        ;

      ) {
        const f = d.indexOf(`
`);
        if (f === -1) break;
        const p = JSON.parse(d.slice(0, f));
        if (((d = d.slice(f + 1)), p.type === "redirect")) return s(p);
        if (p.type === "data")
          (_a4 = p.nodes) == null
            ? void 0
            : _a4.forEach((m) => {
                (m == null ? void 0 : m.type) === "data" &&
                  ((m.uses = gt(m.uses)), (m.data = l(m.data)));
              }),
            s(p);
        else if (p.type === "chunk") {
          const { id: m, data: _, error: R } = p,
            E = i.get(m);
          i.delete(m), R ? E.reject(l(R)) : E.fulfil(l(_));
        }
      }
    }
  });
}
function gt(e) {
  return {
    dependencies: new Set((e == null ? void 0 : e.dependencies) ?? []),
    params: new Set((e == null ? void 0 : e.params) ?? []),
    parent: !!(e == null ? void 0 : e.parent),
    route: !!(e == null ? void 0 : e.route),
    url: !!(e == null ? void 0 : e.url),
    search_params: new Set((e == null ? void 0 : e.search_params) ?? []),
  };
}
function _n() {
  const e = document.querySelector("[autofocus]");
  if (e) e.focus();
  else {
    const t = document.body,
      n = t.getAttribute("tabindex");
    (t.tabIndex = -1),
      t.focus({ preventScroll: true, focusVisible: false }),
      n !== null
        ? t.setAttribute("tabindex", n)
        : t.removeAttribute("tabindex");
    const r = getSelection();
    if (r && r.type !== "None") {
      const a = [];
      for (let s = 0; s < r.rangeCount; s += 1) a.push(r.getRangeAt(s));
      setTimeout(() => {
        if (r.rangeCount === a.length) {
          for (let s = 0; s < r.rangeCount; s += 1) {
            const i = a[s],
              o = r.getRangeAt(s);
            if (
              i.commonAncestorContainer !== o.commonAncestorContainer ||
              i.startContainer !== o.startContainer ||
              i.endContainer !== o.endContainer ||
              i.startOffset !== o.startOffset ||
              i.endOffset !== o.endOffset
            )
              return;
          }
          r.removeAllRanges();
        }
      });
    }
  }
}
function Ne(e, t, n, r) {
  var _a3, _b2;
  let a, s;
  const i = new Promise((c, l) => {
    (a = c), (s = l);
  });
  return (
    i.catch(() => {}),
    {
      navigation: {
        from: {
          params: e.params,
          route: { id: ((_a3 = e.route) == null ? void 0 : _a3.id) ?? null },
          url: e.url,
        },
        to: n && {
          params: (t == null ? void 0 : t.params) ?? null,
          route: {
            id:
              ((_b2 = t == null ? void 0 : t.route) == null
                ? void 0
                : _b2.id) ?? null,
          },
          url: n,
        },
        willUnload: !t,
        type: r,
        complete: i,
      },
      fulfil: a,
      reject: s,
    }
  );
}
function je(e) {
  return {
    data: e.data,
    error: e.error,
    form: e.form,
    params: e.params,
    route: e.route,
    state: e.state,
    status: e.status,
    url: e.url,
  };
}
function mn(e) {
  const t = new URL(e);
  return (t.hash = decodeURIComponent(e.hash)), t;
}
export { En as a, bn as l, S as p, N as s };
