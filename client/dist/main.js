/*!
 * commitVersion: c12d9fa
 * Build Date: 2020. 7. 16. 오후 4:24:42
 * Author: younho9
 *
 */ !(function (n) {
  var e = {};
  function t(r) {
    if (e[r]) return e[r].exports;
    var o = (e[r] = { i: r, l: !1, exports: {} });
    return n[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
  }
  (t.m = n),
    (t.c = e),
    (t.d = function (n, e, r) {
      t.o(n, e) || Object.defineProperty(n, e, { enumerable: !0, get: r });
    }),
    (t.r = function (n) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(n, '__esModule', { value: !0 });
    }),
    (t.t = function (n, e) {
      if ((1 & e && (n = t(n)), 8 & e)) return n;
      if (4 & e && 'object' == typeof n && n && n.__esModule) return n;
      var r = Object.create(null);
      if (
        (t.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: n }),
        2 & e && 'string' != typeof n)
      )
        for (var o in n)
          t.d(
            r,
            o,
            function (e) {
              return n[e];
            }.bind(null, o),
          );
      return r;
    }),
    (t.n = function (n) {
      var e =
        n && n.__esModule
          ? function () {
              return n.default;
            }
          : function () {
              return n;
            };
      return t.d(e, 'a', e), e;
    }),
    (t.o = function (n, e) {
      return Object.prototype.hasOwnProperty.call(n, e);
    }),
    (t.p = ''),
    t((t.s = 3));
})([
  function (n, e, t) {
    'use strict';
    var r,
      o = function () {
        return (
          void 0 === r &&
            (r = Boolean(window && document && document.all && !window.atob)),
          r
        );
      },
      i = (function () {
        var n = {};
        return function (e) {
          if (void 0 === n[e]) {
            var t = document.querySelector(e);
            if (
              window.HTMLIFrameElement &&
              t instanceof window.HTMLIFrameElement
            )
              try {
                t = t.contentDocument.head;
              } catch (n) {
                t = null;
              }
            n[e] = t;
          }
          return n[e];
        };
      })(),
      a = [];
    function c(n) {
      for (var e = -1, t = 0; t < a.length; t++)
        if (a[t].identifier === n) {
          e = t;
          break;
        }
      return e;
    }
    function u(n, e) {
      for (var t = {}, r = [], o = 0; o < n.length; o++) {
        var i = n[o],
          u = e.base ? i[0] + e.base : i[0],
          l = t[u] || 0,
          s = ''.concat(u, ' ').concat(l);
        t[u] = l + 1;
        var d = c(s),
          f = { css: i[1], media: i[2], sourceMap: i[3] };
        -1 !== d
          ? (a[d].references++, a[d].updater(f))
          : a.push({ identifier: s, updater: m(f, e), references: 1 }),
          r.push(s);
      }
      return r;
    }
    function l(n) {
      var e = document.createElement('style'),
        r = n.attributes || {};
      if (void 0 === r.nonce) {
        var o = t.nc;
        o && (r.nonce = o);
      }
      if (
        (Object.keys(r).forEach(function (n) {
          e.setAttribute(n, r[n]);
        }),
        'function' == typeof n.insert)
      )
        n.insert(e);
      else {
        var a = i(n.insert || 'head');
        if (!a)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
          );
        a.appendChild(e);
      }
      return e;
    }
    var s,
      d =
        ((s = []),
        function (n, e) {
          return (s[n] = e), s.filter(Boolean).join('\n');
        });
    function f(n, e, t, r) {
      var o = t
        ? ''
        : r.media
        ? '@media '.concat(r.media, ' {').concat(r.css, '}')
        : r.css;
      if (n.styleSheet) n.styleSheet.cssText = d(e, o);
      else {
        var i = document.createTextNode(o),
          a = n.childNodes;
        a[e] && n.removeChild(a[e]),
          a.length ? n.insertBefore(i, a[e]) : n.appendChild(i);
      }
    }
    function p(n, e, t) {
      var r = t.css,
        o = t.media,
        i = t.sourceMap;
      if (
        (o ? n.setAttribute('media', o) : n.removeAttribute('media'),
        i &&
          btoa &&
          (r += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
            btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
            ' */',
          )),
        n.styleSheet)
      )
        n.styleSheet.cssText = r;
      else {
        for (; n.firstChild; ) n.removeChild(n.firstChild);
        n.appendChild(document.createTextNode(r));
      }
    }
    var h = null,
      b = 0;
    function m(n, e) {
      var t, r, o;
      if (e.singleton) {
        var i = b++;
        (t = h || (h = l(e))),
          (r = f.bind(null, t, i, !1)),
          (o = f.bind(null, t, i, !0));
      } else
        (t = l(e)),
          (r = p.bind(null, t, e)),
          (o = function () {
            !(function (n) {
              if (null === n.parentNode) return !1;
              n.parentNode.removeChild(n);
            })(t);
          });
      return (
        r(n),
        function (e) {
          if (e) {
            if (
              e.css === n.css &&
              e.media === n.media &&
              e.sourceMap === n.sourceMap
            )
              return;
            r((n = e));
          } else o();
        }
      );
    }
    n.exports = function (n, e) {
      (e = e || {}).singleton ||
        'boolean' == typeof e.singleton ||
        (e.singleton = o());
      var t = u((n = n || []), e);
      return function (n) {
        if (
          ((n = n || []),
          '[object Array]' === Object.prototype.toString.call(n))
        ) {
          for (var r = 0; r < t.length; r++) {
            var o = c(t[r]);
            a[o].references--;
          }
          for (var i = u(n, e), l = 0; l < t.length; l++) {
            var s = c(t[l]);
            0 === a[s].references && (a[s].updater(), a.splice(s, 1));
          }
          t = i;
        }
      };
    };
  },
  function (n, e, t) {
    (e = t(2)(!1)).push([
      n.i,
      "html, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}",
      '',
    ]),
      (n.exports = e);
  },
  function (n, e, t) {
    'use strict';
    n.exports = function (n) {
      var e = [];
      return (
        (e.toString = function () {
          return this.map(function (e) {
            var t = (function (n, e) {
              var t = n[1] || '',
                r = n[3];
              if (!r) return t;
              if (e && 'function' == typeof btoa) {
                var o =
                    ((a = r),
                    (c = btoa(unescape(encodeURIComponent(JSON.stringify(a))))),
                    (u = 'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(
                      c,
                    )),
                    '/*# '.concat(u, ' */')),
                  i = r.sources.map(function (n) {
                    return '/*# sourceURL='
                      .concat(r.sourceRoot || '')
                      .concat(n, ' */');
                  });
                return [t].concat(i).concat([o]).join('\n');
              }
              var a, c, u;
              return [t].join('\n');
            })(e, n);
            return e[2] ? '@media '.concat(e[2], ' {').concat(t, '}') : t;
          }).join('');
        }),
        (e.i = function (n, t, r) {
          'string' == typeof n && (n = [[null, n, '']]);
          var o = {};
          if (r)
            for (var i = 0; i < this.length; i++) {
              var a = this[i][0];
              null != a && (o[a] = !0);
            }
          for (var c = 0; c < n.length; c++) {
            var u = [].concat(n[c]);
            (r && o[u[0]]) ||
              (t &&
                (u[2]
                  ? (u[2] = ''.concat(t, ' and ').concat(u[2]))
                  : (u[2] = t)),
              e.push(u));
          }
        }),
        e
      );
    };
  },
  function (n, e, t) {
    'use strict';
    t.r(e);
    t(4), t(5);
  },
  function (n, e, t) {
    var r = t(0),
      o = t(1);
    'string' == typeof (o = o.__esModule ? o.default : o) &&
      (o = [[n.i, o, '']]);
    var i = { insert: 'head', singleton: !1 };
    r(o, i);
    n.exports = o.locals || {};
  },
  function (n, e, t) {
    var r = t(0),
      o = t(6);
    'string' == typeof (o = o.__esModule ? o.default : o) &&
      (o = [[n.i, o, '']]);
    var i = { insert: 'head', singleton: !1 };
    r(o, i);
    n.exports = o.locals || {};
  },
  function (n, e, t) {
    var r = t(2),
      o = t(1);
    (e = r(!1)).i(o),
      e.push([
        n.i,
        ':root {\n    --black: #24292e;\n    --gray: #eff1f3;\n    --white: #ffffff;\n    --small-device-width: 544px;\n  }\n  \n* {\n    box-sizing: border-box;\n}\n\nhtml {\n    width: 100%;\n    height: 100%;\n}\n\nbody {\n    width: 100%;\n    height: 100%;\n}\n\n.header{\n    height: 58px;\n    background-color: var(--black);\n\n    overflow: auto;\n}\n\n.task-columns {\n    display: flex;\n    height: 100%;\n    padding: 16px;\n    flex-direction: row;\n    overflow: auto;\n}\n\n.task-column {\n    min-width: 330px;\n    border-radius: 6px;\n    padding: 8px;\n    background-color: var(--gray);\n    ;\n    margin-right: 16px;\n}\n\n.task-column-header {\n    min-height: 38px;\n    padding: 16px 0px 16px;\n}\n\n.task-column-card {\n    min-height: 104px;\n    border-radius: 4px;\n    padding: 3px 0px 8px;\n    background-color: var(--white);\n}\n\n@media (max-width: 544px){\n    .task-columns {\n        flex-direction: column;\n    }\n\n    .task-column {\n        margin-right: 0px;\n        margin-bottom: 16px;\n    }\n}',
        '',
      ]),
      (n.exports = e);
  },
]);
