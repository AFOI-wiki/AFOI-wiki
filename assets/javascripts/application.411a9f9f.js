!(function (e, t) {
  for (var n in t) e[n] = t[n];
})(
  window,
  (function (n) {
    var r = {};
    function o(e) {
      if (r[e]) return r[e].exports;
      var t = (r[e] = { i: e, l: !1, exports: {} });
      return n[e].call(t.exports, t, t.exports, o), (t.l = !0), t.exports;
    }
    return (
      (o.m = n),
      (o.c = r),
      (o.d = function (e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      }),
      (o.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (o.t = function (t, e) {
        if ((1 & e && (t = o(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (o.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var r in t)
            o.d(
              n,
              r,
              function (e) {
                return t[e];
              }.bind(null, r)
            );
        return n;
      }),
      (o.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return o.d(t, "a", t), t;
      }),
      (o.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (o.p = ""),
      o((o.s = 12))
    );
  })([
    function (e, t, n) {
      "use strict";
      var r = {
          Listener: (function () {
            function e(e, t, n) {
              var r = this;
              (this.els_ = Array.prototype.slice.call(
                "string" == typeof e
                  ? document.querySelectorAll(e)
                  : [].concat(e)
              )),
                (this.handler_ = "function" == typeof n ? { update: n } : n),
                (this.events_ = [].concat(t)),
                (this.update_ = function (e) {
                  return r.handler_.update(e);
                });
            }
            var t = e.prototype;
            return (
              (t.listen = function () {
                var n = this;
                this.els_.forEach(function (t) {
                  n.events_.forEach(function (e) {
                    t.addEventListener(e, n.update_, !1);
                  });
                }),
                  "function" == typeof this.handler_.setup &&
                    this.handler_.setup();
              }),
              (t.unlisten = function () {
                var n = this;
                this.els_.forEach(function (t) {
                  n.events_.forEach(function (e) {
                    t.removeEventListener(e, n.update_);
                  });
                }),
                  "function" == typeof this.handler_.reset &&
                    this.handler_.reset();
              }),
              e
            );
          })(),
          MatchMedia: function (e, t) {
            this.handler_ = function (e) {
              e.matches ? t.listen() : t.unlisten();
            };
            var n = window.matchMedia(e);
            n.addListener(this.handler_), this.handler_(n);
          },
        },
        o = {
          Shadow: (function () {
            function e(e, t) {
              var n = "string" == typeof e ? document.querySelector(e) : e;
              if (
                !(
                  n instanceof HTMLElement &&
                  n.parentNode instanceof HTMLElement
                )
              )
                throw new ReferenceError();
              if (
                ((this.el_ = n.parentNode),
                !(
                  (n =
                    "string" == typeof t
                      ? document.querySelector(t)
                      : t) instanceof HTMLElement
                ))
              )
                throw new ReferenceError();
              (this.header_ = n), (this.height_ = 0), (this.active_ = !1);
            }
            var t = e.prototype;
            return (
              (t.setup = function () {
                for (var e = this.el_; (e = e.previousElementSibling); ) {
                  if (!(e instanceof HTMLElement)) throw new ReferenceError();
                  this.height_ += e.offsetHeight;
                }
                this.update();
              }),
              (t.update = function (e) {
                if (
                  !e ||
                  ("resize" !== e.type && "orientationchange" !== e.type)
                ) {
                  var t = window.pageYOffset >= this.height_;
                  t !== this.active_ &&
                    (this.header_.dataset.mdState = (this.active_ = t)
                      ? "shadow"
                      : "");
                } else (this.height_ = 0), this.setup();
              }),
              (t.reset = function () {
                (this.header_.dataset.mdState = ""),
                  (this.height_ = 0),
                  (this.active_ = !1);
              }),
              e
            );
          })(),
          Title: (function () {
            function e(e, t) {
              var n = "string" == typeof e ? document.querySelector(e) : e;
              if (!(n instanceof HTMLElement)) throw new ReferenceError();
              if (
                ((this.el_ = n),
                !(
                  (n =
                    "string" == typeof t
                      ? document.querySelector(t)
                      : t) instanceof HTMLHeadingElement
                ))
              )
                throw new ReferenceError();
              (this.header_ = n), (this.active_ = !1);
            }
            var t = e.prototype;
            return (
              (t.setup = function () {
                var t = this;
                Array.prototype.forEach.call(this.el_.children, function (e) {
                  e.style.width = t.el_.offsetWidth - 20 + "px";
                });
              }),
              (t.update = function (e) {
                var t = this,
                  n = window.pageYOffset >= this.header_.offsetTop;
                n !== this.active_ &&
                  (this.el_.dataset.mdState = (this.active_ = n)
                    ? "active"
                    : ""),
                  ("resize" !== e.type && "orientationchange" !== e.type) ||
                    Array.prototype.forEach.call(
                      this.el_.children,
                      function (e) {
                        e.style.width = t.el_.offsetWidth - 20 + "px";
                      }
                    );
              }),
              (t.reset = function () {
                (this.el_.dataset.mdState = ""),
                  (this.el_.style.width = ""),
                  (this.active_ = !1);
              }),
              e
            );
          })(),
        },
        i = {
          Blur: (function () {
            function e(e) {
              (this.els_ =
                "string" == typeof e ? document.querySelectorAll(e) : e),
                (this.index_ = 0),
                (this.offset_ = window.pageYOffset),
                (this.dir_ = !1),
                (this.anchors_ = [].reduce.call(
                  this.els_,
                  function (e, t) {
                    var n = decodeURIComponent(t.hash);
                    return e.concat(
                      document.getElementById(n.substring(1)) || []
                    );
                  },
                  []
                ));
            }
            var t = e.prototype;
            return (
              (t.setup = function () {
                this.update();
              }),
              (t.update = function () {
                var e = window.pageYOffset,
                  t = this.offset_ - e < 0;
                if (
                  (this.dir_ !== t &&
                    (this.index_ = this.index_ = t ? 0 : this.els_.length - 1),
                  0 !== this.anchors_.length)
                ) {
                  if (this.offset_ <= e)
                    for (
                      var n = this.index_ + 1;
                      n < this.els_.length &&
                      this.anchors_[n].offsetTop - 80 <= e;
                      n++
                    )
                      0 < n && (this.els_[n - 1].dataset.mdState = "blur"),
                        (this.index_ = n);
                  else
                    for (var r = this.index_; 0 <= r; r--) {
                      if (!(this.anchors_[r].offsetTop - 80 > e)) {
                        this.index_ = r;
                        break;
                      }
                      0 < r && (this.els_[r - 1].dataset.mdState = "");
                    }
                  (this.offset_ = e), (this.dir_ = t);
                }
              }),
              (t.reset = function () {
                Array.prototype.forEach.call(this.els_, function (e) {
                  e.dataset.mdState = "";
                }),
                  (this.index_ = 0),
                  (this.offset_ = window.pageYOffset);
              }),
              e
            );
          })(),
          Collapse: (function () {
            function e(e) {
              var t = "string" == typeof e ? document.querySelector(e) : e;
              if (!(t instanceof HTMLElement)) throw new ReferenceError();
              this.el_ = t;
            }
            var t = e.prototype;
            return (
              (t.setup = function () {
                var e = this.el_.getBoundingClientRect().height;
                (this.el_.style.display = e ? "block" : "none"),
                  (this.el_.style.overflow = e ? "visible" : "hidden");
              }),
              (t.update = function () {
                var e = this,
                  t = this.el_.getBoundingClientRect().height;
                (this.el_.style.display = "block"),
                  (this.el_.style.overflow = "");
                var r =
                  this.el_.previousElementSibling.previousElementSibling
                    .checked;
                if (r)
                  (this.el_.style.maxHeight = t + "px"),
                    requestAnimationFrame(function () {
                      e.el_.setAttribute("data-md-state", "animate"),
                        (e.el_.style.maxHeight = "0px");
                    });
                else {
                  this.el_.setAttribute("data-md-state", "expand"),
                    (this.el_.style.maxHeight = "");
                  var n = this.el_.getBoundingClientRect().height;
                  this.el_.removeAttribute("data-md-state"),
                    (this.el_.style.maxHeight = "0px"),
                    requestAnimationFrame(function () {
                      e.el_.setAttribute("data-md-state", "animate"),
                        (e.el_.style.maxHeight = n + "px");
                    });
                }
                this.el_.addEventListener(
                  "transitionend",
                  function e(t) {
                    var n = t.target;
                    if (!(n instanceof HTMLElement)) throw new ReferenceError();
                    n.removeAttribute("data-md-state"),
                      (n.style.maxHeight = ""),
                      (n.style.display = r ? "none" : "block"),
                      (n.style.overflow = r ? "hidden" : "visible"),
                      n.removeEventListener("transitionend", e);
                  },
                  !1
                );
              }),
              (t.reset = function () {
                (this.el_.dataset.mdState = ""),
                  (this.el_.style.maxHeight = ""),
                  (this.el_.style.display = ""),
                  (this.el_.style.overflow = "");
              }),
              e
            );
          })(),
          Scrolling: (function () {
            function e(e) {
              var t = "string" == typeof e ? document.querySelector(e) : e;
              if (!(t instanceof HTMLElement)) throw new ReferenceError();
              this.el_ = t;
            }
            var t = e.prototype;
            return (
              (t.setup = function () {
                this.el_.children[
                  this.el_.children.length - 1
                ].style.webkitOverflowScrolling = "touch";
                var e = this.el_.querySelectorAll("[data-md-toggle]");
                Array.prototype.forEach.call(e, function (e) {
                  if (!(e instanceof HTMLInputElement))
                    throw new ReferenceError();
                  if (e.checked) {
                    var t = e.nextElementSibling;
                    if (!(t instanceof HTMLElement)) throw new ReferenceError();
                    for (; "NAV" !== t.tagName && t.nextElementSibling; )
                      t = t.nextElementSibling;
                    if (
                      !(
                        e.parentNode instanceof HTMLElement &&
                        e.parentNode.parentNode instanceof HTMLElement
                      )
                    )
                      throw new ReferenceError();
                    var n = e.parentNode.parentNode,
                      r = t.children[t.children.length - 1];
                    (n.style.webkitOverflowScrolling = ""),
                      (r.style.webkitOverflowScrolling = "touch");
                  }
                });
              }),
              (t.update = function (e) {
                var t = e.target;
                if (!(t instanceof HTMLElement)) throw new ReferenceError();
                var n = t.nextElementSibling;
                if (!(n instanceof HTMLElement)) throw new ReferenceError();
                for (; "NAV" !== n.tagName && n.nextElementSibling; )
                  n = n.nextElementSibling;
                if (
                  !(
                    t.parentNode instanceof HTMLElement &&
                    t.parentNode.parentNode instanceof HTMLElement
                  )
                )
                  throw new ReferenceError();
                var r = t.parentNode.parentNode,
                  o = n.children[n.children.length - 1];
                if (
                  ((r.style.webkitOverflowScrolling = ""),
                  (o.style.webkitOverflowScrolling = ""),
                  !t.checked)
                ) {
                  n.addEventListener(
                    "transitionend",
                    function e() {
                      n instanceof HTMLElement &&
                        ((r.style.webkitOverflowScrolling = "touch"),
                        n.removeEventListener("transitionend", e));
                    },
                    !1
                  );
                }
                if (t.checked) {
                  n.addEventListener(
                    "transitionend",
                    function e() {
                      n instanceof HTMLElement &&
                        ((o.style.webkitOverflowScrolling = "touch"),
                        n.removeEventListener("transitionend", e));
                    },
                    !1
                  );
                }
              }),
              (t.reset = function () {
                this.el_.children[1].style.webkitOverflowScrolling = "";
                var e = this.el_.querySelectorAll("[data-md-toggle]");
                Array.prototype.forEach.call(e, function (e) {
                  if (!(e instanceof HTMLInputElement))
                    throw new ReferenceError();
                  if (e.checked) {
                    var t = e.nextElementSibling;
                    if (!(t instanceof HTMLElement)) throw new ReferenceError();
                    for (; "NAV" !== t.tagName && t.nextElementSibling; )
                      t = t.nextElementSibling;
                    if (
                      !(
                        e.parentNode instanceof HTMLElement &&
                        e.parentNode.parentNode instanceof HTMLElement
                      )
                    )
                      throw new ReferenceError();
                    var n = e.parentNode.parentNode,
                      r = t.children[t.children.length - 1];
                    (n.style.webkitOverflowScrolling = ""),
                      (r.style.webkitOverflowScrolling = "");
                  }
                });
              }),
              e
            );
          })(),
        },
        a = {
          Lock: (function () {
            function e(e) {
              var t = "string" == typeof e ? document.querySelector(e) : e;
              if (!(t instanceof HTMLInputElement)) throw new ReferenceError();
              if (((this.el_ = t), !document.body)) throw new ReferenceError();
              this.lock_ = document.body;
            }
            var t = e.prototype;
            return (
              (t.setup = function () {
                this.update();
              }),
              (t.update = function () {
                var e = this;
                this.el_.checked
                  ? ((this.offset_ = window.pageYOffset),
                    setTimeout(function () {
                      window.scrollTo(0, 0),
                        e.el_.checked && (e.lock_.dataset.mdState = "lock");
                    }, 400))
                  : ((this.lock_.dataset.mdState = ""),
                    setTimeout(function () {
                      void 0 !== e.offset_ && window.scrollTo(0, e.offset_);
                    }, 100));
              }),
              (t.reset = function () {
                "lock" === this.lock_.dataset.mdState &&
                  window.scrollTo(0, this.offset_),
                  (this.lock_.dataset.mdState = "");
              }),
              e
            );
          })(),
          Result: n(8).a,
        },
        c = {
          Position: (function () {
            function e(e, t) {
              var n = "string" == typeof e ? document.querySelector(e) : e;
              if (
                !(
                  n instanceof HTMLElement &&
                  n.parentNode instanceof HTMLElement
                )
              )
                throw new ReferenceError();
              if (
                ((this.el_ = n),
                (this.parent_ = n.parentNode),
                !(
                  (n =
                    "string" == typeof t
                      ? document.querySelector(t)
                      : t) instanceof HTMLElement
                ))
              )
                throw new ReferenceError();
              (this.header_ = n),
                (this.height_ = 0),
                (this.pad_ =
                  "fixed" === window.getComputedStyle(this.header_).position);
            }
            var t = e.prototype;
            return (
              (t.setup = function () {
                var e = Array.prototype.reduce.call(
                  this.parent_.children,
                  function (e, t) {
                    return Math.max(e, t.offsetTop);
                  },
                  0
                );
                (this.offset_ =
                  e - (this.pad_ ? this.header_.offsetHeight : 0)),
                  this.update();
              }),
              (t.update = function (e) {
                var t = window.pageYOffset,
                  n = window.innerHeight;
                e && "resize" === e.type && this.setup();
                var r = this.pad_ ? this.header_.offsetHeight : 0,
                  o = this.parent_.offsetTop + this.parent_.offsetHeight,
                  i =
                    n -
                    r -
                    Math.max(0, this.offset_ - t) -
                    Math.max(0, t + n - o);
                i !== this.height_ &&
                  (this.el_.style.height = (this.height_ = i) + "px"),
                  t >= this.offset_
                    ? "lock" !== this.el_.dataset.mdState &&
                      (this.el_.dataset.mdState = "lock")
                    : "lock" === this.el_.dataset.mdState &&
                      (this.el_.dataset.mdState = "");
              }),
              (t.reset = function () {
                (this.el_.dataset.mdState = ""),
                  (this.el_.style.height = ""),
                  (this.height_ = 0);
              }),
              e
            );
          })(),
        },
        s = n(4),
        l = n.n(s);
      var u = {
          Adapter: {
            GitHub: (function (i) {
              var e, t;
              function n(e) {
                var t;
                t = i.call(this, e) || this;
                var n = /^.+github\.com\/([^/]+)\/?([^/]+)?.*$/.exec(t.base_);
                if (n && 3 === n.length) {
                  var r = n[1],
                    o = n[2];
                  (t.base_ = "https://api.github.com/users/" + r + "/repos"),
                    (t.name_ = o);
                }
                return t;
              }
              return (
                (t = i),
                ((e = n).prototype = Object.create(t.prototype)),
                ((e.prototype.constructor = e).__proto__ = t),
                (n.prototype.fetch_ = function () {
                  var o = this;
                  return (function n(r) {
                    return (
                      void 0 === r && (r = 0),
                      fetch(o.base_ + "?per_page=30&page=" + r)
                        .then(function (e) {
                          return e.json();
                        })
                        .then(function (e) {
                          if (!(e instanceof Array)) throw new TypeError();
                          if (o.name_) {
                            var t = e.find(function (e) {
                              return e.name === o.name_;
                            });
                            return t || 30 !== e.length
                              ? t
                                ? [
                                    o.format_(t.stargazers_count) + " Stars",
                                    o.format_(t.forks_count) + " Forks",
                                  ]
                                : []
                              : n(r + 1);
                          }
                          return [e.length + " Repositories"];
                        })
                    );
                  })();
                }),
                n
              );
            })(
              (function () {
                function e(e) {
                  var t = "string" == typeof e ? document.querySelector(e) : e;
                  if (!(t instanceof HTMLAnchorElement))
                    throw new ReferenceError();
                  (this.el_ = t),
                    (this.base_ = this.el_.href),
                    (this.salt_ = this.hash_(this.base_));
                }
                var t = e.prototype;
                return (
                  (t.fetch = function () {
                    var n = this;
                    return new Promise(function (t) {
                      var e = l.a.getJSON(n.salt_ + ".cache-source");
                      void 0 !== e
                        ? t(e)
                        : n.fetch_().then(function (e) {
                            l.a.set(n.salt_ + ".cache-source", e, {
                              expires: 1 / 96,
                            }),
                              t(e);
                          });
                    });
                  }),
                  (t.fetch_ = function () {
                    throw new Error("fetch_(): Not implemented");
                  }),
                  (t.format_ = function (e) {
                    return 1e4 < e
                      ? (e / 1e3).toFixed(0) + "k"
                      : 1e3 < e
                      ? (e / 1e3).toFixed(1) + "k"
                      : "" + e;
                  }),
                  (t.hash_ = function (e) {
                    var t = 0;
                    if (0 === e.length) return t;
                    for (var n = 0, r = e.length; n < r; n++)
                      (t = (t << 5) - t + e.charCodeAt(n)), (t |= 0);
                    return t;
                  }),
                  e
                );
              })()
            ),
          },
          Repository: n(9).a,
        },
        f = {
          Toggle: (function () {
            function e(e) {
              var t = "string" == typeof e ? document.querySelector(e) : e;
              if (!(t instanceof Node)) throw new ReferenceError();
              this.el_ = t;
              var n = document.querySelector("[data-md-component=header]");
              (this.height_ = n.offsetHeight), (this.active_ = !1);
            }
            var t = e.prototype;
            return (
              (t.update = function () {
                var e =
                  window.pageYOffset >=
                  this.el_.children[0].offsetTop + (5 - this.height_);
                e !== this.active_ &&
                  (this.el_.dataset.mdState = (this.active_ = e)
                    ? "hidden"
                    : "");
              }),
              (t.reset = function () {
                (this.el_.dataset.mdState = ""), (this.active_ = !1);
              }),
              e
            );
          })(),
        };
      t.a = {
        Event: r,
        Header: o,
        Nav: i,
        Search: a,
        Sidebar: c,
        Source: u,
        Tabs: f,
      };
    },
    function (e, d, h) {
      "use strict";
      (function (t) {
        var e = h(7),
          n = setTimeout;
        function s(e) {
          return Boolean(e && void 0 !== e.length);
        }
        function r() {}
        function i(e) {
          if (!(this instanceof i))
            throw new TypeError("Promises must be constructed via new");
          if ("function" != typeof e) throw new TypeError("not a function");
          (this._state = 0),
            (this._handled = !1),
            (this._value = void 0),
            (this._deferreds = []),
            f(e, this);
        }
        function o(n, r) {
          for (; 3 === n._state; ) n = n._value;
          0 !== n._state
            ? ((n._handled = !0),
              i._immediateFn(function () {
                var e = 1 === n._state ? r.onFulfilled : r.onRejected;
                if (null !== e) {
                  var t;
                  try {
                    t = e(n._value);
                  } catch (e) {
                    return void c(r.promise, e);
                  }
                  a(r.promise, t);
                } else (1 === n._state ? a : c)(r.promise, n._value);
              }))
            : n._deferreds.push(r);
        }
        function a(t, e) {
          try {
            if (e === t)
              throw new TypeError("A promise cannot be resolved with itself.");
            if (e && ("object" == typeof e || "function" == typeof e)) {
              var n = e.then;
              if (e instanceof i)
                return (t._state = 3), (t._value = e), void l(t);
              if ("function" == typeof n)
                return void f(
                  ((r = n),
                  (o = e),
                  function () {
                    r.apply(o, arguments);
                  }),
                  t
                );
            }
            (t._state = 1), (t._value = e), l(t);
          } catch (e) {
            c(t, e);
          }
          var r, o;
        }
        function c(e, t) {
          (e._state = 2), (e._value = t), l(e);
        }
        function l(e) {
          2 === e._state &&
            0 === e._deferreds.length &&
            i._immediateFn(function () {
              e._handled || i._unhandledRejectionFn(e._value);
            });
          for (var t = 0, n = e._deferreds.length; t < n; t++)
            o(e, e._deferreds[t]);
          e._deferreds = null;
        }
        function u(e, t, n) {
          (this.onFulfilled = "function" == typeof e ? e : null),
            (this.onRejected = "function" == typeof t ? t : null),
            (this.promise = n);
        }
        function f(e, t) {
          var n = !1;
          try {
            e(
              function (e) {
                n || ((n = !0), a(t, e));
              },
              function (e) {
                n || ((n = !0), c(t, e));
              }
            );
          } catch (e) {
            if (n) return;
            (n = !0), c(t, e);
          }
        }
        (i.prototype.catch = function (e) {
          return this.then(null, e);
        }),
          (i.prototype.then = function (e, t) {
            var n = new this.constructor(r);
            return o(this, new u(e, t, n)), n;
          }),
          (i.prototype.finally = e.a),
          (i.all = function (t) {
            return new i(function (r, o) {
              if (!s(t))
                return o(new TypeError("Promise.all accepts an array"));
              var i = Array.prototype.slice.call(t);
              if (0 === i.length) return r([]);
              var a = i.length;
              function c(t, e) {
                try {
                  if (e && ("object" == typeof e || "function" == typeof e)) {
                    var n = e.then;
                    if ("function" == typeof n)
                      return void n.call(
                        e,
                        function (e) {
                          c(t, e);
                        },
                        o
                      );
                  }
                  (i[t] = e), 0 == --a && r(i);
                } catch (e) {
                  o(e);
                }
              }
              for (var e = 0; e < i.length; e++) c(e, i[e]);
            });
          }),
          (i.resolve = function (t) {
            return t && "object" == typeof t && t.constructor === i
              ? t
              : new i(function (e) {
                  e(t);
                });
          }),
          (i.reject = function (n) {
            return new i(function (e, t) {
              t(n);
            });
          }),
          (i.race = function (o) {
            return new i(function (e, t) {
              if (!s(o))
                return t(new TypeError("Promise.race accepts an array"));
              for (var n = 0, r = o.length; n < r; n++)
                i.resolve(o[n]).then(e, t);
            });
          }),
          (i._immediateFn =
            ("function" == typeof t &&
              function (e) {
                t(e);
              }) ||
            function (e) {
              n(e, 0);
            }),
          (i._unhandledRejectionFn = function (e) {
            "undefined" != typeof console &&
              console &&
              console.warn("Possible Unhandled Promise Rejection:", e);
          }),
          (d.a = i);
      }.call(this, h(20).setImmediate));
    },
    function (e, t, n) {
      "use strict";
      function r(e, t) {
        var n = document.createElement(e);
        t &&
          Array.prototype.forEach.call(Object.keys(t), function (e) {
            n.setAttribute(e, t[e]);
          });
        for (
          var r = arguments.length, o = new Array(2 < r ? r - 2 : 0), i = 2;
          i < r;
          i++
        )
          o[i - 2] = arguments[i];
        return (
          (function t(e) {
            Array.prototype.forEach.call(e, function (e) {
              "string" == typeof e || "number" == typeof e
                ? (n.textContent += e)
                : Array.isArray(e)
                ? t(e)
                : void 0 !== e.__html
                ? (n.innerHTML += e.__html)
                : e instanceof Node && n.appendChild(e);
            });
          })(o),
          n
        );
      }
      n.r(t),
        n.d(t, "createElement", function () {
          return r;
        });
    },
    function (e, t, n) {
      var r;
      (r = function () {
        return (function (n) {
          var r = {};
          function o(e) {
            if (r[e]) return r[e].exports;
            var t = (r[e] = { i: e, l: !1, exports: {} });
            return n[e].call(t.exports, t, t.exports, o), (t.l = !0), t.exports;
          }
          return (
            (o.m = n),
            (o.c = r),
            (o.d = function (e, t, n) {
              o.o(e, t) ||
                Object.defineProperty(e, t, { enumerable: !0, get: n });
            }),
            (o.r = function (e) {
              "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {
                  value: "Module",
                }),
                Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (o.t = function (t, e) {
              if ((1 & e && (t = o(t)), 8 & e)) return t;
              if (4 & e && "object" == typeof t && t && t.__esModule) return t;
              var n = Object.create(null);
              if (
                (o.r(n),
                Object.defineProperty(n, "default", {
                  enumerable: !0,
                  value: t,
                }),
                2 & e && "string" != typeof t)
              )
                for (var r in t)
                  o.d(
                    n,
                    r,
                    function (e) {
                      return t[e];
                    }.bind(null, r)
                  );
              return n;
            }),
            (o.n = function (e) {
              var t =
                e && e.__esModule
                  ? function () {
                      return e.default;
                    }
                  : function () {
                      return e;
                    };
              return o.d(t, "a", t), t;
            }),
            (o.o = function (e, t) {
              return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (o.p = ""),
            o((o.s = 0))
          );
        })([
          function (e, t, n) {
            "use strict";
            var o =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (e) {
                      return typeof e;
                    }
                  : function (e) {
                      return e &&
                        "function" == typeof Symbol &&
                        e.constructor === Symbol &&
                        e !== Symbol.prototype
                        ? "symbol"
                        : typeof e;
                    },
              i = (function () {
                function r(e, t) {
                  for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      "value" in r && (r.writable = !0),
                      Object.defineProperty(e, r.key, r);
                  }
                }
                return function (e, t, n) {
                  return t && r(e.prototype, t), n && r(e, n), e;
                };
              })(),
              a = r(n(1)),
              c = r(n(3)),
              s = r(n(4));
            function r(e) {
              return e && e.__esModule ? e : { default: e };
            }
            var l = (function (e) {
              function r(e, t) {
                !(function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                })(this, r);
                var n = (function (e, t) {
                  if (!e)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    );
                  return !t || ("object" != typeof t && "function" != typeof t)
                    ? e
                    : t;
                })(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this));
                return n.resolveOptions(t), n.listenClick(e), n;
              }
              return (
                (function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Super expression must either be null or a function, not " +
                        typeof t
                    );
                  (e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    t &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, t)
                        : (e.__proto__ = t));
                })(r, c.default),
                i(
                  r,
                  [
                    {
                      key: "resolveOptions",
                      value: function () {
                        var e =
                          0 < arguments.length && void 0 !== arguments[0]
                            ? arguments[0]
                            : {};
                        (this.action =
                          "function" == typeof e.action
                            ? e.action
                            : this.defaultAction),
                          (this.target =
                            "function" == typeof e.target
                              ? e.target
                              : this.defaultTarget),
                          (this.text =
                            "function" == typeof e.text
                              ? e.text
                              : this.defaultText),
                          (this.container =
                            "object" === o(e.container)
                              ? e.container
                              : document.body);
                      },
                    },
                    {
                      key: "listenClick",
                      value: function (e) {
                        var t = this;
                        this.listener = (0, s.default)(
                          e,
                          "click",
                          function (e) {
                            return t.onClick(e);
                          }
                        );
                      },
                    },
                    {
                      key: "onClick",
                      value: function (e) {
                        var t = e.delegateTarget || e.currentTarget;
                        this.clipboardAction && (this.clipboardAction = null),
                          (this.clipboardAction = new a.default({
                            action: this.action(t),
                            target: this.target(t),
                            text: this.text(t),
                            container: this.container,
                            trigger: t,
                            emitter: this,
                          }));
                      },
                    },
                    {
                      key: "defaultAction",
                      value: function (e) {
                        return u("action", e);
                      },
                    },
                    {
                      key: "defaultTarget",
                      value: function (e) {
                        var t = u("target", e);
                        if (t) return document.querySelector(t);
                      },
                    },
                    {
                      key: "defaultText",
                      value: function (e) {
                        return u("text", e);
                      },
                    },
                    {
                      key: "destroy",
                      value: function () {
                        this.listener.destroy(),
                          this.clipboardAction &&
                            (this.clipboardAction.destroy(),
                            (this.clipboardAction = null));
                      },
                    },
                  ],
                  [
                    {
                      key: "isSupported",
                      value: function () {
                        var e =
                            0 < arguments.length && void 0 !== arguments[0]
                              ? arguments[0]
                              : ["copy", "cut"],
                          t = "string" == typeof e ? [e] : e,
                          n = !!document.queryCommandSupported;
                        return (
                          t.forEach(function (e) {
                            n = n && !!document.queryCommandSupported(e);
                          }),
                          n
                        );
                      },
                    },
                  ]
                ),
                r
              );
            })();
            function u(e, t) {
              var n = "data-clipboard-" + e;
              if (t.hasAttribute(n)) return t.getAttribute(n);
            }
            e.exports = l;
          },
          function (e, t, n) {
            "use strict";
            var r,
              o =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (e) {
                      return typeof e;
                    }
                  : function (e) {
                      return e &&
                        "function" == typeof Symbol &&
                        e.constructor === Symbol &&
                        e !== Symbol.prototype
                        ? "symbol"
                        : typeof e;
                    },
              i = (function () {
                function r(e, t) {
                  for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      "value" in r && (r.writable = !0),
                      Object.defineProperty(e, r.key, r);
                  }
                }
                return function (e, t, n) {
                  return t && r(e.prototype, t), n && r(e, n), e;
                };
              })(),
              a = n(2),
              c = (r = a) && r.__esModule ? r : { default: r };
            var s = (function () {
              function t(e) {
                !(function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                })(this, t),
                  this.resolveOptions(e),
                  this.initSelection();
              }
              return (
                i(t, [
                  {
                    key: "resolveOptions",
                    value: function () {
                      var e =
                        0 < arguments.length && void 0 !== arguments[0]
                          ? arguments[0]
                          : {};
                      (this.action = e.action),
                        (this.container = e.container),
                        (this.emitter = e.emitter),
                        (this.target = e.target),
                        (this.text = e.text),
                        (this.trigger = e.trigger),
                        (this.selectedText = "");
                    },
                  },
                  {
                    key: "initSelection",
                    value: function () {
                      this.text
                        ? this.selectFake()
                        : this.target && this.selectTarget();
                    },
                  },
                  {
                    key: "selectFake",
                    value: function () {
                      var e = this,
                        t =
                          "rtl" == document.documentElement.getAttribute("dir");
                      this.removeFake(),
                        (this.fakeHandlerCallback = function () {
                          return e.removeFake();
                        }),
                        (this.fakeHandler =
                          this.container.addEventListener(
                            "click",
                            this.fakeHandlerCallback
                          ) || !0),
                        (this.fakeElem = document.createElement("textarea")),
                        (this.fakeElem.style.fontSize = "12pt"),
                        (this.fakeElem.style.border = "0"),
                        (this.fakeElem.style.padding = "0"),
                        (this.fakeElem.style.margin = "0"),
                        (this.fakeElem.style.position = "absolute"),
                        (this.fakeElem.style[t ? "right" : "left"] = "-9999px");
                      var n =
                        window.pageYOffset ||
                        document.documentElement.scrollTop;
                      (this.fakeElem.style.top = n + "px"),
                        this.fakeElem.setAttribute("readonly", ""),
                        (this.fakeElem.value = this.text),
                        this.container.appendChild(this.fakeElem),
                        (this.selectedText = (0, c.default)(this.fakeElem)),
                        this.copyText();
                    },
                  },
                  {
                    key: "removeFake",
                    value: function () {
                      this.fakeHandler &&
                        (this.container.removeEventListener(
                          "click",
                          this.fakeHandlerCallback
                        ),
                        (this.fakeHandler = null),
                        (this.fakeHandlerCallback = null)),
                        this.fakeElem &&
                          (this.container.removeChild(this.fakeElem),
                          (this.fakeElem = null));
                    },
                  },
                  {
                    key: "selectTarget",
                    value: function () {
                      (this.selectedText = (0, c.default)(this.target)),
                        this.copyText();
                    },
                  },
                  {
                    key: "copyText",
                    value: function () {
                      var t = void 0;
                      try {
                        t = document.execCommand(this.action);
                      } catch (e) {
                        t = !1;
                      }
                      this.handleResult(t);
                    },
                  },
                  {
                    key: "handleResult",
                    value: function (e) {
                      this.emitter.emit(e ? "success" : "error", {
                        action: this.action,
                        text: this.selectedText,
                        trigger: this.trigger,
                        clearSelection: this.clearSelection.bind(this),
                      });
                    },
                  },
                  {
                    key: "clearSelection",
                    value: function () {
                      this.trigger && this.trigger.focus(),
                        window.getSelection().removeAllRanges();
                    },
                  },
                  {
                    key: "destroy",
                    value: function () {
                      this.removeFake();
                    },
                  },
                  {
                    key: "action",
                    set: function () {
                      var e =
                        0 < arguments.length && void 0 !== arguments[0]
                          ? arguments[0]
                          : "copy";
                      if (
                        ((this._action = e),
                        "copy" !== this._action && "cut" !== this._action)
                      )
                        throw new Error(
                          'Invalid "action" value, use either "copy" or "cut"'
                        );
                    },
                    get: function () {
                      return this._action;
                    },
                  },
                  {
                    key: "target",
                    set: function (e) {
                      if (void 0 !== e) {
                        if (
                          !e ||
                          "object" !== (void 0 === e ? "undefined" : o(e)) ||
                          1 !== e.nodeType
                        )
                          throw new Error(
                            'Invalid "target" value, use a valid Element'
                          );
                        if (
                          "copy" === this.action &&
                          e.hasAttribute("disabled")
                        )
                          throw new Error(
                            'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
                          );
                        if (
                          "cut" === this.action &&
                          (e.hasAttribute("readonly") ||
                            e.hasAttribute("disabled"))
                        )
                          throw new Error(
                            'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'
                          );
                        this._target = e;
                      }
                    },
                    get: function () {
                      return this._target;
                    },
                  },
                ]),
                t
              );
            })();
            e.exports = s;
          },
          function (e, t) {
            e.exports = function (e) {
              var t;
              if ("SELECT" === e.nodeName) e.focus(), (t = e.value);
              else if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) {
                var n = e.hasAttribute("readonly");
                n || e.setAttribute("readonly", ""),
                  e.select(),
                  e.setSelectionRange(0, e.value.length),
                  n || e.removeAttribute("readonly"),
                  (t = e.value);
              } else {
                e.hasAttribute("contenteditable") && e.focus();
                var r = window.getSelection(),
                  o = document.createRange();
                o.selectNodeContents(e),
                  r.removeAllRanges(),
                  r.addRange(o),
                  (t = r.toString());
              }
              return t;
            };
          },
          function (e, t) {
            function n() {}
            (n.prototype = {
              on: function (e, t, n) {
                var r = this.e || (this.e = {});
                return (r[e] || (r[e] = [])).push({ fn: t, ctx: n }), this;
              },
              once: function (e, t, n) {
                var r = this;
                function o() {
                  r.off(e, o), t.apply(n, arguments);
                }
                return (o._ = t), this.on(e, o, n);
              },
              emit: function (e) {
                for (
                  var t = [].slice.call(arguments, 1),
                    n = ((this.e || (this.e = {}))[e] || []).slice(),
                    r = 0,
                    o = n.length;
                  r < o;
                  r++
                )
                  n[r].fn.apply(n[r].ctx, t);
                return this;
              },
              off: function (e, t) {
                var n = this.e || (this.e = {}),
                  r = n[e],
                  o = [];
                if (r && t)
                  for (var i = 0, a = r.length; i < a; i++)
                    r[i].fn !== t && r[i].fn._ !== t && o.push(r[i]);
                return o.length ? (n[e] = o) : delete n[e], this;
              },
            }),
              (e.exports = n);
          },
          function (e, t, n) {
            var d = n(5),
              h = n(6);
            e.exports = function (e, t, n) {
              if (!e && !t && !n) throw new Error("Missing required arguments");
              if (!d.string(t))
                throw new TypeError("Second argument must be a String");
              if (!d.fn(n))
                throw new TypeError("Third argument must be a Function");
              if (d.node(e))
                return (
                  (u = t),
                  (f = n),
                  (l = e).addEventListener(u, f),
                  {
                    destroy: function () {
                      l.removeEventListener(u, f);
                    },
                  }
                );
              if (d.nodeList(e))
                return (
                  (a = e),
                  (c = t),
                  (s = n),
                  Array.prototype.forEach.call(a, function (e) {
                    e.addEventListener(c, s);
                  }),
                  {
                    destroy: function () {
                      Array.prototype.forEach.call(a, function (e) {
                        e.removeEventListener(c, s);
                      });
                    },
                  }
                );
              if (d.string(e))
                return (r = e), (o = t), (i = n), h(document.body, r, o, i);
              throw new TypeError(
                "First argument must be a String, HTMLElement, HTMLCollection, or NodeList"
              );
              var r, o, i, a, c, s, l, u, f;
            };
          },
          function (e, n) {
            (n.node = function (e) {
              return (
                void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
              );
            }),
              (n.nodeList = function (e) {
                var t = Object.prototype.toString.call(e);
                return (
                  void 0 !== e &&
                  ("[object NodeList]" === t ||
                    "[object HTMLCollection]" === t) &&
                  "length" in e &&
                  (0 === e.length || n.node(e[0]))
                );
              }),
              (n.string = function (e) {
                return "string" == typeof e || e instanceof String;
              }),
              (n.fn = function (e) {
                return (
                  "[object Function]" === Object.prototype.toString.call(e)
                );
              });
          },
          function (e, t, n) {
            var a = n(7);
            function i(e, t, n, r, o) {
              var i = function (t, n, e, r) {
                return function (e) {
                  (e.delegateTarget = a(e.target, n)),
                    e.delegateTarget && r.call(t, e);
                };
              }.apply(this, arguments);
              return (
                e.addEventListener(n, i, o),
                {
                  destroy: function () {
                    e.removeEventListener(n, i, o);
                  },
                }
              );
            }
            e.exports = function (e, t, n, r, o) {
              return "function" == typeof e.addEventListener
                ? i.apply(null, arguments)
                : "function" == typeof n
                ? i.bind(null, document).apply(null, arguments)
                : ("string" == typeof e && (e = document.querySelectorAll(e)),
                  Array.prototype.map.call(e, function (e) {
                    return i(e, t, n, r, o);
                  }));
            };
          },
          function (e, t) {
            if ("undefined" != typeof Element && !Element.prototype.matches) {
              var n = Element.prototype;
              n.matches =
                n.matchesSelector ||
                n.mozMatchesSelector ||
                n.msMatchesSelector ||
                n.oMatchesSelector ||
                n.webkitMatchesSelector;
            }
            e.exports = function (e, t) {
              for (; e && 9 !== e.nodeType; ) {
                if ("function" == typeof e.matches && e.matches(t)) return e;
                e = e.parentNode;
              }
            };
          },
        ]);
      }),
        (e.exports = r());
    },
    function (r, o, i) {
      var a, c;
      !(function (e) {
        if (
          (void 0 ===
            (c = "function" == typeof (a = e) ? a.call(o, i, o, r) : a) ||
            (r.exports = c),
          !0,
          (r.exports = e()),
          !!0)
        ) {
          var t = window.Cookies,
            n = (window.Cookies = e());
          n.noConflict = function () {
            return (window.Cookies = t), n;
          };
        }
      })(function () {
        function c() {
          for (var e = 0, t = {}; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) t[r] = n[r];
          }
          return t;
        }
        function l(e) {
          return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
        }
        return (function e(s) {
          function a() {}
          function n(e, t, n) {
            if ("undefined" != typeof document) {
              "number" ==
                typeof (n = c({ path: "/" }, a.defaults, n)).expires &&
                (n.expires = new Date(1 * new Date() + 864e5 * n.expires)),
                (n.expires = n.expires ? n.expires.toUTCString() : "");
              try {
                var r = JSON.stringify(t);
                /^[\{\[]/.test(r) && (t = r);
              } catch (e) {}
              (t = s.write
                ? s.write(t, e)
                : encodeURIComponent(String(t)).replace(
                    /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                    decodeURIComponent
                  )),
                (e = encodeURIComponent(String(e))
                  .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                  .replace(/[\(\)]/g, escape));
              var o = "";
              for (var i in n)
                n[i] &&
                  ((o += "; " + i),
                  !0 !== n[i] && (o += "=" + n[i].split(";")[0]));
              return (document.cookie = e + "=" + t + o);
            }
          }
          function t(e, t) {
            if ("undefined" != typeof document) {
              for (
                var n = {},
                  r = document.cookie ? document.cookie.split("; ") : [],
                  o = 0;
                o < r.length;
                o++
              ) {
                var i = r[o].split("="),
                  a = i.slice(1).join("=");
                t || '"' !== a.charAt(0) || (a = a.slice(1, -1));
                try {
                  var c = l(i[0]);
                  if (((a = (s.read || s)(a, c) || l(a)), t))
                    try {
                      a = JSON.parse(a);
                    } catch (e) {}
                  if (((n[c] = a), e === c)) break;
                } catch (e) {}
              }
              return e ? n[e] : n;
            }
          }
          return (
            (a.set = n),
            (a.get = function (e) {
              return t(e, !1);
            }),
            (a.getJSON = function (e) {
              return t(e, !0);
            }),
            (a.remove = function (e, t) {
              n(e, "", c(t, { expires: -1 }));
            }),
            (a.defaults = {}),
            (a.withConverter = e),
            a
          );
        })(function () {});
      });
    },
    function (e, t, n) {
      "use strict";
      n.r(t);
      var r =
        "function" == typeof fetch
          ? fetch.bind()
          : function (o, i) {
              return (
                (i = i || {}),
                new Promise(function (e, t) {
                  var n = new XMLHttpRequest();
                  for (var r in (n.open(i.method || "get", o, !0), i.headers))
                    n.setRequestHeader(r, i.headers[r]);
                  function c() {
                    var r,
                      o = [],
                      i = [],
                      a = {};
                    return (
                      n
                        .getAllResponseHeaders()
                        .replace(
                          /^(.*?):[^\S\n]*([\s\S]*?)$/gm,
                          function (e, t, n) {
                            o.push((t = t.toLowerCase())),
                              i.push([t, n]),
                              (r = a[t]),
                              (a[t] = r ? r + "," + n : n);
                          }
                        ),
                      {
                        ok: 2 == ((n.status / 100) | 0),
                        status: n.status,
                        statusText: n.statusText,
                        url: n.responseURL,
                        clone: c,
                        text: function () {
                          return Promise.resolve(n.responseText);
                        },
                        json: function () {
                          return Promise.resolve(n.responseText).then(
                            JSON.parse
                          );
                        },
                        blob: function () {
                          return Promise.resolve(new Blob([n.response]));
                        },
                        headers: {
                          keys: function () {
                            return o;
                          },
                          entries: function () {
                            return i;
                          },
                          get: function (e) {
                            return a[e.toLowerCase()];
                          },
                          has: function (e) {
                            return e.toLowerCase() in a;
                          },
                        },
                      }
                    );
                  }
                  (n.withCredentials = "include" == i.credentials),
                    (n.onload = function () {
                      e(c());
                    }),
                    (n.onerror = t),
                    n.send(i.body || null);
                })
              );
            };
      t.default = r;
    },
    function (e, t) {
      var n;
      n = (function () {
        return this;
      })();
      try {
        n = n || new Function("return this")();
      } catch (e) {
        "object" == typeof window && (n = window);
      }
      e.exports = n;
    },
    function (e, t, n) {
      "use strict";
      t.a = function (t) {
        var n = this.constructor;
        return this.then(
          function (e) {
            return n.resolve(t()).then(function () {
              return e;
            });
          },
          function (e) {
            return n.resolve(t()).then(function () {
              return n.reject(e);
            });
          }
        );
      };
    },
    function (e, t, n) {
      "use strict";
      (function (i) {
        n.d(t, "a", function () {
          return e;
        });
        n(23);
        var a,
          c = function (e) {
            var t = document.getElementsByName("lang:" + e)[0];
            if (!(t instanceof HTMLMetaElement)) throw new ReferenceError();
            return t.content;
          },
          e = (function () {
            function e(e, t) {
              var n = "string" == typeof e ? document.querySelector(e) : e;
              if (!(n instanceof HTMLElement)) throw new ReferenceError();
              (this.el_ = n), (this.baseUrl = t);
              var r = Array.prototype.slice.call(this.el_.children),
                o = r[0],
                i = r[1];
              (this.data_ = null),
                (this.meta_ = o),
                (a = i),
                (this.state = { ev: "" }),
                (this.message_ = {
                  placeholder: this.meta_.textContent,
                  none: c("search.result.none"),
                  one: c("search.result.one"),
                  other: c("search.result.other"),
                }),
                (this.update = this.update.bind(this)),
                (this.triggerChange = this.triggerChange.bind(this));
            }
            var t = e.prototype;
            return (
              (t.update = function (e) {
                ("focus" !== e.type && "keyup" !== e.type) ||
                  (clearTimeout(this.timer),
                  (this.state = { ev: e }),
                  (this.timer = setTimeout(this.triggerChange, 500)));
              }),
              (t.triggerChange = function (e) {
                var n = this,
                  t = this.state.ev.target;
                if (!(t instanceof HTMLInputElement))
                  throw new ReferenceError();
                if (t.value !== this.value_) {
                  for (; a.firstChild; ) a.removeChild(a.firstChild);
                  this.value_ = t.value;
                  var r = this.value_;
                  if (0 !== this.value_.length) {
                    var o = [];
                    fetch("https://search.oi-wiki.org:8443/?s=" + r, {
                      credentials: "same-origin",
                    })
                      .then(function (e) {
                        return e.json();
                      })
                      .then(function (e) {
                        if (
                          (e.length,
                          e.forEach(function (e) {
                            var t = i.createElement(
                              "li",
                              { class: "md-search-result__item" },
                              i.createElement(
                                "a",
                                {
                                  href:
                                    ("/" !== n.baseUrl ? n.baseUrl : "") +
                                    e.url,
                                  title: e.title,
                                  class: "md-search-result__link",
                                  tabindex: "-1",
                                },
                                i.createElement(
                                  "article",
                                  {
                                    class:
                                      "md-search-result__article md-search-result__article--document",
                                  },
                                  i.createElement(
                                    "h1",
                                    { class: "md-search-result__title" },
                                    {
                                      __html: e.title.replace(
                                        r,
                                        "<em>" + r + "</em>"
                                      ),
                                    }
                                  ),
                                  e.highlight
                                    ? i.createElement(
                                        "p",
                                        { class: "md-search-result__teaser" },
                                        { __html: e.highlight }
                                      )
                                    : {}
                                )
                              )
                            );
                            o.push(function () {
                              return a.appendChild(t);
                            });
                          }),
                          !(n.el_.parentNode instanceof HTMLElement))
                        )
                          throw new ReferenceError();
                        for (; o.length; ) o.shift()();
                        var t = a.querySelectorAll("[data-md-rel=anchor]");
                        switch (
                          (Array.prototype.forEach.call(t, function (r) {
                            ["click", "keydown"].forEach(function (n) {
                              r.addEventListener(n, function (e) {
                                if ("keydown" !== n || 13 === e.keyCode) {
                                  var t = document.querySelector(
                                    "[data-md-toggle=search]"
                                  );
                                  if (!(t instanceof HTMLInputElement))
                                    throw new ReferenceError();
                                  t.checked &&
                                    ((t.checked = !1),
                                    t.dispatchEvent(new CustomEvent("change"))),
                                    e.preventDefault(),
                                    setTimeout(function () {
                                      document.location.href = r.href;
                                    }, 100);
                                }
                              });
                            });
                          }),
                          e.length)
                        ) {
                          case 0:
                            n.meta_.textContent = n.message_.none;
                            break;
                          case 1:
                            n.meta_.textContent = n.message_.one;
                            break;
                          default:
                            n.meta_.textContent = n.message_.other.replace(
                              "#",
                              e.length
                            );
                        }
                        return e;
                      });
                  } else this.meta_.textContent = this.message_.placeholder;
                }
              }),
              e
            );
          })();
      }.call(this, n(2)));
    },
    function (e, n, r) {
      "use strict";
      (function (t) {
        r.d(n, "a", function () {
          return e;
        });
        var e = (function () {
          function e(e) {
            var t = "string" == typeof e ? document.querySelector(e) : e;
            if (!(t instanceof HTMLElement)) throw new ReferenceError();
            this.el_ = t;
          }
          return (
            (e.prototype.initialize = function (e) {
              e.length &&
                this.el_.children.length &&
                this.el_.children[this.el_.children.length - 1].appendChild(
                  t.createElement(
                    "ul",
                    { class: "md-source__facts" },
                    e.map(function (e) {
                      return t.createElement(
                        "li",
                        { class: "md-source__fact" },
                        e
                      );
                    })
                  )
                ),
                (this.el_.dataset.mdState = "done");
            }),
            e
          );
        })();
      }.call(this, r(2)));
    },
    ,
    ,
    function (e, n, s) {
      "use strict";
      s.r(n),
        function (i) {
          s.d(n, "app", function () {
            return t;
          });
          s(13), s(14), s(15), s(16), s(17), s(18), s(19);
          var r = s(1),
            e = s(3),
            a = s.n(e),
            o = s(0);
          window.Promise = window.Promise || r.a;
          var c = function (e) {
            var t = document.getElementsByName("lang:" + e)[0];
            if (!(t instanceof HTMLMetaElement)) throw new ReferenceError();
            return t.content;
          };
          var t = {
            initialize: function (e) {
              new o.a.Event.Listener(document, "DOMContentLoaded", function () {
                if (!(document.body instanceof HTMLElement))
                  throw new ReferenceError();
                Modernizr.addTest("ios", function () {
                  return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
                });
                var e = document.querySelectorAll("table:not([class])");
                if (
                  (Array.prototype.forEach.call(e, function (e) {
                    var t = i.createElement(
                      "div",
                      { class: "md-typeset__scrollwrap" },
                      i.createElement("div", { class: "md-typeset__table" })
                    );
                    e.nextSibling
                      ? e.parentNode.insertBefore(t, e.nextSibling)
                      : e.parentNode.appendChild(t),
                      t.children[0].appendChild(e);
                  }),
                  a.a.isSupported())
                ) {
                  var t = document.querySelectorAll(
                    ".highlight > pre, pre > code"
                  );
                  Array.prototype.forEach.call(t, function (e, t) {
                    var n = "__code_" + t,
                      r = i.createElement(
                        "button",
                        {
                          class: "md-clipboard",
                          title: c("clipboard.copy"),
                          "data-clipboard-target":
                            "#" + n + " pre, #" + n + " code",
                        },
                        i.createElement("span", {
                          class: "md-clipboard__message",
                        })
                      ),
                      o = e.parentNode;
                    (o.id = n), o.insertBefore(r, e);
                  }),
                    new a.a(".md-clipboard").on("success", function (e) {
                      var t = e.trigger.querySelector(".md-clipboard__message");
                      if (!(t instanceof HTMLElement))
                        throw new ReferenceError();
                      e.clearSelection(),
                        t.dataset.mdTimer &&
                          clearTimeout(parseInt(t.dataset.mdTimer, 10)),
                        t.classList.add("md-clipboard__message--active"),
                        (t.innerHTML = c("clipboard.copied")),
                        (t.dataset.mdTimer = setTimeout(function () {
                          t.classList.remove("md-clipboard__message--active"),
                            (t.dataset.mdTimer = "");
                        }, 2e3).toString());
                    });
                }
                if (!Modernizr.details) {
                  var n = document.querySelectorAll("details > summary");
                  Array.prototype.forEach.call(n, function (e) {
                    e.addEventListener("click", function (e) {
                      var t = e.target.parentNode;
                      t.hasAttribute("open")
                        ? t.removeAttribute("open")
                        : t.setAttribute("open", "");
                    });
                  });
                }
                var r = function () {
                  if (document.location.hash) {
                    var e = document.getElementById(
                      document.location.hash.substring(1)
                    );
                    if (!e) return;
                    for (
                      var t = e.parentNode;
                      t && !(t instanceof HTMLDetailsElement);

                    )
                      t = t.parentNode;
                    if (t && !t.open) {
                      t.open = !0;
                      var n = location.hash;
                      (location.hash = " "), (location.hash = n);
                    }
                  }
                };
                if (
                  (window.addEventListener("hashchange", r), r(), Modernizr.ios)
                ) {
                  var o = document.querySelectorAll("[data-md-scrollfix]");
                  Array.prototype.forEach.call(o, function (t) {
                    t.addEventListener("touchstart", function () {
                      var e = t.scrollTop;
                      0 === e
                        ? (t.scrollTop = 1)
                        : e + t.offsetHeight === t.scrollHeight &&
                          (t.scrollTop = e - 1);
                    });
                  });
                }
              }).listen(),
                new o.a.Event.Listener(
                  window,
                  ["scroll", "resize", "orientationchange"],
                  new o.a.Header.Shadow(
                    "[data-md-component=container]",
                    "[data-md-component=header]"
                  )
                ).listen(),
                new o.a.Event.Listener(
                  window,
                  ["scroll", "resize", "orientationchange"],
                  new o.a.Header.Title(
                    "[data-md-component=title]",
                    ".md-typeset h1"
                  )
                ).listen(),
                document.querySelector("[data-md-component=hero]") &&
                  new o.a.Event.Listener(
                    window,
                    ["scroll", "resize", "orientationchange"],
                    new o.a.Tabs.Toggle("[data-md-component=hero]")
                  ).listen(),
                document.querySelector("[data-md-component=tabs]") &&
                  new o.a.Event.Listener(
                    window,
                    ["scroll", "resize", "orientationchange"],
                    new o.a.Tabs.Toggle("[data-md-component=tabs]")
                  ).listen(),
                new o.a.Event.MatchMedia(
                  "(min-width: 1220px)",
                  new o.a.Event.Listener(
                    window,
                    ["scroll", "resize", "orientationchange"],
                    new o.a.Sidebar.Position(
                      "[data-md-component=navigation]",
                      "[data-md-component=header]"
                    )
                  )
                ),
                document.querySelector("[data-md-component=toc]") &&
                  new o.a.Event.MatchMedia(
                    "(min-width: 960px)",
                    new o.a.Event.Listener(
                      window,
                      ["scroll", "resize", "orientationchange"],
                      new o.a.Sidebar.Position(
                        "[data-md-component=toc]",
                        "[data-md-component=header]"
                      )
                    )
                  ),
                new o.a.Event.MatchMedia(
                  "(min-width: 960px)",
                  new o.a.Event.Listener(
                    window,
                    "scroll",
                    new o.a.Nav.Blur("[data-md-component=toc] .md-nav__link")
                  )
                );
              var t = document.querySelectorAll(
                "[data-md-component=collapsible]"
              );
              Array.prototype.forEach.call(t, function (e) {
                new o.a.Event.MatchMedia(
                  "(min-width: 1220px)",
                  new o.a.Event.Listener(
                    e.previousElementSibling,
                    "click",
                    new o.a.Nav.Collapse(e)
                  )
                );
              }),
                new o.a.Event.MatchMedia(
                  "(max-width: 1219px)",
                  new o.a.Event.Listener(
                    "[data-md-component=navigation] [data-md-toggle]",
                    "change",
                    new o.a.Nav.Scrolling("[data-md-component=navigation] nav")
                  )
                ),
                document.querySelector("[data-md-component=search]") &&
                  (new o.a.Event.MatchMedia(
                    "(max-width: 959px)",
                    new o.a.Event.Listener(
                      "[data-md-toggle=search]",
                      "change",
                      new o.a.Search.Lock("[data-md-toggle=search]")
                    )
                  ),
                  new o.a.Event.Listener(
                    "[data-md-component=query]",
                    ["focus", "keyup", "change"],
                    new o.a.Search.Result(
                      "[data-md-component=result]",
                      e.url.base
                    )
                  ).listen(),
                  new o.a.Event.Listener(
                    "[data-md-component=reset]",
                    "click",
                    function () {
                      setTimeout(function () {
                        var e = document.querySelector(
                          "[data-md-component=query]"
                        );
                        if (!(e instanceof HTMLInputElement))
                          throw new ReferenceError();
                        e.focus();
                      }, 10);
                    }
                  ).listen(),
                  new o.a.Event.Listener(
                    "[data-md-toggle=search]",
                    "change",
                    function (e) {
                      setTimeout(
                        function (e) {
                          if (!(e instanceof HTMLInputElement))
                            throw new ReferenceError();
                          if (e.checked) {
                            var t = document.querySelector(
                              "[data-md-component=query]"
                            );
                            if (!(t instanceof HTMLInputElement))
                              throw new ReferenceError();
                            t.focus();
                          }
                        },
                        400,
                        e.target
                      );
                    }
                  ).listen(),
                  new o.a.Event.Listener(
                    "[data-md-component=query]",
                    "focus",
                    function () {
                      var e = document.querySelector("[data-md-toggle=search]");
                      if (!(e instanceof HTMLInputElement))
                        throw new ReferenceError();
                      e.checked ||
                        ((e.checked = !0),
                        e.dispatchEvent(new CustomEvent("change")));
                    }
                  ).listen(),
                  new o.a.Event.Listener(window, "keydown", function (e) {
                    var t = document.querySelector("[data-md-toggle=search]");
                    if (!(t instanceof HTMLInputElement))
                      throw new ReferenceError();
                    var n = document.querySelector("[data-md-component=query]");
                    if (!(n instanceof HTMLInputElement))
                      throw new ReferenceError();
                    if (
                      !(
                        (document.activeElement instanceof HTMLElement &&
                          document.activeElement.isContentEditable) ||
                        e.metaKey ||
                        e.ctrlKey
                      )
                    )
                      if (t.checked) {
                        if (13 === e.keyCode) {
                          if (n === document.activeElement) {
                            e.preventDefault();
                            var r = document.querySelector(
                              "[data-md-component=search] [href][data-md-state=active]"
                            );
                            r instanceof HTMLLinkElement &&
                              ((window.location = r.getAttribute("href")),
                              (t.checked = !1),
                              t.dispatchEvent(new CustomEvent("change")),
                              n.blur());
                          }
                        } else if (9 === e.keyCode || 27 === e.keyCode)
                          (t.checked = !1),
                            t.dispatchEvent(new CustomEvent("change")),
                            n.blur();
                        else if (-1 !== [8, 37, 39].indexOf(e.keyCode))
                          n !== document.activeElement && n.focus();
                        else if (-1 !== [38, 40].indexOf(e.keyCode)) {
                          var o = e.keyCode,
                            i = Array.prototype.slice.call(
                              document.querySelectorAll(
                                "[data-md-component=query], [data-md-component=search] [href]"
                              )
                            ),
                            a = i.find(function (e) {
                              if (!(e instanceof HTMLElement))
                                throw new ReferenceError();
                              return "active" === e.dataset.mdState;
                            });
                          a && (a.dataset.mdState = "");
                          var c = Math.max(
                            0,
                            (i.indexOf(a) + i.length + (38 === o ? -1 : 1)) %
                              i.length
                          );
                          return (
                            i[c] &&
                              ((i[c].dataset.mdState = "active"), i[c].focus()),
                            e.preventDefault(),
                            e.stopPropagation(),
                            !1
                          );
                        }
                      } else if (
                        document.activeElement &&
                        !document.activeElement.form
                      ) {
                        if (
                          "TEXTAREA" === document.activeElement.tagName ||
                          "INPUT" === document.activeElement.tagName
                        )
                          return;
                        (70 !== e.keyCode && 83 !== e.keyCode) ||
                          (n.focus(), e.preventDefault());
                      }
                  }).listen(),
                  new o.a.Event.Listener(window, "keypress", function () {
                    var e = document.querySelector("[data-md-toggle=search]");
                    if (!(e instanceof HTMLInputElement))
                      throw new ReferenceError();
                    if (e.checked) {
                      var t = document.querySelector(
                        "[data-md-component=query]"
                      );
                      if (!(t instanceof HTMLInputElement))
                        throw new ReferenceError();
                      t !== document.activeElement && t.focus();
                    }
                  }).listen()),
                new o.a.Event.Listener(document.body, "keydown", function (e) {
                  if (9 === e.keyCode) {
                    var t = document.querySelectorAll(
                      "[data-md-component=navigation] .md-nav__link[for]:not([tabindex])"
                    );
                    Array.prototype.forEach.call(t, function (e) {
                      e.offsetHeight && (e.tabIndex = 0);
                    });
                  }
                }).listen(),
                new o.a.Event.Listener(document.body, "mousedown", function () {
                  var e = document.querySelectorAll(
                    "[data-md-component=navigation] .md-nav__link[tabindex]"
                  );
                  Array.prototype.forEach.call(e, function (e) {
                    e.removeAttribute("tabIndex");
                  });
                }).listen(),
                document.body.addEventListener("click", function () {
                  "tabbing" === document.body.dataset.mdState &&
                    (document.body.dataset.mdState = "");
                }),
                new o.a.Event.MatchMedia(
                  "(max-width: 959px)",
                  new o.a.Event.Listener(
                    "[data-md-component=navigation] [href^='#']",
                    "click",
                    function () {
                      var e = document.querySelector("[data-md-toggle=drawer]");
                      if (!(e instanceof HTMLInputElement))
                        throw new ReferenceError();
                      e.checked &&
                        ((e.checked = !1),
                        e.dispatchEvent(new CustomEvent("change")));
                    }
                  )
                ),
                (function () {
                  var e = document.querySelector("[data-md-source]");
                  if (!e) return r.a.resolve([]);
                  if (!(e instanceof HTMLAnchorElement))
                    throw new ReferenceError();
                  switch (e.dataset.mdSource) {
                    case "github":
                      return new o.a.Source.Adapter.GitHub(e).fetch();
                    default:
                      return r.a.resolve([]);
                  }
                })().then(function (t) {
                  var e = document.querySelectorAll("[data-md-source]");
                  Array.prototype.forEach.call(e, function (e) {
                    new o.a.Source.Repository(e).initialize(t);
                  });
                });
              var n = function () {
                var e = document.querySelectorAll("details");
                Array.prototype.forEach.call(e, function (e) {
                  e.setAttribute("open", "");
                });
              };
              new o.a.Event.MatchMedia("print", {
                listen: n,
                unlisten: function () {},
              }),
                (window.onbeforeprint = n);
            },
          };
        }.call(this, s(2));
    },
    function (e, t, n) {
      e.exports = n.p + "assets/images/icons/bitbucket.1b09e088.svg";
    },
    function (e, t, n) {
      e.exports = n.p + "assets/images/icons/github.f0b8504a.svg";
    },
    function (e, t, n) {
      e.exports = n.p + "assets/images/icons/gitlab.6dd19c00.svg";
    },
    function (e, t) {
      e.exports =
        "/Users/Menci/Projects/OI-wiki/mkdocs-material/material/application.6f7cfa25.css";
    },
    function (e, t) {
      e.exports =
        "/Users/Menci/Projects/OI-wiki/mkdocs-material/material/application-palette.a8b3c06d.css";
    },
    function (e, t) {
      !(function () {
        if ("undefined" != typeof window)
          try {
            var e = new window.CustomEvent("test", { cancelable: !0 });
            if ((e.preventDefault(), !0 !== e.defaultPrevented))
              throw new Error("Could not prevent default");
          } catch (e) {
            var t = function (e, t) {
              var n, r;
              return (
                ((t = t || {}).bubbles = !!t.bubbles),
                (t.cancelable = !!t.cancelable),
                (n = document.createEvent("CustomEvent")).initCustomEvent(
                  e,
                  t.bubbles,
                  t.cancelable,
                  t.detail
                ),
                (r = n.preventDefault),
                (n.preventDefault = function () {
                  r.call(this);
                  try {
                    Object.defineProperty(this, "defaultPrevented", {
                      get: function () {
                        return !0;
                      },
                    });
                  } catch (e) {
                    this.defaultPrevented = !0;
                  }
                }),
                n
              );
            };
            (t.prototype = window.Event.prototype), (window.CustomEvent = t);
          }
      })();
    },
    function (e, t, n) {
      window.fetch || (window.fetch = n(5).default || n(5));
    },
    function (e, o, i) {
      (function (e) {
        var t =
            (void 0 !== e && e) ||
            ("undefined" != typeof self && self) ||
            window,
          n = Function.prototype.apply;
        function r(e, t) {
          (this._id = e), (this._clearFn = t);
        }
        (o.setTimeout = function () {
          return new r(n.call(setTimeout, t, arguments), clearTimeout);
        }),
          (o.setInterval = function () {
            return new r(n.call(setInterval, t, arguments), clearInterval);
          }),
          (o.clearTimeout = o.clearInterval =
            function (e) {
              e && e.close();
            }),
          (r.prototype.unref = r.prototype.ref = function () {}),
          (r.prototype.close = function () {
            this._clearFn.call(t, this._id);
          }),
          (o.enroll = function (e, t) {
            clearTimeout(e._idleTimeoutId), (e._idleTimeout = t);
          }),
          (o.unenroll = function (e) {
            clearTimeout(e._idleTimeoutId), (e._idleTimeout = -1);
          }),
          (o._unrefActive = o.active =
            function (e) {
              clearTimeout(e._idleTimeoutId);
              var t = e._idleTimeout;
              0 <= t &&
                (e._idleTimeoutId = setTimeout(function () {
                  e._onTimeout && e._onTimeout();
                }, t));
            }),
          i(21),
          (o.setImmediate =
            ("undefined" != typeof self && self.setImmediate) ||
            (void 0 !== e && e.setImmediate) ||
            (this && this.setImmediate)),
          (o.clearImmediate =
            ("undefined" != typeof self && self.clearImmediate) ||
            (void 0 !== e && e.clearImmediate) ||
            (this && this.clearImmediate));
      }.call(this, i(6)));
    },
    function (e, t, n) {
      (function (e, p) {
        !(function (n, r) {
          "use strict";
          if (!n.setImmediate) {
            var o,
              i,
              t,
              a,
              e,
              c = 1,
              s = {},
              l = !1,
              u = n.document,
              f = Object.getPrototypeOf && Object.getPrototypeOf(n);
            (f = f && f.setTimeout ? f : n),
              (o =
                "[object process]" === {}.toString.call(n.process)
                  ? function (e) {
                      p.nextTick(function () {
                        h(e);
                      });
                    }
                  : (function () {
                      if (n.postMessage && !n.importScripts) {
                        var e = !0,
                          t = n.onmessage;
                        return (
                          (n.onmessage = function () {
                            e = !1;
                          }),
                          n.postMessage("", "*"),
                          (n.onmessage = t),
                          e
                        );
                      }
                    })()
                  ? ((a = "setImmediate$" + Math.random() + "$"),
                    (e = function (e) {
                      e.source === n &&
                        "string" == typeof e.data &&
                        0 === e.data.indexOf(a) &&
                        h(+e.data.slice(a.length));
                    }),
                    n.addEventListener
                      ? n.addEventListener("message", e, !1)
                      : n.attachEvent("onmessage", e),
                    function (e) {
                      n.postMessage(a + e, "*");
                    })
                  : n.MessageChannel
                  ? (((t = new MessageChannel()).port1.onmessage = function (
                      e
                    ) {
                      h(e.data);
                    }),
                    function (e) {
                      t.port2.postMessage(e);
                    })
                  : u && "onreadystatechange" in u.createElement("script")
                  ? ((i = u.documentElement),
                    function (e) {
                      var t = u.createElement("script");
                      (t.onreadystatechange = function () {
                        h(e),
                          (t.onreadystatechange = null),
                          i.removeChild(t),
                          (t = null);
                      }),
                        i.appendChild(t);
                    })
                  : function (e) {
                      setTimeout(h, 0, e);
                    }),
              (f.setImmediate = function (e) {
                "function" != typeof e && (e = new Function("" + e));
                for (
                  var t = new Array(arguments.length - 1), n = 0;
                  n < t.length;
                  n++
                )
                  t[n] = arguments[n + 1];
                var r = { callback: e, args: t };
                return (s[c] = r), o(c), c++;
              }),
              (f.clearImmediate = d);
          }
          function d(e) {
            delete s[e];
          }
          function h(e) {
            if (l) setTimeout(h, 0, e);
            else {
              var t = s[e];
              if (t) {
                l = !0;
                try {
                  !(function (e) {
                    var t = e.callback,
                      n = e.args;
                    switch (n.length) {
                      case 0:
                        t();
                        break;
                      case 1:
                        t(n[0]);
                        break;
                      case 2:
                        t(n[0], n[1]);
                        break;
                      case 3:
                        t(n[0], n[1], n[2]);
                        break;
                      default:
                        t.apply(r, n);
                    }
                  })(t);
                } finally {
                  d(e), (l = !1);
                }
              }
            }
          }
        })("undefined" == typeof self ? (void 0 === e ? this : e) : self);
      }.call(this, n(6), n(22)));
    },
    function (e, t) {
      var n,
        r,
        o = (e.exports = {});
      function i() {
        throw new Error("setTimeout has not been defined");
      }
      function a() {
        throw new Error("clearTimeout has not been defined");
      }
      function c(t) {
        if (n === setTimeout) return setTimeout(t, 0);
        if ((n === i || !n) && setTimeout)
          return (n = setTimeout), setTimeout(t, 0);
        try {
          return n(t, 0);
        } catch (e) {
          try {
            return n.call(null, t, 0);
          } catch (e) {
            return n.call(this, t, 0);
          }
        }
      }
      !(function () {
        try {
          n = "function" == typeof setTimeout ? setTimeout : i;
        } catch (e) {
          n = i;
        }
        try {
          r = "function" == typeof clearTimeout ? clearTimeout : a;
        } catch (e) {
          r = a;
        }
      })();
      var s,
        l = [],
        u = !1,
        f = -1;
      function d() {
        u &&
          s &&
          ((u = !1), s.length ? (l = s.concat(l)) : (f = -1), l.length && h());
      }
      function h() {
        if (!u) {
          var e = c(d);
          u = !0;
          for (var t = l.length; t; ) {
            for (s = l, l = []; ++f < t; ) s && s[f].run();
            (f = -1), (t = l.length);
          }
          (s = null),
            (u = !1),
            (function (t) {
              if (r === clearTimeout) return clearTimeout(t);
              if ((r === a || !r) && clearTimeout)
                return (r = clearTimeout), clearTimeout(t);
              try {
                r(t);
              } catch (e) {
                try {
                  return r.call(null, t);
                } catch (e) {
                  return r.call(this, t);
                }
              }
            })(e);
        }
      }
      function p(e, t) {
        (this.fun = e), (this.array = t);
      }
      function m() {}
      (o.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (1 < arguments.length)
          for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        l.push(new p(e, t)), 1 !== l.length || u || c(h);
      }),
        (p.prototype.run = function () {
          this.fun.apply(null, this.array);
        }),
        (o.title = "browser"),
        (o.browser = !0),
        (o.env = {}),
        (o.argv = []),
        (o.version = ""),
        (o.versions = {}),
        (o.on = m),
        (o.addListener = m),
        (o.once = m),
        (o.off = m),
        (o.removeListener = m),
        (o.removeAllListeners = m),
        (o.emit = m),
        (o.prependListener = m),
        (o.prependOnceListener = m),
        (o.listeners = function (e) {
          return [];
        }),
        (o.binding = function (e) {
          throw new Error("process.binding is not supported");
        }),
        (o.cwd = function () {
          return "/";
        }),
        (o.chdir = function (e) {
          throw new Error("process.chdir is not supported");
        }),
        (o.umask = function () {
          return 0;
        });
    },
    function (e, t, n) {
      "use strict";
      var r = /[|\\{}()[\]^$+*?.]/g;
      e.exports = function (e) {
        if ("string" != typeof e) throw new TypeError("Expected a string");
        return e.replace(r, "\\$&");
      };
    },
  ])
);
