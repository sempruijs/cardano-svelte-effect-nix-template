import { t as u, a as g } from "../chunks/GuR79IhO.js";
import { i as h } from "../chunks/Btlpk4dg.js";
import {
  s as v,
  q as l,
  t as d,
  v as x,
  w as s,
  x as a,
  y as _,
} from "../chunks/CqlScXHw.js";
import { s as o } from "../chunks/CBCN7sLG.js";
import { s as $, p } from "../chunks/BK8VanFS.js";
const k = {
  get error() {
    return p.error;
  },
  get status() {
    return p.status;
  },
};
$.updated.check;
const m = k;
var b = u("<h1> </h1> <p> </p>", 1);
function z(i, n) {
  v(n, false), h();
  var r = b(),
    t = l(r),
    c = s(t, true);
  a(t);
  var e = _(t, 2),
    f = s(e, true);
  a(e),
    d(() => {
      var _a;
      o(c, m.status), o(f, (_a = m.error) == null ? void 0 : _a.message);
    }),
    g(i, r),
    x();
}
export { z as component };
