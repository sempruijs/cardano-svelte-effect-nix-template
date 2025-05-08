import {
  Z as b,
  _ as m,
  $ as D,
  a0 as N,
  a1 as C,
  a2 as M,
  a3 as x,
  a4 as H,
  a5 as k,
  a6 as W,
  H as j,
  a7 as B,
  a8 as T,
  D as w,
  C as R,
  z as Y,
  c as v,
  a9 as $,
  aa as q,
  ab as z,
  ac as F,
  ad as G,
  ae as U,
  af as Z,
  a as J,
  s as K,
  e as Q,
  h as S,
  v as X,
} from "./CqlScXHw.js";
import { b as ee } from "./GuR79IhO.js";
function ce(e) {
  return (
    e.endsWith("capture") &&
    e !== "gotpointercapture" &&
    e !== "lostpointercapture"
  );
}
const te = [
  "beforeinput",
  "click",
  "change",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart",
];
function de(e) {
  return te.includes(e);
}
const re = {
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly",
  defaultvalue: "defaultValue",
  defaultchecked: "defaultChecked",
  srcobject: "srcObject",
  novalidate: "noValidate",
  allowfullscreen: "allowFullscreen",
  disablepictureinpicture: "disablePictureInPicture",
  disableremoteplayback: "disableRemotePlayback",
};
function fe(e) {
  return (e = e.toLowerCase()), re[e] ?? e;
}
const ae = ["touchstart", "touchmove"];
function ne(e) {
  return ae.includes(e);
}
function oe(e) {
  var t = D,
    a = N;
  b(null), m(null);
  try {
    return e();
  } finally {
    b(t), m(a);
  }
}
const I = /* @__PURE__ */ new Set(),
  L = /* @__PURE__ */ new Set();
function ie(e, t, a, s = {}) {
  function o(r) {
    if ((s.capture || y.call(t, r), !r.cancelBubble))
      return oe(() => (a == null ? void 0 : a.call(this, r)));
  }
  return (
    e.startsWith("pointer") || e.startsWith("touch") || e === "wheel"
      ? M(() => {
          t.addEventListener(e, o, s);
        })
      : t.addEventListener(e, o, s),
    o
  );
}
function _e(e, t, a, s, o) {
  var r = { capture: s, passive: o },
    u = ie(e, t, a, r);
  (t === document.body || t === window || t === document) &&
    C(() => {
      t.removeEventListener(e, u, r);
    });
}
function pe(e) {
  for (var t = 0; t < e.length; t++) I.add(e[t]);
  for (var a of L) a(e);
}
function y(e) {
  var _a;
  var t = this,
    a = t.ownerDocument,
    s = e.type,
    o = ((_a = e.composedPath) == null ? void 0 : _a.call(e)) || [],
    r = o[0] || e.target,
    u = 0,
    f = e.__root;
  if (f) {
    var c = o.indexOf(f);
    if (c !== -1 && (t === document || t === window)) {
      e.__root = t;
      return;
    }
    var _ = o.indexOf(t);
    if (_ === -1) return;
    c <= _ && (u = c);
  }
  if (((r = o[u] || e.target), r !== t)) {
    x(e, "currentTarget", {
      configurable: true,
      get() {
        return r || a;
      },
    });
    var E = D,
      l = N;
    b(null), m(null);
    try {
      for (var n, i = []; r !== null; ) {
        var p = r.assignedSlot || r.parentNode || r.host || null;
        try {
          var d = r["__" + s];
          if (d != null && (!r.disabled || e.target === r))
            if (H(d)) {
              var [V, ...P] = d;
              V.apply(r, [e, ...P]);
            } else d.call(r, e);
        } catch (g) {
          n ? i.push(g) : (n = g);
        }
        if (e.cancelBubble || p === t || p === null) break;
        r = p;
      }
      if (n) {
        for (let g of i)
          queueMicrotask(() => {
            throw g;
          });
        throw n;
      }
    } finally {
      (e.__root = t), delete e.currentTarget, b(E), m(l);
    }
  }
}
function he(e, t) {
  var a = t == null ? "" : typeof t == "object" ? t + "" : t;
  a !== (e.__t ?? (e.__t = e.nodeValue)) &&
    ((e.__t = a), (e.nodeValue = a + ""));
}
function se(e, t) {
  return O(e, t);
}
function ve(e, t) {
  k(), (t.intro = t.intro ?? false);
  const a = t.target,
    s = S,
    o = v;
  try {
    for (var r = W(a); r && (r.nodeType !== 8 || r.data !== j); ) r = B(r);
    if (!r) throw T;
    w(true), R(r), Y();
    const u = O(e, { ...t, anchor: r });
    if (v === null || v.nodeType !== 8 || v.data !== $) throw (q(), T);
    return w(false), u;
  } catch (u) {
    if (u === T)
      return t.recover === false && z(), k(), F(a), w(false), se(e, t);
    throw u;
  } finally {
    w(s), R(o);
  }
}
const h = /* @__PURE__ */ new Map();
function O(
  e,
  {
    target: t,
    anchor: a,
    props: s = {},
    events: o,
    context: r,
    intro: u = true,
  },
) {
  k();
  var f = /* @__PURE__ */ new Set(),
    c = (l) => {
      for (var n = 0; n < l.length; n++) {
        var i = l[n];
        if (!f.has(i)) {
          f.add(i);
          var p = ne(i);
          t.addEventListener(i, y, { passive: p });
          var d = h.get(i);
          d === void 0
            ? (document.addEventListener(i, y, { passive: p }), h.set(i, 1))
            : h.set(i, d + 1);
        }
      }
    };
  c(G(I)), L.add(c);
  var _ = void 0,
    E = U(() => {
      var l = a ?? t.appendChild(Z());
      return (
        J(() => {
          if (r) {
            K({});
            var n = Q;
            n.c = r;
          }
          o && (s.$$events = o),
            S && ee(l, null),
            (_ = e(l, s) || {}),
            S && (N.nodes_end = v),
            r && X();
        }),
        () => {
          var _a;
          for (var n of f) {
            t.removeEventListener(n, y);
            var i = h.get(n);
            --i === 0
              ? (document.removeEventListener(n, y), h.delete(n))
              : h.set(n, i);
          }
          L.delete(c),
            l !== a &&
              ((_a = l.parentNode) == null ? void 0 : _a.removeChild(l));
        }
      );
    });
  return A.set(_, E), _;
}
let A = /* @__PURE__ */ new WeakMap();
function ye(e, t) {
  const a = A.get(e);
  return a ? (A.delete(e), a(t)) : Promise.resolve();
}
export {
  de as a,
  ie as c,
  pe as d,
  _e as e,
  ve as h,
  ce as i,
  se as m,
  fe as n,
  he as s,
  ye as u,
};
