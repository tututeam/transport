(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND",
                    f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports,
                function(e) {
                    var n = t[o][1][e];
                    return s(n ? n: e)
                },
                l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
        1 : [function(require, module, exports) {
            function corslite(n, o, t) {
                function i(n) {
                    return n >= 200 && n < 300 || 304 === n
                }
                function e() {
                    void 0 === r.status || i(r.status) ? o.call(r, null, r) : o.call(r, r, null)
                }
                var l = !1;
                if (void 0 === window.XMLHttpRequest) return o(Error("Browser not supported"));
                if (void 0 === t) {
                    var u = n.match(/^\s*https?:\/\/[^\/]*/);
                    t = u && u[0] !== location.protocol + "//" + location.domain + (location.port ? ":" + location.port: "")
                }
                var r = new window.XMLHttpRequest;
                if (t && !("withCredentials" in r)) {
                    r = new window.XDomainRequest;
                    var a = o;
                    o = function() {
                        if (l) a.apply(this, arguments);
                        else {
                            var n = this,
                                o = arguments;
                            setTimeout(function() {
                                    a.apply(n, o)
                                },
                                0)
                        }
                    }
                }
                return "onload" in r ? r.onload = e: r.onreadystatechange = function() {
                    4 === r.readyState && e()
                },
                    r.onerror = function(n) {
                        o.call(this, n || !0, null),
                            o = function() {}
                    },
                    r.onprogress = function() {},
                    r.ontimeout = function(n) {
                        o.call(this, n, null),
                            o = function() {}
                    },
                    r.onabort = function(n) {
                        o.call(this, n, null),
                            o = function() {}
                    },
                    r.open("GET", n, !0),
                    r.send(null),
                    l = !0,
                    r
            }
            "undefined" != typeof module && (module.exports = corslite);
        },
            {}],
        2 : [function(require, module, exports) {
            module.exports = Array.isArray ||
                function(r) {
                    return "[object Array]" == Object.prototype.toString.call(r)
                };
        },
            {}],
        3 : [function(require, module, exports) { !
            function(t, e, i) {
                var o = {
                    version: "1.0.2"
                };
                "object" == typeof module && "object" == typeof module.exports ? module.exports = o: "function" == typeof define && define.amd && define(o),
                void 0 !== t &&
                function() {
                    var e = t.L;
                    o.noConflict = function() {
                        return t.L = e,
                            this
                    },
                        t.L = o
                } (),
                    o.Util = {
                        extend: function(t) {
                            var e, i, o, n;
                            for (i = 1, o = arguments.length; i < o; i++) {
                                n = arguments[i];
                                for (e in n) t[e] = n[e]
                            }
                            return t
                        },
                        create: Object.create ||
                        function() {
                            function t() {}
                            return function(e) {
                                return t.prototype = e,
                                    new t
                            }
                        } (),
                        bind: function(t, e) {
                            var i = Array.prototype.slice;
                            if (t.bind) return t.bind.apply(t, i.call(arguments, 1));
                            var o = i.call(arguments, 2);
                            return function() {
                                return t.apply(e, o.length ? o.concat(i.call(arguments)) : arguments)
                            }
                        },
                        stamp: function(t) {
                            return t._leaflet_id = t._leaflet_id || ++o.Util.lastId,
                                t._leaflet_id
                        },
                        lastId: 0,
                        throttle: function(t, e, i) {
                            var o, n, s, r;
                            return r = function() {
                                o = !1,
                                n && (s.apply(i, n), n = !1)
                            },
                                s = function() {
                                    o ? n = arguments: (t.apply(i, arguments), setTimeout(r, e), o = !0)
                                }
                        },
                        wrapNum: function(t, e, i) {
                            var o = e[1],
                                n = e[0],
                                s = o - n;
                            return t === o && i ? t: ((t - n) % s + s) % s + n
                        },
                        falseFn: function() {
                            return ! 1
                        },
                        formatNum: function(t, e) {
                            var i = Math.pow(10, e || 5);
                            return Math.round(t * i) / i
                        },
                        trim: function(t) {
                            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                        },
                        splitWords: function(t) {
                            return o.Util.trim(t).split(/\s+/)
                        },
                        setOptions: function(t, e) {
                            t.hasOwnProperty("options") || (t.options = t.options ? o.Util.create(t.options) : {});
                            for (var i in e) t.options[i] = e[i];
                            return t.options
                        },
                        getParamString: function(t, e, i) {
                            var o = [];
                            for (var n in t) o.push(encodeURIComponent(i ? n.toUpperCase() : n) + "=" + encodeURIComponent(t[n]));
                            return (e && -1 !== e.indexOf("?") ? "&": "?") + o.join("&")
                        },
                        template: function(t, e) {
                            return t.replace(o.Util.templateRe,
                                function(t, i) {
                                    var o = e[i];
                                    if (void 0 === o) throw new Error("No value provided for variable " + t);
                                    return "function" == typeof o && (o = o(e)),
                                        o
                                })
                        },
                        templateRe: /\{ *([\w_\-]+) *\}/g,
                        isArray: Array.isArray ||
                        function(t) {
                            return "[object Array]" === Object.prototype.toString.call(t)
                        },
                        indexOf: function(t, e) {
                            for (var i = 0; i < t.length; i++) if (t[i] === e) return i;
                            return - 1
                        },
                        emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                    },
                    function() {
                        function e(e) {
                            return t["webkit" + e] || t["moz" + e] || t["ms" + e]
                        }
                        function i(e) {
                            var i = +new Date,
                                o = Math.max(0, 16 - (i - n));
                            return n = i + o,
                                t.setTimeout(e, o)
                        }
                        var n = 0,
                            s = t.requestAnimationFrame || e("RequestAnimationFrame") || i,
                            r = t.cancelAnimationFrame || e("CancelAnimationFrame") || e("CancelRequestAnimationFrame") ||
                                function(e) {
                                    t.clearTimeout(e)
                                };
                        o.Util.requestAnimFrame = function(e, n, r) {
                            if (!r || s !== i) return s.call(t, o.bind(e, n));
                            e.call(n)
                        },
                            o.Util.cancelAnimFrame = function(e) {
                                e && r.call(t, e)
                            }
                    } (),
                    o.extend = o.Util.extend,
                    o.bind = o.Util.bind,
                    o.stamp = o.Util.stamp,
                    o.setOptions = o.Util.setOptions,
                    o.Class = function() {},
                    o.Class.extend = function(t) {
                        var e = function() {
                                this.initialize && this.initialize.apply(this, arguments),
                                    this.callInitHooks()
                            },
                            i = e.__super__ = this.prototype,
                            n = o.Util.create(i);
                        n.constructor = e,
                            e.prototype = n;
                        for (var s in this) this.hasOwnProperty(s) && "prototype" !== s && (e[s] = this[s]);
                        return t.statics && (o.extend(e, t.statics), delete t.statics),
                        t.includes && (o.Util.extend.apply(null, [n].concat(t.includes)), delete t.includes),
                        n.options && (t.options = o.Util.extend(o.Util.create(n.options), t.options)),
                            o.extend(n, t),
                            n._initHooks = [],
                            n.callInitHooks = function() {
                                if (!this._initHooksCalled) {
                                    i.callInitHooks && i.callInitHooks.call(this),
                                        this._initHooksCalled = !0;
                                    for (var t = 0,
                                             e = n._initHooks.length; t < e; t++) n._initHooks[t].call(this)
                                }
                            },
                            e
                    },
                    o.Class.include = function(t) {
                        return o.extend(this.prototype, t),
                            this
                    },
                    o.Class.mergeOptions = function(t) {
                        return o.extend(this.prototype.options, t),
                            this
                    },
                    o.Class.addInitHook = function(t) {
                        var e = Array.prototype.slice.call(arguments, 1),
                            i = "function" == typeof t ? t: function() {
                                this[t].apply(this, e)
                            };
                        return this.prototype._initHooks = this.prototype._initHooks || [],
                            this.prototype._initHooks.push(i),
                            this
                    },
                    o.Evented = o.Class.extend({
                        on: function(t, e, i) {
                            if ("object" == typeof t) for (var n in t) this._on(n, t[n], e);
                            else {
                                t = o.Util.splitWords(t);
                                for (var s = 0,
                                         r = t.length; s < r; s++) this._on(t[s], e, i)
                            }
                            return this
                        },
                        off: function(t, e, i) {
                            if (t) if ("object" == typeof t) for (var n in t) this._off(n, t[n], e);
                            else {
                                t = o.Util.splitWords(t);
                                for (var s = 0,
                                         r = t.length; s < r; s++) this._off(t[s], e, i)
                            } else delete this._events;
                            return this
                        },
                        _on: function(t, e, i) {
                            this._events = this._events || {};
                            var o = this._events[t];
                            o || (o = [], this._events[t] = o),
                            i === this && (i = void 0);
                            for (var n = {
                                    fn: e,
                                    ctx: i
                                },
                                     s = o, r = 0, a = s.length; r < a; r++) if (s[r].fn === e && s[r].ctx === i) return;
                            s.push(n),
                                o.count++
                        },
                        _off: function(t, e, i) {
                            var n, s, r;
                            if (this._events && (n = this._events[t])) {
                                if (!e) {
                                    for (s = 0, r = n.length; s < r; s++) n[s].fn = o.Util.falseFn;
                                    return void delete this._events[t]
                                }
                                if (i === this && (i = void 0), n) for (s = 0, r = n.length; s < r; s++) {
                                    var a = n[s];
                                    if (a.ctx === i && a.fn === e) return a.fn = o.Util.falseFn,
                                    this._firingCount && (this._events[t] = n = n.slice()),
                                        void n.splice(s, 1)
                                }
                            }
                        },
                        fire: function(t, e, i) {
                            if (!this.listens(t, i)) return this;
                            var n = o.Util.extend({},
                                e, {
                                    type: t,
                                    target: this
                                });
                            if (this._events) {
                                var s = this._events[t];
                                if (s) {
                                    this._firingCount = this._firingCount + 1 || 1;
                                    for (var r = 0,
                                             a = s.length; r < a; r++) {
                                        var h = s[r];
                                        h.fn.call(h.ctx || this, n)
                                    }
                                    this._firingCount--
                                }
                            }
                            return i && this._propagateEvent(n),
                                this
                        },
                        listens: function(t, e) {
                            var i = this._events && this._events[t];
                            if (i && i.length) return ! 0;
                            if (e) for (var o in this._eventParents) if (this._eventParents[o].listens(t, e)) return ! 0;
                            return ! 1
                        },
                        once: function(t, e, i) {
                            if ("object" == typeof t) {
                                for (var n in t) this.once(n, t[n], e);
                                return this
                            }
                            var s = o.bind(function() {
                                    this.off(t, e, i).off(t, s, i)
                                },
                                this);
                            return this.on(t, e, i).on(t, s, i)
                        },
                        addEventParent: function(t) {
                            return this._eventParents = this._eventParents || {},
                                this._eventParents[o.stamp(t)] = t,
                                this
                        },
                        removeEventParent: function(t) {
                            return this._eventParents && delete this._eventParents[o.stamp(t)],
                                this
                        },
                        _propagateEvent: function(t) {
                            for (var e in this._eventParents) this._eventParents[e].fire(t.type, o.extend({
                                    layer: t.target
                                },
                                t), !0)
                        }
                    });
                var n = o.Evented.prototype;
                n.addEventListener = n.on,
                    n.removeEventListener = n.clearAllEventListeners = n.off,
                    n.addOneTimeEventListener = n.once,
                    n.fireEvent = n.fire,
                    n.hasEventListeners = n.listens,
                    o.Mixin = {
                        Events: n
                    },
                    function() {
                        var i = navigator.userAgent.toLowerCase(),
                            n = e.documentElement,
                            s = "ActiveXObject" in t,
                            r = -1 !== i.indexOf("webkit"),
                            a = -1 !== i.indexOf("phantom"),
                            h = -1 !== i.search("android [23]"),
                            l = -1 !== i.indexOf("chrome"),
                            u = -1 !== i.indexOf("gecko") && !r && !t.opera && !s,
                            c = 0 === navigator.platform.indexOf("Win"),
                            d = "undefined" != typeof orientation || -1 !== i.indexOf("mobile"),
                            _ = !t.PointerEvent && t.MSPointerEvent,
                            m = t.PointerEvent || _,
                            p = s && "transition" in n.style,
                            f = "WebKitCSSMatrix" in t && "m11" in new t.WebKitCSSMatrix && !h,
                            g = "MozPerspective" in n.style,
                            v = "OTransition" in n.style,
                            y = !t.L_NO_TOUCH && (m || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch);
                        o.Browser = {
                            ie: s,
                            ielt9: s && !e.addEventListener,
                            edge: "msLaunchUri" in navigator && !("documentMode" in e),
                            webkit: r,
                            gecko: u,
                            android: -1 !== i.indexOf("android"),
                            android23: h,
                            chrome: l,
                            safari: !l && -1 !== i.indexOf("safari"),
                            win: c,
                            ie3d: p,
                            webkit3d: f,
                            gecko3d: g,
                            opera12: v,
                            any3d: !t.L_DISABLE_3D && (p || f || g) && !v && !a,
                            mobile: d,
                            mobileWebkit: d && r,
                            mobileWebkit3d: d && f,
                            mobileOpera: d && t.opera,
                            mobileGecko: d && u,
                            touch: !!y,
                            msPointer: !!_,
                            pointer: !!m,
                            retina: (t.devicePixelRatio || t.screen.deviceXDPI / t.screen.logicalXDPI) > 1
                        }
                    } (),
                    o.Point = function(t, e, i) {
                        this.x = i ? Math.round(t) : t,
                            this.y = i ? Math.round(e) : e
                    },
                    o.Point.prototype = {
                        clone: function() {
                            return new o.Point(this.x, this.y)
                        },
                        add: function(t) {
                            return this.clone()._add(o.point(t))
                        },
                        _add: function(t) {
                            return this.x += t.x,
                                this.y += t.y,
                                this
                        },
                        subtract: function(t) {
                            return this.clone()._subtract(o.point(t))
                        },
                        _subtract: function(t) {
                            return this.x -= t.x,
                                this.y -= t.y,
                                this
                        },
                        divideBy: function(t) {
                            return this.clone()._divideBy(t)
                        },
                        _divideBy: function(t) {
                            return this.x /= t,
                                this.y /= t,
                                this
                        },
                        multiplyBy: function(t) {
                            return this.clone()._multiplyBy(t)
                        },
                        _multiplyBy: function(t) {
                            return this.x *= t,
                                this.y *= t,
                                this
                        },
                        scaleBy: function(t) {
                            return new o.Point(this.x * t.x, this.y * t.y)
                        },
                        unscaleBy: function(t) {
                            return new o.Point(this.x / t.x, this.y / t.y)
                        },
                        round: function() {
                            return this.clone()._round()
                        },
                        _round: function() {
                            return this.x = Math.round(this.x),
                                this.y = Math.round(this.y),
                                this
                        },
                        floor: function() {
                            return this.clone()._floor()
                        },
                        _floor: function() {
                            return this.x = Math.floor(this.x),
                                this.y = Math.floor(this.y),
                                this
                        },
                        ceil: function() {
                            return this.clone()._ceil()
                        },
                        _ceil: function() {
                            return this.x = Math.ceil(this.x),
                                this.y = Math.ceil(this.y),
                                this
                        },
                        distanceTo: function(t) {
                            t = o.point(t);
                            var e = t.x - this.x,
                                i = t.y - this.y;
                            return Math.sqrt(e * e + i * i)
                        },
                        equals: function(t) {
                            return t = o.point(t),
                            t.x === this.x && t.y === this.y
                        },
                        contains: function(t) {
                            return t = o.point(t),
                            Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
                        },
                        toString: function() {
                            return "Point(" + o.Util.formatNum(this.x) + ", " + o.Util.formatNum(this.y) + ")"
                        }
                    },
                    o.point = function(t, e, i) {
                        return t instanceof o.Point ? t: o.Util.isArray(t) ? new o.Point(t[0], t[1]) : void 0 === t || null === t ? t: "object" == typeof t && "x" in t && "y" in t ? new o.Point(t.x, t.y) : new o.Point(t, e, i)
                    },
                    o.Bounds = function(t, e) {
                        if (t) for (var i = e ? [t, e] : t, o = 0, n = i.length; o < n; o++) this.extend(i[o])
                    },
                    o.Bounds.prototype = {
                        extend: function(t) {
                            return t = o.point(t),
                                this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()),
                                this
                        },
                        getCenter: function(t) {
                            return new o.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
                        },
                        getBottomLeft: function() {
                            return new o.Point(this.min.x, this.max.y)
                        },
                        getTopRight: function() {
                            return new o.Point(this.max.x, this.min.y)
                        },
                        getSize: function() {
                            return this.max.subtract(this.min)
                        },
                        contains: function(t) {
                            var e, i;
                            return t = "number" == typeof t[0] || t instanceof o.Point ? o.point(t) : o.bounds(t),
                                t instanceof o.Bounds ? (e = t.min, i = t.max) : e = i = t,
                            e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y
                        },
                        intersects: function(t) {
                            t = o.bounds(t);
                            var e = this.min,
                                i = this.max,
                                n = t.min,
                                s = t.max,
                                r = s.x >= e.x && n.x <= i.x,
                                a = s.y >= e.y && n.y <= i.y;
                            return r && a
                        },
                        overlaps: function(t) {
                            t = o.bounds(t);
                            var e = this.min,
                                i = this.max,
                                n = t.min,
                                s = t.max,
                                r = s.x > e.x && n.x < i.x,
                                a = s.y > e.y && n.y < i.y;
                            return r && a
                        },
                        isValid: function() {
                            return ! (!this.min || !this.max)
                        }
                    },
                    o.bounds = function(t, e) {
                        return ! t || t instanceof o.Bounds ? t: new o.Bounds(t, e)
                    },
                    o.Transformation = function(t, e, i, o) {
                        this._a = t,
                            this._b = e,
                            this._c = i,
                            this._d = o
                    },
                    o.Transformation.prototype = {
                        transform: function(t, e) {
                            return this._transform(t.clone(), e)
                        },
                        _transform: function(t, e) {
                            return e = e || 1,
                                t.x = e * (this._a * t.x + this._b),
                                t.y = e * (this._c * t.y + this._d),
                                t
                        },
                        untransform: function(t, e) {
                            return e = e || 1,
                                new o.Point((t.x / e - this._b) / this._a, (t.y / e - this._d) / this._c)
                        }
                    },
                    o.DomUtil = {
                        get: function(t) {
                            return "string" == typeof t ? e.getElementById(t) : t
                        },
                        getStyle: function(t, i) {
                            var o = t.style[i] || t.currentStyle && t.currentStyle[i];
                            if ((!o || "auto" === o) && e.defaultView) {
                                var n = e.defaultView.getComputedStyle(t, null);
                                o = n ? n[i] : null
                            }
                            return "auto" === o ? null: o
                        },
                        create: function(t, i, o) {
                            var n = e.createElement(t);
                            return n.className = i || "",
                            o && o.appendChild(n),
                                n
                        },
                        remove: function(t) {
                            var e = t.parentNode;
                            e && e.removeChild(t)
                        },
                        empty: function(t) {
                            for (; t.firstChild;) t.removeChild(t.firstChild)
                        },
                        toFront: function(t) {
                            t.parentNode.appendChild(t)
                        },
                        toBack: function(t) {
                            var e = t.parentNode;
                            e.insertBefore(t, e.firstChild)
                        },
                        hasClass: function(t, e) {
                            if (void 0 !== t.classList) return t.classList.contains(e);
                            var i = o.DomUtil.getClass(t);
                            return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i)
                        },
                        addClass: function(t, e) {
                            if (void 0 !== t.classList) for (var i = o.Util.splitWords(e), n = 0, s = i.length; n < s; n++) t.classList.add(i[n]);
                            else if (!o.DomUtil.hasClass(t, e)) {
                                var r = o.DomUtil.getClass(t);
                                o.DomUtil.setClass(t, (r ? r + " ": "") + e)
                            }
                        },
                        removeClass: function(t, e) {
                            void 0 !== t.classList ? t.classList.remove(e) : o.DomUtil.setClass(t, o.Util.trim((" " + o.DomUtil.getClass(t) + " ").replace(" " + e + " ", " ")))
                        },
                        setClass: function(t, e) {
                            void 0 === t.className.baseVal ? t.className = e: t.className.baseVal = e
                        },
                        getClass: function(t) {
                            return void 0 === t.className.baseVal ? t.className: t.className.baseVal
                        },
                        setOpacity: function(t, e) {
                            "opacity" in t.style ? t.style.opacity = e: "filter" in t.style && o.DomUtil._setOpacityIE(t, e)
                        },
                        _setOpacityIE: function(t, e) {
                            var i = !1,
                                o = "DXImageTransform.Microsoft.Alpha";
                            try {
                                i = t.filters.item(o)
                            } catch(t) {
                                if (1 === e) return
                            }
                            e = Math.round(100 * e),
                                i ? (i.Enabled = 100 !== e, i.Opacity = e) : t.style.filter += " progid:" + o + "(opacity=" + e + ")"
                        },
                        testProp: function(t) {
                            for (var i = e.documentElement.style,
                                     o = 0; o < t.length; o++) if (t[o] in i) return t[o];
                            return ! 1
                        },
                        setTransform: function(t, e, i) {
                            var n = e || new o.Point(0, 0);
                            t.style[o.DomUtil.TRANSFORM] = (o.Browser.ie3d ? "translate(" + n.x + "px," + n.y + "px)": "translate3d(" + n.x + "px," + n.y + "px,0)") + (i ? " scale(" + i + ")": "")
                        },
                        setPosition: function(t, e) {
                            t._leaflet_pos = e,
                                o.Browser.any3d ? o.DomUtil.setTransform(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
                        },
                        getPosition: function(t) {
                            return t._leaflet_pos || new o.Point(0, 0)
                        }
                    },
                    function() {
                        o.DomUtil.TRANSFORM = o.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]);
                        var i = o.DomUtil.TRANSITION = o.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
                        if (o.DomUtil.TRANSITION_END = "webkitTransition" === i || "OTransition" === i ? i + "End": "transitionend", "onselectstart" in e) o.DomUtil.disableTextSelection = function() {
                            o.DomEvent.on(t, "selectstart", o.DomEvent.preventDefault)
                        },
                            o.DomUtil.enableTextSelection = function() {
                                o.DomEvent.off(t, "selectstart", o.DomEvent.preventDefault)
                            };
                        else {
                            var n = o.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
                            o.DomUtil.disableTextSelection = function() {
                                if (n) {
                                    var t = e.documentElement.style;
                                    this._userSelect = t[n],
                                        t[n] = "none"
                                }
                            },
                                o.DomUtil.enableTextSelection = function() {
                                    n && (e.documentElement.style[n] = this._userSelect, delete this._userSelect)
                                }
                        }
                        o.DomUtil.disableImageDrag = function() {
                            o.DomEvent.on(t, "dragstart", o.DomEvent.preventDefault)
                        },
                            o.DomUtil.enableImageDrag = function() {
                                o.DomEvent.off(t, "dragstart", o.DomEvent.preventDefault)
                            },
                            o.DomUtil.preventOutline = function(e) {
                                for (; - 1 === e.tabIndex;) e = e.parentNode;
                                e && e.style && (o.DomUtil.restoreOutline(), this._outlineElement = e, this._outlineStyle = e.style.outline, e.style.outline = "none", o.DomEvent.on(t, "keydown", o.DomUtil.restoreOutline, this))
                            },
                            o.DomUtil.restoreOutline = function() {
                                this._outlineElement && (this._outlineElement.style.outline = this._outlineStyle, delete this._outlineElement, delete this._outlineStyle, o.DomEvent.off(t, "keydown", o.DomUtil.restoreOutline, this))
                            }
                    } (),
                    o.LatLng = function(t, e, i) {
                        if (isNaN(t) || isNaN(e)) throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
                        this.lat = +t,
                            this.lng = +e,
                        void 0 !== i && (this.alt = +i)
                    },
                    o.LatLng.prototype = {
                        equals: function(t, e) {
                            return !! t && (t = o.latLng(t), Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng)) <= (void 0 === e ? 1e-9: e))
                        },
                        toString: function(t) {
                            return "LatLng(" + o.Util.formatNum(this.lat, t) + ", " + o.Util.formatNum(this.lng, t) + ")"
                        },
                        distanceTo: function(t) {
                            return o.CRS.Earth.distance(this, o.latLng(t))
                        },
                        wrap: function() {
                            return o.CRS.Earth.wrapLatLng(this)
                        },
                        toBounds: function(t) {
                            var e = 180 * t / 40075017,
                                i = e / Math.cos(Math.PI / 180 * this.lat);
                            return o.latLngBounds([this.lat - e, this.lng - i], [this.lat + e, this.lng + i])
                        },
                        clone: function() {
                            return new o.LatLng(this.lat, this.lng, this.alt)
                        }
                    },
                    o.latLng = function(t, e, i) {
                        return t instanceof o.LatLng ? t: o.Util.isArray(t) && "object" != typeof t[0] ? 3 === t.length ? new o.LatLng(t[0], t[1], t[2]) : 2 === t.length ? new o.LatLng(t[0], t[1]) : null: void 0 === t || null === t ? t: "object" == typeof t && "lat" in t ? new o.LatLng(t.lat, "lng" in t ? t.lng: t.lon, t.alt) : void 0 === e ? null: new o.LatLng(t, e, i)
                    },
                    o.LatLngBounds = function(t, e) {
                        if (t) for (var i = e ? [t, e] : t, o = 0, n = i.length; o < n; o++) this.extend(i[o])
                    },
                    o.LatLngBounds.prototype = {
                        extend: function(t) {
                            var e, i, n = this._southWest,
                                s = this._northEast;
                            if (t instanceof o.LatLng) e = t,
                                i = t;
                            else {
                                if (! (t instanceof o.LatLngBounds)) return t ? this.extend(o.latLng(t) || o.latLngBounds(t)) : this;
                                if (e = t._southWest, i = t._northEast, !e || !i) return this
                            }
                            return n || s ? (n.lat = Math.min(e.lat, n.lat), n.lng = Math.min(e.lng, n.lng), s.lat = Math.max(i.lat, s.lat), s.lng = Math.max(i.lng, s.lng)) : (this._southWest = new o.LatLng(e.lat, e.lng), this._northEast = new o.LatLng(i.lat, i.lng)),
                                this
                        },
                        pad: function(t) {
                            var e = this._southWest,
                                i = this._northEast,
                                n = Math.abs(e.lat - i.lat) * t,
                                s = Math.abs(e.lng - i.lng) * t;
                            return new o.LatLngBounds(new o.LatLng(e.lat - n, e.lng - s), new o.LatLng(i.lat + n, i.lng + s))
                        },
                        getCenter: function() {
                            return new o.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
                        },
                        getSouthWest: function() {
                            return this._southWest
                        },
                        getNorthEast: function() {
                            return this._northEast
                        },
                        getNorthWest: function() {
                            return new o.LatLng(this.getNorth(), this.getWest())
                        },
                        getSouthEast: function() {
                            return new o.LatLng(this.getSouth(), this.getEast())
                        },
                        getWest: function() {
                            return this._southWest.lng
                        },
                        getSouth: function() {
                            return this._southWest.lat
                        },
                        getEast: function() {
                            return this._northEast.lng
                        },
                        getNorth: function() {
                            return this._northEast.lat
                        },
                        contains: function(t) {
                            t = "number" == typeof t[0] || t instanceof o.LatLng ? o.latLng(t) : o.latLngBounds(t);
                            var e, i, n = this._southWest,
                                s = this._northEast;
                            return t instanceof o.LatLngBounds ? (e = t.getSouthWest(), i = t.getNorthEast()) : e = i = t,
                            e.lat >= n.lat && i.lat <= s.lat && e.lng >= n.lng && i.lng <= s.lng
                        },
                        intersects: function(t) {
                            t = o.latLngBounds(t);
                            var e = this._southWest,
                                i = this._northEast,
                                n = t.getSouthWest(),
                                s = t.getNorthEast(),
                                r = s.lat >= e.lat && n.lat <= i.lat,
                                a = s.lng >= e.lng && n.lng <= i.lng;
                            return r && a
                        },
                        overlaps: function(t) {
                            t = o.latLngBounds(t);
                            var e = this._southWest,
                                i = this._northEast,
                                n = t.getSouthWest(),
                                s = t.getNorthEast(),
                                r = s.lat > e.lat && n.lat < i.lat,
                                a = s.lng > e.lng && n.lng < i.lng;
                            return r && a
                        },
                        toBBoxString: function() {
                            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
                        },
                        equals: function(t) {
                            return !! t && (t = o.latLngBounds(t), this._southWest.equals(t.getSouthWest()) && this._northEast.equals(t.getNorthEast()))
                        },
                        isValid: function() {
                            return ! (!this._southWest || !this._northEast)
                        }
                    },
                    o.latLngBounds = function(t, e) {
                        return t instanceof o.LatLngBounds ? t: new o.LatLngBounds(t, e)
                    },
                    o.Projection = {},
                    o.Projection.LonLat = {
                        project: function(t) {
                            return new o.Point(t.lng, t.lat)
                        },
                        unproject: function(t) {
                            return new o.LatLng(t.y, t.x)
                        },
                        bounds: o.bounds([ - 180, -90], [180, 90])
                    },
                    o.Projection.SphericalMercator = {
                        R: 6378137,
                        MAX_LATITUDE: 85.0511287798,
                        project: function(t) {
                            var e = Math.PI / 180,
                                i = this.MAX_LATITUDE,
                                n = Math.max(Math.min(i, t.lat), -i),
                                s = Math.sin(n * e);
                            return new o.Point(this.R * t.lng * e, this.R * Math.log((1 + s) / (1 - s)) / 2)
                        },
                        unproject: function(t) {
                            var e = 180 / Math.PI;
                            return new o.LatLng((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e, t.x * e / this.R)
                        },
                        bounds: function() {
                            var t = 6378137 * Math.PI;
                            return o.bounds([ - t, -t], [t, t])
                        } ()
                    },
                    o.CRS = {
                        latLngToPoint: function(t, e) {
                            var i = this.projection.project(t),
                                o = this.scale(e);
                            return this.transformation._transform(i, o)
                        },
                        pointToLatLng: function(t, e) {
                            var i = this.scale(e),
                                o = this.transformation.untransform(t, i);
                            return this.projection.unproject(o)
                        },
                        project: function(t) {
                            return this.projection.project(t)
                        },
                        unproject: function(t) {
                            return this.projection.unproject(t)
                        },
                        scale: function(t) {
                            return 256 * Math.pow(2, t)
                        },
                        zoom: function(t) {
                            return Math.log(t / 256) / Math.LN2
                        },
                        getProjectedBounds: function(t) {
                            if (this.infinite) return null;
                            var e = this.projection.bounds,
                                i = this.scale(t),
                                n = this.transformation.transform(e.min, i),
                                s = this.transformation.transform(e.max, i);
                            return o.bounds(n, s)
                        },
                        infinite: !1,
                        wrapLatLng: function(t) {
                            var e = this.wrapLng ? o.Util.wrapNum(t.lng, this.wrapLng, !0) : t.lng,
                                i = this.wrapLat ? o.Util.wrapNum(t.lat, this.wrapLat, !0) : t.lat,
                                n = t.alt;
                            return o.latLng(i, e, n)
                        }
                    },
                    o.CRS.Simple = o.extend({},
                        o.CRS, {
                            projection: o.Projection.LonLat,
                            transformation: new o.Transformation(1, 0, -1, 0),
                            scale: function(t) {
                                return Math.pow(2, t)
                            },
                            zoom: function(t) {
                                return Math.log(t) / Math.LN2
                            },
                            distance: function(t, e) {
                                var i = e.lng - t.lng,
                                    o = e.lat - t.lat;
                                return Math.sqrt(i * i + o * o)
                            },
                            infinite: !0
                        }),
                    o.CRS.Earth = o.extend({},
                        o.CRS, {
                            wrapLng: [ - 180, 180],
                            R: 6371e3,
                            distance: function(t, e) {
                                var i = Math.PI / 180,
                                    o = t.lat * i,
                                    n = e.lat * i,
                                    s = Math.sin(o) * Math.sin(n) + Math.cos(o) * Math.cos(n) * Math.cos((e.lng - t.lng) * i);
                                return this.R * Math.acos(Math.min(s, 1))
                            }
                        }),
                    o.CRS.EPSG3857 = o.extend({},
                        o.CRS.Earth, {
                            code: "EPSG:3857",
                            projection: o.Projection.SphericalMercator,
                            transformation: function() {
                                var t = .5 / (Math.PI * o.Projection.SphericalMercator.R);
                                return new o.Transformation(t, .5, -t, .5)
                            } ()
                        }),
                    o.CRS.EPSG900913 = o.extend({},
                        o.CRS.EPSG3857, {
                            code: "EPSG:900913"
                        }),
                    o.CRS.EPSG4326 = o.extend({},
                        o.CRS.Earth, {
                            code: "EPSG:4326",
                            projection: o.Projection.LonLat,
                            transformation: new o.Transformation(1 / 180, 1, -1 / 180, .5)
                        }),
                    o.Map = o.Evented.extend({
                        options: {
                            crs: o.CRS.EPSG3857,
                            center: void 0,
                            zoom: void 0,
                            minZoom: void 0,
                            maxZoom: void 0,
                            layers: [],
                            maxBounds: void 0,
                            renderer: void 0,
                            zoomAnimation: !0,
                            zoomAnimationThreshold: 4,
                            fadeAnimation: !0,
                            markerZoomAnimation: !0,
                            transform3DLimit: 8388608,
                            zoomSnap: 1,
                            zoomDelta: 1,
                            trackResize: !0
                        },
                        initialize: function(t, e) {
                            e = o.setOptions(this, e),
                                this._initContainer(t),
                                this._initLayout(),
                                this._onResize = o.bind(this._onResize, this),
                                this._initEvents(),
                            e.maxBounds && this.setMaxBounds(e.maxBounds),
                            void 0 !== e.zoom && (this._zoom = this._limitZoom(e.zoom)),
                            e.center && void 0 !== e.zoom && this.setView(o.latLng(e.center), e.zoom, {
                                reset: !0
                            }),
                                this._handlers = [],
                                this._layers = {},
                                this._zoomBoundLayers = {},
                                this._sizeChanged = !0,
                                this.callInitHooks(),
                                this._zoomAnimated = o.DomUtil.TRANSITION && o.Browser.any3d && !o.Browser.mobileOpera && this.options.zoomAnimation,
                            this._zoomAnimated && (this._createAnimProxy(), o.DomEvent.on(this._proxy, o.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)),
                                this._addLayers(this.options.layers)
                        },
                        setView: function(t, e, i) {
                            if (e = void 0 === e ? this._zoom: this._limitZoom(e), t = this._limitCenter(o.latLng(t), e, this.options.maxBounds), i = i || {},
                                    this._stop(), this._loaded && !i.reset && !0 !== i) {
                                void 0 !== i.animate && (i.zoom = o.extend({
                                        animate: i.animate
                                    },
                                    i.zoom), i.pan = o.extend({
                                        animate: i.animate,
                                        duration: i.duration
                                    },
                                    i.pan));
                                if (this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom) : this._tryAnimatedPan(t, i.pan)) return clearTimeout(this._sizeTimer),
                                    this
                            }
                            return this._resetView(t, e),
                                this
                        },
                        setZoom: function(t, e) {
                            return this._loaded ? this.setView(this.getCenter(), t, {
                                zoom: e
                            }) : (this._zoom = t, this)
                        },
                        zoomIn: function(t, e) {
                            return t = t || (o.Browser.any3d ? this.options.zoomDelta: 1),
                                this.setZoom(this._zoom + t, e)
                        },
                        zoomOut: function(t, e) {
                            return t = t || (o.Browser.any3d ? this.options.zoomDelta: 1),
                                this.setZoom(this._zoom - t, e)
                        },
                        setZoomAround: function(t, e, i) {
                            var n = this.getZoomScale(e),
                                s = this.getSize().divideBy(2),
                                r = t instanceof o.Point ? t: this.latLngToContainerPoint(t),
                                a = r.subtract(s).multiplyBy(1 - 1 / n),
                                h = this.containerPointToLatLng(s.add(a));
                            return this.setView(h, e, {
                                zoom: i
                            })
                        },
                        _getBoundsCenterZoom: function(t, e) {
                            e = e || {},
                                t = t.getBounds ? t.getBounds() : o.latLngBounds(t);
                            var i = o.point(e.paddingTopLeft || e.padding || [0, 0]),
                                n = o.point(e.paddingBottomRight || e.padding || [0, 0]),
                                s = this.getBoundsZoom(t, !1, i.add(n));
                            s = "number" == typeof e.maxZoom ? Math.min(e.maxZoom, s) : s;
                            var r = n.subtract(i).divideBy(2),
                                a = this.project(t.getSouthWest(), s),
                                h = this.project(t.getNorthEast(), s);
                            return {
                                center: this.unproject(a.add(h).divideBy(2).add(r), s),
                                zoom: s
                            }
                        },
                        fitBounds: function(t, e) {
                            if (t = o.latLngBounds(t), !t.isValid()) throw new Error("Bounds are not valid.");
                            var i = this._getBoundsCenterZoom(t, e);
                            return this.setView(i.center, i.zoom, e)
                        },
                        fitWorld: function(t) {
                            return this.fitBounds([[ - 90, -180], [90, 180]], t)
                        },
                        panTo: function(t, e) {
                            return this.setView(t, this._zoom, {
                                pan: e
                            })
                        },
                        panBy: function(t, e) {
                            if (t = o.point(t).round(), e = e || {},
                                !t.x && !t.y) return this.fire("moveend");
                            if (!0 !== e.animate && !this.getSize().contains(t)) return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()),
                                this;
                            if (this._panAnim || (this._panAnim = new o.PosAnimation, this._panAnim.on({
                                        step: this._onPanTransitionStep,
                                        end: this._onPanTransitionEnd
                                    },
                                    this)), e.noMoveStart || this.fire("movestart"), !1 !== e.animate) {
                                o.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                                var i = this._getMapPanePos().subtract(t).round();
                                this._panAnim.run(this._mapPane, i, e.duration || .25, e.easeLinearity)
                            } else this._rawPanBy(t),
                                this.fire("move").fire("moveend");
                            return this
                        },
                        flyTo: function(t, e, i) {
                            function n(t) {
                                var e = t ? -1 : 1,
                                    i = t ? g: f,
                                    o = g * g - f * f + e * P * P * v * v,
                                    n = 2 * i * P * v,
                                    s = o / n,
                                    r = Math.sqrt(s * s + 1) - s;
                                return r < 1e-9 ? -18 : Math.log(r)
                            }
                            function s(t) {
                                return (Math.exp(t) - Math.exp( - t)) / 2
                            }
                            function r(t) {
                                return (Math.exp(t) + Math.exp( - t)) / 2
                            }
                            function a(t) {
                                return s(t) / r(t)
                            }
                            function h(t) {
                                return f * (r(L) / r(L + y * t))
                            }
                            function l(t) {
                                return f * (r(L) * a(L + y * t) - s(L)) / P
                            }
                            function u(t) {
                                return 1 - Math.pow(1 - t, 1.5)
                            }
                            function c() {
                                var i = (Date.now() - x) / w,
                                    n = u(i) * b;
                                i <= 1 ? (this._flyToFrame = o.Util.requestAnimFrame(c, this), this._move(this.unproject(d.add(_.subtract(d).multiplyBy(l(n) / v)), p), this.getScaleZoom(f / h(n), p), {
                                    flyTo: !0
                                })) : this._move(t, e)._moveEnd(!0)
                            }
                            if (i = i || {},
                                !1 === i.animate || !o.Browser.any3d) return this.setView(t, e, i);
                            this._stop();
                            var d = this.project(this.getCenter()),
                                _ = this.project(t),
                                m = this.getSize(),
                                p = this._zoom;
                            t = o.latLng(t),
                                e = void 0 === e ? p: e;
                            var f = Math.max(m.x, m.y),
                                g = f * this.getZoomScale(p, e),
                                v = _.distanceTo(d) || 1,
                                y = 1.42,
                                P = y * y,
                                L = n(0),
                                x = Date.now(),
                                b = (n(1) - L) / y,
                                w = i.duration ? 1e3 * i.duration: 1e3 * b * .8;
                            return this._moveStart(!0),
                                c.call(this),
                                this
                        },
                        flyToBounds: function(t, e) {
                            var i = this._getBoundsCenterZoom(t, e);
                            return this.flyTo(i.center, i.zoom, e)
                        },
                        setMaxBounds: function(t) {
                            return t = o.latLngBounds(t),
                                t.isValid() ? (this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this.off("moveend", this._panInsideMaxBounds))
                        },
                        setMinZoom: function(t) {
                            return this.options.minZoom = t,
                                this._loaded && this.getZoom() < this.options.minZoom ? this.setZoom(t) : this
                        },
                        setMaxZoom: function(t) {
                            return this.options.maxZoom = t,
                                this._loaded && this.getZoom() > this.options.maxZoom ? this.setZoom(t) : this
                        },
                        panInsideBounds: function(t, e) {
                            this._enforcingBounds = !0;
                            var i = this.getCenter(),
                                n = this._limitCenter(i, this._zoom, o.latLngBounds(t));
                            return i.equals(n) || this.panTo(n, e),
                                this._enforcingBounds = !1,
                                this
                        },
                        invalidateSize: function(t) {
                            if (!this._loaded) return this;
                            t = o.extend({
                                    animate: !1,
                                    pan: !0
                                },
                                !0 === t ? {
                                    animate: !0
                                }: t);
                            var e = this.getSize();
                            this._sizeChanged = !0,
                                this._lastCenter = null;
                            var i = this.getSize(),
                                n = e.divideBy(2).round(),
                                s = i.divideBy(2).round(),
                                r = n.subtract(s);
                            return r.x || r.y ? (t.animate && t.pan ? this.panBy(r) : (t.pan && this._rawPanBy(r), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(o.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
                                oldSize: e,
                                newSize: i
                            })) : this
                        },
                        stop: function() {
                            return this.setZoom(this._limitZoom(this._zoom)),
                            this.options.zoomSnap || this.fire("viewreset"),
                                this._stop()
                        },
                        locate: function(t) {
                            if (t = this._locateOptions = o.extend({
                                        timeout: 1e4,
                                        watch: !1
                                    },
                                    t), !("geolocation" in navigator)) return this._handleGeolocationError({
                                code: 0,
                                message: "Geolocation not supported."
                            }),
                                this;
                            var e = o.bind(this._handleGeolocationResponse, this),
                                i = o.bind(this._handleGeolocationError, this);
                            return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t) : navigator.geolocation.getCurrentPosition(e, i, t),
                                this
                        },
                        stopLocate: function() {
                            return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId),
                            this._locateOptions && (this._locateOptions.setView = !1),
                                this
                        },
                        _handleGeolocationError: function(t) {
                            var e = t.code,
                                i = t.message || (1 === e ? "permission denied": 2 === e ? "position unavailable": "timeout");
                            this._locateOptions.setView && !this._loaded && this.fitWorld(),
                                this.fire("locationerror", {
                                    code: e,
                                    message: "Geolocation error: " + i + "."
                                })
                        },
                        _handleGeolocationResponse: function(t) {
                            var e = t.coords.latitude,
                                i = t.coords.longitude,
                                n = new o.LatLng(e, i),
                                s = n.toBounds(t.coords.accuracy),
                                r = this._locateOptions;
                            if (r.setView) {
                                var a = this.getBoundsZoom(s);
                                this.setView(n, r.maxZoom ? Math.min(a, r.maxZoom) : a)
                            }
                            var h = {
                                latlng: n,
                                bounds: s,
                                timestamp: t.timestamp
                            };
                            for (var l in t.coords)"number" == typeof t.coords[l] && (h[l] = t.coords[l]);
                            this.fire("locationfound", h)
                        },
                        addHandler: function(t, e) {
                            if (!e) return this;
                            var i = this[t] = new e(this);
                            return this._handlers.push(i),
                            this.options[t] && i.enable(),
                                this
                        },
                        remove: function() {
                            if (this._initEvents(!0), this._containerId !== this._container._leaflet_id) throw new Error("Map container is being reused by another instance");
                            try {
                                delete this._container._leaflet_id,
                                    delete this._containerId
                            } catch(t) {
                                this._container._leaflet_id = void 0,
                                    this._containerId = void 0
                            }
                            o.DomUtil.remove(this._mapPane),
                            this._clearControlPos && this._clearControlPos(),
                                this._clearHandlers(),
                            this._loaded && this.fire("unload");
                            for (var t in this._layers) this._layers[t].remove();
                            return this
                        },
                        createPane: function(t, e) {
                            var i = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane": ""),
                                n = o.DomUtil.create("div", i, e || this._mapPane);
                            return t && (this._panes[t] = n),
                                n
                        },
                        getCenter: function() {
                            return this._checkIfLoaded(),
                                this._lastCenter && !this._moved() ? this._lastCenter: this.layerPointToLatLng(this._getCenterLayerPoint())
                        },
                        getZoom: function() {
                            return this._zoom
                        },
                        getBounds: function() {
                            var t = this.getPixelBounds(),
                                e = this.unproject(t.getBottomLeft()),
                                i = this.unproject(t.getTopRight());
                            return new o.LatLngBounds(e, i)
                        },
                        getMinZoom: function() {
                            return void 0 === this.options.minZoom ? this._layersMinZoom || 0 : this.options.minZoom
                        },
                        getMaxZoom: function() {
                            return void 0 === this.options.maxZoom ? void 0 === this._layersMaxZoom ? 1 / 0 : this._layersMaxZoom: this.options.maxZoom
                        },
                        getBoundsZoom: function(t, e, i) {
                            t = o.latLngBounds(t),
                                i = o.point(i || [0, 0]);
                            var n = this.getZoom() || 0,
                                s = this.getMinZoom(),
                                r = this.getMaxZoom(),
                                a = t.getNorthWest(),
                                h = t.getSouthEast(),
                                l = this.getSize().subtract(i),
                                u = this.project(h, n).subtract(this.project(a, n)),
                                c = o.Browser.any3d ? this.options.zoomSnap: 1,
                                d = Math.min(l.x / u.x, l.y / u.y);
                            return n = this.getScaleZoom(d, n),
                            c && (n = Math.round(n / (c / 100)) * (c / 100), n = e ? Math.ceil(n / c) * c: Math.floor(n / c) * c),
                                Math.max(s, Math.min(r, n))
                        },
                        getSize: function() {
                            return this._size && !this._sizeChanged || (this._size = new o.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1),
                                this._size.clone()
                        },
                        getPixelBounds: function(t, e) {
                            var i = this._getTopLeftPoint(t, e);
                            return new o.Bounds(i, i.add(this.getSize()))
                        },
                        getPixelOrigin: function() {
                            return this._checkIfLoaded(),
                                this._pixelOrigin
                        },
                        getPixelWorldBounds: function(t) {
                            return this.options.crs.getProjectedBounds(void 0 === t ? this.getZoom() : t)
                        },
                        getPane: function(t) {
                            return "string" == typeof t ? this._panes[t] : t
                        },
                        getPanes: function() {
                            return this._panes
                        },
                        getContainer: function() {
                            return this._container
                        },
                        getZoomScale: function(t, e) {
                            var i = this.options.crs;
                            return e = void 0 === e ? this._zoom: e,
                            i.scale(t) / i.scale(e)
                        },
                        getScaleZoom: function(t, e) {
                            var i = this.options.crs;
                            e = void 0 === e ? this._zoom: e;
                            var o = i.zoom(t * i.scale(e));
                            return isNaN(o) ? 1 / 0 : o
                        },
                        project: function(t, e) {
                            return e = void 0 === e ? this._zoom: e,
                                this.options.crs.latLngToPoint(o.latLng(t), e)
                        },
                        unproject: function(t, e) {
                            return e = void 0 === e ? this._zoom: e,
                                this.options.crs.pointToLatLng(o.point(t), e)
                        },
                        layerPointToLatLng: function(t) {
                            var e = o.point(t).add(this.getPixelOrigin());
                            return this.unproject(e)
                        },
                        latLngToLayerPoint: function(t) {
                            return this.project(o.latLng(t))._round()._subtract(this.getPixelOrigin())
                        },
                        wrapLatLng: function(t) {
                            return this.options.crs.wrapLatLng(o.latLng(t))
                        },
                        distance: function(t, e) {
                            return this.options.crs.distance(o.latLng(t), o.latLng(e))
                        },
                        containerPointToLayerPoint: function(t) {
                            return o.point(t).subtract(this._getMapPanePos())
                        },
                        layerPointToContainerPoint: function(t) {
                            return o.point(t).add(this._getMapPanePos())
                        },
                        containerPointToLatLng: function(t) {
                            var e = this.containerPointToLayerPoint(o.point(t));
                            return this.layerPointToLatLng(e)
                        },
                        latLngToContainerPoint: function(t) {
                            return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))
                        },
                        mouseEventToContainerPoint: function(t) {
                            return o.DomEvent.getMousePosition(t, this._container)
                        },
                        mouseEventToLayerPoint: function(t) {
                            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
                        },
                        mouseEventToLatLng: function(t) {
                            return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
                        },
                        _initContainer: function(t) {
                            var e = this._container = o.DomUtil.get(t);
                            if (!e) throw new Error("Map container not found.");
                            if (e._leaflet_id) throw new Error("Map container is already initialized.");
                            o.DomEvent.addListener(e, "scroll", this._onScroll, this),
                                this._containerId = o.Util.stamp(e)
                        },
                        _initLayout: function() {
                            var t = this._container;
                            this._fadeAnimated = this.options.fadeAnimation && o.Browser.any3d,
                                o.DomUtil.addClass(t, "leaflet-container" + (o.Browser.touch ? " leaflet-touch": "") + (o.Browser.retina ? " leaflet-retina": "") + (o.Browser.ielt9 ? " leaflet-oldie": "") + (o.Browser.safari ? " leaflet-safari": "") + (this._fadeAnimated ? " leaflet-fade-anim": ""));
                            var e = o.DomUtil.getStyle(t, "position");
                            "absolute" !== e && "relative" !== e && "fixed" !== e && (t.style.position = "relative"),
                                this._initPanes(),
                            this._initControlPos && this._initControlPos()
                        },
                        _initPanes: function() {
                            var t = this._panes = {};
                            this._paneRenderers = {},
                                this._mapPane = this.createPane("mapPane", this._container),
                                o.DomUtil.setPosition(this._mapPane, new o.Point(0, 0)),
                                this.createPane("tilePane"),
                                this.createPane("shadowPane"),
                                this.createPane("overlayPane"),
                                this.createPane("markerPane"),
                                this.createPane("tooltipPane"),
                                this.createPane("popupPane"),
                            this.options.markerZoomAnimation || (o.DomUtil.addClass(t.markerPane, "leaflet-zoom-hide"), o.DomUtil.addClass(t.shadowPane, "leaflet-zoom-hide"))
                        },
                        _resetView: function(t, e) {
                            o.DomUtil.setPosition(this._mapPane, new o.Point(0, 0));
                            var i = !this._loaded;
                            this._loaded = !0,
                                e = this._limitZoom(e),
                                this.fire("viewprereset");
                            var n = this._zoom !== e;
                            this._moveStart(n)._move(t, e)._moveEnd(n),
                                this.fire("viewreset"),
                            i && this.fire("load")
                        },
                        _moveStart: function(t) {
                            return t && this.fire("zoomstart"),
                                this.fire("movestart")
                        },
                        _move: function(t, e, i) {
                            void 0 === e && (e = this._zoom);
                            var o = this._zoom !== e;
                            return this._zoom = e,
                                this._lastCenter = t,
                                this._pixelOrigin = this._getNewPixelOrigin(t),
                            (o || i && i.pinch) && this.fire("zoom", i),
                                this.fire("move", i)
                        },
                        _moveEnd: function(t) {
                            return t && this.fire("zoomend"),
                                this.fire("moveend")
                        },
                        _stop: function() {
                            return o.Util.cancelAnimFrame(this._flyToFrame),
                            this._panAnim && this._panAnim.stop(),
                                this
                        },
                        _rawPanBy: function(t) {
                            o.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(t))
                        },
                        _getZoomSpan: function() {
                            return this.getMaxZoom() - this.getMinZoom()
                        },
                        _panInsideMaxBounds: function() {
                            this._enforcingBounds || this.panInsideBounds(this.options.maxBounds)
                        },
                        _checkIfLoaded: function() {
                            if (!this._loaded) throw new Error("Set map center and zoom first.")
                        },
                        _initEvents: function(e) {
                            if (o.DomEvent) {
                                this._targets = {},
                                    this._targets[o.stamp(this._container)] = this;
                                var i = e ? "off": "on";
                                o.DomEvent[i](this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress", this._handleDOMEvent, this),
                                this.options.trackResize && o.DomEvent[i](t, "resize", this._onResize, this),
                                o.Browser.any3d && this.options.transform3DLimit && this[i]("moveend", this._onMoveEnd)
                            }
                        },
                        _onResize: function() {
                            o.Util.cancelAnimFrame(this._resizeRequest),
                                this._resizeRequest = o.Util.requestAnimFrame(function() {
                                        this.invalidateSize({
                                            debounceMoveend: !0
                                        })
                                    },
                                    this)
                        },
                        _onScroll: function() {
                            this._container.scrollTop = 0,
                                this._container.scrollLeft = 0
                        },
                        _onMoveEnd: function() {
                            var t = this._getMapPanePos();
                            Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom())
                        },
                        _findEventTargets: function(t, e) {
                            for (var i, n = [], s = "mouseout" === e || "mouseover" === e, r = t.target || t.srcElement, a = !1; r;) {
                                if ((i = this._targets[o.stamp(r)]) && ("click" === e || "preclick" === e) && !t._simulated && this._draggableMoved(i)) {
                                    a = !0;
                                    break
                                }
                                if (i && i.listens(e, !0)) {
                                    if (s && !o.DomEvent._isExternalTarget(r, t)) break;
                                    if (n.push(i), s) break
                                }
                                if (r === this._container) break;
                                r = r.parentNode
                            }
                            return n.length || a || s || !o.DomEvent._isExternalTarget(r, t) || (n = [this]),
                                n
                        },
                        _handleDOMEvent: function(t) {
                            if (this._loaded && !o.DomEvent._skipped(t)) {
                                var e = "keypress" === t.type && 13 === t.keyCode ? "click": t.type;
                                "mousedown" === e && o.DomUtil.preventOutline(t.target || t.srcElement),
                                    this._fireDOMEvent(t, e)
                            }
                        },
                        _fireDOMEvent: function(t, e, i) {
                            if ("click" === t.type) {
                                var n = o.Util.extend({},
                                    t);
                                n.type = "preclick",
                                    this._fireDOMEvent(n, n.type, i)
                            }
                            if (!t._stopped && (i = (i || []).concat(this._findEventTargets(t, e)), i.length)) {
                                var s = i[0];
                                "contextmenu" === e && s.listens(e, !0) && o.DomEvent.preventDefault(t);
                                var r = {
                                    originalEvent: t
                                };
                                if ("keypress" !== t.type) {
                                    var a = s instanceof o.Marker;
                                    r.containerPoint = a ? this.latLngToContainerPoint(s.getLatLng()) : this.mouseEventToContainerPoint(t),
                                        r.layerPoint = this.containerPointToLayerPoint(r.containerPoint),
                                        r.latlng = a ? s.getLatLng() : this.layerPointToLatLng(r.layerPoint)
                                }
                                for (var h = 0; h < i.length; h++) if (i[h].fire(e, r, !0), r.originalEvent._stopped || i[h].options.nonBubblingEvents && -1 !== o.Util.indexOf(i[h].options.nonBubblingEvents, e)) return
                            }
                        },
                        _draggableMoved: function(t) {
                            return t = t.dragging && t.dragging.enabled() ? t: this,
                            t.dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved()
                        },
                        _clearHandlers: function() {
                            for (var t = 0,
                                     e = this._handlers.length; t < e; t++) this._handlers[t].disable()
                        },
                        whenReady: function(t, e) {
                            return this._loaded ? t.call(e || this, {
                                target: this
                            }) : this.on("load", t, e),
                                this
                        },
                        _getMapPanePos: function() {
                            return o.DomUtil.getPosition(this._mapPane) || new o.Point(0, 0)
                        },
                        _moved: function() {
                            var t = this._getMapPanePos();
                            return t && !t.equals([0, 0])
                        },
                        _getTopLeftPoint: function(t, e) {
                            return (t && void 0 !== e ? this._getNewPixelOrigin(t, e) : this.getPixelOrigin()).subtract(this._getMapPanePos())
                        },
                        _getNewPixelOrigin: function(t, e) {
                            var i = this.getSize()._divideBy(2);
                            return this.project(t, e)._subtract(i)._add(this._getMapPanePos())._round()
                        },
                        _latLngToNewLayerPoint: function(t, e, i) {
                            var o = this._getNewPixelOrigin(i, e);
                            return this.project(t, e)._subtract(o)
                        },
                        _latLngBoundsToNewLayerBounds: function(t, e, i) {
                            var n = this._getNewPixelOrigin(i, e);
                            return o.bounds([this.project(t.getSouthWest(), e)._subtract(n), this.project(t.getNorthWest(), e)._subtract(n), this.project(t.getSouthEast(), e)._subtract(n), this.project(t.getNorthEast(), e)._subtract(n)])
                        },
                        _getCenterLayerPoint: function() {
                            return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
                        },
                        _getCenterOffset: function(t) {
                            return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
                        },
                        _limitCenter: function(t, e, i) {
                            if (!i) return t;
                            var n = this.project(t, e),
                                s = this.getSize().divideBy(2),
                                r = new o.Bounds(n.subtract(s), n.add(s)),
                                a = this._getBoundsOffset(r, i, e);
                            return a.round().equals([0, 0]) ? t: this.unproject(n.add(a), e)
                        },
                        _limitOffset: function(t, e) {
                            if (!e) return t;
                            var i = this.getPixelBounds(),
                                n = new o.Bounds(i.min.add(t), i.max.add(t));
                            return t.add(this._getBoundsOffset(n, e))
                        },
                        _getBoundsOffset: function(t, e, i) {
                            var n = o.bounds(this.project(e.getNorthEast(), i), this.project(e.getSouthWest(), i)),
                                s = n.min.subtract(t.min),
                                r = n.max.subtract(t.max),
                                a = this._rebound(s.x, -r.x),
                                h = this._rebound(s.y, -r.y);
                            return new o.Point(a, h)
                        },
                        _rebound: function(t, e) {
                            return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e))
                        },
                        _limitZoom: function(t) {
                            var e = this.getMinZoom(),
                                i = this.getMaxZoom(),
                                n = o.Browser.any3d ? this.options.zoomSnap: 1;
                            return n && (t = Math.round(t / n) * n),
                                Math.max(e, Math.min(i, t))
                        },
                        _onPanTransitionStep: function() {
                            this.fire("move")
                        },
                        _onPanTransitionEnd: function() {
                            o.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"),
                                this.fire("moveend")
                        },
                        _tryAnimatedPan: function(t, e) {
                            var i = this._getCenterOffset(t)._floor();
                            return ! (!0 !== (e && e.animate) && !this.getSize().contains(i)) && (this.panBy(i, e), !0)
                        },
                        _createAnimProxy: function() {
                            var t = this._proxy = o.DomUtil.create("div", "leaflet-proxy leaflet-zoom-animated");
                            this._panes.mapPane.appendChild(t),
                                this.on("zoomanim",
                                    function(e) {
                                        var i = o.DomUtil.TRANSFORM,
                                            n = t.style[i];
                                        o.DomUtil.setTransform(t, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)),
                                        n === t.style[i] && this._animatingZoom && this._onZoomTransitionEnd()
                                    },
                                    this),
                                this.on("load moveend",
                                    function() {
                                        var e = this.getCenter(),
                                            i = this.getZoom();
                                        o.DomUtil.setTransform(t, this.project(e, i), this.getZoomScale(i, 1))
                                    },
                                    this)
                        },
                        _catchTransitionEnd: function(t) {
                            this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
                        },
                        _nothingToAnimate: function() {
                            return ! this._container.getElementsByClassName("leaflet-zoom-animated").length
                        },
                        _tryAnimatedZoom: function(t, e, i) {
                            if (this._animatingZoom) return ! 0;
                            if (i = i || {},
                                !this._zoomAnimated || !1 === i.animate || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold) return ! 1;
                            var n = this.getZoomScale(e),
                                s = this._getCenterOffset(t)._divideBy(1 - 1 / n);
                            return ! (!0 !== i.animate && !this.getSize().contains(s)) && (o.Util.requestAnimFrame(function() {
                                        this._moveStart(!0)._animateZoom(t, e, !0)
                                    },
                                    this), !0)
                        },
                        _animateZoom: function(t, e, i, n) {
                            i && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, o.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim")),
                                this.fire("zoomanim", {
                                    center: t,
                                    zoom: e,
                                    noUpdate: n
                                }),
                                setTimeout(o.bind(this._onZoomTransitionEnd, this), 250)
                        },
                        _onZoomTransitionEnd: function() {
                            this._animatingZoom && (o.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom), o.Util.requestAnimFrame(function() {
                                    this._moveEnd(!0)
                                },
                                this))
                        }
                    }),
                    o.map = function(t, e) {
                        return new o.Map(t, e)
                    },
                    o.Layer = o.Evented.extend({
                        options: {
                            pane: "overlayPane",
                            nonBubblingEvents: [],
                            attribution: null
                        },
                        addTo: function(t) {
                            return t.addLayer(this),
                                this
                        },
                        remove: function() {
                            return this.removeFrom(this._map || this._mapToAdd)
                        },
                        removeFrom: function(t) {
                            return t && t.removeLayer(this),
                                this
                        },
                        getPane: function(t) {
                            return this._map.getPane(t ? this.options[t] || t: this.options.pane)
                        },
                        addInteractiveTarget: function(t) {
                            return this._map._targets[o.stamp(t)] = this,
                                this
                        },
                        removeInteractiveTarget: function(t) {
                            return delete this._map._targets[o.stamp(t)],
                                this
                        },
                        getAttribution: function() {
                            return this.options.attribution
                        },
                        _layerAdd: function(t) {
                            var e = t.target;
                            if (e.hasLayer(this)) {
                                if (this._map = e, this._zoomAnimated = e._zoomAnimated, this.getEvents) {
                                    var i = this.getEvents();
                                    e.on(i, this),
                                        this.once("remove",
                                            function() {
                                                e.off(i, this)
                                            },
                                            this)
                                }
                                this.onAdd(e),
                                this.getAttribution && this._map.attributionControl && this._map.attributionControl.addAttribution(this.getAttribution()),
                                    this.fire("add"),
                                    e.fire("layeradd", {
                                        layer: this
                                    })
                            }
                        }
                    }),
                    o.Map.include({
                        addLayer: function(t) {
                            var e = o.stamp(t);
                            return this._layers[e] ? this: (this._layers[e] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this)
                        },
                        removeLayer: function(t) {
                            var e = o.stamp(t);
                            return this._layers[e] ? (this._loaded && t.onRemove(this), t.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(t.getAttribution()), delete this._layers[e], this._loaded && (this.fire("layerremove", {
                                layer: t
                            }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this
                        },
                        hasLayer: function(t) {
                            return !! t && o.stamp(t) in this._layers
                        },
                        eachLayer: function(t, e) {
                            for (var i in this._layers) t.call(e, this._layers[i]);
                            return this
                        },
                        _addLayers: function(t) {
                            t = t ? o.Util.isArray(t) ? t: [t] : [];
                            for (var e = 0,
                                     i = t.length; e < i; e++) this.addLayer(t[e])
                        },
                        _addZoomLimit: function(t) { ! isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[o.stamp(t)] = t, this._updateZoomLevels())
                        },
                        _removeZoomLimit: function(t) {
                            var e = o.stamp(t);
                            this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels())
                        },
                        _updateZoomLevels: function() {
                            var t = 1 / 0,
                                e = -1 / 0,
                                i = this._getZoomSpan();
                            for (var o in this._zoomBoundLayers) {
                                var n = this._zoomBoundLayers[o].options;
                                t = void 0 === n.minZoom ? t: Math.min(t, n.minZoom),
                                    e = void 0 === n.maxZoom ? e: Math.max(e, n.maxZoom)
                            }
                            this._layersMaxZoom = e === -1 / 0 ? void 0 : e,
                                this._layersMinZoom = t === 1 / 0 ? void 0 : t,
                            i !== this._getZoomSpan() && this.fire("zoomlevelschange"),
                            void 0 === this.options.maxZoom && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom),
                            void 0 === this.options.minZoom && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom)
                        }
                    });
                var s = "_leaflet_events";
                o.DomEvent = {
                    on: function(t, e, i, n) {
                        if ("object" == typeof e) for (var s in e) this._on(t, s, e[s], i);
                        else {
                            e = o.Util.splitWords(e);
                            for (var r = 0,
                                     a = e.length; r < a; r++) this._on(t, e[r], i, n)
                        }
                        return this
                    },
                    off: function(t, e, i, n) {
                        if ("object" == typeof e) for (var s in e) this._off(t, s, e[s], i);
                        else {
                            e = o.Util.splitWords(e);
                            for (var r = 0,
                                     a = e.length; r < a; r++) this._off(t, e[r], i, n)
                        }
                        return this
                    },
                    _on: function(e, i, n, r) {
                        var a = i + o.stamp(n) + (r ? "_" + o.stamp(r) : "");
                        if (e[s] && e[s][a]) return this;
                        var h = function(i) {
                                return n.call(r || e, i || t.event)
                            },
                            l = h;
                        return o.Browser.pointer && 0 === i.indexOf("touch") ? this.addPointerListener(e, i, h, a) : o.Browser.touch && "dblclick" === i && this.addDoubleTapListener ? this.addDoubleTapListener(e, h, a) : "addEventListener" in e ? "mousewheel" === i ? e.addEventListener("onwheel" in e ? "wheel": "mousewheel", h, !1) : "mouseenter" === i || "mouseleave" === i ? (h = function(i) {
                            i = i || t.event,
                            o.DomEvent._isExternalTarget(e, i) && l(i)
                        },
                            e.addEventListener("mouseenter" === i ? "mouseover": "mouseout", h, !1)) : ("click" === i && o.Browser.android && (h = function(t) {
                            return o.DomEvent._filterClick(t, l)
                        }), e.addEventListener(i, h, !1)) : "attachEvent" in e && e.attachEvent("on" + i, h),
                            e[s] = e[s] || {},
                            e[s][a] = h,
                            this
                    },
                    _off: function(t, e, i, n) {
                        var r = e + o.stamp(i) + (n ? "_" + o.stamp(n) : ""),
                            a = t[s] && t[s][r];
                        return a ? (o.Browser.pointer && 0 === e.indexOf("touch") ? this.removePointerListener(t, e, r) : o.Browser.touch && "dblclick" === e && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, r) : "removeEventListener" in t ? "mousewheel" === e ? t.removeEventListener("onwheel" in t ? "wheel": "mousewheel", a, !1) : t.removeEventListener("mouseenter" === e ? "mouseover": "mouseleave" === e ? "mouseout": e, a, !1) : "detachEvent" in t && t.detachEvent("on" + e, a), t[s][r] = null, this) : this
                    },
                    stopPropagation: function(t) {
                        return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0,
                            o.DomEvent._skipped(t),
                            this
                    },
                    disableScrollPropagation: function(t) {
                        return o.DomEvent.on(t, "mousewheel", o.DomEvent.stopPropagation)
                    },
                    disableClickPropagation: function(t) {
                        var e = o.DomEvent.stopPropagation;
                        return o.DomEvent.on(t, o.Draggable.START.join(" "), e),
                            o.DomEvent.on(t, {
                                click: o.DomEvent._fakeStop,
                                dblclick: e
                            })
                    },
                    preventDefault: function(t) {
                        return t.preventDefault ? t.preventDefault() : t.returnValue = !1,
                            this
                    },
                    stop: function(t) {
                        return o.DomEvent.preventDefault(t).stopPropagation(t)
                    },
                    getMousePosition: function(t, e) {
                        if (!e) return new o.Point(t.clientX, t.clientY);
                        var i = e.getBoundingClientRect();
                        return new o.Point(t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop)
                    },
                    _wheelPxFactor: o.Browser.win && o.Browser.chrome ? 2 : o.Browser.gecko ? t.devicePixelRatio: 1,
                    getWheelDelta: function(t) {
                        return o.Browser.edge ? t.wheelDeltaY / 2 : t.deltaY && 0 === t.deltaMode ? -t.deltaY / o.DomEvent._wheelPxFactor: t.deltaY && 1 === t.deltaMode ? 20 * -t.deltaY: t.deltaY && 2 === t.deltaMode ? 60 * -t.deltaY: t.deltaX || t.deltaZ ? 0 : t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : t.detail && Math.abs(t.detail) < 32765 ? 20 * -t.detail: t.detail ? t.detail / -32765 * 60 : 0
                    },
                    _skipEvents: {},
                    _fakeStop: function(t) {
                        o.DomEvent._skipEvents[t.type] = !0
                    },
                    _skipped: function(t) {
                        var e = this._skipEvents[t.type];
                        return this._skipEvents[t.type] = !1,
                            e
                    },
                    _isExternalTarget: function(t, e) {
                        var i = e.relatedTarget;
                        if (!i) return ! 0;
                        try {
                            for (; i && i !== t;) i = i.parentNode
                        } catch(t) {
                            return ! 1
                        }
                        return i !== t
                    },
                    _filterClick: function(t, e) {
                        var i = t.timeStamp || t.originalEvent && t.originalEvent.timeStamp,
                            n = o.DomEvent._lastClick && i - o.DomEvent._lastClick;
                        if (n && n > 100 && n < 500 || t.target._simulatedClick && !t._simulated) return void o.DomEvent.stop(t);
                        o.DomEvent._lastClick = i,
                            e(t)
                    }
                },
                    o.DomEvent.addListener = o.DomEvent.on,
                    o.DomEvent.removeListener = o.DomEvent.off,
                    o.PosAnimation = o.Evented.extend({
                        run: function(t, e, i, n) {
                            this.stop(),
                                this._el = t,
                                this._inProgress = !0,
                                this._duration = i || .25,
                                this._easeOutPower = 1 / Math.max(n || .5, .2),
                                this._startPos = o.DomUtil.getPosition(t),
                                this._offset = e.subtract(this._startPos),
                                this._startTime = +new Date,
                                this.fire("start"),
                                this._animate()
                        },
                        stop: function() {
                            this._inProgress && (this._step(!0), this._complete())
                        },
                        _animate: function() {
                            this._animId = o.Util.requestAnimFrame(this._animate, this),
                                this._step()
                        },
                        _step: function(t) {
                            var e = +new Date - this._startTime,
                                i = 1e3 * this._duration;
                            e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete())
                        },
                        _runFrame: function(t, e) {
                            var i = this._startPos.add(this._offset.multiplyBy(t));
                            e && i._round(),
                                o.DomUtil.setPosition(this._el, i),
                                this.fire("step")
                        },
                        _complete: function() {
                            o.Util.cancelAnimFrame(this._animId),
                                this._inProgress = !1,
                                this.fire("end")
                        },
                        _easeOut: function(t) {
                            return 1 - Math.pow(1 - t, this._easeOutPower)
                        }
                    }),
                    o.Projection.Mercator = {
                        R: 6378137,
                        R_MINOR: 6356752.314245179,
                        bounds: o.bounds([ - 20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
                        project: function(t) {
                            var e = Math.PI / 180,
                                i = this.R,
                                n = t.lat * e,
                                s = this.R_MINOR / i,
                                r = Math.sqrt(1 - s * s),
                                a = r * Math.sin(n),
                                h = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - a) / (1 + a), r / 2);
                            return n = -i * Math.log(Math.max(h, 1e-10)),
                                new o.Point(t.lng * e * i, n)
                        },
                        unproject: function(t) {
                            for (var e, i = 180 / Math.PI,
                                     n = this.R,
                                     s = this.R_MINOR / n,
                                     r = Math.sqrt(1 - s * s), a = Math.exp( - t.y / n), h = Math.PI / 2 - 2 * Math.atan(a), l = 0, u = .1; l < 15 && Math.abs(u) > 1e-7; l++) e = r * Math.sin(h),
                                e = Math.pow((1 - e) / (1 + e), r / 2),
                                u = Math.PI / 2 - 2 * Math.atan(a * e) - h,
                                h += u;
                            return new o.LatLng(h * i, t.x * i / n)
                        }
                    },
                    o.CRS.EPSG3395 = o.extend({},
                        o.CRS.Earth, {
                            code: "EPSG:3395",
                            projection: o.Projection.Mercator,
                            transformation: function() {
                                var t = .5 / (Math.PI * o.Projection.Mercator.R);
                                return new o.Transformation(t, .5, -t, .5)
                            } ()
                        }),
                    o.GridLayer = o.Layer.extend({
                        options: {
                            tileSize: 256,
                            opacity: 1,
                            updateWhenIdle: o.Browser.mobile,
                            updateWhenZooming: !0,
                            updateInterval: 200,
                            zIndex: 1,
                            bounds: null,
                            minZoom: 0,
                            maxZoom: void 0,
                            noWrap: !1,
                            pane: "tilePane",
                            className: "",
                            keepBuffer: 2
                        },
                        initialize: function(t) {
                            o.setOptions(this, t)
                        },
                        onAdd: function() {
                            this._initContainer(),
                                this._levels = {},
                                this._tiles = {},
                                this._resetView(),
                                this._update()
                        },
                        beforeAdd: function(t) {
                            t._addZoomLimit(this)
                        },
                        onRemove: function(t) {
                            this._removeAllTiles(),
                                o.DomUtil.remove(this._container),
                                t._removeZoomLimit(this),
                                this._container = null,
                                this._tileZoom = null
                        },
                        bringToFront: function() {
                            return this._map && (o.DomUtil.toFront(this._container), this._setAutoZIndex(Math.max)),
                                this
                        },
                        bringToBack: function() {
                            return this._map && (o.DomUtil.toBack(this._container), this._setAutoZIndex(Math.min)),
                                this
                        },
                        getContainer: function() {
                            return this._container
                        },
                        setOpacity: function(t) {
                            return this.options.opacity = t,
                                this._updateOpacity(),
                                this
                        },
                        setZIndex: function(t) {
                            return this.options.zIndex = t,
                                this._updateZIndex(),
                                this
                        },
                        isLoading: function() {
                            return this._loading
                        },
                        redraw: function() {
                            return this._map && (this._removeAllTiles(), this._update()),
                                this
                        },
                        getEvents: function() {
                            var t = {
                                viewprereset: this._invalidateAll,
                                viewreset: this._resetView,
                                zoom: this._resetView,
                                moveend: this._onMoveEnd
                            };
                            return this.options.updateWhenIdle || (this._onMove || (this._onMove = o.Util.throttle(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove),
                            this._zoomAnimated && (t.zoomanim = this._animateZoom),
                                t
                        },
                        createTile: function() {
                            return e.createElement("div")
                        },
                        getTileSize: function() {
                            var t = this.options.tileSize;
                            return t instanceof o.Point ? t: new o.Point(t, t)
                        },
                        _updateZIndex: function() {
                            this._container && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex)
                        },
                        _setAutoZIndex: function(t) {
                            for (var e, i = this.getPane().children, o = -t( - 1 / 0, 1 / 0), n = 0, s = i.length; n < s; n++) e = i[n].style.zIndex,
                            i[n] !== this._container && e && (o = t(o, +e));
                            isFinite(o) && (this.options.zIndex = o + t( - 1, 1), this._updateZIndex())
                        },
                        _updateOpacity: function() {
                            if (this._map && !o.Browser.ielt9) {
                                o.DomUtil.setOpacity(this._container, this.options.opacity);
                                var t = +new Date,
                                    e = !1,
                                    i = !1;
                                for (var n in this._tiles) {
                                    var s = this._tiles[n];
                                    if (s.current && s.loaded) {
                                        var r = Math.min(1, (t - s.loaded) / 200);
                                        o.DomUtil.setOpacity(s.el, r),
                                            r < 1 ? e = !0 : (s.active && (i = !0), s.active = !0)
                                    }
                                }
                                i && !this._noPrune && this._pruneTiles(),
                                e && (o.Util.cancelAnimFrame(this._fadeFrame), this._fadeFrame = o.Util.requestAnimFrame(this._updateOpacity, this))
                            }
                        },
                        _initContainer: function() {
                            this._container || (this._container = o.DomUtil.create("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container))
                        },
                        _updateLevels: function() {
                            var t = this._tileZoom,
                                e = this.options.maxZoom;
                            if (void 0 !== t) {
                                for (var i in this._levels) this._levels[i].el.children.length || i === t ? this._levels[i].el.style.zIndex = e - Math.abs(t - i) : (o.DomUtil.remove(this._levels[i].el), this._removeTilesAtZoom(i), delete this._levels[i]);
                                var n = this._levels[t],
                                    s = this._map;
                                return n || (n = this._levels[t] = {},
                                    n.el = o.DomUtil.create("div", "leaflet-tile-container leaflet-zoom-animated", this._container), n.el.style.zIndex = e, n.origin = s.project(s.unproject(s.getPixelOrigin()), t).round(), n.zoom = t, this._setZoomTransform(n, s.getCenter(), s.getZoom()), o.Util.falseFn(n.el.offsetWidth)),
                                    this._level = n,
                                    n
                            }
                        },
                        _pruneTiles: function() {
                            if (this._map) {
                                var t, e, i = this._map.getZoom();
                                if (i > this.options.maxZoom || i < this.options.minZoom) return void this._removeAllTiles();
                                for (t in this._tiles) e = this._tiles[t],
                                    e.retain = e.current;
                                for (t in this._tiles) if (e = this._tiles[t], e.current && !e.active) {
                                    var o = e.coords;
                                    this._retainParent(o.x, o.y, o.z, o.z - 5) || this._retainChildren(o.x, o.y, o.z, o.z + 2)
                                }
                                for (t in this._tiles) this._tiles[t].retain || this._removeTile(t)
                            }
                        },
                        _removeTilesAtZoom: function(t) {
                            for (var e in this._tiles) this._tiles[e].coords.z === t && this._removeTile(e)
                        },
                        _removeAllTiles: function() {
                            for (var t in this._tiles) this._removeTile(t)
                        },
                        _invalidateAll: function() {
                            for (var t in this._levels) o.DomUtil.remove(this._levels[t].el),
                                delete this._levels[t];
                            this._removeAllTiles(),
                                this._tileZoom = null
                        },
                        _retainParent: function(t, e, i, n) {
                            var s = Math.floor(t / 2),
                                r = Math.floor(e / 2),
                                a = i - 1,
                                h = new o.Point( + s, +r);
                            h.z = +a;
                            var l = this._tileCoordsToKey(h),
                                u = this._tiles[l];
                            return u && u.active ? (u.retain = !0, !0) : (u && u.loaded && (u.retain = !0), a > n && this._retainParent(s, r, a, n))
                        },
                        _retainChildren: function(t, e, i, n) {
                            for (var s = 2 * t; s < 2 * t + 2; s++) for (var r = 2 * e; r < 2 * e + 2; r++) {
                                var a = new o.Point(s, r);
                                a.z = i + 1;
                                var h = this._tileCoordsToKey(a),
                                    l = this._tiles[h];
                                l && l.active ? l.retain = !0 : (l && l.loaded && (l.retain = !0), i + 1 < n && this._retainChildren(s, r, i + 1, n))
                            }
                        },
                        _resetView: function(t) {
                            var e = t && (t.pinch || t.flyTo);
                            this._setView(this._map.getCenter(), this._map.getZoom(), e, e)
                        },
                        _animateZoom: function(t) {
                            this._setView(t.center, t.zoom, !0, t.noUpdate)
                        },
                        _setView: function(t, e, i, o) {
                            var n = Math.round(e); (void 0 !== this.options.maxZoom && n > this.options.maxZoom || void 0 !== this.options.minZoom && n < this.options.minZoom) && (n = void 0);
                            var s = this.options.updateWhenZooming && n !== this._tileZoom;
                            o && !s || (this._tileZoom = n, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), void 0 !== n && this._update(t), i || this._pruneTiles(), this._noPrune = !!i),
                                this._setZoomTransforms(t, e)
                        },
                        _setZoomTransforms: function(t, e) {
                            for (var i in this._levels) this._setZoomTransform(this._levels[i], t, e)
                        },
                        _setZoomTransform: function(t, e, i) {
                            var n = this._map.getZoomScale(i, t.zoom),
                                s = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e, i)).round();
                            o.Browser.any3d ? o.DomUtil.setTransform(t.el, s, n) : o.DomUtil.setPosition(t.el, s)
                        },
                        _resetGrid: function() {
                            var t = this._map,
                                e = t.options.crs,
                                i = this._tileSize = this.getTileSize(),
                                o = this._tileZoom,
                                n = this._map.getPixelWorldBounds(this._tileZoom);
                            n && (this._globalTileRange = this._pxBoundsToTileRange(n)),
                                this._wrapX = e.wrapLng && !this.options.noWrap && [Math.floor(t.project([0, e.wrapLng[0]], o).x / i.x), Math.ceil(t.project([0, e.wrapLng[1]], o).x / i.y)],
                                this._wrapY = e.wrapLat && !this.options.noWrap && [Math.floor(t.project([e.wrapLat[0], 0], o).y / i.x), Math.ceil(t.project([e.wrapLat[1], 0], o).y / i.y)]
                        },
                        _onMoveEnd: function() {
                            this._map && !this._map._animatingZoom && this._update()
                        },
                        _getTiledPixelBounds: function(t) {
                            var e = this._map,
                                i = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(),
                                n = e.getZoomScale(i, this._tileZoom),
                                s = e.project(t, this._tileZoom).floor(),
                                r = e.getSize().divideBy(2 * n);
                            return new o.Bounds(s.subtract(r), s.add(r))
                        },
                        _update: function(t) {
                            var i = this._map;
                            if (i) {
                                var n = i.getZoom();
                                if (void 0 === t && (t = i.getCenter()), void 0 !== this._tileZoom) {
                                    var s = this._getTiledPixelBounds(t),
                                        r = this._pxBoundsToTileRange(s),
                                        a = r.getCenter(),
                                        h = [],
                                        l = this.options.keepBuffer,
                                        u = new o.Bounds(r.getBottomLeft().subtract([l, -l]), r.getTopRight().add([l, -l]));
                                    for (var c in this._tiles) {
                                        var d = this._tiles[c].coords;
                                        d.z === this._tileZoom && u.contains(o.point(d.x, d.y)) || (this._tiles[c].current = !1)
                                    }
                                    if (Math.abs(n - this._tileZoom) > 1) return void this._setView(t, n);
                                    for (var _ = r.min.y; _ <= r.max.y; _++) for (var m = r.min.x; m <= r.max.x; m++) {
                                        var p = new o.Point(m, _);
                                        if (p.z = this._tileZoom, this._isValidTile(p)) {
                                            var f = this._tiles[this._tileCoordsToKey(p)];
                                            f ? f.current = !0 : h.push(p)
                                        }
                                    }
                                    if (h.sort(function(t, e) {
                                            return t.distanceTo(a) - e.distanceTo(a)
                                        }), 0 !== h.length) {
                                        this._loading || (this._loading = !0, this.fire("loading"));
                                        var g = e.createDocumentFragment();
                                        for (m = 0; m < h.length; m++) this._addTile(h[m], g);
                                        this._level.el.appendChild(g)
                                    }
                                }
                            }
                        },
                        _isValidTile: function(t) {
                            var e = this._map.options.crs;
                            if (!e.infinite) {
                                var i = this._globalTileRange;
                                if (!e.wrapLng && (t.x < i.min.x || t.x > i.max.x) || !e.wrapLat && (t.y < i.min.y || t.y > i.max.y)) return ! 1
                            }
                            if (!this.options.bounds) return ! 0;
                            var n = this._tileCoordsToBounds(t);
                            return o.latLngBounds(this.options.bounds).overlaps(n)
                        },
                        _keyToBounds: function(t) {
                            return this._tileCoordsToBounds(this._keyToTileCoords(t))
                        },
                        _tileCoordsToBounds: function(t) {
                            var e = this._map,
                                i = this.getTileSize(),
                                n = t.scaleBy(i),
                                s = n.add(i),
                                r = e.unproject(n, t.z),
                                a = e.unproject(s, t.z);
                            return this.options.noWrap || (r = e.wrapLatLng(r), a = e.wrapLatLng(a)),
                                new o.LatLngBounds(r, a)
                        },
                        _tileCoordsToKey: function(t) {
                            return t.x + ":" + t.y + ":" + t.z
                        },
                        _keyToTileCoords: function(t) {
                            var e = t.split(":"),
                                i = new o.Point( + e[0], +e[1]);
                            return i.z = +e[2],
                                i
                        },
                        _removeTile: function(t) {
                            var e = this._tiles[t];
                            e && (o.DomUtil.remove(e.el), delete this._tiles[t], this.fire("tileunload", {
                                tile: e.el,
                                coords: this._keyToTileCoords(t)
                            }))
                        },
                        _initTile: function(t) {
                            o.DomUtil.addClass(t, "leaflet-tile");
                            var e = this.getTileSize();
                            t.style.width = e.x + "px",
                                t.style.height = e.y + "px",
                                t.onselectstart = o.Util.falseFn,
                                t.onmousemove = o.Util.falseFn,
                            o.Browser.ielt9 && this.options.opacity < 1 && o.DomUtil.setOpacity(t, this.options.opacity),
                            o.Browser.android && !o.Browser.android23 && (t.style.WebkitBackfaceVisibility = "hidden")
                        },
                        _addTile: function(t, e) {
                            var i = this._getTilePos(t),
                                n = this._tileCoordsToKey(t),
                                s = this.createTile(this._wrapCoords(t), o.bind(this._tileReady, this, t));
                            this._initTile(s),
                            this.createTile.length < 2 && o.Util.requestAnimFrame(o.bind(this._tileReady, this, t, null, s)),
                                o.DomUtil.setPosition(s, i),
                                this._tiles[n] = {
                                    el: s,
                                    coords: t,
                                    current: !0
                                },
                                e.appendChild(s),
                                this.fire("tileloadstart", {
                                    tile: s,
                                    coords: t
                                })
                        },
                        _tileReady: function(t, e, i) {
                            if (this._map) {
                                e && this.fire("tileerror", {
                                    error: e,
                                    tile: i,
                                    coords: t
                                });
                                var n = this._tileCoordsToKey(t);
                                i = this._tiles[n],
                                i && (i.loaded = +new Date, this._map._fadeAnimated ? (o.DomUtil.setOpacity(i.el, 0), o.Util.cancelAnimFrame(this._fadeFrame), this._fadeFrame = o.Util.requestAnimFrame(this._updateOpacity, this)) : (i.active = !0, this._pruneTiles()), e || (o.DomUtil.addClass(i.el, "leaflet-tile-loaded"), this.fire("tileload", {
                                    tile: i.el,
                                    coords: t
                                })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), o.Browser.ielt9 || !this._map._fadeAnimated ? o.Util.requestAnimFrame(this._pruneTiles, this) : setTimeout(o.bind(this._pruneTiles, this), 250)))
                            }
                        },
                        _getTilePos: function(t) {
                            return t.scaleBy(this.getTileSize()).subtract(this._level.origin)
                        },
                        _wrapCoords: function(t) {
                            var e = new o.Point(this._wrapX ? o.Util.wrapNum(t.x, this._wrapX) : t.x, this._wrapY ? o.Util.wrapNum(t.y, this._wrapY) : t.y);
                            return e.z = t.z,
                                e
                        },
                        _pxBoundsToTileRange: function(t) {
                            var e = this.getTileSize();
                            return new o.Bounds(t.min.unscaleBy(e).floor(), t.max.unscaleBy(e).ceil().subtract([1, 1]))
                        },
                        _noTilesToLoad: function() {
                            for (var t in this._tiles) if (!this._tiles[t].loaded) return ! 1;
                            return ! 0
                        }
                    }),
                    o.gridLayer = function(t) {
                        return new o.GridLayer(t)
                    },
                    o.TileLayer = o.GridLayer.extend({
                        options: {
                            minZoom: 0,
                            maxZoom: 18,
                            maxNativeZoom: null,
                            minNativeZoom: null,
                            subdomains: "abc",
                            errorTileUrl: "",
                            zoomOffset: 0,
                            tms: !1,
                            zoomReverse: !1,
                            detectRetina: !1,
                            crossOrigin: !1
                        },
                        initialize: function(t, e) {
                            this._url = t,
                                e = o.setOptions(this, e),
                            e.detectRetina && o.Browser.retina && e.maxZoom > 0 && (e.tileSize = Math.floor(e.tileSize / 2), e.zoomReverse ? (e.zoomOffset--, e.minZoom++) : (e.zoomOffset++, e.maxZoom--), e.minZoom = Math.max(0, e.minZoom)),
                            "string" == typeof e.subdomains && (e.subdomains = e.subdomains.split("")),
                            o.Browser.android || this.on("tileunload", this._onTileRemove)
                        },
                        setUrl: function(t, e) {
                            return this._url = t,
                            e || this.redraw(),
                                this
                        },
                        createTile: function(t, i) {
                            var n = e.createElement("img");
                            return o.DomEvent.on(n, "load", o.bind(this._tileOnLoad, this, i, n)),
                                o.DomEvent.on(n, "error", o.bind(this._tileOnError, this, i, n)),
                            this.options.crossOrigin && (n.crossOrigin = ""),
                                n.alt = "",
                                n.setAttribute("role", "presentation"),
                                n.src = this.getTileUrl(t),
                                n
                        },
                        getTileUrl: function(t) {
                            var e = {
                                r: o.Browser.retina ? "@2x": "",
                                s: this._getSubdomain(t),
                                x: t.x,
                                y: t.y,
                                z: this._getZoomForUrl()
                            };
                            if (this._map && !this._map.options.crs.infinite) {
                                var i = this._globalTileRange.max.y - t.y;
                                this.options.tms && (e.y = i),
                                    e["-y"] = i
                            }
                            return o.Util.template(this._url, o.extend(e, this.options))
                        },
                        _tileOnLoad: function(t, e) {
                            o.Browser.ielt9 ? setTimeout(o.bind(t, this, null, e), 0) : t(null, e)
                        },
                        _tileOnError: function(t, e, i) {
                            var o = this.options.errorTileUrl;
                            o && (e.src = o),
                                t(i, e)
                        },
                        getTileSize: function() {
                            var t = this._map,
                                e = o.GridLayer.prototype.getTileSize.call(this),
                                i = this._tileZoom + this.options.zoomOffset,
                                n = this.options.minNativeZoom,
                                s = this.options.maxNativeZoom;
                            return null !== n && i < n ? e.divideBy(t.getZoomScale(n, i)).round() : null !== s && i > s ? e.divideBy(t.getZoomScale(s, i)).round() : e
                        },
                        _onTileRemove: function(t) {
                            t.tile.onload = null
                        },
                        _getZoomForUrl: function() {
                            var t = this._tileZoom,
                                e = this.options.maxZoom,
                                i = this.options.zoomReverse,
                                o = this.options.zoomOffset,
                                n = this.options.minNativeZoom,
                                s = this.options.maxNativeZoom;
                            return i && (t = e - t),
                                t += o,
                                null !== n && t < n ? n: null !== s && t > s ? s: t
                        },
                        _getSubdomain: function(t) {
                            var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
                            return this.options.subdomains[e]
                        },
                        _abortLoading: function() {
                            var t, e;
                            for (t in this._tiles) this._tiles[t].coords.z !== this._tileZoom && (e = this._tiles[t].el, e.onload = o.Util.falseFn, e.onerror = o.Util.falseFn, e.complete || (e.src = o.Util.emptyImageUrl, o.DomUtil.remove(e)))
                        }
                    }),
                    o.tileLayer = function(t, e) {
                        return new o.TileLayer(t, e)
                    },
                    o.TileLayer.WMS = o.TileLayer.extend({
                        defaultWmsParams: {
                            service: "WMS",
                            request: "GetMap",
                            layers: "",
                            styles: "",
                            format: "image/jpeg",
                            transparent: !1,
                            version: "1.1.1"
                        },
                        options: {
                            crs: null,
                            uppercase: !1
                        },
                        initialize: function(t, e) {
                            this._url = t;
                            var i = o.extend({},
                                this.defaultWmsParams);
                            for (var n in e) n in this.options || (i[n] = e[n]);
                            e = o.setOptions(this, e),
                                i.width = i.height = e.tileSize * (e.detectRetina && o.Browser.retina ? 2 : 1),
                                this.wmsParams = i
                        },
                        onAdd: function(t) {
                            this._crs = this.options.crs || t.options.crs,
                                this._wmsVersion = parseFloat(this.wmsParams.version);
                            var e = this._wmsVersion >= 1.3 ? "crs": "srs";
                            this.wmsParams[e] = this._crs.code,
                                o.TileLayer.prototype.onAdd.call(this, t)
                        },
                        getTileUrl: function(t) {
                            var e = this._tileCoordsToBounds(t),
                                i = this._crs.project(e.getNorthWest()),
                                n = this._crs.project(e.getSouthEast()),
                                s = (this._wmsVersion >= 1.3 && this._crs === o.CRS.EPSG4326 ? [n.y, i.x, i.y, n.x] : [i.x, n.y, n.x, i.y]).join(","),
                                r = o.TileLayer.prototype.getTileUrl.call(this, t);
                            return r + o.Util.getParamString(this.wmsParams, r, this.options.uppercase) + (this.options.uppercase ? "&BBOX=": "&bbox=") + s
                        },
                        setParams: function(t, e) {
                            return o.extend(this.wmsParams, t),
                            e || this.redraw(),
                                this
                        }
                    }),
                    o.tileLayer.wms = function(t, e) {
                        return new o.TileLayer.WMS(t, e)
                    },
                    o.ImageOverlay = o.Layer.extend({
                        options: {
                            opacity: 1,
                            alt: "",
                            interactive: !1,
                            crossOrigin: !1
                        },
                        initialize: function(t, e, i) {
                            this._url = t,
                                this._bounds = o.latLngBounds(e),
                                o.setOptions(this, i)
                        },
                        onAdd: function() {
                            this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()),
                            this.options.interactive && (o.DomUtil.addClass(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)),
                                this.getPane().appendChild(this._image),
                                this._reset()
                        },
                        onRemove: function() {
                            o.DomUtil.remove(this._image),
                            this.options.interactive && this.removeInteractiveTarget(this._image)
                        },
                        setOpacity: function(t) {
                            return this.options.opacity = t,
                            this._image && this._updateOpacity(),
                                this
                        },
                        setStyle: function(t) {
                            return t.opacity && this.setOpacity(t.opacity),
                                this
                        },
                        bringToFront: function() {
                            return this._map && o.DomUtil.toFront(this._image),
                                this
                        },
                        bringToBack: function() {
                            return this._map && o.DomUtil.toBack(this._image),
                                this
                        },
                        setUrl: function(t) {
                            return this._url = t,
                            this._image && (this._image.src = t),
                                this
                        },
                        setBounds: function(t) {
                            return this._bounds = t,
                            this._map && this._reset(),
                                this
                        },
                        getEvents: function() {
                            var t = {
                                zoom: this._reset,
                                viewreset: this._reset
                            };
                            return this._zoomAnimated && (t.zoomanim = this._animateZoom),
                                t
                        },
                        getBounds: function() {
                            return this._bounds
                        },
                        getElement: function() {
                            return this._image
                        },
                        _initImage: function() {
                            var t = this._image = o.DomUtil.create("img", "leaflet-image-layer " + (this._zoomAnimated ? "leaflet-zoom-animated": ""));
                            t.onselectstart = o.Util.falseFn,
                                t.onmousemove = o.Util.falseFn,
                                t.onload = o.bind(this.fire, this, "load"),
                            this.options.crossOrigin && (t.crossOrigin = ""),
                                t.src = this._url,
                                t.alt = this.options.alt
                        },
                        _animateZoom: function(t) {
                            var e = this._map.getZoomScale(t.zoom),
                                i = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
                            o.DomUtil.setTransform(this._image, i, e)
                        },
                        _reset: function() {
                            var t = this._image,
                                e = new o.Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
                                i = e.getSize();
                            o.DomUtil.setPosition(t, e.min),
                                t.style.width = i.x + "px",
                                t.style.height = i.y + "px"
                        },
                        _updateOpacity: function() {
                            o.DomUtil.setOpacity(this._image, this.options.opacity)
                        }
                    }),
                    o.imageOverlay = function(t, e, i) {
                        return new o.ImageOverlay(t, e, i)
                    },
                    o.Icon = o.Class.extend({
                        initialize: function(t) {
                            o.setOptions(this, t)
                        },
                        createIcon: function(t) {
                            return this._createIcon("icon", t)
                        },
                        createShadow: function(t) {
                            return this._createIcon("shadow", t)
                        },
                        _createIcon: function(t, e) {
                            var i = this._getIconUrl(t);
                            if (!i) {
                                if ("icon" === t) throw new Error("iconUrl not set in Icon options (see the docs).");
                                return null
                            }
                            var o = this._createImg(i, e && "IMG" === e.tagName ? e: null);
                            return this._setIconStyles(o, t),
                                o
                        },
                        _setIconStyles: function(t, e) {
                            var i = this.options,
                                n = i[e + "Size"];
                            "number" == typeof n && (n = [n, n]);
                            var s = o.point(n),
                                r = o.point("shadow" === e && i.shadowAnchor || i.iconAnchor || s && s.divideBy(2, !0));
                            t.className = "leaflet-marker-" + e + " " + (i.className || ""),
                            r && (t.style.marginLeft = -r.x + "px", t.style.marginTop = -r.y + "px"),
                            s && (t.style.width = s.x + "px", t.style.height = s.y + "px")
                        },
                        _createImg: function(t, i) {
                            return i = i || e.createElement("img"),
                                i.src = t,
                                i
                        },
                        _getIconUrl: function(t) {
                            return o.Browser.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"]
                        }
                    }),
                    o.icon = function(t) {
                        return new o.Icon(t)
                    },
                    o.Icon.Default = o.Icon.extend({
                        options: {
                            iconUrl: "marker-icon.png",
                            iconRetinaUrl: "marker-icon-2x.png",
                            shadowUrl: "marker-shadow.png",
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            tooltipAnchor: [16, -28],
                            shadowSize: [41, 41]
                        },
                        _getIconUrl: function(t) {
                            return o.Icon.Default.imagePath || (o.Icon.Default.imagePath = this._detectIconPath()),
                            (this.options.imagePath || o.Icon.Default.imagePath) + o.Icon.prototype._getIconUrl.call(this, t)
                        },
                        _detectIconPath: function() {
                            var t = o.DomUtil.create("div", "leaflet-default-icon-path", e.body),
                                i = o.DomUtil.getStyle(t, "background-image") || o.DomUtil.getStyle(t, "backgroundImage");
                            return e.body.removeChild(t),
                                0 === i.indexOf("url") ? i.replace(/^url\([\"\']?/, "").replace(/marker-icon\.png[\"\']?\)$/, "") : ""
                        }
                    }),
                    o.Marker = o.Layer.extend({
                        options: {
                            icon: new o.Icon.Default,
                            interactive: !0,
                            draggable: !1,
                            keyboard: !0,
                            title: "",
                            alt: "",
                            zIndexOffset: 0,
                            opacity: 1,
                            riseOnHover: !1,
                            riseOffset: 250,
                            pane: "markerPane",
                            nonBubblingEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"]
                        },
                        initialize: function(t, e) {
                            o.setOptions(this, e),
                                this._latlng = o.latLng(t)
                        },
                        onAdd: function(t) {
                            this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation,
                            this._zoomAnimated && t.on("zoomanim", this._animateZoom, this),
                                this._initIcon(),
                                this.update()
                        },
                        onRemove: function(t) {
                            this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()),
                            this._zoomAnimated && t.off("zoomanim", this._animateZoom, this),
                                this._removeIcon(),
                                this._removeShadow()
                        },
                        getEvents: function() {
                            return {
                                zoom: this.update,
                                viewreset: this.update
                            }
                        },
                        getLatLng: function() {
                            return this._latlng
                        },
                        setLatLng: function(t) {
                            var e = this._latlng;
                            return this._latlng = o.latLng(t),
                                this.update(),
                                this.fire("move", {
                                    oldLatLng: e,
                                    latlng: this._latlng
                                })
                        },
                        setZIndexOffset: function(t) {
                            return this.options.zIndexOffset = t,
                                this.update()
                        },
                        setIcon: function(t) {
                            return this.options.icon = t,
                            this._map && (this._initIcon(), this.update()),
                            this._popup && this.bindPopup(this._popup, this._popup.options),
                                this
                        },
                        getElement: function() {
                            return this._icon
                        },
                        update: function() {
                            if (this._icon) {
                                var t = this._map.latLngToLayerPoint(this._latlng).round();
                                this._setPos(t)
                            }
                            return this
                        },
                        _initIcon: function() {
                            var t = this.options,
                                e = "leaflet-zoom-" + (this._zoomAnimated ? "animated": "hide"),
                                i = t.icon.createIcon(this._icon),
                                n = !1;
                            i !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (i.title = t.title), t.alt && (i.alt = t.alt)),
                                o.DomUtil.addClass(i, e),
                            t.keyboard && (i.tabIndex = "0"),
                                this._icon = i,
                            t.riseOnHover && this.on({
                                mouseover: this._bringToFront,
                                mouseout: this._resetZIndex
                            });
                            var s = t.icon.createShadow(this._shadow),
                                r = !1;
                            s !== this._shadow && (this._removeShadow(), r = !0),
                            s && o.DomUtil.addClass(s, e),
                                this._shadow = s,
                            t.opacity < 1 && this._updateOpacity(),
                            n && this.getPane().appendChild(this._icon),
                                this._initInteraction(),
                            s && r && this.getPane("shadowPane").appendChild(this._shadow)
                        },
                        _removeIcon: function() {
                            this.options.riseOnHover && this.off({
                                mouseover: this._bringToFront,
                                mouseout: this._resetZIndex
                            }),
                                o.DomUtil.remove(this._icon),
                                this.removeInteractiveTarget(this._icon),
                                this._icon = null
                        },
                        _removeShadow: function() {
                            this._shadow && o.DomUtil.remove(this._shadow),
                                this._shadow = null
                        },
                        _setPos: function(t) {
                            o.DomUtil.setPosition(this._icon, t),
                            this._shadow && o.DomUtil.setPosition(this._shadow, t),
                                this._zIndex = t.y + this.options.zIndexOffset,
                                this._resetZIndex()
                        },
                        _updateZIndex: function(t) {
                            this._icon.style.zIndex = this._zIndex + t
                        },
                        _animateZoom: function(t) {
                            var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
                            this._setPos(e)
                        },
                        _initInteraction: function() {
                            if (this.options.interactive && (o.DomUtil.addClass(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), o.Handler.MarkerDrag)) {
                                var t = this.options.draggable;
                                this.dragging && (t = this.dragging.enabled(), this.dragging.disable()),
                                    this.dragging = new o.Handler.MarkerDrag(this),
                                t && this.dragging.enable()
                            }
                        },
                        setOpacity: function(t) {
                            return this.options.opacity = t,
                            this._map && this._updateOpacity(),
                                this
                        },
                        _updateOpacity: function() {
                            var t = this.options.opacity;
                            o.DomUtil.setOpacity(this._icon, t),
                            this._shadow && o.DomUtil.setOpacity(this._shadow, t)
                        },
                        _bringToFront: function() {
                            this._updateZIndex(this.options.riseOffset)
                        },
                        _resetZIndex: function() {
                            this._updateZIndex(0)
                        },
                        _getPopupAnchor: function() {
                            return this.options.icon.options.popupAnchor || [0, 0]
                        },
                        _getTooltipAnchor: function() {
                            return this.options.icon.options.tooltipAnchor || [0, 0]
                        }
                    }),
                    o.marker = function(t, e) {
                        return new o.Marker(t, e)
                    },
                    o.DivIcon = o.Icon.extend({
                        options: {
                            iconSize: [12, 12],
                            html: !1,
                            bgPos: null,
                            className: "leaflet-div-icon"
                        },
                        createIcon: function(t) {
                            var i = t && "DIV" === t.tagName ? t: e.createElement("div"),
                                n = this.options;
                            if (i.innerHTML = !1 !== n.html ? n.html: "", n.bgPos) {
                                var s = o.point(n.bgPos);
                                i.style.backgroundPosition = -s.x + "px " + -s.y + "px"
                            }
                            return this._setIconStyles(i, "icon"),
                                i
                        },
                        createShadow: function() {
                            return null
                        }
                    }),
                    o.divIcon = function(t) {
                        return new o.DivIcon(t)
                    },
                    o.DivOverlay = o.Layer.extend({
                        options: {
                            offset: [0, 7],
                            className: "",
                            pane: "popupPane"
                        },
                        initialize: function(t, e) {
                            o.setOptions(this, t),
                                this._source = e
                        },
                        onAdd: function(t) {
                            this._zoomAnimated = t._zoomAnimated,
                            this._container || this._initLayout(),
                            t._fadeAnimated && o.DomUtil.setOpacity(this._container, 0),
                                clearTimeout(this._removeTimeout),
                                this.getPane().appendChild(this._container),
                                this.update(),
                            t._fadeAnimated && o.DomUtil.setOpacity(this._container, 1),
                                this.bringToFront()
                        },
                        onRemove: function(t) {
                            t._fadeAnimated ? (o.DomUtil.setOpacity(this._container, 0), this._removeTimeout = setTimeout(o.bind(o.DomUtil.remove, o.DomUtil, this._container), 200)) : o.DomUtil.remove(this._container)
                        },
                        getLatLng: function() {
                            return this._latlng
                        },
                        setLatLng: function(t) {
                            return this._latlng = o.latLng(t),
                            this._map && (this._updatePosition(), this._adjustPan()),
                                this
                        },
                        getContent: function() {
                            return this._content
                        },
                        setContent: function(t) {
                            return this._content = t,
                                this.update(),
                                this
                        },
                        getElement: function() {
                            return this._container
                        },
                        update: function() {
                            this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
                        },
                        getEvents: function() {
                            var t = {
                                zoom: this._updatePosition,
                                viewreset: this._updatePosition
                            };
                            return this._zoomAnimated && (t.zoomanim = this._animateZoom),
                                t
                        },
                        isOpen: function() {
                            return !! this._map && this._map.hasLayer(this)
                        },
                        bringToFront: function() {
                            return this._map && o.DomUtil.toFront(this._container),
                                this
                        },
                        bringToBack: function() {
                            return this._map && o.DomUtil.toBack(this._container),
                                this
                        },
                        _updateContent: function() {
                            if (this._content) {
                                var t = this._contentNode,
                                    e = "function" == typeof this._content ? this._content(this._source || this) : this._content;
                                if ("string" == typeof e) t.innerHTML = e;
                                else {
                                    for (; t.hasChildNodes();) t.removeChild(t.firstChild);
                                    t.appendChild(e)
                                }
                                this.fire("contentupdate")
                            }
                        },
                        _updatePosition: function() {
                            if (this._map) {
                                var t = this._map.latLngToLayerPoint(this._latlng),
                                    e = o.point(this.options.offset),
                                    i = this._getAnchor();
                                this._zoomAnimated ? o.DomUtil.setPosition(this._container, t.add(i)) : e = e.add(t).add(i);
                                var n = this._containerBottom = -e.y,
                                    s = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
                                this._container.style.bottom = n + "px",
                                    this._container.style.left = s + "px"
                            }
                        },
                        _getAnchor: function() {
                            return [0, 0]
                        }
                    }),
                    o.Popup = o.DivOverlay.extend({
                        options: {
                            maxWidth: 300,
                            minWidth: 50,
                            maxHeight: null,
                            autoPan: !0,
                            autoPanPaddingTopLeft: null,
                            autoPanPaddingBottomRight: null,
                            autoPanPadding: [5, 5],
                            keepInView: !1,
                            closeButton: !0,
                            autoClose: !0,
                            className: ""
                        },
                        openOn: function(t) {
                            return t.openPopup(this),
                                this
                        },
                        onAdd: function(t) {
                            o.DivOverlay.prototype.onAdd.call(this, t),
                                t.fire("popupopen", {
                                    popup: this
                                }),
                            this._source && (this._source.fire("popupopen", {
                                    popup: this
                                },
                                !0), this._source instanceof o.Path || this._source.on("preclick", o.DomEvent.stopPropagation))
                        },
                        onRemove: function(t) {
                            o.DivOverlay.prototype.onRemove.call(this, t),
                                t.fire("popupclose", {
                                    popup: this
                                }),
                            this._source && (this._source.fire("popupclose", {
                                    popup: this
                                },
                                !0), this._source instanceof o.Path || this._source.off("preclick", o.DomEvent.stopPropagation))
                        },
                        getEvents: function() {
                            var t = o.DivOverlay.prototype.getEvents.call(this);
                            return ("closeOnClick" in this.options ? this.options.closeOnClick: this._map.options.closePopupOnClick) && (t.preclick = this._close),
                            this.options.keepInView && (t.moveend = this._adjustPan),
                                t
                        },
                        _close: function() {
                            this._map && this._map.closePopup(this)
                        },
                        _initLayout: function() {
                            var t = "leaflet-popup",
                                e = this._container = o.DomUtil.create("div", t + " " + (this.options.className || "") + " leaflet-zoom-animated");
                            if (this.options.closeButton) {
                                var i = this._closeButton = o.DomUtil.create("a", t + "-close-button", e);
                                i.href = "#close",
                                    i.innerHTML = "&#215;",
                                    o.DomEvent.on(i, "click", this._onCloseButtonClick, this)
                            }
                            var n = this._wrapper = o.DomUtil.create("div", t + "-content-wrapper", e);
                            this._contentNode = o.DomUtil.create("div", t + "-content", n),
                                o.DomEvent.disableClickPropagation(n).disableScrollPropagation(this._contentNode).on(n, "contextmenu", o.DomEvent.stopPropagation),
                                this._tipContainer = o.DomUtil.create("div", t + "-tip-container", e),
                                this._tip = o.DomUtil.create("div", t + "-tip", this._tipContainer)
                        },
                        _updateLayout: function() {
                            var t = this._contentNode,
                                e = t.style;
                            e.width = "",
                                e.whiteSpace = "nowrap";
                            var i = t.offsetWidth;
                            i = Math.min(i, this.options.maxWidth),
                                i = Math.max(i, this.options.minWidth),
                                e.width = i + 1 + "px",
                                e.whiteSpace = "",
                                e.height = "";
                            var n = t.offsetHeight,
                                s = this.options.maxHeight;
                            s && n > s ? (e.height = s + "px", o.DomUtil.addClass(t, "leaflet-popup-scrolled")) : o.DomUtil.removeClass(t, "leaflet-popup-scrolled"),
                                this._containerWidth = this._container.offsetWidth
                        },
                        _animateZoom: function(t) {
                            var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center),
                                i = this._getAnchor();
                            o.DomUtil.setPosition(this._container, e.add(i))
                        },
                        _adjustPan: function() {
                            if (! (!this.options.autoPan || this._map._panAnim && this._map._panAnim._inProgress)) {
                                var t = this._map,
                                    e = parseInt(o.DomUtil.getStyle(this._container, "marginBottom"), 10) || 0,
                                    i = this._container.offsetHeight + e,
                                    n = this._containerWidth,
                                    s = new o.Point(this._containerLeft, -i - this._containerBottom);
                                s._add(o.DomUtil.getPosition(this._container));
                                var r = t.layerPointToContainerPoint(s),
                                    a = o.point(this.options.autoPanPadding),
                                    h = o.point(this.options.autoPanPaddingTopLeft || a),
                                    l = o.point(this.options.autoPanPaddingBottomRight || a),
                                    u = t.getSize(),
                                    c = 0,
                                    d = 0;
                                r.x + n + l.x > u.x && (c = r.x + n - u.x + l.x),
                                r.x - c - h.x < 0 && (c = r.x - h.x),
                                r.y + i + l.y > u.y && (d = r.y + i - u.y + l.y),
                                r.y - d - h.y < 0 && (d = r.y - h.y),
                                (c || d) && t.fire("autopanstart").panBy([c, d])
                            }
                        },
                        _onCloseButtonClick: function(t) {
                            this._close(),
                                o.DomEvent.stop(t)
                        },
                        _getAnchor: function() {
                            return o.point(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0])
                        }
                    }),
                    o.popup = function(t, e) {
                        return new o.Popup(t, e)
                    },
                    o.Map.mergeOptions({
                        closePopupOnClick: !0
                    }),
                    o.Map.include({
                        openPopup: function(t, e, i) {
                            return t instanceof o.Popup || (t = new o.Popup(i).setContent(t)),
                            e && t.setLatLng(e),
                                this.hasLayer(t) ? this: (this._popup && this._popup.options.autoClose && this.closePopup(), this._popup = t, this.addLayer(t))
                        },
                        closePopup: function(t) {
                            return t && t !== this._popup || (t = this._popup, this._popup = null),
                            t && this.removeLayer(t),
                                this
                        }
                    }),
                    o.Layer.include({
                        bindPopup: function(t, e) {
                            return t instanceof o.Popup ? (o.setOptions(t, e), this._popup = t, t._source = this) : (this._popup && !e || (this._popup = new o.Popup(e, this)), this._popup.setContent(t)),
                            this._popupHandlersAdded || (this.on({
                                click: this._openPopup,
                                remove: this.closePopup,
                                move: this._movePopup
                            }), this._popupHandlersAdded = !0),
                                this
                        },
                        unbindPopup: function() {
                            return this._popup && (this.off({
                                click: this._openPopup,
                                remove: this.closePopup,
                                move: this._movePopup
                            }), this._popupHandlersAdded = !1, this._popup = null),
                                this
                        },
                        openPopup: function(t, e) {
                            if (t instanceof o.Layer || (e = t, t = this), t instanceof o.FeatureGroup) for (var i in this._layers) {
                                t = this._layers[i];
                                break
                            }
                            return e || (e = t.getCenter ? t.getCenter() : t.getLatLng()),
                            this._popup && this._map && (this._popup._source = t, this._popup.update(), this._map.openPopup(this._popup, e)),
                                this
                        },
                        closePopup: function() {
                            return this._popup && this._popup._close(),
                                this
                        },
                        togglePopup: function(t) {
                            return this._popup && (this._popup._map ? this.closePopup() : this.openPopup(t)),
                                this
                        },
                        isPopupOpen: function() {
                            return this._popup.isOpen()
                        },
                        setPopupContent: function(t) {
                            return this._popup && this._popup.setContent(t),
                                this
                        },
                        getPopup: function() {
                            return this._popup
                        },
                        _openPopup: function(t) {
                            var e = t.layer || t.target;
                            if (this._popup && this._map) {
                                if (o.DomEvent.stop(t), e instanceof o.Path) return void this.openPopup(t.layer || t.target, t.latlng);
                                this._map.hasLayer(this._popup) && this._popup._source === e ? this.closePopup() : this.openPopup(e, t.latlng)
                            }
                        },
                        _movePopup: function(t) {
                            this._popup.setLatLng(t.latlng)
                        }
                    }),
                    o.Tooltip = o.DivOverlay.extend({
                        options: {
                            pane: "tooltipPane",
                            offset: [0, 0],
                            direction: "auto",
                            permanent: !1,
                            sticky: !1,
                            interactive: !1,
                            opacity: .9
                        },
                        onAdd: function(t) {
                            o.DivOverlay.prototype.onAdd.call(this, t),
                                this.setOpacity(this.options.opacity),
                                t.fire("tooltipopen", {
                                    tooltip: this
                                }),
                            this._source && this._source.fire("tooltipopen", {
                                    tooltip: this
                                },
                                !0)
                        },
                        onRemove: function(t) {
                            o.DivOverlay.prototype.onRemove.call(this, t),
                                t.fire("tooltipclose", {
                                    tooltip: this
                                }),
                            this._source && this._source.fire("tooltipclose", {
                                    tooltip: this
                                },
                                !0)
                        },
                        getEvents: function() {
                            var t = o.DivOverlay.prototype.getEvents.call(this);
                            return o.Browser.touch && !this.options.permanent && (t.preclick = this._close),
                                t
                        },
                        _close: function() {
                            this._map && this._map.closeTooltip(this)
                        },
                        _initLayout: function() {
                            var t = "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated": "hide");
                            this._contentNode = this._container = o.DomUtil.create("div", t)
                        },
                        _updateLayout: function() {},
                        _adjustPan: function() {},
                        _setPosition: function(t) {
                            var e = this._map,
                                i = this._container,
                                n = e.latLngToContainerPoint(e.getCenter()),
                                s = e.layerPointToContainerPoint(t),
                                r = this.options.direction,
                                a = i.offsetWidth,
                                h = i.offsetHeight,
                                l = o.point(this.options.offset),
                                u = this._getAnchor();
                            "top" === r ? t = t.add(o.point( - a / 2 + l.x, -h + l.y + u.y, !0)) : "bottom" === r ? t = t.subtract(o.point(a / 2 - l.x, -l.y, !0)) : "center" === r ? t = t.subtract(o.point(a / 2 + l.x, h / 2 - u.y + l.y, !0)) : "right" === r || "auto" === r && s.x < n.x ? (r = "right", t = t.add(o.point(l.x + u.x, u.y - h / 2 + l.y, !0))) : (r = "left", t = t.subtract(o.point(a + u.x - l.x, h / 2 - u.y - l.y, !0))),
                                o.DomUtil.removeClass(i, "leaflet-tooltip-right"),
                                o.DomUtil.removeClass(i, "leaflet-tooltip-left"),
                                o.DomUtil.removeClass(i, "leaflet-tooltip-top"),
                                o.DomUtil.removeClass(i, "leaflet-tooltip-bottom"),
                                o.DomUtil.addClass(i, "leaflet-tooltip-" + r),
                                o.DomUtil.setPosition(i, t)
                        },
                        _updatePosition: function() {
                            var t = this._map.latLngToLayerPoint(this._latlng);
                            this._setPosition(t)
                        },
                        setOpacity: function(t) {
                            this.options.opacity = t,
                            this._container && o.DomUtil.setOpacity(this._container, t)
                        },
                        _animateZoom: function(t) {
                            var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
                            this._setPosition(e)
                        },
                        _getAnchor: function() {
                            return o.point(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0])
                        }
                    }),
                    o.tooltip = function(t, e) {
                        return new o.Tooltip(t, e)
                    },
                    o.Map.include({
                        openTooltip: function(t, e, i) {
                            return t instanceof o.Tooltip || (t = new o.Tooltip(i).setContent(t)),
                            e && t.setLatLng(e),
                                this.hasLayer(t) ? this: this.addLayer(t)
                        },
                        closeTooltip: function(t) {
                            return t && this.removeLayer(t),
                                this
                        }
                    }),
                    o.Layer.include({
                        bindTooltip: function(t, e) {
                            return t instanceof o.Tooltip ? (o.setOptions(t, e), this._tooltip = t, t._source = this) : (this._tooltip && !e || (this._tooltip = o.tooltip(e, this)), this._tooltip.setContent(t)),
                                this._initTooltipInteractions(),
                            this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(),
                                this
                        },
                        unbindTooltip: function() {
                            return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null),
                                this
                        },
                        _initTooltipInteractions: function(t) {
                            if (t || !this._tooltipHandlersAdded) {
                                var e = t ? "off": "on",
                                    i = {
                                        remove: this.closeTooltip,
                                        move: this._moveTooltip
                                    };
                                this._tooltip.options.permanent ? i.add = this._openTooltip: (i.mouseover = this._openTooltip, i.mouseout = this.closeTooltip, this._tooltip.options.sticky && (i.mousemove = this._moveTooltip), o.Browser.touch && (i.click = this._openTooltip)),
                                    this[e](i),
                                    this._tooltipHandlersAdded = !t
                            }
                        },
                        openTooltip: function(t, e) {
                            if (t instanceof o.Layer || (e = t, t = this), t instanceof o.FeatureGroup) for (var i in this._layers) {
                                t = this._layers[i];
                                break
                            }
                            return e || (e = t.getCenter ? t.getCenter() : t.getLatLng()),
                            this._tooltip && this._map && (this._tooltip._source = t, this._tooltip.update(), this._map.openTooltip(this._tooltip, e), this._tooltip.options.interactive && this._tooltip._container && (o.DomUtil.addClass(this._tooltip._container, "leaflet-clickable"), this.addInteractiveTarget(this._tooltip._container))),
                                this
                        },
                        closeTooltip: function() {
                            return this._tooltip && (this._tooltip._close(), this._tooltip.options.interactive && this._tooltip._container && (o.DomUtil.removeClass(this._tooltip._container, "leaflet-clickable"), this.removeInteractiveTarget(this._tooltip._container))),
                                this
                        },
                        toggleTooltip: function(t) {
                            return this._tooltip && (this._tooltip._map ? this.closeTooltip() : this.openTooltip(t)),
                                this
                        },
                        isTooltipOpen: function() {
                            return this._tooltip.isOpen()
                        },
                        setTooltipContent: function(t) {
                            return this._tooltip && this._tooltip.setContent(t),
                                this
                        },
                        getTooltip: function() {
                            return this._tooltip
                        },
                        _openTooltip: function(t) {
                            var e = t.layer || t.target;
                            this._tooltip && this._map && this.openTooltip(e, this._tooltip.options.sticky ? t.latlng: void 0)
                        },
                        _moveTooltip: function(t) {
                            var e, i, o = t.latlng;
                            this._tooltip.options.sticky && t.originalEvent && (e = this._map.mouseEventToContainerPoint(t.originalEvent), i = this._map.containerPointToLayerPoint(e), o = this._map.layerPointToLatLng(i)),
                                this._tooltip.setLatLng(o)
                        }
                    }),
                    o.LayerGroup = o.Layer.extend({
                        initialize: function(t) {
                            this._layers = {};
                            var e, i;
                            if (t) for (e = 0, i = t.length; e < i; e++) this.addLayer(t[e])
                        },
                        addLayer: function(t) {
                            var e = this.getLayerId(t);
                            return this._layers[e] = t,
                            this._map && this._map.addLayer(t),
                                this
                        },
                        removeLayer: function(t) {
                            var e = t in this._layers ? t: this.getLayerId(t);
                            return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]),
                                delete this._layers[e],
                                this
                        },
                        hasLayer: function(t) {
                            return !! t && (t in this._layers || this.getLayerId(t) in this._layers)
                        },
                        clearLayers: function() {
                            for (var t in this._layers) this.removeLayer(this._layers[t]);
                            return this
                        },
                        invoke: function(t) {
                            var e, i, o = Array.prototype.slice.call(arguments, 1);
                            for (e in this._layers) i = this._layers[e],
                            i[t] && i[t].apply(i, o);
                            return this
                        },
                        onAdd: function(t) {
                            for (var e in this._layers) t.addLayer(this._layers[e])
                        },
                        onRemove: function(t) {
                            for (var e in this._layers) t.removeLayer(this._layers[e])
                        },
                        eachLayer: function(t, e) {
                            for (var i in this._layers) t.call(e, this._layers[i]);
                            return this
                        },
                        getLayer: function(t) {
                            return this._layers[t]
                        },
                        getLayers: function() {
                            var t = [];
                            for (var e in this._layers) t.push(this._layers[e]);
                            return t
                        },
                        setZIndex: function(t) {
                            return this.invoke("setZIndex", t)
                        },
                        getLayerId: function(t) {
                            return o.stamp(t)
                        }
                    }),
                    o.layerGroup = function(t) {
                        return new o.LayerGroup(t)
                    },
                    o.FeatureGroup = o.LayerGroup.extend({
                        addLayer: function(t) {
                            return this.hasLayer(t) ? this: (t.addEventParent(this), o.LayerGroup.prototype.addLayer.call(this, t), this.fire("layeradd", {
                                layer: t
                            }))
                        },
                        removeLayer: function(t) {
                            return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), o.LayerGroup.prototype.removeLayer.call(this, t), this.fire("layerremove", {
                                layer: t
                            })) : this
                        },
                        setStyle: function(t) {
                            return this.invoke("setStyle", t)
                        },
                        bringToFront: function() {
                            return this.invoke("bringToFront")
                        },
                        bringToBack: function() {
                            return this.invoke("bringToBack")
                        },
                        getBounds: function() {
                            var t = new o.LatLngBounds;
                            for (var e in this._layers) {
                                var i = this._layers[e];
                                t.extend(i.getBounds ? i.getBounds() : i.getLatLng())
                            }
                            return t
                        }
                    }),
                    o.featureGroup = function(t) {
                        return new o.FeatureGroup(t)
                    },
                    o.Renderer = o.Layer.extend({
                        options: {
                            padding: .1
                        },
                        initialize: function(t) {
                            o.setOptions(this, t),
                                o.stamp(this),
                                this._layers = this._layers || {}
                        },
                        onAdd: function() {
                            this._container || (this._initContainer(), this._zoomAnimated && o.DomUtil.addClass(this._container, "leaflet-zoom-animated")),
                                this.getPane().appendChild(this._container),
                                this._update(),
                                this.on("update", this._updatePaths, this)
                        },
                        onRemove: function() {
                            o.DomUtil.remove(this._container),
                                this.off("update", this._updatePaths, this)
                        },
                        getEvents: function() {
                            var t = {
                                viewreset: this._reset,
                                zoom: this._onZoom,
                                moveend: this._update,
                                zoomend: this._onZoomEnd
                            };
                            return this._zoomAnimated && (t.zoomanim = this._onAnimZoom),
                                t
                        },
                        _onAnimZoom: function(t) {
                            this._updateTransform(t.center, t.zoom)
                        },
                        _onZoom: function() {
                            this._updateTransform(this._map.getCenter(), this._map.getZoom())
                        },
                        _updateTransform: function(t, e) {
                            var i = this._map.getZoomScale(e, this._zoom),
                                n = o.DomUtil.getPosition(this._container),
                                s = this._map.getSize().multiplyBy(.5 + this.options.padding),
                                r = this._map.project(this._center, e),
                                a = this._map.project(t, e),
                                h = a.subtract(r),
                                l = s.multiplyBy( - i).add(n).add(s).subtract(h);
                            o.Browser.any3d ? o.DomUtil.setTransform(this._container, l, i) : o.DomUtil.setPosition(this._container, l)
                        },
                        _reset: function() {
                            this._update(),
                                this._updateTransform(this._center, this._zoom);
                            for (var t in this._layers) this._layers[t]._reset()
                        },
                        _onZoomEnd: function() {
                            for (var t in this._layers) this._layers[t]._project()
                        },
                        _updatePaths: function() {
                            for (var t in this._layers) this._layers[t]._update()
                        },
                        _update: function() {
                            var t = this.options.padding,
                                e = this._map.getSize(),
                                i = this._map.containerPointToLayerPoint(e.multiplyBy( - t)).round();
                            this._bounds = new o.Bounds(i, i.add(e.multiplyBy(1 + 2 * t)).round()),
                                this._center = this._map.getCenter(),
                                this._zoom = this._map.getZoom()
                        }
                    }),
                    o.Map.include({
                        getRenderer: function(t) {
                            var e = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer;
                            return e || (e = this._renderer = this.options.preferCanvas && o.canvas() || o.svg()),
                            this.hasLayer(e) || this.addLayer(e),
                                e
                        },
                        _getPaneRenderer: function(t) {
                            if ("overlayPane" === t || void 0 === t) return ! 1;
                            var e = this._paneRenderers[t];
                            return void 0 === e && (e = o.SVG && o.svg({
                                    pane: t
                                }) || o.Canvas && o.canvas({
                                    pane: t
                                }), this._paneRenderers[t] = e),
                                e
                        }
                    }),
                    o.Path = o.Layer.extend({
                        options: {
                            stroke: !0,
                            color: "#3388ff",
                            weight: 3,
                            opacity: 1,
                            lineCap: "round",
                            lineJoin: "round",
                            dashArray: null,
                            dashOffset: null,
                            fill: !1,
                            fillColor: null,
                            fillOpacity: .2,
                            fillRule: "evenodd",
                            interactive: !0
                        },
                        beforeAdd: function(t) {
                            this._renderer = t.getRenderer(this)
                        },
                        onAdd: function() {
                            this._renderer._initPath(this),
                                this._reset(),
                                this._renderer._addPath(this)
                        },
                        onRemove: function() {
                            this._renderer._removePath(this)
                        },
                        redraw: function() {
                            return this._map && this._renderer._updatePath(this),
                                this
                        },
                        setStyle: function(t) {
                            return o.setOptions(this, t),
                            this._renderer && this._renderer._updateStyle(this),
                                this
                        },
                        bringToFront: function() {
                            return this._renderer && this._renderer._bringToFront(this),
                                this
                        },
                        bringToBack: function() {
                            return this._renderer && this._renderer._bringToBack(this),
                                this
                        },
                        getElement: function() {
                            return this._path
                        },
                        _reset: function() {
                            this._project(),
                                this._update()
                        },
                        _clickTolerance: function() {
                            return (this.options.stroke ? this.options.weight / 2 : 0) + (o.Browser.touch ? 10 : 0)
                        }
                    }),
                    o.LineUtil = {
                        simplify: function(t, e) {
                            if (!e || !t.length) return t.slice();
                            var i = e * e;
                            return t = this._reducePoints(t, i),
                                t = this._simplifyDP(t, i)
                        },
                        pointToSegmentDistance: function(t, e, i) {
                            return Math.sqrt(this._sqClosestPointOnSegment(t, e, i, !0))
                        },
                        closestPointOnSegment: function(t, e, i) {
                            return this._sqClosestPointOnSegment(t, e, i)
                        },
                        _simplifyDP: function(t, e) {
                            var i = t.length,
                                o = typeof Uint8Array != void 0 + "" ? Uint8Array: Array,
                                n = new o(i);
                            n[0] = n[i - 1] = 1,
                                this._simplifyDPStep(t, n, e, 0, i - 1);
                            var s, r = [];
                            for (s = 0; s < i; s++) n[s] && r.push(t[s]);
                            return r
                        },
                        _simplifyDPStep: function(t, e, i, o, n) {
                            var s, r, a, h = 0;
                            for (r = o + 1; r <= n - 1; r++)(a = this._sqClosestPointOnSegment(t[r], t[o], t[n], !0)) > h && (s = r, h = a);
                            h > i && (e[s] = 1, this._simplifyDPStep(t, e, i, o, s), this._simplifyDPStep(t, e, i, s, n))
                        },
                        _reducePoints: function(t, e) {
                            for (var i = [t[0]], o = 1, n = 0, s = t.length; o < s; o++) this._sqDist(t[o], t[n]) > e && (i.push(t[o]), n = o);
                            return n < s - 1 && i.push(t[s - 1]),
                                i
                        },
                        clipSegment: function(t, e, i, o, n) {
                            var s, r, a, h = o ? this._lastCode: this._getBitCode(t, i),
                                l = this._getBitCode(e, i);
                            for (this._lastCode = l;;) {
                                if (! (h | l)) return [t, e];
                                if (h & l) return ! 1;
                                s = h || l,
                                    r = this._getEdgeIntersection(t, e, s, i, n),
                                    a = this._getBitCode(r, i),
                                    s === h ? (t = r, h = a) : (e = r, l = a)
                            }
                        },
                        _getEdgeIntersection: function(t, e, i, n, s) {
                            var r, a, h = e.x - t.x,
                                l = e.y - t.y,
                                u = n.min,
                                c = n.max;
                            return 8 & i ? (r = t.x + h * (c.y - t.y) / l, a = c.y) : 4 & i ? (r = t.x + h * (u.y - t.y) / l, a = u.y) : 2 & i ? (r = c.x, a = t.y + l * (c.x - t.x) / h) : 1 & i && (r = u.x, a = t.y + l * (u.x - t.x) / h),
                                new o.Point(r, a, s)
                        },
                        _getBitCode: function(t, e) {
                            var i = 0;
                            return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2),
                                t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8),
                                i
                        },
                        _sqDist: function(t, e) {
                            var i = e.x - t.x,
                                o = e.y - t.y;
                            return i * i + o * o
                        },
                        _sqClosestPointOnSegment: function(t, e, i, n) {
                            var s, r = e.x,
                                a = e.y,
                                h = i.x - r,
                                l = i.y - a,
                                u = h * h + l * l;
                            return u > 0 && (s = ((t.x - r) * h + (t.y - a) * l) / u, s > 1 ? (r = i.x, a = i.y) : s > 0 && (r += h * s, a += l * s)),
                                h = t.x - r,
                                l = t.y - a,
                                n ? h * h + l * l: new o.Point(r, a)
                        }
                    },
                    o.Polyline = o.Path.extend({
                        options: {
                            smoothFactor: 1,
                            noClip: !1
                        },
                        initialize: function(t, e) {
                            o.setOptions(this, e),
                                this._setLatLngs(t)
                        },
                        getLatLngs: function() {
                            return this._latlngs
                        },
                        setLatLngs: function(t) {
                            return this._setLatLngs(t),
                                this.redraw()
                        },
                        isEmpty: function() {
                            return ! this._latlngs.length
                        },
                        closestLayerPoint: function(t) {
                            for (var e, i, n = 1 / 0,
                                     s = null,
                                     r = o.LineUtil._sqClosestPointOnSegment,
                                     a = 0,
                                     h = this._parts.length; a < h; a++) for (var l = this._parts[a], u = 1, c = l.length; u < c; u++) {
                                e = l[u - 1],
                                    i = l[u];
                                var d = r(t, e, i, !0);
                                d < n && (n = d, s = r(t, e, i))
                            }
                            return s && (s.distance = Math.sqrt(n)),
                                s
                        },
                        getCenter: function() {
                            if (!this._map) throw new Error("Must add layer to map before using getCenter()");
                            var t, e, i, o, n, s, r, a = this._rings[0],
                                h = a.length;
                            if (!h) return null;
                            for (t = 0, e = 0; t < h - 1; t++) e += a[t].distanceTo(a[t + 1]) / 2;
                            if (0 === e) return this._map.layerPointToLatLng(a[0]);
                            for (t = 0, o = 0; t < h - 1; t++) if (n = a[t], s = a[t + 1], i = n.distanceTo(s), (o += i) > e) return r = (o - e) / i,
                                this._map.layerPointToLatLng([s.x - r * (s.x - n.x), s.y - r * (s.y - n.y)])
                        },
                        getBounds: function() {
                            return this._bounds
                        },
                        addLatLng: function(t, e) {
                            return e = e || this._defaultShape(),
                                t = o.latLng(t),
                                e.push(t),
                                this._bounds.extend(t),
                                this.redraw()
                        },
                        _setLatLngs: function(t) {
                            this._bounds = new o.LatLngBounds,
                                this._latlngs = this._convertLatLngs(t)
                        },
                        _defaultShape: function() {
                            return o.Polyline._flat(this._latlngs) ? this._latlngs: this._latlngs[0]
                        },
                        _convertLatLngs: function(t) {
                            for (var e = [], i = o.Polyline._flat(t), n = 0, s = t.length; n < s; n++) i ? (e[n] = o.latLng(t[n]), this._bounds.extend(e[n])) : e[n] = this._convertLatLngs(t[n]);
                            return e
                        },
                        _project: function() {
                            var t = new o.Bounds;
                            this._rings = [],
                                this._projectLatlngs(this._latlngs, this._rings, t);
                            var e = this._clickTolerance(),
                                i = new o.Point(e, e);
                            this._bounds.isValid() && t.isValid() && (t.min._subtract(i), t.max._add(i), this._pxBounds = t)
                        },
                        _projectLatlngs: function(t, e, i) {
                            var n, s, r = t[0] instanceof o.LatLng,
                                a = t.length;
                            if (r) {
                                for (s = [], n = 0; n < a; n++) s[n] = this._map.latLngToLayerPoint(t[n]),
                                    i.extend(s[n]);
                                e.push(s)
                            } else for (n = 0; n < a; n++) this._projectLatlngs(t[n], e, i)
                        },
                        _clipPoints: function() {
                            var t = this._renderer._bounds;
                            if (this._parts = [], this._pxBounds && this._pxBounds.intersects(t)) {
                                if (this.options.noClip) return void(this._parts = this._rings);
                                var e, i, n, s, r, a, h, l = this._parts;
                                for (e = 0, n = 0, s = this._rings.length; e < s; e++) for (h = this._rings[e], i = 0, r = h.length; i < r - 1; i++)(a = o.LineUtil.clipSegment(h[i], h[i + 1], t, i, !0)) && (l[n] = l[n] || [], l[n].push(a[0]), a[1] === h[i + 1] && i !== r - 2 || (l[n].push(a[1]), n++))
                            }
                        },
                        _simplifyPoints: function() {
                            for (var t = this._parts,
                                     e = this.options.smoothFactor,
                                     i = 0,
                                     n = t.length; i < n; i++) t[i] = o.LineUtil.simplify(t[i], e)
                        },
                        _update: function() {
                            this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath())
                        },
                        _updatePath: function() {
                            this._renderer._updatePoly(this)
                        }
                    }),
                    o.polyline = function(t, e) {
                        return new o.Polyline(t, e)
                    },
                    o.Polyline._flat = function(t) {
                        return ! o.Util.isArray(t[0]) || "object" != typeof t[0][0] && void 0 !== t[0][0]
                    },
                    o.PolyUtil = {},
                    o.PolyUtil.clipPolygon = function(t, e, i) {
                        var n, s, r, a, h, l, u, c, d, _ = [1, 4, 2, 8],
                            m = o.LineUtil;
                        for (s = 0, u = t.length; s < u; s++) t[s]._code = m._getBitCode(t[s], e);
                        for (a = 0; a < 4; a++) {
                            for (c = _[a], n = [], s = 0, u = t.length, r = u - 1; s < u; r = s++) h = t[s],
                                l = t[r],
                                h._code & c ? l._code & c || (d = m._getEdgeIntersection(l, h, c, e, i), d._code = m._getBitCode(d, e), n.push(d)) : (l._code & c && (d = m._getEdgeIntersection(l, h, c, e, i), d._code = m._getBitCode(d, e), n.push(d)), n.push(h));
                            t = n
                        }
                        return t
                    },
                    o.Polygon = o.Polyline.extend({
                        options: {
                            fill: !0
                        },
                        isEmpty: function() {
                            return ! this._latlngs.length || !this._latlngs[0].length
                        },
                        getCenter: function() {
                            if (!this._map) throw new Error("Must add layer to map before using getCenter()");
                            var t, e, i, o, n, s, r, a, h, l = this._rings[0],
                                u = l.length;
                            if (!u) return null;
                            for (s = r = a = 0, t = 0, e = u - 1; t < u; e = t++) i = l[t],
                                o = l[e],
                                n = i.y * o.x - o.y * i.x,
                                r += (i.x + o.x) * n,
                                a += (i.y + o.y) * n,
                                s += 3 * n;
                            return h = 0 === s ? l[0] : [r / s, a / s],
                                this._map.layerPointToLatLng(h)
                        },
                        _convertLatLngs: function(t) {
                            var e = o.Polyline.prototype._convertLatLngs.call(this, t),
                                i = e.length;
                            return i >= 2 && e[0] instanceof o.LatLng && e[0].equals(e[i - 1]) && e.pop(),
                                e
                        },
                        _setLatLngs: function(t) {
                            o.Polyline.prototype._setLatLngs.call(this, t),
                            o.Polyline._flat(this._latlngs) && (this._latlngs = [this._latlngs])
                        },
                        _defaultShape: function() {
                            return o.Polyline._flat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0]
                        },
                        _clipPoints: function() {
                            var t = this._renderer._bounds,
                                e = this.options.weight,
                                i = new o.Point(e, e);
                            if (t = new o.Bounds(t.min.subtract(i), t.max.add(i)), this._parts = [], this._pxBounds && this._pxBounds.intersects(t)) {
                                if (this.options.noClip) return void(this._parts = this._rings);
                                for (var n, s = 0,
                                         r = this._rings.length; s < r; s++) n = o.PolyUtil.clipPolygon(this._rings[s], t, !0),
                                n.length && this._parts.push(n)
                            }
                        },
                        _updatePath: function() {
                            this._renderer._updatePoly(this, !0)
                        }
                    }),
                    o.polygon = function(t, e) {
                        return new o.Polygon(t, e)
                    },
                    o.Rectangle = o.Polygon.extend({
                        initialize: function(t, e) {
                            o.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(t), e)
                        },
                        setBounds: function(t) {
                            return this.setLatLngs(this._boundsToLatLngs(t))
                        },
                        _boundsToLatLngs: function(t) {
                            return t = o.latLngBounds(t),
                                [t.getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
                        }
                    }),
                    o.rectangle = function(t, e) {
                        return new o.Rectangle(t, e)
                    },
                    o.CircleMarker = o.Path.extend({
                        options: {
                            fill: !0,
                            radius: 10
                        },
                        initialize: function(t, e) {
                            o.setOptions(this, e),
                                this._latlng = o.latLng(t),
                                this._radius = this.options.radius
                        },
                        setLatLng: function(t) {
                            return this._latlng = o.latLng(t),
                                this.redraw(),
                                this.fire("move", {
                                    latlng: this._latlng
                                })
                        },
                        getLatLng: function() {
                            return this._latlng
                        },
                        setRadius: function(t) {
                            return this.options.radius = this._radius = t,
                                this.redraw()
                        },
                        getRadius: function() {
                            return this._radius
                        },
                        setStyle: function(t) {
                            var e = t && t.radius || this._radius;
                            return o.Path.prototype.setStyle.call(this, t),
                                this.setRadius(e),
                                this
                        },
                        _project: function() {
                            this._point = this._map.latLngToLayerPoint(this._latlng),
                                this._updateBounds()
                        },
                        _updateBounds: function() {
                            var t = this._radius,
                                e = this._radiusY || t,
                                i = this._clickTolerance(),
                                n = [t + i, e + i];
                            this._pxBounds = new o.Bounds(this._point.subtract(n), this._point.add(n))
                        },
                        _update: function() {
                            this._map && this._updatePath()
                        },
                        _updatePath: function() {
                            this._renderer._updateCircle(this)
                        },
                        _empty: function() {
                            return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
                        }
                    }),
                    o.circleMarker = function(t, e) {
                        return new o.CircleMarker(t, e)
                    },
                    o.Circle = o.CircleMarker.extend({
                        initialize: function(t, e, i) {
                            if ("number" == typeof e && (e = o.extend({},
                                    i, {
                                        radius: e
                                    })), o.setOptions(this, e), this._latlng = o.latLng(t), isNaN(this.options.radius)) throw new Error("Circle radius cannot be NaN");
                            this._mRadius = this.options.radius
                        },
                        setRadius: function(t) {
                            return this._mRadius = t,
                                this.redraw()
                        },
                        getRadius: function() {
                            return this._mRadius
                        },
                        getBounds: function() {
                            var t = [this._radius, this._radiusY || this._radius];
                            return new o.LatLngBounds(this._map.layerPointToLatLng(this._point.subtract(t)), this._map.layerPointToLatLng(this._point.add(t)))
                        },
                        setStyle: o.Path.prototype.setStyle,
                        _project: function() {
                            var t = this._latlng.lng,
                                e = this._latlng.lat,
                                i = this._map,
                                n = i.options.crs;
                            if (n.distance === o.CRS.Earth.distance) {
                                var s = Math.PI / 180,
                                    r = this._mRadius / o.CRS.Earth.R / s,
                                    a = i.project([e + r, t]),
                                    h = i.project([e - r, t]),
                                    l = a.add(h).divideBy(2),
                                    u = i.unproject(l).lat,
                                    c = Math.acos((Math.cos(r * s) - Math.sin(e * s) * Math.sin(u * s)) / (Math.cos(e * s) * Math.cos(u * s))) / s; (isNaN(c) || 0 === c) && (c = r / Math.cos(Math.PI / 180 * e)),
                                    this._point = l.subtract(i.getPixelOrigin()),
                                    this._radius = isNaN(c) ? 0 : Math.max(Math.round(l.x - i.project([u, t - c]).x), 1),
                                    this._radiusY = Math.max(Math.round(l.y - a.y), 1)
                            } else {
                                var d = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
                                this._point = i.latLngToLayerPoint(this._latlng),
                                    this._radius = this._point.x - i.latLngToLayerPoint(d).x
                            }
                            this._updateBounds()
                        }
                    }),
                    o.circle = function(t, e, i) {
                        return new o.Circle(t, e, i)
                    },
                    o.SVG = o.Renderer.extend({
                        getEvents: function() {
                            var t = o.Renderer.prototype.getEvents.call(this);
                            return t.zoomstart = this._onZoomStart,
                                t
                        },
                        _initContainer: function() {
                            this._container = o.SVG.create("svg"),
                                this._container.setAttribute("pointer-events", "none"),
                                this._rootGroup = o.SVG.create("g"),
                                this._container.appendChild(this._rootGroup)
                        },
                        _onZoomStart: function() {
                            this._update()
                        },
                        _update: function() {
                            if (!this._map._animatingZoom || !this._bounds) {
                                o.Renderer.prototype._update.call(this);
                                var t = this._bounds,
                                    e = t.getSize(),
                                    i = this._container;
                                this._svgSize && this._svgSize.equals(e) || (this._svgSize = e, i.setAttribute("width", e.x), i.setAttribute("height", e.y)),
                                    o.DomUtil.setPosition(i, t.min),
                                    i.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")),
                                    this.fire("update")
                            }
                        },
                        _initPath: function(t) {
                            var e = t._path = o.SVG.create("path");
                            t.options.className && o.DomUtil.addClass(e, t.options.className),
                            t.options.interactive && o.DomUtil.addClass(e, "leaflet-interactive"),
                                this._updateStyle(t),
                                this._layers[o.stamp(t)] = t
                        },
                        _addPath: function(t) {
                            this._rootGroup.appendChild(t._path),
                                t.addInteractiveTarget(t._path)
                        },
                        _removePath: function(t) {
                            o.DomUtil.remove(t._path),
                                t.removeInteractiveTarget(t._path),
                                delete this._layers[o.stamp(t)]
                        },
                        _updatePath: function(t) {
                            t._project(),
                                t._update()
                        },
                        _updateStyle: function(t) {
                            var e = t._path,
                                i = t.options;
                            e && (i.stroke ? (e.setAttribute("stroke", i.color), e.setAttribute("stroke-opacity", i.opacity), e.setAttribute("stroke-width", i.weight), e.setAttribute("stroke-linecap", i.lineCap), e.setAttribute("stroke-linejoin", i.lineJoin), i.dashArray ? e.setAttribute("stroke-dasharray", i.dashArray) : e.removeAttribute("stroke-dasharray"), i.dashOffset ? e.setAttribute("stroke-dashoffset", i.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), i.fill ? (e.setAttribute("fill", i.fillColor || i.color), e.setAttribute("fill-opacity", i.fillOpacity), e.setAttribute("fill-rule", i.fillRule || "evenodd")) : e.setAttribute("fill", "none"))
                        },
                        _updatePoly: function(t, e) {
                            this._setPath(t, o.SVG.pointsToPath(t._parts, e))
                        },
                        _updateCircle: function(t) {
                            var e = t._point,
                                i = t._radius,
                                o = t._radiusY || i,
                                n = "a" + i + "," + o + " 0 1,0 ",
                                s = t._empty() ? "M0 0": "M" + (e.x - i) + "," + e.y + n + 2 * i + ",0 " + n + 2 * -i + ",0 ";
                            this._setPath(t, s)
                        },
                        _setPath: function(t, e) {
                            t._path.setAttribute("d", e)
                        },
                        _bringToFront: function(t) {
                            o.DomUtil.toFront(t._path)
                        },
                        _bringToBack: function(t) {
                            o.DomUtil.toBack(t._path)
                        }
                    }),
                    o.extend(o.SVG, {
                        create: function(t) {
                            return e.createElementNS("http://www.w3.org/2000/svg", t)
                        },
                        pointsToPath: function(t, e) {
                            var i, n, s, r, a, h, l = "";
                            for (i = 0, s = t.length; i < s; i++) {
                                for (a = t[i], n = 0, r = a.length; n < r; n++) h = a[n],
                                    l += (n ? "L": "M") + h.x + " " + h.y;
                                l += e ? o.Browser.svg ? "z": "x": ""
                            }
                            return l || "M0 0"
                        }
                    }),
                    o.Browser.svg = !(!e.createElementNS || !o.SVG.create("svg").createSVGRect),
                    o.svg = function(t) {
                        return o.Browser.svg || o.Browser.vml ? new o.SVG(t) : null
                    },
                    o.Browser.vml = !o.Browser.svg &&
                        function() {
                            try {
                                var t = e.createElement("div");
                                t.innerHTML = '<v:shape adj="1"/>';
                                var i = t.firstChild;
                                return i.style.behavior = "url(#default#VML)",
                                i && "object" == typeof i.adj
                            } catch(t) {
                                return ! 1
                            }
                        } (),
                    o.SVG.include(o.Browser.vml ? {
                        _initContainer: function() {
                            this._container = o.DomUtil.create("div", "leaflet-vml-container")
                        },
                        _update: function() {
                            this._map._animatingZoom || (o.Renderer.prototype._update.call(this), this.fire("update"))
                        },
                        _initPath: function(t) {
                            var e = t._container = o.SVG.create("shape");
                            o.DomUtil.addClass(e, "leaflet-vml-shape " + (this.options.className || "")),
                                e.coordsize = "1 1",
                                t._path = o.SVG.create("path"),
                                e.appendChild(t._path),
                                this._updateStyle(t)
                        },
                        _addPath: function(t) {
                            var e = t._container;
                            this._container.appendChild(e),
                            t.options.interactive && t.addInteractiveTarget(e)
                        },
                        _removePath: function(t) {
                            var e = t._container;
                            o.DomUtil.remove(e),
                                t.removeInteractiveTarget(e)
                        },
                        _updateStyle: function(t) {
                            var e = t._stroke,
                                i = t._fill,
                                n = t.options,
                                s = t._container;
                            s.stroked = !!n.stroke,
                                s.filled = !!n.fill,
                                n.stroke ? (e || (e = t._stroke = o.SVG.create("stroke")), s.appendChild(e), e.weight = n.weight + "px", e.color = n.color, e.opacity = n.opacity, n.dashArray ? e.dashStyle = o.Util.isArray(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = n.lineCap.replace("butt", "flat"), e.joinstyle = n.lineJoin) : e && (s.removeChild(e), t._stroke = null),
                                n.fill ? (i || (i = t._fill = o.SVG.create("fill")), s.appendChild(i), i.color = n.fillColor || n.color, i.opacity = n.fillOpacity) : i && (s.removeChild(i), t._fill = null)
                        },
                        _updateCircle: function(t) {
                            var e = t._point.round(),
                                i = Math.round(t._radius),
                                o = Math.round(t._radiusY || i);
                            this._setPath(t, t._empty() ? "M0 0": "AL " + e.x + "," + e.y + " " + i + "," + o + " 0,23592600")
                        },
                        _setPath: function(t, e) {
                            t._path.v = e
                        },
                        _bringToFront: function(t) {
                            o.DomUtil.toFront(t._container)
                        },
                        _bringToBack: function(t) {
                            o.DomUtil.toBack(t._container)
                        }
                    }: {}),
                o.Browser.vml && (o.SVG.create = function() {
                    try {
                        return e.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
                            function(t) {
                                return e.createElement("<lvml:" + t + ' class="lvml">')
                            }
                    } catch(t) {
                        return function(t) {
                            return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
                        }
                    }
                } ()),
                    o.Canvas = o.Renderer.extend({
                        onAdd: function() {
                            o.Renderer.prototype.onAdd.call(this),
                                this._draw()
                        },
                        _initContainer: function() {
                            var t = this._container = e.createElement("canvas");
                            o.DomEvent.on(t, "mousemove", o.Util.throttle(this._onMouseMove, 32, this), this).on(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this).on(t, "mouseout", this._handleMouseOut, this),
                                this._ctx = t.getContext("2d")
                        },
                        _updatePaths: function() {
                            var t;
                            this._redrawBounds = null;
                            for (var e in this._layers) t = this._layers[e],
                                t._update();
                            this._redraw()
                        },
                        _update: function() {
                            if (!this._map._animatingZoom || !this._bounds) {
                                this._drawnLayers = {},
                                    o.Renderer.prototype._update.call(this);
                                var t = this._bounds,
                                    e = this._container,
                                    i = t.getSize(),
                                    n = o.Browser.retina ? 2 : 1;
                                o.DomUtil.setPosition(e, t.min),
                                    e.width = n * i.x,
                                    e.height = n * i.y,
                                    e.style.width = i.x + "px",
                                    e.style.height = i.y + "px",
                                o.Browser.retina && this._ctx.scale(2, 2),
                                    this._ctx.translate( - t.min.x, -t.min.y),
                                    this.fire("update")
                            }
                        },
                        _initPath: function(t) {
                            this._updateDashArray(t),
                                this._layers[o.stamp(t)] = t;
                            var e = t._order = {
                                layer: t,
                                prev: this._drawLast,
                                next: null
                            };
                            this._drawLast && (this._drawLast.next = e),
                                this._drawLast = e,
                                this._drawFirst = this._drawFirst || this._drawLast
                        },
                        _addPath: function(t) {
                            this._requestRedraw(t)
                        },
                        _removePath: function(t) {
                            var e = t._order,
                                i = e.next,
                                n = e.prev;
                            i ? i.prev = n: this._drawLast = n,
                                n ? n.next = i: this._drawFirst = i,
                                delete t._order,
                                delete this._layers[o.stamp(t)],
                                this._requestRedraw(t)
                        },
                        _updatePath: function(t) {
                            this._extendRedrawBounds(t),
                                t._project(),
                                t._update(),
                                this._requestRedraw(t)
                        },
                        _updateStyle: function(t) {
                            this._updateDashArray(t),
                                this._requestRedraw(t)
                        },
                        _updateDashArray: function(t) {
                            if (t.options.dashArray) {
                                var e, i = t.options.dashArray.split(","),
                                    o = [];
                                for (e = 0; e < i.length; e++) o.push(Number(i[e]));
                                t.options._dashArray = o
                            }
                        },
                        _requestRedraw: function(t) {
                            this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || o.Util.requestAnimFrame(this._redraw, this))
                        },
                        _extendRedrawBounds: function(t) {
                            var e = (t.options.weight || 0) + 1;
                            this._redrawBounds = this._redrawBounds || new o.Bounds,
                                this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])),
                                this._redrawBounds.extend(t._pxBounds.max.add([e, e]))
                        },
                        _redraw: function() {
                            this._redrawRequest = null,
                                this._clear(),
                                this._draw(),
                                this._redrawBounds = null
                        },
                        _clear: function() {
                            var t = this._redrawBounds;
                            if (t) {
                                var e = t.getSize();
                                this._ctx.clearRect(t.min.x, t.min.y, e.x, e.y)
                            } else this._ctx.clearRect(0, 0, this._container.width, this._container.height)
                        },
                        _draw: function() {
                            var t, e = this._redrawBounds;
                            if (this._ctx.save(), e) {
                                var i = e.getSize();
                                this._ctx.beginPath(),
                                    this._ctx.rect(e.min.x, e.min.y, i.x, i.y),
                                    this._ctx.clip()
                            }
                            this._drawing = !0;
                            for (var o = this._drawFirst; o; o = o.next) t = o.layer,
                            (!e || t._pxBounds && t._pxBounds.intersects(e)) && t._updatePath();
                            this._drawing = !1,
                                this._ctx.restore()
                        },
                        _updatePoly: function(t, e) {
                            if (this._drawing) {
                                var i, o, n, s, r = t._parts,
                                    a = r.length,
                                    h = this._ctx;
                                if (a) {
                                    for (this._drawnLayers[t._leaflet_id] = t, h.beginPath(), h.setLineDash && h.setLineDash(t.options && t.options._dashArray || []), i = 0; i < a; i++) {
                                        for (o = 0, n = r[i].length; o < n; o++) s = r[i][o],
                                            h[o ? "lineTo": "moveTo"](s.x, s.y);
                                        e && h.closePath()
                                    }
                                    this._fillStroke(h, t)
                                }
                            }
                        },
                        _updateCircle: function(t) {
                            if (this._drawing && !t._empty()) {
                                var e = t._point,
                                    i = this._ctx,
                                    o = t._radius,
                                    n = (t._radiusY || o) / o;
                                this._drawnLayers[t._leaflet_id] = t,
                                1 !== n && (i.save(), i.scale(1, n)),
                                    i.beginPath(),
                                    i.arc(e.x, e.y / n, o, 0, 2 * Math.PI, !1),
                                1 !== n && i.restore(),
                                    this._fillStroke(i, t)
                            }
                        },
                        _fillStroke: function(t, e) {
                            var i = e.options;
                            i.fill && (t.globalAlpha = i.fillOpacity, t.fillStyle = i.fillColor || i.color, t.fill(i.fillRule || "evenodd")),
                            i.stroke && 0 !== i.weight && (t.globalAlpha = i.opacity, t.lineWidth = i.weight, t.strokeStyle = i.color, t.lineCap = i.lineCap, t.lineJoin = i.lineJoin, t.stroke())
                        },
                        _onClick: function(t) {
                            for (var e, i, n = this._map.mouseEventToLayerPoint(t), s = this._drawFirst; s; s = s.next) e = s.layer,
                            e.options.interactive && e._containsPoint(n) && !this._map._draggableMoved(e) && (i = e);
                            i && (o.DomEvent._fakeStop(t), this._fireEvent([i], t))
                        },
                        _onMouseMove: function(t) {
                            if (this._map && !this._map.dragging.moving() && !this._map._animatingZoom) {
                                var e = this._map.mouseEventToLayerPoint(t);
                                this._handleMouseHover(t, e)
                            }
                        },
                        _handleMouseOut: function(t) {
                            var e = this._hoveredLayer;
                            e && (o.DomUtil.removeClass(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null)
                        },
                        _handleMouseHover: function(t, e) {
                            for (var i, n, s = this._drawFirst; s; s = s.next) i = s.layer,
                            i.options.interactive && i._containsPoint(e) && (n = i);
                            n !== this._hoveredLayer && (this._handleMouseOut(t), n && (o.DomUtil.addClass(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseover"), this._hoveredLayer = n)),
                            this._hoveredLayer && this._fireEvent([this._hoveredLayer], t)
                        },
                        _fireEvent: function(t, e, i) {
                            this._map._fireDOMEvent(e, i || e.type, t)
                        },
                        _bringToFront: function(t) {
                            var e = t._order,
                                i = e.next,
                                o = e.prev;
                            i && (i.prev = o, o ? o.next = i: i && (this._drawFirst = i), e.prev = this._drawLast, this._drawLast.next = e, e.next = null, this._drawLast = e, this._requestRedraw(t))
                        },
                        _bringToBack: function(t) {
                            var e = t._order,
                                i = e.next,
                                o = e.prev;
                            o && (o.next = i, i ? i.prev = o: o && (this._drawLast = o), e.prev = null, e.next = this._drawFirst, this._drawFirst.prev = e, this._drawFirst = e, this._requestRedraw(t))
                        }
                    }),
                    o.Browser.canvas = function() {
                        return !! e.createElement("canvas").getContext
                    } (),
                    o.canvas = function(t) {
                        return o.Browser.canvas ? new o.Canvas(t) : null
                    },
                    o.Polyline.prototype._containsPoint = function(t, e) {
                        var i, n, s, r, a, h, l = this._clickTolerance();
                        if (!this._pxBounds.contains(t)) return ! 1;
                        for (i = 0, r = this._parts.length; i < r; i++) for (h = this._parts[i], n = 0, a = h.length, s = a - 1; n < a; s = n++) if ((e || 0 !== n) && o.LineUtil.pointToSegmentDistance(t, h[s], h[n]) <= l) return ! 0;
                        return ! 1
                    },
                    o.Polygon.prototype._containsPoint = function(t) {
                        var e, i, n, s, r, a, h, l, u = !1;
                        if (!this._pxBounds.contains(t)) return ! 1;
                        for (s = 0, h = this._parts.length; s < h; s++) for (e = this._parts[s], r = 0, l = e.length, a = l - 1; r < l; a = r++) i = e[r],
                            n = e[a],
                        i.y > t.y != n.y > t.y && t.x < (n.x - i.x) * (t.y - i.y) / (n.y - i.y) + i.x && (u = !u);
                        return u || o.Polyline.prototype._containsPoint.call(this, t, !0)
                    },
                    o.CircleMarker.prototype._containsPoint = function(t) {
                        return t.distanceTo(this._point) <= this._radius + this._clickTolerance()
                    },
                    o.GeoJSON = o.FeatureGroup.extend({
                        initialize: function(t, e) {
                            o.setOptions(this, e),
                                this._layers = {},
                            t && this.addData(t)
                        },
                        addData: function(t) {
                            var e, i, n, s = o.Util.isArray(t) ? t: t.features;
                            if (s) {
                                for (e = 0, i = s.length; e < i; e++) n = s[e],
                                (n.geometries || n.geometry || n.features || n.coordinates) && this.addData(n);
                                return this
                            }
                            var r = this.options;
                            if (r.filter && !r.filter(t)) return this;
                            var a = o.GeoJSON.geometryToLayer(t, r);
                            return a ? (a.feature = o.GeoJSON.asFeature(t), a.defaultOptions = a.options, this.resetStyle(a), r.onEachFeature && r.onEachFeature(t, a), this.addLayer(a)) : this
                        },
                        resetStyle: function(t) {
                            return t.options = o.Util.extend({},
                                t.defaultOptions),
                                this._setLayerStyle(t, this.options.style),
                                this
                        },
                        setStyle: function(t) {
                            return this.eachLayer(function(e) {
                                    this._setLayerStyle(e, t)
                                },
                                this)
                        },
                        _setLayerStyle: function(t, e) {
                            "function" == typeof e && (e = e(t.feature)),
                            t.setStyle && t.setStyle(e)
                        }
                    }),
                    o.extend(o.GeoJSON, {
                        geometryToLayer: function(t, e) {
                            var i, n, s, r, a = "Feature" === t.type ? t.geometry: t,
                                h = a ? a.coordinates: null,
                                l = [],
                                u = e && e.pointToLayer,
                                c = e && e.coordsToLatLng || this.coordsToLatLng;
                            if (!h && !a) return null;
                            switch (a.type) {
                                case "Point":
                                    return i = c(h),
                                        u ? u(t, i) : new o.Marker(i);
                                case "MultiPoint":
                                    for (s = 0, r = h.length; s < r; s++) i = c(h[s]),
                                        l.push(u ? u(t, i) : new o.Marker(i));
                                    return new o.FeatureGroup(l);
                                case "LineString":
                                case "MultiLineString":
                                    return n = this.coordsToLatLngs(h, "LineString" === a.type ? 0 : 1, c),
                                        new o.Polyline(n, e);
                                case "Polygon":
                                case "MultiPolygon":
                                    return n = this.coordsToLatLngs(h, "Polygon" === a.type ? 1 : 2, c),
                                        new o.Polygon(n, e);
                                case "GeometryCollection":
                                    for (s = 0, r = a.geometries.length; s < r; s++) {
                                        var d = this.geometryToLayer({
                                                geometry: a.geometries[s],
                                                type: "Feature",
                                                properties: t.properties
                                            },
                                            e);
                                        d && l.push(d)
                                    }
                                    return new o.FeatureGroup(l);
                                default:
                                    throw new Error("Invalid GeoJSON object.")
                            }
                        },
                        coordsToLatLng: function(t) {
                            return new o.LatLng(t[1], t[0], t[2])
                        },
                        coordsToLatLngs: function(t, e, i) {
                            for (var o, n = [], s = 0, r = t.length; s < r; s++) o = e ? this.coordsToLatLngs(t[s], e - 1, i) : (i || this.coordsToLatLng)(t[s]),
                                n.push(o);
                            return n
                        },
                        latLngToCoords: function(t) {
                            return void 0 !== t.alt ? [t.lng, t.lat, t.alt] : [t.lng, t.lat]
                        },
                        latLngsToCoords: function(t, e, i) {
                            for (var n = [], s = 0, r = t.length; s < r; s++) n.push(e ? o.GeoJSON.latLngsToCoords(t[s], e - 1, i) : o.GeoJSON.latLngToCoords(t[s]));
                            return ! e && i && n.push(n[0]),
                                n
                        },
                        getFeature: function(t, e) {
                            return t.feature ? o.extend({},
                                t.feature, {
                                    geometry: e
                                }) : o.GeoJSON.asFeature(e)
                        },
                        asFeature: function(t) {
                            return "Feature" === t.type || "FeatureCollection" === t.type ? t: {
                                type: "Feature",
                                properties: {},
                                geometry: t
                            }
                        }
                    });
                var r = {
                    toGeoJSON: function() {
                        return o.GeoJSON.getFeature(this, {
                            type: "Point",
                            coordinates: o.GeoJSON.latLngToCoords(this.getLatLng())
                        })
                    }
                };
                o.Marker.include(r),
                    o.Circle.include(r),
                    o.CircleMarker.include(r),
                    o.Polyline.prototype.toGeoJSON = function() {
                        var t = !o.Polyline._flat(this._latlngs),
                            e = o.GeoJSON.latLngsToCoords(this._latlngs, t ? 1 : 0);
                        return o.GeoJSON.getFeature(this, {
                            type: (t ? "Multi": "") + "LineString",
                            coordinates: e
                        })
                    },
                    o.Polygon.prototype.toGeoJSON = function() {
                        var t = !o.Polyline._flat(this._latlngs),
                            e = t && !o.Polyline._flat(this._latlngs[0]),
                            i = o.GeoJSON.latLngsToCoords(this._latlngs, e ? 2 : t ? 1 : 0, !0);
                        return t || (i = [i]),
                            o.GeoJSON.getFeature(this, {
                                type: (e ? "Multi": "") + "Polygon",
                                coordinates: i
                            })
                    },
                    o.LayerGroup.include({
                        toMultiPoint: function() {
                            var t = [];
                            return this.eachLayer(function(e) {
                                t.push(e.toGeoJSON().geometry.coordinates)
                            }),
                                o.GeoJSON.getFeature(this, {
                                    type: "MultiPoint",
                                    coordinates: t
                                })
                        },
                        toGeoJSON: function() {
                            var t = this.feature && this.feature.geometry && this.feature.geometry.type;
                            if ("MultiPoint" === t) return this.toMultiPoint();
                            var e = "GeometryCollection" === t,
                                i = [];
                            return this.eachLayer(function(t) {
                                if (t.toGeoJSON) {
                                    var n = t.toGeoJSON();
                                    i.push(e ? n.geometry: o.GeoJSON.asFeature(n))
                                }
                            }),
                                e ? o.GeoJSON.getFeature(this, {
                                    geometries: i,
                                    type: "GeometryCollection"
                                }) : {
                                    type: "FeatureCollection",
                                    features: i
                                }
                        }
                    }),
                    o.geoJSON = function(t, e) {
                        return new o.GeoJSON(t, e)
                    },
                    o.geoJson = o.geoJSON,
                    o.Draggable = o.Evented.extend({
                        options: {
                            clickTolerance: 3
                        },
                        statics: {
                            START: o.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
                            END: {
                                mousedown: "mouseup",
                                touchstart: "touchend",
                                pointerdown: "touchend",
                                MSPointerDown: "touchend"
                            },
                            MOVE: {
                                mousedown: "mousemove",
                                touchstart: "touchmove",
                                pointerdown: "touchmove",
                                MSPointerDown: "touchmove"
                            }
                        },
                        initialize: function(t, e, i) {
                            this._element = t,
                                this._dragStartTarget = e || t,
                                this._preventOutline = i
                        },
                        enable: function() {
                            this._enabled || (o.DomEvent.on(this._dragStartTarget, o.Draggable.START.join(" "), this._onDown, this), this._enabled = !0)
                        },
                        disable: function() {
                            this._enabled && (o.Draggable._dragging === this && this.finishDrag(), o.DomEvent.off(this._dragStartTarget, o.Draggable.START.join(" "), this._onDown, this), this._enabled = !1, this._moved = !1)
                        },
                        _onDown: function(t) {
                            if (!t._simulated && this._enabled && (this._moved = !1, !o.DomUtil.hasClass(this._element, "leaflet-zoom-anim") && !(o.Draggable._dragging || t.shiftKey || 1 !== t.which && 1 !== t.button && !t.touches || (o.Draggable._dragging = this, this._preventOutline && o.DomUtil.preventOutline(this._element), o.DomUtil.disableImageDrag(), o.DomUtil.disableTextSelection(), this._moving)))) {
                                this.fire("down");
                                var i = t.touches ? t.touches[0] : t;
                                this._startPoint = new o.Point(i.clientX, i.clientY),
                                    o.DomEvent.on(e, o.Draggable.MOVE[t.type], this._onMove, this).on(e, o.Draggable.END[t.type], this._onUp, this)
                            }
                        },
                        _onMove: function(i) {
                            if (!i._simulated && this._enabled) {
                                if (i.touches && i.touches.length > 1) return void(this._moved = !0);
                                var n = i.touches && 1 === i.touches.length ? i.touches[0] : i,
                                    s = new o.Point(n.clientX, n.clientY),
                                    r = s.subtract(this._startPoint); (r.x || r.y) && (Math.abs(r.x) + Math.abs(r.y) < this.options.clickTolerance || (o.DomEvent.preventDefault(i), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = o.DomUtil.getPosition(this._element).subtract(r), o.DomUtil.addClass(e.body, "leaflet-dragging"), this._lastTarget = i.target || i.srcElement, t.SVGElementInstance && this._lastTarget instanceof SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), o.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(r), this._moving = !0, o.Util.cancelAnimFrame(this._animRequest), this._lastEvent = i, this._animRequest = o.Util.requestAnimFrame(this._updatePosition, this, !0)))
                            }
                        },
                        _updatePosition: function() {
                            var t = {
                                originalEvent: this._lastEvent
                            };
                            this.fire("predrag", t),
                                o.DomUtil.setPosition(this._element, this._newPos),
                                this.fire("drag", t)
                        },
                        _onUp: function(t) { ! t._simulated && this._enabled && this.finishDrag()
                        },
                        finishDrag: function() {
                            o.DomUtil.removeClass(e.body, "leaflet-dragging"),
                            this._lastTarget && (o.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null);
                            for (var t in o.Draggable.MOVE) o.DomEvent.off(e, o.Draggable.MOVE[t], this._onMove, this).off(e, o.Draggable.END[t], this._onUp, this);
                            o.DomUtil.enableImageDrag(),
                                o.DomUtil.enableTextSelection(),
                            this._moved && this._moving && (o.Util.cancelAnimFrame(this._animRequest), this.fire("dragend", {
                                distance: this._newPos.distanceTo(this._startPos)
                            })),
                                this._moving = !1,
                                o.Draggable._dragging = !1
                        }
                    }),
                    o.Handler = o.Class.extend({
                        initialize: function(t) {
                            this._map = t
                        },
                        enable: function() {
                            return this._enabled ? this: (this._enabled = !0, this.addHooks(), this)
                        },
                        disable: function() {
                            return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this
                        },
                        enabled: function() {
                            return !! this._enabled
                        }
                    }),
                    o.Map.mergeOptions({
                        dragging: !0,
                        inertia: !o.Browser.android23,
                        inertiaDeceleration: 3400,
                        inertiaMaxSpeed: 1 / 0,
                        easeLinearity: .2,
                        worldCopyJump: !1,
                        maxBoundsViscosity: 0
                    }),
                    o.Map.Drag = o.Handler.extend({
                        addHooks: function() {
                            if (!this._draggable) {
                                var t = this._map;
                                this._draggable = new o.Draggable(t._mapPane, t._container),
                                    this._draggable.on({
                                            down: this._onDown,
                                            dragstart: this._onDragStart,
                                            drag: this._onDrag,
                                            dragend: this._onDragEnd
                                        },
                                        this),
                                    this._draggable.on("predrag", this._onPreDragLimit, this),
                                t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this))
                            }
                            o.DomUtil.addClass(this._map._container, "leaflet-grab leaflet-touch-drag"),
                                this._draggable.enable(),
                                this._positions = [],
                                this._times = []
                        },
                        removeHooks: function() {
                            o.DomUtil.removeClass(this._map._container, "leaflet-grab"),
                                o.DomUtil.removeClass(this._map._container, "leaflet-touch-drag"),
                                this._draggable.disable()
                        },
                        moved: function() {
                            return this._draggable && this._draggable._moved
                        },
                        moving: function() {
                            return this._draggable && this._draggable._moving
                        },
                        _onDown: function() {
                            this._map._stop()
                        },
                        _onDragStart: function() {
                            var t = this._map;
                            if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
                                var e = o.latLngBounds(this._map.options.maxBounds);
                                this._offsetLimit = o.bounds(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy( - 1), this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy( - 1).add(this._map.getSize())),
                                    this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))
                            } else this._offsetLimit = null;
                            t.fire("movestart").fire("dragstart"),
                            t.options.inertia && (this._positions = [], this._times = [])
                        },
                        _onDrag: function(t) {
                            if (this._map.options.inertia) {
                                var e = this._lastTime = +new Date,
                                    i = this._lastPos = this._draggable._absPos || this._draggable._newPos;
                                this._positions.push(i),
                                    this._times.push(e),
                                e - this._times[0] > 50 && (this._positions.shift(), this._times.shift())
                            }
                            this._map.fire("move", t).fire("drag", t)
                        },
                        _onZoomEnd: function() {
                            var t = this._map.getSize().divideBy(2),
                                e = this._map.latLngToLayerPoint([0, 0]);
                            this._initialWorldOffset = e.subtract(t).x,
                                this._worldWidth = this._map.getPixelWorldBounds().getSize().x
                        },
                        _viscousLimit: function(t, e) {
                            return t - (t - e) * this._viscosity
                        },
                        _onPreDragLimit: function() {
                            if (this._viscosity && this._offsetLimit) {
                                var t = this._draggable._newPos.subtract(this._draggable._startPos),
                                    e = this._offsetLimit;
                                t.x < e.min.x && (t.x = this._viscousLimit(t.x, e.min.x)),
                                t.y < e.min.y && (t.y = this._viscousLimit(t.y, e.min.y)),
                                t.x > e.max.x && (t.x = this._viscousLimit(t.x, e.max.x)),
                                t.y > e.max.y && (t.y = this._viscousLimit(t.y, e.max.y)),
                                    this._draggable._newPos = this._draggable._startPos.add(t)
                            }
                        },
                        _onPreDragWrap: function() {
                            var t = this._worldWidth,
                                e = Math.round(t / 2),
                                i = this._initialWorldOffset,
                                o = this._draggable._newPos.x,
                                n = (o - e + i) % t + e - i,
                                s = (o + e + i) % t - e - i,
                                r = Math.abs(n + i) < Math.abs(s + i) ? n: s;
                            this._draggable._absPos = this._draggable._newPos.clone(),
                                this._draggable._newPos.x = r
                        },
                        _onDragEnd: function(t) {
                            var e = this._map,
                                i = e.options,
                                n = !i.inertia || this._times.length < 2;
                            if (e.fire("dragend", t), n) e.fire("moveend");
                            else {
                                var s = this._lastPos.subtract(this._positions[0]),
                                    r = (this._lastTime - this._times[0]) / 1e3,
                                    a = i.easeLinearity,
                                    h = s.multiplyBy(a / r),
                                    l = h.distanceTo([0, 0]),
                                    u = Math.min(i.inertiaMaxSpeed, l),
                                    c = h.multiplyBy(u / l),
                                    d = u / (i.inertiaDeceleration * a),
                                    _ = c.multiplyBy( - d / 2).round();
                                _.x || _.y ? (_ = e._limitOffset(_, e.options.maxBounds), o.Util.requestAnimFrame(function() {
                                    e.panBy(_, {
                                        duration: d,
                                        easeLinearity: a,
                                        noMoveStart: !0,
                                        animate: !0
                                    })
                                })) : e.fire("moveend")
                            }
                        }
                    }),
                    o.Map.addInitHook("addHandler", "dragging", o.Map.Drag),
                    o.Map.mergeOptions({
                        doubleClickZoom: !0
                    }),
                    o.Map.DoubleClickZoom = o.Handler.extend({
                        addHooks: function() {
                            this._map.on("dblclick", this._onDoubleClick, this)
                        },
                        removeHooks: function() {
                            this._map.off("dblclick", this._onDoubleClick, this)
                        },
                        _onDoubleClick: function(t) {
                            var e = this._map,
                                i = e.getZoom(),
                                o = e.options.zoomDelta,
                                n = t.originalEvent.shiftKey ? i - o: i + o;
                            "center" === e.options.doubleClickZoom ? e.setZoom(n) : e.setZoomAround(t.containerPoint, n)
                        }
                    }),
                    o.Map.addInitHook("addHandler", "doubleClickZoom", o.Map.DoubleClickZoom),
                    o.Map.mergeOptions({
                        scrollWheelZoom: !0,
                        wheelDebounceTime: 40,
                        wheelPxPerZoomLevel: 60
                    }),
                    o.Map.ScrollWheelZoom = o.Handler.extend({
                        addHooks: function() {
                            o.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this),
                                this._delta = 0
                        },
                        removeHooks: function() {
                            o.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll, this)
                        },
                        _onWheelScroll: function(t) {
                            var e = o.DomEvent.getWheelDelta(t),
                                i = this._map.options.wheelDebounceTime;
                            this._delta += e,
                                this._lastMousePos = this._map.mouseEventToContainerPoint(t),
                            this._startTime || (this._startTime = +new Date);
                            var n = Math.max(i - ( + new Date - this._startTime), 0);
                            clearTimeout(this._timer),
                                this._timer = setTimeout(o.bind(this._performZoom, this), n),
                                o.DomEvent.stop(t)
                        },
                        _performZoom: function() {
                            var t = this._map,
                                e = t.getZoom(),
                                i = this._map.options.zoomSnap || 0;
                            t._stop();
                            var o = this._delta / (4 * this._map.options.wheelPxPerZoomLevel),
                                n = 4 * Math.log(2 / (1 + Math.exp( - Math.abs(o)))) / Math.LN2,
                                s = i ? Math.ceil(n / i) * i: n,
                                r = t._limitZoom(e + (this._delta > 0 ? s: -s)) - e;
                            this._delta = 0,
                                this._startTime = null,
                            r && ("center" === t.options.scrollWheelZoom ? t.setZoom(e + r) : t.setZoomAround(this._lastMousePos, e + r))
                        }
                    }),
                    o.Map.addInitHook("addHandler", "scrollWheelZoom", o.Map.ScrollWheelZoom),
                    o.extend(o.DomEvent, {
                        _touchstart: o.Browser.msPointer ? "MSPointerDown": o.Browser.pointer ? "pointerdown": "touchstart",
                        _touchend: o.Browser.msPointer ? "MSPointerUp": o.Browser.pointer ? "pointerup": "touchend",
                        addDoubleTapListener: function(t, e, i) {
                            function n(t) {
                                if (! ((o.Browser.pointer ? o.DomEvent._pointersCount: t.touches.length) > 1)) {
                                    var e = Date.now(),
                                        i = e - (r || e);
                                    a = t.touches ? t.touches[0] : t,
                                        h = i > 0 && i <= l,
                                        r = e
                                }
                            }
                            function s() {
                                if (h && !a.cancelBubble) {
                                    if (o.Browser.pointer) {
                                        var t, i, n = {};
                                        for (i in a) t = a[i],
                                            n[i] = t && t.bind ? t.bind(a) : t;
                                        a = n
                                    }
                                    a.type = "dblclick",
                                        e(a),
                                        r = null
                                }
                            }
                            var r, a, h = !1,
                                l = 250,
                                u = "_leaflet_",
                                c = this._touchstart,
                                d = this._touchend;
                            return t[u + c + i] = n,
                                t[u + d + i] = s,
                                t[u + "dblclick" + i] = e,
                                t.addEventListener(c, n, !1),
                                t.addEventListener(d, s, !1),
                            o.Browser.edge || t.addEventListener("dblclick", e, !1),
                                this
                        },
                        removeDoubleTapListener: function(t, e) {
                            var i = "_leaflet_",
                                n = t[i + this._touchstart + e],
                                s = t[i + this._touchend + e],
                                r = t[i + "dblclick" + e];
                            return t.removeEventListener(this._touchstart, n, !1),
                                t.removeEventListener(this._touchend, s, !1),
                            o.Browser.edge || t.removeEventListener("dblclick", r, !1),
                                this
                        }
                    }),
                    o.extend(o.DomEvent, {
                        POINTER_DOWN: o.Browser.msPointer ? "MSPointerDown": "pointerdown",
                        POINTER_MOVE: o.Browser.msPointer ? "MSPointerMove": "pointermove",
                        POINTER_UP: o.Browser.msPointer ? "MSPointerUp": "pointerup",
                        POINTER_CANCEL: o.Browser.msPointer ? "MSPointerCancel": "pointercancel",
                        TAG_WHITE_LIST: ["INPUT", "SELECT", "OPTION"],
                        _pointers: {},
                        _pointersCount: 0,
                        addPointerListener: function(t, e, i, o) {
                            return "touchstart" === e ? this._addPointerStart(t, i, o) : "touchmove" === e ? this._addPointerMove(t, i, o) : "touchend" === e && this._addPointerEnd(t, i, o),
                                this
                        },
                        removePointerListener: function(t, e, i) {
                            var o = t["_leaflet_" + e + i];
                            return "touchstart" === e ? t.removeEventListener(this.POINTER_DOWN, o, !1) : "touchmove" === e ? t.removeEventListener(this.POINTER_MOVE, o, !1) : "touchend" === e && (t.removeEventListener(this.POINTER_UP, o, !1), t.removeEventListener(this.POINTER_CANCEL, o, !1)),
                                this
                        },
                        _addPointerStart: function(t, i, n) {
                            var s = o.bind(function(t) {
                                    if ("mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE) {
                                        if (! (this.TAG_WHITE_LIST.indexOf(t.target.tagName) < 0)) return;
                                        o.DomEvent.preventDefault(t)
                                    }
                                    this._handlePointer(t, i)
                                },
                                this);
                            if (t["_leaflet_touchstart" + n] = s, t.addEventListener(this.POINTER_DOWN, s, !1), !this._pointerDocListener) {
                                var r = o.bind(this._globalPointerUp, this);
                                e.documentElement.addEventListener(this.POINTER_DOWN, o.bind(this._globalPointerDown, this), !0),
                                    e.documentElement.addEventListener(this.POINTER_MOVE, o.bind(this._globalPointerMove, this), !0),
                                    e.documentElement.addEventListener(this.POINTER_UP, r, !0),
                                    e.documentElement.addEventListener(this.POINTER_CANCEL, r, !0),
                                    this._pointerDocListener = !0
                            }
                        },
                        _globalPointerDown: function(t) {
                            this._pointers[t.pointerId] = t,
                                this._pointersCount++
                        },
                        _globalPointerMove: function(t) {
                            this._pointers[t.pointerId] && (this._pointers[t.pointerId] = t)
                        },
                        _globalPointerUp: function(t) {
                            delete this._pointers[t.pointerId],
                                this._pointersCount--
                        },
                        _handlePointer: function(t, e) {
                            t.touches = [];
                            for (var i in this._pointers) t.touches.push(this._pointers[i]);
                            t.changedTouches = [t],
                                e(t)
                        },
                        _addPointerMove: function(t, e, i) {
                            var n = o.bind(function(t) { (t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) && this._handlePointer(t, e)
                                },
                                this);
                            t["_leaflet_touchmove" + i] = n,
                                t.addEventListener(this.POINTER_MOVE, n, !1)
                        },
                        _addPointerEnd: function(t, e, i) {
                            var n = o.bind(function(t) {
                                    this._handlePointer(t, e)
                                },
                                this);
                            t["_leaflet_touchend" + i] = n,
                                t.addEventListener(this.POINTER_UP, n, !1),
                                t.addEventListener(this.POINTER_CANCEL, n, !1)
                        }
                    }),
                    o.Map.mergeOptions({
                        touchZoom: o.Browser.touch && !o.Browser.android23,
                        bounceAtZoomLimits: !0
                    }),
                    o.Map.TouchZoom = o.Handler.extend({
                        addHooks: function() {
                            o.DomUtil.addClass(this._map._container, "leaflet-touch-zoom"),
                                o.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
                        },
                        removeHooks: function() {
                            o.DomUtil.removeClass(this._map._container, "leaflet-touch-zoom"),
                                o.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
                        },
                        _onTouchStart: function(t) {
                            var i = this._map;
                            if (t.touches && 2 === t.touches.length && !i._animatingZoom && !this._zooming) {
                                var n = i.mouseEventToContainerPoint(t.touches[0]),
                                    s = i.mouseEventToContainerPoint(t.touches[1]);
                                this._centerPoint = i.getSize()._divideBy(2),
                                    this._startLatLng = i.containerPointToLatLng(this._centerPoint),
                                "center" !== i.options.touchZoom && (this._pinchStartLatLng = i.containerPointToLatLng(n.add(s)._divideBy(2))),
                                    this._startDist = n.distanceTo(s),
                                    this._startZoom = i.getZoom(),
                                    this._moved = !1,
                                    this._zooming = !0,
                                    i._stop(),
                                    o.DomEvent.on(e, "touchmove", this._onTouchMove, this).on(e, "touchend", this._onTouchEnd, this),
                                    o.DomEvent.preventDefault(t)
                            }
                        },
                        _onTouchMove: function(t) {
                            if (t.touches && 2 === t.touches.length && this._zooming) {
                                var e = this._map,
                                    i = e.mouseEventToContainerPoint(t.touches[0]),
                                    n = e.mouseEventToContainerPoint(t.touches[1]),
                                    s = i.distanceTo(n) / this._startDist;
                                if (this._zoom = e.getScaleZoom(s, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && s < 1 || this._zoom > e.getMaxZoom() && s > 1) && (this._zoom = e._limitZoom(this._zoom)), "center" === e.options.touchZoom) {
                                    if (this._center = this._startLatLng, 1 === s) return
                                } else {
                                    var r = i._add(n)._divideBy(2)._subtract(this._centerPoint);
                                    if (1 === s && 0 === r.x && 0 === r.y) return;
                                    this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(r), this._zoom)
                                }
                                this._moved || (e._moveStart(!0), this._moved = !0),
                                    o.Util.cancelAnimFrame(this._animRequest);
                                var a = o.bind(e._move, e, this._center, this._zoom, {
                                    pinch: !0,
                                    round: !1
                                });
                                this._animRequest = o.Util.requestAnimFrame(a, this, !0),
                                    o.DomEvent.preventDefault(t)
                            }
                        },
                        _onTouchEnd: function() {
                            if (!this._moved || !this._zooming) return void(this._zooming = !1);
                            this._zooming = !1,
                                o.Util.cancelAnimFrame(this._animRequest),
                                o.DomEvent.off(e, "touchmove", this._onTouchMove).off(e, "touchend", this._onTouchEnd),
                                this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom))
                        }
                    }),
                    o.Map.addInitHook("addHandler", "touchZoom", o.Map.TouchZoom),
                    o.Map.mergeOptions({
                        tap: !0,
                        tapTolerance: 15
                    }),
                    o.Map.Tap = o.Handler.extend({
                        addHooks: function() {
                            o.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
                        },
                        removeHooks: function() {
                            o.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
                        },
                        _onDown: function(t) {
                            if (t.touches) {
                                if (o.DomEvent.preventDefault(t), this._fireClick = !0, t.touches.length > 1) return this._fireClick = !1,
                                    void clearTimeout(this._holdTimeout);
                                var i = t.touches[0],
                                    n = i.target;
                                this._startPos = this._newPos = new o.Point(i.clientX, i.clientY),
                                n.tagName && "a" === n.tagName.toLowerCase() && o.DomUtil.addClass(n, "leaflet-active"),
                                    this._holdTimeout = setTimeout(o.bind(function() {
                                            this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", i))
                                        },
                                        this), 1e3),
                                    this._simulateEvent("mousedown", i),
                                    o.DomEvent.on(e, {
                                            touchmove: this._onMove,
                                            touchend: this._onUp
                                        },
                                        this)
                            }
                        },
                        _onUp: function(t) {
                            if (clearTimeout(this._holdTimeout), o.DomEvent.off(e, {
                                        touchmove: this._onMove,
                                        touchend: this._onUp
                                    },
                                    this), this._fireClick && t && t.changedTouches) {
                                var i = t.changedTouches[0],
                                    n = i.target;
                                n && n.tagName && "a" === n.tagName.toLowerCase() && o.DomUtil.removeClass(n, "leaflet-active"),
                                    this._simulateEvent("mouseup", i),
                                this._isTapValid() && this._simulateEvent("click", i)
                            }
                        },
                        _isTapValid: function() {
                            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
                        },
                        _onMove: function(t) {
                            var e = t.touches[0];
                            this._newPos = new o.Point(e.clientX, e.clientY),
                                this._simulateEvent("mousemove", e)
                        },
                        _simulateEvent: function(i, o) {
                            var n = e.createEvent("MouseEvents");
                            n._simulated = !0,
                                o.target._simulatedClick = !0,
                                n.initMouseEvent(i, !0, !0, t, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null),
                                o.target.dispatchEvent(n)
                        }
                    }),
                o.Browser.touch && !o.Browser.pointer && o.Map.addInitHook("addHandler", "tap", o.Map.Tap),
                    o.Map.mergeOptions({
                        boxZoom: !0
                    }),
                    o.Map.BoxZoom = o.Handler.extend({
                        initialize: function(t) {
                            this._map = t,
                                this._container = t._container,
                                this._pane = t._panes.overlayPane
                        },
                        addHooks: function() {
                            o.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
                        },
                        removeHooks: function() {
                            o.DomEvent.off(this._container, "mousedown", this._onMouseDown, this)
                        },
                        moved: function() {
                            return this._moved
                        },
                        _resetState: function() {
                            this._moved = !1
                        },
                        _onMouseDown: function(t) {
                            if (!t.shiftKey || 1 !== t.which && 1 !== t.button) return ! 1;
                            this._resetState(),
                                o.DomUtil.disableTextSelection(),
                                o.DomUtil.disableImageDrag(),
                                this._startPoint = this._map.mouseEventToContainerPoint(t),
                                o.DomEvent.on(e, {
                                        contextmenu: o.DomEvent.stop,
                                        mousemove: this._onMouseMove,
                                        mouseup: this._onMouseUp,
                                        keydown: this._onKeyDown
                                    },
                                    this)
                        },
                        _onMouseMove: function(t) {
                            this._moved || (this._moved = !0, this._box = o.DomUtil.create("div", "leaflet-zoom-box", this._container), o.DomUtil.addClass(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")),
                                this._point = this._map.mouseEventToContainerPoint(t);
                            var e = new o.Bounds(this._point, this._startPoint),
                                i = e.getSize();
                            o.DomUtil.setPosition(this._box, e.min),
                                this._box.style.width = i.x + "px",
                                this._box.style.height = i.y + "px"
                        },
                        _finish: function() {
                            this._moved && (o.DomUtil.remove(this._box), o.DomUtil.removeClass(this._container, "leaflet-crosshair")),
                                o.DomUtil.enableTextSelection(),
                                o.DomUtil.enableImageDrag(),
                                o.DomEvent.off(e, {
                                        contextmenu: o.DomEvent.stop,
                                        mousemove: this._onMouseMove,
                                        mouseup: this._onMouseUp,
                                        keydown: this._onKeyDown
                                    },
                                    this)
                        },
                        _onMouseUp: function(t) {
                            if ((1 === t.which || 1 === t.button) && (this._finish(), this._moved)) {
                                setTimeout(o.bind(this._resetState, this), 0);
                                var e = new o.LatLngBounds(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
                                this._map.fitBounds(e).fire("boxzoomend", {
                                    boxZoomBounds: e
                                })
                            }
                        },
                        _onKeyDown: function(t) {
                            27 === t.keyCode && this._finish()
                        }
                    }),
                    o.Map.addInitHook("addHandler", "boxZoom", o.Map.BoxZoom),
                    o.Map.mergeOptions({
                        keyboard: !0,
                        keyboardPanDelta: 80
                    }),
                    o.Map.Keyboard = o.Handler.extend({
                        keyCodes: {
                            left: [37],
                            right: [39],
                            down: [40],
                            up: [38],
                            zoomIn: [187, 107, 61, 171],
                            zoomOut: [189, 109, 54, 173]
                        },
                        initialize: function(t) {
                            this._map = t,
                                this._setPanDelta(t.options.keyboardPanDelta),
                                this._setZoomDelta(t.options.zoomDelta)
                        },
                        addHooks: function() {
                            var t = this._map._container;
                            t.tabIndex <= 0 && (t.tabIndex = "0"),
                                o.DomEvent.on(t, {
                                        focus: this._onFocus,
                                        blur: this._onBlur,
                                        mousedown: this._onMouseDown
                                    },
                                    this),
                                this._map.on({
                                        focus: this._addHooks,
                                        blur: this._removeHooks
                                    },
                                    this)
                        },
                        removeHooks: function() {
                            this._removeHooks(),
                                o.DomEvent.off(this._map._container, {
                                        focus: this._onFocus,
                                        blur: this._onBlur,
                                        mousedown: this._onMouseDown
                                    },
                                    this),
                                this._map.off({
                                        focus: this._addHooks,
                                        blur: this._removeHooks
                                    },
                                    this)
                        },
                        _onMouseDown: function() {
                            if (!this._focused) {
                                var i = e.body,
                                    o = e.documentElement,
                                    n = i.scrollTop || o.scrollTop,
                                    s = i.scrollLeft || o.scrollLeft;
                                this._map._container.focus(),
                                    t.scrollTo(s, n)
                            }
                        },
                        _onFocus: function() {
                            this._focused = !0,
                                this._map.fire("focus")
                        },
                        _onBlur: function() {
                            this._focused = !1,
                                this._map.fire("blur")
                        },
                        _setPanDelta: function(t) {
                            var e, i, o = this._panKeys = {},
                                n = this.keyCodes;
                            for (e = 0, i = n.left.length; e < i; e++) o[n.left[e]] = [ - 1 * t, 0];
                            for (e = 0, i = n.right.length; e < i; e++) o[n.right[e]] = [t, 0];
                            for (e = 0, i = n.down.length; e < i; e++) o[n.down[e]] = [0, t];
                            for (e = 0, i = n.up.length; e < i; e++) o[n.up[e]] = [0, -1 * t]
                        },
                        _setZoomDelta: function(t) {
                            var e, i, o = this._zoomKeys = {},
                                n = this.keyCodes;
                            for (e = 0, i = n.zoomIn.length; e < i; e++) o[n.zoomIn[e]] = t;
                            for (e = 0, i = n.zoomOut.length; e < i; e++) o[n.zoomOut[e]] = -t
                        },
                        _addHooks: function() {
                            o.DomEvent.on(e, "keydown", this._onKeyDown, this)
                        },
                        _removeHooks: function() {
                            o.DomEvent.off(e, "keydown", this._onKeyDown, this)
                        },
                        _onKeyDown: function(t) {
                            if (! (t.altKey || t.ctrlKey || t.metaKey)) {
                                var e, i = t.keyCode,
                                    n = this._map;
                                if (i in this._panKeys) {
                                    if (n._panAnim && n._panAnim._inProgress) return;
                                    e = this._panKeys[i],
                                    t.shiftKey && (e = o.point(e).multiplyBy(3)),
                                        n.panBy(e),
                                    n.options.maxBounds && n.panInsideBounds(n.options.maxBounds)
                                } else if (i in this._zoomKeys) n.setZoom(n.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[i]);
                                else {
                                    if (27 !== i) return;
                                    n.closePopup()
                                }
                                o.DomEvent.stop(t)
                            }
                        }
                    }),
                    o.Map.addInitHook("addHandler", "keyboard", o.Map.Keyboard),
                    o.Handler.MarkerDrag = o.Handler.extend({
                        initialize: function(t) {
                            this._marker = t
                        },
                        addHooks: function() {
                            var t = this._marker._icon;
                            this._draggable || (this._draggable = new o.Draggable(t, t, !0)),
                                this._draggable.on({
                                        dragstart: this._onDragStart,
                                        drag: this._onDrag,
                                        dragend: this._onDragEnd
                                    },
                                    this).enable(),
                                o.DomUtil.addClass(t, "leaflet-marker-draggable")
                        },
                        removeHooks: function() {
                            this._draggable.off({
                                    dragstart: this._onDragStart,
                                    drag: this._onDrag,
                                    dragend: this._onDragEnd
                                },
                                this).disable(),
                            this._marker._icon && o.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
                        },
                        moved: function() {
                            return this._draggable && this._draggable._moved
                        },
                        _onDragStart: function() {
                            this._oldLatLng = this._marker.getLatLng(),
                                this._marker.closePopup().fire("movestart").fire("dragstart")
                        },
                        _onDrag: function(t) {
                            var e = this._marker,
                                i = e._shadow,
                                n = o.DomUtil.getPosition(e._icon),
                                s = e._map.layerPointToLatLng(n);
                            i && o.DomUtil.setPosition(i, n),
                                e._latlng = s,
                                t.latlng = s,
                                t.oldLatLng = this._oldLatLng,
                                e.fire("move", t).fire("drag", t)
                        },
                        _onDragEnd: function(t) {
                            delete this._oldLatLng,
                                this._marker.fire("moveend").fire("dragend", t)
                        }
                    }),
                    o.Control = o.Class.extend({
                        options: {
                            position: "topright"
                        },
                        initialize: function(t) {
                            o.setOptions(this, t)
                        },
                        getPosition: function() {
                            return this.options.position
                        },
                        setPosition: function(t) {
                            var e = this._map;
                            return e && e.removeControl(this),
                                this.options.position = t,
                            e && e.addControl(this),
                                this
                        },
                        getContainer: function() {
                            return this._container
                        },
                        addTo: function(t) {
                            this.remove(),
                                this._map = t;
                            var e = this._container = this.onAdd(t),
                                i = this.getPosition(),
                                n = t._controlCorners[i];
                            return o.DomUtil.addClass(e, "leaflet-control"),
                                -1 !== i.indexOf("bottom") ? n.insertBefore(e, n.firstChild) : n.appendChild(e),
                                this
                        },
                        remove: function() {
                            return this._map ? (o.DomUtil.remove(this._container), this.onRemove && this.onRemove(this._map), this._map = null, this) : this
                        },
                        _refocusOnMap: function(t) {
                            this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus()
                        }
                    }),
                    o.control = function(t) {
                        return new o.Control(t)
                    },
                    o.Map.include({
                        addControl: function(t) {
                            return t.addTo(this),
                                this
                        },
                        removeControl: function(t) {
                            return t.remove(),
                                this
                        },
                        _initControlPos: function() {
                            function t(t, s) {
                                var r = i + t + " " + i + s;
                                e[t + s] = o.DomUtil.create("div", r, n)
                            }
                            var e = this._controlCorners = {},
                                i = "leaflet-",
                                n = this._controlContainer = o.DomUtil.create("div", i + "control-container", this._container);
                            t("top", "left"),
                                t("top", "right"),
                                t("bottom", "left"),
                                t("bottom", "right")
                        },
                        _clearControlPos: function() {
                            o.DomUtil.remove(this._controlContainer)
                        }
                    }),
                    o.Control.Zoom = o.Control.extend({
                        options: {
                            position: "topleft",
                            zoomInText: "+",
                            zoomInTitle: "Zoom in",
                            zoomOutText: "-",
                            zoomOutTitle: "Zoom out"
                        },
                        onAdd: function(t) {
                            var e = "leaflet-control-zoom",
                                i = o.DomUtil.create("div", e + " leaflet-bar"),
                                n = this.options;
                            return this._zoomInButton = this._createButton(n.zoomInText, n.zoomInTitle, e + "-in", i, this._zoomIn),
                                this._zoomOutButton = this._createButton(n.zoomOutText, n.zoomOutTitle, e + "-out", i, this._zoomOut),
                                this._updateDisabled(),
                                t.on("zoomend zoomlevelschange", this._updateDisabled, this),
                                i
                        },
                        onRemove: function(t) {
                            t.off("zoomend zoomlevelschange", this._updateDisabled, this)
                        },
                        disable: function() {
                            return this._disabled = !0,
                                this._updateDisabled(),
                                this
                        },
                        enable: function() {
                            return this._disabled = !1,
                                this._updateDisabled(),
                                this
                        },
                        _zoomIn: function(t) { ! this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
                        },
                        _zoomOut: function(t) { ! this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
                        },
                        _createButton: function(t, e, i, n, s) {
                            var r = o.DomUtil.create("a", i, n);
                            return r.innerHTML = t,
                                r.href = "#",
                                r.title = e,
                                r.setAttribute("role", "button"),
                                r.setAttribute("aria-label", e),
                                o.DomEvent.on(r, "mousedown dblclick", o.DomEvent.stopPropagation).on(r, "click", o.DomEvent.stop).on(r, "click", s, this).on(r, "click", this._refocusOnMap, this),
                                r
                        },
                        _updateDisabled: function() {
                            var t = this._map,
                                e = "leaflet-disabled";
                            o.DomUtil.removeClass(this._zoomInButton, e),
                                o.DomUtil.removeClass(this._zoomOutButton, e),
                            (this._disabled || t._zoom === t.getMinZoom()) && o.DomUtil.addClass(this._zoomOutButton, e),
                            (this._disabled || t._zoom === t.getMaxZoom()) && o.DomUtil.addClass(this._zoomInButton, e)
                        }
                    }),
                    o.Map.mergeOptions({
                        zoomControl: !0
                    }),
                    o.Map.addInitHook(function() {
                        this.options.zoomControl && (this.zoomControl = new o.Control.Zoom, this.addControl(this.zoomControl))
                    }),
                    o.control.zoom = function(t) {
                        return new o.Control.Zoom(t)
                    },
                    o.Control.Attribution = o.Control.extend({
                        options: {
                            position: "bottomright",
                            prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
                        },
                        initialize: function(t) {
                            o.setOptions(this, t),
                                this._attributions = {}
                        },
                        onAdd: function(t) {
                            t.attributionControl = this,
                                this._container = o.DomUtil.create("div", "leaflet-control-attribution"),
                            o.DomEvent && o.DomEvent.disableClickPropagation(this._container);
                            for (var e in t._layers) t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
                            return this._update(),
                                this._container
                        },
                        setPrefix: function(t) {
                            return this.options.prefix = t,
                                this._update(),
                                this
                        },
                        addAttribution: function(t) {
                            return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : this
                        },
                        removeAttribution: function(t) {
                            return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : this
                        },
                        _update: function() {
                            if (this._map) {
                                var t = [];
                                for (var e in this._attributions) this._attributions[e] && t.push(e);
                                var i = [];
                                this.options.prefix && i.push(this.options.prefix),
                                t.length && i.push(t.join(", ")),
                                    this._container.innerHTML = i.join(" | ")
                            }
                        }
                    }),
                    o.Map.mergeOptions({
                        attributionControl: !0
                    }),
                    o.Map.addInitHook(function() {
                        this.options.attributionControl && (new o.Control.Attribution).addTo(this)
                    }),
                    o.control.attribution = function(t) {
                        return new o.Control.Attribution(t)
                    },
                    o.Control.Scale = o.Control.extend({
                        options: {
                            position: "bottomleft",
                            maxWidth: 100,
                            metric: !0,
                            imperial: !0
                        },
                        onAdd: function(t) {
                            var e = o.DomUtil.create("div", "leaflet-control-scale"),
                                i = this.options;
                            return this._addScales(i, "leaflet-control-scale-line", e),
                                t.on(i.updateWhenIdle ? "moveend": "move", this._update, this),
                                t.whenReady(this._update, this),
                                e
                        },
                        onRemove: function(t) {
                            t.off(this.options.updateWhenIdle ? "moveend": "move", this._update, this)
                        },
                        _addScales: function(t, e, i) {
                            t.metric && (this._mScale = o.DomUtil.create("div", e, i)),
                            t.imperial && (this._iScale = o.DomUtil.create("div", e, i))
                        },
                        _update: function() {
                            var t = this._map,
                                e = t.getSize().y / 2,
                                i = t.distance(t.containerPointToLatLng([0, e]), t.containerPointToLatLng([this.options.maxWidth, e]));
                            this._updateScales(i)
                        },
                        _updateScales: function(t) {
                            this.options.metric && t && this._updateMetric(t),
                            this.options.imperial && t && this._updateImperial(t)
                        },
                        _updateMetric: function(t) {
                            var e = this._getRoundNum(t),
                                i = e < 1e3 ? e + " m": e / 1e3 + " km";
                            this._updateScale(this._mScale, i, e / t)
                        },
                        _updateImperial: function(t) {
                            var e, i, o, n = 3.2808399 * t;
                            n > 5280 ? (e = n / 5280, i = this._getRoundNum(e), this._updateScale(this._iScale, i + " mi", i / e)) : (o = this._getRoundNum(n), this._updateScale(this._iScale, o + " ft", o / n))
                        },
                        _updateScale: function(t, e, i) {
                            t.style.width = Math.round(this.options.maxWidth * i) + "px",
                                t.innerHTML = e
                        },
                        _getRoundNum: function(t) {
                            var e = Math.pow(10, (Math.floor(t) + "").length - 1),
                                i = t / e;
                            return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1,
                            e * i
                        }
                    }),
                    o.control.scale = function(t) {
                        return new o.Control.Scale(t)
                    },
                    o.Control.Layers = o.Control.extend({
                        options: {
                            collapsed: !0,
                            position: "topright",
                            autoZIndex: !0,
                            hideSingleBase: !1,
                            sortLayers: !1,
                            sortFunction: function(t, e, i, o) {
                                return i < o ? -1 : o < i ? 1 : 0
                            }
                        },
                        initialize: function(t, e, i) {
                            o.setOptions(this, i),
                                this._layers = [],
                                this._lastZIndex = 0,
                                this._handlingClick = !1;
                            for (var n in t) this._addLayer(t[n], n);
                            for (n in e) this._addLayer(e[n], n, !0)
                        },
                        onAdd: function(t) {
                            return this._initLayout(),
                                this._update(),
                                this._map = t,
                                t.on("zoomend", this._checkDisabledLayers, this),
                                this._container
                        },
                        onRemove: function() {
                            this._map.off("zoomend", this._checkDisabledLayers, this);
                            for (var t = 0; t < this._layers.length; t++) this._layers[t].layer.off("add remove", this._onLayerChange, this)
                        },
                        addBaseLayer: function(t, e) {
                            return this._addLayer(t, e),
                                this._map ? this._update() : this
                        },
                        addOverlay: function(t, e) {
                            return this._addLayer(t, e, !0),
                                this._map ? this._update() : this
                        },
                        removeLayer: function(t) {
                            t.off("add remove", this._onLayerChange, this);
                            var e = this._getLayer(o.stamp(t));
                            return e && this._layers.splice(this._layers.indexOf(e), 1),
                                this._map ? this._update() : this
                        },
                        expand: function() {
                            o.DomUtil.addClass(this._container, "leaflet-control-layers-expanded"),
                                this._form.style.height = null;
                            var t = this._map.getSize().y - (this._container.offsetTop + 50);
                            return t < this._form.clientHeight ? (o.DomUtil.addClass(this._form, "leaflet-control-layers-scrollbar"), this._form.style.height = t + "px") : o.DomUtil.removeClass(this._form, "leaflet-control-layers-scrollbar"),
                                this._checkDisabledLayers(),
                                this
                        },
                        collapse: function() {
                            return o.DomUtil.removeClass(this._container, "leaflet-control-layers-expanded"),
                                this
                        },
                        _initLayout: function() {
                            var t = "leaflet-control-layers",
                                e = this._container = o.DomUtil.create("div", t);
                            e.setAttribute("aria-haspopup", !0),
                                o.DomEvent.disableClickPropagation(e),
                            o.Browser.touch || o.DomEvent.disableScrollPropagation(e);
                            var i = this._form = o.DomUtil.create("form", t + "-list");
                            o.Browser.android || o.DomEvent.on(e, {
                                    mouseenter: this.expand,
                                    mouseleave: this.collapse
                                },
                                this);
                            var n = this._layersLink = o.DomUtil.create("a", t + "-toggle", e);
                            n.href = "#",
                                n.title = "Layers",
                                o.Browser.touch ? o.DomEvent.on(n, "click", o.DomEvent.stop).on(n, "click", this.expand, this) : o.DomEvent.on(n, "focus", this.expand, this),
                                o.DomEvent.on(i, "click",
                                    function() {
                                        setTimeout(o.bind(this._onInputClick, this), 0)
                                    },
                                    this),
                                this._map.on("click", this.collapse, this),
                            this.options.collapsed || this.expand(),
                                this._baseLayersList = o.DomUtil.create("div", t + "-base", i),
                                this._separator = o.DomUtil.create("div", t + "-separator", i),
                                this._overlaysList = o.DomUtil.create("div", t + "-overlays", i),
                                e.appendChild(i)
                        },
                        _getLayer: function(t) {
                            for (var e = 0; e < this._layers.length; e++) if (this._layers[e] && o.stamp(this._layers[e].layer) === t) return this._layers[e]
                        },
                        _addLayer: function(t, e, i) {
                            t.on("add remove", this._onLayerChange, this),
                                this._layers.push({
                                    layer: t,
                                    name: e,
                                    overlay: i
                                }),
                            this.options.sortLayers && this._layers.sort(o.bind(function(t, e) {
                                    return this.options.sortFunction(t.layer, e.layer, t.name, e.name)
                                },
                                this)),
                            this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex))
                        },
                        _update: function() {
                            if (!this._container) return this;
                            o.DomUtil.empty(this._baseLayersList),
                                o.DomUtil.empty(this._overlaysList);
                            var t, e, i, n, s = 0;
                            for (i = 0; i < this._layers.length; i++) n = this._layers[i],
                                this._addItem(n),
                                e = e || n.overlay,
                                t = t || !n.overlay,
                                s += n.overlay ? 0 : 1;
                            return this.options.hideSingleBase && (t = t && s > 1, this._baseLayersList.style.display = t ? "": "none"),
                                this._separator.style.display = e && t ? "": "none",
                                this
                        },
                        _onLayerChange: function(t) {
                            this._handlingClick || this._update();
                            var e = this._getLayer(o.stamp(t.target)),
                                i = e.overlay ? "add" === t.type ? "overlayadd": "overlayremove": "add" === t.type ? "baselayerchange": null;
                            i && this._map.fire(i, e)
                        },
                        _createRadioElement: function(t, i) {
                            var o = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (i ? ' checked="checked"': "") + "/>",
                                n = e.createElement("div");
                            return n.innerHTML = o,
                                n.firstChild
                        },
                        _addItem: function(t) {
                            var i, n = e.createElement("label"),
                                s = this._map.hasLayer(t.layer);
                            t.overlay ? (i = e.createElement("input"), i.type = "checkbox", i.className = "leaflet-control-layers-selector", i.defaultChecked = s) : i = this._createRadioElement("leaflet-base-layers", s),
                                i.layerId = o.stamp(t.layer),
                                o.DomEvent.on(i, "click", this._onInputClick, this);
                            var r = e.createElement("span");
                            r.innerHTML = " " + t.name;
                            var a = e.createElement("div");
                            return n.appendChild(a),
                                a.appendChild(i),
                                a.appendChild(r),
                                (t.overlay ? this._overlaysList: this._baseLayersList).appendChild(n),
                                this._checkDisabledLayers(),
                                n
                        },
                        _onInputClick: function() {
                            var t, e, i, o = this._form.getElementsByTagName("input"),
                                n = [],
                                s = [];
                            this._handlingClick = !0;
                            for (var r = o.length - 1; r >= 0; r--) t = o[r],
                                e = this._getLayer(t.layerId).layer,
                                i = this._map.hasLayer(e),
                                t.checked && !i ? n.push(e) : !t.checked && i && s.push(e);
                            for (r = 0; r < s.length; r++) this._map.removeLayer(s[r]);
                            for (r = 0; r < n.length; r++) this._map.addLayer(n[r]);
                            this._handlingClick = !1,
                                this._refocusOnMap()
                        },
                        _checkDisabledLayers: function() {
                            for (var t, e, i = this._form.getElementsByTagName("input"), o = this._map.getZoom(), n = i.length - 1; n >= 0; n--) t = i[n],
                                e = this._getLayer(t.layerId).layer,
                                t.disabled = void 0 !== e.options.minZoom && o < e.options.minZoom || void 0 !== e.options.maxZoom && o > e.options.maxZoom
                        },
                        _expand: function() {
                            return this.expand()
                        },
                        _collapse: function() {
                            return this.collapse()
                        }
                    }),
                    o.control.layers = function(t, e, i) {
                        return new o.Control.Layers(t, e, i)
                    }
            } (window, document);
        },
            {}],
        4 : [function(require, module, exports) { !
            function(e, t) {
                "object" == typeof exports && exports && "string" != typeof exports.nodeName ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : (e.Mustache = {},
                    t(e.Mustache))
            } (this,
                function(e) {
                    function t(e) {
                        return "function" == typeof e
                    }
                    function n(e) {
                        return g(e) ? "array": typeof e
                    }
                    function r(e) {
                        return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
                    }
                    function i(e, t) {
                        return null != e && "object" == typeof e && t in e
                    }
                    function o(e, t) {
                        return v.call(e, t)
                    }
                    function s(e) {
                        return ! o(w, e)
                    }
                    function a(e) {
                        return String(e).replace(/[&<>"'`=\/]/g,
                            function(e) {
                                return y[e]
                            })
                    }
                    function u(t, n) {
                        function i(e) {
                            if ("string" == typeof e && (e = e.split(k, 2)), !g(e) || 2 !== e.length) throw new Error("Invalid tags: " + e);
                            o = new RegExp(r(e[0]) + "\\s*"),
                                a = new RegExp("\\s*" + r(e[1])),
                                u = new RegExp("\\s*" + r("}" + e[1]))
                        }
                        if (!t) return [];
                        var o, a, u, h = [],
                            f = [],
                            d = [],
                            v = !1,
                            w = !1;
                        i(n || e.tags);
                        for (var y, U, T, j, S, V, C = new l(t); ! C.eos();) {
                            if (y = C.pos, T = C.scanUntil(o)) for (var A = 0,
                                                                        I = T.length; A < I; ++A) j = T.charAt(A),
                                s(j) ? d.push(f.length) : w = !0,
                                f.push(["text", j, y, y + 1]),
                                y += 1,
                            "\n" === j &&
                            function() {
                                if (v && !w) for (; d.length;) delete f[d.pop()];
                                else d = [];
                                v = !1,
                                    w = !1
                            } ();
                            if (!C.scan(o)) break;
                            if (v = !0, U = C.scan(E) || "name", C.scan(x), "=" === U ? (T = C.scanUntil(b), C.scan(b), C.scanUntil(a)) : "{" === U ? (T = C.scanUntil(u), C.scan(m), C.scanUntil(a), U = "&") : T = C.scanUntil(a), !C.scan(a)) throw new Error("Unclosed tag at " + C.pos);
                            if (S = [U, T, y, C.pos], f.push(S), "#" === U || "^" === U) h.push(S);
                            else if ("/" === U) {
                                if (! (V = h.pop())) throw new Error('Unopened section "' + T + '" at ' + y);
                                if (V[1] !== T) throw new Error('Unclosed section "' + V[1] + '" at ' + y)
                            } else "name" === U || "{" === U || "&" === U ? w = !0 : "=" === U && i(T)
                        }
                        if (V = h.pop()) throw new Error('Unclosed section "' + V[1] + '" at ' + C.pos);
                        return p(c(f))
                    }
                    function c(e) {
                        for (var t, n, r = [], i = 0, o = e.length; i < o; ++i)(t = e[i]) && ("text" === t[0] && n && "text" === n[0] ? (n[1] += t[1], n[3] = t[3]) : (r.push(t), n = t));
                        return r
                    }
                    function p(e) {
                        for (var t, n, r = [], i = r, o = [], s = 0, a = e.length; s < a; ++s) switch (t = e[s], t[0]) {
                            case "#":
                            case "^":
                                i.push(t),
                                    o.push(t),
                                    i = t[4] = [];
                                break;
                            case "/":
                                n = o.pop(),
                                    n[5] = t[2],
                                    i = o.length > 0 ? o[o.length - 1][4] : r;
                                break;
                            default:
                                i.push(t)
                        }
                        return r
                    }
                    function l(e) {
                        this.string = e,
                            this.tail = e,
                            this.pos = 0
                    }
                    function h(e, t) {
                        this.view = e,
                            this.cache = {
                                ".": this.view
                            },
                            this.parent = t
                    }
                    function f() {
                        this.cache = {}
                    }
                    var d = Object.prototype.toString,
                        g = Array.isArray ||
                            function(e) {
                                return "[object Array]" === d.call(e)
                            },
                        v = RegExp.prototype.test,
                        w = /\S/,
                        y = {
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            '"': "&quot;",
                            "'": "&#39;",
                            "/": "&#x2F;",
                            "`": "&#x60;",
                            "=": "&#x3D;"
                        },
                        x = /\s*/,
                        k = /\s+/,
                        b = /\s*=/,
                        m = /\s*\}/,
                        E = /#|\^|\/|>|\{|&|=|!/;
                    l.prototype.eos = function() {
                        return "" === this.tail
                    },
                        l.prototype.scan = function(e) {
                            var t = this.tail.match(e);
                            if (!t || 0 !== t.index) return "";
                            var n = t[0];
                            return this.tail = this.tail.substring(n.length),
                                this.pos += n.length,
                                n
                        },
                        l.prototype.scanUntil = function(e) {
                            var t, n = this.tail.search(e);
                            switch (n) {
                                case - 1 : t = this.tail,
                                    this.tail = "";
                                    break;
                                case 0:
                                    t = "";
                                    break;
                                default:
                                    t = this.tail.substring(0, n),
                                        this.tail = this.tail.substring(n)
                            }
                            return this.pos += t.length,
                                t
                        },
                        h.prototype.push = function(e) {
                            return new h(e, this)
                        },
                        h.prototype.lookup = function(e) {
                            var n, r = this.cache;
                            if (r.hasOwnProperty(e)) n = r[e];
                            else {
                                for (var o, s, a = this,
                                         u = !1; a;) {
                                    if (e.indexOf(".") > 0) for (n = a.view, o = e.split("."), s = 0; null != n && s < o.length;) s === o.length - 1 && (u = i(n, o[s])),
                                        n = n[o[s++]];
                                    else n = a.view[e],
                                        u = i(a.view, e);
                                    if (u) break;
                                    a = a.parent
                                }
                                r[e] = n
                            }
                            return t(n) && (n = n.call(this.view)),
                                n
                        },
                        f.prototype.clearCache = function() {
                            this.cache = {}
                        },
                        f.prototype.parse = function(e, t) {
                            var n = this.cache,
                                r = n[e];
                            return null == r && (r = n[e] = u(e, t)),
                                r
                        },
                        f.prototype.render = function(e, t, n) {
                            var r = this.parse(e),
                                i = t instanceof h ? t: new h(t);
                            return this.renderTokens(r, i, n, e)
                        },
                        f.prototype.renderTokens = function(e, t, n, r) {
                            for (var i, o, s, a = "",
                                     u = 0,
                                     c = e.length; u < c; ++u) s = void 0,
                                i = e[u],
                                o = i[0],
                                "#" === o ? s = this.renderSection(i, t, n, r) : "^" === o ? s = this.renderInverted(i, t, n, r) : ">" === o ? s = this.renderPartial(i, t, n, r) : "&" === o ? s = this.unescapedValue(i, t) : "name" === o ? s = this.escapedValue(i, t) : "text" === o && (s = this.rawValue(i)),
                            void 0 !== s && (a += s);
                            return a
                        },
                        f.prototype.renderSection = function(e, n, r, i) {
                            function o(e) {
                                return s.render(e, n, r)
                            }
                            var s = this,
                                a = "",
                                u = n.lookup(e[1]);
                            if (u) {
                                if (g(u)) for (var c = 0,
                                                   p = u.length; c < p; ++c) a += this.renderTokens(e[4], n.push(u[c]), r, i);
                                else if ("object" == typeof u || "string" == typeof u || "number" == typeof u) a += this.renderTokens(e[4], n.push(u), r, i);
                                else if (t(u)) {
                                    if ("string" != typeof i) throw new Error("Cannot use higher-order sections without the original template");
                                    u = u.call(n.view, i.slice(e[3], e[5]), o),
                                    null != u && (a += u)
                                } else a += this.renderTokens(e[4], n, r, i);
                                return a
                            }
                        },
                        f.prototype.renderInverted = function(e, t, n, r) {
                            var i = t.lookup(e[1]);
                            if (!i || g(i) && 0 === i.length) return this.renderTokens(e[4], t, n, r)
                        },
                        f.prototype.renderPartial = function(e, n, r) {
                            if (r) {
                                var i = t(r) ? r(e[1]) : r[e[1]];
                                return null != i ? this.renderTokens(this.parse(i), n, r, i) : void 0
                            }
                        },
                        f.prototype.unescapedValue = function(e, t) {
                            var n = t.lookup(e[1]);
                            if (null != n) return n
                        },
                        f.prototype.escapedValue = function(t, n) {
                            var r = n.lookup(t[1]);
                            if (null != r) return e.escape(r)
                        },
                        f.prototype.rawValue = function(e) {
                            return e[1]
                        },
                        e.name = "mustache.js",
                        e.version = "2.2.1",
                        e.tags = ["{{", "}}"];
                    var U = new f;
                    e.clearCache = function() {
                        return U.clearCache()
                    },
                        e.parse = function(e, t) {
                            return U.parse(e, t)
                        },
                        e.render = function(e, t, r) {
                            if ("string" != typeof e) throw new TypeError('Invalid template! Template should be a "string" but "' + n(e) + '" was given as the first argument for mustache#render(template, view, partials)');
                            return U.render(e, t, r)
                        },
                        e.to_html = function(n, r, i, o) {
                            var s = e.render(n, r, i);
                            if (!t(o)) return s;
                            o(s)
                        },
                        e.escape = a,
                        e.Scanner = l,
                        e.Context = h,
                        e.Writer = f
                });
        },
            {}],
        5 : [function(require, module, exports) {
            function cleanUrl(t) {
                "use strict";
                return /^https?/.test(t.getScheme()) ? t.toString() : /^mailto?/.test(t.getScheme()) ? t.toString() : "data" == t.getScheme() && /^image/.test(t.getPath()) ? t.toString() : void 0
            }
            function cleanId(t) {
                return t
            }
            var html_sanitize = require("./sanitizer-bundle.js");
            module.exports = function(t) {
                return t ? html_sanitize(t, cleanUrl, cleanId) : ""
            };
        },
            {
                "./sanitizer-bundle.js": 6
            }],
        6 : [function(require, module, exports) {
            var URI = function() {
                    function e(e) {
                        var t = ("" + e).match(p);
                        return t ? new s(c(t[1]), c(t[2]), c(t[3]), c(t[4]), c(t[5]), c(t[6]), c(t[7])) : null
                    }
                    function t(e, t, o, i, l, c, m) {
                        var u = new s(n(e, d), n(t, d), a(o), i > 0 ? i.toString() : null, n(l, f), null, a(m));
                        return c && ("string" == typeof c ? u.setRawQuery(c.replace(/[^?&=0-9A-Za-z_\-~.%]/g, r)) : u.setAllParameters(c)),
                            u
                    }
                    function a(e) {
                        return "string" == typeof e ? encodeURIComponent(e) : null
                    }
                    function n(e, t) {
                        return "string" == typeof e ? encodeURI(e).replace(t, r) : null
                    }
                    function r(e) {
                        var t = e.charCodeAt(0);
                        return "%" + "0123456789ABCDEF".charAt(t >> 4 & 15) + "0123456789ABCDEF".charAt(15 & t)
                    }
                    function o(e) {
                        return e.replace(/(^|\/)\.(?:\/|$)/g, "$1").replace(/\/{2,}/g, "/")
                    }
                    function i(e) {
                        if (null === e) return null;
                        for (var t, a = o(e), n = u; (t = a.replace(n, "$1")) != a; a = t);
                        return a
                    }
                    function l(e, t) {
                        var a = e.clone(),
                            n = t.hasScheme();
                        n ? a.setRawScheme(t.getRawScheme()) : n = t.hasCredentials(),
                            n ? a.setRawCredentials(t.getRawCredentials()) : n = t.hasDomain(),
                            n ? a.setRawDomain(t.getRawDomain()) : n = t.hasPort();
                        var r = t.getRawPath(),
                            o = i(r);
                        if (n) a.setPort(t.getPort()),
                            o = o && o.replace(h, "");
                        else if (n = !!r) {
                            if (47 !== o.charCodeAt(0)) {
                                var l = i(a.getRawPath() || "").replace(h, ""),
                                    s = l.lastIndexOf("/") + 1;
                                o = i((s ? l.substring(0, s) : "") + i(r)).replace(h, "")
                            }
                        } else(o = o && o.replace(h, "")) !== r && a.setRawPath(o);
                        return n ? a.setRawPath(o) : n = t.hasQuery(),
                            n ? a.setRawQuery(t.getRawQuery()) : n = t.hasFragment(),
                        n && a.setRawFragment(t.getRawFragment()),
                            a
                    }
                    function s(e, t, a, n, r, o, i) {
                        this.scheme_ = e,
                            this.credentials_ = t,
                            this.domain_ = a,
                            this.port_ = n,
                            this.path_ = r,
                            this.query_ = o,
                            this.fragment_ = i,
                            this.paramCache_ = null
                    }
                    function c(e) {
                        return "string" == typeof e && e.length > 0 ? e: null
                    }
                    var m = new RegExp("(/|^)(?:[^./][^/]*|\\.{2,}(?:[^./][^/]*)|\\.{3,}[^/]*)/\\.\\.(?:/|$)"),
                        u = new RegExp(m),
                        h = /^(?:\.\.\/)*(?:\.\.$)?/;
                    s.prototype.toString = function() {
                        var e = [];
                        return null !== this.scheme_ && e.push(this.scheme_, ":"),
                        null !== this.domain_ && (e.push("//"), null !== this.credentials_ && e.push(this.credentials_, "@"), e.push(this.domain_), null !== this.port_ && e.push(":", this.port_.toString())),
                        null !== this.path_ && e.push(this.path_),
                        null !== this.query_ && e.push("?", this.query_),
                        null !== this.fragment_ && e.push("#", this.fragment_),
                            e.join("")
                    },
                        s.prototype.clone = function() {
                            return new s(this.scheme_, this.credentials_, this.domain_, this.port_, this.path_, this.query_, this.fragment_)
                        },
                        s.prototype.getScheme = function() {
                            return this.scheme_ && decodeURIComponent(this.scheme_).toLowerCase()
                        },
                        s.prototype.getRawScheme = function() {
                            return this.scheme_
                        },
                        s.prototype.setScheme = function(e) {
                            return this.scheme_ = n(e, d),
                                this
                        },
                        s.prototype.setRawScheme = function(e) {
                            return this.scheme_ = e || null,
                                this
                        },
                        s.prototype.hasScheme = function() {
                            return null !== this.scheme_
                        },
                        s.prototype.getCredentials = function() {
                            return this.credentials_ && decodeURIComponent(this.credentials_)
                        },
                        s.prototype.getRawCredentials = function() {
                            return this.credentials_
                        },
                        s.prototype.setCredentials = function(e) {
                            return this.credentials_ = n(e, d),
                                this
                        },
                        s.prototype.setRawCredentials = function(e) {
                            return this.credentials_ = e || null,
                                this
                        },
                        s.prototype.hasCredentials = function() {
                            return null !== this.credentials_
                        },
                        s.prototype.getDomain = function() {
                            return this.domain_ && decodeURIComponent(this.domain_)
                        },
                        s.prototype.getRawDomain = function() {
                            return this.domain_
                        },
                        s.prototype.setDomain = function(e) {
                            return this.setRawDomain(e && encodeURIComponent(e))
                        },
                        s.prototype.setRawDomain = function(e) {
                            return this.domain_ = e || null,
                                this.setRawPath(this.path_)
                        },
                        s.prototype.hasDomain = function() {
                            return null !== this.domain_
                        },
                        s.prototype.getPort = function() {
                            return this.port_ && decodeURIComponent(this.port_)
                        },
                        s.prototype.setPort = function(e) {
                            if (e) {
                                if ((e = Number(e)) !== (65535 & e)) throw new Error("Bad port number " + e);
                                this.port_ = "" + e
                            } else this.port_ = null;
                            return this
                        },
                        s.prototype.hasPort = function() {
                            return null !== this.port_
                        },
                        s.prototype.getPath = function() {
                            return this.path_ && decodeURIComponent(this.path_)
                        },
                        s.prototype.getRawPath = function() {
                            return this.path_
                        },
                        s.prototype.setPath = function(e) {
                            return this.setRawPath(n(e, f))
                        },
                        s.prototype.setRawPath = function(e) {
                            return e ? (e = String(e), this.path_ = !this.domain_ || /^\//.test(e) ? e: "/" + e) : this.path_ = null,
                                this
                        },
                        s.prototype.hasPath = function() {
                            return null !== this.path_
                        },
                        s.prototype.getQuery = function() {
                            return this.query_ && decodeURIComponent(this.query_).replace(/\+/g, " ")
                        },
                        s.prototype.getRawQuery = function() {
                            return this.query_
                        },
                        s.prototype.setQuery = function(e) {
                            return this.paramCache_ = null,
                                this.query_ = a(e),
                                this
                        },
                        s.prototype.setRawQuery = function(e) {
                            return this.paramCache_ = null,
                                this.query_ = e || null,
                                this
                        },
                        s.prototype.hasQuery = function() {
                            return null !== this.query_
                        },
                        s.prototype.setAllParameters = function(e) {
                            if ("object" == typeof e && !(e instanceof Array) && (e instanceof Object || "[object Array]" !== Object.prototype.toString.call(e))) {
                                var t = [],
                                    a = -1;
                                for (var n in e) {
                                    var r = e[n];
                                    "string" == typeof r && (t[++a] = n, t[++a] = r)
                                }
                                e = t
                            }
                            this.paramCache_ = null;
                            for (var o = [], i = "", l = 0; l < e.length;) {
                                var n = e[l++],
                                    r = e[l++];
                                o.push(i, encodeURIComponent(n.toString())),
                                    i = "&",
                                r && o.push("=", encodeURIComponent(r.toString()))
                            }
                            return this.query_ = o.join(""),
                                this
                        },
                        s.prototype.checkParameterCache_ = function() {
                            if (!this.paramCache_) {
                                var e = this.query_;
                                if (e) {
                                    for (var t = e.split(/[&\?]/), a = [], n = -1, r = 0; r < t.length; ++r) {
                                        var o = t[r].match(/^([^=]*)(?:=(.*))?$/);
                                        a[++n] = decodeURIComponent(o[1]).replace(/\+/g, " "),
                                            a[++n] = decodeURIComponent(o[2] || "").replace(/\+/g, " ")
                                    }
                                    this.paramCache_ = a
                                } else this.paramCache_ = []
                            }
                        },
                        s.prototype.setParameterValues = function(e, t) {
                            "string" == typeof t && (t = [t]),
                                this.checkParameterCache_();
                            for (var a = 0,
                                     n = this.paramCache_,
                                     r = [], o = 0; o < n.length; o += 2) e === n[o] ? a < t.length && r.push(e, t[a++]) : r.push(n[o], n[o + 1]);
                            for (; a < t.length;) r.push(e, t[a++]);
                            return this.setAllParameters(r),
                                this
                        },
                        s.prototype.removeParameter = function(e) {
                            return this.setParameterValues(e, [])
                        },
                        s.prototype.getAllParameters = function() {
                            return this.checkParameterCache_(),
                                this.paramCache_.slice(0, this.paramCache_.length)
                        },
                        s.prototype.getParameterValues = function(e) {
                            this.checkParameterCache_();
                            for (var t = [], a = 0; a < this.paramCache_.length; a += 2) e === this.paramCache_[a] && t.push(this.paramCache_[a + 1]);
                            return t
                        },
                        s.prototype.getParameterMap = function(e) {
                            this.checkParameterCache_();
                            for (var t = {},
                                     a = 0; a < this.paramCache_.length; a += 2) {
                                var n = this.paramCache_[a++],
                                    r = this.paramCache_[a++];
                                n in t ? t[n].push(r) : t[n] = [r]
                            }
                            return t
                        },
                        s.prototype.getParameterValue = function(e) {
                            this.checkParameterCache_();
                            for (var t = 0; t < this.paramCache_.length; t += 2) if (e === this.paramCache_[t]) return this.paramCache_[t + 1];
                            return null
                        },
                        s.prototype.getFragment = function() {
                            return this.fragment_ && decodeURIComponent(this.fragment_)
                        },
                        s.prototype.getRawFragment = function() {
                            return this.fragment_
                        },
                        s.prototype.setFragment = function(e) {
                            return this.fragment_ = e ? encodeURIComponent(e) : null,
                                this
                        },
                        s.prototype.setRawFragment = function(e) {
                            return this.fragment_ = e || null,
                                this
                        },
                        s.prototype.hasFragment = function() {
                            return null !== this.fragment_
                        };
                    var p = new RegExp("^(?:([^:/?#]+):)?(?://(?:([^/?#]*)@)?([^/?#:@]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),
                        d = /[#\/\?@]/g,
                        f = /[\#\?]/g;
                    return s.parse = e,
                        s.create = t,
                        s.resolve = l,
                        s.collapse_dots = i,
                        s.utils = {
                            mimeTypeOf: function(t) {
                                return /\.html$/.test(e(t).getPath()) ? "text/html": "application/javascript"
                            },
                            resolve: function(t, a) {
                                return t ? l(e(t), e(a)).toString() : "" + a
                            }
                        },
                        s
                } (),
                html4 = {};
            if (html4.atype = {
                    NONE: 0,
                    URI: 1,
                    URI_FRAGMENT: 11,
                    SCRIPT: 2,
                    STYLE: 3,
                    HTML: 12,
                    ID: 4,
                    IDREF: 5,
                    IDREFS: 6,
                    GLOBAL_NAME: 7,
                    LOCAL_NAME: 8,
                    CLASSES: 9,
                    FRAME_TARGET: 10,
                    MEDIA_QUERY: 13
                },
                    html4.atype = html4.atype, html4.ATTRIBS = {
                    "*::class": 9,
                    "*::dir": 0,
                    "*::draggable": 0,
                    "*::hidden": 0,
                    "*::id": 4,
                    "*::inert": 0,
                    "*::itemprop": 0,
                    "*::itemref": 6,
                    "*::itemscope": 0,
                    "*::lang": 0,
                    "*::onblur": 2,
                    "*::onchange": 2,
                    "*::onclick": 2,
                    "*::ondblclick": 2,
                    "*::onfocus": 2,
                    "*::onkeydown": 2,
                    "*::onkeypress": 2,
                    "*::onkeyup": 2,
                    "*::onload": 2,
                    "*::onmousedown": 2,
                    "*::onmousemove": 2,
                    "*::onmouseout": 2,
                    "*::onmouseover": 2,
                    "*::onmouseup": 2,
                    "*::onreset": 2,
                    "*::onscroll": 2,
                    "*::onselect": 2,
                    "*::onsubmit": 2,
                    "*::onunload": 2,
                    "*::spellcheck": 0,
                    "*::style": 3,
                    "*::title": 0,
                    "*::translate": 0,
                    "a::accesskey": 0,
                    "a::coords": 0,
                    "a::href": 1,
                    "a::hreflang": 0,
                    "a::name": 7,
                    "a::onblur": 2,
                    "a::onfocus": 2,
                    "a::shape": 0,
                    "a::tabindex": 0,
                    "a::target": 10,
                    "a::type": 0,
                    "area::accesskey": 0,
                    "area::alt": 0,
                    "area::coords": 0,
                    "area::href": 1,
                    "area::nohref": 0,
                    "area::onblur": 2,
                    "area::onfocus": 2,
                    "area::shape": 0,
                    "area::tabindex": 0,
                    "area::target": 10,
                    "audio::controls": 0,
                    "audio::loop": 0,
                    "audio::mediagroup": 5,
                    "audio::muted": 0,
                    "audio::preload": 0,
                    "bdo::dir": 0,
                    "blockquote::cite": 1,
                    "br::clear": 0,
                    "button::accesskey": 0,
                    "button::disabled": 0,
                    "button::name": 8,
                    "button::onblur": 2,
                    "button::onfocus": 2,
                    "button::tabindex": 0,
                    "button::type": 0,
                    "button::value": 0,
                    "canvas::height": 0,
                    "canvas::width": 0,
                    "caption::align": 0,
                    "col::align": 0,
                    "col::char": 0,
                    "col::charoff": 0,
                    "col::span": 0,
                    "col::valign": 0,
                    "col::width": 0,
                    "colgroup::align": 0,
                    "colgroup::char": 0,
                    "colgroup::charoff": 0,
                    "colgroup::span": 0,
                    "colgroup::valign": 0,
                    "colgroup::width": 0,
                    "command::checked": 0,
                    "command::command": 5,
                    "command::disabled": 0,
                    "command::icon": 1,
                    "command::label": 0,
                    "command::radiogroup": 0,
                    "command::type": 0,
                    "data::value": 0,
                    "del::cite": 1,
                    "del::datetime": 0,
                    "details::open": 0,
                    "dir::compact": 0,
                    "div::align": 0,
                    "dl::compact": 0,
                    "fieldset::disabled": 0,
                    "font::color": 0,
                    "font::face": 0,
                    "font::size": 0,
                    "form::accept": 0,
                    "form::action": 1,
                    "form::autocomplete": 0,
                    "form::enctype": 0,
                    "form::method": 0,
                    "form::name": 7,
                    "form::novalidate": 0,
                    "form::onreset": 2,
                    "form::onsubmit": 2,
                    "form::target": 10,
                    "h1::align": 0,
                    "h2::align": 0,
                    "h3::align": 0,
                    "h4::align": 0,
                    "h5::align": 0,
                    "h6::align": 0,
                    "hr::align": 0,
                    "hr::noshade": 0,
                    "hr::size": 0,
                    "hr::width": 0,
                    "iframe::align": 0,
                    "iframe::frameborder": 0,
                    "iframe::height": 0,
                    "iframe::marginheight": 0,
                    "iframe::marginwidth": 0,
                    "iframe::width": 0,
                    "img::align": 0,
                    "img::alt": 0,
                    "img::border": 0,
                    "img::height": 0,
                    "img::hspace": 0,
                    "img::ismap": 0,
                    "img::name": 7,
                    "img::src": 1,
                    "img::usemap": 11,
                    "img::vspace": 0,
                    "img::width": 0,
                    "input::accept": 0,
                    "input::accesskey": 0,
                    "input::align": 0,
                    "input::alt": 0,
                    "input::autocomplete": 0,
                    "input::checked": 0,
                    "input::disabled": 0,
                    "input::inputmode": 0,
                    "input::ismap": 0,
                    "input::list": 5,
                    "input::max": 0,
                    "input::maxlength": 0,
                    "input::min": 0,
                    "input::multiple": 0,
                    "input::name": 8,
                    "input::onblur": 2,
                    "input::onchange": 2,
                    "input::onfocus": 2,
                    "input::onselect": 2,
                    "input::placeholder": 0,
                    "input::readonly": 0,
                    "input::required": 0,
                    "input::size": 0,
                    "input::src": 1,
                    "input::step": 0,
                    "input::tabindex": 0,
                    "input::type": 0,
                    "input::usemap": 11,
                    "input::value": 0,
                    "ins::cite": 1,
                    "ins::datetime": 0,
                    "label::accesskey": 0,
                    "label::for": 5,
                    "label::onblur": 2,
                    "label::onfocus": 2,
                    "legend::accesskey": 0,
                    "legend::align": 0,
                    "li::type": 0,
                    "li::value": 0,
                    "map::name": 7,
                    "menu::compact": 0,
                    "menu::label": 0,
                    "menu::type": 0,
                    "meter::high": 0,
                    "meter::low": 0,
                    "meter::max": 0,
                    "meter::min": 0,
                    "meter::value": 0,
                    "ol::compact": 0,
                    "ol::reversed": 0,
                    "ol::start": 0,
                    "ol::type": 0,
                    "optgroup::disabled": 0,
                    "optgroup::label": 0,
                    "option::disabled": 0,
                    "option::label": 0,
                    "option::selected": 0,
                    "option::value": 0,
                    "output::for": 6,
                    "output::name": 8,
                    "p::align": 0,
                    "pre::width": 0,
                    "progress::max": 0,
                    "progress::min": 0,
                    "progress::value": 0,
                    "q::cite": 1,
                    "select::autocomplete": 0,
                    "select::disabled": 0,
                    "select::multiple": 0,
                    "select::name": 8,
                    "select::onblur": 2,
                    "select::onchange": 2,
                    "select::onfocus": 2,
                    "select::required": 0,
                    "select::size": 0,
                    "select::tabindex": 0,
                    "source::type": 0,
                    "table::align": 0,
                    "table::bgcolor": 0,
                    "table::border": 0,
                    "table::cellpadding": 0,
                    "table::cellspacing": 0,
                    "table::frame": 0,
                    "table::rules": 0,
                    "table::summary": 0,
                    "table::width": 0,
                    "tbody::align": 0,
                    "tbody::char": 0,
                    "tbody::charoff": 0,
                    "tbody::valign": 0,
                    "td::abbr": 0,
                    "td::align": 0,
                    "td::axis": 0,
                    "td::bgcolor": 0,
                    "td::char": 0,
                    "td::charoff": 0,
                    "td::colspan": 0,
                    "td::headers": 6,
                    "td::height": 0,
                    "td::nowrap": 0,
                    "td::rowspan": 0,
                    "td::scope": 0,
                    "td::valign": 0,
                    "td::width": 0,
                    "textarea::accesskey": 0,
                    "textarea::autocomplete": 0,
                    "textarea::cols": 0,
                    "textarea::disabled": 0,
                    "textarea::inputmode": 0,
                    "textarea::name": 8,
                    "textarea::onblur": 2,
                    "textarea::onchange": 2,
                    "textarea::onfocus": 2,
                    "textarea::onselect": 2,
                    "textarea::placeholder": 0,
                    "textarea::readonly": 0,
                    "textarea::required": 0,
                    "textarea::rows": 0,
                    "textarea::tabindex": 0,
                    "textarea::wrap": 0,
                    "tfoot::align": 0,
                    "tfoot::char": 0,
                    "tfoot::charoff": 0,
                    "tfoot::valign": 0,
                    "th::abbr": 0,
                    "th::align": 0,
                    "th::axis": 0,
                    "th::bgcolor": 0,
                    "th::char": 0,
                    "th::charoff": 0,
                    "th::colspan": 0,
                    "th::headers": 6,
                    "th::height": 0,
                    "th::nowrap": 0,
                    "th::rowspan": 0,
                    "th::scope": 0,
                    "th::valign": 0,
                    "th::width": 0,
                    "thead::align": 0,
                    "thead::char": 0,
                    "thead::charoff": 0,
                    "thead::valign": 0,
                    "tr::align": 0,
                    "tr::bgcolor": 0,
                    "tr::char": 0,
                    "tr::charoff": 0,
                    "tr::valign": 0,
                    "track::default": 0,
                    "track::kind": 0,
                    "track::label": 0,
                    "track::srclang": 0,
                    "ul::compact": 0,
                    "ul::type": 0,
                    "video::controls": 0,
                    "video::height": 0,
                    "video::loop": 0,
                    "video::mediagroup": 5,
                    "video::muted": 0,
                    "video::poster": 1,
                    "video::preload": 0,
                    "video::width": 0
                },
                    html4.ATTRIBS = html4.ATTRIBS, html4.eflags = {
                    OPTIONAL_ENDTAG: 1,
                    EMPTY: 2,
                    CDATA: 4,
                    RCDATA: 8,
                    UNSAFE: 16,
                    FOLDABLE: 32,
                    SCRIPT: 64,
                    STYLE: 128,
                    VIRTUALIZED: 256
                },
                    html4.eflags = html4.eflags, html4.ELEMENTS = {
                    a: 0,
                    abbr: 0,
                    acronym: 0,
                    address: 0,
                    applet: 272,
                    area: 2,
                    article: 0,
                    aside: 0,
                    audio: 0,
                    b: 0,
                    base: 274,
                    basefont: 274,
                    bdi: 0,
                    bdo: 0,
                    big: 0,
                    blockquote: 0,
                    body: 305,
                    br: 2,
                    button: 0,
                    canvas: 0,
                    caption: 0,
                    center: 0,
                    cite: 0,
                    code: 0,
                    col: 2,
                    colgroup: 1,
                    command: 2,
                    data: 0,
                    datalist: 0,
                    dd: 1,
                    del: 0,
                    details: 0,
                    dfn: 0,
                    dialog: 272,
                    dir: 0,
                    div: 0,
                    dl: 0,
                    dt: 1,
                    em: 0,
                    fieldset: 0,
                    figcaption: 0,
                    figure: 0,
                    font: 0,
                    footer: 0,
                    form: 0,
                    frame: 274,
                    frameset: 272,
                    h1: 0,
                    h2: 0,
                    h3: 0,
                    h4: 0,
                    h5: 0,
                    h6: 0,
                    head: 305,
                    header: 0,
                    hgroup: 0,
                    hr: 2,
                    html: 305,
                    i: 0,
                    iframe: 16,
                    img: 2,
                    input: 2,
                    ins: 0,
                    isindex: 274,
                    kbd: 0,
                    keygen: 274,
                    label: 0,
                    legend: 0,
                    li: 1,
                    link: 274,
                    map: 0,
                    mark: 0,
                    menu: 0,
                    meta: 274,
                    meter: 0,
                    nav: 0,
                    nobr: 0,
                    noembed: 276,
                    noframes: 276,
                    noscript: 276,
                    object: 272,
                    ol: 0,
                    optgroup: 0,
                    option: 1,
                    output: 0,
                    p: 1,
                    param: 274,
                    pre: 0,
                    progress: 0,
                    q: 0,
                    s: 0,
                    samp: 0,
                    script: 84,
                    section: 0,
                    select: 0,
                    small: 0,
                    source: 2,
                    span: 0,
                    strike: 0,
                    strong: 0,
                    style: 148,
                    sub: 0,
                    summary: 0,
                    sup: 0,
                    table: 0,
                    tbody: 1,
                    td: 1,
                    textarea: 8,
                    tfoot: 1,
                    th: 1,
                    thead: 1,
                    time: 0,
                    title: 280,
                    tr: 1,
                    track: 2,
                    tt: 0,
                    u: 0,
                    ul: 0,
                    var: 0,
                    video: 0,
                    wbr: 2
                },
                    html4.ELEMENTS = html4.ELEMENTS, html4.ELEMENT_DOM_INTERFACES = {
                    a: "HTMLAnchorElement",
                    abbr: "HTMLElement",
                    acronym: "HTMLElement",
                    address: "HTMLElement",
                    applet: "HTMLAppletElement",
                    area: "HTMLAreaElement",
                    article: "HTMLElement",
                    aside: "HTMLElement",
                    audio: "HTMLAudioElement",
                    b: "HTMLElement",
                    base: "HTMLBaseElement",
                    basefont: "HTMLBaseFontElement",
                    bdi: "HTMLElement",
                    bdo: "HTMLElement",
                    big: "HTMLElement",
                    blockquote: "HTMLQuoteElement",
                    body: "HTMLBodyElement",
                    br: "HTMLBRElement",
                    button: "HTMLButtonElement",
                    canvas: "HTMLCanvasElement",
                    caption: "HTMLTableCaptionElement",
                    center: "HTMLElement",
                    cite: "HTMLElement",
                    code: "HTMLElement",
                    col: "HTMLTableColElement",
                    colgroup: "HTMLTableColElement",
                    command: "HTMLCommandElement",
                    data: "HTMLElement",
                    datalist: "HTMLDataListElement",
                    dd: "HTMLElement",
                    del: "HTMLModElement",
                    details: "HTMLDetailsElement",
                    dfn: "HTMLElement",
                    dialog: "HTMLDialogElement",
                    dir: "HTMLDirectoryElement",
                    div: "HTMLDivElement",
                    dl: "HTMLDListElement",
                    dt: "HTMLElement",
                    em: "HTMLElement",
                    fieldset: "HTMLFieldSetElement",
                    figcaption: "HTMLElement",
                    figure: "HTMLElement",
                    font: "HTMLFontElement",
                    footer: "HTMLElement",
                    form: "HTMLFormElement",
                    frame: "HTMLFrameElement",
                    frameset: "HTMLFrameSetElement",
                    h1: "HTMLHeadingElement",
                    h2: "HTMLHeadingElement",
                    h3: "HTMLHeadingElement",
                    h4: "HTMLHeadingElement",
                    h5: "HTMLHeadingElement",
                    h6: "HTMLHeadingElement",
                    head: "HTMLHeadElement",
                    header: "HTMLElement",
                    hgroup: "HTMLElement",
                    hr: "HTMLHRElement",
                    html: "HTMLHtmlElement",
                    i: "HTMLElement",
                    iframe: "HTMLIFrameElement",
                    img: "HTMLImageElement",
                    input: "HTMLInputElement",
                    ins: "HTMLModElement",
                    isindex: "HTMLUnknownElement",
                    kbd: "HTMLElement",
                    keygen: "HTMLKeygenElement",
                    label: "HTMLLabelElement",
                    legend: "HTMLLegendElement",
                    li: "HTMLLIElement",
                    link: "HTMLLinkElement",
                    map: "HTMLMapElement",
                    mark: "HTMLElement",
                    menu: "HTMLMenuElement",
                    meta: "HTMLMetaElement",
                    meter: "HTMLMeterElement",
                    nav: "HTMLElement",
                    nobr: "HTMLElement",
                    noembed: "HTMLElement",
                    noframes: "HTMLElement",
                    noscript: "HTMLElement",
                    object: "HTMLObjectElement",
                    ol: "HTMLOListElement",
                    optgroup: "HTMLOptGroupElement",
                    option: "HTMLOptionElement",
                    output: "HTMLOutputElement",
                    p: "HTMLParagraphElement",
                    param: "HTMLParamElement",
                    pre: "HTMLPreElement",
                    progress: "HTMLProgressElement",
                    q: "HTMLQuoteElement",
                    s: "HTMLElement",
                    samp: "HTMLElement",
                    script: "HTMLScriptElement",
                    section: "HTMLElement",
                    select: "HTMLSelectElement",
                    small: "HTMLElement",
                    source: "HTMLSourceElement",
                    span: "HTMLSpanElement",
                    strike: "HTMLElement",
                    strong: "HTMLElement",
                    style: "HTMLStyleElement",
                    sub: "HTMLElement",
                    summary: "HTMLElement",
                    sup: "HTMLElement",
                    table: "HTMLTableElement",
                    tbody: "HTMLTableSectionElement",
                    td: "HTMLTableDataCellElement",
                    textarea: "HTMLTextAreaElement",
                    tfoot: "HTMLTableSectionElement",
                    th: "HTMLTableHeaderCellElement",
                    thead: "HTMLTableSectionElement",
                    time: "HTMLTimeElement",
                    title: "HTMLTitleElement",
                    tr: "HTMLTableRowElement",
                    track: "HTMLTrackElement",
                    tt: "HTMLElement",
                    u: "HTMLElement",
                    ul: "HTMLUListElement",
                    var: "HTMLElement",
                    video: "HTMLVideoElement",
                    wbr: "HTMLElement"
                },
                    html4.ELEMENT_DOM_INTERFACES = html4.ELEMENT_DOM_INTERFACES, html4.ueffects = {
                    NOT_LOADED: 0,
                    SAME_DOCUMENT: 1,
                    NEW_DOCUMENT: 2
                },
                    html4.ueffects = html4.ueffects, html4.URIEFFECTS = {
                    "a::href": 2,
                    "area::href": 2,
                    "blockquote::cite": 0,
                    "command::icon": 1,
                    "del::cite": 0,
                    "form::action": 2,
                    "img::src": 1,
                    "input::src": 1,
                    "ins::cite": 0,
                    "q::cite": 0,
                    "video::poster": 1
                },
                    html4.URIEFFECTS = html4.URIEFFECTS, html4.ltypes = {
                    UNSANDBOXED: 2,
                    SANDBOXED: 1,
                    DATA: 0
                },
                    html4.ltypes = html4.ltypes, html4.LOADERTYPES = {
                    "a::href": 2,
                    "area::href": 2,
                    "blockquote::cite": 2,
                    "command::icon": 1,
                    "del::cite": 2,
                    "form::action": 2,
                    "img::src": 1,
                    "input::src": 1,
                    "ins::cite": 2,
                    "q::cite": 2,
                    "video::poster": 1
                },
                    html4.LOADERTYPES = html4.LOADERTYPES, "i" !== "I".toLowerCase()) throw "I/i problem";
            var html = function(e) {
                    function t(e) {
                        if (S.hasOwnProperty(e)) return S[e];
                        var t = e.match(P);
                        if (t) return String.fromCharCode(parseInt(t[1], 10));
                        if (t = e.match(D)) return String.fromCharCode(parseInt(t[1], 16));
                        if (I && k.test(e)) {
                            I.innerHTML = "&" + e + ";";
                            var a = I.textContent;
                            return S[e] = a,
                                a
                        }
                        return "&" + e + ";"
                    }
                    function a(e, a) {
                        return t(a)
                    }
                    function n(e) {
                        return e.replace(x, "")
                    }
                    function r(e) {
                        return e.replace(N, a)
                    }
                    function o(e) {
                        return ("" + e).replace(F, "&amp;").replace(B, "&lt;").replace(q, "&gt;").replace(z, "&#34;")
                    }
                    function i(e) {
                        return e.replace(U, "&amp;$1").replace(B, "&lt;").replace(q, "&gt;")
                    }
                    function l(e) {
                        var t = {
                            cdata: e.cdata || e.cdata,
                            comment: e.comment || e.comment,
                            endDoc: e.endDoc || e.endDoc,
                            endTag: e.endTag || e.endTag,
                            pcdata: e.pcdata || e.pcdata,
                            rcdata: e.rcdata || e.rcdata,
                            startDoc: e.startDoc || e.startDoc,
                            startTag: e.startTag || e.startTag
                        };
                        return function(e, a) {
                            return s(e, t, a)
                        }
                    }
                    function s(e, t, a) {
                        m(t, u(e), 0, {
                                noMoreGT: !1,
                                noMoreEndComments: !1
                            },
                            a)
                    }
                    function c(e, t, a, n, r) {
                        return function() {
                            m(e, t, a, n, r)
                        }
                    }
                    function m(t, a, n, r, o) {
                        try {
                            t.startDoc && 0 == n && t.startDoc(o);
                            for (var i, l, s, m = n,
                                     u = a.length; m < u;) {
                                var f = a[m++],
                                    g = a[m];
                                switch (f) {
                                    case "&":
                                        O.test(g) ? (t.pcdata && t.pcdata("&" + g, o, Y, c(t, a, m, r, o)), m++) : t.pcdata && t.pcdata("&amp;", o, Y, c(t, a, m, r, o));
                                        break;
                                    case "</":
                                        (i = /^([-\w:]+)[^\'\"]*/.exec(g)) ? i[0].length === g.length && ">" === a[m + 1] ? (m += 2, s = i[1].toLowerCase(), t.endTag && t.endTag(s, o, Y, c(t, a, m, r, o))) : m = h(a, m, t, o, Y, r) : t.pcdata && t.pcdata("&lt;/", o, Y, c(t, a, m, r, o));
                                        break;
                                    case "<":
                                        if (i = /^([-\w:]+)\s*\/?/.exec(g)) if (i[0].length === g.length && ">" === a[m + 1]) {
                                            m += 2,
                                                s = i[1].toLowerCase(),
                                            t.startTag && t.startTag(s, [], o, Y, c(t, a, m, r, o));
                                            var E = e.ELEMENTS[s];
                                            if (E & j) {
                                                var T = {
                                                    name: s,
                                                    next: m,
                                                    eflags: E
                                                };
                                                m = d(a, T, t, o, Y, r)
                                            }
                                        } else m = p(a, m, t, o, Y, r);
                                        else t.pcdata && t.pcdata("&lt;", o, Y, c(t, a, m, r, o));
                                        break;
                                    case "\x3c!--":
                                        if (!r.noMoreEndComments) {
                                            for (l = m + 1; l < u && (">" !== a[l] || !/--$/.test(a[l - 1])); l++);
                                            if (l < u) {
                                                if (t.comment) {
                                                    var L = a.slice(m, l).join("");
                                                    t.comment(L.substr(0, L.length - 2), o, Y, c(t, a, l + 1, r, o))
                                                }
                                                m = l + 1
                                            } else r.noMoreEndComments = !0
                                        }
                                        r.noMoreEndComments && t.pcdata && t.pcdata("&lt;!--", o, Y, c(t, a, m, r, o));
                                        break;
                                    case "<!":
                                        if (/^\w/.test(g)) {
                                            if (!r.noMoreGT) {
                                                for (l = m + 1; l < u && ">" !== a[l]; l++);
                                                l < u ? m = l + 1 : r.noMoreGT = !0
                                            }
                                            r.noMoreGT && t.pcdata && t.pcdata("&lt;!", o, Y, c(t, a, m, r, o))
                                        } else t.pcdata && t.pcdata("&lt;!", o, Y, c(t, a, m, r, o));
                                        break;
                                    case "<?":
                                        if (!r.noMoreGT) {
                                            for (l = m + 1; l < u && ">" !== a[l]; l++);
                                            l < u ? m = l + 1 : r.noMoreGT = !0
                                        }
                                        r.noMoreGT && t.pcdata && t.pcdata("&lt;?", o, Y, c(t, a, m, r, o));
                                        break;
                                    case ">":
                                        t.pcdata && t.pcdata("&gt;", o, Y, c(t, a, m, r, o));
                                        break;
                                    case "":
                                        break;
                                    default:
                                        t.pcdata && t.pcdata(f, o, Y, c(t, a, m, r, o))
                                }
                            }
                            t.endDoc && t.endDoc(o)
                        } catch(e) {
                            if (e !== Y) throw e
                        }
                    }
                    function u(e) {
                        var t = /(<\/|<\!--|<[!?]|[&<>])/g;
                        if (e += "", $) return e.split(t);
                        for (var a, n = [], r = 0; null !== (a = t.exec(e));) n.push(e.substring(r, a.index)),
                            n.push(a[0]),
                            r = a.index + a[0].length;
                        return n.push(e.substring(r)),
                            n
                    }
                    function h(e, t, a, n, r, o) {
                        var i = f(e, t);
                        return i ? (a.endTag && a.endTag(i.name, n, r, c(a, e, t, o, n)), i.next) : e.length
                    }
                    function p(e, t, a, n, r, o) {
                        var i = f(e, t);
                        return i ? (a.startTag && a.startTag(i.name, i.attrs, n, r, c(a, e, i.next, o, n)), i.eflags & j ? d(e, i, a, n, r, o) : i.next) : e.length
                    }
                    function d(t, a, n, r, o, l) {
                        var s = t.length;
                        Q.hasOwnProperty(a.name) || (Q[a.name] = new RegExp("^" + a.name + "(?:[\\s\\/]|$)", "i"));
                        for (var m = Q[a.name], u = a.next, h = a.next + 1; h < s && ("</" !== t[h - 1] || !m.test(t[h])); h++);
                        h < s && (h -= 1);
                        var p = t.slice(u, h).join("");
                        if (a.eflags & e.eflags.CDATA) n.cdata && n.cdata(p, r, o, c(n, t, h, l, r));
                        else {
                            if (! (a.eflags & e.eflags.RCDATA)) throw new Error("bug");
                            n.rcdata && n.rcdata(i(p), r, o, c(n, t, h, l, r))
                        }
                        return h
                    }
                    function f(t, a) {
                        var n = /^([-\w:]+)/.exec(t[a]),
                            r = {};
                        r.name = n[1].toLowerCase(),
                            r.eflags = e.ELEMENTS[r.name];
                        for (var o = t[a].substr(n[0].length), i = a + 1, l = t.length; i < l && ">" !== t[i]; i++) o += t[i];
                        if (! (l <= i)) {
                            for (var s = [];
                                 "" !== o;) if (n = G.exec(o)) {
                                if (n[4] && !n[5] || n[6] && !n[7]) {
                                    for (var c = n[4] || n[6], m = !1, u = [o, t[i++]]; i < l; i++) {
                                        if (m) {
                                            if (">" === t[i]) break
                                        } else 0 <= t[i].indexOf(c) && (m = !0);
                                        u.push(t[i])
                                    }
                                    if (l <= i) break;
                                    o = u.join("");
                                    continue
                                }
                                var h = n[1].toLowerCase(),
                                    p = n[2] ? g(n[3]) : "";
                                s.push(h, p),
                                    o = o.substr(n[0].length)
                            } else o = o.replace(/^[\s\S][^a-z\s]*/, "");
                            return r.attrs = s,
                                r.next = i + 1,
                                r
                        }
                    }
                    function g(e) {
                        var t = e.charCodeAt(0);
                        return 34 !== t && 39 !== t || (e = e.substr(1, e.length - 2)),
                            r(n(e))
                    }
                    function E(t) {
                        var a, n, r = function(e, t) {
                            n || t.push(e)
                        };
                        return l({
                            startDoc: function(e) {
                                a = [],
                                    n = !1
                            },
                            startTag: function(r, i, l) {
                                if (!n && e.ELEMENTS.hasOwnProperty(r)) {
                                    var s = e.ELEMENTS[r];
                                    if (! (s & e.eflags.FOLDABLE)) {
                                        var c = t(r, i);
                                        if (!c) return void(n = !(s & e.eflags.EMPTY));
                                        if ("object" != typeof c) throw new Error("tagPolicy did not return object (old API?)");
                                        if (! ("attribs" in c)) throw new Error("tagPolicy gave no attribs");
                                        i = c.attribs;
                                        var m, u;
                                        if ("tagName" in c ? (u = c.tagName, m = e.ELEMENTS[u]) : (u = r, m = s), s & e.eflags.OPTIONAL_ENDTAG) {
                                            var h = a[a.length - 1]; ! h || h.orig !== r || h.rep === u && r === u || l.push("</", h.rep, ">")
                                        }
                                        s & e.eflags.EMPTY || a.push({
                                            orig: r,
                                            rep: u
                                        }),
                                            l.push("<", u);
                                        for (var p = 0,
                                                 d = i.length; p < d; p += 2) {
                                            var f = i[p],
                                                g = i[p + 1];
                                            null !== g && void 0 !== g && l.push(" ", f, '="', o(g), '"')
                                        }
                                        l.push(">"),
                                        s & e.eflags.EMPTY && !(m & e.eflags.EMPTY) && l.push("</", u, ">")
                                    }
                                }
                            },
                            endTag: function(t, r) {
                                if (n) return void(n = !1);
                                if (e.ELEMENTS.hasOwnProperty(t)) {
                                    var o = e.ELEMENTS[t];
                                    if (! (o & (e.eflags.EMPTY | e.eflags.FOLDABLE))) {
                                        var i;
                                        if (o & e.eflags.OPTIONAL_ENDTAG) for (i = a.length; --i >= 0;) {
                                            var l = a[i].orig;
                                            if (l === t) break;
                                            if (! (e.ELEMENTS[l] & e.eflags.OPTIONAL_ENDTAG)) return
                                        } else for (i = a.length; --i >= 0 && a[i].orig !== t;);
                                        if (i < 0) return;
                                        for (var s = a.length; --s > i;) {
                                            var c = a[s].rep;
                                            e.ELEMENTS[c] & e.eflags.OPTIONAL_ENDTAG || r.push("</", c, ">")
                                        }
                                        i < a.length && (t = a[i].rep),
                                            a.length = i,
                                            r.push("</", t, ">")
                                    }
                                }
                            },
                            pcdata: r,
                            rcdata: r,
                            cdata: r,
                            endDoc: function(e) {
                                for (; a.length; a.length--) e.push("</", a[a.length - 1].rep, ">")
                            }
                        })
                    }
                    function T(e, t, a, n, r) {
                        if (!r) return null;
                        try {
                            var o = URI.parse("" + e);
                            if (o && (!o.hasScheme() || V.test(o.getScheme()))) {
                                var i = r(o, t, a, n);
                                return i ? i.toString() : null
                            }
                        } catch(e) {
                            return null
                        }
                        return null
                    }
                    function L(e, t, a, n, r) {
                        if (a || e(t + " removed", {
                                change: "removed",
                                tagName: t
                            }), n !== r) {
                            var o = "changed";
                            n && !r ? o = "removed": !n && r && (o = "added"),
                                e(t + "." + a + " " + o, {
                                    change: o,
                                    tagName: t,
                                    attribName: a,
                                    oldValue: n,
                                    newValue: r
                                })
                        }
                    }
                    function M(e, t, a) {
                        var n;
                        return n = t + "::" + a,
                            e.hasOwnProperty(n) ? e[n] : (n = "*::" + a, e.hasOwnProperty(n) ? e[n] : void 0)
                    }
                    function b(t, a) {
                        return M(e.LOADERTYPES, t, a)
                    }
                    function y(t, a) {
                        return M(e.URIEFFECTS, t, a)
                    }
                    function v(t, a, n, r, o) {
                        for (var i = 0; i < a.length; i += 2) {
                            var l, s = a[i],
                                c = a[i + 1],
                                m = c,
                                u = null;
                            if (l = t + "::" + s, (e.ATTRIBS.hasOwnProperty(l) || (l = "*::" + s, e.ATTRIBS.hasOwnProperty(l))) && (u = e.ATTRIBS[l]), null !== u) switch (u) {
                                case e.atype.NONE:
                                    break;
                                case e.atype.SCRIPT:
                                    c = null,
                                    o && L(o, t, s, m, c);
                                    break;
                                case e.atype.STYLE:
                                    if (void 0 === A) {
                                        c = null,
                                        o && L(o, t, s, m, c);
                                        break
                                    }
                                    var h = [];
                                    A(c, {
                                        declaration: function(t, a) {
                                            var r = t.toLowerCase(),
                                                o = C[r];
                                            o && (R(r, o, a, n ?
                                                function(t) {
                                                    return T(t, e.ueffects.SAME_DOCUMENT, e.ltypes.SANDBOXED, {
                                                            TYPE: "CSS",
                                                            CSS_PROP: r
                                                        },
                                                        n)
                                                }: null), h.push(t + ": " + a.join(" ")))
                                        }
                                    }),
                                        c = h.length > 0 ? h.join(" ; ") : null,
                                    o && L(o, t, s, m, c);
                                    break;
                                case e.atype.ID:
                                case e.atype.IDREF:
                                case e.atype.IDREFS:
                                case e.atype.GLOBAL_NAME:
                                case e.atype.LOCAL_NAME:
                                case e.atype.CLASSES:
                                    c = r ? r(c) : c,
                                    o && L(o, t, s, m, c);
                                    break;
                                case e.atype.URI:
                                    c = T(c, y(t, s), b(t, s), {
                                            TYPE: "MARKUP",
                                            XML_ATTR: s,
                                            XML_TAG: t
                                        },
                                        n),
                                    o && L(o, t, s, m, c);
                                    break;
                                case e.atype.URI_FRAGMENT:
                                    c && "#" === c.charAt(0) ? (c = c.substring(1), null !== (c = r ? r(c) : c) && void 0 !== c && (c = "#" + c)) : c = null,
                                    o && L(o, t, s, m, c);
                                    break;
                                default:
                                    c = null,
                                    o && L(o, t, s, m, c)
                            } else c = null,
                            o && L(o, t, s, m, c);
                            a[i + 1] = c
                        }
                        return a
                    }
                    function H(t, a, n) {
                        return function(r, o) {
                            if (! (e.ELEMENTS[r] & e.eflags.UNSAFE)) return {
                                attribs: v(r, o, t, a, n)
                            };
                            n && L(n, r, void 0, void 0, void 0)
                        }
                    }
                    function _(e, t) {
                        var a = [];
                        return E(t)(e, a),
                            a.join("")
                    }
                    function w(e, t, a, n) {
                        return _(e, H(t, a, n))
                    }
                    var A, R, C;
                    "undefined" != typeof window && (A = window.parseCssDeclarations, R = window.sanitizeCssProperty, C = window.cssSchema);
                    var S = {
                            lt: "<",
                            LT: "<",
                            gt: ">",
                            GT: ">",
                            amp: "&",
                            AMP: "&",
                            quot: '"',
                            apos: "'",
                            nbsp: " "
                        },
                        P = /^#(\d+)$/,
                        D = /^#x([0-9A-Fa-f]+)$/,
                        k = /^[A-Za-z][A-za-z0-9]+$/,
                        I = "undefined" != typeof window && window.document ? window.document.createElement("textarea") : null,
                        x = /\0/g,
                        N = /&(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/g,
                        O = /^(#[0-9]+|#[xX][0-9A-Fa-f]+|\w+);/,
                        F = /&/g,
                        U = /&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi,
                        B = /[<]/g,
                        q = />/g,
                        z = /\"/g,
                        G = new RegExp("^\\s*([-.:\\w]+)(?:\\s*(=)\\s*((\")[^\"]*(\"|$)|(')[^']*('|$)|(?=[a-z][-\\w]*\\s*=)|[^\"'\\s]*))?", "i"),
                        $ = 3 === "a,b".split(/(,)/).length,
                        j = e.eflags.CDATA | e.eflags.RCDATA,
                        Y = {},
                        Q = {},
                        V = /^(?:https?|mailto|data)$/i,
                        X = {};
                    return X.escapeAttrib = X.escapeAttrib = o,
                        X.makeHtmlSanitizer = X.makeHtmlSanitizer = E,
                        X.makeSaxParser = X.makeSaxParser = l,
                        X.makeTagPolicy = X.makeTagPolicy = H,
                        X.normalizeRCData = X.normalizeRCData = i,
                        X.sanitize = X.sanitize = w,
                        X.sanitizeAttribs = X.sanitizeAttribs = v,
                        X.sanitizeWithPolicy = X.sanitizeWithPolicy = _,
                        X.unescapeEntities = X.unescapeEntities = r,
                        X
                } (html4),
                html_sanitize = html.sanitize;
            html4.ATTRIBS["*::style"] = 0,
                html4.ELEMENTS.style = 0,
                html4.ATTRIBS["a::target"] = 0,
                html4.ELEMENTS.video = 0,
                html4.ATTRIBS["video::src"] = 0,
                html4.ATTRIBS["video::poster"] = 0,
                html4.ATTRIBS["video::controls"] = 0,
                html4.ELEMENTS.audio = 0,
                html4.ATTRIBS["audio::src"] = 0,
                html4.ATTRIBS["video::autoplay"] = 0,
                html4.ATTRIBS["video::controls"] = 0,
            "undefined" != typeof module && (module.exports = html_sanitize);
        },
            {}],
        7 : [function(require, module, exports) {
            module.exports = {
                "author": "Mapbox",
                "name": "mapbox.js",
                "description": "mapbox javascript api",
                "version": "3.1.1",
                "homepage": "http://mapbox.com/",
                "repository": {
                    "type": "git",
                    "url": "git://github.com/mapbox/mapbox.js.git"
                },
                "main": "src/index.js",
                "dependencies": {
                    "corslite": "0.0.6",
                    "isarray": "0.0.1",
                    "leaflet": "1.0.2",
                    "mustache": "2.2.1",
                    "sanitize-caja": "0.1.4"
                },
                "scripts": {
                    "test": "eslint --no-eslintrc -c .eslintrc src && phantomjs node_modules/mocha-phantomjs-core/mocha-phantomjs-core.js test/index.html"
                },
                "license": "BSD-3-Clause",
                "devDependencies": {
                    "browserify": "^13.0.0",
                    "clean-css": "~2.0.7",
                    "cz-conventional-changelog": "1.2.0",
                    "eslint": "^0.23.0",
                    "expect.js": "0.3.1",
                    "happen": "0.1.3",
                    "leaflet-fullscreen": "0.0.4",
                    "leaflet-hash": "0.2.1",
                    "marked": "~0.3.0",
                    "minifyify": "^6.1.0",
                    "minimist": "0.0.5",
                    "mocha": "2.4.5",
                    "mocha-phantomjs-core": "2.0.1",
                    "phantomjs-prebuilt": "2.1.12",
                    "sinon": "1.10.2"
                },
                "optionalDependencies": {},
                "engines": {
                    "node": "*"
                },
                "config": {
                    "commitizen": {
                        "path": "./node_modules/cz-conventional-changelog"
                    }
                }
            }
        },
            {}],
        8 : [function(require, module, exports) {
            "use strict";
            module.exports = {
                HTTP_URL: "http://a.tiles.mapbox.com/v4",
                HTTPS_URL: "https://a.tiles.mapbox.com/v4",
                FORCE_HTTPS: !1,
                REQUIRE_ACCESS_TOKEN: !0
            };
        },
            {}],
        9 : [function(require, module, exports) {
            "use strict";
            var util = require("./util"),
                format_url = require("./format_url"),
                request = require("./request"),
                marker = require("./marker"),
                simplestyle = require("./simplestyle"),
                FeatureLayer = L.FeatureGroup.extend({
                    options: {
                        filter: function() {
                            return ! 0
                        },
                        sanitizer: require("sanitize-caja"),
                        style: simplestyle.style,
                        popupOptions: {
                            closeButton: !1
                        }
                    },
                    initialize: function(e, t) {
                        L.setOptions(this, t),
                            this._layers = {},
                            "string" == typeof e ? util.idUrl(e, this) : e && "object" == typeof e && this.setGeoJSON(e)
                    },
                    setGeoJSON: function(e) {
                        return this._geojson = e,
                            this.clearLayers(),
                            this._initialize(e),
                            this
                    },
                    getGeoJSON: function() {
                        return this._geojson
                    },
                    loadURL: function(e) {
                        return this._request && "abort" in this._request && this._request.abort(),
                            this._request = request(e, L.bind(function(t, i) {
                                    this._request = null,
                                        t && "abort" !== t.type ? (util.log("could not load features at " + e), this.fire("error", {
                                            error: t
                                        })) : i && (this.setGeoJSON(i), this.fire("ready"))
                                },
                                this)),
                            this
                    },
                    loadID: function(e) {
                        return this.loadURL(format_url("/v4/" + e + "/features.json", this.options.accessToken))
                    },
                    setFilter: function(e) {
                        return this.options.filter = e,
                        this._geojson && (this.clearLayers(), this._initialize(this._geojson)),
                            this
                    },
                    getFilter: function() {
                        return this.options.filter
                    },
                    _initialize: function(e) {
                        var t, i, r = L.Util.isArray(e) ? e: e.features;
                        if (r) for (t = 0, i = r.length; t < i; t++)(r[t].geometries || r[t].geometry || r[t].features) && this._initialize(r[t]);
                        else if (this.options.filter(e)) {
                            var s = {
                                    accessToken: this.options.accessToken
                                },
                                o = this.options.pointToLayer ||
                                    function(e, t) {
                                        return marker.style(e, t, s)
                                    },
                                n = L.GeoJSON.geometryToLayer(e, {
                                    pointToLayer: o
                                }),
                                u = marker.createPopup(e, this.options.sanitizer),
                                a = this.options.style,
                                l = a === simplestyle.style; ! (a && "setStyle" in n) || l && (n instanceof L.Circle || n instanceof L.CircleMarker) || ("function" == typeof a && (a = a(e)), n.setStyle(a)),
                                n.feature = e,
                            u && n.bindPopup(u, this.options.popupOptions),
                                this.addLayer(n)
                        }
                    }
                });
            module.exports.FeatureLayer = FeatureLayer,
                module.exports.featureLayer = function(e, t) {
                    return new FeatureLayer(e, t)
                };
        },
            {
                "./format_url": 11,
                "./marker": 24,
                "./request": 25,
                "./simplestyle": 27,
                "./util": 30,
                "sanitize-caja": 5
            }],
        10 : [function(require, module, exports) {
            "use strict";
            var Feedback = L.Class.extend({
                includes: L.Mixin.Events,
                data: {},
                record: function(e) {
                    L.extend(this.data, e),
                        this.fire("change")
                }
            });
            module.exports = new Feedback;
        },
            {}],
        11 : [function(require, module, exports) {
            "use strict";
            var config = require("./config"),
                version = require("../package.json").version;
            module.exports = function(e, o) {
                if (! (o = o || L.mapbox.accessToken) && config.REQUIRE_ACCESS_TOKEN) throw new Error("An API access token is required to use Mapbox.js. See https://www.mapbox.com/mapbox.js/api/v" + version + "/api-access-tokens/");
                var t = "https:" === document.location.protocol || config.FORCE_HTTPS ? config.HTTPS_URL: config.HTTP_URL;
                if (t = t.replace(/\/v4$/, ""), t += e, config.REQUIRE_ACCESS_TOKEN) {
                    if ("s" === o[0]) throw new Error("Use a public access token (pk.*) with Mapbox.js, not a secret access token (sk.*). See https://www.mapbox.com/mapbox.js/api/v" + version + "/api-access-tokens/");
                    t += -1 !== t.indexOf("?") ? "&access_token=": "?access_token=",
                        t += o
                }
                return t
            },
                module.exports.tileJSON = function(e, o) {
                    if (0 === e.indexOf("mapbox://styles")) throw new Error("Styles created with Mapbox Studio need to be used with L.mapbox.styleLayer, not L.mapbox.tileLayer");
                    if ( - 1 !== e.indexOf("/")) return e;
                    var t = module.exports("/v4/" + e + ".json", o);
                    return 0 === t.indexOf("https") && (t += "&secure"),
                        t
                },
                module.exports.style = function(e, o) {
                    if ( - 1 === e.indexOf("mapbox://styles/")) throw new Error("Incorrectly formatted Mapbox style at " + e);
                    var t = e.split("mapbox://styles/")[1];
                    return module.exports("/styles/v1/" + t, o).replace("http://", "https://")
                };
        },
            {
                "../package.json": 7,
                "./config": 8
            }],
        12 : [function(require, module, exports) {
            "use strict";
            var isArray = require("isarray"),
                util = require("./util"),
                format_url = require("./format_url"),
                feedback = require("./feedback"),
                request = require("./request");
            module.exports = function(e, r) {
                function t(e, r) {
                    var t = Math.pow(10, r);
                    return e.lat = Math.round(e.lat * t) / t,
                        e.lng = Math.round(e.lng * t) / t,
                        e
                }
                r || (r = {});
                var n = {};
                return util.strict(e, "string"),
                -1 === e.indexOf("/") && (e = format_url("/geocoding/v5/" + e + "/{query}.json", r.accessToken, 5)),
                    n.getURL = function() {
                        return e
                    },
                    n.queryURL = function(e) {
                        var r = !(isArray(e) || "string" == typeof e),
                            o = r ? e.query: e;
                        if (isArray(o)) {
                            for (var u = [], i = 0; i < o.length; i++) u[i] = encodeURIComponent(o[i]);
                            o = u.join(";")
                        } else o = encodeURIComponent(o);
                        feedback.record({
                            geocoding: o
                        });
                        var a = L.Util.template(n.getURL(), {
                            query: o
                        });
                        if (r) {
                            if (e.types && (isArray(e.types) ? a += "&types=" + e.types.join() : a += "&types=" + e.types), e.country && (isArray(e.country) ? a += "&country=" + e.country.join() : a += "&country=" + e.country), e.bbox && (isArray(e.bbox) ? a += "&bbox=" + e.bbox.join() : a += "&bbox=" + e.bbox), e.proximity) {
                                var l = t(L.latLng(e.proximity), 3);
                                a += "&proximity=" + l.lng + "," + l.lat
                            }
                            "boolean" == typeof e.autocomplete && (a += "&autocomplete=" + e.autocomplete)
                        }
                        return a
                    },
                    n.query = function(e, r) {
                        return util.strict(r, "function"),
                            request(n.queryURL(e),
                                function(e, t) {
                                    if (t && (t.length || t.features)) {
                                        var n = {
                                            results: t
                                        };
                                        t.features && t.features.length && (n.latlng = [t.features[0].center[1], t.features[0].center[0]], t.features[0].bbox && (n.bounds = t.features[0].bbox, n.lbounds = util.lbounds(n.bounds))),
                                            r(null, n)
                                    } else r(e || !0)
                                }),
                            n
                    },
                    n.reverseQuery = function(e, r) {
                        function o(e) {
                            var r;
                            return r = void 0 !== e.lat && void 0 !== e.lng ? L.latLng(e.lat, e.lng) : void 0 !== e.lat && void 0 !== e.lon ? L.latLng(e.lat, e.lon) : L.latLng(e[1], e[0]),
                                r = t(r, 5),
                            r.lng + "," + r.lat
                        }
                        var u = "";
                        if (e.length && e[0].length) {
                            for (var i = 0,
                                     a = []; i < e.length; i++) a.push(o(e[i]));
                            u = a.join(";")
                        } else u = o(e);
                        return request(n.queryURL(u),
                            function(e, t) {
                                r(e, t)
                            }),
                            n
                    },
                    n
            };
        },
            {
                "./feedback": 10,
                "./format_url": 11,
                "./request": 25,
                "./util": 30,
                "isarray": 2
            }],
        13 : [function(require, module, exports) {
            "use strict";
            var geocoder = require("./geocoder"),
                util = require("./util"),
                GeocoderControl = L.Control.extend({
                    includes: L.Mixin.Events,
                    options: {
                        proximity: !0,
                        position: "topleft",
                        pointZoom: 16,
                        keepOpen: !1,
                        autocomplete: !1,
                        queryOptions: {}
                    },
                    initialize: function(t, e) {
                        L.Util.setOptions(this, e),
                            this.setURL(t),
                            this._updateSubmit = L.bind(this._updateSubmit, this),
                            this._updateAutocomplete = L.bind(this._updateAutocomplete, this),
                            this._chooseResult = L.bind(this._chooseResult, this)
                    },
                    setURL: function(t) {
                        return this.geocoder = geocoder(t, {
                            accessToken: this.options.accessToken
                        }),
                            this
                    },
                    getURL: function() {
                        return this.geocoder.getURL()
                    },
                    setID: function(t) {
                        return this.setURL(t)
                    },
                    setTileJSON: function(t) {
                        return this.setURL(t.geocoder)
                    },
                    _toggle: function(t) {
                        t && L.DomEvent.stop(t),
                            L.DomUtil.hasClass(this._container, "active") ? (L.DomUtil.removeClass(this._container, "active"), this._results.innerHTML = "", this._input.blur()) : (L.DomUtil.addClass(this._container, "active"), this._input.focus(), this._input.select())
                    },
                    _closeIfOpen: function() {
                        L.DomUtil.hasClass(this._container, "active") && !this.options.keepOpen && (L.DomUtil.removeClass(this._container, "active"), this._results.innerHTML = "", this._input.blur())
                    },
                    onAdd: function(t) {
                        var e = L.DomUtil.create("div", "leaflet-control-mapbox-geocoder leaflet-bar leaflet-control"),
                            i = L.DomUtil.create("a", "leaflet-control-mapbox-geocoder-toggle mapbox-icon mapbox-icon-geocoder", e),
                            o = L.DomUtil.create("div", "leaflet-control-mapbox-geocoder-results", e),
                            s = L.DomUtil.create("div", "leaflet-control-mapbox-geocoder-wrap", e),
                            n = L.DomUtil.create("form", "leaflet-control-mapbox-geocoder-form", s),
                            r = L.DomUtil.create("input", "", n);
                        return i.href = "#",
                            i.innerHTML = "&nbsp;",
                            r.type = "text",
                            r.setAttribute("placeholder", "Search"),
                            L.DomEvent.addListener(n, "submit", this._geocode, this),
                            L.DomEvent.addListener(r, "keyup", this._autocomplete, this),
                            L.DomEvent.disableClickPropagation(e),
                            this._map = t,
                            this._results = o,
                            this._input = r,
                            this._form = n,
                            this.options.keepOpen ? L.DomUtil.addClass(e, "active") : (this._map.on("click", this._closeIfOpen, this), L.DomEvent.addListener(i, "click", this._toggle, this)),
                            e
                    },
                    _updateSubmit: function(t, e) {
                        if (L.DomUtil.removeClass(this._container, "searching"), this._results.innerHTML = "", t || !e) this.fire("error", {
                            error: t
                        });
                        else {
                            var i = [];
                            e.results && e.results.features && (i = e.results.features),
                                1 === i.length ? (this.fire("autoselect", {
                                    feature: i[0]
                                }), this.fire("found", {
                                    results: e.results
                                }), this._chooseResult(i[0]), this._closeIfOpen()) : i.length > 1 ? (this.fire("found", {
                                    results: e.results
                                }), this._displayResults(i)) : (this.fire("notfound"), this._displayResults(i))
                        }
                    },
                    _updateAutocomplete: function(t, e) {
                        if (this._results.innerHTML = "", t || !e) this.fire("error", {
                            error: t
                        });
                        else {
                            var i = [];
                            e.results && e.results.features && (i = e.results.features),
                                i.length ? this.fire("found", {
                                    results: e.results
                                }) : this.fire("notfound"),
                                this._displayResults(i)
                        }
                    },
                    _displayResults: function(t) {
                        for (var e = 0,
                                 i = Math.min(t.length, 5); e < i; e++) {
                            var o = t[e],
                                s = o.place_name;
                            if (s.length) {
                                var n = L.DomUtil.create("a", "", this._results);
                                n["innerText" in n ? "innerText": "textContent"] = s,
                                    n.setAttribute("title", s),
                                    n.href = "#",
                                    L.bind(function(t) {
                                            L.DomEvent.addListener(n, "click",
                                                function(e) {
                                                    this._chooseResult(t),
                                                        L.DomEvent.stop(e),
                                                        this.fire("select", {
                                                            feature: t
                                                        })
                                                },
                                                this)
                                        },
                                        this)(o)
                            }
                        }
                        if (t.length > 5) {
                            L.DomUtil.create("span", "", this._results).innerHTML = "Top 5 of " + t.length + "  results"
                        }
                    },
                    _chooseResult: function(t) {
                        t.bbox ? this._map.fitBounds(util.lbounds(t.bbox)) : t.center && this._map.setView([t.center[1], t.center[0]], void 0 === this._map.getZoom() ? this.options.pointZoom: Math.max(this._map.getZoom(), this.options.pointZoom))
                    },
                    _geocode: function(t) {
                        if (L.DomEvent.preventDefault(t), "" === this._input.value) return this._updateSubmit();
                        L.DomUtil.addClass(this._container, "searching"),
                            this.geocoder.query(L.Util.extend({
                                    query: this._input.value,
                                    proximity: !!this.options.proximity && this._map.getCenter()
                                },
                                this.options.queryOptions), this._updateSubmit)
                    },
                    _autocomplete: function() {
                        if (this.options.autocomplete) return "" === this._input.value ? this._updateAutocomplete() : void this.geocoder.query(L.Util.extend({
                                query: this._input.value,
                                proximity: !!this.options.proximity && this._map.getCenter()
                            },
                            this.options.queryOptions), this._updateAutocomplete)
                    }
                });
            module.exports.GeocoderControl = GeocoderControl,
                module.exports.geocoderControl = function(t, e) {
                    return new GeocoderControl(t, e)
                };
        },
            {
                "./geocoder": 12,
                "./util": 30
            }],
        14 : [function(require, module, exports) {
            "use strict";
            function utfDecode(t) {
                return t >= 93 && t--,
                t >= 35 && t--,
                t - 32
            }
            module.exports = function(t) {
                return function(e, r) {
                    if (t) {
                        var u = utfDecode(t.grid[r].charCodeAt(e)),
                            n = t.keys[u];
                        return t.data[n]
                    }
                }
            };
        },
            {}],
        15 : [function(require, module, exports) {
            "use strict";
            var util = require("./util"),
                Mustache = require("mustache"),
                GridControl = L.Control.extend({
                    options: {
                        pinnable: !0,
                        follow: !1,
                        sanitizer: require("sanitize-caja"),
                        touchTeaser: !0,
                        location: !0
                    },
                    _currentContent: "",
                    _pinned: !1,
                    initialize: function(t, o) {
                        L.Util.setOptions(this, o),
                            util.strict_instance(t, L.Class, "L.mapbox.gridLayer"),
                            this._layer = t
                    },
                    setTemplate: function(t) {
                        return util.strict(t, "string"),
                            this.options.template = t,
                            this
                    },
                    _template: function(t, o) {
                        if (o) {
                            var i = this.options.template || this._layer.getTileJSON().template;
                            if (i) {
                                var e = {};
                                return e["__" + t + "__"] = !0,
                                    this.options.sanitizer(Mustache.to_html(i, L.extend(e, o)))
                            }
                        }
                    },
                    _show: function(t, o) {
                        t !== this._currentContent && (this._currentContent = t, this.options.follow ? (this._popup.setContent(t).setLatLng(o.latLng), this._map._popup !== this._popup && this._popup.openOn(this._map)) : (this._container.style.display = "block", this._contentWrapper.innerHTML = t))
                    },
                    hide: function() {
                        return this._pinned = !1,
                            this._currentContent = "",
                            this._map.closePopup(),
                            this._container.style.display = "none",
                            this._contentWrapper.innerHTML = "",
                            L.DomUtil.removeClass(this._container, "closable"),
                            this
                    },
                    _mouseover: function(t) {
                        if (t.data ? L.DomUtil.addClass(this._map._container, "map-clickable") : L.DomUtil.removeClass(this._map._container, "map-clickable"), !this._pinned) {
                            var o = this._template("teaser", t.data);
                            o ? this._show(o, t) : this.hide()
                        }
                    },
                    _mousemove: function(t) {
                        this._pinned || this.options.follow && this._popup.setLatLng(t.latLng)
                    },
                    _navigateTo: function(t) {
                        window.top.location.href = t
                    },
                    _click: function(t) {
                        var o = this._template("location", t.data);
                        if (this.options.location && o && 0 === o.search(/^https?:/)) return this._navigateTo(this._template("location", t.data));
                        if (this.options.pinnable) {
                            var i = this._template("full", t.data); ! i && this.options.touchTeaser && L.Browser.touch && (i = this._template("teaser", t.data)),
                                i ? (L.DomUtil.addClass(this._container, "closable"), this._pinned = !0, this._show(i, t)) : this._pinned && (L.DomUtil.removeClass(this._container, "closable"), this._pinned = !1, this.hide())
                        }
                    },
                    _onPopupClose: function() {
                        this._currentContent = null,
                            this._pinned = !1
                    },
                    _createClosebutton: function(t, o) {
                        var i = L.DomUtil.create("a", "close", t);
                        return i.innerHTML = "close",
                            i.href = "#",
                            i.title = "close",
                            L.DomEvent.on(i, "click", L.DomEvent.stopPropagation).on(i, "mousedown", L.DomEvent.stopPropagation).on(i, "dblclick", L.DomEvent.stopPropagation).on(i, "click", L.DomEvent.preventDefault).on(i, "click", o, this),
                            i
                    },
                    onAdd: function(t) {
                        this._map = t;
                        var o = L.DomUtil.create("div", "leaflet-control-grid map-tooltip"),
                            i = L.DomUtil.create("div", "map-tooltip-content");
                        return o.style.display = "none",
                            this._createClosebutton(o, this.hide),
                            o.appendChild(i),
                            this._contentWrapper = i,
                            this._popup = new L.Popup({
                                autoPan: !1,
                                closeOnClick: !1
                            }),
                            t.on("popupclose", this._onPopupClose, this),
                            L.DomEvent.disableClickPropagation(o).addListener(o, "mousewheel", L.DomEvent.stopPropagation),
                            this._layer.on("mouseover", this._mouseover, this).on("mousemove", this._mousemove, this).on("click", this._click, this),
                            o
                    },
                    onRemove: function(t) {
                        t.off("popupclose", this._onPopupClose, this),
                            this._layer.off("mouseover", this._mouseover, this).off("mousemove", this._mousemove, this).off("click", this._click, this)
                    }
                });
            module.exports.GridControl = GridControl,
                module.exports.gridControl = function(t, o) {
                    return new GridControl(t, o)
                };
        },
            {
                "./util": 30,
                "mustache": 4,
                "sanitize-caja": 5
            }],
        16 : [function(require, module, exports) {
            "use strict";
            var util = require("./util"),
                request = require("./request"),
                grid = require("./grid"),
                GridLayer = L.Layer.extend({
                    includes: [require("./load_tilejson")],
                    options: {
                        template: function() {
                            return ""
                        }
                    },
                    _mouseOn: null,
                    _tilejson: {},
                    _cache: {},
                    initialize: function(t, i) {
                        L.Util.setOptions(this, i),
                            this._loadTileJSON(t)
                    },
                    _setTileJSON: function(t) {
                        return util.strict(t, "object"),
                            L.extend(this.options, {
                                grids: t.grids,
                                minZoom: t.minzoom,
                                maxZoom: t.maxzoom,
                                bounds: t.bounds && util.lbounds(t.bounds)
                            }),
                            this._tilejson = t,
                            this._cache = {},
                            this._update(),
                            this
                    },
                    getTileJSON: function() {
                        return this._tilejson
                    },
                    active: function() {
                        return !! (this._map && this.options.grids && this.options.grids.length)
                    },
                    onAdd: function(t) {
                        this._map = t,
                            this._update(),
                            this._map.on("click", this._click, this).on("mousemove", this._move, this).on("moveend", this._update, this)
                    },
                    onRemove: function() {
                        this._map.off("click", this._click, this).off("mousemove", this._move, this).off("moveend", this._update, this)
                    },
                    getData: function(t, i) {
                        if (this.active()) {
                            var e = this._map,
                                o = e.project(t.wrap()),
                                s = Math.floor(o.x / 256),
                                n = Math.floor(o.y / 256),
                                a = e.options.crs.scale(e.getZoom()) / 256;
                            return s = (s + a) % a,
                                n = (n + a) % a,
                                this._getTile(e.getZoom(), s, n,
                                    function(t) {
                                        var e = Math.floor((o.x - 256 * s) / 4),
                                            a = Math.floor((o.y - 256 * n) / 4);
                                        i(t(e, a))
                                    }),
                                this
                        }
                    },
                    _click: function(t) {
                        this.getData(t.latlng, L.bind(function(i) {
                                this.fire("click", {
                                    latLng: t.latlng,
                                    data: i
                                })
                            },
                            this))
                    },
                    _move: function(t) {
                        this.getData(t.latlng, L.bind(function(i) {
                                i !== this._mouseOn ? (this._mouseOn && this.fire("mouseout", {
                                    latLng: t.latlng,
                                    data: this._mouseOn
                                }), this.fire("mouseover", {
                                    latLng: t.latlng,
                                    data: i
                                }), this._mouseOn = i) : this.fire("mousemove", {
                                    latLng: t.latlng,
                                    data: i
                                })
                            },
                            this))
                    },
                    _getTileURL: function(t) {
                        var i = this.options.grids,
                            e = (t.x + t.y) % i.length,
                            o = i[e];
                        return L.Util.template(o, t)
                    },
                    _update: function() {
                        if (this.active()) {
                            var t = this._map.getPixelBounds(),
                                i = this._map.getZoom();
                            if (! (i > this.options.maxZoom || i < this.options.minZoom)) for (var e = L.bounds(t.min.divideBy(256)._floor(), t.max.divideBy(256)._floor()), o = this._map.options.crs.scale(i) / 256, s = e.min.x; s <= e.max.x; s++) for (var n = e.min.y; n <= e.max.y; n++) this._getTile(i, (s % o + o) % o, (n % o + o) % o)
                        }
                    },
                    _getTile: function(t, i, e, o) {
                        var s = t + "_" + i + "_" + e,
                            n = L.point(i, e);
                        if (n.z = t, this._tileShouldBeLoaded(n)) {
                            if (s in this._cache) {
                                if (!o) return;
                                return void("function" == typeof this._cache[s] ? o(this._cache[s]) : this._cache[s].push(o))
                            }
                            this._cache[s] = [],
                            o && this._cache[s].push(o),
                                request(this._getTileURL(n), L.bind(function(t, i) {
                                        var e = this._cache[s];
                                        this._cache[s] = grid(i);
                                        for (var o = 0; o < e.length; ++o) e[o](this._cache[s])
                                    },
                                    this))
                        }
                    },
                    _tileShouldBeLoaded: function(t) {
                        if (t.z > this.options.maxZoom || t.z < this.options.minZoom) return ! 1;
                        if (this.options.bounds) {
                            var i = t.multiplyBy(256),
                                e = i.add(new L.Point(256, 256)),
                                o = this._map.unproject(i),
                                s = this._map.unproject(e),
                                n = new L.LatLngBounds([o, s]);
                            if (!this.options.bounds.intersects(n)) return ! 1
                        }
                        return ! 0
                    }
                });
            module.exports.GridLayer = GridLayer,
                module.exports.gridLayer = function(t, i) {
                    return new GridLayer(t, i)
                };
        },
            {
                "./grid": 14,
                "./load_tilejson": 20,
                "./request": 25,
                "./util": 30
            }],
        17 : [function(require, module, exports) {
            "use strict";
            var leaflet = require("./leaflet");
            require("./mapbox"),
                module.exports = leaflet;
        },
            {
                "./leaflet": 18,
                "./mapbox": 22
            }],
        18 : [function(require, module, exports) {
            module.exports = window.L = require("leaflet/dist/leaflet-src");
        },
            {
                "leaflet/dist/leaflet-src": 3
            }],
        19 : [function(require, module, exports) {
            "use strict";
            var LegendControl = L.Control.extend({
                options: {
                    position: "bottomright",
                    sanitizer: require("sanitize-caja")
                },
                initialize: function(e) {
                    L.setOptions(this, e),
                        this._legends = {}
                },
                onAdd: function() {
                    return this._container = L.DomUtil.create("div", "map-legends wax-legends"),
                        L.DomEvent.disableClickPropagation(this._container),
                        this._update(),
                        this._container
                },
                addLegend: function(e) {
                    return e ? (this._legends[e] || (this._legends[e] = 0), this._legends[e]++, this._update()) : this
                },
                removeLegend: function(e) {
                    return e ? (this._legends[e] && this._legends[e]--, this._update()) : this
                },
                _update: function() {
                    if (!this._map) return this;
                    this._container.innerHTML = "";
                    var e = "none";
                    for (var t in this._legends) if (this._legends.hasOwnProperty(t) && this._legends[t]) {
                        var n = L.DomUtil.create("div", "map-legend wax-legend", this._container);
                        n.innerHTML = this.options.sanitizer(t),
                            e = "block"
                    }
                    return this._container.style.display = e,
                        this
                }
            });
            module.exports.LegendControl = LegendControl,
                module.exports.legendControl = function(e) {
                    return new LegendControl(e)
                };
        },
            {
                "sanitize-caja": 5
            }],
        20 : [function(require, module, exports) {
            "use strict";
            var request = require("./request"),
                format_url = require("./format_url"),
                util = require("./util");
            module.exports = {
                _loadTileJSON: function(e) {
                    "string" == typeof e ? (e = format_url.tileJSON(e, this.options && this.options.accessToken), request(e, L.bind(function(t, r) {
                            t ? (util.log("could not load TileJSON at " + e), this.fire("error", {
                                error: t
                            })) : r && (this._setTileJSON(r), this.fire("ready"))
                        },
                        this))) : e && "object" == typeof e && this._setTileJSON(e)
                }
            };
        },
            {
                "./format_url": 11,
                "./request": 25,
                "./util": 30
            }],
        21 : [function(require, module, exports) {
            "use strict";
            function withAccessToken(t, e) {
                return ! e || t.accessToken ? t: L.extend({
                        accessToken: e
                    },
                    t)
            }
            var tileLayer = require("./tile_layer").tileLayer,
                featureLayer = require("./feature_layer").featureLayer,
                gridLayer = require("./grid_layer").gridLayer,
                gridControl = require("./grid_control").gridControl,
                shareControl = require("./share_control").shareControl,
                legendControl = require("./legend_control").legendControl,
                mapboxLogoControl = require("./mapbox_logo").mapboxLogoControl,
                feedback = require("./feedback"),
                LMap = L.Map.extend({
                    includes: [require("./load_tilejson")],
                    options: {
                        tileLayer: {},
                        featureLayer: {},
                        gridLayer: {},
                        legendControl: {},
                        gridControl: {},
                        shareControl: !1,
                        sanitizer: require("sanitize-caja")
                    },
                    _tilejson: {},
                    initialize: function(t, e, o) {
                        if (L.Map.prototype.initialize.call(this, t, L.extend({},
                                L.Map.prototype.options, o)), this.attributionControl) {
                            this.attributionControl.setPrefix("");
                            var i = this.options.attributionControl.compact; (i || !1 !== i && this._container.offsetWidth <= 640) && L.DomUtil.addClass(this.attributionControl._container, "leaflet-compact-attribution"),
                            void 0 === i && this.on("resize",
                                function() {
                                    this._container.offsetWidth > 640 ? L.DomUtil.removeClass(this.attributionControl._container, "leaflet-compact-attribution") : L.DomUtil.addClass(this.attributionControl._container, "leaflet-compact-attribution")
                                })
                        }
                        this.options.tileLayer && (this.tileLayer = tileLayer(void 0, withAccessToken(this.options.tileLayer, this.options.accessToken)), this.addLayer(this.tileLayer)),
                        this.options.featureLayer && (this.featureLayer = featureLayer(void 0, withAccessToken(this.options.featureLayer, this.options.accessToken)), this.addLayer(this.featureLayer)),
                        this.options.gridLayer && (this.gridLayer = gridLayer(void 0, withAccessToken(this.options.gridLayer, this.options.accessToken)), this.addLayer(this.gridLayer)),
                        this.options.gridLayer && this.options.gridControl && (this.gridControl = gridControl(this.gridLayer, this.options.gridControl), this.addControl(this.gridControl)),
                        this.options.legendControl && (this.legendControl = legendControl(this.options.legendControl), this.addControl(this.legendControl)),
                        this.options.shareControl && (this.shareControl = shareControl(void 0, withAccessToken(this.options.shareControl, this.options.accessToken)), this.addControl(this.shareControl)),
                            this._mapboxLogoControl = mapboxLogoControl(this.options.mapboxLogoControl),
                            this.addControl(this._mapboxLogoControl),
                            this._loadTileJSON(e),
                            this.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this).on("moveend", this._updateMapFeedbackLink, this),
                            this.whenReady(function() {
                                feedback.on("change", this._updateMapFeedbackLink, this)
                            }),
                            this.on("unload",
                                function() {
                                    feedback.off("change", this._updateMapFeedbackLink, this)
                                })
                    },
                    _setTileJSON: function(t) {
                        return this._tilejson = t,
                            this._initialize(t),
                            this
                    },
                    getTileJSON: function() {
                        return this._tilejson
                    },
                    _initialize: function(t) {
                        if (this.tileLayer && (this.tileLayer._setTileJSON(t), this._updateLayer(this.tileLayer)), this.featureLayer && !this.featureLayer.getGeoJSON() && t.data && t.data[0] && this.featureLayer.loadURL(t.data[0]), this.gridLayer && (this.gridLayer._setTileJSON(t), this._updateLayer(this.gridLayer)), this.legendControl && t.legend && this.legendControl.addLegend(t.legend), this.shareControl && this.shareControl._setTileJSON(t), this._mapboxLogoControl._setTileJSON(t), !this._loaded && t.center) {
                            var e = void 0 !== this.getZoom() ? this.getZoom() : t.center[2],
                                o = L.latLng(t.center[1], t.center[0]);
                            this.setView(o, e)
                        }
                    },
                    _updateMapFeedbackLink: function() {
                        if (this._controlContainer.getElementsByClassName) {
                            var t = this._controlContainer.getElementsByClassName("mapbox-improve-map");
                            if (t.length && this._loaded) {
                                var e = this.getCenter().wrap(),
                                    o = this._tilejson || {},
                                    i = o.id || "",
                                    r = "#" + i + "/" + e.lng.toFixed(3) + "/" + e.lat.toFixed(3) + "/" + this.getZoom();
                                for (var a in feedback.data) r += "/" + a + "=" + feedback.data[a];
                                for (var n = 0; n < t.length; n++) t[n].hash = r
                            }
                        }
                    },
                    _onLayerAdd: function(t) {
                        "on" in t.layer && t.layer.on("ready", this._onLayerReady, this),
                            window.setTimeout(L.bind(this._updateMapFeedbackLink, this), 0)
                    },
                    _onLayerRemove: function(t) {
                        "on" in t.layer && t.layer.off("ready", this._onLayerReady, this),
                            window.setTimeout(L.bind(this._updateMapFeedbackLink, this), 0)
                    },
                    _onLayerReady: function(t) {
                        this._updateLayer(t.target)
                    },
                    _updateLayer: function(t) {
                        t.options && (this.attributionControl && this._loaded && t.getAttribution && this.attributionControl.addAttribution(t.getAttribution()), L.stamp(t) in this._zoomBoundLayers || !t.options.maxZoom && !t.options.minZoom || (this._zoomBoundLayers[L.stamp(t)] = t), this._updateMapFeedbackLink(), this._updateZoomLevels())
                    }
                });
            module.exports.Map = LMap,
                module.exports.map = function(t, e, o) {
                    return new LMap(t, e, o)
                };
        },
            {
                "./feature_layer": 9,
                "./feedback": 10,
                "./grid_control": 15,
                "./grid_layer": 16,
                "./legend_control": 19,
                "./load_tilejson": 20,
                "./mapbox_logo": 23,
                "./share_control": 26,
                "./tile_layer": 29,
                "sanitize-caja": 5
            }],
        22 : [function(require, module, exports) {
            "use strict";
            var geocoderControl = require("./geocoder_control"),
                gridControl = require("./grid_control"),
                featureLayer = require("./feature_layer"),
                legendControl = require("./legend_control"),
                shareControl = require("./share_control"),
                tileLayer = require("./tile_layer"),
                map = require("./map"),
                gridLayer = require("./grid_layer"),
                styleLayer = require("./style_layer");
            L.mapbox = module.exports = {
                VERSION: require("../package.json").version,
                geocoder: require("./geocoder"),
                marker: require("./marker"),
                simplestyle: require("./simplestyle"),
                tileLayer: tileLayer.tileLayer,
                TileLayer: tileLayer.TileLayer,
                styleLayer: styleLayer.styleLayer,
                StyleLayer: styleLayer.StyleLayer,
                shareControl: shareControl.shareControl,
                ShareControl: shareControl.ShareControl,
                legendControl: legendControl.legendControl,
                LegendControl: legendControl.LegendControl,
                geocoderControl: geocoderControl.geocoderControl,
                GeocoderControl: geocoderControl.GeocoderControl,
                gridControl: gridControl.gridControl,
                GridControl: gridControl.GridControl,
                gridLayer: gridLayer.gridLayer,
                GridLayer: gridLayer.GridLayer,
                featureLayer: featureLayer.featureLayer,
                FeatureLayer: featureLayer.FeatureLayer,
                map: map.map,
                Map: map.Map,
                config: require("./config"),
                sanitize: require("sanitize-caja"),
                template: require("mustache").to_html,
                feedback: require("./feedback")
            },
                window.L.Icon.Default.imagePath = ("https:" === document.location.protocol || "http:" === document.location.protocol ? "": "https:") + "//api.tiles.mapbox.com/mapbox.js/v" + require("../package.json").version + "/images/";
        },
            {
                "../package.json": 7,
                "./config": 8,
                "./feature_layer": 9,
                "./feedback": 10,
                "./geocoder": 12,
                "./geocoder_control": 13,
                "./grid_control": 15,
                "./grid_layer": 16,
                "./legend_control": 19,
                "./map": 21,
                "./marker": 24,
                "./share_control": 26,
                "./simplestyle": 27,
                "./style_layer": 28,
                "./tile_layer": 29,
                "mustache": 4,
                "sanitize-caja": 5
            }],
        23 : [function(require, module, exports) {
            "use strict";
            var MapboxLogoControl = L.Control.extend({
                options: {
                    position: "bottomleft"
                },
                initialize: function(o) {
                    L.setOptions(this, o)
                },
                onAdd: function() {
                    return this._container = L.DomUtil.create("div", "mapbox-logo"),
                        this._container
                },
                _setTileJSON: function(o) {
                    o.mapbox_logo && L.DomUtil.addClass(this._container, "mapbox-logo-true")
                }
            });
            module.exports.MapboxLogoControl = MapboxLogoControl,
                module.exports.mapboxLogoControl = function(o) {
                    return new MapboxLogoControl(o)
                };
        },
            {}],
        24 : [function(require, module, exports) {
            "use strict";
            function icon(r, e) {
                r = r || {};
                var i = {
                        small: [20, 50],
                        medium: [30, 70],
                        large: [35, 90]
                    },
                    t = r["marker-size"] || "medium",
                    o = "marker-symbol" in r && "" !== r["marker-symbol"] ? "-" + r["marker-symbol"] : "",
                    s = (r["marker-color"] || "7e7e7e").replace("#", "");
                return L.icon({
                    iconUrl: format_url("/v4/marker/pin-" + t.charAt(0) + o + "+" + s + (L.Browser.retina ? "@2x": "") + ".png", e && e.accessToken),
                    iconSize: i[t],
                    iconAnchor: [i[t][0] / 2, i[t][1] / 2],
                    popupAnchor: [0, -i[t][1] / 2]
                })
            }
            function style(r, e, i) {
                return L.marker(e, {
                    icon: icon(r.properties, i),
                    title: util.strip_tags(sanitize(r.properties && r.properties.title || ""))
                })
            }
            function createPopup(r, e) {
                if (!r || !r.properties) return "";
                var i = "";
                return r.properties.title && (i += '<div class="marker-title">' + r.properties.title + "</div>"),
                r.properties.description && (i += '<div class="marker-description">' + r.properties.description + "</div>"),
                    (e || sanitize)(i)
            }
            var format_url = require("./format_url"),
                util = require("./util"),
                sanitize = require("sanitize-caja");
            module.exports = {
                icon: icon,
                style: style,
                createPopup: createPopup
            };
        },
            {
                "./format_url": 11,
                "./util": 30,
                "sanitize-caja": 5
            }],
        25 : [function(require, module, exports) {
            "use strict";
            var corslite = require("corslite"),
                strict = require("./util").strict,
                config = require("./config"),
                protocol = /^(https?:)?(?=\/\/(.|api)\.tiles\.mapbox\.com\/)/;
            module.exports = function(t, o) {
                function r(t, r) { ! t && r && (r = JSON.parse(r.responseText)),
                    o(t, r)
                }
                return strict(t, "string"),
                    strict(o, "function"),
                    t = t.replace(protocol,
                        function(t, o) {
                            return "withCredentials" in new window.XMLHttpRequest ? "https:" === o || "https:" === document.location.protocol || config.FORCE_HTTPS ? "https:": "http:": document.location.protocol
                        }),
                    corslite(t, r)
            };
        },
            {
                "./config": 8,
                "./util": 30,
                "corslite": 1
            }],
        26 : [function(require, module, exports) {
            "use strict";
            var format_url = require("./format_url"),
                ShareControl = L.Control.extend({
                    includes: [require("./load_tilejson")],
                    options: {
                        position: "topleft",
                        url: ""
                    },
                    initialize: function(t, e) {
                        L.setOptions(this, e),
                            this._loadTileJSON(t)
                    },
                    _setTileJSON: function(t) {
                        this._tilejson = t
                    },
                    onAdd: function(t) {
                        this._map = t;
                        var e = L.DomUtil.create("div", "leaflet-control-mapbox-share leaflet-bar"),
                            o = L.DomUtil.create("a", "mapbox-share mapbox-icon mapbox-icon-share", e);
                        return o.href = "#",
                            this._modal = L.DomUtil.create("div", "mapbox-modal", this._map._container),
                            this._mask = L.DomUtil.create("div", "mapbox-modal-mask", this._modal),
                            this._content = L.DomUtil.create("div", "mapbox-modal-content", this._modal),
                            L.DomEvent.addListener(o, "click", this._shareClick, this),
                            L.DomEvent.disableClickPropagation(e),
                            this._map.on("mousedown", this._clickOut, this),
                            e
                    },
                    _clickOut: function(t) {
                        if (this._sharing) return L.DomEvent.preventDefault(t),
                            L.DomUtil.removeClass(this._modal, "active"),
                            this._content.innerHTML = "",
                            void(this._sharing = null)
                    },
                    _shareClick: function(t) {
                        function e(t, e, o) {
                            var i = document.createElement("a");
                            return i.setAttribute("class", t),
                                i.setAttribute("href", e),
                                i.setAttribute("target", "_blank"),
                                o = document.createTextNode(o),
                                i.appendChild(o),
                                i
                        }
                        if (L.DomEvent.stop(t), this._sharing) return this._clickOut(t);
                        var o = this._tilejson || this._map._tilejson || {},
                            i = encodeURIComponent(this.options.url || o.webpage || window.location),
                            a = encodeURIComponent(o.name),
                            n = format_url("/v4/" + o.id + "/" + this._map.getCenter().lng + "," + this._map.getCenter().lat + "," + this._map.getZoom() + "/600x600.png", this.options.accessToken),
                            r = format_url("/v4/" + o.id + ".html", this.options.accessToken),
                            s = "//twitter.com/intent/tweet?status=" + a + " " + i,
                            l = "//www.facebook.com/sharer.php?u=" + i + "&t=" + a,
                            m = "//www.pinterest.com/pin/create/button/?url=" + i + "&media=" + n + "&description=" + a,
                            c = '<iframe width="100%" height="500px" frameBorder="0" src="' + r + '"></iframe>';
                        L.DomUtil.addClass(this._modal, "active"),
                            this._sharing = L.DomUtil.create("div", "mapbox-modal-body", this._content);
                        var h = e("mapbox-button mapbox-button-icon mapbox-icon-twitter", s, "Twitter"),
                            p = e("mapbox-button mapbox-button-icon mapbox-icon-facebook", l, "Facebook"),
                            d = e("mapbox-button mapbox-button-icon mapbox-icon-pinterest", m, "Pinterest"),
                            u = document.createElement("h3"),
                            b = document.createTextNode("Share this map");
                        u.appendChild(b);
                        var _ = document.createElement("div");
                        _.setAttribute("class", "mapbox-share-buttons"),
                            _.appendChild(p),
                            _.appendChild(h),
                            _.appendChild(d),
                            this._sharing.appendChild(u),
                            this._sharing.appendChild(_);
                        var v = L.DomUtil.create("input", "mapbox-embed", this._sharing);
                        v.type = "text",
                            v.value = c,
                            L.DomUtil.create("label", "mapbox-embed-description", this._sharing).innerHTML = "Copy and paste this <strong>HTML code</strong> into documents to embed this map on web pages.";
                        var f = L.DomUtil.create("a", "leaflet-popup-close-button", this._sharing);
                        f.href = "#",
                            L.DomEvent.disableClickPropagation(this._sharing),
                            L.DomEvent.addListener(f, "click", this._clickOut, this),
                            L.DomEvent.addListener(v, "click",
                                function(t) {
                                    t.target.focus(),
                                        t.target.select()
                                })
                    }
                });
            module.exports.ShareControl = ShareControl,
                module.exports.shareControl = function(t, e) {
                    return new ShareControl(t, e)
                };
        },
            {
                "./format_url": 11,
                "./load_tilejson": 20
            }],
        27 : [function(require, module, exports) {
            "use strict";
            function fallback(t, l) {
                var i = {};
                for (var r in l) void 0 === t[r] ? i[r] = l[r] : i[r] = t[r];
                return i
            }
            function remap(t) {
                for (var l = {},
                         i = 0; i < mapping.length; i++) l[mapping[i][1]] = t[mapping[i][0]];
                return l
            }
            function style(t) {
                return remap(fallback(t.properties || {},
                    defaults))
            }
            var defaults = {
                    stroke: "#555555",
                    "stroke-width": 2,
                    "stroke-opacity": 1,
                    fill: "#555555",
                    "fill-opacity": .5
                },
                mapping = [["stroke", "color"], ["stroke-width", "weight"], ["stroke-opacity", "opacity"], ["fill", "fillColor"], ["fill-opacity", "fillOpacity"]];
            module.exports = {
                style: style,
                defaults: defaults
            };
        },
            {}],
        28 : [function(require, module, exports) {
            "use strict";
            var util = require("./util"),
                format_url = require("./format_url"),
                request = require("./request"),
                StyleLayer = L.TileLayer.extend({
                    options: {
                        sanitizer: require("sanitize-caja")
                    },
                    initialize: function(t, e) {
                        L.TileLayer.prototype.initialize.call(this, void 0, L.extend({},
                            e, {
                                tileSize: 512,
                                zoomOffset: -1,
                                minNativeZoom: 0,
                                tms: !1
                            })),
                            this._url = this._formatTileURL(t),
                            this._getAttribution(t)
                    },
                    _getAttribution: function(t) {
                        var e = format_url.style(t, this.options && this.options.accessToken);
                        request(e, L.bind(function(i, r) {
                                i && (util.log("could not load Mapbox style at " + e), this.fire("error", {
                                    error: i
                                }));
                                var o = [];
                                for (var s in r.sources) {
                                    var l = r.sources[s].url.split("mapbox://")[1];
                                    o.push(l)
                                }
                                request(format_url.tileJSON(o.join(), this.options.accessToken), L.bind(function(e, i) {
                                        e ? (util.log("could not load TileJSON at " + t), this.fire("error", {
                                            error: e
                                        })) : i && (util.strict(i, "object"), this.options.attribution = this.options.sanitizer(i.attribution), this._tilejson = i, this.fire("ready"))
                                    },
                                    this))
                            },
                            this))
                    },
                    setUrl: null,
                    _formatTileURL: function(t) {
                        if ("string" == typeof t) { - 1 === t.indexOf("mapbox://styles/") && (util.log("Incorrectly formatted Mapbox style at " + t), this.fire("error"));
                            var e = t.split("mapbox://styles/")[1];
                            return format_url("/styles/v1/" + e + "/tiles/{z}/{x}/{y}{r}", this.options.accessToken)
                        }
                        if ("object" == typeof t) return format_url("/styles/v1/" + t.owner + "/" + t.id + "/tiles/{z}/{x}/{y}{r}", this.options.accessToken)
                    }
                });
            module.exports.StyleLayer = StyleLayer,
                module.exports.styleLayer = function(t, e) {
                    return new StyleLayer(t, e)
                };
        },
            {
                "./format_url": 11,
                "./request": 25,
                "./util": 30,
                "sanitize-caja": 5
            }],
        29 : [function(require, module, exports) {
            "use strict";
            var util = require("./util"),
                formatPattern = /\.((?:png|jpg)\d*)(?=$|\?)/,
                TileLayer = L.TileLayer.extend({
                    includes: [require("./load_tilejson")],
                    options: {
                        sanitizer: require("sanitize-caja")
                    },
                    formats: ["png", "jpg", "png32", "png64", "png128", "png256", "jpg70", "jpg80", "jpg90"],
                    scalePrefix: "@2x.",
                    initialize: function(t, i) {
                        L.TileLayer.prototype.initialize.call(this, void 0, i),
                            this._tilejson = {},
                        i && i.format && util.strict_oneof(i.format, this.formats),
                            this._loadTileJSON(t)
                    },
                    setFormat: function(t) {
                        return util.strict(t, "string"),
                            this.options.format = t,
                            this.redraw(),
                            this
                    },
                    setUrl: null,
                    _setTileJSON: function(t) {
                        if (util.strict(t, "object"), !this.options.format) {
                            var i = t.tiles[0].match(formatPattern);
                            i && (this.options.format = i[1])
                        }
                        return L.extend(this.options, {
                            tiles: t.tiles,
                            attribution: this.options.sanitizer(t.attribution),
                            minZoom: t.minzoom || 0,
                            maxZoom: t.maxzoom || 18,
                            tms: "tms" === t.scheme,
                            bounds: t.bounds && util.lbounds(t.bounds)
                        }),
                            this._tilejson = t,
                            this.redraw(),
                            this
                    },
                    getTileJSON: function() {
                        return this._tilejson
                    },
                    getTileUrl: function(t) {
                        var i = this.options.tiles,
                            e = Math.floor(Math.abs(t.x + t.y) % i.length),
                            o = i[e],
                            r = L.Util.template(o, t);
                        return r && this.options.format ? r.replace(formatPattern, (L.Browser.retina ? this.scalePrefix: ".") + this.options.format) : r
                    },
                    _update: function() {
                        this.options.tiles && L.TileLayer.prototype._update.call(this)
                    }
                });
            module.exports.TileLayer = TileLayer,
                module.exports.tileLayer = function(t, i) {
                    return new TileLayer(t, i)
                };
        },
            {
                "./load_tilejson": 20,
                "./util": 30,
                "sanitize-caja": 5
            }],
        30 : [function(require, module, exports) {
            "use strict";
            function contains(n, t) {
                if (!t || !t.length) return ! 1;
                for (var r = 0; r < t.length; r++) if (t[r] === n) return ! 0;
                return ! 1
            }
            module.exports = {
                idUrl: function(n, t) { - 1 === n.indexOf("/") ? t.loadID(n) : t.loadURL(n)
                },
                log: function(n) {
                    "object" == typeof console && "function" == typeof console.error && console.error(n)
                },
                strict: function(n, t) {
                    if (typeof n !== t) throw new Error("Invalid argument: " + t + " expected")
                },
                strict_instance: function(n, t, r) {
                    if (! (n instanceof t)) throw new Error("Invalid argument: " + r + " expected")
                },
                strict_oneof: function(n, t) {
                    if (!contains(n, t)) throw new Error("Invalid argument: " + n + " given, valid values are " + t.join(", "))
                },
                strip_tags: function(n) {
                    return n.replace(/<[^<]+>/g, "")
                },
                lbounds: function(n) {
                    return new L.LatLngBounds([[n[1], n[0]], [n[3], n[2]]])
                }
            };
        },
            {}]
    },
    {},
    [17])

//# sourceMappingURL=mapbox.js.map
