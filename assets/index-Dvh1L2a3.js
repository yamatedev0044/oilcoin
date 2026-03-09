function qS(n, i) {
  for (var l = 0; l < i.length; l++) {
    const o = i[l];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const c in o)
        if (c !== "default" && !(c in n)) {
          const f = Object.getOwnPropertyDescriptor(o, c);
          f &&
            Object.defineProperty(
              n,
              c,
              f.get ? f : { enumerable: !0, get: () => o[c] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(n, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const i = document.createElement("link").relList;
  if (i && i.supports && i.supports("modulepreload")) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) o(c);
  new MutationObserver((c) => {
    for (const f of c)
      if (f.type === "childList")
        for (const d of f.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && o(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(c) {
    const f = {};
    return (
      c.integrity && (f.integrity = c.integrity),
      c.referrerPolicy && (f.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === "use-credentials"
        ? (f.credentials = "include")
        : c.crossOrigin === "anonymous"
        ? (f.credentials = "omit")
        : (f.credentials = "same-origin"),
      f
    );
  }
  function o(c) {
    if (c.ep) return;
    c.ep = !0;
    const f = l(c);
    fetch(c.href, f);
  }
})();
function F0(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default")
    ? n.default
    : n;
}
var ef = { exports: {} },
  bl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qg;
function GS() {
  if (qg) return bl;
  qg = 1;
  var n = Symbol.for("react.transitional.element"),
    i = Symbol.for("react.fragment");
  function l(o, c, f) {
    var d = null;
    if (
      (f !== void 0 && (d = "" + f),
      c.key !== void 0 && (d = "" + c.key),
      "key" in c)
    ) {
      f = {};
      for (var p in c) p !== "key" && (f[p] = c[p]);
    } else f = c;
    return (
      (c = f.ref),
      { $$typeof: n, type: o, key: d, ref: c !== void 0 ? c : null, props: f }
    );
  }
  return (bl.Fragment = i), (bl.jsx = l), (bl.jsxs = l), bl;
}
var Gg;
function XS() {
  return Gg || ((Gg = 1), (ef.exports = GS())), ef.exports;
}
var x = XS(),
  nf = { exports: {} },
  Sl = {},
  af = { exports: {} },
  sf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xg;
function PS() {
  return (
    Xg ||
      ((Xg = 1),
      (function (n) {
        function i(C, B) {
          var z = C.length;
          C.push(B);
          t: for (; 0 < z; ) {
            var et = (z - 1) >>> 1,
              lt = C[et];
            if (0 < c(lt, B)) (C[et] = B), (C[z] = lt), (z = et);
            else break t;
          }
        }
        function l(C) {
          return C.length === 0 ? null : C[0];
        }
        function o(C) {
          if (C.length === 0) return null;
          var B = C[0],
            z = C.pop();
          if (z !== B) {
            C[0] = z;
            t: for (var et = 0, lt = C.length, T = lt >>> 1; et < T; ) {
              var q = 2 * (et + 1) - 1,
                Y = C[q],
                J = q + 1,
                W = C[J];
              if (0 > c(Y, z))
                J < lt && 0 > c(W, Y)
                  ? ((C[et] = W), (C[J] = z), (et = J))
                  : ((C[et] = Y), (C[q] = z), (et = q));
              else if (J < lt && 0 > c(W, z)) (C[et] = W), (C[J] = z), (et = J);
              else break t;
            }
          }
          return B;
        }
        function c(C, B) {
          var z = C.sortIndex - B.sortIndex;
          return z !== 0 ? z : C.id - B.id;
        }
        if (
          ((n.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var f = performance;
          n.unstable_now = function () {
            return f.now();
          };
        } else {
          var d = Date,
            p = d.now();
          n.unstable_now = function () {
            return d.now() - p;
          };
        }
        var h = [],
          m = [],
          v = 1,
          g = null,
          S = 3,
          A = !1,
          E = !1,
          O = !1,
          _ = !1,
          R = typeof setTimeout == "function" ? setTimeout : null,
          X = typeof clearTimeout == "function" ? clearTimeout : null,
          U = typeof setImmediate < "u" ? setImmediate : null;
        function Q(C) {
          for (var B = l(m); B !== null; ) {
            if (B.callback === null) o(m);
            else if (B.startTime <= C)
              o(m), (B.sortIndex = B.expirationTime), i(h, B);
            else break;
            B = l(m);
          }
        }
        function Z(C) {
          if (((O = !1), Q(C), !E))
            if (l(h) !== null) (E = !0), $ || (($ = !0), pt());
            else {
              var B = l(m);
              B !== null && bt(Z, B.startTime - C);
            }
        }
        var $ = !1,
          K = -1,
          F = 5,
          ot = -1;
        function ft() {
          return _ ? !0 : !(n.unstable_now() - ot < F);
        }
        function At() {
          if (((_ = !1), $)) {
            var C = n.unstable_now();
            ot = C;
            var B = !0;
            try {
              t: {
                (E = !1), O && ((O = !1), X(K), (K = -1)), (A = !0);
                var z = S;
                try {
                  e: {
                    for (
                      Q(C), g = l(h);
                      g !== null && !(g.expirationTime > C && ft());

                    ) {
                      var et = g.callback;
                      if (typeof et == "function") {
                        (g.callback = null), (S = g.priorityLevel);
                        var lt = et(g.expirationTime <= C);
                        if (((C = n.unstable_now()), typeof lt == "function")) {
                          (g.callback = lt), Q(C), (B = !0);
                          break e;
                        }
                        g === l(h) && o(h), Q(C);
                      } else o(h);
                      g = l(h);
                    }
                    if (g !== null) B = !0;
                    else {
                      var T = l(m);
                      T !== null && bt(Z, T.startTime - C), (B = !1);
                    }
                  }
                  break t;
                } finally {
                  (g = null), (S = z), (A = !1);
                }
                B = void 0;
              }
            } finally {
              B ? pt() : ($ = !1);
            }
          }
        }
        var pt;
        if (typeof U == "function")
          pt = function () {
            U(At);
          };
        else if (typeof MessageChannel < "u") {
          var yt = new MessageChannel(),
            vt = yt.port2;
          (yt.port1.onmessage = At),
            (pt = function () {
              vt.postMessage(null);
            });
        } else
          pt = function () {
            R(At, 0);
          };
        function bt(C, B) {
          K = R(function () {
            C(n.unstable_now());
          }, B);
        }
        (n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (C) {
            C.callback = null;
          }),
          (n.unstable_forceFrameRate = function (C) {
            0 > C || 125 < C
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (F = 0 < C ? Math.floor(1e3 / C) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return S;
          }),
          (n.unstable_next = function (C) {
            switch (S) {
              case 1:
              case 2:
              case 3:
                var B = 3;
                break;
              default:
                B = S;
            }
            var z = S;
            S = B;
            try {
              return C();
            } finally {
              S = z;
            }
          }),
          (n.unstable_requestPaint = function () {
            _ = !0;
          }),
          (n.unstable_runWithPriority = function (C, B) {
            switch (C) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                C = 3;
            }
            var z = S;
            S = C;
            try {
              return B();
            } finally {
              S = z;
            }
          }),
          (n.unstable_scheduleCallback = function (C, B, z) {
            var et = n.unstable_now();
            switch (
              (typeof z == "object" && z !== null
                ? ((z = z.delay),
                  (z = typeof z == "number" && 0 < z ? et + z : et))
                : (z = et),
              C)
            ) {
              case 1:
                var lt = -1;
                break;
              case 2:
                lt = 250;
                break;
              case 5:
                lt = 1073741823;
                break;
              case 4:
                lt = 1e4;
                break;
              default:
                lt = 5e3;
            }
            return (
              (lt = z + lt),
              (C = {
                id: v++,
                callback: B,
                priorityLevel: C,
                startTime: z,
                expirationTime: lt,
                sortIndex: -1,
              }),
              z > et
                ? ((C.sortIndex = z),
                  i(m, C),
                  l(h) === null &&
                    C === l(m) &&
                    (O ? (X(K), (K = -1)) : (O = !0), bt(Z, z - et)))
                : ((C.sortIndex = lt),
                  i(h, C),
                  E || A || ((E = !0), $ || (($ = !0), pt()))),
              C
            );
          }),
          (n.unstable_shouldYield = ft),
          (n.unstable_wrapCallback = function (C) {
            var B = S;
            return function () {
              var z = S;
              S = B;
              try {
                return C.apply(this, arguments);
              } finally {
                S = z;
              }
            };
          });
      })(sf)),
    sf
  );
}
var Pg;
function KS() {
  return Pg || ((Pg = 1), (af.exports = PS())), af.exports;
}
var lf = { exports: {} },
  gt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Kg;
function ZS() {
  if (Kg) return gt;
  Kg = 1;
  var n = Symbol.for("react.transitional.element"),
    i = Symbol.for("react.portal"),
    l = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    c = Symbol.for("react.profiler"),
    f = Symbol.for("react.consumer"),
    d = Symbol.for("react.context"),
    p = Symbol.for("react.forward_ref"),
    h = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    v = Symbol.for("react.lazy"),
    g = Symbol.for("react.activity"),
    S = Symbol.iterator;
  function A(T) {
    return T === null || typeof T != "object"
      ? null
      : ((T = (S && T[S]) || T["@@iterator"]),
        typeof T == "function" ? T : null);
  }
  var E = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    O = Object.assign,
    _ = {};
  function R(T, q, Y) {
    (this.props = T),
      (this.context = q),
      (this.refs = _),
      (this.updater = Y || E);
  }
  (R.prototype.isReactComponent = {}),
    (R.prototype.setState = function (T, q) {
      if (typeof T != "object" && typeof T != "function" && T != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, T, q, "setState");
    }),
    (R.prototype.forceUpdate = function (T) {
      this.updater.enqueueForceUpdate(this, T, "forceUpdate");
    });
  function X() {}
  X.prototype = R.prototype;
  function U(T, q, Y) {
    (this.props = T),
      (this.context = q),
      (this.refs = _),
      (this.updater = Y || E);
  }
  var Q = (U.prototype = new X());
  (Q.constructor = U), O(Q, R.prototype), (Q.isPureReactComponent = !0);
  var Z = Array.isArray;
  function $() {}
  var K = { H: null, A: null, T: null, S: null },
    F = Object.prototype.hasOwnProperty;
  function ot(T, q, Y) {
    var J = Y.ref;
    return {
      $$typeof: n,
      type: T,
      key: q,
      ref: J !== void 0 ? J : null,
      props: Y,
    };
  }
  function ft(T, q) {
    return ot(T.type, q, T.props);
  }
  function At(T) {
    return typeof T == "object" && T !== null && T.$$typeof === n;
  }
  function pt(T) {
    var q = { "=": "=0", ":": "=2" };
    return (
      "$" +
      T.replace(/[=:]/g, function (Y) {
        return q[Y];
      })
    );
  }
  var yt = /\/+/g;
  function vt(T, q) {
    return typeof T == "object" && T !== null && T.key != null
      ? pt("" + T.key)
      : q.toString(36);
  }
  function bt(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (
          (typeof T.status == "string"
            ? T.then($, $)
            : ((T.status = "pending"),
              T.then(
                function (q) {
                  T.status === "pending" &&
                    ((T.status = "fulfilled"), (T.value = q));
                },
                function (q) {
                  T.status === "pending" &&
                    ((T.status = "rejected"), (T.reason = q));
                }
              )),
          T.status)
        ) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function C(T, q, Y, J, W) {
    var rt = typeof T;
    (rt === "undefined" || rt === "boolean") && (T = null);
    var it = !1;
    if (T === null) it = !0;
    else
      switch (rt) {
        case "bigint":
        case "string":
        case "number":
          it = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case n:
            case i:
              it = !0;
              break;
            case v:
              return (it = T._init), C(it(T._payload), q, Y, J, W);
          }
      }
    if (it)
      return (
        (W = W(T)),
        (it = J === "" ? "." + vt(T, 0) : J),
        Z(W)
          ? ((Y = ""),
            it != null && (Y = it.replace(yt, "$&/") + "/"),
            C(W, q, Y, "", function (ue) {
              return ue;
            }))
          : W != null &&
            (At(W) &&
              (W = ft(
                W,
                Y +
                  (W.key == null || (T && T.key === W.key)
                    ? ""
                    : ("" + W.key).replace(yt, "$&/") + "/") +
                  it
              )),
            q.push(W)),
        1
      );
    it = 0;
    var mt = J === "" ? "." : J + ":";
    if (Z(T))
      for (var Ct = 0; Ct < T.length; Ct++)
        (J = T[Ct]), (rt = mt + vt(J, Ct)), (it += C(J, q, Y, rt, W));
    else if (((Ct = A(T)), typeof Ct == "function"))
      for (T = Ct.call(T), Ct = 0; !(J = T.next()).done; )
        (J = J.value), (rt = mt + vt(J, Ct++)), (it += C(J, q, Y, rt, W));
    else if (rt === "object") {
      if (typeof T.then == "function") return C(bt(T), q, Y, J, W);
      throw (
        ((q = String(T)),
        Error(
          "Objects are not valid as a React child (found: " +
            (q === "[object Object]"
              ? "object with keys {" + Object.keys(T).join(", ") + "}"
              : q) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return it;
  }
  function B(T, q, Y) {
    if (T == null) return T;
    var J = [],
      W = 0;
    return (
      C(T, J, "", "", function (rt) {
        return q.call(Y, rt, W++);
      }),
      J
    );
  }
  function z(T) {
    if (T._status === -1) {
      var q = T._result;
      (q = q()),
        q.then(
          function (Y) {
            (T._status === 0 || T._status === -1) &&
              ((T._status = 1), (T._result = Y));
          },
          function (Y) {
            (T._status === 0 || T._status === -1) &&
              ((T._status = 2), (T._result = Y));
          }
        ),
        T._status === -1 && ((T._status = 0), (T._result = q));
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var et =
      typeof reportError == "function"
        ? reportError
        : function (T) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var q = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof T == "object" &&
                  T !== null &&
                  typeof T.message == "string"
                    ? String(T.message)
                    : String(T),
                error: T,
              });
              if (!window.dispatchEvent(q)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", T);
              return;
            }
            console.error(T);
          },
    lt = {
      map: B,
      forEach: function (T, q, Y) {
        B(
          T,
          function () {
            q.apply(this, arguments);
          },
          Y
        );
      },
      count: function (T) {
        var q = 0;
        return (
          B(T, function () {
            q++;
          }),
          q
        );
      },
      toArray: function (T) {
        return (
          B(T, function (q) {
            return q;
          }) || []
        );
      },
      only: function (T) {
        if (!At(T))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return T;
      },
    };
  return (
    (gt.Activity = g),
    (gt.Children = lt),
    (gt.Component = R),
    (gt.Fragment = l),
    (gt.Profiler = c),
    (gt.PureComponent = U),
    (gt.StrictMode = o),
    (gt.Suspense = h),
    (gt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K),
    (gt.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (T) {
        return K.H.useMemoCache(T);
      },
    }),
    (gt.cache = function (T) {
      return function () {
        return T.apply(null, arguments);
      };
    }),
    (gt.cacheSignal = function () {
      return null;
    }),
    (gt.cloneElement = function (T, q, Y) {
      if (T == null)
        throw Error(
          "The argument must be a React element, but you passed " + T + "."
        );
      var J = O({}, T.props),
        W = T.key;
      if (q != null)
        for (rt in (q.key !== void 0 && (W = "" + q.key), q))
          !F.call(q, rt) ||
            rt === "key" ||
            rt === "__self" ||
            rt === "__source" ||
            (rt === "ref" && q.ref === void 0) ||
            (J[rt] = q[rt]);
      var rt = arguments.length - 2;
      if (rt === 1) J.children = Y;
      else if (1 < rt) {
        for (var it = Array(rt), mt = 0; mt < rt; mt++)
          it[mt] = arguments[mt + 2];
        J.children = it;
      }
      return ot(T.type, W, J);
    }),
    (gt.createContext = function (T) {
      return (
        (T = {
          $$typeof: d,
          _currentValue: T,
          _currentValue2: T,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (T.Provider = T),
        (T.Consumer = { $$typeof: f, _context: T }),
        T
      );
    }),
    (gt.createElement = function (T, q, Y) {
      var J,
        W = {},
        rt = null;
      if (q != null)
        for (J in (q.key !== void 0 && (rt = "" + q.key), q))
          F.call(q, J) &&
            J !== "key" &&
            J !== "__self" &&
            J !== "__source" &&
            (W[J] = q[J]);
      var it = arguments.length - 2;
      if (it === 1) W.children = Y;
      else if (1 < it) {
        for (var mt = Array(it), Ct = 0; Ct < it; Ct++)
          mt[Ct] = arguments[Ct + 2];
        W.children = mt;
      }
      if (T && T.defaultProps)
        for (J in ((it = T.defaultProps), it))
          W[J] === void 0 && (W[J] = it[J]);
      return ot(T, rt, W);
    }),
    (gt.createRef = function () {
      return { current: null };
    }),
    (gt.forwardRef = function (T) {
      return { $$typeof: p, render: T };
    }),
    (gt.isValidElement = At),
    (gt.lazy = function (T) {
      return { $$typeof: v, _payload: { _status: -1, _result: T }, _init: z };
    }),
    (gt.memo = function (T, q) {
      return { $$typeof: m, type: T, compare: q === void 0 ? null : q };
    }),
    (gt.startTransition = function (T) {
      var q = K.T,
        Y = {};
      K.T = Y;
      try {
        var J = T(),
          W = K.S;
        W !== null && W(Y, J),
          typeof J == "object" &&
            J !== null &&
            typeof J.then == "function" &&
            J.then($, et);
      } catch (rt) {
        et(rt);
      } finally {
        q !== null && Y.types !== null && (q.types = Y.types), (K.T = q);
      }
    }),
    (gt.unstable_useCacheRefresh = function () {
      return K.H.useCacheRefresh();
    }),
    (gt.use = function (T) {
      return K.H.use(T);
    }),
    (gt.useActionState = function (T, q, Y) {
      return K.H.useActionState(T, q, Y);
    }),
    (gt.useCallback = function (T, q) {
      return K.H.useCallback(T, q);
    }),
    (gt.useContext = function (T) {
      return K.H.useContext(T);
    }),
    (gt.useDebugValue = function () {}),
    (gt.useDeferredValue = function (T, q) {
      return K.H.useDeferredValue(T, q);
    }),
    (gt.useEffect = function (T, q) {
      return K.H.useEffect(T, q);
    }),
    (gt.useEffectEvent = function (T) {
      return K.H.useEffectEvent(T);
    }),
    (gt.useId = function () {
      return K.H.useId();
    }),
    (gt.useImperativeHandle = function (T, q, Y) {
      return K.H.useImperativeHandle(T, q, Y);
    }),
    (gt.useInsertionEffect = function (T, q) {
      return K.H.useInsertionEffect(T, q);
    }),
    (gt.useLayoutEffect = function (T, q) {
      return K.H.useLayoutEffect(T, q);
    }),
    (gt.useMemo = function (T, q) {
      return K.H.useMemo(T, q);
    }),
    (gt.useOptimistic = function (T, q) {
      return K.H.useOptimistic(T, q);
    }),
    (gt.useReducer = function (T, q, Y) {
      return K.H.useReducer(T, q, Y);
    }),
    (gt.useRef = function (T) {
      return K.H.useRef(T);
    }),
    (gt.useState = function (T) {
      return K.H.useState(T);
    }),
    (gt.useSyncExternalStore = function (T, q, Y) {
      return K.H.useSyncExternalStore(T, q, Y);
    }),
    (gt.useTransition = function () {
      return K.H.useTransition();
    }),
    (gt.version = "19.2.1"),
    gt
  );
}
var Zg;
function Mr() {
  return Zg || ((Zg = 1), (lf.exports = ZS())), lf.exports;
}
var of = { exports: {} },
  be = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qg;
function QS() {
  if (Qg) return be;
  Qg = 1;
  var n = Mr();
  function i(h) {
    var m = "https://react.dev/errors/" + h;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        m += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return (
      "Minified React error #" +
      h +
      "; visit " +
      m +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function l() {}
  var o = {
      d: {
        f: l,
        r: function () {
          throw Error(i(522));
        },
        D: l,
        C: l,
        L: l,
        m: l,
        X: l,
        S: l,
        M: l,
      },
      p: 0,
      findDOMNode: null,
    },
    c = Symbol.for("react.portal");
  function f(h, m, v) {
    var g =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: g == null ? null : "" + g,
      children: h,
      containerInfo: m,
      implementation: v,
    };
  }
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(h, m) {
    if (h === "font") return "";
    if (typeof m == "string") return m === "use-credentials" ? m : "";
  }
  return (
    (be.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (be.createPortal = function (h, m) {
      var v =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
        throw Error(i(299));
      return f(h, m, null, v);
    }),
    (be.flushSync = function (h) {
      var m = d.T,
        v = o.p;
      try {
        if (((d.T = null), (o.p = 2), h)) return h();
      } finally {
        (d.T = m), (o.p = v), o.d.f();
      }
    }),
    (be.preconnect = function (h, m) {
      typeof h == "string" &&
        (m
          ? ((m = m.crossOrigin),
            (m =
              typeof m == "string"
                ? m === "use-credentials"
                  ? m
                  : ""
                : void 0))
          : (m = null),
        o.d.C(h, m));
    }),
    (be.prefetchDNS = function (h) {
      typeof h == "string" && o.d.D(h);
    }),
    (be.preinit = function (h, m) {
      if (typeof h == "string" && m && typeof m.as == "string") {
        var v = m.as,
          g = p(v, m.crossOrigin),
          S = typeof m.integrity == "string" ? m.integrity : void 0,
          A = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
        v === "style"
          ? o.d.S(h, typeof m.precedence == "string" ? m.precedence : void 0, {
              crossOrigin: g,
              integrity: S,
              fetchPriority: A,
            })
          : v === "script" &&
            o.d.X(h, {
              crossOrigin: g,
              integrity: S,
              fetchPriority: A,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
      }
    }),
    (be.preinitModule = function (h, m) {
      if (typeof h == "string")
        if (typeof m == "object" && m !== null) {
          if (m.as == null || m.as === "script") {
            var v = p(m.as, m.crossOrigin);
            o.d.M(h, {
              crossOrigin: v,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
          }
        } else m == null && o.d.M(h);
    }),
    (be.preload = function (h, m) {
      if (
        typeof h == "string" &&
        typeof m == "object" &&
        m !== null &&
        typeof m.as == "string"
      ) {
        var v = m.as,
          g = p(v, m.crossOrigin);
        o.d.L(h, v, {
          crossOrigin: g,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          type: typeof m.type == "string" ? m.type : void 0,
          fetchPriority:
            typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
          referrerPolicy:
            typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
          imageSrcSet:
            typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
          media: typeof m.media == "string" ? m.media : void 0,
        });
      }
    }),
    (be.preloadModule = function (h, m) {
      if (typeof h == "string")
        if (m) {
          var v = p(m.as, m.crossOrigin);
          o.d.m(h, {
            as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
            crossOrigin: v,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          });
        } else o.d.m(h);
    }),
    (be.requestFormReset = function (h) {
      o.d.r(h);
    }),
    (be.unstable_batchedUpdates = function (h, m) {
      return h(m);
    }),
    (be.useFormState = function (h, m, v) {
      return d.H.useFormState(h, m, v);
    }),
    (be.useFormStatus = function () {
      return d.H.useHostTransitionStatus();
    }),
    (be.version = "19.2.1"),
    be
  );
}
var Jg;
function Y0() {
  if (Jg) return of.exports;
  Jg = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), (of.exports = QS()), of.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $g;
function JS() {
  if ($g) return Sl;
  $g = 1;
  var n = KS(),
    i = Mr(),
    l = Y0();
  function o(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        e += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      e +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function c(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function f(t) {
    var e = t,
      a = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do (e = t), (e.flags & 4098) !== 0 && (a = e.return), (t = e.return);
      while (t);
    }
    return e.tag === 3 ? a : null;
  }
  function d(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (f(t) !== t) throw Error(o(188));
  }
  function m(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = f(t)), e === null)) throw Error(o(188));
      return e !== t ? null : t;
    }
    for (var a = t, s = e; ; ) {
      var r = a.return;
      if (r === null) break;
      var u = r.alternate;
      if (u === null) {
        if (((s = r.return), s !== null)) {
          a = s;
          continue;
        }
        break;
      }
      if (r.child === u.child) {
        for (u = r.child; u; ) {
          if (u === a) return h(r), t;
          if (u === s) return h(r), e;
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (a.return !== s.return) (a = r), (s = u);
      else {
        for (var y = !1, b = r.child; b; ) {
          if (b === a) {
            (y = !0), (a = r), (s = u);
            break;
          }
          if (b === s) {
            (y = !0), (s = r), (a = u);
            break;
          }
          b = b.sibling;
        }
        if (!y) {
          for (b = u.child; b; ) {
            if (b === a) {
              (y = !0), (a = u), (s = r);
              break;
            }
            if (b === s) {
              (y = !0), (s = u), (a = r);
              break;
            }
            b = b.sibling;
          }
          if (!y) throw Error(o(189));
        }
      }
      if (a.alternate !== s) throw Error(o(190));
    }
    if (a.tag !== 3) throw Error(o(188));
    return a.stateNode.current === a ? t : e;
  }
  function v(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = v(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var g = Object.assign,
    S = Symbol.for("react.element"),
    A = Symbol.for("react.transitional.element"),
    E = Symbol.for("react.portal"),
    O = Symbol.for("react.fragment"),
    _ = Symbol.for("react.strict_mode"),
    R = Symbol.for("react.profiler"),
    X = Symbol.for("react.consumer"),
    U = Symbol.for("react.context"),
    Q = Symbol.for("react.forward_ref"),
    Z = Symbol.for("react.suspense"),
    $ = Symbol.for("react.suspense_list"),
    K = Symbol.for("react.memo"),
    F = Symbol.for("react.lazy"),
    ot = Symbol.for("react.activity"),
    ft = Symbol.for("react.memo_cache_sentinel"),
    At = Symbol.iterator;
  function pt(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (At && t[At]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var yt = Symbol.for("react.client.reference");
  function vt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === yt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case O:
        return "Fragment";
      case R:
        return "Profiler";
      case _:
        return "StrictMode";
      case Z:
        return "Suspense";
      case $:
        return "SuspenseList";
      case ot:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case E:
          return "Portal";
        case U:
          return t.displayName || "Context";
        case X:
          return (t._context.displayName || "Context") + ".Consumer";
        case Q:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case K:
          return (
            (e = t.displayName || null), e !== null ? e : vt(t.type) || "Memo"
          );
        case F:
          (e = t._payload), (t = t._init);
          try {
            return vt(t(e));
          } catch {}
      }
    return null;
  }
  var bt = Array.isArray,
    C = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    B = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    z = { pending: !1, data: null, method: null, action: null },
    et = [],
    lt = -1;
  function T(t) {
    return { current: t };
  }
  function q(t) {
    0 > lt || ((t.current = et[lt]), (et[lt] = null), lt--);
  }
  function Y(t, e) {
    lt++, (et[lt] = t.current), (t.current = e);
  }
  var J = T(null),
    W = T(null),
    rt = T(null),
    it = T(null);
  function mt(t, e) {
    switch ((Y(rt, e), Y(W, t), Y(J, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? dg(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI)))
          (e = dg(e)), (t = mg(e, t));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    q(J), Y(J, t);
  }
  function Ct() {
    q(J), q(W), q(rt);
  }
  function ue(t) {
    t.memoizedState !== null && Y(it, t);
    var e = J.current,
      a = mg(e, t.type);
    e !== a && (Y(W, t), Y(J, a));
  }
  function Ae(t) {
    W.current === t && (q(J), q(W)),
      it.current === t && (q(it), (gl._currentValue = z));
  }
  var fe, Hn;
  function fn(t) {
    if (fe === void 0)
      try {
        throw Error();
      } catch (a) {
        var e = a.stack.trim().match(/\n( *(at )?)/);
        (fe = (e && e[1]) || ""),
          (Hn =
            -1 <
            a.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < a.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      fe +
      t +
      Hn
    );
  }
  var Ts = !1;
  function vi(t, e) {
    if (!t || Ts) return "";
    Ts = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var s = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var P = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(P.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(P, []);
                } catch (L) {
                  var V = L;
                }
                Reflect.construct(t, [], P);
              } else {
                try {
                  P.call();
                } catch (L) {
                  V = L;
                }
                t.call(P.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (L) {
                V = L;
              }
              (P = t()) &&
                typeof P.catch == "function" &&
                P.catch(function () {});
            }
          } catch (L) {
            if (L && V && typeof L.stack == "string") return [L.stack, V.stack];
          }
          return [null, null];
        },
      };
      s.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var r = Object.getOwnPropertyDescriptor(
        s.DetermineComponentFrameRoot,
        "name"
      );
      r &&
        r.configurable &&
        Object.defineProperty(s.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var u = s.DetermineComponentFrameRoot(),
        y = u[0],
        b = u[1];
      if (y && b) {
        var w = y.split(`
`),
          H = b.split(`
`);
        for (
          r = s = 0;
          s < w.length && !w[s].includes("DetermineComponentFrameRoot");

        )
          s++;
        for (; r < H.length && !H[r].includes("DetermineComponentFrameRoot"); )
          r++;
        if (s === w.length || r === H.length)
          for (
            s = w.length - 1, r = H.length - 1;
            1 <= s && 0 <= r && w[s] !== H[r];

          )
            r--;
        for (; 1 <= s && 0 <= r; s--, r--)
          if (w[s] !== H[r]) {
            if (s !== 1 || r !== 1)
              do
                if ((s--, r--, 0 > r || w[s] !== H[r])) {
                  var k =
                    `
` + w[s].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      k.includes("<anonymous>") &&
                      (k = k.replace("<anonymous>", t.displayName)),
                    k
                  );
                }
              while (1 <= s && 0 <= r);
            break;
          }
      }
    } finally {
      (Ts = !1), (Error.prepareStackTrace = a);
    }
    return (a = t ? t.displayName || t.name : "") ? fn(a) : "";
  }
  function Ua(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return fn(t.type);
      case 16:
        return fn("Lazy");
      case 13:
        return t.child !== e && e !== null
          ? fn("Suspense Fallback")
          : fn("Suspense");
      case 19:
        return fn("SuspenseList");
      case 0:
      case 15:
        return vi(t.type, !1);
      case 11:
        return vi(t.type.render, !1);
      case 1:
        return vi(t.type, !0);
      case 31:
        return fn("Activity");
      default:
        return "";
    }
  }
  function Ns(t) {
    try {
      var e = "",
        a = null;
      do (e += Ua(t, a)), (a = t), (t = t.return);
      while (t);
      return e;
    } catch (s) {
      return (
        `
Error generating stack: ` +
        s.message +
        `
` +
        s.stack
      );
    }
  }
  var ke = Object.prototype.hasOwnProperty,
    Ds = n.unstable_scheduleCallback,
    Cs = n.unstable_cancelCallback,
    we = n.unstable_shouldYield,
    sa = n.unstable_requestPaint,
    Ee = n.unstable_now,
    qr = n.unstable_getCurrentPriorityLevel,
    ka = n.unstable_ImmediatePriority,
    Pl = n.unstable_UserBlockingPriority,
    Fa = n.unstable_NormalPriority,
    Ms = n.unstable_LowPriority,
    _n = n.unstable_IdlePriority,
    Kl = n.log,
    la = n.unstable_setDisableYieldValue,
    Ya = null,
    Te = null;
  function dn(t) {
    if (
      (typeof Kl == "function" && la(t),
      Te && typeof Te.setStrictMode == "function")
    )
      try {
        Te.setStrictMode(Ya, t);
      } catch {}
  }
  var ve = Math.clz32 ? Math.clz32 : bn,
    Gr = Math.log,
    Os = Math.LN2;
  function bn(t) {
    return (t >>>= 0), t === 0 ? 32 : (31 - ((Gr(t) / Os) | 0)) | 0;
  }
  var xi = 256,
    bi = 262144,
    qa = 4194304;
  function Sn(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function ht(t, e, a) {
    var s = t.pendingLanes;
    if (s === 0) return 0;
    var r = 0,
      u = t.suspendedLanes,
      y = t.pingedLanes;
    t = t.warmLanes;
    var b = s & 134217727;
    return (
      b !== 0
        ? ((s = b & ~u),
          s !== 0
            ? (r = Sn(s))
            : ((y &= b),
              y !== 0
                ? (r = Sn(y))
                : a || ((a = b & ~t), a !== 0 && (r = Sn(a)))))
        : ((b = s & ~u),
          b !== 0
            ? (r = Sn(b))
            : y !== 0
            ? (r = Sn(y))
            : a || ((a = s & ~t), a !== 0 && (r = Sn(a)))),
      r === 0
        ? 0
        : e !== 0 &&
          e !== r &&
          (e & u) === 0 &&
          ((u = r & -r),
          (a = e & -e),
          u >= a || (u === 32 && (a & 4194048) !== 0))
        ? e
        : r
    );
  }
  function Yt(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function le(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function xe() {
    var t = qa;
    return (qa <<= 1), (qa & 62914560) === 0 && (qa = 4194304), t;
  }
  function oa(t) {
    for (var e = [], a = 0; 31 > a; a++) e.push(t);
    return e;
  }
  function Xt(t, e) {
    (t.pendingLanes |= e),
      e !== 268435456 &&
        ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0));
  }
  function Ce(t, e, a, s, r, u) {
    var y = t.pendingLanes;
    (t.pendingLanes = a),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= a),
      (t.entangledLanes &= a),
      (t.errorRecoveryDisabledLanes &= a),
      (t.shellSuspendCounter = 0);
    var b = t.entanglements,
      w = t.expirationTimes,
      H = t.hiddenUpdates;
    for (a = y & ~a; 0 < a; ) {
      var k = 31 - ve(a),
        P = 1 << k;
      (b[k] = 0), (w[k] = -1);
      var V = H[k];
      if (V !== null)
        for (H[k] = null, k = 0; k < V.length; k++) {
          var L = V[k];
          L !== null && (L.lane &= -536870913);
        }
      a &= ~P;
    }
    s !== 0 && Ga(t, s, 0),
      u !== 0 && r === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(y & ~e));
  }
  function Ga(t, e, a) {
    (t.pendingLanes |= e), (t.suspendedLanes &= ~e);
    var s = 31 - ve(e);
    (t.entangledLanes |= e),
      (t.entanglements[s] = t.entanglements[s] | 1073741824 | (a & 261930));
  }
  function Me(t, e) {
    var a = (t.entangledLanes |= e);
    for (t = t.entanglements; a; ) {
      var s = 31 - ve(a),
        r = 1 << s;
      (r & e) | (t[s] & e) && (t[s] |= e), (a &= ~r);
    }
  }
  function Oe(t, e) {
    var a = e & -e;
    return (
      (a = (a & 42) !== 0 ? 1 : Si(a)),
      (a & (t.suspendedLanes | e)) !== 0 ? 0 : a
    );
  }
  function Si(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function mn(t) {
    return (
      (t &= -t),
      2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Xr() {
    var t = B.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Vg(t.type));
  }
  function Id(t, e) {
    var a = B.p;
    try {
      return (B.p = t), e();
    } finally {
      B.p = a;
    }
  }
  var ra = Math.random().toString(36).slice(2),
    de = "__reactFiber$" + ra,
    Re = "__reactProps$" + ra,
    Ai = "__reactContainer$" + ra,
    Pr = "__reactEvents$" + ra,
    jb = "__reactListeners$" + ra,
    Hb = "__reactHandles$" + ra,
    Wd = "__reactResources$" + ra,
    Rs = "__reactMarker$" + ra;
  function Kr(t) {
    delete t[de], delete t[Re], delete t[Pr], delete t[jb], delete t[Hb];
  }
  function wi(t) {
    var e = t[de];
    if (e) return e;
    for (var a = t.parentNode; a; ) {
      if ((e = a[Ai] || a[de])) {
        if (
          ((a = e.alternate),
          e.child !== null || (a !== null && a.child !== null))
        )
          for (t = bg(t); t !== null; ) {
            if ((a = t[de])) return a;
            t = bg(t);
          }
        return e;
      }
      (t = a), (a = t.parentNode);
    }
    return null;
  }
  function Ei(t) {
    if ((t = t[de] || t[Ai])) {
      var e = t.tag;
      if (
        e === 5 ||
        e === 6 ||
        e === 13 ||
        e === 31 ||
        e === 26 ||
        e === 27 ||
        e === 3
      )
        return t;
    }
    return null;
  }
  function js(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function Ti(t) {
    var e = t[Wd];
    return (
      e ||
        (e = t[Wd] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      e
    );
  }
  function oe(t) {
    t[Rs] = !0;
  }
  var tm = new Set(),
    em = {};
  function Xa(t, e) {
    Ni(t, e), Ni(t + "Capture", e);
  }
  function Ni(t, e) {
    for (em[t] = e, t = 0; t < e.length; t++) tm.add(e[t]);
  }
  var _b = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    nm = {},
    am = {};
  function zb(t) {
    return ke.call(am, t)
      ? !0
      : ke.call(nm, t)
      ? !1
      : _b.test(t)
      ? (am[t] = !0)
      : ((nm[t] = !0), !1);
  }
  function Zl(t, e, a) {
    if (zb(e))
      if (a === null) t.removeAttribute(e);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var s = e.toLowerCase().slice(0, 5);
            if (s !== "data-" && s !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + a);
      }
  }
  function Ql(t, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + a);
    }
  }
  function zn(t, e, a, s) {
    if (s === null) t.removeAttribute(a);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(a);
          return;
      }
      t.setAttributeNS(e, a, "" + s);
    }
  }
  function Je(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function im(t) {
    var e = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (e === "checkbox" || e === "radio")
    );
  }
  function Vb(t, e, a) {
    var s = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof s < "u" &&
      typeof s.get == "function" &&
      typeof s.set == "function"
    ) {
      var r = s.get,
        u = s.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return r.call(this);
          },
          set: function (y) {
            (a = "" + y), u.call(this, y);
          },
        }),
        Object.defineProperty(t, e, { enumerable: s.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (y) {
            a = "" + y;
          },
          stopTracking: function () {
            (t._valueTracker = null), delete t[e];
          },
        }
      );
    }
  }
  function Zr(t) {
    if (!t._valueTracker) {
      var e = im(t) ? "checked" : "value";
      t._valueTracker = Vb(t, e, "" + t[e]);
    }
  }
  function sm(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var a = e.getValue(),
      s = "";
    return (
      t && (s = im(t) ? (t.checked ? "true" : "false") : t.value),
      (t = s),
      t !== a ? (e.setValue(t), !0) : !1
    );
  }
  function Jl(t) {
    if (
      ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Lb = /[\n"\\]/g;
  function $e(t) {
    return t.replace(Lb, function (e) {
      return "\\" + e.charCodeAt(0).toString(16) + " ";
    });
  }
  function Qr(t, e, a, s, r, u, y, b) {
    (t.name = ""),
      y != null &&
      typeof y != "function" &&
      typeof y != "symbol" &&
      typeof y != "boolean"
        ? (t.type = y)
        : t.removeAttribute("type"),
      e != null
        ? y === "number"
          ? ((e === 0 && t.value === "") || t.value != e) &&
            (t.value = "" + Je(e))
          : t.value !== "" + Je(e) && (t.value = "" + Je(e))
        : (y !== "submit" && y !== "reset") || t.removeAttribute("value"),
      e != null
        ? Jr(t, y, Je(e))
        : a != null
        ? Jr(t, y, Je(a))
        : s != null && t.removeAttribute("value"),
      r == null && u != null && (t.defaultChecked = !!u),
      r != null &&
        (t.checked = r && typeof r != "function" && typeof r != "symbol"),
      b != null &&
      typeof b != "function" &&
      typeof b != "symbol" &&
      typeof b != "boolean"
        ? (t.name = "" + Je(b))
        : t.removeAttribute("name");
  }
  function lm(t, e, a, s, r, u, y, b) {
    if (
      (u != null &&
        typeof u != "function" &&
        typeof u != "symbol" &&
        typeof u != "boolean" &&
        (t.type = u),
      e != null || a != null)
    ) {
      if (!((u !== "submit" && u !== "reset") || e != null)) {
        Zr(t);
        return;
      }
      (a = a != null ? "" + Je(a) : ""),
        (e = e != null ? "" + Je(e) : a),
        b || e === t.value || (t.value = e),
        (t.defaultValue = e);
    }
    (s = s ?? r),
      (s = typeof s != "function" && typeof s != "symbol" && !!s),
      (t.checked = b ? t.checked : !!s),
      (t.defaultChecked = !!s),
      y != null &&
        typeof y != "function" &&
        typeof y != "symbol" &&
        typeof y != "boolean" &&
        (t.name = y),
      Zr(t);
  }
  function Jr(t, e, a) {
    (e === "number" && Jl(t.ownerDocument) === t) ||
      t.defaultValue === "" + a ||
      (t.defaultValue = "" + a);
  }
  function Di(t, e, a, s) {
    if (((t = t.options), e)) {
      e = {};
      for (var r = 0; r < a.length; r++) e["$" + a[r]] = !0;
      for (a = 0; a < t.length; a++)
        (r = e.hasOwnProperty("$" + t[a].value)),
          t[a].selected !== r && (t[a].selected = r),
          r && s && (t[a].defaultSelected = !0);
    } else {
      for (a = "" + Je(a), e = null, r = 0; r < t.length; r++) {
        if (t[r].value === a) {
          (t[r].selected = !0), s && (t[r].defaultSelected = !0);
          return;
        }
        e !== null || t[r].disabled || (e = t[r]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function om(t, e, a) {
    if (
      e != null &&
      ((e = "" + Je(e)), e !== t.value && (t.value = e), a == null)
    ) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = a != null ? "" + Je(a) : "";
  }
  function rm(t, e, a, s) {
    if (e == null) {
      if (s != null) {
        if (a != null) throw Error(o(92));
        if (bt(s)) {
          if (1 < s.length) throw Error(o(93));
          s = s[0];
        }
        a = s;
      }
      a == null && (a = ""), (e = a);
    }
    (a = Je(e)),
      (t.defaultValue = a),
      (s = t.textContent),
      s === a && s !== "" && s !== null && (t.value = s),
      Zr(t);
  }
  function Ci(t, e) {
    if (e) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Bb = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function cm(t, e, a) {
    var s = e.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? s
        ? t.setProperty(e, "")
        : e === "float"
        ? (t.cssFloat = "")
        : (t[e] = "")
      : s
      ? t.setProperty(e, a)
      : typeof a != "number" || a === 0 || Bb.has(e)
      ? e === "float"
        ? (t.cssFloat = a)
        : (t[e] = ("" + a).trim())
      : (t[e] = a + "px");
  }
  function um(t, e, a) {
    if (e != null && typeof e != "object") throw Error(o(62));
    if (((t = t.style), a != null)) {
      for (var s in a)
        !a.hasOwnProperty(s) ||
          (e != null && e.hasOwnProperty(s)) ||
          (s.indexOf("--") === 0
            ? t.setProperty(s, "")
            : s === "float"
            ? (t.cssFloat = "")
            : (t[s] = ""));
      for (var r in e)
        (s = e[r]), e.hasOwnProperty(r) && a[r] !== s && cm(t, r, s);
    } else for (var u in e) e.hasOwnProperty(u) && cm(t, u, e[u]);
  }
  function $r(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Ub = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    kb =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function $l(t) {
    return kb.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function Vn() {}
  var Ir = null;
  function Wr(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Mi = null,
    Oi = null;
  function fm(t) {
    var e = Ei(t);
    if (e && (t = e.stateNode)) {
      var a = t[Re] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case "input":
          if (
            (Qr(
              t,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ),
            (e = a.name),
            a.type === "radio" && e != null)
          ) {
            for (a = t; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + $e("" + e) + '"][type="radio"]'
              ),
                e = 0;
              e < a.length;
              e++
            ) {
              var s = a[e];
              if (s !== t && s.form === t.form) {
                var r = s[Re] || null;
                if (!r) throw Error(o(90));
                Qr(
                  s,
                  r.value,
                  r.defaultValue,
                  r.defaultValue,
                  r.checked,
                  r.defaultChecked,
                  r.type,
                  r.name
                );
              }
            }
            for (e = 0; e < a.length; e++)
              (s = a[e]), s.form === t.form && sm(s);
          }
          break t;
        case "textarea":
          om(t, a.value, a.defaultValue);
          break t;
        case "select":
          (e = a.value), e != null && Di(t, !!a.multiple, e, !1);
      }
    }
  }
  var tc = !1;
  function dm(t, e, a) {
    if (tc) return t(e, a);
    tc = !0;
    try {
      var s = t(e);
      return s;
    } finally {
      if (
        ((tc = !1),
        (Mi !== null || Oi !== null) &&
          (Uo(), Mi && ((e = Mi), (t = Oi), (Oi = Mi = null), fm(e), t)))
      )
        for (e = 0; e < t.length; e++) fm(t[e]);
    }
  }
  function Hs(t, e) {
    var a = t.stateNode;
    if (a === null) return null;
    var s = a[Re] || null;
    if (s === null) return null;
    a = s[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (s = !s.disabled) ||
          ((t = t.type),
          (s = !(
            t === "button" ||
            t === "input" ||
            t === "select" ||
            t === "textarea"
          ))),
          (t = !s);
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (a && typeof a != "function") throw Error(o(231, e, typeof a));
    return a;
  }
  var Ln = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    ec = !1;
  if (Ln)
    try {
      var _s = {};
      Object.defineProperty(_s, "passive", {
        get: function () {
          ec = !0;
        },
      }),
        window.addEventListener("test", _s, _s),
        window.removeEventListener("test", _s, _s);
    } catch {
      ec = !1;
    }
  var ca = null,
    nc = null,
    Il = null;
  function mm() {
    if (Il) return Il;
    var t,
      e = nc,
      a = e.length,
      s,
      r = "value" in ca ? ca.value : ca.textContent,
      u = r.length;
    for (t = 0; t < a && e[t] === r[t]; t++);
    var y = a - t;
    for (s = 1; s <= y && e[a - s] === r[u - s]; s++);
    return (Il = r.slice(t, 1 < s ? 1 - s : void 0));
  }
  function Wl(t) {
    var e = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
        : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function to() {
    return !0;
  }
  function hm() {
    return !1;
  }
  function je(t) {
    function e(a, s, r, u, y) {
      (this._reactName = a),
        (this._targetInst = r),
        (this.type = s),
        (this.nativeEvent = u),
        (this.target = y),
        (this.currentTarget = null);
      for (var b in t)
        t.hasOwnProperty(b) && ((a = t[b]), (this[b] = a ? a(u) : u[b]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? to
          : hm),
        (this.isPropagationStopped = hm),
        this
      );
    }
    return (
      g(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = to));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = to));
        },
        persist: function () {},
        isPersistent: to,
      }),
      e
    );
  }
  var Pa = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    eo = je(Pa),
    zs = g({}, Pa, { view: 0, detail: 0 }),
    Fb = je(zs),
    ac,
    ic,
    Vs,
    no = g({}, zs, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: lc,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== Vs &&
              (Vs && t.type === "mousemove"
                ? ((ac = t.screenX - Vs.screenX), (ic = t.screenY - Vs.screenY))
                : (ic = ac = 0),
              (Vs = t)),
            ac);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : ic;
      },
    }),
    pm = je(no),
    Yb = g({}, no, { dataTransfer: 0 }),
    qb = je(Yb),
    Gb = g({}, zs, { relatedTarget: 0 }),
    sc = je(Gb),
    Xb = g({}, Pa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Pb = je(Xb),
    Kb = g({}, Pa, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    Zb = je(Kb),
    Qb = g({}, Pa, { data: 0 }),
    gm = je(Qb),
    Jb = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    $b = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Ib = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Wb(t) {
    var e = this.nativeEvent;
    return e.getModifierState
      ? e.getModifierState(t)
      : (t = Ib[t])
      ? !!e[t]
      : !1;
  }
  function lc() {
    return Wb;
  }
  var t1 = g({}, zs, {
      key: function (t) {
        if (t.key) {
          var e = Jb[t.key] || t.key;
          if (e !== "Unidentified") return e;
        }
        return t.type === "keypress"
          ? ((t = Wl(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
          ? $b[t.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: lc,
      charCode: function (t) {
        return t.type === "keypress" ? Wl(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? Wl(t)
          : t.type === "keydown" || t.type === "keyup"
          ? t.keyCode
          : 0;
      },
    }),
    e1 = je(t1),
    n1 = g({}, no, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    ym = je(n1),
    a1 = g({}, zs, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: lc,
    }),
    i1 = je(a1),
    s1 = g({}, Pa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    l1 = je(s1),
    o1 = g({}, no, {
      deltaX: function (t) {
        return "deltaX" in t
          ? t.deltaX
          : "wheelDeltaX" in t
          ? -t.wheelDeltaX
          : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
          ? -t.wheelDeltaY
          : "wheelDelta" in t
          ? -t.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    r1 = je(o1),
    c1 = g({}, Pa, { newState: 0, oldState: 0 }),
    u1 = je(c1),
    f1 = [9, 13, 27, 32],
    oc = Ln && "CompositionEvent" in window,
    Ls = null;
  Ln && "documentMode" in document && (Ls = document.documentMode);
  var d1 = Ln && "TextEvent" in window && !Ls,
    vm = Ln && (!oc || (Ls && 8 < Ls && 11 >= Ls)),
    xm = " ",
    bm = !1;
  function Sm(t, e) {
    switch (t) {
      case "keyup":
        return f1.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Am(t) {
    return (t = t.detail), typeof t == "object" && "data" in t ? t.data : null;
  }
  var Ri = !1;
  function m1(t, e) {
    switch (t) {
      case "compositionend":
        return Am(e);
      case "keypress":
        return e.which !== 32 ? null : ((bm = !0), xm);
      case "textInput":
        return (t = e.data), t === xm && bm ? null : t;
      default:
        return null;
    }
  }
  function h1(t, e) {
    if (Ri)
      return t === "compositionend" || (!oc && Sm(t, e))
        ? ((t = mm()), (Il = nc = ca = null), (Ri = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
          if (e.char && 1 < e.char.length) return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return vm && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var p1 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function wm(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!p1[t.type] : e === "textarea";
  }
  function Em(t, e, a, s) {
    Mi ? (Oi ? Oi.push(s) : (Oi = [s])) : (Mi = s),
      (e = Po(e, "onChange")),
      0 < e.length &&
        ((a = new eo("onChange", "change", null, a, s)),
        t.push({ event: a, listeners: e }));
  }
  var Bs = null,
    Us = null;
  function g1(t) {
    lg(t, 0);
  }
  function ao(t) {
    var e = js(t);
    if (sm(e)) return t;
  }
  function Tm(t, e) {
    if (t === "change") return e;
  }
  var Nm = !1;
  if (Ln) {
    var rc;
    if (Ln) {
      var cc = "oninput" in document;
      if (!cc) {
        var Dm = document.createElement("div");
        Dm.setAttribute("oninput", "return;"),
          (cc = typeof Dm.oninput == "function");
      }
      rc = cc;
    } else rc = !1;
    Nm = rc && (!document.documentMode || 9 < document.documentMode);
  }
  function Cm() {
    Bs && (Bs.detachEvent("onpropertychange", Mm), (Us = Bs = null));
  }
  function Mm(t) {
    if (t.propertyName === "value" && ao(Us)) {
      var e = [];
      Em(e, Us, t, Wr(t)), dm(g1, e);
    }
  }
  function y1(t, e, a) {
    t === "focusin"
      ? (Cm(), (Bs = e), (Us = a), Bs.attachEvent("onpropertychange", Mm))
      : t === "focusout" && Cm();
  }
  function v1(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return ao(Us);
  }
  function x1(t, e) {
    if (t === "click") return ao(e);
  }
  function b1(t, e) {
    if (t === "input" || t === "change") return ao(e);
  }
  function S1(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var Fe = typeof Object.is == "function" ? Object.is : S1;
  function ks(t, e) {
    if (Fe(t, e)) return !0;
    if (
      typeof t != "object" ||
      t === null ||
      typeof e != "object" ||
      e === null
    )
      return !1;
    var a = Object.keys(t),
      s = Object.keys(e);
    if (a.length !== s.length) return !1;
    for (s = 0; s < a.length; s++) {
      var r = a[s];
      if (!ke.call(e, r) || !Fe(t[r], e[r])) return !1;
    }
    return !0;
  }
  function Om(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Rm(t, e) {
    var a = Om(t);
    t = 0;
    for (var s; a; ) {
      if (a.nodeType === 3) {
        if (((s = t + a.textContent.length), t <= e && s >= e))
          return { node: a, offset: e - t };
        t = s;
      }
      t: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break t;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Om(a);
    }
  }
  function jm(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
        ? !1
        : e && e.nodeType === 3
        ? jm(t, e.parentNode)
        : "contains" in t
        ? t.contains(e)
        : t.compareDocumentPosition
        ? !!(t.compareDocumentPosition(e) & 16)
        : !1
      : !1;
  }
  function Hm(t) {
    t =
      t != null &&
      t.ownerDocument != null &&
      t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = Jl(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof e.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) t = e.contentWindow;
      else break;
      e = Jl(t.document);
    }
    return e;
  }
  function uc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      e &&
      ((e === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        e === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var A1 = Ln && "documentMode" in document && 11 >= document.documentMode,
    ji = null,
    fc = null,
    Fs = null,
    dc = !1;
  function _m(t, e, a) {
    var s =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    dc ||
      ji == null ||
      ji !== Jl(s) ||
      ((s = ji),
      "selectionStart" in s && uc(s)
        ? (s = { start: s.selectionStart, end: s.selectionEnd })
        : ((s = (
            (s.ownerDocument && s.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (s = {
            anchorNode: s.anchorNode,
            anchorOffset: s.anchorOffset,
            focusNode: s.focusNode,
            focusOffset: s.focusOffset,
          })),
      (Fs && ks(Fs, s)) ||
        ((Fs = s),
        (s = Po(fc, "onSelect")),
        0 < s.length &&
          ((e = new eo("onSelect", "select", null, e, a)),
          t.push({ event: e, listeners: s }),
          (e.target = ji))));
  }
  function Ka(t, e) {
    var a = {};
    return (
      (a[t.toLowerCase()] = e.toLowerCase()),
      (a["Webkit" + t] = "webkit" + e),
      (a["Moz" + t] = "moz" + e),
      a
    );
  }
  var Hi = {
      animationend: Ka("Animation", "AnimationEnd"),
      animationiteration: Ka("Animation", "AnimationIteration"),
      animationstart: Ka("Animation", "AnimationStart"),
      transitionrun: Ka("Transition", "TransitionRun"),
      transitionstart: Ka("Transition", "TransitionStart"),
      transitioncancel: Ka("Transition", "TransitionCancel"),
      transitionend: Ka("Transition", "TransitionEnd"),
    },
    mc = {},
    zm = {};
  Ln &&
    ((zm = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Hi.animationend.animation,
      delete Hi.animationiteration.animation,
      delete Hi.animationstart.animation),
    "TransitionEvent" in window || delete Hi.transitionend.transition);
  function Za(t) {
    if (mc[t]) return mc[t];
    if (!Hi[t]) return t;
    var e = Hi[t],
      a;
    for (a in e) if (e.hasOwnProperty(a) && a in zm) return (mc[t] = e[a]);
    return t;
  }
  var Vm = Za("animationend"),
    Lm = Za("animationiteration"),
    Bm = Za("animationstart"),
    w1 = Za("transitionrun"),
    E1 = Za("transitionstart"),
    T1 = Za("transitioncancel"),
    Um = Za("transitionend"),
    km = new Map(),
    hc =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  hc.push("scrollEnd");
  function hn(t, e) {
    km.set(t, e), Xa(e, [t]);
  }
  var io =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var e = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" &&
                  t !== null &&
                  typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(e)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          },
    Ie = [],
    _i = 0,
    pc = 0;
  function so() {
    for (var t = _i, e = (pc = _i = 0); e < t; ) {
      var a = Ie[e];
      Ie[e++] = null;
      var s = Ie[e];
      Ie[e++] = null;
      var r = Ie[e];
      Ie[e++] = null;
      var u = Ie[e];
      if (((Ie[e++] = null), s !== null && r !== null)) {
        var y = s.pending;
        y === null ? (r.next = r) : ((r.next = y.next), (y.next = r)),
          (s.pending = r);
      }
      u !== 0 && Fm(a, r, u);
    }
  }
  function lo(t, e, a, s) {
    (Ie[_i++] = t),
      (Ie[_i++] = e),
      (Ie[_i++] = a),
      (Ie[_i++] = s),
      (pc |= s),
      (t.lanes |= s),
      (t = t.alternate),
      t !== null && (t.lanes |= s);
  }
  function gc(t, e, a, s) {
    return lo(t, e, a, s), oo(t);
  }
  function Qa(t, e) {
    return lo(t, null, null, e), oo(t);
  }
  function Fm(t, e, a) {
    t.lanes |= a;
    var s = t.alternate;
    s !== null && (s.lanes |= a);
    for (var r = !1, u = t.return; u !== null; )
      (u.childLanes |= a),
        (s = u.alternate),
        s !== null && (s.childLanes |= a),
        u.tag === 22 &&
          ((t = u.stateNode), t === null || t._visibility & 1 || (r = !0)),
        (t = u),
        (u = u.return);
    return t.tag === 3
      ? ((u = t.stateNode),
        r &&
          e !== null &&
          ((r = 31 - ve(a)),
          (t = u.hiddenUpdates),
          (s = t[r]),
          s === null ? (t[r] = [e]) : s.push(e),
          (e.lane = a | 536870912)),
        u)
      : null;
  }
  function oo(t) {
    if (50 < cl) throw ((cl = 0), (Tu = null), Error(o(185)));
    for (var e = t.return; e !== null; ) (t = e), (e = t.return);
    return t.tag === 3 ? t.stateNode : null;
  }
  var zi = {};
  function N1(t, e, a, s) {
    (this.tag = t),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = e),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = s),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function Ye(t, e, a, s) {
    return new N1(t, e, a, s);
  }
  function yc(t) {
    return (t = t.prototype), !(!t || !t.isReactComponent);
  }
  function Bn(t, e) {
    var a = t.alternate;
    return (
      a === null
        ? ((a = Ye(t.tag, e, t.key, t.mode)),
          (a.elementType = t.elementType),
          (a.type = t.type),
          (a.stateNode = t.stateNode),
          (a.alternate = t),
          (t.alternate = a))
        : ((a.pendingProps = e),
          (a.type = t.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = t.flags & 65011712),
      (a.childLanes = t.childLanes),
      (a.lanes = t.lanes),
      (a.child = t.child),
      (a.memoizedProps = t.memoizedProps),
      (a.memoizedState = t.memoizedState),
      (a.updateQueue = t.updateQueue),
      (e = t.dependencies),
      (a.dependencies =
        e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
      (a.sibling = t.sibling),
      (a.index = t.index),
      (a.ref = t.ref),
      (a.refCleanup = t.refCleanup),
      a
    );
  }
  function Ym(t, e) {
    t.flags &= 65011714;
    var a = t.alternate;
    return (
      a === null
        ? ((t.childLanes = 0),
          (t.lanes = e),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = a.childLanes),
          (t.lanes = a.lanes),
          (t.child = a.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = a.memoizedProps),
          (t.memoizedState = a.memoizedState),
          (t.updateQueue = a.updateQueue),
          (t.type = a.type),
          (e = a.dependencies),
          (t.dependencies =
            e === null
              ? null
              : { lanes: e.lanes, firstContext: e.firstContext })),
      t
    );
  }
  function ro(t, e, a, s, r, u) {
    var y = 0;
    if (((s = t), typeof t == "function")) yc(t) && (y = 1);
    else if (typeof t == "string")
      y = RS(t, a, J.current)
        ? 26
        : t === "html" || t === "head" || t === "body"
        ? 27
        : 5;
    else
      t: switch (t) {
        case ot:
          return (t = Ye(31, a, e, r)), (t.elementType = ot), (t.lanes = u), t;
        case O:
          return Ja(a.children, r, u, e);
        case _:
          (y = 8), (r |= 24);
          break;
        case R:
          return (
            (t = Ye(12, a, e, r | 2)), (t.elementType = R), (t.lanes = u), t
          );
        case Z:
          return (t = Ye(13, a, e, r)), (t.elementType = Z), (t.lanes = u), t;
        case $:
          return (t = Ye(19, a, e, r)), (t.elementType = $), (t.lanes = u), t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case U:
                y = 10;
                break t;
              case X:
                y = 9;
                break t;
              case Q:
                y = 11;
                break t;
              case K:
                y = 14;
                break t;
              case F:
                (y = 16), (s = null);
                break t;
            }
          (y = 29),
            (a = Error(o(130, t === null ? "null" : typeof t, ""))),
            (s = null);
      }
    return (
      (e = Ye(y, a, e, r)), (e.elementType = t), (e.type = s), (e.lanes = u), e
    );
  }
  function Ja(t, e, a, s) {
    return (t = Ye(7, t, s, e)), (t.lanes = a), t;
  }
  function vc(t, e, a) {
    return (t = Ye(6, t, null, e)), (t.lanes = a), t;
  }
  function qm(t) {
    var e = Ye(18, null, null, 0);
    return (e.stateNode = t), e;
  }
  function xc(t, e, a) {
    return (
      (e = Ye(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = a),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var Gm = new WeakMap();
  function We(t, e) {
    if (typeof t == "object" && t !== null) {
      var a = Gm.get(t);
      return a !== void 0
        ? a
        : ((e = { value: t, source: e, stack: Ns(e) }), Gm.set(t, e), e);
    }
    return { value: t, source: e, stack: Ns(e) };
  }
  var Vi = [],
    Li = 0,
    co = null,
    Ys = 0,
    tn = [],
    en = 0,
    ua = null,
    An = 1,
    wn = "";
  function Un(t, e) {
    (Vi[Li++] = Ys), (Vi[Li++] = co), (co = t), (Ys = e);
  }
  function Xm(t, e, a) {
    (tn[en++] = An), (tn[en++] = wn), (tn[en++] = ua), (ua = t);
    var s = An;
    t = wn;
    var r = 32 - ve(s) - 1;
    (s &= ~(1 << r)), (a += 1);
    var u = 32 - ve(e) + r;
    if (30 < u) {
      var y = r - (r % 5);
      (u = (s & ((1 << y) - 1)).toString(32)),
        (s >>= y),
        (r -= y),
        (An = (1 << (32 - ve(e) + r)) | (a << r) | s),
        (wn = u + t);
    } else (An = (1 << u) | (a << r) | s), (wn = t);
  }
  function bc(t) {
    t.return !== null && (Un(t, 1), Xm(t, 1, 0));
  }
  function Sc(t) {
    for (; t === co; )
      (co = Vi[--Li]), (Vi[Li] = null), (Ys = Vi[--Li]), (Vi[Li] = null);
    for (; t === ua; )
      (ua = tn[--en]),
        (tn[en] = null),
        (wn = tn[--en]),
        (tn[en] = null),
        (An = tn[--en]),
        (tn[en] = null);
  }
  function Pm(t, e) {
    (tn[en++] = An),
      (tn[en++] = wn),
      (tn[en++] = ua),
      (An = e.id),
      (wn = e.overflow),
      (ua = t);
  }
  var me = null,
    kt = null,
    Mt = !1,
    fa = null,
    nn = !1,
    Ac = Error(o(519));
  function da(t) {
    var e = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        ""
      )
    );
    throw (qs(We(e, t)), Ac);
  }
  function Km(t) {
    var e = t.stateNode,
      a = t.type,
      s = t.memoizedProps;
    switch (((e[de] = t), (e[Re] = s), a)) {
      case "dialog":
        Tt("cancel", e), Tt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        Tt("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < fl.length; a++) Tt(fl[a], e);
        break;
      case "source":
        Tt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        Tt("error", e), Tt("load", e);
        break;
      case "details":
        Tt("toggle", e);
        break;
      case "input":
        Tt("invalid", e),
          lm(
            e,
            s.value,
            s.defaultValue,
            s.checked,
            s.defaultChecked,
            s.type,
            s.name,
            !0
          );
        break;
      case "select":
        Tt("invalid", e);
        break;
      case "textarea":
        Tt("invalid", e), rm(e, s.value, s.defaultValue, s.children);
    }
    (a = s.children),
      (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
      e.textContent === "" + a ||
      s.suppressHydrationWarning === !0 ||
      ug(e.textContent, a)
        ? (s.popover != null && (Tt("beforetoggle", e), Tt("toggle", e)),
          s.onScroll != null && Tt("scroll", e),
          s.onScrollEnd != null && Tt("scrollend", e),
          s.onClick != null && (e.onclick = Vn),
          (e = !0))
        : (e = !1),
      e || da(t, !0);
  }
  function Zm(t) {
    for (me = t.return; me; )
      switch (me.tag) {
        case 5:
        case 31:
        case 13:
          nn = !1;
          return;
        case 27:
        case 3:
          nn = !0;
          return;
        default:
          me = me.return;
      }
  }
  function Bi(t) {
    if (t !== me) return !1;
    if (!Mt) return Zm(t), (Mt = !0), !1;
    var e = t.tag,
      a;
    if (
      ((a = e !== 3 && e !== 27) &&
        ((a = e === 5) &&
          ((a = t.type),
          (a =
            !(a !== "form" && a !== "button") || ku(t.type, t.memoizedProps))),
        (a = !a)),
      a && kt && da(t),
      Zm(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(o(317));
      kt = xg(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(o(317));
      kt = xg(t);
    } else
      e === 27
        ? ((e = kt), Na(t.type) ? ((t = Xu), (Xu = null), (kt = t)) : (kt = e))
        : (kt = me ? sn(t.stateNode.nextSibling) : null);
    return !0;
  }
  function $a() {
    (kt = me = null), (Mt = !1);
  }
  function wc() {
    var t = fa;
    return (
      t !== null &&
        (Ve === null ? (Ve = t) : Ve.push.apply(Ve, t), (fa = null)),
      t
    );
  }
  function qs(t) {
    fa === null ? (fa = [t]) : fa.push(t);
  }
  var Ec = T(null),
    Ia = null,
    kn = null;
  function ma(t, e, a) {
    Y(Ec, e._currentValue), (e._currentValue = a);
  }
  function Fn(t) {
    (t._currentValue = Ec.current), q(Ec);
  }
  function Tc(t, e, a) {
    for (; t !== null; ) {
      var s = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), s !== null && (s.childLanes |= e))
          : s !== null && (s.childLanes & e) !== e && (s.childLanes |= e),
        t === a)
      )
        break;
      t = t.return;
    }
  }
  function Nc(t, e, a, s) {
    var r = t.child;
    for (r !== null && (r.return = t); r !== null; ) {
      var u = r.dependencies;
      if (u !== null) {
        var y = r.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var b = u;
          u = r;
          for (var w = 0; w < e.length; w++)
            if (b.context === e[w]) {
              (u.lanes |= a),
                (b = u.alternate),
                b !== null && (b.lanes |= a),
                Tc(u.return, a, t),
                s || (y = null);
              break t;
            }
          u = b.next;
        }
      } else if (r.tag === 18) {
        if (((y = r.return), y === null)) throw Error(o(341));
        (y.lanes |= a),
          (u = y.alternate),
          u !== null && (u.lanes |= a),
          Tc(y, a, t),
          (y = null);
      } else y = r.child;
      if (y !== null) y.return = r;
      else
        for (y = r; y !== null; ) {
          if (y === t) {
            y = null;
            break;
          }
          if (((r = y.sibling), r !== null)) {
            (r.return = y.return), (y = r);
            break;
          }
          y = y.return;
        }
      r = y;
    }
  }
  function Ui(t, e, a, s) {
    t = null;
    for (var r = e, u = !1; r !== null; ) {
      if (!u) {
        if ((r.flags & 524288) !== 0) u = !0;
        else if ((r.flags & 262144) !== 0) break;
      }
      if (r.tag === 10) {
        var y = r.alternate;
        if (y === null) throw Error(o(387));
        if (((y = y.memoizedProps), y !== null)) {
          var b = r.type;
          Fe(r.pendingProps.value, y.value) ||
            (t !== null ? t.push(b) : (t = [b]));
        }
      } else if (r === it.current) {
        if (((y = r.alternate), y === null)) throw Error(o(387));
        y.memoizedState.memoizedState !== r.memoizedState.memoizedState &&
          (t !== null ? t.push(gl) : (t = [gl]));
      }
      r = r.return;
    }
    t !== null && Nc(e, t, a, s), (e.flags |= 262144);
  }
  function uo(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Fe(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Wa(t) {
    (Ia = t),
      (kn = null),
      (t = t.dependencies),
      t !== null && (t.firstContext = null);
  }
  function he(t) {
    return Qm(Ia, t);
  }
  function fo(t, e) {
    return Ia === null && Wa(t), Qm(t, e);
  }
  function Qm(t, e) {
    var a = e._currentValue;
    if (((e = { context: e, memoizedValue: a, next: null }), kn === null)) {
      if (t === null) throw Error(o(308));
      (kn = e),
        (t.dependencies = { lanes: 0, firstContext: e }),
        (t.flags |= 524288);
    } else kn = kn.next = e;
    return a;
  }
  var D1 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (a, s) {
                  t.push(s);
                },
              });
            this.abort = function () {
              (e.aborted = !0),
                t.forEach(function (a) {
                  return a();
                });
            };
          },
    C1 = n.unstable_scheduleCallback,
    M1 = n.unstable_NormalPriority,
    Wt = {
      $$typeof: U,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Dc() {
    return { controller: new D1(), data: new Map(), refCount: 0 };
  }
  function Gs(t) {
    t.refCount--,
      t.refCount === 0 &&
        C1(M1, function () {
          t.controller.abort();
        });
  }
  var Xs = null,
    Cc = 0,
    ki = 0,
    Fi = null;
  function O1(t, e) {
    if (Xs === null) {
      var a = (Xs = []);
      (Cc = 0),
        (ki = Ru()),
        (Fi = {
          status: "pending",
          value: void 0,
          then: function (s) {
            a.push(s);
          },
        });
    }
    return Cc++, e.then(Jm, Jm), e;
  }
  function Jm() {
    if (--Cc === 0 && Xs !== null) {
      Fi !== null && (Fi.status = "fulfilled");
      var t = Xs;
      (Xs = null), (ki = 0), (Fi = null);
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function R1(t, e) {
    var a = [],
      s = {
        status: "pending",
        value: null,
        reason: null,
        then: function (r) {
          a.push(r);
        },
      };
    return (
      t.then(
        function () {
          (s.status = "fulfilled"), (s.value = e);
          for (var r = 0; r < a.length; r++) (0, a[r])(e);
        },
        function (r) {
          for (s.status = "rejected", s.reason = r, r = 0; r < a.length; r++)
            (0, a[r])(void 0);
        }
      ),
      s
    );
  }
  var $m = C.S;
  C.S = function (t, e) {
    (_p = Ee()),
      typeof e == "object" &&
        e !== null &&
        typeof e.then == "function" &&
        O1(t, e),
      $m !== null && $m(t, e);
  };
  var ti = T(null);
  function Mc() {
    var t = ti.current;
    return t !== null ? t : Ut.pooledCache;
  }
  function mo(t, e) {
    e === null ? Y(ti, ti.current) : Y(ti, e.pool);
  }
  function Im() {
    var t = Mc();
    return t === null ? null : { parent: Wt._currentValue, pool: t };
  }
  var Yi = Error(o(460)),
    Oc = Error(o(474)),
    ho = Error(o(542)),
    po = { then: function () {} };
  function Wm(t) {
    return (t = t.status), t === "fulfilled" || t === "rejected";
  }
  function th(t, e, a) {
    switch (
      ((a = t[a]),
      a === void 0 ? t.push(e) : a !== e && (e.then(Vn, Vn), (e = a)),
      e.status)
    ) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw ((t = e.reason), nh(t), t);
      default:
        if (typeof e.status == "string") e.then(Vn, Vn);
        else {
          if (((t = Ut), t !== null && 100 < t.shellSuspendCounter))
            throw Error(o(482));
          (t = e),
            (t.status = "pending"),
            t.then(
              function (s) {
                if (e.status === "pending") {
                  var r = e;
                  (r.status = "fulfilled"), (r.value = s);
                }
              },
              function (s) {
                if (e.status === "pending") {
                  var r = e;
                  (r.status = "rejected"), (r.reason = s);
                }
              }
            );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw ((t = e.reason), nh(t), t);
        }
        throw ((ni = e), Yi);
    }
  }
  function ei(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function"
        ? ((ni = a), Yi)
        : a;
    }
  }
  var ni = null;
  function eh() {
    if (ni === null) throw Error(o(459));
    var t = ni;
    return (ni = null), t;
  }
  function nh(t) {
    if (t === Yi || t === ho) throw Error(o(483));
  }
  var qi = null,
    Ps = 0;
  function go(t) {
    var e = Ps;
    return (Ps += 1), qi === null && (qi = []), th(qi, t, e);
  }
  function Ks(t, e) {
    (e = e.props.ref), (t.ref = e !== void 0 ? e : null);
  }
  function yo(t, e) {
    throw e.$$typeof === S
      ? Error(o(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          o(
            31,
            t === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : t
          )
        ));
  }
  function ah(t) {
    function e(M, N) {
      if (t) {
        var j = M.deletions;
        j === null ? ((M.deletions = [N]), (M.flags |= 16)) : j.push(N);
      }
    }
    function a(M, N) {
      if (!t) return null;
      for (; N !== null; ) e(M, N), (N = N.sibling);
      return null;
    }
    function s(M) {
      for (var N = new Map(); M !== null; )
        M.key !== null ? N.set(M.key, M) : N.set(M.index, M), (M = M.sibling);
      return N;
    }
    function r(M, N) {
      return (M = Bn(M, N)), (M.index = 0), (M.sibling = null), M;
    }
    function u(M, N, j) {
      return (
        (M.index = j),
        t
          ? ((j = M.alternate),
            j !== null
              ? ((j = j.index), j < N ? ((M.flags |= 67108866), N) : j)
              : ((M.flags |= 67108866), N))
          : ((M.flags |= 1048576), N)
      );
    }
    function y(M) {
      return t && M.alternate === null && (M.flags |= 67108866), M;
    }
    function b(M, N, j, G) {
      return N === null || N.tag !== 6
        ? ((N = vc(j, M.mode, G)), (N.return = M), N)
        : ((N = r(N, j)), (N.return = M), N);
    }
    function w(M, N, j, G) {
      var ct = j.type;
      return ct === O
        ? k(M, N, j.props.children, G, j.key)
        : N !== null &&
          (N.elementType === ct ||
            (typeof ct == "object" &&
              ct !== null &&
              ct.$$typeof === F &&
              ei(ct) === N.type))
        ? ((N = r(N, j.props)), Ks(N, j), (N.return = M), N)
        : ((N = ro(j.type, j.key, j.props, null, M.mode, G)),
          Ks(N, j),
          (N.return = M),
          N);
    }
    function H(M, N, j, G) {
      return N === null ||
        N.tag !== 4 ||
        N.stateNode.containerInfo !== j.containerInfo ||
        N.stateNode.implementation !== j.implementation
        ? ((N = xc(j, M.mode, G)), (N.return = M), N)
        : ((N = r(N, j.children || [])), (N.return = M), N);
    }
    function k(M, N, j, G, ct) {
      return N === null || N.tag !== 7
        ? ((N = Ja(j, M.mode, G, ct)), (N.return = M), N)
        : ((N = r(N, j)), (N.return = M), N);
    }
    function P(M, N, j) {
      if (
        (typeof N == "string" && N !== "") ||
        typeof N == "number" ||
        typeof N == "bigint"
      )
        return (N = vc("" + N, M.mode, j)), (N.return = M), N;
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case A:
            return (
              (j = ro(N.type, N.key, N.props, null, M.mode, j)),
              Ks(j, N),
              (j.return = M),
              j
            );
          case E:
            return (N = xc(N, M.mode, j)), (N.return = M), N;
          case F:
            return (N = ei(N)), P(M, N, j);
        }
        if (bt(N) || pt(N))
          return (N = Ja(N, M.mode, j, null)), (N.return = M), N;
        if (typeof N.then == "function") return P(M, go(N), j);
        if (N.$$typeof === U) return P(M, fo(M, N), j);
        yo(M, N);
      }
      return null;
    }
    function V(M, N, j, G) {
      var ct = N !== null ? N.key : null;
      if (
        (typeof j == "string" && j !== "") ||
        typeof j == "number" ||
        typeof j == "bigint"
      )
        return ct !== null ? null : b(M, N, "" + j, G);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case A:
            return j.key === ct ? w(M, N, j, G) : null;
          case E:
            return j.key === ct ? H(M, N, j, G) : null;
          case F:
            return (j = ei(j)), V(M, N, j, G);
        }
        if (bt(j) || pt(j)) return ct !== null ? null : k(M, N, j, G, null);
        if (typeof j.then == "function") return V(M, N, go(j), G);
        if (j.$$typeof === U) return V(M, N, fo(M, j), G);
        yo(M, j);
      }
      return null;
    }
    function L(M, N, j, G, ct) {
      if (
        (typeof G == "string" && G !== "") ||
        typeof G == "number" ||
        typeof G == "bigint"
      )
        return (M = M.get(j) || null), b(N, M, "" + G, ct);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case A:
            return (
              (M = M.get(G.key === null ? j : G.key) || null), w(N, M, G, ct)
            );
          case E:
            return (
              (M = M.get(G.key === null ? j : G.key) || null), H(N, M, G, ct)
            );
          case F:
            return (G = ei(G)), L(M, N, j, G, ct);
        }
        if (bt(G) || pt(G)) return (M = M.get(j) || null), k(N, M, G, ct, null);
        if (typeof G.then == "function") return L(M, N, j, go(G), ct);
        if (G.$$typeof === U) return L(M, N, j, fo(N, G), ct);
        yo(N, G);
      }
      return null;
    }
    function tt(M, N, j, G) {
      for (
        var ct = null, Ot = null, st = N, St = (N = 0), Dt = null;
        st !== null && St < j.length;
        St++
      ) {
        st.index > St ? ((Dt = st), (st = null)) : (Dt = st.sibling);
        var Rt = V(M, st, j[St], G);
        if (Rt === null) {
          st === null && (st = Dt);
          break;
        }
        t && st && Rt.alternate === null && e(M, st),
          (N = u(Rt, N, St)),
          Ot === null ? (ct = Rt) : (Ot.sibling = Rt),
          (Ot = Rt),
          (st = Dt);
      }
      if (St === j.length) return a(M, st), Mt && Un(M, St), ct;
      if (st === null) {
        for (; St < j.length; St++)
          (st = P(M, j[St], G)),
            st !== null &&
              ((N = u(st, N, St)),
              Ot === null ? (ct = st) : (Ot.sibling = st),
              (Ot = st));
        return Mt && Un(M, St), ct;
      }
      for (st = s(st); St < j.length; St++)
        (Dt = L(st, M, St, j[St], G)),
          Dt !== null &&
            (t &&
              Dt.alternate !== null &&
              st.delete(Dt.key === null ? St : Dt.key),
            (N = u(Dt, N, St)),
            Ot === null ? (ct = Dt) : (Ot.sibling = Dt),
            (Ot = Dt));
      return (
        t &&
          st.forEach(function (Ra) {
            return e(M, Ra);
          }),
        Mt && Un(M, St),
        ct
      );
    }
    function ut(M, N, j, G) {
      if (j == null) throw Error(o(151));
      for (
        var ct = null,
          Ot = null,
          st = N,
          St = (N = 0),
          Dt = null,
          Rt = j.next();
        st !== null && !Rt.done;
        St++, Rt = j.next()
      ) {
        st.index > St ? ((Dt = st), (st = null)) : (Dt = st.sibling);
        var Ra = V(M, st, Rt.value, G);
        if (Ra === null) {
          st === null && (st = Dt);
          break;
        }
        t && st && Ra.alternate === null && e(M, st),
          (N = u(Ra, N, St)),
          Ot === null ? (ct = Ra) : (Ot.sibling = Ra),
          (Ot = Ra),
          (st = Dt);
      }
      if (Rt.done) return a(M, st), Mt && Un(M, St), ct;
      if (st === null) {
        for (; !Rt.done; St++, Rt = j.next())
          (Rt = P(M, Rt.value, G)),
            Rt !== null &&
              ((N = u(Rt, N, St)),
              Ot === null ? (ct = Rt) : (Ot.sibling = Rt),
              (Ot = Rt));
        return Mt && Un(M, St), ct;
      }
      for (st = s(st); !Rt.done; St++, Rt = j.next())
        (Rt = L(st, M, St, Rt.value, G)),
          Rt !== null &&
            (t &&
              Rt.alternate !== null &&
              st.delete(Rt.key === null ? St : Rt.key),
            (N = u(Rt, N, St)),
            Ot === null ? (ct = Rt) : (Ot.sibling = Rt),
            (Ot = Rt));
      return (
        t &&
          st.forEach(function (YS) {
            return e(M, YS);
          }),
        Mt && Un(M, St),
        ct
      );
    }
    function Bt(M, N, j, G) {
      if (
        (typeof j == "object" &&
          j !== null &&
          j.type === O &&
          j.key === null &&
          (j = j.props.children),
        typeof j == "object" && j !== null)
      ) {
        switch (j.$$typeof) {
          case A:
            t: {
              for (var ct = j.key; N !== null; ) {
                if (N.key === ct) {
                  if (((ct = j.type), ct === O)) {
                    if (N.tag === 7) {
                      a(M, N.sibling),
                        (G = r(N, j.props.children)),
                        (G.return = M),
                        (M = G);
                      break t;
                    }
                  } else if (
                    N.elementType === ct ||
                    (typeof ct == "object" &&
                      ct !== null &&
                      ct.$$typeof === F &&
                      ei(ct) === N.type)
                  ) {
                    a(M, N.sibling),
                      (G = r(N, j.props)),
                      Ks(G, j),
                      (G.return = M),
                      (M = G);
                    break t;
                  }
                  a(M, N);
                  break;
                } else e(M, N);
                N = N.sibling;
              }
              j.type === O
                ? ((G = Ja(j.props.children, M.mode, G, j.key)),
                  (G.return = M),
                  (M = G))
                : ((G = ro(j.type, j.key, j.props, null, M.mode, G)),
                  Ks(G, j),
                  (G.return = M),
                  (M = G));
            }
            return y(M);
          case E:
            t: {
              for (ct = j.key; N !== null; ) {
                if (N.key === ct)
                  if (
                    N.tag === 4 &&
                    N.stateNode.containerInfo === j.containerInfo &&
                    N.stateNode.implementation === j.implementation
                  ) {
                    a(M, N.sibling),
                      (G = r(N, j.children || [])),
                      (G.return = M),
                      (M = G);
                    break t;
                  } else {
                    a(M, N);
                    break;
                  }
                else e(M, N);
                N = N.sibling;
              }
              (G = xc(j, M.mode, G)), (G.return = M), (M = G);
            }
            return y(M);
          case F:
            return (j = ei(j)), Bt(M, N, j, G);
        }
        if (bt(j)) return tt(M, N, j, G);
        if (pt(j)) {
          if (((ct = pt(j)), typeof ct != "function")) throw Error(o(150));
          return (j = ct.call(j)), ut(M, N, j, G);
        }
        if (typeof j.then == "function") return Bt(M, N, go(j), G);
        if (j.$$typeof === U) return Bt(M, N, fo(M, j), G);
        yo(M, j);
      }
      return (typeof j == "string" && j !== "") ||
        typeof j == "number" ||
        typeof j == "bigint"
        ? ((j = "" + j),
          N !== null && N.tag === 6
            ? (a(M, N.sibling), (G = r(N, j)), (G.return = M), (M = G))
            : (a(M, N), (G = vc(j, M.mode, G)), (G.return = M), (M = G)),
          y(M))
        : a(M, N);
    }
    return function (M, N, j, G) {
      try {
        Ps = 0;
        var ct = Bt(M, N, j, G);
        return (qi = null), ct;
      } catch (st) {
        if (st === Yi || st === ho) throw st;
        var Ot = Ye(29, st, null, M.mode);
        return (Ot.lanes = G), (Ot.return = M), Ot;
      } finally {
      }
    };
  }
  var ai = ah(!0),
    ih = ah(!1),
    ha = !1;
  function Rc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function jc(t, e) {
    (t = t.updateQueue),
      e.updateQueue === t &&
        (e.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        });
  }
  function pa(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ga(t, e, a) {
    var s = t.updateQueue;
    if (s === null) return null;
    if (((s = s.shared), (jt & 2) !== 0)) {
      var r = s.pending;
      return (
        r === null ? (e.next = e) : ((e.next = r.next), (r.next = e)),
        (s.pending = e),
        (e = oo(t)),
        Fm(t, null, a),
        e
      );
    }
    return lo(t, s, e, a), oo(t);
  }
  function Zs(t, e, a) {
    if (
      ((e = e.updateQueue), e !== null && ((e = e.shared), (a & 4194048) !== 0))
    ) {
      var s = e.lanes;
      (s &= t.pendingLanes), (a |= s), (e.lanes = a), Me(t, a);
    }
  }
  function Hc(t, e) {
    var a = t.updateQueue,
      s = t.alternate;
    if (s !== null && ((s = s.updateQueue), a === s)) {
      var r = null,
        u = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var y = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          u === null ? (r = u = y) : (u = u.next = y), (a = a.next);
        } while (a !== null);
        u === null ? (r = u = e) : (u = u.next = e);
      } else r = u = e;
      (a = {
        baseState: s.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: u,
        shared: s.shared,
        callbacks: s.callbacks,
      }),
        (t.updateQueue = a);
      return;
    }
    (t = a.lastBaseUpdate),
      t === null ? (a.firstBaseUpdate = e) : (t.next = e),
      (a.lastBaseUpdate = e);
  }
  var _c = !1;
  function Qs() {
    if (_c) {
      var t = Fi;
      if (t !== null) throw t;
    }
  }
  function Js(t, e, a, s) {
    _c = !1;
    var r = t.updateQueue;
    ha = !1;
    var u = r.firstBaseUpdate,
      y = r.lastBaseUpdate,
      b = r.shared.pending;
    if (b !== null) {
      r.shared.pending = null;
      var w = b,
        H = w.next;
      (w.next = null), y === null ? (u = H) : (y.next = H), (y = w);
      var k = t.alternate;
      k !== null &&
        ((k = k.updateQueue),
        (b = k.lastBaseUpdate),
        b !== y &&
          (b === null ? (k.firstBaseUpdate = H) : (b.next = H),
          (k.lastBaseUpdate = w)));
    }
    if (u !== null) {
      var P = r.baseState;
      (y = 0), (k = H = w = null), (b = u);
      do {
        var V = b.lane & -536870913,
          L = V !== b.lane;
        if (L ? (Nt & V) === V : (s & V) === V) {
          V !== 0 && V === ki && (_c = !0),
            k !== null &&
              (k = k.next =
                {
                  lane: 0,
                  tag: b.tag,
                  payload: b.payload,
                  callback: null,
                  next: null,
                });
          t: {
            var tt = t,
              ut = b;
            V = e;
            var Bt = a;
            switch (ut.tag) {
              case 1:
                if (((tt = ut.payload), typeof tt == "function")) {
                  P = tt.call(Bt, P, V);
                  break t;
                }
                P = tt;
                break t;
              case 3:
                tt.flags = (tt.flags & -65537) | 128;
              case 0:
                if (
                  ((tt = ut.payload),
                  (V = typeof tt == "function" ? tt.call(Bt, P, V) : tt),
                  V == null)
                )
                  break t;
                P = g({}, P, V);
                break t;
              case 2:
                ha = !0;
            }
          }
          (V = b.callback),
            V !== null &&
              ((t.flags |= 64),
              L && (t.flags |= 8192),
              (L = r.callbacks),
              L === null ? (r.callbacks = [V]) : L.push(V));
        } else
          (L = {
            lane: V,
            tag: b.tag,
            payload: b.payload,
            callback: b.callback,
            next: null,
          }),
            k === null ? ((H = k = L), (w = P)) : (k = k.next = L),
            (y |= V);
        if (((b = b.next), b === null)) {
          if (((b = r.shared.pending), b === null)) break;
          (L = b),
            (b = L.next),
            (L.next = null),
            (r.lastBaseUpdate = L),
            (r.shared.pending = null);
        }
      } while (!0);
      k === null && (w = P),
        (r.baseState = w),
        (r.firstBaseUpdate = H),
        (r.lastBaseUpdate = k),
        u === null && (r.shared.lanes = 0),
        (Sa |= y),
        (t.lanes = y),
        (t.memoizedState = P);
    }
  }
  function sh(t, e) {
    if (typeof t != "function") throw Error(o(191, t));
    t.call(e);
  }
  function lh(t, e) {
    var a = t.callbacks;
    if (a !== null)
      for (t.callbacks = null, t = 0; t < a.length; t++) sh(a[t], e);
  }
  var Gi = T(null),
    vo = T(0);
  function oh(t, e) {
    (t = Jn), Y(vo, t), Y(Gi, e), (Jn = t | e.baseLanes);
  }
  function zc() {
    Y(vo, Jn), Y(Gi, Gi.current);
  }
  function Vc() {
    (Jn = vo.current), q(Gi), q(vo);
  }
  var qe = T(null),
    an = null;
  function ya(t) {
    var e = t.alternate;
    Y(Jt, Jt.current & 1),
      Y(qe, t),
      an === null &&
        (e === null || Gi.current !== null || e.memoizedState !== null) &&
        (an = t);
  }
  function Lc(t) {
    Y(Jt, Jt.current), Y(qe, t), an === null && (an = t);
  }
  function rh(t) {
    t.tag === 22
      ? (Y(Jt, Jt.current), Y(qe, t), an === null && (an = t))
      : va();
  }
  function va() {
    Y(Jt, Jt.current), Y(qe, qe.current);
  }
  function Ge(t) {
    q(qe), an === t && (an = null), q(Jt);
  }
  var Jt = T(0);
  function xo(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var a = e.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || qu(a) || Gu(a)))
          return e;
      } else if (
        e.tag === 19 &&
        (e.memoizedProps.revealOrder === "forwards" ||
          e.memoizedProps.revealOrder === "backwards" ||
          e.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          e.memoizedProps.revealOrder === "together")
      ) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        (e.child.return = e), (e = e.child);
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      (e.sibling.return = e.return), (e = e.sibling);
    }
    return null;
  }
  var Yn = 0,
    xt = null,
    Vt = null,
    te = null,
    bo = !1,
    Xi = !1,
    ii = !1,
    So = 0,
    $s = 0,
    Pi = null,
    j1 = 0;
  function Kt() {
    throw Error(o(321));
  }
  function Bc(t, e) {
    if (e === null) return !1;
    for (var a = 0; a < e.length && a < t.length; a++)
      if (!Fe(t[a], e[a])) return !1;
    return !0;
  }
  function Uc(t, e, a, s, r, u) {
    return (
      (Yn = u),
      (xt = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (C.H = t === null || t.memoizedState === null ? Xh : tu),
      (ii = !1),
      (u = a(s, r)),
      (ii = !1),
      Xi && (u = uh(e, a, s, r)),
      ch(t),
      u
    );
  }
  function ch(t) {
    C.H = tl;
    var e = Vt !== null && Vt.next !== null;
    if (((Yn = 0), (te = Vt = xt = null), (bo = !1), ($s = 0), (Pi = null), e))
      throw Error(o(300));
    t === null ||
      ee ||
      ((t = t.dependencies), t !== null && uo(t) && (ee = !0));
  }
  function uh(t, e, a, s) {
    xt = t;
    var r = 0;
    do {
      if ((Xi && (Pi = null), ($s = 0), (Xi = !1), 25 <= r))
        throw Error(o(301));
      if (((r += 1), (te = Vt = null), t.updateQueue != null)) {
        var u = t.updateQueue;
        (u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0);
      }
      (C.H = Ph), (u = e(a, s));
    } while (Xi);
    return u;
  }
  function H1() {
    var t = C.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == "function" ? Is(e) : e),
      (t = t.useState()[0]),
      (Vt !== null ? Vt.memoizedState : null) !== t && (xt.flags |= 1024),
      e
    );
  }
  function kc() {
    var t = So !== 0;
    return (So = 0), t;
  }
  function Fc(t, e, a) {
    (e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~a);
  }
  function Yc(t) {
    if (bo) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), (t = t.next);
      }
      bo = !1;
    }
    (Yn = 0), (te = Vt = xt = null), (Xi = !1), ($s = So = 0), (Pi = null);
  }
  function Ne() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return te === null ? (xt.memoizedState = te = t) : (te = te.next = t), te;
  }
  function $t() {
    if (Vt === null) {
      var t = xt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Vt.next;
    var e = te === null ? xt.memoizedState : te.next;
    if (e !== null) (te = e), (Vt = t);
    else {
      if (t === null)
        throw xt.alternate === null ? Error(o(467)) : Error(o(310));
      (Vt = t),
        (t = {
          memoizedState: Vt.memoizedState,
          baseState: Vt.baseState,
          baseQueue: Vt.baseQueue,
          queue: Vt.queue,
          next: null,
        }),
        te === null ? (xt.memoizedState = te = t) : (te = te.next = t);
    }
    return te;
  }
  function Ao() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Is(t) {
    var e = $s;
    return (
      ($s += 1),
      Pi === null && (Pi = []),
      (t = th(Pi, t, e)),
      (e = xt),
      (te === null ? e.memoizedState : te.next) === null &&
        ((e = e.alternate),
        (C.H = e === null || e.memoizedState === null ? Xh : tu)),
      t
    );
  }
  function wo(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Is(t);
      if (t.$$typeof === U) return he(t);
    }
    throw Error(o(438, String(t)));
  }
  function qc(t) {
    var e = null,
      a = xt.updateQueue;
    if ((a !== null && (e = a.memoCache), e == null)) {
      var s = xt.alternate;
      s !== null &&
        ((s = s.updateQueue),
        s !== null &&
          ((s = s.memoCache),
          s != null &&
            (e = {
              data: s.data.map(function (r) {
                return r.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      a === null && ((a = Ao()), (xt.updateQueue = a)),
      (a.memoCache = e),
      (a = e.data[e.index]),
      a === void 0)
    )
      for (a = e.data[e.index] = Array(t), s = 0; s < t; s++) a[s] = ft;
    return e.index++, a;
  }
  function qn(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Eo(t) {
    var e = $t();
    return Gc(e, Vt, t);
  }
  function Gc(t, e, a) {
    var s = t.queue;
    if (s === null) throw Error(o(311));
    s.lastRenderedReducer = a;
    var r = t.baseQueue,
      u = s.pending;
    if (u !== null) {
      if (r !== null) {
        var y = r.next;
        (r.next = u.next), (u.next = y);
      }
      (e.baseQueue = r = u), (s.pending = null);
    }
    if (((u = t.baseState), r === null)) t.memoizedState = u;
    else {
      e = r.next;
      var b = (y = null),
        w = null,
        H = e,
        k = !1;
      do {
        var P = H.lane & -536870913;
        if (P !== H.lane ? (Nt & P) === P : (Yn & P) === P) {
          var V = H.revertLane;
          if (V === 0)
            w !== null &&
              (w = w.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: H.action,
                  hasEagerState: H.hasEagerState,
                  eagerState: H.eagerState,
                  next: null,
                }),
              P === ki && (k = !0);
          else if ((Yn & V) === V) {
            (H = H.next), V === ki && (k = !0);
            continue;
          } else
            (P = {
              lane: 0,
              revertLane: H.revertLane,
              gesture: null,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null,
            }),
              w === null ? ((b = w = P), (y = u)) : (w = w.next = P),
              (xt.lanes |= V),
              (Sa |= V);
          (P = H.action),
            ii && a(u, P),
            (u = H.hasEagerState ? H.eagerState : a(u, P));
        } else
          (V = {
            lane: P,
            revertLane: H.revertLane,
            gesture: H.gesture,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null,
          }),
            w === null ? ((b = w = V), (y = u)) : (w = w.next = V),
            (xt.lanes |= P),
            (Sa |= P);
        H = H.next;
      } while (H !== null && H !== e);
      if (
        (w === null ? (y = u) : (w.next = b),
        !Fe(u, t.memoizedState) && ((ee = !0), k && ((a = Fi), a !== null)))
      )
        throw a;
      (t.memoizedState = u),
        (t.baseState = y),
        (t.baseQueue = w),
        (s.lastRenderedState = u);
    }
    return r === null && (s.lanes = 0), [t.memoizedState, s.dispatch];
  }
  function Xc(t) {
    var e = $t(),
      a = e.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = t;
    var s = a.dispatch,
      r = a.pending,
      u = e.memoizedState;
    if (r !== null) {
      a.pending = null;
      var y = (r = r.next);
      do (u = t(u, y.action)), (y = y.next);
      while (y !== r);
      Fe(u, e.memoizedState) || (ee = !0),
        (e.memoizedState = u),
        e.baseQueue === null && (e.baseState = u),
        (a.lastRenderedState = u);
    }
    return [u, s];
  }
  function fh(t, e, a) {
    var s = xt,
      r = $t(),
      u = Mt;
    if (u) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = e();
    var y = !Fe((Vt || r).memoizedState, a);
    if (
      (y && ((r.memoizedState = a), (ee = !0)),
      (r = r.queue),
      Zc(hh.bind(null, s, r, t), [t]),
      r.getSnapshot !== e || y || (te !== null && te.memoizedState.tag & 1))
    ) {
      if (
        ((s.flags |= 2048),
        Ki(9, { destroy: void 0 }, mh.bind(null, s, r, a, e), null),
        Ut === null)
      )
        throw Error(o(349));
      u || (Yn & 127) !== 0 || dh(s, e, a);
    }
    return a;
  }
  function dh(t, e, a) {
    (t.flags |= 16384),
      (t = { getSnapshot: e, value: a }),
      (e = xt.updateQueue),
      e === null
        ? ((e = Ao()), (xt.updateQueue = e), (e.stores = [t]))
        : ((a = e.stores), a === null ? (e.stores = [t]) : a.push(t));
  }
  function mh(t, e, a, s) {
    (e.value = a), (e.getSnapshot = s), ph(e) && gh(t);
  }
  function hh(t, e, a) {
    return a(function () {
      ph(e) && gh(t);
    });
  }
  function ph(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var a = e();
      return !Fe(t, a);
    } catch {
      return !0;
    }
  }
  function gh(t) {
    var e = Qa(t, 2);
    e !== null && Le(e, t, 2);
  }
  function Pc(t) {
    var e = Ne();
    if (typeof t == "function") {
      var a = t;
      if (((t = a()), ii)) {
        dn(!0);
        try {
          a();
        } finally {
          dn(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: qn,
        lastRenderedState: t,
      }),
      e
    );
  }
  function yh(t, e, a, s) {
    return (t.baseState = a), Gc(t, Vt, typeof s == "function" ? s : qn);
  }
  function _1(t, e, a, s, r) {
    if (Do(t)) throw Error(o(485));
    if (((t = e.action), t !== null)) {
      var u = {
        payload: r,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (y) {
          u.listeners.push(y);
        },
      };
      C.T !== null ? a(!0) : (u.isTransition = !1),
        s(u),
        (a = e.pending),
        a === null
          ? ((u.next = e.pending = u), vh(e, u))
          : ((u.next = a.next), (e.pending = a.next = u));
    }
  }
  function vh(t, e) {
    var a = e.action,
      s = e.payload,
      r = t.state;
    if (e.isTransition) {
      var u = C.T,
        y = {};
      C.T = y;
      try {
        var b = a(r, s),
          w = C.S;
        w !== null && w(y, b), xh(t, e, b);
      } catch (H) {
        Kc(t, e, H);
      } finally {
        u !== null && y.types !== null && (u.types = y.types), (C.T = u);
      }
    } else
      try {
        (u = a(r, s)), xh(t, e, u);
      } catch (H) {
        Kc(t, e, H);
      }
  }
  function xh(t, e, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (s) {
            bh(t, e, s);
          },
          function (s) {
            return Kc(t, e, s);
          }
        )
      : bh(t, e, a);
  }
  function bh(t, e, a) {
    (e.status = "fulfilled"),
      (e.value = a),
      Sh(e),
      (t.state = a),
      (e = t.pending),
      e !== null &&
        ((a = e.next),
        a === e ? (t.pending = null) : ((a = a.next), (e.next = a), vh(t, a)));
  }
  function Kc(t, e, a) {
    var s = t.pending;
    if (((t.pending = null), s !== null)) {
      s = s.next;
      do (e.status = "rejected"), (e.reason = a), Sh(e), (e = e.next);
      while (e !== s);
    }
    t.action = null;
  }
  function Sh(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Ah(t, e) {
    return e;
  }
  function wh(t, e) {
    if (Mt) {
      var a = Ut.formState;
      if (a !== null) {
        t: {
          var s = xt;
          if (Mt) {
            if (kt) {
              e: {
                for (var r = kt, u = nn; r.nodeType !== 8; ) {
                  if (!u) {
                    r = null;
                    break e;
                  }
                  if (((r = sn(r.nextSibling)), r === null)) {
                    r = null;
                    break e;
                  }
                }
                (u = r.data), (r = u === "F!" || u === "F" ? r : null);
              }
              if (r) {
                (kt = sn(r.nextSibling)), (s = r.data === "F!");
                break t;
              }
            }
            da(s);
          }
          s = !1;
        }
        s && (e = a[0]);
      }
    }
    return (
      (a = Ne()),
      (a.memoizedState = a.baseState = e),
      (s = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ah,
        lastRenderedState: e,
      }),
      (a.queue = s),
      (a = Yh.bind(null, xt, s)),
      (s.dispatch = a),
      (s = Pc(!1)),
      (u = Wc.bind(null, xt, !1, s.queue)),
      (s = Ne()),
      (r = { state: e, dispatch: null, action: t, pending: null }),
      (s.queue = r),
      (a = _1.bind(null, xt, r, u, a)),
      (r.dispatch = a),
      (s.memoizedState = t),
      [e, a, !1]
    );
  }
  function Eh(t) {
    var e = $t();
    return Th(e, Vt, t);
  }
  function Th(t, e, a) {
    if (
      ((e = Gc(t, e, Ah)[0]),
      (t = Eo(qn)[0]),
      typeof e == "object" && e !== null && typeof e.then == "function")
    )
      try {
        var s = Is(e);
      } catch (y) {
        throw y === Yi ? ho : y;
      }
    else s = e;
    e = $t();
    var r = e.queue,
      u = r.dispatch;
    return (
      a !== e.memoizedState &&
        ((xt.flags |= 2048),
        Ki(9, { destroy: void 0 }, z1.bind(null, r, a), null)),
      [s, u, t]
    );
  }
  function z1(t, e) {
    t.action = e;
  }
  function Nh(t) {
    var e = $t(),
      a = Vt;
    if (a !== null) return Th(e, a, t);
    $t(), (e = e.memoizedState), (a = $t());
    var s = a.queue.dispatch;
    return (a.memoizedState = t), [e, s, !1];
  }
  function Ki(t, e, a, s) {
    return (
      (t = { tag: t, create: a, deps: s, inst: e, next: null }),
      (e = xt.updateQueue),
      e === null && ((e = Ao()), (xt.updateQueue = e)),
      (a = e.lastEffect),
      a === null
        ? (e.lastEffect = t.next = t)
        : ((s = a.next), (a.next = t), (t.next = s), (e.lastEffect = t)),
      t
    );
  }
  function Dh() {
    return $t().memoizedState;
  }
  function To(t, e, a, s) {
    var r = Ne();
    (xt.flags |= t),
      (r.memoizedState = Ki(
        1 | e,
        { destroy: void 0 },
        a,
        s === void 0 ? null : s
      ));
  }
  function No(t, e, a, s) {
    var r = $t();
    s = s === void 0 ? null : s;
    var u = r.memoizedState.inst;
    Vt !== null && s !== null && Bc(s, Vt.memoizedState.deps)
      ? (r.memoizedState = Ki(e, u, a, s))
      : ((xt.flags |= t), (r.memoizedState = Ki(1 | e, u, a, s)));
  }
  function Ch(t, e) {
    To(8390656, 8, t, e);
  }
  function Zc(t, e) {
    No(2048, 8, t, e);
  }
  function V1(t) {
    xt.flags |= 4;
    var e = xt.updateQueue;
    if (e === null) (e = Ao()), (xt.updateQueue = e), (e.events = [t]);
    else {
      var a = e.events;
      a === null ? (e.events = [t]) : a.push(t);
    }
  }
  function Mh(t) {
    var e = $t().memoizedState;
    return (
      V1({ ref: e, nextImpl: t }),
      function () {
        if ((jt & 2) !== 0) throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function Oh(t, e) {
    return No(4, 2, t, e);
  }
  function Rh(t, e) {
    return No(4, 4, t, e);
  }
  function jh(t, e) {
    if (typeof e == "function") {
      t = t();
      var a = e(t);
      return function () {
        typeof a == "function" ? a() : e(null);
      };
    }
    if (e != null)
      return (
        (t = t()),
        (e.current = t),
        function () {
          e.current = null;
        }
      );
  }
  function Hh(t, e, a) {
    (a = a != null ? a.concat([t]) : null), No(4, 4, jh.bind(null, e, t), a);
  }
  function Qc() {}
  function _h(t, e) {
    var a = $t();
    e = e === void 0 ? null : e;
    var s = a.memoizedState;
    return e !== null && Bc(e, s[1]) ? s[0] : ((a.memoizedState = [t, e]), t);
  }
  function zh(t, e) {
    var a = $t();
    e = e === void 0 ? null : e;
    var s = a.memoizedState;
    if (e !== null && Bc(e, s[1])) return s[0];
    if (((s = t()), ii)) {
      dn(!0);
      try {
        t();
      } finally {
        dn(!1);
      }
    }
    return (a.memoizedState = [s, e]), s;
  }
  function Jc(t, e, a) {
    return a === void 0 || ((Yn & 1073741824) !== 0 && (Nt & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = a), (t = Vp()), (xt.lanes |= t), (Sa |= t), a);
  }
  function Vh(t, e, a, s) {
    return Fe(a, e)
      ? a
      : Gi.current !== null
      ? ((t = Jc(t, a, s)), Fe(t, e) || (ee = !0), t)
      : (Yn & 42) === 0 || ((Yn & 1073741824) !== 0 && (Nt & 261930) === 0)
      ? ((ee = !0), (t.memoizedState = a))
      : ((t = Vp()), (xt.lanes |= t), (Sa |= t), e);
  }
  function Lh(t, e, a, s, r) {
    var u = B.p;
    B.p = u !== 0 && 8 > u ? u : 8;
    var y = C.T,
      b = {};
    (C.T = b), Wc(t, !1, e, a);
    try {
      var w = r(),
        H = C.S;
      if (
        (H !== null && H(b, w),
        w !== null && typeof w == "object" && typeof w.then == "function")
      ) {
        var k = R1(w, s);
        Ws(t, e, k, Ke(t));
      } else Ws(t, e, s, Ke(t));
    } catch (P) {
      Ws(t, e, { then: function () {}, status: "rejected", reason: P }, Ke());
    } finally {
      (B.p = u),
        y !== null && b.types !== null && (y.types = b.types),
        (C.T = y);
    }
  }
  function L1() {}
  function $c(t, e, a, s) {
    if (t.tag !== 5) throw Error(o(476));
    var r = Bh(t).queue;
    Lh(
      t,
      r,
      e,
      z,
      a === null
        ? L1
        : function () {
            return Uh(t), a(s);
          }
    );
  }
  function Bh(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: z,
      baseState: z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: qn,
        lastRenderedState: z,
      },
      next: null,
    };
    var a = {};
    return (
      (e.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: qn,
          lastRenderedState: a,
        },
        next: null,
      }),
      (t.memoizedState = e),
      (t = t.alternate),
      t !== null && (t.memoizedState = e),
      e
    );
  }
  function Uh(t) {
    var e = Bh(t);
    e.next === null && (e = t.alternate.memoizedState),
      Ws(t, e.next.queue, {}, Ke());
  }
  function Ic() {
    return he(gl);
  }
  function kh() {
    return $t().memoizedState;
  }
  function Fh() {
    return $t().memoizedState;
  }
  function B1(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var a = Ke();
          t = pa(a);
          var s = ga(e, t, a);
          s !== null && (Le(s, e, a), Zs(s, e, a)),
            (e = { cache: Dc() }),
            (t.payload = e);
          return;
      }
      e = e.return;
    }
  }
  function U1(t, e, a) {
    var s = Ke();
    (a = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Do(t)
        ? qh(e, a)
        : ((a = gc(t, e, a, s)), a !== null && (Le(a, t, s), Gh(a, e, s)));
  }
  function Yh(t, e, a) {
    var s = Ke();
    Ws(t, e, a, s);
  }
  function Ws(t, e, a, s) {
    var r = {
      lane: s,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Do(t)) qh(e, r);
    else {
      var u = t.alternate;
      if (
        t.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = e.lastRenderedReducer), u !== null)
      )
        try {
          var y = e.lastRenderedState,
            b = u(y, a);
          if (((r.hasEagerState = !0), (r.eagerState = b), Fe(b, y)))
            return lo(t, e, r, 0), Ut === null && so(), !1;
        } catch {
        } finally {
        }
      if (((a = gc(t, e, r, s)), a !== null))
        return Le(a, t, s), Gh(a, e, s), !0;
    }
    return !1;
  }
  function Wc(t, e, a, s) {
    if (
      ((s = {
        lane: 2,
        revertLane: Ru(),
        gesture: null,
        action: s,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Do(t))
    ) {
      if (e) throw Error(o(479));
    } else (e = gc(t, a, s, 2)), e !== null && Le(e, t, 2);
  }
  function Do(t) {
    var e = t.alternate;
    return t === xt || (e !== null && e === xt);
  }
  function qh(t, e) {
    Xi = bo = !0;
    var a = t.pending;
    a === null ? (e.next = e) : ((e.next = a.next), (a.next = e)),
      (t.pending = e);
  }
  function Gh(t, e, a) {
    if ((a & 4194048) !== 0) {
      var s = e.lanes;
      (s &= t.pendingLanes), (a |= s), (e.lanes = a), Me(t, a);
    }
  }
  var tl = {
    readContext: he,
    use: wo,
    useCallback: Kt,
    useContext: Kt,
    useEffect: Kt,
    useImperativeHandle: Kt,
    useLayoutEffect: Kt,
    useInsertionEffect: Kt,
    useMemo: Kt,
    useReducer: Kt,
    useRef: Kt,
    useState: Kt,
    useDebugValue: Kt,
    useDeferredValue: Kt,
    useTransition: Kt,
    useSyncExternalStore: Kt,
    useId: Kt,
    useHostTransitionStatus: Kt,
    useFormState: Kt,
    useActionState: Kt,
    useOptimistic: Kt,
    useMemoCache: Kt,
    useCacheRefresh: Kt,
  };
  tl.useEffectEvent = Kt;
  var Xh = {
      readContext: he,
      use: wo,
      useCallback: function (t, e) {
        return (Ne().memoizedState = [t, e === void 0 ? null : e]), t;
      },
      useContext: he,
      useEffect: Ch,
      useImperativeHandle: function (t, e, a) {
        (a = a != null ? a.concat([t]) : null),
          To(4194308, 4, jh.bind(null, e, t), a);
      },
      useLayoutEffect: function (t, e) {
        return To(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        To(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var a = Ne();
        e = e === void 0 ? null : e;
        var s = t();
        if (ii) {
          dn(!0);
          try {
            t();
          } finally {
            dn(!1);
          }
        }
        return (a.memoizedState = [s, e]), s;
      },
      useReducer: function (t, e, a) {
        var s = Ne();
        if (a !== void 0) {
          var r = a(e);
          if (ii) {
            dn(!0);
            try {
              a(e);
            } finally {
              dn(!1);
            }
          }
        } else r = e;
        return (
          (s.memoizedState = s.baseState = r),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: r,
          }),
          (s.queue = t),
          (t = t.dispatch = U1.bind(null, xt, t)),
          [s.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = Ne();
        return (t = { current: t }), (e.memoizedState = t);
      },
      useState: function (t) {
        t = Pc(t);
        var e = t.queue,
          a = Yh.bind(null, xt, e);
        return (e.dispatch = a), [t.memoizedState, a];
      },
      useDebugValue: Qc,
      useDeferredValue: function (t, e) {
        var a = Ne();
        return Jc(a, t, e);
      },
      useTransition: function () {
        var t = Pc(!1);
        return (
          (t = Lh.bind(null, xt, t.queue, !0, !1)),
          (Ne().memoizedState = t),
          [!1, t]
        );
      },
      useSyncExternalStore: function (t, e, a) {
        var s = xt,
          r = Ne();
        if (Mt) {
          if (a === void 0) throw Error(o(407));
          a = a();
        } else {
          if (((a = e()), Ut === null)) throw Error(o(349));
          (Nt & 127) !== 0 || dh(s, e, a);
        }
        r.memoizedState = a;
        var u = { value: a, getSnapshot: e };
        return (
          (r.queue = u),
          Ch(hh.bind(null, s, u, t), [t]),
          (s.flags |= 2048),
          Ki(9, { destroy: void 0 }, mh.bind(null, s, u, a, e), null),
          a
        );
      },
      useId: function () {
        var t = Ne(),
          e = Ut.identifierPrefix;
        if (Mt) {
          var a = wn,
            s = An;
          (a = (s & ~(1 << (32 - ve(s) - 1))).toString(32) + a),
            (e = "_" + e + "R_" + a),
            (a = So++),
            0 < a && (e += "H" + a.toString(32)),
            (e += "_");
        } else (a = j1++), (e = "_" + e + "r_" + a.toString(32) + "_");
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: Ic,
      useFormState: wh,
      useActionState: wh,
      useOptimistic: function (t) {
        var e = Ne();
        e.memoizedState = e.baseState = t;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (e.queue = a),
          (e = Wc.bind(null, xt, !0, a)),
          (a.dispatch = e),
          [t, e]
        );
      },
      useMemoCache: qc,
      useCacheRefresh: function () {
        return (Ne().memoizedState = B1.bind(null, xt));
      },
      useEffectEvent: function (t) {
        var e = Ne(),
          a = { impl: t };
        return (
          (e.memoizedState = a),
          function () {
            if ((jt & 2) !== 0) throw Error(o(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    tu = {
      readContext: he,
      use: wo,
      useCallback: _h,
      useContext: he,
      useEffect: Zc,
      useImperativeHandle: Hh,
      useInsertionEffect: Oh,
      useLayoutEffect: Rh,
      useMemo: zh,
      useReducer: Eo,
      useRef: Dh,
      useState: function () {
        return Eo(qn);
      },
      useDebugValue: Qc,
      useDeferredValue: function (t, e) {
        var a = $t();
        return Vh(a, Vt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = Eo(qn)[0],
          e = $t().memoizedState;
        return [typeof t == "boolean" ? t : Is(t), e];
      },
      useSyncExternalStore: fh,
      useId: kh,
      useHostTransitionStatus: Ic,
      useFormState: Eh,
      useActionState: Eh,
      useOptimistic: function (t, e) {
        var a = $t();
        return yh(a, Vt, t, e);
      },
      useMemoCache: qc,
      useCacheRefresh: Fh,
    };
  tu.useEffectEvent = Mh;
  var Ph = {
    readContext: he,
    use: wo,
    useCallback: _h,
    useContext: he,
    useEffect: Zc,
    useImperativeHandle: Hh,
    useInsertionEffect: Oh,
    useLayoutEffect: Rh,
    useMemo: zh,
    useReducer: Xc,
    useRef: Dh,
    useState: function () {
      return Xc(qn);
    },
    useDebugValue: Qc,
    useDeferredValue: function (t, e) {
      var a = $t();
      return Vt === null ? Jc(a, t, e) : Vh(a, Vt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = Xc(qn)[0],
        e = $t().memoizedState;
      return [typeof t == "boolean" ? t : Is(t), e];
    },
    useSyncExternalStore: fh,
    useId: kh,
    useHostTransitionStatus: Ic,
    useFormState: Nh,
    useActionState: Nh,
    useOptimistic: function (t, e) {
      var a = $t();
      return Vt !== null
        ? yh(a, Vt, t, e)
        : ((a.baseState = t), [t, a.queue.dispatch]);
    },
    useMemoCache: qc,
    useCacheRefresh: Fh,
  };
  Ph.useEffectEvent = Mh;
  function eu(t, e, a, s) {
    (e = t.memoizedState),
      (a = a(s, e)),
      (a = a == null ? e : g({}, e, a)),
      (t.memoizedState = a),
      t.lanes === 0 && (t.updateQueue.baseState = a);
  }
  var nu = {
    enqueueSetState: function (t, e, a) {
      t = t._reactInternals;
      var s = Ke(),
        r = pa(s);
      (r.payload = e),
        a != null && (r.callback = a),
        (e = ga(t, r, s)),
        e !== null && (Le(e, t, s), Zs(e, t, s));
    },
    enqueueReplaceState: function (t, e, a) {
      t = t._reactInternals;
      var s = Ke(),
        r = pa(s);
      (r.tag = 1),
        (r.payload = e),
        a != null && (r.callback = a),
        (e = ga(t, r, s)),
        e !== null && (Le(e, t, s), Zs(e, t, s));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var a = Ke(),
        s = pa(a);
      (s.tag = 2),
        e != null && (s.callback = e),
        (e = ga(t, s, a)),
        e !== null && (Le(e, t, a), Zs(e, t, a));
    },
  };
  function Kh(t, e, a, s, r, u, y) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(s, u, y)
        : e.prototype && e.prototype.isPureReactComponent
        ? !ks(a, s) || !ks(r, u)
        : !0
    );
  }
  function Zh(t, e, a, s) {
    (t = e.state),
      typeof e.componentWillReceiveProps == "function" &&
        e.componentWillReceiveProps(a, s),
      typeof e.UNSAFE_componentWillReceiveProps == "function" &&
        e.UNSAFE_componentWillReceiveProps(a, s),
      e.state !== t && nu.enqueueReplaceState(e, e.state, null);
  }
  function si(t, e) {
    var a = e;
    if ("ref" in e) {
      a = {};
      for (var s in e) s !== "ref" && (a[s] = e[s]);
    }
    if ((t = t.defaultProps)) {
      a === e && (a = g({}, a));
      for (var r in t) a[r] === void 0 && (a[r] = t[r]);
    }
    return a;
  }
  function Qh(t) {
    io(t);
  }
  function Jh(t) {
    console.error(t);
  }
  function $h(t) {
    io(t);
  }
  function Co(t, e) {
    try {
      var a = t.onUncaughtError;
      a(e.value, { componentStack: e.stack });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function Ih(t, e, a) {
    try {
      var s = t.onCaughtError;
      s(a.value, {
        componentStack: a.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null,
      });
    } catch (r) {
      setTimeout(function () {
        throw r;
      });
    }
  }
  function au(t, e, a) {
    return (
      (a = pa(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        Co(t, e);
      }),
      a
    );
  }
  function Wh(t) {
    return (t = pa(t)), (t.tag = 3), t;
  }
  function tp(t, e, a, s) {
    var r = a.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var u = s.value;
      (t.payload = function () {
        return r(u);
      }),
        (t.callback = function () {
          Ih(e, a, s);
        });
    }
    var y = a.stateNode;
    y !== null &&
      typeof y.componentDidCatch == "function" &&
      (t.callback = function () {
        Ih(e, a, s),
          typeof r != "function" &&
            (Aa === null ? (Aa = new Set([this])) : Aa.add(this));
        var b = s.stack;
        this.componentDidCatch(s.value, {
          componentStack: b !== null ? b : "",
        });
      });
  }
  function k1(t, e, a, s, r) {
    if (
      ((a.flags |= 32768),
      s !== null && typeof s == "object" && typeof s.then == "function")
    ) {
      if (
        ((e = a.alternate),
        e !== null && Ui(e, a, r, !0),
        (a = qe.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              an === null ? ko() : a.alternate === null && Zt === 0 && (Zt = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = r),
              s === po
                ? (a.flags |= 16384)
                : ((e = a.updateQueue),
                  e === null ? (a.updateQueue = new Set([s])) : e.add(s),
                  Cu(t, s, r)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              s === po
                ? (a.flags |= 16384)
                : ((e = a.updateQueue),
                  e === null
                    ? ((e = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([s]),
                      }),
                      (a.updateQueue = e))
                    : ((a = e.retryQueue),
                      a === null ? (e.retryQueue = new Set([s])) : a.add(s)),
                  Cu(t, s, r)),
              !1
            );
        }
        throw Error(o(435, a.tag));
      }
      return Cu(t, s, r), ko(), !1;
    }
    if (Mt)
      return (
        (e = qe.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = r),
            s !== Ac && ((t = Error(o(422), { cause: s })), qs(We(t, a))))
          : (s !== Ac && ((e = Error(o(423), { cause: s })), qs(We(e, a))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (r &= -r),
            (t.lanes |= r),
            (s = We(s, a)),
            (r = au(t.stateNode, s, r)),
            Hc(t, r),
            Zt !== 4 && (Zt = 2)),
        !1
      );
    var u = Error(o(520), { cause: s });
    if (
      ((u = We(u, a)),
      rl === null ? (rl = [u]) : rl.push(u),
      Zt !== 4 && (Zt = 2),
      e === null)
    )
      return !0;
    (s = We(s, a)), (a = e);
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (t = r & -r),
            (a.lanes |= t),
            (t = au(a.stateNode, s, t)),
            Hc(a, t),
            !1
          );
        case 1:
          if (
            ((e = a.type),
            (u = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == "function" ||
                (u !== null &&
                  typeof u.componentDidCatch == "function" &&
                  (Aa === null || !Aa.has(u)))))
          )
            return (
              (a.flags |= 65536),
              (r &= -r),
              (a.lanes |= r),
              (r = Wh(r)),
              tp(r, t, a, s),
              Hc(a, r),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var iu = Error(o(461)),
    ee = !1;
  function pe(t, e, a, s) {
    e.child = t === null ? ih(e, null, a, s) : ai(e, t.child, a, s);
  }
  function ep(t, e, a, s, r) {
    a = a.render;
    var u = e.ref;
    if ("ref" in s) {
      var y = {};
      for (var b in s) b !== "ref" && (y[b] = s[b]);
    } else y = s;
    return (
      Wa(e),
      (s = Uc(t, e, a, y, u, r)),
      (b = kc()),
      t !== null && !ee
        ? (Fc(t, e, r), Gn(t, e, r))
        : (Mt && b && bc(e), (e.flags |= 1), pe(t, e, s, r), e.child)
    );
  }
  function np(t, e, a, s, r) {
    if (t === null) {
      var u = a.type;
      return typeof u == "function" &&
        !yc(u) &&
        u.defaultProps === void 0 &&
        a.compare === null
        ? ((e.tag = 15), (e.type = u), ap(t, e, u, s, r))
        : ((t = ro(a.type, null, s, e, e.mode, r)),
          (t.ref = e.ref),
          (t.return = e),
          (e.child = t));
    }
    if (((u = t.child), !du(t, r))) {
      var y = u.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : ks), a(y, s) && t.ref === e.ref)
      )
        return Gn(t, e, r);
    }
    return (
      (e.flags |= 1),
      (t = Bn(u, s)),
      (t.ref = e.ref),
      (t.return = e),
      (e.child = t)
    );
  }
  function ap(t, e, a, s, r) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (ks(u, s) && t.ref === e.ref)
        if (((ee = !1), (e.pendingProps = s = u), du(t, r)))
          (t.flags & 131072) !== 0 && (ee = !0);
        else return (e.lanes = t.lanes), Gn(t, e, r);
    }
    return su(t, e, a, s, r);
  }
  function ip(t, e, a, s) {
    var r = s.children,
      u = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        e.stateNode === null &&
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      s.mode === "hidden")
    ) {
      if ((e.flags & 128) !== 0) {
        if (((u = u !== null ? u.baseLanes | a : a), t !== null)) {
          for (s = e.child = t.child, r = 0; s !== null; )
            (r = r | s.lanes | s.childLanes), (s = s.sibling);
          s = r & ~u;
        } else (s = 0), (e.child = null);
        return sp(t, e, u, a, s);
      }
      if ((a & 536870912) !== 0)
        (e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && mo(e, u !== null ? u.cachePool : null),
          u !== null ? oh(e, u) : zc(),
          rh(e);
      else
        return (
          (s = e.lanes = 536870912),
          sp(t, e, u !== null ? u.baseLanes | a : a, a, s)
        );
    } else
      u !== null
        ? (mo(e, u.cachePool), oh(e, u), va(), (e.memoizedState = null))
        : (t !== null && mo(e, null), zc(), va());
    return pe(t, e, r, a), e.child;
  }
  function el(t, e) {
    return (
      (t !== null && t.tag === 22) ||
        e.stateNode !== null ||
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.sibling
    );
  }
  function sp(t, e, a, s, r) {
    var u = Mc();
    return (
      (u = u === null ? null : { parent: Wt._currentValue, pool: u }),
      (e.memoizedState = { baseLanes: a, cachePool: u }),
      t !== null && mo(e, null),
      zc(),
      rh(e),
      t !== null && Ui(t, e, s, !0),
      (e.childLanes = r),
      null
    );
  }
  function Mo(t, e) {
    return (
      (e = Ro({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function lp(t, e, a) {
    return (
      ai(e, t.child, null, a),
      (t = Mo(e, e.pendingProps)),
      (t.flags |= 2),
      Ge(e),
      (e.memoizedState = null),
      t
    );
  }
  function F1(t, e, a) {
    var s = e.pendingProps,
      r = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (Mt) {
        if (s.mode === "hidden")
          return (t = Mo(e, s)), (e.lanes = 536870912), el(null, t);
        if (
          (Lc(e),
          (t = kt)
            ? ((t = vg(t, nn)),
              (t = t !== null && t.data === "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: ua !== null ? { id: An, overflow: wn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = qm(t)),
                (a.return = e),
                (e.child = a),
                (me = e),
                (kt = null)))
            : (t = null),
          t === null)
        )
          throw da(e);
        return (e.lanes = 536870912), null;
      }
      return Mo(e, s);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var y = u.dehydrated;
      if ((Lc(e), r))
        if (e.flags & 256) (e.flags &= -257), (e = lp(t, e, a));
        else if (e.memoizedState !== null)
          (e.child = t.child), (e.flags |= 128), (e = null);
        else throw Error(o(558));
      else if (
        (ee || Ui(t, e, a, !1), (r = (a & t.childLanes) !== 0), ee || r)
      ) {
        if (
          ((s = Ut),
          s !== null && ((y = Oe(s, a)), y !== 0 && y !== u.retryLane))
        )
          throw ((u.retryLane = y), Qa(t, y), Le(s, t, y), iu);
        ko(), (e = lp(t, e, a));
      } else
        (t = u.treeContext),
          (kt = sn(y.nextSibling)),
          (me = e),
          (Mt = !0),
          (fa = null),
          (nn = !1),
          t !== null && Pm(e, t),
          (e = Mo(e, s)),
          (e.flags |= 4096);
      return e;
    }
    return (
      (t = Bn(t.child, { mode: s.mode, children: s.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Oo(t, e) {
    var a = e.ref;
    if (a === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(o(284));
      (t === null || t.ref !== a) && (e.flags |= 4194816);
    }
  }
  function su(t, e, a, s, r) {
    return (
      Wa(e),
      (a = Uc(t, e, a, s, void 0, r)),
      (s = kc()),
      t !== null && !ee
        ? (Fc(t, e, r), Gn(t, e, r))
        : (Mt && s && bc(e), (e.flags |= 1), pe(t, e, a, r), e.child)
    );
  }
  function op(t, e, a, s, r, u) {
    return (
      Wa(e),
      (e.updateQueue = null),
      (a = uh(e, s, a, r)),
      ch(t),
      (s = kc()),
      t !== null && !ee
        ? (Fc(t, e, u), Gn(t, e, u))
        : (Mt && s && bc(e), (e.flags |= 1), pe(t, e, a, u), e.child)
    );
  }
  function rp(t, e, a, s, r) {
    if ((Wa(e), e.stateNode === null)) {
      var u = zi,
        y = a.contextType;
      typeof y == "object" && y !== null && (u = he(y)),
        (u = new a(s, u)),
        (e.memoizedState =
          u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = nu),
        (e.stateNode = u),
        (u._reactInternals = e),
        (u = e.stateNode),
        (u.props = s),
        (u.state = e.memoizedState),
        (u.refs = {}),
        Rc(e),
        (y = a.contextType),
        (u.context = typeof y == "object" && y !== null ? he(y) : zi),
        (u.state = e.memoizedState),
        (y = a.getDerivedStateFromProps),
        typeof y == "function" && (eu(e, a, y, s), (u.state = e.memoizedState)),
        typeof a.getDerivedStateFromProps == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function" ||
          (typeof u.UNSAFE_componentWillMount != "function" &&
            typeof u.componentWillMount != "function") ||
          ((y = u.state),
          typeof u.componentWillMount == "function" && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == "function" &&
            u.UNSAFE_componentWillMount(),
          y !== u.state && nu.enqueueReplaceState(u, u.state, null),
          Js(e, s, u, r),
          Qs(),
          (u.state = e.memoizedState)),
        typeof u.componentDidMount == "function" && (e.flags |= 4194308),
        (s = !0);
    } else if (t === null) {
      u = e.stateNode;
      var b = e.memoizedProps,
        w = si(a, b);
      u.props = w;
      var H = u.context,
        k = a.contextType;
      (y = zi), typeof k == "object" && k !== null && (y = he(k));
      var P = a.getDerivedStateFromProps;
      (k =
        typeof P == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function"),
        (b = e.pendingProps !== b),
        k ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((b || H !== y) && Zh(e, u, s, y)),
        (ha = !1);
      var V = e.memoizedState;
      (u.state = V),
        Js(e, s, u, r),
        Qs(),
        (H = e.memoizedState),
        b || V !== H || ha
          ? (typeof P == "function" && (eu(e, a, P, s), (H = e.memoizedState)),
            (w = ha || Kh(e, a, w, s, V, H, y))
              ? (k ||
                  (typeof u.UNSAFE_componentWillMount != "function" &&
                    typeof u.componentWillMount != "function") ||
                  (typeof u.componentWillMount == "function" &&
                    u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == "function" &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == "function" &&
                  (e.flags |= 4194308))
              : (typeof u.componentDidMount == "function" &&
                  (e.flags |= 4194308),
                (e.memoizedProps = s),
                (e.memoizedState = H)),
            (u.props = s),
            (u.state = H),
            (u.context = y),
            (s = w))
          : (typeof u.componentDidMount == "function" && (e.flags |= 4194308),
            (s = !1));
    } else {
      (u = e.stateNode),
        jc(t, e),
        (y = e.memoizedProps),
        (k = si(a, y)),
        (u.props = k),
        (P = e.pendingProps),
        (V = u.context),
        (H = a.contextType),
        (w = zi),
        typeof H == "object" && H !== null && (w = he(H)),
        (b = a.getDerivedStateFromProps),
        (H =
          typeof b == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function") ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((y !== P || V !== w) && Zh(e, u, s, w)),
        (ha = !1),
        (V = e.memoizedState),
        (u.state = V),
        Js(e, s, u, r),
        Qs();
      var L = e.memoizedState;
      y !== P ||
      V !== L ||
      ha ||
      (t !== null && t.dependencies !== null && uo(t.dependencies))
        ? (typeof b == "function" && (eu(e, a, b, s), (L = e.memoizedState)),
          (k =
            ha ||
            Kh(e, a, k, s, V, L, w) ||
            (t !== null && t.dependencies !== null && uo(t.dependencies)))
            ? (H ||
                (typeof u.UNSAFE_componentWillUpdate != "function" &&
                  typeof u.componentWillUpdate != "function") ||
                (typeof u.componentWillUpdate == "function" &&
                  u.componentWillUpdate(s, L, w),
                typeof u.UNSAFE_componentWillUpdate == "function" &&
                  u.UNSAFE_componentWillUpdate(s, L, w)),
              typeof u.componentDidUpdate == "function" && (e.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == "function" &&
                (e.flags |= 1024))
            : (typeof u.componentDidUpdate != "function" ||
                (y === t.memoizedProps && V === t.memoizedState) ||
                (e.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != "function" ||
                (y === t.memoizedProps && V === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = s),
              (e.memoizedState = L)),
          (u.props = s),
          (u.state = L),
          (u.context = w),
          (s = k))
        : (typeof u.componentDidUpdate != "function" ||
            (y === t.memoizedProps && V === t.memoizedState) ||
            (e.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != "function" ||
            (y === t.memoizedProps && V === t.memoizedState) ||
            (e.flags |= 1024),
          (s = !1));
    }
    return (
      (u = s),
      Oo(t, e),
      (s = (e.flags & 128) !== 0),
      u || s
        ? ((u = e.stateNode),
          (a =
            s && typeof a.getDerivedStateFromError != "function"
              ? null
              : u.render()),
          (e.flags |= 1),
          t !== null && s
            ? ((e.child = ai(e, t.child, null, r)),
              (e.child = ai(e, null, a, r)))
            : pe(t, e, a, r),
          (e.memoizedState = u.state),
          (t = e.child))
        : (t = Gn(t, e, r)),
      t
    );
  }
  function cp(t, e, a, s) {
    return $a(), (e.flags |= 256), pe(t, e, a, s), e.child;
  }
  var lu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function ou(t) {
    return { baseLanes: t, cachePool: Im() };
  }
  function ru(t, e, a) {
    return (t = t !== null ? t.childLanes & ~a : 0), e && (t |= Pe), t;
  }
  function up(t, e, a) {
    var s = e.pendingProps,
      r = !1,
      u = (e.flags & 128) !== 0,
      y;
    if (
      ((y = u) ||
        (y =
          t !== null && t.memoizedState === null ? !1 : (Jt.current & 2) !== 0),
      y && ((r = !0), (e.flags &= -129)),
      (y = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (Mt) {
        if (
          (r ? ya(e) : va(),
          (t = kt)
            ? ((t = vg(t, nn)),
              (t = t !== null && t.data !== "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: ua !== null ? { id: An, overflow: wn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = qm(t)),
                (a.return = e),
                (e.child = a),
                (me = e),
                (kt = null)))
            : (t = null),
          t === null)
        )
          throw da(e);
        return Gu(t) ? (e.lanes = 32) : (e.lanes = 536870912), null;
      }
      var b = s.children;
      return (
        (s = s.fallback),
        r
          ? (va(),
            (r = e.mode),
            (b = Ro({ mode: "hidden", children: b }, r)),
            (s = Ja(s, r, a, null)),
            (b.return = e),
            (s.return = e),
            (b.sibling = s),
            (e.child = b),
            (s = e.child),
            (s.memoizedState = ou(a)),
            (s.childLanes = ru(t, y, a)),
            (e.memoizedState = lu),
            el(null, s))
          : (ya(e), cu(e, b))
      );
    }
    var w = t.memoizedState;
    if (w !== null && ((b = w.dehydrated), b !== null)) {
      if (u)
        e.flags & 256
          ? (ya(e), (e.flags &= -257), (e = uu(t, e, a)))
          : e.memoizedState !== null
          ? (va(), (e.child = t.child), (e.flags |= 128), (e = null))
          : (va(),
            (b = s.fallback),
            (r = e.mode),
            (s = Ro({ mode: "visible", children: s.children }, r)),
            (b = Ja(b, r, a, null)),
            (b.flags |= 2),
            (s.return = e),
            (b.return = e),
            (s.sibling = b),
            (e.child = s),
            ai(e, t.child, null, a),
            (s = e.child),
            (s.memoizedState = ou(a)),
            (s.childLanes = ru(t, y, a)),
            (e.memoizedState = lu),
            (e = el(null, s)));
      else if ((ya(e), Gu(b))) {
        if (((y = b.nextSibling && b.nextSibling.dataset), y)) var H = y.dgst;
        (y = H),
          (s = Error(o(419))),
          (s.stack = ""),
          (s.digest = y),
          qs({ value: s, source: null, stack: null }),
          (e = uu(t, e, a));
      } else if (
        (ee || Ui(t, e, a, !1), (y = (a & t.childLanes) !== 0), ee || y)
      ) {
        if (
          ((y = Ut),
          y !== null && ((s = Oe(y, a)), s !== 0 && s !== w.retryLane))
        )
          throw ((w.retryLane = s), Qa(t, s), Le(y, t, s), iu);
        qu(b) || ko(), (e = uu(t, e, a));
      } else
        qu(b)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = w.treeContext),
            (kt = sn(b.nextSibling)),
            (me = e),
            (Mt = !0),
            (fa = null),
            (nn = !1),
            t !== null && Pm(e, t),
            (e = cu(e, s.children)),
            (e.flags |= 4096));
      return e;
    }
    return r
      ? (va(),
        (b = s.fallback),
        (r = e.mode),
        (w = t.child),
        (H = w.sibling),
        (s = Bn(w, { mode: "hidden", children: s.children })),
        (s.subtreeFlags = w.subtreeFlags & 65011712),
        H !== null ? (b = Bn(H, b)) : ((b = Ja(b, r, a, null)), (b.flags |= 2)),
        (b.return = e),
        (s.return = e),
        (s.sibling = b),
        (e.child = s),
        el(null, s),
        (s = e.child),
        (b = t.child.memoizedState),
        b === null
          ? (b = ou(a))
          : ((r = b.cachePool),
            r !== null
              ? ((w = Wt._currentValue),
                (r = r.parent !== w ? { parent: w, pool: w } : r))
              : (r = Im()),
            (b = { baseLanes: b.baseLanes | a, cachePool: r })),
        (s.memoizedState = b),
        (s.childLanes = ru(t, y, a)),
        (e.memoizedState = lu),
        el(t.child, s))
      : (ya(e),
        (a = t.child),
        (t = a.sibling),
        (a = Bn(a, { mode: "visible", children: s.children })),
        (a.return = e),
        (a.sibling = null),
        t !== null &&
          ((y = e.deletions),
          y === null ? ((e.deletions = [t]), (e.flags |= 16)) : y.push(t)),
        (e.child = a),
        (e.memoizedState = null),
        a);
  }
  function cu(t, e) {
    return (
      (e = Ro({ mode: "visible", children: e }, t.mode)),
      (e.return = t),
      (t.child = e)
    );
  }
  function Ro(t, e) {
    return (t = Ye(22, t, null, e)), (t.lanes = 0), t;
  }
  function uu(t, e, a) {
    return (
      ai(e, t.child, null, a),
      (t = cu(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function fp(t, e, a) {
    t.lanes |= e;
    var s = t.alternate;
    s !== null && (s.lanes |= e), Tc(t.return, e, a);
  }
  function fu(t, e, a, s, r, u) {
    var y = t.memoizedState;
    y === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: s,
          tail: a,
          tailMode: r,
          treeForkCount: u,
        })
      : ((y.isBackwards = e),
        (y.rendering = null),
        (y.renderingStartTime = 0),
        (y.last = s),
        (y.tail = a),
        (y.tailMode = r),
        (y.treeForkCount = u));
  }
  function dp(t, e, a) {
    var s = e.pendingProps,
      r = s.revealOrder,
      u = s.tail;
    s = s.children;
    var y = Jt.current,
      b = (y & 2) !== 0;
    if (
      (b ? ((y = (y & 1) | 2), (e.flags |= 128)) : (y &= 1),
      Y(Jt, y),
      pe(t, e, s, a),
      (s = Mt ? Ys : 0),
      !b && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && fp(t, a, e);
        else if (t.tag === 19) fp(t, a, e);
        else if (t.child !== null) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    switch (r) {
      case "forwards":
        for (a = e.child, r = null; a !== null; )
          (t = a.alternate),
            t !== null && xo(t) === null && (r = a),
            (a = a.sibling);
        (a = r),
          a === null
            ? ((r = e.child), (e.child = null))
            : ((r = a.sibling), (a.sibling = null)),
          fu(e, !1, r, a, u, s);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, r = e.child, e.child = null; r !== null; ) {
          if (((t = r.alternate), t !== null && xo(t) === null)) {
            e.child = r;
            break;
          }
          (t = r.sibling), (r.sibling = a), (a = r), (r = t);
        }
        fu(e, !0, a, null, u, s);
        break;
      case "together":
        fu(e, !1, null, null, void 0, s);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function Gn(t, e, a) {
    if (
      (t !== null && (e.dependencies = t.dependencies),
      (Sa |= e.lanes),
      (a & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((Ui(t, e, a, !1), (a & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(o(153));
    if (e.child !== null) {
      for (
        t = e.child, a = Bn(t, t.pendingProps), e.child = a, a.return = e;
        t.sibling !== null;

      )
        (t = t.sibling),
          (a = a.sibling = Bn(t, t.pendingProps)),
          (a.return = e);
      a.sibling = null;
    }
    return e.child;
  }
  function du(t, e) {
    return (t.lanes & e) !== 0
      ? !0
      : ((t = t.dependencies), !!(t !== null && uo(t)));
  }
  function Y1(t, e, a) {
    switch (e.tag) {
      case 3:
        mt(e, e.stateNode.containerInfo),
          ma(e, Wt, t.memoizedState.cache),
          $a();
        break;
      case 27:
      case 5:
        ue(e);
        break;
      case 4:
        mt(e, e.stateNode.containerInfo);
        break;
      case 10:
        ma(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return (e.flags |= 128), Lc(e), null;
        break;
      case 13:
        var s = e.memoizedState;
        if (s !== null)
          return s.dehydrated !== null
            ? (ya(e), (e.flags |= 128), null)
            : (a & e.child.childLanes) !== 0
            ? up(t, e, a)
            : (ya(e), (t = Gn(t, e, a)), t !== null ? t.sibling : null);
        ya(e);
        break;
      case 19:
        var r = (t.flags & 128) !== 0;
        if (
          ((s = (a & e.childLanes) !== 0),
          s || (Ui(t, e, a, !1), (s = (a & e.childLanes) !== 0)),
          r)
        ) {
          if (s) return dp(t, e, a);
          e.flags |= 128;
        }
        if (
          ((r = e.memoizedState),
          r !== null &&
            ((r.rendering = null), (r.tail = null), (r.lastEffect = null)),
          Y(Jt, Jt.current),
          s)
        )
          break;
        return null;
      case 22:
        return (e.lanes = 0), ip(t, e, a, e.pendingProps);
      case 24:
        ma(e, Wt, t.memoizedState.cache);
    }
    return Gn(t, e, a);
  }
  function mp(t, e, a) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) ee = !0;
      else {
        if (!du(t, a) && (e.flags & 128) === 0) return (ee = !1), Y1(t, e, a);
        ee = (t.flags & 131072) !== 0;
      }
    else (ee = !1), Mt && (e.flags & 1048576) !== 0 && Xm(e, Ys, e.index);
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var s = e.pendingProps;
          if (((t = ei(e.elementType)), (e.type = t), typeof t == "function"))
            yc(t)
              ? ((s = si(t, s)), (e.tag = 1), (e = rp(null, e, t, s, a)))
              : ((e.tag = 0), (e = su(null, e, t, s, a)));
          else {
            if (t != null) {
              var r = t.$$typeof;
              if (r === Q) {
                (e.tag = 11), (e = ep(null, e, t, s, a));
                break t;
              } else if (r === K) {
                (e.tag = 14), (e = np(null, e, t, s, a));
                break t;
              }
            }
            throw ((e = vt(t) || t), Error(o(306, e, "")));
          }
        }
        return e;
      case 0:
        return su(t, e, e.type, e.pendingProps, a);
      case 1:
        return (s = e.type), (r = si(s, e.pendingProps)), rp(t, e, s, r, a);
      case 3:
        t: {
          if ((mt(e, e.stateNode.containerInfo), t === null))
            throw Error(o(387));
          s = e.pendingProps;
          var u = e.memoizedState;
          (r = u.element), jc(t, e), Js(e, s, null, a);
          var y = e.memoizedState;
          if (
            ((s = y.cache),
            ma(e, Wt, s),
            s !== u.cache && Nc(e, [Wt], a, !0),
            Qs(),
            (s = y.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: s, isDehydrated: !1, cache: y.cache }),
              (e.updateQueue.baseState = u),
              (e.memoizedState = u),
              e.flags & 256)
            ) {
              e = cp(t, e, s, a);
              break t;
            } else if (s !== r) {
              (r = We(Error(o(424)), e)), qs(r), (e = cp(t, e, s, a));
              break t;
            } else {
              switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (
                kt = sn(t.firstChild),
                  me = e,
                  Mt = !0,
                  fa = null,
                  nn = !0,
                  a = ih(e, null, s, a),
                  e.child = a;
                a;

              )
                (a.flags = (a.flags & -3) | 4096), (a = a.sibling);
            }
          else {
            if (($a(), s === r)) {
              e = Gn(t, e, a);
              break t;
            }
            pe(t, e, s, a);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          Oo(t, e),
          t === null
            ? (a = Eg(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = a)
              : Mt ||
                ((a = e.type),
                (t = e.pendingProps),
                (s = Ko(rt.current).createElement(a)),
                (s[de] = e),
                (s[Re] = t),
                ge(s, a, t),
                oe(s),
                (e.stateNode = s))
            : (e.memoizedState = Eg(
                e.type,
                t.memoizedProps,
                e.pendingProps,
                t.memoizedState
              )),
          null
        );
      case 27:
        return (
          ue(e),
          t === null &&
            Mt &&
            ((s = e.stateNode = Sg(e.type, e.pendingProps, rt.current)),
            (me = e),
            (nn = !0),
            (r = kt),
            Na(e.type) ? ((Xu = r), (kt = sn(s.firstChild))) : (kt = r)),
          pe(t, e, e.pendingProps.children, a),
          Oo(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            Mt &&
            ((r = s = kt) &&
              ((s = vS(s, e.type, e.pendingProps, nn)),
              s !== null
                ? ((e.stateNode = s),
                  (me = e),
                  (kt = sn(s.firstChild)),
                  (nn = !1),
                  (r = !0))
                : (r = !1)),
            r || da(e)),
          ue(e),
          (r = e.type),
          (u = e.pendingProps),
          (y = t !== null ? t.memoizedProps : null),
          (s = u.children),
          ku(r, u) ? (s = null) : y !== null && ku(r, y) && (e.flags |= 32),
          e.memoizedState !== null &&
            ((r = Uc(t, e, H1, null, null, a)), (gl._currentValue = r)),
          Oo(t, e),
          pe(t, e, s, a),
          e.child
        );
      case 6:
        return (
          t === null &&
            Mt &&
            ((t = a = kt) &&
              ((a = xS(a, e.pendingProps, nn)),
              a !== null
                ? ((e.stateNode = a), (me = e), (kt = null), (t = !0))
                : (t = !1)),
            t || da(e)),
          null
        );
      case 13:
        return up(t, e, a);
      case 4:
        return (
          mt(e, e.stateNode.containerInfo),
          (s = e.pendingProps),
          t === null ? (e.child = ai(e, null, s, a)) : pe(t, e, s, a),
          e.child
        );
      case 11:
        return ep(t, e, e.type, e.pendingProps, a);
      case 7:
        return pe(t, e, e.pendingProps, a), e.child;
      case 8:
        return pe(t, e, e.pendingProps.children, a), e.child;
      case 12:
        return pe(t, e, e.pendingProps.children, a), e.child;
      case 10:
        return (
          (s = e.pendingProps),
          ma(e, e.type, s.value),
          pe(t, e, s.children, a),
          e.child
        );
      case 9:
        return (
          (r = e.type._context),
          (s = e.pendingProps.children),
          Wa(e),
          (r = he(r)),
          (s = s(r)),
          (e.flags |= 1),
          pe(t, e, s, a),
          e.child
        );
      case 14:
        return np(t, e, e.type, e.pendingProps, a);
      case 15:
        return ap(t, e, e.type, e.pendingProps, a);
      case 19:
        return dp(t, e, a);
      case 31:
        return F1(t, e, a);
      case 22:
        return ip(t, e, a, e.pendingProps);
      case 24:
        return (
          Wa(e),
          (s = he(Wt)),
          t === null
            ? ((r = Mc()),
              r === null &&
                ((r = Ut),
                (u = Dc()),
                (r.pooledCache = u),
                u.refCount++,
                u !== null && (r.pooledCacheLanes |= a),
                (r = u)),
              (e.memoizedState = { parent: s, cache: r }),
              Rc(e),
              ma(e, Wt, r))
            : ((t.lanes & a) !== 0 && (jc(t, e), Js(e, null, null, a), Qs()),
              (r = t.memoizedState),
              (u = e.memoizedState),
              r.parent !== s
                ? ((r = { parent: s, cache: s }),
                  (e.memoizedState = r),
                  e.lanes === 0 &&
                    (e.memoizedState = e.updateQueue.baseState = r),
                  ma(e, Wt, s))
                : ((s = u.cache),
                  ma(e, Wt, s),
                  s !== r.cache && Nc(e, [Wt], a, !0))),
          pe(t, e, e.pendingProps.children, a),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(o(156, e.tag));
  }
  function Xn(t) {
    t.flags |= 4;
  }
  function mu(t, e, a, s, r) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (r & 335544128) === r))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (kp()) t.flags |= 8192;
        else throw ((ni = po), Oc);
    } else t.flags &= -16777217;
  }
  function hp(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (((t.flags |= 16777216), !Mg(e)))
      if (kp()) t.flags |= 8192;
      else throw ((ni = po), Oc);
  }
  function jo(t, e) {
    e !== null && (t.flags |= 4),
      t.flags & 16384 &&
        ((e = t.tag !== 22 ? xe() : 536870912), (t.lanes |= e), ($i |= e));
  }
  function nl(t, e) {
    if (!Mt)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), (e = e.sibling);
          a === null ? (t.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = t.tail;
          for (var s = null; a !== null; )
            a.alternate !== null && (s = a), (a = a.sibling);
          s === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (s.sibling = null);
      }
  }
  function Ft(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      a = 0,
      s = 0;
    if (e)
      for (var r = t.child; r !== null; )
        (a |= r.lanes | r.childLanes),
          (s |= r.subtreeFlags & 65011712),
          (s |= r.flags & 65011712),
          (r.return = t),
          (r = r.sibling);
    else
      for (r = t.child; r !== null; )
        (a |= r.lanes | r.childLanes),
          (s |= r.subtreeFlags),
          (s |= r.flags),
          (r.return = t),
          (r = r.sibling);
    return (t.subtreeFlags |= s), (t.childLanes = a), e;
  }
  function q1(t, e, a) {
    var s = e.pendingProps;
    switch ((Sc(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ft(e), null;
      case 1:
        return Ft(e), null;
      case 3:
        return (
          (a = e.stateNode),
          (s = null),
          t !== null && (s = t.memoizedState.cache),
          e.memoizedState.cache !== s && (e.flags |= 2048),
          Fn(Wt),
          Ct(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (t === null || t.child === null) &&
            (Bi(e)
              ? Xn(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), wc())),
          Ft(e),
          null
        );
      case 26:
        var r = e.type,
          u = e.memoizedState;
        return (
          t === null
            ? (Xn(e),
              u !== null ? (Ft(e), hp(e, u)) : (Ft(e), mu(e, r, null, s, a)))
            : u
            ? u !== t.memoizedState
              ? (Xn(e), Ft(e), hp(e, u))
              : (Ft(e), (e.flags &= -16777217))
            : ((t = t.memoizedProps),
              t !== s && Xn(e),
              Ft(e),
              mu(e, r, t, s, a)),
          null
        );
      case 27:
        if (
          (Ae(e),
          (a = rt.current),
          (r = e.type),
          t !== null && e.stateNode != null)
        )
          t.memoizedProps !== s && Xn(e);
        else {
          if (!s) {
            if (e.stateNode === null) throw Error(o(166));
            return Ft(e), null;
          }
          (t = J.current),
            Bi(e) ? Km(e) : ((t = Sg(r, s, a)), (e.stateNode = t), Xn(e));
        }
        return Ft(e), null;
      case 5:
        if ((Ae(e), (r = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== s && Xn(e);
        else {
          if (!s) {
            if (e.stateNode === null) throw Error(o(166));
            return Ft(e), null;
          }
          if (((u = J.current), Bi(e))) Km(e);
          else {
            var y = Ko(rt.current);
            switch (u) {
              case 1:
                u = y.createElementNS("http://www.w3.org/2000/svg", r);
                break;
              case 2:
                u = y.createElementNS("http://www.w3.org/1998/Math/MathML", r);
                break;
              default:
                switch (r) {
                  case "svg":
                    u = y.createElementNS("http://www.w3.org/2000/svg", r);
                    break;
                  case "math":
                    u = y.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      r
                    );
                    break;
                  case "script":
                    (u = y.createElement("div")),
                      (u.innerHTML = "<script></script>"),
                      (u = u.removeChild(u.firstChild));
                    break;
                  case "select":
                    (u =
                      typeof s.is == "string"
                        ? y.createElement("select", { is: s.is })
                        : y.createElement("select")),
                      s.multiple
                        ? (u.multiple = !0)
                        : s.size && (u.size = s.size);
                    break;
                  default:
                    u =
                      typeof s.is == "string"
                        ? y.createElement(r, { is: s.is })
                        : y.createElement(r);
                }
            }
            (u[de] = e), (u[Re] = s);
            t: for (y = e.child; y !== null; ) {
              if (y.tag === 5 || y.tag === 6) u.appendChild(y.stateNode);
              else if (y.tag !== 4 && y.tag !== 27 && y.child !== null) {
                (y.child.return = y), (y = y.child);
                continue;
              }
              if (y === e) break t;
              for (; y.sibling === null; ) {
                if (y.return === null || y.return === e) break t;
                y = y.return;
              }
              (y.sibling.return = y.return), (y = y.sibling);
            }
            e.stateNode = u;
            t: switch ((ge(u, r, s), r)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                s = !!s.autoFocus;
                break t;
              case "img":
                s = !0;
                break t;
              default:
                s = !1;
            }
            s && Xn(e);
          }
        }
        return (
          Ft(e),
          mu(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, a),
          null
        );
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== s && Xn(e);
        else {
          if (typeof s != "string" && e.stateNode === null) throw Error(o(166));
          if (((t = rt.current), Bi(e))) {
            if (
              ((t = e.stateNode),
              (a = e.memoizedProps),
              (s = null),
              (r = me),
              r !== null)
            )
              switch (r.tag) {
                case 27:
                case 5:
                  s = r.memoizedProps;
              }
            (t[de] = e),
              (t = !!(
                t.nodeValue === a ||
                (s !== null && s.suppressHydrationWarning === !0) ||
                ug(t.nodeValue, a)
              )),
              t || da(e, !0);
          } else (t = Ko(t).createTextNode(s)), (t[de] = e), (e.stateNode = t);
        }
        return Ft(e), null;
      case 31:
        if (((a = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((s = Bi(e)), a !== null)) {
            if (t === null) {
              if (!s) throw Error(o(318));
              if (
                ((t = e.memoizedState),
                (t = t !== null ? t.dehydrated : null),
                !t)
              )
                throw Error(o(557));
              t[de] = e;
            } else
              $a(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4);
            Ft(e), (t = !1);
          } else
            (a = wc()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = a),
              (t = !0);
          if (!t) return e.flags & 256 ? (Ge(e), e) : (Ge(e), null);
          if ((e.flags & 128) !== 0) throw Error(o(558));
        }
        return Ft(e), null;
      case 13:
        if (
          ((s = e.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((r = Bi(e)), s !== null && s.dehydrated !== null)) {
            if (t === null) {
              if (!r) throw Error(o(318));
              if (
                ((r = e.memoizedState),
                (r = r !== null ? r.dehydrated : null),
                !r)
              )
                throw Error(o(317));
              r[de] = e;
            } else
              $a(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4);
            Ft(e), (r = !1);
          } else
            (r = wc()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = r),
              (r = !0);
          if (!r) return e.flags & 256 ? (Ge(e), e) : (Ge(e), null);
        }
        return (
          Ge(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = a), e)
            : ((a = s !== null),
              (t = t !== null && t.memoizedState !== null),
              a &&
                ((s = e.child),
                (r = null),
                s.alternate !== null &&
                  s.alternate.memoizedState !== null &&
                  s.alternate.memoizedState.cachePool !== null &&
                  (r = s.alternate.memoizedState.cachePool.pool),
                (u = null),
                s.memoizedState !== null &&
                  s.memoizedState.cachePool !== null &&
                  (u = s.memoizedState.cachePool.pool),
                u !== r && (s.flags |= 2048)),
              a !== t && a && (e.child.flags |= 8192),
              jo(e, e.updateQueue),
              Ft(e),
              null)
        );
      case 4:
        return Ct(), t === null && zu(e.stateNode.containerInfo), Ft(e), null;
      case 10:
        return Fn(e.type), Ft(e), null;
      case 19:
        if ((q(Jt), (s = e.memoizedState), s === null)) return Ft(e), null;
        if (((r = (e.flags & 128) !== 0), (u = s.rendering), u === null))
          if (r) nl(s, !1);
          else {
            if (Zt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((u = xo(t)), u !== null)) {
                  for (
                    e.flags |= 128,
                      nl(s, !1),
                      t = u.updateQueue,
                      e.updateQueue = t,
                      jo(e, t),
                      e.subtreeFlags = 0,
                      t = a,
                      a = e.child;
                    a !== null;

                  )
                    Ym(a, t), (a = a.sibling);
                  return (
                    Y(Jt, (Jt.current & 1) | 2),
                    Mt && Un(e, s.treeForkCount),
                    e.child
                  );
                }
                t = t.sibling;
              }
            s.tail !== null &&
              Ee() > Lo &&
              ((e.flags |= 128), (r = !0), nl(s, !1), (e.lanes = 4194304));
          }
        else {
          if (!r)
            if (((t = xo(u)), t !== null)) {
              if (
                ((e.flags |= 128),
                (r = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                jo(e, t),
                nl(s, !0),
                s.tail === null &&
                  s.tailMode === "hidden" &&
                  !u.alternate &&
                  !Mt)
              )
                return Ft(e), null;
            } else
              2 * Ee() - s.renderingStartTime > Lo &&
                a !== 536870912 &&
                ((e.flags |= 128), (r = !0), nl(s, !1), (e.lanes = 4194304));
          s.isBackwards
            ? ((u.sibling = e.child), (e.child = u))
            : ((t = s.last),
              t !== null ? (t.sibling = u) : (e.child = u),
              (s.last = u));
        }
        return s.tail !== null
          ? ((t = s.tail),
            (s.rendering = t),
            (s.tail = t.sibling),
            (s.renderingStartTime = Ee()),
            (t.sibling = null),
            (a = Jt.current),
            Y(Jt, r ? (a & 1) | 2 : a & 1),
            Mt && Un(e, s.treeForkCount),
            t)
          : (Ft(e), null);
      case 22:
      case 23:
        return (
          Ge(e),
          Vc(),
          (s = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== s && (e.flags |= 8192)
            : s && (e.flags |= 8192),
          s
            ? (a & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (Ft(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : Ft(e),
          (a = e.updateQueue),
          a !== null && jo(e, a.retryQueue),
          (a = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          (s = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (s = e.memoizedState.cachePool.pool),
          s !== a && (e.flags |= 2048),
          t !== null && q(ti),
          null
        );
      case 24:
        return (
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          e.memoizedState.cache !== a && (e.flags |= 2048),
          Fn(Wt),
          Ft(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, e.tag));
  }
  function G1(t, e) {
    switch ((Sc(e), e.tag)) {
      case 1:
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 3:
        return (
          Fn(Wt),
          Ct(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((e.flags = (t & -65537) | 128), e)
            : null
        );
      case 26:
      case 27:
      case 5:
        return Ae(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if ((Ge(e), e.alternate === null)) throw Error(o(340));
          $a();
        }
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 13:
        if (
          (Ge(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (e.alternate === null) throw Error(o(340));
          $a();
        }
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 19:
        return q(Jt), null;
      case 4:
        return Ct(), null;
      case 10:
        return Fn(e.type), null;
      case 22:
      case 23:
        return (
          Ge(e),
          Vc(),
          t !== null && q(ti),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return Fn(Wt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function pp(t, e) {
    switch ((Sc(e), e.tag)) {
      case 3:
        Fn(Wt), Ct();
        break;
      case 26:
      case 27:
      case 5:
        Ae(e);
        break;
      case 4:
        Ct();
        break;
      case 31:
        e.memoizedState !== null && Ge(e);
        break;
      case 13:
        Ge(e);
        break;
      case 19:
        q(Jt);
        break;
      case 10:
        Fn(e.type);
        break;
      case 22:
      case 23:
        Ge(e), Vc(), t !== null && q(ti);
        break;
      case 24:
        Fn(Wt);
    }
  }
  function al(t, e) {
    try {
      var a = e.updateQueue,
        s = a !== null ? a.lastEffect : null;
      if (s !== null) {
        var r = s.next;
        a = r;
        do {
          if ((a.tag & t) === t) {
            s = void 0;
            var u = a.create,
              y = a.inst;
            (s = u()), (y.destroy = s);
          }
          a = a.next;
        } while (a !== r);
      }
    } catch (b) {
      zt(e, e.return, b);
    }
  }
  function xa(t, e, a) {
    try {
      var s = e.updateQueue,
        r = s !== null ? s.lastEffect : null;
      if (r !== null) {
        var u = r.next;
        s = u;
        do {
          if ((s.tag & t) === t) {
            var y = s.inst,
              b = y.destroy;
            if (b !== void 0) {
              (y.destroy = void 0), (r = e);
              var w = a,
                H = b;
              try {
                H();
              } catch (k) {
                zt(r, w, k);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    } catch (k) {
      zt(e, e.return, k);
    }
  }
  function gp(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var a = t.stateNode;
      try {
        lh(e, a);
      } catch (s) {
        zt(t, t.return, s);
      }
    }
  }
  function yp(t, e, a) {
    (a.props = si(t.type, t.memoizedProps)), (a.state = t.memoizedState);
    try {
      a.componentWillUnmount();
    } catch (s) {
      zt(t, e, s);
    }
  }
  function il(t, e) {
    try {
      var a = t.ref;
      if (a !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var s = t.stateNode;
            break;
          case 30:
            s = t.stateNode;
            break;
          default:
            s = t.stateNode;
        }
        typeof a == "function" ? (t.refCleanup = a(s)) : (a.current = s);
      }
    } catch (r) {
      zt(t, e, r);
    }
  }
  function En(t, e) {
    var a = t.ref,
      s = t.refCleanup;
    if (a !== null)
      if (typeof s == "function")
        try {
          s();
        } catch (r) {
          zt(t, e, r);
        } finally {
          (t.refCleanup = null),
            (t = t.alternate),
            t != null && (t.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (r) {
          zt(t, e, r);
        }
      else a.current = null;
  }
  function vp(t) {
    var e = t.type,
      a = t.memoizedProps,
      s = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && s.focus();
          break t;
        case "img":
          a.src ? (s.src = a.src) : a.srcSet && (s.srcset = a.srcSet);
      }
    } catch (r) {
      zt(t, t.return, r);
    }
  }
  function hu(t, e, a) {
    try {
      var s = t.stateNode;
      dS(s, t.type, a, e), (s[Re] = e);
    } catch (r) {
      zt(t, t.return, r);
    }
  }
  function xp(t) {
    return (
      t.tag === 5 ||
      t.tag === 3 ||
      t.tag === 26 ||
      (t.tag === 27 && Na(t.type)) ||
      t.tag === 4
    );
  }
  function pu(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || xp(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;

      ) {
        if (
          (t.tag === 27 && Na(t.type)) ||
          t.flags & 2 ||
          t.child === null ||
          t.tag === 4
        )
          continue t;
        (t.child.return = t), (t = t.child);
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function gu(t, e, a) {
    var s = t.tag;
    if (s === 5 || s === 6)
      (t = t.stateNode),
        e
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === "HTML"
              ? a.ownerDocument.body
              : a
            ).insertBefore(t, e)
          : ((e =
              a.nodeType === 9
                ? a.body
                : a.nodeName === "HTML"
                ? a.ownerDocument.body
                : a),
            e.appendChild(t),
            (a = a._reactRootContainer),
            a != null || e.onclick !== null || (e.onclick = Vn));
    else if (
      s !== 4 &&
      (s === 27 && Na(t.type) && ((a = t.stateNode), (e = null)),
      (t = t.child),
      t !== null)
    )
      for (gu(t, e, a), t = t.sibling; t !== null; )
        gu(t, e, a), (t = t.sibling);
  }
  function Ho(t, e, a) {
    var s = t.tag;
    if (s === 5 || s === 6)
      (t = t.stateNode), e ? a.insertBefore(t, e) : a.appendChild(t);
    else if (
      s !== 4 &&
      (s === 27 && Na(t.type) && (a = t.stateNode), (t = t.child), t !== null)
    )
      for (Ho(t, e, a), t = t.sibling; t !== null; )
        Ho(t, e, a), (t = t.sibling);
  }
  function bp(t) {
    var e = t.stateNode,
      a = t.memoizedProps;
    try {
      for (var s = t.type, r = e.attributes; r.length; )
        e.removeAttributeNode(r[0]);
      ge(e, s, a), (e[de] = t), (e[Re] = a);
    } catch (u) {
      zt(t, t.return, u);
    }
  }
  var Pn = !1,
    ne = !1,
    yu = !1,
    Sp = typeof WeakSet == "function" ? WeakSet : Set,
    re = null;
  function X1(t, e) {
    if (((t = t.containerInfo), (Bu = tr), (t = Hm(t)), uc(t))) {
      if ("selectionStart" in t)
        var a = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          a = ((a = t.ownerDocument) && a.defaultView) || window;
          var s = a.getSelection && a.getSelection();
          if (s && s.rangeCount !== 0) {
            a = s.anchorNode;
            var r = s.anchorOffset,
              u = s.focusNode;
            s = s.focusOffset;
            try {
              a.nodeType, u.nodeType;
            } catch {
              a = null;
              break t;
            }
            var y = 0,
              b = -1,
              w = -1,
              H = 0,
              k = 0,
              P = t,
              V = null;
            e: for (;;) {
              for (
                var L;
                P !== a || (r !== 0 && P.nodeType !== 3) || (b = y + r),
                  P !== u || (s !== 0 && P.nodeType !== 3) || (w = y + s),
                  P.nodeType === 3 && (y += P.nodeValue.length),
                  (L = P.firstChild) !== null;

              )
                (V = P), (P = L);
              for (;;) {
                if (P === t) break e;
                if (
                  (V === a && ++H === r && (b = y),
                  V === u && ++k === s && (w = y),
                  (L = P.nextSibling) !== null)
                )
                  break;
                (P = V), (V = P.parentNode);
              }
              P = L;
            }
            a = b === -1 || w === -1 ? null : { start: b, end: w };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      Uu = { focusedElem: t, selectionRange: a }, tr = !1, re = e;
      re !== null;

    )
      if (
        ((e = re), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null)
      )
        (t.return = e), (re = t);
      else
        for (; re !== null; ) {
          switch (((e = re), (u = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue),
                (t = t !== null ? t.events : null),
                t !== null)
              )
                for (a = 0; a < t.length; a++)
                  (r = t[a]), (r.ref.impl = r.nextImpl);
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                (t = void 0),
                  (a = e),
                  (r = u.memoizedProps),
                  (u = u.memoizedState),
                  (s = a.stateNode);
                try {
                  var tt = si(a.type, r);
                  (t = s.getSnapshotBeforeUpdate(tt, u)),
                    (s.__reactInternalSnapshotBeforeUpdate = t);
                } catch (ut) {
                  zt(a, a.return, ut);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (
                  ((t = e.stateNode.containerInfo), (a = t.nodeType), a === 9)
                )
                  Yu(t);
                else if (a === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Yu(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(o(163));
          }
          if (((t = e.sibling), t !== null)) {
            (t.return = e.return), (re = t);
            break;
          }
          re = e.return;
        }
  }
  function Ap(t, e, a) {
    var s = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Zn(t, a), s & 4 && al(5, a);
        break;
      case 1:
        if ((Zn(t, a), s & 4))
          if (((t = a.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (y) {
              zt(a, a.return, y);
            }
          else {
            var r = si(a.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(r, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (y) {
              zt(a, a.return, y);
            }
          }
        s & 64 && gp(a), s & 512 && il(a, a.return);
        break;
      case 3:
        if ((Zn(t, a), s & 64 && ((t = a.updateQueue), t !== null))) {
          if (((e = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                e = a.child.stateNode;
                break;
              case 1:
                e = a.child.stateNode;
            }
          try {
            lh(t, e);
          } catch (y) {
            zt(a, a.return, y);
          }
        }
        break;
      case 27:
        e === null && s & 4 && bp(a);
      case 26:
      case 5:
        Zn(t, a), e === null && s & 4 && vp(a), s & 512 && il(a, a.return);
        break;
      case 12:
        Zn(t, a);
        break;
      case 31:
        Zn(t, a), s & 4 && Tp(t, a);
        break;
      case 13:
        Zn(t, a),
          s & 4 && Np(t, a),
          s & 64 &&
            ((t = a.memoizedState),
            t !== null &&
              ((t = t.dehydrated),
              t !== null && ((a = tS.bind(null, a)), bS(t, a))));
        break;
      case 22:
        if (((s = a.memoizedState !== null || Pn), !s)) {
          (e = (e !== null && e.memoizedState !== null) || ne), (r = Pn);
          var u = ne;
          (Pn = s),
            (ne = e) && !u ? Qn(t, a, (a.subtreeFlags & 8772) !== 0) : Zn(t, a),
            (Pn = r),
            (ne = u);
        }
        break;
      case 30:
        break;
      default:
        Zn(t, a);
    }
  }
  function wp(t) {
    var e = t.alternate;
    e !== null && ((t.alternate = null), wp(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && Kr(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null);
  }
  var qt = null,
    He = !1;
  function Kn(t, e, a) {
    for (a = a.child; a !== null; ) Ep(t, e, a), (a = a.sibling);
  }
  function Ep(t, e, a) {
    if (Te && typeof Te.onCommitFiberUnmount == "function")
      try {
        Te.onCommitFiberUnmount(Ya, a);
      } catch {}
    switch (a.tag) {
      case 26:
        ne || En(a, e),
          Kn(t, e, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a));
        break;
      case 27:
        ne || En(a, e);
        var s = qt,
          r = He;
        Na(a.type) && ((qt = a.stateNode), (He = !1)),
          Kn(t, e, a),
          ml(a.stateNode),
          (qt = s),
          (He = r);
        break;
      case 5:
        ne || En(a, e);
      case 6:
        if (
          ((s = qt),
          (r = He),
          (qt = null),
          Kn(t, e, a),
          (qt = s),
          (He = r),
          qt !== null)
        )
          if (He)
            try {
              (qt.nodeType === 9
                ? qt.body
                : qt.nodeName === "HTML"
                ? qt.ownerDocument.body
                : qt
              ).removeChild(a.stateNode);
            } catch (u) {
              zt(a, e, u);
            }
          else
            try {
              qt.removeChild(a.stateNode);
            } catch (u) {
              zt(a, e, u);
            }
        break;
      case 18:
        qt !== null &&
          (He
            ? ((t = qt),
              gg(
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === "HTML"
                  ? t.ownerDocument.body
                  : t,
                a.stateNode
              ),
              ss(t))
            : gg(qt, a.stateNode));
        break;
      case 4:
        (s = qt),
          (r = He),
          (qt = a.stateNode.containerInfo),
          (He = !0),
          Kn(t, e, a),
          (qt = s),
          (He = r);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        xa(2, a, e), ne || xa(4, a, e), Kn(t, e, a);
        break;
      case 1:
        ne ||
          (En(a, e),
          (s = a.stateNode),
          typeof s.componentWillUnmount == "function" && yp(a, e, s)),
          Kn(t, e, a);
        break;
      case 21:
        Kn(t, e, a);
        break;
      case 22:
        (ne = (s = ne) || a.memoizedState !== null), Kn(t, e, a), (ne = s);
        break;
      default:
        Kn(t, e, a);
    }
  }
  function Tp(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        ss(t);
      } catch (a) {
        zt(e, e.return, a);
      }
    }
  }
  function Np(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null &&
        ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        ss(t);
      } catch (a) {
        zt(e, e.return, a);
      }
  }
  function P1(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Sp()), e;
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new Sp()),
          e
        );
      default:
        throw Error(o(435, t.tag));
    }
  }
  function _o(t, e) {
    var a = P1(t);
    e.forEach(function (s) {
      if (!a.has(s)) {
        a.add(s);
        var r = eS.bind(null, t, s);
        s.then(r, r);
      }
    });
  }
  function _e(t, e) {
    var a = e.deletions;
    if (a !== null)
      for (var s = 0; s < a.length; s++) {
        var r = a[s],
          u = t,
          y = e,
          b = y;
        t: for (; b !== null; ) {
          switch (b.tag) {
            case 27:
              if (Na(b.type)) {
                (qt = b.stateNode), (He = !1);
                break t;
              }
              break;
            case 5:
              (qt = b.stateNode), (He = !1);
              break t;
            case 3:
            case 4:
              (qt = b.stateNode.containerInfo), (He = !0);
              break t;
          }
          b = b.return;
        }
        if (qt === null) throw Error(o(160));
        Ep(u, y, r),
          (qt = null),
          (He = !1),
          (u = r.alternate),
          u !== null && (u.return = null),
          (r.return = null);
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; ) Dp(e, t), (e = e.sibling);
  }
  var pn = null;
  function Dp(t, e) {
    var a = t.alternate,
      s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        _e(e, t),
          ze(t),
          s & 4 && (xa(3, t, t.return), al(3, t), xa(5, t, t.return));
        break;
      case 1:
        _e(e, t),
          ze(t),
          s & 512 && (ne || a === null || En(a, a.return)),
          s & 64 &&
            Pn &&
            ((t = t.updateQueue),
            t !== null &&
              ((s = t.callbacks),
              s !== null &&
                ((a = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = a === null ? s : a.concat(s)))));
        break;
      case 26:
        var r = pn;
        if (
          (_e(e, t),
          ze(t),
          s & 512 && (ne || a === null || En(a, a.return)),
          s & 4)
        ) {
          var u = a !== null ? a.memoizedState : null;
          if (((s = t.memoizedState), a === null))
            if (s === null)
              if (t.stateNode === null) {
                t: {
                  (s = t.type),
                    (a = t.memoizedProps),
                    (r = r.ownerDocument || r);
                  e: switch (s) {
                    case "title":
                      (u = r.getElementsByTagName("title")[0]),
                        (!u ||
                          u[Rs] ||
                          u[de] ||
                          u.namespaceURI === "http://www.w3.org/2000/svg" ||
                          u.hasAttribute("itemprop")) &&
                          ((u = r.createElement(s)),
                          r.head.insertBefore(
                            u,
                            r.querySelector("head > title")
                          )),
                        ge(u, s, a),
                        (u[de] = t),
                        oe(u),
                        (s = u);
                      break t;
                    case "link":
                      var y = Dg("link", "href", r).get(s + (a.href || ""));
                      if (y) {
                        for (var b = 0; b < y.length; b++)
                          if (
                            ((u = y[b]),
                            u.getAttribute("href") ===
                              (a.href == null || a.href === ""
                                ? null
                                : a.href) &&
                              u.getAttribute("rel") ===
                                (a.rel == null ? null : a.rel) &&
                              u.getAttribute("title") ===
                                (a.title == null ? null : a.title) &&
                              u.getAttribute("crossorigin") ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            y.splice(b, 1);
                            break e;
                          }
                      }
                      (u = r.createElement(s)),
                        ge(u, s, a),
                        r.head.appendChild(u);
                      break;
                    case "meta":
                      if (
                        (y = Dg("meta", "content", r).get(
                          s + (a.content || "")
                        ))
                      ) {
                        for (b = 0; b < y.length; b++)
                          if (
                            ((u = y[b]),
                            u.getAttribute("content") ===
                              (a.content == null ? null : "" + a.content) &&
                              u.getAttribute("name") ===
                                (a.name == null ? null : a.name) &&
                              u.getAttribute("property") ===
                                (a.property == null ? null : a.property) &&
                              u.getAttribute("http-equiv") ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              u.getAttribute("charset") ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            y.splice(b, 1);
                            break e;
                          }
                      }
                      (u = r.createElement(s)),
                        ge(u, s, a),
                        r.head.appendChild(u);
                      break;
                    default:
                      throw Error(o(468, s));
                  }
                  (u[de] = t), oe(u), (s = u);
                }
                t.stateNode = s;
              } else Cg(r, t.type, t.stateNode);
            else t.stateNode = Ng(r, s, t.memoizedProps);
          else
            u !== s
              ? (u === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : u.count--,
                s === null
                  ? Cg(r, t.type, t.stateNode)
                  : Ng(r, s, t.memoizedProps))
              : s === null &&
                t.stateNode !== null &&
                hu(t, t.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        _e(e, t),
          ze(t),
          s & 512 && (ne || a === null || En(a, a.return)),
          a !== null && s & 4 && hu(t, t.memoizedProps, a.memoizedProps);
        break;
      case 5:
        if (
          (_e(e, t),
          ze(t),
          s & 512 && (ne || a === null || En(a, a.return)),
          t.flags & 32)
        ) {
          r = t.stateNode;
          try {
            Ci(r, "");
          } catch (tt) {
            zt(t, t.return, tt);
          }
        }
        s & 4 &&
          t.stateNode != null &&
          ((r = t.memoizedProps), hu(t, r, a !== null ? a.memoizedProps : r)),
          s & 1024 && (yu = !0);
        break;
      case 6:
        if ((_e(e, t), ze(t), s & 4)) {
          if (t.stateNode === null) throw Error(o(162));
          (s = t.memoizedProps), (a = t.stateNode);
          try {
            a.nodeValue = s;
          } catch (tt) {
            zt(t, t.return, tt);
          }
        }
        break;
      case 3:
        if (
          ((Jo = null),
          (r = pn),
          (pn = Zo(e.containerInfo)),
          _e(e, t),
          (pn = r),
          ze(t),
          s & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            ss(e.containerInfo);
          } catch (tt) {
            zt(t, t.return, tt);
          }
        yu && ((yu = !1), Cp(t));
        break;
      case 4:
        (s = pn),
          (pn = Zo(t.stateNode.containerInfo)),
          _e(e, t),
          ze(t),
          (pn = s);
        break;
      case 12:
        _e(e, t), ze(t);
        break;
      case 31:
        _e(e, t),
          ze(t),
          s & 4 &&
            ((s = t.updateQueue),
            s !== null && ((t.updateQueue = null), _o(t, s)));
        break;
      case 13:
        _e(e, t),
          ze(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (Vo = Ee()),
          s & 4 &&
            ((s = t.updateQueue),
            s !== null && ((t.updateQueue = null), _o(t, s)));
        break;
      case 22:
        r = t.memoizedState !== null;
        var w = a !== null && a.memoizedState !== null,
          H = Pn,
          k = ne;
        if (
          ((Pn = H || r),
          (ne = k || w),
          _e(e, t),
          (ne = k),
          (Pn = H),
          ze(t),
          s & 8192)
        )
          t: for (
            e = t.stateNode,
              e._visibility = r ? e._visibility & -2 : e._visibility | 1,
              r && (a === null || w || Pn || ne || li(t)),
              a = null,
              e = t;
            ;

          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (a === null) {
                w = a = e;
                try {
                  if (((u = w.stateNode), r))
                    (y = u.style),
                      typeof y.setProperty == "function"
                        ? y.setProperty("display", "none", "important")
                        : (y.display = "none");
                  else {
                    b = w.stateNode;
                    var P = w.memoizedProps.style,
                      V =
                        P != null && P.hasOwnProperty("display")
                          ? P.display
                          : null;
                    b.style.display =
                      V == null || typeof V == "boolean" ? "" : ("" + V).trim();
                  }
                } catch (tt) {
                  zt(w, w.return, tt);
                }
              }
            } else if (e.tag === 6) {
              if (a === null) {
                w = e;
                try {
                  w.stateNode.nodeValue = r ? "" : w.memoizedProps;
                } catch (tt) {
                  zt(w, w.return, tt);
                }
              }
            } else if (e.tag === 18) {
              if (a === null) {
                w = e;
                try {
                  var L = w.stateNode;
                  r ? yg(L, !0) : yg(w.stateNode, !1);
                } catch (tt) {
                  zt(w, w.return, tt);
                }
              }
            } else if (
              ((e.tag !== 22 && e.tag !== 23) ||
                e.memoizedState === null ||
                e === t) &&
              e.child !== null
            ) {
              (e.child.return = e), (e = e.child);
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              a === e && (a = null), (e = e.return);
            }
            a === e && (a = null),
              (e.sibling.return = e.return),
              (e = e.sibling);
          }
        s & 4 &&
          ((s = t.updateQueue),
          s !== null &&
            ((a = s.retryQueue),
            a !== null && ((s.retryQueue = null), _o(t, a))));
        break;
      case 19:
        _e(e, t),
          ze(t),
          s & 4 &&
            ((s = t.updateQueue),
            s !== null && ((t.updateQueue = null), _o(t, s)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        _e(e, t), ze(t);
    }
  }
  function ze(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var a, s = t.return; s !== null; ) {
          if (xp(s)) {
            a = s;
            break;
          }
          s = s.return;
        }
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var r = a.stateNode,
              u = pu(t);
            Ho(t, u, r);
            break;
          case 5:
            var y = a.stateNode;
            a.flags & 32 && (Ci(y, ""), (a.flags &= -33));
            var b = pu(t);
            Ho(t, b, y);
            break;
          case 3:
          case 4:
            var w = a.stateNode.containerInfo,
              H = pu(t);
            gu(t, H, w);
            break;
          default:
            throw Error(o(161));
        }
      } catch (k) {
        zt(t, t.return, k);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Cp(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Cp(e),
          e.tag === 5 && e.flags & 1024 && e.stateNode.reset(),
          (t = t.sibling);
      }
  }
  function Zn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) Ap(t, e.alternate, e), (e = e.sibling);
  }
  function li(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          xa(4, e, e.return), li(e);
          break;
        case 1:
          En(e, e.return);
          var a = e.stateNode;
          typeof a.componentWillUnmount == "function" && yp(e, e.return, a),
            li(e);
          break;
        case 27:
          ml(e.stateNode);
        case 26:
        case 5:
          En(e, e.return), li(e);
          break;
        case 22:
          e.memoizedState === null && li(e);
          break;
        case 30:
          li(e);
          break;
        default:
          li(e);
      }
      t = t.sibling;
    }
  }
  function Qn(t, e, a) {
    for (a = a && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var s = e.alternate,
        r = t,
        u = e,
        y = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Qn(r, u, a), al(4, u);
          break;
        case 1:
          if (
            (Qn(r, u, a),
            (s = u),
            (r = s.stateNode),
            typeof r.componentDidMount == "function")
          )
            try {
              r.componentDidMount();
            } catch (H) {
              zt(s, s.return, H);
            }
          if (((s = u), (r = s.updateQueue), r !== null)) {
            var b = s.stateNode;
            try {
              var w = r.shared.hiddenCallbacks;
              if (w !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < w.length; r++)
                  sh(w[r], b);
            } catch (H) {
              zt(s, s.return, H);
            }
          }
          a && y & 64 && gp(u), il(u, u.return);
          break;
        case 27:
          bp(u);
        case 26:
        case 5:
          Qn(r, u, a), a && s === null && y & 4 && vp(u), il(u, u.return);
          break;
        case 12:
          Qn(r, u, a);
          break;
        case 31:
          Qn(r, u, a), a && y & 4 && Tp(r, u);
          break;
        case 13:
          Qn(r, u, a), a && y & 4 && Np(r, u);
          break;
        case 22:
          u.memoizedState === null && Qn(r, u, a), il(u, u.return);
          break;
        case 30:
          break;
        default:
          Qn(r, u, a);
      }
      e = e.sibling;
    }
  }
  function vu(t, e) {
    var a = null;
    t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (a = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== a && (t != null && t.refCount++, a != null && Gs(a));
  }
  function xu(t, e) {
    (t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && Gs(t));
  }
  function gn(t, e, a, s) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) Mp(t, e, a, s), (e = e.sibling);
  }
  function Mp(t, e, a, s) {
    var r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        gn(t, e, a, s), r & 2048 && al(9, e);
        break;
      case 1:
        gn(t, e, a, s);
        break;
      case 3:
        gn(t, e, a, s),
          r & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && Gs(t)));
        break;
      case 12:
        if (r & 2048) {
          gn(t, e, a, s), (t = e.stateNode);
          try {
            var u = e.memoizedProps,
              y = u.id,
              b = u.onPostCommit;
            typeof b == "function" &&
              b(
                y,
                e.alternate === null ? "mount" : "update",
                t.passiveEffectDuration,
                -0
              );
          } catch (w) {
            zt(e, e.return, w);
          }
        } else gn(t, e, a, s);
        break;
      case 31:
        gn(t, e, a, s);
        break;
      case 13:
        gn(t, e, a, s);
        break;
      case 23:
        break;
      case 22:
        (u = e.stateNode),
          (y = e.alternate),
          e.memoizedState !== null
            ? u._visibility & 2
              ? gn(t, e, a, s)
              : sl(t, e)
            : u._visibility & 2
            ? gn(t, e, a, s)
            : ((u._visibility |= 2),
              Zi(t, e, a, s, (e.subtreeFlags & 10256) !== 0 || !1)),
          r & 2048 && vu(y, e);
        break;
      case 24:
        gn(t, e, a, s), r & 2048 && xu(e.alternate, e);
        break;
      default:
        gn(t, e, a, s);
    }
  }
  function Zi(t, e, a, s, r) {
    for (
      r = r && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child;
      e !== null;

    ) {
      var u = t,
        y = e,
        b = a,
        w = s,
        H = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          Zi(u, y, b, w, r), al(8, y);
          break;
        case 23:
          break;
        case 22:
          var k = y.stateNode;
          y.memoizedState !== null
            ? k._visibility & 2
              ? Zi(u, y, b, w, r)
              : sl(u, y)
            : ((k._visibility |= 2), Zi(u, y, b, w, r)),
            r && H & 2048 && vu(y.alternate, y);
          break;
        case 24:
          Zi(u, y, b, w, r), r && H & 2048 && xu(y.alternate, y);
          break;
        default:
          Zi(u, y, b, w, r);
      }
      e = e.sibling;
    }
  }
  function sl(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var a = t,
          s = e,
          r = s.flags;
        switch (s.tag) {
          case 22:
            sl(a, s), r & 2048 && vu(s.alternate, s);
            break;
          case 24:
            sl(a, s), r & 2048 && xu(s.alternate, s);
            break;
          default:
            sl(a, s);
        }
        e = e.sibling;
      }
  }
  var ll = 8192;
  function Qi(t, e, a) {
    if (t.subtreeFlags & ll)
      for (t = t.child; t !== null; ) Op(t, e, a), (t = t.sibling);
  }
  function Op(t, e, a) {
    switch (t.tag) {
      case 26:
        Qi(t, e, a),
          t.flags & ll &&
            t.memoizedState !== null &&
            jS(a, pn, t.memoizedState, t.memoizedProps);
        break;
      case 5:
        Qi(t, e, a);
        break;
      case 3:
      case 4:
        var s = pn;
        (pn = Zo(t.stateNode.containerInfo)), Qi(t, e, a), (pn = s);
        break;
      case 22:
        t.memoizedState === null &&
          ((s = t.alternate),
          s !== null && s.memoizedState !== null
            ? ((s = ll), (ll = 16777216), Qi(t, e, a), (ll = s))
            : Qi(t, e, a));
        break;
      default:
        Qi(t, e, a);
    }
  }
  function Rp(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do (e = t.sibling), (t.sibling = null), (t = e);
      while (t !== null);
    }
  }
  function ol(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var s = e[a];
          (re = s), Hp(s, t);
        }
      Rp(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) jp(t), (t = t.sibling);
  }
  function jp(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ol(t), t.flags & 2048 && xa(9, t, t.return);
        break;
      case 3:
        ol(t);
        break;
      case 12:
        ol(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null &&
        e._visibility & 2 &&
        (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), zo(t))
          : ol(t);
        break;
      default:
        ol(t);
    }
  }
  function zo(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var s = e[a];
          (re = s), Hp(s, t);
        }
      Rp(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          xa(8, e, e.return), zo(e);
          break;
        case 22:
          (a = e.stateNode),
            a._visibility & 2 && ((a._visibility &= -3), zo(e));
          break;
        default:
          zo(e);
      }
      t = t.sibling;
    }
  }
  function Hp(t, e) {
    for (; re !== null; ) {
      var a = re;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          xa(8, a, e);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var s = a.memoizedState.cachePool.pool;
            s != null && s.refCount++;
          }
          break;
        case 24:
          Gs(a.memoizedState.cache);
      }
      if (((s = a.child), s !== null)) (s.return = a), (re = s);
      else
        t: for (a = t; re !== null; ) {
          s = re;
          var r = s.sibling,
            u = s.return;
          if ((wp(s), s === a)) {
            re = null;
            break t;
          }
          if (r !== null) {
            (r.return = u), (re = r);
            break t;
          }
          re = u;
        }
    }
  }
  var K1 = {
      getCacheForType: function (t) {
        var e = he(Wt),
          a = e.data.get(t);
        return a === void 0 && ((a = t()), e.data.set(t, a)), a;
      },
      cacheSignal: function () {
        return he(Wt).controller.signal;
      },
    },
    Z1 = typeof WeakMap == "function" ? WeakMap : Map,
    jt = 0,
    Ut = null,
    Et = null,
    Nt = 0,
    _t = 0,
    Xe = null,
    ba = !1,
    Ji = !1,
    bu = !1,
    Jn = 0,
    Zt = 0,
    Sa = 0,
    oi = 0,
    Su = 0,
    Pe = 0,
    $i = 0,
    rl = null,
    Ve = null,
    Au = !1,
    Vo = 0,
    _p = 0,
    Lo = 1 / 0,
    Bo = null,
    Aa = null,
    ie = 0,
    wa = null,
    Ii = null,
    $n = 0,
    wu = 0,
    Eu = null,
    zp = null,
    cl = 0,
    Tu = null;
  function Ke() {
    return (jt & 2) !== 0 && Nt !== 0 ? Nt & -Nt : C.T !== null ? Ru() : Xr();
  }
  function Vp() {
    if (Pe === 0)
      if ((Nt & 536870912) === 0 || Mt) {
        var t = bi;
        (bi <<= 1), (bi & 3932160) === 0 && (bi = 262144), (Pe = t);
      } else Pe = 536870912;
    return (t = qe.current), t !== null && (t.flags |= 32), Pe;
  }
  function Le(t, e, a) {
    ((t === Ut && (_t === 2 || _t === 9)) || t.cancelPendingCommit !== null) &&
      (Wi(t, 0), Ea(t, Nt, Pe, !1)),
      Xt(t, a),
      ((jt & 2) === 0 || t !== Ut) &&
        (t === Ut &&
          ((jt & 2) === 0 && (oi |= a), Zt === 4 && Ea(t, Nt, Pe, !1)),
        Tn(t));
  }
  function Lp(t, e, a) {
    if ((jt & 6) !== 0) throw Error(o(327));
    var s = (!a && (e & 127) === 0 && (e & t.expiredLanes) === 0) || Yt(t, e),
      r = s ? $1(t, e) : Du(t, e, !0),
      u = s;
    do {
      if (r === 0) {
        Ji && !s && Ea(t, e, 0, !1);
        break;
      } else {
        if (((a = t.current.alternate), u && !Q1(a))) {
          (r = Du(t, e, !1)), (u = !1);
          continue;
        }
        if (r === 2) {
          if (((u = e), t.errorRecoveryDisabledLanes & u)) var y = 0;
          else
            (y = t.pendingLanes & -536870913),
              (y = y !== 0 ? y : y & 536870912 ? 536870912 : 0);
          if (y !== 0) {
            e = y;
            t: {
              var b = t;
              r = rl;
              var w = b.current.memoizedState.isDehydrated;
              if ((w && (Wi(b, y).flags |= 256), (y = Du(b, y, !1)), y !== 2)) {
                if (bu && !w) {
                  (b.errorRecoveryDisabledLanes |= u), (oi |= u), (r = 4);
                  break t;
                }
                (u = Ve),
                  (Ve = r),
                  u !== null && (Ve === null ? (Ve = u) : Ve.push.apply(Ve, u));
              }
              r = y;
            }
            if (((u = !1), r !== 2)) continue;
          }
        }
        if (r === 1) {
          Wi(t, 0), Ea(t, e, 0, !0);
          break;
        }
        t: {
          switch (((s = t), (u = r), u)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Ea(s, e, Pe, !ba);
              break t;
            case 2:
              Ve = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((e & 62914560) === e && ((r = Vo + 300 - Ee()), 10 < r)) {
            if ((Ea(s, e, Pe, !ba), ht(s, 0, !0) !== 0)) break t;
            ($n = e),
              (s.timeoutHandle = hg(
                Bp.bind(
                  null,
                  s,
                  a,
                  Ve,
                  Bo,
                  Au,
                  e,
                  Pe,
                  oi,
                  $i,
                  ba,
                  u,
                  "Throttled",
                  -0,
                  0
                ),
                r
              ));
            break t;
          }
          Bp(s, a, Ve, Bo, Au, e, Pe, oi, $i, ba, u, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Tn(t);
  }
  function Bp(t, e, a, s, r, u, y, b, w, H, k, P, V, L) {
    if (
      ((t.timeoutHandle = -1),
      (P = e.subtreeFlags),
      P & 8192 || (P & 16785408) === 16785408)
    ) {
      (P = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Vn,
      }),
        Op(e, u, P);
      var tt =
        (u & 62914560) === u ? Vo - Ee() : (u & 4194048) === u ? _p - Ee() : 0;
      if (((tt = HS(P, tt)), tt !== null)) {
        ($n = u),
          (t.cancelPendingCommit = tt(
            Pp.bind(null, t, e, u, a, s, r, y, b, w, k, P, null, V, L)
          )),
          Ea(t, u, y, !H);
        return;
      }
    }
    Pp(t, e, u, a, s, r, y, b, w);
  }
  function Q1(t) {
    for (var e = t; ; ) {
      var a = e.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        e.flags & 16384 &&
        ((a = e.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var s = 0; s < a.length; s++) {
          var r = a[s],
            u = r.getSnapshot;
          r = r.value;
          try {
            if (!Fe(u(), r)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = e.child), e.subtreeFlags & 16384 && a !== null))
        (a.return = e), (e = a);
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    }
    return !0;
  }
  function Ea(t, e, a, s) {
    (e &= ~Su),
      (e &= ~oi),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      s && (t.warmLanes |= e),
      (s = t.expirationTimes);
    for (var r = e; 0 < r; ) {
      var u = 31 - ve(r),
        y = 1 << u;
      (s[u] = -1), (r &= ~y);
    }
    a !== 0 && Ga(t, a, e);
  }
  function Uo() {
    return (jt & 6) === 0 ? (ul(0), !1) : !0;
  }
  function Nu() {
    if (Et !== null) {
      if (_t === 0) var t = Et.return;
      else (t = Et), (kn = Ia = null), Yc(t), (qi = null), (Ps = 0), (t = Et);
      for (; t !== null; ) pp(t.alternate, t), (t = t.return);
      Et = null;
    }
  }
  function Wi(t, e) {
    var a = t.timeoutHandle;
    a !== -1 && ((t.timeoutHandle = -1), pS(a)),
      (a = t.cancelPendingCommit),
      a !== null && ((t.cancelPendingCommit = null), a()),
      ($n = 0),
      Nu(),
      (Ut = t),
      (Et = a = Bn(t.current, null)),
      (Nt = e),
      (_t = 0),
      (Xe = null),
      (ba = !1),
      (Ji = Yt(t, e)),
      (bu = !1),
      ($i = Pe = Su = oi = Sa = Zt = 0),
      (Ve = rl = null),
      (Au = !1),
      (e & 8) !== 0 && (e |= e & 32);
    var s = t.entangledLanes;
    if (s !== 0)
      for (t = t.entanglements, s &= e; 0 < s; ) {
        var r = 31 - ve(s),
          u = 1 << r;
        (e |= t[r]), (s &= ~u);
      }
    return (Jn = e), so(), a;
  }
  function Up(t, e) {
    (xt = null),
      (C.H = tl),
      e === Yi || e === ho
        ? ((e = eh()), (_t = 3))
        : e === Oc
        ? ((e = eh()), (_t = 4))
        : (_t =
            e === iu
              ? 8
              : e !== null &&
                typeof e == "object" &&
                typeof e.then == "function"
              ? 6
              : 1),
      (Xe = e),
      Et === null && ((Zt = 1), Co(t, We(e, t.current)));
  }
  function kp() {
    var t = qe.current;
    return t === null
      ? !0
      : (Nt & 4194048) === Nt
      ? an === null
      : (Nt & 62914560) === Nt || (Nt & 536870912) !== 0
      ? t === an
      : !1;
  }
  function Fp() {
    var t = C.H;
    return (C.H = tl), t === null ? tl : t;
  }
  function Yp() {
    var t = C.A;
    return (C.A = K1), t;
  }
  function ko() {
    (Zt = 4),
      ba || ((Nt & 4194048) !== Nt && qe.current !== null) || (Ji = !0),
      ((Sa & 134217727) === 0 && (oi & 134217727) === 0) ||
        Ut === null ||
        Ea(Ut, Nt, Pe, !1);
  }
  function Du(t, e, a) {
    var s = jt;
    jt |= 2;
    var r = Fp(),
      u = Yp();
    (Ut !== t || Nt !== e) && ((Bo = null), Wi(t, e)), (e = !1);
    var y = Zt;
    t: do
      try {
        if (_t !== 0 && Et !== null) {
          var b = Et,
            w = Xe;
          switch (_t) {
            case 8:
              Nu(), (y = 6);
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              qe.current === null && (e = !0);
              var H = _t;
              if (((_t = 0), (Xe = null), ts(t, b, w, H), a && Ji)) {
                y = 0;
                break t;
              }
              break;
            default:
              (H = _t), (_t = 0), (Xe = null), ts(t, b, w, H);
          }
        }
        J1(), (y = Zt);
        break;
      } catch (k) {
        Up(t, k);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (kn = Ia = null),
      (jt = s),
      (C.H = r),
      (C.A = u),
      Et === null && ((Ut = null), (Nt = 0), so()),
      y
    );
  }
  function J1() {
    for (; Et !== null; ) qp(Et);
  }
  function $1(t, e) {
    var a = jt;
    jt |= 2;
    var s = Fp(),
      r = Yp();
    Ut !== t || Nt !== e
      ? ((Bo = null), (Lo = Ee() + 500), Wi(t, e))
      : (Ji = Yt(t, e));
    t: do
      try {
        if (_t !== 0 && Et !== null) {
          e = Et;
          var u = Xe;
          e: switch (_t) {
            case 1:
              (_t = 0), (Xe = null), ts(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (Wm(u)) {
                (_t = 0), (Xe = null), Gp(e);
                break;
              }
              (e = function () {
                (_t !== 2 && _t !== 9) || Ut !== t || (_t = 7), Tn(t);
              }),
                u.then(e, e);
              break t;
            case 3:
              _t = 7;
              break t;
            case 4:
              _t = 5;
              break t;
            case 7:
              Wm(u)
                ? ((_t = 0), (Xe = null), Gp(e))
                : ((_t = 0), (Xe = null), ts(t, e, u, 7));
              break;
            case 5:
              var y = null;
              switch (Et.tag) {
                case 26:
                  y = Et.memoizedState;
                case 5:
                case 27:
                  var b = Et;
                  if (y ? Mg(y) : b.stateNode.complete) {
                    (_t = 0), (Xe = null);
                    var w = b.sibling;
                    if (w !== null) Et = w;
                    else {
                      var H = b.return;
                      H !== null ? ((Et = H), Fo(H)) : (Et = null);
                    }
                    break e;
                  }
              }
              (_t = 0), (Xe = null), ts(t, e, u, 5);
              break;
            case 6:
              (_t = 0), (Xe = null), ts(t, e, u, 6);
              break;
            case 8:
              Nu(), (Zt = 6);
              break t;
            default:
              throw Error(o(462));
          }
        }
        I1();
        break;
      } catch (k) {
        Up(t, k);
      }
    while (!0);
    return (
      (kn = Ia = null),
      (C.H = s),
      (C.A = r),
      (jt = a),
      Et !== null ? 0 : ((Ut = null), (Nt = 0), so(), Zt)
    );
  }
  function I1() {
    for (; Et !== null && !we(); ) qp(Et);
  }
  function qp(t) {
    var e = mp(t.alternate, t, Jn);
    (t.memoizedProps = t.pendingProps), e === null ? Fo(t) : (Et = e);
  }
  function Gp(t) {
    var e = t,
      a = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = op(a, e, e.pendingProps, e.type, void 0, Nt);
        break;
      case 11:
        e = op(a, e, e.pendingProps, e.type.render, e.ref, Nt);
        break;
      case 5:
        Yc(e);
      default:
        pp(a, e), (e = Et = Ym(e, Jn)), (e = mp(a, e, Jn));
    }
    (t.memoizedProps = t.pendingProps), e === null ? Fo(t) : (Et = e);
  }
  function ts(t, e, a, s) {
    (kn = Ia = null), Yc(e), (qi = null), (Ps = 0);
    var r = e.return;
    try {
      if (k1(t, r, e, a, Nt)) {
        (Zt = 1), Co(t, We(a, t.current)), (Et = null);
        return;
      }
    } catch (u) {
      if (r !== null) throw ((Et = r), u);
      (Zt = 1), Co(t, We(a, t.current)), (Et = null);
      return;
    }
    e.flags & 32768
      ? (Mt || s === 1
          ? (t = !0)
          : Ji || (Nt & 536870912) !== 0
          ? (t = !1)
          : ((ba = t = !0),
            (s === 2 || s === 9 || s === 3 || s === 6) &&
              ((s = qe.current),
              s !== null && s.tag === 13 && (s.flags |= 16384))),
        Xp(e, t))
      : Fo(e);
  }
  function Fo(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Xp(e, ba);
        return;
      }
      t = e.return;
      var a = q1(e.alternate, e, Jn);
      if (a !== null) {
        Et = a;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        Et = e;
        return;
      }
      Et = e = t;
    } while (e !== null);
    Zt === 0 && (Zt = 5);
  }
  function Xp(t, e) {
    do {
      var a = G1(t.alternate, t);
      if (a !== null) {
        (a.flags &= 32767), (Et = a);
        return;
      }
      if (
        ((a = t.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        Et = t;
        return;
      }
      Et = t = a;
    } while (t !== null);
    (Zt = 6), (Et = null);
  }
  function Pp(t, e, a, s, r, u, y, b, w) {
    t.cancelPendingCommit = null;
    do Yo();
    while (ie !== 0);
    if ((jt & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      if (
        ((u = e.lanes | e.childLanes),
        (u |= pc),
        Ce(t, a, u, y, b, w),
        t === Ut && ((Et = Ut = null), (Nt = 0)),
        (Ii = e),
        (wa = t),
        ($n = a),
        (wu = u),
        (Eu = r),
        (zp = s),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            nS(Fa, function () {
              return $p(), null;
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (s = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || s)
      ) {
        (s = C.T), (C.T = null), (r = B.p), (B.p = 2), (y = jt), (jt |= 4);
        try {
          X1(t, e, a);
        } finally {
          (jt = y), (B.p = r), (C.T = s);
        }
      }
      (ie = 1), Kp(), Zp(), Qp();
    }
  }
  function Kp() {
    if (ie === 1) {
      ie = 0;
      var t = wa,
        e = Ii,
        a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        (a = C.T), (C.T = null);
        var s = B.p;
        B.p = 2;
        var r = jt;
        jt |= 4;
        try {
          Dp(e, t);
          var u = Uu,
            y = Hm(t.containerInfo),
            b = u.focusedElem,
            w = u.selectionRange;
          if (
            y !== b &&
            b &&
            b.ownerDocument &&
            jm(b.ownerDocument.documentElement, b)
          ) {
            if (w !== null && uc(b)) {
              var H = w.start,
                k = w.end;
              if ((k === void 0 && (k = H), "selectionStart" in b))
                (b.selectionStart = H),
                  (b.selectionEnd = Math.min(k, b.value.length));
              else {
                var P = b.ownerDocument || document,
                  V = (P && P.defaultView) || window;
                if (V.getSelection) {
                  var L = V.getSelection(),
                    tt = b.textContent.length,
                    ut = Math.min(w.start, tt),
                    Bt = w.end === void 0 ? ut : Math.min(w.end, tt);
                  !L.extend && ut > Bt && ((y = Bt), (Bt = ut), (ut = y));
                  var M = Rm(b, ut),
                    N = Rm(b, Bt);
                  if (
                    M &&
                    N &&
                    (L.rangeCount !== 1 ||
                      L.anchorNode !== M.node ||
                      L.anchorOffset !== M.offset ||
                      L.focusNode !== N.node ||
                      L.focusOffset !== N.offset)
                  ) {
                    var j = P.createRange();
                    j.setStart(M.node, M.offset),
                      L.removeAllRanges(),
                      ut > Bt
                        ? (L.addRange(j), L.extend(N.node, N.offset))
                        : (j.setEnd(N.node, N.offset), L.addRange(j));
                  }
                }
              }
            }
            for (P = [], L = b; (L = L.parentNode); )
              L.nodeType === 1 &&
                P.push({ element: L, left: L.scrollLeft, top: L.scrollTop });
            for (
              typeof b.focus == "function" && b.focus(), b = 0;
              b < P.length;
              b++
            ) {
              var G = P[b];
              (G.element.scrollLeft = G.left), (G.element.scrollTop = G.top);
            }
          }
          (tr = !!Bu), (Uu = Bu = null);
        } finally {
          (jt = r), (B.p = s), (C.T = a);
        }
      }
      (t.current = e), (ie = 2);
    }
  }
  function Zp() {
    if (ie === 2) {
      ie = 0;
      var t = wa,
        e = Ii,
        a = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || a) {
        (a = C.T), (C.T = null);
        var s = B.p;
        B.p = 2;
        var r = jt;
        jt |= 4;
        try {
          Ap(t, e.alternate, e);
        } finally {
          (jt = r), (B.p = s), (C.T = a);
        }
      }
      ie = 3;
    }
  }
  function Qp() {
    if (ie === 4 || ie === 3) {
      (ie = 0), sa();
      var t = wa,
        e = Ii,
        a = $n,
        s = zp;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (ie = 5)
        : ((ie = 0), (Ii = wa = null), Jp(t, t.pendingLanes));
      var r = t.pendingLanes;
      if (
        (r === 0 && (Aa = null),
        mn(a),
        (e = e.stateNode),
        Te && typeof Te.onCommitFiberRoot == "function")
      )
        try {
          Te.onCommitFiberRoot(Ya, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (s !== null) {
        (e = C.T), (r = B.p), (B.p = 2), (C.T = null);
        try {
          for (var u = t.onRecoverableError, y = 0; y < s.length; y++) {
            var b = s[y];
            u(b.value, { componentStack: b.stack });
          }
        } finally {
          (C.T = e), (B.p = r);
        }
      }
      ($n & 3) !== 0 && Yo(),
        Tn(t),
        (r = t.pendingLanes),
        (a & 261930) !== 0 && (r & 42) !== 0
          ? t === Tu
            ? cl++
            : ((cl = 0), (Tu = t))
          : (cl = 0),
        ul(0);
    }
  }
  function Jp(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), Gs(e)));
  }
  function Yo() {
    return Kp(), Zp(), Qp(), $p();
  }
  function $p() {
    if (ie !== 5) return !1;
    var t = wa,
      e = wu;
    wu = 0;
    var a = mn($n),
      s = C.T,
      r = B.p;
    try {
      (B.p = 32 > a ? 32 : a), (C.T = null), (a = Eu), (Eu = null);
      var u = wa,
        y = $n;
      if (((ie = 0), (Ii = wa = null), ($n = 0), (jt & 6) !== 0))
        throw Error(o(331));
      var b = jt;
      if (
        ((jt |= 4),
        jp(u.current),
        Mp(u, u.current, y, a),
        (jt = b),
        ul(0, !1),
        Te && typeof Te.onPostCommitFiberRoot == "function")
      )
        try {
          Te.onPostCommitFiberRoot(Ya, u);
        } catch {}
      return !0;
    } finally {
      (B.p = r), (C.T = s), Jp(t, e);
    }
  }
  function Ip(t, e, a) {
    (e = We(a, e)),
      (e = au(t.stateNode, e, 2)),
      (t = ga(t, e, 2)),
      t !== null && (Xt(t, 2), Tn(t));
  }
  function zt(t, e, a) {
    if (t.tag === 3) Ip(t, t, a);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Ip(e, t, a);
          break;
        } else if (e.tag === 1) {
          var s = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == "function" ||
            (typeof s.componentDidCatch == "function" &&
              (Aa === null || !Aa.has(s)))
          ) {
            (t = We(a, t)),
              (a = Wh(2)),
              (s = ga(e, a, 2)),
              s !== null && (tp(a, s, e, t), Xt(s, 2), Tn(s));
            break;
          }
        }
        e = e.return;
      }
  }
  function Cu(t, e, a) {
    var s = t.pingCache;
    if (s === null) {
      s = t.pingCache = new Z1();
      var r = new Set();
      s.set(e, r);
    } else (r = s.get(e)), r === void 0 && ((r = new Set()), s.set(e, r));
    r.has(a) ||
      ((bu = !0), r.add(a), (t = W1.bind(null, t, e, a)), e.then(t, t));
  }
  function W1(t, e, a) {
    var s = t.pingCache;
    s !== null && s.delete(e),
      (t.pingedLanes |= t.suspendedLanes & a),
      (t.warmLanes &= ~a),
      Ut === t &&
        (Nt & a) === a &&
        (Zt === 4 || (Zt === 3 && (Nt & 62914560) === Nt && 300 > Ee() - Vo)
          ? (jt & 2) === 0 && Wi(t, 0)
          : (Su |= a),
        $i === Nt && ($i = 0)),
      Tn(t);
  }
  function Wp(t, e) {
    e === 0 && (e = xe()), (t = Qa(t, e)), t !== null && (Xt(t, e), Tn(t));
  }
  function tS(t) {
    var e = t.memoizedState,
      a = 0;
    e !== null && (a = e.retryLane), Wp(t, a);
  }
  function eS(t, e) {
    var a = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var s = t.stateNode,
          r = t.memoizedState;
        r !== null && (a = r.retryLane);
        break;
      case 19:
        s = t.stateNode;
        break;
      case 22:
        s = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    s !== null && s.delete(e), Wp(t, a);
  }
  function nS(t, e) {
    return Ds(t, e);
  }
  var qo = null,
    es = null,
    Mu = !1,
    Go = !1,
    Ou = !1,
    Ta = 0;
  function Tn(t) {
    t !== es &&
      t.next === null &&
      (es === null ? (qo = es = t) : (es = es.next = t)),
      (Go = !0),
      Mu || ((Mu = !0), iS());
  }
  function ul(t, e) {
    if (!Ou && Go) {
      Ou = !0;
      do
        for (var a = !1, s = qo; s !== null; ) {
          if (t !== 0) {
            var r = s.pendingLanes;
            if (r === 0) var u = 0;
            else {
              var y = s.suspendedLanes,
                b = s.pingedLanes;
              (u = (1 << (31 - ve(42 | t) + 1)) - 1),
                (u &= r & ~(y & ~b)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0);
            }
            u !== 0 && ((a = !0), ag(s, u));
          } else
            (u = Nt),
              (u = ht(
                s,
                s === Ut ? u : 0,
                s.cancelPendingCommit !== null || s.timeoutHandle !== -1
              )),
              (u & 3) === 0 || Yt(s, u) || ((a = !0), ag(s, u));
          s = s.next;
        }
      while (a);
      Ou = !1;
    }
  }
  function aS() {
    tg();
  }
  function tg() {
    Go = Mu = !1;
    var t = 0;
    Ta !== 0 && hS() && (t = Ta);
    for (var e = Ee(), a = null, s = qo; s !== null; ) {
      var r = s.next,
        u = eg(s, e);
      u === 0
        ? ((s.next = null),
          a === null ? (qo = r) : (a.next = r),
          r === null && (es = a))
        : ((a = s), (t !== 0 || (u & 3) !== 0) && (Go = !0)),
        (s = r);
    }
    (ie !== 0 && ie !== 5) || ul(t), Ta !== 0 && (Ta = 0);
  }
  function eg(t, e) {
    for (
      var a = t.suspendedLanes,
        s = t.pingedLanes,
        r = t.expirationTimes,
        u = t.pendingLanes & -62914561;
      0 < u;

    ) {
      var y = 31 - ve(u),
        b = 1 << y,
        w = r[y];
      w === -1
        ? ((b & a) === 0 || (b & s) !== 0) && (r[y] = le(b, e))
        : w <= e && (t.expiredLanes |= b),
        (u &= ~b);
    }
    if (
      ((e = Ut),
      (a = Nt),
      (a = ht(
        t,
        t === e ? a : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1
      )),
      (s = t.callbackNode),
      a === 0 ||
        (t === e && (_t === 2 || _t === 9)) ||
        t.cancelPendingCommit !== null)
    )
      return (
        s !== null && s !== null && Cs(s),
        (t.callbackNode = null),
        (t.callbackPriority = 0)
      );
    if ((a & 3) === 0 || Yt(t, a)) {
      if (((e = a & -a), e === t.callbackPriority)) return e;
      switch ((s !== null && Cs(s), mn(a))) {
        case 2:
        case 8:
          a = Pl;
          break;
        case 32:
          a = Fa;
          break;
        case 268435456:
          a = _n;
          break;
        default:
          a = Fa;
      }
      return (
        (s = ng.bind(null, t)),
        (a = Ds(a, s)),
        (t.callbackPriority = e),
        (t.callbackNode = a),
        e
      );
    }
    return (
      s !== null && s !== null && Cs(s),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function ng(t, e) {
    if (ie !== 0 && ie !== 5)
      return (t.callbackNode = null), (t.callbackPriority = 0), null;
    var a = t.callbackNode;
    if (Yo() && t.callbackNode !== a) return null;
    var s = Nt;
    return (
      (s = ht(
        t,
        t === Ut ? s : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1
      )),
      s === 0
        ? null
        : (Lp(t, s, e),
          eg(t, Ee()),
          t.callbackNode != null && t.callbackNode === a
            ? ng.bind(null, t)
            : null)
    );
  }
  function ag(t, e) {
    if (Yo()) return null;
    Lp(t, e, !0);
  }
  function iS() {
    gS(function () {
      (jt & 6) !== 0 ? Ds(ka, aS) : tg();
    });
  }
  function Ru() {
    if (Ta === 0) {
      var t = ki;
      t === 0 && ((t = xi), (xi <<= 1), (xi & 261888) === 0 && (xi = 256)),
        (Ta = t);
    }
    return Ta;
  }
  function ig(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
      ? t
      : $l("" + t);
  }
  function sg(t, e) {
    var a = e.ownerDocument.createElement("input");
    return (
      (a.name = e.name),
      (a.value = e.value),
      t.id && a.setAttribute("form", t.id),
      e.parentNode.insertBefore(a, e),
      (t = new FormData(t)),
      a.parentNode.removeChild(a),
      t
    );
  }
  function sS(t, e, a, s, r) {
    if (e === "submit" && a && a.stateNode === r) {
      var u = ig((r[Re] || null).action),
        y = s.submitter;
      y &&
        ((e = (e = y[Re] || null)
          ? ig(e.formAction)
          : y.getAttribute("formAction")),
        e !== null && ((u = e), (y = null)));
      var b = new eo("action", "action", null, s, r);
      t.push({
        event: b,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (s.defaultPrevented) {
                if (Ta !== 0) {
                  var w = y ? sg(r, y) : new FormData(r);
                  $c(
                    a,
                    { pending: !0, data: w, method: r.method, action: u },
                    null,
                    w
                  );
                }
              } else
                typeof u == "function" &&
                  (b.preventDefault(),
                  (w = y ? sg(r, y) : new FormData(r)),
                  $c(
                    a,
                    { pending: !0, data: w, method: r.method, action: u },
                    u,
                    w
                  ));
            },
            currentTarget: r,
          },
        ],
      });
    }
  }
  for (var ju = 0; ju < hc.length; ju++) {
    var Hu = hc[ju],
      lS = Hu.toLowerCase(),
      oS = Hu[0].toUpperCase() + Hu.slice(1);
    hn(lS, "on" + oS);
  }
  hn(Vm, "onAnimationEnd"),
    hn(Lm, "onAnimationIteration"),
    hn(Bm, "onAnimationStart"),
    hn("dblclick", "onDoubleClick"),
    hn("focusin", "onFocus"),
    hn("focusout", "onBlur"),
    hn(w1, "onTransitionRun"),
    hn(E1, "onTransitionStart"),
    hn(T1, "onTransitionCancel"),
    hn(Um, "onTransitionEnd"),
    Ni("onMouseEnter", ["mouseout", "mouseover"]),
    Ni("onMouseLeave", ["mouseout", "mouseover"]),
    Ni("onPointerEnter", ["pointerout", "pointerover"]),
    Ni("onPointerLeave", ["pointerout", "pointerover"]),
    Xa(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    Xa(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    Xa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Xa(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    Xa(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    Xa(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var fl =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    rS = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(fl)
    );
  function lg(t, e) {
    e = (e & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var s = t[a],
        r = s.event;
      s = s.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var y = s.length - 1; 0 <= y; y--) {
            var b = s[y],
              w = b.instance,
              H = b.currentTarget;
            if (((b = b.listener), w !== u && r.isPropagationStopped()))
              break t;
            (u = b), (r.currentTarget = H);
            try {
              u(r);
            } catch (k) {
              io(k);
            }
            (r.currentTarget = null), (u = w);
          }
        else
          for (y = 0; y < s.length; y++) {
            if (
              ((b = s[y]),
              (w = b.instance),
              (H = b.currentTarget),
              (b = b.listener),
              w !== u && r.isPropagationStopped())
            )
              break t;
            (u = b), (r.currentTarget = H);
            try {
              u(r);
            } catch (k) {
              io(k);
            }
            (r.currentTarget = null), (u = w);
          }
      }
    }
  }
  function Tt(t, e) {
    var a = e[Pr];
    a === void 0 && (a = e[Pr] = new Set());
    var s = t + "__bubble";
    a.has(s) || (og(e, t, 2, !1), a.add(s));
  }
  function _u(t, e, a) {
    var s = 0;
    e && (s |= 4), og(a, t, s, e);
  }
  var Xo = "_reactListening" + Math.random().toString(36).slice(2);
  function zu(t) {
    if (!t[Xo]) {
      (t[Xo] = !0),
        tm.forEach(function (a) {
          a !== "selectionchange" && (rS.has(a) || _u(a, !1, t), _u(a, !0, t));
        });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Xo] || ((e[Xo] = !0), _u("selectionchange", !1, e));
    }
  }
  function og(t, e, a, s) {
    switch (Vg(e)) {
      case 2:
        var r = VS;
        break;
      case 8:
        r = LS;
        break;
      default:
        r = Ju;
    }
    (a = r.bind(null, e, a, t)),
      (r = void 0),
      !ec ||
        (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
        (r = !0),
      s
        ? r !== void 0
          ? t.addEventListener(e, a, { capture: !0, passive: r })
          : t.addEventListener(e, a, !0)
        : r !== void 0
        ? t.addEventListener(e, a, { passive: r })
        : t.addEventListener(e, a, !1);
  }
  function Vu(t, e, a, s, r) {
    var u = s;
    if ((e & 1) === 0 && (e & 2) === 0 && s !== null)
      t: for (;;) {
        if (s === null) return;
        var y = s.tag;
        if (y === 3 || y === 4) {
          var b = s.stateNode.containerInfo;
          if (b === r) break;
          if (y === 4)
            for (y = s.return; y !== null; ) {
              var w = y.tag;
              if ((w === 3 || w === 4) && y.stateNode.containerInfo === r)
                return;
              y = y.return;
            }
          for (; b !== null; ) {
            if (((y = wi(b)), y === null)) return;
            if (((w = y.tag), w === 5 || w === 6 || w === 26 || w === 27)) {
              s = u = y;
              continue t;
            }
            b = b.parentNode;
          }
        }
        s = s.return;
      }
    dm(function () {
      var H = u,
        k = Wr(a),
        P = [];
      t: {
        var V = km.get(t);
        if (V !== void 0) {
          var L = eo,
            tt = t;
          switch (t) {
            case "keypress":
              if (Wl(a) === 0) break t;
            case "keydown":
            case "keyup":
              L = e1;
              break;
            case "focusin":
              (tt = "focus"), (L = sc);
              break;
            case "focusout":
              (tt = "blur"), (L = sc);
              break;
            case "beforeblur":
            case "afterblur":
              L = sc;
              break;
            case "click":
              if (a.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              L = pm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              L = qb;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              L = i1;
              break;
            case Vm:
            case Lm:
            case Bm:
              L = Pb;
              break;
            case Um:
              L = l1;
              break;
            case "scroll":
            case "scrollend":
              L = Fb;
              break;
            case "wheel":
              L = r1;
              break;
            case "copy":
            case "cut":
            case "paste":
              L = Zb;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              L = ym;
              break;
            case "toggle":
            case "beforetoggle":
              L = u1;
          }
          var ut = (e & 4) !== 0,
            Bt = !ut && (t === "scroll" || t === "scrollend"),
            M = ut ? (V !== null ? V + "Capture" : null) : V;
          ut = [];
          for (var N = H, j; N !== null; ) {
            var G = N;
            if (
              ((j = G.stateNode),
              (G = G.tag),
              (G !== 5 && G !== 26 && G !== 27) ||
                j === null ||
                M === null ||
                ((G = Hs(N, M)), G != null && ut.push(dl(N, G, j))),
              Bt)
            )
              break;
            N = N.return;
          }
          0 < ut.length &&
            ((V = new L(V, tt, null, a, k)),
            P.push({ event: V, listeners: ut }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((V = t === "mouseover" || t === "pointerover"),
            (L = t === "mouseout" || t === "pointerout"),
            V &&
              a !== Ir &&
              (tt = a.relatedTarget || a.fromElement) &&
              (wi(tt) || tt[Ai]))
          )
            break t;
          if (
            (L || V) &&
            ((V =
              k.window === k
                ? k
                : (V = k.ownerDocument)
                ? V.defaultView || V.parentWindow
                : window),
            L
              ? ((tt = a.relatedTarget || a.toElement),
                (L = H),
                (tt = tt ? wi(tt) : null),
                tt !== null &&
                  ((Bt = f(tt)),
                  (ut = tt.tag),
                  tt !== Bt || (ut !== 5 && ut !== 27 && ut !== 6)) &&
                  (tt = null))
              : ((L = null), (tt = H)),
            L !== tt)
          ) {
            if (
              ((ut = pm),
              (G = "onMouseLeave"),
              (M = "onMouseEnter"),
              (N = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((ut = ym),
                (G = "onPointerLeave"),
                (M = "onPointerEnter"),
                (N = "pointer")),
              (Bt = L == null ? V : js(L)),
              (j = tt == null ? V : js(tt)),
              (V = new ut(G, N + "leave", L, a, k)),
              (V.target = Bt),
              (V.relatedTarget = j),
              (G = null),
              wi(k) === H &&
                ((ut = new ut(M, N + "enter", tt, a, k)),
                (ut.target = j),
                (ut.relatedTarget = Bt),
                (G = ut)),
              (Bt = G),
              L && tt)
            )
              e: {
                for (ut = cS, M = L, N = tt, j = 0, G = M; G; G = ut(G)) j++;
                G = 0;
                for (var ct = N; ct; ct = ut(ct)) G++;
                for (; 0 < j - G; ) (M = ut(M)), j--;
                for (; 0 < G - j; ) (N = ut(N)), G--;
                for (; j--; ) {
                  if (M === N || (N !== null && M === N.alternate)) {
                    ut = M;
                    break e;
                  }
                  (M = ut(M)), (N = ut(N));
                }
                ut = null;
              }
            else ut = null;
            L !== null && rg(P, V, L, ut, !1),
              tt !== null && Bt !== null && rg(P, Bt, tt, ut, !0);
          }
        }
        t: {
          if (
            ((V = H ? js(H) : window),
            (L = V.nodeName && V.nodeName.toLowerCase()),
            L === "select" || (L === "input" && V.type === "file"))
          )
            var Ot = Tm;
          else if (wm(V))
            if (Nm) Ot = b1;
            else {
              Ot = v1;
              var st = y1;
            }
          else
            (L = V.nodeName),
              !L ||
              L.toLowerCase() !== "input" ||
              (V.type !== "checkbox" && V.type !== "radio")
                ? H && $r(H.elementType) && (Ot = Tm)
                : (Ot = x1);
          if (Ot && (Ot = Ot(t, H))) {
            Em(P, Ot, a, k);
            break t;
          }
          st && st(t, V, H),
            t === "focusout" &&
              H &&
              V.type === "number" &&
              H.memoizedProps.value != null &&
              Jr(V, "number", V.value);
        }
        switch (((st = H ? js(H) : window), t)) {
          case "focusin":
            (wm(st) || st.contentEditable === "true") &&
              ((ji = st), (fc = H), (Fs = null));
            break;
          case "focusout":
            Fs = fc = ji = null;
            break;
          case "mousedown":
            dc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (dc = !1), _m(P, a, k);
            break;
          case "selectionchange":
            if (A1) break;
          case "keydown":
          case "keyup":
            _m(P, a, k);
        }
        var St;
        if (oc)
          t: {
            switch (t) {
              case "compositionstart":
                var Dt = "onCompositionStart";
                break t;
              case "compositionend":
                Dt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Dt = "onCompositionUpdate";
                break t;
            }
            Dt = void 0;
          }
        else
          Ri
            ? Sm(t, a) && (Dt = "onCompositionEnd")
            : t === "keydown" &&
              a.keyCode === 229 &&
              (Dt = "onCompositionStart");
        Dt &&
          (vm &&
            a.locale !== "ko" &&
            (Ri || Dt !== "onCompositionStart"
              ? Dt === "onCompositionEnd" && Ri && (St = mm())
              : ((ca = k),
                (nc = "value" in ca ? ca.value : ca.textContent),
                (Ri = !0))),
          (st = Po(H, Dt)),
          0 < st.length &&
            ((Dt = new gm(Dt, t, null, a, k)),
            P.push({ event: Dt, listeners: st }),
            St
              ? (Dt.data = St)
              : ((St = Am(a)), St !== null && (Dt.data = St)))),
          (St = d1 ? m1(t, a) : h1(t, a)) &&
            ((Dt = Po(H, "onBeforeInput")),
            0 < Dt.length &&
              ((st = new gm("onBeforeInput", "beforeinput", null, a, k)),
              P.push({ event: st, listeners: Dt }),
              (st.data = St))),
          sS(P, t, H, a, k);
      }
      lg(P, e);
    });
  }
  function dl(t, e, a) {
    return { instance: t, listener: e, currentTarget: a };
  }
  function Po(t, e) {
    for (var a = e + "Capture", s = []; t !== null; ) {
      var r = t,
        u = r.stateNode;
      if (
        ((r = r.tag),
        (r !== 5 && r !== 26 && r !== 27) ||
          u === null ||
          ((r = Hs(t, a)),
          r != null && s.unshift(dl(t, r, u)),
          (r = Hs(t, e)),
          r != null && s.push(dl(t, r, u))),
        t.tag === 3)
      )
        return s;
      t = t.return;
    }
    return [];
  }
  function cS(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function rg(t, e, a, s, r) {
    for (var u = e._reactName, y = []; a !== null && a !== s; ) {
      var b = a,
        w = b.alternate,
        H = b.stateNode;
      if (((b = b.tag), w !== null && w === s)) break;
      (b !== 5 && b !== 26 && b !== 27) ||
        H === null ||
        ((w = H),
        r
          ? ((H = Hs(a, u)), H != null && y.unshift(dl(a, H, w)))
          : r || ((H = Hs(a, u)), H != null && y.push(dl(a, H, w)))),
        (a = a.return);
    }
    y.length !== 0 && t.push({ event: e, listeners: y });
  }
  var uS = /\r\n?/g,
    fS = /\u0000|\uFFFD/g;
  function cg(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        uS,
        `
`
      )
      .replace(fS, "");
  }
  function ug(t, e) {
    return (e = cg(e)), cg(t) === e;
  }
  function Lt(t, e, a, s, r, u) {
    switch (a) {
      case "children":
        typeof s == "string"
          ? e === "body" || (e === "textarea" && s === "") || Ci(t, s)
          : (typeof s == "number" || typeof s == "bigint") &&
            e !== "body" &&
            Ci(t, "" + s);
        break;
      case "className":
        Ql(t, "class", s);
        break;
      case "tabIndex":
        Ql(t, "tabindex", s);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ql(t, a, s);
        break;
      case "style":
        um(t, s, u);
        break;
      case "data":
        if (e !== "object") {
          Ql(t, "data", s);
          break;
        }
      case "src":
      case "href":
        if (s === "" && (e !== "a" || a !== "href")) {
          t.removeAttribute(a);
          break;
        }
        if (
          s == null ||
          typeof s == "function" ||
          typeof s == "symbol" ||
          typeof s == "boolean"
        ) {
          t.removeAttribute(a);
          break;
        }
        (s = $l("" + s)), t.setAttribute(a, s);
        break;
      case "action":
      case "formAction":
        if (typeof s == "function") {
          t.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" &&
            (a === "formAction"
              ? (e !== "input" && Lt(t, e, "name", r.name, r, null),
                Lt(t, e, "formEncType", r.formEncType, r, null),
                Lt(t, e, "formMethod", r.formMethod, r, null),
                Lt(t, e, "formTarget", r.formTarget, r, null))
              : (Lt(t, e, "encType", r.encType, r, null),
                Lt(t, e, "method", r.method, r, null),
                Lt(t, e, "target", r.target, r, null)));
        if (s == null || typeof s == "symbol" || typeof s == "boolean") {
          t.removeAttribute(a);
          break;
        }
        (s = $l("" + s)), t.setAttribute(a, s);
        break;
      case "onClick":
        s != null && (t.onclick = Vn);
        break;
      case "onScroll":
        s != null && Tt("scroll", t);
        break;
      case "onScrollEnd":
        s != null && Tt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s)) throw Error(o(61));
          if (((a = s.__html), a != null)) {
            if (r.children != null) throw Error(o(60));
            t.innerHTML = a;
          }
        }
        break;
      case "multiple":
        t.multiple = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "muted":
        t.muted = s && typeof s != "function" && typeof s != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          s == null ||
          typeof s == "function" ||
          typeof s == "boolean" ||
          typeof s == "symbol"
        ) {
          t.removeAttribute("xlink:href");
          break;
        }
        (a = $l("" + s)),
          t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        s != null && typeof s != "function" && typeof s != "symbol"
          ? t.setAttribute(a, "" + s)
          : t.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        s && typeof s != "function" && typeof s != "symbol"
          ? t.setAttribute(a, "")
          : t.removeAttribute(a);
        break;
      case "capture":
      case "download":
        s === !0
          ? t.setAttribute(a, "")
          : s !== !1 &&
            s != null &&
            typeof s != "function" &&
            typeof s != "symbol"
          ? t.setAttribute(a, s)
          : t.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        s != null &&
        typeof s != "function" &&
        typeof s != "symbol" &&
        !isNaN(s) &&
        1 <= s
          ? t.setAttribute(a, s)
          : t.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        s == null || typeof s == "function" || typeof s == "symbol" || isNaN(s)
          ? t.removeAttribute(a)
          : t.setAttribute(a, s);
        break;
      case "popover":
        Tt("beforetoggle", t), Tt("toggle", t), Zl(t, "popover", s);
        break;
      case "xlinkActuate":
        zn(t, "http://www.w3.org/1999/xlink", "xlink:actuate", s);
        break;
      case "xlinkArcrole":
        zn(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", s);
        break;
      case "xlinkRole":
        zn(t, "http://www.w3.org/1999/xlink", "xlink:role", s);
        break;
      case "xlinkShow":
        zn(t, "http://www.w3.org/1999/xlink", "xlink:show", s);
        break;
      case "xlinkTitle":
        zn(t, "http://www.w3.org/1999/xlink", "xlink:title", s);
        break;
      case "xlinkType":
        zn(t, "http://www.w3.org/1999/xlink", "xlink:type", s);
        break;
      case "xmlBase":
        zn(t, "http://www.w3.org/XML/1998/namespace", "xml:base", s);
        break;
      case "xmlLang":
        zn(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", s);
        break;
      case "xmlSpace":
        zn(t, "http://www.w3.org/XML/1998/namespace", "xml:space", s);
        break;
      case "is":
        Zl(t, "is", s);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== "o" && a[0] !== "O") ||
          (a[1] !== "n" && a[1] !== "N")) &&
          ((a = Ub.get(a) || a), Zl(t, a, s));
    }
  }
  function Lu(t, e, a, s, r, u) {
    switch (a) {
      case "style":
        um(t, s, u);
        break;
      case "dangerouslySetInnerHTML":
        if (s != null) {
          if (typeof s != "object" || !("__html" in s)) throw Error(o(61));
          if (((a = s.__html), a != null)) {
            if (r.children != null) throw Error(o(60));
            t.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof s == "string"
          ? Ci(t, s)
          : (typeof s == "number" || typeof s == "bigint") && Ci(t, "" + s);
        break;
      case "onScroll":
        s != null && Tt("scroll", t);
        break;
      case "onScrollEnd":
        s != null && Tt("scrollend", t);
        break;
      case "onClick":
        s != null && (t.onclick = Vn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!em.hasOwnProperty(a))
          t: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((r = a.endsWith("Capture")),
              (e = a.slice(2, r ? a.length - 7 : void 0)),
              (u = t[Re] || null),
              (u = u != null ? u[a] : null),
              typeof u == "function" && t.removeEventListener(e, u, r),
              typeof s == "function")
            ) {
              typeof u != "function" &&
                u !== null &&
                (a in t
                  ? (t[a] = null)
                  : t.hasAttribute(a) && t.removeAttribute(a)),
                t.addEventListener(e, s, r);
              break t;
            }
            a in t
              ? (t[a] = s)
              : s === !0
              ? t.setAttribute(a, "")
              : Zl(t, a, s);
          }
    }
  }
  function ge(t, e, a) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Tt("error", t), Tt("load", t);
        var s = !1,
          r = !1,
          u;
        for (u in a)
          if (a.hasOwnProperty(u)) {
            var y = a[u];
            if (y != null)
              switch (u) {
                case "src":
                  s = !0;
                  break;
                case "srcSet":
                  r = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, e));
                default:
                  Lt(t, e, u, y, a, null);
              }
          }
        r && Lt(t, e, "srcSet", a.srcSet, a, null),
          s && Lt(t, e, "src", a.src, a, null);
        return;
      case "input":
        Tt("invalid", t);
        var b = (u = y = r = null),
          w = null,
          H = null;
        for (s in a)
          if (a.hasOwnProperty(s)) {
            var k = a[s];
            if (k != null)
              switch (s) {
                case "name":
                  r = k;
                  break;
                case "type":
                  y = k;
                  break;
                case "checked":
                  w = k;
                  break;
                case "defaultChecked":
                  H = k;
                  break;
                case "value":
                  u = k;
                  break;
                case "defaultValue":
                  b = k;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (k != null) throw Error(o(137, e));
                  break;
                default:
                  Lt(t, e, s, k, a, null);
              }
          }
        lm(t, u, b, w, H, y, r, !1);
        return;
      case "select":
        Tt("invalid", t), (s = y = u = null);
        for (r in a)
          if (a.hasOwnProperty(r) && ((b = a[r]), b != null))
            switch (r) {
              case "value":
                u = b;
                break;
              case "defaultValue":
                y = b;
                break;
              case "multiple":
                s = b;
              default:
                Lt(t, e, r, b, a, null);
            }
        (e = u),
          (a = y),
          (t.multiple = !!s),
          e != null ? Di(t, !!s, e, !1) : a != null && Di(t, !!s, a, !0);
        return;
      case "textarea":
        Tt("invalid", t), (u = r = s = null);
        for (y in a)
          if (a.hasOwnProperty(y) && ((b = a[y]), b != null))
            switch (y) {
              case "value":
                s = b;
                break;
              case "defaultValue":
                r = b;
                break;
              case "children":
                u = b;
                break;
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(o(91));
                break;
              default:
                Lt(t, e, y, b, a, null);
            }
        rm(t, s, r, u);
        return;
      case "option":
        for (w in a)
          if (a.hasOwnProperty(w) && ((s = a[w]), s != null))
            switch (w) {
              case "selected":
                t.selected =
                  s && typeof s != "function" && typeof s != "symbol";
                break;
              default:
                Lt(t, e, w, s, a, null);
            }
        return;
      case "dialog":
        Tt("beforetoggle", t), Tt("toggle", t), Tt("cancel", t), Tt("close", t);
        break;
      case "iframe":
      case "object":
        Tt("load", t);
        break;
      case "video":
      case "audio":
        for (s = 0; s < fl.length; s++) Tt(fl[s], t);
        break;
      case "image":
        Tt("error", t), Tt("load", t);
        break;
      case "details":
        Tt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Tt("error", t), Tt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (H in a)
          if (a.hasOwnProperty(H) && ((s = a[H]), s != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, e));
              default:
                Lt(t, e, H, s, a, null);
            }
        return;
      default:
        if ($r(e)) {
          for (k in a)
            a.hasOwnProperty(k) &&
              ((s = a[k]), s !== void 0 && Lu(t, e, k, s, a, void 0));
          return;
        }
    }
    for (b in a)
      a.hasOwnProperty(b) && ((s = a[b]), s != null && Lt(t, e, b, s, a, null));
  }
  function dS(t, e, a, s) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var r = null,
          u = null,
          y = null,
          b = null,
          w = null,
          H = null,
          k = null;
        for (L in a) {
          var P = a[L];
          if (a.hasOwnProperty(L) && P != null)
            switch (L) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                w = P;
              default:
                s.hasOwnProperty(L) || Lt(t, e, L, null, s, P);
            }
        }
        for (var V in s) {
          var L = s[V];
          if (((P = a[V]), s.hasOwnProperty(V) && (L != null || P != null)))
            switch (V) {
              case "type":
                u = L;
                break;
              case "name":
                r = L;
                break;
              case "checked":
                H = L;
                break;
              case "defaultChecked":
                k = L;
                break;
              case "value":
                y = L;
                break;
              case "defaultValue":
                b = L;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (L != null) throw Error(o(137, e));
                break;
              default:
                L !== P && Lt(t, e, V, L, s, P);
            }
        }
        Qr(t, y, b, w, H, k, u, r);
        return;
      case "select":
        L = y = b = V = null;
        for (u in a)
          if (((w = a[u]), a.hasOwnProperty(u) && w != null))
            switch (u) {
              case "value":
                break;
              case "multiple":
                L = w;
              default:
                s.hasOwnProperty(u) || Lt(t, e, u, null, s, w);
            }
        for (r in s)
          if (
            ((u = s[r]),
            (w = a[r]),
            s.hasOwnProperty(r) && (u != null || w != null))
          )
            switch (r) {
              case "value":
                V = u;
                break;
              case "defaultValue":
                b = u;
                break;
              case "multiple":
                y = u;
              default:
                u !== w && Lt(t, e, r, u, s, w);
            }
        (e = b),
          (a = y),
          (s = L),
          V != null
            ? Di(t, !!a, V, !1)
            : !!s != !!a &&
              (e != null ? Di(t, !!a, e, !0) : Di(t, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        L = V = null;
        for (b in a)
          if (
            ((r = a[b]),
            a.hasOwnProperty(b) && r != null && !s.hasOwnProperty(b))
          )
            switch (b) {
              case "value":
                break;
              case "children":
                break;
              default:
                Lt(t, e, b, null, s, r);
            }
        for (y in s)
          if (
            ((r = s[y]),
            (u = a[y]),
            s.hasOwnProperty(y) && (r != null || u != null))
          )
            switch (y) {
              case "value":
                V = r;
                break;
              case "defaultValue":
                L = r;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(o(91));
                break;
              default:
                r !== u && Lt(t, e, y, r, s, u);
            }
        om(t, V, L);
        return;
      case "option":
        for (var tt in a)
          if (
            ((V = a[tt]),
            a.hasOwnProperty(tt) && V != null && !s.hasOwnProperty(tt))
          )
            switch (tt) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Lt(t, e, tt, null, s, V);
            }
        for (w in s)
          if (
            ((V = s[w]),
            (L = a[w]),
            s.hasOwnProperty(w) && V !== L && (V != null || L != null))
          )
            switch (w) {
              case "selected":
                t.selected =
                  V && typeof V != "function" && typeof V != "symbol";
                break;
              default:
                Lt(t, e, w, V, s, L);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ut in a)
          (V = a[ut]),
            a.hasOwnProperty(ut) &&
              V != null &&
              !s.hasOwnProperty(ut) &&
              Lt(t, e, ut, null, s, V);
        for (H in s)
          if (
            ((V = s[H]),
            (L = a[H]),
            s.hasOwnProperty(H) && V !== L && (V != null || L != null))
          )
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (V != null) throw Error(o(137, e));
                break;
              default:
                Lt(t, e, H, V, s, L);
            }
        return;
      default:
        if ($r(e)) {
          for (var Bt in a)
            (V = a[Bt]),
              a.hasOwnProperty(Bt) &&
                V !== void 0 &&
                !s.hasOwnProperty(Bt) &&
                Lu(t, e, Bt, void 0, s, V);
          for (k in s)
            (V = s[k]),
              (L = a[k]),
              !s.hasOwnProperty(k) ||
                V === L ||
                (V === void 0 && L === void 0) ||
                Lu(t, e, k, V, s, L);
          return;
        }
    }
    for (var M in a)
      (V = a[M]),
        a.hasOwnProperty(M) &&
          V != null &&
          !s.hasOwnProperty(M) &&
          Lt(t, e, M, null, s, V);
    for (P in s)
      (V = s[P]),
        (L = a[P]),
        !s.hasOwnProperty(P) ||
          V === L ||
          (V == null && L == null) ||
          Lt(t, e, P, V, s, L);
  }
  function fg(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function mS() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var t = 0, e = 0, a = performance.getEntriesByType("resource"), s = 0;
        s < a.length;
        s++
      ) {
        var r = a[s],
          u = r.transferSize,
          y = r.initiatorType,
          b = r.duration;
        if (u && b && fg(y)) {
          for (y = 0, b = r.responseEnd, s += 1; s < a.length; s++) {
            var w = a[s],
              H = w.startTime;
            if (H > b) break;
            var k = w.transferSize,
              P = w.initiatorType;
            k &&
              fg(P) &&
              ((w = w.responseEnd), (y += k * (w < b ? 1 : (b - H) / (w - H))));
          }
          if ((--s, (e += (8 * (u + y)) / (r.duration / 1e3)), t++, 10 < t))
            break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection &&
      ((t = navigator.connection.downlink), typeof t == "number")
      ? t
      : 5;
  }
  var Bu = null,
    Uu = null;
  function Ko(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function dg(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function mg(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function ku(t, e) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof e.children == "string" ||
      typeof e.children == "number" ||
      typeof e.children == "bigint" ||
      (typeof e.dangerouslySetInnerHTML == "object" &&
        e.dangerouslySetInnerHTML !== null &&
        e.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Fu = null;
  function hS() {
    var t = window.event;
    return t && t.type === "popstate"
      ? t === Fu
        ? !1
        : ((Fu = t), !0)
      : ((Fu = null), !1);
  }
  var hg = typeof setTimeout == "function" ? setTimeout : void 0,
    pS = typeof clearTimeout == "function" ? clearTimeout : void 0,
    pg = typeof Promise == "function" ? Promise : void 0,
    gS =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof pg < "u"
        ? function (t) {
            return pg.resolve(null).then(t).catch(yS);
          }
        : hg;
  function yS(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Na(t) {
    return t === "head";
  }
  function gg(t, e) {
    var a = e,
      s = 0;
    do {
      var r = a.nextSibling;
      if ((t.removeChild(a), r && r.nodeType === 8))
        if (((a = r.data), a === "/$" || a === "/&")) {
          if (s === 0) {
            t.removeChild(r), ss(e);
            return;
          }
          s--;
        } else if (
          a === "$" ||
          a === "$?" ||
          a === "$~" ||
          a === "$!" ||
          a === "&"
        )
          s++;
        else if (a === "html") ml(t.ownerDocument.documentElement);
        else if (a === "head") {
          (a = t.ownerDocument.head), ml(a);
          for (var u = a.firstChild; u; ) {
            var y = u.nextSibling,
              b = u.nodeName;
            u[Rs] ||
              b === "SCRIPT" ||
              b === "STYLE" ||
              (b === "LINK" && u.rel.toLowerCase() === "stylesheet") ||
              a.removeChild(u),
              (u = y);
          }
        } else a === "body" && ml(t.ownerDocument.body);
      a = r;
    } while (a);
    ss(e);
  }
  function yg(t, e) {
    var a = t;
    t = 0;
    do {
      var s = a.nextSibling;
      if (
        (a.nodeType === 1
          ? e
            ? ((a._stashedDisplay = a.style.display),
              (a.style.display = "none"))
            : ((a.style.display = a._stashedDisplay || ""),
              a.getAttribute("style") === "" && a.removeAttribute("style"))
          : a.nodeType === 3 &&
            (e
              ? ((a._stashedText = a.nodeValue), (a.nodeValue = ""))
              : (a.nodeValue = a._stashedText || "")),
        s && s.nodeType === 8)
      )
        if (((a = s.data), a === "/$")) {
          if (t === 0) break;
          t--;
        } else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || t++;
      a = s;
    } while (a);
  }
  function Yu(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var a = e;
      switch (((e = e.nextSibling), a.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Yu(a), Kr(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(a);
    }
  }
  function vS(t, e, a, s) {
    for (; t.nodeType === 1; ) {
      var r = a;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!s && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (s) {
        if (!t[Rs])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((u = t.getAttribute("rel")),
                u === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                u !== r.rel ||
                t.getAttribute("href") !==
                  (r.href == null || r.href === "" ? null : r.href) ||
                t.getAttribute("crossorigin") !==
                  (r.crossOrigin == null ? null : r.crossOrigin) ||
                t.getAttribute("title") !== (r.title == null ? null : r.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((u = t.getAttribute("src")),
                (u !== (r.src == null ? null : r.src) ||
                  t.getAttribute("type") !== (r.type == null ? null : r.type) ||
                  t.getAttribute("crossorigin") !==
                    (r.crossOrigin == null ? null : r.crossOrigin)) &&
                  u &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var u = r.name == null ? null : "" + r.name;
        if (r.type === "hidden" && t.getAttribute("name") === u) return t;
      } else return t;
      if (((t = sn(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function xS(t, e, a) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !a) ||
        ((t = sn(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function vg(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !e) ||
        ((t = sn(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function qu(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Gu(t) {
    return (
      t.data === "$!" ||
      (t.data === "$?" && t.ownerDocument.readyState !== "loading")
    );
  }
  function bS(t, e) {
    var a = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || a.readyState !== "loading") e();
    else {
      var s = function () {
        e(), a.removeEventListener("DOMContentLoaded", s);
      };
      a.addEventListener("DOMContentLoaded", s), (t._reactRetry = s);
    }
  }
  function sn(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (
          ((e = t.data),
          e === "$" ||
            e === "$!" ||
            e === "$?" ||
            e === "$~" ||
            e === "&" ||
            e === "F!" ||
            e === "F")
        )
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Xu = null;
  function xg(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "/$" || a === "/&") {
          if (e === 0) return sn(t.nextSibling);
          e--;
        } else
          (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") ||
            e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function bg(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (e === 0) return t;
          e--;
        } else (a !== "/$" && a !== "/&") || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Sg(t, e, a) {
    switch (((e = Ko(a)), t)) {
      case "html":
        if (((t = e.documentElement), !t)) throw Error(o(452));
        return t;
      case "head":
        if (((t = e.head), !t)) throw Error(o(453));
        return t;
      case "body":
        if (((t = e.body), !t)) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function ml(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    Kr(t);
  }
  var ln = new Map(),
    Ag = new Set();
  function Zo(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
      ? t
      : t.ownerDocument;
  }
  var In = B.d;
  B.d = { f: SS, r: AS, D: wS, C: ES, L: TS, m: NS, X: CS, S: DS, M: MS };
  function SS() {
    var t = In.f(),
      e = Uo();
    return t || e;
  }
  function AS(t) {
    var e = Ei(t);
    e !== null && e.tag === 5 && e.type === "form" ? Uh(e) : In.r(t);
  }
  var ns = typeof document > "u" ? null : document;
  function wg(t, e, a) {
    var s = ns;
    if (s && typeof e == "string" && e) {
      var r = $e(e);
      (r = 'link[rel="' + t + '"][href="' + r + '"]'),
        typeof a == "string" && (r += '[crossorigin="' + a + '"]'),
        Ag.has(r) ||
          (Ag.add(r),
          (t = { rel: t, crossOrigin: a, href: e }),
          s.querySelector(r) === null &&
            ((e = s.createElement("link")),
            ge(e, "link", t),
            oe(e),
            s.head.appendChild(e)));
    }
  }
  function wS(t) {
    In.D(t), wg("dns-prefetch", t, null);
  }
  function ES(t, e) {
    In.C(t, e), wg("preconnect", t, e);
  }
  function TS(t, e, a) {
    In.L(t, e, a);
    var s = ns;
    if (s && t && e) {
      var r = 'link[rel="preload"][as="' + $e(e) + '"]';
      e === "image" && a && a.imageSrcSet
        ? ((r += '[imagesrcset="' + $e(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" &&
            (r += '[imagesizes="' + $e(a.imageSizes) + '"]'))
        : (r += '[href="' + $e(t) + '"]');
      var u = r;
      switch (e) {
        case "style":
          u = as(t);
          break;
        case "script":
          u = is(t);
      }
      ln.has(u) ||
        ((t = g(
          {
            rel: "preload",
            href: e === "image" && a && a.imageSrcSet ? void 0 : t,
            as: e,
          },
          a
        )),
        ln.set(u, t),
        s.querySelector(r) !== null ||
          (e === "style" && s.querySelector(hl(u))) ||
          (e === "script" && s.querySelector(pl(u))) ||
          ((e = s.createElement("link")),
          ge(e, "link", t),
          oe(e),
          s.head.appendChild(e)));
    }
  }
  function NS(t, e) {
    In.m(t, e);
    var a = ns;
    if (a && t) {
      var s = e && typeof e.as == "string" ? e.as : "script",
        r =
          'link[rel="modulepreload"][as="' + $e(s) + '"][href="' + $e(t) + '"]',
        u = r;
      switch (s) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = is(t);
      }
      if (
        !ln.has(u) &&
        ((t = g({ rel: "modulepreload", href: t }, e)),
        ln.set(u, t),
        a.querySelector(r) === null)
      ) {
        switch (s) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(pl(u))) return;
        }
        (s = a.createElement("link")),
          ge(s, "link", t),
          oe(s),
          a.head.appendChild(s);
      }
    }
  }
  function DS(t, e, a) {
    In.S(t, e, a);
    var s = ns;
    if (s && t) {
      var r = Ti(s).hoistableStyles,
        u = as(t);
      e = e || "default";
      var y = r.get(u);
      if (!y) {
        var b = { loading: 0, preload: null };
        if ((y = s.querySelector(hl(u)))) b.loading = 5;
        else {
          (t = g({ rel: "stylesheet", href: t, "data-precedence": e }, a)),
            (a = ln.get(u)) && Pu(t, a);
          var w = (y = s.createElement("link"));
          oe(w),
            ge(w, "link", t),
            (w._p = new Promise(function (H, k) {
              (w.onload = H), (w.onerror = k);
            })),
            w.addEventListener("load", function () {
              b.loading |= 1;
            }),
            w.addEventListener("error", function () {
              b.loading |= 2;
            }),
            (b.loading |= 4),
            Qo(y, e, s);
        }
        (y = { type: "stylesheet", instance: y, count: 1, state: b }),
          r.set(u, y);
      }
    }
  }
  function CS(t, e) {
    In.X(t, e);
    var a = ns;
    if (a && t) {
      var s = Ti(a).hoistableScripts,
        r = is(t),
        u = s.get(r);
      u ||
        ((u = a.querySelector(pl(r))),
        u ||
          ((t = g({ src: t, async: !0 }, e)),
          (e = ln.get(r)) && Ku(t, e),
          (u = a.createElement("script")),
          oe(u),
          ge(u, "link", t),
          a.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        s.set(r, u));
    }
  }
  function MS(t, e) {
    In.M(t, e);
    var a = ns;
    if (a && t) {
      var s = Ti(a).hoistableScripts,
        r = is(t),
        u = s.get(r);
      u ||
        ((u = a.querySelector(pl(r))),
        u ||
          ((t = g({ src: t, async: !0, type: "module" }, e)),
          (e = ln.get(r)) && Ku(t, e),
          (u = a.createElement("script")),
          oe(u),
          ge(u, "link", t),
          a.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        s.set(r, u));
    }
  }
  function Eg(t, e, a, s) {
    var r = (r = rt.current) ? Zo(r) : null;
    if (!r) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((e = as(a.href)),
            (a = Ti(r).hoistableStyles),
            (s = a.get(e)),
            s ||
              ((s = { type: "style", instance: null, count: 0, state: null }),
              a.set(e, s)),
            s)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          a.rel === "stylesheet" &&
          typeof a.href == "string" &&
          typeof a.precedence == "string"
        ) {
          t = as(a.href);
          var u = Ti(r).hoistableStyles,
            y = u.get(t);
          if (
            (y ||
              ((r = r.ownerDocument || r),
              (y = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(t, y),
              (u = r.querySelector(hl(t))) &&
                !u._p &&
                ((y.instance = u), (y.state.loading = 5)),
              ln.has(t) ||
                ((a = {
                  rel: "preload",
                  as: "style",
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                ln.set(t, a),
                u || OS(r, t, a, y.state))),
            e && s === null)
          )
            throw Error(o(528, ""));
          return y;
        }
        if (e && s !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return (
          (e = a.async),
          (a = a.src),
          typeof a == "string" &&
          e &&
          typeof e != "function" &&
          typeof e != "symbol"
            ? ((e = is(a)),
              (a = Ti(r).hoistableScripts),
              (s = a.get(e)),
              s ||
                ((s = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(e, s)),
              s)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, t));
    }
  }
  function as(t) {
    return 'href="' + $e(t) + '"';
  }
  function hl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Tg(t) {
    return g({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function OS(t, e, a, s) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]")
      ? (s.loading = 1)
      : ((e = t.createElement("link")),
        (s.preload = e),
        e.addEventListener("load", function () {
          return (s.loading |= 1);
        }),
        e.addEventListener("error", function () {
          return (s.loading |= 2);
        }),
        ge(e, "link", a),
        oe(e),
        t.head.appendChild(e));
  }
  function is(t) {
    return '[src="' + $e(t) + '"]';
  }
  function pl(t) {
    return "script[async]" + t;
  }
  function Ng(t, e, a) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case "style":
          var s = t.querySelector('style[data-href~="' + $e(a.href) + '"]');
          if (s) return (e.instance = s), oe(s), s;
          var r = g({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (s = (t.ownerDocument || t).createElement("style")),
            oe(s),
            ge(s, "style", r),
            Qo(s, a.precedence, t),
            (e.instance = s)
          );
        case "stylesheet":
          r = as(a.href);
          var u = t.querySelector(hl(r));
          if (u) return (e.state.loading |= 4), (e.instance = u), oe(u), u;
          (s = Tg(a)),
            (r = ln.get(r)) && Pu(s, r),
            (u = (t.ownerDocument || t).createElement("link")),
            oe(u);
          var y = u;
          return (
            (y._p = new Promise(function (b, w) {
              (y.onload = b), (y.onerror = w);
            })),
            ge(u, "link", s),
            (e.state.loading |= 4),
            Qo(u, a.precedence, t),
            (e.instance = u)
          );
        case "script":
          return (
            (u = is(a.src)),
            (r = t.querySelector(pl(u)))
              ? ((e.instance = r), oe(r), r)
              : ((s = a),
                (r = ln.get(u)) && ((s = g({}, a)), Ku(s, r)),
                (t = t.ownerDocument || t),
                (r = t.createElement("script")),
                oe(r),
                ge(r, "link", s),
                t.head.appendChild(r),
                (e.instance = r))
          );
        case "void":
          return null;
        default:
          throw Error(o(443, e.type));
      }
    else
      e.type === "stylesheet" &&
        (e.state.loading & 4) === 0 &&
        ((s = e.instance), (e.state.loading |= 4), Qo(s, a.precedence, t));
    return e.instance;
  }
  function Qo(t, e, a) {
    for (
      var s = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        r = s.length ? s[s.length - 1] : null,
        u = r,
        y = 0;
      y < s.length;
      y++
    ) {
      var b = s[y];
      if (b.dataset.precedence === e) u = b;
      else if (u !== r) break;
    }
    u
      ? u.parentNode.insertBefore(t, u.nextSibling)
      : ((e = a.nodeType === 9 ? a.head : a), e.insertBefore(t, e.firstChild));
  }
  function Pu(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title);
  }
  function Ku(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity);
  }
  var Jo = null;
  function Dg(t, e, a) {
    if (Jo === null) {
      var s = new Map(),
        r = (Jo = new Map());
      r.set(a, s);
    } else (r = Jo), (s = r.get(a)), s || ((s = new Map()), r.set(a, s));
    if (s.has(t)) return s;
    for (
      s.set(t, null), a = a.getElementsByTagName(t), r = 0;
      r < a.length;
      r++
    ) {
      var u = a[r];
      if (
        !(
          u[Rs] ||
          u[de] ||
          (t === "link" && u.getAttribute("rel") === "stylesheet")
        ) &&
        u.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var y = u.getAttribute(e) || "";
        y = t + y;
        var b = s.get(y);
        b ? b.push(u) : s.set(y, [u]);
      }
    }
    return s;
  }
  function Cg(t, e, a) {
    (t = t.ownerDocument || t),
      t.head.insertBefore(
        a,
        e === "title" ? t.querySelector("head > title") : null
      );
  }
  function RS(t, e, a) {
    if (a === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof e.precedence != "string" ||
          typeof e.href != "string" ||
          e.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof e.rel != "string" ||
          typeof e.href != "string" ||
          e.href === "" ||
          e.onLoad ||
          e.onError
        )
          break;
        switch (e.rel) {
          case "stylesheet":
            return (
              (t = e.disabled), typeof e.precedence == "string" && t == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          e.async &&
          typeof e.async != "function" &&
          typeof e.async != "symbol" &&
          !e.onLoad &&
          !e.onError &&
          e.src &&
          typeof e.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function Mg(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function jS(t, e, a, s) {
    if (
      a.type === "stylesheet" &&
      (typeof s.media != "string" || matchMedia(s.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var r = as(s.href),
          u = e.querySelector(hl(r));
        if (u) {
          (e = u._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (t.count++, (t = $o.bind(t)), e.then(t, t)),
            (a.state.loading |= 4),
            (a.instance = u),
            oe(u);
          return;
        }
        (u = e.ownerDocument || e),
          (s = Tg(s)),
          (r = ln.get(r)) && Pu(s, r),
          (u = u.createElement("link")),
          oe(u);
        var y = u;
        (y._p = new Promise(function (b, w) {
          (y.onload = b), (y.onerror = w);
        })),
          ge(u, "link", s),
          (a.instance = u);
      }
      t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(a, e),
        (e = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (t.count++,
          (a = $o.bind(t)),
          e.addEventListener("load", a),
          e.addEventListener("error", a));
    }
  }
  var Zu = 0;
  function HS(t, e) {
    return (
      t.stylesheets && t.count === 0 && Wo(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (a) {
            var s = setTimeout(function () {
              if ((t.stylesheets && Wo(t, t.stylesheets), t.unsuspend)) {
                var u = t.unsuspend;
                (t.unsuspend = null), u();
              }
            }, 6e4 + e);
            0 < t.imgBytes && Zu === 0 && (Zu = 62500 * mS());
            var r = setTimeout(function () {
              if (
                ((t.waitingForImages = !1),
                t.count === 0 &&
                  (t.stylesheets && Wo(t, t.stylesheets), t.unsuspend))
              ) {
                var u = t.unsuspend;
                (t.unsuspend = null), u();
              }
            }, (t.imgBytes > Zu ? 50 : 800) + e);
            return (
              (t.unsuspend = a),
              function () {
                (t.unsuspend = null), clearTimeout(s), clearTimeout(r);
              }
            );
          }
        : null
    );
  }
  function $o() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) Wo(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        (this.unsuspend = null), t();
      }
    }
  }
  var Io = null;
  function Wo(t, e) {
    (t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++,
        (Io = new Map()),
        e.forEach(_S, t),
        (Io = null),
        $o.call(t));
  }
  function _S(t, e) {
    if (!(e.state.loading & 4)) {
      var a = Io.get(t);
      if (a) var s = a.get(null);
      else {
        (a = new Map()), Io.set(t, a);
        for (
          var r = t.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            u = 0;
          u < r.length;
          u++
        ) {
          var y = r[u];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") &&
            (a.set(y.dataset.precedence, y), (s = y));
        }
        s && a.set(null, s);
      }
      (r = e.instance),
        (y = r.getAttribute("data-precedence")),
        (u = a.get(y) || s),
        u === s && a.set(null, r),
        a.set(y, r),
        this.count++,
        (s = $o.bind(this)),
        r.addEventListener("load", s),
        r.addEventListener("error", s),
        u
          ? u.parentNode.insertBefore(r, u.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t),
            t.insertBefore(r, t.firstChild)),
        (e.state.loading |= 4);
    }
  }
  var gl = {
    $$typeof: U,
    Provider: null,
    Consumer: null,
    _currentValue: z,
    _currentValue2: z,
    _threadCount: 0,
  };
  function zS(t, e, a, s, r, u, y, b, w) {
    (this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = oa(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = oa(0)),
      (this.hiddenUpdates = oa(null)),
      (this.identifierPrefix = s),
      (this.onUncaughtError = r),
      (this.onCaughtError = u),
      (this.onRecoverableError = y),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = w),
      (this.incompleteTransitions = new Map());
  }
  function Og(t, e, a, s, r, u, y, b, w, H, k, P) {
    return (
      (t = new zS(t, e, a, y, w, H, k, P, b)),
      (e = 1),
      u === !0 && (e |= 24),
      (u = Ye(3, null, null, e)),
      (t.current = u),
      (u.stateNode = t),
      (e = Dc()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (u.memoizedState = { element: s, isDehydrated: a, cache: e }),
      Rc(u),
      t
    );
  }
  function Rg(t) {
    return t ? ((t = zi), t) : zi;
  }
  function jg(t, e, a, s, r, u) {
    (r = Rg(r)),
      s.context === null ? (s.context = r) : (s.pendingContext = r),
      (s = pa(e)),
      (s.payload = { element: a }),
      (u = u === void 0 ? null : u),
      u !== null && (s.callback = u),
      (a = ga(t, s, e)),
      a !== null && (Le(a, t, e), Zs(a, t, e));
  }
  function Hg(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < e ? a : e;
    }
  }
  function Qu(t, e) {
    Hg(t, e), (t = t.alternate) && Hg(t, e);
  }
  function _g(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Qa(t, 67108864);
      e !== null && Le(e, t, 67108864), Qu(t, 67108864);
    }
  }
  function zg(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ke();
      e = Si(e);
      var a = Qa(t, e);
      a !== null && Le(a, t, e), Qu(t, e);
    }
  }
  var tr = !0;
  function VS(t, e, a, s) {
    var r = C.T;
    C.T = null;
    var u = B.p;
    try {
      (B.p = 2), Ju(t, e, a, s);
    } finally {
      (B.p = u), (C.T = r);
    }
  }
  function LS(t, e, a, s) {
    var r = C.T;
    C.T = null;
    var u = B.p;
    try {
      (B.p = 8), Ju(t, e, a, s);
    } finally {
      (B.p = u), (C.T = r);
    }
  }
  function Ju(t, e, a, s) {
    if (tr) {
      var r = $u(s);
      if (r === null) Vu(t, e, s, er, a), Lg(t, s);
      else if (US(r, t, e, a, s)) s.stopPropagation();
      else if ((Lg(t, s), e & 4 && -1 < BS.indexOf(t))) {
        for (; r !== null; ) {
          var u = Ei(r);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var y = Sn(u.pendingLanes);
                  if (y !== 0) {
                    var b = u;
                    for (b.pendingLanes |= 2, b.entangledLanes |= 2; y; ) {
                      var w = 1 << (31 - ve(y));
                      (b.entanglements[1] |= w), (y &= ~w);
                    }
                    Tn(u), (jt & 6) === 0 && ((Lo = Ee() + 500), ul(0));
                  }
                }
                break;
              case 31:
              case 13:
                (b = Qa(u, 2)), b !== null && Le(b, u, 2), Uo(), Qu(u, 2);
            }
          if (((u = $u(s)), u === null && Vu(t, e, s, er, a), u === r)) break;
          r = u;
        }
        r !== null && s.stopPropagation();
      } else Vu(t, e, s, null, a);
    }
  }
  function $u(t) {
    return (t = Wr(t)), Iu(t);
  }
  var er = null;
  function Iu(t) {
    if (((er = null), (t = wi(t)), t !== null)) {
      var e = f(t);
      if (e === null) t = null;
      else {
        var a = e.tag;
        if (a === 13) {
          if (((t = d(e)), t !== null)) return t;
          t = null;
        } else if (a === 31) {
          if (((t = p(e)), t !== null)) return t;
          t = null;
        } else if (a === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return (er = t), null;
  }
  function Vg(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (qr()) {
          case ka:
            return 2;
          case Pl:
            return 8;
          case Fa:
          case Ms:
            return 32;
          case _n:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Wu = !1,
    Da = null,
    Ca = null,
    Ma = null,
    yl = new Map(),
    vl = new Map(),
    Oa = [],
    BS =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function Lg(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Da = null;
        break;
      case "dragenter":
      case "dragleave":
        Ca = null;
        break;
      case "mouseover":
      case "mouseout":
        Ma = null;
        break;
      case "pointerover":
      case "pointerout":
        yl.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        vl.delete(e.pointerId);
    }
  }
  function xl(t, e, a, s, r, u) {
    return t === null || t.nativeEvent !== u
      ? ((t = {
          blockedOn: e,
          domEventName: a,
          eventSystemFlags: s,
          nativeEvent: u,
          targetContainers: [r],
        }),
        e !== null && ((e = Ei(e)), e !== null && _g(e)),
        t)
      : ((t.eventSystemFlags |= s),
        (e = t.targetContainers),
        r !== null && e.indexOf(r) === -1 && e.push(r),
        t);
  }
  function US(t, e, a, s, r) {
    switch (e) {
      case "focusin":
        return (Da = xl(Da, t, e, a, s, r)), !0;
      case "dragenter":
        return (Ca = xl(Ca, t, e, a, s, r)), !0;
      case "mouseover":
        return (Ma = xl(Ma, t, e, a, s, r)), !0;
      case "pointerover":
        var u = r.pointerId;
        return yl.set(u, xl(yl.get(u) || null, t, e, a, s, r)), !0;
      case "gotpointercapture":
        return (
          (u = r.pointerId), vl.set(u, xl(vl.get(u) || null, t, e, a, s, r)), !0
        );
    }
    return !1;
  }
  function Bg(t) {
    var e = wi(t.target);
    if (e !== null) {
      var a = f(e);
      if (a !== null) {
        if (((e = a.tag), e === 13)) {
          if (((e = d(a)), e !== null)) {
            (t.blockedOn = e),
              Id(t.priority, function () {
                zg(a);
              });
            return;
          }
        } else if (e === 31) {
          if (((e = p(a)), e !== null)) {
            (t.blockedOn = e),
              Id(t.priority, function () {
                zg(a);
              });
            return;
          }
        } else if (e === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function nr(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var a = $u(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var s = new a.constructor(a.type, a);
        (Ir = s), a.target.dispatchEvent(s), (Ir = null);
      } else return (e = Ei(a)), e !== null && _g(e), (t.blockedOn = a), !1;
      e.shift();
    }
    return !0;
  }
  function Ug(t, e, a) {
    nr(t) && a.delete(e);
  }
  function kS() {
    (Wu = !1),
      Da !== null && nr(Da) && (Da = null),
      Ca !== null && nr(Ca) && (Ca = null),
      Ma !== null && nr(Ma) && (Ma = null),
      yl.forEach(Ug),
      vl.forEach(Ug);
  }
  function ar(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      Wu ||
        ((Wu = !0),
        n.unstable_scheduleCallback(n.unstable_NormalPriority, kS)));
  }
  var ir = null;
  function kg(t) {
    ir !== t &&
      ((ir = t),
      n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
        ir === t && (ir = null);
        for (var e = 0; e < t.length; e += 3) {
          var a = t[e],
            s = t[e + 1],
            r = t[e + 2];
          if (typeof s != "function") {
            if (Iu(s || a) === null) continue;
            break;
          }
          var u = Ei(a);
          u !== null &&
            (t.splice(e, 3),
            (e -= 3),
            $c(u, { pending: !0, data: r, method: a.method, action: s }, s, r));
        }
      }));
  }
  function ss(t) {
    function e(w) {
      return ar(w, t);
    }
    Da !== null && ar(Da, t),
      Ca !== null && ar(Ca, t),
      Ma !== null && ar(Ma, t),
      yl.forEach(e),
      vl.forEach(e);
    for (var a = 0; a < Oa.length; a++) {
      var s = Oa[a];
      s.blockedOn === t && (s.blockedOn = null);
    }
    for (; 0 < Oa.length && ((a = Oa[0]), a.blockedOn === null); )
      Bg(a), a.blockedOn === null && Oa.shift();
    if (((a = (t.ownerDocument || t).$$reactFormReplay), a != null))
      for (s = 0; s < a.length; s += 3) {
        var r = a[s],
          u = a[s + 1],
          y = r[Re] || null;
        if (typeof u == "function") y || kg(a);
        else if (y) {
          var b = null;
          if (u && u.hasAttribute("formAction")) {
            if (((r = u), (y = u[Re] || null))) b = y.formAction;
            else if (Iu(r) !== null) continue;
          } else b = y.action;
          typeof b == "function" ? (a[s + 1] = b) : (a.splice(s, 3), (s -= 3)),
            kg(a);
        }
      }
  }
  function Fg() {
    function t(u) {
      u.canIntercept &&
        u.info === "react-transition" &&
        u.intercept({
          handler: function () {
            return new Promise(function (y) {
              return (r = y);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function e() {
      r !== null && (r(), (r = null)), s || setTimeout(a, 20);
    }
    function a() {
      if (!s && !navigation.transition) {
        var u = navigation.currentEntry;
        u &&
          u.url != null &&
          navigation.navigate(u.url, {
            state: u.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var s = !1,
        r = null;
      return (
        navigation.addEventListener("navigate", t),
        navigation.addEventListener("navigatesuccess", e),
        navigation.addEventListener("navigateerror", e),
        setTimeout(a, 100),
        function () {
          (s = !0),
            navigation.removeEventListener("navigate", t),
            navigation.removeEventListener("navigatesuccess", e),
            navigation.removeEventListener("navigateerror", e),
            r !== null && (r(), (r = null));
        }
      );
    }
  }
  function tf(t) {
    this._internalRoot = t;
  }
  (sr.prototype.render = tf.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(o(409));
      var a = e.current,
        s = Ke();
      jg(a, s, t, e, null, null);
    }),
    (sr.prototype.unmount = tf.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          jg(t.current, 2, null, t, null, null), Uo(), (e[Ai] = null);
        }
      });
  function sr(t) {
    this._internalRoot = t;
  }
  sr.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = Xr();
      t = { blockedOn: null, target: t, priority: e };
      for (var a = 0; a < Oa.length && e !== 0 && e < Oa[a].priority; a++);
      Oa.splice(a, 0, t), a === 0 && Bg(t);
    }
  };
  var Yg = i.version;
  if (Yg !== "19.2.1") throw Error(o(527, Yg, "19.2.1"));
  B.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function"
        ? Error(o(188))
        : ((t = Object.keys(t).join(",")), Error(o(268, t)));
    return (
      (t = m(e)),
      (t = t !== null ? v(t) : null),
      (t = t === null ? null : t.stateNode),
      t
    );
  };
  var FS = {
    bundleType: 0,
    version: "19.2.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: C,
    reconcilerVersion: "19.2.1",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var lr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!lr.isDisabled && lr.supportsFiber)
      try {
        (Ya = lr.inject(FS)), (Te = lr);
      } catch {}
  }
  return (
    (Sl.createRoot = function (t, e) {
      if (!c(t)) throw Error(o(299));
      var a = !1,
        s = "",
        r = Qh,
        u = Jh,
        y = $h;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (a = !0),
          e.identifierPrefix !== void 0 && (s = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (r = e.onUncaughtError),
          e.onCaughtError !== void 0 && (u = e.onCaughtError),
          e.onRecoverableError !== void 0 && (y = e.onRecoverableError)),
        (e = Og(t, 1, !1, null, null, a, s, null, r, u, y, Fg)),
        (t[Ai] = e.current),
        zu(t),
        new tf(e)
      );
    }),
    (Sl.hydrateRoot = function (t, e, a) {
      if (!c(t)) throw Error(o(299));
      var s = !1,
        r = "",
        u = Qh,
        y = Jh,
        b = $h,
        w = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (s = !0),
          a.identifierPrefix !== void 0 && (r = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (u = a.onUncaughtError),
          a.onCaughtError !== void 0 && (y = a.onCaughtError),
          a.onRecoverableError !== void 0 && (b = a.onRecoverableError),
          a.formState !== void 0 && (w = a.formState)),
        (e = Og(t, 1, !0, e, a ?? null, s, r, w, u, y, b, Fg)),
        (e.context = Rg(null)),
        (a = e.current),
        (s = Ke()),
        (s = Si(s)),
        (r = pa(s)),
        (r.callback = null),
        ga(a, r, s),
        (a = s),
        (e.current.lanes = a),
        Xt(e, a),
        Tn(e),
        (t[Ai] = e.current),
        zu(t),
        new sr(e)
      );
    }),
    (Sl.version = "19.2.1"),
    Sl
  );
}
var Ig;
function $S() {
  if (Ig) return nf.exports;
  Ig = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (i) {
        console.error(i);
      }
  }
  return n(), (nf.exports = JS()), nf.exports;
}
var IS = $S(),
  D = Mr();
const I = F0(D),
  WS = qS({ __proto__: null, default: I }, [D]);
var tA = (n, i, l, o, c, f, d, p) => {
    let h = document.documentElement,
      m = ["light", "dark"];
    function v(A) {
      (Array.isArray(n) ? n : [n]).forEach((E) => {
        let O = E === "class",
          _ = O && f ? c.map((R) => f[R] || R) : c;
        O
          ? (h.classList.remove(..._), h.classList.add(f && f[A] ? f[A] : A))
          : h.setAttribute(E, A);
      }),
        g(A);
    }
    function g(A) {
      p && m.includes(A) && (h.style.colorScheme = A);
    }
    function S() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    if (o) v(o);
    else
      try {
        let A = localStorage.getItem(i) || l,
          E = d && A === "system" ? S() : A;
        v(E);
      } catch {}
  },
  eA = D.createContext(void 0),
  nA = { setTheme: (n) => {}, themes: [] },
  aA = () => {
    var n;
    return (n = D.useContext(eA)) != null ? n : nA;
  };
D.memo(
  ({
    forcedTheme: n,
    storageKey: i,
    attribute: l,
    enableSystem: o,
    enableColorScheme: c,
    defaultTheme: f,
    value: d,
    themes: p,
    nonce: h,
    scriptProps: m,
  }) => {
    let v = JSON.stringify([l, i, f, n, p, d, o, c]).slice(1, -1);
    return D.createElement("script", {
      ...m,
      suppressHydrationWarning: !0,
      nonce: typeof window > "u" ? h : "",
      dangerouslySetInnerHTML: { __html: `(${tA.toString()})(${v})` },
    });
  }
);
var od = Y0();
const iA = F0(od);
function sA(n) {
  if (typeof document > "u") return;
  let i = document.head || document.getElementsByTagName("head")[0],
    l = document.createElement("style");
  (l.type = "text/css"),
    i.appendChild(l),
    l.styleSheet
      ? (l.styleSheet.cssText = n)
      : l.appendChild(document.createTextNode(n));
}
const lA = (n) => {
    switch (n) {
      case "success":
        return cA;
      case "info":
        return fA;
      case "warning":
        return uA;
      case "error":
        return dA;
      default:
        return null;
    }
  },
  oA = Array(12).fill(0),
  rA = ({ visible: n, className: i }) =>
    I.createElement(
      "div",
      {
        className: ["sonner-loading-wrapper", i].filter(Boolean).join(" "),
        "data-visible": n,
      },
      I.createElement(
        "div",
        { className: "sonner-spinner" },
        oA.map((l, o) =>
          I.createElement("div", {
            className: "sonner-loading-bar",
            key: `spinner-bar-${o}`,
          })
        )
      )
    ),
  cA = I.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    I.createElement("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      clipRule: "evenodd",
    })
  ),
  uA = I.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    I.createElement("path", {
      fillRule: "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
      clipRule: "evenodd",
    })
  ),
  fA = I.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    I.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
      clipRule: "evenodd",
    })
  ),
  dA = I.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    I.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
      clipRule: "evenodd",
    })
  ),
  mA = I.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    I.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    I.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
  ),
  hA = () => {
    const [n, i] = I.useState(document.hidden);
    return (
      I.useEffect(() => {
        const l = () => {
          i(document.hidden);
        };
        return (
          document.addEventListener("visibilitychange", l),
          () => window.removeEventListener("visibilitychange", l)
        );
      }, []),
      n
    );
  };
let Of = 1;
class pA {
  constructor() {
    (this.subscribe = (i) => (
      this.subscribers.push(i),
      () => {
        const l = this.subscribers.indexOf(i);
        this.subscribers.splice(l, 1);
      }
    )),
      (this.publish = (i) => {
        this.subscribers.forEach((l) => l(i));
      }),
      (this.addToast = (i) => {
        this.publish(i), (this.toasts = [...this.toasts, i]);
      }),
      (this.create = (i) => {
        var l;
        const { message: o, ...c } = i,
          f =
            typeof i?.id == "number" ||
            ((l = i.id) == null ? void 0 : l.length) > 0
              ? i.id
              : Of++,
          d = this.toasts.find((h) => h.id === f),
          p = i.dismissible === void 0 ? !0 : i.dismissible;
        return (
          this.dismissedToasts.has(f) && this.dismissedToasts.delete(f),
          d
            ? (this.toasts = this.toasts.map((h) =>
                h.id === f
                  ? (this.publish({ ...h, ...i, id: f, title: o }),
                    { ...h, ...i, id: f, dismissible: p, title: o })
                  : h
              ))
            : this.addToast({ title: o, ...c, dismissible: p, id: f }),
          f
        );
      }),
      (this.dismiss = (i) => (
        i
          ? (this.dismissedToasts.add(i),
            requestAnimationFrame(() =>
              this.subscribers.forEach((l) => l({ id: i, dismiss: !0 }))
            ))
          : this.toasts.forEach((l) => {
              this.subscribers.forEach((o) => o({ id: l.id, dismiss: !0 }));
            }),
        i
      )),
      (this.message = (i, l) => this.create({ ...l, message: i })),
      (this.error = (i, l) => this.create({ ...l, message: i, type: "error" })),
      (this.success = (i, l) =>
        this.create({ ...l, type: "success", message: i })),
      (this.info = (i, l) => this.create({ ...l, type: "info", message: i })),
      (this.warning = (i, l) =>
        this.create({ ...l, type: "warning", message: i })),
      (this.loading = (i, l) =>
        this.create({ ...l, type: "loading", message: i })),
      (this.promise = (i, l) => {
        if (!l) return;
        let o;
        l.loading !== void 0 &&
          (o = this.create({
            ...l,
            promise: i,
            type: "loading",
            message: l.loading,
            description:
              typeof l.description != "function" ? l.description : void 0,
          }));
        const c = Promise.resolve(i instanceof Function ? i() : i);
        let f = o !== void 0,
          d;
        const p = c
            .then(async (m) => {
              if (((d = ["resolve", m]), I.isValidElement(m)))
                (f = !1), this.create({ id: o, type: "default", message: m });
              else if (yA(m) && !m.ok) {
                f = !1;
                const g =
                    typeof l.error == "function"
                      ? await l.error(`HTTP error! status: ${m.status}`)
                      : l.error,
                  S =
                    typeof l.description == "function"
                      ? await l.description(`HTTP error! status: ${m.status}`)
                      : l.description,
                  E =
                    typeof g == "object" && !I.isValidElement(g)
                      ? g
                      : { message: g };
                this.create({ id: o, type: "error", description: S, ...E });
              } else if (m instanceof Error) {
                f = !1;
                const g =
                    typeof l.error == "function" ? await l.error(m) : l.error,
                  S =
                    typeof l.description == "function"
                      ? await l.description(m)
                      : l.description,
                  E =
                    typeof g == "object" && !I.isValidElement(g)
                      ? g
                      : { message: g };
                this.create({ id: o, type: "error", description: S, ...E });
              } else if (l.success !== void 0) {
                f = !1;
                const g =
                    typeof l.success == "function"
                      ? await l.success(m)
                      : l.success,
                  S =
                    typeof l.description == "function"
                      ? await l.description(m)
                      : l.description,
                  E =
                    typeof g == "object" && !I.isValidElement(g)
                      ? g
                      : { message: g };
                this.create({ id: o, type: "success", description: S, ...E });
              }
            })
            .catch(async (m) => {
              if (((d = ["reject", m]), l.error !== void 0)) {
                f = !1;
                const v =
                    typeof l.error == "function" ? await l.error(m) : l.error,
                  g =
                    typeof l.description == "function"
                      ? await l.description(m)
                      : l.description,
                  A =
                    typeof v == "object" && !I.isValidElement(v)
                      ? v
                      : { message: v };
                this.create({ id: o, type: "error", description: g, ...A });
              }
            })
            .finally(() => {
              f && (this.dismiss(o), (o = void 0)),
                l.finally == null || l.finally.call(l);
            }),
          h = () =>
            new Promise((m, v) =>
              p.then(() => (d[0] === "reject" ? v(d[1]) : m(d[1]))).catch(v)
            );
        return typeof o != "string" && typeof o != "number"
          ? { unwrap: h }
          : Object.assign(o, { unwrap: h });
      }),
      (this.custom = (i, l) => {
        const o = l?.id || Of++;
        return this.create({ jsx: i(o), id: o, ...l }), o;
      }),
      (this.getActiveToasts = () =>
        this.toasts.filter((i) => !this.dismissedToasts.has(i.id))),
      (this.subscribers = []),
      (this.toasts = []),
      (this.dismissedToasts = new Set());
  }
}
const Be = new pA(),
  gA = (n, i) => {
    const l = i?.id || Of++;
    return Be.addToast({ title: n, ...i, id: l }), l;
  },
  yA = (n) =>
    n &&
    typeof n == "object" &&
    "ok" in n &&
    typeof n.ok == "boolean" &&
    "status" in n &&
    typeof n.status == "number",
  vA = gA,
  xA = () => Be.toasts,
  bA = () => Be.getActiveToasts(),
  q0 = Object.assign(
    vA,
    {
      success: Be.success,
      info: Be.info,
      warning: Be.warning,
      error: Be.error,
      custom: Be.custom,
      message: Be.message,
      promise: Be.promise,
      dismiss: Be.dismiss,
      loading: Be.loading,
    },
    { getHistory: xA, getToasts: bA }
  );
sA(
  "[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}"
);
function or(n) {
  return n.label !== void 0;
}
const SA = 3,
  AA = "24px",
  wA = "16px",
  Wg = 4e3,
  EA = 356,
  TA = 14,
  NA = 45,
  DA = 200;
function Nn(...n) {
  return n.filter(Boolean).join(" ");
}
function CA(n) {
  const [i, l] = n.split("-"),
    o = [];
  return i && o.push(i), l && o.push(l), o;
}
const MA = (n) => {
  var i, l, o, c, f, d, p, h, m;
  const {
      invert: v,
      toast: g,
      unstyled: S,
      interacting: A,
      setHeights: E,
      visibleToasts: O,
      heights: _,
      index: R,
      toasts: X,
      expanded: U,
      removeToast: Q,
      defaultRichColors: Z,
      closeButton: $,
      style: K,
      cancelButtonStyle: F,
      actionButtonStyle: ot,
      className: ft = "",
      descriptionClassName: At = "",
      duration: pt,
      position: yt,
      gap: vt,
      expandByDefault: bt,
      classNames: C,
      icons: B,
      closeButtonAriaLabel: z = "Close toast",
    } = n,
    [et, lt] = I.useState(null),
    [T, q] = I.useState(null),
    [Y, J] = I.useState(!1),
    [W, rt] = I.useState(!1),
    [it, mt] = I.useState(!1),
    [Ct, ue] = I.useState(!1),
    [Ae, fe] = I.useState(!1),
    [Hn, fn] = I.useState(0),
    [Ts, vi] = I.useState(0),
    Ua = I.useRef(g.duration || pt || Wg),
    Ns = I.useRef(null),
    ke = I.useRef(null),
    Ds = R === 0,
    Cs = R + 1 <= O,
    we = g.type,
    sa = g.dismissible !== !1,
    Ee = g.className || "",
    qr = g.descriptionClassName || "",
    ka = I.useMemo(
      () => _.findIndex((ht) => ht.toastId === g.id) || 0,
      [_, g.id]
    ),
    Pl = I.useMemo(() => {
      var ht;
      return (ht = g.closeButton) != null ? ht : $;
    }, [g.closeButton, $]),
    Fa = I.useMemo(() => g.duration || pt || Wg, [g.duration, pt]),
    Ms = I.useRef(0),
    _n = I.useRef(0),
    Kl = I.useRef(0),
    la = I.useRef(null),
    [Ya, Te] = yt.split("-"),
    dn = I.useMemo(
      () => _.reduce((ht, Yt, le) => (le >= ka ? ht : ht + Yt.height), 0),
      [_, ka]
    ),
    ve = hA(),
    Gr = g.invert || v,
    Os = we === "loading";
  (_n.current = I.useMemo(() => ka * vt + dn, [ka, dn])),
    I.useEffect(() => {
      Ua.current = Fa;
    }, [Fa]),
    I.useEffect(() => {
      J(!0);
    }, []),
    I.useEffect(() => {
      const ht = ke.current;
      if (ht) {
        const Yt = ht.getBoundingClientRect().height;
        return (
          vi(Yt),
          E((le) => [
            { toastId: g.id, height: Yt, position: g.position },
            ...le,
          ]),
          () => E((le) => le.filter((xe) => xe.toastId !== g.id))
        );
      }
    }, [E, g.id]),
    I.useLayoutEffect(() => {
      if (!Y) return;
      const ht = ke.current,
        Yt = ht.style.height;
      ht.style.height = "auto";
      const le = ht.getBoundingClientRect().height;
      (ht.style.height = Yt),
        vi(le),
        E((xe) =>
          xe.find((Xt) => Xt.toastId === g.id)
            ? xe.map((Xt) => (Xt.toastId === g.id ? { ...Xt, height: le } : Xt))
            : [{ toastId: g.id, height: le, position: g.position }, ...xe]
        );
    }, [Y, g.title, g.description, E, g.id, g.jsx, g.action, g.cancel]);
  const bn = I.useCallback(() => {
    rt(!0),
      fn(_n.current),
      E((ht) => ht.filter((Yt) => Yt.toastId !== g.id)),
      setTimeout(() => {
        Q(g);
      }, DA);
  }, [g, Q, E, _n]);
  I.useEffect(() => {
    if (
      (g.promise && we === "loading") ||
      g.duration === 1 / 0 ||
      g.type === "loading"
    )
      return;
    let ht;
    return (
      U || A || ve
        ? (() => {
            if (Kl.current < Ms.current) {
              const xe = new Date().getTime() - Ms.current;
              Ua.current = Ua.current - xe;
            }
            Kl.current = new Date().getTime();
          })()
        : (() => {
            Ua.current !== 1 / 0 &&
              ((Ms.current = new Date().getTime()),
              (ht = setTimeout(() => {
                g.onAutoClose == null || g.onAutoClose.call(g, g), bn();
              }, Ua.current)));
          })(),
      () => clearTimeout(ht)
    );
  }, [U, A, g, we, ve, bn]),
    I.useEffect(() => {
      g.delete && (bn(), g.onDismiss == null || g.onDismiss.call(g, g));
    }, [bn, g.delete]);
  function xi() {
    var ht;
    if (B?.loading) {
      var Yt;
      return I.createElement(
        "div",
        {
          className: Nn(
            C?.loader,
            g == null || (Yt = g.classNames) == null ? void 0 : Yt.loader,
            "sonner-loader"
          ),
          "data-visible": we === "loading",
        },
        B.loading
      );
    }
    return I.createElement(rA, {
      className: Nn(
        C?.loader,
        g == null || (ht = g.classNames) == null ? void 0 : ht.loader
      ),
      visible: we === "loading",
    });
  }
  const bi = g.icon || B?.[we] || lA(we);
  var qa, Sn;
  return I.createElement(
    "li",
    {
      tabIndex: 0,
      ref: ke,
      className: Nn(
        ft,
        Ee,
        C?.toast,
        g == null || (i = g.classNames) == null ? void 0 : i.toast,
        C?.default,
        C?.[we],
        g == null || (l = g.classNames) == null ? void 0 : l[we]
      ),
      "data-sonner-toast": "",
      "data-rich-colors": (qa = g.richColors) != null ? qa : Z,
      "data-styled": !(g.jsx || g.unstyled || S),
      "data-mounted": Y,
      "data-promise": !!g.promise,
      "data-swiped": Ae,
      "data-removed": W,
      "data-visible": Cs,
      "data-y-position": Ya,
      "data-x-position": Te,
      "data-index": R,
      "data-front": Ds,
      "data-swiping": it,
      "data-dismissible": sa,
      "data-type": we,
      "data-invert": Gr,
      "data-swipe-out": Ct,
      "data-swipe-direction": T,
      "data-expanded": !!(U || (bt && Y)),
      "data-testid": g.testId,
      style: {
        "--index": R,
        "--toasts-before": R,
        "--z-index": X.length - R,
        "--offset": `${W ? Hn : _n.current}px`,
        "--initial-height": bt ? "auto" : `${Ts}px`,
        ...K,
        ...g.style,
      },
      onDragEnd: () => {
        mt(!1), lt(null), (la.current = null);
      },
      onPointerDown: (ht) => {
        ht.button !== 2 &&
          (Os ||
            !sa ||
            ((Ns.current = new Date()),
            fn(_n.current),
            ht.target.setPointerCapture(ht.pointerId),
            ht.target.tagName !== "BUTTON" &&
              (mt(!0), (la.current = { x: ht.clientX, y: ht.clientY }))));
      },
      onPointerUp: () => {
        var ht, Yt, le;
        if (Ct || !sa) return;
        la.current = null;
        const xe = Number(
            ((ht = ke.current) == null
              ? void 0
              : ht.style
                  .getPropertyValue("--swipe-amount-x")
                  .replace("px", "")) || 0
          ),
          oa = Number(
            ((Yt = ke.current) == null
              ? void 0
              : Yt.style
                  .getPropertyValue("--swipe-amount-y")
                  .replace("px", "")) || 0
          ),
          Xt =
            new Date().getTime() -
            ((le = Ns.current) == null ? void 0 : le.getTime()),
          Ce = et === "x" ? xe : oa,
          Ga = Math.abs(Ce) / Xt;
        if (Math.abs(Ce) >= NA || Ga > 0.11) {
          fn(_n.current),
            g.onDismiss == null || g.onDismiss.call(g, g),
            q(
              et === "x" ? (xe > 0 ? "right" : "left") : oa > 0 ? "down" : "up"
            ),
            bn(),
            ue(!0);
          return;
        } else {
          var Me, Oe;
          (Me = ke.current) == null ||
            Me.style.setProperty("--swipe-amount-x", "0px"),
            (Oe = ke.current) == null ||
              Oe.style.setProperty("--swipe-amount-y", "0px");
        }
        fe(!1), mt(!1), lt(null);
      },
      onPointerMove: (ht) => {
        var Yt, le, xe;
        if (
          !la.current ||
          !sa ||
          ((Yt = window.getSelection()) == null
            ? void 0
            : Yt.toString().length) > 0
        )
          return;
        const Xt = ht.clientY - la.current.y,
          Ce = ht.clientX - la.current.x;
        var Ga;
        const Me = (Ga = n.swipeDirections) != null ? Ga : CA(yt);
        !et &&
          (Math.abs(Ce) > 1 || Math.abs(Xt) > 1) &&
          lt(Math.abs(Ce) > Math.abs(Xt) ? "x" : "y");
        let Oe = { x: 0, y: 0 };
        const Si = (mn) => 1 / (1.5 + Math.abs(mn) / 20);
        if (et === "y") {
          if (Me.includes("top") || Me.includes("bottom"))
            if (
              (Me.includes("top") && Xt < 0) ||
              (Me.includes("bottom") && Xt > 0)
            )
              Oe.y = Xt;
            else {
              const mn = Xt * Si(Xt);
              Oe.y = Math.abs(mn) < Math.abs(Xt) ? mn : Xt;
            }
        } else if (et === "x" && (Me.includes("left") || Me.includes("right")))
          if (
            (Me.includes("left") && Ce < 0) ||
            (Me.includes("right") && Ce > 0)
          )
            Oe.x = Ce;
          else {
            const mn = Ce * Si(Ce);
            Oe.x = Math.abs(mn) < Math.abs(Ce) ? mn : Ce;
          }
        (Math.abs(Oe.x) > 0 || Math.abs(Oe.y) > 0) && fe(!0),
          (le = ke.current) == null ||
            le.style.setProperty("--swipe-amount-x", `${Oe.x}px`),
          (xe = ke.current) == null ||
            xe.style.setProperty("--swipe-amount-y", `${Oe.y}px`);
      },
    },
    Pl && !g.jsx && we !== "loading"
      ? I.createElement(
          "button",
          {
            "aria-label": z,
            "data-disabled": Os,
            "data-close-button": !0,
            onClick:
              Os || !sa
                ? () => {}
                : () => {
                    bn(), g.onDismiss == null || g.onDismiss.call(g, g);
                  },
            className: Nn(
              C?.closeButton,
              g == null || (o = g.classNames) == null ? void 0 : o.closeButton
            ),
          },
          (Sn = B?.close) != null ? Sn : mA
        )
      : null,
    (we || g.icon || g.promise) &&
      g.icon !== null &&
      (B?.[we] !== null || g.icon)
      ? I.createElement(
          "div",
          {
            "data-icon": "",
            className: Nn(
              C?.icon,
              g == null || (c = g.classNames) == null ? void 0 : c.icon
            ),
          },
          g.promise || (g.type === "loading" && !g.icon)
            ? g.icon || xi()
            : null,
          g.type !== "loading" ? bi : null
        )
      : null,
    I.createElement(
      "div",
      {
        "data-content": "",
        className: Nn(
          C?.content,
          g == null || (f = g.classNames) == null ? void 0 : f.content
        ),
      },
      I.createElement(
        "div",
        {
          "data-title": "",
          className: Nn(
            C?.title,
            g == null || (d = g.classNames) == null ? void 0 : d.title
          ),
        },
        g.jsx ? g.jsx : typeof g.title == "function" ? g.title() : g.title
      ),
      g.description
        ? I.createElement(
            "div",
            {
              "data-description": "",
              className: Nn(
                At,
                qr,
                C?.description,
                g == null || (p = g.classNames) == null ? void 0 : p.description
              ),
            },
            typeof g.description == "function" ? g.description() : g.description
          )
        : null
    ),
    I.isValidElement(g.cancel)
      ? g.cancel
      : g.cancel && or(g.cancel)
      ? I.createElement(
          "button",
          {
            "data-button": !0,
            "data-cancel": !0,
            style: g.cancelButtonStyle || F,
            onClick: (ht) => {
              or(g.cancel) &&
                sa &&
                (g.cancel.onClick == null ||
                  g.cancel.onClick.call(g.cancel, ht),
                bn());
            },
            className: Nn(
              C?.cancelButton,
              g == null || (h = g.classNames) == null ? void 0 : h.cancelButton
            ),
          },
          g.cancel.label
        )
      : null,
    I.isValidElement(g.action)
      ? g.action
      : g.action && or(g.action)
      ? I.createElement(
          "button",
          {
            "data-button": !0,
            "data-action": !0,
            style: g.actionButtonStyle || ot,
            onClick: (ht) => {
              or(g.action) &&
                (g.action.onClick == null ||
                  g.action.onClick.call(g.action, ht),
                !ht.defaultPrevented && bn());
            },
            className: Nn(
              C?.actionButton,
              g == null || (m = g.classNames) == null ? void 0 : m.actionButton
            ),
          },
          g.action.label
        )
      : null
  );
};
function ty() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n
    ? window.getComputedStyle(document.documentElement).direction
    : n;
}
function OA(n, i) {
  const l = {};
  return (
    [n, i].forEach((o, c) => {
      const f = c === 1,
        d = f ? "--mobile-offset" : "--offset",
        p = f ? wA : AA;
      function h(m) {
        ["top", "right", "bottom", "left"].forEach((v) => {
          l[`${d}-${v}`] = typeof m == "number" ? `${m}px` : m;
        });
      }
      typeof o == "number" || typeof o == "string"
        ? h(o)
        : typeof o == "object"
        ? ["top", "right", "bottom", "left"].forEach((m) => {
            o[m] === void 0
              ? (l[`${d}-${m}`] = p)
              : (l[`${d}-${m}`] = typeof o[m] == "number" ? `${o[m]}px` : o[m]);
          })
        : h(p);
    }),
    l
  );
}
const RA = I.forwardRef(function (i, l) {
    const {
        id: o,
        invert: c,
        position: f = "bottom-right",
        hotkey: d = ["altKey", "KeyT"],
        expand: p,
        closeButton: h,
        className: m,
        offset: v,
        mobileOffset: g,
        theme: S = "light",
        richColors: A,
        duration: E,
        style: O,
        visibleToasts: _ = SA,
        toastOptions: R,
        dir: X = ty(),
        gap: U = TA,
        icons: Q,
        containerAriaLabel: Z = "Notifications",
      } = i,
      [$, K] = I.useState([]),
      F = I.useMemo(
        () =>
          o
            ? $.filter((Y) => Y.toasterId === o)
            : $.filter((Y) => !Y.toasterId),
        [$, o]
      ),
      ot = I.useMemo(
        () =>
          Array.from(
            new Set(
              [f].concat(F.filter((Y) => Y.position).map((Y) => Y.position))
            )
          ),
        [F, f]
      ),
      [ft, At] = I.useState([]),
      [pt, yt] = I.useState(!1),
      [vt, bt] = I.useState(!1),
      [C, B] = I.useState(
        S !== "system"
          ? S
          : typeof window < "u" &&
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      ),
      z = I.useRef(null),
      et = d.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
      lt = I.useRef(null),
      T = I.useRef(!1),
      q = I.useCallback((Y) => {
        K((J) => {
          var W;
          return (
            ((W = J.find((rt) => rt.id === Y.id)) != null && W.delete) ||
              Be.dismiss(Y.id),
            J.filter(({ id: rt }) => rt !== Y.id)
          );
        });
      }, []);
    return (
      I.useEffect(
        () =>
          Be.subscribe((Y) => {
            if (Y.dismiss) {
              requestAnimationFrame(() => {
                K((J) =>
                  J.map((W) => (W.id === Y.id ? { ...W, delete: !0 } : W))
                );
              });
              return;
            }
            setTimeout(() => {
              iA.flushSync(() => {
                K((J) => {
                  const W = J.findIndex((rt) => rt.id === Y.id);
                  return W !== -1
                    ? [...J.slice(0, W), { ...J[W], ...Y }, ...J.slice(W + 1)]
                    : [Y, ...J];
                });
              });
            });
          }),
        [$]
      ),
      I.useEffect(() => {
        if (S !== "system") {
          B(S);
          return;
        }
        if (
          (S === "system" &&
            (window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
              ? B("dark")
              : B("light")),
          typeof window > "u")
        )
          return;
        const Y = window.matchMedia("(prefers-color-scheme: dark)");
        try {
          Y.addEventListener("change", ({ matches: J }) => {
            B(J ? "dark" : "light");
          });
        } catch {
          Y.addListener(({ matches: W }) => {
            try {
              B(W ? "dark" : "light");
            } catch (rt) {
              console.error(rt);
            }
          });
        }
      }, [S]),
      I.useEffect(() => {
        $.length <= 1 && yt(!1);
      }, [$]),
      I.useEffect(() => {
        const Y = (J) => {
          var W;
          if (d.every((mt) => J[mt] || J.code === mt)) {
            var it;
            yt(!0), (it = z.current) == null || it.focus();
          }
          J.code === "Escape" &&
            (document.activeElement === z.current ||
              ((W = z.current) != null &&
                W.contains(document.activeElement))) &&
            yt(!1);
        };
        return (
          document.addEventListener("keydown", Y),
          () => document.removeEventListener("keydown", Y)
        );
      }, [d]),
      I.useEffect(() => {
        if (z.current)
          return () => {
            lt.current &&
              (lt.current.focus({ preventScroll: !0 }),
              (lt.current = null),
              (T.current = !1));
          };
      }, [z.current]),
      I.createElement(
        "section",
        {
          ref: l,
          "aria-label": `${Z} ${et}`,
          tabIndex: -1,
          "aria-live": "polite",
          "aria-relevant": "additions text",
          "aria-atomic": "false",
          suppressHydrationWarning: !0,
        },
        ot.map((Y, J) => {
          var W;
          const [rt, it] = Y.split("-");
          return F.length
            ? I.createElement(
                "ol",
                {
                  key: Y,
                  dir: X === "auto" ? ty() : X,
                  tabIndex: -1,
                  ref: z,
                  className: m,
                  "data-sonner-toaster": !0,
                  "data-sonner-theme": C,
                  "data-y-position": rt,
                  "data-x-position": it,
                  style: {
                    "--front-toast-height": `${
                      ((W = ft[0]) == null ? void 0 : W.height) || 0
                    }px`,
                    "--width": `${EA}px`,
                    "--gap": `${U}px`,
                    ...O,
                    ...OA(v, g),
                  },
                  onBlur: (mt) => {
                    T.current &&
                      !mt.currentTarget.contains(mt.relatedTarget) &&
                      ((T.current = !1),
                      lt.current &&
                        (lt.current.focus({ preventScroll: !0 }),
                        (lt.current = null)));
                  },
                  onFocus: (mt) => {
                    (mt.target instanceof HTMLElement &&
                      mt.target.dataset.dismissible === "false") ||
                      T.current ||
                      ((T.current = !0), (lt.current = mt.relatedTarget));
                  },
                  onMouseEnter: () => yt(!0),
                  onMouseMove: () => yt(!0),
                  onMouseLeave: () => {
                    vt || yt(!1);
                  },
                  onDragEnd: () => yt(!1),
                  onPointerDown: (mt) => {
                    (mt.target instanceof HTMLElement &&
                      mt.target.dataset.dismissible === "false") ||
                      bt(!0);
                  },
                  onPointerUp: () => bt(!1),
                },
                F.filter(
                  (mt) => (!mt.position && J === 0) || mt.position === Y
                ).map((mt, Ct) => {
                  var ue, Ae;
                  return I.createElement(MA, {
                    key: mt.id,
                    icons: Q,
                    index: Ct,
                    toast: mt,
                    defaultRichColors: A,
                    duration: (ue = R?.duration) != null ? ue : E,
                    className: R?.className,
                    descriptionClassName: R?.descriptionClassName,
                    invert: c,
                    visibleToasts: _,
                    closeButton: (Ae = R?.closeButton) != null ? Ae : h,
                    interacting: vt,
                    position: Y,
                    style: R?.style,
                    unstyled: R?.unstyled,
                    classNames: R?.classNames,
                    cancelButtonStyle: R?.cancelButtonStyle,
                    actionButtonStyle: R?.actionButtonStyle,
                    closeButtonAriaLabel: R?.closeButtonAriaLabel,
                    removeToast: q,
                    toasts: F.filter((fe) => fe.position == mt.position),
                    heights: ft.filter((fe) => fe.position == mt.position),
                    setHeights: At,
                    expandByDefault: p,
                    gap: U,
                    expanded: pt,
                    swipeDirections: i.swipeDirections,
                  });
                })
              )
            : null;
        })
      )
    );
  }),
  jA = ({ ...n }) => {
    const { theme: i = "system" } = aA();
    return x.jsx(RA, {
      "data-loc": "client/src/components/ui/sonner.tsx:8",
      theme: i,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      },
      ...n,
    });
  };
function ta(n, i, { checkForDefaultPrevented: l = !0 } = {}) {
  return function (c) {
    if ((n?.(c), l === !1 || !c.defaultPrevented)) return i?.(c);
  };
}
function ey(n, i) {
  if (typeof n == "function") return n(i);
  n != null && (n.current = i);
}
function G0(...n) {
  return (i) => {
    let l = !1;
    const o = n.map((c) => {
      const f = ey(c, i);
      return !l && typeof f == "function" && (l = !0), f;
    });
    if (l)
      return () => {
        for (let c = 0; c < o.length; c++) {
          const f = o[c];
          typeof f == "function" ? f() : ey(n[c], null);
        }
      };
  };
}
function gi(...n) {
  return D.useCallback(G0(...n), n);
}
function X0(n, i = []) {
  let l = [];
  function o(f, d) {
    const p = D.createContext(d),
      h = l.length;
    l = [...l, d];
    const m = (g) => {
      const { scope: S, children: A, ...E } = g,
        O = S?.[n]?.[h] || p,
        _ = D.useMemo(() => E, Object.values(E));
      return x.jsx(O.Provider, { value: _, children: A });
    };
    m.displayName = f + "Provider";
    function v(g, S) {
      const A = S?.[n]?.[h] || p,
        E = D.useContext(A);
      if (E) return E;
      if (d !== void 0) return d;
      throw new Error(`\`${g}\` must be used within \`${f}\``);
    }
    return [m, v];
  }
  const c = () => {
    const f = l.map((d) => D.createContext(d));
    return function (p) {
      const h = p?.[n] || f;
      return D.useMemo(() => ({ [`__scope${n}`]: { ...p, [n]: h } }), [p, h]);
    };
  };
  return (c.scopeName = n), [o, HA(c, ...i)];
}
function HA(...n) {
  const i = n[0];
  if (n.length === 1) return i;
  const l = () => {
    const o = n.map((c) => ({ useScope: c(), scopeName: c.scopeName }));
    return function (f) {
      const d = o.reduce((p, { useScope: h, scopeName: m }) => {
        const g = h(f)[`__scope${m}`];
        return { ...p, ...g };
      }, {});
      return D.useMemo(() => ({ [`__scope${i.scopeName}`]: d }), [d]);
    };
  };
  return (l.scopeName = i.scopeName), l;
}
function P0(n) {
  const i = zA(n),
    l = D.forwardRef((o, c) => {
      const { children: f, ...d } = o,
        p = D.Children.toArray(f),
        h = p.find(LA);
      if (h) {
        const m = h.props.children,
          v = p.map((g) =>
            g === h
              ? D.Children.count(m) > 1
                ? D.Children.only(null)
                : D.isValidElement(m)
                ? m.props.children
                : null
              : g
          );
        return x.jsx(i, {
          ...d,
          ref: c,
          children: D.isValidElement(m) ? D.cloneElement(m, void 0, v) : null,
        });
      }
      return x.jsx(i, { ...d, ref: c, children: f });
    });
  return (l.displayName = `${n}.Slot`), l;
}
var _A = P0("Slot");
function zA(n) {
  const i = D.forwardRef((l, o) => {
    const { children: c, ...f } = l;
    if (D.isValidElement(c)) {
      const d = UA(c),
        p = BA(f, c.props);
      return (
        c.type !== D.Fragment && (p.ref = o ? G0(o, d) : d),
        D.cloneElement(c, p)
      );
    }
    return D.Children.count(c) > 1 ? D.Children.only(null) : null;
  });
  return (i.displayName = `${n}.SlotClone`), i;
}
var K0 = Symbol("radix.slottable");
function VA(n) {
  const i = ({ children: l }) => x.jsx(x.Fragment, { children: l });
  return (i.displayName = `${n}.Slottable`), (i.__radixId = K0), i;
}
function LA(n) {
  return (
    D.isValidElement(n) &&
    typeof n.type == "function" &&
    "__radixId" in n.type &&
    n.type.__radixId === K0
  );
}
function BA(n, i) {
  const l = { ...i };
  for (const o in i) {
    const c = n[o],
      f = i[o];
    /^on[A-Z]/.test(o)
      ? c && f
        ? (l[o] = (...p) => {
            const h = f(...p);
            return c(...p), h;
          })
        : c && (l[o] = c)
      : o === "style"
      ? (l[o] = { ...c, ...f })
      : o === "className" && (l[o] = [c, f].filter(Boolean).join(" "));
  }
  return { ...n, ...l };
}
function UA(n) {
  let i = Object.getOwnPropertyDescriptor(n.props, "ref")?.get,
    l = i && "isReactWarning" in i && i.isReactWarning;
  return l
    ? n.ref
    : ((i = Object.getOwnPropertyDescriptor(n, "ref")?.get),
      (l = i && "isReactWarning" in i && i.isReactWarning),
      l ? n.props.ref : n.props.ref || n.ref);
}
var kA = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  yi = kA.reduce((n, i) => {
    const l = P0(`Primitive.${i}`),
      o = D.forwardRef((c, f) => {
        const { asChild: d, ...p } = c,
          h = d ? l : i;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          x.jsx(h, { ...p, ref: f })
        );
      });
    return (o.displayName = `Primitive.${i}`), { ...n, [i]: o };
  }, {});
function FA(n, i) {
  n && od.flushSync(() => n.dispatchEvent(i));
}
function Or(n) {
  const i = D.useRef(n);
  return (
    D.useEffect(() => {
      i.current = n;
    }),
    D.useMemo(
      () =>
        (...l) =>
          i.current?.(...l),
      []
    )
  );
}
function YA(n, i = globalThis?.document) {
  const l = Or(n);
  D.useEffect(() => {
    const o = (c) => {
      c.key === "Escape" && l(c);
    };
    return (
      i.addEventListener("keydown", o, { capture: !0 }),
      () => i.removeEventListener("keydown", o, { capture: !0 })
    );
  }, [l, i]);
}
var qA = "DismissableLayer",
  Rf = "dismissableLayer.update",
  GA = "dismissableLayer.pointerDownOutside",
  XA = "dismissableLayer.focusOutside",
  ny,
  Z0 = D.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  Q0 = D.forwardRef((n, i) => {
    const {
        disableOutsidePointerEvents: l = !1,
        onEscapeKeyDown: o,
        onPointerDownOutside: c,
        onFocusOutside: f,
        onInteractOutside: d,
        onDismiss: p,
        ...h
      } = n,
      m = D.useContext(Z0),
      [v, g] = D.useState(null),
      S = v?.ownerDocument ?? globalThis?.document,
      [, A] = D.useState({}),
      E = gi(i, (K) => g(K)),
      O = Array.from(m.layers),
      [_] = [...m.layersWithOutsidePointerEventsDisabled].slice(-1),
      R = O.indexOf(_),
      X = v ? O.indexOf(v) : -1,
      U = m.layersWithOutsidePointerEventsDisabled.size > 0,
      Q = X >= R,
      Z = ZA((K) => {
        const F = K.target,
          ot = [...m.branches].some((ft) => ft.contains(F));
        !Q || ot || (c?.(K), d?.(K), K.defaultPrevented || p?.());
      }, S),
      $ = QA((K) => {
        const F = K.target;
        [...m.branches].some((ft) => ft.contains(F)) ||
          (f?.(K), d?.(K), K.defaultPrevented || p?.());
      }, S);
    return (
      YA((K) => {
        X === m.layers.size - 1 &&
          (o?.(K), !K.defaultPrevented && p && (K.preventDefault(), p()));
      }, S),
      D.useEffect(() => {
        if (v)
          return (
            l &&
              (m.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((ny = S.body.style.pointerEvents),
                (S.body.style.pointerEvents = "none")),
              m.layersWithOutsidePointerEventsDisabled.add(v)),
            m.layers.add(v),
            ay(),
            () => {
              l &&
                m.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (S.body.style.pointerEvents = ny);
            }
          );
      }, [v, S, l, m]),
      D.useEffect(
        () => () => {
          v &&
            (m.layers.delete(v),
            m.layersWithOutsidePointerEventsDisabled.delete(v),
            ay());
        },
        [v, m]
      ),
      D.useEffect(() => {
        const K = () => A({});
        return (
          document.addEventListener(Rf, K),
          () => document.removeEventListener(Rf, K)
        );
      }, []),
      x.jsx(yi.div, {
        ...h,
        ref: E,
        style: {
          pointerEvents: U ? (Q ? "auto" : "none") : void 0,
          ...n.style,
        },
        onFocusCapture: ta(n.onFocusCapture, $.onFocusCapture),
        onBlurCapture: ta(n.onBlurCapture, $.onBlurCapture),
        onPointerDownCapture: ta(
          n.onPointerDownCapture,
          Z.onPointerDownCapture
        ),
      })
    );
  });
Q0.displayName = qA;
var PA = "DismissableLayerBranch",
  KA = D.forwardRef((n, i) => {
    const l = D.useContext(Z0),
      o = D.useRef(null),
      c = gi(i, o);
    return (
      D.useEffect(() => {
        const f = o.current;
        if (f)
          return (
            l.branches.add(f),
            () => {
              l.branches.delete(f);
            }
          );
      }, [l.branches]),
      x.jsx(yi.div, { ...n, ref: c })
    );
  });
KA.displayName = PA;
function ZA(n, i = globalThis?.document) {
  const l = Or(n),
    o = D.useRef(!1),
    c = D.useRef(() => {});
  return (
    D.useEffect(() => {
      const f = (p) => {
          if (p.target && !o.current) {
            let h = function () {
              J0(GA, l, m, { discrete: !0 });
            };
            const m = { originalEvent: p };
            p.pointerType === "touch"
              ? (i.removeEventListener("click", c.current),
                (c.current = h),
                i.addEventListener("click", c.current, { once: !0 }))
              : h();
          } else i.removeEventListener("click", c.current);
          o.current = !1;
        },
        d = window.setTimeout(() => {
          i.addEventListener("pointerdown", f);
        }, 0);
      return () => {
        window.clearTimeout(d),
          i.removeEventListener("pointerdown", f),
          i.removeEventListener("click", c.current);
      };
    }, [i, l]),
    { onPointerDownCapture: () => (o.current = !0) }
  );
}
function QA(n, i = globalThis?.document) {
  const l = Or(n),
    o = D.useRef(!1);
  return (
    D.useEffect(() => {
      const c = (f) => {
        f.target &&
          !o.current &&
          J0(XA, l, { originalEvent: f }, { discrete: !1 });
      };
      return (
        i.addEventListener("focusin", c),
        () => i.removeEventListener("focusin", c)
      );
    }, [i, l]),
    {
      onFocusCapture: () => (o.current = !0),
      onBlurCapture: () => (o.current = !1),
    }
  );
}
function ay() {
  const n = new CustomEvent(Rf);
  document.dispatchEvent(n);
}
function J0(n, i, l, { discrete: o }) {
  const c = l.originalEvent.target,
    f = new CustomEvent(n, { bubbles: !1, cancelable: !0, detail: l });
  i && c.addEventListener(n, i, { once: !0 }),
    o ? FA(c, f) : c.dispatchEvent(f);
}
var Rl = globalThis?.document ? D.useLayoutEffect : () => {};
const JA = ["top", "right", "bottom", "left"],
  _a = Math.min,
  Ze = Math.max,
  br = Math.round,
  rr = Math.floor,
  Cn = (n) => ({ x: n, y: n }),
  $A = { left: "right", right: "left", bottom: "top", top: "bottom" },
  IA = { start: "end", end: "start" };
function jf(n, i, l) {
  return Ze(n, _a(i, l));
}
function ea(n, i) {
  return typeof n == "function" ? n(i) : n;
}
function na(n) {
  return n.split("-")[0];
}
function vs(n) {
  return n.split("-")[1];
}
function rd(n) {
  return n === "x" ? "y" : "x";
}
function cd(n) {
  return n === "y" ? "height" : "width";
}
const WA = new Set(["top", "bottom"]);
function Dn(n) {
  return WA.has(na(n)) ? "y" : "x";
}
function ud(n) {
  return rd(Dn(n));
}
function t2(n, i, l) {
  l === void 0 && (l = !1);
  const o = vs(n),
    c = ud(n),
    f = cd(c);
  let d =
    c === "x"
      ? o === (l ? "end" : "start")
        ? "right"
        : "left"
      : o === "start"
      ? "bottom"
      : "top";
  return i.reference[f] > i.floating[f] && (d = Sr(d)), [d, Sr(d)];
}
function e2(n) {
  const i = Sr(n);
  return [Hf(n), i, Hf(i)];
}
function Hf(n) {
  return n.replace(/start|end/g, (i) => IA[i]);
}
const iy = ["left", "right"],
  sy = ["right", "left"],
  n2 = ["top", "bottom"],
  a2 = ["bottom", "top"];
function i2(n, i, l) {
  switch (n) {
    case "top":
    case "bottom":
      return l ? (i ? sy : iy) : i ? iy : sy;
    case "left":
    case "right":
      return i ? n2 : a2;
    default:
      return [];
  }
}
function s2(n, i, l, o) {
  const c = vs(n);
  let f = i2(na(n), l === "start", o);
  return (
    c && ((f = f.map((d) => d + "-" + c)), i && (f = f.concat(f.map(Hf)))), f
  );
}
function Sr(n) {
  return n.replace(/left|right|bottom|top/g, (i) => $A[i]);
}
function l2(n) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...n };
}
function $0(n) {
  return typeof n != "number"
    ? l2(n)
    : { top: n, right: n, bottom: n, left: n };
}
function Ar(n) {
  const { x: i, y: l, width: o, height: c } = n;
  return {
    width: o,
    height: c,
    top: l,
    left: i,
    right: i + o,
    bottom: l + c,
    x: i,
    y: l,
  };
}
function ly(n, i, l) {
  let { reference: o, floating: c } = n;
  const f = Dn(i),
    d = ud(i),
    p = cd(d),
    h = na(i),
    m = f === "y",
    v = o.x + o.width / 2 - c.width / 2,
    g = o.y + o.height / 2 - c.height / 2,
    S = o[p] / 2 - c[p] / 2;
  let A;
  switch (h) {
    case "top":
      A = { x: v, y: o.y - c.height };
      break;
    case "bottom":
      A = { x: v, y: o.y + o.height };
      break;
    case "right":
      A = { x: o.x + o.width, y: g };
      break;
    case "left":
      A = { x: o.x - c.width, y: g };
      break;
    default:
      A = { x: o.x, y: o.y };
  }
  switch (vs(i)) {
    case "start":
      A[d] -= S * (l && m ? -1 : 1);
      break;
    case "end":
      A[d] += S * (l && m ? -1 : 1);
      break;
  }
  return A;
}
const o2 = async (n, i, l) => {
  const {
      placement: o = "bottom",
      strategy: c = "absolute",
      middleware: f = [],
      platform: d,
    } = l,
    p = f.filter(Boolean),
    h = await (d.isRTL == null ? void 0 : d.isRTL(i));
  let m = await d.getElementRects({ reference: n, floating: i, strategy: c }),
    { x: v, y: g } = ly(m, o, h),
    S = o,
    A = {},
    E = 0;
  for (let O = 0; O < p.length; O++) {
    const { name: _, fn: R } = p[O],
      {
        x: X,
        y: U,
        data: Q,
        reset: Z,
      } = await R({
        x: v,
        y: g,
        initialPlacement: o,
        placement: S,
        strategy: c,
        middlewareData: A,
        rects: m,
        platform: d,
        elements: { reference: n, floating: i },
      });
    (v = X ?? v),
      (g = U ?? g),
      (A = { ...A, [_]: { ...A[_], ...Q } }),
      Z &&
        E <= 50 &&
        (E++,
        typeof Z == "object" &&
          (Z.placement && (S = Z.placement),
          Z.rects &&
            (m =
              Z.rects === !0
                ? await d.getElementRects({
                    reference: n,
                    floating: i,
                    strategy: c,
                  })
                : Z.rects),
          ({ x: v, y: g } = ly(m, S, h))),
        (O = -1));
  }
  return { x: v, y: g, placement: S, strategy: c, middlewareData: A };
};
async function jl(n, i) {
  var l;
  i === void 0 && (i = {});
  const { x: o, y: c, platform: f, rects: d, elements: p, strategy: h } = n,
    {
      boundary: m = "clippingAncestors",
      rootBoundary: v = "viewport",
      elementContext: g = "floating",
      altBoundary: S = !1,
      padding: A = 0,
    } = ea(i, n),
    E = $0(A),
    _ = p[S ? (g === "floating" ? "reference" : "floating") : g],
    R = Ar(
      await f.getClippingRect({
        element:
          (l = await (f.isElement == null ? void 0 : f.isElement(_))) == null ||
          l
            ? _
            : _.contextElement ||
              (await (f.getDocumentElement == null
                ? void 0
                : f.getDocumentElement(p.floating))),
        boundary: m,
        rootBoundary: v,
        strategy: h,
      })
    ),
    X =
      g === "floating"
        ? { x: o, y: c, width: d.floating.width, height: d.floating.height }
        : d.reference,
    U = await (f.getOffsetParent == null
      ? void 0
      : f.getOffsetParent(p.floating)),
    Q = (await (f.isElement == null ? void 0 : f.isElement(U)))
      ? (await (f.getScale == null ? void 0 : f.getScale(U))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    Z = Ar(
      f.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await f.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: p,
            rect: X,
            offsetParent: U,
            strategy: h,
          })
        : X
    );
  return {
    top: (R.top - Z.top + E.top) / Q.y,
    bottom: (Z.bottom - R.bottom + E.bottom) / Q.y,
    left: (R.left - Z.left + E.left) / Q.x,
    right: (Z.right - R.right + E.right) / Q.x,
  };
}
const r2 = (n) => ({
    name: "arrow",
    options: n,
    async fn(i) {
      const {
          x: l,
          y: o,
          placement: c,
          rects: f,
          platform: d,
          elements: p,
          middlewareData: h,
        } = i,
        { element: m, padding: v = 0 } = ea(n, i) || {};
      if (m == null) return {};
      const g = $0(v),
        S = { x: l, y: o },
        A = ud(c),
        E = cd(A),
        O = await d.getDimensions(m),
        _ = A === "y",
        R = _ ? "top" : "left",
        X = _ ? "bottom" : "right",
        U = _ ? "clientHeight" : "clientWidth",
        Q = f.reference[E] + f.reference[A] - S[A] - f.floating[E],
        Z = S[A] - f.reference[A],
        $ = await (d.getOffsetParent == null ? void 0 : d.getOffsetParent(m));
      let K = $ ? $[U] : 0;
      (!K || !(await (d.isElement == null ? void 0 : d.isElement($)))) &&
        (K = p.floating[U] || f.floating[E]);
      const F = Q / 2 - Z / 2,
        ot = K / 2 - O[E] / 2 - 1,
        ft = _a(g[R], ot),
        At = _a(g[X], ot),
        pt = ft,
        yt = K - O[E] - At,
        vt = K / 2 - O[E] / 2 + F,
        bt = jf(pt, vt, yt),
        C =
          !h.arrow &&
          vs(c) != null &&
          vt !== bt &&
          f.reference[E] / 2 - (vt < pt ? ft : At) - O[E] / 2 < 0,
        B = C ? (vt < pt ? vt - pt : vt - yt) : 0;
      return {
        [A]: S[A] + B,
        data: {
          [A]: bt,
          centerOffset: vt - bt - B,
          ...(C && { alignmentOffset: B }),
        },
        reset: C,
      };
    },
  }),
  c2 = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "flip",
        options: n,
        async fn(i) {
          var l, o;
          const {
              placement: c,
              middlewareData: f,
              rects: d,
              initialPlacement: p,
              platform: h,
              elements: m,
            } = i,
            {
              mainAxis: v = !0,
              crossAxis: g = !0,
              fallbackPlacements: S,
              fallbackStrategy: A = "bestFit",
              fallbackAxisSideDirection: E = "none",
              flipAlignment: O = !0,
              ..._
            } = ea(n, i);
          if ((l = f.arrow) != null && l.alignmentOffset) return {};
          const R = na(c),
            X = Dn(p),
            U = na(p) === p,
            Q = await (h.isRTL == null ? void 0 : h.isRTL(m.floating)),
            Z = S || (U || !O ? [Sr(p)] : e2(p)),
            $ = E !== "none";
          !S && $ && Z.push(...s2(p, O, E, Q));
          const K = [p, ...Z],
            F = await jl(i, _),
            ot = [];
          let ft = ((o = f.flip) == null ? void 0 : o.overflows) || [];
          if ((v && ot.push(F[R]), g)) {
            const vt = t2(c, d, Q);
            ot.push(F[vt[0]], F[vt[1]]);
          }
          if (
            ((ft = [...ft, { placement: c, overflows: ot }]),
            !ot.every((vt) => vt <= 0))
          ) {
            var At, pt;
            const vt = (((At = f.flip) == null ? void 0 : At.index) || 0) + 1,
              bt = K[vt];
            if (
              bt &&
              (!(g === "alignment" ? X !== Dn(bt) : !1) ||
                ft.every((z) =>
                  Dn(z.placement) === X ? z.overflows[0] > 0 : !0
                ))
            )
              return {
                data: { index: vt, overflows: ft },
                reset: { placement: bt },
              };
            let C =
              (pt = ft
                .filter((B) => B.overflows[0] <= 0)
                .sort((B, z) => B.overflows[1] - z.overflows[1])[0]) == null
                ? void 0
                : pt.placement;
            if (!C)
              switch (A) {
                case "bestFit": {
                  var yt;
                  const B =
                    (yt = ft
                      .filter((z) => {
                        if ($) {
                          const et = Dn(z.placement);
                          return et === X || et === "y";
                        }
                        return !0;
                      })
                      .map((z) => [
                        z.placement,
                        z.overflows
                          .filter((et) => et > 0)
                          .reduce((et, lt) => et + lt, 0),
                      ])
                      .sort((z, et) => z[1] - et[1])[0]) == null
                      ? void 0
                      : yt[0];
                  B && (C = B);
                  break;
                }
                case "initialPlacement":
                  C = p;
                  break;
              }
            if (c !== C) return { reset: { placement: C } };
          }
          return {};
        },
      }
    );
  };
function oy(n, i) {
  return {
    top: n.top - i.height,
    right: n.right - i.width,
    bottom: n.bottom - i.height,
    left: n.left - i.width,
  };
}
function ry(n) {
  return JA.some((i) => n[i] >= 0);
}
const u2 = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "hide",
        options: n,
        async fn(i) {
          const { rects: l } = i,
            { strategy: o = "referenceHidden", ...c } = ea(n, i);
          switch (o) {
            case "referenceHidden": {
              const f = await jl(i, { ...c, elementContext: "reference" }),
                d = oy(f, l.reference);
              return {
                data: { referenceHiddenOffsets: d, referenceHidden: ry(d) },
              };
            }
            case "escaped": {
              const f = await jl(i, { ...c, altBoundary: !0 }),
                d = oy(f, l.floating);
              return { data: { escapedOffsets: d, escaped: ry(d) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  I0 = new Set(["left", "top"]);
async function f2(n, i) {
  const { placement: l, platform: o, elements: c } = n,
    f = await (o.isRTL == null ? void 0 : o.isRTL(c.floating)),
    d = na(l),
    p = vs(l),
    h = Dn(l) === "y",
    m = I0.has(d) ? -1 : 1,
    v = f && h ? -1 : 1,
    g = ea(i, n);
  let {
    mainAxis: S,
    crossAxis: A,
    alignmentAxis: E,
  } = typeof g == "number"
    ? { mainAxis: g, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: g.mainAxis || 0,
        crossAxis: g.crossAxis || 0,
        alignmentAxis: g.alignmentAxis,
      };
  return (
    p && typeof E == "number" && (A = p === "end" ? E * -1 : E),
    h ? { x: A * v, y: S * m } : { x: S * m, y: A * v }
  );
}
const d2 = function (n) {
    return (
      n === void 0 && (n = 0),
      {
        name: "offset",
        options: n,
        async fn(i) {
          var l, o;
          const { x: c, y: f, placement: d, middlewareData: p } = i,
            h = await f2(i, n);
          return d === ((l = p.offset) == null ? void 0 : l.placement) &&
            (o = p.arrow) != null &&
            o.alignmentOffset
            ? {}
            : { x: c + h.x, y: f + h.y, data: { ...h, placement: d } };
        },
      }
    );
  },
  m2 = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "shift",
        options: n,
        async fn(i) {
          const { x: l, y: o, placement: c } = i,
            {
              mainAxis: f = !0,
              crossAxis: d = !1,
              limiter: p = {
                fn: (_) => {
                  let { x: R, y: X } = _;
                  return { x: R, y: X };
                },
              },
              ...h
            } = ea(n, i),
            m = { x: l, y: o },
            v = await jl(i, h),
            g = Dn(na(c)),
            S = rd(g);
          let A = m[S],
            E = m[g];
          if (f) {
            const _ = S === "y" ? "top" : "left",
              R = S === "y" ? "bottom" : "right",
              X = A + v[_],
              U = A - v[R];
            A = jf(X, A, U);
          }
          if (d) {
            const _ = g === "y" ? "top" : "left",
              R = g === "y" ? "bottom" : "right",
              X = E + v[_],
              U = E - v[R];
            E = jf(X, E, U);
          }
          const O = p.fn({ ...i, [S]: A, [g]: E });
          return {
            ...O,
            data: { x: O.x - l, y: O.y - o, enabled: { [S]: f, [g]: d } },
          };
        },
      }
    );
  },
  h2 = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        options: n,
        fn(i) {
          const { x: l, y: o, placement: c, rects: f, middlewareData: d } = i,
            { offset: p = 0, mainAxis: h = !0, crossAxis: m = !0 } = ea(n, i),
            v = { x: l, y: o },
            g = Dn(c),
            S = rd(g);
          let A = v[S],
            E = v[g];
          const O = ea(p, i),
            _ =
              typeof O == "number"
                ? { mainAxis: O, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...O };
          if (h) {
            const U = S === "y" ? "height" : "width",
              Q = f.reference[S] - f.floating[U] + _.mainAxis,
              Z = f.reference[S] + f.reference[U] - _.mainAxis;
            A < Q ? (A = Q) : A > Z && (A = Z);
          }
          if (m) {
            var R, X;
            const U = S === "y" ? "width" : "height",
              Q = I0.has(na(c)),
              Z =
                f.reference[g] -
                f.floating[U] +
                ((Q && ((R = d.offset) == null ? void 0 : R[g])) || 0) +
                (Q ? 0 : _.crossAxis),
              $ =
                f.reference[g] +
                f.reference[U] +
                (Q ? 0 : ((X = d.offset) == null ? void 0 : X[g]) || 0) -
                (Q ? _.crossAxis : 0);
            E < Z ? (E = Z) : E > $ && (E = $);
          }
          return { [S]: A, [g]: E };
        },
      }
    );
  },
  p2 = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "size",
        options: n,
        async fn(i) {
          var l, o;
          const { placement: c, rects: f, platform: d, elements: p } = i,
            { apply: h = () => {}, ...m } = ea(n, i),
            v = await jl(i, m),
            g = na(c),
            S = vs(c),
            A = Dn(c) === "y",
            { width: E, height: O } = f.floating;
          let _, R;
          g === "top" || g === "bottom"
            ? ((_ = g),
              (R =
                S ===
                ((await (d.isRTL == null ? void 0 : d.isRTL(p.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((R = g), (_ = S === "end" ? "top" : "bottom"));
          const X = O - v.top - v.bottom,
            U = E - v.left - v.right,
            Q = _a(O - v[_], X),
            Z = _a(E - v[R], U),
            $ = !i.middlewareData.shift;
          let K = Q,
            F = Z;
          if (
            ((l = i.middlewareData.shift) != null && l.enabled.x && (F = U),
            (o = i.middlewareData.shift) != null && o.enabled.y && (K = X),
            $ && !S)
          ) {
            const ft = Ze(v.left, 0),
              At = Ze(v.right, 0),
              pt = Ze(v.top, 0),
              yt = Ze(v.bottom, 0);
            A
              ? (F =
                  E -
                  2 * (ft !== 0 || At !== 0 ? ft + At : Ze(v.left, v.right)))
              : (K =
                  O -
                  2 * (pt !== 0 || yt !== 0 ? pt + yt : Ze(v.top, v.bottom)));
          }
          await h({ ...i, availableWidth: F, availableHeight: K });
          const ot = await d.getDimensions(p.floating);
          return E !== ot.width || O !== ot.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function Rr() {
  return typeof window < "u";
}
function xs(n) {
  return W0(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function Qe(n) {
  var i;
  return (
    (n == null || (i = n.ownerDocument) == null ? void 0 : i.defaultView) ||
    window
  );
}
function jn(n) {
  var i;
  return (i = (W0(n) ? n.ownerDocument : n.document) || window.document) == null
    ? void 0
    : i.documentElement;
}
function W0(n) {
  return Rr() ? n instanceof Node || n instanceof Qe(n).Node : !1;
}
function vn(n) {
  return Rr() ? n instanceof Element || n instanceof Qe(n).Element : !1;
}
function Rn(n) {
  return Rr() ? n instanceof HTMLElement || n instanceof Qe(n).HTMLElement : !1;
}
function cy(n) {
  return !Rr() || typeof ShadowRoot > "u"
    ? !1
    : n instanceof ShadowRoot || n instanceof Qe(n).ShadowRoot;
}
const g2 = new Set(["inline", "contents"]);
function kl(n) {
  const { overflow: i, overflowX: l, overflowY: o, display: c } = xn(n);
  return /auto|scroll|overlay|hidden|clip/.test(i + o + l) && !g2.has(c);
}
const y2 = new Set(["table", "td", "th"]);
function v2(n) {
  return y2.has(xs(n));
}
const x2 = [":popover-open", ":modal"];
function jr(n) {
  return x2.some((i) => {
    try {
      return n.matches(i);
    } catch {
      return !1;
    }
  });
}
const b2 = ["transform", "translate", "scale", "rotate", "perspective"],
  S2 = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  A2 = ["paint", "layout", "strict", "content"];
function fd(n) {
  const i = dd(),
    l = vn(n) ? xn(n) : n;
  return (
    b2.some((o) => (l[o] ? l[o] !== "none" : !1)) ||
    (l.containerType ? l.containerType !== "normal" : !1) ||
    (!i && (l.backdropFilter ? l.backdropFilter !== "none" : !1)) ||
    (!i && (l.filter ? l.filter !== "none" : !1)) ||
    S2.some((o) => (l.willChange || "").includes(o)) ||
    A2.some((o) => (l.contain || "").includes(o))
  );
}
function w2(n) {
  let i = za(n);
  for (; Rn(i) && !hs(i); ) {
    if (fd(i)) return i;
    if (jr(i)) return null;
    i = za(i);
  }
  return null;
}
function dd() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
const E2 = new Set(["html", "body", "#document"]);
function hs(n) {
  return E2.has(xs(n));
}
function xn(n) {
  return Qe(n).getComputedStyle(n);
}
function Hr(n) {
  return vn(n)
    ? { scrollLeft: n.scrollLeft, scrollTop: n.scrollTop }
    : { scrollLeft: n.scrollX, scrollTop: n.scrollY };
}
function za(n) {
  if (xs(n) === "html") return n;
  const i = n.assignedSlot || n.parentNode || (cy(n) && n.host) || jn(n);
  return cy(i) ? i.host : i;
}
function tv(n) {
  const i = za(n);
  return hs(i)
    ? n.ownerDocument
      ? n.ownerDocument.body
      : n.body
    : Rn(i) && kl(i)
    ? i
    : tv(i);
}
function Hl(n, i, l) {
  var o;
  i === void 0 && (i = []), l === void 0 && (l = !0);
  const c = tv(n),
    f = c === ((o = n.ownerDocument) == null ? void 0 : o.body),
    d = Qe(c);
  if (f) {
    const p = _f(d);
    return i.concat(
      d,
      d.visualViewport || [],
      kl(c) ? c : [],
      p && l ? Hl(p) : []
    );
  }
  return i.concat(c, Hl(c, [], l));
}
function _f(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function ev(n) {
  const i = xn(n);
  let l = parseFloat(i.width) || 0,
    o = parseFloat(i.height) || 0;
  const c = Rn(n),
    f = c ? n.offsetWidth : l,
    d = c ? n.offsetHeight : o,
    p = br(l) !== f || br(o) !== d;
  return p && ((l = f), (o = d)), { width: l, height: o, $: p };
}
function md(n) {
  return vn(n) ? n : n.contextElement;
}
function ds(n) {
  const i = md(n);
  if (!Rn(i)) return Cn(1);
  const l = i.getBoundingClientRect(),
    { width: o, height: c, $: f } = ev(i);
  let d = (f ? br(l.width) : l.width) / o,
    p = (f ? br(l.height) : l.height) / c;
  return (
    (!d || !Number.isFinite(d)) && (d = 1),
    (!p || !Number.isFinite(p)) && (p = 1),
    { x: d, y: p }
  );
}
const T2 = Cn(0);
function nv(n) {
  const i = Qe(n);
  return !dd() || !i.visualViewport
    ? T2
    : { x: i.visualViewport.offsetLeft, y: i.visualViewport.offsetTop };
}
function N2(n, i, l) {
  return i === void 0 && (i = !1), !l || (i && l !== Qe(n)) ? !1 : i;
}
function pi(n, i, l, o) {
  i === void 0 && (i = !1), l === void 0 && (l = !1);
  const c = n.getBoundingClientRect(),
    f = md(n);
  let d = Cn(1);
  i && (o ? vn(o) && (d = ds(o)) : (d = ds(n)));
  const p = N2(f, l, o) ? nv(f) : Cn(0);
  let h = (c.left + p.x) / d.x,
    m = (c.top + p.y) / d.y,
    v = c.width / d.x,
    g = c.height / d.y;
  if (f) {
    const S = Qe(f),
      A = o && vn(o) ? Qe(o) : o;
    let E = S,
      O = _f(E);
    for (; O && o && A !== E; ) {
      const _ = ds(O),
        R = O.getBoundingClientRect(),
        X = xn(O),
        U = R.left + (O.clientLeft + parseFloat(X.paddingLeft)) * _.x,
        Q = R.top + (O.clientTop + parseFloat(X.paddingTop)) * _.y;
      (h *= _.x),
        (m *= _.y),
        (v *= _.x),
        (g *= _.y),
        (h += U),
        (m += Q),
        (E = Qe(O)),
        (O = _f(E));
    }
  }
  return Ar({ width: v, height: g, x: h, y: m });
}
function _r(n, i) {
  const l = Hr(n).scrollLeft;
  return i ? i.left + l : pi(jn(n)).left + l;
}
function av(n, i) {
  const l = n.getBoundingClientRect(),
    o = l.left + i.scrollLeft - _r(n, l),
    c = l.top + i.scrollTop;
  return { x: o, y: c };
}
function D2(n) {
  let { elements: i, rect: l, offsetParent: o, strategy: c } = n;
  const f = c === "fixed",
    d = jn(o),
    p = i ? jr(i.floating) : !1;
  if (o === d || (p && f)) return l;
  let h = { scrollLeft: 0, scrollTop: 0 },
    m = Cn(1);
  const v = Cn(0),
    g = Rn(o);
  if (
    (g || (!g && !f)) &&
    ((xs(o) !== "body" || kl(d)) && (h = Hr(o)), Rn(o))
  ) {
    const A = pi(o);
    (m = ds(o)), (v.x = A.x + o.clientLeft), (v.y = A.y + o.clientTop);
  }
  const S = d && !g && !f ? av(d, h) : Cn(0);
  return {
    width: l.width * m.x,
    height: l.height * m.y,
    x: l.x * m.x - h.scrollLeft * m.x + v.x + S.x,
    y: l.y * m.y - h.scrollTop * m.y + v.y + S.y,
  };
}
function C2(n) {
  return Array.from(n.getClientRects());
}
function M2(n) {
  const i = jn(n),
    l = Hr(n),
    o = n.ownerDocument.body,
    c = Ze(i.scrollWidth, i.clientWidth, o.scrollWidth, o.clientWidth),
    f = Ze(i.scrollHeight, i.clientHeight, o.scrollHeight, o.clientHeight);
  let d = -l.scrollLeft + _r(n);
  const p = -l.scrollTop;
  return (
    xn(o).direction === "rtl" && (d += Ze(i.clientWidth, o.clientWidth) - c),
    { width: c, height: f, x: d, y: p }
  );
}
const uy = 25;
function O2(n, i) {
  const l = Qe(n),
    o = jn(n),
    c = l.visualViewport;
  let f = o.clientWidth,
    d = o.clientHeight,
    p = 0,
    h = 0;
  if (c) {
    (f = c.width), (d = c.height);
    const v = dd();
    (!v || (v && i === "fixed")) && ((p = c.offsetLeft), (h = c.offsetTop));
  }
  const m = _r(o);
  if (m <= 0) {
    const v = o.ownerDocument,
      g = v.body,
      S = getComputedStyle(g),
      A =
        (v.compatMode === "CSS1Compat" &&
          parseFloat(S.marginLeft) + parseFloat(S.marginRight)) ||
        0,
      E = Math.abs(o.clientWidth - g.clientWidth - A);
    E <= uy && (f -= E);
  } else m <= uy && (f += m);
  return { width: f, height: d, x: p, y: h };
}
const R2 = new Set(["absolute", "fixed"]);
function j2(n, i) {
  const l = pi(n, !0, i === "fixed"),
    o = l.top + n.clientTop,
    c = l.left + n.clientLeft,
    f = Rn(n) ? ds(n) : Cn(1),
    d = n.clientWidth * f.x,
    p = n.clientHeight * f.y,
    h = c * f.x,
    m = o * f.y;
  return { width: d, height: p, x: h, y: m };
}
function fy(n, i, l) {
  let o;
  if (i === "viewport") o = O2(n, l);
  else if (i === "document") o = M2(jn(n));
  else if (vn(i)) o = j2(i, l);
  else {
    const c = nv(n);
    o = { x: i.x - c.x, y: i.y - c.y, width: i.width, height: i.height };
  }
  return Ar(o);
}
function iv(n, i) {
  const l = za(n);
  return l === i || !vn(l) || hs(l)
    ? !1
    : xn(l).position === "fixed" || iv(l, i);
}
function H2(n, i) {
  const l = i.get(n);
  if (l) return l;
  let o = Hl(n, [], !1).filter((p) => vn(p) && xs(p) !== "body"),
    c = null;
  const f = xn(n).position === "fixed";
  let d = f ? za(n) : n;
  for (; vn(d) && !hs(d); ) {
    const p = xn(d),
      h = fd(d);
    !h && p.position === "fixed" && (c = null),
      (
        f
          ? !h && !c
          : (!h && p.position === "static" && !!c && R2.has(c.position)) ||
            (kl(d) && !h && iv(n, d))
      )
        ? (o = o.filter((v) => v !== d))
        : (c = p),
      (d = za(d));
  }
  return i.set(n, o), o;
}
function _2(n) {
  let { element: i, boundary: l, rootBoundary: o, strategy: c } = n;
  const d = [
      ...(l === "clippingAncestors"
        ? jr(i)
          ? []
          : H2(i, this._c)
        : [].concat(l)),
      o,
    ],
    p = d[0],
    h = d.reduce((m, v) => {
      const g = fy(i, v, c);
      return (
        (m.top = Ze(g.top, m.top)),
        (m.right = _a(g.right, m.right)),
        (m.bottom = _a(g.bottom, m.bottom)),
        (m.left = Ze(g.left, m.left)),
        m
      );
    }, fy(i, p, c));
  return {
    width: h.right - h.left,
    height: h.bottom - h.top,
    x: h.left,
    y: h.top,
  };
}
function z2(n) {
  const { width: i, height: l } = ev(n);
  return { width: i, height: l };
}
function V2(n, i, l) {
  const o = Rn(i),
    c = jn(i),
    f = l === "fixed",
    d = pi(n, !0, f, i);
  let p = { scrollLeft: 0, scrollTop: 0 };
  const h = Cn(0);
  function m() {
    h.x = _r(c);
  }
  if (o || (!o && !f))
    if (((xs(i) !== "body" || kl(c)) && (p = Hr(i)), o)) {
      const A = pi(i, !0, f, i);
      (h.x = A.x + i.clientLeft), (h.y = A.y + i.clientTop);
    } else c && m();
  f && !o && c && m();
  const v = c && !o && !f ? av(c, p) : Cn(0),
    g = d.left + p.scrollLeft - h.x - v.x,
    S = d.top + p.scrollTop - h.y - v.y;
  return { x: g, y: S, width: d.width, height: d.height };
}
function rf(n) {
  return xn(n).position === "static";
}
function dy(n, i) {
  if (!Rn(n) || xn(n).position === "fixed") return null;
  if (i) return i(n);
  let l = n.offsetParent;
  return jn(n) === l && (l = l.ownerDocument.body), l;
}
function sv(n, i) {
  const l = Qe(n);
  if (jr(n)) return l;
  if (!Rn(n)) {
    let c = za(n);
    for (; c && !hs(c); ) {
      if (vn(c) && !rf(c)) return c;
      c = za(c);
    }
    return l;
  }
  let o = dy(n, i);
  for (; o && v2(o) && rf(o); ) o = dy(o, i);
  return o && hs(o) && rf(o) && !fd(o) ? l : o || w2(n) || l;
}
const L2 = async function (n) {
  const i = this.getOffsetParent || sv,
    l = this.getDimensions,
    o = await l(n.floating);
  return {
    reference: V2(n.reference, await i(n.floating), n.strategy),
    floating: { x: 0, y: 0, width: o.width, height: o.height },
  };
};
function B2(n) {
  return xn(n).direction === "rtl";
}
const U2 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: D2,
  getDocumentElement: jn,
  getClippingRect: _2,
  getOffsetParent: sv,
  getElementRects: L2,
  getClientRects: C2,
  getDimensions: z2,
  getScale: ds,
  isElement: vn,
  isRTL: B2,
};
function lv(n, i) {
  return (
    n.x === i.x && n.y === i.y && n.width === i.width && n.height === i.height
  );
}
function k2(n, i) {
  let l = null,
    o;
  const c = jn(n);
  function f() {
    var p;
    clearTimeout(o), (p = l) == null || p.disconnect(), (l = null);
  }
  function d(p, h) {
    p === void 0 && (p = !1), h === void 0 && (h = 1), f();
    const m = n.getBoundingClientRect(),
      { left: v, top: g, width: S, height: A } = m;
    if ((p || i(), !S || !A)) return;
    const E = rr(g),
      O = rr(c.clientWidth - (v + S)),
      _ = rr(c.clientHeight - (g + A)),
      R = rr(v),
      U = {
        rootMargin: -E + "px " + -O + "px " + -_ + "px " + -R + "px",
        threshold: Ze(0, _a(1, h)) || 1,
      };
    let Q = !0;
    function Z($) {
      const K = $[0].intersectionRatio;
      if (K !== h) {
        if (!Q) return d();
        K
          ? d(!1, K)
          : (o = setTimeout(() => {
              d(!1, 1e-7);
            }, 1e3));
      }
      K === 1 && !lv(m, n.getBoundingClientRect()) && d(), (Q = !1);
    }
    try {
      l = new IntersectionObserver(Z, { ...U, root: c.ownerDocument });
    } catch {
      l = new IntersectionObserver(Z, U);
    }
    l.observe(n);
  }
  return d(!0), f;
}
function F2(n, i, l, o) {
  o === void 0 && (o = {});
  const {
      ancestorScroll: c = !0,
      ancestorResize: f = !0,
      elementResize: d = typeof ResizeObserver == "function",
      layoutShift: p = typeof IntersectionObserver == "function",
      animationFrame: h = !1,
    } = o,
    m = md(n),
    v = c || f ? [...(m ? Hl(m) : []), ...Hl(i)] : [];
  v.forEach((R) => {
    c && R.addEventListener("scroll", l, { passive: !0 }),
      f && R.addEventListener("resize", l);
  });
  const g = m && p ? k2(m, l) : null;
  let S = -1,
    A = null;
  d &&
    ((A = new ResizeObserver((R) => {
      let [X] = R;
      X &&
        X.target === m &&
        A &&
        (A.unobserve(i),
        cancelAnimationFrame(S),
        (S = requestAnimationFrame(() => {
          var U;
          (U = A) == null || U.observe(i);
        }))),
        l();
    })),
    m && !h && A.observe(m),
    A.observe(i));
  let E,
    O = h ? pi(n) : null;
  h && _();
  function _() {
    const R = pi(n);
    O && !lv(O, R) && l(), (O = R), (E = requestAnimationFrame(_));
  }
  return (
    l(),
    () => {
      var R;
      v.forEach((X) => {
        c && X.removeEventListener("scroll", l),
          f && X.removeEventListener("resize", l);
      }),
        g?.(),
        (R = A) == null || R.disconnect(),
        (A = null),
        h && cancelAnimationFrame(E);
    }
  );
}
const Y2 = d2,
  q2 = m2,
  G2 = c2,
  X2 = p2,
  P2 = u2,
  my = r2,
  K2 = h2,
  Z2 = (n, i, l) => {
    const o = new Map(),
      c = { platform: U2, ...l },
      f = { ...c.platform, _c: o };
    return o2(n, i, { ...c, platform: f });
  };
var Q2 = typeof document < "u",
  J2 = function () {},
  pr = Q2 ? D.useLayoutEffect : J2;
function wr(n, i) {
  if (n === i) return !0;
  if (typeof n != typeof i) return !1;
  if (typeof n == "function" && n.toString() === i.toString()) return !0;
  let l, o, c;
  if (n && i && typeof n == "object") {
    if (Array.isArray(n)) {
      if (((l = n.length), l !== i.length)) return !1;
      for (o = l; o-- !== 0; ) if (!wr(n[o], i[o])) return !1;
      return !0;
    }
    if (((c = Object.keys(n)), (l = c.length), l !== Object.keys(i).length))
      return !1;
    for (o = l; o-- !== 0; ) if (!{}.hasOwnProperty.call(i, c[o])) return !1;
    for (o = l; o-- !== 0; ) {
      const f = c[o];
      if (!(f === "_owner" && n.$$typeof) && !wr(n[f], i[f])) return !1;
    }
    return !0;
  }
  return n !== n && i !== i;
}
function ov(n) {
  return typeof window > "u"
    ? 1
    : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function hy(n, i) {
  const l = ov(n);
  return Math.round(i * l) / l;
}
function cf(n) {
  const i = D.useRef(n);
  return (
    pr(() => {
      i.current = n;
    }),
    i
  );
}
function $2(n) {
  n === void 0 && (n = {});
  const {
      placement: i = "bottom",
      strategy: l = "absolute",
      middleware: o = [],
      platform: c,
      elements: { reference: f, floating: d } = {},
      transform: p = !0,
      whileElementsMounted: h,
      open: m,
    } = n,
    [v, g] = D.useState({
      x: 0,
      y: 0,
      strategy: l,
      placement: i,
      middlewareData: {},
      isPositioned: !1,
    }),
    [S, A] = D.useState(o);
  wr(S, o) || A(o);
  const [E, O] = D.useState(null),
    [_, R] = D.useState(null),
    X = D.useCallback((z) => {
      z !== $.current && (($.current = z), O(z));
    }, []),
    U = D.useCallback((z) => {
      z !== K.current && ((K.current = z), R(z));
    }, []),
    Q = f || E,
    Z = d || _,
    $ = D.useRef(null),
    K = D.useRef(null),
    F = D.useRef(v),
    ot = h != null,
    ft = cf(h),
    At = cf(c),
    pt = cf(m),
    yt = D.useCallback(() => {
      if (!$.current || !K.current) return;
      const z = { placement: i, strategy: l, middleware: S };
      At.current && (z.platform = At.current),
        Z2($.current, K.current, z).then((et) => {
          const lt = { ...et, isPositioned: pt.current !== !1 };
          vt.current &&
            !wr(F.current, lt) &&
            ((F.current = lt),
            od.flushSync(() => {
              g(lt);
            }));
        });
    }, [S, i, l, At, pt]);
  pr(() => {
    m === !1 &&
      F.current.isPositioned &&
      ((F.current.isPositioned = !1), g((z) => ({ ...z, isPositioned: !1 })));
  }, [m]);
  const vt = D.useRef(!1);
  pr(
    () => (
      (vt.current = !0),
      () => {
        vt.current = !1;
      }
    ),
    []
  ),
    pr(() => {
      if ((Q && ($.current = Q), Z && (K.current = Z), Q && Z)) {
        if (ft.current) return ft.current(Q, Z, yt);
        yt();
      }
    }, [Q, Z, yt, ft, ot]);
  const bt = D.useMemo(
      () => ({ reference: $, floating: K, setReference: X, setFloating: U }),
      [X, U]
    ),
    C = D.useMemo(() => ({ reference: Q, floating: Z }), [Q, Z]),
    B = D.useMemo(() => {
      const z = { position: l, left: 0, top: 0 };
      if (!C.floating) return z;
      const et = hy(C.floating, v.x),
        lt = hy(C.floating, v.y);
      return p
        ? {
            ...z,
            transform: "translate(" + et + "px, " + lt + "px)",
            ...(ov(C.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: l, left: et, top: lt };
    }, [l, p, C.floating, v.x, v.y]);
  return D.useMemo(
    () => ({ ...v, update: yt, refs: bt, elements: C, floatingStyles: B }),
    [v, yt, bt, C, B]
  );
}
const I2 = (n) => {
    function i(l) {
      return {}.hasOwnProperty.call(l, "current");
    }
    return {
      name: "arrow",
      options: n,
      fn(l) {
        const { element: o, padding: c } = typeof n == "function" ? n(l) : n;
        return o && i(o)
          ? o.current != null
            ? my({ element: o.current, padding: c }).fn(l)
            : {}
          : o
          ? my({ element: o, padding: c }).fn(l)
          : {};
      },
    };
  },
  W2 = (n, i) => ({ ...Y2(n), options: [n, i] }),
  tw = (n, i) => ({ ...q2(n), options: [n, i] }),
  ew = (n, i) => ({ ...K2(n), options: [n, i] }),
  nw = (n, i) => ({ ...G2(n), options: [n, i] }),
  aw = (n, i) => ({ ...X2(n), options: [n, i] }),
  iw = (n, i) => ({ ...P2(n), options: [n, i] }),
  sw = (n, i) => ({ ...I2(n), options: [n, i] });
var lw = "Arrow",
  rv = D.forwardRef((n, i) => {
    const { children: l, width: o = 10, height: c = 5, ...f } = n;
    return x.jsx(yi.svg, {
      ...f,
      ref: i,
      width: o,
      height: c,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: n.asChild ? l : x.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
rv.displayName = lw;
var ow = rv;
function rw(n) {
  const [i, l] = D.useState(void 0);
  return (
    Rl(() => {
      if (n) {
        l({ width: n.offsetWidth, height: n.offsetHeight });
        const o = new ResizeObserver((c) => {
          if (!Array.isArray(c) || !c.length) return;
          const f = c[0];
          let d, p;
          if ("borderBoxSize" in f) {
            const h = f.borderBoxSize,
              m = Array.isArray(h) ? h[0] : h;
            (d = m.inlineSize), (p = m.blockSize);
          } else (d = n.offsetWidth), (p = n.offsetHeight);
          l({ width: d, height: p });
        });
        return o.observe(n, { box: "border-box" }), () => o.unobserve(n);
      } else l(void 0);
    }, [n]),
    i
  );
}
var cv = "Popper",
  [uv, fv] = X0(cv),
  [iD, dv] = uv(cv),
  mv = "PopperAnchor",
  hv = D.forwardRef((n, i) => {
    const { __scopePopper: l, virtualRef: o, ...c } = n,
      f = dv(mv, l),
      d = D.useRef(null),
      p = gi(i, d),
      h = D.useRef(null);
    return (
      D.useEffect(() => {
        const m = h.current;
        (h.current = o?.current || d.current),
          m !== h.current && f.onAnchorChange(h.current);
      }),
      o ? null : x.jsx(yi.div, { ...c, ref: p })
    );
  });
hv.displayName = mv;
var hd = "PopperContent",
  [cw, uw] = uv(hd),
  pv = D.forwardRef((n, i) => {
    const {
        __scopePopper: l,
        side: o = "bottom",
        sideOffset: c = 0,
        align: f = "center",
        alignOffset: d = 0,
        arrowPadding: p = 0,
        avoidCollisions: h = !0,
        collisionBoundary: m = [],
        collisionPadding: v = 0,
        sticky: g = "partial",
        hideWhenDetached: S = !1,
        updatePositionStrategy: A = "optimized",
        onPlaced: E,
        ...O
      } = n,
      _ = dv(hd, l),
      [R, X] = D.useState(null),
      U = gi(i, (it) => X(it)),
      [Q, Z] = D.useState(null),
      $ = rw(Q),
      K = $?.width ?? 0,
      F = $?.height ?? 0,
      ot = o + (f !== "center" ? "-" + f : ""),
      ft =
        typeof v == "number"
          ? v
          : { top: 0, right: 0, bottom: 0, left: 0, ...v },
      At = Array.isArray(m) ? m : [m],
      pt = At.length > 0,
      yt = { padding: ft, boundary: At.filter(dw), altBoundary: pt },
      {
        refs: vt,
        floatingStyles: bt,
        placement: C,
        isPositioned: B,
        middlewareData: z,
      } = $2({
        strategy: "fixed",
        placement: ot,
        whileElementsMounted: (...it) =>
          F2(...it, { animationFrame: A === "always" }),
        elements: { reference: _.anchor },
        middleware: [
          W2({ mainAxis: c + F, alignmentAxis: d }),
          h &&
            tw({
              mainAxis: !0,
              crossAxis: !1,
              limiter: g === "partial" ? ew() : void 0,
              ...yt,
            }),
          h && nw({ ...yt }),
          aw({
            ...yt,
            apply: ({
              elements: it,
              rects: mt,
              availableWidth: Ct,
              availableHeight: ue,
            }) => {
              const { width: Ae, height: fe } = mt.reference,
                Hn = it.floating.style;
              Hn.setProperty("--radix-popper-available-width", `${Ct}px`),
                Hn.setProperty("--radix-popper-available-height", `${ue}px`),
                Hn.setProperty("--radix-popper-anchor-width", `${Ae}px`),
                Hn.setProperty("--radix-popper-anchor-height", `${fe}px`);
            },
          }),
          Q && sw({ element: Q, padding: p }),
          mw({ arrowWidth: K, arrowHeight: F }),
          S && iw({ strategy: "referenceHidden", ...yt }),
        ],
      }),
      [et, lt] = vv(C),
      T = Or(E);
    Rl(() => {
      B && T?.();
    }, [B, T]);
    const q = z.arrow?.x,
      Y = z.arrow?.y,
      J = z.arrow?.centerOffset !== 0,
      [W, rt] = D.useState();
    return (
      Rl(() => {
        R && rt(window.getComputedStyle(R).zIndex);
      }, [R]),
      x.jsx("div", {
        ref: vt.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...bt,
          transform: B ? bt.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: W,
          "--radix-popper-transform-origin": [
            z.transformOrigin?.x,
            z.transformOrigin?.y,
          ].join(" "),
          ...(z.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: n.dir,
        children: x.jsx(cw, {
          scope: l,
          placedSide: et,
          onArrowChange: Z,
          arrowX: q,
          arrowY: Y,
          shouldHideArrow: J,
          children: x.jsx(yi.div, {
            "data-side": et,
            "data-align": lt,
            ...O,
            ref: U,
            style: { ...O.style, animation: B ? void 0 : "none" },
          }),
        }),
      })
    );
  });
pv.displayName = hd;
var gv = "PopperArrow",
  fw = { top: "bottom", right: "left", bottom: "top", left: "right" },
  yv = D.forwardRef(function (i, l) {
    const { __scopePopper: o, ...c } = i,
      f = uw(gv, o),
      d = fw[f.placedSide];
    return x.jsx("span", {
      ref: f.onArrowChange,
      style: {
        position: "absolute",
        left: f.arrowX,
        top: f.arrowY,
        [d]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[f.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[f.placedSide],
        visibility: f.shouldHideArrow ? "hidden" : void 0,
      },
      children: x.jsx(ow, {
        ...c,
        ref: l,
        style: { ...c.style, display: "block" },
      }),
    });
  });
yv.displayName = gv;
function dw(n) {
  return n !== null;
}
var mw = (n) => ({
  name: "transformOrigin",
  options: n,
  fn(i) {
    const { placement: l, rects: o, middlewareData: c } = i,
      d = c.arrow?.centerOffset !== 0,
      p = d ? 0 : n.arrowWidth,
      h = d ? 0 : n.arrowHeight,
      [m, v] = vv(l),
      g = { start: "0%", center: "50%", end: "100%" }[v],
      S = (c.arrow?.x ?? 0) + p / 2,
      A = (c.arrow?.y ?? 0) + h / 2;
    let E = "",
      O = "";
    return (
      m === "bottom"
        ? ((E = d ? g : `${S}px`), (O = `${-h}px`))
        : m === "top"
        ? ((E = d ? g : `${S}px`), (O = `${o.floating.height + h}px`))
        : m === "right"
        ? ((E = `${-h}px`), (O = d ? g : `${A}px`))
        : m === "left" &&
          ((E = `${o.floating.width + h}px`), (O = d ? g : `${A}px`)),
      { data: { x: E, y: O } }
    );
  },
});
function vv(n) {
  const [i, l = "center"] = n.split("-");
  return [i, l];
}
var hw = hv,
  pw = pv,
  gw = yv;
function yw(n, i) {
  return D.useReducer((l, o) => i[l][o] ?? l, n);
}
var xv = (n) => {
  const { present: i, children: l } = n,
    o = vw(i),
    c =
      typeof l == "function" ? l({ present: o.isPresent }) : D.Children.only(l),
    f = gi(o.ref, xw(c));
  return typeof l == "function" || o.isPresent
    ? D.cloneElement(c, { ref: f })
    : null;
};
xv.displayName = "Presence";
function vw(n) {
  const [i, l] = D.useState(),
    o = D.useRef(null),
    c = D.useRef(n),
    f = D.useRef("none"),
    d = n ? "mounted" : "unmounted",
    [p, h] = yw(d, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    D.useEffect(() => {
      const m = cr(o.current);
      f.current = p === "mounted" ? m : "none";
    }, [p]),
    Rl(() => {
      const m = o.current,
        v = c.current;
      if (v !== n) {
        const S = f.current,
          A = cr(m);
        n
          ? h("MOUNT")
          : A === "none" || m?.display === "none"
          ? h("UNMOUNT")
          : h(v && S !== A ? "ANIMATION_OUT" : "UNMOUNT"),
          (c.current = n);
      }
    }, [n, h]),
    Rl(() => {
      if (i) {
        let m;
        const v = i.ownerDocument.defaultView ?? window,
          g = (A) => {
            const O = cr(o.current).includes(CSS.escape(A.animationName));
            if (A.target === i && O && (h("ANIMATION_END"), !c.current)) {
              const _ = i.style.animationFillMode;
              (i.style.animationFillMode = "forwards"),
                (m = v.setTimeout(() => {
                  i.style.animationFillMode === "forwards" &&
                    (i.style.animationFillMode = _);
                }));
            }
          },
          S = (A) => {
            A.target === i && (f.current = cr(o.current));
          };
        return (
          i.addEventListener("animationstart", S),
          i.addEventListener("animationcancel", g),
          i.addEventListener("animationend", g),
          () => {
            v.clearTimeout(m),
              i.removeEventListener("animationstart", S),
              i.removeEventListener("animationcancel", g),
              i.removeEventListener("animationend", g);
          }
        );
      } else h("ANIMATION_END");
    }, [i, h]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(p),
      ref: D.useCallback((m) => {
        (o.current = m ? getComputedStyle(m) : null), l(m);
      }, []),
    }
  );
}
function cr(n) {
  return n?.animationName || "none";
}
function xw(n) {
  let i = Object.getOwnPropertyDescriptor(n.props, "ref")?.get,
    l = i && "isReactWarning" in i && i.isReactWarning;
  return l
    ? n.ref
    : ((i = Object.getOwnPropertyDescriptor(n, "ref")?.get),
      (l = i && "isReactWarning" in i && i.isReactWarning),
      l ? n.props.ref : n.props.ref || n.ref);
}
var bw = Object.freeze({
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  }),
  Sw = "VisuallyHidden",
  bv = D.forwardRef((n, i) =>
    x.jsx(yi.span, { ...n, ref: i, style: { ...bw, ...n.style } })
  );
bv.displayName = Sw;
var Aw = bv,
  [zr] = X0("Tooltip", [fv]),
  pd = fv(),
  Sv = "TooltipProvider",
  ww = 700,
  py = "tooltip.open",
  [Ew, Av] = zr(Sv),
  wv = (n) => {
    const {
        __scopeTooltip: i,
        delayDuration: l = ww,
        skipDelayDuration: o = 300,
        disableHoverableContent: c = !1,
        children: f,
      } = n,
      d = D.useRef(!0),
      p = D.useRef(!1),
      h = D.useRef(0);
    return (
      D.useEffect(() => {
        const m = h.current;
        return () => window.clearTimeout(m);
      }, []),
      x.jsx(Ew, {
        scope: i,
        isOpenDelayedRef: d,
        delayDuration: l,
        onOpen: D.useCallback(() => {
          window.clearTimeout(h.current), (d.current = !1);
        }, []),
        onClose: D.useCallback(() => {
          window.clearTimeout(h.current),
            (h.current = window.setTimeout(() => (d.current = !0), o));
        }, [o]),
        isPointerInTransitRef: p,
        onPointerInTransitChange: D.useCallback((m) => {
          p.current = m;
        }, []),
        disableHoverableContent: c,
        children: f,
      })
    );
  };
wv.displayName = Sv;
var Ev = "Tooltip",
  [sD, Vr] = zr(Ev),
  zf = "TooltipTrigger",
  Tw = D.forwardRef((n, i) => {
    const { __scopeTooltip: l, ...o } = n,
      c = Vr(zf, l),
      f = Av(zf, l),
      d = pd(l),
      p = D.useRef(null),
      h = gi(i, p, c.onTriggerChange),
      m = D.useRef(!1),
      v = D.useRef(!1),
      g = D.useCallback(() => (m.current = !1), []);
    return (
      D.useEffect(
        () => () => document.removeEventListener("pointerup", g),
        [g]
      ),
      x.jsx(hw, {
        asChild: !0,
        ...d,
        children: x.jsx(yi.button, {
          "aria-describedby": c.open ? c.contentId : void 0,
          "data-state": c.stateAttribute,
          ...o,
          ref: h,
          onPointerMove: ta(n.onPointerMove, (S) => {
            S.pointerType !== "touch" &&
              !v.current &&
              !f.isPointerInTransitRef.current &&
              (c.onTriggerEnter(), (v.current = !0));
          }),
          onPointerLeave: ta(n.onPointerLeave, () => {
            c.onTriggerLeave(), (v.current = !1);
          }),
          onPointerDown: ta(n.onPointerDown, () => {
            c.open && c.onClose(),
              (m.current = !0),
              document.addEventListener("pointerup", g, { once: !0 });
          }),
          onFocus: ta(n.onFocus, () => {
            m.current || c.onOpen();
          }),
          onBlur: ta(n.onBlur, c.onClose),
          onClick: ta(n.onClick, c.onClose),
        }),
      })
    );
  });
Tw.displayName = zf;
var Nw = "TooltipPortal",
  [lD, Dw] = zr(Nw, { forceMount: void 0 }),
  ps = "TooltipContent",
  Cw = D.forwardRef((n, i) => {
    const l = Dw(ps, n.__scopeTooltip),
      { forceMount: o = l.forceMount, side: c = "top", ...f } = n,
      d = Vr(ps, n.__scopeTooltip);
    return x.jsx(xv, {
      present: o || d.open,
      children: d.disableHoverableContent
        ? x.jsx(Tv, { side: c, ...f, ref: i })
        : x.jsx(Mw, { side: c, ...f, ref: i }),
    });
  }),
  Mw = D.forwardRef((n, i) => {
    const l = Vr(ps, n.__scopeTooltip),
      o = Av(ps, n.__scopeTooltip),
      c = D.useRef(null),
      f = gi(i, c),
      [d, p] = D.useState(null),
      { trigger: h, onClose: m } = l,
      v = c.current,
      { onPointerInTransitChange: g } = o,
      S = D.useCallback(() => {
        p(null), g(!1);
      }, [g]),
      A = D.useCallback(
        (E, O) => {
          const _ = E.currentTarget,
            R = { x: E.clientX, y: E.clientY },
            X = _w(R, _.getBoundingClientRect()),
            U = zw(R, X),
            Q = Vw(O.getBoundingClientRect()),
            Z = Bw([...U, ...Q]);
          p(Z), g(!0);
        },
        [g]
      );
    return (
      D.useEffect(() => () => S(), [S]),
      D.useEffect(() => {
        if (h && v) {
          const E = (_) => A(_, v),
            O = (_) => A(_, h);
          return (
            h.addEventListener("pointerleave", E),
            v.addEventListener("pointerleave", O),
            () => {
              h.removeEventListener("pointerleave", E),
                v.removeEventListener("pointerleave", O);
            }
          );
        }
      }, [h, v, A, S]),
      D.useEffect(() => {
        if (d) {
          const E = (O) => {
            const _ = O.target,
              R = { x: O.clientX, y: O.clientY },
              X = h?.contains(_) || v?.contains(_),
              U = !Lw(R, d);
            X ? S() : U && (S(), m());
          };
          return (
            document.addEventListener("pointermove", E),
            () => document.removeEventListener("pointermove", E)
          );
        }
      }, [h, v, d, m, S]),
      x.jsx(Tv, { ...n, ref: f })
    );
  }),
  [Ow, Rw] = zr(Ev, { isInside: !1 }),
  jw = VA("TooltipContent"),
  Tv = D.forwardRef((n, i) => {
    const {
        __scopeTooltip: l,
        children: o,
        "aria-label": c,
        onEscapeKeyDown: f,
        onPointerDownOutside: d,
        ...p
      } = n,
      h = Vr(ps, l),
      m = pd(l),
      { onClose: v } = h;
    return (
      D.useEffect(
        () => (
          document.addEventListener(py, v),
          () => document.removeEventListener(py, v)
        ),
        [v]
      ),
      D.useEffect(() => {
        if (h.trigger) {
          const g = (S) => {
            S.target?.contains(h.trigger) && v();
          };
          return (
            window.addEventListener("scroll", g, { capture: !0 }),
            () => window.removeEventListener("scroll", g, { capture: !0 })
          );
        }
      }, [h.trigger, v]),
      x.jsx(Q0, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: f,
        onPointerDownOutside: d,
        onFocusOutside: (g) => g.preventDefault(),
        onDismiss: v,
        children: x.jsxs(pw, {
          "data-state": h.stateAttribute,
          ...m,
          ...p,
          ref: i,
          style: {
            ...p.style,
            "--radix-tooltip-content-transform-origin":
              "var(--radix-popper-transform-origin)",
            "--radix-tooltip-content-available-width":
              "var(--radix-popper-available-width)",
            "--radix-tooltip-content-available-height":
              "var(--radix-popper-available-height)",
            "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-tooltip-trigger-height":
              "var(--radix-popper-anchor-height)",
          },
          children: [
            x.jsx(jw, { children: o }),
            x.jsx(Ow, {
              scope: l,
              isInside: !0,
              children: x.jsx(Aw, {
                id: h.contentId,
                role: "tooltip",
                children: c || o,
              }),
            }),
          ],
        }),
      })
    );
  });
Cw.displayName = ps;
var Nv = "TooltipArrow",
  Hw = D.forwardRef((n, i) => {
    const { __scopeTooltip: l, ...o } = n,
      c = pd(l);
    return Rw(Nv, l).isInside ? null : x.jsx(gw, { ...c, ...o, ref: i });
  });
Hw.displayName = Nv;
function _w(n, i) {
  const l = Math.abs(i.top - n.y),
    o = Math.abs(i.bottom - n.y),
    c = Math.abs(i.right - n.x),
    f = Math.abs(i.left - n.x);
  switch (Math.min(l, o, c, f)) {
    case f:
      return "left";
    case c:
      return "right";
    case l:
      return "top";
    case o:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function zw(n, i, l = 5) {
  const o = [];
  switch (i) {
    case "top":
      o.push({ x: n.x - l, y: n.y + l }, { x: n.x + l, y: n.y + l });
      break;
    case "bottom":
      o.push({ x: n.x - l, y: n.y - l }, { x: n.x + l, y: n.y - l });
      break;
    case "left":
      o.push({ x: n.x + l, y: n.y - l }, { x: n.x + l, y: n.y + l });
      break;
    case "right":
      o.push({ x: n.x - l, y: n.y - l }, { x: n.x - l, y: n.y + l });
      break;
  }
  return o;
}
function Vw(n) {
  const { top: i, right: l, bottom: o, left: c } = n;
  return [
    { x: c, y: i },
    { x: l, y: i },
    { x: l, y: o },
    { x: c, y: o },
  ];
}
function Lw(n, i) {
  const { x: l, y: o } = n;
  let c = !1;
  for (let f = 0, d = i.length - 1; f < i.length; d = f++) {
    const p = i[f],
      h = i[d],
      m = p.x,
      v = p.y,
      g = h.x,
      S = h.y;
    v > o != S > o && l < ((g - m) * (o - v)) / (S - v) + m && (c = !c);
  }
  return c;
}
function Bw(n) {
  const i = n.slice();
  return (
    i.sort((l, o) =>
      l.x < o.x ? -1 : l.x > o.x ? 1 : l.y < o.y ? -1 : l.y > o.y ? 1 : 0
    ),
    Uw(i)
  );
}
function Uw(n) {
  if (n.length <= 1) return n.slice();
  const i = [];
  for (let o = 0; o < n.length; o++) {
    const c = n[o];
    for (; i.length >= 2; ) {
      const f = i[i.length - 1],
        d = i[i.length - 2];
      if ((f.x - d.x) * (c.y - d.y) >= (f.y - d.y) * (c.x - d.x)) i.pop();
      else break;
    }
    i.push(c);
  }
  i.pop();
  const l = [];
  for (let o = n.length - 1; o >= 0; o--) {
    const c = n[o];
    for (; l.length >= 2; ) {
      const f = l[l.length - 1],
        d = l[l.length - 2];
      if ((f.x - d.x) * (c.y - d.y) >= (f.y - d.y) * (c.x - d.x)) l.pop();
      else break;
    }
    l.push(c);
  }
  return (
    l.pop(),
    i.length === 1 && l.length === 1 && i[0].x === l[0].x && i[0].y === l[0].y
      ? i
      : i.concat(l)
  );
}
var kw = wv;
function Dv(n) {
  var i,
    l,
    o = "";
  if (typeof n == "string" || typeof n == "number") o += n;
  else if (typeof n == "object")
    if (Array.isArray(n)) {
      var c = n.length;
      for (i = 0; i < c; i++)
        n[i] && (l = Dv(n[i])) && (o && (o += " "), (o += l));
    } else for (l in n) n[l] && (o && (o += " "), (o += l));
  return o;
}
function Cv() {
  for (var n, i, l = 0, o = "", c = arguments.length; l < c; l++)
    (n = arguments[l]) && (i = Dv(n)) && (o && (o += " "), (o += i));
  return o;
}
const gd = "-",
  Fw = (n) => {
    const i = qw(n),
      { conflictingClassGroups: l, conflictingClassGroupModifiers: o } = n;
    return {
      getClassGroupId: (d) => {
        const p = d.split(gd);
        return p[0] === "" && p.length !== 1 && p.shift(), Mv(p, i) || Yw(d);
      },
      getConflictingClassGroupIds: (d, p) => {
        const h = l[d] || [];
        return p && o[d] ? [...h, ...o[d]] : h;
      },
    };
  },
  Mv = (n, i) => {
    if (n.length === 0) return i.classGroupId;
    const l = n[0],
      o = i.nextPart.get(l),
      c = o ? Mv(n.slice(1), o) : void 0;
    if (c) return c;
    if (i.validators.length === 0) return;
    const f = n.join(gd);
    return i.validators.find(({ validator: d }) => d(f))?.classGroupId;
  },
  gy = /^\[(.+)\]$/,
  Yw = (n) => {
    if (gy.test(n)) {
      const i = gy.exec(n)[1],
        l = i?.substring(0, i.indexOf(":"));
      if (l) return "arbitrary.." + l;
    }
  },
  qw = (n) => {
    const { theme: i, classGroups: l } = n,
      o = { nextPart: new Map(), validators: [] };
    for (const c in l) Vf(l[c], o, c, i);
    return o;
  },
  Vf = (n, i, l, o) => {
    n.forEach((c) => {
      if (typeof c == "string") {
        const f = c === "" ? i : yy(i, c);
        f.classGroupId = l;
        return;
      }
      if (typeof c == "function") {
        if (Gw(c)) {
          Vf(c(o), i, l, o);
          return;
        }
        i.validators.push({ validator: c, classGroupId: l });
        return;
      }
      Object.entries(c).forEach(([f, d]) => {
        Vf(d, yy(i, f), l, o);
      });
    });
  },
  yy = (n, i) => {
    let l = n;
    return (
      i.split(gd).forEach((o) => {
        l.nextPart.has(o) ||
          l.nextPart.set(o, { nextPart: new Map(), validators: [] }),
          (l = l.nextPart.get(o));
      }),
      l
    );
  },
  Gw = (n) => n.isThemeGetter,
  Xw = (n) => {
    if (n < 1) return { get: () => {}, set: () => {} };
    let i = 0,
      l = new Map(),
      o = new Map();
    const c = (f, d) => {
      l.set(f, d), i++, i > n && ((i = 0), (o = l), (l = new Map()));
    };
    return {
      get(f) {
        let d = l.get(f);
        if (d !== void 0) return d;
        if ((d = o.get(f)) !== void 0) return c(f, d), d;
      },
      set(f, d) {
        l.has(f) ? l.set(f, d) : c(f, d);
      },
    };
  },
  Lf = "!",
  Bf = ":",
  Pw = Bf.length,
  Kw = (n) => {
    const { prefix: i, experimentalParseClassName: l } = n;
    let o = (c) => {
      const f = [];
      let d = 0,
        p = 0,
        h = 0,
        m;
      for (let E = 0; E < c.length; E++) {
        let O = c[E];
        if (d === 0 && p === 0) {
          if (O === Bf) {
            f.push(c.slice(h, E)), (h = E + Pw);
            continue;
          }
          if (O === "/") {
            m = E;
            continue;
          }
        }
        O === "[" ? d++ : O === "]" ? d-- : O === "(" ? p++ : O === ")" && p--;
      }
      const v = f.length === 0 ? c : c.substring(h),
        g = Zw(v),
        S = g !== v,
        A = m && m > h ? m - h : void 0;
      return {
        modifiers: f,
        hasImportantModifier: S,
        baseClassName: g,
        maybePostfixModifierPosition: A,
      };
    };
    if (i) {
      const c = i + Bf,
        f = o;
      o = (d) =>
        d.startsWith(c)
          ? f(d.substring(c.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: d,
              maybePostfixModifierPosition: void 0,
            };
    }
    if (l) {
      const c = o;
      o = (f) => l({ className: f, parseClassName: c });
    }
    return o;
  },
  Zw = (n) =>
    n.endsWith(Lf)
      ? n.substring(0, n.length - 1)
      : n.startsWith(Lf)
      ? n.substring(1)
      : n,
  Qw = (n) => {
    const i = Object.fromEntries(n.orderSensitiveModifiers.map((o) => [o, !0]));
    return (o) => {
      if (o.length <= 1) return o;
      const c = [];
      let f = [];
      return (
        o.forEach((d) => {
          d[0] === "[" || i[d] ? (c.push(...f.sort(), d), (f = [])) : f.push(d);
        }),
        c.push(...f.sort()),
        c
      );
    };
  },
  Jw = (n) => ({
    cache: Xw(n.cacheSize),
    parseClassName: Kw(n),
    sortModifiers: Qw(n),
    ...Fw(n),
  }),
  $w = /\s+/,
  Iw = (n, i) => {
    const {
        parseClassName: l,
        getClassGroupId: o,
        getConflictingClassGroupIds: c,
        sortModifiers: f,
      } = i,
      d = [],
      p = n.trim().split($w);
    let h = "";
    for (let m = p.length - 1; m >= 0; m -= 1) {
      const v = p[m],
        {
          isExternal: g,
          modifiers: S,
          hasImportantModifier: A,
          baseClassName: E,
          maybePostfixModifierPosition: O,
        } = l(v);
      if (g) {
        h = v + (h.length > 0 ? " " + h : h);
        continue;
      }
      let _ = !!O,
        R = o(_ ? E.substring(0, O) : E);
      if (!R) {
        if (!_) {
          h = v + (h.length > 0 ? " " + h : h);
          continue;
        }
        if (((R = o(E)), !R)) {
          h = v + (h.length > 0 ? " " + h : h);
          continue;
        }
        _ = !1;
      }
      const X = f(S).join(":"),
        U = A ? X + Lf : X,
        Q = U + R;
      if (d.includes(Q)) continue;
      d.push(Q);
      const Z = c(R, _);
      for (let $ = 0; $ < Z.length; ++$) {
        const K = Z[$];
        d.push(U + K);
      }
      h = v + (h.length > 0 ? " " + h : h);
    }
    return h;
  };
function Ww() {
  let n = 0,
    i,
    l,
    o = "";
  for (; n < arguments.length; )
    (i = arguments[n++]) && (l = Ov(i)) && (o && (o += " "), (o += l));
  return o;
}
const Ov = (n) => {
  if (typeof n == "string") return n;
  let i,
    l = "";
  for (let o = 0; o < n.length; o++)
    n[o] && (i = Ov(n[o])) && (l && (l += " "), (l += i));
  return l;
};
function tE(n, ...i) {
  let l,
    o,
    c,
    f = d;
  function d(h) {
    const m = i.reduce((v, g) => g(v), n());
    return (l = Jw(m)), (o = l.cache.get), (c = l.cache.set), (f = p), p(h);
  }
  function p(h) {
    const m = o(h);
    if (m) return m;
    const v = Iw(h, l);
    return c(h, v), v;
  }
  return function () {
    return f(Ww.apply(null, arguments));
  };
}
const se = (n) => {
    const i = (l) => l[n] || [];
    return (i.isThemeGetter = !0), i;
  },
  Rv = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  jv = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  eE = /^\d+\/\d+$/,
  nE = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  aE =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  iE = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  sE = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  lE =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  ls = (n) => eE.test(n),
  wt = (n) => !!n && !Number.isNaN(Number(n)),
  ja = (n) => !!n && Number.isInteger(Number(n)),
  uf = (n) => n.endsWith("%") && wt(n.slice(0, -1)),
  Wn = (n) => nE.test(n),
  oE = () => !0,
  rE = (n) => aE.test(n) && !iE.test(n),
  Hv = () => !1,
  cE = (n) => sE.test(n),
  uE = (n) => lE.test(n),
  fE = (n) => !nt(n) && !at(n),
  dE = (n) => bs(n, Vv, Hv),
  nt = (n) => Rv.test(n),
  ri = (n) => bs(n, Lv, rE),
  ff = (n) => bs(n, yE, wt),
  vy = (n) => bs(n, _v, Hv),
  mE = (n) => bs(n, zv, uE),
  ur = (n) => bs(n, Bv, cE),
  at = (n) => jv.test(n),
  Al = (n) => Ss(n, Lv),
  hE = (n) => Ss(n, vE),
  xy = (n) => Ss(n, _v),
  pE = (n) => Ss(n, Vv),
  gE = (n) => Ss(n, zv),
  fr = (n) => Ss(n, Bv, !0),
  bs = (n, i, l) => {
    const o = Rv.exec(n);
    return o ? (o[1] ? i(o[1]) : l(o[2])) : !1;
  },
  Ss = (n, i, l = !1) => {
    const o = jv.exec(n);
    return o ? (o[1] ? i(o[1]) : l) : !1;
  },
  _v = (n) => n === "position" || n === "percentage",
  zv = (n) => n === "image" || n === "url",
  Vv = (n) => n === "length" || n === "size" || n === "bg-size",
  Lv = (n) => n === "length",
  yE = (n) => n === "number",
  vE = (n) => n === "family-name",
  Bv = (n) => n === "shadow",
  xE = () => {
    const n = se("color"),
      i = se("font"),
      l = se("text"),
      o = se("font-weight"),
      c = se("tracking"),
      f = se("leading"),
      d = se("breakpoint"),
      p = se("container"),
      h = se("spacing"),
      m = se("radius"),
      v = se("shadow"),
      g = se("inset-shadow"),
      S = se("text-shadow"),
      A = se("drop-shadow"),
      E = se("blur"),
      O = se("perspective"),
      _ = se("aspect"),
      R = se("ease"),
      X = se("animate"),
      U = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      Q = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      Z = () => [...Q(), at, nt],
      $ = () => ["auto", "hidden", "clip", "visible", "scroll"],
      K = () => ["auto", "contain", "none"],
      F = () => [at, nt, h],
      ot = () => [ls, "full", "auto", ...F()],
      ft = () => [ja, "none", "subgrid", at, nt],
      At = () => ["auto", { span: ["full", ja, at, nt] }, ja, at, nt],
      pt = () => [ja, "auto", at, nt],
      yt = () => ["auto", "min", "max", "fr", at, nt],
      vt = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      bt = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      C = () => ["auto", ...F()],
      B = () => [
        ls,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...F(),
      ],
      z = () => [n, at, nt],
      et = () => [...Q(), xy, vy, { position: [at, nt] }],
      lt = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      T = () => ["auto", "cover", "contain", pE, dE, { size: [at, nt] }],
      q = () => [uf, Al, ri],
      Y = () => ["", "none", "full", m, at, nt],
      J = () => ["", wt, Al, ri],
      W = () => ["solid", "dashed", "dotted", "double"],
      rt = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      it = () => [wt, uf, xy, vy],
      mt = () => ["", "none", E, at, nt],
      Ct = () => ["none", wt, at, nt],
      ue = () => ["none", wt, at, nt],
      Ae = () => [wt, at, nt],
      fe = () => [ls, "full", ...F()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [Wn],
        breakpoint: [Wn],
        color: [oE],
        container: [Wn],
        "drop-shadow": [Wn],
        ease: ["in", "out", "in-out"],
        font: [fE],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [Wn],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [Wn],
        shadow: [Wn],
        spacing: ["px", wt],
        text: [Wn],
        "text-shadow": [Wn],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", ls, nt, at, _] }],
        container: ["container"],
        columns: [{ columns: [wt, nt, at, p] }],
        "break-after": [{ "break-after": U() }],
        "break-before": [{ "break-before": U() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: Z() }],
        overflow: [{ overflow: $() }],
        "overflow-x": [{ "overflow-x": $() }],
        "overflow-y": [{ "overflow-y": $() }],
        overscroll: [{ overscroll: K() }],
        "overscroll-x": [{ "overscroll-x": K() }],
        "overscroll-y": [{ "overscroll-y": K() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: ot() }],
        "inset-x": [{ "inset-x": ot() }],
        "inset-y": [{ "inset-y": ot() }],
        start: [{ start: ot() }],
        end: [{ end: ot() }],
        top: [{ top: ot() }],
        right: [{ right: ot() }],
        bottom: [{ bottom: ot() }],
        left: [{ left: ot() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [ja, "auto", at, nt] }],
        basis: [{ basis: [ls, "full", "auto", p, ...F()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [wt, ls, "auto", "initial", "none", nt] }],
        grow: [{ grow: ["", wt, at, nt] }],
        shrink: [{ shrink: ["", wt, at, nt] }],
        order: [{ order: [ja, "first", "last", "none", at, nt] }],
        "grid-cols": [{ "grid-cols": ft() }],
        "col-start-end": [{ col: At() }],
        "col-start": [{ "col-start": pt() }],
        "col-end": [{ "col-end": pt() }],
        "grid-rows": [{ "grid-rows": ft() }],
        "row-start-end": [{ row: At() }],
        "row-start": [{ "row-start": pt() }],
        "row-end": [{ "row-end": pt() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": yt() }],
        "auto-rows": [{ "auto-rows": yt() }],
        gap: [{ gap: F() }],
        "gap-x": [{ "gap-x": F() }],
        "gap-y": [{ "gap-y": F() }],
        "justify-content": [{ justify: [...vt(), "normal"] }],
        "justify-items": [{ "justify-items": [...bt(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...bt()] }],
        "align-content": [{ content: ["normal", ...vt()] }],
        "align-items": [{ items: [...bt(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...bt(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": vt() }],
        "place-items": [{ "place-items": [...bt(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...bt()] }],
        p: [{ p: F() }],
        px: [{ px: F() }],
        py: [{ py: F() }],
        ps: [{ ps: F() }],
        pe: [{ pe: F() }],
        pt: [{ pt: F() }],
        pr: [{ pr: F() }],
        pb: [{ pb: F() }],
        pl: [{ pl: F() }],
        m: [{ m: C() }],
        mx: [{ mx: C() }],
        my: [{ my: C() }],
        ms: [{ ms: C() }],
        me: [{ me: C() }],
        mt: [{ mt: C() }],
        mr: [{ mr: C() }],
        mb: [{ mb: C() }],
        ml: [{ ml: C() }],
        "space-x": [{ "space-x": F() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": F() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: B() }],
        w: [{ w: [p, "screen", ...B()] }],
        "min-w": [{ "min-w": [p, "screen", "none", ...B()] }],
        "max-w": [
          { "max-w": [p, "screen", "none", "prose", { screen: [d] }, ...B()] },
        ],
        h: [{ h: ["screen", "lh", ...B()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...B()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...B()] }],
        "font-size": [{ text: ["base", l, Al, ri] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [o, at, ff] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              uf,
              nt,
            ],
          },
        ],
        "font-family": [{ font: [hE, nt, i] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [c, at, nt] }],
        "line-clamp": [{ "line-clamp": [wt, "none", at, ff] }],
        leading: [{ leading: [f, ...F()] }],
        "list-image": [{ "list-image": ["none", at, nt] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", at, nt] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: z() }],
        "text-color": [{ text: z() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...W(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [wt, "from-font", "auto", at, ri] },
        ],
        "text-decoration-color": [{ decoration: z() }],
        "underline-offset": [{ "underline-offset": [wt, "auto", at, nt] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: F() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              at,
              nt,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", at, nt] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: et() }],
        "bg-repeat": [{ bg: lt() }],
        "bg-size": [{ bg: T() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  ja,
                  at,
                  nt,
                ],
                radial: ["", at, nt],
                conic: [ja, at, nt],
              },
              gE,
              mE,
            ],
          },
        ],
        "bg-color": [{ bg: z() }],
        "gradient-from-pos": [{ from: q() }],
        "gradient-via-pos": [{ via: q() }],
        "gradient-to-pos": [{ to: q() }],
        "gradient-from": [{ from: z() }],
        "gradient-via": [{ via: z() }],
        "gradient-to": [{ to: z() }],
        rounded: [{ rounded: Y() }],
        "rounded-s": [{ "rounded-s": Y() }],
        "rounded-e": [{ "rounded-e": Y() }],
        "rounded-t": [{ "rounded-t": Y() }],
        "rounded-r": [{ "rounded-r": Y() }],
        "rounded-b": [{ "rounded-b": Y() }],
        "rounded-l": [{ "rounded-l": Y() }],
        "rounded-ss": [{ "rounded-ss": Y() }],
        "rounded-se": [{ "rounded-se": Y() }],
        "rounded-ee": [{ "rounded-ee": Y() }],
        "rounded-es": [{ "rounded-es": Y() }],
        "rounded-tl": [{ "rounded-tl": Y() }],
        "rounded-tr": [{ "rounded-tr": Y() }],
        "rounded-br": [{ "rounded-br": Y() }],
        "rounded-bl": [{ "rounded-bl": Y() }],
        "border-w": [{ border: J() }],
        "border-w-x": [{ "border-x": J() }],
        "border-w-y": [{ "border-y": J() }],
        "border-w-s": [{ "border-s": J() }],
        "border-w-e": [{ "border-e": J() }],
        "border-w-t": [{ "border-t": J() }],
        "border-w-r": [{ "border-r": J() }],
        "border-w-b": [{ "border-b": J() }],
        "border-w-l": [{ "border-l": J() }],
        "divide-x": [{ "divide-x": J() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": J() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...W(), "hidden", "none"] }],
        "divide-style": [{ divide: [...W(), "hidden", "none"] }],
        "border-color": [{ border: z() }],
        "border-color-x": [{ "border-x": z() }],
        "border-color-y": [{ "border-y": z() }],
        "border-color-s": [{ "border-s": z() }],
        "border-color-e": [{ "border-e": z() }],
        "border-color-t": [{ "border-t": z() }],
        "border-color-r": [{ "border-r": z() }],
        "border-color-b": [{ "border-b": z() }],
        "border-color-l": [{ "border-l": z() }],
        "divide-color": [{ divide: z() }],
        "outline-style": [{ outline: [...W(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [wt, at, nt] }],
        "outline-w": [{ outline: ["", wt, Al, ri] }],
        "outline-color": [{ outline: z() }],
        shadow: [{ shadow: ["", "none", v, fr, ur] }],
        "shadow-color": [{ shadow: z() }],
        "inset-shadow": [{ "inset-shadow": ["none", g, fr, ur] }],
        "inset-shadow-color": [{ "inset-shadow": z() }],
        "ring-w": [{ ring: J() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: z() }],
        "ring-offset-w": [{ "ring-offset": [wt, ri] }],
        "ring-offset-color": [{ "ring-offset": z() }],
        "inset-ring-w": [{ "inset-ring": J() }],
        "inset-ring-color": [{ "inset-ring": z() }],
        "text-shadow": [{ "text-shadow": ["none", S, fr, ur] }],
        "text-shadow-color": [{ "text-shadow": z() }],
        opacity: [{ opacity: [wt, at, nt] }],
        "mix-blend": [
          { "mix-blend": [...rt(), "plus-darker", "plus-lighter"] },
        ],
        "bg-blend": [{ "bg-blend": rt() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [wt] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": it() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": it() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": z() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": z() }],
        "mask-image-t-from-pos": [{ "mask-t-from": it() }],
        "mask-image-t-to-pos": [{ "mask-t-to": it() }],
        "mask-image-t-from-color": [{ "mask-t-from": z() }],
        "mask-image-t-to-color": [{ "mask-t-to": z() }],
        "mask-image-r-from-pos": [{ "mask-r-from": it() }],
        "mask-image-r-to-pos": [{ "mask-r-to": it() }],
        "mask-image-r-from-color": [{ "mask-r-from": z() }],
        "mask-image-r-to-color": [{ "mask-r-to": z() }],
        "mask-image-b-from-pos": [{ "mask-b-from": it() }],
        "mask-image-b-to-pos": [{ "mask-b-to": it() }],
        "mask-image-b-from-color": [{ "mask-b-from": z() }],
        "mask-image-b-to-color": [{ "mask-b-to": z() }],
        "mask-image-l-from-pos": [{ "mask-l-from": it() }],
        "mask-image-l-to-pos": [{ "mask-l-to": it() }],
        "mask-image-l-from-color": [{ "mask-l-from": z() }],
        "mask-image-l-to-color": [{ "mask-l-to": z() }],
        "mask-image-x-from-pos": [{ "mask-x-from": it() }],
        "mask-image-x-to-pos": [{ "mask-x-to": it() }],
        "mask-image-x-from-color": [{ "mask-x-from": z() }],
        "mask-image-x-to-color": [{ "mask-x-to": z() }],
        "mask-image-y-from-pos": [{ "mask-y-from": it() }],
        "mask-image-y-to-pos": [{ "mask-y-to": it() }],
        "mask-image-y-from-color": [{ "mask-y-from": z() }],
        "mask-image-y-to-color": [{ "mask-y-to": z() }],
        "mask-image-radial": [{ "mask-radial": [at, nt] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": it() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": it() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": z() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": z() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": Q() }],
        "mask-image-conic-pos": [{ "mask-conic": [wt] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": it() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": it() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": z() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": z() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: et() }],
        "mask-repeat": [{ mask: lt() }],
        "mask-size": [{ mask: T() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", at, nt] }],
        filter: [{ filter: ["", "none", at, nt] }],
        blur: [{ blur: mt() }],
        brightness: [{ brightness: [wt, at, nt] }],
        contrast: [{ contrast: [wt, at, nt] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", A, fr, ur] }],
        "drop-shadow-color": [{ "drop-shadow": z() }],
        grayscale: [{ grayscale: ["", wt, at, nt] }],
        "hue-rotate": [{ "hue-rotate": [wt, at, nt] }],
        invert: [{ invert: ["", wt, at, nt] }],
        saturate: [{ saturate: [wt, at, nt] }],
        sepia: [{ sepia: ["", wt, at, nt] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", at, nt] }],
        "backdrop-blur": [{ "backdrop-blur": mt() }],
        "backdrop-brightness": [{ "backdrop-brightness": [wt, at, nt] }],
        "backdrop-contrast": [{ "backdrop-contrast": [wt, at, nt] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", wt, at, nt] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [wt, at, nt] }],
        "backdrop-invert": [{ "backdrop-invert": ["", wt, at, nt] }],
        "backdrop-opacity": [{ "backdrop-opacity": [wt, at, nt] }],
        "backdrop-saturate": [{ "backdrop-saturate": [wt, at, nt] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", wt, at, nt] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": F() }],
        "border-spacing-x": [{ "border-spacing-x": F() }],
        "border-spacing-y": [{ "border-spacing-y": F() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              at,
              nt,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [wt, "initial", at, nt] }],
        ease: [{ ease: ["linear", "initial", R, at, nt] }],
        delay: [{ delay: [wt, at, nt] }],
        animate: [{ animate: ["none", X, at, nt] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [O, at, nt] }],
        "perspective-origin": [{ "perspective-origin": Z() }],
        rotate: [{ rotate: Ct() }],
        "rotate-x": [{ "rotate-x": Ct() }],
        "rotate-y": [{ "rotate-y": Ct() }],
        "rotate-z": [{ "rotate-z": Ct() }],
        scale: [{ scale: ue() }],
        "scale-x": [{ "scale-x": ue() }],
        "scale-y": [{ "scale-y": ue() }],
        "scale-z": [{ "scale-z": ue() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: Ae() }],
        "skew-x": [{ "skew-x": Ae() }],
        "skew-y": [{ "skew-y": Ae() }],
        transform: [{ transform: [at, nt, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: Z() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: fe() }],
        "translate-x": [{ "translate-x": fe() }],
        "translate-y": [{ "translate-y": fe() }],
        "translate-z": [{ "translate-z": fe() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: z() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: z() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              at,
              nt,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": F() }],
        "scroll-mx": [{ "scroll-mx": F() }],
        "scroll-my": [{ "scroll-my": F() }],
        "scroll-ms": [{ "scroll-ms": F() }],
        "scroll-me": [{ "scroll-me": F() }],
        "scroll-mt": [{ "scroll-mt": F() }],
        "scroll-mr": [{ "scroll-mr": F() }],
        "scroll-mb": [{ "scroll-mb": F() }],
        "scroll-ml": [{ "scroll-ml": F() }],
        "scroll-p": [{ "scroll-p": F() }],
        "scroll-px": [{ "scroll-px": F() }],
        "scroll-py": [{ "scroll-py": F() }],
        "scroll-ps": [{ "scroll-ps": F() }],
        "scroll-pe": [{ "scroll-pe": F() }],
        "scroll-pt": [{ "scroll-pt": F() }],
        "scroll-pr": [{ "scroll-pr": F() }],
        "scroll-pb": [{ "scroll-pb": F() }],
        "scroll-pl": [{ "scroll-pl": F() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          {
            "will-change": ["auto", "scroll", "contents", "transform", at, nt],
          },
        ],
        fill: [{ fill: ["none", ...z()] }],
        "stroke-w": [{ stroke: [wt, Al, ri, ff] }],
        stroke: [{ stroke: ["none", ...z()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  bE = tE(xE);
function Lr(...n) {
  return bE(Cv(n));
}
function SE({ delayDuration: n = 0, ...i }) {
  return x.jsx(kw, {
    "data-loc": "client/src/components/ui/tooltip.tsx:11",
    "data-slot": "tooltip-provider",
    delayDuration: n,
    ...i,
  });
}
const by = (n) => (typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n),
  Sy = Cv,
  AE = (n, i) => (l) => {
    var o;
    if (i?.variants == null) return Sy(n, l?.class, l?.className);
    const { variants: c, defaultVariants: f } = i,
      d = Object.keys(c).map((m) => {
        const v = l?.[m],
          g = f?.[m];
        if (v === null) return null;
        const S = by(v) || by(g);
        return c[m][S];
      }),
      p =
        l &&
        Object.entries(l).reduce((m, v) => {
          let [g, S] = v;
          return S === void 0 || (m[g] = S), m;
        }, {}),
      h =
        i == null || (o = i.compoundVariants) === null || o === void 0
          ? void 0
          : o.reduce((m, v) => {
              let { class: g, className: S, ...A } = v;
              return Object.entries(A).every((E) => {
                let [O, _] = E;
                return Array.isArray(_)
                  ? _.includes({ ...f, ...p }[O])
                  : { ...f, ...p }[O] === _;
              })
                ? [...m, g, S]
                : m;
            }, []);
    return Sy(n, d, h, l?.class, l?.className);
  },
  wE = AE(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive:
            "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
          outline:
            "border bg-transparent shadow-xs hover:bg-accent dark:bg-transparent dark:border-input dark:hover:bg-input/50",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent dark:hover:bg-accent/50",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-9 px-4 py-2 has-[>svg]:px-3",
          sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
          lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
          icon: "size-9",
          "icon-sm": "size-8",
          "icon-lg": "size-10",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    }
  );
function EE({ className: n, variant: i, size: l, asChild: o = !1, ...c }) {
  const f = o ? _A : "button";
  return x.jsx(f, {
    "data-loc": "client/src/components/ui/button.tsx:52",
    "data-slot": "button",
    className: Lr(wE({ variant: i, size: l, className: n })),
    ...c,
  });
}
function TE({ className: n, ...i }) {
  return x.jsx("div", {
    "data-loc": "client/src/components/ui/card.tsx:7",
    "data-slot": "card",
    className: Lr(
      "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
      n
    ),
    ...i,
  });
}
function NE({ className: n, ...i }) {
  return x.jsx("div", {
    "data-loc": "client/src/components/ui/card.tsx:66",
    "data-slot": "card-content",
    className: Lr("px-6", n),
    ...i,
  });
}
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const DE = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  Uv = (...n) => n.filter((i, l, o) => !!i && o.indexOf(i) === l).join(" ");
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var CE = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ME = D.forwardRef(
  (
    {
      color: n = "currentColor",
      size: i = 24,
      strokeWidth: l = 2,
      absoluteStrokeWidth: o,
      className: c = "",
      children: f,
      iconNode: d,
      ...p
    },
    h
  ) =>
    D.createElement(
      "svg",
      {
        ref: h,
        ...CE,
        width: i,
        height: i,
        stroke: n,
        strokeWidth: o ? (Number(l) * 24) / Number(i) : l,
        className: Uv("lucide", c),
        ...p,
      },
      [
        ...d.map(([m, v]) => D.createElement(m, v)),
        ...(Array.isArray(f) ? f : [f]),
      ]
    )
);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ce = (n, i) => {
  const l = D.forwardRef(({ className: o, ...c }, f) =>
    D.createElement(ME, {
      ref: f,
      iconNode: i,
      className: Uv(`lucide-${DE(n)}`, o),
      ...c,
    })
  );
  return (l.displayName = `${n}`), l;
};
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const kv = ce("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const OE = ce("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const RE = ce("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const jE = ce("Coins", [
  ["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }],
  ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }],
  ["path", { d: "M7 6h1v4", key: "1obek4" }],
  ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const HE = ce("Copy", [
  [
    "rect",
    {
      width: "14",
      height: "14",
      x: "8",
      y: "8",
      rx: "2",
      ry: "2",
      key: "17jyea",
    },
  ],
  [
    "path",
    {
      d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
      key: "zix9uf",
    },
  ],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const _E = ce("Droplets", [
  [
    "path",
    {
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4",
    },
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz",
    },
  ],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const yd = ce("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  [
    "path",
    {
      d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
      key: "a6xqqp",
    },
  ],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Tl = ce("Flame", [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49",
    },
  ],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const zE = ce("House", [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt",
    },
  ],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Fv = ce("MessageCircle", [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Yv = ce("Rocket", [
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      key: "m3kijz",
    },
  ],
  [
    "path",
    {
      d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
      key: "1fmvmk",
    },
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", key: "1f8sc4" }],
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const VE = ce("RotateCcw", [
  [
    "path",
    { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" },
  ],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qv = ce("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y",
    },
  ],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Br = ce("TrendingUp", [
  ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17", key: "126l90" }],
  ["polyline", { points: "16 7 22 7 22 13", key: "kwv8wd" }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const LE = ce("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq",
    },
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Gv = ce("Twitter", [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6",
    },
  ],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const BE = ce("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }],
]);
/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Xv = ce("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db",
    },
  ],
]);
function UE(n, i) {
  if (n instanceof RegExp) return { keys: !1, pattern: n };
  var l,
    o,
    c,
    f,
    d = [],
    p = "",
    h = n.split("/");
  for (h[0] || h.shift(); (c = h.shift()); )
    (l = c[0]),
      l === "*"
        ? (d.push(l), (p += c[1] === "?" ? "(?:/(.*))?" : "/(.*)"))
        : l === ":"
        ? ((o = c.indexOf("?", 1)),
          (f = c.indexOf(".", 1)),
          d.push(c.substring(1, ~o ? o : ~f ? f : c.length)),
          (p += ~o && !~f ? "(?:/([^/]+?))?" : "/([^/]+?)"),
          ~f && (p += (~o ? "?" : "") + "\\" + c.substring(f)))
        : (p += "/" + c);
  return {
    keys: d,
    pattern: new RegExp("^" + p + (i ? "(?=$|/)" : "/?$"), "i"),
  };
}
var df = { exports: {} },
  mf = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ay;
function kE() {
  if (Ay) return mf;
  Ay = 1;
  var n = Mr();
  function i(g, S) {
    return (g === S && (g !== 0 || 1 / g === 1 / S)) || (g !== g && S !== S);
  }
  var l = typeof Object.is == "function" ? Object.is : i,
    o = n.useState,
    c = n.useEffect,
    f = n.useLayoutEffect,
    d = n.useDebugValue;
  function p(g, S) {
    var A = S(),
      E = o({ inst: { value: A, getSnapshot: S } }),
      O = E[0].inst,
      _ = E[1];
    return (
      f(
        function () {
          (O.value = A), (O.getSnapshot = S), h(O) && _({ inst: O });
        },
        [g, A, S]
      ),
      c(
        function () {
          return (
            h(O) && _({ inst: O }),
            g(function () {
              h(O) && _({ inst: O });
            })
          );
        },
        [g]
      ),
      d(A),
      A
    );
  }
  function h(g) {
    var S = g.getSnapshot;
    g = g.value;
    try {
      var A = S();
      return !l(g, A);
    } catch {
      return !0;
    }
  }
  function m(g, S) {
    return S();
  }
  var v =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? m
      : p;
  return (
    (mf.useSyncExternalStore =
      n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : v),
    mf
  );
}
var wy;
function FE() {
  return wy || ((wy = 1), (df.exports = kE())), df.exports;
}
var YE = FE();
const qE = WS.useInsertionEffect,
  GE =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  XE = GE ? D.useLayoutEffect : D.useEffect,
  PE = qE || XE,
  Pv = (n) => {
    const i = D.useRef([n, (...l) => i[0](...l)]).current;
    return (
      PE(() => {
        i[0] = n;
      }),
      i[1]
    );
  },
  KE = "popstate",
  vd = "pushState",
  xd = "replaceState",
  ZE = "hashchange",
  Ey = [KE, vd, xd, ZE],
  QE = (n) => {
    for (const i of Ey) addEventListener(i, n);
    return () => {
      for (const i of Ey) removeEventListener(i, n);
    };
  },
  Kv = (n, i) => YE.useSyncExternalStore(QE, n, i),
  JE = () => location.search,
  $E = ({ ssrSearch: n = "" } = {}) => Kv(JE, () => n),
  Ty = () => location.pathname,
  IE = ({ ssrPath: n } = {}) => Kv(Ty, n ? () => n : Ty),
  WE = (n, { replace: i = !1, state: l = null } = {}) =>
    history[i ? xd : vd](l, "", n),
  tT = (n = {}) => [IE(n), WE],
  Ny = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[Ny] > "u") {
  for (const n of [vd, xd]) {
    const i = history[n];
    history[n] = function () {
      const l = i.apply(this, arguments),
        o = new Event(n);
      return (o.arguments = arguments), dispatchEvent(o), l;
    };
  }
  Object.defineProperty(window, Ny, { value: !0 });
}
const eT = (n, i) =>
    i.toLowerCase().indexOf(n.toLowerCase())
      ? "~" + i
      : i.slice(n.length) || "/",
  Zv = (n = "") => (n === "/" ? "" : n),
  nT = (n, i) => (n[0] === "~" ? n.slice(1) : Zv(i) + n),
  aT = (n = "", i) => eT(Dy(Zv(n)), Dy(i)),
  Dy = (n) => {
    try {
      return decodeURI(n);
    } catch {
      return n;
    }
  },
  Qv = {
    hook: tT,
    searchHook: $E,
    parser: UE,
    base: "",
    ssrPath: void 0,
    ssrSearch: void 0,
    ssrContext: void 0,
    hrefs: (n) => n,
  },
  Jv = D.createContext(Qv),
  Fl = () => D.useContext(Jv),
  $v = {},
  Iv = D.createContext($v),
  iT = () => D.useContext(Iv),
  Ur = (n) => {
    const [i, l] = n.hook(n);
    return [aT(n.base, i), Pv((o, c) => l(nT(o, n.base), c))];
  },
  sT = () => Ur(Fl()),
  Wv = (n, i, l, o) => {
    const { pattern: c, keys: f } =
        i instanceof RegExp ? { keys: !1, pattern: i } : n(i || "*", o),
      d = c.exec(l) || [],
      [p, ...h] = d;
    return p !== void 0
      ? [
          !0,
          (() => {
            const m =
              f !== !1
                ? Object.fromEntries(f.map((g, S) => [g, h[S]]))
                : d.groups;
            let v = { ...h };
            return m && Object.assign(v, m), v;
          })(),
          ...(o ? [p] : []),
        ]
      : [!1, null];
  },
  lT = ({ children: n, ...i }) => {
    const l = Fl(),
      o = i.hook ? Qv : l;
    let c = o;
    const [f, d] = i.ssrPath?.split("?") ?? [];
    d && ((i.ssrSearch = d), (i.ssrPath = f)),
      (i.hrefs = i.hrefs ?? i.hook?.hrefs);
    let p = D.useRef({}),
      h = p.current,
      m = h;
    for (let v in o) {
      const g = v === "base" ? o[v] + (i[v] || "") : i[v] || o[v];
      h === m && g !== m[v] && (p.current = m = { ...m }),
        (m[v] = g),
        (g !== o[v] || g !== c[v]) && (c = m);
    }
    return D.createElement(Jv.Provider, { value: c, children: n });
  },
  Cy = ({ children: n, component: i }, l) =>
    i ? D.createElement(i, { params: l }) : typeof n == "function" ? n(l) : n,
  oT = (n) => {
    let i = D.useRef($v);
    const l = i.current;
    return (i.current =
      Object.keys(n).length !== Object.keys(l).length ||
      Object.entries(n).some(([o, c]) => c !== l[o])
        ? n
        : l);
  },
  hf = ({ path: n, nest: i, match: l, ...o }) => {
    const c = Fl(),
      [f] = Ur(c),
      [d, p, h] = l ?? Wv(c.parser, n, f, i),
      m = oT({ ...iT(), ...p });
    if (!d) return null;
    const v = h ? D.createElement(lT, { base: h }, Cy(o, m)) : Cy(o, m);
    return D.createElement(Iv.Provider, { value: m, children: v });
  };
D.forwardRef((n, i) => {
  const l = Fl(),
    [o, c] = Ur(l),
    {
      to: f = "",
      href: d = f,
      onClick: p,
      asChild: h,
      children: m,
      className: v,
      replace: g,
      state: S,
      ...A
    } = n,
    E = Pv((_) => {
      _.ctrlKey ||
        _.metaKey ||
        _.altKey ||
        _.shiftKey ||
        _.button !== 0 ||
        (p?.(_), _.defaultPrevented || (_.preventDefault(), c(d, n)));
    }),
    O = l.hrefs(d[0] === "~" ? d.slice(1) : l.base + d, l);
  return h && D.isValidElement(m)
    ? D.cloneElement(m, { onClick: E, href: O })
    : D.createElement("a", {
        ...A,
        onClick: E,
        href: O,
        className: v?.call ? v(o === d) : v,
        children: m,
        ref: i,
      });
});
const Uf = (n) =>
    Array.isArray(n)
      ? n.flatMap((i) => Uf(i && i.type === D.Fragment ? i.props.children : i))
      : [n],
  rT = ({ children: n, location: i }) => {
    const l = Fl(),
      [o] = Ur(l);
    typeof window < "u" &&
      (window.__WOUTER_ROUTES__ || (window.__WOUTER_ROUTES__ = []),
      Uf(n).forEach((f) => {
        if (D.isValidElement(f) && f.props.path) {
          const d = f.props.path;
          window.__WOUTER_ROUTES__.includes(d) ||
            window.__WOUTER_ROUTES__.push(d);
        }
      }));
    for (const c of Uf(n)) {
      let f = 0;
      if (
        D.isValidElement(c) &&
        (f = Wv(l.parser, c.props.path, i || o, c.props.nest))[0]
      )
        return D.cloneElement(c, { match: f });
    }
    return null;
  };
function My() {
  const [, n] = sT(),
    i = () => {
      n("/");
    };
  return x.jsx("div", {
    "data-loc": "client/src/pages/NotFound.tsx:14",
    className:
      "min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100",
    children: x.jsx(TE, {
      "data-loc": "client/src/pages/NotFound.tsx:15",
      className:
        "w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm",
      children: x.jsxs(NE, {
        "data-loc": "client/src/pages/NotFound.tsx:16",
        className: "pt-8 pb-8 text-center",
        children: [
          x.jsx("div", {
            "data-loc": "client/src/pages/NotFound.tsx:17",
            className: "flex justify-center mb-6",
            children: x.jsxs("div", {
              "data-loc": "client/src/pages/NotFound.tsx:18",
              className: "relative",
              children: [
                x.jsx("div", {
                  "data-loc": "client/src/pages/NotFound.tsx:19",
                  className:
                    "absolute inset-0 bg-red-100 rounded-full animate-pulse",
                }),
                x.jsx(RE, {
                  "data-loc": "client/src/pages/NotFound.tsx:20",
                  className: "relative h-16 w-16 text-red-500",
                }),
              ],
            }),
          }),
          x.jsx("h1", {
            "data-loc": "client/src/pages/NotFound.tsx:24",
            className: "text-4xl font-bold text-slate-900 mb-2",
            children: "404",
          }),
          x.jsx("h2", {
            "data-loc": "client/src/pages/NotFound.tsx:26",
            className: "text-xl font-semibold text-slate-700 mb-4",
            children: "Page Not Found",
          }),
          x.jsxs("p", {
            "data-loc": "client/src/pages/NotFound.tsx:30",
            className: "text-slate-600 mb-8 leading-relaxed",
            children: [
              "Sorry, the page you are looking for doesn't exist.",
              x.jsx("br", { "data-loc": "client/src/pages/NotFound.tsx:32" }),
              "It may have been moved or deleted.",
            ],
          }),
          x.jsx("div", {
            "data-loc": "client/src/pages/NotFound.tsx:36",
            className: "flex flex-col sm:flex-row gap-3 justify-center",
            children: x.jsxs(EE, {
              "data-loc": "client/src/pages/NotFound.tsx:37",
              onClick: i,
              className:
                "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg",
              children: [
                x.jsx(zE, {
                  "data-loc": "client/src/pages/NotFound.tsx:41",
                  className: "w-4 h-4 mr-2",
                }),
                "Go Home",
              ],
            }),
          }),
        ],
      }),
    }),
  });
}
class cT extends D.Component {
  constructor(i) {
    super(i), (this.state = { hasError: !1, error: null });
  }
  static getDerivedStateFromError(i) {
    return { hasError: !0, error: i };
  }
  render() {
    return this.state.hasError
      ? x.jsx("div", {
          "data-loc": "client/src/components/ErrorBoundary.tsx:27",
          className:
            "flex items-center justify-center min-h-screen p-8 bg-background",
          children: x.jsxs("div", {
            "data-loc": "client/src/components/ErrorBoundary.tsx:28",
            className: "flex flex-col items-center w-full max-w-2xl p-8",
            children: [
              x.jsx(LE, {
                "data-loc": "client/src/components/ErrorBoundary.tsx:29",
                size: 48,
                className: "text-destructive mb-6 flex-shrink-0",
              }),
              x.jsx("h2", {
                "data-loc": "client/src/components/ErrorBoundary.tsx:34",
                className: "text-xl mb-4",
                children: "An unexpected error occurred.",
              }),
              x.jsx("div", {
                "data-loc": "client/src/components/ErrorBoundary.tsx:36",
                className: "p-4 w-full rounded bg-muted overflow-auto mb-6",
                children: x.jsx("pre", {
                  "data-loc": "client/src/components/ErrorBoundary.tsx:37",
                  className:
                    "text-sm text-muted-foreground whitespace-break-spaces",
                  children: this.state.error?.stack,
                }),
              }),
              x.jsxs("button", {
                "data-loc": "client/src/components/ErrorBoundary.tsx:42",
                onClick: () => window.location.reload(),
                className: Lr(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90 cursor-pointer"
                ),
                children: [
                  x.jsx(VE, {
                    "data-loc": "client/src/components/ErrorBoundary.tsx:50",
                    size: 16,
                  }),
                  "Reload Page",
                ],
              }),
            ],
          }),
        })
      : this.props.children;
  }
}
const uT = D.createContext(void 0);
function fT({ children: n, defaultTheme: i = "light", switchable: l = !1 }) {
  const [o, c] = D.useState(() => (l && localStorage.getItem("theme")) || i);
  D.useEffect(() => {
    const d = document.documentElement;
    o === "dark" ? d.classList.add("dark") : d.classList.remove("dark"),
      l && localStorage.setItem("theme", o);
  }, [o, l]);
  const f = l
    ? () => {
        c((d) => (d === "light" ? "dark" : "light"));
      }
    : void 0;
  return x.jsx(uT.Provider, {
    "data-loc": "client/src/contexts/ThemeContext.tsx:52",
    value: { theme: o, toggleTheme: f, switchable: l },
    children: n,
  });
}
const tx = D.createContext({});
function dT(n) {
  const i = D.useRef(null);
  return i.current === null && (i.current = n()), i.current;
}
const bd = typeof window < "u",
  mT = bd ? D.useLayoutEffect : D.useEffect,
  Sd = D.createContext(null);
function Ad(n, i) {
  n.indexOf(i) === -1 && n.push(i);
}
function wd(n, i) {
  const l = n.indexOf(i);
  l > -1 && n.splice(l, 1);
}
const aa = (n, i, l) => (l > i ? i : l < n ? n : l);
let Ed = () => {};
const ia = {},
  ex = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function nx(n) {
  return typeof n == "object" && n !== null;
}
const ax = (n) => /^0[^.\s]+$/u.test(n);
function Td(n) {
  let i;
  return () => (i === void 0 && (i = n()), i);
}
const un = (n) => n,
  hT = (n, i) => (l) => i(n(l)),
  Yl = (...n) => n.reduce(hT),
  _l = (n, i, l) => {
    const o = i - n;
    return o === 0 ? 1 : (l - n) / o;
  };
class Nd {
  constructor() {
    this.subscriptions = [];
  }
  add(i) {
    return Ad(this.subscriptions, i), () => wd(this.subscriptions, i);
  }
  notify(i, l, o) {
    const c = this.subscriptions.length;
    if (c)
      if (c === 1) this.subscriptions[0](i, l, o);
      else
        for (let f = 0; f < c; f++) {
          const d = this.subscriptions[f];
          d && d(i, l, o);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Mn = (n) => n * 1e3,
  cn = (n) => n / 1e3;
function ix(n, i) {
  return i ? n * (1e3 / i) : 0;
}
const sx = (n, i, l) =>
    (((1 - 3 * l + 3 * i) * n + (3 * l - 6 * i)) * n + 3 * i) * n,
  pT = 1e-7,
  gT = 12;
function yT(n, i, l, o, c) {
  let f,
    d,
    p = 0;
  do (d = i + (l - i) / 2), (f = sx(d, o, c) - n), f > 0 ? (l = d) : (i = d);
  while (Math.abs(f) > pT && ++p < gT);
  return d;
}
function ql(n, i, l, o) {
  if (n === i && l === o) return un;
  const c = (f) => yT(f, 0, 1, n, l);
  return (f) => (f === 0 || f === 1 ? f : sx(c(f), i, o));
}
const lx = (n) => (i) => i <= 0.5 ? n(2 * i) / 2 : (2 - n(2 * (1 - i))) / 2,
  ox = (n) => (i) => 1 - n(1 - i),
  rx = ql(0.33, 1.53, 0.69, 0.99),
  Dd = ox(rx),
  cx = lx(Dd),
  ux = (n) =>
    (n *= 2) < 1 ? 0.5 * Dd(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))),
  Cd = (n) => 1 - Math.sin(Math.acos(n)),
  fx = ox(Cd),
  dx = lx(Cd),
  vT = ql(0.42, 0, 1, 1),
  xT = ql(0, 0, 0.58, 1),
  mx = ql(0.42, 0, 0.58, 1),
  bT = (n) => Array.isArray(n) && typeof n[0] != "number",
  hx = (n) => Array.isArray(n) && typeof n[0] == "number",
  ST = {
    linear: un,
    easeIn: vT,
    easeInOut: mx,
    easeOut: xT,
    circIn: Cd,
    circInOut: dx,
    circOut: fx,
    backIn: Dd,
    backInOut: cx,
    backOut: rx,
    anticipate: ux,
  },
  AT = (n) => typeof n == "string",
  Oy = (n) => {
    if (hx(n)) {
      Ed(n.length === 4);
      const [i, l, o, c] = n;
      return ql(i, l, o, c);
    } else if (AT(n)) return ST[n];
    return n;
  },
  dr = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender",
  ];
function wT(n, i) {
  let l = new Set(),
    o = new Set(),
    c = !1,
    f = !1;
  const d = new WeakSet();
  let p = { delta: 0, timestamp: 0, isProcessing: !1 };
  function h(v) {
    d.has(v) && (m.schedule(v), n()), v(p);
  }
  const m = {
    schedule: (v, g = !1, S = !1) => {
      const E = S && c ? l : o;
      return g && d.add(v), E.has(v) || E.add(v), v;
    },
    cancel: (v) => {
      o.delete(v), d.delete(v);
    },
    process: (v) => {
      if (((p = v), c)) {
        f = !0;
        return;
      }
      (c = !0),
        ([l, o] = [o, l]),
        l.forEach(h),
        l.clear(),
        (c = !1),
        f && ((f = !1), m.process(v));
    },
  };
  return m;
}
const ET = 40;
function px(n, i) {
  let l = !1,
    o = !0;
  const c = { delta: 0, timestamp: 0, isProcessing: !1 },
    f = () => (l = !0),
    d = dr.reduce((U, Q) => ((U[Q] = wT(f)), U), {}),
    {
      setup: p,
      read: h,
      resolveKeyframes: m,
      preUpdate: v,
      update: g,
      preRender: S,
      render: A,
      postRender: E,
    } = d,
    O = () => {
      const U = ia.useManualTiming ? c.timestamp : performance.now();
      (l = !1),
        ia.useManualTiming ||
          (c.delta = o ? 1e3 / 60 : Math.max(Math.min(U - c.timestamp, ET), 1)),
        (c.timestamp = U),
        (c.isProcessing = !0),
        p.process(c),
        h.process(c),
        m.process(c),
        v.process(c),
        g.process(c),
        S.process(c),
        A.process(c),
        E.process(c),
        (c.isProcessing = !1),
        l && i && ((o = !1), n(O));
    },
    _ = () => {
      (l = !0), (o = !0), c.isProcessing || n(O);
    };
  return {
    schedule: dr.reduce((U, Q) => {
      const Z = d[Q];
      return (U[Q] = ($, K = !1, F = !1) => (l || _(), Z.schedule($, K, F))), U;
    }, {}),
    cancel: (U) => {
      for (let Q = 0; Q < dr.length; Q++) d[dr[Q]].cancel(U);
    },
    state: c,
    steps: d,
  };
}
const {
  schedule: Gt,
  cancel: Va,
  state: ye,
  steps: pf,
} = px(typeof requestAnimationFrame < "u" ? requestAnimationFrame : un, !0);
let gr;
function TT() {
  gr = void 0;
}
const Ue = {
    now: () => (
      gr === void 0 &&
        Ue.set(
          ye.isProcessing || ia.useManualTiming
            ? ye.timestamp
            : performance.now()
        ),
      gr
    ),
    set: (n) => {
      (gr = n), queueMicrotask(TT);
    },
  },
  gx = (n) => (i) => typeof i == "string" && i.startsWith(n),
  Md = gx("--"),
  NT = gx("var(--"),
  Od = (n) => (NT(n) ? DT.test(n.split("/*")[0].trim()) : !1),
  DT =
    /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  As = {
    test: (n) => typeof n == "number",
    parse: parseFloat,
    transform: (n) => n,
  },
  zl = { ...As, transform: (n) => aa(0, 1, n) },
  mr = { ...As, default: 1 },
  Nl = (n) => Math.round(n * 1e5) / 1e5,
  Rd = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function CT(n) {
  return n == null;
}
const MT =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  jd = (n, i) => (l) =>
    !!(
      (typeof l == "string" && MT.test(l) && l.startsWith(n)) ||
      (i && !CT(l) && Object.prototype.hasOwnProperty.call(l, i))
    ),
  yx = (n, i, l) => (o) => {
    if (typeof o != "string") return o;
    const [c, f, d, p] = o.match(Rd);
    return {
      [n]: parseFloat(c),
      [i]: parseFloat(f),
      [l]: parseFloat(d),
      alpha: p !== void 0 ? parseFloat(p) : 1,
    };
  },
  OT = (n) => aa(0, 255, n),
  gf = { ...As, transform: (n) => Math.round(OT(n)) },
  fi = {
    test: jd("rgb", "red"),
    parse: yx("red", "green", "blue"),
    transform: ({ red: n, green: i, blue: l, alpha: o = 1 }) =>
      "rgba(" +
      gf.transform(n) +
      ", " +
      gf.transform(i) +
      ", " +
      gf.transform(l) +
      ", " +
      Nl(zl.transform(o)) +
      ")",
  };
function RT(n) {
  let i = "",
    l = "",
    o = "",
    c = "";
  return (
    n.length > 5
      ? ((i = n.substring(1, 3)),
        (l = n.substring(3, 5)),
        (o = n.substring(5, 7)),
        (c = n.substring(7, 9)))
      : ((i = n.substring(1, 2)),
        (l = n.substring(2, 3)),
        (o = n.substring(3, 4)),
        (c = n.substring(4, 5)),
        (i += i),
        (l += l),
        (o += o),
        (c += c)),
    {
      red: parseInt(i, 16),
      green: parseInt(l, 16),
      blue: parseInt(o, 16),
      alpha: c ? parseInt(c, 16) / 255 : 1,
    }
  );
}
const kf = { test: jd("#"), parse: RT, transform: fi.transform },
  Gl = (n) => ({
    test: (i) =>
      typeof i == "string" && i.endsWith(n) && i.split(" ").length === 1,
    parse: parseFloat,
    transform: (i) => `${i}${n}`,
  }),
  Ha = Gl("deg"),
  On = Gl("%"),
  dt = Gl("px"),
  jT = Gl("vh"),
  HT = Gl("vw"),
  Ry = {
    ...On,
    parse: (n) => On.parse(n) / 100,
    transform: (n) => On.transform(n * 100),
  },
  os = {
    test: jd("hsl", "hue"),
    parse: yx("hue", "saturation", "lightness"),
    transform: ({ hue: n, saturation: i, lightness: l, alpha: o = 1 }) =>
      "hsla(" +
      Math.round(n) +
      ", " +
      On.transform(Nl(i)) +
      ", " +
      On.transform(Nl(l)) +
      ", " +
      Nl(zl.transform(o)) +
      ")",
  },
  ae = {
    test: (n) => fi.test(n) || kf.test(n) || os.test(n),
    parse: (n) =>
      fi.test(n) ? fi.parse(n) : os.test(n) ? os.parse(n) : kf.parse(n),
    transform: (n) =>
      typeof n == "string"
        ? n
        : n.hasOwnProperty("red")
        ? fi.transform(n)
        : os.transform(n),
    getAnimatableNone: (n) => {
      const i = ae.parse(n);
      return (i.alpha = 0), ae.transform(i);
    },
  },
  _T =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function zT(n) {
  return (
    isNaN(n) &&
    typeof n == "string" &&
    (n.match(Rd)?.length || 0) + (n.match(_T)?.length || 0) > 0
  );
}
const vx = "number",
  xx = "color",
  VT = "var",
  LT = "var(",
  jy = "${}",
  BT =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Vl(n) {
  const i = n.toString(),
    l = [],
    o = { color: [], number: [], var: [] },
    c = [];
  let f = 0;
  const p = i
    .replace(
      BT,
      (h) => (
        ae.test(h)
          ? (o.color.push(f), c.push(xx), l.push(ae.parse(h)))
          : h.startsWith(LT)
          ? (o.var.push(f), c.push(VT), l.push(h))
          : (o.number.push(f), c.push(vx), l.push(parseFloat(h))),
        ++f,
        jy
      )
    )
    .split(jy);
  return { values: l, split: p, indexes: o, types: c };
}
function bx(n) {
  return Vl(n).values;
}
function Sx(n) {
  const { split: i, types: l } = Vl(n),
    o = i.length;
  return (c) => {
    let f = "";
    for (let d = 0; d < o; d++)
      if (((f += i[d]), c[d] !== void 0)) {
        const p = l[d];
        p === vx
          ? (f += Nl(c[d]))
          : p === xx
          ? (f += ae.transform(c[d]))
          : (f += c[d]);
      }
    return f;
  };
}
const UT = (n) =>
  typeof n == "number" ? 0 : ae.test(n) ? ae.getAnimatableNone(n) : n;
function kT(n) {
  const i = bx(n);
  return Sx(n)(i.map(UT));
}
const La = {
  test: zT,
  parse: bx,
  createTransformer: Sx,
  getAnimatableNone: kT,
};
function yf(n, i, l) {
  return (
    l < 0 && (l += 1),
    l > 1 && (l -= 1),
    l < 1 / 6
      ? n + (i - n) * 6 * l
      : l < 1 / 2
      ? i
      : l < 2 / 3
      ? n + (i - n) * (2 / 3 - l) * 6
      : n
  );
}
function FT({ hue: n, saturation: i, lightness: l, alpha: o }) {
  (n /= 360), (i /= 100), (l /= 100);
  let c = 0,
    f = 0,
    d = 0;
  if (!i) c = f = d = l;
  else {
    const p = l < 0.5 ? l * (1 + i) : l + i - l * i,
      h = 2 * l - p;
    (c = yf(h, p, n + 1 / 3)), (f = yf(h, p, n)), (d = yf(h, p, n - 1 / 3));
  }
  return {
    red: Math.round(c * 255),
    green: Math.round(f * 255),
    blue: Math.round(d * 255),
    alpha: o,
  };
}
function Er(n, i) {
  return (l) => (l > 0 ? i : n);
}
const Pt = (n, i, l) => n + (i - n) * l,
  vf = (n, i, l) => {
    const o = n * n,
      c = l * (i * i - o) + o;
    return c < 0 ? 0 : Math.sqrt(c);
  },
  YT = [kf, fi, os],
  qT = (n) => YT.find((i) => i.test(n));
function Hy(n) {
  const i = qT(n);
  if (!i) return !1;
  let l = i.parse(n);
  return i === os && (l = FT(l)), l;
}
const _y = (n, i) => {
    const l = Hy(n),
      o = Hy(i);
    if (!l || !o) return Er(n, i);
    const c = { ...l };
    return (f) => (
      (c.red = vf(l.red, o.red, f)),
      (c.green = vf(l.green, o.green, f)),
      (c.blue = vf(l.blue, o.blue, f)),
      (c.alpha = Pt(l.alpha, o.alpha, f)),
      fi.transform(c)
    );
  },
  Ff = new Set(["none", "hidden"]);
function GT(n, i) {
  return Ff.has(n) ? (l) => (l <= 0 ? n : i) : (l) => (l >= 1 ? i : n);
}
function XT(n, i) {
  return (l) => Pt(n, i, l);
}
function Hd(n) {
  return typeof n == "number"
    ? XT
    : typeof n == "string"
    ? Od(n)
      ? Er
      : ae.test(n)
      ? _y
      : ZT
    : Array.isArray(n)
    ? Ax
    : typeof n == "object"
    ? ae.test(n)
      ? _y
      : PT
    : Er;
}
function Ax(n, i) {
  const l = [...n],
    o = l.length,
    c = n.map((f, d) => Hd(f)(f, i[d]));
  return (f) => {
    for (let d = 0; d < o; d++) l[d] = c[d](f);
    return l;
  };
}
function PT(n, i) {
  const l = { ...n, ...i },
    o = {};
  for (const c in l)
    n[c] !== void 0 && i[c] !== void 0 && (o[c] = Hd(n[c])(n[c], i[c]));
  return (c) => {
    for (const f in o) l[f] = o[f](c);
    return l;
  };
}
function KT(n, i) {
  const l = [],
    o = { color: 0, var: 0, number: 0 };
  for (let c = 0; c < i.values.length; c++) {
    const f = i.types[c],
      d = n.indexes[f][o[f]],
      p = n.values[d] ?? 0;
    (l[c] = p), o[f]++;
  }
  return l;
}
const ZT = (n, i) => {
  const l = La.createTransformer(i),
    o = Vl(n),
    c = Vl(i);
  return o.indexes.var.length === c.indexes.var.length &&
    o.indexes.color.length === c.indexes.color.length &&
    o.indexes.number.length >= c.indexes.number.length
    ? (Ff.has(n) && !c.values.length) || (Ff.has(i) && !o.values.length)
      ? GT(n, i)
      : Yl(Ax(KT(o, c), c.values), l)
    : Er(n, i);
};
function wx(n, i, l) {
  return typeof n == "number" && typeof i == "number" && typeof l == "number"
    ? Pt(n, i, l)
    : Hd(n)(n, i);
}
const QT = (n) => {
    const i = ({ timestamp: l }) => n(l);
    return {
      start: (l = !0) => Gt.update(i, l),
      stop: () => Va(i),
      now: () => (ye.isProcessing ? ye.timestamp : Ue.now()),
    };
  },
  Ex = (n, i, l = 10) => {
    let o = "";
    const c = Math.max(Math.round(i / l), 2);
    for (let f = 0; f < c; f++)
      o += Math.round(n(f / (c - 1)) * 1e4) / 1e4 + ", ";
    return `linear(${o.substring(0, o.length - 2)})`;
  },
  Tr = 2e4;
function _d(n) {
  let i = 0;
  const l = 50;
  let o = n.next(i);
  for (; !o.done && i < Tr; ) (i += l), (o = n.next(i));
  return i >= Tr ? 1 / 0 : i;
}
function JT(n, i = 100, l) {
  const o = l({ ...n, keyframes: [0, i] }),
    c = Math.min(_d(o), Tr);
  return {
    type: "keyframes",
    ease: (f) => o.next(c * f).value / i,
    duration: cn(c),
  };
}
const $T = 5;
function Tx(n, i, l) {
  const o = Math.max(i - $T, 0);
  return ix(l - n(o), i - o);
}
const Qt = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  xf = 0.001;
function IT({
  duration: n = Qt.duration,
  bounce: i = Qt.bounce,
  velocity: l = Qt.velocity,
  mass: o = Qt.mass,
}) {
  let c,
    f,
    d = 1 - i;
  (d = aa(Qt.minDamping, Qt.maxDamping, d)),
    (n = aa(Qt.minDuration, Qt.maxDuration, cn(n))),
    d < 1
      ? ((c = (m) => {
          const v = m * d,
            g = v * n,
            S = v - l,
            A = Yf(m, d),
            E = Math.exp(-g);
          return xf - (S / A) * E;
        }),
        (f = (m) => {
          const g = m * d * n,
            S = g * l + l,
            A = Math.pow(d, 2) * Math.pow(m, 2) * n,
            E = Math.exp(-g),
            O = Yf(Math.pow(m, 2), d);
          return ((-c(m) + xf > 0 ? -1 : 1) * ((S - A) * E)) / O;
        }))
      : ((c = (m) => {
          const v = Math.exp(-m * n),
            g = (m - l) * n + 1;
          return -xf + v * g;
        }),
        (f = (m) => {
          const v = Math.exp(-m * n),
            g = (l - m) * (n * n);
          return v * g;
        }));
  const p = 5 / n,
    h = t3(c, f, p);
  if (((n = Mn(n)), isNaN(h)))
    return { stiffness: Qt.stiffness, damping: Qt.damping, duration: n };
  {
    const m = Math.pow(h, 2) * o;
    return { stiffness: m, damping: d * 2 * Math.sqrt(o * m), duration: n };
  }
}
const WT = 12;
function t3(n, i, l) {
  let o = l;
  for (let c = 1; c < WT; c++) o = o - n(o) / i(o);
  return o;
}
function Yf(n, i) {
  return n * Math.sqrt(1 - i * i);
}
const e3 = ["duration", "bounce"],
  n3 = ["stiffness", "damping", "mass"];
function zy(n, i) {
  return i.some((l) => n[l] !== void 0);
}
function a3(n) {
  let i = {
    velocity: Qt.velocity,
    stiffness: Qt.stiffness,
    damping: Qt.damping,
    mass: Qt.mass,
    isResolvedFromDuration: !1,
    ...n,
  };
  if (!zy(n, n3) && zy(n, e3))
    if (n.visualDuration) {
      const l = n.visualDuration,
        o = (2 * Math.PI) / (l * 1.2),
        c = o * o,
        f = 2 * aa(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(c);
      i = { ...i, mass: Qt.mass, stiffness: c, damping: f };
    } else {
      const l = IT(n);
      (i = { ...i, ...l, mass: Qt.mass }), (i.isResolvedFromDuration = !0);
    }
  return i;
}
function Nr(n = Qt.visualDuration, i = Qt.bounce) {
  const l =
    typeof n != "object"
      ? { visualDuration: n, keyframes: [0, 1], bounce: i }
      : n;
  let { restSpeed: o, restDelta: c } = l;
  const f = l.keyframes[0],
    d = l.keyframes[l.keyframes.length - 1],
    p = { done: !1, value: f },
    {
      stiffness: h,
      damping: m,
      mass: v,
      duration: g,
      velocity: S,
      isResolvedFromDuration: A,
    } = a3({ ...l, velocity: -cn(l.velocity || 0) }),
    E = S || 0,
    O = m / (2 * Math.sqrt(h * v)),
    _ = d - f,
    R = cn(Math.sqrt(h / v)),
    X = Math.abs(_) < 5;
  o || (o = X ? Qt.restSpeed.granular : Qt.restSpeed.default),
    c || (c = X ? Qt.restDelta.granular : Qt.restDelta.default);
  let U;
  if (O < 1) {
    const Z = Yf(R, O);
    U = ($) => {
      const K = Math.exp(-O * R * $);
      return (
        d - K * (((E + O * R * _) / Z) * Math.sin(Z * $) + _ * Math.cos(Z * $))
      );
    };
  } else if (O === 1) U = (Z) => d - Math.exp(-R * Z) * (_ + (E + R * _) * Z);
  else {
    const Z = R * Math.sqrt(O * O - 1);
    U = ($) => {
      const K = Math.exp(-O * R * $),
        F = Math.min(Z * $, 300);
      return (
        d - (K * ((E + O * R * _) * Math.sinh(F) + Z * _ * Math.cosh(F))) / Z
      );
    };
  }
  const Q = {
    calculatedDuration: (A && g) || null,
    next: (Z) => {
      const $ = U(Z);
      if (A) p.done = Z >= g;
      else {
        let K = Z === 0 ? E : 0;
        O < 1 && (K = Z === 0 ? Mn(E) : Tx(U, Z, $));
        const F = Math.abs(K) <= o,
          ot = Math.abs(d - $) <= c;
        p.done = F && ot;
      }
      return (p.value = p.done ? d : $), p;
    },
    toString: () => {
      const Z = Math.min(_d(Q), Tr),
        $ = Ex((K) => Q.next(Z * K).value, Z, 30);
      return Z + "ms " + $;
    },
    toTransition: () => {},
  };
  return Q;
}
Nr.applyToOptions = (n) => {
  const i = JT(n, 100, Nr);
  return (
    (n.ease = i.ease), (n.duration = Mn(i.duration)), (n.type = "keyframes"), n
  );
};
function qf({
  keyframes: n,
  velocity: i = 0,
  power: l = 0.8,
  timeConstant: o = 325,
  bounceDamping: c = 10,
  bounceStiffness: f = 500,
  modifyTarget: d,
  min: p,
  max: h,
  restDelta: m = 0.5,
  restSpeed: v,
}) {
  const g = n[0],
    S = { done: !1, value: g },
    A = (F) => (p !== void 0 && F < p) || (h !== void 0 && F > h),
    E = (F) =>
      p === void 0
        ? h
        : h === void 0 || Math.abs(p - F) < Math.abs(h - F)
        ? p
        : h;
  let O = l * i;
  const _ = g + O,
    R = d === void 0 ? _ : d(_);
  R !== _ && (O = R - g);
  const X = (F) => -O * Math.exp(-F / o),
    U = (F) => R + X(F),
    Q = (F) => {
      const ot = X(F),
        ft = U(F);
      (S.done = Math.abs(ot) <= m), (S.value = S.done ? R : ft);
    };
  let Z, $;
  const K = (F) => {
    A(S.value) &&
      ((Z = F),
      ($ = Nr({
        keyframes: [S.value, E(S.value)],
        velocity: Tx(U, F, S.value),
        damping: c,
        stiffness: f,
        restDelta: m,
        restSpeed: v,
      })));
  };
  return (
    K(0),
    {
      calculatedDuration: null,
      next: (F) => {
        let ot = !1;
        return (
          !$ && Z === void 0 && ((ot = !0), Q(F), K(F)),
          Z !== void 0 && F >= Z ? $.next(F - Z) : (!ot && Q(F), S)
        );
      },
    }
  );
}
function i3(n, i, l) {
  const o = [],
    c = l || ia.mix || wx,
    f = n.length - 1;
  for (let d = 0; d < f; d++) {
    let p = c(n[d], n[d + 1]);
    if (i) {
      const h = Array.isArray(i) ? i[d] || un : i;
      p = Yl(h, p);
    }
    o.push(p);
  }
  return o;
}
function s3(n, i, { clamp: l = !0, ease: o, mixer: c } = {}) {
  const f = n.length;
  if ((Ed(f === i.length), f === 1)) return () => i[0];
  if (f === 2 && i[0] === i[1]) return () => i[1];
  const d = n[0] === n[1];
  n[0] > n[f - 1] && ((n = [...n].reverse()), (i = [...i].reverse()));
  const p = i3(i, o, c),
    h = p.length,
    m = (v) => {
      if (d && v < n[0]) return i[0];
      let g = 0;
      if (h > 1) for (; g < n.length - 2 && !(v < n[g + 1]); g++);
      const S = _l(n[g], n[g + 1], v);
      return p[g](S);
    };
  return l ? (v) => m(aa(n[0], n[f - 1], v)) : m;
}
function l3(n, i) {
  const l = n[n.length - 1];
  for (let o = 1; o <= i; o++) {
    const c = _l(0, i, o);
    n.push(Pt(l, 1, c));
  }
}
function o3(n) {
  const i = [0];
  return l3(i, n.length - 1), i;
}
function r3(n, i) {
  return n.map((l) => l * i);
}
function c3(n, i) {
  return n.map(() => i || mx).splice(0, n.length - 1);
}
function Dl({
  duration: n = 300,
  keyframes: i,
  times: l,
  ease: o = "easeInOut",
}) {
  const c = bT(o) ? o.map(Oy) : Oy(o),
    f = { done: !1, value: i[0] },
    d = r3(l && l.length === i.length ? l : o3(i), n),
    p = s3(d, i, { ease: Array.isArray(c) ? c : c3(i, c) });
  return {
    calculatedDuration: n,
    next: (h) => ((f.value = p(h)), (f.done = h >= n), f),
  };
}
const u3 = (n) => n !== null;
function zd(n, { repeat: i, repeatType: l = "loop" }, o, c = 1) {
  const f = n.filter(u3),
    p = c < 0 || (i && l !== "loop" && i % 2 === 1) ? 0 : f.length - 1;
  return !p || o === void 0 ? f[p] : o;
}
const f3 = { decay: qf, inertia: qf, tween: Dl, keyframes: Dl, spring: Nr };
function Nx(n) {
  typeof n.type == "string" && (n.type = f3[n.type]);
}
class Vd {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((i) => {
      this.resolve = i;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  then(i, l) {
    return this.finished.then(i, l);
  }
}
const d3 = (n) => n / 100;
class Ld extends Vd {
  constructor(i) {
    super(),
      (this.state = "idle"),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.stop = () => {
        const { motionValue: l } = this.options;
        l && l.updatedAt !== Ue.now() && this.tick(Ue.now()),
          (this.isStopped = !0),
          this.state !== "idle" && (this.teardown(), this.options.onStop?.());
      }),
      (this.options = i),
      this.initAnimation(),
      this.play(),
      i.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: i } = this;
    Nx(i);
    const {
      type: l = Dl,
      repeat: o = 0,
      repeatDelay: c = 0,
      repeatType: f,
      velocity: d = 0,
    } = i;
    let { keyframes: p } = i;
    const h = l || Dl;
    h !== Dl &&
      typeof p[0] != "number" &&
      ((this.mixKeyframes = Yl(d3, wx(p[0], p[1]))), (p = [0, 100]));
    const m = h({ ...i, keyframes: p });
    f === "mirror" &&
      (this.mirroredGenerator = h({
        ...i,
        keyframes: [...p].reverse(),
        velocity: -d,
      })),
      m.calculatedDuration === null && (m.calculatedDuration = _d(m));
    const { calculatedDuration: v } = m;
    (this.calculatedDuration = v),
      (this.resolvedDuration = v + c),
      (this.totalDuration = this.resolvedDuration * (o + 1) - c),
      (this.generator = m);
  }
  updateTime(i) {
    const l = Math.round(i - this.startTime) * this.playbackSpeed;
    this.holdTime !== null
      ? (this.currentTime = this.holdTime)
      : (this.currentTime = l);
  }
  tick(i, l = !1) {
    const {
      generator: o,
      totalDuration: c,
      mixKeyframes: f,
      mirroredGenerator: d,
      resolvedDuration: p,
      calculatedDuration: h,
    } = this;
    if (this.startTime === null) return o.next(0);
    const {
      delay: m = 0,
      keyframes: v,
      repeat: g,
      repeatType: S,
      repeatDelay: A,
      type: E,
      onUpdate: O,
      finalKeyframe: _,
    } = this.options;
    this.speed > 0
      ? (this.startTime = Math.min(this.startTime, i))
      : this.speed < 0 &&
        (this.startTime = Math.min(i - c / this.speed, this.startTime)),
      l ? (this.currentTime = i) : this.updateTime(i);
    const R = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1),
      X = this.playbackSpeed >= 0 ? R < 0 : R > c;
    (this.currentTime = Math.max(R, 0)),
      this.state === "finished" &&
        this.holdTime === null &&
        (this.currentTime = c);
    let U = this.currentTime,
      Q = o;
    if (g) {
      const F = Math.min(this.currentTime, c) / p;
      let ot = Math.floor(F),
        ft = F % 1;
      !ft && F >= 1 && (ft = 1),
        ft === 1 && ot--,
        (ot = Math.min(ot, g + 1)),
        !!(ot % 2) &&
          (S === "reverse"
            ? ((ft = 1 - ft), A && (ft -= A / p))
            : S === "mirror" && (Q = d)),
        (U = aa(0, 1, ft) * p);
    }
    const Z = X ? { done: !1, value: v[0] } : Q.next(U);
    f && (Z.value = f(Z.value));
    let { done: $ } = Z;
    !X &&
      h !== null &&
      ($ =
        this.playbackSpeed >= 0
          ? this.currentTime >= c
          : this.currentTime <= 0);
    const K =
      this.holdTime === null &&
      (this.state === "finished" || (this.state === "running" && $));
    return (
      K && E !== qf && (Z.value = zd(v, this.options, _, this.speed)),
      O && O(Z.value),
      K && this.finish(),
      Z
    );
  }
  then(i, l) {
    return this.finished.then(i, l);
  }
  get duration() {
    return cn(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: i = 0 } = this.options || {};
    return this.duration + cn(i);
  }
  get time() {
    return cn(this.currentTime);
  }
  set time(i) {
    (i = Mn(i)),
      (this.currentTime = i),
      this.startTime === null ||
      this.holdTime !== null ||
      this.playbackSpeed === 0
        ? (this.holdTime = i)
        : this.driver &&
          (this.startTime = this.driver.now() - i / this.playbackSpeed),
      this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(i) {
    this.updateTime(Ue.now());
    const l = this.playbackSpeed !== i;
    (this.playbackSpeed = i), l && (this.time = cn(this.currentTime));
  }
  play() {
    if (this.isStopped) return;
    const { driver: i = QT, startTime: l } = this.options;
    this.driver || (this.driver = i((c) => this.tick(c))),
      this.options.onPlay?.();
    const o = this.driver.now();
    this.state === "finished"
      ? (this.updateFinished(), (this.startTime = o))
      : this.holdTime !== null
      ? (this.startTime = o - this.holdTime)
      : this.startTime || (this.startTime = l ?? o),
      this.state === "finished" &&
        this.speed < 0 &&
        (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = "running"),
      this.driver.start();
  }
  pause() {
    (this.state = "paused"),
      this.updateTime(Ue.now()),
      (this.holdTime = this.currentTime);
  }
  complete() {
    this.state !== "running" && this.play(),
      (this.state = "finished"),
      (this.holdTime = null);
  }
  finish() {
    this.notifyFinished(),
      this.teardown(),
      (this.state = "finished"),
      this.options.onComplete?.();
  }
  cancel() {
    (this.holdTime = null),
      (this.startTime = 0),
      this.tick(0),
      this.teardown(),
      this.options.onCancel?.();
  }
  teardown() {
    (this.state = "idle"),
      this.stopDriver(),
      (this.startTime = this.holdTime = null);
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0));
  }
  sample(i) {
    return (this.startTime = 0), this.tick(i, !0);
  }
  attachTimeline(i) {
    return (
      this.options.allowFlatten &&
        ((this.options.type = "keyframes"),
        (this.options.ease = "linear"),
        this.initAnimation()),
      this.driver?.stop(),
      i.observe(this)
    );
  }
}
function m3(n) {
  for (let i = 1; i < n.length; i++) n[i] ?? (n[i] = n[i - 1]);
}
const di = (n) => (n * 180) / Math.PI,
  Gf = (n) => {
    const i = di(Math.atan2(n[1], n[0]));
    return Xf(i);
  },
  h3 = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
    rotate: Gf,
    rotateZ: Gf,
    skewX: (n) => di(Math.atan(n[1])),
    skewY: (n) => di(Math.atan(n[2])),
    skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2,
  },
  Xf = (n) => ((n = n % 360), n < 0 && (n += 360), n),
  Vy = Gf,
  Ly = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]),
  By = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]),
  p3 = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: Ly,
    scaleY: By,
    scale: (n) => (Ly(n) + By(n)) / 2,
    rotateX: (n) => Xf(di(Math.atan2(n[6], n[5]))),
    rotateY: (n) => Xf(di(Math.atan2(-n[2], n[0]))),
    rotateZ: Vy,
    rotate: Vy,
    skewX: (n) => di(Math.atan(n[4])),
    skewY: (n) => di(Math.atan(n[1])),
    skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2,
  };
function Pf(n) {
  return n.includes("scale") ? 1 : 0;
}
function Kf(n, i) {
  if (!n || n === "none") return Pf(i);
  const l = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let o, c;
  if (l) (o = p3), (c = l);
  else {
    const p = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    (o = h3), (c = p);
  }
  if (!c) return Pf(i);
  const f = o[i],
    d = c[1].split(",").map(y3);
  return typeof f == "function" ? f(d) : d[f];
}
const g3 = (n, i) => {
  const { transform: l = "none" } = getComputedStyle(n);
  return Kf(l, i);
};
function y3(n) {
  return parseFloat(n.trim());
}
const ws = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
  ],
  Es = new Set(ws),
  Uy = (n) => n === As || n === dt,
  v3 = new Set(["x", "y", "z"]),
  x3 = ws.filter((n) => !v3.has(n));
function b3(n) {
  const i = [];
  return (
    x3.forEach((l) => {
      const o = n.getValue(l);
      o !== void 0 &&
        (i.push([l, o.get()]), o.set(l.startsWith("scale") ? 1 : 0));
    }),
    i
  );
}
const mi = {
  width: ({ x: n }, { paddingLeft: i = "0", paddingRight: l = "0" }) =>
    n.max - n.min - parseFloat(i) - parseFloat(l),
  height: ({ y: n }, { paddingTop: i = "0", paddingBottom: l = "0" }) =>
    n.max - n.min - parseFloat(i) - parseFloat(l),
  top: (n, { top: i }) => parseFloat(i),
  left: (n, { left: i }) => parseFloat(i),
  bottom: ({ y: n }, { top: i }) => parseFloat(i) + (n.max - n.min),
  right: ({ x: n }, { left: i }) => parseFloat(i) + (n.max - n.min),
  x: (n, { transform: i }) => Kf(i, "x"),
  y: (n, { transform: i }) => Kf(i, "y"),
};
mi.translateX = mi.x;
mi.translateY = mi.y;
const hi = new Set();
let Zf = !1,
  Qf = !1,
  Jf = !1;
function Dx() {
  if (Qf) {
    const n = Array.from(hi).filter((o) => o.needsMeasurement),
      i = new Set(n.map((o) => o.element)),
      l = new Map();
    i.forEach((o) => {
      const c = b3(o);
      c.length && (l.set(o, c), o.render());
    }),
      n.forEach((o) => o.measureInitialState()),
      i.forEach((o) => {
        o.render();
        const c = l.get(o);
        c &&
          c.forEach(([f, d]) => {
            o.getValue(f)?.set(d);
          });
      }),
      n.forEach((o) => o.measureEndState()),
      n.forEach((o) => {
        o.suspendedScrollY !== void 0 && window.scrollTo(0, o.suspendedScrollY);
      });
  }
  (Qf = !1), (Zf = !1), hi.forEach((n) => n.complete(Jf)), hi.clear();
}
function Cx() {
  hi.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Qf = !0);
  });
}
function S3() {
  (Jf = !0), Cx(), Dx(), (Jf = !1);
}
class Bd {
  constructor(i, l, o, c, f, d = !1) {
    (this.state = "pending"),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...i]),
      (this.onComplete = l),
      (this.name = o),
      (this.motionValue = c),
      (this.element = f),
      (this.isAsync = d);
  }
  scheduleResolve() {
    (this.state = "scheduled"),
      this.isAsync
        ? (hi.add(this),
          Zf || ((Zf = !0), Gt.read(Cx), Gt.resolveKeyframes(Dx)))
        : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const {
      unresolvedKeyframes: i,
      name: l,
      element: o,
      motionValue: c,
    } = this;
    if (i[0] === null) {
      const f = c?.get(),
        d = i[i.length - 1];
      if (f !== void 0) i[0] = f;
      else if (o && l) {
        const p = o.readValue(l, d);
        p != null && (i[0] = p);
      }
      i[0] === void 0 && (i[0] = d), c && f === void 0 && c.set(i[0]);
    }
    m3(i);
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(i = !1) {
    (this.state = "complete"),
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, i),
      hi.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (hi.delete(this), (this.state = "pending"));
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const A3 = (n) => n.startsWith("--");
function w3(n, i, l) {
  A3(i) ? n.style.setProperty(i, l) : (n.style[i] = l);
}
const E3 = Td(() => window.ScrollTimeline !== void 0),
  T3 = {};
function N3(n, i) {
  const l = Td(n);
  return () => T3[i] ?? l();
}
const Mx = N3(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing"),
  El = ([n, i, l, o]) => `cubic-bezier(${n}, ${i}, ${l}, ${o})`,
  ky = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: El([0, 0.65, 0.55, 1]),
    circOut: El([0.55, 0, 1, 0.45]),
    backIn: El([0.31, 0.01, 0.66, -0.59]),
    backOut: El([0.33, 1.53, 0.69, 0.99]),
  };
function Ox(n, i) {
  if (n)
    return typeof n == "function"
      ? Mx()
        ? Ex(n, i)
        : "ease-out"
      : hx(n)
      ? El(n)
      : Array.isArray(n)
      ? n.map((l) => Ox(l, i) || ky.easeOut)
      : ky[n];
}
function D3(
  n,
  i,
  l,
  {
    delay: o = 0,
    duration: c = 300,
    repeat: f = 0,
    repeatType: d = "loop",
    ease: p = "easeOut",
    times: h,
  } = {},
  m = void 0
) {
  const v = { [i]: l };
  h && (v.offset = h);
  const g = Ox(p, c);
  Array.isArray(g) && (v.easing = g);
  const S = {
    delay: o,
    duration: c,
    easing: Array.isArray(g) ? "linear" : g,
    fill: "both",
    iterations: f + 1,
    direction: d === "reverse" ? "alternate" : "normal",
  };
  return m && (S.pseudoElement = m), n.animate(v, S);
}
function Rx(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function C3({ type: n, ...i }) {
  return Rx(n) && Mx()
    ? n.applyToOptions(i)
    : (i.duration ?? (i.duration = 300), i.ease ?? (i.ease = "easeOut"), i);
}
class M3 extends Vd {
  constructor(i) {
    if ((super(), (this.finishedTime = null), (this.isStopped = !1), !i))
      return;
    const {
      element: l,
      name: o,
      keyframes: c,
      pseudoElement: f,
      allowFlatten: d = !1,
      finalKeyframe: p,
      onComplete: h,
    } = i;
    (this.isPseudoElement = !!f),
      (this.allowFlatten = d),
      (this.options = i),
      Ed(typeof i.type != "string");
    const m = C3(i);
    (this.animation = D3(l, o, c, m, f)),
      m.autoplay === !1 && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !f)) {
          const v = zd(c, this.options, p, this.speed);
          this.updateMotionValue ? this.updateMotionValue(v) : w3(l, o, v),
            this.animation.cancel();
        }
        h?.(), this.notifyFinished();
      });
  }
  play() {
    this.isStopped ||
      (this.animation.play(),
      this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {}
  }
  stop() {
    if (this.isStopped) return;
    this.isStopped = !0;
    const { state: i } = this;
    i === "idle" ||
      i === "finished" ||
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
      this.isPseudoElement || this.cancel());
  }
  commitStyles() {
    this.isPseudoElement || this.animation.commitStyles?.();
  }
  get duration() {
    const i = this.animation.effect?.getComputedTiming?.().duration || 0;
    return cn(Number(i));
  }
  get iterationDuration() {
    const { delay: i = 0 } = this.options || {};
    return this.duration + cn(i);
  }
  get time() {
    return cn(Number(this.animation.currentTime) || 0);
  }
  set time(i) {
    (this.finishedTime = null), (this.animation.currentTime = Mn(i));
  }
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(i) {
    i < 0 && (this.finishedTime = null), (this.animation.playbackRate = i);
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(i) {
    this.animation.startTime = i;
  }
  attachTimeline({ timeline: i, observe: l }) {
    return (
      this.allowFlatten &&
        this.animation.effect?.updateTiming({ easing: "linear" }),
      (this.animation.onfinish = null),
      i && E3() ? ((this.animation.timeline = i), un) : l(this)
    );
  }
}
const jx = { anticipate: ux, backInOut: cx, circInOut: dx };
function O3(n) {
  return n in jx;
}
function R3(n) {
  typeof n.ease == "string" && O3(n.ease) && (n.ease = jx[n.ease]);
}
const Fy = 10;
class j3 extends M3 {
  constructor(i) {
    R3(i),
      Nx(i),
      super(i),
      i.startTime && (this.startTime = i.startTime),
      (this.options = i);
  }
  updateMotionValue(i) {
    const {
      motionValue: l,
      onUpdate: o,
      onComplete: c,
      element: f,
      ...d
    } = this.options;
    if (!l) return;
    if (i !== void 0) {
      l.set(i);
      return;
    }
    const p = new Ld({ ...d, autoplay: !1 }),
      h = Mn(this.finishedTime ?? this.time);
    l.setWithVelocity(p.sample(h - Fy).value, p.sample(h).value, Fy), p.stop();
  }
}
const Yy = (n, i) =>
  i === "zIndex"
    ? !1
    : !!(
        typeof n == "number" ||
        Array.isArray(n) ||
        (typeof n == "string" &&
          (La.test(n) || n === "0") &&
          !n.startsWith("url("))
      );
function H3(n) {
  const i = n[0];
  if (n.length === 1) return !0;
  for (let l = 0; l < n.length; l++) if (n[l] !== i) return !0;
}
function _3(n, i, l, o) {
  const c = n[0];
  if (c === null) return !1;
  if (i === "display" || i === "visibility") return !0;
  const f = n[n.length - 1],
    d = Yy(c, i),
    p = Yy(f, i);
  return !d || !p ? !1 : H3(n) || ((l === "spring" || Rx(l)) && o);
}
function $f(n) {
  (n.duration = 0), (n.type = "keyframes");
}
const z3 = new Set(["opacity", "clipPath", "filter", "transform"]),
  V3 = Td(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function L3(n) {
  const {
    motionValue: i,
    name: l,
    repeatDelay: o,
    repeatType: c,
    damping: f,
    type: d,
  } = n;
  if (!(i?.owner?.current instanceof HTMLElement)) return !1;
  const { onUpdate: h, transformTemplate: m } = i.owner.getProps();
  return (
    V3() &&
    l &&
    z3.has(l) &&
    (l !== "transform" || !m) &&
    !h &&
    !o &&
    c !== "mirror" &&
    f !== 0 &&
    d !== "inertia"
  );
}
const B3 = 40;
class U3 extends Vd {
  constructor({
    autoplay: i = !0,
    delay: l = 0,
    type: o = "keyframes",
    repeat: c = 0,
    repeatDelay: f = 0,
    repeatType: d = "loop",
    keyframes: p,
    name: h,
    motionValue: m,
    element: v,
    ...g
  }) {
    super(),
      (this.stop = () => {
        this._animation && (this._animation.stop(), this.stopTimeline?.()),
          this.keyframeResolver?.cancel();
      }),
      (this.createdAt = Ue.now());
    const S = {
        autoplay: i,
        delay: l,
        type: o,
        repeat: c,
        repeatDelay: f,
        repeatType: d,
        name: h,
        motionValue: m,
        element: v,
        ...g,
      },
      A = v?.KeyframeResolver || Bd;
    (this.keyframeResolver = new A(
      p,
      (E, O, _) => this.onKeyframesResolved(E, O, S, !_),
      h,
      m,
      v
    )),
      this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(i, l, o, c) {
    this.keyframeResolver = void 0;
    const {
      name: f,
      type: d,
      velocity: p,
      delay: h,
      isHandoff: m,
      onUpdate: v,
    } = o;
    (this.resolvedAt = Ue.now()),
      _3(i, f, d, p) ||
        ((ia.instantAnimations || !h) && v?.(zd(i, o, l)),
        (i[0] = i[i.length - 1]),
        $f(o),
        (o.repeat = 0));
    const S = {
        startTime: c
          ? this.resolvedAt
            ? this.resolvedAt - this.createdAt > B3
              ? this.resolvedAt
              : this.createdAt
            : this.createdAt
          : void 0,
        finalKeyframe: l,
        ...o,
        keyframes: i,
      },
      A =
        !m && L3(S)
          ? new j3({ ...S, element: S.motionValue.owner.current })
          : new Ld(S);
    A.finished.then(() => this.notifyFinished()).catch(un),
      this.pendingTimeline &&
        ((this.stopTimeline = A.attachTimeline(this.pendingTimeline)),
        (this.pendingTimeline = void 0)),
      (this._animation = A);
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(i, l) {
    return this.finished.finally(i).then(() => {});
  }
  get animation() {
    return (
      this._animation || (this.keyframeResolver?.resume(), S3()),
      this._animation
    );
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(i) {
    this.animation.time = i;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(i) {
    this.animation.speed = i;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(i) {
    return (
      this._animation
        ? (this.stopTimeline = this.animation.attachTimeline(i))
        : (this.pendingTimeline = i),
      () => this.stop()
    );
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
const k3 = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function F3(n) {
  const i = k3.exec(n);
  if (!i) return [,];
  const [, l, o, c] = i;
  return [`--${l ?? o}`, c];
}
function Hx(n, i, l = 1) {
  const [o, c] = F3(n);
  if (!o) return;
  const f = window.getComputedStyle(i).getPropertyValue(o);
  if (f) {
    const d = f.trim();
    return ex(d) ? parseFloat(d) : d;
  }
  return Od(c) ? Hx(c, i, l + 1) : c;
}
function Ud(n, i) {
  return n?.[i] ?? n?.default ?? n;
}
const _x = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...ws,
  ]),
  Y3 = { test: (n) => n === "auto", parse: (n) => n },
  zx = (n) => (i) => i.test(n),
  Vx = [As, dt, On, Ha, HT, jT, Y3],
  qy = (n) => Vx.find(zx(n));
function q3(n) {
  return typeof n == "number"
    ? n === 0
    : n !== null
    ? n === "none" || n === "0" || ax(n)
    : !0;
}
const G3 = new Set(["brightness", "contrast", "saturate", "opacity"]);
function X3(n) {
  const [i, l] = n.slice(0, -1).split("(");
  if (i === "drop-shadow") return n;
  const [o] = l.match(Rd) || [];
  if (!o) return n;
  const c = l.replace(o, "");
  let f = G3.has(i) ? 1 : 0;
  return o !== l && (f *= 100), i + "(" + f + c + ")";
}
const P3 = /\b([a-z-]*)\(.*?\)/gu,
  If = {
    ...La,
    getAnimatableNone: (n) => {
      const i = n.match(P3);
      return i ? i.map(X3).join(" ") : n;
    },
  },
  Gy = { ...As, transform: Math.round },
  K3 = {
    rotate: Ha,
    rotateX: Ha,
    rotateY: Ha,
    rotateZ: Ha,
    scale: mr,
    scaleX: mr,
    scaleY: mr,
    scaleZ: mr,
    skew: Ha,
    skewX: Ha,
    skewY: Ha,
    distance: dt,
    translateX: dt,
    translateY: dt,
    translateZ: dt,
    x: dt,
    y: dt,
    z: dt,
    perspective: dt,
    transformPerspective: dt,
    opacity: zl,
    originX: Ry,
    originY: Ry,
    originZ: dt,
  },
  kd = {
    borderWidth: dt,
    borderTopWidth: dt,
    borderRightWidth: dt,
    borderBottomWidth: dt,
    borderLeftWidth: dt,
    borderRadius: dt,
    radius: dt,
    borderTopLeftRadius: dt,
    borderTopRightRadius: dt,
    borderBottomRightRadius: dt,
    borderBottomLeftRadius: dt,
    width: dt,
    maxWidth: dt,
    height: dt,
    maxHeight: dt,
    top: dt,
    right: dt,
    bottom: dt,
    left: dt,
    padding: dt,
    paddingTop: dt,
    paddingRight: dt,
    paddingBottom: dt,
    paddingLeft: dt,
    margin: dt,
    marginTop: dt,
    marginRight: dt,
    marginBottom: dt,
    marginLeft: dt,
    backgroundPositionX: dt,
    backgroundPositionY: dt,
    ...K3,
    zIndex: Gy,
    fillOpacity: zl,
    strokeOpacity: zl,
    numOctaves: Gy,
  },
  Z3 = {
    ...kd,
    color: ae,
    backgroundColor: ae,
    outlineColor: ae,
    fill: ae,
    stroke: ae,
    borderColor: ae,
    borderTopColor: ae,
    borderRightColor: ae,
    borderBottomColor: ae,
    borderLeftColor: ae,
    filter: If,
    WebkitFilter: If,
  },
  Lx = (n) => Z3[n];
function Bx(n, i) {
  let l = Lx(n);
  return (
    l !== If && (l = La), l.getAnimatableNone ? l.getAnimatableNone(i) : void 0
  );
}
const Q3 = new Set(["auto", "none", "0"]);
function J3(n, i, l) {
  let o = 0,
    c;
  for (; o < n.length && !c; ) {
    const f = n[o];
    typeof f == "string" && !Q3.has(f) && Vl(f).values.length && (c = n[o]),
      o++;
  }
  if (c && l) for (const f of i) n[f] = Bx(l, c);
}
class $3 extends Bd {
  constructor(i, l, o, c, f) {
    super(i, l, o, c, f, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: i, element: l, name: o } = this;
    if (!l || !l.current) return;
    super.readKeyframes();
    for (let h = 0; h < i.length; h++) {
      let m = i[h];
      if (typeof m == "string" && ((m = m.trim()), Od(m))) {
        const v = Hx(m, l.current);
        v !== void 0 && (i[h] = v),
          h === i.length - 1 && (this.finalKeyframe = m);
      }
    }
    if ((this.resolveNoneKeyframes(), !_x.has(o) || i.length !== 2)) return;
    const [c, f] = i,
      d = qy(c),
      p = qy(f);
    if (d !== p)
      if (Uy(d) && Uy(p))
        for (let h = 0; h < i.length; h++) {
          const m = i[h];
          typeof m == "string" && (i[h] = parseFloat(m));
        }
      else mi[o] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: i, name: l } = this,
      o = [];
    for (let c = 0; c < i.length; c++) (i[c] === null || q3(i[c])) && o.push(c);
    o.length && J3(i, o, l);
  }
  measureInitialState() {
    const { element: i, unresolvedKeyframes: l, name: o } = this;
    if (!i || !i.current) return;
    o === "height" && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = mi[o](
        i.measureViewportBox(),
        window.getComputedStyle(i.current)
      )),
      (l[0] = this.measuredOrigin);
    const c = l[l.length - 1];
    c !== void 0 && i.getValue(o, c).jump(c, !1);
  }
  measureEndState() {
    const { element: i, name: l, unresolvedKeyframes: o } = this;
    if (!i || !i.current) return;
    const c = i.getValue(l);
    c && c.jump(this.measuredOrigin, !1);
    const f = o.length - 1,
      d = o[f];
    (o[f] = mi[l](i.measureViewportBox(), window.getComputedStyle(i.current))),
      d !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = d),
      this.removedTransforms?.length &&
        this.removedTransforms.forEach(([p, h]) => {
          i.getValue(p).set(h);
        }),
      this.resolveNoneKeyframes();
  }
}
function I3(n, i, l) {
  if (n instanceof EventTarget) return [n];
  if (typeof n == "string") {
    let o = document;
    const c = l?.[n] ?? o.querySelectorAll(n);
    return c ? Array.from(c) : [];
  }
  return Array.from(n);
}
const Ux = (n, i) => (i && typeof n == "number" ? i.transform(n) : n);
function W3(n) {
  return nx(n) && "offsetHeight" in n;
}
const Xy = 30,
  t4 = (n) => !isNaN(parseFloat(n));
class e4 {
  constructor(i, l = {}) {
    (this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (o) => {
        const c = Ue.now();
        if (
          (this.updatedAt !== c && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(o),
          this.current !== this.prev &&
            (this.events.change?.notify(this.current), this.dependents))
        )
          for (const f of this.dependents) f.dirty();
      }),
      (this.hasAnimated = !1),
      this.setCurrent(i),
      (this.owner = l.owner);
  }
  setCurrent(i) {
    (this.current = i),
      (this.updatedAt = Ue.now()),
      this.canTrackVelocity === null &&
        i !== void 0 &&
        (this.canTrackVelocity = t4(this.current));
  }
  setPrevFrameValue(i = this.current) {
    (this.prevFrameValue = i), (this.prevUpdatedAt = this.updatedAt);
  }
  onChange(i) {
    return this.on("change", i);
  }
  on(i, l) {
    this.events[i] || (this.events[i] = new Nd());
    const o = this.events[i].add(l);
    return i === "change"
      ? () => {
          o(),
            Gt.read(() => {
              this.events.change.getSize() || this.stop();
            });
        }
      : o;
  }
  clearListeners() {
    for (const i in this.events) this.events[i].clear();
  }
  attach(i, l) {
    (this.passiveEffect = i), (this.stopPassiveEffect = l);
  }
  set(i) {
    this.passiveEffect
      ? this.passiveEffect(i, this.updateAndNotify)
      : this.updateAndNotify(i);
  }
  setWithVelocity(i, l, o) {
    this.set(l),
      (this.prev = void 0),
      (this.prevFrameValue = i),
      (this.prevUpdatedAt = this.updatedAt - o);
  }
  jump(i, l = !0) {
    this.updateAndNotify(i),
      (this.prev = i),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      l && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(i) {
    this.dependents || (this.dependents = new Set()), this.dependents.add(i);
  }
  removeDependent(i) {
    this.dependents && this.dependents.delete(i);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    const i = Ue.now();
    if (
      !this.canTrackVelocity ||
      this.prevFrameValue === void 0 ||
      i - this.updatedAt > Xy
    )
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, Xy);
    return ix(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
  }
  start(i) {
    return (
      this.stop(),
      new Promise((l) => {
        (this.hasAnimated = !0),
          (this.animation = i(l)),
          this.events.animationStart && this.events.animationStart.notify();
      }).then(() => {
        this.events.animationComplete && this.events.animationComplete.notify(),
          this.clearAnimation();
      })
    );
  }
  stop() {
    this.animation &&
      (this.animation.stop(),
      this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation();
  }
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  destroy() {
    this.dependents?.clear(),
      this.events.destroy?.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function gs(n, i) {
  return new e4(n, i);
}
const { schedule: Fd } = px(queueMicrotask, !1),
  yn = { x: !1, y: !1 };
function kx() {
  return yn.x || yn.y;
}
function n4(n) {
  return n === "x" || n === "y"
    ? yn[n]
      ? null
      : ((yn[n] = !0),
        () => {
          yn[n] = !1;
        })
    : yn.x || yn.y
    ? null
    : ((yn.x = yn.y = !0),
      () => {
        yn.x = yn.y = !1;
      });
}
function Fx(n, i) {
  const l = I3(n),
    o = new AbortController(),
    c = { passive: !0, ...i, signal: o.signal };
  return [l, c, () => o.abort()];
}
function Py(n) {
  return !(n.pointerType === "touch" || kx());
}
function a4(n, i, l = {}) {
  const [o, c, f] = Fx(n, l),
    d = (p) => {
      if (!Py(p)) return;
      const { target: h } = p,
        m = i(h, p);
      if (typeof m != "function" || !h) return;
      const v = (g) => {
        Py(g) && (m(g), h.removeEventListener("pointerleave", v));
      };
      h.addEventListener("pointerleave", v, c);
    };
  return (
    o.forEach((p) => {
      p.addEventListener("pointerenter", d, c);
    }),
    f
  );
}
const Yx = (n, i) => (i ? (n === i ? !0 : Yx(n, i.parentElement)) : !1),
  Yd = (n) =>
    n.pointerType === "mouse"
      ? typeof n.button != "number" || n.button <= 0
      : n.isPrimary !== !1,
  i4 = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function s4(n) {
  return i4.has(n.tagName) || n.tabIndex !== -1;
}
const yr = new WeakSet();
function Ky(n) {
  return (i) => {
    i.key === "Enter" && n(i);
  };
}
function bf(n, i) {
  n.dispatchEvent(
    new PointerEvent("pointer" + i, { isPrimary: !0, bubbles: !0 })
  );
}
const l4 = (n, i) => {
  const l = n.currentTarget;
  if (!l) return;
  const o = Ky(() => {
    if (yr.has(l)) return;
    bf(l, "down");
    const c = Ky(() => {
        bf(l, "up");
      }),
      f = () => bf(l, "cancel");
    l.addEventListener("keyup", c, i), l.addEventListener("blur", f, i);
  });
  l.addEventListener("keydown", o, i),
    l.addEventListener("blur", () => l.removeEventListener("keydown", o), i);
};
function Zy(n) {
  return Yd(n) && !kx();
}
function o4(n, i, l = {}) {
  const [o, c, f] = Fx(n, l),
    d = (p) => {
      const h = p.currentTarget;
      if (!Zy(p)) return;
      yr.add(h);
      const m = i(h, p),
        v = (A, E) => {
          window.removeEventListener("pointerup", g),
            window.removeEventListener("pointercancel", S),
            yr.has(h) && yr.delete(h),
            Zy(A) && typeof m == "function" && m(A, { success: E });
        },
        g = (A) => {
          v(
            A,
            h === window ||
              h === document ||
              l.useGlobalTarget ||
              Yx(h, A.target)
          );
        },
        S = (A) => {
          v(A, !1);
        };
      window.addEventListener("pointerup", g, c),
        window.addEventListener("pointercancel", S, c);
    };
  return (
    o.forEach((p) => {
      (l.useGlobalTarget ? window : p).addEventListener("pointerdown", d, c),
        W3(p) &&
          (p.addEventListener("focus", (m) => l4(m, c)),
          !s4(p) && !p.hasAttribute("tabindex") && (p.tabIndex = 0));
    }),
    f
  );
}
function qx(n) {
  return nx(n) && "ownerSVGElement" in n;
}
function r4(n) {
  return qx(n) && n.tagName === "svg";
}
const Se = (n) => !!(n && n.getVelocity),
  c4 = [...Vx, ae, La],
  u4 = (n) => c4.find(zx(n)),
  Gx = D.createContext({
    transformPagePoint: (n) => n,
    isStatic: !1,
    reducedMotion: "never",
  });
function f4(n = !0) {
  const i = D.useContext(Sd);
  if (i === null) return [!0, null];
  const { isPresent: l, onExitComplete: o, register: c } = i,
    f = D.useId();
  D.useEffect(() => {
    if (n) return c(f);
  }, [n]);
  const d = D.useCallback(() => n && o && o(f), [f, o, n]);
  return !l && o ? [!1, d] : [!0];
}
const Xx = D.createContext({ strict: !1 }),
  Qy = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
  },
  ys = {};
for (const n in Qy) ys[n] = { isEnabled: (i) => Qy[n].some((l) => !!i[l]) };
function d4(n) {
  for (const i in n) ys[i] = { ...ys[i], ...n[i] };
}
const m4 = new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport",
]);
function Dr(n) {
  return (
    n.startsWith("while") ||
    (n.startsWith("drag") && n !== "draggable") ||
    n.startsWith("layout") ||
    n.startsWith("onTap") ||
    n.startsWith("onPan") ||
    n.startsWith("onLayout") ||
    m4.has(n)
  );
}
let Px = (n) => !Dr(n);
function h4(n) {
  typeof n == "function" && (Px = (i) => (i.startsWith("on") ? !Dr(i) : n(i)));
}
try {
  h4(require("@emotion/is-prop-valid").default);
} catch {}
function p4(n, i, l) {
  const o = {};
  for (const c in n)
    (c === "values" && typeof n.values == "object") ||
      ((Px(c) ||
        (l === !0 && Dr(c)) ||
        (!i && !Dr(c)) ||
        (n.draggable && c.startsWith("onDrag"))) &&
        (o[c] = n[c]));
  return o;
}
const kr = D.createContext({});
function Fr(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function Ll(n) {
  return typeof n == "string" || Array.isArray(n);
}
const qd = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
  ],
  Gd = ["initial", ...qd];
function Yr(n) {
  return Fr(n.animate) || Gd.some((i) => Ll(n[i]));
}
function Kx(n) {
  return !!(Yr(n) || n.variants);
}
function g4(n, i) {
  if (Yr(n)) {
    const { initial: l, animate: o } = n;
    return {
      initial: l === !1 || Ll(l) ? l : void 0,
      animate: Ll(o) ? o : void 0,
    };
  }
  return n.inherit !== !1 ? i : {};
}
function y4(n) {
  const { initial: i, animate: l } = g4(n, D.useContext(kr));
  return D.useMemo(() => ({ initial: i, animate: l }), [Jy(i), Jy(l)]);
}
function Jy(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const Bl = {};
function v4(n) {
  for (const i in n) (Bl[i] = n[i]), Md(i) && (Bl[i].isCSSVariable = !0);
}
function Zx(n, { layout: i, layoutId: l }) {
  return (
    Es.has(n) ||
    n.startsWith("origin") ||
    ((i || l !== void 0) && (!!Bl[n] || n === "opacity"))
  );
}
const x4 = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  b4 = ws.length;
function S4(n, i, l) {
  let o = "",
    c = !0;
  for (let f = 0; f < b4; f++) {
    const d = ws[f],
      p = n[d];
    if (p === void 0) continue;
    let h = !0;
    if (
      (typeof p == "number"
        ? (h = p === (d.startsWith("scale") ? 1 : 0))
        : (h = parseFloat(p) === 0),
      !h || l)
    ) {
      const m = Ux(p, kd[d]);
      if (!h) {
        c = !1;
        const v = x4[d] || d;
        o += `${v}(${m}) `;
      }
      l && (i[d] = m);
    }
  }
  return (o = o.trim()), l ? (o = l(i, c ? "" : o)) : c && (o = "none"), o;
}
function Xd(n, i, l) {
  const { style: o, vars: c, transformOrigin: f } = n;
  let d = !1,
    p = !1;
  for (const h in i) {
    const m = i[h];
    if (Es.has(h)) {
      d = !0;
      continue;
    } else if (Md(h)) {
      c[h] = m;
      continue;
    } else {
      const v = Ux(m, kd[h]);
      h.startsWith("origin") ? ((p = !0), (f[h] = v)) : (o[h] = v);
    }
  }
  if (
    (i.transform ||
      (d || l
        ? (o.transform = S4(i, n.transform, l))
        : o.transform && (o.transform = "none")),
    p)
  ) {
    const { originX: h = "50%", originY: m = "50%", originZ: v = 0 } = f;
    o.transformOrigin = `${h} ${m} ${v}`;
  }
}
const Pd = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function Qx(n, i, l) {
  for (const o in i) !Se(i[o]) && !Zx(o, l) && (n[o] = i[o]);
}
function A4({ transformTemplate: n }, i) {
  return D.useMemo(() => {
    const l = Pd();
    return Xd(l, i, n), Object.assign({}, l.vars, l.style);
  }, [i]);
}
function w4(n, i) {
  const l = n.style || {},
    o = {};
  return Qx(o, l, n), Object.assign(o, A4(n, i)), o;
}
function E4(n, i) {
  const l = {},
    o = w4(n, i);
  return (
    n.drag &&
      n.dragListener !== !1 &&
      ((l.draggable = !1),
      (o.userSelect = o.WebkitUserSelect = o.WebkitTouchCallout = "none"),
      (o.touchAction =
        n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`)),
    n.tabIndex === void 0 &&
      (n.onTap || n.onTapStart || n.whileTap) &&
      (l.tabIndex = 0),
    (l.style = o),
    l
  );
}
const T4 = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  N4 = { offset: "strokeDashoffset", array: "strokeDasharray" };
function D4(n, i, l = 1, o = 0, c = !0) {
  n.pathLength = 1;
  const f = c ? T4 : N4;
  n[f.offset] = dt.transform(-o);
  const d = dt.transform(i),
    p = dt.transform(l);
  n[f.array] = `${d} ${p}`;
}
function Jx(
  n,
  {
    attrX: i,
    attrY: l,
    attrScale: o,
    pathLength: c,
    pathSpacing: f = 1,
    pathOffset: d = 0,
    ...p
  },
  h,
  m,
  v
) {
  if ((Xd(n, p, m), h)) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  (n.attrs = n.style), (n.style = {});
  const { attrs: g, style: S } = n;
  g.transform && ((S.transform = g.transform), delete g.transform),
    (S.transform || g.transformOrigin) &&
      ((S.transformOrigin = g.transformOrigin ?? "50% 50%"),
      delete g.transformOrigin),
    S.transform &&
      ((S.transformBox = v?.transformBox ?? "fill-box"), delete g.transformBox),
    i !== void 0 && (g.x = i),
    l !== void 0 && (g.y = l),
    o !== void 0 && (g.scale = o),
    c !== void 0 && D4(g, c, f, d, !1);
}
const $x = () => ({ ...Pd(), attrs: {} }),
  Ix = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function C4(n, i, l, o) {
  const c = D.useMemo(() => {
    const f = $x();
    return (
      Jx(f, i, Ix(o), n.transformTemplate, n.style),
      { ...f.attrs, style: { ...f.style } }
    );
  }, [i]);
  if (n.style) {
    const f = {};
    Qx(f, n.style, n), (c.style = { ...f, ...c.style });
  }
  return c;
}
const M4 = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view",
];
function Kd(n) {
  return typeof n != "string" || n.includes("-")
    ? !1
    : !!(M4.indexOf(n) > -1 || /[A-Z]/u.test(n));
}
function O4(n, i, l, { latestValues: o }, c, f = !1) {
  const p = (Kd(n) ? C4 : E4)(i, o, c, n),
    h = p4(i, typeof n == "string", f),
    m = n !== D.Fragment ? { ...h, ...p, ref: l } : {},
    { children: v } = i,
    g = D.useMemo(() => (Se(v) ? v.get() : v), [v]);
  return D.createElement(n, { ...m, children: g });
}
function $y(n) {
  const i = [{}, {}];
  return (
    n?.values.forEach((l, o) => {
      (i[0][o] = l.get()), (i[1][o] = l.getVelocity());
    }),
    i
  );
}
function Zd(n, i, l, o) {
  if (typeof i == "function") {
    const [c, f] = $y(o);
    i = i(l !== void 0 ? l : n.custom, c, f);
  }
  if (
    (typeof i == "string" && (i = n.variants && n.variants[i]),
    typeof i == "function")
  ) {
    const [c, f] = $y(o);
    i = i(l !== void 0 ? l : n.custom, c, f);
  }
  return i;
}
function vr(n) {
  return Se(n) ? n.get() : n;
}
function R4({ scrapeMotionValuesFromProps: n, createRenderState: i }, l, o, c) {
  return { latestValues: j4(l, o, c, n), renderState: i() };
}
function j4(n, i, l, o) {
  const c = {},
    f = o(n, {});
  for (const S in f) c[S] = vr(f[S]);
  let { initial: d, animate: p } = n;
  const h = Yr(n),
    m = Kx(n);
  i &&
    m &&
    !h &&
    n.inherit !== !1 &&
    (d === void 0 && (d = i.initial), p === void 0 && (p = i.animate));
  let v = l ? l.initial === !1 : !1;
  v = v || d === !1;
  const g = v ? p : d;
  if (g && typeof g != "boolean" && !Fr(g)) {
    const S = Array.isArray(g) ? g : [g];
    for (let A = 0; A < S.length; A++) {
      const E = Zd(n, S[A]);
      if (E) {
        const { transitionEnd: O, transition: _, ...R } = E;
        for (const X in R) {
          let U = R[X];
          if (Array.isArray(U)) {
            const Q = v ? U.length - 1 : 0;
            U = U[Q];
          }
          U !== null && (c[X] = U);
        }
        for (const X in O) c[X] = O[X];
      }
    }
  }
  return c;
}
const Wx = (n) => (i, l) => {
  const o = D.useContext(kr),
    c = D.useContext(Sd),
    f = () => R4(n, i, o, c);
  return l ? f() : dT(f);
};
function Qd(n, i, l) {
  const { style: o } = n,
    c = {};
  for (const f in o)
    (Se(o[f]) ||
      (i.style && Se(i.style[f])) ||
      Zx(f, n) ||
      l?.getValue(f)?.liveStyle !== void 0) &&
      (c[f] = o[f]);
  return c;
}
const H4 = Wx({ scrapeMotionValuesFromProps: Qd, createRenderState: Pd });
function tb(n, i, l) {
  const o = Qd(n, i, l);
  for (const c in n)
    if (Se(n[c]) || Se(i[c])) {
      const f =
        ws.indexOf(c) !== -1
          ? "attr" + c.charAt(0).toUpperCase() + c.substring(1)
          : c;
      o[f] = n[c];
    }
  return o;
}
const _4 = Wx({ scrapeMotionValuesFromProps: tb, createRenderState: $x }),
  z4 = Symbol.for("motionComponentSymbol");
function rs(n) {
  return (
    n &&
    typeof n == "object" &&
    Object.prototype.hasOwnProperty.call(n, "current")
  );
}
function V4(n, i, l) {
  return D.useCallback(
    (o) => {
      o && n.onMount && n.onMount(o),
        i && (o ? i.mount(o) : i.unmount()),
        l && (typeof l == "function" ? l(o) : rs(l) && (l.current = o));
    },
    [i]
  );
}
const Jd = (n) => n.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
  L4 = "framerAppearId",
  eb = "data-" + Jd(L4),
  nb = D.createContext({});
function B4(n, i, l, o, c) {
  const { visualElement: f } = D.useContext(kr),
    d = D.useContext(Xx),
    p = D.useContext(Sd),
    h = D.useContext(Gx).reducedMotion,
    m = D.useRef(null);
  (o = o || d.renderer),
    !m.current &&
      o &&
      (m.current = o(n, {
        visualState: i,
        parent: f,
        props: l,
        presenceContext: p,
        blockInitialAnimation: p ? p.initial === !1 : !1,
        reducedMotionConfig: h,
      }));
  const v = m.current,
    g = D.useContext(nb);
  v &&
    !v.projection &&
    c &&
    (v.type === "html" || v.type === "svg") &&
    U4(m.current, l, c, g);
  const S = D.useRef(!1);
  D.useInsertionEffect(() => {
    v && S.current && v.update(l, p);
  });
  const A = l[eb],
    E = D.useRef(
      !!A &&
        !window.MotionHandoffIsComplete?.(A) &&
        window.MotionHasOptimisedAnimation?.(A)
    );
  return (
    mT(() => {
      v &&
        ((S.current = !0),
        (window.MotionIsMounted = !0),
        v.updateFeatures(),
        v.scheduleRenderMicrotask(),
        E.current && v.animationState && v.animationState.animateChanges());
    }),
    D.useEffect(() => {
      v &&
        (!E.current && v.animationState && v.animationState.animateChanges(),
        E.current &&
          (queueMicrotask(() => {
            window.MotionHandoffMarkAsComplete?.(A);
          }),
          (E.current = !1)),
        (v.enteringChildren = void 0));
    }),
    v
  );
}
function U4(n, i, l, o) {
  const {
    layoutId: c,
    layout: f,
    drag: d,
    dragConstraints: p,
    layoutScroll: h,
    layoutRoot: m,
    layoutCrossfade: v,
  } = i;
  (n.projection = new l(
    n.latestValues,
    i["data-framer-portal-id"] ? void 0 : ab(n.parent)
  )),
    n.projection.setOptions({
      layoutId: c,
      layout: f,
      alwaysMeasureLayout: !!d || (p && rs(p)),
      visualElement: n,
      animationType: typeof f == "string" ? f : "both",
      initialPromotionConfig: o,
      crossfade: v,
      layoutScroll: h,
      layoutRoot: m,
    });
}
function ab(n) {
  if (n) return n.options.allowProjection !== !1 ? n.projection : ab(n.parent);
}
function Sf(n, { forwardMotionProps: i = !1 } = {}, l, o) {
  l && d4(l);
  const c = Kd(n) ? _4 : H4;
  function f(p, h) {
    let m;
    const v = { ...D.useContext(Gx), ...p, layoutId: k4(p) },
      { isStatic: g } = v,
      S = y4(p),
      A = c(p, g);
    if (!g && bd) {
      F4();
      const E = Y4(v);
      (m = E.MeasureLayout),
        (S.visualElement = B4(n, A, v, o, E.ProjectionNode));
    }
    return x.jsxs(kr.Provider, {
      value: S,
      children: [
        m && S.visualElement
          ? x.jsx(m, { visualElement: S.visualElement, ...v })
          : null,
        O4(n, p, V4(A, S.visualElement, h), A, g, i),
      ],
    });
  }
  f.displayName = `motion.${
    typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`
  }`;
  const d = D.forwardRef(f);
  return (d[z4] = n), d;
}
function k4({ layoutId: n }) {
  const i = D.useContext(tx).id;
  return i && n !== void 0 ? i + "-" + n : n;
}
function F4(n, i) {
  D.useContext(Xx).strict;
}
function Y4(n) {
  const { drag: i, layout: l } = ys;
  if (!i && !l) return {};
  const o = { ...i, ...l };
  return {
    MeasureLayout:
      i?.isEnabled(n) || l?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode,
  };
}
function q4(n, i) {
  if (typeof Proxy > "u") return Sf;
  const l = new Map(),
    o = (f, d) => Sf(f, d, n, i),
    c = (f, d) => o(f, d);
  return new Proxy(c, {
    get: (f, d) =>
      d === "create"
        ? o
        : (l.has(d) || l.set(d, Sf(d, void 0, n, i)), l.get(d)),
  });
}
function ib({ top: n, left: i, right: l, bottom: o }) {
  return { x: { min: i, max: l }, y: { min: n, max: o } };
}
function G4({ x: n, y: i }) {
  return { top: i.min, right: n.max, bottom: i.max, left: n.min };
}
function X4(n, i) {
  if (!i) return n;
  const l = i({ x: n.left, y: n.top }),
    o = i({ x: n.right, y: n.bottom });
  return { top: l.y, left: l.x, bottom: o.y, right: o.x };
}
function Af(n) {
  return n === void 0 || n === 1;
}
function Wf({ scale: n, scaleX: i, scaleY: l }) {
  return !Af(n) || !Af(i) || !Af(l);
}
function ui(n) {
  return (
    Wf(n) ||
    sb(n) ||
    n.z ||
    n.rotate ||
    n.rotateX ||
    n.rotateY ||
    n.skewX ||
    n.skewY
  );
}
function sb(n) {
  return Iy(n.x) || Iy(n.y);
}
function Iy(n) {
  return n && n !== "0%";
}
function Cr(n, i, l) {
  const o = n - l,
    c = i * o;
  return l + c;
}
function Wy(n, i, l, o, c) {
  return c !== void 0 && (n = Cr(n, c, o)), Cr(n, l, o) + i;
}
function td(n, i = 0, l = 1, o, c) {
  (n.min = Wy(n.min, i, l, o, c)), (n.max = Wy(n.max, i, l, o, c));
}
function lb(n, { x: i, y: l }) {
  td(n.x, i.translate, i.scale, i.originPoint),
    td(n.y, l.translate, l.scale, l.originPoint);
}
const t0 = 0.999999999999,
  e0 = 1.0000000000001;
function P4(n, i, l, o = !1) {
  const c = l.length;
  if (!c) return;
  i.x = i.y = 1;
  let f, d;
  for (let p = 0; p < c; p++) {
    (f = l[p]), (d = f.projectionDelta);
    const { visualElement: h } = f.options;
    (h && h.props.style && h.props.style.display === "contents") ||
      (o &&
        f.options.layoutScroll &&
        f.scroll &&
        f !== f.root &&
        us(n, { x: -f.scroll.offset.x, y: -f.scroll.offset.y }),
      d && ((i.x *= d.x.scale), (i.y *= d.y.scale), lb(n, d)),
      o && ui(f.latestValues) && us(n, f.latestValues));
  }
  i.x < e0 && i.x > t0 && (i.x = 1), i.y < e0 && i.y > t0 && (i.y = 1);
}
function cs(n, i) {
  (n.min = n.min + i), (n.max = n.max + i);
}
function n0(n, i, l, o, c = 0.5) {
  const f = Pt(n.min, n.max, c);
  td(n, i, l, f, o);
}
function us(n, i) {
  n0(n.x, i.x, i.scaleX, i.scale, i.originX),
    n0(n.y, i.y, i.scaleY, i.scale, i.originY);
}
function ob(n, i) {
  return ib(X4(n.getBoundingClientRect(), i));
}
function K4(n, i, l) {
  const o = ob(n, l),
    { scroll: c } = i;
  return c && (cs(o.x, c.offset.x), cs(o.y, c.offset.y)), o;
}
const a0 = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  fs = () => ({ x: a0(), y: a0() }),
  i0 = () => ({ min: 0, max: 0 }),
  It = () => ({ x: i0(), y: i0() }),
  ed = { current: null },
  rb = { current: !1 };
function Z4() {
  if (((rb.current = !0), !!bd))
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"),
        i = () => (ed.current = n.matches);
      n.addEventListener("change", i), i();
    } else ed.current = !1;
}
const Q4 = new WeakMap();
function J4(n, i, l) {
  for (const o in i) {
    const c = i[o],
      f = l[o];
    if (Se(c)) n.addValue(o, c);
    else if (Se(f)) n.addValue(o, gs(c, { owner: n }));
    else if (f !== c)
      if (n.hasValue(o)) {
        const d = n.getValue(o);
        d.liveStyle === !0 ? d.jump(c) : d.hasAnimated || d.set(c);
      } else {
        const d = n.getStaticValue(o);
        n.addValue(o, gs(d !== void 0 ? d : c, { owner: n }));
      }
  }
  for (const o in l) i[o] === void 0 && n.removeValue(o);
  return i;
}
const s0 = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete",
];
class $4 {
  scrapeMotionValuesFromProps(i, l, o) {
    return {};
  }
  constructor(
    {
      parent: i,
      props: l,
      presenceContext: o,
      reducedMotionConfig: c,
      blockInitialAnimation: f,
      visualState: d,
    },
    p = {}
  ) {
    (this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = Bd),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(),
          this.renderInstance(
            this.current,
            this.renderState,
            this.props.style,
            this.projection
          ));
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const S = Ue.now();
        this.renderScheduledAt < S &&
          ((this.renderScheduledAt = S), Gt.render(this.render, !1, !0));
      });
    const { latestValues: h, renderState: m } = d;
    (this.latestValues = h),
      (this.baseTarget = { ...h }),
      (this.initialValues = l.initial ? { ...h } : {}),
      (this.renderState = m),
      (this.parent = i),
      (this.props = l),
      (this.presenceContext = o),
      (this.depth = i ? i.depth + 1 : 0),
      (this.reducedMotionConfig = c),
      (this.options = p),
      (this.blockInitialAnimation = !!f),
      (this.isControllingVariants = Yr(l)),
      (this.isVariantNode = Kx(l)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(i && i.current));
    const { willChange: v, ...g } = this.scrapeMotionValuesFromProps(
      l,
      {},
      this
    );
    for (const S in g) {
      const A = g[S];
      h[S] !== void 0 && Se(A) && A.set(h[S]);
    }
  }
  mount(i) {
    (this.current = i),
      Q4.set(i, this),
      this.projection && !this.projection.instance && this.projection.mount(i),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((l, o) => this.bindToMotionValue(o, l)),
      rb.current || Z4(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === "never"
          ? !1
          : this.reducedMotionConfig === "always"
          ? !0
          : ed.current),
      this.parent?.addChild(this),
      this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(),
      Va(this.notifyUpdate),
      Va(this.render),
      this.valueSubscriptions.forEach((i) => i()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent?.removeChild(this);
    for (const i in this.events) this.events[i].clear();
    for (const i in this.features) {
      const l = this.features[i];
      l && (l.unmount(), (l.isMounted = !1));
    }
    this.current = null;
  }
  addChild(i) {
    this.children.add(i),
      this.enteringChildren ?? (this.enteringChildren = new Set()),
      this.enteringChildren.add(i);
  }
  removeChild(i) {
    this.children.delete(i),
      this.enteringChildren && this.enteringChildren.delete(i);
  }
  bindToMotionValue(i, l) {
    this.valueSubscriptions.has(i) && this.valueSubscriptions.get(i)();
    const o = Es.has(i);
    o && this.onBindTransform && this.onBindTransform();
    const c = l.on("change", (d) => {
      (this.latestValues[i] = d),
        this.props.onUpdate && Gt.preRender(this.notifyUpdate),
        o && this.projection && (this.projection.isTransformDirty = !0),
        this.scheduleRender();
    });
    let f;
    window.MotionCheckAppearSync &&
      (f = window.MotionCheckAppearSync(this, i, l)),
      this.valueSubscriptions.set(i, () => {
        c(), f && f(), l.owner && l.stop();
      });
  }
  sortNodePosition(i) {
    return !this.current ||
      !this.sortInstanceNodePosition ||
      this.type !== i.type
      ? 0
      : this.sortInstanceNodePosition(this.current, i.current);
  }
  updateFeatures() {
    let i = "animation";
    for (i in ys) {
      const l = ys[i];
      if (!l) continue;
      const { isEnabled: o, Feature: c } = l;
      if (
        (!this.features[i] &&
          c &&
          o(this.props) &&
          (this.features[i] = new c(this)),
        this.features[i])
      ) {
        const f = this.features[i];
        f.isMounted ? f.update() : (f.mount(), (f.isMounted = !0));
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  measureViewportBox() {
    return this.current
      ? this.measureInstanceViewportBox(this.current, this.props)
      : It();
  }
  getStaticValue(i) {
    return this.latestValues[i];
  }
  setStaticValue(i, l) {
    this.latestValues[i] = l;
  }
  update(i, l) {
    (i.transformTemplate || this.props.transformTemplate) &&
      this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = i),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = l);
    for (let o = 0; o < s0.length; o++) {
      const c = s0[o];
      this.propEventSubscriptions[c] &&
        (this.propEventSubscriptions[c](),
        delete this.propEventSubscriptions[c]);
      const f = "on" + c,
        d = i[f];
      d && (this.propEventSubscriptions[c] = this.on(c, d));
    }
    (this.prevMotionValues = J4(
      this,
      this.scrapeMotionValuesFromProps(i, this.prevProps, this),
      this.prevMotionValues
    )),
      this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  getVariant(i) {
    return this.props.variants ? this.props.variants[i] : void 0;
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode
      ? this
      : this.parent
      ? this.parent.getClosestVariantNode()
      : void 0;
  }
  addVariantChild(i) {
    const l = this.getClosestVariantNode();
    if (l)
      return (
        l.variantChildren && l.variantChildren.add(i),
        () => l.variantChildren.delete(i)
      );
  }
  addValue(i, l) {
    const o = this.values.get(i);
    l !== o &&
      (o && this.removeValue(i),
      this.bindToMotionValue(i, l),
      this.values.set(i, l),
      (this.latestValues[i] = l.get()));
  }
  removeValue(i) {
    this.values.delete(i);
    const l = this.valueSubscriptions.get(i);
    l && (l(), this.valueSubscriptions.delete(i)),
      delete this.latestValues[i],
      this.removeValueFromRenderState(i, this.renderState);
  }
  hasValue(i) {
    return this.values.has(i);
  }
  getValue(i, l) {
    if (this.props.values && this.props.values[i]) return this.props.values[i];
    let o = this.values.get(i);
    return (
      o === void 0 &&
        l !== void 0 &&
        ((o = gs(l === null ? void 0 : l, { owner: this })),
        this.addValue(i, o)),
      o
    );
  }
  readValue(i, l) {
    let o =
      this.latestValues[i] !== void 0 || !this.current
        ? this.latestValues[i]
        : this.getBaseTargetFromProps(this.props, i) ??
          this.readValueFromInstance(this.current, i, this.options);
    return (
      o != null &&
        (typeof o == "string" && (ex(o) || ax(o))
          ? (o = parseFloat(o))
          : !u4(o) && La.test(l) && (o = Bx(i, l)),
        this.setBaseTarget(i, Se(o) ? o.get() : o)),
      Se(o) ? o.get() : o
    );
  }
  setBaseTarget(i, l) {
    this.baseTarget[i] = l;
  }
  getBaseTarget(i) {
    const { initial: l } = this.props;
    let o;
    if (typeof l == "string" || typeof l == "object") {
      const f = Zd(this.props, l, this.presenceContext?.custom);
      f && (o = f[i]);
    }
    if (l && o !== void 0) return o;
    const c = this.getBaseTargetFromProps(this.props, i);
    return c !== void 0 && !Se(c)
      ? c
      : this.initialValues[i] !== void 0 && o === void 0
      ? void 0
      : this.baseTarget[i];
  }
  on(i, l) {
    return this.events[i] || (this.events[i] = new Nd()), this.events[i].add(l);
  }
  notify(i, ...l) {
    this.events[i] && this.events[i].notify(...l);
  }
  scheduleRenderMicrotask() {
    Fd.render(this.render);
  }
}
class cb extends $4 {
  constructor() {
    super(...arguments), (this.KeyframeResolver = $3);
  }
  sortInstanceNodePosition(i, l) {
    return i.compareDocumentPosition(l) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(i, l) {
    return i.style ? i.style[l] : void 0;
  }
  removeValueFromRenderState(i, { vars: l, style: o }) {
    delete l[i], delete o[i];
  }
  handleChildMotionValue() {
    this.childSubscription &&
      (this.childSubscription(), delete this.childSubscription);
    const { children: i } = this.props;
    Se(i) &&
      (this.childSubscription = i.on("change", (l) => {
        this.current && (this.current.textContent = `${l}`);
      }));
  }
}
function ub(n, { style: i, vars: l }, o, c) {
  const f = n.style;
  let d;
  for (d in i) f[d] = i[d];
  c?.applyProjectionStyles(f, o);
  for (d in l) f.setProperty(d, l[d]);
}
function I4(n) {
  return window.getComputedStyle(n);
}
class W4 extends cb {
  constructor() {
    super(...arguments), (this.type = "html"), (this.renderInstance = ub);
  }
  readValueFromInstance(i, l) {
    if (Es.has(l)) return this.projection?.isProjecting ? Pf(l) : g3(i, l);
    {
      const o = I4(i),
        c = (Md(l) ? o.getPropertyValue(l) : o[l]) || 0;
      return typeof c == "string" ? c.trim() : c;
    }
  }
  measureInstanceViewportBox(i, { transformPagePoint: l }) {
    return ob(i, l);
  }
  build(i, l, o) {
    Xd(i, l, o.transformTemplate);
  }
  scrapeMotionValuesFromProps(i, l, o) {
    return Qd(i, l, o);
  }
}
const fb = new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust",
]);
function t5(n, i, l, o) {
  ub(n, i, void 0, o);
  for (const c in i.attrs) n.setAttribute(fb.has(c) ? c : Jd(c), i.attrs[c]);
}
class e5 extends cb {
  constructor() {
    super(...arguments),
      (this.type = "svg"),
      (this.isSVGTag = !1),
      (this.measureInstanceViewportBox = It);
  }
  getBaseTargetFromProps(i, l) {
    return i[l];
  }
  readValueFromInstance(i, l) {
    if (Es.has(l)) {
      const o = Lx(l);
      return (o && o.default) || 0;
    }
    return (l = fb.has(l) ? l : Jd(l)), i.getAttribute(l);
  }
  scrapeMotionValuesFromProps(i, l, o) {
    return tb(i, l, o);
  }
  build(i, l, o) {
    Jx(i, l, this.isSVGTag, o.transformTemplate, o.style);
  }
  renderInstance(i, l, o, c) {
    t5(i, l, o, c);
  }
  mount(i) {
    (this.isSVGTag = Ix(i.tagName)), super.mount(i);
  }
}
const n5 = (n, i) =>
  Kd(n) ? new e5(i) : new W4(i, { allowProjection: n !== D.Fragment });
function ms(n, i, l) {
  const o = n.getProps();
  return Zd(o, i, l !== void 0 ? l : o.custom, n);
}
const nd = (n) => Array.isArray(n);
function a5(n, i, l) {
  n.hasValue(i) ? n.getValue(i).set(l) : n.addValue(i, gs(l));
}
function i5(n) {
  return nd(n) ? n[n.length - 1] || 0 : n;
}
function s5(n, i) {
  const l = ms(n, i);
  let { transitionEnd: o = {}, transition: c = {}, ...f } = l || {};
  f = { ...f, ...o };
  for (const d in f) {
    const p = i5(f[d]);
    a5(n, d, p);
  }
}
function l5(n) {
  return !!(Se(n) && n.add);
}
function ad(n, i) {
  const l = n.getValue("willChange");
  if (l5(l)) return l.add(i);
  if (!l && ia.WillChange) {
    const o = new ia.WillChange("auto");
    n.addValue("willChange", o), o.add(i);
  }
}
function db(n) {
  return n.props[eb];
}
const o5 = (n) => n !== null;
function r5(n, { repeat: i, repeatType: l = "loop" }, o) {
  const c = n.filter(o5),
    f = i && l !== "loop" && i % 2 === 1 ? 0 : c.length - 1;
  return c[f];
}
const c5 = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
  u5 = (n) => ({
    type: "spring",
    stiffness: 550,
    damping: n === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  f5 = { type: "keyframes", duration: 0.8 },
  d5 = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  m5 = (n, { keyframes: i }) =>
    i.length > 2
      ? f5
      : Es.has(n)
      ? n.startsWith("scale")
        ? u5(i[1])
        : c5
      : d5;
function h5({
  when: n,
  delay: i,
  delayChildren: l,
  staggerChildren: o,
  staggerDirection: c,
  repeat: f,
  repeatType: d,
  repeatDelay: p,
  from: h,
  elapsed: m,
  ...v
}) {
  return !!Object.keys(v).length;
}
const $d =
  (n, i, l, o = {}, c, f) =>
  (d) => {
    const p = Ud(o, n) || {},
      h = p.delay || o.delay || 0;
    let { elapsed: m = 0 } = o;
    m = m - Mn(h);
    const v = {
      keyframes: Array.isArray(l) ? l : [null, l],
      ease: "easeOut",
      velocity: i.getVelocity(),
      ...p,
      delay: -m,
      onUpdate: (S) => {
        i.set(S), p.onUpdate && p.onUpdate(S);
      },
      onComplete: () => {
        d(), p.onComplete && p.onComplete();
      },
      name: n,
      motionValue: i,
      element: f ? void 0 : c,
    };
    h5(p) || Object.assign(v, m5(n, v)),
      v.duration && (v.duration = Mn(v.duration)),
      v.repeatDelay && (v.repeatDelay = Mn(v.repeatDelay)),
      v.from !== void 0 && (v.keyframes[0] = v.from);
    let g = !1;
    if (
      ((v.type === !1 || (v.duration === 0 && !v.repeatDelay)) &&
        ($f(v), v.delay === 0 && (g = !0)),
      (ia.instantAnimations || ia.skipAnimations) &&
        ((g = !0), $f(v), (v.delay = 0)),
      (v.allowFlatten = !p.type && !p.ease),
      g && !f && i.get() !== void 0)
    ) {
      const S = r5(v.keyframes, p);
      if (S !== void 0) {
        Gt.update(() => {
          v.onUpdate(S), v.onComplete();
        });
        return;
      }
    }
    return p.isSync ? new Ld(v) : new U3(v);
  };
function p5({ protectedKeys: n, needsAnimating: i }, l) {
  const o = n.hasOwnProperty(l) && i[l] !== !0;
  return (i[l] = !1), o;
}
function mb(n, i, { delay: l = 0, transitionOverride: o, type: c } = {}) {
  let { transition: f = n.getDefaultTransition(), transitionEnd: d, ...p } = i;
  o && (f = o);
  const h = [],
    m = c && n.animationState && n.animationState.getState()[c];
  for (const v in p) {
    const g = n.getValue(v, n.latestValues[v] ?? null),
      S = p[v];
    if (S === void 0 || (m && p5(m, v))) continue;
    const A = { delay: l, ...Ud(f || {}, v) },
      E = g.get();
    if (
      E !== void 0 &&
      !g.isAnimating &&
      !Array.isArray(S) &&
      S === E &&
      !A.velocity
    )
      continue;
    let O = !1;
    if (window.MotionHandoffAnimation) {
      const R = db(n);
      if (R) {
        const X = window.MotionHandoffAnimation(R, v, Gt);
        X !== null && ((A.startTime = X), (O = !0));
      }
    }
    ad(n, v),
      g.start(
        $d(v, g, S, n.shouldReduceMotion && _x.has(v) ? { type: !1 } : A, n, O)
      );
    const _ = g.animation;
    _ && h.push(_);
  }
  return (
    d &&
      Promise.all(h).then(() => {
        Gt.update(() => {
          d && s5(n, d);
        });
      }),
    h
  );
}
function hb(n, i, l, o = 0, c = 1) {
  const f = Array.from(n)
      .sort((m, v) => m.sortNodePosition(v))
      .indexOf(i),
    d = n.size,
    p = (d - 1) * o;
  return typeof l == "function" ? l(f, d) : c === 1 ? f * o : p - f * o;
}
function id(n, i, l = {}) {
  const o = ms(n, i, l.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: c = n.getDefaultTransition() || {} } = o || {};
  l.transitionOverride && (c = l.transitionOverride);
  const f = o ? () => Promise.all(mb(n, o, l)) : () => Promise.resolve(),
    d =
      n.variantChildren && n.variantChildren.size
        ? (h = 0) => {
            const {
              delayChildren: m = 0,
              staggerChildren: v,
              staggerDirection: g,
            } = c;
            return g5(n, i, h, m, v, g, l);
          }
        : () => Promise.resolve(),
    { when: p } = c;
  if (p) {
    const [h, m] = p === "beforeChildren" ? [f, d] : [d, f];
    return h().then(() => m());
  } else return Promise.all([f(), d(l.delay)]);
}
function g5(n, i, l = 0, o = 0, c = 0, f = 1, d) {
  const p = [];
  for (const h of n.variantChildren)
    h.notify("AnimationStart", i),
      p.push(
        id(h, i, {
          ...d,
          delay:
            l +
            (typeof o == "function" ? 0 : o) +
            hb(n.variantChildren, h, o, c, f),
        }).then(() => h.notify("AnimationComplete", i))
      );
  return Promise.all(p);
}
function y5(n, i, l = {}) {
  n.notify("AnimationStart", i);
  let o;
  if (Array.isArray(i)) {
    const c = i.map((f) => id(n, f, l));
    o = Promise.all(c);
  } else if (typeof i == "string") o = id(n, i, l);
  else {
    const c = typeof i == "function" ? ms(n, i, l.custom) : i;
    o = Promise.all(mb(n, c, l));
  }
  return o.then(() => {
    n.notify("AnimationComplete", i);
  });
}
function pb(n, i) {
  if (!Array.isArray(i)) return !1;
  const l = i.length;
  if (l !== n.length) return !1;
  for (let o = 0; o < l; o++) if (i[o] !== n[o]) return !1;
  return !0;
}
const v5 = Gd.length;
function gb(n) {
  if (!n) return;
  if (!n.isControllingVariants) {
    const l = n.parent ? gb(n.parent) || {} : {};
    return n.props.initial !== void 0 && (l.initial = n.props.initial), l;
  }
  const i = {};
  for (let l = 0; l < v5; l++) {
    const o = Gd[l],
      c = n.props[o];
    (Ll(c) || c === !1) && (i[o] = c);
  }
  return i;
}
const x5 = [...qd].reverse(),
  b5 = qd.length;
function S5(n) {
  return (i) =>
    Promise.all(i.map(({ animation: l, options: o }) => y5(n, l, o)));
}
function A5(n) {
  let i = S5(n),
    l = l0(),
    o = !0;
  const c = (h) => (m, v) => {
    const g = ms(n, v, h === "exit" ? n.presenceContext?.custom : void 0);
    if (g) {
      const { transition: S, transitionEnd: A, ...E } = g;
      m = { ...m, ...E, ...A };
    }
    return m;
  };
  function f(h) {
    i = h(n);
  }
  function d(h) {
    const { props: m } = n,
      v = gb(n.parent) || {},
      g = [],
      S = new Set();
    let A = {},
      E = 1 / 0;
    for (let _ = 0; _ < b5; _++) {
      const R = x5[_],
        X = l[R],
        U = m[R] !== void 0 ? m[R] : v[R],
        Q = Ll(U),
        Z = R === h ? X.isActive : null;
      Z === !1 && (E = _);
      let $ = U === v[R] && U !== m[R] && Q;
      if (
        ($ && o && n.manuallyAnimateOnMount && ($ = !1),
        (X.protectedKeys = { ...A }),
        (!X.isActive && Z === null) ||
          (!U && !X.prevProp) ||
          Fr(U) ||
          typeof U == "boolean")
      )
        continue;
      const K = w5(X.prevProp, U);
      let F = K || (R === h && X.isActive && !$ && Q) || (_ > E && Q),
        ot = !1;
      const ft = Array.isArray(U) ? U : [U];
      let At = ft.reduce(c(R), {});
      Z === !1 && (At = {});
      const { prevResolvedValues: pt = {} } = X,
        yt = { ...pt, ...At },
        vt = (B) => {
          (F = !0),
            S.has(B) && ((ot = !0), S.delete(B)),
            (X.needsAnimating[B] = !0);
          const z = n.getValue(B);
          z && (z.liveStyle = !1);
        };
      for (const B in yt) {
        const z = At[B],
          et = pt[B];
        if (A.hasOwnProperty(B)) continue;
        let lt = !1;
        nd(z) && nd(et) ? (lt = !pb(z, et)) : (lt = z !== et),
          lt
            ? z != null
              ? vt(B)
              : S.add(B)
            : z !== void 0 && S.has(B)
            ? vt(B)
            : (X.protectedKeys[B] = !0);
      }
      (X.prevProp = U),
        (X.prevResolvedValues = At),
        X.isActive && (A = { ...A, ...At }),
        o && n.blockInitialAnimation && (F = !1);
      const bt = $ && K;
      F &&
        (!bt || ot) &&
        g.push(
          ...ft.map((B) => {
            const z = { type: R };
            if (
              typeof B == "string" &&
              o &&
              !bt &&
              n.manuallyAnimateOnMount &&
              n.parent
            ) {
              const { parent: et } = n,
                lt = ms(et, B);
              if (et.enteringChildren && lt) {
                const { delayChildren: T } = lt.transition || {};
                z.delay = hb(et.enteringChildren, n, T);
              }
            }
            return { animation: B, options: z };
          })
        );
    }
    if (S.size) {
      const _ = {};
      if (typeof m.initial != "boolean") {
        const R = ms(n, Array.isArray(m.initial) ? m.initial[0] : m.initial);
        R && R.transition && (_.transition = R.transition);
      }
      S.forEach((R) => {
        const X = n.getBaseTarget(R),
          U = n.getValue(R);
        U && (U.liveStyle = !0), (_[R] = X ?? null);
      }),
        g.push({ animation: _ });
    }
    let O = !!g.length;
    return (
      o &&
        (m.initial === !1 || m.initial === m.animate) &&
        !n.manuallyAnimateOnMount &&
        (O = !1),
      (o = !1),
      O ? i(g) : Promise.resolve()
    );
  }
  function p(h, m) {
    if (l[h].isActive === m) return Promise.resolve();
    n.variantChildren?.forEach((g) => g.animationState?.setActive(h, m)),
      (l[h].isActive = m);
    const v = d(h);
    for (const g in l) l[g].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: d,
    setActive: p,
    setAnimateFunction: f,
    getState: () => l,
    reset: () => {
      (l = l0()), (o = !0);
    },
  };
}
function w5(n, i) {
  return typeof i == "string" ? i !== n : Array.isArray(i) ? !pb(i, n) : !1;
}
function ci(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function l0() {
  return {
    animate: ci(!0),
    whileInView: ci(),
    whileHover: ci(),
    whileTap: ci(),
    whileDrag: ci(),
    whileFocus: ci(),
    exit: ci(),
  };
}
class Ba {
  constructor(i) {
    (this.isMounted = !1), (this.node = i);
  }
  update() {}
}
class E5 extends Ba {
  constructor(i) {
    super(i), i.animationState || (i.animationState = A5(i));
  }
  updateAnimationControlsSubscription() {
    const { animate: i } = this.node.getProps();
    Fr(i) && (this.unmountControls = i.subscribe(this.node));
  }
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: i } = this.node.getProps(),
      { animate: l } = this.node.prevProps || {};
    i !== l && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let T5 = 0;
class N5 extends Ba {
  constructor() {
    super(...arguments), (this.id = T5++);
  }
  update() {
    if (!this.node.presenceContext) return;
    const { isPresent: i, onExitComplete: l } = this.node.presenceContext,
      { isPresent: o } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || i === o) return;
    const c = this.node.animationState.setActive("exit", !i);
    l &&
      !i &&
      c.then(() => {
        l(this.id);
      });
  }
  mount() {
    const { register: i, onExitComplete: l } = this.node.presenceContext || {};
    l && l(this.id), i && (this.unmount = i(this.id));
  }
  unmount() {}
}
const D5 = { animation: { Feature: E5 }, exit: { Feature: N5 } };
function Ul(n, i, l, o = { passive: !0 }) {
  return n.addEventListener(i, l, o), () => n.removeEventListener(i, l);
}
function Xl(n) {
  return { point: { x: n.pageX, y: n.pageY } };
}
const C5 = (n) => (i) => Yd(i) && n(i, Xl(i));
function Cl(n, i, l, o) {
  return Ul(n, i, C5(l), o);
}
const yb = 1e-4,
  M5 = 1 - yb,
  O5 = 1 + yb,
  vb = 0.01,
  R5 = 0 - vb,
  j5 = 0 + vb;
function De(n) {
  return n.max - n.min;
}
function H5(n, i, l) {
  return Math.abs(n - i) <= l;
}
function o0(n, i, l, o = 0.5) {
  (n.origin = o),
    (n.originPoint = Pt(i.min, i.max, n.origin)),
    (n.scale = De(l) / De(i)),
    (n.translate = Pt(l.min, l.max, n.origin) - n.originPoint),
    ((n.scale >= M5 && n.scale <= O5) || isNaN(n.scale)) && (n.scale = 1),
    ((n.translate >= R5 && n.translate <= j5) || isNaN(n.translate)) &&
      (n.translate = 0);
}
function Ml(n, i, l, o) {
  o0(n.x, i.x, l.x, o ? o.originX : void 0),
    o0(n.y, i.y, l.y, o ? o.originY : void 0);
}
function r0(n, i, l) {
  (n.min = l.min + i.min), (n.max = n.min + De(i));
}
function _5(n, i, l) {
  r0(n.x, i.x, l.x), r0(n.y, i.y, l.y);
}
function c0(n, i, l) {
  (n.min = i.min - l.min), (n.max = n.min + De(i));
}
function Ol(n, i, l) {
  c0(n.x, i.x, l.x), c0(n.y, i.y, l.y);
}
function rn(n) {
  return [n("x"), n("y")];
}
const xb = ({ current: n }) => (n ? n.ownerDocument.defaultView : null),
  u0 = (n, i) => Math.abs(n - i);
function z5(n, i) {
  const l = u0(n.x, i.x),
    o = u0(n.y, i.y);
  return Math.sqrt(l ** 2 + o ** 2);
}
class bb {
  constructor(
    i,
    l,
    {
      transformPagePoint: o,
      contextWindow: c = window,
      dragSnapToOrigin: f = !1,
      distanceThreshold: d = 3,
    } = {}
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const S = Ef(this.lastMoveEventInfo, this.history),
          A = this.startEvent !== null,
          E = z5(S.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
        if (!A && !E) return;
        const { point: O } = S,
          { timestamp: _ } = ye;
        this.history.push({ ...O, timestamp: _ });
        const { onStart: R, onMove: X } = this.handlers;
        A ||
          (R && R(this.lastMoveEvent, S),
          (this.startEvent = this.lastMoveEvent)),
          X && X(this.lastMoveEvent, S);
      }),
      (this.handlePointerMove = (S, A) => {
        (this.lastMoveEvent = S),
          (this.lastMoveEventInfo = wf(A, this.transformPagePoint)),
          Gt.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (S, A) => {
        this.end();
        const { onEnd: E, onSessionEnd: O, resumeAnimation: _ } = this.handlers;
        if (
          (this.dragSnapToOrigin && _ && _(),
          !(this.lastMoveEvent && this.lastMoveEventInfo))
        )
          return;
        const R = Ef(
          S.type === "pointercancel"
            ? this.lastMoveEventInfo
            : wf(A, this.transformPagePoint),
          this.history
        );
        this.startEvent && E && E(S, R), O && O(S, R);
      }),
      !Yd(i))
    )
      return;
    (this.dragSnapToOrigin = f),
      (this.handlers = l),
      (this.transformPagePoint = o),
      (this.distanceThreshold = d),
      (this.contextWindow = c || window);
    const p = Xl(i),
      h = wf(p, this.transformPagePoint),
      { point: m } = h,
      { timestamp: v } = ye;
    this.history = [{ ...m, timestamp: v }];
    const { onSessionStart: g } = l;
    g && g(i, Ef(h, this.history)),
      (this.removeListeners = Yl(
        Cl(this.contextWindow, "pointermove", this.handlePointerMove),
        Cl(this.contextWindow, "pointerup", this.handlePointerUp),
        Cl(this.contextWindow, "pointercancel", this.handlePointerUp)
      ));
  }
  updateHandlers(i) {
    this.handlers = i;
  }
  end() {
    this.removeListeners && this.removeListeners(), Va(this.updatePoint);
  }
}
function wf(n, i) {
  return i ? { point: i(n.point) } : n;
}
function f0(n, i) {
  return { x: n.x - i.x, y: n.y - i.y };
}
function Ef({ point: n }, i) {
  return {
    point: n,
    delta: f0(n, Sb(i)),
    offset: f0(n, V5(i)),
    velocity: L5(i, 0.1),
  };
}
function V5(n) {
  return n[0];
}
function Sb(n) {
  return n[n.length - 1];
}
function L5(n, i) {
  if (n.length < 2) return { x: 0, y: 0 };
  let l = n.length - 1,
    o = null;
  const c = Sb(n);
  for (; l >= 0 && ((o = n[l]), !(c.timestamp - o.timestamp > Mn(i))); ) l--;
  if (!o) return { x: 0, y: 0 };
  const f = cn(c.timestamp - o.timestamp);
  if (f === 0) return { x: 0, y: 0 };
  const d = { x: (c.x - o.x) / f, y: (c.y - o.y) / f };
  return d.x === 1 / 0 && (d.x = 0), d.y === 1 / 0 && (d.y = 0), d;
}
function B5(n, { min: i, max: l }, o) {
  return (
    i !== void 0 && n < i
      ? (n = o ? Pt(i, n, o.min) : Math.max(n, i))
      : l !== void 0 && n > l && (n = o ? Pt(l, n, o.max) : Math.min(n, l)),
    n
  );
}
function d0(n, i, l) {
  return {
    min: i !== void 0 ? n.min + i : void 0,
    max: l !== void 0 ? n.max + l - (n.max - n.min) : void 0,
  };
}
function U5(n, { top: i, left: l, bottom: o, right: c }) {
  return { x: d0(n.x, l, c), y: d0(n.y, i, o) };
}
function m0(n, i) {
  let l = i.min - n.min,
    o = i.max - n.max;
  return i.max - i.min < n.max - n.min && ([l, o] = [o, l]), { min: l, max: o };
}
function k5(n, i) {
  return { x: m0(n.x, i.x), y: m0(n.y, i.y) };
}
function F5(n, i) {
  let l = 0.5;
  const o = De(n),
    c = De(i);
  return (
    c > o
      ? (l = _l(i.min, i.max - o, n.min))
      : o > c && (l = _l(n.min, n.max - c, i.min)),
    aa(0, 1, l)
  );
}
function Y5(n, i) {
  const l = {};
  return (
    i.min !== void 0 && (l.min = i.min - n.min),
    i.max !== void 0 && (l.max = i.max - n.min),
    l
  );
}
const sd = 0.35;
function q5(n = sd) {
  return (
    n === !1 ? (n = 0) : n === !0 && (n = sd),
    { x: h0(n, "left", "right"), y: h0(n, "top", "bottom") }
  );
}
function h0(n, i, l) {
  return { min: p0(n, i), max: p0(n, l) };
}
function p0(n, i) {
  return typeof n == "number" ? n : n[i] || 0;
}
const G5 = new WeakMap();
class X5 {
  constructor(i) {
    (this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = It()),
      (this.latestPointerEvent = null),
      (this.latestPanInfo = null),
      (this.visualElement = i);
  }
  start(i, { snapToCursor: l = !1, distanceThreshold: o } = {}) {
    const { presenceContext: c } = this.visualElement;
    if (c && c.isPresent === !1) return;
    const f = (g) => {
        const { dragSnapToOrigin: S } = this.getProps();
        S ? this.pauseAnimation() : this.stopAnimation(),
          l && this.snapToCursor(Xl(g).point);
      },
      d = (g, S) => {
        const { drag: A, dragPropagation: E, onDragStart: O } = this.getProps();
        if (
          A &&
          !E &&
          (this.openDragLock && this.openDragLock(),
          (this.openDragLock = n4(A)),
          !this.openDragLock)
        )
          return;
        (this.latestPointerEvent = g),
          (this.latestPanInfo = S),
          (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          rn((R) => {
            let X = this.getAxisMotionValue(R).get() || 0;
            if (On.test(X)) {
              const { projection: U } = this.visualElement;
              if (U && U.layout) {
                const Q = U.layout.layoutBox[R];
                Q && (X = De(Q) * (parseFloat(X) / 100));
              }
            }
            this.originPoint[R] = X;
          }),
          O && Gt.postRender(() => O(g, S)),
          ad(this.visualElement, "transform");
        const { animationState: _ } = this.visualElement;
        _ && _.setActive("whileDrag", !0);
      },
      p = (g, S) => {
        (this.latestPointerEvent = g), (this.latestPanInfo = S);
        const {
          dragPropagation: A,
          dragDirectionLock: E,
          onDirectionLock: O,
          onDrag: _,
        } = this.getProps();
        if (!A && !this.openDragLock) return;
        const { offset: R } = S;
        if (E && this.currentDirection === null) {
          (this.currentDirection = P5(R)),
            this.currentDirection !== null && O && O(this.currentDirection);
          return;
        }
        this.updateAxis("x", S.point, R),
          this.updateAxis("y", S.point, R),
          this.visualElement.render(),
          _ && _(g, S);
      },
      h = (g, S) => {
        (this.latestPointerEvent = g),
          (this.latestPanInfo = S),
          this.stop(g, S),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null);
      },
      m = () =>
        rn(
          (g) =>
            this.getAnimationState(g) === "paused" &&
            this.getAxisMotionValue(g).animation?.play()
        ),
      { dragSnapToOrigin: v } = this.getProps();
    this.panSession = new bb(
      i,
      {
        onSessionStart: f,
        onStart: d,
        onMove: p,
        onSessionEnd: h,
        resumeAnimation: m,
      },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: v,
        distanceThreshold: o,
        contextWindow: xb(this.visualElement),
      }
    );
  }
  stop(i, l) {
    const o = i || this.latestPointerEvent,
      c = l || this.latestPanInfo,
      f = this.isDragging;
    if ((this.cancel(), !f || !c || !o)) return;
    const { velocity: d } = c;
    this.startAnimation(d);
    const { onDragEnd: p } = this.getProps();
    p && Gt.postRender(() => p(o, c));
  }
  cancel() {
    this.isDragging = !1;
    const { projection: i, animationState: l } = this.visualElement;
    i && (i.isAnimationBlocked = !1),
      this.panSession && this.panSession.end(),
      (this.panSession = void 0);
    const { dragPropagation: o } = this.getProps();
    !o &&
      this.openDragLock &&
      (this.openDragLock(), (this.openDragLock = null)),
      l && l.setActive("whileDrag", !1);
  }
  updateAxis(i, l, o) {
    const { drag: c } = this.getProps();
    if (!o || !hr(i, c, this.currentDirection)) return;
    const f = this.getAxisMotionValue(i);
    let d = this.originPoint[i] + o[i];
    this.constraints &&
      this.constraints[i] &&
      (d = B5(d, this.constraints[i], this.elastic[i])),
      f.set(d);
  }
  resolveConstraints() {
    const { dragConstraints: i, dragElastic: l } = this.getProps(),
      o =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : this.visualElement.projection?.layout,
      c = this.constraints;
    i && rs(i)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : i && o
      ? (this.constraints = U5(o.layoutBox, i))
      : (this.constraints = !1),
      (this.elastic = q5(l)),
      c !== this.constraints &&
        o &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        rn((f) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(f) &&
            (this.constraints[f] = Y5(o.layoutBox[f], this.constraints[f]));
        });
  }
  resolveRefConstraints() {
    const { dragConstraints: i, onMeasureDragConstraints: l } = this.getProps();
    if (!i || !rs(i)) return !1;
    const o = i.current,
      { projection: c } = this.visualElement;
    if (!c || !c.layout) return !1;
    const f = K4(o, c.root, this.visualElement.getTransformPagePoint());
    let d = k5(c.layout.layoutBox, f);
    if (l) {
      const p = l(G4(d));
      (this.hasMutatedConstraints = !!p), p && (d = ib(p));
    }
    return d;
  }
  startAnimation(i) {
    const {
        drag: l,
        dragMomentum: o,
        dragElastic: c,
        dragTransition: f,
        dragSnapToOrigin: d,
        onDragTransitionEnd: p,
      } = this.getProps(),
      h = this.constraints || {},
      m = rn((v) => {
        if (!hr(v, l, this.currentDirection)) return;
        let g = (h && h[v]) || {};
        d && (g = { min: 0, max: 0 });
        const S = c ? 200 : 1e6,
          A = c ? 40 : 1e7,
          E = {
            type: "inertia",
            velocity: o ? i[v] : 0,
            bounceStiffness: S,
            bounceDamping: A,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...f,
            ...g,
          };
        return this.startAxisValueAnimation(v, E);
      });
    return Promise.all(m).then(p);
  }
  startAxisValueAnimation(i, l) {
    const o = this.getAxisMotionValue(i);
    return (
      ad(this.visualElement, i), o.start($d(i, o, 0, l, this.visualElement, !1))
    );
  }
  stopAnimation() {
    rn((i) => this.getAxisMotionValue(i).stop());
  }
  pauseAnimation() {
    rn((i) => this.getAxisMotionValue(i).animation?.pause());
  }
  getAnimationState(i) {
    return this.getAxisMotionValue(i).animation?.state;
  }
  getAxisMotionValue(i) {
    const l = `_drag${i.toUpperCase()}`,
      o = this.visualElement.getProps(),
      c = o[l];
    return (
      c ||
      this.visualElement.getValue(i, (o.initial ? o.initial[i] : void 0) || 0)
    );
  }
  snapToCursor(i) {
    rn((l) => {
      const { drag: o } = this.getProps();
      if (!hr(l, o, this.currentDirection)) return;
      const { projection: c } = this.visualElement,
        f = this.getAxisMotionValue(l);
      if (c && c.layout) {
        const { min: d, max: p } = c.layout.layoutBox[l];
        f.set(i[l] - Pt(d, p, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag: i, dragConstraints: l } = this.getProps(),
      { projection: o } = this.visualElement;
    if (!rs(l) || !o || !this.constraints) return;
    this.stopAnimation();
    const c = { x: 0, y: 0 };
    rn((d) => {
      const p = this.getAxisMotionValue(d);
      if (p && this.constraints !== !1) {
        const h = p.get();
        c[d] = F5({ min: h, max: h }, this.constraints[d]);
      }
    });
    const { transformTemplate: f } = this.visualElement.getProps();
    (this.visualElement.current.style.transform = f ? f({}, "") : "none"),
      o.root && o.root.updateScroll(),
      o.updateLayout(),
      this.resolveConstraints(),
      rn((d) => {
        if (!hr(d, i, null)) return;
        const p = this.getAxisMotionValue(d),
          { min: h, max: m } = this.constraints[d];
        p.set(Pt(h, m, c[d]));
      });
  }
  addListeners() {
    if (!this.visualElement.current) return;
    G5.set(this.visualElement, this);
    const i = this.visualElement.current,
      l = Cl(i, "pointerdown", (h) => {
        const { drag: m, dragListener: v = !0 } = this.getProps();
        m && v && this.start(h);
      }),
      o = () => {
        const { dragConstraints: h } = this.getProps();
        rs(h) && h.current && (this.constraints = this.resolveRefConstraints());
      },
      { projection: c } = this.visualElement,
      f = c.addEventListener("measure", o);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()),
      Gt.read(o);
    const d = Ul(window, "resize", () => this.scalePositionWithinConstraints()),
      p = c.addEventListener(
        "didUpdate",
        ({ delta: h, hasLayoutChanged: m }) => {
          this.isDragging &&
            m &&
            (rn((v) => {
              const g = this.getAxisMotionValue(v);
              g &&
                ((this.originPoint[v] += h[v].translate),
                g.set(g.get() + h[v].translate));
            }),
            this.visualElement.render());
        }
      );
    return () => {
      d(), l(), f(), p && p();
    };
  }
  getProps() {
    const i = this.visualElement.getProps(),
      {
        drag: l = !1,
        dragDirectionLock: o = !1,
        dragPropagation: c = !1,
        dragConstraints: f = !1,
        dragElastic: d = sd,
        dragMomentum: p = !0,
      } = i;
    return {
      ...i,
      drag: l,
      dragDirectionLock: o,
      dragPropagation: c,
      dragConstraints: f,
      dragElastic: d,
      dragMomentum: p,
    };
  }
}
function hr(n, i, l) {
  return (i === !0 || i === n) && (l === null || l === n);
}
function P5(n, i = 10) {
  let l = null;
  return Math.abs(n.y) > i ? (l = "y") : Math.abs(n.x) > i && (l = "x"), l;
}
class K5 extends Ba {
  constructor(i) {
    super(i),
      (this.removeGroupControls = un),
      (this.removeListeners = un),
      (this.controls = new X5(i));
  }
  mount() {
    const { dragControls: i } = this.node.getProps();
    i && (this.removeGroupControls = i.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || un);
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const g0 = (n) => (i, l) => {
  n && Gt.postRender(() => n(i, l));
};
class Z5 extends Ba {
  constructor() {
    super(...arguments), (this.removePointerDownListener = un);
  }
  onPointerDown(i) {
    this.session = new bb(i, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: xb(this.node),
    });
  }
  createPanHandlers() {
    const {
      onPanSessionStart: i,
      onPanStart: l,
      onPan: o,
      onPanEnd: c,
    } = this.node.getProps();
    return {
      onSessionStart: g0(i),
      onStart: g0(l),
      onMove: o,
      onEnd: (f, d) => {
        delete this.session, c && Gt.postRender(() => c(f, d));
      },
    };
  }
  mount() {
    this.removePointerDownListener = Cl(this.node.current, "pointerdown", (i) =>
      this.onPointerDown(i)
    );
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const xr = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function y0(n, i) {
  return i.max === i.min ? 0 : (n / (i.max - i.min)) * 100;
}
const wl = {
    correct: (n, i) => {
      if (!i.target) return n;
      if (typeof n == "string")
        if (dt.test(n)) n = parseFloat(n);
        else return n;
      const l = y0(n, i.target.x),
        o = y0(n, i.target.y);
      return `${l}% ${o}%`;
    },
  },
  Q5 = {
    correct: (n, { treeScale: i, projectionDelta: l }) => {
      const o = n,
        c = La.parse(n);
      if (c.length > 5) return o;
      const f = La.createTransformer(n),
        d = typeof c[0] != "number" ? 1 : 0,
        p = l.x.scale * i.x,
        h = l.y.scale * i.y;
      (c[0 + d] /= p), (c[1 + d] /= h);
      const m = Pt(p, h, 0.5);
      return (
        typeof c[2 + d] == "number" && (c[2 + d] /= m),
        typeof c[3 + d] == "number" && (c[3 + d] /= m),
        f(c)
      );
    },
  };
let Tf = !1;
class J5 extends D.Component {
  componentDidMount() {
    const {
        visualElement: i,
        layoutGroup: l,
        switchLayoutGroup: o,
        layoutId: c,
      } = this.props,
      { projection: f } = i;
    v4($5),
      f &&
        (l.group && l.group.add(f),
        o && o.register && c && o.register(f),
        Tf && f.root.didUpdate(),
        f.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        f.setOptions({
          ...f.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (xr.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(i) {
    const {
        layoutDependency: l,
        visualElement: o,
        drag: c,
        isPresent: f,
      } = this.props,
      { projection: d } = o;
    return (
      d &&
        ((d.isPresent = f),
        (Tf = !0),
        c || i.layoutDependency !== l || l === void 0 || i.isPresent !== f
          ? d.willUpdate()
          : this.safeToRemove(),
        i.isPresent !== f &&
          (f
            ? d.promote()
            : d.relegate() ||
              Gt.postRender(() => {
                const p = d.getStack();
                (!p || !p.members.length) && this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: i } = this.props.visualElement;
    i &&
      (i.root.didUpdate(),
      Fd.postRender(() => {
        !i.currentAnimation && i.isLead() && this.safeToRemove();
      }));
  }
  componentWillUnmount() {
    const {
        visualElement: i,
        layoutGroup: l,
        switchLayoutGroup: o,
      } = this.props,
      { projection: c } = i;
    (Tf = !0),
      c &&
        (c.scheduleCheckAfterUnmount(),
        l && l.group && l.group.remove(c),
        o && o.deregister && o.deregister(c));
  }
  safeToRemove() {
    const { safeToRemove: i } = this.props;
    i && i();
  }
  render() {
    return null;
  }
}
function Ab(n) {
  const [i, l] = f4(),
    o = D.useContext(tx);
  return x.jsx(J5, {
    ...n,
    layoutGroup: o,
    switchLayoutGroup: D.useContext(nb),
    isPresent: i,
    safeToRemove: l,
  });
}
const $5 = {
  borderRadius: {
    ...wl,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius",
    ],
  },
  borderTopLeftRadius: wl,
  borderTopRightRadius: wl,
  borderBottomLeftRadius: wl,
  borderBottomRightRadius: wl,
  boxShadow: Q5,
};
function I5(n, i, l) {
  const o = Se(n) ? n : gs(n);
  return o.start($d("", o, i, l)), o.animation;
}
const W5 = (n, i) => n.depth - i.depth;
class tN {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(i) {
    Ad(this.children, i), (this.isDirty = !0);
  }
  remove(i) {
    wd(this.children, i), (this.isDirty = !0);
  }
  forEach(i) {
    this.isDirty && this.children.sort(W5),
      (this.isDirty = !1),
      this.children.forEach(i);
  }
}
function eN(n, i) {
  const l = Ue.now(),
    o = ({ timestamp: c }) => {
      const f = c - l;
      f >= i && (Va(o), n(f - i));
    };
  return Gt.setup(o, !0), () => Va(o);
}
const wb = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  nN = wb.length,
  v0 = (n) => (typeof n == "string" ? parseFloat(n) : n),
  x0 = (n) => typeof n == "number" || dt.test(n);
function aN(n, i, l, o, c, f) {
  c
    ? ((n.opacity = Pt(0, l.opacity ?? 1, iN(o))),
      (n.opacityExit = Pt(i.opacity ?? 1, 0, sN(o))))
    : f && (n.opacity = Pt(i.opacity ?? 1, l.opacity ?? 1, o));
  for (let d = 0; d < nN; d++) {
    const p = `border${wb[d]}Radius`;
    let h = b0(i, p),
      m = b0(l, p);
    if (h === void 0 && m === void 0) continue;
    h || (h = 0),
      m || (m = 0),
      h === 0 || m === 0 || x0(h) === x0(m)
        ? ((n[p] = Math.max(Pt(v0(h), v0(m), o), 0)),
          (On.test(m) || On.test(h)) && (n[p] += "%"))
        : (n[p] = m);
  }
  (i.rotate || l.rotate) && (n.rotate = Pt(i.rotate || 0, l.rotate || 0, o));
}
function b0(n, i) {
  return n[i] !== void 0 ? n[i] : n.borderRadius;
}
const iN = Eb(0, 0.5, fx),
  sN = Eb(0.5, 0.95, un);
function Eb(n, i, l) {
  return (o) => (o < n ? 0 : o > i ? 1 : l(_l(n, i, o)));
}
function S0(n, i) {
  (n.min = i.min), (n.max = i.max);
}
function on(n, i) {
  S0(n.x, i.x), S0(n.y, i.y);
}
function A0(n, i) {
  (n.translate = i.translate),
    (n.scale = i.scale),
    (n.originPoint = i.originPoint),
    (n.origin = i.origin);
}
function w0(n, i, l, o, c) {
  return (
    (n -= i), (n = Cr(n, 1 / l, o)), c !== void 0 && (n = Cr(n, 1 / c, o)), n
  );
}
function lN(n, i = 0, l = 1, o = 0.5, c, f = n, d = n) {
  if (
    (On.test(i) &&
      ((i = parseFloat(i)), (i = Pt(d.min, d.max, i / 100) - d.min)),
    typeof i != "number")
  )
    return;
  let p = Pt(f.min, f.max, o);
  n === f && (p -= i),
    (n.min = w0(n.min, i, l, p, c)),
    (n.max = w0(n.max, i, l, p, c));
}
function E0(n, i, [l, o, c], f, d) {
  lN(n, i[l], i[o], i[c], i.scale, f, d);
}
const oN = ["x", "scaleX", "originX"],
  rN = ["y", "scaleY", "originY"];
function T0(n, i, l, o) {
  E0(n.x, i, oN, l ? l.x : void 0, o ? o.x : void 0),
    E0(n.y, i, rN, l ? l.y : void 0, o ? o.y : void 0);
}
function N0(n) {
  return n.translate === 0 && n.scale === 1;
}
function Tb(n) {
  return N0(n.x) && N0(n.y);
}
function D0(n, i) {
  return n.min === i.min && n.max === i.max;
}
function cN(n, i) {
  return D0(n.x, i.x) && D0(n.y, i.y);
}
function C0(n, i) {
  return (
    Math.round(n.min) === Math.round(i.min) &&
    Math.round(n.max) === Math.round(i.max)
  );
}
function Nb(n, i) {
  return C0(n.x, i.x) && C0(n.y, i.y);
}
function M0(n) {
  return De(n.x) / De(n.y);
}
function O0(n, i) {
  return (
    n.translate === i.translate &&
    n.scale === i.scale &&
    n.originPoint === i.originPoint
  );
}
class uN {
  constructor() {
    this.members = [];
  }
  add(i) {
    Ad(this.members, i), i.scheduleRender();
  }
  remove(i) {
    if (
      (wd(this.members, i),
      i === this.prevLead && (this.prevLead = void 0),
      i === this.lead)
    ) {
      const l = this.members[this.members.length - 1];
      l && this.promote(l);
    }
  }
  relegate(i) {
    const l = this.members.findIndex((c) => i === c);
    if (l === 0) return !1;
    let o;
    for (let c = l; c >= 0; c--) {
      const f = this.members[c];
      if (f.isPresent !== !1) {
        o = f;
        break;
      }
    }
    return o ? (this.promote(o), !0) : !1;
  }
  promote(i, l) {
    const o = this.lead;
    if (i !== o && ((this.prevLead = o), (this.lead = i), i.show(), o)) {
      o.instance && o.scheduleRender(),
        i.scheduleRender(),
        (i.resumeFrom = o),
        l && (i.resumeFrom.preserveOpacity = !0),
        o.snapshot &&
          ((i.snapshot = o.snapshot),
          (i.snapshot.latestValues = o.animationValues || o.latestValues)),
        i.root && i.root.isUpdating && (i.isLayoutDirty = !0);
      const { crossfade: c } = i.options;
      c === !1 && o.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((i) => {
      const { options: l, resumingFrom: o } = i;
      l.onExitComplete && l.onExitComplete(),
        o && o.options.onExitComplete && o.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((i) => {
      i.instance && i.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function fN(n, i, l) {
  let o = "";
  const c = n.x.translate / i.x,
    f = n.y.translate / i.y,
    d = l?.z || 0;
  if (
    ((c || f || d) && (o = `translate3d(${c}px, ${f}px, ${d}px) `),
    (i.x !== 1 || i.y !== 1) && (o += `scale(${1 / i.x}, ${1 / i.y}) `),
    l)
  ) {
    const {
      transformPerspective: m,
      rotate: v,
      rotateX: g,
      rotateY: S,
      skewX: A,
      skewY: E,
    } = l;
    m && (o = `perspective(${m}px) ${o}`),
      v && (o += `rotate(${v}deg) `),
      g && (o += `rotateX(${g}deg) `),
      S && (o += `rotateY(${S}deg) `),
      A && (o += `skewX(${A}deg) `),
      E && (o += `skewY(${E}deg) `);
  }
  const p = n.x.scale * i.x,
    h = n.y.scale * i.y;
  return (p !== 1 || h !== 1) && (o += `scale(${p}, ${h})`), o || "none";
}
const Nf = ["", "X", "Y", "Z"],
  dN = 1e3;
let mN = 0;
function Df(n, i, l, o) {
  const { latestValues: c } = i;
  c[n] && ((l[n] = c[n]), i.setStaticValue(n, 0), o && (o[n] = 0));
}
function Db(n) {
  if (((n.hasCheckedOptimisedAppear = !0), n.root === n)) return;
  const { visualElement: i } = n.options;
  if (!i) return;
  const l = db(i);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: c, layoutId: f } = n.options;
    window.MotionCancelOptimisedAnimation(l, "transform", Gt, !(c || f));
  }
  const { parent: o } = n;
  o && !o.hasCheckedOptimisedAppear && Db(o);
}
function Cb({
  attachResizeListener: n,
  defaultParent: i,
  measureScroll: l,
  checkIsScrollRoot: o,
  resetTransform: c,
}) {
  return class {
    constructor(d = {}, p = i?.()) {
      (this.id = mN++),
        (this.animationId = 0),
        (this.animationCommitId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          (this.projectionUpdateScheduled = !1),
            this.nodes.forEach(gN),
            this.nodes.forEach(bN),
            this.nodes.forEach(SN),
            this.nodes.forEach(yN);
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = d),
        (this.root = p ? p.root || p : this),
        (this.path = p ? [...p.path, p] : []),
        (this.parent = p),
        (this.depth = p ? p.depth + 1 : 0);
      for (let h = 0; h < this.path.length; h++)
        this.path[h].shouldResetTransform = !0;
      this.root === this && (this.nodes = new tN());
    }
    addEventListener(d, p) {
      return (
        this.eventHandlers.has(d) || this.eventHandlers.set(d, new Nd()),
        this.eventHandlers.get(d).add(p)
      );
    }
    notifyListeners(d, ...p) {
      const h = this.eventHandlers.get(d);
      h && h.notify(...p);
    }
    hasListeners(d) {
      return this.eventHandlers.has(d);
    }
    mount(d) {
      if (this.instance) return;
      (this.isSVG = qx(d) && !r4(d)), (this.instance = d);
      const { layoutId: p, layout: h, visualElement: m } = this.options;
      if (
        (m && !m.current && m.mount(d),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (h || p) && (this.isLayoutDirty = !0),
        n)
      ) {
        let v,
          g = 0;
        const S = () => (this.root.updateBlockedByResize = !1);
        Gt.read(() => {
          g = window.innerWidth;
        }),
          n(d, () => {
            const A = window.innerWidth;
            A !== g &&
              ((g = A),
              (this.root.updateBlockedByResize = !0),
              v && v(),
              (v = eN(S, 250)),
              xr.hasAnimatedSinceResize &&
                ((xr.hasAnimatedSinceResize = !1), this.nodes.forEach(H0)));
          });
      }
      p && this.root.registerSharedNode(p, this),
        this.options.animate !== !1 &&
          m &&
          (p || h) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: v,
              hasLayoutChanged: g,
              hasRelativeLayoutChanged: S,
              layout: A,
            }) => {
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              const E =
                  this.options.transition || m.getDefaultTransition() || NN,
                { onLayoutAnimationStart: O, onLayoutAnimationComplete: _ } =
                  m.getProps(),
                R = !this.targetLayout || !Nb(this.targetLayout, A),
                X = !g && S;
              if (
                this.options.layoutRoot ||
                this.resumeFrom ||
                X ||
                (g && (R || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0));
                const U = { ...Ud(E, "layout"), onPlay: O, onComplete: _ };
                (m.shouldReduceMotion || this.options.layoutRoot) &&
                  ((U.delay = 0), (U.type = !1)),
                  this.startAnimation(U),
                  this.setAnimationOrigin(v, X);
              } else
                g || H0(this),
                  this.isLead() &&
                    this.options.onExitComplete &&
                    this.options.onExitComplete();
              this.targetLayout = A;
            }
          );
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const d = this.getStack();
      d && d.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        Va(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return (
        this.isAnimationBlocked ||
        (this.parent && this.parent.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        this.nodes && this.nodes.forEach(AN),
        this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: d } = this.options;
      return d && d.getProps().transformTemplate;
    }
    willUpdate(d = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (
        (window.MotionCancelOptimisedAnimation &&
          !this.hasCheckedOptimisedAppear &&
          Db(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let v = 0; v < this.path.length; v++) {
        const g = this.path[v];
        (g.shouldResetTransform = !0),
          g.updateScroll("snapshot"),
          g.options.layoutRoot && g.willUpdate(!1);
      }
      const { layoutId: p, layout: h } = this.options;
      if (p === void 0 && !h) return;
      const m = this.getTransformTemplate();
      (this.prevTransformTemplateValue = m ? m(this.latestValues, "") : void 0),
        this.updateSnapshot(),
        d && this.notifyListeners("willUpdate");
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(R0);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(j0);
        return;
      }
      (this.animationCommitId = this.animationId),
        this.isUpdating
          ? ((this.isUpdating = !1),
            this.nodes.forEach(xN),
            this.nodes.forEach(hN),
            this.nodes.forEach(pN))
          : this.nodes.forEach(j0),
        this.clearAllSnapshots();
      const p = Ue.now();
      (ye.delta = aa(0, 1e3 / 60, p - ye.timestamp)),
        (ye.timestamp = p),
        (ye.isProcessing = !0),
        pf.update.process(ye),
        pf.preRender.process(ye),
        pf.render.process(ye),
        (ye.isProcessing = !1);
    }
    didUpdate() {
      this.updateScheduled ||
        ((this.updateScheduled = !0), Fd.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(vN), this.sharedNodes.forEach(wN);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0),
        Gt.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Gt.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !De(this.snapshot.measuredBox.x) &&
          !De(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0));
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let h = 0; h < this.path.length; h++) this.path[h].updateScroll();
      const d = this.layout;
      (this.layout = this.measure(!1)),
        (this.layoutCorrected = It()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: p } = this.options;
      p &&
        p.notify(
          "LayoutMeasure",
          this.layout.layoutBox,
          d ? d.layoutBox : void 0
        );
    }
    updateScroll(d = "measure") {
      let p = !!(this.options.layoutScroll && this.instance);
      if (
        (this.scroll &&
          this.scroll.animationId === this.root.animationId &&
          this.scroll.phase === d &&
          (p = !1),
        p && this.instance)
      ) {
        const h = o(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: d,
          isRoot: h,
          offset: l(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : h,
        };
      }
    }
    resetTransform() {
      if (!c) return;
      const d =
          this.isLayoutDirty ||
          this.shouldResetTransform ||
          this.options.alwaysMeasureLayout,
        p = this.projectionDelta && !Tb(this.projectionDelta),
        h = this.getTransformTemplate(),
        m = h ? h(this.latestValues, "") : void 0,
        v = m !== this.prevTransformTemplateValue;
      d &&
        this.instance &&
        (p || ui(this.latestValues) || v) &&
        (c(this.instance, m),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure(d = !0) {
      const p = this.measurePageBox();
      let h = this.removeElementScroll(p);
      return (
        d && (h = this.removeTransform(h)),
        DN(h),
        {
          animationId: this.root.animationId,
          measuredBox: p,
          layoutBox: h,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      const { visualElement: d } = this.options;
      if (!d) return It();
      const p = d.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(CN))) {
        const { scroll: m } = this.root;
        m && (cs(p.x, m.offset.x), cs(p.y, m.offset.y));
      }
      return p;
    }
    removeElementScroll(d) {
      const p = It();
      if ((on(p, d), this.scroll?.wasRoot)) return p;
      for (let h = 0; h < this.path.length; h++) {
        const m = this.path[h],
          { scroll: v, options: g } = m;
        m !== this.root &&
          v &&
          g.layoutScroll &&
          (v.wasRoot && on(p, d), cs(p.x, v.offset.x), cs(p.y, v.offset.y));
      }
      return p;
    }
    applyTransform(d, p = !1) {
      const h = It();
      on(h, d);
      for (let m = 0; m < this.path.length; m++) {
        const v = this.path[m];
        !p &&
          v.options.layoutScroll &&
          v.scroll &&
          v !== v.root &&
          us(h, { x: -v.scroll.offset.x, y: -v.scroll.offset.y }),
          ui(v.latestValues) && us(h, v.latestValues);
      }
      return ui(this.latestValues) && us(h, this.latestValues), h;
    }
    removeTransform(d) {
      const p = It();
      on(p, d);
      for (let h = 0; h < this.path.length; h++) {
        const m = this.path[h];
        if (!m.instance || !ui(m.latestValues)) continue;
        Wf(m.latestValues) && m.updateSnapshot();
        const v = It(),
          g = m.measurePageBox();
        on(v, g),
          T0(p, m.latestValues, m.snapshot ? m.snapshot.layoutBox : void 0, v);
      }
      return ui(this.latestValues) && T0(p, this.latestValues), p;
    }
    setTargetDelta(d) {
      (this.targetDelta = d),
        this.root.scheduleUpdateProjection(),
        (this.isProjectionDirty = !0);
    }
    setOptions(d) {
      this.options = {
        ...this.options,
        ...d,
        crossfade: d.crossfade !== void 0 ? d.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== ye.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(d = !1) {
      const p = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = p.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = p.isTransformDirty),
        this.isSharedProjectionDirty ||
          (this.isSharedProjectionDirty = p.isSharedProjectionDirty);
      const h = !!this.resumingFrom || this !== p;
      if (
        !(
          d ||
          (h && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          this.parent?.isProjectionDirty ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return;
      const { layout: v, layoutId: g } = this.options;
      if (!(!this.layout || !(v || g))) {
        if (
          ((this.resolvedRelativeTargetAt = ye.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          const S = this.getClosestProjectingParent();
          S && S.layout && this.animationProgress !== 1
            ? ((this.relativeParent = S),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = It()),
              (this.relativeTargetOrigin = It()),
              Ol(
                this.relativeTargetOrigin,
                this.layout.layoutBox,
                S.layout.layoutBox
              ),
              on(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (
          !(!this.relativeTarget && !this.targetDelta) &&
          (this.target ||
            ((this.target = It()), (this.targetWithTransforms = It())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          this.relativeParent &&
          this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              _5(this.target, this.relativeTarget, this.relativeParent.target))
            : this.targetDelta
            ? (this.resumingFrom
                ? (this.target = this.applyTransform(this.layout.layoutBox))
                : on(this.target, this.layout.layoutBox),
              lb(this.target, this.targetDelta))
            : on(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget)
        ) {
          this.attemptToResolveRelativeTarget = !1;
          const S = this.getClosestProjectingParent();
          S &&
          !!S.resumingFrom == !!this.resumingFrom &&
          !S.options.layoutScroll &&
          S.target &&
          this.animationProgress !== 1
            ? ((this.relativeParent = S),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = It()),
              (this.relativeTargetOrigin = It()),
              Ol(this.relativeTargetOrigin, this.target, S.target),
              on(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
      }
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          Wf(this.parent.latestValues) ||
          sb(this.parent.latestValues)
        )
      )
        return this.parent.isProjecting()
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      const d = this.getLead(),
        p = !!this.resumingFrom || this !== d;
      let h = !0;
      if (
        ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (h = !1),
        p &&
          (this.isSharedProjectionDirty || this.isTransformDirty) &&
          (h = !1),
        this.resolvedRelativeTargetAt === ye.timestamp && (h = !1),
        h)
      )
        return;
      const { layout: m, layoutId: v } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(m || v))
      )
        return;
      on(this.layoutCorrected, this.layout.layoutBox);
      const g = this.treeScale.x,
        S = this.treeScale.y;
      P4(this.layoutCorrected, this.treeScale, this.path, p),
        d.layout &&
          !d.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((d.target = d.layout.layoutBox), (d.targetWithTransforms = It()));
      const { target: A } = d;
      if (!A) {
        this.prevProjectionDelta &&
          (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (A0(this.prevProjectionDelta.x, this.projectionDelta.x),
          A0(this.prevProjectionDelta.y, this.projectionDelta.y)),
        Ml(this.projectionDelta, this.layoutCorrected, A, this.latestValues),
        (this.treeScale.x !== g ||
          this.treeScale.y !== S ||
          !O0(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !O0(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", A));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(d = !0) {
      if ((this.options.visualElement?.scheduleRender(), d)) {
        const p = this.getStack();
        p && p.scheduleRender();
      }
      this.resumingFrom &&
        !this.resumingFrom.instance &&
        (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      (this.prevProjectionDelta = fs()),
        (this.projectionDelta = fs()),
        (this.projectionDeltaWithTransform = fs());
    }
    setAnimationOrigin(d, p = !1) {
      const h = this.snapshot,
        m = h ? h.latestValues : {},
        v = { ...this.latestValues },
        g = fs();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !p);
      const S = It(),
        A = h ? h.source : void 0,
        E = this.layout ? this.layout.source : void 0,
        O = A !== E,
        _ = this.getStack(),
        R = !_ || _.members.length <= 1,
        X = !!(O && !R && this.options.crossfade === !0 && !this.path.some(TN));
      this.animationProgress = 0;
      let U;
      (this.mixTargetDelta = (Q) => {
        const Z = Q / 1e3;
        _0(g.x, d.x, Z),
          _0(g.y, d.y, Z),
          this.setTargetDelta(g),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Ol(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            EN(this.relativeTarget, this.relativeTargetOrigin, S, Z),
            U && cN(this.relativeTarget, U) && (this.isProjectionDirty = !1),
            U || (U = It()),
            on(U, this.relativeTarget)),
          O &&
            ((this.animationValues = v), aN(v, m, this.latestValues, Z, X, R)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = Z);
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(d) {
      this.notifyListeners("animationStart"),
        this.currentAnimation?.stop(),
        this.resumingFrom?.currentAnimation?.stop(),
        this.pendingAnimation &&
          (Va(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = Gt.update(() => {
          (xr.hasAnimatedSinceResize = !0),
            this.motionValue || (this.motionValue = gs(0)),
            (this.currentAnimation = I5(this.motionValue, [0, 1e3], {
              ...d,
              velocity: 0,
              isSync: !0,
              onUpdate: (p) => {
                this.mixTargetDelta(p), d.onUpdate && d.onUpdate(p);
              },
              onStop: () => {},
              onComplete: () => {
                d.onComplete && d.onComplete(), this.completeAnimation();
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      const d = this.getStack();
      d && d.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(dN),
        this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const d = this.getLead();
      let {
        targetWithTransforms: p,
        target: h,
        layout: m,
        latestValues: v,
      } = d;
      if (!(!p || !h || !m)) {
        if (
          this !== d &&
          this.layout &&
          m &&
          Mb(this.options.animationType, this.layout.layoutBox, m.layoutBox)
        ) {
          h = this.target || It();
          const g = De(this.layout.layoutBox.x);
          (h.x.min = d.target.x.min), (h.x.max = h.x.min + g);
          const S = De(this.layout.layoutBox.y);
          (h.y.min = d.target.y.min), (h.y.max = h.y.min + S);
        }
        on(p, h),
          us(p, v),
          Ml(this.projectionDeltaWithTransform, this.layoutCorrected, p, v);
      }
    }
    registerSharedNode(d, p) {
      this.sharedNodes.has(d) || this.sharedNodes.set(d, new uN()),
        this.sharedNodes.get(d).add(p);
      const m = p.options.initialPromotionConfig;
      p.promote({
        transition: m ? m.transition : void 0,
        preserveFollowOpacity:
          m && m.shouldPreserveFollowOpacity
            ? m.shouldPreserveFollowOpacity(p)
            : void 0,
      });
    }
    isLead() {
      const d = this.getStack();
      return d ? d.lead === this : !0;
    }
    getLead() {
      const { layoutId: d } = this.options;
      return d ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: d } = this.options;
      return d ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: d } = this.options;
      if (d) return this.root.sharedNodes.get(d);
    }
    promote({ needsReset: d, transition: p, preserveFollowOpacity: h } = {}) {
      const m = this.getStack();
      m && m.promote(this, h),
        d && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        p && this.setOptions({ transition: p });
    }
    relegate() {
      const d = this.getStack();
      return d ? d.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: d } = this.options;
      if (!d) return;
      let p = !1;
      const { latestValues: h } = d;
      if (
        ((h.z ||
          h.rotate ||
          h.rotateX ||
          h.rotateY ||
          h.rotateZ ||
          h.skewX ||
          h.skewY) &&
          (p = !0),
        !p)
      )
        return;
      const m = {};
      h.z && Df("z", d, m, this.animationValues);
      for (let v = 0; v < Nf.length; v++)
        Df(`rotate${Nf[v]}`, d, m, this.animationValues),
          Df(`skew${Nf[v]}`, d, m, this.animationValues);
      d.render();
      for (const v in m)
        d.setStaticValue(v, m[v]),
          this.animationValues && (this.animationValues[v] = m[v]);
      d.scheduleRender();
    }
    applyProjectionStyles(d, p) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) {
        d.visibility = "hidden";
        return;
      }
      const h = this.getTransformTemplate();
      if (this.needsReset) {
        (this.needsReset = !1),
          (d.visibility = ""),
          (d.opacity = ""),
          (d.pointerEvents = vr(p?.pointerEvents) || ""),
          (d.transform = h ? h(this.latestValues, "") : "none");
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId &&
          ((d.opacity =
            this.latestValues.opacity !== void 0
              ? this.latestValues.opacity
              : 1),
          (d.pointerEvents = vr(p?.pointerEvents) || "")),
          this.hasProjected &&
            !ui(this.latestValues) &&
            ((d.transform = h ? h({}, "") : "none"), (this.hasProjected = !1));
        return;
      }
      d.visibility = "";
      const v = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let g = fN(this.projectionDeltaWithTransform, this.treeScale, v);
      h && (g = h(v, g)), (d.transform = g);
      const { x: S, y: A } = this.projectionDelta;
      (d.transformOrigin = `${S.origin * 100}% ${A.origin * 100}% 0`),
        m.animationValues
          ? (d.opacity =
              m === this
                ? v.opacity ?? this.latestValues.opacity ?? 1
                : this.preserveOpacity
                ? this.latestValues.opacity
                : v.opacityExit)
          : (d.opacity =
              m === this
                ? v.opacity !== void 0
                  ? v.opacity
                  : ""
                : v.opacityExit !== void 0
                ? v.opacityExit
                : 0);
      for (const E in Bl) {
        if (v[E] === void 0) continue;
        const { correct: O, applyTo: _, isCSSVariable: R } = Bl[E],
          X = g === "none" ? v[E] : O(v[E], m);
        if (_) {
          const U = _.length;
          for (let Q = 0; Q < U; Q++) d[_[Q]] = X;
        } else
          R ? (this.options.visualElement.renderState.vars[E] = X) : (d[E] = X);
      }
      this.options.layoutId &&
        (d.pointerEvents = m === this ? vr(p?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((d) => d.currentAnimation?.stop()),
        this.root.nodes.forEach(R0),
        this.root.sharedNodes.clear();
    }
  };
}
function hN(n) {
  n.updateLayout();
}
function pN(n) {
  const i = n.resumeFrom?.snapshot || n.snapshot;
  if (n.isLead() && n.layout && i && n.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: o } = n.layout,
      { animationType: c } = n.options,
      f = i.source !== n.layout.source;
    c === "size"
      ? rn((v) => {
          const g = f ? i.measuredBox[v] : i.layoutBox[v],
            S = De(g);
          (g.min = l[v].min), (g.max = g.min + S);
        })
      : Mb(c, i.layoutBox, l) &&
        rn((v) => {
          const g = f ? i.measuredBox[v] : i.layoutBox[v],
            S = De(l[v]);
          (g.max = g.min + S),
            n.relativeTarget &&
              !n.currentAnimation &&
              ((n.isProjectionDirty = !0),
              (n.relativeTarget[v].max = n.relativeTarget[v].min + S));
        });
    const d = fs();
    Ml(d, l, i.layoutBox);
    const p = fs();
    f ? Ml(p, n.applyTransform(o, !0), i.measuredBox) : Ml(p, l, i.layoutBox);
    const h = !Tb(d);
    let m = !1;
    if (!n.resumeFrom) {
      const v = n.getClosestProjectingParent();
      if (v && !v.resumeFrom) {
        const { snapshot: g, layout: S } = v;
        if (g && S) {
          const A = It();
          Ol(A, i.layoutBox, g.layoutBox);
          const E = It();
          Ol(E, l, S.layoutBox),
            Nb(A, E) || (m = !0),
            v.options.layoutRoot &&
              ((n.relativeTarget = E),
              (n.relativeTargetOrigin = A),
              (n.relativeParent = v));
        }
      }
    }
    n.notifyListeners("didUpdate", {
      layout: l,
      snapshot: i,
      delta: p,
      layoutDelta: d,
      hasLayoutChanged: h,
      hasRelativeLayoutChanged: m,
    });
  } else if (n.isLead()) {
    const { onExitComplete: l } = n.options;
    l && l();
  }
  n.options.transition = void 0;
}
function gN(n) {
  n.parent &&
    (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty),
    n.isSharedProjectionDirty ||
      (n.isSharedProjectionDirty = !!(
        n.isProjectionDirty ||
        n.parent.isProjectionDirty ||
        n.parent.isSharedProjectionDirty
      )),
    n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function yN(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function vN(n) {
  n.clearSnapshot();
}
function R0(n) {
  n.clearMeasurements();
}
function j0(n) {
  n.isLayoutDirty = !1;
}
function xN(n) {
  const { visualElement: i } = n.options;
  i && i.getProps().onBeforeLayoutMeasure && i.notify("BeforeLayoutMeasure"),
    n.resetTransform();
}
function H0(n) {
  n.finishAnimation(),
    (n.targetDelta = n.relativeTarget = n.target = void 0),
    (n.isProjectionDirty = !0);
}
function bN(n) {
  n.resolveTargetDelta();
}
function SN(n) {
  n.calcProjection();
}
function AN(n) {
  n.resetSkewAndRotation();
}
function wN(n) {
  n.removeLeadSnapshot();
}
function _0(n, i, l) {
  (n.translate = Pt(i.translate, 0, l)),
    (n.scale = Pt(i.scale, 1, l)),
    (n.origin = i.origin),
    (n.originPoint = i.originPoint);
}
function z0(n, i, l, o) {
  (n.min = Pt(i.min, l.min, o)), (n.max = Pt(i.max, l.max, o));
}
function EN(n, i, l, o) {
  z0(n.x, i.x, l.x, o), z0(n.y, i.y, l.y, o);
}
function TN(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const NN = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  V0 = (n) =>
    typeof navigator < "u" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(n),
  L0 = V0("applewebkit/") && !V0("chrome/") ? Math.round : un;
function B0(n) {
  (n.min = L0(n.min)), (n.max = L0(n.max));
}
function DN(n) {
  B0(n.x), B0(n.y);
}
function Mb(n, i, l) {
  return (
    n === "position" || (n === "preserve-aspect" && !H5(M0(i), M0(l), 0.2))
  );
}
function CN(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const MN = Cb({
    attachResizeListener: (n, i) => Ul(n, "resize", i),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  Cf = { current: void 0 },
  Ob = Cb({
    measureScroll: (n) => ({ x: n.scrollLeft, y: n.scrollTop }),
    defaultParent: () => {
      if (!Cf.current) {
        const n = new MN({});
        n.mount(window), n.setOptions({ layoutScroll: !0 }), (Cf.current = n);
      }
      return Cf.current;
    },
    resetTransform: (n, i) => {
      n.style.transform = i !== void 0 ? i : "none";
    },
    checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed",
  }),
  ON = {
    pan: { Feature: Z5 },
    drag: { Feature: K5, ProjectionNode: Ob, MeasureLayout: Ab },
  };
function U0(n, i, l) {
  const { props: o } = n;
  n.animationState &&
    o.whileHover &&
    n.animationState.setActive("whileHover", l === "Start");
  const c = "onHover" + l,
    f = o[c];
  f && Gt.postRender(() => f(i, Xl(i)));
}
class RN extends Ba {
  mount() {
    const { current: i } = this.node;
    i &&
      (this.unmount = a4(
        i,
        (l, o) => (U0(this.node, o, "Start"), (c) => U0(this.node, c, "End"))
      ));
  }
  unmount() {}
}
class jN extends Ba {
  constructor() {
    super(...arguments), (this.isActive = !1);
  }
  onFocus() {
    let i = !1;
    try {
      i = this.node.current.matches(":focus-visible");
    } catch {
      i = !0;
    }
    !i ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !0),
      (this.isActive = !0));
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive("whileFocus", !1),
      (this.isActive = !1));
  }
  mount() {
    this.unmount = Yl(
      Ul(this.node.current, "focus", () => this.onFocus()),
      Ul(this.node.current, "blur", () => this.onBlur())
    );
  }
  unmount() {}
}
function k0(n, i, l) {
  const { props: o } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled) return;
  n.animationState &&
    o.whileTap &&
    n.animationState.setActive("whileTap", l === "Start");
  const c = "onTap" + (l === "End" ? "" : l),
    f = o[c];
  f && Gt.postRender(() => f(i, Xl(i)));
}
class HN extends Ba {
  mount() {
    const { current: i } = this.node;
    i &&
      (this.unmount = o4(
        i,
        (l, o) => (
          k0(this.node, o, "Start"),
          (c, { success: f }) => k0(this.node, c, f ? "End" : "Cancel")
        ),
        { useGlobalTarget: this.node.props.globalTapTarget }
      ));
  }
  unmount() {}
}
const ld = new WeakMap(),
  Mf = new WeakMap(),
  _N = (n) => {
    const i = ld.get(n.target);
    i && i(n);
  },
  zN = (n) => {
    n.forEach(_N);
  };
function VN({ root: n, ...i }) {
  const l = n || document;
  Mf.has(l) || Mf.set(l, {});
  const o = Mf.get(l),
    c = JSON.stringify(i);
  return o[c] || (o[c] = new IntersectionObserver(zN, { root: n, ...i })), o[c];
}
function LN(n, i, l) {
  const o = VN(i);
  return (
    ld.set(n, l),
    o.observe(n),
    () => {
      ld.delete(n), o.unobserve(n);
    }
  );
}
const BN = { some: 0, all: 1 };
class UN extends Ba {
  constructor() {
    super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
  }
  startObserver() {
    this.unmount();
    const { viewport: i = {} } = this.node.getProps(),
      { root: l, margin: o, amount: c = "some", once: f } = i,
      d = {
        root: l ? l.current : void 0,
        rootMargin: o,
        threshold: typeof c == "number" ? c : BN[c],
      },
      p = (h) => {
        const { isIntersecting: m } = h;
        if (
          this.isInView === m ||
          ((this.isInView = m), f && !m && this.hasEnteredView)
        )
          return;
        m && (this.hasEnteredView = !0),
          this.node.animationState &&
            this.node.animationState.setActive("whileInView", m);
        const { onViewportEnter: v, onViewportLeave: g } = this.node.getProps(),
          S = m ? v : g;
        S && S(h);
      };
    return LN(this.node.current, d, p);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u") return;
    const { props: i, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(kN(i, l)) && this.startObserver();
  }
  unmount() {}
}
function kN({ viewport: n = {} }, { viewport: i = {} } = {}) {
  return (l) => n[l] !== i[l];
}
const FN = {
    inView: { Feature: UN },
    tap: { Feature: HN },
    focus: { Feature: jN },
    hover: { Feature: RN },
  },
  YN = { layout: { ProjectionNode: Ob, MeasureLayout: Ab } },
  qN = { ...D5, ...FN, ...ON, ...YN },
  Ht = q4(qN, n5),
  Rb = "0x32C9C5A32965eE8Ea2b3756AA723D668ee14b2EC";
function GN() {
  const [n, i] = D.useState(!1),
    [l, o] = D.useState(0);
  D.useEffect(() => {
    const f = () => o(window.scrollY);
    return (
      window.addEventListener("scroll", f),
      () => window.removeEventListener("scroll", f)
    );
  }, []);
  const c = () => {
    navigator.clipboard.writeText(Rb),
      i(!0),
      q0.success("Contract address copied!"),
      setTimeout(() => i(!1), 2e3);
  };
  return x.jsxs("div", {
    "data-loc": "client/src/pages/Home.tsx:53",
    className: "min-h-screen bg-[#0A0A0A] text-[#F5F0E1] overflow-x-hidden",
    children: [
      x.jsx(XN, { "data-loc": "client/src/pages/Home.tsx:55" }),
      x.jsx(PN, {
        "data-loc": "client/src/pages/Home.tsx:58",
        scrollY: l,
        copyAddress: c,
        copied: n,
      }),
      x.jsx(KN, { "data-loc": "client/src/pages/Home.tsx:61" }),
      x.jsx(ZN, { "data-loc": "client/src/pages/Home.tsx:64" }),
      x.jsx(QN, { "data-loc": "client/src/pages/Home.tsx:67" }),
      x.jsx(JN, { "data-loc": "client/src/pages/Home.tsx:70" }),
      x.jsx($N, { "data-loc": "client/src/pages/Home.tsx:73" }),
      x.jsx(IN, { "data-loc": "client/src/pages/Home.tsx:76" }),
      x.jsx(WN, { "data-loc": "client/src/pages/Home.tsx:79" }),
      x.jsx(tD, { "data-loc": "client/src/pages/Home.tsx:82" }),
      x.jsx(eD, { "data-loc": "client/src/pages/Home.tsx:85" }),
    ],
  });
}
function XN() {
  const [n, i] = D.useState(!1);
  D.useEffect(() => {
    const o = () => i(window.scrollY > 50);
    return (
      window.addEventListener("scroll", o),
      () => window.removeEventListener("scroll", o)
    );
  }, []);
  const l = (o) => {
    document.getElementById(o)?.scrollIntoView({ behavior: "smooth" });
  };
  return x.jsx(Ht.nav, {
    "data-loc": "client/src/pages/Home.tsx:104",
    initial: { y: -100 },
    animate: { y: 0 },
    className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      n ? "bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#D4AF37]/20" : ""
    }`,
    children: x.jsxs("div", {
      "data-loc": "client/src/pages/Home.tsx:111",
      className:
        "container mx-auto px-4 py-4 flex items-center justify-between",
      children: [
        x.jsxs("div", {
          "data-loc": "client/src/pages/Home.tsx:112",
          className: "flex items-center gap-3",
          children: [
            x.jsx("img", {
              "data-loc": "client/src/pages/Home.tsx:113",
              src: "/images/oil-derrick-badge.png",
              alt: "$OIL",
              className: "w-12 h-12",
            }),
            x.jsx("span", {
              "data-loc": "client/src/pages/Home.tsx:118",
              className:
                "font-['Bebas_Neue'] text-3xl text-[#D4AF37] tracking-wider",
              children: "$OIL",
            }),
          ],
        }),
        x.jsx("div", {
          "data-loc": "client/src/pages/Home.tsx:121",
          className: "hidden md:flex items-center gap-8",
          children: [
            "about",
            "tokenomics",
            "chart",
            "burns",
            "roadmap",
            "community",
          ].map((o) =>
            x.jsx(
              "button",
              {
                "data-loc": "client/src/pages/Home.tsx:123",
                onClick: () => l(o),
                className:
                  "font-['Oswald'] text-sm uppercase tracking-widest text-[#F5F0E1] hover:text-[#D4AF37] transition-colors",
                children: o === "supply-control" ? "SUPPLY" : o,
              },
              o
            )
          ),
        }),
        x.jsx("a", {
          "data-loc": "client/src/pages/Home.tsx:133",
          href: "https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=0x32C9C5A32965eE8Ea2b3756AA723D668ee14b2EC",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "btn-propaganda text-sm px-6 py-3",
          children: "Buy $OIL",
        }),
      ],
    }),
  });
}
function PN({ scrollY: n, copyAddress: i, copied: l }) {
  return x.jsxs("section", {
    "data-loc": "client/src/pages/Home.tsx:148",
    className:
      "relative min-h-screen flex items-center justify-center overflow-hidden",
    children: [
      x.jsxs("div", {
        "data-loc": "client/src/pages/Home.tsx:150",
        className: "absolute inset-0 z-0",
        style: { transform: `translateY(${n * 0.5}px)` },
        children: [
          x.jsx("img", {
            "data-loc": "client/src/pages/Home.tsx:154",
            src: "/images/hero-bg.png",
            alt: "",
            className: "w-full h-full object-cover opacity-60",
          }),
          x.jsx("div", {
            "data-loc": "client/src/pages/Home.tsx:159",
            className:
              "absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]",
          }),
        ],
      }),
      x.jsxs("div", {
        "data-loc": "client/src/pages/Home.tsx:163",
        className: "absolute inset-0 z-10",
        children: [
          x.jsx("div", {
            "data-loc": "client/src/pages/Home.tsx:164",
            className:
              "absolute top-0 left-0 w-1/3 h-full bg-[#C41E3A]/10 skew-x-12 -translate-x-1/4",
          }),
          x.jsx("div", {
            "data-loc": "client/src/pages/Home.tsx:165",
            className:
              "absolute top-0 right-0 w-1/4 h-full bg-[#D4AF37]/10 -skew-x-12 translate-x-1/4",
          }),
        ],
      }),
      x.jsxs("div", {
        "data-loc": "client/src/pages/Home.tsx:169",
        className: "relative z-20 container mx-auto px-4 text-center",
        children: [
          x.jsxs(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:170",
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8 },
            children: [
              x.jsx(Ht.div, {
                "data-loc": "client/src/pages/Home.tsx:176",
                initial: { rotate: -10, scale: 0 },
                animate: { rotate: -5, scale: 1 },
                transition: { delay: 0.5, type: "spring" },
                className: "inline-block mb-6",
                children: x.jsx("span", {
                  "data-loc": "client/src/pages/Home.tsx:182",
                  className: "stamp text-[#C41E3A] text-sm md:text-base",
                  children: "CLASSIFIED // TOP SECRET",
                }),
              }),
              x.jsx(Ht.div, {
                "data-loc": "client/src/pages/Home.tsx:188",
                initial: { scale: 0, rotate: -180 },
                animate: { scale: 1, rotate: 0 },
                transition: { delay: 0.3, type: "spring", stiffness: 100 },
                className: "mb-8",
                children: x.jsxs("div", {
                  "data-loc": "client/src/pages/Home.tsx:194",
                  className: "relative inline-block",
                  children: [
                    x.jsx("div", {
                      "data-loc": "client/src/pages/Home.tsx:195",
                      className:
                        "absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-3xl scale-150",
                    }),
                    x.jsx("img", {
                      "data-loc": "client/src/pages/Home.tsx:196",
                      src: "/images/petey-hero.png",
                      alt: "Petey Petroleum",
                      className:
                        "relative w-56 h-56 md:w-72 md:h-72 mx-auto drop-shadow-[0_0_40px_rgba(212,175,55,0.6)]",
                    }),
                  ],
                }),
              }),
              x.jsx("h1", {
                "data-loc": "client/src/pages/Home.tsx:205",
                className:
                  "font-['Bebas_Neue'] text-6xl md:text-8xl lg:text-9xl text-[#D4AF37] gold-glow mb-4 tracking-wider",
                children: "$OIL",
              }),
              x.jsx("p", {
                "data-loc": "client/src/pages/Home.tsx:209",
                className:
                  "font-['Oswald'] text-xl md:text-3xl text-[#F5F0E1] mb-2 tracking-wide",
                children: "YOUR PORTFOLIO NEEDS SOME",
              }),
              x.jsx("p", {
                "data-loc": "client/src/pages/Home.tsx:212",
                className:
                  "font-['Bebas_Neue'] text-4xl md:text-6xl text-[#C41E3A] mb-8",
                children: "FREEDOM",
              }),
              x.jsx(Ht.p, {
                "data-loc": "client/src/pages/Home.tsx:217",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 1 },
                className:
                  "font-['Special_Elite'] text-lg md:text-xl text-[#D4AF37]/80 mb-12",
                children:
                  '"DRILL, BABY, DRILL" • "GET OILED OR GET LEFT BEHIND" • "CRUDE GAINS, REFINED PROFITS"',
              }),
              x.jsxs("div", {
                "data-loc": "client/src/pages/Home.tsx:227",
                className: "max-w-xl mx-auto mb-8",
                children: [
                  x.jsx("p", {
                    "data-loc": "client/src/pages/Home.tsx:228",
                    className:
                      "font-['Oswald'] text-sm text-[#F5F0E1]/60 mb-2 uppercase tracking-widest",
                    children: "Contract Address",
                  }),
                  x.jsxs("button", {
                    "data-loc": "client/src/pages/Home.tsx:231",
                    onClick: i,
                    className:
                      "w-full flex items-center justify-center gap-3 bg-[#1A1A1A] border-2 border-[#D4AF37]/30 px-6 py-4 hover:border-[#D4AF37] transition-colors group",
                    children: [
                      x.jsx("code", {
                        "data-loc": "client/src/pages/Home.tsx:235",
                        className:
                          "font-mono text-[#D4AF37] text-sm md:text-base truncate",
                        children: Rb,
                      }),
                      l
                        ? x.jsx(kv, {
                            "data-loc": "client/src/pages/Home.tsx:239",
                            className: "w-5 h-5 text-green-500 flex-shrink-0",
                          })
                        : x.jsx(HE, {
                            "data-loc": "client/src/pages/Home.tsx:241",
                            className:
                              "w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform flex-shrink-0",
                          }),
                    ],
                  }),
                ],
              }),
              x.jsxs("div", {
                "data-loc": "client/src/pages/Home.tsx:247",
                className: "flex flex-col sm:flex-row gap-4 justify-center",
                children: [
                  x.jsxs("a", {
                    "data-loc": "client/src/pages/Home.tsx:248",
                    href: "https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=0x32C9C5A32965eE8Ea2b3756AA723D668ee14b2EC",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "btn-propaganda pulse-red",
                    children: [
                      x.jsx(Yv, {
                        "data-loc": "client/src/pages/Home.tsx:254",
                        className: "inline-block w-5 h-5 mr-2",
                      }),
                      "Buy $OIL Now",
                    ],
                  }),
                  x.jsx("button", {
                    "data-loc": "client/src/pages/Home.tsx:257",
                    onClick: () =>
                      document
                        .getElementById("about")
                        ?.scrollIntoView({ behavior: "smooth" }),
                    className: "btn-propaganda-outline",
                    children: "Learn More",
                  }),
                ],
              }),
            ],
          }),
          x.jsx(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:267",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.5 },
            className: "absolute bottom-8 left-1/2 -translate-x-1/2",
            children: x.jsx(OE, {
              "data-loc": "client/src/pages/Home.tsx:273",
              className: "w-8 h-8 text-[#D4AF37] animate-bounce",
            }),
          }),
        ],
      }),
    ],
  });
}
function KN() {
  return x.jsxs("section", {
    "data-loc": "client/src/pages/Home.tsx:282",
    id: "about",
    className: "relative py-24 overflow-hidden",
    children: [
      x.jsx("div", {
        "data-loc": "client/src/pages/Home.tsx:284",
        className:
          "absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]",
      }),
      x.jsx("div", {
        "data-loc": "client/src/pages/Home.tsx:285",
        className: "absolute top-0 left-0 w-full h-32 bg-[#C41E3A]/5 -skew-y-2",
      }),
      x.jsxs("div", {
        "data-loc": "client/src/pages/Home.tsx:287",
        className: "relative container mx-auto px-4",
        children: [
          x.jsxs(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:288",
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            className: "text-center mb-16",
            children: [
              x.jsx("span", {
                "data-loc": "client/src/pages/Home.tsx:294",
                className: "stamp text-[#D4AF37] text-sm mb-4 inline-block",
                children: "INTELLIGENCE BRIEFING",
              }),
              x.jsx("h2", {
                "data-loc": "client/src/pages/Home.tsx:297",
                className:
                  "font-['Bebas_Neue'] text-5xl md:text-7xl text-[#D4AF37] mb-4",
                children: "MEET PETEY PETROLEUM",
              }),
              x.jsx("p", {
                "data-loc": "client/src/pages/Home.tsx:300",
                className:
                  "font-['Oswald'] text-xl text-[#F5F0E1]/80 max-w-2xl mx-auto",
                children:
                  "Your guide to liberating gains in the crypto frontier",
              }),
            ],
          }),
          x.jsxs("div", {
            "data-loc": "client/src/pages/Home.tsx:305",
            className: "grid md:grid-cols-2 gap-12 items-center",
            children: [
              x.jsxs(Ht.div, {
                "data-loc": "client/src/pages/Home.tsx:307",
                initial: { opacity: 0, x: -50 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: !0 },
                className: "relative",
                children: [
                  x.jsx("div", {
                    "data-loc": "client/src/pages/Home.tsx:313",
                    className:
                      "absolute inset-0 bg-[#D4AF37]/20 rotate-3 rounded-lg",
                  }),
                  x.jsx("div", {
                    "data-loc": "client/src/pages/Home.tsx:314",
                    className:
                      "relative bg-[#1A1A1A] border-4 border-[#D4AF37]/50 p-8 -rotate-1",
                    children: x.jsx("img", {
                      "data-loc": "client/src/pages/Home.tsx:315",
                      src: "/images/tank-hero.png",
                      alt: "Petey Petroleum",
                      className:
                        "w-full max-w-sm mx-auto drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]",
                    }),
                  }),
                ],
              }),
              x.jsxs(Ht.div, {
                "data-loc": "client/src/pages/Home.tsx:324",
                initial: { opacity: 0, x: 50 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: !0 },
                className: "space-y-6",
                children: [
                  x.jsxs("div", {
                    "data-loc": "client/src/pages/Home.tsx:330",
                    className: "bg-[#1A1A1A] border-l-4 border-[#C41E3A] p-6",
                    children: [
                      x.jsx("h3", {
                        "data-loc": "client/src/pages/Home.tsx:331",
                        className:
                          "font-['Oswald'] text-2xl text-[#D4AF37] mb-3 uppercase",
                        children: "About Oil",
                      }),
                      x.jsxs("p", {
                        "data-loc": "client/src/pages/Home.tsx:334",
                        className: "text-[#F5F0E1]/80 leading-relaxed",
                        children: [
                          x.jsx("strong", {
                            "data-loc": "client/src/pages/Home.tsx:335",
                            className: "text-[#D4AF37]",
                            children: "OIL",
                          }),
                          " is a meme token fueled by global tension and rising crude prices. Inspired by Middle East conflicts and the surge in energy markets, OIL captures the heat of geopolitical drama and turns it into pure crypto fire. When oil pumps, OIL pumps harder — a bold, blazing symbol of",
                          x.jsx("span", {
                            "data-loc": "client/src/pages/Home.tsx:337",
                            className: "text-[#C41E3A] font-bold",
                            children: ' "VOLATILITY, POWER, PROFIT"',
                          }),
                          " (M.W.R.A.).",
                        ],
                      }),
                    ],
                  }),
                  x.jsxs("div", {
                    "data-loc": "client/src/pages/Home.tsx:341",
                    className: "bg-[#1A1A1A] border-l-4 border-[#D4AF37] p-6",
                    children: [
                      x.jsx("h3", {
                        "data-loc": "client/src/pages/Home.tsx:342",
                        className:
                          "font-['Oswald'] text-2xl text-[#D4AF37] mb-3 uppercase",
                        children: "The Mission",
                      }),
                      x.jsxs("p", {
                        "data-loc": "client/src/pages/Home.tsx:345",
                        className: "text-[#F5F0E1]/80 leading-relaxed",
                        children: [
                          "Mr.OIL is brash, unapologetically capitalist, and always ready to",
                          x.jsx("span", {
                            "data-loc": "client/src/pages/Home.tsx:347",
                            className: "text-[#D4AF37] font-bold",
                            children: ' "liberate"',
                          }),
                          " some gains. He's here to drill through the noise and pump your portfolio to new heights.",
                        ],
                      }),
                    ],
                  }),
                  x.jsx("div", {
                    "data-loc": "client/src/pages/Home.tsx:352",
                    className: "grid grid-cols-2 gap-4",
                    children: [
                      { icon: Tl, label: "Burn to Earn", color: "#C41E3A" },
                      { icon: qv, label: "Based & Secure", color: "#D4AF37" },
                      { icon: BE, label: "Community First", color: "#4A5568" },
                      { icon: Xv, label: "Lightning Fast", color: "#D4AF37" },
                    ].map((n, i) =>
                      x.jsxs(
                        Ht.div,
                        {
                          "data-loc": "client/src/pages/Home.tsx:359",
                          initial: { opacity: 0, y: 20 },
                          whileInView: { opacity: 1, y: 0 },
                          viewport: { once: !0 },
                          transition: { delay: i * 0.1 },
                          className:
                            "bg-[#1A1A1A] border border-[#D4AF37]/20 p-4 flex items-center gap-3 hover:border-[#D4AF37]/50 transition-colors",
                          children: [
                            x.jsx(n.icon, {
                              "data-loc": "client/src/pages/Home.tsx:367",
                              className: "w-6 h-6",
                              style: { color: n.color },
                            }),
                            x.jsx("span", {
                              "data-loc": "client/src/pages/Home.tsx:368",
                              className:
                                "font-['Oswald'] text-sm uppercase tracking-wide",
                              children: n.label,
                            }),
                          ],
                        },
                        n.label
                      )
                    ),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function ZN() {
  return x.jsxs("section", {
    "data-loc": "client/src/pages/Home.tsx:381",
    id: "tokenomics",
    className: "relative py-24 overflow-hidden",
    children: [
      x.jsxs("div", {
        "data-loc": "client/src/pages/Home.tsx:383",
        className: "absolute inset-0",
        children: [
          x.jsx("img", {
            "data-loc": "client/src/pages/Home.tsx:384",
            src: "/images/tokenomics-bg.png",
            alt: "",
            className: "w-full h-full object-cover opacity-20",
          }),
          x.jsx("div", {
            "data-loc": "client/src/pages/Home.tsx:389",
            className:
              "absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]",
          }),
        ],
      }),
      x.jsxs("div", {
        "data-loc": "client/src/pages/Home.tsx:392",
        className: "relative container mx-auto px-4",
        children: [
          x.jsxs(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:393",
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            className: "text-center mb-16",
            children: [
              x.jsx("span", {
                "data-loc": "client/src/pages/Home.tsx:399",
                className: "stamp text-[#C41E3A] text-sm mb-4 inline-block",
                children: "THE NARRATIVE",
              }),
              x.jsx("h2", {
                "data-loc": "client/src/pages/Home.tsx:402",
                className:
                  "font-['Bebas_Neue'] text-5xl md:text-7xl text-[#D4AF37] mb-4",
                children: "TOKENOMICS",
              }),
              x.jsx("p", {
                "data-loc": "client/src/pages/Home.tsx:405",
                className:
                  "font-['Oswald'] text-xl text-[#F5F0E1]/80 max-w-2xl mx-auto",
                children: "The economics of liberation",
              }),
            ],
          }),
          x.jsx(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:411",
            initial: { opacity: 0, scale: 0.9 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: !0 },
            className: "max-w-xl mx-auto mb-16",
            children: x.jsxs("div", {
              "data-loc": "client/src/pages/Home.tsx:417",
              className: "relative",
              children: [
                x.jsx("div", {
                  "data-loc": "client/src/pages/Home.tsx:418",
                  className: "absolute inset-0 bg-[#D4AF37]/20 rotate-2",
                }),
                x.jsxs("div", {
                  "data-loc": "client/src/pages/Home.tsx:419",
                  className:
                    "relative bg-[#1A1A1A] border-4 border-[#D4AF37] p-10 text-center",
                  children: [
                    x.jsx("p", {
                      "data-loc": "client/src/pages/Home.tsx:420",
                      className:
                        "font-['Oswald'] text-sm text-[#F5F0E1]/60 uppercase tracking-widest mb-3",
                      children: "Total Supply",
                    }),
                    x.jsx("p", {
                      "data-loc": "client/src/pages/Home.tsx:423",
                      className:
                        "font-['Bebas_Neue'] text-6xl md:text-7xl text-[#D4AF37] gold-glow mb-3",
                      children: "1,000,000,000",
                    }),
                    x.jsx("p", {
                      "data-loc": "client/src/pages/Home.tsx:426",
                      className:
                        "font-['Special_Elite'] text-lg text-[#C41E3A]",
                      children: "1 Billion $OIL",
                    }),
                  ],
                }),
              ],
            }),
          }),
          x.jsxs("div", {
            "data-loc": "client/src/pages/Home.tsx:434",
            className: "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto",
            children: [
              x.jsxs(Ht.div, {
                "data-loc": "client/src/pages/Home.tsx:436",
                initial: { opacity: 0, x: -30 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: !0 },
                className: "relative group",
                children: [
                  x.jsx("div", {
                    "data-loc": "client/src/pages/Home.tsx:442",
                    className:
                      "absolute inset-0 bg-[#C41E3A]/10 -rotate-1 transition-transform group-hover:rotate-0",
                  }),
                  x.jsxs("div", {
                    "data-loc": "client/src/pages/Home.tsx:443",
                    className:
                      "relative bg-[#1A1A1A] border-2 border-[#C41E3A]/50 p-8 hover:border-[#C41E3A] transition-colors h-full",
                    children: [
                      x.jsxs("div", {
                        "data-loc": "client/src/pages/Home.tsx:444",
                        className: "flex items-center gap-4 mb-6",
                        children: [
                          x.jsx("div", {
                            "data-loc": "client/src/pages/Home.tsx:445",
                            className:
                              "w-16 h-16 bg-[#C41E3A]/20 rounded-full flex items-center justify-center",
                            children: x.jsx(Tl, {
                              "data-loc": "client/src/pages/Home.tsx:446",
                              className: "w-8 h-8 text-[#C41E3A]",
                            }),
                          }),
                          x.jsxs("div", {
                            "data-loc": "client/src/pages/Home.tsx:448",
                            children: [
                              x.jsx("h3", {
                                "data-loc": "client/src/pages/Home.tsx:449",
                                className:
                                  "font-['Bebas_Neue'] text-3xl text-[#D4AF37]",
                                children: "BURN TO EARN",
                              }),
                              x.jsx("p", {
                                "data-loc": "client/src/pages/Home.tsx:452",
                                className:
                                  "font-['Special_Elite'] text-sm text-[#C41E3A]",
                                children: "OIL = Burn to Use",
                              }),
                            ],
                          }),
                        ],
                      }),
                      x.jsxs("p", {
                        "data-loc": "client/src/pages/Home.tsx:457",
                        className:
                          "font-['Source_Sans_3'] text-[#F5F0E1]/80 leading-relaxed mb-4",
                        children: [
                          "Just like real oil, ",
                          x.jsx("span", {
                            "data-loc": "client/src/pages/Home.tsx:458",
                            className: "text-[#D4AF37] font-bold",
                            children: "$OIL gets burned",
                          }),
                          ". We periodically torch tokens to make supply scarcer. Less oil in circulation = more valuable barrels in your wallet.",
                        ],
                      }),
                      x.jsx("p", {
                        "data-loc": "client/src/pages/Home.tsx:462",
                        className:
                          "font-['Special_Elite'] text-sm text-[#D4AF37] italic",
                        children: '"Every burn is a liberation event."',
                      }),
                    ],
                  }),
                ],
              }),
              x.jsxs(Ht.div, {
                "data-loc": "client/src/pages/Home.tsx:469",
                initial: { opacity: 0, x: 30 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: !0 },
                className: "relative group",
                children: [
                  x.jsx("div", {
                    "data-loc": "client/src/pages/Home.tsx:475",
                    className:
                      "absolute inset-0 bg-[#D4AF37]/10 rotate-1 transition-transform group-hover:rotate-0",
                  }),
                  x.jsxs("div", {
                    "data-loc": "client/src/pages/Home.tsx:476",
                    className:
                      "relative bg-[#1A1A1A] border-2 border-[#D4AF37]/50 p-8 hover:border-[#D4AF37] transition-colors h-full",
                    children: [
                      x.jsxs("div", {
                        "data-loc": "client/src/pages/Home.tsx:477",
                        className: "flex items-center gap-4 mb-6",
                        children: [
                          x.jsx("div", {
                            "data-loc": "client/src/pages/Home.tsx:478",
                            className:
                              "w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center",
                            children: x.jsx(Br, {
                              "data-loc": "client/src/pages/Home.tsx:479",
                              className: "w-8 h-8 text-[#D4AF37]",
                            }),
                          }),
                          x.jsxs("div", {
                            "data-loc": "client/src/pages/Home.tsx:481",
                            children: [
                              x.jsx("h3", {
                                "data-loc": "client/src/pages/Home.tsx:482",
                                className:
                                  "font-['Bebas_Neue'] text-3xl text-[#D4AF37]",
                                children: "HOLD TO PROSPER",
                              }),
                              x.jsx("p", {
                                "data-loc": "client/src/pages/Home.tsx:485",
                                className:
                                  "font-['Special_Elite'] text-sm text-[#C41E3A]",
                                children: "OIL = Rich if You Own",
                              }),
                            ],
                          }),
                        ],
                      }),
                      x.jsxs("p", {
                        "data-loc": "client/src/pages/Home.tsx:490",
                        className:
                          "font-['Source_Sans_3'] text-[#F5F0E1]/80 leading-relaxed mb-4",
                        children: [
                          "Countries with ",
                          x.jsx("span", {
                            "data-loc": "client/src/pages/Home.tsx:491",
                            className: "text-[#D4AF37] font-bold",
                            children: "OIL are rich",
                          }),
                          ". People who ",
                          x.jsx("span", {
                            "data-loc": "client/src/pages/Home.tsx:492",
                            className: "text-[#D4AF37] font-bold",
                            children: "hold $OIL get rich",
                          }),
                          ". It's not complicated economics—it's destiny.",
                        ],
                      }),
                      x.jsx("p", {
                        "data-loc": "client/src/pages/Home.tsx:495",
                        className:
                          "font-['Special_Elite'] text-sm text-[#D4AF37] italic",
                        children: '"Own the oil, own the future."',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          x.jsx(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:503",
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            className: "mt-16 max-w-3xl mx-auto",
            children: x.jsxs("div", {
              "data-loc": "client/src/pages/Home.tsx:509",
              className:
                "bg-[#1A1A1A] border-2 border-[#D4AF37]/30 p-8 md:p-10 text-center relative overflow-hidden",
              children: [
                x.jsx("div", {
                  "data-loc": "client/src/pages/Home.tsx:510",
                  className:
                    "absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#D4AF37]/30",
                }),
                x.jsx("div", {
                  "data-loc": "client/src/pages/Home.tsx:511",
                  className:
                    "absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#D4AF37]/30",
                }),
                x.jsx("p", {
                  "data-loc": "client/src/pages/Home.tsx:513",
                  className:
                    "font-['Oswald'] text-sm text-[#F5F0E1]/50 uppercase tracking-widest mb-4",
                  children: "The Clever Part",
                }),
                x.jsx("h3", {
                  "data-loc": "client/src/pages/Home.tsx:516",
                  className:
                    "font-['Bebas_Neue'] text-4xl md:text-5xl text-[#D4AF37] mb-6",
                  children: "CRUDE GAINS, REFINED PROFITS",
                }),
                x.jsxs("p", {
                  "data-loc": "client/src/pages/Home.tsx:519",
                  className:
                    "font-['Source_Sans_3'] text-lg text-[#F5F0E1]/80 max-w-2xl mx-auto mb-6",
                  children: [
                    "Real oil makes nations wealthy. ",
                    x.jsx("span", {
                      "data-loc": "client/src/pages/Home.tsx:520",
                      className: "text-[#D4AF37]",
                      children: "$OIL",
                    }),
                    " makes holders wealthy. Real oil burns for energy. ",
                    x.jsx("span", {
                      "data-loc": "client/src/pages/Home.tsx:521",
                      className: "text-[#C41E3A]",
                      children: "$OIL burns",
                    }),
                    " for scarcity. The meme writes itself.",
                  ],
                }),
                x.jsxs("div", {
                  "data-loc": "client/src/pages/Home.tsx:524",
                  className: "flex flex-wrap justify-center gap-4",
                  children: [
                    x.jsx("span", {
                      "data-loc": "client/src/pages/Home.tsx:525",
                      className: "stamp text-[#C41E3A] text-xs",
                      children: "BURN = SCARCITY",
                    }),
                    x.jsx("span", {
                      "data-loc": "client/src/pages/Home.tsx:528",
                      className: "stamp text-[#D4AF37] text-xs",
                      children: "SCARCITY = VALUE",
                    }),
                    x.jsx("span", {
                      "data-loc": "client/src/pages/Home.tsx:531",
                      className: "stamp text-[#F5F0E1] text-xs",
                      children: "VALUE = FREEDOM",
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
function QN() {
  return x.jsxs("section", {
    "data-loc": "client/src/pages/Home.tsx:545",
    id: "chart",
    className: "relative py-24 overflow-hidden",
    children: [
      x.jsx("div", {
        "data-loc": "client/src/pages/Home.tsx:546",
        className: "absolute inset-0 bg-[#0A0A0A]",
      }),
      x.jsxs("div", {
        "data-loc": "client/src/pages/Home.tsx:548",
        className: "relative container mx-auto px-4",
        children: [
          x.jsxs(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:549",
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            className: "text-center mb-12",
            children: [
              x.jsx("span", {
                "data-loc": "client/src/pages/Home.tsx:555",
                className: "stamp text-[#D4AF37] text-sm mb-4 inline-block",
                children: "LIVE INTELLIGENCE",
              }),
              x.jsx("h2", {
                "data-loc": "client/src/pages/Home.tsx:558",
                className:
                  "font-['Bebas_Neue'] text-5xl md:text-7xl text-[#D4AF37] mb-4",
                children: "MARKET SURVEILLANCE",
              }),
              x.jsx("p", {
                "data-loc": "client/src/pages/Home.tsx:561",
                className:
                  "font-['Oswald'] text-xl text-[#F5F0E1]/80 max-w-2xl mx-auto",
                children: "Real-time price action and trading data",
              }),
            ],
          }),
          x.jsxs(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:566",
            initial: { opacity: 0, scale: 0.95 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: !0 },
            className: "max-w-5xl mx-auto",
            children: [
              x.jsxs("div", {
                "data-loc": "client/src/pages/Home.tsx:572",
                className:
                  "bg-[#1A1A1A] border-2 border-[#D4AF37]/30 p-2 relative",
                children: [
                  x.jsx("div", {
                    "data-loc": "client/src/pages/Home.tsx:573",
                    className:
                      "absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37]/50",
                  }),
                  x.jsx("div", {
                    "data-loc": "client/src/pages/Home.tsx:574",
                    className:
                      "absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37]/50",
                  }),
                  x.jsx("div", {
                    "data-loc": "client/src/pages/Home.tsx:576",
                    className: "aspect-[16/9] w-full",
                    children: x.jsx("iframe", {
                      "data-loc": "client/src/pages/Home.tsx:577",
                      src: "https://dexscreener.com/ethereum/0x32C9C5A32965eE8Ea2b3756AA723D668ee14b2EC?embed=1&theme=dark&trades=0&info=0",
                      className: "w-full h-full border-0",
                      title: "$OIL DexScreener Chart",
                    }),
                  }),
                ],
              }),
              x.jsx("div", {
                "data-loc": "client/src/pages/Home.tsx:585",
                className: "mt-6 flex justify-center gap-4",
                children: x.jsxs("a", {
                  "data-loc": "client/src/pages/Home.tsx:586",
                  href: "https://dexscreener.com/ethereum/0x32C9C5A32965eE8Ea2b3756AA723D668ee14b2EC",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className:
                    "inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0A0A0A] font-['Oswald'] uppercase tracking-wider hover:bg-[#F5F0E1] transition-colors",
                  children: [
                    x.jsx(Br, {
                      "data-loc": "client/src/pages/Home.tsx:592",
                      className: "w-5 h-5",
                    }),
                    "View on DexScreener",
                    x.jsx(yd, {
                      "data-loc": "client/src/pages/Home.tsx:594",
                      className: "w-4 h-4",
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function JN() {
  const n = [
      {
        date: "March 2026",
        amount: "23,100,000",
        percentage: "2.3%",
        value: "$4,544.38",
        txHash:
          "22R2SgrdtAtAVqVAt8cs4RiYegkuT6yfZHosWqVfwBaZTgFFzF9RFZqrWUYQtLq1Q4LscqyK7AFNqDkAvwkhS2f5",
        status: "verified",
      },
    ],
    o = ((231e5 / 1e9) * 100).toFixed(1);
  return x.jsxs("section", {
    "data-loc": "client/src/pages/Home.tsx:621",
    id: "burns",
    className: "relative py-24 overflow-hidden",
    children: [
      x.jsx("div", {
        "data-loc": "client/src/pages/Home.tsx:623",
        className:
          "absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1A0A0A] to-[#0A0A0A]",
      }),
      x.jsx("div", {
        "data-loc": "client/src/pages/Home.tsx:624",
        className: "absolute inset-0 opacity-10",
        children: x.jsx("div", {
          "data-loc": "client/src/pages/Home.tsx:625",
          className:
            "absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#C41E3A]/30 to-transparent",
        }),
      }),
      x.jsxs("div", {
        "data-loc": "client/src/pages/Home.tsx:628",
        className: "relative container mx-auto px-4",
        children: [
          x.jsxs(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:629",
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            className: "text-center mb-16",
            children: [
              x.jsx("span", {
                "data-loc": "client/src/pages/Home.tsx:635",
                className: "stamp text-[#C41E3A] text-sm mb-4 inline-block",
                children: "DEFLATIONARY OPERATIONS",
              }),
              x.jsx("h2", {
                "data-loc": "client/src/pages/Home.tsx:638",
                className:
                  "font-['Bebas_Neue'] text-5xl md:text-7xl text-[#D4AF37] mb-4",
                children: "TRACKER LOCKED",
              }),
              x.jsx("p", {
                "data-loc": "client/src/pages/Home.tsx:641",
                className:
                  "font-['Oswald'] text-xl text-[#F5F0E1]/80 max-w-2xl mx-auto",
                children:
                  "Every burn is verified on-chain. Less supply = more value.",
              }),
            ],
          }),
          x.jsx(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:647",
            initial: { opacity: 0, scale: 0.9 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: !0 },
            className: "max-w-4xl mx-auto mb-16",
            children: x.jsxs("div", {
              "data-loc": "client/src/pages/Home.tsx:653",
              className:
                "bg-[#1A1A1A] border-2 border-[#C41E3A]/50 p-8 md:p-12 relative overflow-hidden",
              children: [
                x.jsx("div", {
                  "data-loc": "client/src/pages/Home.tsx:655",
                  className:
                    "absolute inset-0 bg-gradient-to-t from-[#C41E3A]/10 to-transparent",
                }),
                x.jsx("div", {
                  "data-loc": "client/src/pages/Home.tsx:656",
                  className:
                    "absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#C41E3A]/20 blur-3xl rounded-full",
                }),
                x.jsxs("div", {
                  "data-loc": "client/src/pages/Home.tsx:658",
                  className: "relative",
                  children: [
                    x.jsxs("div", {
                      "data-loc": "client/src/pages/Home.tsx:659",
                      className: "flex items-center justify-center gap-4 mb-6",
                      children: [
                        x.jsx(Tl, {
                          "data-loc": "client/src/pages/Home.tsx:660",
                          className: "w-12 h-12 text-[#C41E3A] animate-pulse",
                        }),
                        x.jsx("h3", {
                          "data-loc": "client/src/pages/Home.tsx:661",
                          className:
                            "font-['Bebas_Neue'] text-4xl md:text-6xl text-[#F5F0E1]",
                          children: "TOTAL BURNED",
                        }),
                        x.jsx(Tl, {
                          "data-loc": "client/src/pages/Home.tsx:664",
                          className: "w-12 h-12 text-[#C41E3A] animate-pulse",
                        }),
                      ],
                    }),
                    x.jsxs("div", {
                      "data-loc": "client/src/pages/Home.tsx:667",
                      className: "text-center",
                      children: [
                        x.jsx("p", {
                          "data-loc": "client/src/pages/Home.tsx:668",
                          className:
                            "font-['Bebas_Neue'] text-6xl md:text-8xl text-[#D4AF37] mb-2",
                          children: "No Tax for $OIL",
                        }),
                        x.jsx("p", {
                          "data-loc": "client/src/pages/Home.tsx:671",
                          className:
                            "font-['Oswald'] text-2xl text-[#C41E3A] uppercase tracking-wider",
                          children: "$OIL Tokens Destroyed",
                        }),
                      ],
                    }),
                    x.jsxs("div", {
                      "data-loc": "client/src/pages/Home.tsx:676",
                      className:
                        "mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto",
                      children: [
                        x.jsxs("div", {
                          "data-loc": "client/src/pages/Home.tsx:677",
                          className:
                            "text-center p-4 bg-[#0A0A0A]/50 border border-[#D4AF37]/20",
                          children: [
                            x.jsxs("p", {
                              "data-loc": "client/src/pages/Home.tsx:678",
                              className:
                                "font-['Bebas_Neue'] text-3xl text-[#C41E3A]",
                              children: [o, "%"],
                            }),
                            x.jsx("p", {
                              "data-loc": "client/src/pages/Home.tsx:679",
                              className:
                                "font-['Oswald'] text-sm text-[#F5F0E1]/60 uppercase",
                              children: "Supply Burned",
                            }),
                          ],
                        }),
                        x.jsxs("div", {
                          "data-loc": "client/src/pages/Home.tsx:681",
                          className:
                            "text-center p-4 bg-[#0A0A0A]/50 border border-[#D4AF37]/20",
                          children: [
                            x.jsx("p", {
                              "data-loc": "client/src/pages/Home.tsx:682",
                              className:
                                "font-['Bebas_Neue'] text-3xl text-[#D4AF37]",
                              children: "$4,544",
                            }),
                            x.jsx("p", {
                              "data-loc": "client/src/pages/Home.tsx:683",
                              className:
                                "font-['Oswald'] text-sm text-[#F5F0E1]/60 uppercase",
                              children: "Value Burned",
                            }),
                          ],
                        }),
                        x.jsxs("div", {
                          "data-loc": "client/src/pages/Home.tsx:685",
                          className:
                            "text-center p-4 bg-[#0A0A0A]/50 border border-[#D4AF37]/20",
                          children: [
                            x.jsx("p", {
                              "data-loc": "client/src/pages/Home.tsx:686",
                              className:
                                "font-['Bebas_Neue'] text-3xl text-[#F5F0E1]",
                              children: "1",
                            }),
                            x.jsx("p", {
                              "data-loc": "client/src/pages/Home.tsx:687",
                              className:
                                "font-['Oswald'] text-sm text-[#F5F0E1]/60 uppercase",
                              children: "Burn Events",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          x.jsxs(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:695",
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            className: "max-w-4xl mx-auto",
            children: [
              x.jsx("h3", {
                "data-loc": "client/src/pages/Home.tsx:701",
                className:
                  "font-['Bebas_Neue'] text-3xl text-[#D4AF37] mb-6 text-center",
                children: "BURN HISTORY",
              }),
              x.jsx("div", {
                "data-loc": "client/src/pages/Home.tsx:705",
                className: "space-y-4",
                children: n.map((c, f) =>
                  x.jsx(
                    "div",
                    {
                      "data-loc": "client/src/pages/Home.tsx:707",
                      className:
                        "bg-[#1A1A1A] border border-[#D4AF37]/30 p-6 hover:border-[#C41E3A] transition-colors",
                      children: x.jsxs("div", {
                        "data-loc": "client/src/pages/Home.tsx:711",
                        className:
                          "flex flex-wrap items-center justify-between gap-4",
                        children: [
                          x.jsxs("div", {
                            "data-loc": "client/src/pages/Home.tsx:712",
                            className: "flex items-center gap-4",
                            children: [
                              x.jsx("div", {
                                "data-loc": "client/src/pages/Home.tsx:713",
                                className:
                                  "w-12 h-12 bg-[#C41E3A]/20 border border-[#C41E3A]/50 flex items-center justify-center",
                                children: x.jsx(Tl, {
                                  "data-loc": "client/src/pages/Home.tsx:714",
                                  className: "w-6 h-6 text-[#C41E3A]",
                                }),
                              }),
                              x.jsxs("div", {
                                "data-loc": "client/src/pages/Home.tsx:716",
                                children: [
                                  x.jsx("p", {
                                    "data-loc": "client/src/pages/Home.tsx:717",
                                    className:
                                      "font-['Oswald'] text-lg text-[#F5F0E1] uppercase",
                                    children: c.date,
                                  }),
                                  x.jsxs("p", {
                                    "data-loc": "client/src/pages/Home.tsx:718",
                                    className:
                                      "font-['Source_Sans_3'] text-sm text-[#F5F0E1]/60",
                                    children: ["Burn Event #", f + 1],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          x.jsxs("div", {
                            "data-loc": "client/src/pages/Home.tsx:722",
                            className: "flex flex-wrap items-center gap-6",
                            children: [
                              x.jsxs("div", {
                                "data-loc": "client/src/pages/Home.tsx:723",
                                className: "text-right",
                                children: [
                                  x.jsx("p", {
                                    "data-loc": "client/src/pages/Home.tsx:724",
                                    className:
                                      "font-['Bebas_Neue'] text-2xl text-[#D4AF37]",
                                    children: c.amount,
                                  }),
                                  x.jsx("p", {
                                    "data-loc": "client/src/pages/Home.tsx:725",
                                    className:
                                      "font-['Oswald'] text-sm text-[#F5F0E1]/60",
                                    children: "Burned Oil",
                                  }),
                                ],
                              }),
                              x.jsxs("div", {
                                "data-loc": "client/src/pages/Home.tsx:727",
                                className: "text-right",
                                children: [
                                  x.jsx("p", {
                                    "data-loc": "client/src/pages/Home.tsx:728",
                                    className:
                                      "font-['Bebas_Neue'] text-2xl text-[#C41E3A]",
                                    children: c.percentage,
                                  }),
                                  x.jsx("p", {
                                    "data-loc": "client/src/pages/Home.tsx:729",
                                    className:
                                      "font-['Oswald'] text-sm text-[#F5F0E1]/60",
                                    children: "Of Supply",
                                  }),
                                ],
                              }),
                              x.jsxs("div", {
                                "data-loc": "client/src/pages/Home.tsx:731",
                                className: "text-right",
                                children: [
                                  x.jsx("p", {
                                    "data-loc": "client/src/pages/Home.tsx:732",
                                    className:
                                      "font-['Bebas_Neue'] text-2xl text-[#F5F0E1]",
                                    children: c.value,
                                  }),
                                  x.jsx("p", {
                                    "data-loc": "client/src/pages/Home.tsx:733",
                                    className:
                                      "font-['Oswald'] text-sm text-[#F5F0E1]/60",
                                    children: "USD Value",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          x.jsxs("a", {
                            "data-loc": "client/src/pages/Home.tsx:737",
                            href: `https://etherscan.io/token/0x32C9C5A32965eE8Ea2b3756AA723D668ee14b2EC`,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className:
                              "inline-flex items-center gap-2 px-4 py-2 bg-[#C41E3A]/20 border border-[#C41E3A]/50 text-[#C41E3A] font-['Oswald'] text-sm uppercase hover:bg-[#C41E3A]/30 transition-colors",
                            children: [
                              x.jsx(kv, {
                                "data-loc": "client/src/pages/Home.tsx:743",
                                className: "w-4 h-4",
                              }),
                              "Verified",
                              x.jsx(yd, {
                                "data-loc": "client/src/pages/Home.tsx:745",
                                className: "w-4 h-4",
                              }),
                            ],
                          }),
                        ],
                      }),
                    },
                    f
                  )
                ),
              }),
              x.jsx("div", {
                "data-loc": "client/src/pages/Home.tsx:752",
                className: "mt-8 text-center",
                children: x.jsx("p", {
                  "data-loc": "client/src/pages/Home.tsx:753",
                  className:
                    "font-['Special_Elite'] text-sm text-[#F5F0E1]/50 italic",
                  children:
                    '"Real oil burns for energy. $OIL burns for YOUR gains."',
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function $N() {
  const n = [
    {
      icon: Br,
      title: "Market Makers",
      description:
        "Professional market making ensures healthy trading volume and tight spreads for optimal price discovery.",
    },
    {
      icon: _E,
      title: "Exchange Liquidity",
      description:
        "Deep liquidity pools across DEXs and CEXs enable large trades without significant price impact.",
    },
    {
      icon: Xv,
      title: "Cross-Chain Expansion",
      description:
        "Future multi-chain deployment to reach holders across all major blockchain ecosystems.",
    },
    {
      icon: jE,
      title: "Airdrops & Staking",
      description:
        "Periodic airdrops and staking rewards to loyal holders who believe in the long-term vision.",
    },
  ];
  return x.jsxs("section", {
    "data-loc": "client/src/pages/Home.tsx:789",
    id: "supply-control",
    className: "relative py-24 overflow-hidden",
    children: [
      x.jsx("div", {
        "data-loc": "client/src/pages/Home.tsx:791",
        className:
          "absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]",
      }),
      x.jsxs("div", {
        "data-loc": "client/src/pages/Home.tsx:793",
        className: "relative container mx-auto px-4",
        children: [
          x.jsxs(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:794",
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            className: "text-center mb-12",
            children: [
              x.jsx("span", {
                "data-loc": "client/src/pages/Home.tsx:800",
                className: "stamp text-[#D4AF37] text-sm mb-4 inline-block",
                children: "STRATEGIC RESERVES",
              }),
              x.jsx("h2", {
                "data-loc": "client/src/pages/Home.tsx:803",
                className:
                  "font-['Bebas_Neue'] text-5xl md:text-7xl text-[#D4AF37] mb-4",
                children: "SUPPLY CONTROL",
              }),
              x.jsx("p", {
                "data-loc": "client/src/pages/Home.tsx:806",
                className:
                  "font-['Oswald'] text-xl text-[#F5F0E1]/80 max-w-3xl mx-auto",
                children:
                  "Why team-controlled supply is essential for long-term success",
              }),
            ],
          }),
          x.jsx(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:812",
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            className: "max-w-4xl mx-auto mb-16",
            children: x.jsxs("div", {
              "data-loc": "client/src/pages/Home.tsx:818",
              className: "relative",
              children: [
                x.jsx("div", {
                  "data-loc": "client/src/pages/Home.tsx:819",
                  className: "absolute inset-0 bg-[#C41E3A]/10 rotate-1",
                }),
                x.jsxs("div", {
                  "data-loc": "client/src/pages/Home.tsx:820",
                  className:
                    "relative bg-[#1A1A1A] border-2 border-[#D4AF37]/50 p-8 md:p-10",
                  children: [
                    x.jsxs("div", {
                      "data-loc": "client/src/pages/Home.tsx:821",
                      className: "flex items-start gap-4 mb-6",
                      children: [
                        x.jsx("div", {
                          "data-loc": "client/src/pages/Home.tsx:822",
                          className:
                            "w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center flex-shrink-0",
                          children: x.jsx(qv, {
                            "data-loc": "client/src/pages/Home.tsx:823",
                            className: "w-6 h-6 text-[#D4AF37]",
                          }),
                        }),
                        x.jsxs("div", {
                          "data-loc": "client/src/pages/Home.tsx:825",
                          children: [
                            x.jsx("h3", {
                              "data-loc": "client/src/pages/Home.tsx:826",
                              className:
                                "font-['Bebas_Neue'] text-3xl text-[#D4AF37] mb-2",
                              children: "THE STRATEGIC IMPERATIVE",
                            }),
                            x.jsx("p", {
                              "data-loc": "client/src/pages/Home.tsx:829",
                              className:
                                "font-['Special_Elite'] text-sm text-[#C41E3A]",
                              children:
                                "Building for sustained long-term growth",
                            }),
                          ],
                        }),
                      ],
                    }),
                    x.jsxs("div", {
                      "data-loc": "client/src/pages/Home.tsx:835",
                      className:
                        "space-y-4 font-['Source_Sans_3'] text-[#F5F0E1]/90 leading-relaxed",
                      children: [
                        x.jsxs("p", {
                          "data-loc": "client/src/pages/Home.tsx:836",
                          children: [
                            "The team has retained ",
                            x.jsx("span", {
                              "data-loc": "client/src/pages/Home.tsx:837",
                              className: "text-[#D4AF37] font-bold",
                              children: "significant supply control",
                            }),
                            " because without it, sustained long-term growth would be impossible. This is not about hoarding—it is about",
                            x.jsx("span", {
                              "data-loc": "client/src/pages/Home.tsx:839",
                              className: "text-[#D4AF37] font-bold",
                              children: " strategic deployment",
                            }),
                            " for the benefit of all holders.",
                          ],
                        }),
                        x.jsxs("p", {
                          "data-loc": "client/src/pages/Home.tsx:841",
                          children: [
                            "Team-controlled supply will be used for ",
                            x.jsx("span", {
                              "data-loc": "client/src/pages/Home.tsx:842",
                              className: "text-[#D4AF37]",
                              children: "market makers",
                            }),
                            " to ensure healthy trading, ",
                            x.jsx("span", {
                              "data-loc": "client/src/pages/Home.tsx:843",
                              className: "text-[#D4AF37]",
                              children: "liquidity for exchanges",
                            }),
                            " (both DEX and CEX), and eventually ",
                            x.jsx("span", {
                              "data-loc": "client/src/pages/Home.tsx:844",
                              className: "text-[#D4AF37]",
                              children: "cross-chain expansion",
                            }),
                            " to reach holders everywhere.",
                          ],
                        }),
                        x.jsxs("p", {
                          "data-loc": "client/src/pages/Home.tsx:846",
                          children: [
                            "Most importantly, this reserve enables ",
                            x.jsx("span", {
                              "data-loc": "client/src/pages/Home.tsx:847",
                              className: "text-[#D4AF37]",
                              children: "airdrops",
                            }),
                            " and",
                            x.jsx("span", {
                              "data-loc": "client/src/pages/Home.tsx:848",
                              className: "text-[#D4AF37]",
                              children: " staking rewards",
                            }),
                            " for loyal holders. It is imperative the team maintains high supply control to give $OIL the best chance of long-term growth and maximum benefits to holders.",
                          ],
                        }),
                      ],
                    }),
                    x.jsx("div", {
                      "data-loc": "client/src/pages/Home.tsx:854",
                      className: "mt-6 pt-6 border-t border-[#D4AF37]/20",
                      children: x.jsx("p", {
                        "data-loc": "client/src/pages/Home.tsx:855",
                        className:
                          "font-['Special_Elite'] text-sm text-[#D4AF37] italic text-center",
                        children:
                          '"Control the supply, control the destiny. We are playing the long game."',
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
          x.jsx("div", {
            "data-loc": "client/src/pages/Home.tsx:864",
            className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
            children: n.map((i, l) =>
              x.jsxs(
                Ht.div,
                {
                  "data-loc": "client/src/pages/Home.tsx:866",
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: !0 },
                  transition: { delay: l * 0.1 },
                  className: "relative group",
                  children: [
                    x.jsx("div", {
                      "data-loc": "client/src/pages/Home.tsx:874",
                      className:
                        "absolute inset-0 bg-[#D4AF37]/5 -rotate-1 transition-transform group-hover:rotate-0",
                    }),
                    x.jsxs("div", {
                      "data-loc": "client/src/pages/Home.tsx:875",
                      className:
                        "relative bg-[#1A1A1A] border border-[#D4AF37]/30 p-6 h-full hover:border-[#D4AF37]/60 transition-colors",
                      children: [
                        x.jsx("div", {
                          "data-loc": "client/src/pages/Home.tsx:876",
                          className:
                            "w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4",
                          children: x.jsx(i.icon, {
                            "data-loc": "client/src/pages/Home.tsx:877",
                            className: "w-6 h-6 text-[#D4AF37]",
                          }),
                        }),
                        x.jsx("h4", {
                          "data-loc": "client/src/pages/Home.tsx:879",
                          className:
                            "font-['Bebas_Neue'] text-xl text-[#D4AF37] mb-2",
                          children: i.title,
                        }),
                        x.jsx("p", {
                          "data-loc": "client/src/pages/Home.tsx:882",
                          className:
                            "font-['Source_Sans_3'] text-sm text-[#F5F0E1]/70",
                          children: i.description,
                        }),
                      ],
                    }),
                  ],
                },
                i.title
              )
            ),
          }),
        ],
      }),
    ],
  });
}
function IN() {
  const n = [
    {
      phase: "PHASE 1",
      title: "THE DRILLING PHASE",
      status: "ACTIVE",
      items: [
        "Launch $OIL token",
        "Build core community",
        "Initial meme campaign",
        "Website & socials live",
      ],
    },
    {
      phase: "PHASE 2",
      title: "EXTRACTION",
      status: "UPCOMING",
      items: [
        "Market maker partnerships",
        "DEX liquidity expansion",
        "CEX listings campaign",
        "Influencer partnerships",
      ],
    },
    {
      phase: "PHASE 3",
      title: "REFINEMENT",
      status: "PLANNED",
      items: [
        "Staking rewards launch",
        "First community airdrop",
        "Major exchange listings",
        "Strategic partnerships",
      ],
    },
    {
      phase: "PHASE 4",
      title: "LIBERATION",
      status: "CLASSIFIED",
      items: [
        "Cross-chain deployment",
        "Multi-chain liquidity",
        "Global expansion",
      ],
    },
  ];
  return x.jsxs("section", {
    "data-loc": "client/src/pages/Home.tsx:943",
    id: "roadmap",
    className: "relative py-24 overflow-hidden",
    children: [
      x.jsxs("div", {
        "data-loc": "client/src/pages/Home.tsx:945",
        className: "absolute inset-0",
        children: [
          x.jsx("img", {
            "data-loc": "client/src/pages/Home.tsx:946",
            src: "/images/roadmap-bg.png",
            alt: "",
            className: "w-full h-full object-cover opacity-30",
          }),
          x.jsx("div", {
            "data-loc": "client/src/pages/Home.tsx:951",
            className:
              "absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]",
          }),
        ],
      }),
      x.jsxs("div", {
        "data-loc": "client/src/pages/Home.tsx:954",
        className: "relative container mx-auto px-4",
        children: [
          x.jsxs(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:955",
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            className: "text-center mb-16",
            children: [
              x.jsx("span", {
                "data-loc": "client/src/pages/Home.tsx:961",
                className: "stamp text-[#D4AF37] text-sm mb-4 inline-block",
                children: "STRATEGIC OPERATIONS",
              }),
              x.jsx("h2", {
                "data-loc": "client/src/pages/Home.tsx:964",
                className:
                  "font-['Bebas_Neue'] text-5xl md:text-7xl text-[#D4AF37] mb-4",
                children: "ROADMAP",
              }),
              x.jsx("p", {
                "data-loc": "client/src/pages/Home.tsx:967",
                className:
                  "font-['Oswald'] text-xl text-[#F5F0E1]/80 max-w-2xl mx-auto",
                children: "Our tactical plan for global portfolio liberation",
              }),
            ],
          }),
          x.jsx("div", {
            "data-loc": "client/src/pages/Home.tsx:972",
            className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
            children: n.map((i, l) =>
              x.jsx(
                Ht.div,
                {
                  "data-loc": "client/src/pages/Home.tsx:974",
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: !0 },
                  transition: { delay: l * 0.15 },
                  className: "relative",
                  children: x.jsxs("div", {
                    "data-loc": "client/src/pages/Home.tsx:982",
                    className: `
                bg-[#1A1A1A] border-2 p-6 h-full
                ${
                  i.status === "ACTIVE"
                    ? "border-[#C41E3A]"
                    : "border-[#D4AF37]/30"
                }
              `,
                    children: [
                      x.jsx("div", {
                        "data-loc": "client/src/pages/Home.tsx:987",
                        className: `
                  inline-block px-3 py-1 text-xs font-['Oswald'] uppercase tracking-widest mb-4
                  ${
                    i.status === "ACTIVE"
                      ? "bg-[#C41E3A] text-white"
                      : i.status === "CLASSIFIED"
                      ? "bg-[#4A5568] text-white"
                      : "bg-[#D4AF37]/20 text-[#D4AF37]"
                  }
                `,
                        children: i.status,
                      }),
                      x.jsx("p", {
                        "data-loc": "client/src/pages/Home.tsx:996",
                        className:
                          "font-['Special_Elite'] text-sm text-[#D4AF37]/60 mb-2",
                        children: i.phase,
                      }),
                      x.jsx("h3", {
                        "data-loc": "client/src/pages/Home.tsx:999",
                        className:
                          "font-['Bebas_Neue'] text-2xl text-[#D4AF37] mb-4",
                        children: i.title,
                      }),
                      x.jsx("ul", {
                        "data-loc": "client/src/pages/Home.tsx:1003",
                        className: "space-y-2",
                        children: i.items.map((o, c) =>
                          x.jsxs(
                            "li",
                            {
                              "data-loc": "client/src/pages/Home.tsx:1005",
                              className: `
                        font-['Source_Sans_3'] text-sm flex items-start gap-2
                        ${
                          i.status === "CLASSIFIED"
                            ? "text-[#4A5568]"
                            : "text-[#F5F0E1]/80"
                        }
                      `,
                              children: [
                                x.jsx("span", {
                                  "data-loc": "client/src/pages/Home.tsx:1012",
                                  className: "text-[#D4AF37] mt-1",
                                  children: "▸",
                                }),
                                o,
                              ],
                            },
                            c
                          )
                        ),
                      }),
                    ],
                  }),
                },
                i.phase
              )
            ),
          }),
        ],
      }),
    ],
  });
}
function WN() {
  const n = [
    {
      title: "Pizza Liberation",
      description: "Heard you needed some freedom with that pepperoni.",
      concept: "Petey on a greasy pizza slice",
    },
    {
      title: "Olive Oil Takeover",
      description: "This is OUR olive oil now. $OIL",
      concept: "Soldiers surrounding olive oil",
    },
    {
      title: "Frying Pan Freedom",
      description: "Smells like... victory.",
      concept: "Petey in a sizzling frying pan",
    },
    {
      title: "Gas Station Siege",
      description: "Liberating fuel for the people.",
      concept: "Securing the gas pump",
    },
  ];
  return x.jsx("section", {
    "data-loc": "client/src/pages/Home.tsx:1051",
    id: "memes",
    className: "relative py-24 bg-[#1A1A1A]",
    children: x.jsxs("div", {
      "data-loc": "client/src/pages/Home.tsx:1052",
      className: "container mx-auto px-4",
      children: [
        x.jsxs(Ht.div, {
          "data-loc": "client/src/pages/Home.tsx:1053",
          initial: { opacity: 0, y: 50 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          className: "text-center mb-16",
          children: [
            x.jsx("span", {
              "data-loc": "client/src/pages/Home.tsx:1059",
              className: "stamp text-[#C41E3A] text-sm mb-4 inline-block",
              children: "PROPAGANDA DIVISION",
            }),
            x.jsx("h2", {
              "data-loc": "client/src/pages/Home.tsx:1062",
              className:
                "font-['Bebas_Neue'] text-5xl md:text-7xl text-[#D4AF37] mb-4",
              children: "MEME ARSENAL",
            }),
            x.jsx("p", {
              "data-loc": "client/src/pages/Home.tsx:1065",
              className:
                "font-['Oswald'] text-xl text-[#F5F0E1]/80 max-w-2xl mx-auto",
              children: "Weapons of mass memetic destruction",
            }),
          ],
        }),
        x.jsx("div", {
          "data-loc": "client/src/pages/Home.tsx:1070",
          className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
          children: n.map((i, l) =>
            x.jsx(
              Ht.div,
              {
                "data-loc": "client/src/pages/Home.tsx:1072",
                initial: { opacity: 0, scale: 0.9 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: !0 },
                transition: { delay: l * 0.1 },
                className: "group",
                children: x.jsxs("div", {
                  "data-loc": "client/src/pages/Home.tsx:1080",
                  className:
                    "bg-[#0A0A0A] border-2 border-[#D4AF37]/20 overflow-hidden hover:border-[#D4AF37] transition-all",
                  children: [
                    x.jsxs("div", {
                      "data-loc": "client/src/pages/Home.tsx:1082",
                      className:
                        "aspect-square bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center p-8 relative overflow-hidden",
                      children: [
                        x.jsx("div", {
                          "data-loc": "client/src/pages/Home.tsx:1083",
                          className:
                            "absolute inset-0 bg-[#D4AF37]/5 group-hover:bg-[#D4AF37]/10 transition-colors",
                        }),
                        x.jsx("img", {
                          "data-loc": "client/src/pages/Home.tsx:1084",
                          src: "/images/petey-hero.png",
                          alt: i.title,
                          className:
                            "w-32 h-32 object-contain opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg",
                        }),
                      ],
                    }),
                    x.jsxs("div", {
                      "data-loc": "client/src/pages/Home.tsx:1090",
                      className: "p-4",
                      children: [
                        x.jsx("h3", {
                          "data-loc": "client/src/pages/Home.tsx:1091",
                          className:
                            "font-['Oswald'] text-lg text-[#D4AF37] uppercase mb-2",
                          children: i.title,
                        }),
                        x.jsxs("p", {
                          "data-loc": "client/src/pages/Home.tsx:1094",
                          className:
                            "font-['Special_Elite'] text-sm text-[#F5F0E1]/60 italic",
                          children: ['"', i.description, '"'],
                        }),
                      ],
                    }),
                  ],
                }),
              },
              i.title
            )
          ),
        }),
        x.jsxs(Ht.div, {
          "data-loc": "client/src/pages/Home.tsx:1103",
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: !0 },
          className: "mt-12 text-center",
          children: [
            x.jsx("p", {
              "data-loc": "client/src/pages/Home.tsx:1109",
              className: "font-['Oswald'] text-lg text-[#F5F0E1]/60 mb-6",
              children:
                "Join the meme army and earn rewards for your creations",
            }),
            x.jsx("button", {
              "data-loc": "client/src/pages/Home.tsx:1112",
              onClick: () => q0.info("Meme contest coming soon!"),
              className: "btn-propaganda-outline",
              children: "Submit Your Meme",
            }),
          ],
        }),
      ],
    }),
  });
}
function tD() {
  const n = [
    {
      name: "Twitter / X",
      icon: Gv,
      description: "Follow for updates & memes",
      link: "https://x.com/OilCoinOnETH",
    },
    {
      name: "Telegram",
      icon: Fv,
      description: "Join the community chat",
      link: "https://t.me/OilCoin_Group",
    },
    {
      name: "Chart",
      icon: Br,
      description: "Track the gains",
      link: "https://www.dextools.io/app/ether/pair-explorer/0x32C9C5A32965eE8Ea2b3756AA723D668ee14b2EC",
    },
  ];
  return x.jsxs("section", {
    "data-loc": "client/src/pages/Home.tsx:1147",
    id: "community",
    className: "relative py-24 overflow-hidden",
    children: [
      x.jsx("div", {
        "data-loc": "client/src/pages/Home.tsx:1149",
        className: "absolute inset-0 bg-[#0A0A0A]",
        children: x.jsx("div", {
          "data-loc": "client/src/pages/Home.tsx:1150",
          className: "absolute inset-0 opacity-5",
          children: [...Array(20)].map((i, l) =>
            x.jsx(
              "div",
              {
                "data-loc": "client/src/pages/Home.tsx:1152",
                className: "absolute w-32 h-32 border border-[#D4AF37]",
                style: {
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 45}deg)`,
                },
              },
              l
            )
          ),
        }),
      }),
      x.jsxs("div", {
        "data-loc": "client/src/pages/Home.tsx:1165",
        className: "relative container mx-auto px-4",
        children: [
          x.jsxs(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:1166",
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            className: "text-center mb-16",
            children: [
              x.jsx("span", {
                "data-loc": "client/src/pages/Home.tsx:1172",
                className: "stamp text-[#D4AF37] text-sm mb-4 inline-block",
                children: "RECRUITMENT CENTER",
              }),
              x.jsx("h2", {
                "data-loc": "client/src/pages/Home.tsx:1175",
                className:
                  "font-['Bebas_Neue'] text-5xl md:text-7xl text-[#D4AF37] mb-4",
                children: "JOIN THE MOVEMENT",
              }),
              x.jsx("p", {
                "data-loc": "client/src/pages/Home.tsx:1178",
                className:
                  "font-['Oswald'] text-xl text-[#F5F0E1]/80 max-w-2xl mx-auto",
                children:
                  "Enlist in the $OIL army and help liberate portfolios worldwide",
              }),
            ],
          }),
          x.jsx("div", {
            "data-loc": "client/src/pages/Home.tsx:1183",
            className: "grid md:grid-cols-3 gap-8 max-w-4xl mx-auto",
            children: n.map((i, l) =>
              x.jsx(
                Ht.a,
                {
                  "data-loc": "client/src/pages/Home.tsx:1185",
                  href: i.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: !0 },
                  transition: { delay: l * 0.1 },
                  className: "group",
                  children: x.jsxs("div", {
                    "data-loc": "client/src/pages/Home.tsx:1196",
                    className:
                      "bg-[#1A1A1A] border-2 border-[#D4AF37]/30 p-8 text-center hover:border-[#D4AF37] hover:bg-[#1A1A1A]/80 transition-all",
                    children: [
                      x.jsx(i.icon, {
                        "data-loc": "client/src/pages/Home.tsx:1197",
                        className:
                          "w-12 h-12 text-[#D4AF37] mx-auto mb-4 group-hover:scale-110 transition-transform",
                      }),
                      x.jsx("h3", {
                        "data-loc": "client/src/pages/Home.tsx:1198",
                        className:
                          "font-['Oswald'] text-xl text-[#D4AF37] uppercase mb-2",
                        children: i.name,
                      }),
                      x.jsx("p", {
                        "data-loc": "client/src/pages/Home.tsx:1201",
                        className: "font-['Source_Sans_3'] text-[#F5F0E1]/60",
                        children: i.description,
                      }),
                      x.jsx(yd, {
                        "data-loc": "client/src/pages/Home.tsx:1204",
                        className:
                          "w-5 h-5 text-[#D4AF37]/50 mx-auto mt-4 group-hover:text-[#D4AF37] transition-colors",
                      }),
                    ],
                  }),
                },
                i.name
              )
            ),
          }),
          x.jsx(Ht.div, {
            "data-loc": "client/src/pages/Home.tsx:1211",
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !0 },
            className: "mt-16 text-center",
            children: x.jsxs("div", {
              "data-loc": "client/src/pages/Home.tsx:1217",
              className:
                "inline-block bg-[#1A1A1A] border-4 border-[#C41E3A] p-8 md:p-12 relative",
              children: [
                x.jsx("div", {
                  "data-loc": "client/src/pages/Home.tsx:1218",
                  className:
                    "absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]",
                }),
                x.jsx("div", {
                  "data-loc": "client/src/pages/Home.tsx:1219",
                  className:
                    "absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]",
                }),
                x.jsx("div", {
                  "data-loc": "client/src/pages/Home.tsx:1220",
                  className:
                    "absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]",
                }),
                x.jsx("div", {
                  "data-loc": "client/src/pages/Home.tsx:1221",
                  className:
                    "absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]",
                }),
                x.jsx("h3", {
                  "data-loc": "client/src/pages/Home.tsx:1223",
                  className:
                    "font-['Bebas_Neue'] text-4xl md:text-5xl text-[#D4AF37] mb-4",
                  children: "READY TO GET OILED?",
                }),
                x.jsx("p", {
                  "data-loc": "client/src/pages/Home.tsx:1226",
                  className:
                    "font-['Special_Elite'] text-lg text-[#F5F0E1]/80 mb-8",
                  children: '"The early driller gets the gains"',
                }),
                x.jsxs("a", {
                  "data-loc": "client/src/pages/Home.tsx:1229",
                  href: "https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=0x32C9C5A32965eE8Ea2b3756AA723D668ee14b2EC",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "btn-propaganda pulse-red text-lg px-12 py-4",
                  children: [
                    x.jsx(Yv, {
                      "data-loc": "client/src/pages/Home.tsx:1235",
                      className: "inline-block w-6 h-6 mr-2",
                    }),
                    "BUY $OIL NOW",
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
function eD() {
  return x.jsx("footer", {
    "data-loc": "client/src/pages/Home.tsx:1247",
    className: "bg-[#0A0A0A] border-t border-[#D4AF37]/20 py-12",
    children: x.jsxs("div", {
      "data-loc": "client/src/pages/Home.tsx:1248",
      className: "container mx-auto px-4",
      children: [
        x.jsxs("div", {
          "data-loc": "client/src/pages/Home.tsx:1249",
          className:
            "flex flex-col md:flex-row items-center justify-between gap-8",
          children: [
            x.jsxs("div", {
              "data-loc": "client/src/pages/Home.tsx:1251",
              className: "flex items-center gap-3",
              children: [
                x.jsx("img", {
                  "data-loc": "client/src/pages/Home.tsx:1252",
                  src: "/images/oil-derrick-badge.png",
                  alt: "$OIL",
                  className: "w-10 h-10",
                }),
                x.jsx("span", {
                  "data-loc": "client/src/pages/Home.tsx:1257",
                  className: "font-['Bebas_Neue'] text-2xl text-[#D4AF37]",
                  children: "$OIL",
                }),
              ],
            }),
            x.jsx("div", {
              "data-loc": "client/src/pages/Home.tsx:1261",
              className: "text-center md:text-left max-w-md",
              children: x.jsx("p", {
                "data-loc": "client/src/pages/Home.tsx:1262",
                className: "font-['Special_Elite'] text-xs text-[#F5F0E1]/40",
                children:
                  "$OIL is a meme coin with no intrinsic value or expectation of financial return. This is purely satirical entertainment. DYOR. NFA.",
              }),
            }),
            x.jsxs("div", {
              "data-loc": "client/src/pages/Home.tsx:1269",
              className: "flex items-center gap-4",
              children: [
                x.jsx("a", {
                  "data-loc": "client/src/pages/Home.tsx:1270",
                  href: "https://x.com/OilCoinOnETH",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className:
                    "w-10 h-10 bg-[#1A1A1A] border border-[#D4AF37]/30 flex items-center justify-center hover:border-[#D4AF37] transition-colors",
                  children: x.jsx(Gv, {
                    "data-loc": "client/src/pages/Home.tsx:1276",
                    className: "w-5 h-5 text-[#D4AF37]",
                  }),
                }),
                x.jsx("a", {
                  "data-loc": "client/src/pages/Home.tsx:1278",
                  href: "https://t.me/OilCoin_Group",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className:
                    "w-10 h-10 bg-[#1A1A1A] border border-[#D4AF37]/30 flex items-center justify-center hover:border-[#D4AF37] transition-colors",
                  children: x.jsx(Fv, {
                    "data-loc": "client/src/pages/Home.tsx:1284",
                    className: "w-5 h-5 text-[#D4AF37]",
                  }),
                }),
              ],
            }),
          ],
        }),
        x.jsx("div", {
          "data-loc": "client/src/pages/Home.tsx:1289",
          className: "mt-8 pt-8 border-t border-[#D4AF37]/10 text-center",
          children: x.jsx("p", {
            "data-loc": "client/src/pages/Home.tsx:1290",
            className:
              "font-['Oswald'] text-sm text-[#F5F0E1]/40 uppercase tracking-widest",
            children: "© 2026 $OIL • Your Portfolio Needs Some Freedom",
          }),
        }),
      ],
    }),
  });
}
function nD() {
  return x.jsxs(rT, {
    "data-loc": "client/src/App.tsx:11",
    children: [
      x.jsx(hf, {
        "data-loc": "client/src/App.tsx:12",
        path: "/",
        component: GN,
      }),
      x.jsx(hf, {
        "data-loc": "client/src/App.tsx:13",
        path: "/404",
        component: My,
      }),
      x.jsx(hf, { "data-loc": "client/src/App.tsx:14", component: My }),
    ],
  });
}
function aD() {
  return x.jsx(cT, {
    "data-loc": "client/src/App.tsx:21",
    children: x.jsx(fT, {
      "data-loc": "client/src/App.tsx:22",
      defaultTheme: "dark",
      children: x.jsxs(SE, {
        "data-loc": "client/src/App.tsx:23",
        children: [
          x.jsx(jA, { "data-loc": "client/src/App.tsx:24" }),
          x.jsx(nD, { "data-loc": "client/src/App.tsx:25" }),
        ],
      }),
    }),
  });
}
IS.createRoot(document.getElementById("root")).render(
  x.jsx(aD, { "data-loc": "client/src/main.tsx:5" })
);
