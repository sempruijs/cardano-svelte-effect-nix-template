import { Z as m, _ as w, $ as D, a0 as N, a1 as C, a2 as M, a3 as x, a4 as k, a5 as H, H as W, a6 as j, a7 as T, D as b, C as R, z as B, c as v, a8 as Y, a9 as $, aa as q, ab as z, ac as F, ad as G, ae as U, a as Z, s as J, e as K, h as S, v as Q } from "./h5jICo5o.js";
import { b as X } from "./DiTHEMLZ.js";
function ue(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const ee = ["beforeinput", "click", "change", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"];
function le(e) {
  return ee.includes(e);
}
const te = { formnovalidate: "formNoValidate", ismap: "isMap", nomodule: "noModule", playsinline: "playsInline", readonly: "readOnly", defaultvalue: "defaultValue", defaultchecked: "defaultChecked", srcobject: "srcObject", novalidate: "noValidate", allowfullscreen: "allowFullscreen", disablepictureinpicture: "disablePictureInPicture", disableremoteplayback: "disableRemotePlayback" };
function ce(e) {
  return e = e.toLowerCase(), te[e] ?? e;
}
const re = ["touchstart", "touchmove"];
function ae(e) {
  return re.includes(e);
}
function ne(e) {
  var t = D, a = N;
  m(null), w(null);
  try {
    return e();
  } finally {
    m(t), w(a);
  }
}
const I = /* @__PURE__ */ new Set(), A = /* @__PURE__ */ new Set();
function de(e, t, a, s = {}) {
  function i(r) {
    if (s.capture || y.call(t, r), !r.cancelBubble) return ne(() => a == null ? void 0 : a.call(this, r));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? x(() => {
    t.addEventListener(e, i, s);
  }) : t.addEventListener(e, i, s), i;
}
function fe(e) {
  for (var t = 0; t < e.length; t++) I.add(e[t]);
  for (var a of A) a(e);
}
function y(e) {
  var _a;
  var t = this, a = t.ownerDocument, s = e.type, i = ((_a = e.composedPath) == null ? void 0 : _a.call(e)) || [], r = i[0] || e.target, l = 0, f = e.__root;
  if (f) {
    var c = i.indexOf(f);
    if (c !== -1 && (t === document || t === window)) {
      e.__root = t;
      return;
    }
    var _ = i.indexOf(t);
    if (_ === -1) return;
    c <= _ && (l = c);
  }
  if (r = i[l] || e.target, r !== t) {
    C(e, "currentTarget", { configurable: true, get() {
      return r || a;
    } });
    var E = D, u = N;
    m(null), w(null);
    try {
      for (var n, o = []; r !== null; ) {
        var p = r.assignedSlot || r.parentNode || r.host || null;
        try {
          var d = r["__" + s];
          if (d != null && (!r.disabled || e.target === r)) if (M(d)) {
            var [V, ...P] = d;
            V.apply(r, [e, ...P]);
          } else d.call(r, e);
        } catch (g) {
          n ? o.push(g) : n = g;
        }
        if (e.cancelBubble || p === t || p === null) break;
        r = p;
      }
      if (n) {
        for (let g of o) queueMicrotask(() => {
          throw g;
        });
        throw n;
      }
    } finally {
      e.__root = t, delete e.currentTarget, m(E), w(u);
    }
  }
}
function _e(e, t) {
  var a = t == null ? "" : typeof t == "object" ? t + "" : t;
  a !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = a, e.nodeValue = a + "");
}
function oe(e, t) {
  return O(e, t);
}
function pe(e, t) {
  k(), t.intro = t.intro ?? false;
  const a = t.target, s = S, i = v;
  try {
    for (var r = H(a); r && (r.nodeType !== 8 || r.data !== W); ) r = j(r);
    if (!r) throw T;
    b(true), R(r), B();
    const l = O(e, { ...t, anchor: r });
    if (v === null || v.nodeType !== 8 || v.data !== Y) throw $(), T;
    return b(false), l;
  } catch (l) {
    if (l === T) return t.recover === false && q(), k(), z(a), b(false), oe(e, t);
    throw l;
  } finally {
    b(s), R(i);
  }
}
const h = /* @__PURE__ */ new Map();
function O(e, { target: t, anchor: a, props: s = {}, events: i, context: r, intro: l = true }) {
  k();
  var f = /* @__PURE__ */ new Set(), c = (u) => {
    for (var n = 0; n < u.length; n++) {
      var o = u[n];
      if (!f.has(o)) {
        f.add(o);
        var p = ae(o);
        t.addEventListener(o, y, { passive: p });
        var d = h.get(o);
        d === void 0 ? (document.addEventListener(o, y, { passive: p }), h.set(o, 1)) : h.set(o, d + 1);
      }
    }
  };
  c(F(I)), A.add(c);
  var _ = void 0, E = G(() => {
    var u = a ?? t.appendChild(U());
    return Z(() => {
      if (r) {
        J({});
        var n = K;
        n.c = r;
      }
      i && (s.$$events = i), S && X(u, null), _ = e(u, s) || {}, S && (N.nodes_end = v), r && Q();
    }), () => {
      var _a;
      for (var n of f) {
        t.removeEventListener(n, y);
        var o = h.get(n);
        --o === 0 ? (document.removeEventListener(n, y), h.delete(n)) : h.set(n, o);
      }
      A.delete(c), u !== a && ((_a = u.parentNode) == null ? void 0 : _a.removeChild(u));
    };
  });
  return L.set(_, E), _;
}
let L = /* @__PURE__ */ new WeakMap();
function he(e, t) {
  const a = L.get(e);
  return a ? (L.delete(e), a(t)) : Promise.resolve();
}
export {
  le as a,
  de as c,
  fe as d,
  pe as h,
  ue as i,
  oe as m,
  ce as n,
  _e as s,
  he as u
};
