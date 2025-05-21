var _a;
import { ae as i, a5 as f, af as v, a0 as u, ag as p, ah as h, h as d, c as o, z as E, C as T } from "./h5jICo5o.js";
function g(n) {
  var t = document.createElement("template");
  return t.innerHTML = n, t.content;
}
function r(n, t) {
  var e = u;
  e.nodes_start === null && (e.nodes_start = n, e.nodes_end = t);
}
function x(n, t) {
  var e = (t & p) !== 0, _ = (t & h) !== 0, a, c = !n.startsWith("<!>");
  return () => {
    if (d) return r(o, null), o;
    a === void 0 && (a = g(c ? n : "<!>" + n), e || (a = f(a)));
    var s = _ || v ? document.importNode(a, true) : a.cloneNode(true);
    if (e) {
      var m = f(s), l = s.lastChild;
      r(m, l);
    } else r(s, s);
    return s;
  };
}
function M(n = "") {
  if (!d) {
    var t = i(n + "");
    return r(t, t), t;
  }
  var e = o;
  return e.nodeType !== 3 && (e.before(e = i()), T(e)), r(e, e), e;
}
function N() {
  if (d) return r(o, null), o;
  var n = document.createDocumentFragment(), t = document.createComment(""), e = i();
  return n.append(t, e), r(t, e), n;
}
function C(n, t) {
  if (d) {
    u.nodes_end = o, E();
    return;
  }
  n !== null && n.before(t);
}
const y = "5";
typeof window < "u" && ((_a = window.__svelte ?? (window.__svelte = {})).v ?? (_a.v = /* @__PURE__ */ new Set())).add(y);
export {
  C as a,
  r as b,
  N as c,
  M as d,
  x as t
};
