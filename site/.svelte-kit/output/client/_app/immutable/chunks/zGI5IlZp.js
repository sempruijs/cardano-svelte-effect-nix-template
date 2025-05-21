import { b as U, h as P, z as C, E as K, H as j, A as z, B as V, C as Z, D as N, F as Y, a as O, G as w, U as $, c as M, I as D, J, L as Q, o as q, K as W, P as X, k as h, M as x, N as k, O as ee, g as y, Q as re, S as F, R as G, f as ne, T as se, V as te, W as ae, X as ie, Y as I } from "./h5jICo5o.js";
function ce(e, r, [s, n] = [0, 0]) {
  P && s === 0 && C();
  var t = e, a = null, f = null, v = $, S = s > 0 ? K : 0, l = false;
  const R = (u, o = true) => {
    l = true, p(o, u);
  }, p = (u, o) => {
    if (v === (v = u)) return;
    let d = false;
    if (P && n !== -1) {
      if (s === 0) {
        const c = t.data;
        c === j ? n = 0 : c === z ? n = 1 / 0 : (n = parseInt(c.substring(1)), n !== n && (n = v ? 1 / 0 : -1));
      }
      const g = n > s;
      !!v === g && (t = V(), Z(t), N(false), d = true, n = -1);
    }
    v ? (a ? Y(a) : o && (a = O(() => o(t))), f && w(f, () => {
      f = null;
    })) : (f ? Y(f) : o && (f = O(() => o(t, [s + 1, n]))), a && w(a, () => {
      a = null;
    })), d && N(true);
  };
  U(() => {
    l = false, r(R), l || p(null, null);
  }, S), P && (t = M);
}
function _e(e, r, s) {
  P && C();
  var n = e, t, a;
  U(() => {
    t !== (t = r()) && (a && (w(a), a = null), t && (a = O(() => s(n, t))));
  }, K), P && (n = M);
}
let m = false;
function fe(e) {
  var r = m;
  try {
    return m = false, [e(), m];
  } finally {
    m = r;
  }
}
const ue = { get(e, r) {
  if (!e.exclude.includes(r)) return e.props[r];
}, set(e, r) {
  return false;
}, getOwnPropertyDescriptor(e, r) {
  if (!e.exclude.includes(r) && r in e.props) return { enumerable: true, configurable: true, value: e.props[r] };
}, has(e, r) {
  return e.exclude.includes(r) ? false : r in e.props;
}, ownKeys(e) {
  return Reflect.ownKeys(e.props).filter((r) => !e.exclude.includes(r));
} };
function pe(e, r, s) {
  return new Proxy({ props: e, exclude: r }, ue);
}
const le = { get(e, r) {
  let s = e.props.length;
  for (; s--; ) {
    let n = e.props[s];
    if (I(n) && (n = n()), typeof n == "object" && n !== null && r in n) return n[r];
  }
}, set(e, r, s) {
  let n = e.props.length;
  for (; n--; ) {
    let t = e.props[n];
    I(t) && (t = t());
    const a = D(t, r);
    if (a && a.set) return a.set(s), true;
  }
  return false;
}, getOwnPropertyDescriptor(e, r) {
  let s = e.props.length;
  for (; s--; ) {
    let n = e.props[s];
    if (I(n) && (n = n()), typeof n == "object" && n !== null && r in n) {
      const t = D(n, r);
      return t && !t.configurable && (t.configurable = true), t;
    }
  }
}, has(e, r) {
  if (r === F || r === G) return false;
  for (let s of e.props) if (I(s) && (s = s()), s != null && r in s) return true;
  return false;
}, ownKeys(e) {
  const r = [];
  for (let s of e.props) {
    I(s) && (s = s());
    for (const n in s) r.includes(n) || r.push(n);
  }
  return r;
} };
function ve(...e) {
  return new Proxy({ props: e }, le);
}
function B(e) {
  var _a;
  return ((_a = e.ctx) == null ? void 0 : _a.d) ?? false;
}
function de(e, r, s, n) {
  var _a;
  var t = (s & te) !== 0, a = !ne || (s & se) !== 0, f = (s & re) !== 0, v = (s & ie) !== 0, S = false, l;
  f ? [l, S] = fe(() => e[r]) : l = e[r];
  var R = F in e || G in e, p = f && (((_a = D(e, r)) == null ? void 0 : _a.set) ?? (R && r in e && ((i) => e[r] = i))) || void 0, u = n, o = true, d = false, g = () => (d = true, o && (o = false, v ? u = y(n) : u = n), u);
  l === void 0 && n !== void 0 && (p && a && J(), l = g(), p && p(l));
  var c;
  if (a) c = () => {
    var i = e[r];
    return i === void 0 ? g() : (o = true, d = false, i);
  };
  else {
    var L = (t ? q : W)(() => e[r]);
    L.f |= Q, c = () => {
      var i = h(L);
      return i !== void 0 && (u = void 0), i === void 0 ? u : i;
    };
  }
  if ((s & X) === 0) return c;
  if (p) {
    var H = e.$$legacy;
    return function(i, b) {
      return arguments.length > 0 ? ((!a || !b || H || S) && p(b ? c() : i), i) : c();
    };
  }
  var A = false, E = ae(l), _ = q(() => {
    var i = c(), b = h(E);
    return A ? (A = false, b) : E.v = i;
  });
  return f && h(_), t || (_.equals = x), function(i, b) {
    if (arguments.length > 0) {
      const T = b ? h(_) : a && f ? k(i) : i;
      if (!_.equals(T)) {
        if (A = true, ee(E, T), d && u !== void 0 && (u = T), B(_)) return i;
        y(() => h(_));
      }
      return i;
    }
    return B(_) ? _.v : h(_);
  };
}
export {
  _e as c,
  ce as i,
  de as p,
  pe as r,
  ve as s
};
