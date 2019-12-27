! function (t, e) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Popper = e()
}(this, function () {
	"use strict";

	function r(t) {
		return t && "[object Function]" === {}.toString.call(t)
	}

	function _(t, e) {
		if (1 !== t.nodeType) return [];
		var i = window.getComputedStyle(t, null);
		return e ? i[e] : i
	}

	function b(t) {
		return "HTML" === t.nodeName ? t : t.parentNode || t.host
	}

	function y(t) {
		if (!t || -1 !== ["HTML", "BODY", "#document"].indexOf(t.nodeName)) return window.document.body;
		var e = _(t),
			i = e.overflow,
			s = e.overflowX,
			n = e.overflowY;
		return /(auto|scroll)/.test(i + n + s) ? t : y(b(t))
	}

	function w(t) {
		var e = t && t.offsetParent,
			i = e && e.nodeName;
		return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TD", "TABLE"].indexOf(e.nodeName) && "static" === _(e, "position") ? w(e) : e : window.document.documentElement
	}

	function c(t) {
		return null === t.parentNode ? t : c(t.parentNode)
	}

	function C(t, e) {
		if (!(t && t.nodeType && e && e.nodeType)) return window.document.documentElement;
		var i = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
			s = i ? t : e,
			n = i ? e : t,
			o = document.createRange();
		o.setStart(s, 0), o.setEnd(n, 0);
		var r, a, l = o.commonAncestorContainer;
		if (t !== l && e !== l || s.contains(n)) return "BODY" === (a = (r = l).nodeName) || "HTML" !== a && w(r.firstElementChild) !== r ? w(l) : l;
		var h = c(t);
		return h.host ? C(h.host, e) : C(t, c(e).host)
	}

	function x(t) {
		var e = "top" === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
			i = t.nodeName;
		if ("BODY" === i || "HTML" === i) {
			var s = window.document.documentElement;
			return (window.document.scrollingElement || s)[e]
		}
		return t[e]
	}

	function u(t, e) {
		var i = "x" === e ? "Left" : "Top",
			s = "Left" == i ? "Right" : "Bottom";
		return +t["border" + i + "Width"].split("px")[0] + +t["border" + s + "Width"].split("px")[0]
	}

	function s(t, e, i, s) {
		return O(e["offset" + t], i["client" + t], i["offset" + t], j() ? i["offset" + t] + s["margin" + ("Height" === t ? "Top" : "Left")] + s["margin" + ("Height" === t ? "Bottom" : "Right")] : 0)
	}

	function D() {
		var t = window.document.body,
			e = window.document.documentElement,
			i = j() && window.getComputedStyle(e);
		return {
			height: s("Height", t, e, i),
			width: s("Width", t, e, i)
		}
	}

	function k(t) {
		return B({}, t, {
			right: t.left + t.width,
			bottom: t.top + t.height
		})
	}

	function I(t) {
		var e = {};
		if (j()) try {
			e = t.getBoundingClientRect();
			var i = x(t, "top"),
				s = x(t, "left");
			e.top += i, e.left += s, e.bottom += i, e.right += s
		} catch (t) {} else e = t.getBoundingClientRect();
		var n = {
				left: e.left,
				top: e.top,
				width: e.right - e.left,
				height: e.bottom - e.top
			},
			o = "HTML" === t.nodeName ? D() : {},
			r = o.width || t.clientWidth || n.right - n.left,
			a = o.height || t.clientHeight || n.bottom - n.top,
			l = t.offsetWidth - r,
			h = t.offsetHeight - a;
		if (l || h) {
			var c = _(t);
			l -= u(c, "x"), h -= u(c, "y"), n.width -= l, n.height -= h
		}
		return k(n)
	}

	function S(t, e) {
		var i = j(),
			s = "HTML" === e.nodeName,
			n = I(t),
			o = I(e),
			r = y(t),
			a = _(e),
			l = +a.borderTopWidth.split("px")[0],
			h = +a.borderLeftWidth.split("px")[0],
			c = k({
				top: n.top - o.top - l,
				left: n.left - o.left - h,
				width: n.width,
				height: n.height
			});
		if (c.marginTop = 0, c.marginLeft = 0, !i && s) {
			var u = +a.marginTop.split("px")[0],
				d = +a.marginLeft.split("px")[0];
			c.top -= l - u, c.bottom -= l - u, c.left -= h - d, c.right -= h - d, c.marginTop = u, c.marginLeft = d
		}
		return (i ? e.contains(r) : e === r && "BODY" !== r.nodeName) && (c = function (t, e) {
			var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
				s = x(e, "top"),
				n = x(e, "left"),
				o = i ? -1 : 1;
			return t.top += s * o, t.bottom += s * o, t.left += n * o, t.right += n * o, t
		}(c, e)), c
	}

	function d(t, e, i, s) {
		var n, o, r, a, l, h, c, u = {
				top: 0,
				left: 0
			},
			d = C(t, e);
		if ("viewport" === s) n = d, o = window.document.documentElement, r = S(n, o), a = O(o.clientWidth, window.innerWidth || 0), l = O(o.clientHeight, window.innerHeight || 0), h = x(o), c = x(o, "left"), u = k({
			top: h - r.top + r.marginTop,
			left: c - r.left + r.marginLeft,
			width: a,
			height: l
		});
		else {
			var p;
			"scrollParent" === s ? "BODY" === (p = y(b(t))).nodeName && (p = window.document.documentElement) : p = "window" === s ? window.document.documentElement : s;
			var f = S(p, d);
			if ("HTML" !== p.nodeName || function t(e) {
					var i = e.nodeName;
					return "BODY" !== i && "HTML" !== i && ("fixed" === _(e, "position") || t(b(e)))
				}(d)) u = f;
			else {
				var g = D(),
					m = g.height,
					v = g.width;
				u.top += f.top - f.marginTop, u.bottom = m + f.top, u.left += f.left - f.marginLeft, u.right = v + f.left
			}
		}
		return u.left += i, u.top += i, u.right -= i, u.bottom -= i, u
	}

	function a(t, e, s, i, n) {
		var o = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
		if (-1 === t.indexOf("auto")) return t;
		var r = d(s, i, o, n),
			a = {
				top: {
					width: r.width,
					height: e.top - r.top
				},
				right: {
					width: r.right - e.right,
					height: r.height
				},
				bottom: {
					width: r.width,
					height: r.bottom - e.bottom
				},
				left: {
					width: e.left - r.left,
					height: r.height
				}
			},
			l = Object.keys(a).map(function (t) {
				return B({
					key: t
				}, a[t], {
					area: (e = a[t], e.width * e.height)
				});
				var e
			}).sort(function (t, e) {
				return e.area - t.area
			}),
			h = l.filter(function (t) {
				var e = t.width,
					i = t.height;
				return e >= s.clientWidth && i >= s.clientHeight
			}),
			c = 0 < h.length ? h[0].key : l[0].key,
			u = t.split("-")[1];
		return c + (u ? "-" + u : "")
	}

	function l(t, e, i) {
		return S(i, C(e, i))
	}

	function f(t) {
		var e = window.getComputedStyle(t),
			i = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
			s = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
		return {
			width: t.offsetWidth + s,
			height: t.offsetHeight + i
		}
	}

	function E(t) {
		var e = {
			left: "right",
			right: "left",
			bottom: "top",
			top: "bottom"
		};
		return t.replace(/left|right|bottom|top/g, function (t) {
			return e[t]
		})
	}

	function T(t, e, i) {
		i = i.split("-")[0];
		var s = f(t),
			n = {
				width: s.width,
				height: s.height
			},
			o = -1 !== ["right", "left"].indexOf(i),
			r = o ? "top" : "left",
			a = o ? "left" : "top",
			l = o ? "height" : "width",
			h = o ? "width" : "height";
		return n[r] = e[r] + e[l] / 2 - s[l] / 2, n[a] = i === a ? e[a] - s[h] : e[E(a)], n
	}

	function A(t, e) {
		return Array.prototype.find ? t.find(e) : t.filter(e)[0]
	}

	function M(t, i, e) {
		return (void 0 === e ? t : t.slice(0, function (t, e, i) {
			if (Array.prototype.findIndex) return t.findIndex(function (t) {
				return t[e] === i
			});
			var s = A(t, function (t) {
				return t[e] === i
			});
			return t.indexOf(s)
		}(t, "name", e))).forEach(function (t) {
			t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
			var e = t.function || t.fn;
			t.enabled && r(e) && (i.offsets.popper = k(i.offsets.popper), i.offsets.reference = k(i.offsets.reference), i = e(i, t))
		}), i
	}

	function t(t, i) {
		return t.some(function (t) {
			var e = t.name;
			return t.enabled && e === i
		})
	}

	function F(t) {
		for (var e = [!1, "ms", "Webkit", "Moz", "O"], i = t.charAt(0).toUpperCase() + t.slice(1), s = 0; s < e.length - 1; s++) {
			var n = e[s],
				o = n ? "" + n + i : t;
			if (void 0 !== window.document.body.style[o]) return o
		}
		return null
	}

	function e(t, e, i, s) {
		i.updateBound = s, window.addEventListener("resize", i.updateBound, {
			passive: !0
		});
		var n = y(t);
		return function t(e, i, s, n) {
			var o = "BODY" === e.nodeName,
				r = o ? window : e;
			r.addEventListener(i, s, {
				passive: !0
			}), o || t(y(r.parentNode), i, s, n), n.push(r)
		}(n, "scroll", i.updateBound, i.scrollParents), i.scrollElement = n, i.eventsEnabled = !0, i
	}

	function i() {
		var e;
		this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = (this.reference, e = this.state, window.removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function (t) {
			t.removeEventListener("scroll", e.updateBound)
		}), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e))
	}

	function p(t) {
		return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
	}

	function h(i, s) {
		Object.keys(s).forEach(function (t) {
			var e = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(t) && p(s[t]) && (e = "px"), i.style[t] = s[t] + e
		})
	}

	function g(t, e, i) {
		var s = A(t, function (t) {
				return t.name === e
			}),
			n = !!s && t.some(function (t) {
				return t.name === i && t.enabled && t.order < s.order
			});
		if (!n) {
			var o = "`" + e + "`";
			console.warn("`" + i + "` modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
		}
		return n
	}

	function n(t) {
		var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
			i = Q.indexOf(t),
			s = Q.slice(i + 1).concat(Q.slice(0, i));
		return e ? s.reverse() : s
	}

	function m(t, n, o, e) {
		var r = [0, 0],
			a = -1 !== ["right", "left"].indexOf(e),
			i = t.split(/(\+|\-)/).map(function (t) {
				return t.trim()
			}),
			s = i.indexOf(A(i, function (t) {
				return -1 !== t.search(/,|\s/)
			}));
		i[s] && -1 === i[s].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
		var l = /\s*,\s*|\s+/,
			h = -1 === s ? [i] : [i.slice(0, s).concat([i[s].split(l)[0]]), [i[s].split(l)[1]].concat(i.slice(s + 1))];
		return (h = h.map(function (t, e) {
			var i = (1 === e ? !a : a) ? "height" : "width",
				s = !1;
			return t.reduce(function (t, e) {
				return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, s = !0, t) : s ? (t[t.length - 1] += e, s = !1, t) : t.concat(e)
			}, []).map(function (t) {
				return function (t, e, i, s) {
					var n = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
						o = +n[1],
						r = n[2];
					if (!o) return t;
					if (0 === r.indexOf("%")) {
						var a;
						switch (r) {
							case "%p":
								a = i;
								break;
							case "%":
							case "%r":
							default:
								a = s
						}
						return k(a)[e] / 100 * o
					}
					return "vh" === r || "vw" === r ? ("vh" === r ? O(document.documentElement.clientHeight, window.innerHeight || 0) : O(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * o : o
				}(t, i, n, o)
			})
		})).forEach(function (i, s) {
			i.forEach(function (t, e) {
				p(t) && (r[s] += t * ("-" === i[e - 1] ? -1 : 1))
			})
		}), r
	}
	for (var v = Math.min, P = Math.floor, O = Math.max, o = ["native code", "[object MutationObserverConstructor]"], N = "undefined" != typeof window, z = ["Edge", "Trident", "Firefox"], $ = 0, H = 0; H < z.length; H += 1)
		if (N && 0 <= navigator.userAgent.indexOf(z[H])) {
			$ = 1;
			break
		} var W, L, R = N && (L = window.MutationObserver, o.some(function (t) {
			return -1 < (L || "").toString().indexOf(t)
		})) ? function (t) {
			var e = !1,
				i = 0,
				s = document.createElement("span");
			return new MutationObserver(function () {
					t(), e = !1
				}).observe(s, {
					attributes: !0
				}),
				function () {
					e || (e = !0, s.setAttribute("x-index", i), ++i)
				}
		} : function (t) {
			var e = !1;
			return function () {
				e || (e = !0, setTimeout(function () {
					e = !1, t()
				}, $))
			}
		},
		j = function () {
			return null == W && (W = -1 !== navigator.appVersion.indexOf("MSIE 10")), W
		},
		q = function () {
			function s(t, e) {
				for (var i, s = 0; s < e.length; s++)(i = e[s]).enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
			return function (t, e, i) {
				return e && s(t.prototype, e), i && s(t, i), t
			}
		}(),
		Y = function (t, e, i) {
			return e in t ? Object.defineProperty(t, e, {
				value: i,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : t[e] = i, t
		},
		B = Object.assign || function (t) {
			for (var e, i = 1; i < arguments.length; i++)
				for (var s in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
			return t
		},
		U = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
		Q = U.slice(3),
		K = "flip",
		V = "clockwise",
		X = "counterclockwise",
		Z = function () {
			function o(t, e) {
				var i = this,
					s = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
				(function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				})(this, o), this.scheduleUpdate = function () {
					return requestAnimationFrame(i.update)
				}, this.update = R(this.update.bind(this)), this.options = B({}, o.Defaults, s), this.state = {
					isDestroyed: !1,
					isCreated: !1,
					scrollParents: []
				}, this.reference = t.jquery ? t[0] : t, this.popper = e.jquery ? e[0] : e, this.options.modifiers = {}, Object.keys(B({}, o.Defaults.modifiers, s.modifiers)).forEach(function (t) {
					i.options.modifiers[t] = B({}, o.Defaults.modifiers[t] || {}, s.modifiers ? s.modifiers[t] : {})
				}), this.modifiers = Object.keys(this.options.modifiers).map(function (t) {
					return B({
						name: t
					}, i.options.modifiers[t])
				}).sort(function (t, e) {
					return t.order - e.order
				}), this.modifiers.forEach(function (t) {
					t.enabled && r(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
				}), this.update();
				var n = this.options.eventsEnabled;
				n && this.enableEventListeners(), this.state.eventsEnabled = n
			}
			return q(o, [{
				key: "update",
				value: function () {
					return function () {
						if (!this.state.isDestroyed) {
							var t = {
								instance: this,
								styles: {},
								attributes: {},
								flipped: !1,
								offsets: {}
							};
							t.offsets.reference = l(this.state, this.popper, this.reference), t.placement = a(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.offsets.popper = T(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = "absolute", t = M(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
						}
					}.call(this)
				}
			}, {
				key: "destroy",
				value: function () {
					return function () {
						return this.state.isDestroyed = !0, t(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[F("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
					}.call(this)
				}
			}, {
				key: "enableEventListeners",
				value: function () {
					return function () {
						this.state.eventsEnabled || (this.state = e(this.reference, this.options, this.state, this.scheduleUpdate))
					}.call(this)
				}
			}, {
				key: "disableEventListeners",
				value: function () {
					return i.call(this)
				}
			}]), o
		}();
	return Z.Utils = ("undefined" == typeof window ? global : window).PopperUtils, Z.placements = U, Z.Defaults = {
		placement: "bottom",
		eventsEnabled: !0,
		removeOnDestroy: !1,
		onCreate: function () {},
		onUpdate: function () {},
		modifiers: {
			shift: {
				order: 100,
				enabled: !0,
				fn: function (t) {
					var e = t.placement,
						i = e.split("-")[0],
						s = e.split("-")[1];
					if (s) {
						var n = t.offsets,
							o = n.reference,
							r = n.popper,
							a = -1 !== ["bottom", "top"].indexOf(i),
							l = a ? "left" : "top",
							h = a ? "width" : "height",
							c = {
								start: Y({}, l, o[l]),
								end: Y({}, l, o[l] + o[h] - r[h])
							};
						t.offsets.popper = B({}, r, c[s])
					}
					return t
				}
			},
			offset: {
				order: 200,
				enabled: !0,
				fn: function (t, e) {
					var i, s = e.offset,
						n = t.placement,
						o = t.offsets,
						r = o.popper,
						a = o.reference,
						l = n.split("-")[0];
					return i = p(+s) ? [+s, 0] : m(s, r, a, l), "left" === l ? (r.top += i[0], r.left -= i[1]) : "right" === l ? (r.top += i[0], r.left += i[1]) : "top" === l ? (r.left += i[0], r.top -= i[1]) : "bottom" === l && (r.left += i[0], r.top += i[1]), t.popper = r, t
				},
				offset: 0
			},
			preventOverflow: {
				order: 300,
				enabled: !0,
				fn: function (t, s) {
					var e = s.boundariesElement || w(t.instance.popper);
					t.instance.reference === e && (e = w(e));
					var n = d(t.instance.popper, t.instance.reference, s.padding, e);
					s.boundaries = n;
					var i = s.priority,
						o = t.offsets.popper,
						r = {
							primary: function (t) {
								var e = o[t];
								return o[t] < n[t] && !s.escapeWithReference && (e = O(o[t], n[t])), Y({}, t, e)
							},
							secondary: function (t) {
								var e = "right" === t ? "left" : "top",
									i = o[e];
								return o[t] > n[t] && !s.escapeWithReference && (i = v(o[e], n[t] - ("right" === t ? o.width : o.height))), Y({}, e, i)
							}
						};
					return i.forEach(function (t) {
						var e = -1 === ["left", "top"].indexOf(t) ? "secondary" : "primary";
						o = B({}, o, r[e](t))
					}), t.offsets.popper = o, t
				},
				priority: ["left", "right", "top", "bottom"],
				padding: 5,
				boundariesElement: "scrollParent"
			},
			keepTogether: {
				order: 400,
				enabled: !0,
				fn: function (t) {
					var e = t.offsets,
						i = e.popper,
						s = e.reference,
						n = t.placement.split("-")[0],
						o = P,
						r = -1 !== ["top", "bottom"].indexOf(n),
						a = r ? "right" : "bottom",
						l = r ? "left" : "top",
						h = r ? "width" : "height";
					return i[a] < o(s[l]) && (t.offsets.popper[l] = o(s[l]) - i[h]), i[l] > o(s[a]) && (t.offsets.popper[l] = o(s[a])), t
				}
			},
			arrow: {
				order: 500,
				enabled: !0,
				fn: function (t, e) {
					if (!g(t.instance.modifiers, "arrow", "keepTogether")) return t;
					var i = e.element;
					if ("string" == typeof i) {
						if (!(i = t.instance.popper.querySelector(i))) return t
					} else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
					var s = t.placement.split("-")[0],
						n = t.offsets,
						o = n.popper,
						r = n.reference,
						a = -1 !== ["left", "right"].indexOf(s),
						l = a ? "height" : "width",
						h = a ? "top" : "left",
						c = a ? "left" : "top",
						u = a ? "bottom" : "right",
						d = f(i)[l];
					r[u] - d < o[h] && (t.offsets.popper[h] -= o[h] - (r[u] - d)), r[h] + d > o[u] && (t.offsets.popper[h] += r[h] + d - o[u]);
					var p = r[h] + r[l] / 2 - d / 2 - k(t.offsets.popper)[h];
					return p = O(v(o[l] - d, p), 0), t.arrowElement = i, t.offsets.arrow = {}, t.offsets.arrow[h] = Math.round(p), t.offsets.arrow[c] = "", t
				},
				element: "[x-arrow]"
			},
			flip: {
				order: 600,
				enabled: !0,
				fn: function (f, g) {
					if (t(f.instance.modifiers, "inner")) return f;
					if (f.flipped && f.placement === f.originalPlacement) return f;
					var m = d(f.instance.popper, f.instance.reference, g.padding, g.boundariesElement),
						v = f.placement.split("-")[0],
						_ = E(v),
						b = f.placement.split("-")[1] || "",
						y = [];
					switch (g.behavior) {
						case K:
							y = [v, _];
							break;
						case V:
							y = n(v);
							break;
						case X:
							y = n(v, !0);
							break;
						default:
							y = g.behavior
					}
					return y.forEach(function (t, e) {
						if (v !== t || y.length === e + 1) return f;
						v = f.placement.split("-")[0], _ = E(v);
						var i, s = f.offsets.popper,
							n = f.offsets.reference,
							o = P,
							r = "left" === v && o(s.right) > o(n.left) || "right" === v && o(s.left) < o(n.right) || "top" === v && o(s.bottom) > o(n.top) || "bottom" === v && o(s.top) < o(n.bottom),
							a = o(s.left) < o(m.left),
							l = o(s.right) > o(m.right),
							h = o(s.top) < o(m.top),
							c = o(s.bottom) > o(m.bottom),
							u = "left" === v && a || "right" === v && l || "top" === v && h || "bottom" === v && c,
							d = -1 !== ["top", "bottom"].indexOf(v),
							p = !!g.flipVariations && (d && "start" === b && a || d && "end" === b && l || !d && "start" === b && h || !d && "end" === b && c);
						(r || u || p) && (f.flipped = !0, (r || u) && (v = y[e + 1]), p && (b = "end" === (i = b) ? "start" : "start" === i ? "end" : i), f.placement = v + (b ? "-" + b : ""), f.offsets.popper = B({}, f.offsets.popper, T(f.instance.popper, f.offsets.reference, f.placement)), f = M(f.instance.modifiers, f, "flip"))
					}), f
				},
				behavior: "flip",
				padding: 5,
				boundariesElement: "viewport"
			},
			inner: {
				order: 700,
				enabled: !1,
				fn: function (t) {
					var e = t.placement,
						i = e.split("-")[0],
						s = t.offsets,
						n = s.popper,
						o = s.reference,
						r = -1 !== ["left", "right"].indexOf(i),
						a = -1 === ["top", "left"].indexOf(i);
					return n[r ? "left" : "top"] = o[e] - (a ? n[r ? "width" : "height"] : 0), t.placement = E(e), t.offsets.popper = k(n), t
				}
			},
			hide: {
				order: 800,
				enabled: !0,
				fn: function (t) {
					if (!g(t.instance.modifiers, "hide", "preventOverflow")) return t;
					var e = t.offsets.reference,
						i = A(t.instance.modifiers, function (t) {
							return "preventOverflow" === t.name
						}).boundaries;
					if (e.bottom < i.top || e.left > i.right || e.top > i.bottom || e.right < i.left) {
						if (!0 === t.hide) return t;
						t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
					} else {
						if (!1 === t.hide) return t;
						t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
					}
					return t
				}
			},
			computeStyle: {
				order: 850,
				enabled: !0,
				fn: function (t, e) {
					var i = e.x,
						s = e.y,
						n = t.offsets.popper,
						o = A(t.instance.modifiers, function (t) {
							return "applyStyle" === t.name
						}).gpuAcceleration;
					void 0 !== o && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
					var r, a, l = void 0 === o ? e.gpuAcceleration : o,
						h = I(w(t.instance.popper)),
						c = {
							position: n.position
						},
						u = {
							left: P(n.left),
							top: P(n.top),
							bottom: P(n.bottom),
							right: P(n.right)
						},
						d = "bottom" === i ? "top" : "bottom",
						p = "right" === s ? "left" : "right",
						f = F("transform");
					if (a = "bottom" == d ? -h.height + u.bottom : u.top, r = "right" == p ? -h.width + u.right : u.left, l && f) c[f] = "translate3d(" + r + "px, " + a + "px, 0)", c[d] = 0, c[p] = 0, c.willChange = "transform";
					else {
						var g = "bottom" == d ? -1 : 1,
							m = "right" == p ? -1 : 1;
						c[d] = a * g, c[p] = r * m, c.willChange = d + ", " + p
					}
					var v = {
						"x-placement": t.placement
					};
					return t.attributes = B({}, v, t.attributes), t.styles = B({}, c, t.styles), t
				},
				gpuAcceleration: !0,
				x: "bottom",
				y: "right"
			},
			applyStyle: {
				order: 900,
				enabled: !0,
				fn: function (t) {
					return h(t.instance.popper, t.styles), e = t.instance.popper, i = t.attributes, Object.keys(i).forEach(function (t) {
						!1 === i[t] ? e.removeAttribute(t) : e.setAttribute(t, i[t])
					}), t.offsets.arrow && h(t.arrowElement, t.offsets.arrow), t;
					var e, i
				},
				onLoad: function (t, e, i, s, n) {
					var o = l(0, e, t),
						r = a(i.placement, o, e, t, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
					return e.setAttribute("x-placement", r), h(e, {
						position: "absolute"
					}), i
				},
				gpuAcceleration: void 0
			}
		}
	}, Z
}),
function (t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e(t.bootstrap = {}, t.jQuery, t.Popper)
}(this, function (t, e, c) {
	"use strict";

	function s(t, e) {
		for (var i = 0; i < e.length; i++) {
			var s = e[i];
			s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s)
		}
	}

	function r(t, e, i) {
		return e && s(t.prototype, e), i && s(t, i), t
	}

	function l(n) {
		for (var t = 1; t < arguments.length; t++) {
			var o = null != arguments[t] ? arguments[t] : {},
				e = Object.keys(o);
			"function" == typeof Object.getOwnPropertySymbols && (e = e.concat(Object.getOwnPropertySymbols(o).filter(function (t) {
				return Object.getOwnPropertyDescriptor(o, t).enumerable
			}))), e.forEach(function (t) {
				var e, i, s;
				e = n, s = o[i = t], i in e ? Object.defineProperty(e, i, {
					value: s,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[i] = s
			})
		}
		return n
	}
	e = e && e.hasOwnProperty("default") ? e.default : e, c = c && c.hasOwnProperty("default") ? c.default : c;
	var n, i, o, a, h, u, d, p, f, g, m, v, _, b, y, w, C, x, D, k, I, S, E, T, A, M, F, P, O, N, z, $, H, W, L, R, j, q, Y, B, U, Q, K, V, X, Z, G, J, tt, et, it, st, nt, ot, rt, at, lt, ht, ct, ut, dt, pt, ft, gt, mt, vt, _t, bt, yt, wt, Ct, xt, Dt, kt, It, St, Et, Tt, At, Mt, Ft, Pt, Ot, Nt, zt, $t, Ht, Wt, Lt, Rt, jt, qt, Yt, Bt, Ut, Qt, Kt, Vt, Xt, Zt, Gt, Jt, te, ee, ie, se, ne, oe, re, ae, le, he, ce, ue, de, pe, fe, ge, me, ve, _e, be, ye, we, Ce, xe, De, ke, Ie, Se, Ee, Te, Ae, Me, Fe, Pe, Oe, Ne, ze, $e, He, We, Le, Re, je, qe, Ye, Be, Ue, Qe, Ke, Ve, Xe, Ze, Ge, Je, ti, ei, ii, si, ni, oi, ri, ai, li, hi, ci, ui, di, pi, fi, gi, mi, vi, _i, bi, yi, wi, Ci, xi, Di, ki, Ii, Si, Ei, Ti, Ai, Mi, Fi, Pi, Oi, Ni, zi, $i, Hi, Wi, Li = function (s) {
			var e = "transitionend";

			function t(t) {
				var e = this,
					i = !1;
				return s(this).one(l.TRANSITION_END, function () {
					i = !0
				}), setTimeout(function () {
					i || l.triggerTransitionEnd(e)
				}, t), this
			}
			var l = {
				TRANSITION_END: "bsTransitionEnd",
				getUID: function (t) {
					for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
					return t
				},
				getSelectorFromElement: function (t) {
					var e = t.getAttribute("data-target");
					e && "#" !== e || (e = t.getAttribute("href") || "");
					try {
						return document.querySelector(e) ? e : null
					} catch (t) {
						return null
					}
				},
				getTransitionDurationFromElement: function (t) {
					if (!t) return 0;
					var e = s(t).css("transition-duration");
					return parseFloat(e) ? (e = e.split(",")[0], 1e3 * parseFloat(e)) : 0
				},
				reflow: function (t) {
					return t.offsetHeight
				},
				triggerTransitionEnd: function (t) {
					s(t).trigger(e)
				},
				supportsTransitionEnd: function () {
					return Boolean(e)
				},
				isElement: function (t) {
					return (t[0] || t).nodeType
				},
				typeCheckConfig: function (t, e, i) {
					for (var s in i)
						if (Object.prototype.hasOwnProperty.call(i, s)) {
							var n = i[s],
								o = e[s],
								r = o && l.isElement(o) ? "element" : (a = o, {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
							if (!new RegExp(n).test(r)) throw new Error(t.toUpperCase() + ': Option "' + s + '" provided type "' + r + '" but expected type "' + n + '".')
						} var a
				}
			};
			return s.fn.emulateTransitionEnd = t, s.event.special[l.TRANSITION_END] = {
				bindType: e,
				delegateType: e,
				handle: function (t) {
					if (s(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
				}
			}, l
		}(e),
		Ri = (i = "alert", a = "." + (o = "bs.alert"), h = (n = e).fn[i], u = {
			CLOSE: "close" + a,
			CLOSED: "closed" + a,
			CLICK_DATA_API: "click" + a + ".data-api"
		}, d = "alert", p = "fade", f = "show", g = function () {
			function s(t) {
				this._element = t
			}
			var t = s.prototype;
			return t.close = function (t) {
				var e = this._element;
				t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
			}, t.dispose = function () {
				n.removeData(this._element, o), this._element = null
			}, t._getRootElement = function (t) {
				var e = Li.getSelectorFromElement(t),
					i = !1;
				return e && (i = document.querySelector(e)), i || (i = n(t).closest("." + d)[0]), i
			}, t._triggerCloseEvent = function (t) {
				var e = n.Event(u.CLOSE);
				return n(t).trigger(e), e
			}, t._removeElement = function (e) {
				var i = this;
				if (n(e).removeClass(f), n(e).hasClass(p)) {
					var t = Li.getTransitionDurationFromElement(e);
					n(e).one(Li.TRANSITION_END, function (t) {
						return i._destroyElement(e, t)
					}).emulateTransitionEnd(t)
				} else this._destroyElement(e)
			}, t._destroyElement = function (t) {
				n(t).detach().trigger(u.CLOSED).remove()
			}, s._jQueryInterface = function (i) {
				return this.each(function () {
					var t = n(this),
						e = t.data(o);
					e || (e = new s(this), t.data(o, e)), "close" === i && e[i](this)
				})
			}, s._handleDismiss = function (e) {
				return function (t) {
					t && t.preventDefault(), e.close(this)
				}
			}, r(s, null, [{
				key: "VERSION",
				get: function () {
					return "4.1.3"
				}
			}]), s
		}(), n(document).on(u.CLICK_DATA_API, '[data-dismiss="alert"]', g._handleDismiss(new g)), n.fn[i] = g._jQueryInterface, n.fn[i].Constructor = g, n.fn[i].noConflict = function () {
			return n.fn[i] = h, g._jQueryInterface
		}, g),
		ji = (v = "button", b = "." + (_ = "bs.button"), y = ".data-api", w = (m = e).fn[v], C = "active", x = "btn", k = '[data-toggle^="button"]', I = '[data-toggle="buttons"]', S = "input", E = ".active", T = ".btn", A = {
			CLICK_DATA_API: "click" + b + y,
			FOCUS_BLUR_DATA_API: (D = "focus") + b + y + " blur" + b + y
		}, M = function () {
			function i(t) {
				this._element = t
			}
			var t = i.prototype;
			return t.toggle = function () {
				var t = !0,
					e = !0,
					i = m(this._element).closest(I)[0];
				if (i) {
					var s = this._element.querySelector(S);
					if (s) {
						if ("radio" === s.type)
							if (s.checked && this._element.classList.contains(C)) t = !1;
							else {
								var n = i.querySelector(E);
								n && m(n).removeClass(C)
							} if (t) {
							if (s.hasAttribute("disabled") || i.hasAttribute("disabled") || s.classList.contains("disabled") || i.classList.contains("disabled")) return;
							s.checked = !this._element.classList.contains(C), m(s).trigger("change")
						}
						s.focus(), e = !1
					}
				}
				e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(C)), t && m(this._element).toggleClass(C)
			}, t.dispose = function () {
				m.removeData(this._element, _), this._element = null
			}, i._jQueryInterface = function (e) {
				return this.each(function () {
					var t = m(this).data(_);
					t || (t = new i(this), m(this).data(_, t)), "toggle" === e && t[e]()
				})
			}, r(i, null, [{
				key: "VERSION",
				get: function () {
					return "4.1.3"
				}
			}]), i
		}(), m(document).on(A.CLICK_DATA_API, k, function (t) {
			t.preventDefault();
			var e = t.target;
			m(e).hasClass(x) || (e = m(e).closest(T)), M._jQueryInterface.call(m(e), "toggle")
		}).on(A.FOCUS_BLUR_DATA_API, k, function (t) {
			var e = m(t.target).closest(T)[0];
			m(e).toggleClass(D, /^focus(in)?$/.test(t.type))
		}), m.fn[v] = M._jQueryInterface, m.fn[v].Constructor = M, m.fn[v].noConflict = function () {
			return m.fn[v] = w, M._jQueryInterface
		}, M),
		qi = (P = "carousel", N = "." + (O = "bs.carousel"), z = ".data-api", $ = (F = e).fn[P], H = {
			interval: 5e3,
			keyboard: !0,
			slide: !1,
			pause: "hover",
			wrap: !0
		}, W = {
			interval: "(number|boolean)",
			keyboard: "boolean",
			slide: "(boolean|string)",
			pause: "(string|boolean)",
			wrap: "boolean"
		}, L = "next", R = "prev", j = "left", q = "right", Y = {
			SLIDE: "slide" + N,
			SLID: "slid" + N,
			KEYDOWN: "keydown" + N,
			MOUSEENTER: "mouseenter" + N,
			MOUSELEAVE: "mouseleave" + N,
			TOUCHEND: "touchend" + N,
			LOAD_DATA_API: "load" + N + z,
			CLICK_DATA_API: "click" + N + z
		}, B = "carousel", U = "active", Q = "slide", K = "carousel-item-right", V = "carousel-item-left", X = "carousel-item-next", Z = "carousel-item-prev", G = ".active", J = ".active.carousel-item", tt = ".carousel-item", et = ".carousel-item-next, .carousel-item-prev", it = ".carousel-indicators", st = "[data-slide], [data-slide-to]", nt = '[data-ride="carousel"]', ot = function () {
			function o(t, e) {
				this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(e), this._element = F(t)[0], this._indicatorsElement = this._element.querySelector(it), this._addEventListeners()
			}
			var t = o.prototype;
			return t.next = function () {
				this._isSliding || this._slide(L)
			}, t.nextWhenVisible = function () {
				!document.hidden && F(this._element).is(":visible") && "hidden" !== F(this._element).css("visibility") && this.next()
			}, t.prev = function () {
				this._isSliding || this._slide(R)
			}, t.pause = function (t) {
				t || (this._isPaused = !0), this._element.querySelector(et) && (Li.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
			}, t.cycle = function (t) {
				t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
			}, t.to = function (t) {
				var e = this;
				this._activeElement = this._element.querySelector(J);
				var i = this._getItemIndex(this._activeElement);
				if (!(t > this._items.length - 1 || t < 0))
					if (this._isSliding) F(this._element).one(Y.SLID, function () {
						return e.to(t)
					});
					else {
						if (i === t) return this.pause(), void this.cycle();
						var s = i < t ? L : R;
						this._slide(s, this._items[t])
					}
			}, t.dispose = function () {
				F(this._element).off(N), F.removeData(this._element, O), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
			}, t._getConfig = function (t) {
				return t = l({}, H, t), Li.typeCheckConfig(P, t, W), t
			}, t._addEventListeners = function () {
				var e = this;
				this._config.keyboard && F(this._element).on(Y.KEYDOWN, function (t) {
					return e._keydown(t)
				}), "hover" === this._config.pause && (F(this._element).on(Y.MOUSEENTER, function (t) {
					return e.pause(t)
				}).on(Y.MOUSELEAVE, function (t) {
					return e.cycle(t)
				}), "ontouchstart" in document.documentElement && F(this._element).on(Y.TOUCHEND, function () {
					e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function (t) {
						return e.cycle(t)
					}, 500 + e._config.interval)
				}))
			}, t._keydown = function (t) {
				if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
					case 37:
						t.preventDefault(), this.prev();
						break;
					case 39:
						t.preventDefault(), this.next()
				}
			}, t._getItemIndex = function (t) {
				return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(tt)) : [], this._items.indexOf(t)
			}, t._getItemByDirection = function (t, e) {
				var i = t === L,
					s = t === R,
					n = this._getItemIndex(e),
					o = this._items.length - 1;
				if ((s && 0 === n || i && n === o) && !this._config.wrap) return e;
				var r = (n + (t === R ? -1 : 1)) % this._items.length;
				return -1 === r ? this._items[this._items.length - 1] : this._items[r]
			}, t._triggerSlideEvent = function (t, e) {
				var i = this._getItemIndex(t),
					s = this._getItemIndex(this._element.querySelector(J)),
					n = F.Event(Y.SLIDE, {
						relatedTarget: t,
						direction: e,
						from: s,
						to: i
					});
				return F(this._element).trigger(n), n
			}, t._setActiveIndicatorElement = function (t) {
				if (this._indicatorsElement) {
					var e = [].slice.call(this._indicatorsElement.querySelectorAll(G));
					F(e).removeClass(U);
					var i = this._indicatorsElement.children[this._getItemIndex(t)];
					i && F(i).addClass(U)
				}
			}, t._slide = function (t, e) {
				var i, s, n, o = this,
					r = this._element.querySelector(J),
					a = this._getItemIndex(r),
					l = e || r && this._getItemByDirection(t, r),
					h = this._getItemIndex(l),
					c = Boolean(this._interval);
				if (t === L ? (i = V, s = X, n = j) : (i = K, s = Z, n = q), l && F(l).hasClass(U)) this._isSliding = !1;
				else if (!this._triggerSlideEvent(l, n).isDefaultPrevented() && r && l) {
					this._isSliding = !0, c && this.pause(), this._setActiveIndicatorElement(l);
					var u = F.Event(Y.SLID, {
						relatedTarget: l,
						direction: n,
						from: a,
						to: h
					});
					if (F(this._element).hasClass(Q)) {
						F(l).addClass(s), Li.reflow(l), F(r).addClass(i), F(l).addClass(i);
						var d = Li.getTransitionDurationFromElement(r);
						F(r).one(Li.TRANSITION_END, function () {
							F(l).removeClass(i + " " + s).addClass(U), F(r).removeClass(U + " " + s + " " + i), o._isSliding = !1, setTimeout(function () {
								return F(o._element).trigger(u)
							}, 0)
						}).emulateTransitionEnd(d)
					} else F(r).removeClass(U), F(l).addClass(U), this._isSliding = !1, F(this._element).trigger(u);
					c && this.cycle()
				}
			}, o._jQueryInterface = function (s) {
				return this.each(function () {
					var t = F(this).data(O),
						e = l({}, H, F(this).data());
					"object" == typeof s && (e = l({}, e, s));
					var i = "string" == typeof s ? s : e.slide;
					if (t || (t = new o(this, e), F(this).data(O, t)), "number" == typeof s) t.to(s);
					else if ("string" == typeof i) {
						if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
						t[i]()
					} else e.interval && (t.pause(), t.cycle())
				})
			}, o._dataApiClickHandler = function (t) {
				var e = Li.getSelectorFromElement(this);
				if (e) {
					var i = F(e)[0];
					if (i && F(i).hasClass(B)) {
						var s = l({}, F(i).data(), F(this).data()),
							n = this.getAttribute("data-slide-to");
						n && (s.interval = !1), o._jQueryInterface.call(F(i), s), n && F(i).data(O).to(n), t.preventDefault()
					}
				}
			}, r(o, null, [{
				key: "VERSION",
				get: function () {
					return "4.1.3"
				}
			}, {
				key: "Default",
				get: function () {
					return H
				}
			}]), o
		}(), F(document).on(Y.CLICK_DATA_API, st, ot._dataApiClickHandler), F(window).on(Y.LOAD_DATA_API, function () {
			for (var t = [].slice.call(document.querySelectorAll(nt)), e = 0, i = t.length; e < i; e++) {
				var s = F(t[e]);
				ot._jQueryInterface.call(s, s.data())
			}
		}), F.fn[P] = ot._jQueryInterface, F.fn[P].Constructor = ot, F.fn[P].noConflict = function () {
			return F.fn[P] = $, ot._jQueryInterface
		}, ot),
		Yi = (at = "collapse", ht = "." + (lt = "bs.collapse"), ct = (rt = e).fn[at], ut = {
			toggle: !0,
			parent: ""
		}, dt = {
			toggle: "boolean",
			parent: "(string|element)"
		}, pt = {
			SHOW: "show" + ht,
			SHOWN: "shown" + ht,
			HIDE: "hide" + ht,
			HIDDEN: "hidden" + ht,
			CLICK_DATA_API: "click" + ht + ".data-api"
		}, ft = "show", gt = "collapse", mt = "collapsing", vt = "collapsed", _t = "width", bt = "height", yt = ".show, .collapsing", wt = '[data-toggle="collapse"]', Ct = function () {
			function a(e, t) {
				this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = rt.makeArray(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
				for (var i = [].slice.call(document.querySelectorAll(wt)), s = 0, n = i.length; s < n; s++) {
					var o = i[s],
						r = Li.getSelectorFromElement(o),
						a = [].slice.call(document.querySelectorAll(r)).filter(function (t) {
							return t === e
						});
					null !== r && 0 < a.length && (this._selector = r, this._triggerArray.push(o))
				}
				this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
			}
			var t = a.prototype;
			return t.toggle = function () {
				rt(this._element).hasClass(ft) ? this.hide() : this.show()
			}, t.show = function () {
				var t, e, i = this;
				if (!this._isTransitioning && !rt(this._element).hasClass(ft) && (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(yt)).filter(function (t) {
						return t.getAttribute("data-parent") === i._config.parent
					})).length && (t = null), !(t && (e = rt(t).not(this._selector).data(lt)) && e._isTransitioning))) {
					var s = rt.Event(pt.SHOW);
					if (rt(this._element).trigger(s), !s.isDefaultPrevented()) {
						t && (a._jQueryInterface.call(rt(t).not(this._selector), "hide"), e || rt(t).data(lt, null));
						var n = this._getDimension();
						rt(this._element).removeClass(gt).addClass(mt), this._element.style[n] = 0, this._triggerArray.length && rt(this._triggerArray).removeClass(vt).attr("aria-expanded", !0), this.setTransitioning(!0);
						var o = "scroll" + (n[0].toUpperCase() + n.slice(1)),
							r = Li.getTransitionDurationFromElement(this._element);
						rt(this._element).one(Li.TRANSITION_END, function () {
							rt(i._element).removeClass(mt).addClass(gt).addClass(ft), i._element.style[n] = "", i.setTransitioning(!1), rt(i._element).trigger(pt.SHOWN)
						}).emulateTransitionEnd(r), this._element.style[n] = this._element[o] + "px"
					}
				}
			}, t.hide = function () {
				var t = this;
				if (!this._isTransitioning && rt(this._element).hasClass(ft)) {
					var e = rt.Event(pt.HIDE);
					if (rt(this._element).trigger(e), !e.isDefaultPrevented()) {
						var i = this._getDimension();
						this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", Li.reflow(this._element), rt(this._element).addClass(mt).removeClass(gt).removeClass(ft);
						var s = this._triggerArray.length;
						if (0 < s)
							for (var n = 0; n < s; n++) {
								var o = this._triggerArray[n],
									r = Li.getSelectorFromElement(o);
								if (null !== r) rt([].slice.call(document.querySelectorAll(r))).hasClass(ft) || rt(o).addClass(vt).attr("aria-expanded", !1)
							}
						this.setTransitioning(!0);
						this._element.style[i] = "";
						var a = Li.getTransitionDurationFromElement(this._element);
						rt(this._element).one(Li.TRANSITION_END, function () {
							t.setTransitioning(!1), rt(t._element).removeClass(mt).addClass(gt).trigger(pt.HIDDEN)
						}).emulateTransitionEnd(a)
					}
				}
			}, t.setTransitioning = function (t) {
				this._isTransitioning = t
			}, t.dispose = function () {
				rt.removeData(this._element, lt), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
			}, t._getConfig = function (t) {
				return (t = l({}, ut, t)).toggle = Boolean(t.toggle), Li.typeCheckConfig(at, t, dt), t
			}, t._getDimension = function () {
				return rt(this._element).hasClass(_t) ? _t : bt
			}, t._getParent = function () {
				var i = this,
					t = null;
				Li.isElement(this._config.parent) ? (t = this._config.parent, void 0 !== this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
				var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
					s = [].slice.call(t.querySelectorAll(e));
				return rt(s).each(function (t, e) {
					i._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e])
				}), t
			}, t._addAriaAndCollapsedClass = function (t, e) {
				if (t) {
					var i = rt(t).hasClass(ft);
					e.length && rt(e).toggleClass(vt, !i).attr("aria-expanded", i)
				}
			}, a._getTargetFromElement = function (t) {
				var e = Li.getSelectorFromElement(t);
				return e ? document.querySelector(e) : null
			}, a._jQueryInterface = function (s) {
				return this.each(function () {
					var t = rt(this),
						e = t.data(lt),
						i = l({}, ut, t.data(), "object" == typeof s && s ? s : {});
					if (!e && i.toggle && /show|hide/.test(s) && (i.toggle = !1), e || (e = new a(this, i), t.data(lt, e)), "string" == typeof s) {
						if (void 0 === e[s]) throw new TypeError('No method named "' + s + '"');
						e[s]()
					}
				})
			}, r(a, null, [{
				key: "VERSION",
				get: function () {
					return "4.1.3"
				}
			}, {
				key: "Default",
				get: function () {
					return ut
				}
			}]), a
		}(), rt(document).on(pt.CLICK_DATA_API, wt, function (t) {
			"A" === t.currentTarget.tagName && t.preventDefault();
			var i = rt(this),
				e = Li.getSelectorFromElement(this),
				s = [].slice.call(document.querySelectorAll(e));
			rt(s).each(function () {
				var t = rt(this),
					e = t.data(lt) ? "toggle" : i.data();
				Ct._jQueryInterface.call(t, e)
			})
		}), rt.fn[at] = Ct._jQueryInterface, rt.fn[at].Constructor = Ct, rt.fn[at].noConflict = function () {
			return rt.fn[at] = ct, Ct._jQueryInterface
		}, Ct),
		Bi = (Dt = "dropdown", It = "." + (kt = "bs.dropdown"), St = ".data-api", Et = (xt = e).fn[Dt], Tt = new RegExp("38|40|27"), At = {
			HIDE: "hide" + It,
			HIDDEN: "hidden" + It,
			SHOW: "show" + It,
			SHOWN: "shown" + It,
			CLICK: "click" + It,
			CLICK_DATA_API: "click" + It + St,
			KEYDOWN_DATA_API: "keydown" + It + St,
			KEYUP_DATA_API: "keyup" + It + St
		}, Mt = "disabled", Ft = "show", Pt = "dropup", Ot = "dropright", Nt = "dropleft", zt = "dropdown-menu-right", $t = "position-static", Ht = '[data-toggle="dropdown"]', Wt = ".dropdown form", Lt = ".dropdown-menu", Rt = ".navbar-nav", jt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", qt = "top-start", Yt = "top-end", Bt = "bottom-start", Ut = "bottom-end", Qt = "right-start", Kt = "left-start", Vt = {
			offset: 0,
			flip: !0,
			boundary: "scrollParent",
			reference: "toggle",
			display: "dynamic"
		}, Xt = {
			offset: "(number|string|function)",
			flip: "boolean",
			boundary: "(string|element)",
			reference: "(string|element)",
			display: "string"
		}, Zt = function () {
			function h(t, e) {
				this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
			}
			var t = h.prototype;
			return t.toggle = function () {
				if (!this._element.disabled && !xt(this._element).hasClass(Mt)) {
					var t = h._getParentFromElement(this._element),
						e = xt(this._menu).hasClass(Ft);
					if (h._clearMenus(), !e) {
						var i = {
								relatedTarget: this._element
							},
							s = xt.Event(At.SHOW, i);
						if (xt(t).trigger(s), !s.isDefaultPrevented()) {
							if (!this._inNavbar) {
								if (void 0 === c) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
								var n = this._element;
								"parent" === this._config.reference ? n = t : Li.isElement(this._config.reference) && (n = this._config.reference, void 0 !== this._config.reference.jquery && (n = this._config.reference[0])), "scrollParent" !== this._config.boundary && xt(t).addClass($t), this._popper = new c(n, this._menu, this._getPopperConfig())
							}
							"ontouchstart" in document.documentElement && 0 === xt(t).closest(Rt).length && xt(document.body).children().on("mouseover", null, xt.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), xt(this._menu).toggleClass(Ft), xt(t).toggleClass(Ft).trigger(xt.Event(At.SHOWN, i))
						}
					}
				}
			}, t.dispose = function () {
				xt.removeData(this._element, kt), xt(this._element).off(It), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
			}, t.update = function () {
				this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
			}, t._addEventListeners = function () {
				var e = this;
				xt(this._element).on(At.CLICK, function (t) {
					t.preventDefault(), t.stopPropagation(), e.toggle()
				})
			}, t._getConfig = function (t) {
				return t = l({}, this.constructor.Default, xt(this._element).data(), t), Li.typeCheckConfig(Dt, t, this.constructor.DefaultType), t
			}, t._getMenuElement = function () {
				if (!this._menu) {
					var t = h._getParentFromElement(this._element);
					t && (this._menu = t.querySelector(Lt))
				}
				return this._menu
			}, t._getPlacement = function () {
				var t = xt(this._element.parentNode),
					e = Bt;
				return t.hasClass(Pt) ? (e = qt, xt(this._menu).hasClass(zt) && (e = Yt)) : t.hasClass(Ot) ? e = Qt : t.hasClass(Nt) ? e = Kt : xt(this._menu).hasClass(zt) && (e = Ut), e
			}, t._detectNavbar = function () {
				return 0 < xt(this._element).closest(".navbar").length
			}, t._getPopperConfig = function () {
				var e = this,
					t = {};
				"function" == typeof this._config.offset ? t.fn = function (t) {
					return t.offsets = l({}, t.offsets, e._config.offset(t.offsets) || {}), t
				} : t.offset = this._config.offset;
				var i = {
					placement: this._getPlacement(),
					modifiers: {
						offset: t,
						flip: {
							enabled: this._config.flip
						},
						preventOverflow: {
							boundariesElement: this._config.boundary
						}
					}
				};
				return "static" === this._config.display && (i.modifiers.applyStyle = {
					enabled: !1
				}), i
			}, h._jQueryInterface = function (e) {
				return this.each(function () {
					var t = xt(this).data(kt);
					if (t || (t = new h(this, "object" == typeof e ? e : null), xt(this).data(kt, t)), "string" == typeof e) {
						if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
						t[e]()
					}
				})
			}, h._clearMenus = function (t) {
				if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
					for (var e = [].slice.call(document.querySelectorAll(Ht)), i = 0, s = e.length; i < s; i++) {
						var n = h._getParentFromElement(e[i]),
							o = xt(e[i]).data(kt),
							r = {
								relatedTarget: e[i]
							};
						if (t && "click" === t.type && (r.clickEvent = t), o) {
							var a = o._menu;
							if (xt(n).hasClass(Ft) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && xt.contains(n, t.target))) {
								var l = xt.Event(At.HIDE, r);
								xt(n).trigger(l), l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && xt(document.body).children().off("mouseover", null, xt.noop), e[i].setAttribute("aria-expanded", "false"), xt(a).removeClass(Ft), xt(n).removeClass(Ft).trigger(xt.Event(At.HIDDEN, r)))
							}
						}
					}
			}, h._getParentFromElement = function (t) {
				var e, i = Li.getSelectorFromElement(t);
				return i && (e = document.querySelector(i)), e || t.parentNode
			}, h._dataApiKeydownHandler = function (t) {
				if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || xt(t.target).closest(Lt).length)) : Tt.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !xt(this).hasClass(Mt))) {
					var e = h._getParentFromElement(this),
						i = xt(e).hasClass(Ft);
					if ((i || 27 === t.which && 32 === t.which) && (!i || 27 !== t.which && 32 !== t.which)) {
						var s = [].slice.call(e.querySelectorAll(jt));
						if (0 !== s.length) {
							var n = s.indexOf(t.target);
							38 === t.which && 0 < n && n--, 40 === t.which && n < s.length - 1 && n++, n < 0 && (n = 0), s[n].focus()
						}
					} else {
						if (27 === t.which) {
							var o = e.querySelector(Ht);
							xt(o).trigger("focus")
						}
						xt(this).trigger("click")
					}
				}
			}, r(h, null, [{
				key: "VERSION",
				get: function () {
					return "4.1.3"
				}
			}, {
				key: "Default",
				get: function () {
					return Vt
				}
			}, {
				key: "DefaultType",
				get: function () {
					return Xt
				}
			}]), h
		}(), xt(document).on(At.KEYDOWN_DATA_API, Ht, Zt._dataApiKeydownHandler).on(At.KEYDOWN_DATA_API, Lt, Zt._dataApiKeydownHandler).on(At.CLICK_DATA_API + " " + At.KEYUP_DATA_API, Zt._clearMenus).on(At.CLICK_DATA_API, Ht, function (t) {
			t.preventDefault(), t.stopPropagation(), Zt._jQueryInterface.call(xt(this), "toggle")
		}).on(At.CLICK_DATA_API, Wt, function (t) {
			t.stopPropagation()
		}), xt.fn[Dt] = Zt._jQueryInterface, xt.fn[Dt].Constructor = Zt, xt.fn[Dt].noConflict = function () {
			return xt.fn[Dt] = Et, Zt._jQueryInterface
		}, Zt),
		Ui = (Jt = "modal", ee = "." + (te = "bs.modal"), ie = (Gt = e).fn[Jt], se = {
			backdrop: !0,
			keyboard: !0,
			focus: !0,
			show: !0
		}, ne = {
			backdrop: "(boolean|string)",
			keyboard: "boolean",
			focus: "boolean",
			show: "boolean"
		}, oe = {
			HIDE: "hide" + ee,
			HIDDEN: "hidden" + ee,
			SHOW: "show" + ee,
			SHOWN: "shown" + ee,
			FOCUSIN: "focusin" + ee,
			RESIZE: "resize" + ee,
			CLICK_DISMISS: "click.dismiss" + ee,
			KEYDOWN_DISMISS: "keydown.dismiss" + ee,
			MOUSEUP_DISMISS: "mouseup.dismiss" + ee,
			MOUSEDOWN_DISMISS: "mousedown.dismiss" + ee,
			CLICK_DATA_API: "click" + ee + ".data-api"
		}, re = "modal-scrollbar-measure", ae = "modal-backdrop", le = "modal-open", he = "fade", ce = "show", ue = ".modal-dialog", de = '[data-toggle="modal"]', pe = '[data-dismiss="modal"]', fe = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", ge = ".sticky-top", me = function () {
			function n(t, e) {
				this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(ue), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._scrollbarWidth = 0
			}
			var t = n.prototype;
			return t.toggle = function (t) {
				return this._isShown ? this.hide() : this.show(t)
			}, t.show = function (t) {
				var e = this;
				if (!this._isTransitioning && !this._isShown) {
					Gt(this._element).hasClass(he) && (this._isTransitioning = !0);
					var i = Gt.Event(oe.SHOW, {
						relatedTarget: t
					});
					Gt(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), Gt(document.body).addClass(le), this._setEscapeEvent(), this._setResizeEvent(), Gt(this._element).on(oe.CLICK_DISMISS, pe, function (t) {
						return e.hide(t)
					}), Gt(this._dialog).on(oe.MOUSEDOWN_DISMISS, function () {
						Gt(e._element).one(oe.MOUSEUP_DISMISS, function (t) {
							Gt(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
						})
					}), this._showBackdrop(function () {
						return e._showElement(t)
					}))
				}
			}, t.hide = function (t) {
				var e = this;
				if (t && t.preventDefault(), !this._isTransitioning && this._isShown) {
					var i = Gt.Event(oe.HIDE);
					if (Gt(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
						this._isShown = !1;
						var s = Gt(this._element).hasClass(he);
						if (s && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), Gt(document).off(oe.FOCUSIN), Gt(this._element).removeClass(ce), Gt(this._element).off(oe.CLICK_DISMISS), Gt(this._dialog).off(oe.MOUSEDOWN_DISMISS), s) {
							var n = Li.getTransitionDurationFromElement(this._element);
							Gt(this._element).one(Li.TRANSITION_END, function (t) {
								return e._hideModal(t)
							}).emulateTransitionEnd(n)
						} else this._hideModal()
					}
				}
			}, t.dispose = function () {
				Gt.removeData(this._element, te), Gt(window, document, this._element, this._backdrop).off(ee), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
			}, t.handleUpdate = function () {
				this._adjustDialog()
			}, t._getConfig = function (t) {
				return t = l({}, se, t), Li.typeCheckConfig(Jt, t, ne), t
			}, t._showElement = function (t) {
				var e = this,
					i = Gt(this._element).hasClass(he);
				this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && Li.reflow(this._element), Gt(this._element).addClass(ce), this._config.focus && this._enforceFocus();
				var s = Gt.Event(oe.SHOWN, {
						relatedTarget: t
					}),
					n = function () {
						e._config.focus && e._element.focus(), e._isTransitioning = !1, Gt(e._element).trigger(s)
					};
				if (i) {
					var o = Li.getTransitionDurationFromElement(this._element);
					Gt(this._dialog).one(Li.TRANSITION_END, n).emulateTransitionEnd(o)
				} else n()
			}, t._enforceFocus = function () {
				var e = this;
				Gt(document).off(oe.FOCUSIN).on(oe.FOCUSIN, function (t) {
					document !== t.target && e._element !== t.target && 0 === Gt(e._element).has(t.target).length && e._element.focus()
				})
			}, t._setEscapeEvent = function () {
				var e = this;
				this._isShown && this._config.keyboard ? Gt(this._element).on(oe.KEYDOWN_DISMISS, function (t) {
					27 === t.which && (t.preventDefault(), e.hide())
				}) : this._isShown || Gt(this._element).off(oe.KEYDOWN_DISMISS)
			}, t._setResizeEvent = function () {
				var e = this;
				this._isShown ? Gt(window).on(oe.RESIZE, function (t) {
					return e.handleUpdate(t)
				}) : Gt(window).off(oe.RESIZE)
			}, t._hideModal = function () {
				var t = this;
				this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function () {
					Gt(document.body).removeClass(le), t._resetAdjustments(), t._resetScrollbar(), Gt(t._element).trigger(oe.HIDDEN)
				})
			}, t._removeBackdrop = function () {
				this._backdrop && (Gt(this._backdrop).remove(), this._backdrop = null)
			}, t._showBackdrop = function (t) {
				var e = this,
					i = Gt(this._element).hasClass(he) ? he : "";
				if (this._isShown && this._config.backdrop) {
					if (this._backdrop = document.createElement("div"), this._backdrop.className = ae, i && this._backdrop.classList.add(i), Gt(this._backdrop).appendTo(document.body), Gt(this._element).on(oe.CLICK_DISMISS, function (t) {
							e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
						}), i && Li.reflow(this._backdrop), Gt(this._backdrop).addClass(ce), !t) return;
					if (!i) return void t();
					var s = Li.getTransitionDurationFromElement(this._backdrop);
					Gt(this._backdrop).one(Li.TRANSITION_END, t).emulateTransitionEnd(s)
				} else if (!this._isShown && this._backdrop) {
					Gt(this._backdrop).removeClass(ce);
					var n = function () {
						e._removeBackdrop(), t && t()
					};
					if (Gt(this._element).hasClass(he)) {
						var o = Li.getTransitionDurationFromElement(this._backdrop);
						Gt(this._backdrop).one(Li.TRANSITION_END, n).emulateTransitionEnd(o)
					} else n()
				} else t && t()
			}, t._adjustDialog = function () {
				var t = this._element.scrollHeight > document.documentElement.clientHeight;
				!this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
			}, t._resetAdjustments = function () {
				this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
			}, t._checkScrollbar = function () {
				var t = document.body.getBoundingClientRect();
				this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
			}, t._setScrollbar = function () {
				var n = this;
				if (this._isBodyOverflowing) {
					var t = [].slice.call(document.querySelectorAll(fe)),
						e = [].slice.call(document.querySelectorAll(ge));
					Gt(t).each(function (t, e) {
						var i = e.style.paddingRight,
							s = Gt(e).css("padding-right");
						Gt(e).data("padding-right", i).css("padding-right", parseFloat(s) + n._scrollbarWidth + "px")
					}), Gt(e).each(function (t, e) {
						var i = e.style.marginRight,
							s = Gt(e).css("margin-right");
						Gt(e).data("margin-right", i).css("margin-right", parseFloat(s) - n._scrollbarWidth + "px")
					});
					var i = document.body.style.paddingRight,
						s = Gt(document.body).css("padding-right");
					Gt(document.body).data("padding-right", i).css("padding-right", parseFloat(s) + this._scrollbarWidth + "px")
				}
			}, t._resetScrollbar = function () {
				var t = [].slice.call(document.querySelectorAll(fe));
				Gt(t).each(function (t, e) {
					var i = Gt(e).data("padding-right");
					Gt(e).removeData("padding-right"), e.style.paddingRight = i || ""
				});
				var e = [].slice.call(document.querySelectorAll("" + ge));
				Gt(e).each(function (t, e) {
					var i = Gt(e).data("margin-right");
					void 0 !== i && Gt(e).css("margin-right", i).removeData("margin-right")
				});
				var i = Gt(document.body).data("padding-right");
				Gt(document.body).removeData("padding-right"), document.body.style.paddingRight = i || ""
			}, t._getScrollbarWidth = function () {
				var t = document.createElement("div");
				t.className = re, document.body.appendChild(t);
				var e = t.getBoundingClientRect().width - t.clientWidth;
				return document.body.removeChild(t), e
			}, n._jQueryInterface = function (i, s) {
				return this.each(function () {
					var t = Gt(this).data(te),
						e = l({}, se, Gt(this).data(), "object" == typeof i && i ? i : {});
					if (t || (t = new n(this, e), Gt(this).data(te, t)), "string" == typeof i) {
						if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
						t[i](s)
					} else e.show && t.show(s)
				})
			}, r(n, null, [{
				key: "VERSION",
				get: function () {
					return "4.1.3"
				}
			}, {
				key: "Default",
				get: function () {
					return se
				}
			}]), n
		}(), Gt(document).on(oe.CLICK_DATA_API, de, function (t) {
			var e, i = this,
				s = Li.getSelectorFromElement(this);
			s && (e = document.querySelector(s));
			var n = Gt(e).data(te) ? "toggle" : l({}, Gt(e).data(), Gt(this).data());
			"A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
			var o = Gt(e).one(oe.SHOW, function (t) {
				t.isDefaultPrevented() || o.one(oe.HIDDEN, function () {
					Gt(i).is(":visible") && i.focus()
				})
			});
			me._jQueryInterface.call(Gt(e), n, this)
		}), Gt.fn[Jt] = me._jQueryInterface, Gt.fn[Jt].Constructor = me, Gt.fn[Jt].noConflict = function () {
			return Gt.fn[Jt] = ie, me._jQueryInterface
		}, me),
		Qi = (_e = "tooltip", ye = "." + (be = "bs.tooltip"), we = (ve = e).fn[_e], Ce = "bs-tooltip", xe = new RegExp("(^|\\s)" + Ce + "\\S+", "g"), Ie = {
			animation: !0,
			template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
			trigger: "hover focus",
			title: "",
			delay: 0,
			html: !(ke = {
				AUTO: "auto",
				TOP: "top",
				RIGHT: "right",
				BOTTOM: "bottom",
				LEFT: "left"
			}),
			selector: !(De = {
				animation: "boolean",
				template: "string",
				title: "(string|element|function)",
				trigger: "string",
				delay: "(number|object)",
				html: "boolean",
				selector: "(string|boolean)",
				placement: "(string|function)",
				offset: "(number|string)",
				container: "(string|element|boolean)",
				fallbackPlacement: "(string|array)",
				boundary: "(string|element)"
			}),
			placement: "top",
			offset: 0,
			container: !1,
			fallbackPlacement: "flip",
			boundary: "scrollParent"
		}, Ee = "out", Te = {
			HIDE: "hide" + ye,
			HIDDEN: "hidden" + ye,
			SHOW: (Se = "show") + ye,
			SHOWN: "shown" + ye,
			INSERTED: "inserted" + ye,
			CLICK: "click" + ye,
			FOCUSIN: "focusin" + ye,
			FOCUSOUT: "focusout" + ye,
			MOUSEENTER: "mouseenter" + ye,
			MOUSELEAVE: "mouseleave" + ye
		}, Ae = "fade", Me = "show", Fe = ".tooltip-inner", Pe = ".arrow", Oe = "hover", Ne = "focus", ze = "click", $e = "manual", He = function () {
			function s(t, e) {
				if (void 0 === c) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
				this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
			}
			var t = s.prototype;
			return t.enable = function () {
				this._isEnabled = !0
			}, t.disable = function () {
				this._isEnabled = !1
			}, t.toggleEnabled = function () {
				this._isEnabled = !this._isEnabled
			}, t.toggle = function (t) {
				if (this._isEnabled)
					if (t) {
						var e = this.constructor.DATA_KEY,
							i = ve(t.currentTarget).data(e);
						i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), ve(t.currentTarget).data(e, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
					} else {
						if (ve(this.getTipElement()).hasClass(Me)) return void this._leave(null, this);
						this._enter(null, this)
					}
			}, t.dispose = function () {
				clearTimeout(this._timeout), ve.removeData(this.element, this.constructor.DATA_KEY), ve(this.element).off(this.constructor.EVENT_KEY), ve(this.element).closest(".modal").off("hide.bs.modal"), this.tip && ve(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
			}, t.show = function () {
				var e = this;
				if ("none" === ve(this.element).css("display")) throw new Error("Please use show on visible elements");
				var t = ve.Event(this.constructor.Event.SHOW);
				if (this.isWithContent() && this._isEnabled) {
					ve(this.element).trigger(t);
					var i = ve.contains(this.element.ownerDocument.documentElement, this.element);
					if (t.isDefaultPrevented() || !i) return;
					var s = this.getTipElement(),
						n = Li.getUID(this.constructor.NAME);
					s.setAttribute("id", n), this.element.setAttribute("aria-describedby", n), this.setContent(), this.config.animation && ve(s).addClass(Ae);
					var o = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement,
						r = this._getAttachment(o);
					this.addAttachmentClass(r);
					var a = !1 === this.config.container ? document.body : ve(document).find(this.config.container);
					ve(s).data(this.constructor.DATA_KEY, this), ve.contains(this.element.ownerDocument.documentElement, this.tip) || ve(s).appendTo(a), ve(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new c(this.element, s, {
						placement: r,
						modifiers: {
							offset: {
								offset: this.config.offset
							},
							flip: {
								behavior: this.config.fallbackPlacement
							},
							arrow: {
								element: Pe
							},
							preventOverflow: {
								boundariesElement: this.config.boundary
							}
						},
						onCreate: function (t) {
							t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
						},
						onUpdate: function (t) {
							e._handlePopperPlacementChange(t)
						}
					}), ve(s).addClass(Me), "ontouchstart" in document.documentElement && ve(document.body).children().on("mouseover", null, ve.noop);
					var l = function () {
						e.config.animation && e._fixTransition();
						var t = e._hoverState;
						e._hoverState = null, ve(e.element).trigger(e.constructor.Event.SHOWN), t === Ee && e._leave(null, e)
					};
					if (ve(this.tip).hasClass(Ae)) {
						var h = Li.getTransitionDurationFromElement(this.tip);
						ve(this.tip).one(Li.TRANSITION_END, l).emulateTransitionEnd(h)
					} else l()
				}
			}, t.hide = function (t) {
				var e = this,
					i = this.getTipElement(),
					s = ve.Event(this.constructor.Event.HIDE),
					n = function () {
						e._hoverState !== Se && i.parentNode && i.parentNode.removeChild(i), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), ve(e.element).trigger(e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t()
					};
				if (ve(this.element).trigger(s), !s.isDefaultPrevented()) {
					if (ve(i).removeClass(Me), "ontouchstart" in document.documentElement && ve(document.body).children().off("mouseover", null, ve.noop), this._activeTrigger[ze] = !1, this._activeTrigger[Ne] = !1, this._activeTrigger[Oe] = !1, ve(this.tip).hasClass(Ae)) {
						var o = Li.getTransitionDurationFromElement(i);
						ve(i).one(Li.TRANSITION_END, n).emulateTransitionEnd(o)
					} else n();
					this._hoverState = ""
				}
			}, t.update = function () {
				null !== this._popper && this._popper.scheduleUpdate()
			}, t.isWithContent = function () {
				return Boolean(this.getTitle())
			}, t.addAttachmentClass = function (t) {
				ve(this.getTipElement()).addClass(Ce + "-" + t)
			}, t.getTipElement = function () {
				return this.tip = this.tip || ve(this.config.template)[0], this.tip
			}, t.setContent = function () {
				var t = this.getTipElement();
				this.setElementContent(ve(t.querySelectorAll(Fe)), this.getTitle()), ve(t).removeClass(Ae + " " + Me)
			}, t.setElementContent = function (t, e) {
				var i = this.config.html;
				"object" == typeof e && (e.nodeType || e.jquery) ? i ? ve(e).parent().is(t) || t.empty().append(e) : t.text(ve(e).text()) : t[i ? "html" : "text"](e)
			}, t.getTitle = function () {
				var t = this.element.getAttribute("data-original-title");
				return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
			}, t._getAttachment = function (t) {
				return ke[t.toUpperCase()]
			}, t._setListeners = function () {
				var s = this;
				this.config.trigger.split(" ").forEach(function (t) {
					if ("click" === t) ve(s.element).on(s.constructor.Event.CLICK, s.config.selector, function (t) {
						return s.toggle(t)
					});
					else if (t !== $e) {
						var e = t === Oe ? s.constructor.Event.MOUSEENTER : s.constructor.Event.FOCUSIN,
							i = t === Oe ? s.constructor.Event.MOUSELEAVE : s.constructor.Event.FOCUSOUT;
						ve(s.element).on(e, s.config.selector, function (t) {
							return s._enter(t)
						}).on(i, s.config.selector, function (t) {
							return s._leave(t)
						})
					}
					ve(s.element).closest(".modal").on("hide.bs.modal", function () {
						return s.hide()
					})
				}), this.config.selector ? this.config = l({}, this.config, {
					trigger: "manual",
					selector: ""
				}) : this._fixTitle()
			}, t._fixTitle = function () {
				var t = typeof this.element.getAttribute("data-original-title");
				(this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
			}, t._enter = function (t, e) {
				var i = this.constructor.DATA_KEY;
				(e = e || ve(t.currentTarget).data(i)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), ve(t.currentTarget).data(i, e)), t && (e._activeTrigger["focusin" === t.type ? Ne : Oe] = !0), ve(e.getTipElement()).hasClass(Me) || e._hoverState === Se ? e._hoverState = Se : (clearTimeout(e._timeout), e._hoverState = Se, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function () {
					e._hoverState === Se && e.show()
				}, e.config.delay.show) : e.show())
			}, t._leave = function (t, e) {
				var i = this.constructor.DATA_KEY;
				(e = e || ve(t.currentTarget).data(i)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), ve(t.currentTarget).data(i, e)), t && (e._activeTrigger["focusout" === t.type ? Ne : Oe] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = Ee, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function () {
					e._hoverState === Ee && e.hide()
				}, e.config.delay.hide) : e.hide())
			}, t._isWithActiveTrigger = function () {
				for (var t in this._activeTrigger)
					if (this._activeTrigger[t]) return !0;
				return !1
			}, t._getConfig = function (t) {
				return "number" == typeof (t = l({}, this.constructor.Default, ve(this.element).data(), "object" == typeof t && t ? t : {})).delay && (t.delay = {
					show: t.delay,
					hide: t.delay
				}), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), Li.typeCheckConfig(_e, t, this.constructor.DefaultType), t
			}, t._getDelegateConfig = function () {
				var t = {};
				if (this.config)
					for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
				return t
			}, t._cleanTipClass = function () {
				var t = ve(this.getTipElement()),
					e = t.attr("class").match(xe);
				null !== e && e.length && t.removeClass(e.join(""))
			}, t._handlePopperPlacementChange = function (t) {
				var e = t.instance;
				this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
			}, t._fixTransition = function () {
				var t = this.getTipElement(),
					e = this.config.animation;
				null === t.getAttribute("x-placement") && (ve(t).removeClass(Ae), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
			}, s._jQueryInterface = function (i) {
				return this.each(function () {
					var t = ve(this).data(be),
						e = "object" == typeof i && i;
					if ((t || !/dispose|hide/.test(i)) && (t || (t = new s(this, e), ve(this).data(be, t)), "string" == typeof i)) {
						if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
						t[i]()
					}
				})
			}, r(s, null, [{
				key: "VERSION",
				get: function () {
					return "4.1.3"
				}
			}, {
				key: "Default",
				get: function () {
					return Ie
				}
			}, {
				key: "NAME",
				get: function () {
					return _e
				}
			}, {
				key: "DATA_KEY",
				get: function () {
					return be
				}
			}, {
				key: "Event",
				get: function () {
					return Te
				}
			}, {
				key: "EVENT_KEY",
				get: function () {
					return ye
				}
			}, {
				key: "DefaultType",
				get: function () {
					return De
				}
			}]), s
		}(), ve.fn[_e] = He._jQueryInterface, ve.fn[_e].Constructor = He, ve.fn[_e].noConflict = function () {
			return ve.fn[_e] = we, He._jQueryInterface
		}, He),
		Ki = (Le = "popover", je = "." + (Re = "bs.popover"), qe = (We = e).fn[Le], Ye = "bs-popover", Be = new RegExp("(^|\\s)" + Ye + "\\S+", "g"), Ue = l({}, Qi.Default, {
			placement: "right",
			trigger: "click",
			content: "",
			template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
		}), Qe = l({}, Qi.DefaultType, {
			content: "(string|element|function)"
		}), Ke = "fade", Xe = ".popover-header", Ze = ".popover-body", Ge = {
			HIDE: "hide" + je,
			HIDDEN: "hidden" + je,
			SHOW: (Ve = "show") + je,
			SHOWN: "shown" + je,
			INSERTED: "inserted" + je,
			CLICK: "click" + je,
			FOCUSIN: "focusin" + je,
			FOCUSOUT: "focusout" + je,
			MOUSEENTER: "mouseenter" + je,
			MOUSELEAVE: "mouseleave" + je
		}, Je = function (t) {
			var e, i;

			function s() {
				return t.apply(this, arguments) || this
			}
			i = t, (e = s).prototype = Object.create(i.prototype), (e.prototype.constructor = e).__proto__ = i;
			var n = s.prototype;
			return n.isWithContent = function () {
				return this.getTitle() || this._getContent()
			}, n.addAttachmentClass = function (t) {
				We(this.getTipElement()).addClass(Ye + "-" + t)
			}, n.getTipElement = function () {
				return this.tip = this.tip || We(this.config.template)[0], this.tip
			}, n.setContent = function () {
				var t = We(this.getTipElement());
				this.setElementContent(t.find(Xe), this.getTitle());
				var e = this._getContent();
				"function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(Ze), e), t.removeClass(Ke + " " + Ve)
			}, n._getContent = function () {
				return this.element.getAttribute("data-content") || this.config.content
			}, n._cleanTipClass = function () {
				var t = We(this.getTipElement()),
					e = t.attr("class").match(Be);
				null !== e && 0 < e.length && t.removeClass(e.join(""))
			}, s._jQueryInterface = function (i) {
				return this.each(function () {
					var t = We(this).data(Re),
						e = "object" == typeof i ? i : null;
					if ((t || !/destroy|hide/.test(i)) && (t || (t = new s(this, e), We(this).data(Re, t)), "string" == typeof i)) {
						if (void 0 === t[i]) throw new TypeError('No method named "' + i + '"');
						t[i]()
					}
				})
			}, r(s, null, [{
				key: "VERSION",
				get: function () {
					return "4.1.3"
				}
			}, {
				key: "Default",
				get: function () {
					return Ue
				}
			}, {
				key: "NAME",
				get: function () {
					return Le
				}
			}, {
				key: "DATA_KEY",
				get: function () {
					return Re
				}
			}, {
				key: "Event",
				get: function () {
					return Ge
				}
			}, {
				key: "EVENT_KEY",
				get: function () {
					return je
				}
			}, {
				key: "DefaultType",
				get: function () {
					return Qe
				}
			}]), s
		}(Qi), We.fn[Le] = Je._jQueryInterface, We.fn[Le].Constructor = Je, We.fn[Le].noConflict = function () {
			return We.fn[Le] = qe, Je._jQueryInterface
		}, Je),
		Vi = (ei = "scrollspy", si = "." + (ii = "bs.scrollspy"), ni = (ti = e).fn[ei], oi = {
			offset: 10,
			method: "auto",
			target: ""
		}, ri = {
			offset: "number",
			method: "string",
			target: "(string|element)"
		}, ai = {
			ACTIVATE: "activate" + si,
			SCROLL: "scroll" + si,
			LOAD_DATA_API: "load" + si + ".data-api"
		}, li = "dropdown-item", hi = "active", ci = '[data-spy="scroll"]', ui = ".active", di = ".nav, .list-group", pi = ".nav-link", fi = ".nav-item", gi = ".list-group-item", mi = ".dropdown", vi = ".dropdown-item", _i = ".dropdown-toggle", bi = "offset", yi = "position", wi = function () {
			function i(t, e) {
				var i = this;
				this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + pi + "," + this._config.target + " " + gi + "," + this._config.target + " " + vi, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, ti(this._scrollElement).on(ai.SCROLL, function (t) {
					return i._process(t)
				}), this.refresh(), this._process()
			}
			var t = i.prototype;
			return t.refresh = function () {
				var e = this,
					t = this._scrollElement === this._scrollElement.window ? bi : yi,
					n = "auto" === this._config.method ? t : this._config.method,
					o = n === yi ? this._getScrollTop() : 0;
				this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function (t) {
					var e, i = Li.getSelectorFromElement(t);
					if (i && (e = document.querySelector(i)), e) {
						var s = e.getBoundingClientRect();
						if (s.width || s.height) return [ti(e)[n]().top + o, i]
					}
					return null
				}).filter(function (t) {
					return t
				}).sort(function (t, e) {
					return t[0] - e[0]
				}).forEach(function (t) {
					e._offsets.push(t[0]), e._targets.push(t[1])
				})
			}, t.dispose = function () {
				ti.removeData(this._element, ii), ti(this._scrollElement).off(si), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
			}, t._getConfig = function (t) {
				if ("string" != typeof (t = l({}, oi, "object" == typeof t && t ? t : {})).target) {
					var e = ti(t.target).attr("id");
					e || (e = Li.getUID(ei), ti(t.target).attr("id", e)), t.target = "#" + e
				}
				return Li.typeCheckConfig(ei, t, ri), t
			}, t._getScrollTop = function () {
				return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
			}, t._getScrollHeight = function () {
				return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
			}, t._getOffsetHeight = function () {
				return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
			}, t._process = function () {
				var t = this._getScrollTop() + this._config.offset,
					e = this._getScrollHeight(),
					i = this._config.offset + e - this._getOffsetHeight();
				if (this._scrollHeight !== e && this.refresh(), i <= t) {
					var s = this._targets[this._targets.length - 1];
					this._activeTarget !== s && this._activate(s)
				} else {
					if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
					for (var n = this._offsets.length; n--;) {
						this._activeTarget !== this._targets[n] && t >= this._offsets[n] && (void 0 === this._offsets[n + 1] || t < this._offsets[n + 1]) && this._activate(this._targets[n])
					}
				}
			}, t._activate = function (e) {
				this._activeTarget = e, this._clear();
				var t = this._selector.split(",");
				t = t.map(function (t) {
					return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
				});
				var i = ti([].slice.call(document.querySelectorAll(t.join(","))));
				i.hasClass(li) ? (i.closest(mi).find(_i).addClass(hi), i.addClass(hi)) : (i.addClass(hi), i.parents(di).prev(pi + ", " + gi).addClass(hi), i.parents(di).prev(fi).children(pi).addClass(hi)), ti(this._scrollElement).trigger(ai.ACTIVATE, {
					relatedTarget: e
				})
			}, t._clear = function () {
				var t = [].slice.call(document.querySelectorAll(this._selector));
				ti(t).filter(ui).removeClass(hi)
			}, i._jQueryInterface = function (e) {
				return this.each(function () {
					var t = ti(this).data(ii);
					if (t || (t = new i(this, "object" == typeof e && e), ti(this).data(ii, t)), "string" == typeof e) {
						if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
						t[e]()
					}
				})
			}, r(i, null, [{
				key: "VERSION",
				get: function () {
					return "4.1.3"
				}
			}, {
				key: "Default",
				get: function () {
					return oi
				}
			}]), i
		}(), ti(window).on(ai.LOAD_DATA_API, function () {
			for (var t = [].slice.call(document.querySelectorAll(ci)), e = t.length; e--;) {
				var i = ti(t[e]);
				wi._jQueryInterface.call(i, i.data())
			}
		}), ti.fn[ei] = wi._jQueryInterface, ti.fn[ei].Constructor = wi, ti.fn[ei].noConflict = function () {
			return ti.fn[ei] = ni, wi._jQueryInterface
		}, wi),
		Xi = (Di = "." + (xi = "bs.tab"), ki = (Ci = e).fn.tab, Ii = {
			HIDE: "hide" + Di,
			HIDDEN: "hidden" + Di,
			SHOW: "show" + Di,
			SHOWN: "shown" + Di,
			CLICK_DATA_API: "click" + Di + ".data-api"
		}, Si = "dropdown-menu", Ei = "active", Ti = "disabled", Ai = "fade", Mi = "show", Fi = ".dropdown", Pi = ".nav, .list-group", Oi = ".active", Ni = "> li > .active", zi = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', $i = ".dropdown-toggle", Hi = "> .dropdown-menu .active", Wi = function () {
			function s(t) {
				this._element = t
			}
			var t = s.prototype;
			return t.show = function () {
				var i = this;
				if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && Ci(this._element).hasClass(Ei) || Ci(this._element).hasClass(Ti))) {
					var t, s, e = Ci(this._element).closest(Pi)[0],
						n = Li.getSelectorFromElement(this._element);
					if (e) {
						var o = "UL" === e.nodeName ? Ni : Oi;
						s = (s = Ci.makeArray(Ci(e).find(o)))[s.length - 1]
					}
					var r = Ci.Event(Ii.HIDE, {
							relatedTarget: this._element
						}),
						a = Ci.Event(Ii.SHOW, {
							relatedTarget: s
						});
					if (s && Ci(s).trigger(r), Ci(this._element).trigger(a), !a.isDefaultPrevented() && !r.isDefaultPrevented()) {
						n && (t = document.querySelector(n)), this._activate(this._element, e);
						var l = function () {
							var t = Ci.Event(Ii.HIDDEN, {
									relatedTarget: i._element
								}),
								e = Ci.Event(Ii.SHOWN, {
									relatedTarget: s
								});
							Ci(s).trigger(t), Ci(i._element).trigger(e)
						};
						t ? this._activate(t, t.parentNode, l) : l()
					}
				}
			}, t.dispose = function () {
				Ci.removeData(this._element, xi), this._element = null
			}, t._activate = function (t, e, i) {
				var s = this,
					n = ("UL" === e.nodeName ? Ci(e).find(Ni) : Ci(e).children(Oi))[0],
					o = i && n && Ci(n).hasClass(Ai),
					r = function () {
						return s._transitionComplete(t, n, i)
					};
				if (n && o) {
					var a = Li.getTransitionDurationFromElement(n);
					Ci(n).one(Li.TRANSITION_END, r).emulateTransitionEnd(a)
				} else r()
			}, t._transitionComplete = function (t, e, i) {
				if (e) {
					Ci(e).removeClass(Mi + " " + Ei);
					var s = Ci(e.parentNode).find(Hi)[0];
					s && Ci(s).removeClass(Ei), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
				}
				if (Ci(t).addClass(Ei), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), Li.reflow(t), Ci(t).addClass(Mi), t.parentNode && Ci(t.parentNode).hasClass(Si)) {
					var n = Ci(t).closest(Fi)[0];
					if (n) {
						var o = [].slice.call(n.querySelectorAll($i));
						Ci(o).addClass(Ei)
					}
					t.setAttribute("aria-expanded", !0)
				}
				i && i()
			}, s._jQueryInterface = function (i) {
				return this.each(function () {
					var t = Ci(this),
						e = t.data(xi);
					if (e || (e = new s(this), t.data(xi, e)), "string" == typeof i) {
						if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
						e[i]()
					}
				})
			}, r(s, null, [{
				key: "VERSION",
				get: function () {
					return "4.1.3"
				}
			}]), s
		}(), Ci(document).on(Ii.CLICK_DATA_API, zi, function (t) {
			t.preventDefault(), Wi._jQueryInterface.call(Ci(this), "show")
		}), Ci.fn.tab = Wi._jQueryInterface, Ci.fn.tab.Constructor = Wi, Ci.fn.tab.noConflict = function () {
			return Ci.fn.tab = ki, Wi._jQueryInterface
		}, Wi);
	! function (t) {
		if (void 0 === t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
		var e = t.fn.jquery.split(" ")[0].split(".");
		if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || 4 <= e[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
	}(e), t.Util = Li, t.Alert = Ri, t.Button = ji, t.Carousel = qi, t.Collapse = Yi, t.Dropdown = Bi, t.Modal = Ui, t.Popover = Ki, t.Scrollspy = Vi, t.Tab = Xi, t.Tooltip = Qi, Object.defineProperty(t, "__esModule", {
		value: !0
	})
}),
function (r) {
	"use strict";
	var n = function (t, e) {
		this.options = e;
		var i = r(t),
			s = i.is("img"),
			n = s ? i.attr("src") : i.backgroundImageUrl(),
			o = this.options.generateUrl(i, n);
		r("<img/>").attr("src", o).load(function () {
			s ? i.attr("src", r(this).attr("src")) : (i.backgroundImageUrl(r(this).attr("src")), i.backgroundSize(r(this)[0].width, r(this)[0].height)), i.attr("data-retina", "complete")
		})
	};
	n.prototype = {
		constructor: n
	}, r.fn.retinaReplace = function (s) {
		return t() <= 1 ? this : this.each(function () {
			var t = r(this),
				e = t.data("retinaReplace"),
				i = r.extend({}, r.fn.retinaReplace.defaults, t.data(), "object" == typeof s && s);
			e || t.data("retinaReplace", e = new n(this, i)), "string" == typeof s && e[s]()
		})
	}, r.fn.retinaReplace.defaults = {
		suffix: "_2x",
		generateUrl: function (t, e) {
			var i = e.lastIndexOf("."),
				s = e.substr(i + 1);
			return e.substr(0, i) + this.suffix + "." + s
		}
	}, r.fn.retinaReplace.Constructor = n;
	var t = function () {
		return void 0 === window.devicePixelRatio ? 1 : window.devicePixelRatio
	};
	r.fn.backgroundImageUrl = function (t) {
		return t ? this.each(function () {
			r(this).css("background-image", 'url("' + t + '")')
		}) : r(this).css("background-image").replace(/url\(|\)|"|'/g, "")
	}, r.fn.backgroundSize = function (t, e) {
		var i = Math.floor(t / 2) + "px " + Math.floor(e / 2) + "px";
		r(this).css("background-size", i), r(this).css("-webkit-background-size", i)
	}, r(function () {
		r("[data-retina='true']").retinaReplace()
	})
}(window.jQuery),
function (l, i, n, o) {
	function h(t, e) {
		this.settings = null, this.options = l.extend({}, h.Defaults, e), this.$element = l(t), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
			time: null,
			target: null,
			pointer: null,
			stage: {
				start: null,
				current: null
			},
			direction: null
		}, this._states = {
			current: {},
			tags: {
				initializing: ["busy"],
				animating: ["busy"],
				dragging: ["interacting"]
			}
		}, l.each(["onResize", "onThrottledResize"], l.proxy(function (t, e) {
			this._handlers[e] = l.proxy(this[e], this)
		}, this)), l.each(h.Plugins, l.proxy(function (t, e) {
			this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
		}, this)), l.each(h.Workers, l.proxy(function (t, e) {
			this._pipe.push({
				filter: e.filter,
				run: l.proxy(e.run, this)
			})
		}, this)), this.setup(), this.initialize()
	}
	h.Defaults = {
		items: 3,
		loop: !1,
		center: !1,
		rewind: !1,
		mouseDrag: !0,
		touchDrag: !0,
		pullDrag: !0,
		freeDrag: !1,
		margin: 0,
		stagePadding: 0,
		merge: !1,
		mergeFit: !0,
		autoWidth: !1,
		startPosition: 0,
		rtl: !1,
		smartSpeed: 250,
		fluidSpeed: !1,
		dragEndSpeed: !1,
		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: i,
		fallbackEasing: "swing",
		info: !1,
		nestedItemSelector: !1,
		itemElement: "div",
		stageElement: "div",
		refreshClass: "owl-refresh",
		loadedClass: "owl-loaded",
		loadingClass: "owl-loading",
		rtlClass: "owl-rtl",
		responsiveClass: "owl-responsive",
		dragClass: "owl-drag",
		itemClass: "owl-item",
		stageClass: "owl-stage",
		stageOuterClass: "owl-stage-outer",
		grabClass: "owl-grab"
	}, h.Width = {
		Default: "default",
		Inner: "inner",
		Outer: "outer"
	}, h.Type = {
		Event: "event",
		State: "state"
	}, h.Plugins = {}, h.Workers = [{
		filter: ["width", "settings"],
		run: function () {
			this._width = this.$element.width()
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function (t) {
			t.current = this._items && this._items[this.relative(this._current)]
		}
	}, {
		filter: ["items", "settings"],
		run: function () {
			this.$stage.children(".cloned").remove()
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function (t) {
			var e = this.settings.margin || "",
				i = !this.settings.autoWidth,
				s = this.settings.rtl,
				n = {
					width: "auto",
					"margin-left": s ? e : "",
					"margin-right": s ? "" : e
				};
			!i && this.$stage.children().css(n), t.css = n
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function (t) {
			var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
				i = null,
				s = this._items.length,
				n = !this.settings.autoWidth,
				o = [];
			for (t.items = {
					merge: !1,
					width: e
				}; s--;) i = this._mergers[s], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = 1 < i || t.items.merge, o[s] = n ? e * i : this._items[s].width();
			this._widths = o
		}
	}, {
		filter: ["items", "settings"],
		run: function () {
			var t = [],
				e = this._items,
				i = this.settings,
				s = Math.max(2 * i.items, 4),
				n = 2 * Math.ceil(e.length / 2),
				o = i.loop && e.length ? i.rewind ? s : Math.max(s, n) : 0,
				r = "",
				a = "";
			for (o /= 2; o--;) t.push(this.normalize(t.length / 2, !0)), r += e[t[t.length - 1]][0].outerHTML, t.push(this.normalize(e.length - 1 - (t.length - 1) / 2, !0)), a = e[t[t.length - 1]][0].outerHTML + a;
			this._clones = t, l(r).addClass("cloned").appendTo(this.$stage), l(a).addClass("cloned").prependTo(this.$stage)
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function () {
			for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, s = 0, n = 0, o = []; ++i < e;) s = o[i - 1] || 0, n = this._widths[this.relative(i)] + this.settings.margin, o.push(s + n * t);
			this._coordinates = o
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function () {
			var t = this.settings.stagePadding,
				e = this._coordinates,
				i = {
					width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
					"padding-left": t || "",
					"padding-right": t || ""
				};
			this.$stage.css(i)
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function (t) {
			var e = this._coordinates.length,
				i = !this.settings.autoWidth,
				s = this.$stage.children();
			if (i && t.items.merge)
				for (; e--;) t.css.width = this._widths[this.relative(e)], s.eq(e).css(t.css);
			else i && (t.css.width = t.items.width, s.css(t.css))
		}
	}, {
		filter: ["items"],
		run: function () {
			this._coordinates.length < 1 && this.$stage.removeAttr("style")
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function (t) {
			t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
		}
	}, {
		filter: ["position"],
		run: function () {
			this.animate(this.coordinates(this._current))
		}
	}, {
		filter: ["width", "position", "items", "settings"],
		run: function () {
			var t, e, i, s, n = this.settings.rtl ? 1 : -1,
				o = 2 * this.settings.stagePadding,
				r = this.coordinates(this.current()) + o,
				a = r + this.width() * n,
				l = [];
			for (i = 0, s = this._coordinates.length; i < s; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * n, (this.op(t, "<=", r) && this.op(t, ">", a) || this.op(e, "<", r) && this.op(e, ">", a)) && l.push(i);
			this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
		}
	}], h.prototype.initialize = function () {
		var t, e, i;
		(this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) && (t = this.$element.find("img"), e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : o, i = this.$element.children(e).width(), t.length && i <= 0 && this.preloadAutoWidthImages(t));
		this.$element.addClass(this.options.loadingClass), this.$stage = l("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
	}, h.prototype.setup = function () {
		var e = this.viewport(),
			t = this.options.responsive,
			i = -1,
			s = null;
		t ? (l.each(t, function (t) {
			t <= e && i < t && (i = Number(t))
		}), "function" == typeof (s = l.extend({}, this.options, t[i])).stagePadding && (s.stagePadding = s.stagePadding()), delete s.responsive, s.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + i))) : s = l.extend({}, this.options), this.trigger("change", {
			property: {
				name: "settings",
				value: s
			}
		}), this._breakpoint = i, this.settings = s, this.invalidate("settings"), this.trigger("changed", {
			property: {
				name: "settings",
				value: this.settings
			}
		})
	}, h.prototype.optionsLogic = function () {
		this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
	}, h.prototype.prepare = function (t) {
		var e = this.trigger("prepare", {
			content: t
		});
		return e.data || (e.data = l("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(t)), this.trigger("prepared", {
			content: e.data
		}), e.data
	}, h.prototype.update = function () {
		for (var t = 0, e = this._pipe.length, i = l.proxy(function (t) {
				return this[t]
			}, this._invalidated), s = {}; t < e;)(this._invalidated.all || 0 < l.grep(this._pipe[t].filter, i).length) && this._pipe[t].run(s), t++;
		this._invalidated = {}, !this.is("valid") && this.enter("valid")
	}, h.prototype.width = function (t) {
		switch (t = t || h.Width.Default) {
			case h.Width.Inner:
			case h.Width.Outer:
				return this._width;
			default:
				return this._width - 2 * this.settings.stagePadding + this.settings.margin
		}
	}, h.prototype.refresh = function () {
		this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
	}, h.prototype.onThrottledResize = function () {
		i.clearTimeout(this.resizeTimer), this.resizeTimer = i.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
	}, h.prototype.onResize = function () {
		return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
	}, h.prototype.registerEventHandlers = function () {
		l.support.transition && this.$stage.on(l.support.transition.end + ".owl.core", l.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(i, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", l.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
			return !1
		})), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", l.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", l.proxy(this.onDragEnd, this)))
	}, h.prototype.onDragStart = function (t) {
		var e = null;
		3 !== t.which && (l.support.transform ? e = {
			x: (e = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === e.length ? 12 : 4],
			y: e[16 === e.length ? 13 : 5]
		} : (e = this.$stage.position(), e = {
			x: this.settings.rtl ? e.left + this.$stage.width() - this.width() + this.settings.margin : e.left,
			y: e.top
		}), this.is("animating") && (l.support.transform ? this.animate(e.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === t.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = l(t.target), this._drag.stage.start = e, this._drag.stage.current = e, this._drag.pointer = this.pointer(t), l(n).on("mouseup.owl.core touchend.owl.core", l.proxy(this.onDragEnd, this)), l(n).one("mousemove.owl.core touchmove.owl.core", l.proxy(function (t) {
			var e = this.difference(this._drag.pointer, this.pointer(t));
			l(n).on("mousemove.owl.core touchmove.owl.core", l.proxy(this.onDragMove, this)), Math.abs(e.x) < Math.abs(e.y) && this.is("valid") || (t.preventDefault(), this.enter("dragging"), this.trigger("drag"))
		}, this)))
	}, h.prototype.onDragMove = function (t) {
		var e = null,
			i = null,
			s = null,
			n = this.difference(this._drag.pointer, this.pointer(t)),
			o = this.difference(this._drag.stage.start, n);
		this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), i = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % i + i) % i + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), s = this.settings.pullDrag ? -1 * n.x / 5 : 0, o.x = Math.max(Math.min(o.x, e + s), i + s)), this._drag.stage.current = o, this.animate(o.x))
	}, h.prototype.onDragEnd = function (t) {
		var e = this.difference(this._drag.pointer, this.pointer(t)),
			i = this._drag.stage.current,
			s = 0 < e.x ^ this.settings.rtl ? "left" : "right";
		l(n).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== e.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(i.x, 0 !== e.x ? s : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = s, (3 < Math.abs(e.x) || 300 < (new Date).getTime() - this._drag.time) && this._drag.target.one("click.owl.core", function () {
			return !1
		})), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
	}, h.prototype.closest = function (i, s) {
		var n = -1,
			o = this.width(),
			r = this.coordinates();
		return this.settings.freeDrag || l.each(r, l.proxy(function (t, e) {
			return "left" === s && e - 30 < i && i < e + 30 ? n = t : "right" === s && e - o - 30 < i && i < e - o + 30 ? n = t + 1 : this.op(i, "<", e) && this.op(i, ">", r[t + 1] || e - o) && (n = "left" === s ? t + 1 : t), -1 === n
		}, this)), this.settings.loop || (this.op(i, ">", r[this.minimum()]) ? n = i = this.minimum() : this.op(i, "<", r[this.maximum()]) && (n = i = this.maximum())), n
	}, h.prototype.animate = function (t) {
		var e = 0 < this.speed();
		this.is("animating") && this.onTransitionEnd(), e && (this.enter("animating"), this.trigger("translate")), l.support.transform3d && l.support.transition ? this.$stage.css({
			transform: "translate3d(" + t + "px,0px,0px)",
			transition: this.speed() / 1e3 + "s"
		}) : e ? this.$stage.animate({
			left: t + "px"
		}, this.speed(), this.settings.fallbackEasing, l.proxy(this.onTransitionEnd, this)) : this.$stage.css({
			left: t + "px"
		})
	}, h.prototype.is = function (t) {
		return this._states.current[t] && 0 < this._states.current[t]
	}, h.prototype.current = function (t) {
		if (t === o) return this._current;
		if (0 === this._items.length) return o;
		if (t = this.normalize(t), this._current !== t) {
			var e = this.trigger("change", {
				property: {
					name: "position",
					value: t
				}
			});
			e.data !== o && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
				property: {
					name: "position",
					value: this._current
				}
			})
		}
		return this._current
	}, h.prototype.invalidate = function (t) {
		return "string" === l.type(t) && (this._invalidated[t] = !0, this.is("valid") && this.leave("valid")), l.map(this._invalidated, function (t, e) {
			return e
		})
	}, h.prototype.reset = function (t) {
		(t = this.normalize(t)) !== o && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
	}, h.prototype.normalize = function (t, e) {
		var i = this._items.length,
			s = e ? 0 : this._clones.length;
		return !this.isNumeric(t) || i < 1 ? t = o : (t < 0 || i + s <= t) && (t = ((t - s / 2) % i + i) % i + s / 2), t
	}, h.prototype.relative = function (t) {
		return t -= this._clones.length / 2, this.normalize(t, !0)
	}, h.prototype.maximum = function (t) {
		var e, i, s, n = this.settings,
			o = this._coordinates.length;
		if (n.loop) o = this._clones.length / 2 + this._items.length - 1;
		else if (n.autoWidth || n.merge) {
			for (e = this._items.length, i = this._items[--e].width(), s = this.$element.width(); e-- && !(s < (i += this._items[e].width() + this.settings.margin)););
			o = e + 1
		} else o = n.center ? this._items.length - 1 : this._items.length - n.items;
		return t && (o -= this._clones.length / 2), Math.max(o, 0)
	}, h.prototype.minimum = function (t) {
		return t ? 0 : this._clones.length / 2
	}, h.prototype.items = function (t) {
		return t === o ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
	}, h.prototype.mergers = function (t) {
		return t === o ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
	}, h.prototype.clones = function (i) {
		var e = this._clones.length / 2,
			s = e + this._items.length,
			n = function (t) {
				return t % 2 == 0 ? s + t / 2 : e - (t + 1) / 2
			};
		return i === o ? l.map(this._clones, function (t, e) {
			return n(e)
		}) : l.map(this._clones, function (t, e) {
			return t === i ? n(e) : null
		})
	}, h.prototype.speed = function (t) {
		return t !== o && (this._speed = t), this._speed
	}, h.prototype.coordinates = function (t) {
		var e, i = 1,
			s = t - 1;
		return t === o ? l.map(this._coordinates, l.proxy(function (t, e) {
			return this.coordinates(e)
		}, this)) : (this.settings.center ? (this.settings.rtl && (i = -1, s = t + 1), e = this._coordinates[t], e += (this.width() - e + (this._coordinates[s] || 0)) / 2 * i) : e = this._coordinates[s] || 0, e = Math.ceil(e))
	}, h.prototype.duration = function (t, e, i) {
		return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
	}, h.prototype.to = function (t, e) {
		var i = this.current(),
			s = null,
			n = t - this.relative(i),
			o = (0 < n) - (n < 0),
			r = this._items.length,
			a = this.minimum(),
			l = this.maximum();
		this.settings.loop ? (!this.settings.rewind && Math.abs(n) > r / 2 && (n += -1 * o * r), (s = (((t = i + n) - a) % r + r) % r + a) !== t && s - n <= l && 0 < s - n && (i = s - n, t = s, this.reset(i))) : t = this.settings.rewind ? (t % (l += 1) + l) % l : Math.max(a, Math.min(l, t)), this.speed(this.duration(i, t, e)), this.current(t), this.$element.is(":visible") && this.update()
	}, h.prototype.next = function (t) {
		t = t || !1, this.to(this.relative(this.current()) + 1, t)
	}, h.prototype.prev = function (t) {
		t = t || !1, this.to(this.relative(this.current()) - 1, t)
	}, h.prototype.onTransitionEnd = function (t) {
		if (t !== o && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
		this.leave("animating"), this.trigger("translated")
	}, h.prototype.viewport = function () {
		var t;
		if (this.options.responsiveBaseElement !== i) t = l(this.options.responsiveBaseElement).width();
		else if (i.innerWidth) t = i.innerWidth;
		else {
			if (!n.documentElement || !n.documentElement.clientWidth) throw "Can not detect viewport width.";
			t = n.documentElement.clientWidth
		}
		return t
	}, h.prototype.replace = function (t) {
		this.$stage.empty(), this._items = [], t && (t = t instanceof jQuery ? t : l(t)), this.settings.nestedItemSelector && (t = t.find("." + this.settings.nestedItemSelector)), t.filter(function () {
			return 1 === this.nodeType
		}).each(l.proxy(function (t, e) {
			e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
		}, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
	}, h.prototype.add = function (t, e) {
		var i = this.relative(this._current);
		e = e === o ? this._items.length : this.normalize(e, !0), t = t instanceof jQuery ? t : l(t), this.trigger("add", {
			content: t,
			position: e
		}), t = this.prepare(t), 0 === this._items.length || e === this._items.length ? (0 === this._items.length && this.$stage.append(t), 0 !== this._items.length && this._items[e - 1].after(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[i] && this.reset(this._items[i].index()), this.invalidate("items"), this.trigger("added", {
			content: t,
			position: e
		})
	}, h.prototype.remove = function (t) {
		(t = this.normalize(t, !0)) !== o && (this.trigger("remove", {
			content: this._items[t],
			position: t
		}), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
			content: null,
			position: t
		}))
	}, h.prototype.preloadAutoWidthImages = function (t) {
		t.each(l.proxy(function (t, e) {
			this.enter("pre-loading"), e = l(e), l(new Image).one("load", l.proxy(function (t) {
				e.attr("src", t.target.src), e.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
			}, this)).attr("src", e.attr("src") || e.attr("data-src") || e.attr("data-src-retina"))
		}, this))
	}, h.prototype.destroy = function () {
		for (var t in this.$element.off(".owl.core"), this.$stage.off(".owl.core"), l(n).off(".owl.core"), !1 !== this.settings.responsive && (i.clearTimeout(this.resizeTimer), this.off(i, "resize", this._handlers.onThrottledResize)), this._plugins) this._plugins[t].destroy();
		this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
	}, h.prototype.op = function (t, e, i) {
		var s = this.settings.rtl;
		switch (e) {
			case "<":
				return s ? i < t : t < i;
			case ">":
				return s ? t < i : i < t;
			case ">=":
				return s ? t <= i : i <= t;
			case "<=":
				return s ? i <= t : t <= i
		}
	}, h.prototype.on = function (t, e, i, s) {
		t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i)
	}, h.prototype.off = function (t, e, i, s) {
		t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i)
	}, h.prototype.trigger = function (t, e, i, s, n) {
		var o = {
				item: {
					count: this._items.length,
					index: this.current()
				}
			},
			r = l.camelCase(l.grep(["on", t, i], function (t) {
				return t
			}).join("-").toLowerCase()),
			a = l.Event([t, "owl", i || "carousel"].join(".").toLowerCase(), l.extend({
				relatedTarget: this
			}, o, e));
		return this._supress[t] || (l.each(this._plugins, function (t, e) {
			e.onTrigger && e.onTrigger(a)
		}), this.register({
			type: h.Type.Event,
			name: t
		}), this.$element.trigger(a), this.settings && "function" == typeof this.settings[r] && this.settings[r].call(this, a)), a
	}, h.prototype.enter = function (t) {
		l.each([t].concat(this._states.tags[t] || []), l.proxy(function (t, e) {
			this._states.current[e] === o && (this._states.current[e] = 0), this._states.current[e]++
		}, this))
	}, h.prototype.leave = function (t) {
		l.each([t].concat(this._states.tags[t] || []), l.proxy(function (t, e) {
			this._states.current[e]--
		}, this))
	}, h.prototype.register = function (i) {
		if (i.type === h.Type.Event) {
			if (l.event.special[i.name] || (l.event.special[i.name] = {}), !l.event.special[i.name].owl) {
				var e = l.event.special[i.name]._default;
				l.event.special[i.name]._default = function (t) {
					return !e || !e.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && -1 < t.namespace.indexOf("owl") : e.apply(this, arguments)
				}, l.event.special[i.name].owl = !0
			}
		} else i.type === h.Type.State && (this._states.tags[i.name] ? this._states.tags[i.name] = this._states.tags[i.name].concat(i.tags) : this._states.tags[i.name] = i.tags, this._states.tags[i.name] = l.grep(this._states.tags[i.name], l.proxy(function (t, e) {
			return l.inArray(t, this._states.tags[i.name]) === e
		}, this)))
	}, h.prototype.suppress = function (t) {
		l.each(t, l.proxy(function (t, e) {
			this._supress[e] = !0
		}, this))
	}, h.prototype.release = function (t) {
		l.each(t, l.proxy(function (t, e) {
			delete this._supress[e]
		}, this))
	}, h.prototype.pointer = function (t) {
		var e = {
			x: null,
			y: null
		};
		return (t = (t = t.originalEvent || t || i.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (e.x = t.pageX, e.y = t.pageY) : (e.x = t.clientX, e.y = t.clientY), e
	}, h.prototype.isNumeric = function (t) {
		return !isNaN(parseFloat(t))
	}, h.prototype.difference = function (t, e) {
		return {
			x: t.x - e.x,
			y: t.y - e.y
		}
	}, l.fn.owlCarousel = function (e) {
		var s = Array.prototype.slice.call(arguments, 1);
		return this.each(function () {
			var t = l(this),
				i = t.data("owl.carousel");
			i || (i = new h(this, "object" == typeof e && e), t.data("owl.carousel", i), l.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (t, e) {
				i.register({
					type: h.Type.Event,
					name: e
				}), i.$element.on(e + ".owl.carousel.core", l.proxy(function (t) {
					t.namespace && t.relatedTarget !== this && (this.suppress([e]), i[e].apply(this, [].slice.call(arguments, 1)), this.release([e]))
				}, i))
			})), "string" == typeof e && "_" !== e.charAt(0) && i[e].apply(i, s)
		})
	}, l.fn.owlCarousel.Constructor = h
}(window.Zepto || window.jQuery, window, document),
function (e, i, t, s) {
	var n = function (t) {
		this._core = t, this._interval = null, this._visible = null, this._handlers = {
			"initialized.owl.carousel": e.proxy(function (t) {
				t.namespace && this._core.settings.autoRefresh && this.watch()
			}, this)
		}, this._core.options = e.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
	};
	n.Defaults = {
		autoRefresh: !0,
		autoRefreshInterval: 500
	}, n.prototype.watch = function () {
		this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = i.setInterval(e.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
	}, n.prototype.refresh = function () {
		this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
	}, n.prototype.destroy = function () {
		var t, e;
		for (t in i.clearInterval(this._interval), this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, e.fn.owlCarousel.Constructor.Plugins.AutoRefresh = n
}(window.Zepto || window.jQuery, window, document),
function (a, o, t, e) {
	var i = function (t) {
		this._core = t, this._loaded = [], this._handlers = {
			"initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (t) {
				if (t.namespace && this._core.settings && this._core.settings.lazyLoad && (t.property && "position" == t.property.name || "initialized" == t.type))
					for (var e = this._core.settings, i = e.center && Math.ceil(e.items / 2) || e.items, s = e.center && -1 * i || 0, n = (t.property && void 0 !== t.property.value ? t.property.value : this._core.current()) + s, o = this._core.clones().length, r = a.proxy(function (t, e) {
							this.load(e)
						}, this); s++ < i;) this.load(o / 2 + this._core.relative(n)), o && a.each(this._core.clones(this._core.relative(n)), r), n++
			}, this)
		}, this._core.options = a.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers)
	};
	i.Defaults = {
		lazyLoad: !1
	}, i.prototype.load = function (t) {
		var e = this._core.$stage.children().eq(t),
			i = e && e.find(".owl-lazy");
		!i || -1 < a.inArray(e.get(0), this._loaded) || (i.each(a.proxy(function (t, e) {
			var i, s = a(e),
				n = 1 < o.devicePixelRatio && s.attr("data-src-retina") || s.attr("data-src");
			this._core.trigger("load", {
				element: s,
				url: n
			}, "lazy"), s.is("img") ? s.one("load.owl.lazy", a.proxy(function () {
				s.css("opacity", 1), this._core.trigger("loaded", {
					element: s,
					url: n
				}, "lazy")
			}, this)).attr("src", n) : ((i = new Image).onload = a.proxy(function () {
				s.css({
					"background-image": "url(" + n + ")",
					opacity: "1"
				}), this._core.trigger("loaded", {
					element: s,
					url: n
				}, "lazy")
			}, this), i.src = n)
		}, this)), this._loaded.push(e.get(0)))
	}, i.prototype.destroy = function () {
		var t, e;
		for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, a.fn.owlCarousel.Constructor.Plugins.Lazy = i
}(window.Zepto || window.jQuery, window, document),
function (o, t, e, i) {
	var s = function (t) {
		this._core = t, this._handlers = {
			"initialized.owl.carousel refreshed.owl.carousel": o.proxy(function (t) {
				t.namespace && this._core.settings.autoHeight && this.update()
			}, this),
			"changed.owl.carousel": o.proxy(function (t) {
				t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update()
			}, this),
			"loaded.owl.lazy": o.proxy(function (t) {
				t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
			}, this)
		}, this._core.options = o.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers)
	};
	s.Defaults = {
		autoHeight: !1,
		autoHeightClass: "owl-height"
	}, s.prototype.update = function () {
		var t, e = this._core._current,
			i = e + this._core.settings.items,
			s = this._core.$stage.children().toArray().slice(e, i),
			n = [];
		o.each(s, function (t, e) {
			n.push(o(e).height())
		}), t = Math.max.apply(null, n), this._core.$stage.parent().height(t).addClass(this._core.settings.autoHeightClass)
	}, s.prototype.destroy = function () {
		var t, e;
		for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, o.fn.owlCarousel.Constructor.Plugins.AutoHeight = s
}(window.Zepto || window.jQuery, window, document),
function (c, t, e, i) {
	var s = function (t) {
		this._core = t, this._videos = {}, this._playing = null, this._handlers = {
			"initialized.owl.carousel": c.proxy(function (t) {
				t.namespace && this._core.register({
					type: "state",
					name: "playing",
					tags: ["interacting"]
				})
			}, this),
			"resize.owl.carousel": c.proxy(function (t) {
				t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
			}, this),
			"refreshed.owl.carousel": c.proxy(function (t) {
				t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
			}, this),
			"changed.owl.carousel": c.proxy(function (t) {
				t.namespace && "position" === t.property.name && this._playing && this.stop()
			}, this),
			"prepared.owl.carousel": c.proxy(function (t) {
				if (t.namespace) {
					var e = c(t.content).find(".owl-video");
					e.length && (e.css("display", "none"), this.fetch(e, c(t.content)))
				}
			}, this)
		}, this._core.options = c.extend({}, s.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", c.proxy(function (t) {
			this.play(t)
		}, this))
	};
	s.Defaults = {
		video: !1,
		videoHeight: !1,
		videoWidth: !1
	}, s.prototype.fetch = function (t, e) {
		var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
			s = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
			n = t.attr("data-width") || this._core.settings.videoWidth,
			o = t.attr("data-height") || this._core.settings.videoHeight,
			r = t.attr("href");
		if (!r) throw new Error("Missing video URL.");
		if (-1 < (s = r.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu")) i = "youtube";
		else if (-1 < s[3].indexOf("vimeo")) i = "vimeo";
		else {
			if (!(-1 < s[3].indexOf("vzaar"))) throw new Error("Video URL not supported.");
			i = "vzaar"
		}
		s = s[6], this._videos[r] = {
			type: i,
			id: s,
			width: n,
			height: o
		}, e.attr("data-video", r), this.thumbnail(t, this._videos[r])
	}, s.prototype.thumbnail = function (e, t) {
		var i, s, n = t.width && t.height ? 'style="width:' + t.width + "px;height:" + t.height + 'px;"' : "",
			o = e.find("img"),
			r = "src",
			a = "",
			l = this._core.settings,
			h = function (t) {
				'<div class="owl-video-play-icon"></div>',
				i = l.lazyLoad ? '<div class="owl-video-tn ' + a + '" ' + r + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>',
				e.after(i),
				e.after('<div class="owl-video-play-icon"></div>')
			};
		if (e.wrap('<div class="owl-video-wrapper"' + n + "></div>"), this._core.settings.lazyLoad && (r = "data-src", a = "owl-lazy"), o.length) return h(o.attr(r)), o.remove(), !1;
		"youtube" === t.type ? (s = "//img.youtube.com/vi/" + t.id + "/hqdefault.jpg", h(s)) : "vimeo" === t.type ? c.ajax({
			type: "GET",
			url: "//vimeo.com/api/v2/video/" + t.id + ".json",
			jsonp: "callback",
			dataType: "jsonp",
			success: function (t) {
				s = t[0].thumbnail_large, h(s)
			}
		}) : "vzaar" === t.type && c.ajax({
			type: "GET",
			url: "//vzaar.com/api/videos/" + t.id + ".json",
			jsonp: "callback",
			dataType: "jsonp",
			success: function (t) {
				s = t.framegrab_url, h(s)
			}
		})
	}, s.prototype.stop = function () {
		this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
	}, s.prototype.play = function (t) {
		var e, i = c(t.target).closest("." + this._core.settings.itemClass),
			s = this._videos[i.attr("data-video")],
			n = s.width || "100%",
			o = s.height || this._core.$stage.height();
		this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), i = this._core.items(this._core.relative(i.index())), this._core.reset(i.index()), "youtube" === s.type ? e = '<iframe width="' + n + '" height="' + o + '" src="//www.youtube.com/embed/' + s.id + "?autoplay=1&v=" + s.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === s.type ? e = '<iframe src="//player.vimeo.com/video/' + s.id + '?autoplay=1" width="' + n + '" height="' + o + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === s.type && (e = '<iframe frameborder="0"height="' + o + '"width="' + n + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + s.id + '/player?autoplay=true"></iframe>'), c('<div class="owl-video-frame">' + e + "</div>").insertAfter(i.find(".owl-video")), this._playing = i.addClass("owl-video-playing"))
	}, s.prototype.isInFullScreen = function () {
		var t = e.fullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement;
		return t && c(t).parent().hasClass("owl-video-frame")
	}, s.prototype.destroy = function () {
		var t, e;
		for (t in this._core.$element.off("click.owl.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, c.fn.owlCarousel.Constructor.Plugins.Video = s
}(window.Zepto || window.jQuery, window, document),
function (r, t, e, i) {
	var s = function (t) {
		this.core = t, this.core.options = r.extend({}, s.Defaults, this.core.options), this.swapping = !0, this.previous = void 0, this.next = void 0, this.handlers = {
			"change.owl.carousel": r.proxy(function (t) {
				t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
			}, this),
			"drag.owl.carousel dragged.owl.carousel translated.owl.carousel": r.proxy(function (t) {
				t.namespace && (this.swapping = "translated" == t.type)
			}, this),
			"translate.owl.carousel": r.proxy(function (t) {
				t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
			}, this)
		}, this.core.$element.on(this.handlers)
	};
	s.Defaults = {
		animateOut: !1,
		animateIn: !1
	}, s.prototype.swap = function () {
		if (1 === this.core.settings.items && r.support.animation && r.support.transition) {
			this.core.speed(0);
			var t, e = r.proxy(this.clear, this),
				i = this.core.$stage.children().eq(this.previous),
				s = this.core.$stage.children().eq(this.next),
				n = this.core.settings.animateIn,
				o = this.core.settings.animateOut;
			this.core.current() !== this.previous && (o && (t = this.core.coordinates(this.previous) - this.core.coordinates(this.next), i.one(r.support.animation.end, e).css({
				left: t + "px"
			}).addClass("animated owl-animated-out").addClass(o)), n && s.one(r.support.animation.end, e).addClass("animated owl-animated-in").addClass(n))
		}
	}, s.prototype.clear = function (t) {
		r(t.target).css({
			left: ""
		}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
	}, s.prototype.destroy = function () {
		var t, e;
		for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, r.fn.owlCarousel.Constructor.Plugins.Animate = s
}(window.Zepto || window.jQuery, window, document),
function (i, s, n, t) {
	var e = function (t) {
		this._core = t, this._timeout = null, this._paused = !1, this._handlers = {
			"changed.owl.carousel": i.proxy(function (t) {
				t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
			}, this),
			"initialized.owl.carousel": i.proxy(function (t) {
				t.namespace && this._core.settings.autoplay && this.play()
			}, this),
			"play.owl.autoplay": i.proxy(function (t, e, i) {
				t.namespace && this.play(e, i)
			}, this),
			"stop.owl.autoplay": i.proxy(function (t) {
				t.namespace && this.stop()
			}, this),
			"mouseover.owl.autoplay": i.proxy(function () {
				this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
			}, this),
			"mouseleave.owl.autoplay": i.proxy(function () {
				this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
			}, this),
			"touchstart.owl.core": i.proxy(function () {
				this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
			}, this),
			"touchend.owl.core": i.proxy(function () {
				this._core.settings.autoplayHoverPause && this.play()
			}, this)
		}, this._core.$element.on(this._handlers), this._core.options = i.extend({}, e.Defaults, this._core.options)
	};
	e.Defaults = {
		autoplay: !1,
		autoplayTimeout: 5e3,
		autoplayHoverPause: !1,
		autoplaySpeed: !1
	}, e.prototype.play = function (t, e) {
		this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
	}, e.prototype._getNextTimeout = function (t, e) {
		return this._timeout && s.clearTimeout(this._timeout), s.setTimeout(i.proxy(function () {
			this._paused || this._core.is("busy") || this._core.is("interacting") || n.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
		}, this), t || this._core.settings.autoplayTimeout)
	}, e.prototype._setAutoPlayInterval = function () {
		this._timeout = this._getNextTimeout()
	}, e.prototype.stop = function () {
		this._core.is("rotating") && (s.clearTimeout(this._timeout), this._core.leave("rotating"))
	}, e.prototype.pause = function () {
		this._core.is("rotating") && (this._paused = !0)
	}, e.prototype.destroy = function () {
		var t, e;
		for (t in this.stop(), this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, i.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function (o, t, e, i) {
	"use strict";
	var s = function (t) {
		this._core = t, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		}, this._handlers = {
			"prepared.owl.carousel": o.proxy(function (t) {
				t.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + o(t.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
			}, this),
			"added.owl.carousel": o.proxy(function (t) {
				t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
			}, this),
			"remove.owl.carousel": o.proxy(function (t) {
				t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
			}, this),
			"changed.owl.carousel": o.proxy(function (t) {
				t.namespace && "position" == t.property.name && this.draw()
			}, this),
			"initialized.owl.carousel": o.proxy(function (t) {
				t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
			}, this),
			"refreshed.owl.carousel": o.proxy(function (t) {
				t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
			}, this)
		}, this._core.options = o.extend({}, s.Defaults, this._core.options), this.$element.on(this._handlers)
	};
	s.Defaults = {
		nav: !1,
		navText: ["prev", "next"],
		navSpeed: !1,
		navElement: "div",
		navContainer: !1,
		navContainerClass: "owl-nav",
		navClass: ["owl-prev", "owl-next"],
		slideBy: 1,
		dotClass: "owl-dot",
		dotsClass: "owl-dots",
		dots: !0,
		dotsEach: !1,
		dotsData: !1,
		dotsSpeed: !1,
		dotsContainer: !1
	}, s.prototype.initialize = function () {
		var t, i = this._core.settings;
		for (t in this._controls.$relative = (i.navContainer ? o(i.navContainer) : o("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = o("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", o.proxy(function (t) {
				this.prev(i.navSpeed)
			}, this)), this._controls.$next = o("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", o.proxy(function (t) {
				this.next(i.navSpeed)
			}, this)), i.dotsData || (this._templates = [o("<div>").addClass(i.dotClass).append(o("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? o(i.dotsContainer) : o("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", o.proxy(function (t) {
				var e = o(t.target).parent().is(this._controls.$absolute) ? o(t.target).index() : o(t.target).parent().index();
				t.preventDefault(), this.to(e, i.dotsSpeed)
			}, this)), this._overrides) this._core[t] = o.proxy(this[t], this)
	}, s.prototype.destroy = function () {
		var t, e, i, s;
		for (t in this._handlers) this.$element.off(t, this._handlers[t]);
		for (e in this._controls) this._controls[e].remove();
		for (s in this.overides) this._core[s] = this._overrides[s];
		for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
	}, s.prototype.update = function () {
		var t, e, i = this._core.clones().length / 2,
			s = i + this._core.items().length,
			n = this._core.maximum(!0),
			o = this._core.settings,
			r = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
		if ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy)
			for (this._pages = [], t = i, e = 0; t < s; t++) {
				if (r <= e || 0 === e) {
					if (this._pages.push({
							start: Math.min(n, t - i),
							end: t - i + r - 1
						}), Math.min(n, t - i) === n) break;
					e = 0, 0
				}
				e += this._core.mergers(this._core.relative(t))
			}
	}, s.prototype.draw = function () {
		var t, e = this._core.settings,
			i = this._core.items().length <= e.items,
			s = this._core.relative(this._core.current()),
			n = e.loop || e.rewind;
		this._controls.$relative.toggleClass("disabled", !e.nav || i), e.nav && (this._controls.$previous.toggleClass("disabled", !n && s <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !n && s >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !e.dots || i), e.dots && (t = this._pages.length - this._controls.$absolute.children().length, e.dotsData && 0 !== t ? this._controls.$absolute.html(this._templates.join("")) : 0 < t ? this._controls.$absolute.append(new Array(t + 1).join(this._templates[0])) : t < 0 && this._controls.$absolute.children().slice(t).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(o.inArray(this.current(), this._pages)).addClass("active"))
	}, s.prototype.onTrigger = function (t) {
		var e = this._core.settings;
		t.page = {
			index: o.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: e && (e.center || e.autoWidth || e.dotsData ? 1 : e.dotsEach || e.items)
		}
	}, s.prototype.current = function () {
		var i = this._core.relative(this._core.current());
		return o.grep(this._pages, o.proxy(function (t, e) {
			return t.start <= i && t.end >= i
		}, this)).pop()
	}, s.prototype.getPosition = function (t) {
		var e, i, s = this._core.settings;
		return "page" == s.slideBy ? (e = o.inArray(this.current(), this._pages), i = this._pages.length, t ? ++e : --e, e = this._pages[(e % i + i) % i].start) : (e = this._core.relative(this._core.current()), i = this._core.items().length, t ? e += s.slideBy : e -= s.slideBy), e
	}, s.prototype.next = function (t) {
		o.proxy(this._overrides.to, this._core)(this.getPosition(!0), t)
	}, s.prototype.prev = function (t) {
		o.proxy(this._overrides.to, this._core)(this.getPosition(!1), t)
	}, s.prototype.to = function (t, e, i) {
		var s;
		!i && this._pages.length ? (s = this._pages.length, o.proxy(this._overrides.to, this._core)(this._pages[(t % s + s) % s].start, e)) : o.proxy(this._overrides.to, this._core)(t, e)
	}, o.fn.owlCarousel.Constructor.Plugins.Navigation = s
}(window.Zepto || window.jQuery, window, document),
function (s, n, t, e) {
	"use strict";
	var i = function (t) {
		this._core = t, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
			"initialized.owl.carousel": s.proxy(function (t) {
				t.namespace && "URLHash" === this._core.settings.startPosition && s(n).trigger("hashchange.owl.navigation")
			}, this),
			"prepared.owl.carousel": s.proxy(function (t) {
				if (t.namespace) {
					var e = s(t.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
					if (!e) return;
					this._hashes[e] = t.content
				}
			}, this),
			"changed.owl.carousel": s.proxy(function (t) {
				if (t.namespace && "position" === t.property.name) {
					var i = this._core.items(this._core.relative(this._core.current())),
						e = s.map(this._hashes, function (t, e) {
							return t === i ? e : null
						}).join();
					if (!e || n.location.hash.slice(1) === e) return;
					n.location.hash = e
				}
			}, this)
		}, this._core.options = s.extend({}, i.Defaults, this._core.options), this.$element.on(this._handlers), s(n).on("hashchange.owl.navigation", s.proxy(function (t) {
			var e = n.location.hash.substring(1),
				i = this._core.$stage.children(),
				s = this._hashes[e] && i.index(this._hashes[e]);
			void 0 !== s && s !== this._core.current() && this._core.to(this._core.relative(s), !1, !0)
		}, this))
	};
	i.Defaults = {
		URLhashListener: !1
	}, i.prototype.destroy = function () {
		var t, e;
		for (t in s(n).off("hashchange.owl.navigation"), this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, s.fn.owlCarousel.Constructor.Plugins.Hash = i
}(window.Zepto || window.jQuery, window, document),
function (n, t, e, o) {
	var r = n("<support>").get(0).style,
		a = "Webkit Moz O ms".split(" "),
		i = {
			transition: {
				end: {
					WebkitTransition: "webkitTransitionEnd",
					MozTransition: "transitionend",
					OTransition: "oTransitionEnd",
					transition: "transitionend"
				}
			},
			animation: {
				end: {
					WebkitAnimation: "webkitAnimationEnd",
					MozAnimation: "animationend",
					OAnimation: "oAnimationEnd",
					animation: "animationend"
				}
			}
		},
		s = function () {
			return !!c("transform")
		},
		l = function () {
			return !!c("perspective")
		},
		h = function () {
			return !!c("animation")
		};

	function c(t, i) {
		var s = !1,
			e = t.charAt(0).toUpperCase() + t.slice(1);
		return n.each((t + " " + a.join(e + " ") + e).split(" "), function (t, e) {
			if (r[e] !== o) return s = !i || e, !1
		}), s
	}

	function u(t) {
		return c(t, !0)
	}(function () {
		return !!c("transition")
	})() && (n.support.transition = new String(u("transition")), n.support.transition.end = i.transition.end[n.support.transition]), h() && (n.support.animation = new String(u("animation")), n.support.animation.end = i.animation.end[n.support.animation]), s() && (n.support.transform = new String(u("transform")), n.support.transform3d = l())
}(window.Zepto || window.jQuery, window, document),
function (a, t) {
	function s(t, e) {
		var i = t.nodeName.toLowerCase();
		if ("area" === i) {
			var s, n = t.parentNode,
				o = n.name;
			return !(!t.href || !o || "map" !== n.nodeName.toLowerCase()) && (!!(s = a("img[usemap=#" + o + "]")[0]) && r(s))
		}
		return (/input|select|textarea|button|object/.test(i) ? !t.disabled : "a" == i && t.href || e) && r(t)
	}

	function r(t) {
		return !a(t).parents().andSelf().filter(function () {
			return "hidden" === a.curCSS(this, "visibility") || a.expr.filters.hidden(this)
		}).length
	}
	a.ui = a.ui || {}, a.ui.version || (a.extend(a.ui, {
		version: "1.8.22",
		keyCode: {
			ALT: 18,
			BACKSPACE: 8,
			CAPS_LOCK: 20,
			COMMA: 188,
			COMMAND: 91,
			COMMAND_LEFT: 91,
			COMMAND_RIGHT: 93,
			CONTROL: 17,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			INSERT: 45,
			LEFT: 37,
			MENU: 93,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SHIFT: 16,
			SPACE: 32,
			TAB: 9,
			UP: 38,
			WINDOWS: 91
		}
	}), a.fn.extend({
		propAttr: a.fn.prop || a.fn.attr,
		_focus: a.fn.focus,
		focus: function (e, i) {
			return "number" == typeof e ? this.each(function () {
				var t = this;
				setTimeout(function () {
					a(t).focus(), i && i.call(t)
				}, e)
			}) : this._focus.apply(this, arguments)
		},
		scrollParent: function () {
			var t;
			return t = a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
				return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
			}).eq(0) : this.parents().filter(function () {
				return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
			}).eq(0), /fixed/.test(this.css("position")) || !t.length ? a(document) : t
		},
		zIndex: function (t) {
			if (void 0 !== t) return this.css("zIndex", t);
			if (this.length)
				for (var e, i, s = a(this[0]); s.length && s[0] !== document;) {
					if (("absolute" === (e = s.css("position")) || "relative" === e || "fixed" === e) && (i = parseInt(s.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
					s = s.parent()
				}
			return 0
		},
		disableSelection: function () {
			return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (t) {
				t.preventDefault()
			})
		},
		enableSelection: function () {
			return this.unbind(".ui-disableSelection")
		}
	}), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function (t, i) {
		function s(t, e, i, s) {
			return a.each(n, function () {
				e -= parseFloat(a.curCSS(t, "padding" + this, !0)) || 0, i && (e -= parseFloat(a.curCSS(t, "border" + this + "Width", !0)) || 0), s && (e -= parseFloat(a.curCSS(t, "margin" + this, !0)) || 0)
			}), e
		}
		var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
			o = i.toLowerCase(),
			r = {
				innerWidth: a.fn.innerWidth,
				innerHeight: a.fn.innerHeight,
				outerWidth: a.fn.outerWidth,
				outerHeight: a.fn.outerHeight
			};
		a.fn["inner" + i] = function (t) {
			return void 0 === t ? r["inner" + i].call(this) : this.each(function () {
				a(this).css(o, s(this, t) + "px")
			})
		}, a.fn["outer" + i] = function (t, e) {
			return "number" != typeof t ? r["outer" + i].call(this, t) : this.each(function () {
				a(this).css(o, s(this, t, !0, e) + "px")
			})
		}
	}), a.extend(a.expr[":"], {
		data: a.expr.createPseudo ? a.expr.createPseudo(function (e) {
			return function (t) {
				return !!a.data(t, e)
			}
		}) : function (t, e, i) {
			return !!a.data(t, i[3])
		},
		focusable: function (t) {
			return s(t, !isNaN(a.attr(t, "tabindex")))
		},
		tabbable: function (t) {
			var e = a.attr(t, "tabindex"),
				i = isNaN(e);
			return (i || 0 <= e) && s(t, !i)
		}
	}), a(function () {
		var t = document.body,
			e = t.appendChild(e = document.createElement("div"));
		e.offsetHeight, a.extend(e.style, {
			minHeight: "100px",
			height: "auto",
			padding: 0,
			borderWidth: 0
		}), a.support.minHeight = 100 === e.offsetHeight, a.support.selectstart = "onselectstart" in e, t.removeChild(e).style.display = "none"
	}), a.curCSS || (a.curCSS = a.css), a.extend(a.ui, {
		plugin: {
			add: function (t, e, i) {
				var s = a.ui[t].prototype;
				for (var n in i) s.plugins[n] = s.plugins[n] || [], s.plugins[n].push([e, i[n]])
			},
			call: function (t, e, i) {
				var s = t.plugins[e];
				if (s && t.element[0].parentNode)
					for (var n = 0; n < s.length; n++) t.options[s[n][0]] && s[n][1].apply(t.element, i)
			}
		},
		contains: function (t, e) {
			return document.compareDocumentPosition ? 16 & t.compareDocumentPosition(e) : t !== e && t.contains(e)
		},
		hasScroll: function (t, e) {
			if ("hidden" === a(t).css("overflow")) return !1;
			var i = e && "left" === e ? "scrollLeft" : "scrollTop",
				s = !1;
			return 0 < t[i] || (t[i] = 1, s = 0 < t[i], t[i] = 0, s)
		},
		isOverAxis: function (t, e, i) {
			return e < t && t < e + i
		},
		isOver: function (t, e, i, s, n, o) {
			return a.ui.isOverAxis(t, i, n) && a.ui.isOverAxis(e, s, o)
		}
	}))
}(jQuery),
function (r, t) {
	if (r.cleanData) {
		var s = r.cleanData;
		r.cleanData = function (t) {
			for (var e, i = 0; null != (e = t[i]); i++) try {
				r(e).triggerHandler("remove")
			} catch (t) {}
			s(t)
		}
	} else {
		var i = r.fn.remove;
		r.fn.remove = function (t, e) {
			return this.each(function () {
				return e || (!t || r.filter(t, [this]).length) && r("*", this).add([this]).each(function () {
					try {
						r(this).triggerHandler("remove")
					} catch (t) {}
				}), i.call(r(this), t, e)
			})
		}
	}
	r.widget = function (e, t, i) {
		var s, n = e.split(".")[0];
		s = n + "-" + (e = e.split(".")[1]), i || (i = t, t = r.Widget), r.expr[":"][s] = function (t) {
			return !!r.data(t, e)
		}, r[n] = r[n] || {}, r[n][e] = function (t, e) {
			arguments.length && this._createWidget(t, e)
		};
		var o = new t;
		o.options = r.extend(!0, {}, o.options), r[n][e].prototype = r.extend(!0, o, {
			namespace: n,
			widgetName: e,
			widgetEventPrefix: r[n][e].prototype.widgetEventPrefix || e,
			widgetBaseClass: s
		}, i), r.widget.bridge(e, r[n][e])
	}, r.widget.bridge = function (o, e) {
		r.fn[o] = function (i) {
			var t = "string" == typeof i,
				s = Array.prototype.slice.call(arguments, 1),
				n = this;
			return i = !t && s.length ? r.extend.apply(null, [!0, i].concat(s)) : i, t && "_" === i.charAt(0) || (t ? this.each(function () {
				var t = r.data(this, o),
					e = t && r.isFunction(t[i]) ? t[i].apply(t, s) : t;
				if (e !== t && void 0 !== e) return n = e, !1
			}) : this.each(function () {
				var t = r.data(this, o);
				t ? t.option(i || {})._init() : r.data(this, o, new e(i, this))
			})), n
		}
	}, r.Widget = function (t, e) {
		arguments.length && this._createWidget(t, e)
	}, r.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		options: {
			disabled: !1
		},
		_createWidget: function (t, e) {
			r.data(e, this.widgetName, this), this.element = r(e), this.options = r.extend(!0, {}, this.options, this._getCreateOptions(), t);
			var i = this;
			this.element.bind("remove." + this.widgetName, function () {
				i.destroy()
			}), this._create(), this._trigger("create"), this._init()
		},
		_getCreateOptions: function () {
			return r.metadata && r.metadata.get(this.element[0])[this.widgetName]
		},
		_create: function () {},
		_init: function () {},
		destroy: function () {
			this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
		},
		widget: function () {
			return this.element
		},
		option: function (t, e) {
			var i = t;
			if (0 === arguments.length) return r.extend({}, this.options);
			if ("string" == typeof t) {
				if (void 0 === e) return this.options[t];
				(i = {})[t] = e
			}
			return this._setOptions(i), this
		},
		_setOptions: function (t) {
			var i = this;
			return r.each(t, function (t, e) {
				i._setOption(t, e)
			}), this
		},
		_setOption: function (t, e) {
			return this.options[t] = e, "disabled" === t && this.widget()[e ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", e), this
		},
		enable: function () {
			return this._setOption("disabled", !1)
		},
		disable: function () {
			return this._setOption("disabled", !0)
		},
		_trigger: function (t, e, i) {
			var s, n, o = this.options[t];
			if (i = i || {}, (e = r.Event(e)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), e.target = this.element[0], n = e.originalEvent)
				for (s in n) s in e || (e[s] = n[s]);
			return this.element.trigger(e, i), !(r.isFunction(o) && !1 === o.call(this.element[0], e, i) || e.isDefaultPrevented())
		}
	}
}(jQuery),
function (n, t) {
	var o = !1;
	n(document).mouseup(function (t) {
		o = !1
	}), n.widget("ui.mouse", {
		options: {
			cancel: ":input,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function () {
			var e = this;
			this.element.bind("mousedown." + this.widgetName, function (t) {
				return e._mouseDown(t)
			}).bind("click." + this.widgetName, function (t) {
				if (!0 === n.data(t.target, e.widgetName + ".preventClickEvent")) return n.removeData(t.target, e.widgetName + ".preventClickEvent"), t.stopImmediatePropagation(), !1
			}), this.started = !1
		},
		_mouseDestroy: function () {
			this.element.unbind("." + this.widgetName), n(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function (t) {
			if (!o) {
				this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
				var e = this,
					i = 1 == t.which,
					s = !("string" != typeof this.options.cancel || !t.target.nodeName) && n(t.target).closest(this.options.cancel).length;
				return i && !s && this._mouseCapture(t) && (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
					e.mouseDelayMet = !0
				}, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(t), !this._mouseStarted) ? t.preventDefault() : (!0 === n.data(t.target, this.widgetName + ".preventClickEvent") && n.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) {
					return e._mouseMove(t)
				}, this._mouseUpDelegate = function (t) {
					return e._mouseUp(t)
				}, n(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), o = !0)), !0
			}
		},
		_mouseMove: function (t) {
			return !n.browser.msie || 9 <= document.documentMode || t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, t), this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
		},
		_mouseUp: function (t) {
			return n(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target == this._mouseDownEvent.target && n.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
		},
		_mouseDistanceMet: function (t) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function (t) {
			return this.mouseDelayMet
		},
		_mouseStart: function (t) {},
		_mouseDrag: function (t) {},
		_mouseStop: function (t) {},
		_mouseCapture: function (t) {
			return !0
		}
	})
}(jQuery),
function (b, t) {
	b.widget("ui.draggable", b.ui.mouse, {
		widgetEventPrefix: "drag",
		options: {
			addClasses: !0,
			appendTo: "parent",
			axis: !1,
			connectToSortable: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			iframeFix: !1,
			opacity: !1,
			refreshPositions: !1,
			revert: !1,
			revertDuration: 500,
			scope: "default",
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: !1,
			snapMode: "both",
			snapTolerance: 20,
			stack: !1,
			zIndex: !1
		},
		_create: function () {
			"original" == this.options.helper && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
		},
		destroy: function () {
			if (this.element.data("draggable")) return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
		},
		_mouseCapture: function (t) {
			var e = this.options;
			return !(this.helper || e.disabled || b(t.target).is(".ui-resizable-handle")) && (this.handle = this._getHandle(t), !!this.handle && (e.iframeFix && b(!0 === e.iframeFix ? "iframe" : e.iframeFix).each(function () {
				b('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
					width: this.offsetWidth + "px",
					height: this.offsetHeight + "px",
					position: "absolute",
					opacity: "0.001",
					zIndex: 1e3
				}).css(b(this).offset()).appendTo("body")
			}), !0))
		},
		_mouseStart: function (t) {
			var e = this.options;
			return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), b.ui.ddmanager && (b.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			}, b.extend(this.offset, {
				click: {
					left: t.pageX - this.offset.left,
					top: t.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt), e.containment && this._setContainment(), !1 === this._trigger("start", t) ? (this._clear(), !1) : (this._cacheHelperProportions(), b.ui.ddmanager && !e.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), b.ui.ddmanager && b.ui.ddmanager.dragStart(this, t), !0)
		},
		_mouseDrag: function (t, e) {
			if (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), !e) {
				var i = this._uiHash();
				if (!1 === this._trigger("drag", t, i)) return this._mouseUp({}), !1;
				this.position = i.position
			}
			return this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px"), b.ui.ddmanager && b.ui.ddmanager.drag(this, t), !1
		},
		_mouseStop: function (t) {
			var e = !1;
			b.ui.ddmanager && !this.options.dropBehaviour && (e = b.ui.ddmanager.drop(this, t)), this.dropped && (e = this.dropped, this.dropped = !1);
			for (var i = this.element[0], s = !1; i && (i = i.parentNode);) i == document && (s = !0);
			if (!s && "original" === this.options.helper) return !1;
			if ("invalid" == this.options.revert && !e || "valid" == this.options.revert && e || !0 === this.options.revert || b.isFunction(this.options.revert) && this.options.revert.call(this.element, e)) {
				var n = this;
				b(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
					!1 !== n._trigger("stop", t) && n._clear()
				})
			} else !1 !== this._trigger("stop", t) && this._clear();
			return !1
		},
		_mouseUp: function (t) {
			return !0 === this.options.iframeFix && b("div.ui-draggable-iframeFix").each(function () {
				this.parentNode.removeChild(this)
			}), b.ui.ddmanager && b.ui.ddmanager.dragStop(this, t), b.ui.mouse.prototype._mouseUp.call(this, t)
		},
		cancel: function () {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
		},
		_getHandle: function (t) {
			var e = !this.options.handle || !b(this.options.handle, this.element).length;
			return b(this.options.handle, this.element).find("*").andSelf().each(function () {
				this == t.target && (e = !0)
			}), e
		},
		_createHelper: function (t) {
			var e = this.options,
				i = b.isFunction(e.helper) ? b(e.helper.apply(this.element[0], [t])) : "clone" == e.helper ? this.element.clone().removeAttr("id") : this.element;
			return i.parents("body").length || i.appendTo("parent" == e.appendTo ? this.element[0].parentNode : e.appendTo), i[0] != this.element[0] && !/(fixed|absolute)/.test(i.css("position")) && i.css("position", "absolute"), i
		},
		_adjustOffsetFromHelper: function (t) {
			"string" == typeof t && (t = t.split(" ")), b.isArray(t) && (t = {
				left: +t[0],
				top: +t[1] || 0
			}), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
		},
		_getParentOffset: function () {
			this.offsetParent = this.helper.offsetParent();
			var t = this.offsetParent.offset();
			return "absolute" == this.cssPosition && this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && b.browser.msie) && (t = {
				top: 0,
				left: 0
			}), {
				top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function () {
			if ("relative" == this.cssPosition) {
				var t = this.element.position();
				return {
					top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function () {
			this.margins = {
				left: parseInt(this.element.css("marginLeft"), 10) || 0,
				top: parseInt(this.element.css("marginTop"), 10) || 0,
				right: parseInt(this.element.css("marginRight"), 10) || 0,
				bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function () {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function () {
			var t = this.options;
			if ("parent" == t.containment && (t.containment = this.helper[0].parentNode), "document" != t.containment && "window" != t.containment || (this.containment = ["document" == t.containment ? 0 : b(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, "document" == t.containment ? 0 : b(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, ("document" == t.containment ? 0 : b(window).scrollLeft()) + b("document" == t.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ("document" == t.containment ? 0 : b(window).scrollTop()) + (b("document" == t.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(t.containment) || t.containment.constructor == Array) t.containment.constructor == Array && (this.containment = t.containment);
			else {
				var e = b(t.containment),
					i = e[0];
				if (!i) return;
				e.offset();
				var s = "hidden" != b(i).css("overflow");
				this.containment = [(parseInt(b(i).css("borderLeftWidth"), 10) || 0) + (parseInt(b(i).css("paddingLeft"), 10) || 0), (parseInt(b(i).css("borderTopWidth"), 10) || 0) + (parseInt(b(i).css("paddingTop"), 10) || 0), (s ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(b(i).css("borderLeftWidth"), 10) || 0) - (parseInt(b(i).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (s ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(b(i).css("borderTopWidth"), 10) || 0) - (parseInt(b(i).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = e
			}
		},
		_convertPositionTo: function (t, e) {
			e || (e = this.position);
			var i = "absolute" == t ? 1 : -1,
				s = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent),
				n = /(html|body)/i.test(s[0].tagName);
			return {
				top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - (b.browser.safari && b.browser.version < 526 && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : n ? 0 : s.scrollTop()) * i),
				left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - (b.browser.safari && b.browser.version < 526 && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : n ? 0 : s.scrollLeft()) * i)
			}
		},
		_generatePosition: function (t) {
			var e = this.options,
				i = "absolute" != this.cssPosition || this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				s = /(html|body)/i.test(i[0].tagName),
				n = t.pageX,
				o = t.pageY;
			if (this.originalPosition) {
				var r;
				if (this.containment) {
					if (this.relative_container) {
						var a = this.relative_container.offset();
						r = [this.containment[0] + a.left, this.containment[1] + a.top, this.containment[2] + a.left, this.containment[3] + a.top]
					} else r = this.containment;
					t.pageX - this.offset.click.left < r[0] && (n = r[0] + this.offset.click.left), t.pageY - this.offset.click.top < r[1] && (o = r[1] + this.offset.click.top), t.pageX - this.offset.click.left > r[2] && (n = r[2] + this.offset.click.left), t.pageY - this.offset.click.top > r[3] && (o = r[3] + this.offset.click.top)
				}
				if (e.grid) {
					var l = e.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / e.grid[1]) * e.grid[1] : this.originalPageY;
					o = r && (l - this.offset.click.top < r[1] || l - this.offset.click.top > r[3]) ? l - this.offset.click.top < r[1] ? l + e.grid[1] : l - e.grid[1] : l;
					var h = e.grid[0] ? this.originalPageX + Math.round((n - this.originalPageX) / e.grid[0]) * e.grid[0] : this.originalPageX;
					n = r && (h - this.offset.click.left < r[0] || h - this.offset.click.left > r[2]) ? h - this.offset.click.left < r[0] ? h + e.grid[0] : h - e.grid[0] : h
				}
			}
			return {
				top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari && b.browser.version < 526 && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : s ? 0 : i.scrollTop()),
				left: n - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && b.browser.version < 526 && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : s ? 0 : i.scrollLeft())
			}
		},
		_clear: function () {
			this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
		},
		_trigger: function (t, e, i) {
			return i = i || this._uiHash(), b.ui.plugin.call(this, t, [e, i]), "drag" == t && (this.positionAbs = this._convertPositionTo("absolute")), b.Widget.prototype._trigger.call(this, t, e, i)
		},
		plugins: {},
		_uiHash: function (t) {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	}), b.extend(b.ui.draggable, {
		version: "1.8.22"
	}), b.ui.plugin.add("draggable", "connectToSortable", {
		start: function (e, t) {
			var i = b(this).data("draggable"),
				s = i.options,
				n = b.extend({}, t, {
					item: i.element
				});
			i.sortables = [], b(s.connectToSortable).each(function () {
				var t = b.data(this, "sortable");
				t && !t.options.disabled && (i.sortables.push({
					instance: t,
					shouldRevert: t.options.revert
				}), t.refreshPositions(), t._trigger("activate", e, n))
			})
		},
		stop: function (t, e) {
			var i = b(this).data("draggable"),
				s = b.extend({}, e, {
					item: i.element
				});
			b.each(i.sortables, function () {
				this.instance.isOver ? (this.instance.isOver = 0, i.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, "original" == i.options.helper && this.instance.currentItem.css({
					top: "auto",
					left: "auto"
				})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, s))
			})
		},
		drag: function (e, i) {
			var s = b(this).data("draggable"),
				n = this;
			b.each(s.sortables, function (t) {
				this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions, this.instance.offset.click = s.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = b(n).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
					return i.helper[0]
				}, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = s.offset.click.top, this.instance.offset.click.left = s.offset.click.left, this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top, s._trigger("toSortable", e), s.dropped = this.instance.element, s.currentItem = s.element, this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), s._trigger("fromSortable", e), s.dropped = !1)
			})
		}
	}), b.ui.plugin.add("draggable", "cursor", {
		start: function (t, e) {
			var i = b("body"),
				s = b(this).data("draggable").options;
			i.css("cursor") && (s._cursor = i.css("cursor")), i.css("cursor", s.cursor)
		},
		stop: function (t, e) {
			var i = b(this).data("draggable").options;
			i._cursor && b("body").css("cursor", i._cursor)
		}
	}), b.ui.plugin.add("draggable", "opacity", {
		start: function (t, e) {
			var i = b(e.helper),
				s = b(this).data("draggable").options;
			i.css("opacity") && (s._opacity = i.css("opacity")), i.css("opacity", s.opacity)
		},
		stop: function (t, e) {
			var i = b(this).data("draggable").options;
			i._opacity && b(e.helper).css("opacity", i._opacity)
		}
	}), b.ui.plugin.add("draggable", "scroll", {
		start: function (t, e) {
			var i = b(this).data("draggable");
			i.scrollParent[0] != document && "HTML" != i.scrollParent[0].tagName && (i.overflowOffset = i.scrollParent.offset())
		},
		drag: function (t, e) {
			var i = b(this).data("draggable"),
				s = i.options,
				n = !1;
			i.scrollParent[0] != document && "HTML" != i.scrollParent[0].tagName ? (s.axis && "x" == s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - t.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop + s.scrollSpeed : t.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop - s.scrollSpeed)), s.axis && "y" == s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - t.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft + s.scrollSpeed : t.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && "x" == s.axis || (t.pageY - b(document).scrollTop() < s.scrollSensitivity ? n = b(document).scrollTop(b(document).scrollTop() - s.scrollSpeed) : b(window).height() - (t.pageY - b(document).scrollTop()) < s.scrollSensitivity && (n = b(document).scrollTop(b(document).scrollTop() + s.scrollSpeed))), s.axis && "y" == s.axis || (t.pageX - b(document).scrollLeft() < s.scrollSensitivity ? n = b(document).scrollLeft(b(document).scrollLeft() - s.scrollSpeed) : b(window).width() - (t.pageX - b(document).scrollLeft()) < s.scrollSensitivity && (n = b(document).scrollLeft(b(document).scrollLeft() + s.scrollSpeed)))), !1 !== n && b.ui.ddmanager && !s.dropBehaviour && b.ui.ddmanager.prepareOffsets(i, t)
		}
	}), b.ui.plugin.add("draggable", "snap", {
		start: function (t, e) {
			var i = b(this).data("draggable"),
				s = i.options;
			i.snapElements = [], b(s.snap.constructor != String ? s.snap.items || ":data(draggable)" : s.snap).each(function () {
				var t = b(this),
					e = t.offset();
				this != i.element[0] && i.snapElements.push({
					item: this,
					width: t.outerWidth(),
					height: t.outerHeight(),
					top: e.top,
					left: e.left
				})
			})
		},
		drag: function (t, e) {
			for (var i = b(this).data("draggable"), s = i.options, n = s.snapTolerance, o = e.offset.left, r = o + i.helperProportions.width, a = e.offset.top, l = a + i.helperProportions.height, h = i.snapElements.length - 1; 0 <= h; h--) {
				var c = i.snapElements[h].left,
					u = c + i.snapElements[h].width,
					d = i.snapElements[h].top,
					p = d + i.snapElements[h].height;
				if (c - n < o && o < u + n && d - n < a && a < p + n || c - n < o && o < u + n && d - n < l && l < p + n || c - n < r && r < u + n && d - n < a && a < p + n || c - n < r && r < u + n && d - n < l && l < p + n) {
					if ("inner" != s.snapMode) {
						var f = Math.abs(d - l) <= n,
							g = Math.abs(p - a) <= n,
							m = Math.abs(c - r) <= n,
							v = Math.abs(u - o) <= n;
						f && (e.position.top = i._convertPositionTo("relative", {
							top: d - i.helperProportions.height,
							left: 0
						}).top - i.margins.top), g && (e.position.top = i._convertPositionTo("relative", {
							top: p,
							left: 0
						}).top - i.margins.top), m && (e.position.left = i._convertPositionTo("relative", {
							top: 0,
							left: c - i.helperProportions.width
						}).left - i.margins.left), v && (e.position.left = i._convertPositionTo("relative", {
							top: 0,
							left: u
						}).left - i.margins.left)
					}
					var _ = f || g || m || v;
					if ("outer" != s.snapMode) {
						f = Math.abs(d - a) <= n, g = Math.abs(p - l) <= n, m = Math.abs(c - o) <= n, v = Math.abs(u - r) <= n;
						f && (e.position.top = i._convertPositionTo("relative", {
							top: d,
							left: 0
						}).top - i.margins.top), g && (e.position.top = i._convertPositionTo("relative", {
							top: p - i.helperProportions.height,
							left: 0
						}).top - i.margins.top), m && (e.position.left = i._convertPositionTo("relative", {
							top: 0,
							left: c
						}).left - i.margins.left), v && (e.position.left = i._convertPositionTo("relative", {
							top: 0,
							left: u - i.helperProportions.width
						}).left - i.margins.left)
					}!i.snapElements[h].snapping && (f || g || m || v || _) && i.options.snap.snap && i.options.snap.snap.call(i.element, t, b.extend(i._uiHash(), {
						snapItem: i.snapElements[h].item
					})), i.snapElements[h].snapping = f || g || m || v || _
				} else i.snapElements[h].snapping && i.options.snap.release && i.options.snap.release.call(i.element, t, b.extend(i._uiHash(), {
					snapItem: i.snapElements[h].item
				})), i.snapElements[h].snapping = !1
			}
		}
	}), b.ui.plugin.add("draggable", "stack", {
		start: function (t, e) {
			var i = b(this).data("draggable").options,
				s = b.makeArray(b(i.stack)).sort(function (t, e) {
					return (parseInt(b(t).css("zIndex"), 10) || 0) - (parseInt(b(e).css("zIndex"), 10) || 0)
				});
			if (s.length) {
				var n = parseInt(s[0].style.zIndex) || 0;
				b(s).each(function (t) {
					this.style.zIndex = n + t
				}), this[0].style.zIndex = n + s.length
			}
		}
	}), b.ui.plugin.add("draggable", "zIndex", {
		start: function (t, e) {
			var i = b(e.helper),
				s = b(this).data("draggable").options;
			i.css("zIndex") && (s._zIndex = i.css("zIndex")), i.css("zIndex", s.zIndex)
		},
		stop: function (t, e) {
			var i = b(this).data("draggable").options;
			i._zIndex && b(e.helper).css("zIndex", i._zIndex)
		}
	})
}(jQuery),
function (p, t) {
	p.widget("ui.droppable", {
		widgetEventPrefix: "drop",
		options: {
			accept: "*",
			activeClass: !1,
			addClasses: !0,
			greedy: !1,
			hoverClass: !1,
			scope: "default",
			tolerance: "intersect"
		},
		_create: function () {
			var t = this.options,
				e = t.accept;
			this.isover = 0, this.isout = 1, this.accept = p.isFunction(e) ? e : function (t) {
				return t.is(e)
			}, this.proportions = {
				width: this.element[0].offsetWidth,
				height: this.element[0].offsetHeight
			}, p.ui.ddmanager.droppables[t.scope] = p.ui.ddmanager.droppables[t.scope] || [], p.ui.ddmanager.droppables[t.scope].push(this), t.addClasses && this.element.addClass("ui-droppable")
		},
		destroy: function () {
			for (var t = p.ui.ddmanager.droppables[this.options.scope], e = 0; e < t.length; e++) t[e] == this && t.splice(e, 1);
			return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this
		},
		_setOption: function (t, e) {
			"accept" == t && (this.accept = p.isFunction(e) ? e : function (t) {
				return t.is(e)
			}), p.Widget.prototype._setOption.apply(this, arguments)
		},
		_activate: function (t) {
			var e = p.ui.ddmanager.current;
			this.options.activeClass && this.element.addClass(this.options.activeClass), e && this._trigger("activate", t, this.ui(e))
		},
		_deactivate: function (t) {
			var e = p.ui.ddmanager.current;
			this.options.activeClass && this.element.removeClass(this.options.activeClass), e && this._trigger("deactivate", t, this.ui(e))
		},
		_over: function (t) {
			var e = p.ui.ddmanager.current;
			e && (e.currentItem || e.element)[0] != this.element[0] && this.accept.call(this.element[0], e.currentItem || e.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(e)))
		},
		_out: function (t) {
			var e = p.ui.ddmanager.current;
			e && (e.currentItem || e.element)[0] != this.element[0] && this.accept.call(this.element[0], e.currentItem || e.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(e)))
		},
		_drop: function (t, e) {
			var i = e || p.ui.ddmanager.current;
			if (!i || (i.currentItem || i.element)[0] == this.element[0]) return !1;
			var s = !1;
			return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
				var t = p.data(this, "droppable");
				if (t.options.greedy && !t.options.disabled && t.options.scope == i.options.scope && t.accept.call(t.element[0], i.currentItem || i.element) && p.ui.intersect(i, p.extend(t, {
						offset: t.element.offset()
					}), t.options.tolerance)) return !(s = !0)
			}), !s && (!!this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(i)), this.element))
		},
		ui: function (t) {
			return {
				draggable: t.currentItem || t.element,
				helper: t.helper,
				position: t.position,
				offset: t.positionAbs
			}
		}
	}), p.extend(p.ui.droppable, {
		version: "1.8.22"
	}), p.ui.intersect = function (t, e, i) {
		if (!e.offset) return !1;
		var s = (t.positionAbs || t.position.absolute).left,
			n = s + t.helperProportions.width,
			o = (t.positionAbs || t.position.absolute).top,
			r = o + t.helperProportions.height,
			a = e.offset.left,
			l = a + e.proportions.width,
			h = e.offset.top,
			c = h + e.proportions.height;
		switch (i) {
			case "fit":
				return a <= s && n <= l && h <= o && r <= c;
			case "intersect":
				return a < s + t.helperProportions.width / 2 && n - t.helperProportions.width / 2 < l && h < o + t.helperProportions.height / 2 && r - t.helperProportions.height / 2 < c;
			case "pointer":
				var u = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left,
					d = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top;
				return p.ui.isOver(d, u, h, a, e.proportions.height, e.proportions.width);
			case "touch":
				return (h <= o && o <= c || h <= r && r <= c || o < h && c < r) && (a <= s && s <= l || a <= n && n <= l || s < a && l < n);
			default:
				return !1
		}
	}, p.ui.ddmanager = {
		current: null,
		droppables: {
			default: []
		},
		prepareOffsets: function (t, e) {
			var i = p.ui.ddmanager.droppables[t.options.scope] || [],
				s = e ? e.type : null,
				n = (t.currentItem || t.element).find(":data(droppable)").andSelf();
			t: for (var o = 0; o < i.length; o++)
				if (!(i[o].options.disabled || t && !i[o].accept.call(i[o].element[0], t.currentItem || t.element))) {
					for (var r = 0; r < n.length; r++)
						if (n[r] == i[o].element[0]) {
							i[o].proportions.height = 0;
							continue t
						} i[o].visible = "none" != i[o].element.css("display"), i[o].visible && ("mousedown" == s && i[o]._activate.call(i[o], e), i[o].offset = i[o].element.offset(), i[o].proportions = {
						width: i[o].element[0].offsetWidth,
						height: i[o].element[0].offsetHeight
					})
				}
		},
		drop: function (t, e) {
			var i = !1;
			return p.each(p.ui.ddmanager.droppables[t.options.scope] || [], function () {
				this.options && (!this.options.disabled && this.visible && p.ui.intersect(t, this, this.options.tolerance) && (i = this._drop.call(this, e) || i), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, e)))
			}), i
		},
		dragStart: function (t, e) {
			t.element.parents(":not(body,html)").bind("scroll.droppable", function () {
				t.options.refreshPositions || p.ui.ddmanager.prepareOffsets(t, e)
			})
		},
		drag: function (n, o) {
			n.options.refreshPositions && p.ui.ddmanager.prepareOffsets(n, o), p.each(p.ui.ddmanager.droppables[n.options.scope] || [], function () {
				if (!this.options.disabled && !this.greedyChild && this.visible) {
					var t = p.ui.intersect(n, this, this.options.tolerance),
						e = t || 1 != this.isover ? t && 0 == this.isover ? "isover" : null : "isout";
					if (e) {
						var i;
						if (this.options.greedy) {
							var s = this.element.parents(":data(droppable):eq(0)");
							s.length && ((i = p.data(s[0], "droppable")).greedyChild = "isover" == e ? 1 : 0)
						}
						i && "isover" == e && (i.isover = 0, i.isout = 1, i._out.call(i, o)), this[e] = 1, this["isout" == e ? "isover" : "isout"] = 0, this["isover" == e ? "_over" : "_out"].call(this, o), i && "isout" == e && (i.isout = 0, i.isover = 1, i._over.call(i, o))
					}
				}
			})
		},
		dragStop: function (t, e) {
			t.element.parents(":not(body,html)").unbind("scroll.droppable"), t.options.refreshPositions || p.ui.ddmanager.prepareOffsets(t, e)
		}
	}
}(jQuery),
function (f, t) {
	f.widget("ui.resizable", f.ui.mouse, {
		widgetEventPrefix: "resize",
		options: {
			alsoResize: !1,
			animate: !1,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: !1,
			autoHide: !1,
			containment: !1,
			ghost: !1,
			grid: !1,
			handles: "e,s,se",
			helper: !1,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			zIndex: 1e3
		},
		_create: function () {
			var e = this,
				t = this.options;
			if (this.element.addClass("ui-resizable"), f.extend(this, {
					_aspectRatio: !!t.aspectRatio,
					aspectRatio: t.aspectRatio,
					originalElement: this.element,
					_proportionallyResizeElements: [],
					_helper: t.helper || t.ghost || t.animate ? t.helper || "ui-resizable-helper" : null
				}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(f('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
					position: this.element.css("position"),
					width: this.element.outerWidth(),
					height: this.element.outerHeight(),
					top: this.element.css("top"),
					left: this.element.css("left")
				})), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
					marginLeft: this.originalElement.css("marginLeft"),
					marginTop: this.originalElement.css("marginTop"),
					marginRight: this.originalElement.css("marginRight"),
					marginBottom: this.originalElement.css("marginBottom")
				}), this.originalElement.css({
					marginLeft: 0,
					marginTop: 0,
					marginRight: 0,
					marginBottom: 0
				}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
					position: "static",
					zoom: 1,
					display: "block"
				})), this.originalElement.css({
					margin: this.originalElement.css("margin")
				}), this._proportionallyResize()), this.handles = t.handles || (f(".ui-resizable-handle", this.element).length ? {
					n: ".ui-resizable-n",
					e: ".ui-resizable-e",
					s: ".ui-resizable-s",
					w: ".ui-resizable-w",
					se: ".ui-resizable-se",
					sw: ".ui-resizable-sw",
					ne: ".ui-resizable-ne",
					nw: ".ui-resizable-nw"
				} : "e,s,se"), this.handles.constructor == String) {
				"all" == this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
				var i = this.handles.split(",");
				this.handles = {};
				for (var s = 0; s < i.length; s++) {
					var n = f.trim(i[s]),
						o = f('<div class="ui-resizable-handle ' + ("ui-resizable-" + n) + '"></div>');
					o.css({
						zIndex: t.zIndex
					}), "se" == n && o.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[n] = ".ui-resizable-" + n, this.element.append(o)
				}
			}
			this._renderAxis = function (t) {
				for (var e in t = t || this.element, this.handles) {
					if (this.handles[e].constructor == String && (this.handles[e] = f(this.handles[e], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
						var i, s = f(this.handles[e], this.element);
						i = /sw|ne|nw|se|n|s/.test(e) ? s.outerHeight() : s.outerWidth();
						var n = ["padding", /ne|nw|n/.test(e) ? "Top" : /se|sw|s/.test(e) ? "Bottom" : /^e$/.test(e) ? "Right" : "Left"].join("");
						t.css(n, i), this._proportionallyResize()
					}
					f(this.handles[e]).length
				}
			}, this._renderAxis(this.element), this._handles = f(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
				if (!e.resizing) {
					if (this.className) var t = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
					e.axis = t && t[1] ? t[1] : "se"
				}
			}), t.autoHide && (this._handles.hide(), f(this.element).addClass("ui-resizable-autohide").hover(function () {
				t.disabled || (f(this).removeClass("ui-resizable-autohide"), e._handles.show())
			}, function () {
				t.disabled || e.resizing || (f(this).addClass("ui-resizable-autohide"), e._handles.hide())
			})), this._mouseInit()
		},
		destroy: function () {
			this._mouseDestroy();
			var t = function (t) {
				f(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
			};
			if (this.elementIsWrapper) {
				t(this.element);
				var e = this.element;
				e.after(this.originalElement.css({
					position: e.css("position"),
					width: e.outerWidth(),
					height: e.outerHeight(),
					top: e.css("top"),
					left: e.css("left")
				})).remove()
			}
			return this.originalElement.css("resize", this.originalResizeStyle), t(this.originalElement), this
		},
		_mouseCapture: function (t) {
			var e = !1;
			for (var i in this.handles) f(this.handles[i])[0] == t.target && (e = !0);
			return !this.options.disabled && e
		},
		_mouseStart: function (t) {
			var e = this.options,
				i = this.element.position(),
				s = this.element;
			this.resizing = !0, this.documentScroll = {
				top: f(document).scrollTop(),
				left: f(document).scrollLeft()
			}, (s.is(".ui-draggable") || /absolute/.test(s.css("position"))) && s.css({
				position: "absolute",
				top: i.top,
				left: i.left
			}), this._renderProxy();
			var n = g(this.helper.css("left")),
				o = g(this.helper.css("top"));
			e.containment && (n += f(e.containment).scrollLeft() || 0, o += f(e.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
				left: n,
				top: o
			}, this.size = this._helper ? {
				width: s.outerWidth(),
				height: s.outerHeight()
			} : {
				width: s.width(),
				height: s.height()
			}, this.originalSize = this._helper ? {
				width: s.outerWidth(),
				height: s.outerHeight()
			} : {
				width: s.width(),
				height: s.height()
			}, this.originalPosition = {
				left: n,
				top: o
			}, this.sizeDiff = {
				width: s.outerWidth() - s.width(),
				height: s.outerHeight() - s.height()
			}, this.originalMousePosition = {
				left: t.pageX,
				top: t.pageY
			}, this.aspectRatio = "number" == typeof e.aspectRatio ? e.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
			var r = f(".ui-resizable-" + this.axis).css("cursor");
			return f("body").css("cursor", "auto" == r ? this.axis + "-resize" : r), s.addClass("ui-resizable-resizing"), this._propagate("start", t), !0
		},
		_mouseDrag: function (t) {
			var e = this.helper,
				i = (this.options, this.originalMousePosition),
				s = this.axis,
				n = t.pageX - i.left || 0,
				o = t.pageY - i.top || 0,
				r = this._change[s];
			if (!r) return !1;
			var a = r.apply(this, [t, n, o]);
			f.browser.msie && f.browser.version, this.sizeDiff;
			return this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (a = this._updateRatio(a, t)), a = this._respectSize(a, t), this._propagate("resize", t), e.css({
				top: this.position.top + "px",
				left: this.position.left + "px",
				width: this.size.width + "px",
				height: this.size.height + "px"
			}), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(a), this._trigger("resize", t, this.ui()), !1
		},
		_mouseStop: function (t) {
			this.resizing = !1;
			var e = this.options,
				i = this;
			if (this._helper) {
				var s = this._proportionallyResizeElements,
					n = s.length && /textarea/i.test(s[0].nodeName),
					o = n && f.ui.hasScroll(s[0], "left") ? 0 : i.sizeDiff.height,
					r = n ? 0 : i.sizeDiff.width,
					a = {
						width: i.helper.width() - r,
						height: i.helper.height() - o
					},
					l = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
					h = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
				e.animate || this.element.css(f.extend(a, {
					top: h,
					left: l
				})), i.helper.height(i.size.height), i.helper.width(i.size.width), this._helper && !e.animate && this._proportionallyResize()
			}
			return f("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
		},
		_updateVirtualBoundaries: function (t) {
			var e, i, s, n, o, r = this.options;
			o = {
				minWidth: p(r.minWidth) ? r.minWidth : 0,
				maxWidth: p(r.maxWidth) ? r.maxWidth : 1 / 0,
				minHeight: p(r.minHeight) ? r.minHeight : 0,
				maxHeight: p(r.maxHeight) ? r.maxHeight : 1 / 0
			}, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, s = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, n = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), s > o.minHeight && (o.minHeight = s), i < o.maxWidth && (o.maxWidth = i), n < o.maxHeight && (o.maxHeight = n)), this._vBoundaries = o
		},
		_updateCache: function (t) {
			this.options;
			this.offset = this.helper.offset(), p(t.left) && (this.position.left = t.left), p(t.top) && (this.position.top = t.top), p(t.height) && (this.size.height = t.height), p(t.width) && (this.size.width = t.width)
		},
		_updateRatio: function (t, e) {
			this.options;
			var i = this.position,
				s = this.size,
				n = this.axis;
			return p(t.height) ? t.width = t.height * this.aspectRatio : p(t.width) && (t.height = t.width / this.aspectRatio), "sw" == n && (t.left = i.left + (s.width - t.width), t.top = null), "nw" == n && (t.top = i.top + (s.height - t.height), t.left = i.left + (s.width - t.width)), t
		},
		_respectSize: function (t, e) {
			this.helper;
			var i = this._vBoundaries,
				s = (this._aspectRatio || e.shiftKey, this.axis),
				n = p(t.width) && i.maxWidth && i.maxWidth < t.width,
				o = p(t.height) && i.maxHeight && i.maxHeight < t.height,
				r = p(t.width) && i.minWidth && i.minWidth > t.width,
				a = p(t.height) && i.minHeight && i.minHeight > t.height;
			r && (t.width = i.minWidth), a && (t.height = i.minHeight), n && (t.width = i.maxWidth), o && (t.height = i.maxHeight);
			var l = this.originalPosition.left + this.originalSize.width,
				h = this.position.top + this.size.height,
				c = /sw|nw|w/.test(s),
				u = /nw|ne|n/.test(s);
			r && c && (t.left = l - i.minWidth), n && c && (t.left = l - i.maxWidth), a && u && (t.top = h - i.minHeight), o && u && (t.top = h - i.maxHeight);
			var d = !t.width && !t.height;
			return d && !t.left && t.top ? t.top = null : d && !t.top && t.left && (t.left = null), t
		},
		_proportionallyResize: function () {
			this.options;
			if (this._proportionallyResizeElements.length)
				for (var t = this.helper || this.element, e = 0; e < this._proportionallyResizeElements.length; e++) {
					var i = this._proportionallyResizeElements[e];
					if (!this.borderDif) {
						var s = [i.css("borderTopWidth"), i.css("borderRightWidth"), i.css("borderBottomWidth"), i.css("borderLeftWidth")],
							n = [i.css("paddingTop"), i.css("paddingRight"), i.css("paddingBottom"), i.css("paddingLeft")];
						this.borderDif = f.map(s, function (t, e) {
							return (parseInt(t, 10) || 0) + (parseInt(n[e], 10) || 0)
						})
					}
					f.browser.msie && (f(t).is(":hidden") || f(t).parents(":hidden").length) || i.css({
						height: t.height() - this.borderDif[0] - this.borderDif[2] || 0,
						width: t.width() - this.borderDif[1] - this.borderDif[3] || 0
					})
				}
		},
		_renderProxy: function () {
			var t = this.element,
				e = this.options;
			if (this.elementOffset = t.offset(), this._helper) {
				this.helper = this.helper || f('<div style="overflow:hidden;"></div>');
				var i = f.browser.msie && f.browser.version < 7,
					s = i ? 1 : 0,
					n = i ? 2 : -1;
				this.helper.addClass(this._helper).css({
					width: this.element.outerWidth() + n,
					height: this.element.outerHeight() + n,
					position: "absolute",
					left: this.elementOffset.left - s + "px",
					top: this.elementOffset.top - s + "px",
					zIndex: ++e.zIndex
				}), this.helper.appendTo("body").disableSelection()
			} else this.helper = this.element
		},
		_change: {
			e: function (t, e, i) {
				return {
					width: this.originalSize.width + e
				}
			},
			w: function (t, e, i) {
				this.options;
				var s = this.originalSize;
				return {
					left: this.originalPosition.left + e,
					width: s.width - e
				}
			},
			n: function (t, e, i) {
				this.options;
				var s = this.originalSize;
				return {
					top: this.originalPosition.top + i,
					height: s.height - i
				}
			},
			s: function (t, e, i) {
				return {
					height: this.originalSize.height + i
				}
			},
			se: function (t, e, i) {
				return f.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, e, i]))
			},
			sw: function (t, e, i) {
				return f.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, e, i]))
			},
			ne: function (t, e, i) {
				return f.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, e, i]))
			},
			nw: function (t, e, i) {
				return f.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, e, i]))
			}
		},
		_propagate: function (t, e) {
			f.ui.plugin.call(this, t, [e, this.ui()]), "resize" != t && this._trigger(t, e, this.ui())
		},
		plugins: {},
		ui: function () {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			}
		}
	}), f.extend(f.ui.resizable, {
		version: "1.8.22"
	}), f.ui.plugin.add("resizable", "alsoResize", {
		start: function (t, e) {
			var i = f(this).data("resizable").options,
				s = function (t) {
					f(t).each(function () {
						var t = f(this);
						t.data("resizable-alsoresize", {
							width: parseInt(t.width(), 10),
							height: parseInt(t.height(), 10),
							left: parseInt(t.css("left"), 10),
							top: parseInt(t.css("top"), 10)
						})
					})
				};
			"object" != typeof i.alsoResize || i.alsoResize.parentNode ? s(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize)) : f.each(i.alsoResize, function (t) {
				s(t)
			})
		},
		resize: function (t, o) {
			var e = f(this).data("resizable"),
				i = e.options,
				s = e.originalSize,
				n = e.originalPosition,
				r = {
					height: e.size.height - s.height || 0,
					width: e.size.width - s.width || 0,
					top: e.position.top - n.top || 0,
					left: e.position.left - n.left || 0
				},
				a = function (t, i) {
					f(t).each(function () {
						var t = f(this),
							s = f(this).data("resizable-alsoresize"),
							n = {},
							e = i && i.length ? i : t.parents(o.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
						f.each(e, function (t, e) {
							var i = (s[e] || 0) + (r[e] || 0);
							i && 0 <= i && (n[e] = i || null)
						}), t.css(n)
					})
				};
			"object" != typeof i.alsoResize || i.alsoResize.nodeType ? a(i.alsoResize) : f.each(i.alsoResize, function (t, e) {
				a(t, e)
			})
		},
		stop: function (t, e) {
			f(this).removeData("resizable-alsoresize")
		}
	}), f.ui.plugin.add("resizable", "animate", {
		stop: function (e, t) {
			var i = f(this).data("resizable"),
				s = i.options,
				n = i._proportionallyResizeElements,
				o = n.length && /textarea/i.test(n[0].nodeName),
				r = o && f.ui.hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
				a = o ? 0 : i.sizeDiff.width,
				l = {
					width: i.size.width - a,
					height: i.size.height - r
				},
				h = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
				c = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
			i.element.animate(f.extend(l, c && h ? {
				top: c,
				left: h
			} : {}), {
				duration: s.animateDuration,
				easing: s.animateEasing,
				step: function () {
					var t = {
						width: parseInt(i.element.css("width"), 10),
						height: parseInt(i.element.css("height"), 10),
						top: parseInt(i.element.css("top"), 10),
						left: parseInt(i.element.css("left"), 10)
					};
					n && n.length && f(n[0]).css({
						width: t.width,
						height: t.height
					}), i._updateCache(t), i._propagate("resize", e)
				}
			})
		}
	}), f.ui.plugin.add("resizable", "containment", {
		start: function (t, e) {
			var i = f(this).data("resizable"),
				s = i.options,
				n = i.element,
				o = s.containment,
				r = o instanceof f ? o.get(0) : /parent/.test(o) ? n.parent().get(0) : o;
			if (r)
				if (i.containerElement = f(r), /document/.test(o) || o == document) i.containerOffset = {
					left: 0,
					top: 0
				}, i.containerPosition = {
					left: 0,
					top: 0
				}, i.parentData = {
					element: f(document),
					left: 0,
					top: 0,
					width: f(document).width(),
					height: f(document).height() || document.body.parentNode.scrollHeight
				};
				else {
					var a = f(r),
						l = [];
					f(["Top", "Right", "Left", "Bottom"]).each(function (t, e) {
						l[t] = g(a.css("padding" + e))
					}), i.containerOffset = a.offset(), i.containerPosition = a.position(), i.containerSize = {
						height: a.innerHeight() - l[3],
						width: a.innerWidth() - l[1]
					};
					var h = i.containerOffset,
						c = i.containerSize.height,
						u = i.containerSize.width,
						d = f.ui.hasScroll(r, "left") ? r.scrollWidth : u,
						p = f.ui.hasScroll(r) ? r.scrollHeight : c;
					i.parentData = {
						element: r,
						left: h.left,
						top: h.top,
						width: d,
						height: p
					}
				}
		},
		resize: function (t, e) {
			var i = f(this).data("resizable"),
				s = i.options,
				n = (i.containerSize, i.containerOffset),
				o = (i.size, i.position),
				r = i._aspectRatio || t.shiftKey,
				a = {
					top: 0,
					left: 0
				},
				l = i.containerElement;
			l[0] != document && /static/.test(l.css("position")) && (a = n), o.left < (i._helper ? n.left : 0) && (i.size.width = i.size.width + (i._helper ? i.position.left - n.left : i.position.left - a.left), r && (i.size.height = i.size.width / i.aspectRatio), i.position.left = s.helper ? n.left : 0), o.top < (i._helper ? n.top : 0) && (i.size.height = i.size.height + (i._helper ? i.position.top - n.top : i.position.top), r && (i.size.width = i.size.height * i.aspectRatio), i.position.top = i._helper ? n.top : 0), i.offset.left = i.parentData.left + i.position.left, i.offset.top = i.parentData.top + i.position.top;
			var h = Math.abs((i._helper, i.offset.left - a.left + i.sizeDiff.width)),
				c = Math.abs((i._helper ? i.offset.top - a.top : i.offset.top - n.top) + i.sizeDiff.height),
				u = i.containerElement.get(0) == i.element.parent().get(0),
				d = /relative|absolute/.test(i.containerElement.css("position"));
			u && d && (h -= i.parentData.left), h + i.size.width >= i.parentData.width && (i.size.width = i.parentData.width - h, r && (i.size.height = i.size.width / i.aspectRatio)), c + i.size.height >= i.parentData.height && (i.size.height = i.parentData.height - c, r && (i.size.width = i.size.height * i.aspectRatio))
		},
		stop: function (t, e) {
			var i = f(this).data("resizable"),
				s = i.options,
				n = (i.position, i.containerOffset),
				o = i.containerPosition,
				r = i.containerElement,
				a = f(i.helper),
				l = a.offset(),
				h = a.outerWidth() - i.sizeDiff.width,
				c = a.outerHeight() - i.sizeDiff.height;
			i._helper && !s.animate && /relative/.test(r.css("position")) && f(this).css({
				left: l.left - o.left - n.left,
				width: h,
				height: c
			}), i._helper && !s.animate && /static/.test(r.css("position")) && f(this).css({
				left: l.left - o.left - n.left,
				width: h,
				height: c
			})
		}
	}), f.ui.plugin.add("resizable", "ghost", {
		start: function (t, e) {
			var i = f(this).data("resizable"),
				s = i.options,
				n = i.size;
			i.ghost = i.originalElement.clone(), i.ghost.css({
				opacity: .25,
				display: "block",
				position: "relative",
				height: n.height,
				width: n.width,
				margin: 0,
				left: 0,
				top: 0
			}).addClass("ui-resizable-ghost").addClass("string" == typeof s.ghost ? s.ghost : ""), i.ghost.appendTo(i.helper)
		},
		resize: function (t, e) {
			var i = f(this).data("resizable");
			i.options;
			i.ghost && i.ghost.css({
				position: "relative",
				height: i.size.height,
				width: i.size.width
			})
		},
		stop: function (t, e) {
			var i = f(this).data("resizable");
			i.options;
			i.ghost && i.helper && i.helper.get(0).removeChild(i.ghost.get(0))
		}
	}), f.ui.plugin.add("resizable", "grid", {
		resize: function (t, e) {
			var i = f(this).data("resizable"),
				s = i.options,
				n = i.size,
				o = i.originalSize,
				r = i.originalPosition,
				a = i.axis;
			s._aspectRatio || t.shiftKey;
			s.grid = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid;
			var l = Math.round((n.width - o.width) / (s.grid[0] || 1)) * (s.grid[0] || 1),
				h = Math.round((n.height - o.height) / (s.grid[1] || 1)) * (s.grid[1] || 1);
			/^(se|s|e)$/.test(a) ? (i.size.width = o.width + l, i.size.height = o.height + h) : /^(ne)$/.test(a) ? (i.size.width = o.width + l, i.size.height = o.height + h, i.position.top = r.top - h) : (/^(sw)$/.test(a) ? (i.size.width = o.width + l, i.size.height = o.height + h) : (i.size.width = o.width + l, i.size.height = o.height + h, i.position.top = r.top - h), i.position.left = r.left - l)
		}
	});
	var g = function (t) {
			return parseInt(t, 10) || 0
		},
		p = function (t) {
			return !isNaN(parseInt(t, 10))
		}
}(jQuery),
function (h, t) {
	h.widget("ui.selectable", h.ui.mouse, {
		options: {
			appendTo: "body",
			autoRefresh: !0,
			distance: 0,
			filter: "*",
			tolerance: "touch"
		},
		_create: function () {
			var t, e = this;
			this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function () {
				(t = h(e.options.filter, e.element[0])).addClass("ui-selectee"), t.each(function () {
					var t = h(this),
						e = t.offset();
					h.data(this, "selectable-item", {
						element: this,
						$element: t,
						left: e.left,
						top: e.top,
						right: e.left + t.outerWidth(),
						bottom: e.top + t.outerHeight(),
						startselected: !1,
						selected: t.hasClass("ui-selected"),
						selecting: t.hasClass("ui-selecting"),
						unselecting: t.hasClass("ui-unselecting")
					})
				})
			}, this.refresh(), this.selectees = t.addClass("ui-selectee"), this._mouseInit(), this.helper = h("<div class='ui-selectable-helper'></div>")
		},
		destroy: function () {
			return this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), this._mouseDestroy(), this
		},
		_mouseStart: function (i) {
			var s = this;
			if (this.opos = [i.pageX, i.pageY], !this.options.disabled) {
				var t = this.options;
				this.selectees = h(t.filter, this.element[0]), this._trigger("start", i), h(t.appendTo).append(this.helper), this.helper.css({
					left: i.clientX,
					top: i.clientY,
					width: 0,
					height: 0
				}), t.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
					var t = h.data(this, "selectable-item");
					t.startselected = !0, !i.metaKey && !i.ctrlKey && (t.$element.removeClass("ui-selected"), t.selected = !1, t.$element.addClass("ui-unselecting"), t.unselecting = !0, s._trigger("unselecting", i, {
						unselecting: t.element
					}))
				}), h(i.target).parents().andSelf().each(function () {
					var t = h.data(this, "selectable-item");
					if (t) {
						var e = !i.metaKey && !i.ctrlKey || !t.$element.hasClass("ui-selected");
						return t.$element.removeClass(e ? "ui-unselecting" : "ui-selected").addClass(e ? "ui-selecting" : "ui-unselecting"), t.unselecting = !e, t.selecting = e, (t.selected = e) ? s._trigger("selecting", i, {
							selecting: t.element
						}) : s._trigger("unselecting", i, {
							unselecting: t.element
						}), !1
					}
				})
			}
		},
		_mouseDrag: function (i) {
			var s = this;
			if (this.dragged = !0, !this.options.disabled) {
				var n = this.options,
					o = this.opos[0],
					r = this.opos[1],
					a = i.pageX,
					l = i.pageY;
				if (a < o) {
					var t = a;
					a = o, o = t
				}
				if (l < r) {
					t = l;
					l = r, r = t
				}
				return this.helper.css({
					left: o,
					top: r,
					width: a - o,
					height: l - r
				}), this.selectees.each(function () {
					var t = h.data(this, "selectable-item");
					if (t && t.element != s.element[0]) {
						var e = !1;
						"touch" == n.tolerance ? e = !(t.left > a || t.right < o || t.top > l || t.bottom < r) : "fit" == n.tolerance && (e = t.left > o && t.right < a && t.top > r && t.bottom < l), e ? (t.selected && (t.$element.removeClass("ui-selected"), t.selected = !1), t.unselecting && (t.$element.removeClass("ui-unselecting"), t.unselecting = !1), t.selecting || (t.$element.addClass("ui-selecting"), t.selecting = !0, s._trigger("selecting", i, {
							selecting: t.element
						}))) : (t.selecting && ((i.metaKey || i.ctrlKey) && t.startselected ? (t.$element.removeClass("ui-selecting"), t.selecting = !1, t.$element.addClass("ui-selected"), t.selected = !0) : (t.$element.removeClass("ui-selecting"), t.selecting = !1, t.startselected && (t.$element.addClass("ui-unselecting"), t.unselecting = !0), s._trigger("unselecting", i, {
							unselecting: t.element
						}))), t.selected && !i.metaKey && !i.ctrlKey && !t.startselected && (t.$element.removeClass("ui-selected"), t.selected = !1, t.$element.addClass("ui-unselecting"), t.unselecting = !0, s._trigger("unselecting", i, {
							unselecting: t.element
						})))
					}
				}), !1
			}
		},
		_mouseStop: function (e) {
			var i = this;
			this.dragged = !1;
			this.options;
			return h(".ui-unselecting", this.element[0]).each(function () {
				var t = h.data(this, "selectable-item");
				t.$element.removeClass("ui-unselecting"), t.unselecting = !1, t.startselected = !1, i._trigger("unselected", e, {
					unselected: t.element
				})
			}), h(".ui-selecting", this.element[0]).each(function () {
				var t = h.data(this, "selectable-item");
				t.$element.removeClass("ui-selecting").addClass("ui-selected"), t.selecting = !1, t.selected = !0, t.startselected = !0, i._trigger("selected", e, {
					selected: t.element
				})
			}), this._trigger("stop", e), this.helper.remove(), !1
		}
	}), h.extend(h.ui.selectable, {
		version: "1.8.22"
	})
}(jQuery),
function (d, t) {
	d.widget("ui.sortable", d.ui.mouse, {
		widgetEventPrefix: "sort",
		ready: !1,
		options: {
			appendTo: "parent",
			axis: !1,
			connectWith: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			dropOnEmpty: !0,
			forcePlaceholderSize: !1,
			forceHelperSize: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			items: "> *",
			opacity: !1,
			placeholder: !1,
			revert: !1,
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1e3
		},
		_create: function () {
			var t = this.options;
			this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = !!this.items.length && ("x" === t.axis || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display"))), this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
		},
		destroy: function () {
			d.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
			for (var t = this.items.length - 1; 0 <= t; t--) this.items[t].item.removeData(this.widgetName + "-item");
			return this
		},
		_setOption: function (t, e) {
			"disabled" === t ? (this.options[t] = e, this.widget()[e ? "addClass" : "removeClass"]("ui-sortable-disabled")) : d.Widget.prototype._setOption.apply(this, arguments)
		},
		_mouseCapture: function (t, e) {
			var i = this;
			if (this.reverting) return !1;
			if (this.options.disabled || "static" == this.options.type) return !1;
			this._refreshItems(t);
			var s = null,
				n = this;
			d(t.target).parents().each(function () {
				if (d.data(this, i.widgetName + "-item") == n) return s = d(this), !1
			});
			if (d.data(t.target, i.widgetName + "-item") == n && (s = d(t.target)), !s) return !1;
			if (this.options.handle && !e) {
				var o = !1;
				if (d(this.options.handle, s).find("*").andSelf().each(function () {
						this == t.target && (o = !0)
					}), !o) return !1
			}
			return this.currentItem = s, this._removeCurrentsFromItems(), !0
		},
		_mouseStart: function (t, e, i) {
			var s = this.options;
			if ((this.currentContainer = this).refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
					top: this.offset.top - this.margins.top,
					left: this.offset.left - this.margins.left
				}, d.extend(this.offset, {
					click: {
						left: t.pageX - this.offset.left,
						top: t.pageY - this.offset.top
					},
					parent: this._getParentOffset(),
					relative: this._getRelativeOffset()
				}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, s.cursorAt && this._adjustOffsetFromHelper(s.cursorAt), this.domPosition = {
					prev: this.currentItem.prev()[0],
					parent: this.currentItem.parent()[0]
				}, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), s.containment && this._setContainment(), s.cursor && (d("body").css("cursor") && (this._storedCursor = d("body").css("cursor")), d("body").css("cursor", s.cursor)), s.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", s.opacity)), s.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", s.zIndex)), this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !i)
				for (var n = this.containers.length - 1; 0 <= n; n--) this.containers[n]._trigger("activate", t, this._uiHash(this));
			return d.ui.ddmanager && (d.ui.ddmanager.current = this), d.ui.ddmanager && !s.dropBehaviour && d.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
		},
		_mouseDrag: function (t) {
			if (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll) {
				var e = this.options,
					i = !1;
				this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < e.scrollSensitivity ? this.scrollParent[0].scrollTop = i = this.scrollParent[0].scrollTop + e.scrollSpeed : t.pageY - this.overflowOffset.top < e.scrollSensitivity && (this.scrollParent[0].scrollTop = i = this.scrollParent[0].scrollTop - e.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < e.scrollSensitivity ? this.scrollParent[0].scrollLeft = i = this.scrollParent[0].scrollLeft + e.scrollSpeed : t.pageX - this.overflowOffset.left < e.scrollSensitivity && (this.scrollParent[0].scrollLeft = i = this.scrollParent[0].scrollLeft - e.scrollSpeed)) : (t.pageY - d(document).scrollTop() < e.scrollSensitivity ? i = d(document).scrollTop(d(document).scrollTop() - e.scrollSpeed) : d(window).height() - (t.pageY - d(document).scrollTop()) < e.scrollSensitivity && (i = d(document).scrollTop(d(document).scrollTop() + e.scrollSpeed)), t.pageX - d(document).scrollLeft() < e.scrollSensitivity ? i = d(document).scrollLeft(d(document).scrollLeft() - e.scrollSpeed) : d(window).width() - (t.pageX - d(document).scrollLeft()) < e.scrollSensitivity && (i = d(document).scrollLeft(d(document).scrollLeft() + e.scrollSpeed))), !1 !== i && d.ui.ddmanager && !e.dropBehaviour && d.ui.ddmanager.prepareOffsets(this, t)
			}
			this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px");
			for (var s = this.items.length - 1; 0 <= s; s--) {
				var n = this.items[s],
					o = n.item[0],
					r = this._intersectsWithPointer(n);
				if (r && !(o == this.currentItem[0] || this.placeholder[1 == r ? "next" : "prev"]()[0] == o || d.ui.contains(this.placeholder[0], o) || "semi-dynamic" == this.options.type && d.ui.contains(this.element[0], o))) {
					if (this.direction = 1 == r ? "down" : "up", "pointer" != this.options.tolerance && !this._intersectsWithSides(n)) break;
					this._rearrange(t, n), this._trigger("change", t, this._uiHash());
					break
				}
			}
			return this._contactContainers(t), d.ui.ddmanager && d.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
		},
		_mouseStop: function (t, e) {
			if (t) {
				if (d.ui.ddmanager && !this.options.dropBehaviour && d.ui.ddmanager.drop(this, t), this.options.revert) {
					var i = this,
						s = i.placeholder.offset();
					i.reverting = !0, d(this.helper).animate({
						left: s.left - this.offset.parent.left - i.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
						top: s.top - this.offset.parent.top - i.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
					}, parseInt(this.options.revert, 10) || 500, function () {
						i._clear(t)
					})
				} else this._clear(t, e);
				return !1
			}
		},
		cancel: function () {
			if (this.dragging) {
				this._mouseUp({
					target: null
				}), "original" == this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
				for (var t = this.containers.length - 1; 0 <= t; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
			}
			return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" != this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), d.extend(this, {
				helper: null,
				dragging: !1,
				reverting: !1,
				_noFinalSort: null
			}), this.domPosition.prev ? d(this.domPosition.prev).after(this.currentItem) : d(this.domPosition.parent).prepend(this.currentItem)), this
		},
		serialize: function (e) {
			var t = this._getItemsAsjQuery(e && e.connected),
				i = [];
			return e = e || {}, d(t).each(function () {
				var t = (d(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[-=_](.+)/);
				t && i.push((e.key || t[1] + "[]") + "=" + (e.key && e.expression ? t[1] : t[2]))
			}), !i.length && e.key && i.push(e.key + "="), i.join("&")
		},
		toArray: function (t) {
			var e = this._getItemsAsjQuery(t && t.connected),
				i = [];
			return t = t || {}, e.each(function () {
				i.push(d(t.item || this).attr(t.attribute || "id") || "")
			}), i
		},
		_intersectsWith: function (t) {
			var e = this.positionAbs.left,
				i = e + this.helperProportions.width,
				s = this.positionAbs.top,
				n = s + this.helperProportions.height,
				o = t.left,
				r = o + t.width,
				a = t.top,
				l = a + t.height,
				h = this.offset.click.top,
				c = this.offset.click.left,
				u = a < s + h && s + h < l && o < e + c && e + c < r;
			return "pointer" == this.options.tolerance || this.options.forcePointerForContainers || "pointer" != this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? u : o < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < r && a < s + this.helperProportions.height / 2 && n - this.helperProportions.height / 2 < l
		},
		_intersectsWithPointer: function (t) {
			var e = "x" === this.options.axis || d.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
				i = "y" === this.options.axis || d.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
				s = e && i,
				n = this._getDragVerticalDirection(),
				o = this._getDragHorizontalDirection();
			return !!s && (this.floating ? o && "right" == o || "down" == n ? 2 : 1 : n && ("down" == n ? 2 : 1))
		},
		_intersectsWithSides: function (t) {
			var e = d.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
				i = d.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
				s = this._getDragVerticalDirection(),
				n = this._getDragHorizontalDirection();
			return this.floating && n ? "right" == n && i || "left" == n && !i : s && ("down" == s && e || "up" == s && !e)
		},
		_getDragVerticalDirection: function () {
			var t = this.positionAbs.top - this.lastPositionAbs.top;
			return 0 != t && (0 < t ? "down" : "up")
		},
		_getDragHorizontalDirection: function () {
			var t = this.positionAbs.left - this.lastPositionAbs.left;
			return 0 != t && (0 < t ? "right" : "left")
		},
		refresh: function (t) {
			return this._refreshItems(t), this.refreshPositions(), this
		},
		_connectWith: function () {
			var t = this.options;
			return t.connectWith.constructor == String ? [t.connectWith] : t.connectWith
		},
		_getItemsAsjQuery: function (t) {
			var e = [],
				i = [],
				s = this._connectWith();
			if (s && t)
				for (var n = s.length - 1; 0 <= n; n--)
					for (var o = d(s[n]), r = o.length - 1; 0 <= r; r--) {
						var a = d.data(o[r], this.widgetName);
						a && a != this && !a.options.disabled && i.push([d.isFunction(a.options.items) ? a.options.items.call(a.element) : d(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a])
					}
			i.push([d.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
				options: this.options,
				item: this.currentItem
			}) : d(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
			for (n = i.length - 1; 0 <= n; n--) i[n][0].each(function () {
				e.push(this)
			});
			return d(e)
		},
		_removeCurrentsFromItems: function () {
			for (var t = this.currentItem.find(":data(" + this.widgetName + "-item)"), e = 0; e < this.items.length; e++)
				for (var i = 0; i < t.length; i++) t[i] == this.items[e].item[0] && this.items.splice(e, 1)
		},
		_refreshItems: function (t) {
			this.items = [], this.containers = [this];
			var e = this.items,
				i = [
					[d.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
						item: this.currentItem
					}) : d(this.options.items, this.element), this]
				],
				s = this._connectWith();
			if (s && this.ready)
				for (var n = s.length - 1; 0 <= n; n--)
					for (var o = d(s[n]), r = o.length - 1; 0 <= r; r--) {
						var a = d.data(o[r], this.widgetName);
						a && a != this && !a.options.disabled && (i.push([d.isFunction(a.options.items) ? a.options.items.call(a.element[0], t, {
							item: this.currentItem
						}) : d(a.options.items, a.element), a]), this.containers.push(a))
					}
			for (n = i.length - 1; 0 <= n; n--)
				for (var l = i[n][1], h = i[n][0], c = (r = 0, h.length); r < c; r++) {
					var u = d(h[r]);
					u.data(this.widgetName + "-item", l), e.push({
						item: u,
						instance: l,
						width: 0,
						height: 0,
						left: 0,
						top: 0
					})
				}
		},
		refreshPositions: function (t) {
			this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
			for (var e = this.items.length - 1; 0 <= e; e--) {
				var i = this.items[e];
				if (i.instance == this.currentContainer || !this.currentContainer || i.item[0] == this.currentItem[0]) {
					var s = this.options.toleranceElement ? d(this.options.toleranceElement, i.item) : i.item;
					t || (i.width = s.outerWidth(), i.height = s.outerHeight());
					var n = s.offset();
					i.left = n.left, i.top = n.top
				}
			}
			if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
			else
				for (e = this.containers.length - 1; 0 <= e; e--) {
					n = this.containers[e].element.offset();
					this.containers[e].containerCache.left = n.left, this.containers[e].containerCache.top = n.top, this.containers[e].containerCache.width = this.containers[e].element.outerWidth(), this.containers[e].containerCache.height = this.containers[e].element.outerHeight()
				}
			return this
		},
		_createPlaceholder: function (t) {
			var i = t || this,
				s = i.options;
			if (!s.placeholder || s.placeholder.constructor == String) {
				var n = s.placeholder;
				s.placeholder = {
					element: function () {
						var t = d(document.createElement(i.currentItem[0].nodeName)).addClass(n || i.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
						return n || (t.style.visibility = "hidden"), t
					},
					update: function (t, e) {
						n && !s.forcePlaceholderSize || (e.height() || e.height(i.currentItem.innerHeight() - parseInt(i.currentItem.css("paddingTop") || 0, 10) - parseInt(i.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(i.currentItem.innerWidth() - parseInt(i.currentItem.css("paddingLeft") || 0, 10) - parseInt(i.currentItem.css("paddingRight") || 0, 10)))
					}
				}
			}
			i.placeholder = d(s.placeholder.element.call(i.element, i.currentItem)), i.currentItem.after(i.placeholder), s.placeholder.update(i, i.placeholder)
		},
		_contactContainers: function (t) {
			for (var e = null, i = null, s = this.containers.length - 1; 0 <= s; s--)
				if (!d.ui.contains(this.currentItem[0], this.containers[s].element[0]))
					if (this._intersectsWith(this.containers[s].containerCache)) {
						if (e && d.ui.contains(this.containers[s].element[0], e.element[0])) continue;
						e = this.containers[s], i = s
					} else this.containers[s].containerCache.over && (this.containers[s]._trigger("out", t, this._uiHash(this)), this.containers[s].containerCache.over = 0);
			if (e)
				if (1 === this.containers.length) this.containers[i]._trigger("over", t, this._uiHash(this)), this.containers[i].containerCache.over = 1;
				else if (this.currentContainer != this.containers[i]) {
				for (var n = 1e4, o = null, r = this.positionAbs[this.containers[i].floating ? "left" : "top"], a = this.items.length - 1; 0 <= a; a--)
					if (d.ui.contains(this.containers[i].element[0], this.items[a].item[0])) {
						var l = this.containers[i].floating ? this.items[a].item.offset().left : this.items[a].item.offset().top;
						Math.abs(l - r) < n && (n = Math.abs(l - r), o = this.items[a], this.direction = 0 < l - r ? "down" : "up")
					} if (!o && !this.options.dropOnEmpty) return;
				this.currentContainer = this.containers[i], o ? this._rearrange(t, o, null, !0) : this._rearrange(t, null, this.containers[i].element, !0), this._trigger("change", t, this._uiHash()), this.containers[i]._trigger("change", t, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[i]._trigger("over", t, this._uiHash(this)), this.containers[i].containerCache.over = 1
			}
		},
		_createHelper: function (t) {
			var e = this.options,
				i = d.isFunction(e.helper) ? d(e.helper.apply(this.element[0], [t, this.currentItem])) : "clone" == e.helper ? this.currentItem.clone() : this.currentItem;
			return i.parents("body").length || d("parent" != e.appendTo ? e.appendTo : this.currentItem[0].parentNode)[0].appendChild(i[0]), i[0] == this.currentItem[0] && (this._storedCSS = {
				width: this.currentItem[0].style.width,
				height: this.currentItem[0].style.height,
				position: this.currentItem.css("position"),
				top: this.currentItem.css("top"),
				left: this.currentItem.css("left")
			}), ("" == i[0].style.width || e.forceHelperSize) && i.width(this.currentItem.width()), ("" == i[0].style.height || e.forceHelperSize) && i.height(this.currentItem.height()), i
		},
		_adjustOffsetFromHelper: function (t) {
			"string" == typeof t && (t = t.split(" ")), d.isArray(t) && (t = {
				left: +t[0],
				top: +t[1] || 0
			}), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
		},
		_getParentOffset: function () {
			this.offsetParent = this.helper.offsetParent();
			var t = this.offsetParent.offset();
			return "absolute" == this.cssPosition && this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && d.browser.msie) && (t = {
				top: 0,
				left: 0
			}), {
				top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function () {
			if ("relative" == this.cssPosition) {
				var t = this.currentItem.position();
				return {
					top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function () {
			this.margins = {
				left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
				top: parseInt(this.currentItem.css("marginTop"), 10) || 0
			}
		},
		_cacheHelperProportions: function () {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function () {
			var t = this.options;
			if ("parent" == t.containment && (t.containment = this.helper[0].parentNode), "document" != t.containment && "window" != t.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, d("document" == t.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (d("document" == t.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), !/^(document|window|parent)$/.test(t.containment)) {
				var e = d(t.containment)[0],
					i = d(t.containment).offset(),
					s = "hidden" != d(e).css("overflow");
				this.containment = [i.left + (parseInt(d(e).css("borderLeftWidth"), 10) || 0) + (parseInt(d(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(d(e).css("borderTopWidth"), 10) || 0) + (parseInt(d(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(d(e).css("borderLeftWidth"), 10) || 0) - (parseInt(d(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(d(e).css("borderTopWidth"), 10) || 0) - (parseInt(d(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
			}
		},
		_convertPositionTo: function (t, e) {
			e || (e = this.position);
			var i = "absolute" == t ? 1 : -1,
				s = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent),
				n = /(html|body)/i.test(s[0].tagName);
			return {
				top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - (d.browser.safari && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : n ? 0 : s.scrollTop()) * i),
				left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - (d.browser.safari && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : n ? 0 : s.scrollLeft()) * i)
			}
		},
		_generatePosition: function (t) {
			var e = this.options,
				i = "absolute" != this.cssPosition || this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				s = /(html|body)/i.test(i[0].tagName);
			"relative" == this.cssPosition && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
			var n = t.pageX,
				o = t.pageY;
			if (this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (n = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (n = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), e.grid)) {
				var r = this.originalPageY + Math.round((o - this.originalPageY) / e.grid[1]) * e.grid[1];
				o = this.containment && (r - this.offset.click.top < this.containment[1] || r - this.offset.click.top > this.containment[3]) ? r - this.offset.click.top < this.containment[1] ? r + e.grid[1] : r - e.grid[1] : r;
				var a = this.originalPageX + Math.round((n - this.originalPageX) / e.grid[0]) * e.grid[0];
				n = this.containment && (a - this.offset.click.left < this.containment[0] || a - this.offset.click.left > this.containment[2]) ? a - this.offset.click.left < this.containment[0] ? a + e.grid[0] : a - e.grid[0] : a
			}
			return {
				top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (d.browser.safari && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : s ? 0 : i.scrollTop()),
				left: n - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (d.browser.safari && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : s ? 0 : i.scrollLeft())
			}
		},
		_rearrange: function (t, e, i, s) {
			i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" == this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
			var n = this,
				o = this.counter;
			window.setTimeout(function () {
				o == n.counter && n.refreshPositions(!s)
			}, 0)
		},
		_clear: function (t, e) {
			this.reverting = !1;
			var i = [];
			if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] == this.currentItem[0]) {
				for (var s in this._storedCSS) "auto" != this._storedCSS[s] && "static" != this._storedCSS[s] || (this._storedCSS[s] = "");
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
			} else this.currentItem.show();
			if (this.fromOutside && !e && i.push(function (t) {
					this._trigger("receive", t, this._uiHash(this.fromOutside))
				}), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !e && i.push(function (t) {
					this._trigger("update", t, this._uiHash())
				}), !d.ui.contains(this.element[0], this.currentItem[0])) {
				e || i.push(function (t) {
					this._trigger("remove", t, this._uiHash())
				});
				for (s = this.containers.length - 1; 0 <= s; s--) d.ui.contains(this.containers[s].element[0], this.currentItem[0]) && !e && (i.push(function (e) {
					return function (t) {
						e._trigger("receive", t, this._uiHash(this))
					}
				}.call(this, this.containers[s])), i.push(function (e) {
					return function (t) {
						e._trigger("update", t, this._uiHash(this))
					}
				}.call(this, this.containers[s])))
			}
			for (s = this.containers.length - 1; 0 <= s; s--) e || i.push(function (e) {
				return function (t) {
					e._trigger("deactivate", t, this._uiHash(this))
				}
			}.call(this, this.containers[s])), this.containers[s].containerCache.over && (i.push(function (e) {
				return function (t) {
					e._trigger("out", t, this._uiHash(this))
				}
			}.call(this, this.containers[s])), this.containers[s].containerCache.over = 0);
			if (this._storedCursor && d("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" == this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
				if (!e) {
					this._trigger("beforeStop", t, this._uiHash());
					for (s = 0; s < i.length; s++) i[s].call(this, t);
					this._trigger("stop", t, this._uiHash())
				}
				return this.fromOutside = !1
			}
			if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null, !e) {
				for (s = 0; s < i.length; s++) i[s].call(this, t);
				this._trigger("stop", t, this._uiHash())
			}
			return !(this.fromOutside = !1)
		},
		_trigger: function () {
			!1 === d.Widget.prototype._trigger.apply(this, arguments) && this.cancel()
		},
		_uiHash: function (t) {
			var e = t || this;
			return {
				helper: e.helper,
				placeholder: e.placeholder || d([]),
				position: e.position,
				originalPosition: e.originalPosition,
				offset: e.positionAbs,
				item: e.currentItem,
				sender: t ? t.element : null
			}
		}
	}), d.extend(d.ui.sortable, {
		version: "1.8.22"
	})
}(jQuery), jQuery.effects || function (h, r) {
		function s(t) {
			var e;
			return t && t.constructor == Array && 3 == t.length ? t : (e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(t)) ? [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)] : (e = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(t)) ? [2.55 * parseFloat(e[1]), 2.55 * parseFloat(e[2]), 2.55 * parseFloat(e[3])] : (e = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(t)) ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] : (e = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(t)) ? [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)] : (e = /rgba\(0, 0, 0, 0\)/.exec(t)) ? n.transparent : n[h.trim(t).toLowerCase()]
		}

		function c() {
			var t, e = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
				i = {};
			if (e && e.length && e[0] && e[e[0]])
				for (var s = e.length; s--;) "string" == typeof e[t = e[s]] && (i[t.replace(/\-(\w)/g, function (t, e) {
					return e.toUpperCase()
				})] = e[t]);
			else
				for (t in e) "string" == typeof e[t] && (i[t] = e[t]);
			return i
		}

		function u(t) {
			var e, i;
			for (e in t)(null == (i = t[e]) || h.isFunction(i) || e in o || /scrollbar/.test(e) || !/color/i.test(e) && isNaN(parseFloat(i))) && delete t[e];
			return t
		}

		function l(t, e, i, s) {
			return "object" == typeof t && (s = e, i = null, t = (e = t).effect), h.isFunction(e) && (s = e, i = null, e = {}), ("number" == typeof e || h.fx.speeds[e]) && (s = i, i = e, e = {}), h.isFunction(i) && (s = i, i = null), e = e || {}, i = i || e.duration, [t, e, i = h.fx.off ? 0 : "number" == typeof i ? i : i in h.fx.speeds ? h.fx.speeds[i] : h.fx.speeds._default, s = s || e.complete]
		}

		function i(t) {
			return !(t && "number" != typeof t && !h.fx.speeds[t]) || "string" == typeof t && !h.effects[t]
		}
		h.effects = {}, h.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function (t, e) {
			h.fx.step[e] = function (t) {
				t.colorInit || (t.start = function (t, e) {
					var i;
					do {
						if ("" != (i = (h.curCSS || h.css)(t, e)) && "transparent" != i || h.nodeName(t, "body")) break;
						e = "backgroundColor"
					} while (t = t.parentNode);
					return s(i)
				}(t.elem, e), t.end = s(t.end), t.colorInit = !0), t.elem.style[e] = "rgb(" + Math.max(Math.min(parseInt(t.pos * (t.end[0] - t.start[0]) + t.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(t.pos * (t.end[1] - t.start[1]) + t.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(t.pos * (t.end[2] - t.start[2]) + t.start[2], 10), 255), 0) + ")"
			}
		});
		var n = {
				aqua: [0, 255, 255],
				azure: [240, 255, 255],
				beige: [245, 245, 220],
				black: [0, 0, 0],
				blue: [0, 0, 255],
				brown: [165, 42, 42],
				cyan: [0, 255, 255],
				darkblue: [0, 0, 139],
				darkcyan: [0, 139, 139],
				darkgrey: [169, 169, 169],
				darkgreen: [0, 100, 0],
				darkkhaki: [189, 183, 107],
				darkmagenta: [139, 0, 139],
				darkolivegreen: [85, 107, 47],
				darkorange: [255, 140, 0],
				darkorchid: [153, 50, 204],
				darkred: [139, 0, 0],
				darksalmon: [233, 150, 122],
				darkviolet: [148, 0, 211],
				fuchsia: [255, 0, 255],
				gold: [255, 215, 0],
				green: [0, 128, 0],
				indigo: [75, 0, 130],
				khaki: [240, 230, 140],
				lightblue: [173, 216, 230],
				lightcyan: [224, 255, 255],
				lightgreen: [144, 238, 144],
				lightgrey: [211, 211, 211],
				lightpink: [255, 182, 193],
				lightyellow: [255, 255, 224],
				lime: [0, 255, 0],
				magenta: [255, 0, 255],
				maroon: [128, 0, 0],
				navy: [0, 0, 128],
				olive: [128, 128, 0],
				orange: [255, 165, 0],
				pink: [255, 192, 203],
				purple: [128, 0, 128],
				violet: [128, 0, 128],
				red: [255, 0, 0],
				silver: [192, 192, 192],
				white: [255, 255, 255],
				yellow: [255, 255, 0],
				transparent: [255, 255, 255]
			},
			d = ["add", "remove", "toggle"],
			o = {
				border: 1,
				borderBottom: 1,
				borderColor: 1,
				borderLeft: 1,
				borderRight: 1,
				borderTop: 1,
				borderWidth: 1,
				margin: 1,
				padding: 1
			};
		h.effects.animateClass = function (o, r, a, l) {
			return h.isFunction(a) && (l = a, a = null), this.queue(function () {
				var t, i = h(this),
					e = i.attr("style") || " ",
					s = u(c.call(this)),
					n = i.attr("class") || "";
				h.each(d, function (t, e) {
					o[e] && i[e + "Class"](o[e])
				}), t = u(c.call(this)), i.attr("class", n), i.animate(function (t, e) {
					var i, s = {
						_: 0
					};
					for (i in e) t[i] != e[i] && (s[i] = e[i]);
					return s
				}(s, t), {
					queue: !1,
					duration: r,
					easing: a,
					complete: function () {
						h.each(d, function (t, e) {
							o[e] && i[e + "Class"](o[e])
						}), "object" == typeof i.attr("style") ? (i.attr("style").cssText = "", i.attr("style").cssText = e) : i.attr("style", e), l && l.apply(this, arguments), h.dequeue(this)
					}
				})
			})
		}, h.fn.extend({
			_addClass: h.fn.addClass,
			addClass: function (t, e, i, s) {
				return e ? h.effects.animateClass.apply(this, [{
					add: t
				}, e, i, s]) : this._addClass(t)
			},
			_removeClass: h.fn.removeClass,
			removeClass: function (t, e, i, s) {
				return e ? h.effects.animateClass.apply(this, [{
					remove: t
				}, e, i, s]) : this._removeClass(t)
			},
			_toggleClass: h.fn.toggleClass,
			toggleClass: function (t, e, i, s, n) {
				return "boolean" == typeof e || e === r ? i ? h.effects.animateClass.apply(this, [e ? {
					add: t
				} : {
					remove: t
				}, i, s, n]) : this._toggleClass(t, e) : h.effects.animateClass.apply(this, [{
					toggle: t
				}, e, i, s])
			},
			switchClass: function (t, e, i, s, n) {
				return h.effects.animateClass.apply(this, [{
					add: e,
					remove: t
				}, i, s, n])
			}
		}), h.extend(h.effects, {
			version: "1.8.22",
			save: function (t, e) {
				for (var i = 0; i < e.length; i++) null !== e[i] && t.data("ec.storage." + e[i], t[0].style[e[i]])
			},
			restore: function (t, e) {
				for (var i = 0; i < e.length; i++) null !== e[i] && t.css(e[i], t.data("ec.storage." + e[i]))
			},
			setMode: function (t, e) {
				return "toggle" == e && (e = t.is(":hidden") ? "show" : "hide"), e
			},
			getBaseline: function (t, e) {
				var i, s;
				switch (t[0]) {
					case "top":
						i = 0;
						break;
					case "middle":
						i = .5;
						break;
					case "bottom":
						i = 1;
						break;
					default:
						i = t[0] / e.height
				}
				switch (t[1]) {
					case "left":
						s = 0;
						break;
					case "center":
						s = .5;
						break;
					case "right":
						s = 1;
						break;
					default:
						s = t[1] / e.width
				}
				return {
					x: s,
					y: i
				}
			},
			createWrapper: function (i) {
				if (i.parent().is(".ui-effects-wrapper")) return i.parent();
				var s = {
						width: i.outerWidth(!0),
						height: i.outerHeight(!0),
						float: i.css("float")
					},
					t = h("<div></div>").addClass("ui-effects-wrapper").css({
						fontSize: "100%",
						background: "transparent",
						border: "none",
						margin: 0,
						padding: 0
					}),
					e = document.activeElement;
				try {
					e.id
				} catch (t) {
					e = document.body
				}
				return i.wrap(t), (i[0] === e || h.contains(i[0], e)) && h(e).focus(), t = i.parent(), "static" == i.css("position") ? (t.css({
					position: "relative"
				}), i.css({
					position: "relative"
				})) : (h.extend(s, {
					position: i.css("position"),
					zIndex: i.css("z-index")
				}), h.each(["top", "left", "bottom", "right"], function (t, e) {
					s[e] = i.css(e), isNaN(parseInt(s[e], 10)) && (s[e] = "auto")
				}), i.css({
					position: "relative",
					top: 0,
					left: 0,
					right: "auto",
					bottom: "auto"
				})), t.css(s).show()
			},
			removeWrapper: function (t) {
				var e, i = document.activeElement;
				return t.parent().is(".ui-effects-wrapper") ? (e = t.parent().replaceWith(t), (t[0] === i || h.contains(t[0], i)) && h(i).focus(), e) : t
			},
			setTransition: function (s, t, n, o) {
				return o = o || {}, h.each(t, function (t, e) {
					var i = s.cssUnit(e);
					0 < i[0] && (o[e] = i[0] * n + i[1])
				}), o
			}
		}), h.fn.extend({
			effect: function (t, e, i, s) {
				var n = l.apply(this, arguments),
					o = {
						options: n[1],
						duration: n[2],
						callback: n[3]
					},
					r = o.options.mode,
					a = h.effects[t];
				return h.fx.off || !a ? r ? this[r](o.duration, o.callback) : this.each(function () {
					o.callback && o.callback.call(this)
				}) : a.call(this, o)
			},
			_show: h.fn.show,
			show: function (t) {
				if (i(t)) return this._show.apply(this, arguments);
				var e = l.apply(this, arguments);
				return e[1].mode = "show", this.effect.apply(this, e)
			},
			_hide: h.fn.hide,
			hide: function (t) {
				if (i(t)) return this._hide.apply(this, arguments);
				var e = l.apply(this, arguments);
				return e[1].mode = "hide", this.effect.apply(this, e)
			},
			__toggle: h.fn.toggle,
			toggle: function (t) {
				if (i(t) || "boolean" == typeof t || h.isFunction(t)) return this.__toggle.apply(this, arguments);
				var e = l.apply(this, arguments);
				return e[1].mode = "toggle", this.effect.apply(this, e)
			},
			cssUnit: function (t) {
				var i = this.css(t),
					s = [];
				return h.each(["em", "px", "%", "pt"], function (t, e) {
					0 < i.indexOf(e) && (s = [parseFloat(i), e])
				}), s
			}
		}), h.easing.jswing = h.easing.swing, h.extend(h.easing, {
			def: "easeOutQuad",
			swing: function (t, e, i, s, n) {
				return h.easing[h.easing.def](t, e, i, s, n)
			},
			easeInQuad: function (t, e, i, s, n) {
				return s * (e /= n) * e + i
			},
			easeOutQuad: function (t, e, i, s, n) {
				return -s * (e /= n) * (e - 2) + i
			},
			easeInOutQuad: function (t, e, i, s, n) {
				return (e /= n / 2) < 1 ? s / 2 * e * e + i : -s / 2 * (--e * (e - 2) - 1) + i
			},
			easeInCubic: function (t, e, i, s, n) {
				return s * (e /= n) * e * e + i
			},
			easeOutCubic: function (t, e, i, s, n) {
				return s * ((e = e / n - 1) * e * e + 1) + i
			},
			easeInOutCubic: function (t, e, i, s, n) {
				return (e /= n / 2) < 1 ? s / 2 * e * e * e + i : s / 2 * ((e -= 2) * e * e + 2) + i
			},
			easeInQuart: function (t, e, i, s, n) {
				return s * (e /= n) * e * e * e + i
			},
			easeOutQuart: function (t, e, i, s, n) {
				return -s * ((e = e / n - 1) * e * e * e - 1) + i
			},
			easeInOutQuart: function (t, e, i, s, n) {
				return (e /= n / 2) < 1 ? s / 2 * e * e * e * e + i : -s / 2 * ((e -= 2) * e * e * e - 2) + i
			},
			easeInQuint: function (t, e, i, s, n) {
				return s * (e /= n) * e * e * e * e + i
			},
			easeOutQuint: function (t, e, i, s, n) {
				return s * ((e = e / n - 1) * e * e * e * e + 1) + i
			},
			easeInOutQuint: function (t, e, i, s, n) {
				return (e /= n / 2) < 1 ? s / 2 * e * e * e * e * e + i : s / 2 * ((e -= 2) * e * e * e * e + 2) + i
			},
			easeInSine: function (t, e, i, s, n) {
				return -s * Math.cos(e / n * (Math.PI / 2)) + s + i
			},
			easeOutSine: function (t, e, i, s, n) {
				return s * Math.sin(e / n * (Math.PI / 2)) + i
			},
			easeInOutSine: function (t, e, i, s, n) {
				return -s / 2 * (Math.cos(Math.PI * e / n) - 1) + i
			},
			easeInExpo: function (t, e, i, s, n) {
				return 0 == e ? i : s * Math.pow(2, 10 * (e / n - 1)) + i
			},
			easeOutExpo: function (t, e, i, s, n) {
				return e == n ? i + s : s * (1 - Math.pow(2, -10 * e / n)) + i
			},
			easeInOutExpo: function (t, e, i, s, n) {
				return 0 == e ? i : e == n ? i + s : (e /= n / 2) < 1 ? s / 2 * Math.pow(2, 10 * (e - 1)) + i : s / 2 * (2 - Math.pow(2, -10 * --e)) + i
			},
			easeInCirc: function (t, e, i, s, n) {
				return -s * (Math.sqrt(1 - (e /= n) * e) - 1) + i
			},
			easeOutCirc: function (t, e, i, s, n) {
				return s * Math.sqrt(1 - (e = e / n - 1) * e) + i
			},
			easeInOutCirc: function (t, e, i, s, n) {
				return (e /= n / 2) < 1 ? -s / 2 * (Math.sqrt(1 - e * e) - 1) + i : s / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + i
			},
			easeInElastic: function (t, e, i, s, n) {
				var o = 1.70158,
					r = 0,
					a = s;
				if (0 == e) return i;
				if (1 == (e /= n)) return i + s;
				if (r || (r = .3 * n), a < Math.abs(s)) {
					a = s;
					o = r / 4
				} else o = r / (2 * Math.PI) * Math.asin(s / a);
				return -a * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * n - o) * Math.PI / r) + i
			},
			easeOutElastic: function (t, e, i, s, n) {
				var o = 1.70158,
					r = 0,
					a = s;
				if (0 == e) return i;
				if (1 == (e /= n)) return i + s;
				if (r || (r = .3 * n), a < Math.abs(s)) {
					a = s;
					o = r / 4
				} else o = r / (2 * Math.PI) * Math.asin(s / a);
				return a * Math.pow(2, -10 * e) * Math.sin(2 * (e * n - o) * Math.PI / r) + s + i
			},
			easeInOutElastic: function (t, e, i, s, n) {
				var o = 1.70158,
					r = 0,
					a = s;
				if (0 == e) return i;
				if (2 == (e /= n / 2)) return i + s;
				if (r || (r = .3 * n * 1.5), a < Math.abs(s)) {
					a = s;
					o = r / 4
				} else o = r / (2 * Math.PI) * Math.asin(s / a);
				return e < 1 ? -.5 * a * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e * n - o) * Math.PI / r) + i : a * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e * n - o) * Math.PI / r) * .5 + s + i
			},
			easeInBack: function (t, e, i, s, n, o) {
				return o == r && (o = 1.70158), s * (e /= n) * e * ((o + 1) * e - o) + i
			},
			easeOutBack: function (t, e, i, s, n, o) {
				return o == r && (o = 1.70158), s * ((e = e / n - 1) * e * ((o + 1) * e + o) + 1) + i
			},
			easeInOutBack: function (t, e, i, s, n, o) {
				return o == r && (o = 1.70158), (e /= n / 2) < 1 ? s / 2 * e * e * ((1 + (o *= 1.525)) * e - o) + i : s / 2 * ((e -= 2) * e * ((1 + (o *= 1.525)) * e + o) + 2) + i
			},
			easeInBounce: function (t, e, i, s, n) {
				return s - h.easing.easeOutBounce(t, n - e, 0, s, n) + i
			},
			easeOutBounce: function (t, e, i, s, n) {
				return (e /= n) < 1 / 2.75 ? 7.5625 * s * e * e + i : e < 2 / 2.75 ? s * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + i : e < 2.5 / 2.75 ? s * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + i : s * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + i
			},
			easeInOutBounce: function (t, e, i, s, n) {
				return e < n / 2 ? .5 * h.easing.easeInBounce(t, 2 * e, 0, s, n) + i : .5 * h.easing.easeOutBounce(t, 2 * e - n, 0, s, n) + .5 * s + i
			}
		})
	}(jQuery),
	function (h, t) {
		h.effects.blind = function (l) {
			return this.queue(function () {
				var t = h(this),
					e = ["position", "top", "bottom", "left", "right"],
					i = h.effects.setMode(t, l.options.mode || "hide"),
					s = l.options.direction || "vertical";
				h.effects.save(t, e), t.show();
				var n = h.effects.createWrapper(t).css({
						overflow: "hidden"
					}),
					o = "vertical" == s ? "height" : "width",
					r = "vertical" == s ? n.height() : n.width();
				"show" == i && n.css(o, 0);
				var a = {};
				a[o] = "show" == i ? r : 0, n.animate(a, l.duration, l.options.easing, function () {
					"hide" == i && t.hide(), h.effects.restore(t, e), h.effects.removeWrapper(t), l.callback && l.callback.apply(t[0], arguments), t.dequeue()
				})
			})
		}
	}(jQuery),
	function (f, t) {
		f.effects.bounce = function (p) {
			return this.queue(function () {
				var t = f(this),
					e = ["position", "top", "bottom", "left", "right"],
					i = f.effects.setMode(t, p.options.mode || "effect"),
					s = p.options.direction || "up",
					n = p.options.distance || 20,
					o = p.options.times || 5,
					r = p.duration || 250;
				/show|hide/.test(i) && e.push("opacity"), f.effects.save(t, e), t.show(), f.effects.createWrapper(t);
				var a = "up" == s || "down" == s ? "top" : "left",
					l = "up" == s || "left" == s ? "pos" : "neg";
				n = p.options.distance || ("top" == a ? t.outerHeight(!0) / 3 : t.outerWidth(!0) / 3);
				("show" == i && t.css("opacity", 0).css(a, "pos" == l ? -n : n), "hide" == i && (n /= 2 * o), "hide" != i && o--, "show" == i) && ((u = {
					opacity: 1
				})[a] = ("pos" == l ? "+=" : "-=") + n, t.animate(u, r / 2, p.options.easing), n /= 2, o--);
				for (var h = 0; h < o; h++) {
					var c = {};
					(d = {})[a] = ("pos" == l ? "-=" : "+=") + n, c[a] = ("pos" == l ? "+=" : "-=") + n, t.animate(d, r / 2, p.options.easing).animate(c, r / 2, p.options.easing), n = "hide" == i ? 2 * n : n / 2
				}
				if ("hide" == i) {
					var u;
					(u = {
						opacity: 0
					})[a] = ("pos" == l ? "-=" : "+=") + n, t.animate(u, r / 2, p.options.easing, function () {
						t.hide(), f.effects.restore(t, e), f.effects.removeWrapper(t), p.callback && p.callback.apply(this, arguments)
					})
				} else {
					var d;
					c = {};
					(d = {})[a] = ("pos" == l ? "-=" : "+=") + n, c[a] = ("pos" == l ? "+=" : "-=") + n, t.animate(d, r / 2, p.options.easing).animate(c, r / 2, p.options.easing, function () {
						f.effects.restore(t, e), f.effects.removeWrapper(t), p.callback && p.callback.apply(this, arguments)
					})
				}
				t.queue("fx", function () {
					t.dequeue()
				}), t.dequeue()
			})
		}
	}(jQuery),
	function (c, t) {
		c.effects.clip = function (h) {
			return this.queue(function () {
				var t = c(this),
					e = ["position", "top", "bottom", "left", "right", "height", "width"],
					i = c.effects.setMode(t, h.options.mode || "hide"),
					s = h.options.direction || "vertical";
				c.effects.save(t, e), t.show();
				var n = c.effects.createWrapper(t).css({
						overflow: "hidden"
					}),
					o = "IMG" == t[0].tagName ? n : t,
					r = {
						size: "vertical" == s ? "height" : "width",
						position: "vertical" == s ? "top" : "left"
					},
					a = "vertical" == s ? o.height() : o.width();
				"show" == i && (o.css(r.size, 0), o.css(r.position, a / 2));
				var l = {};
				l[r.size] = "show" == i ? a : 0, l[r.position] = "show" == i ? 0 : a / 2, o.animate(l, {
					queue: !1,
					duration: h.duration,
					easing: h.options.easing,
					complete: function () {
						"hide" == i && t.hide(), c.effects.restore(t, e), c.effects.removeWrapper(t), h.callback && h.callback.apply(t[0], arguments), t.dequeue()
					}
				})
			})
		}
	}(jQuery),
	function (h, t) {
		h.effects.drop = function (l) {
			return this.queue(function () {
				var t = h(this),
					e = ["position", "top", "bottom", "left", "right", "opacity"],
					i = h.effects.setMode(t, l.options.mode || "hide"),
					s = l.options.direction || "left";
				h.effects.save(t, e), t.show(), h.effects.createWrapper(t);
				var n = "up" == s || "down" == s ? "top" : "left",
					o = "up" == s || "left" == s ? "pos" : "neg",
					r = l.options.distance || ("top" == n ? t.outerHeight(!0) / 2 : t.outerWidth(!0) / 2);
				"show" == i && t.css("opacity", 0).css(n, "pos" == o ? -r : r);
				var a = {
					opacity: "show" == i ? 1 : 0
				};
				a[n] = ("show" == i ? "pos" == o ? "+=" : "-=" : "pos" == o ? "-=" : "+=") + r, t.animate(a, {
					queue: !1,
					duration: l.duration,
					easing: l.options.easing,
					complete: function () {
						"hide" == i && t.hide(), h.effects.restore(t, e), h.effects.removeWrapper(t), l.callback && l.callback.apply(this, arguments), t.dequeue()
					}
				})
			})
		}
	}(jQuery),
	function (h, t) {
		h.effects.explode = function (l) {
			return this.queue(function () {
				var t = l.options.pieces ? Math.round(Math.sqrt(l.options.pieces)) : 3,
					e = l.options.pieces ? Math.round(Math.sqrt(l.options.pieces)) : 3;
				l.options.mode = "toggle" == l.options.mode ? h(this).is(":visible") ? "hide" : "show" : l.options.mode;
				var i = h(this).show().css("visibility", "hidden"),
					s = i.offset();
				s.top -= parseInt(i.css("marginTop"), 10) || 0, s.left -= parseInt(i.css("marginLeft"), 10) || 0;
				for (var n = i.outerWidth(!0), o = i.outerHeight(!0), r = 0; r < t; r++)
					for (var a = 0; a < e; a++) i.clone().appendTo("body").wrap("<div></div>").css({
						position: "absolute",
						visibility: "visible",
						left: n / e * -a,
						top: o / t * -r
					}).parent().addClass("ui-effects-explode").css({
						position: "absolute",
						overflow: "hidden",
						width: n / e,
						height: o / t,
						left: s.left + a * (n / e) + ("show" == l.options.mode ? (a - Math.floor(e / 2)) * (n / e) : 0),
						top: s.top + r * (o / t) + ("show" == l.options.mode ? (r - Math.floor(t / 2)) * (o / t) : 0),
						opacity: "show" == l.options.mode ? 0 : 1
					}).animate({
						left: s.left + a * (n / e) + ("show" == l.options.mode ? 0 : (a - Math.floor(e / 2)) * (n / e)),
						top: s.top + r * (o / t) + ("show" == l.options.mode ? 0 : (r - Math.floor(t / 2)) * (o / t)),
						opacity: "show" == l.options.mode ? 1 : 0
					}, l.duration || 500);
				setTimeout(function () {
					"show" == l.options.mode ? i.css({
						visibility: "visible"
					}) : i.css({
						visibility: "visible"
					}).hide(), l.callback && l.callback.apply(i[0]), i.dequeue(), h("div.ui-effects-explode").remove()
				}, l.duration || 500)
			})
		}
	}(jQuery),
	function (s, t) {
		s.effects.fade = function (i) {
			return this.queue(function () {
				var t = s(this),
					e = s.effects.setMode(t, i.options.mode || "hide");
				t.animate({
					opacity: e
				}, {
					queue: !1,
					duration: i.duration,
					easing: i.options.easing,
					complete: function () {
						i.callback && i.callback.apply(this, arguments), t.dequeue()
					}
				})
			})
		}
	}(jQuery),
	function (f, t) {
		f.effects.fold = function (p) {
			return this.queue(function () {
				var t = f(this),
					e = ["position", "top", "bottom", "left", "right"],
					i = f.effects.setMode(t, p.options.mode || "hide"),
					s = p.options.size || 15,
					n = !!p.options.horizFirst,
					o = p.duration ? p.duration / 2 : f.fx.speeds._default / 2;
				f.effects.save(t, e), t.show();
				var r = f.effects.createWrapper(t).css({
						overflow: "hidden"
					}),
					a = "show" == i != n,
					l = a ? ["width", "height"] : ["height", "width"],
					h = a ? [r.width(), r.height()] : [r.height(), r.width()],
					c = /([0-9]+)%/.exec(s);
				c && (s = parseInt(c[1], 10) / 100 * h["hide" == i ? 0 : 1]), "show" == i && r.css(n ? {
					height: 0,
					width: s
				} : {
					height: s,
					width: 0
				});
				var u = {},
					d = {};
				u[l[0]] = "show" == i ? h[0] : s, d[l[1]] = "show" == i ? h[1] : 0, r.animate(u, o, p.options.easing).animate(d, o, p.options.easing, function () {
					"hide" == i && t.hide(), f.effects.restore(t, e), f.effects.removeWrapper(t), p.callback && p.callback.apply(t[0], arguments), t.dequeue()
				})
			})
		}
	}(jQuery),
	function (o, t) {
		o.effects.highlight = function (n) {
			return this.queue(function () {
				var t = o(this),
					e = ["backgroundImage", "backgroundColor", "opacity"],
					i = o.effects.setMode(t, n.options.mode || "show"),
					s = {
						backgroundColor: t.css("backgroundColor")
					};
				"hide" == i && (s.opacity = 0), o.effects.save(t, e), t.show().css({
					backgroundImage: "none",
					backgroundColor: n.options.color || "#ffff99"
				}).animate(s, {
					queue: !1,
					duration: n.duration,
					easing: n.options.easing,
					complete: function () {
						"hide" == i && t.hide(), o.effects.restore(t, e), "show" == i && !o.support.opacity && this.style.removeAttribute("filter"), n.callback && n.callback.apply(this, arguments), t.dequeue()
					}
				})
			})
		}
	}(jQuery),
	function (l, t) {
		l.effects.pulsate = function (a) {
			return this.queue(function () {
				var t = l(this),
					e = l.effects.setMode(t, a.options.mode || "show"),
					i = 2 * (a.options.times || 5) - 1,
					s = a.duration ? a.duration / 2 : l.fx.speeds._default / 2,
					n = t.is(":visible"),
					o = 0;
				n || (t.css("opacity", 0).show(), o = 1), ("hide" == e && n || "show" == e && !n) && i--;
				for (var r = 0; r < i; r++) t.animate({
					opacity: o
				}, s, a.options.easing), o = (o + 1) % 2;
				t.animate({
					opacity: o
				}, s, a.options.easing, function () {
					0 == o && t.hide(), a.callback && a.callback.apply(this, arguments)
				}), t.queue("fx", function () {
					t.dequeue()
				}).dequeue()
			})
		}
	}(jQuery),
	function (g, t) {
		g.effects.puff = function (o) {
			return this.queue(function () {
				var t = g(this),
					e = g.effects.setMode(t, o.options.mode || "hide"),
					i = parseInt(o.options.percent, 10) || 150,
					s = i / 100,
					n = {
						height: t.height(),
						width: t.width()
					};
				g.extend(o.options, {
					fade: !0,
					mode: e,
					percent: "hide" == e ? i : 100,
					from: "hide" == e ? n : {
						height: n.height * s,
						width: n.width * s
					}
				}), t.effect("scale", o.options, o.duration, o.callback), t.dequeue()
			})
		}, g.effects.scale = function (h) {
			return this.queue(function () {
				var t = g(this),
					e = g.extend(!0, {}, h.options),
					i = g.effects.setMode(t, h.options.mode || "effect"),
					s = parseInt(h.options.percent, 10) || (0 == parseInt(h.options.percent, 10) ? 0 : "hide" == i ? 0 : 100),
					n = h.options.direction || "both",
					o = h.options.origin;
				"effect" != i && (e.origin = o || ["middle", "center"], e.restore = !0);
				var r = {
					height: t.height(),
					width: t.width()
				};
				t.from = h.options.from || ("show" == i ? {
					height: 0,
					width: 0
				} : r);
				var a = "horizontal" != n ? s / 100 : 1,
					l = "vertical" != n ? s / 100 : 1;
				t.to = {
					height: r.height * a,
					width: r.width * l
				}, h.options.fade && ("show" == i && (t.from.opacity = 0, t.to.opacity = 1), "hide" == i && (t.from.opacity = 1, t.to.opacity = 0)), e.from = t.from, e.to = t.to, e.mode = i, t.effect("size", e, h.duration, h.callback), t.dequeue()
			})
		}, g.effects.size = function (f) {
			return this.queue(function () {
				var t = g(this),
					e = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
					i = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
					s = ["width", "height", "overflow"],
					n = ["fontSize"],
					o = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
					r = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
					a = g.effects.setMode(t, f.options.mode || "effect"),
					l = f.options.restore || !1,
					h = f.options.scale || "both",
					c = f.options.origin,
					u = {
						height: t.height(),
						width: t.width()
					};
				if (t.from = f.options.from || u, t.to = f.options.to || u, c) {
					var d = g.effects.getBaseline(c, u);
					t.from.top = (u.height - t.from.height) * d.y, t.from.left = (u.width - t.from.width) * d.x, t.to.top = (u.height - t.to.height) * d.y, t.to.left = (u.width - t.to.width) * d.x
				}
				var p = {
					from: {
						y: t.from.height / u.height,
						x: t.from.width / u.width
					},
					to: {
						y: t.to.height / u.height,
						x: t.to.width / u.width
					}
				};
				"box" != h && "both" != h || (p.from.y != p.to.y && (e = e.concat(o), t.from = g.effects.setTransition(t, o, p.from.y, t.from), t.to = g.effects.setTransition(t, o, p.to.y, t.to)), p.from.x != p.to.x && (e = e.concat(r), t.from = g.effects.setTransition(t, r, p.from.x, t.from), t.to = g.effects.setTransition(t, r, p.to.x, t.to))), ("content" == h || "both" == h) && p.from.y != p.to.y && (e = e.concat(n), t.from = g.effects.setTransition(t, n, p.from.y, t.from), t.to = g.effects.setTransition(t, n, p.to.y, t.to)), g.effects.save(t, l ? e : i), t.show(), g.effects.createWrapper(t), t.css("overflow", "hidden").css(t.from), "content" != h && "both" != h || (o = o.concat(["marginTop", "marginBottom"]).concat(n), r = r.concat(["marginLeft", "marginRight"]), s = e.concat(o).concat(r), t.find("*[width]").each(function () {
					var t = g(this);
					l && g.effects.save(t, s);
					var e = t.height(),
						i = t.width();
					t.from = {
						height: e * p.from.y,
						width: i * p.from.x
					}, t.to = {
						height: e * p.to.y,
						width: i * p.to.x
					}, p.from.y != p.to.y && (t.from = g.effects.setTransition(t, o, p.from.y, t.from), t.to = g.effects.setTransition(t, o, p.to.y, t.to)), p.from.x != p.to.x && (t.from = g.effects.setTransition(t, r, p.from.x, t.from), t.to = g.effects.setTransition(t, r, p.to.x, t.to)), t.css(t.from), t.animate(t.to, f.duration, f.options.easing, function () {
						l && g.effects.restore(t, s)
					})
				})), t.animate(t.to, {
					queue: !1,
					duration: f.duration,
					easing: f.options.easing,
					complete: function () {
						0 === t.to.opacity && t.css("opacity", t.from.opacity), "hide" == a && t.hide(), g.effects.restore(t, l ? e : i), g.effects.removeWrapper(t), f.callback && f.callback.apply(this, arguments), t.dequeue()
					}
				})
			})
		}
	}(jQuery),
	function (p, t) {
		p.effects.shake = function (d) {
			return this.queue(function () {
				var t = p(this),
					e = ["position", "top", "bottom", "left", "right"],
					i = (p.effects.setMode(t, d.options.mode || "effect"), d.options.direction || "left"),
					s = d.options.distance || 20,
					n = d.options.times || 3,
					o = d.duration || d.options.duration || 140;
				p.effects.save(t, e), t.show(), p.effects.createWrapper(t);
				var r = "up" == i || "down" == i ? "top" : "left",
					a = "up" == i || "left" == i ? "pos" : "neg",
					l = {},
					h = {},
					c = {};
				l[r] = ("pos" == a ? "-=" : "+=") + s, h[r] = ("pos" == a ? "+=" : "-=") + 2 * s, c[r] = ("pos" == a ? "-=" : "+=") + 2 * s, t.animate(l, o, d.options.easing);
				for (var u = 1; u < n; u++) t.animate(h, o, d.options.easing).animate(c, o, d.options.easing);
				t.animate(h, o, d.options.easing).animate(l, o / 2, d.options.easing, function () {
					p.effects.restore(t, e), p.effects.removeWrapper(t), d.callback && d.callback.apply(this, arguments)
				}), t.queue("fx", function () {
					t.dequeue()
				}), t.dequeue()
			})
		}
	}(jQuery),
	function (h, t) {
		h.effects.slide = function (l) {
			return this.queue(function () {
				var t = h(this),
					e = ["position", "top", "bottom", "left", "right"],
					i = h.effects.setMode(t, l.options.mode || "show"),
					s = l.options.direction || "left";
				h.effects.save(t, e), t.show(), h.effects.createWrapper(t).css({
					overflow: "hidden"
				});
				var n = "up" == s || "down" == s ? "top" : "left",
					o = "up" == s || "left" == s ? "pos" : "neg",
					r = l.options.distance || ("top" == n ? t.outerHeight(!0) : t.outerWidth(!0));
				"show" == i && t.css(n, "pos" == o ? isNaN(r) ? "-" + r : -r : r);
				var a = {};
				a[n] = ("show" == i ? "pos" == o ? "+=" : "-=" : "pos" == o ? "-=" : "+=") + r, t.animate(a, {
					queue: !1,
					duration: l.duration,
					easing: l.options.easing,
					complete: function () {
						"hide" == i && t.hide(), h.effects.restore(t, e), h.effects.removeWrapper(t), l.callback && l.callback.apply(this, arguments), t.dequeue()
					}
				})
			})
		}
	}(jQuery),
	function (a, t) {
		a.effects.transfer = function (r) {
			return this.queue(function () {
				var t = a(this),
					e = a(r.options.to),
					i = e.offset(),
					s = {
						top: i.top,
						left: i.left,
						height: e.innerHeight(),
						width: e.innerWidth()
					},
					n = t.offset(),
					o = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(r.options.className).css({
						top: n.top,
						left: n.left,
						height: t.innerHeight(),
						width: t.innerWidth(),
						position: "absolute"
					}).animate(s, r.duration, r.options.easing, function () {
						o.remove(), r.callback && r.callback.apply(t[0], arguments), t.dequeue()
					})
			})
		}
	}(jQuery),
	function (d, t) {
		d.widget("ui.accordion", {
			options: {
				active: 0,
				animated: "slide",
				autoHeight: !0,
				clearStyle: !1,
				collapsible: !1,
				event: "click",
				fillSpace: !1,
				header: "> li > :first-child,> :not(li):even",
				icons: {
					header: "ui-icon-triangle-1-e",
					headerSelected: "ui-icon-triangle-1-s"
				},
				navigation: !1,
				navigationFilter: function () {
					return this.href.toLowerCase() === location.href.toLowerCase()
				}
			},
			_create: function () {
				var e = this,
					t = e.options;
				if (e.running = 0, e.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"), e.headers = e.element.find(t.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
						t.disabled || d(this).addClass("ui-state-hover")
					}).bind("mouseleave.accordion", function () {
						t.disabled || d(this).removeClass("ui-state-hover")
					}).bind("focus.accordion", function () {
						t.disabled || d(this).addClass("ui-state-focus")
					}).bind("blur.accordion", function () {
						t.disabled || d(this).removeClass("ui-state-focus")
					}), e.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"), t.navigation) {
					var i = e.element.find("a").filter(t.navigationFilter).eq(0);
					if (i.length) {
						var s = i.closest(".ui-accordion-header");
						s.length ? e.active = s : e.active = i.closest(".ui-accordion-content").prev()
					}
				}
				e.active = e._findActive(e.active || t.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"), e.active.next().addClass("ui-accordion-content-active"), e._createIcons(), e.resize(), e.element.attr("role", "tablist"), e.headers.attr("role", "tab").bind("keydown.accordion", function (t) {
					return e._keydown(t)
				}).next().attr("role", "tabpanel"), e.headers.not(e.active || "").attr({
					"aria-expanded": "false",
					"aria-selected": "false",
					tabIndex: -1
				}).next().hide(), e.active.length ? e.active.attr({
					"aria-expanded": "true",
					"aria-selected": "true",
					tabIndex: 0
				}) : e.headers.eq(0).attr("tabIndex", 0), d.browser.safari || e.headers.find("a").attr("tabIndex", -1), t.event && e.headers.bind(t.event.split(" ").join(".accordion ") + ".accordion", function (t) {
					e._clickHandler.call(e, t, this), t.preventDefault()
				})
			},
			_createIcons: function () {
				var t = this.options;
				t.icons && (d("<span></span>").addClass("ui-icon " + t.icons.header).prependTo(this.headers), this.active.children(".ui-icon").toggleClass(t.icons.header).toggleClass(t.icons.headerSelected), this.element.addClass("ui-accordion-icons"))
			},
			_destroyIcons: function () {
				this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons")
			},
			destroy: function () {
				var t = this.options;
				this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"), this.headers.find("a").removeAttr("tabIndex"), this._destroyIcons();
				var e = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
				return (t.autoHeight || t.fillHeight) && e.css("height", ""), d.Widget.prototype.destroy.call(this)
			},
			_setOption: function (t, e) {
				d.Widget.prototype._setOption.apply(this, arguments), "active" == t && this.activate(e), "icons" == t && (this._destroyIcons(), e && this._createIcons()), "disabled" == t && this.headers.add(this.headers.next())[e ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
			},
			_keydown: function (t) {
				if (!(this.options.disabled || t.altKey || t.ctrlKey)) {
					var e = d.ui.keyCode,
						i = this.headers.length,
						s = this.headers.index(t.target),
						n = !1;
					switch (t.keyCode) {
						case e.RIGHT:
						case e.DOWN:
							n = this.headers[(s + 1) % i];
							break;
						case e.LEFT:
						case e.UP:
							n = this.headers[(s - 1 + i) % i];
							break;
						case e.SPACE:
						case e.ENTER:
							this._clickHandler({
								target: t.target
							}, t.target), t.preventDefault()
					}
					return !n || (d(t.target).attr("tabIndex", -1), d(n).attr("tabIndex", 0), n.focus(), !1)
				}
			},
			resize: function () {
				var t, e = this.options;
				if (e.fillSpace) {
					if (d.browser.msie) {
						var i = this.element.parent().css("overflow");
						this.element.parent().css("overflow", "hidden")
					}
					t = this.element.parent().height(), d.browser.msie && this.element.parent().css("overflow", i), this.headers.each(function () {
						t -= d(this).outerHeight(!0)
					}), this.headers.next().each(function () {
						d(this).height(Math.max(0, t - d(this).innerHeight() + d(this).height()))
					}).css("overflow", "auto")
				} else e.autoHeight && (t = 0, this.headers.next().each(function () {
					t = Math.max(t, d(this).height("").height())
				}).height(t));
				return this
			},
			activate: function (t) {
				this.options.active = t;
				var e = this._findActive(t)[0];
				return this._clickHandler({
					target: e
				}, e), this
			},
			_findActive: function (t) {
				return t ? "number" == typeof t ? this.headers.filter(":eq(" + t + ")") : this.headers.not(this.headers.not(t)) : !1 === t ? d([]) : this.headers.filter(":eq(0)")
			},
			_clickHandler: function (t, e) {
				var i = this.options;
				if (!i.disabled)
					if (t.target) {
						var s = d(t.currentTarget || e),
							n = s[0] === this.active[0];
						if (i.active = (!i.collapsible || !n) && this.headers.index(s), !(this.running || !i.collapsible && n)) {
							var o = this.active,
								r = (h = s.next(), a = this.active.next(), l = {
									options: i,
									newHeader: n && i.collapsible ? d([]) : s,
									oldHeader: this.active,
									newContent: n && i.collapsible ? d([]) : h,
									oldContent: a
								}, this.headers.index(this.active[0]) > this.headers.index(s[0]));
							this.active = n ? d([]) : s, this._toggle(h, a, l, n, r), o.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(i.icons.headerSelected).addClass(i.icons.header), n || (s.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(i.icons.header).addClass(i.icons.headerSelected), s.next().addClass("ui-accordion-content-active"))
						}
					} else {
						if (!i.collapsible) return;
						this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(i.icons.headerSelected).addClass(i.icons.header), this.active.next().addClass("ui-accordion-content-active");
						var a = this.active.next(),
							l = {
								options: i,
								newHeader: d([]),
								oldHeader: i.active,
								newContent: d([]),
								oldContent: a
							},
							h = this.active = d([]);
						this._toggle(h, a, l)
					}
			},
			_toggle: function (t, e, i, s, n) {
				var o = this,
					r = o.options;
				o.toShow = t, o.toHide = e, o.data = i;
				var a = function () {
					if (o) return o._completed.apply(o, arguments)
				};
				if (o._trigger("changestart", null, o.data), o.running = 0 === e.size() ? t.size() : e.size(), r.animated) {
					var l = {};
					l = r.collapsible && s ? {
						toShow: d([]),
						toHide: e,
						complete: a,
						down: n,
						autoHeight: r.autoHeight || r.fillSpace
					} : {
						toShow: t,
						toHide: e,
						complete: a,
						down: n,
						autoHeight: r.autoHeight || r.fillSpace
					}, r.proxied || (r.proxied = r.animated), r.proxiedDuration || (r.proxiedDuration = r.duration), r.animated = d.isFunction(r.proxied) ? r.proxied(l) : r.proxied, r.duration = d.isFunction(r.proxiedDuration) ? r.proxiedDuration(l) : r.proxiedDuration;
					var h = d.ui.accordion.animations,
						c = r.duration,
						u = r.animated;
					u && !h[u] && !d.easing[u] && (u = "slide"), h[u] || (h[u] = function (t) {
						this.slide(t, {
							easing: u,
							duration: c || 700
						})
					}), h[u](l)
				} else r.collapsible && s ? t.toggle() : (e.hide(), t.show()), a(!0);
				e.prev().attr({
					"aria-expanded": "false",
					"aria-selected": "false",
					tabIndex: -1
				}).blur(), t.prev().attr({
					"aria-expanded": "true",
					"aria-selected": "true",
					tabIndex: 0
				}).focus()
			},
			_completed: function (t) {
				this.running = t ? 0 : --this.running, this.running || (this.options.clearStyle && this.toShow.add(this.toHide).css({
					height: "",
					overflow: ""
				}), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger("change", null, this.data))
			}
		}), d.extend(d.ui.accordion, {
			version: "1.8.22",
			animations: {
				slide: function (s, t) {
					if ((s = d.extend({
							easing: "swing",
							duration: 300
						}, s, t)).toHide.size())
						if (s.toShow.size()) {
							var e, i = s.toShow.css("overflow"),
								n = 0,
								o = {},
								r = {},
								a = s.toShow;
							e = a[0].style.width, a.width(a.parent().width() - parseFloat(a.css("paddingLeft")) - parseFloat(a.css("paddingRight")) - (parseFloat(a.css("borderLeftWidth")) || 0) - (parseFloat(a.css("borderRightWidth")) || 0)), d.each(["height", "paddingTop", "paddingBottom"], function (t, e) {
								r[e] = "hide";
								var i = ("" + d.css(s.toShow[0], e)).match(/^([\d+-.]+)(.*)$/);
								o[e] = {
									value: i[1],
									unit: i[2] || "px"
								}
							}), s.toShow.css({
								height: 0,
								overflow: "hidden"
							}).show(), s.toHide.filter(":hidden").each(s.complete).end().filter(":visible").animate(r, {
								step: function (t, e) {
									"height" == e.prop && (n = e.end - e.start == 0 ? 0 : (e.now - e.start) / (e.end - e.start)), s.toShow[0].style[e.prop] = n * o[e.prop].value + o[e.prop].unit
								},
								duration: s.duration,
								easing: s.easing,
								complete: function () {
									s.autoHeight || s.toShow.css("height", ""), s.toShow.css({
										width: e,
										overflow: i
									}), s.complete()
								}
							})
						} else s.toHide.animate({
							height: "hide",
							paddingTop: "hide",
							paddingBottom: "hide"
						}, s);
					else s.toShow.animate({
						height: "show",
						paddingTop: "show",
						paddingBottom: "show"
					}, s)
				},
				bounceslide: function (t) {
					this.slide(t, {
						easing: t.down ? "easeOutBounce" : "swing",
						duration: t.down ? 1e3 : 200
					})
				}
			}
		})
	}(jQuery),
	function (r, t) {
		var s = 0;
		r.widget("ui.autocomplete", {
			options: {
				appendTo: "body",
				autoFocus: !1,
				delay: 300,
				minLength: 1,
				position: {
					my: "left top",
					at: "left bottom",
					collision: "none"
				},
				source: null
			},
			pending: 0,
			_create: function () {
				var i, n = this,
					o = this.element[0].ownerDocument;
				this.isMultiLine = this.element.is("textarea"), this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
					role: "textbox",
					"aria-autocomplete": "list",
					"aria-haspopup": "true"
				}).bind("keydown.autocomplete", function (t) {
					if (!n.options.disabled && !n.element.propAttr("readOnly")) {
						i = !1;
						var e = r.ui.keyCode;
						switch (t.keyCode) {
							case e.PAGE_UP:
								n._move("previousPage", t);
								break;
							case e.PAGE_DOWN:
								n._move("nextPage", t);
								break;
							case e.UP:
								n._keyEvent("previous", t);
								break;
							case e.DOWN:
								n._keyEvent("next", t);
								break;
							case e.ENTER:
							case e.NUMPAD_ENTER:
								n.menu.active && (i = !0, t.preventDefault());
							case e.TAB:
								if (!n.menu.active) return;
								n.menu.select(t);
								break;
							case e.ESCAPE:
								n.element.val(n.term), n.close(t);
								break;
							default:
								clearTimeout(n.searching), n.searching = setTimeout(function () {
									n.term != n.element.val() && (n.selectedItem = null, n.search(null, t))
								}, n.options.delay)
						}
					}
				}).bind("keypress.autocomplete", function (t) {
					i && (i = !1, t.preventDefault())
				}).bind("focus.autocomplete", function () {
					n.options.disabled || (n.selectedItem = null, n.previous = n.element.val())
				}).bind("blur.autocomplete", function (t) {
					n.options.disabled || (clearTimeout(n.searching), n.closing = setTimeout(function () {
						n.close(t), n._change(t)
					}, 150))
				}), this._initSource(), this.menu = r("<ul></ul>").addClass("ui-autocomplete").appendTo(r(this.options.appendTo || "body", o)[0]).mousedown(function (t) {
					var e = n.menu.element[0];
					r(t.target).closest(".ui-menu-item").length || setTimeout(function () {
						r(document).one("mousedown", function (t) {
							t.target !== n.element[0] && t.target !== e && !r.ui.contains(e, t.target) && n.close()
						})
					}, 1), setTimeout(function () {
						clearTimeout(n.closing)
					}, 13)
				}).menu({
					focus: function (t, e) {
						var i = e.item.data("item.autocomplete");
						!1 !== n._trigger("focus", t, {
							item: i
						}) && /^key/.test(t.originalEvent.type) && n.element.val(i.value)
					},
					selected: function (t, e) {
						var i = e.item.data("item.autocomplete"),
							s = n.previous;
						n.element[0] !== o.activeElement && (n.element.focus(), n.previous = s, setTimeout(function () {
							n.previous = s, n.selectedItem = i
						}, 1)), !1 !== n._trigger("select", t, {
							item: i
						}) && n.element.val(i.value), n.term = n.element.val(), n.close(t), n.selectedItem = i
					},
					blur: function (t, e) {
						n.menu.element.is(":visible") && n.element.val() !== n.term && n.element.val(n.term)
					}
				}).zIndex(this.element.zIndex() + 1).css({
					top: 0,
					left: 0
				}).hide().data("menu"), r.fn.bgiframe && this.menu.element.bgiframe(), n.beforeunloadHandler = function () {
					n.element.removeAttr("autocomplete")
				}, r(window).bind("beforeunload", n.beforeunloadHandler)
			},
			destroy: function () {
				this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), this.menu.element.remove(), r(window).unbind("beforeunload", this.beforeunloadHandler), r.Widget.prototype.destroy.call(this)
			},
			_setOption: function (t, e) {
				r.Widget.prototype._setOption.apply(this, arguments), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(r(e || "body", this.element[0].ownerDocument)[0]), "disabled" === t && e && this.xhr && this.xhr.abort()
			},
			_initSource: function () {
				var i, e, s = this;
				r.isArray(this.options.source) ? (i = this.options.source, this.source = function (t, e) {
					e(r.ui.autocomplete.filter(i, t.term))
				}) : "string" == typeof this.options.source ? (e = this.options.source, this.source = function (t, i) {
					s.xhr && s.xhr.abort(), s.xhr = r.ajax({
						url: e,
						data: t,
						dataType: "json",
						success: function (t, e) {
							i(t)
						},
						error: function () {
							i([])
						}
					})
				}) : this.source = this.options.source
			},
			search: function (t, e) {
				return t = null != t ? t : this.element.val(), this.term = this.element.val(), t.length < this.options.minLength ? this.close(e) : (clearTimeout(this.closing), !1 !== this._trigger("search", e) ? this._search(t) : void 0)
			},
			_search: function (t) {
				this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({
					term: t
				}, this._response())
			},
			_response: function () {
				var e = this,
					i = ++s;
				return function (t) {
					i === s && e.__response(t), e.pending--, e.pending || e.element.removeClass("ui-autocomplete-loading")
				}
			},
			__response: function (t) {
				!this.options.disabled && t && t.length ? (t = this._normalize(t), this._suggest(t), this._trigger("open")) : this.close()
			},
			close: function (t) {
				clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", t))
			},
			_change: function (t) {
				this.previous !== this.element.val() && this._trigger("change", t, {
					item: this.selectedItem
				})
			},
			_normalize: function (t) {
				return t.length && t[0].label && t[0].value ? t : r.map(t, function (t) {
					return "string" == typeof t ? {
						label: t,
						value: t
					} : r.extend({
						label: t.label || t.value,
						value: t.value || t.label
					}, t)
				})
			},
			_suggest: function (t) {
				var e = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
				this._renderMenu(e, t), this.menu.deactivate(), this.menu.refresh(), e.show(), this._resizeMenu(), e.position(r.extend({
					of: this.element
				}, this.options.position)), this.options.autoFocus && this.menu.next(new r.Event("mouseover"))
			},
			_resizeMenu: function () {
				var t = this.menu.element;
				t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
			},
			_renderMenu: function (i, t) {
				var s = this;
				r.each(t, function (t, e) {
					s._renderItem(i, e)
				})
			},
			_renderItem: function (t, e) {
				return r("<li></li>").data("item.autocomplete", e).append(r("<a></a>").text(e.label)).appendTo(t)
			},
			_move: function (t, e) {
				if (this.menu.element.is(":visible")) return this.menu.first() && /^previous/.test(t) || this.menu.last() && /^next/.test(t) ? (this.element.val(this.term), void this.menu.deactivate()) : void this.menu[t](e);
				this.search(null, e)
			},
			widget: function () {
				return this.menu.element
			},
			_keyEvent: function (t, e) {
				this.isMultiLine && !this.menu.element.is(":visible") || (this._move(t, e), e.preventDefault())
			}
		}), r.extend(r.ui.autocomplete, {
			escapeRegex: function (t) {
				return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
			},
			filter: function (t, e) {
				var i = new RegExp(r.ui.autocomplete.escapeRegex(e), "i");
				return r.grep(t, function (t) {
					return i.test(t.label || t.value || t)
				})
			}
		})
	}(jQuery),
	function (n) {
		n.widget("ui.menu", {
			_create: function () {
				var e = this;
				this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
					role: "listbox",
					"aria-activedescendant": "ui-active-menuitem"
				}).click(function (t) {
					n(t.target).closest(".ui-menu-item a").length && (t.preventDefault(), e.select(t))
				}), this.refresh()
			},
			refresh: function () {
				var e = this;
				this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function (t) {
					e.activate(t, n(this).parent())
				}).mouseleave(function () {
					e.deactivate()
				})
			},
			activate: function (t, e) {
				if (this.deactivate(), this.hasScroll()) {
					var i = e.offset().top - this.element.offset().top,
						s = this.element.scrollTop(),
						n = this.element.height();
					i < 0 ? this.element.scrollTop(s + i) : n <= i && this.element.scrollTop(s + i - n + e.height())
				}
				this.active = e.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), this._trigger("focus", t, {
					item: e
				})
			},
			deactivate: function () {
				this.active && (this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), this.active = null)
			},
			next: function (t) {
				this.move("next", ".ui-menu-item:first", t)
			},
			previous: function (t) {
				this.move("prev", ".ui-menu-item:last", t)
			},
			first: function () {
				return this.active && !this.active.prevAll(".ui-menu-item").length
			},
			last: function () {
				return this.active && !this.active.nextAll(".ui-menu-item").length
			},
			move: function (t, e, i) {
				if (this.active) {
					var s = this.active[t + "All"](".ui-menu-item").eq(0);
					s.length ? this.activate(i, s) : this.activate(i, this.element.children(e))
				} else this.activate(i, this.element.children(e))
			},
			nextPage: function (t) {
				if (this.hasScroll()) {
					if (!this.active || this.last()) return void this.activate(t, this.element.children(".ui-menu-item:first"));
					var e = this.active.offset().top,
						i = this.element.height(),
						s = this.element.children(".ui-menu-item").filter(function () {
							var t = n(this).offset().top - e - i + n(this).height();
							return t < 10 && -10 < t
						});
					s.length || (s = this.element.children(".ui-menu-item:last")), this.activate(t, s)
				} else this.activate(t, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
			},
			previousPage: function (t) {
				if (this.hasScroll()) {
					if (!this.active || this.first()) return void this.activate(t, this.element.children(".ui-menu-item:last"));
					var e = this.active.offset().top,
						i = this.element.height(),
						s = this.element.children(".ui-menu-item").filter(function () {
							var t = n(this).offset().top - e + i - n(this).height();
							return t < 10 && -10 < t
						});
					s.length || (s = this.element.children(".ui-menu-item:first")), this.activate(t, s)
				} else this.activate(t, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
			},
			hasScroll: function () {
				return this.element.height() < this.element[n.fn.prop ? "prop" : "attr"]("scrollHeight")
			},
			select: function (t) {
				this._trigger("selected", t, {
					item: this.active
				})
			}
		})
	}(jQuery),
	function (o, t) {
		var r, a, l, h, c = "ui-button ui-widget ui-state-default ui-corner-all",
			u = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
			d = function () {
				var t = o(this).find(":ui-button");
				setTimeout(function () {
					t.button("refresh")
				}, 1)
			},
			p = function (t) {
				var e = t.name,
					i = t.form,
					s = o([]);
				return e && (s = i ? o(i).find("[name='" + e + "']") : o("[name='" + e + "']", t.ownerDocument).filter(function () {
					return !this.form
				})), s
			};
		o.widget("ui.button", {
			options: {
				disabled: null,
				text: !0,
				label: null,
				icons: {
					primary: null,
					secondary: null
				}
			},
			_create: function () {
				this.element.closest("form").unbind("reset.button").bind("reset.button", d), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.propAttr("disabled") : this.element.propAttr("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
				var e = this,
					i = this.options,
					t = "checkbox" === this.type || "radio" === this.type,
					s = "ui-state-hover" + (t ? "" : " ui-state-active"),
					n = "ui-state-focus";
				null === i.label && (i.label = this.buttonElement.html()), this.buttonElement.addClass(c).attr("role", "button").bind("mouseenter.button", function () {
					i.disabled || (o(this).addClass("ui-state-hover"), this === r && o(this).addClass("ui-state-active"))
				}).bind("mouseleave.button", function () {
					i.disabled || o(this).removeClass(s)
				}).bind("click.button", function (t) {
					i.disabled && (t.preventDefault(), t.stopImmediatePropagation())
				}), this.element.bind("focus.button", function () {
					e.buttonElement.addClass(n)
				}).bind("blur.button", function () {
					e.buttonElement.removeClass(n)
				}), t && (this.element.bind("change.button", function () {
					h || e.refresh()
				}), this.buttonElement.bind("mousedown.button", function (t) {
					i.disabled || (h = !1, a = t.pageX, l = t.pageY)
				}).bind("mouseup.button", function (t) {
					i.disabled || a === t.pageX && l === t.pageY || (h = !0)
				})), "checkbox" === this.type ? this.buttonElement.bind("click.button", function () {
					if (i.disabled || h) return !1;
					o(this).toggleClass("ui-state-active"), e.buttonElement.attr("aria-pressed", e.element[0].checked)
				}) : "radio" === this.type ? this.buttonElement.bind("click.button", function () {
					if (i.disabled || h) return !1;
					o(this).addClass("ui-state-active"), e.buttonElement.attr("aria-pressed", "true");
					var t = e.element[0];
					p(t).not(t).map(function () {
						return o(this).button("widget")[0]
					}).removeClass("ui-state-active").attr("aria-pressed", "false")
				}) : (this.buttonElement.bind("mousedown.button", function () {
					if (i.disabled) return !1;
					o(this).addClass("ui-state-active"), r = this, o(document).one("mouseup", function () {
						r = null
					})
				}).bind("mouseup.button", function () {
					if (i.disabled) return !1;
					o(this).removeClass("ui-state-active")
				}).bind("keydown.button", function (t) {
					if (i.disabled) return !1;
					(t.keyCode == o.ui.keyCode.SPACE || t.keyCode == o.ui.keyCode.ENTER) && o(this).addClass("ui-state-active")
				}).bind("keyup.button", function () {
					o(this).removeClass("ui-state-active")
				}), this.buttonElement.is("a") && this.buttonElement.keyup(function (t) {
					t.keyCode === o.ui.keyCode.SPACE && o(this).click()
				})), this._setOption("disabled", i.disabled), this._resetButton()
			},
			_determineButtonType: function () {
				if (this.element.is(":checkbox") ? this.type = "checkbox" : this.element.is(":radio") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button", "checkbox" === this.type || "radio" === this.type) {
					var t = this.element.parents().filter(":last"),
						e = "label[for='" + this.element.attr("id") + "']";
					this.buttonElement = t.find(e), this.buttonElement.length || (t = t.length ? t.siblings() : this.element.siblings(), this.buttonElement = t.filter(e), this.buttonElement.length || (this.buttonElement = t.find(e))), this.element.addClass("ui-helper-hidden-accessible");
					var i = this.element.is(":checked");
					i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.attr("aria-pressed", i)
				} else this.buttonElement = this.element
			},
			widget: function () {
				return this.buttonElement
			},
			destroy: function () {
				this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(c + " ui-state-hover ui-state-active  " + u).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title"), o.Widget.prototype.destroy.call(this)
			},
			_setOption: function (t, e) {
				o.Widget.prototype._setOption.apply(this, arguments), "disabled" !== t ? this._resetButton() : e ? this.element.propAttr("disabled", !0) : this.element.propAttr("disabled", !1)
			},
			refresh: function () {
				var t = this.element.is(":disabled");
				t !== this.options.disabled && this._setOption("disabled", t), "radio" === this.type ? p(this.element[0]).each(function () {
					o(this).is(":checked") ? o(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : o(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
				}) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
			},
			_resetButton: function () {
				if ("input" !== this.type) {
					var t = this.buttonElement.removeClass(u),
						e = o("<span></span>", this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),
						i = this.options.icons,
						s = i.primary && i.secondary,
						n = [];
					i.primary || i.secondary ? (this.options.text && n.push("ui-button-text-icon" + (s ? "s" : i.primary ? "-primary" : "-secondary")), i.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + i.primary + "'></span>"), i.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + i.secondary + "'></span>"), this.options.text || (n.push(s ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || t.attr("title", e))) : n.push("ui-button-text-only"), t.addClass(n.join(" "))
				} else this.options.label && this.element.val(this.options.label)
			}
		}), o.widget("ui.buttonset", {
			options: {
				items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
			},
			_create: function () {
				this.element.addClass("ui-buttonset")
			},
			_init: function () {
				this.refresh()
			},
			_setOption: function (t, e) {
				"disabled" === t && this.buttons.button("option", t, e), o.Widget.prototype._setOption.apply(this, arguments)
			},
			refresh: function () {
				var t = "rtl" === this.element.css("direction");
				this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
					return o(this).button("widget")[0]
				}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
			},
			destroy: function () {
				this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
					return o(this).button("widget")[0]
				}).removeClass("ui-corner-left ui-corner-right").end().button("destroy"), o.Widget.prototype.destroy.call(this)
			}
		})
	}(jQuery),
	function ($, undefined) {
		function Datepicker() {
			this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
				closeText: "Done",
				prevText: "Prev",
				nextText: "Next",
				currentText: "Today",
				monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
				weekHeader: "Wk",
				dateFormat: "mm/dd/yy",
				firstDay: 0,
				isRTL: !1,
				showMonthAfterYear: !1,
				yearSuffix: ""
			}, this._defaults = {
				showOn: "focus",
				showAnim: "fadeIn",
				showOptions: {},
				defaultDate: null,
				appendText: "",
				buttonText: "...",
				buttonImage: "",
				buttonImageOnly: !1,
				hideIfNoPrevNext: !1,
				navigationAsDateFormat: !1,
				gotoCurrent: !1,
				changeMonth: !1,
				changeYear: !1,
				yearRange: "c-10:c+10",
				showOtherMonths: !1,
				selectOtherMonths: !1,
				showWeek: !1,
				calculateWeek: this.iso8601Week,
				shortYearCutoff: "+10",
				minDate: null,
				maxDate: null,
				duration: "fast",
				beforeShowDay: null,
				beforeShow: null,
				onSelect: null,
				onChangeMonthYear: null,
				onClose: null,
				numberOfMonths: 1,
				showCurrentAtPos: 0,
				stepMonths: 1,
				stepBigMonths: 12,
				altField: "",
				altFormat: "",
				constrainInput: !0,
				showButtonPanel: !1,
				autoSize: !1,
				disabled: !1
			}, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
		}

		function bindHover(i) {
			var s = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
			return i.bind("mouseout", function (t) {
				var e = $(t.target).closest(s);
				e.length && e.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
			}).bind("mouseover", function (t) {
				var e = $(t.target).closest(s);
				!$.datepicker._isDisabledDatepicker(instActive.inline ? i.parent()[0] : instActive.input[0]) && e.length && (e.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), e.addClass("ui-state-hover"), e.hasClass("ui-datepicker-prev") && e.addClass("ui-datepicker-prev-hover"), e.hasClass("ui-datepicker-next") && e.addClass("ui-datepicker-next-hover"))
			})
		}

		function extendRemove(t, e) {
			for (var i in $.extend(t, e), e) null != e[i] && e[i] != undefined || (t[i] = e[i]);
			return t
		}

		function isArray(t) {
			return t && ($.browser.safari && "object" == typeof t && t.length || t.constructor && t.constructor.toString().match(/\Array\(\)/))
		}
		$.extend($.ui, {
			datepicker: {
				version: "1.8.22"
			}
		});
		var PROP_NAME = "datepicker",
			dpuuid = (new Date).getTime(),
			instActive;
		$.extend(Datepicker.prototype, {
			markerClassName: "hasDatepicker",
			maxRows: 4,
			log: function () {
				this.debug && console.log.apply("", arguments)
			},
			_widgetDatepicker: function () {
				return this.dpDiv
			},
			setDefaults: function (t) {
				return extendRemove(this._defaults, t || {}), this
			},
			_attachDatepicker: function (target, settings) {
				var inlineSettings = null;
				for (var attrName in this._defaults) {
					var attrValue = target.getAttribute("date:" + attrName);
					if (attrValue) {
						inlineSettings = inlineSettings || {};
						try {
							inlineSettings[attrName] = eval(attrValue)
						} catch (t) {
							inlineSettings[attrName] = attrValue
						}
					}
				}
				var nodeName = target.nodeName.toLowerCase(),
					inline = "div" == nodeName || "span" == nodeName;
				target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
				var inst = this._newInst($(target), inline);
				inst.settings = $.extend({}, settings || {}, inlineSettings || {}), "input" == nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
			},
			_newInst: function (t, e) {
				return {
					id: t[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
					input: t,
					selectedDay: 0,
					selectedMonth: 0,
					selectedYear: 0,
					drawMonth: 0,
					drawYear: 0,
					inline: e,
					dpDiv: e ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
				}
			},
			_connectDatepicker: function (t, s) {
				var e = $(t);
				s.append = $([]), s.trigger = $([]), e.hasClass(this.markerClassName) || (this._attachments(e, s), e.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (t, e, i) {
					s.settings[e] = i
				}).bind("getData.datepicker", function (t, e) {
					return this._get(s, e)
				}), this._autoSize(s), $.data(t, PROP_NAME, s), s.settings.disabled && this._disableDatepicker(t))
			},
			_attachments: function (t, e) {
				var i = this._get(e, "appendText"),
					s = this._get(e, "isRTL");
				e.append && e.append.remove(), i && (e.append = $('<span class="' + this._appendClass + '">' + i + "</span>"), t[s ? "before" : "after"](e.append)), t.unbind("focus", this._showDatepicker), e.trigger && e.trigger.remove();
				var n = this._get(e, "showOn");
				if (("focus" == n || "both" == n) && t.focus(this._showDatepicker), "button" == n || "both" == n) {
					var o = this._get(e, "buttonText"),
						r = this._get(e, "buttonImage");
					e.trigger = $(this._get(e, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
						src: r,
						alt: o,
						title: o
					}) : $('<button type="button"></button>').addClass(this._triggerClass).html("" == r ? o : $("<img/>").attr({
						src: r,
						alt: o,
						title: o
					}))), t[s ? "before" : "after"](e.trigger), e.trigger.click(function () {
						return $.datepicker._datepickerShowing && $.datepicker._lastInput == t[0] ? $.datepicker._hideDatepicker() : ($.datepicker._datepickerShowing && $.datepicker._lastInput != t[0] && $.datepicker._hideDatepicker(), $.datepicker._showDatepicker(t[0])), !1
					})
				}
			},
			_autoSize: function (t) {
				if (this._get(t, "autoSize") && !t.inline) {
					var e = new Date(2009, 11, 20),
						i = this._get(t, "dateFormat");
					if (i.match(/[DM]/)) {
						var s = function (t) {
							for (var e = 0, i = 0, s = 0; s < t.length; s++) t[s].length > e && (e = t[s].length, i = s);
							return i
						};
						e.setMonth(s(this._get(t, i.match(/MM/) ? "monthNames" : "monthNamesShort"))), e.setDate(s(this._get(t, i.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - e.getDay())
					}
					t.input.attr("size", this._formatDate(t, e).length)
				}
			},
			_inlineDatepicker: function (t, s) {
				var e = $(t);
				e.hasClass(this.markerClassName) || (e.addClass(this.markerClassName).append(s.dpDiv).bind("setData.datepicker", function (t, e, i) {
					s.settings[e] = i
				}).bind("getData.datepicker", function (t, e) {
					return this._get(s, e)
				}), $.data(t, PROP_NAME, s), this._setDate(s, this._getDefaultDate(s), !0), this._updateDatepicker(s), this._updateAlternate(s), s.settings.disabled && this._disableDatepicker(t), s.dpDiv.css("display", "block"))
			},
			_dialogDatepicker: function (t, e, i, s, n) {
				var o = this._dialogInst;
				if (!o) {
					this.uuid += 1;
					var r = "dp" + this.uuid;
					this._dialogInput = $('<input type="text" id="' + r + '" style="position: absolute; top: -100px; width: 0px;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), (o = this._dialogInst = this._newInst(this._dialogInput, !1)).settings = {}, $.data(this._dialogInput[0], PROP_NAME, o)
				}
				if (extendRemove(o.settings, s || {}), e = e && e.constructor == Date ? this._formatDate(o, e) : e, this._dialogInput.val(e), this._pos = n ? n.length ? n : [n.pageX, n.pageY] : null, !this._pos) {
					var a = document.documentElement.clientWidth,
						l = document.documentElement.clientHeight,
						h = document.documentElement.scrollLeft || document.body.scrollLeft,
						c = document.documentElement.scrollTop || document.body.scrollTop;
					this._pos = [a / 2 - 100 + h, l / 2 - 150 + c]
				}
				return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), o.settings.onSelect = i, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, o), this
			},
			_destroyDatepicker: function (t) {
				var e = $(t),
					i = $.data(t, PROP_NAME);
				if (e.hasClass(this.markerClassName)) {
					var s = t.nodeName.toLowerCase();
					$.removeData(t, PROP_NAME), "input" == s ? (i.append.remove(), i.trigger.remove(), e.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" == s || "span" == s) && e.removeClass(this.markerClassName).empty()
				}
			},
			_enableDatepicker: function (e) {
				var t = $(e),
					i = $.data(e, PROP_NAME);
				if (t.hasClass(this.markerClassName)) {
					var s = e.nodeName.toLowerCase();
					if ("input" == s) e.disabled = !1, i.trigger.filter("button").each(function () {
						this.disabled = !1
					}).end().filter("img").css({
						opacity: "1.0",
						cursor: ""
					});
					else if ("div" == s || "span" == s) {
						var n = t.children("." + this._inlineClass);
						n.children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
					}
					this._disabledInputs = $.map(this._disabledInputs, function (t) {
						return t == e ? null : t
					})
				}
			},
			_disableDatepicker: function (e) {
				var t = $(e),
					i = $.data(e, PROP_NAME);
				if (t.hasClass(this.markerClassName)) {
					var s = e.nodeName.toLowerCase();
					if ("input" == s) e.disabled = !0, i.trigger.filter("button").each(function () {
						this.disabled = !0
					}).end().filter("img").css({
						opacity: "0.5",
						cursor: "default"
					});
					else if ("div" == s || "span" == s) {
						var n = t.children("." + this._inlineClass);
						n.children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
					}
					this._disabledInputs = $.map(this._disabledInputs, function (t) {
						return t == e ? null : t
					}), this._disabledInputs[this._disabledInputs.length] = e
				}
			},
			_isDisabledDatepicker: function (t) {
				if (!t) return !1;
				for (var e = 0; e < this._disabledInputs.length; e++)
					if (this._disabledInputs[e] == t) return !0;
				return !1
			},
			_getInst: function (t) {
				try {
					return $.data(t, PROP_NAME)
				} catch (t) {
					throw "Missing instance data for this datepicker"
				}
			},
			_optionDatepicker: function (t, e, i) {
				var s = this._getInst(t);
				if (2 == arguments.length && "string" == typeof e) return "defaults" == e ? $.extend({}, $.datepicker._defaults) : s ? "all" == e ? $.extend({}, s.settings) : this._get(s, e) : null;
				var n = e || {};
				if ("string" == typeof e && ((n = {})[e] = i), s) {
					this._curInst == s && this._hideDatepicker();
					var o = this._getDateDatepicker(t, !0),
						r = this._getMinMaxDate(s, "min"),
						a = this._getMinMaxDate(s, "max");
					extendRemove(s.settings, n), null !== r && n.dateFormat !== undefined && n.minDate === undefined && (s.settings.minDate = this._formatDate(s, r)), null !== a && n.dateFormat !== undefined && n.maxDate === undefined && (s.settings.maxDate = this._formatDate(s, a)), this._attachments($(t), s), this._autoSize(s), this._setDate(s, o), this._updateAlternate(s), this._updateDatepicker(s)
				}
			},
			_changeDatepicker: function (t, e, i) {
				this._optionDatepicker(t, e, i)
			},
			_refreshDatepicker: function (t) {
				var e = this._getInst(t);
				e && this._updateDatepicker(e)
			},
			_setDateDatepicker: function (t, e) {
				var i = this._getInst(t);
				i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
			},
			_getDateDatepicker: function (t, e) {
				var i = this._getInst(t);
				return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
			},
			_doKeyDown: function (t) {
				var e = $.datepicker._getInst(t.target),
					i = !0,
					s = e.dpDiv.is(".ui-datepicker-rtl");
				if (e._keyEvent = !0, $.datepicker._datepickerShowing) switch (t.keyCode) {
					case 9:
						$.datepicker._hideDatepicker(), i = !1;
						break;
					case 13:
						var n = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", e.dpDiv);
						n[0] && $.datepicker._selectDay(t.target, e.selectedMonth, e.selectedYear, n[0]);
						var o = $.datepicker._get(e, "onSelect");
						if (o) {
							var r = $.datepicker._formatDate(e);
							o.apply(e.input ? e.input[0] : null, [r, e])
						} else $.datepicker._hideDatepicker();
						return !1;
					case 27:
						$.datepicker._hideDatepicker();
						break;
					case 33:
						$.datepicker._adjustDate(t.target, t.ctrlKey ? -$.datepicker._get(e, "stepBigMonths") : -$.datepicker._get(e, "stepMonths"), "M");
						break;
					case 34:
						$.datepicker._adjustDate(t.target, t.ctrlKey ? +$.datepicker._get(e, "stepBigMonths") : +$.datepicker._get(e, "stepMonths"), "M");
						break;
					case 35:
						(t.ctrlKey || t.metaKey) && $.datepicker._clearDate(t.target), i = t.ctrlKey || t.metaKey;
						break;
					case 36:
						(t.ctrlKey || t.metaKey) && $.datepicker._gotoToday(t.target), i = t.ctrlKey || t.metaKey;
						break;
					case 37:
						(t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, s ? 1 : -1, "D"), i = t.ctrlKey || t.metaKey, t.originalEvent.altKey && $.datepicker._adjustDate(t.target, t.ctrlKey ? -$.datepicker._get(e, "stepBigMonths") : -$.datepicker._get(e, "stepMonths"), "M");
						break;
					case 38:
						(t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, -7, "D"), i = t.ctrlKey || t.metaKey;
						break;
					case 39:
						(t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, s ? -1 : 1, "D"), i = t.ctrlKey || t.metaKey, t.originalEvent.altKey && $.datepicker._adjustDate(t.target, t.ctrlKey ? +$.datepicker._get(e, "stepBigMonths") : +$.datepicker._get(e, "stepMonths"), "M");
						break;
					case 40:
						(t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, 7, "D"), i = t.ctrlKey || t.metaKey;
						break;
					default:
						i = !1
				} else 36 == t.keyCode && t.ctrlKey ? $.datepicker._showDatepicker(this) : i = !1;
				i && (t.preventDefault(), t.stopPropagation())
			},
			_doKeyPress: function (t) {
				var e = $.datepicker._getInst(t.target);
				if ($.datepicker._get(e, "constrainInput")) {
					var i = $.datepicker._possibleChars($.datepicker._get(e, "dateFormat")),
						s = String.fromCharCode(t.charCode == undefined ? t.keyCode : t.charCode);
					return t.ctrlKey || t.metaKey || s < " " || !i || -1 < i.indexOf(s)
				}
			},
			_doKeyUp: function (t) {
				var e = $.datepicker._getInst(t.target);
				if (e.input.val() != e.lastVal) try {
					$.datepicker.parseDate($.datepicker._get(e, "dateFormat"), e.input ? e.input.val() : null, $.datepicker._getFormatConfig(e)) && ($.datepicker._setDateFromField(e), $.datepicker._updateAlternate(e), $.datepicker._updateDatepicker(e))
				} catch (t) {
					$.datepicker.log(t)
				}
				return !0
			},
			_showDatepicker: function (t) {
				if ("input" != (t = t.target || t).nodeName.toLowerCase() && (t = $("input", t.parentNode)[0]), !$.datepicker._isDisabledDatepicker(t) && $.datepicker._lastInput != t) {
					var i = $.datepicker._getInst(t);
					$.datepicker._curInst && $.datepicker._curInst != i && ($.datepicker._curInst.dpDiv.stop(!0, !0), i && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
					var e = $.datepicker._get(i, "beforeShow"),
						s = e ? e.apply(t, [t, i]) : {};
					if (!1 !== s) {
						extendRemove(i.settings, s), i.lastVal = null, $.datepicker._lastInput = t, $.datepicker._setDateFromField(i), $.datepicker._inDialog && (t.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(t), $.datepicker._pos[1] += t.offsetHeight);
						var n = !1;
						$(t).parents().each(function () {
							return !(n |= "fixed" == $(this).css("position"))
						}), n && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
						var o = {
							left: $.datepicker._pos[0],
							top: $.datepicker._pos[1]
						};
						if ($.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
								position: "absolute",
								display: "block",
								top: "-1000px"
							}), $.datepicker._updateDatepicker(i), o = $.datepicker._checkOffset(i, o, n), i.dpDiv.css({
								position: $.datepicker._inDialog && $.blockUI ? "static" : n ? "fixed" : "absolute",
								display: "none",
								left: o.left + "px",
								top: o.top + "px"
							}), !i.inline) {
							var r = $.datepicker._get(i, "showAnim"),
								a = $.datepicker._get(i, "duration"),
								l = function () {
									var t = i.dpDiv.find("iframe.ui-datepicker-cover");
									if (t.length) {
										var e = $.datepicker._getBorders(i.dpDiv);
										t.css({
											left: -e[0],
											top: -e[1],
											width: i.dpDiv.outerWidth(),
											height: i.dpDiv.outerHeight()
										})
									}
								};
							i.dpDiv.zIndex($(t).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[r] ? i.dpDiv.show(r, $.datepicker._get(i, "showOptions"), a, l) : i.dpDiv[r || "show"](r ? a : null, l), (!r || !a) && l(), i.input.is(":visible") && !i.input.is(":disabled") && i.input.focus(), $.datepicker._curInst = i
						}
					}
				}
			},
			_updateDatepicker: function (t) {
				this.maxRows = 4;
				var e = $.datepicker._getBorders(t.dpDiv);
				(instActive = t).dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t);
				var i = t.dpDiv.find("iframe.ui-datepicker-cover");
				!i.length || i.css({
					left: -e[0],
					top: -e[1],
					width: t.dpDiv.outerWidth(),
					height: t.dpDiv.outerHeight()
				}), t.dpDiv.find("." + this._dayOverClass + " a").mouseover();
				var s = this._getNumberOfMonths(t),
					n = s[1];
				if (t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), 1 < n && t.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", 17 * n + "em"), t.dpDiv[(1 != s[0] || 1 != s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), t == $.datepicker._curInst && $.datepicker._datepickerShowing && t.input && t.input.is(":visible") && !t.input.is(":disabled") && t.input[0] != document.activeElement && t.input.focus(), t.yearshtml) {
					var o = t.yearshtml;
					setTimeout(function () {
						o === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), o = t.yearshtml = null
					}, 0)
				}
			},
			_getBorders: function (t) {
				var e = function (t) {
					return {
						thin: 1,
						medium: 2,
						thick: 3
					} [t] || t
				};
				return [parseFloat(e(t.css("border-left-width"))), parseFloat(e(t.css("border-top-width")))]
			},
			_checkOffset: function (t, e, i) {
				var s = t.dpDiv.outerWidth(),
					n = t.dpDiv.outerHeight(),
					o = t.input ? t.input.outerWidth() : 0,
					r = t.input ? t.input.outerHeight() : 0,
					a = document.documentElement.clientWidth + (i ? 0 : $(document).scrollLeft()),
					l = document.documentElement.clientHeight + (i ? 0 : $(document).scrollTop());
				return e.left -= this._get(t, "isRTL") ? s - o : 0, e.left -= i && e.left == t.input.offset().left ? $(document).scrollLeft() : 0, e.top -= i && e.top == t.input.offset().top + r ? $(document).scrollTop() : 0, e.left -= Math.min(e.left, e.left + s > a && s < a ? Math.abs(e.left + s - a) : 0), e.top -= Math.min(e.top, e.top + n > l && n < l ? Math.abs(n + r) : 0), e
			},
			_findPos: function (t) {
				for (var e = this._getInst(t), i = this._get(e, "isRTL"); t && ("hidden" == t.type || 1 != t.nodeType || $.expr.filters.hidden(t));) t = t[i ? "previousSibling" : "nextSibling"];
				var s = $(t).offset();
				return [s.left, s.top]
			},
			_hideDatepicker: function (t) {
				var e = this._curInst;
				if (e && (!t || e == $.data(t, PROP_NAME)) && this._datepickerShowing) {
					var i = this._get(e, "showAnim"),
						s = this._get(e, "duration"),
						n = function () {
							$.datepicker._tidyDialog(e)
						};
					$.effects && $.effects[i] ? e.dpDiv.hide(i, $.datepicker._get(e, "showOptions"), s, n) : e.dpDiv["slideDown" == i ? "slideUp" : "fadeIn" == i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1;
					var o = this._get(e, "onClose");
					o && o.apply(e.input ? e.input[0] : null, [e.input ? e.input.val() : "", e]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
						position: "absolute",
						left: "0",
						top: "-100px"
					}), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
				}
			},
			_tidyDialog: function (t) {
				t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
			},
			_checkExternalClick: function (t) {
				if ($.datepicker._curInst) {
					var e = $(t.target),
						i = $.datepicker._getInst(e[0]);
					(e[0].id != $.datepicker._mainDivId && 0 == e.parents("#" + $.datepicker._mainDivId).length && !e.hasClass($.datepicker.markerClassName) && !e.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || e.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != i) && $.datepicker._hideDatepicker()
				}
			},
			_adjustDate: function (t, e, i) {
				var s = $(t),
					n = this._getInst(s[0]);
				this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(n, e + ("M" == i ? this._get(n, "showCurrentAtPos") : 0), i), this._updateDatepicker(n))
			},
			_gotoToday: function (t) {
				var e = $(t),
					i = this._getInst(e[0]);
				if (this._get(i, "gotoCurrent") && i.currentDay) i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear;
				else {
					var s = new Date;
					i.selectedDay = s.getDate(), i.drawMonth = i.selectedMonth = s.getMonth(), i.drawYear = i.selectedYear = s.getFullYear()
				}
				this._notifyChange(i), this._adjustDate(e)
			},
			_selectMonthYear: function (t, e, i) {
				var s = $(t),
					n = this._getInst(s[0]);
				n["selected" + ("M" == i ? "Month" : "Year")] = n["draw" + ("M" == i ? "Month" : "Year")] = parseInt(e.options[e.selectedIndex].value, 10), this._notifyChange(n), this._adjustDate(s)
			},
			_selectDay: function (t, e, i, s) {
				var n = $(t);
				if (!$(s).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(n[0])) {
					var o = this._getInst(n[0]);
					o.selectedDay = o.currentDay = $("a", s).html(), o.selectedMonth = o.currentMonth = e, o.selectedYear = o.currentYear = i, this._selectDate(t, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear))
				}
			},
			_clearDate: function (t) {
				var e = $(t);
				this._getInst(e[0]);
				this._selectDate(e, "")
			},
			_selectDate: function (t, e) {
				var i = $(t),
					s = this._getInst(i[0]);
				e = null != e ? e : this._formatDate(s), s.input && s.input.val(e), this._updateAlternate(s);
				var n = this._get(s, "onSelect");
				n ? n.apply(s.input ? s.input[0] : null, [e, s]) : s.input && s.input.trigger("change"), s.inline ? this._updateDatepicker(s) : (this._hideDatepicker(), this._lastInput = s.input[0], "object" != typeof s.input[0] && s.input.focus(), this._lastInput = null)
			},
			_updateAlternate: function (t) {
				var e = this._get(t, "altField");
				if (e) {
					var i = this._get(t, "altFormat") || this._get(t, "dateFormat"),
						s = this._getDate(t),
						n = this.formatDate(i, s, this._getFormatConfig(t));
					$(e).each(function () {
						$(this).val(n)
					})
				}
			},
			noWeekends: function (t) {
				var e = t.getDay();
				return [0 < e && e < 6, ""]
			},
			iso8601Week: function (t) {
				var e = new Date(t.getTime());
				e.setDate(e.getDate() + 4 - (e.getDay() || 7));
				var i = e.getTime();
				return e.setMonth(0), e.setDate(1), Math.floor(Math.round((i - e) / 864e5) / 7) + 1
			},
			parseDate: function (i, o, t) {
				if (null == i || null == o) throw "Invalid arguments";
				if ("" == (o = "object" == typeof o ? o.toString() : o + "")) return null;
				var e = (t ? t.shortYearCutoff : null) || this._defaults.shortYearCutoff;
				e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10);
				for (var s = (t ? t.dayNamesShort : null) || this._defaults.dayNamesShort, n = (t ? t.dayNames : null) || this._defaults.dayNames, r = (t ? t.monthNamesShort : null) || this._defaults.monthNamesShort, a = (t ? t.monthNames : null) || this._defaults.monthNames, l = -1, h = -1, c = -1, u = -1, d = !1, p = function (t) {
						var e = _ + 1 < i.length && i.charAt(_ + 1) == t;
						return e && _++, e
					}, f = function (t) {
						var e = p(t),
							i = new RegExp("^\\d{1," + ("@" == t ? 14 : "!" == t ? 20 : "y" == t && e ? 4 : "o" == t ? 3 : 2) + "}"),
							s = o.substring(v).match(i);
						if (!s) throw "Missing number at position " + v;
						return v += s[0].length, parseInt(s[0], 10)
					}, g = function (t, e, i) {
						var s = $.map(p(t) ? i : e, function (t, e) {
								return [
									[e, t]
								]
							}).sort(function (t, e) {
								return -(t[1].length - e[1].length)
							}),
							n = -1;
						if ($.each(s, function (t, e) {
								var i = e[1];
								if (o.substr(v, i.length).toLowerCase() == i.toLowerCase()) return n = e[0], v += i.length, !1
							}), -1 != n) return n + 1;
						throw "Unknown name at position " + v
					}, m = function () {
						if (o.charAt(v) != i.charAt(_)) throw "Unexpected literal at position " + v;
						v++
					}, v = 0, _ = 0; _ < i.length; _++)
					if (d) "'" != i.charAt(_) || p("'") ? m() : d = !1;
					else switch (i.charAt(_)) {
						case "d":
							c = f("d");
							break;
						case "D":
							g("D", s, n);
							break;
						case "o":
							u = f("o");
							break;
						case "m":
							h = f("m");
							break;
						case "M":
							h = g("M", r, a);
							break;
						case "y":
							l = f("y");
							break;
						case "@":
							l = (b = new Date(f("@"))).getFullYear(), h = b.getMonth() + 1, c = b.getDate();
							break;
						case "!":
							var b;
							l = (b = new Date((f("!") - this._ticksTo1970) / 1e4)).getFullYear(), h = b.getMonth() + 1, c = b.getDate();
							break;
						case "'":
							p("'") ? m() : d = !0;
							break;
						default:
							m()
					}
				if (v < o.length) throw "Extra/unparsed characters found in date: " + o.substring(v);
				if (-1 == l ? l = (new Date).getFullYear() : l < 100 && (l += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (l <= e ? 0 : -100)), -1 < u)
					for (h = 1, c = u;;) {
						var y = this._getDaysInMonth(l, h - 1);
						if (c <= y) break;
						h++, c -= y
					}
				if ((b = this._daylightSavingAdjust(new Date(l, h - 1, c))).getFullYear() != l || b.getMonth() + 1 != h || b.getDate() != c) throw "Invalid date";
				return b
			},
			ATOM: "yy-mm-dd",
			COOKIE: "D, dd M yy",
			ISO_8601: "yy-mm-dd",
			RFC_822: "D, d M y",
			RFC_850: "DD, dd-M-y",
			RFC_1036: "D, d M y",
			RFC_1123: "D, d M yy",
			RFC_2822: "D, d M yy",
			RSS: "D, d M y",
			TICKS: "!",
			TIMESTAMP: "@",
			W3C: "yy-mm-dd",
			_ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
			formatDate: function (i, t, e) {
				if (!t) return "";
				var s = (e ? e.dayNamesShort : null) || this._defaults.dayNamesShort,
					n = (e ? e.dayNames : null) || this._defaults.dayNames,
					o = (e ? e.monthNamesShort : null) || this._defaults.monthNamesShort,
					r = (e ? e.monthNames : null) || this._defaults.monthNames,
					a = function (t) {
						var e = d + 1 < i.length && i.charAt(d + 1) == t;
						return e && d++, e
					},
					l = function (t, e, i) {
						var s = "" + e;
						if (a(t))
							for (; s.length < i;) s = "0" + s;
						return s
					},
					h = function (t, e, i, s) {
						return a(t) ? s[e] : i[e]
					},
					c = "",
					u = !1;
				if (t)
					for (var d = 0; d < i.length; d++)
						if (u) "'" != i.charAt(d) || a("'") ? c += i.charAt(d) : u = !1;
						else switch (i.charAt(d)) {
							case "d":
								c += l("d", t.getDate(), 2);
								break;
							case "D":
								c += h("D", t.getDay(), s, n);
								break;
							case "o":
								c += l("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
								break;
							case "m":
								c += l("m", t.getMonth() + 1, 2);
								break;
							case "M":
								c += h("M", t.getMonth(), o, r);
								break;
							case "y":
								c += a("y") ? t.getFullYear() : (t.getYear() % 100 < 10 ? "0" : "") + t.getYear() % 100;
								break;
							case "@":
								c += t.getTime();
								break;
							case "!":
								c += 1e4 * t.getTime() + this._ticksTo1970;
								break;
							case "'":
								a("'") ? c += "'" : u = !0;
								break;
							default:
								c += i.charAt(d)
						}
				return c
			},
			_possibleChars: function (i) {
				for (var t = "", e = !1, s = function (t) {
						var e = n + 1 < i.length && i.charAt(n + 1) == t;
						return e && n++, e
					}, n = 0; n < i.length; n++)
					if (e) "'" != i.charAt(n) || s("'") ? t += i.charAt(n) : e = !1;
					else switch (i.charAt(n)) {
						case "d":
						case "m":
						case "y":
						case "@":
							t += "0123456789";
							break;
						case "D":
						case "M":
							return null;
						case "'":
							s("'") ? t += "'" : e = !0;
							break;
						default:
							t += i.charAt(n)
					}
				return t
			},
			_get: function (t, e) {
				return t.settings[e] !== undefined ? t.settings[e] : this._defaults[e]
			},
			_setDateFromField: function (t, e) {
				if (t.input.val() != t.lastVal) {
					var i, s, n = this._get(t, "dateFormat"),
						o = t.lastVal = t.input ? t.input.val() : null;
					i = s = this._getDefaultDate(t);
					var r = this._getFormatConfig(t);
					try {
						i = this.parseDate(n, o, r) || s
					} catch (t) {
						this.log(t), o = e ? "" : o
					}
					t.selectedDay = i.getDate(), t.drawMonth = t.selectedMonth = i.getMonth(), t.drawYear = t.selectedYear = i.getFullYear(), t.currentDay = o ? i.getDate() : 0, t.currentMonth = o ? i.getMonth() : 0, t.currentYear = o ? i.getFullYear() : 0, this._adjustInstDate(t)
				}
			},
			_getDefaultDate: function (t) {
				return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
			},
			_determineDate: function (a, t, e) {
				var i, s, n = null == t || "" === t ? e : "string" == typeof t ? function (t) {
					try {
						return $.datepicker.parseDate($.datepicker._get(a, "dateFormat"), t, $.datepicker._getFormatConfig(a))
					} catch (t) {}
					for (var e = (t.toLowerCase().match(/^c/) ? $.datepicker._getDate(a) : null) || new Date, i = e.getFullYear(), s = e.getMonth(), n = e.getDate(), o = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, r = o.exec(t); r;) {
						switch (r[2] || "d") {
							case "d":
							case "D":
								n += parseInt(r[1], 10);
								break;
							case "w":
							case "W":
								n += 7 * parseInt(r[1], 10);
								break;
							case "m":
							case "M":
								s += parseInt(r[1], 10), n = Math.min(n, $.datepicker._getDaysInMonth(i, s));
								break;
							case "y":
							case "Y":
								i += parseInt(r[1], 10), n = Math.min(n, $.datepicker._getDaysInMonth(i, s))
						}
						r = o.exec(t)
					}
					return new Date(i, s, n)
				}(t) : "number" == typeof t ? isNaN(t) ? e : (i = t, (s = new Date).setDate(s.getDate() + i), s) : new Date(t.getTime());
				return (n = n && "Invalid Date" == n.toString() ? e : n) && (n.setHours(0), n.setMinutes(0), n.setSeconds(0), n.setMilliseconds(0)), this._daylightSavingAdjust(n)
			},
			_daylightSavingAdjust: function (t) {
				return t ? (t.setHours(12 < t.getHours() ? t.getHours() + 2 : 0), t) : null
			},
			_setDate: function (t, e, i) {
				var s = !e,
					n = t.selectedMonth,
					o = t.selectedYear,
					r = this._restrictMinMax(t, this._determineDate(t, e, new Date));
				t.selectedDay = t.currentDay = r.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = r.getMonth(), t.drawYear = t.selectedYear = t.currentYear = r.getFullYear(), (n != t.selectedMonth || o != t.selectedYear) && !i && this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t))
			},
			_getDate: function (t) {
				return !t.currentYear || t.input && "" == t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay))
			},
			_attachHandlers: function (t) {
				var e = this._get(t, "stepMonths"),
					i = "#" + t.id;
				t.dpDiv.find("[data-handler]").map(function () {
					var t = {
						prev: function () {
							window["DP_jQuery_" + dpuuid].datepicker._adjustDate(i, -e, "M")
						},
						next: function () {
							window["DP_jQuery_" + dpuuid].datepicker._adjustDate(i, +e, "M")
						},
						hide: function () {
							window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker()
						},
						today: function () {
							window["DP_jQuery_" + dpuuid].datepicker._gotoToday(i)
						},
						selectDay: function () {
							return window["DP_jQuery_" + dpuuid].datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
						},
						selectMonth: function () {
							return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(i, this, "M"), !1
						},
						selectYear: function () {
							return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(i, this, "Y"), !1
						}
					};
					$(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
				})
			},
			_generateHTML: function (t) {
				var e = new Date;
				e = this._daylightSavingAdjust(new Date(e.getFullYear(), e.getMonth(), e.getDate()));
				var i = this._get(t, "isRTL"),
					s = this._get(t, "showButtonPanel"),
					n = this._get(t, "hideIfNoPrevNext"),
					o = this._get(t, "navigationAsDateFormat"),
					r = this._getNumberOfMonths(t),
					a = this._get(t, "showCurrentAtPos"),
					l = this._get(t, "stepMonths"),
					h = 1 != r[0] || 1 != r[1],
					c = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
					u = this._getMinMaxDate(t, "min"),
					d = this._getMinMaxDate(t, "max"),
					p = t.drawMonth - a,
					f = t.drawYear;
				if (p < 0 && (p += 12, f--), d) {
					var g = this._daylightSavingAdjust(new Date(d.getFullYear(), d.getMonth() - r[0] * r[1] + 1, d.getDate()));
					for (g = u && g < u ? u : g; this._daylightSavingAdjust(new Date(f, p, 1)) > g;) --p < 0 && (p = 11, f--)
				}
				t.drawMonth = p, t.drawYear = f;
				var m = this._get(t, "prevText");
				m = o ? this.formatDate(m, this._daylightSavingAdjust(new Date(f, p - l, 1)), this._getFormatConfig(t)) : m;
				var v = this._canAdjustMonth(t, -1, f, p) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "e" : "w") + '">' + m + "</span></a>" : n ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "e" : "w") + '">' + m + "</span></a>",
					_ = this._get(t, "nextText");
				_ = o ? this.formatDate(_, this._daylightSavingAdjust(new Date(f, p + l, 1)), this._getFormatConfig(t)) : _;
				var b = this._canAdjustMonth(t, 1, f, p) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + _ + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "w" : "e") + '">' + _ + "</span></a>" : n ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + _ + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "w" : "e") + '">' + _ + "</span></a>",
					y = this._get(t, "currentText"),
					w = this._get(t, "gotoCurrent") && t.currentDay ? c : e;
				y = o ? this.formatDate(y, w, this._getFormatConfig(t)) : y;
				var C = t.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(t, "closeText") + "</button>",
					x = s ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (i ? C : "") + (this._isInRange(t, w) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + y + "</button>" : "") + (i ? "" : C) + "</div>" : "",
					D = parseInt(this._get(t, "firstDay"), 10);
				D = isNaN(D) ? 0 : D;
				for (var k = this._get(t, "showWeek"), I = this._get(t, "dayNames"), S = (this._get(t, "dayNamesShort"), this._get(t, "dayNamesMin")), E = this._get(t, "monthNames"), T = this._get(t, "monthNamesShort"), A = this._get(t, "beforeShowDay"), M = this._get(t, "showOtherMonths"), F = this._get(t, "selectOtherMonths"), P = (this._get(t, "calculateWeek") || this.iso8601Week, this._getDefaultDate(t)), O = "", N = 0; N < r[0]; N++) {
					var z = "";
					this.maxRows = 4;
					for (var H = 0; H < r[1]; H++) {
						var W = this._daylightSavingAdjust(new Date(f, p, t.selectedDay)),
							L = " ui-corner-all",
							R = "";
						if (h) {
							if (R += '<div class="ui-datepicker-group', 1 < r[1]) switch (H) {
								case 0:
									R += " ui-datepicker-group-first", L = " ui-corner-" + (i ? "right" : "left");
									break;
								case r[1] - 1:
									R += " ui-datepicker-group-last", L = " ui-corner-" + (i ? "left" : "right");
									break;
								default:
									R += " ui-datepicker-group-middle", L = ""
							}
							R += '">'
						}
						R += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + L + '">' + (/all|left/.test(L) && 0 == N ? i ? b : v : "") + (/all|right/.test(L) && 0 == N ? i ? v : b : "") + this._generateMonthYearHeader(t, p, f, u, d, 0 < N || 0 < H, E, T) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
						for (var j = k ? '<th class="ui-datepicker-week-col">' + this._get(t, "weekHeader") + "</th>" : "", q = 0; q < 7; q++) {
							var Y = (q + D) % 7;
							j += "<th" + (5 <= (q + D + 6) % 7 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + I[Y] + '">' + S[Y] + "</span></th>"
						}
						R += j + "</tr></thead><tbody>";
						var B = this._getDaysInMonth(f, p);
						f == t.selectedYear && p == t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, B));
						var U = (this._getFirstDayOfMonth(f, p) - D + 7) % 7,
							Q = Math.ceil((U + B) / 7),
							K = h && this.maxRows > Q ? this.maxRows : Q;
						this.maxRows = K;
						for (var V = this._daylightSavingAdjust(new Date(f, p, 1 - U)), X = 0; X < K; X++) {
							R += "<tr>";
							var Z = k ? '<td class="ui-datepicker-week-col">' + this._get(t, "calculateWeek")(V) + "</td>" : "";
							for (q = 0; q < 7; q++) {
								var G = A ? A.apply(t.input ? t.input[0] : null, [V]) : [!0, ""],
									J = V.getMonth() != p,
									tt = J && !F || !G[0] || u && V < u || d && d < V;
								Z += '<td class="' + (5 <= (q + D + 6) % 7 ? " ui-datepicker-week-end" : "") + (J ? " ui-datepicker-other-month" : "") + (V.getTime() == W.getTime() && p == t.selectedMonth && t._keyEvent || P.getTime() == V.getTime() && P.getTime() == W.getTime() ? " " + this._dayOverClass : "") + (tt ? " " + this._unselectableClass + " ui-state-disabled" : "") + (J && !M ? "" : " " + G[1] + (V.getTime() == c.getTime() ? " " + this._currentClass : "") + (V.getTime() == e.getTime() ? " ui-datepicker-today" : "")) + '"' + (J && !M || !G[2] ? "" : ' title="' + G[2] + '"') + (tt ? "" : ' data-handler="selectDay" data-event="click" data-month="' + V.getMonth() + '" data-year="' + V.getFullYear() + '"') + ">" + (J && !M ? "&#xa0;" : tt ? '<span class="ui-state-default">' + V.getDate() + "</span>" : '<a class="ui-state-default' + (V.getTime() == e.getTime() ? " ui-state-highlight" : "") + (V.getTime() == c.getTime() ? " ui-state-active" : "") + (J ? " ui-priority-secondary" : "") + '" href="#">' + V.getDate() + "</a>") + "</td>", V.setDate(V.getDate() + 1), V = this._daylightSavingAdjust(V)
							}
							R += Z + "</tr>"
						}
						11 < ++p && (p = 0, f++), z += R += "</tbody></table>" + (h ? "</div>" + (0 < r[0] && H == r[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : "")
					}
					O += z
				}
				return O += x + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !t.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), t._keyEvent = !1, O
			},
			_generateMonthYearHeader: function (t, e, i, s, n, o, r, a) {
				var l = this._get(t, "changeMonth"),
					h = this._get(t, "changeYear"),
					c = this._get(t, "showMonthAfterYear"),
					u = '<div class="ui-datepicker-title">',
					d = "";
				if (o || !l) d += '<span class="ui-datepicker-month">' + r[e] + "</span>";
				else {
					var p = s && s.getFullYear() == i,
						f = n && n.getFullYear() == i;
					d += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
					for (var g = 0; g < 12; g++)(!p || g >= s.getMonth()) && (!f || g <= n.getMonth()) && (d += '<option value="' + g + '"' + (g == e ? ' selected="selected"' : "") + ">" + a[g] + "</option>");
					d += "</select>"
				}
				if (c || (u += d + (!o && l && h ? "" : "&#xa0;")), !t.yearshtml)
					if (t.yearshtml = "", o || !h) u += '<span class="ui-datepicker-year">' + i + "</span>";
					else {
						var m = this._get(t, "yearRange").split(":"),
							v = (new Date).getFullYear(),
							_ = function (t) {
								var e = t.match(/c[+-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+-].*/) ? v + parseInt(t, 10) : parseInt(t, 10);
								return isNaN(e) ? v : e
							},
							b = _(m[0]),
							y = Math.max(b, _(m[1] || ""));
						for (b = s ? Math.max(b, s.getFullYear()) : b, y = n ? Math.min(y, n.getFullYear()) : y, t.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; b <= y; b++) t.yearshtml += '<option value="' + b + '"' + (b == i ? ' selected="selected"' : "") + ">" + b + "</option>";
						t.yearshtml += "</select>", u += t.yearshtml, t.yearshtml = null
					} return u += this._get(t, "yearSuffix"), c && (u += (!o && l && h ? "" : "&#xa0;") + d), u += "</div>"
			},
			_adjustInstDate: function (t, e, i) {
				var s = t.drawYear + ("Y" == i ? e : 0),
					n = t.drawMonth + ("M" == i ? e : 0),
					o = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" == i ? e : 0),
					r = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, o)));
				t.selectedDay = r.getDate(), t.drawMonth = t.selectedMonth = r.getMonth(), t.drawYear = t.selectedYear = r.getFullYear(), ("M" == i || "Y" == i) && this._notifyChange(t)
			},
			_restrictMinMax: function (t, e) {
				var i = this._getMinMaxDate(t, "min"),
					s = this._getMinMaxDate(t, "max"),
					n = i && e < i ? i : e;
				return n = s && s < n ? s : n
			},
			_notifyChange: function (t) {
				var e = this._get(t, "onChangeMonthYear");
				e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
			},
			_getNumberOfMonths: function (t) {
				var e = this._get(t, "numberOfMonths");
				return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
			},
			_getMinMaxDate: function (t, e) {
				return this._determineDate(t, this._get(t, e + "Date"), null)
			},
			_getDaysInMonth: function (t, e) {
				return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
			},
			_getFirstDayOfMonth: function (t, e) {
				return new Date(t, e, 1).getDay()
			},
			_canAdjustMonth: function (t, e, i, s) {
				var n = this._getNumberOfMonths(t),
					o = this._daylightSavingAdjust(new Date(i, s + (e < 0 ? e : n[0] * n[1]), 1));
				return e < 0 && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o)
			},
			_isInRange: function (t, e) {
				var i = this._getMinMaxDate(t, "min"),
					s = this._getMinMaxDate(t, "max");
				return (!i || e.getTime() >= i.getTime()) && (!s || e.getTime() <= s.getTime())
			},
			_getFormatConfig: function (t) {
				var e = this._get(t, "shortYearCutoff");
				return {
					shortYearCutoff: e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10),
					dayNamesShort: this._get(t, "dayNamesShort"),
					dayNames: this._get(t, "dayNames"),
					monthNamesShort: this._get(t, "monthNamesShort"),
					monthNames: this._get(t, "monthNames")
				}
			},
			_formatDate: function (t, e, i, s) {
				e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
				var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
				return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t))
			}
		}), $.fn.datepicker = function (t) {
			if (!this.length) return this;
			$.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0);
			var e = Array.prototype.slice.call(arguments, 1);
			return "string" != typeof t || "isDisabled" != t && "getDate" != t && "widget" != t ? "option" == t && 2 == arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + t + "Datepicker"].apply($.datepicker, [this[0]].concat(e)) : this.each(function () {
				"string" == typeof t ? $.datepicker["_" + t + "Datepicker"].apply($.datepicker, [this].concat(e)) : $.datepicker._attachDatepicker(this, t)
			}) : $.datepicker["_" + t + "Datepicker"].apply($.datepicker, [this[0]].concat(e))
		}, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.8.22", window["DP_jQuery_" + dpuuid] = $
	}(jQuery),
	function (a, t) {
		var l = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
			o = {
				buttons: !0,
				height: !0,
				maxHeight: !0,
				maxWidth: !0,
				minHeight: !0,
				minWidth: !0,
				width: !0
			},
			r = {
				maxHeight: !0,
				maxWidth: !0,
				minHeight: !0,
				minWidth: !0
			},
			h = a.attrFn || {
				val: !0,
				css: !0,
				html: !0,
				text: !0,
				data: !0,
				width: !0,
				height: !0,
				offset: !0,
				click: !0
			};
		a.widget("ui.dialog", {
			options: {
				autoOpen: !0,
				buttons: {},
				closeOnEscape: !0,
				closeText: "close",
				dialogClass: "",
				draggable: !0,
				hide: null,
				height: "auto",
				maxHeight: !1,
				maxWidth: !1,
				minHeight: 150,
				minWidth: 150,
				modal: !1,
				position: {
					my: "center",
					at: "center",
					collision: "fit",
					using: function (t) {
						var e = a(this).css(t).offset().top;
						e < 0 && a(this).css("top", t.top - e)
					}
				},
				resizable: !0,
				show: null,
				stack: !0,
				title: "",
				width: 300,
				zIndex: 1e3
			},
			_create: function () {
				this.originalTitle = this.element.attr("title"), "string" != typeof this.originalTitle && (this.originalTitle = ""), this.options.title = this.options.title || this.originalTitle;
				var e = this,
					i = e.options,
					t = i.title || "&#160;",
					s = a.ui.dialog.getTitleId(e.element),
					n = (e.uiDialog = a("<div></div>")).appendTo(document.body).hide().addClass(l + i.dialogClass).css({
						zIndex: i.zIndex
					}).attr("tabIndex", -1).css("outline", 0).keydown(function (t) {
						i.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === a.ui.keyCode.ESCAPE && (e.close(t), t.preventDefault())
					}).attr({
						role: "dialog",
						"aria-labelledby": s
					}).mousedown(function (t) {
						e.moveToTop(!1, t)
					}),
					o = (e.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(n), (e.uiDialogTitlebar = a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(n)),
					r = a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
						r.addClass("ui-state-hover")
					}, function () {
						r.removeClass("ui-state-hover")
					}).focus(function () {
						r.addClass("ui-state-focus")
					}).blur(function () {
						r.removeClass("ui-state-focus")
					}).click(function (t) {
						return e.close(t), !1
					}).appendTo(o);
				(e.uiDialogTitlebarCloseText = a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(i.closeText).appendTo(r), a("<span></span>").addClass("ui-dialog-title").attr("id", s).html(t).prependTo(o);
				a.isFunction(i.beforeclose) && !a.isFunction(i.beforeClose) && (i.beforeClose = i.beforeclose), o.find("*").add(o).disableSelection(), i.draggable && a.fn.draggable && e._makeDraggable(), i.resizable && a.fn.resizable && e._makeResizable(), e._createButtons(i.buttons), e._isOpen = !1, a.fn.bgiframe && n.bgiframe()
			},
			_init: function () {
				this.options.autoOpen && this.open()
			},
			destroy: function () {
				return this.overlay && this.overlay.destroy(), this.uiDialog.hide(), this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), this
			},
			widget: function () {
				return this.uiDialog
			},
			close: function (t) {
				var e, i, s = this;
				if (!1 !== s._trigger("beforeClose", t)) return s.overlay && s.overlay.destroy(), s.uiDialog.unbind("keypress.ui-dialog"), s._isOpen = !1, s.options.hide ? s.uiDialog.hide(s.options.hide, function () {
					s._trigger("close", t)
				}) : (s.uiDialog.hide(), s._trigger("close", t)), a.ui.dialog.overlay.resize(), s.options.modal && (e = 0, a(".ui-dialog").each(function () {
					this !== s.uiDialog[0] && (i = a(this).css("z-index"), isNaN(i) || (e = Math.max(e, i)))
				}), a.ui.dialog.maxZ = e), s
			},
			isOpen: function () {
				return this._isOpen
			},
			moveToTop: function (t, e) {
				var i, s = this,
					n = s.options;
				return n.modal && !t || !n.stack && !n.modal ? s._trigger("focus", e) : (n.zIndex > a.ui.dialog.maxZ && (a.ui.dialog.maxZ = n.zIndex), s.overlay && (a.ui.dialog.maxZ += 1, s.overlay.$el.css("z-index", a.ui.dialog.overlay.maxZ = a.ui.dialog.maxZ)), i = {
					scrollTop: s.element.scrollTop(),
					scrollLeft: s.element.scrollLeft()
				}, a.ui.dialog.maxZ += 1, s.uiDialog.css("z-index", a.ui.dialog.maxZ), s.element.attr(i), s._trigger("focus", e), s)
			},
			open: function () {
				if (!this._isOpen) {
					var t = this,
						e = t.options,
						i = t.uiDialog;
					return t.overlay = e.modal ? new a.ui.dialog.overlay(t) : null, t._size(), t._position(e.position), i.show(e.show), t.moveToTop(!0), e.modal && i.bind("keydown.ui-dialog", function (t) {
						if (t.keyCode === a.ui.keyCode.TAB) {
							var e = a(":tabbable", this),
								i = e.filter(":first"),
								s = e.filter(":last");
							return t.target !== s[0] || t.shiftKey ? t.target === i[0] && t.shiftKey ? (s.focus(1), !1) : void 0 : (i.focus(1), !1)
						}
					}), a(t.element.find(":tabbable").get().concat(i.find(".ui-dialog-buttonpane :tabbable").get().concat(i.get()))).eq(0).focus(), t._isOpen = !0, t._trigger("open"), t
				}
			},
			_createButtons: function (t) {
				var s = this,
					e = !1,
					i = a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
					n = a("<div></div>").addClass("ui-dialog-buttonset").appendTo(i);
				s.uiDialog.find(".ui-dialog-buttonpane").remove(), "object" == typeof t && null !== t && a.each(t, function () {
					return !(e = !0)
				}), e && (a.each(t, function (t, e) {
					e = a.isFunction(e) ? {
						click: e,
						text: t
					} : e;
					var i = a('<button type="button"></button>').click(function () {
						e.click.apply(s.element[0], arguments)
					}).appendTo(n);
					a.each(e, function (t, e) {
						"click" !== t && (t in h ? i[t](e) : i.attr(t, e))
					}), a.fn.button && i.button()
				}), i.appendTo(s.uiDialog))
			},
			_makeDraggable: function () {
				function i(t) {
					return {
						position: t.position,
						offset: t.offset
					}
				}
				var s, n = this,
					o = n.options,
					r = a(document);
				n.uiDialog.draggable({
					cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
					handle: ".ui-dialog-titlebar",
					containment: "document",
					start: function (t, e) {
						s = "auto" === o.height ? "auto" : a(this).height(), a(this).height(a(this).height()).addClass("ui-dialog-dragging"), n._trigger("dragStart", t, i(e))
					},
					drag: function (t, e) {
						n._trigger("drag", t, i(e))
					},
					stop: function (t, e) {
						o.position = [e.position.left - r.scrollLeft(), e.position.top - r.scrollTop()], a(this).removeClass("ui-dialog-dragging").height(s), n._trigger("dragStop", t, i(e)), a.ui.dialog.overlay.resize()
					}
				})
			},
			_makeResizable: function (t) {
				function i(t) {
					return {
						originalPosition: t.originalPosition,
						originalSize: t.originalSize,
						position: t.position,
						size: t.size
					}
				}
				t = void 0 === t ? this.options.resizable : t;
				var s = this,
					n = s.options,
					e = s.uiDialog.css("position"),
					o = "string" == typeof t ? t : "n,e,s,w,se,sw,ne,nw";
				s.uiDialog.resizable({
					cancel: ".ui-dialog-content",
					containment: "document",
					alsoResize: s.element,
					maxWidth: n.maxWidth,
					maxHeight: n.maxHeight,
					minWidth: n.minWidth,
					minHeight: s._minHeight(),
					handles: o,
					start: function (t, e) {
						a(this).addClass("ui-dialog-resizing"), s._trigger("resizeStart", t, i(e))
					},
					resize: function (t, e) {
						s._trigger("resize", t, i(e))
					},
					stop: function (t, e) {
						a(this).removeClass("ui-dialog-resizing"), n.height = a(this).height(), n.width = a(this).width(), s._trigger("resizeStop", t, i(e)), a.ui.dialog.overlay.resize()
					}
				}).css("position", e).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
			},
			_minHeight: function () {
				var t = this.options;
				return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
			},
			_position: function (t) {
				var e, i = [],
					s = [0, 0];
				t ? (("string" == typeof t || "object" == typeof t && "0" in t) && (1 === (i = t.split ? t.split(" ") : [t[0], t[1]]).length && (i[1] = i[0]), a.each(["left", "top"], function (t, e) {
					+i[t] === i[t] && (s[t] = i[t], i[t] = e)
				}), t = {
					my: i.join(" "),
					at: i.join(" "),
					offset: s.join(" ")
				}), t = a.extend({}, a.ui.dialog.prototype.options.position, t)) : t = a.ui.dialog.prototype.options.position, (e = this.uiDialog.is(":visible")) || this.uiDialog.show(), this.uiDialog.css({
					top: 0,
					left: 0
				}).position(a.extend({
					of: window
				}, t)), e || this.uiDialog.hide()
			},
			_setOptions: function (t) {
				var i = this,
					s = {},
					n = !1;
				a.each(t, function (t, e) {
					i._setOption(t, e), t in o && (n = !0), t in r && (s[t] = e)
				}), n && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", s)
			},
			_setOption: function (t, e) {
				var i = this.uiDialog;
				switch (t) {
					case "beforeclose":
						t = "beforeClose";
						break;
					case "buttons":
						this._createButtons(e);
						break;
					case "closeText":
						this.uiDialogTitlebarCloseText.text("" + e);
						break;
					case "dialogClass":
						i.removeClass(this.options.dialogClass).addClass(l + e);
						break;
					case "disabled":
						e ? i.addClass("ui-dialog-disabled") : i.removeClass("ui-dialog-disabled");
						break;
					case "draggable":
						var s = i.is(":data(draggable)");
						s && !e && i.draggable("destroy"), !s && e && this._makeDraggable();
						break;
					case "position":
						this._position(e);
						break;
					case "resizable":
						var n = i.is(":data(resizable)");
						n && !e && i.resizable("destroy"), n && "string" == typeof e && i.resizable("option", "handles", e), !n && !1 !== e && this._makeResizable(e);
						break;
					case "title":
						a(".ui-dialog-title", this.uiDialogTitlebar).html("" + (e || "&#160;"))
				}
				a.Widget.prototype._setOption.apply(this, arguments)
			},
			_size: function () {
				var t, e, i = this.options,
					s = this.uiDialog.is(":visible");
				if (this.element.show().css({
						width: "auto",
						minHeight: 0,
						height: 0
					}), i.minWidth > i.width && (i.width = i.minWidth), t = this.uiDialog.css({
						height: "auto",
						width: i.width
					}).height(), e = Math.max(0, i.minHeight - t), "auto" === i.height)
					if (a.support.minHeight) this.element.css({
						minHeight: e,
						height: "auto"
					});
					else {
						this.uiDialog.show();
						var n = this.element.css("height", "auto").height();
						s || this.uiDialog.hide(), this.element.height(Math.max(n, e))
					}
				else this.element.height(Math.max(i.height - t, 0));
				this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
			}
		}), a.extend(a.ui.dialog, {
			version: "1.8.22",
			uuid: 0,
			maxZ: 0,
			getTitleId: function (t) {
				var e = t.attr("id");
				return e || (this.uuid += 1, e = this.uuid), "ui-dialog-title-" + e
			},
			overlay: function (t) {
				this.$el = a.ui.dialog.overlay.create(t)
			}
		}), a.extend(a.ui.dialog.overlay, {
			instances: [],
			oldInstances: [],
			maxZ: 0,
			events: a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (t) {
				return t + ".dialog-overlay"
			}).join(" "),
			create: function (e) {
				0 === this.instances.length && (setTimeout(function () {
					a.ui.dialog.overlay.instances.length && a(document).bind(a.ui.dialog.overlay.events, function (t) {
						if (a(t.target).zIndex() < a.ui.dialog.overlay.maxZ) return !1
					})
				}, 1), a(document).bind("keydown.dialog-overlay", function (t) {
					e.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === a.ui.keyCode.ESCAPE && (e.close(t), t.preventDefault())
				}), a(window).bind("resize.dialog-overlay", a.ui.dialog.overlay.resize));
				var t = (this.oldInstances.pop() || a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
					width: this.width(),
					height: this.height()
				});
				return a.fn.bgiframe && t.bgiframe(), this.instances.push(t), t
			},
			destroy: function (t) {
				var e = a.inArray(t, this.instances); - 1 != e && this.oldInstances.push(this.instances.splice(e, 1)[0]), 0 === this.instances.length && a([document, window]).unbind(".dialog-overlay"), t.remove();
				var i = 0;
				a.each(this.instances, function () {
					i = Math.max(i, this.css("z-index"))
				}), this.maxZ = i
			},
			height: function () {
				var t;
				return a.browser.msie && a.browser.version < 7 ? (t = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)) < Math.max(document.documentElement.offsetHeight, document.body.offsetHeight) ? a(window).height() + "px" : t + "px" : a(document).height() + "px"
			},
			width: function () {
				var t;
				return a.browser.msie ? (t = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)) < Math.max(document.documentElement.offsetWidth, document.body.offsetWidth) ? a(window).width() + "px" : t + "px" : a(document).width() + "px"
			},
			resize: function () {
				var t = a([]);
				a.each(a.ui.dialog.overlay.instances, function () {
					t = t.add(this)
				}), t.css({
					width: 0,
					height: 0
				}).css({
					width: a.ui.dialog.overlay.width(),
					height: a.ui.dialog.overlay.height()
				})
			}
		}), a.extend(a.ui.dialog.overlay.prototype, {
			destroy: function () {
				a.ui.dialog.overlay.destroy(this.$el)
			}
		})
	}(jQuery),
	function (g, t) {
		g.ui = g.ui || {};
		var i = /left|center|right/,
			s = /top|center|bottom/,
			m = "center",
			v = {},
			n = g.fn.position,
			o = g.fn.offset;
		g.fn.position = function (h) {
				if (!h || !h.of) return n.apply(this, arguments);
				h = g.extend({}, h);
				var c, u, d, t = g(h.of),
					e = t[0],
					p = (h.collision || "flip").split(" "),
					f = h.offset ? h.offset.split(" ") : [0, 0];
				return 9 === e.nodeType ? (c = t.width(), u = t.height(), d = {
					top: 0,
					left: 0
				}) : e.setTimeout ? (c = t.width(), u = t.height(), d = {
					top: t.scrollTop(),
					left: t.scrollLeft()
				}) : e.preventDefault ? (h.at = "left top", c = u = 0, d = {
					top: h.of.pageY,
					left: h.of.pageX
				}) : (c = t.outerWidth(), u = t.outerHeight(), d = t.offset()), g.each(["my", "at"], function () {
					var t = (h[this] || "").split(" ");
					1 === t.length && (t = i.test(t[0]) ? t.concat([m]) : s.test(t[0]) ? [m].concat(t) : [m, m]), t[0] = i.test(t[0]) ? t[0] : m, t[1] = s.test(t[1]) ? t[1] : m, h[this] = t
				}), 1 === p.length && (p[1] = p[0]), f[0] = parseInt(f[0], 10) || 0, 1 === f.length && (f[1] = f[0]), f[1] = parseInt(f[1], 10) || 0, "right" === h.at[0] ? d.left += c : h.at[0] === m && (d.left += c / 2), "bottom" === h.at[1] ? d.top += u : h.at[1] === m && (d.top += u / 2), d.left += f[0], d.top += f[1], this.each(function () {
					var i, t = g(this),
						s = t.outerWidth(),
						n = t.outerHeight(),
						e = parseInt(g.curCSS(this, "marginLeft", !0)) || 0,
						o = parseInt(g.curCSS(this, "marginTop", !0)) || 0,
						r = s + e + (parseInt(g.curCSS(this, "marginRight", !0)) || 0),
						a = n + o + (parseInt(g.curCSS(this, "marginBottom", !0)) || 0),
						l = g.extend({}, d);
					"right" === h.my[0] ? l.left -= s : h.my[0] === m && (l.left -= s / 2), "bottom" === h.my[1] ? l.top -= n : h.my[1] === m && (l.top -= n / 2), v.fractions || (l.left = Math.round(l.left), l.top = Math.round(l.top)), i = {
						left: l.left - e,
						top: l.top - o
					}, g.each(["left", "top"], function (t, e) {
						g.ui.position[p[t]] && g.ui.position[p[t]][e](l, {
							targetWidth: c,
							targetHeight: u,
							elemWidth: s,
							elemHeight: n,
							collisionPosition: i,
							collisionWidth: r,
							collisionHeight: a,
							offset: f,
							my: h.my,
							at: h.at
						})
					}), g.fn.bgiframe && t.bgiframe(), t.offset(g.extend(l, {
						using: h.using
					}))
				})
			}, g.ui.position = {
				fit: {
					left: function (t, e) {
						var i = g(window),
							s = e.collisionPosition.left + e.collisionWidth - i.width() - i.scrollLeft();
						t.left = 0 < s ? t.left - s : Math.max(t.left - e.collisionPosition.left, t.left)
					},
					top: function (t, e) {
						var i = g(window),
							s = e.collisionPosition.top + e.collisionHeight - i.height() - i.scrollTop();
						t.top = 0 < s ? t.top - s : Math.max(t.top - e.collisionPosition.top, t.top)
					}
				},
				flip: {
					left: function (t, e) {
						if (e.at[0] !== m) {
							var i = g(window),
								s = e.collisionPosition.left + e.collisionWidth - i.width() - i.scrollLeft(),
								n = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
								o = "left" === e.at[0] ? e.targetWidth : -e.targetWidth,
								r = -2 * e.offset[0];
							t.left += e.collisionPosition.left < 0 ? n + o + r : 0 < s ? n + o + r : 0
						}
					},
					top: function (t, e) {
						if (e.at[1] !== m) {
							var i = g(window),
								s = e.collisionPosition.top + e.collisionHeight - i.height() - i.scrollTop(),
								n = "top" === e.my[1] ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
								o = "top" === e.at[1] ? e.targetHeight : -e.targetHeight,
								r = -2 * e.offset[1];
							t.top += e.collisionPosition.top < 0 ? n + o + r : 0 < s ? n + o + r : 0
						}
					}
				}
			}, g.offset.setOffset || (g.offset.setOffset = function (t, e) {
				/static/.test(g.curCSS(t, "position")) && (t.style.position = "relative");
				var i = g(t),
					s = i.offset(),
					n = parseInt(g.curCSS(t, "top", !0), 10) || 0,
					o = parseInt(g.curCSS(t, "left", !0), 10) || 0,
					r = {
						top: e.top - s.top + n,
						left: e.left - s.left + o
					};
				"using" in e ? e.using.call(t, r) : i.css(r)
			}, g.fn.offset = function (e) {
				var t = this[0];
				return t && t.ownerDocument ? e ? g.isFunction(e) ? this.each(function (t) {
					g(this).offset(e.call(this, t, g(this).offset()))
				}) : this.each(function () {
					g.offset.setOffset(this, e)
				}) : o.call(this) : null
			}),
			function () {
				var t, e, i, s, n, o = document.getElementsByTagName("body")[0],
					r = document.createElement("div");
				for (var a in t = document.createElement(o ? "div" : "body"), i = {
						visibility: "hidden",
						width: 0,
						height: 0,
						border: 0,
						margin: 0,
						background: "none"
					}, o && g.extend(i, {
						position: "absolute",
						left: "-1000px",
						top: "-1000px"
					}), i) t.style[a] = i[a];
				t.appendChild(r), (e = o || document.documentElement).insertBefore(t, e.firstChild), r.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", s = g(r).offset(function (t, e) {
					return e
				}).offset(), t.innerHTML = "", e.removeChild(t), n = s.top + s.left + (o ? 2e3 : 0), v.fractions = 21 < n && n < 22
			}()
	}(jQuery),
	function (i, t) {
		i.widget("ui.progressbar", {
			options: {
				value: 0,
				max: 100
			},
			min: 0,
			_create: function () {
				this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
					role: "progressbar",
					"aria-valuemin": this.min,
					"aria-valuemax": this.options.max,
					"aria-valuenow": this._value()
				}), this.valueDiv = i("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this.oldValue = this._value(), this._refreshValue()
			},
			destroy: function () {
				this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove(), i.Widget.prototype.destroy.apply(this, arguments)
			},
			value: function (t) {
				return void 0 === t ? this._value() : (this._setOption("value", t), this)
			},
			_setOption: function (t, e) {
				"value" === t && (this.options.value = e, this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), i.Widget.prototype._setOption.apply(this, arguments)
			},
			_value: function () {
				var t = this.options.value;
				return "number" != typeof t && (t = 0), Math.min(this.options.max, Math.max(this.min, t))
			},
			_percentage: function () {
				return 100 * this._value() / this.options.max
			},
			_refreshValue: function () {
				var t = this.value(),
					e = this._percentage();
				this.oldValue !== t && (this.oldValue = t, this._trigger("change")), this.valueDiv.toggle(t > this.min).toggleClass("ui-corner-right", t === this.options.max).width(e.toFixed(0) + "%"), this.element.attr("aria-valuenow", t)
			}
		}), i.extend(i.ui.progressbar, {
			version: "1.8.22"
		})
	}(jQuery),
	function (c, t) {
		c.widget("ui.slider", c.ui.mouse, {
			widgetEventPrefix: "slide",
			options: {
				animate: !1,
				distance: 0,
				max: 100,
				min: 0,
				orientation: "horizontal",
				range: !1,
				step: 1,
				value: 0,
				values: null
			},
			_create: function () {
				var o = this,
					t = this.options,
					e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
					i = t.values && t.values.length || 1,
					s = [];
				this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (t.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = c([]), t.range && (!0 === t.range && (t.values || (t.values = [this._valueMin(), this._valueMin()]), t.values.length && 2 !== t.values.length && (t.values = [t.values[0], t.values[0]])), this.range = c("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : "")));
				for (var n = e.length; n < i; n += 1) s.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
				this.handles = e.add(c(s.join("")).appendTo(o.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function (t) {
					t.preventDefault()
				}).hover(function () {
					t.disabled || c(this).addClass("ui-state-hover")
				}, function () {
					c(this).removeClass("ui-state-hover")
				}).focus(function () {
					t.disabled ? c(this).blur() : (c(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), c(this).addClass("ui-state-focus"))
				}).blur(function () {
					c(this).removeClass("ui-state-focus")
				}), this.handles.each(function (t) {
					c(this).data("index.ui-slider-handle", t)
				}), this.handles.keydown(function (t) {
					var e, i, s, n = c(this).data("index.ui-slider-handle");
					if (!o.options.disabled) {
						switch (t.keyCode) {
							case c.ui.keyCode.HOME:
							case c.ui.keyCode.END:
							case c.ui.keyCode.PAGE_UP:
							case c.ui.keyCode.PAGE_DOWN:
							case c.ui.keyCode.UP:
							case c.ui.keyCode.RIGHT:
							case c.ui.keyCode.DOWN:
							case c.ui.keyCode.LEFT:
								if (t.preventDefault(), !o._keySliding && (o._keySliding = !0, c(this).addClass("ui-state-active"), !1 === o._start(t, n))) return
						}
						switch (s = o.options.step, e = i = o.options.values && o.options.values.length ? o.values(n) : o.value(), t.keyCode) {
							case c.ui.keyCode.HOME:
								i = o._valueMin();
								break;
							case c.ui.keyCode.END:
								i = o._valueMax();
								break;
							case c.ui.keyCode.PAGE_UP:
								i = o._trimAlignValue(e + (o._valueMax() - o._valueMin()) / 5);
								break;
							case c.ui.keyCode.PAGE_DOWN:
								i = o._trimAlignValue(e - (o._valueMax() - o._valueMin()) / 5);
								break;
							case c.ui.keyCode.UP:
							case c.ui.keyCode.RIGHT:
								if (e === o._valueMax()) return;
								i = o._trimAlignValue(e + s);
								break;
							case c.ui.keyCode.DOWN:
							case c.ui.keyCode.LEFT:
								if (e === o._valueMin()) return;
								i = o._trimAlignValue(e - s)
						}
						o._slide(t, n, i)
					}
				}).keyup(function (t) {
					var e = c(this).data("index.ui-slider-handle");
					o._keySliding && (o._keySliding = !1, o._stop(t, e), o._change(t, e), c(this).removeClass("ui-state-active"))
				}), this._refreshValue(), this._animateOff = !1
			},
			destroy: function () {
				return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), this._mouseDestroy(), this
			},
			_mouseCapture: function (t) {
				var e, i, s, n, o, r, a, l, h = this.options;
				return !h.disabled && (this.elementSize = {
					width: this.element.outerWidth(),
					height: this.element.outerHeight()
				}, this.elementOffset = this.element.offset(), e = {
					x: t.pageX,
					y: t.pageY
				}, i = this._normValueFromMouse(e), s = this._valueMax() - this._valueMin() + 1, (o = this).handles.each(function (t) {
					var e = Math.abs(i - o.values(t));
					e < s && (s = e, n = c(this), r = t)
				}), !0 === h.range && this.values(1) === h.min && (r += 1, n = c(this.handles[r])), !1 !== this._start(t, r) && (this._mouseSliding = !0, o._handleIndex = r, n.addClass("ui-state-active").focus(), a = n.offset(), l = !c(t.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = l ? {
					left: 0,
					top: 0
				} : {
					left: t.pageX - a.left - n.width() / 2,
					top: t.pageY - a.top - n.height() / 2 - (parseInt(n.css("borderTopWidth"), 10) || 0) - (parseInt(n.css("borderBottomWidth"), 10) || 0) + (parseInt(n.css("marginTop"), 10) || 0)
				}, this.handles.hasClass("ui-state-hover") || this._slide(t, r, i), this._animateOff = !0))
			},
			_mouseStart: function (t) {
				return !0
			},
			_mouseDrag: function (t) {
				var e = {
						x: t.pageX,
						y: t.pageY
					},
					i = this._normValueFromMouse(e);
				return this._slide(t, this._handleIndex, i), !1
			},
			_mouseStop: function (t) {
				return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1
			},
			_detectOrientation: function () {
				this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
			},
			_normValueFromMouse: function (t) {
				var e, i, s, n, o;
				return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), 1 < (s = i / e) && (s = 1), s < 0 && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o)
			},
			_start: function (t, e) {
				var i = {
					handle: this.handles[e],
					value: this.value()
				};
				return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
			},
			_slide: function (t, e, i) {
				var s, n, o;
				this.options.values && this.options.values.length ? (s = this.values(e ? 0 : 1), 2 === this.options.values.length && !0 === this.options.range && (0 === e && s < i || 1 === e && i < s) && (i = s), i !== this.values(e) && ((n = this.values())[e] = i, o = this._trigger("slide", t, {
					handle: this.handles[e],
					value: i,
					values: n
				}), s = this.values(e ? 0 : 1), !1 !== o && this.values(e, i, !0))) : i !== this.value() && (!1 !== (o = this._trigger("slide", t, {
					handle: this.handles[e],
					value: i
				})) && this.value(i))
			},
			_stop: function (t, e) {
				var i = {
					handle: this.handles[e],
					value: this.value()
				};
				this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
			},
			_change: function (t, e) {
				if (!this._keySliding && !this._mouseSliding) {
					var i = {
						handle: this.handles[e],
						value: this.value()
					};
					this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("change", t, i)
				}
			},
			value: function (t) {
				return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), void this._change(null, 0)) : this._value()
			},
			values: function (t, e) {
				var i, s, n;
				if (1 < arguments.length) return this.options.values[t] = this._trimAlignValue(e), this._refreshValue(), void this._change(null, t);
				if (!arguments.length) return this._values();
				if (!c.isArray(t)) return this.options.values && this.options.values.length ? this._values(t) : this.value();
				for (i = this.options.values, s = t, n = 0; n < i.length; n += 1) i[n] = this._trimAlignValue(s[n]), this._change(null, n);
				this._refreshValue()
			},
			_setOption: function (t, e) {
				var i, s = 0;
				switch (c.isArray(this.options.values) && (s = this.options.values.length), c.Widget.prototype._setOption.apply(this, arguments), t) {
					case "disabled":
						e ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
						break;
					case "orientation":
						this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
						break;
					case "value":
						this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
						break;
					case "values":
						for (this._animateOff = !0, this._refreshValue(), i = 0; i < s; i += 1) this._change(null, i);
						this._animateOff = !1
				}
			},
			_value: function () {
				var t = this.options.value;
				return t = this._trimAlignValue(t)
			},
			_values: function (t) {
				var e, i, s;
				if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
				for (i = this.options.values.slice(), s = 0; s < i.length; s += 1) i[s] = this._trimAlignValue(i[s]);
				return i
			},
			_trimAlignValue: function (t) {
				if (t <= this._valueMin()) return this._valueMin();
				if (t >= this._valueMax()) return this._valueMax();
				var e = 0 < this.options.step ? this.options.step : 1,
					i = (t - this._valueMin()) % e,
					s = t - i;
				return 2 * Math.abs(i) >= e && (s += 0 < i ? e : -e), parseFloat(s.toFixed(5))
			},
			_valueMin: function () {
				return this.options.min
			},
			_valueMax: function () {
				return this.options.max
			},
			_refreshValue: function () {
				var i, s, t, e, n, o = this.options.range,
					r = this.options,
					a = this,
					l = !this._animateOff && r.animate,
					h = {};
				this.options.values && this.options.values.length ? this.handles.each(function (t, e) {
					i = (a.values(t) - a._valueMin()) / (a._valueMax() - a._valueMin()) * 100, h["horizontal" === a.orientation ? "left" : "bottom"] = i + "%", c(this).stop(1, 1)[l ? "animate" : "css"](h, r.animate), !0 === a.options.range && ("horizontal" === a.orientation ? (0 === t && a.range.stop(1, 1)[l ? "animate" : "css"]({
						left: i + "%"
					}, r.animate), 1 === t && a.range[l ? "animate" : "css"]({
						width: i - s + "%"
					}, {
						queue: !1,
						duration: r.animate
					})) : (0 === t && a.range.stop(1, 1)[l ? "animate" : "css"]({
						bottom: i + "%"
					}, r.animate), 1 === t && a.range[l ? "animate" : "css"]({
						height: i - s + "%"
					}, {
						queue: !1,
						duration: r.animate
					}))), s = i
				}) : (t = this.value(), e = this._valueMin(), n = this._valueMax(), i = n !== e ? (t - e) / (n - e) * 100 : 0, h["horizontal" === a.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](h, r.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
					width: i + "%"
				}, r.animate), "max" === o && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({
					width: 100 - i + "%"
				}, {
					queue: !1,
					duration: r.animate
				}), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
					height: i + "%"
				}, r.animate), "max" === o && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({
					height: 100 - i + "%"
				}, {
					queue: !1,
					duration: r.animate
				}))
			}
		}), c.extend(c.ui.slider, {
			version: "1.8.22"
		})
	}(jQuery),
	function (p, t) {
		var e = 0,
			i = 0;
		p.widget("ui.tabs", {
			options: {
				add: null,
				ajaxOptions: null,
				cache: !1,
				cookie: null,
				collapsible: !1,
				disable: null,
				disabled: [],
				enable: null,
				event: "click",
				fx: null,
				idPrefix: "ui-tabs-",
				load: null,
				panelTemplate: "<div></div>",
				remove: null,
				select: null,
				show: null,
				spinner: "<em>Loading&#8230;</em>",
				tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
			},
			_create: function () {
				this._tabify(!0)
			},
			_setOption: function (t, e) {
				if ("selected" == t) {
					if (this.options.collapsible && e == this.options.selected) return;
					this.select(e)
				} else this.options[t] = e, this._tabify()
			},
			_tabId: function (t) {
				return t.title && t.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + ++e
			},
			_sanitizeSelector: function (t) {
				return t.replace(/:/g, "\\:")
			},
			_cookie: function () {
				var t = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + ++i);
				return p.cookie.apply(null, [t].concat(p.makeArray(arguments)))
			},
			_ui: function (t, e) {
				return {
					tab: t,
					panel: e,
					index: this.anchors.index(t)
				}
			},
			_cleanup: function () {
				this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
					var t = p(this);
					t.html(t.data("label.tabs")).removeData("label.tabs")
				})
			},
			_tabify: function (t) {
				function i(t, e) {
					t.css("display", ""), !p.support.opacity && e.opacity && t[0].style.removeAttribute("filter")
				}
				var s, n, a = this,
					l = this.options,
					h = /^#.+/;
				this.list = this.element.find("ol,ul").eq(0), this.lis = p(" > li:has(a[href])", this.list), this.anchors = this.lis.map(function () {
					return p("a", this)[0]
				}), this.panels = p([]), this.anchors.each(function (t, e) {
					var i, s = p(e).attr("href"),
						n = s.split("#")[0];
					if (n && (n === location.toString().split("#")[0] || (i = p("base")[0]) && n === i.href) && (s = e.hash, e.href = s), h.test(s)) a.panels = a.panels.add(a.element.find(a._sanitizeSelector(s)));
					else if (s && "#" !== s) {
						p.data(e, "href.tabs", s), p.data(e, "load.tabs", s.replace(/#.*$/, ""));
						var o = a._tabId(e);
						e.href = "#" + o;
						var r = a.element.find("#" + o);
						r.length || (r = p(l.panelTemplate).attr("id", o).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(a.panels[t - 1] || a.list)).data("destroy.tabs", !0), a.panels = a.panels.add(r)
					} else l.disabled.push(t)
				}), t ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), void 0 === l.selected ? (location.hash && this.anchors.each(function (t, e) {
					if (e.hash == location.hash) return l.selected = t, !1
				}), "number" != typeof l.selected && l.cookie && (l.selected = parseInt(a._cookie(), 10)), "number" != typeof l.selected && this.lis.filter(".ui-tabs-selected").length && (l.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))), l.selected = l.selected || (this.lis.length ? 0 : -1)) : null === l.selected && (l.selected = -1), l.selected = 0 <= l.selected && this.anchors[l.selected] || l.selected < 0 ? l.selected : 0, l.disabled = p.unique(l.disabled.concat(p.map(this.lis.filter(".ui-state-disabled"), function (t, e) {
					return a.lis.index(t)
				}))).sort(), -1 != p.inArray(l.selected, l.disabled) && l.disabled.splice(p.inArray(l.selected, l.disabled), 1), this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"), 0 <= l.selected && this.anchors.length && (a.element.find(a._sanitizeSelector(a.anchors[l.selected].hash)).removeClass("ui-tabs-hide"), this.lis.eq(l.selected).addClass("ui-tabs-selected ui-state-active"), a.element.queue("tabs", function () {
					a._trigger("show", null, a._ui(a.anchors[l.selected], a.element.find(a._sanitizeSelector(a.anchors[l.selected].hash))[0]))
				}), this.load(l.selected)), p(window).bind("unload", function () {
					a.lis.add(a.anchors).unbind(".tabs"), a.lis = a.anchors = a.panels = null
				})) : l.selected = this.lis.index(this.lis.filter(".ui-tabs-selected")), this.element[l.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible"), l.cookie && this._cookie(l.selected, l.cookie);
				for (var e, o = 0; e = this.lis[o]; o++) p(e)[-1 == p.inArray(o, l.disabled) || p(e).hasClass("ui-tabs-selected") ? "removeClass" : "addClass"]("ui-state-disabled");
				if (!1 === l.cache && this.anchors.removeData("cache.tabs"), this.lis.add(this.anchors).unbind(".tabs"), "mouseover" !== l.event) {
					var r = function (t, e) {
							e.is(":not(.ui-state-disabled)") && e.addClass("ui-state-" + t)
						},
						c = function (t, e) {
							e.removeClass("ui-state-" + t)
						};
					this.lis.bind("mouseover.tabs", function () {
						r("hover", p(this))
					}), this.lis.bind("mouseout.tabs", function () {
						c("hover", p(this))
					}), this.anchors.bind("focus.tabs", function () {
						r("focus", p(this).closest("li"))
					}), this.anchors.bind("blur.tabs", function () {
						c("focus", p(this).closest("li"))
					})
				}
				l.fx && (p.isArray(l.fx) ? (s = l.fx[0], n = l.fx[1]) : s = n = l.fx);
				var u = n ? function (t, e) {
						p(t).closest("li").addClass("ui-tabs-selected ui-state-active"), e.hide().removeClass("ui-tabs-hide").animate(n, n.duration || "normal", function () {
							i(e, n), a._trigger("show", null, a._ui(t, e[0]))
						})
					} : function (t, e) {
						p(t).closest("li").addClass("ui-tabs-selected ui-state-active"), e.removeClass("ui-tabs-hide"), a._trigger("show", null, a._ui(t, e[0]))
					},
					d = s ? function (t, e) {
						e.animate(s, s.duration || "normal", function () {
							a.lis.removeClass("ui-tabs-selected ui-state-active"), e.addClass("ui-tabs-hide"), i(e, s), a.element.dequeue("tabs")
						})
					} : function (t, e, i) {
						a.lis.removeClass("ui-tabs-selected ui-state-active"), e.addClass("ui-tabs-hide"), a.element.dequeue("tabs")
					};
				this.anchors.bind(l.event + ".tabs", function () {
					var t = this,
						e = p(t).closest("li"),
						i = a.panels.filter(":not(.ui-tabs-hide)"),
						s = a.element.find(a._sanitizeSelector(t.hash));
					if (e.hasClass("ui-tabs-selected") && !l.collapsible || e.hasClass("ui-state-disabled") || e.hasClass("ui-state-processing") || a.panels.filter(":animated").length || !1 === a._trigger("select", null, a._ui(this, s[0]))) return this.blur(), !1;
					if (l.selected = a.anchors.index(this), a.abort(), l.collapsible) {
						if (e.hasClass("ui-tabs-selected")) return l.selected = -1, l.cookie && a._cookie(l.selected, l.cookie), a.element.queue("tabs", function () {
							d(t, i)
						}).dequeue("tabs"), this.blur(), !1;
						if (!i.length) return l.cookie && a._cookie(l.selected, l.cookie), a.element.queue("tabs", function () {
							u(t, s)
						}), a.load(a.anchors.index(this)), this.blur(), !1
					}
					if (l.cookie && a._cookie(l.selected, l.cookie), !s.length) throw "jQuery UI Tabs: Mismatching fragment identifier.";
					i.length && a.element.queue("tabs", function () {
						d(t, i)
					}), a.element.queue("tabs", function () {
						u(t, s)
					}), a.load(a.anchors.index(this)), p.browser.msie && this.blur()
				}), this.anchors.bind("click.tabs", function () {
					return !1
				})
			},
			_getIndex: function (t) {
				return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t
			},
			destroy: function () {
				var t = this.options;
				return this.abort(), this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"), this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.anchors.each(function () {
					var t = p.data(this, "href.tabs");
					t && (this.href = t);
					var i = p(this).unbind(".tabs");
					p.each(["href", "load", "cache"], function (t, e) {
						i.removeData(e + ".tabs")
					})
				}), this.lis.unbind(".tabs").add(this.panels).each(function () {
					p.data(this, "destroy.tabs") ? p(this).remove() : p(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
				}), t.cookie && this._cookie(null, t.cookie), this
			},
			add: function (t, e, i) {
				void 0 === i && (i = this.anchors.length);
				var s = this,
					n = this.options,
					o = p(n.tabTemplate.replace(/#\{href\}/g, t).replace(/#\{label\}/g, e)),
					r = t.indexOf("#") ? this._tabId(p("a", o)[0]) : t.replace("#", "");
				o.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
				var a = s.element.find("#" + r);
				return a.length || (a = p(n.panelTemplate).attr("id", r).data("destroy.tabs", !0)), a.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"), i >= this.lis.length ? (o.appendTo(this.list), a.appendTo(this.list[0].parentNode)) : (o.insertBefore(this.lis[i]), a.insertBefore(this.panels[i])), n.disabled = p.map(n.disabled, function (t, e) {
					return i <= t ? ++t : t
				}), this._tabify(), 1 == this.anchors.length && (n.selected = 0, o.addClass("ui-tabs-selected ui-state-active"), a.removeClass("ui-tabs-hide"), this.element.queue("tabs", function () {
					s._trigger("show", null, s._ui(s.anchors[0], s.panels[0]))
				}), this.load(0)), this._trigger("add", null, this._ui(this.anchors[i], this.panels[i])), this
			},
			remove: function (i) {
				i = this._getIndex(i);
				var t = this.options,
					e = this.lis.eq(i).remove(),
					s = this.panels.eq(i).remove();
				return e.hasClass("ui-tabs-selected") && 1 < this.anchors.length && this.select(i + (i + 1 < this.anchors.length ? 1 : -1)), t.disabled = p.map(p.grep(t.disabled, function (t, e) {
					return t != i
				}), function (t, e) {
					return i <= t ? --t : t
				}), this._tabify(), this._trigger("remove", null, this._ui(e.find("a")[0], s[0])), this
			},
			enable: function (i) {
				i = this._getIndex(i);
				var t = this.options;
				if (-1 != p.inArray(i, t.disabled)) return this.lis.eq(i).removeClass("ui-state-disabled"), t.disabled = p.grep(t.disabled, function (t, e) {
					return t != i
				}), this._trigger("enable", null, this._ui(this.anchors[i], this.panels[i])), this
			},
			disable: function (t) {
				t = this._getIndex(t);
				var e = this.options;
				return t != e.selected && (this.lis.eq(t).addClass("ui-state-disabled"), e.disabled.push(t), e.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[t], this.panels[t]))), this
			},
			select: function (t) {
				if (-1 == (t = this._getIndex(t))) {
					if (!this.options.collapsible || -1 == this.options.selected) return this;
					t = this.options.selected
				}
				return this.anchors.eq(t).trigger(this.options.event + ".tabs"), this
			},
			load: function (s) {
				s = this._getIndex(s);
				var n = this,
					o = this.options,
					r = this.anchors.eq(s)[0],
					t = p.data(r, "load.tabs");
				if (this.abort(), t && (0 === this.element.queue("tabs").length || !p.data(r, "cache.tabs"))) {
					if (this.lis.eq(s).addClass("ui-state-processing"), o.spinner) {
						var e = p("span", r);
						e.data("label.tabs", e.html()).html(o.spinner)
					}
					return this.xhr = p.ajax(p.extend({}, o.ajaxOptions, {
						url: t,
						success: function (t, e) {
							n.element.find(n._sanitizeSelector(r.hash)).html(t), n._cleanup(), o.cache && p.data(r, "cache.tabs", !0), n._trigger("load", null, n._ui(n.anchors[s], n.panels[s]));
							try {
								o.ajaxOptions.success(t, e)
							} catch (t) {}
						},
						error: function (t, e, i) {
							n._cleanup(), n._trigger("load", null, n._ui(n.anchors[s], n.panels[s]));
							try {
								o.ajaxOptions.error(t, e, s, r)
							} catch (i) {}
						}
					})), n.element.dequeue("tabs"), this
				}
				this.element.dequeue("tabs")
			},
			abort: function () {
				return this.element.queue([]), this.panels.stop(!1, !0), this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)), this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup(), this
			},
			url: function (t, e) {
				return this.anchors.eq(t).removeData("cache.tabs").data("load.tabs", e), this
			},
			length: function () {
				return this.anchors.length
			}
		}), p.extend(p.ui.tabs, {
			version: "1.8.22"
		}), p.extend(p.ui.tabs.prototype, {
			rotation: null,
			rotate: function (e, t) {
				var i = this,
					s = this.options,
					n = i._rotate || (i._rotate = function (t) {
						clearTimeout(i.rotation), i.rotation = setTimeout(function () {
							var t = s.selected;
							i.select(++t < i.anchors.length ? t : 0)
						}, e), t && t.stopPropagation()
					}),
					o = i._unrotate || (i._unrotate = t ? function (t) {
						n()
					} : function (t) {
						t.clientX && i.rotate(null)
					});
				return e ? (this.element.bind("tabsshow", n), this.anchors.bind(s.event + ".tabs", o), n()) : (clearTimeout(i.rotation), this.element.unbind("tabsshow", n), this.anchors.unbind(s.event + ".tabs", o), delete this._rotate, delete this._unrotate), this
			}
		})
	}(jQuery),
	function (u, c) {
		var r = 0,
			l = {},
			a = {},
			h = Array.prototype.slice,
			d = function (t) {
				return u.isArray(t) ? t : [t]
			},
			n = "disabled",
			p = "wizard",
			f = "default",
			g = "number",
			m = "boolean";
		u.each("branch form header step wrapper".split(" "), function () {
			l[this] = "." + (a[this] = p + "-" + this)
		}), u.widget("kf." + p, {
			version: "1.0.0",
			options: {
				animations: {
					show: {
						options: {
							duration: 0
						},
						properties: {
							opacity: "show"
						}
					},
					hide: {
						options: {
							duration: 0
						},
						properties: {
							opacity: "hide"
						}
					}
				},
				backward: ".backward",
				branches: ".branch",
				disabled: !1,
				enableSubmit: !1,
				forward: ".forward",
				header: ":header:first",
				initialStep: 0,
				stateAttribute: "data-state",
				stepClasses: {
					current: "current",
					exclude: "exclude",
					stop: "stop",
					submit: "submit",
					unidirectional: "unidirectional"
				},
				steps: ".step",
				submit: ":submit",
				transitions: {},
				unidirectional: !1,
				afterBackward: null,
				afterDestroy: null,
				afterForward: null,
				afterSelect: null,
				beforeBackward: null,
				beforeDestroy: null,
				beforeForward: null,
				beforeSelect: null,
				create: null
			},
			_create: function () {
				var t, e, i = this,
					s = i.options,
					n = i.element,
					o = n.find(s.steps).eq(0).parent();
				n[0].elements ? t = n : (t = n.find("form")).length || (t = n.closest("form")), (e = n.find(s.header)).length || (e = t.find(s.header)), i.elements = {
					form: t.addClass(a.form),
					submit: t.find(s.submit),
					forward: t.find(s.forward),
					backward: t.find(s.backward),
					header: e.addClass(a.header),
					steps: n.find(s.steps).hide().addClass(a.step),
					branches: n.find(s.branches).add(o).addClass(a.branch),
					stepsWrapper: o.addClass(a.wrapper),
					wizard: n.addClass(p)
				}, o.attr("id") || o.attr("id", p + "-" + ++r), i.elements.forward.click(function (t) {
					t.preventDefault(), i.forward(t)
				}), i.elements.backward.click(function (t) {
					t.preventDefault(), i.backward(t)
				}), i._currentState = {
					branchesActivated: [],
					stepsActivated: []
				}, i._stepCount = i.elements.steps.length, i._lastStepIndex = i._stepCount - 1, i._branchLabels = [], i.elements.steps.each(function (t) {
					i._branchLabels[t] = u(this).parent().attr("id")
				}), i._excludesFilter = function () {
					return !u(this).hasClass(s.stepClasses.exclude)
				}, s.transitions[f] || (s.transitions[f] = function (t) {
					return i.stepIndex(t.nextAll(l.step))
				}), i.select.apply(i, d(s.initialStep))
			},
			_fastForward: function (s, n, o) {
				var r = 0,
					a = this,
					l = a._currentState.stepIndex,
					h = [l];
				u.isFunction(n) && (o = n, n = c),
					function i() {
						a._transition(l, function (t, e) {
							if (-1 === (l = a.stepIndex(t, e))) throw new Error('[_fastForward]: Invalid step "' + t + '"');
							if (0 <= u.inArray(l, h)) throw new Error('[_fastForward]: Recursion detected on step "' + t + '"');
							h.push(l), l === a._lastStepIndex || (n ? ++r : l) === s ? o.call(a, l, h) : i()
						})
					}()
			},
			_find: function (t, e, i) {
				var s, n, o, r, a, l = [],
					h = e instanceof jQuery ? e : u(e);

				function c(t, e) {
					if (e === r) return s = e, !1
				}
				if (null !== t && h.length)
					for (n = 0, o = (t = d(t)).length; n < o; n++) s = null, (a = typeof (r = t[n])) === g ? s = h.get(r) : "string" === a ? s = document.getElementById(r.replace("#", "")) : "object" === a && (r instanceof jQuery && r.length && (r = r[0]), r.nodeType && h.each(c)), s && l.push(s);
				return !1 === i ? l : u(l)
			},
			_move: function (t, e, i, s, n) {
				var o = this,
					r = o._currentState;

				function a(t, e) {
					n.call(o, t, u.isArray(s) ? s : !1 !== s ? e : c)
				}
				typeof e === m && (n = s, s = i, i = e, e = c), !0 === i ? 0 < t ? o._fastForward(t, i, a) : n.call(o, r.stepsActivated[Math.max(0, t + (r.stepsActivated.length - 1))]) : -1 !== (t = o.stepIndex(t, e)) && (t > r.stepIndex ? o._fastForward(t, a) : a.call(o, t))
			},
			_state: function (t, e) {
				if (!this.isValidStepIndex(t)) return null;
				this.options;
				var i = u.extend(!0, {}, this._currentState);
				e = d(e || t), i.step = this.elements.steps.eq(t), i.branch = i.step.parent(), i.branchStepCount = i.branch.children(l.step).length, i.isMovingForward = t > i.stepIndex, i.stepIndexInBranch = i.branch.children(l.step).index(i.step);
				for (var s, n, o, r = 0, a = e.length; r < a; r++) t = e[r], s = this._branchLabels[t], !i.stepIndex || i.stepIndex < t ? u.inArray(t, i.stepsActivated) < 0 && (i.stepsActivated.push(t), u.inArray(s, i.branchesActivated) < 0 && i.branchesActivated.push(s)) : i.stepIndex > t && (n = u.inArray(s, i.branchesActivated) + 1, o = u.inArray(t, i.stepsActivated) + 1, 0 < n && i.branchesActivated.splice(n, i.branchesActivated.length - 1), 0 < o && i.stepsActivated.splice(o, i.stepsActivated.length - 1)), i.stepIndex = t, i.branchLabel = s;
				return i.stepsComplete = Math.max(0, this._find(i.stepsActivated, this.elements.steps).filter(this._excludesFilter).length - 1), i.stepsPossible = Math.max(0, this._find(i.branchesActivated, this.elements.branches).children(l.step).filter(this._excludesFilter).length - 1), u.extend(i, {
					branchLabel: this._branchLabels[t],
					isFirstStep: 0 === t,
					isFirstStepInBranch: 0 === i.stepIndexInBranch,
					isLastStep: t === this._lastStepIndex,
					isLastStepInBranch: i.stepIndexInBranch === i.branchStepCount - 1,
					percentComplete: 100 * i.stepsComplete / i.stepsPossible,
					stepsRemaining: i.stepsPossible - i.stepsComplete
				}), i
			},
			_transition: function (t, e, i) {
				var s = this;
				u.isFunction(t) ? (i = t, t = s._currentState.stepIndex, e = c) : u.isFunction(e) && (i = e, e = c);
				var n, o = s.options,
					r = s.step(t, e),
					a = r.attr(o.stateAttribute),
					l = a ? o.transitions[a] : o.transitions[f];
				return (n = u.isFunction(l) ? l.call(s, r, function () {
					return i.apply(s, h.call(arguments))
				}) : a) !== c && !1 !== n && i.apply(s, d(n)), n
			},
			_update: function (t, e) {
				var i = this._currentState,
					s = this.options;
				if (i.step) {
					if (s.disabled || !e || e.stepIndex === i.stepIndex || !this._trigger("beforeSelect", t, e) || e.isMovingForward && !this._trigger("beforeForward", t, e) || !e.isMovingForward && !this._trigger("beforeBackward", t, e)) return;
					i.step.removeClass(s.stepClasses.current).animate(s.animations.hide.properties, u.extend({}, s.animations.hide.options))
				}(this._currentState = e).step.addClass(s.stepClasses.current).animate(s.animations.show.properties, u.extend({}, s.animations.show.options)), e.isFirstStep || s.unidirectional || e.step.hasClass(s.stepClasses.unidirectional) ? this.elements.backward.attr(n, !0) : this.elements.backward.removeAttr(n), e.isLastStepInBranch && !e.step.attr(s.stateAttribute) || e.step.hasClass(s.stepClasses.stop) ? this.elements.forward.attr(n, !0) : this.elements.forward.removeAttr(n), s.enableSubmit || e.step.hasClass(s.stepClasses.submit) ? this.elements.submit.removeAttr(n) : this.elements.submit.attr(n, !0), i.step && (this._trigger("afterSelect", t, e), this._trigger(e.isMovingForward ? "afterForward" : "afterBackward", t, e))
			},
			backward: function (i, t) {
				typeof i === g && (t = i, i = c), t === c && (t = 1), this._currentState.isFirstStep || typeof t !== g || this._move(-t, !0, !1, function (t, e) {
					this._update(i, this._state(t, e))
				})
			},
			branch: function (t) {
				return arguments.length ? this._find(t, this.elements.branches) : this._currentState.branch
			},
			branches: function (t) {
				return arguments.length ? this.branch(t).children(l.branch) : this.elements.branches
			},
			branchesActivated: function () {
				return this._find(this._currentState.branchesActivated, this.elements.branches)
			},
			destroy: function () {
				var t = this.elements;
				this._trigger("beforeDestroy", null, this.state()) && (this.element.removeClass(p), t.form.removeClass(a.form), t.header.removeClass(a.header), t.steps.show().removeClass(a.step), t.stepsWrapper.removeClass(a.wrapper), t.branches.removeClass(a.branch), u.Widget.prototype.destroy.call(this), this._trigger("afterDestroy"))
			},
			form: function () {
				return this.elements.form
			},
			forward: function (i, t, e) {
				typeof i === g && (e = t, t = i, i = c), t === c && (t = 1), this._currentState.isLastStep || typeof t !== g || this._move(t, !0, e, function (t, e) {
					this._update(i, this._state(t, e))
				})
			},
			isValidStep: function (t, e) {
				return this.isValidStepIndex(this.stepIndex(t, e))
			},
			isValidStepIndex: function (t) {
				return typeof t === g && 0 <= t && t <= this._lastStepIndex
			},
			stepCount: function () {
				return this._stepCount
			},
			select: function (i, t, e, s, n) {
				i instanceof u.Event || (n = s, s = e, e = t, t = i, i = c), t !== c && (u.isArray(t) ? (n = s, s = e, e = t[1], t = t[0]) : typeof e === m ? (n = s, s = e, e = c) : u.isArray(e) && (n = e, e = c), this._move(t, e, s, n, function (t, e) {
					this._update(i, this._state(t, e))
				}))
			},
			state: function (t, e, i) {
				return arguments.length ? (u.isArray(t) ? (i = e, e = t[1], t = t[0]) : u.isArray(e) && (i = e, e = c), this._state(this.stepIndex(t, e), i)) : this._currentState
			},
			step: function (t, e) {
				return arguments.length ? (u.isArray(t) && (e = t[1], t = t[0]), typeof t === g ? i = this._find(t, e !== c ? this.steps(e) : this.elements.steps) : (i = this._find(t, this.elements.steps.add(this.elements.branches))) && i.hasClass(a.branch) && (i = this._find(e || 0, this.steps(i))), i) : this._currentState.step;
				var i
			},
			stepIndex: function (t, e, i) {
				return arguments.length ? (u.isArray(t) ? (i = e, e = t[1], t = t[0]) : typeof e === m && (i = e, e = c), (s = this.step(t, e)) ? (i ? s.siblings(l.step).andSelf() : this.elements.steps).index(s) : -1) : this._currentState.stepIndex;
				var s
			},
			steps: function (t) {
				return arguments.length ? this.branch(t).children(l.step) : this.elements.steps
			},
			stepsActivated: function () {
				return this._find(this._currentState.stepsActivated, this.elements.steps)
			},
			submit: function () {
				this.elements.form.submit()
			}
		})
	}(jQuery),
	function (h) {
		h.extend(h.fn, {
			validate: function (t) {
				if (this.length) {
					var i = h.data(this[0], "validator");
					return i || (this.attr("novalidate", "novalidate"), i = new h.validator(t, this[0]), h.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function (t) {
						i.settings.submitHandler && (i.submitButton = t.target), h(t.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== h(t.target).attr("formnovalidate") && (i.cancelSubmit = !0)
					}), this.submit(function (e) {
						function t() {
							var t;
							return !i.settings.submitHandler || (i.submitButton && (t = h("<input type='hidden'/>").attr("name", i.submitButton.name).val(h(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && t.remove(), !1)
						}
						return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, t()) : i.form() ? i.pendingRequest ? !(i.formSubmitted = !0) : t() : (i.focusInvalid(), !1)
					})), i)
				}
				t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
			},
			valid: function () {
				if (h(this[0]).is("form")) return this.validate().form();
				var t = !0,
					e = h(this[0].form).validate();
				return this.each(function () {
					t = t && e.element(this)
				}), t
			},
			removeAttrs: function (t) {
				var i = {},
					s = this;
				return h.each(t.split(/\s/), function (t, e) {
					i[e] = s.attr(e), s.removeAttr(e)
				}), i
			},
			rules: function (t, e) {
				var i = this[0];
				if (t) {
					var s = h.data(i.form, "validator").settings,
						n = s.rules,
						o = h.validator.staticRules(i);
					switch (t) {
						case "add":
							h.extend(o, h.validator.normalizeRule(e)), delete o.messages, n[i.name] = o, e.messages && (s.messages[i.name] = h.extend(s.messages[i.name], e.messages));
							break;
						case "remove":
							if (!e) return delete n[i.name], o;
							var r = {};
							return h.each(e.split(/\s/), function (t, e) {
								r[e] = o[e], delete o[e]
							}), r
					}
				}
				var a = h.validator.normalizeRules(h.extend({}, h.validator.classRules(i), h.validator.attributeRules(i), h.validator.dataRules(i), h.validator.staticRules(i)), i);
				if (a.required) {
					var l = a.required;
					delete a.required, a = h.extend({
						required: l
					}, a)
				}
				return a
			}
		}), h.extend(h.expr[":"], {
			blank: function (t) {
				return !h.trim("" + h(t).val())
			},
			filled: function (t) {
				return !!h.trim("" + h(t).val())
			},
			unchecked: function (t) {
				return !h(t).prop("checked")
			}
		}), h.validator = function (t, e) {
			this.settings = h.extend(!0, {}, h.validator.defaults, t), this.currentForm = e, this.init()
		}, h.validator.format = function (i, t) {
			return 1 === arguments.length ? function () {
				var t = h.makeArray(arguments);
				return t.unshift(i), h.validator.format.apply(this, t)
			} : (2 < arguments.length && t.constructor !== Array && (t = h.makeArray(arguments).slice(1)), t.constructor !== Array && (t = [t]), h.each(t, function (t, e) {
				i = i.replace(new RegExp("\\{" + t + "\\}", "g"), function () {
					return e
				})
			}), i)
		}, h.extend(h.validator, {
			defaults: {
				messages: {},
				groups: {},
				rules: {},
				errorClass: "error",
				validClass: "valid",
				errorElement: "span",
				focusInvalid: !0,
				errorContainer: h([]),
				errorLabelContainer: h([]),
				onsubmit: !0,
				ignore: ":hidden",
				ignoreTitle: !1,
				onfocusin: function (t, e) {
					this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
				},
				onfocusout: function (t, e) {
					this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
				},
				onkeyup: function (t, e) {
					9 === e.which && "" === this.elementValue(t) || (t.name in this.submitted || t === this.lastElement) && this.element(t)
				},
				onclick: function (t, e) {
					t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
				},
				highlight: function (t, e, i) {
					"radio" === t.type ? this.findByName(t.name).addClass(e).removeClass(i) : h(t).addClass(e).removeClass(i)
				},
				unhighlight: function (t, e, i) {
					"radio" === t.type ? this.findByName(t.name).removeClass(e).addClass(i) : h(t).removeClass(e).addClass(i)
				}
			},
			setDefaults: function (t) {
				h.extend(h.validator.defaults, t)
			},
			messages: {
				required: "Required",
				remote: "Please fix this field.",
				email: "Wrong email.",
				url: "Please enter a valid URL.",
				date: "Please enter a valid date.",
				dateISO: "Please enter a valid date (ISO).",
				number: "Please enter a valid number.",
				digits: "Please enter only digits.",
				creditcard: "Please enter a valid credit card number.",
				equalTo: "Please enter the same value again.",
				maxlength: h.validator.format("Please enter no more than {0} characters."),
				minlength: h.validator.format("Please enter at least {0} characters."),
				rangelength: h.validator.format("Please enter a value between {0} and {1} characters long."),
				range: h.validator.format("Please enter a value between {0} and {1}."),
				max: h.validator.format("Please enter a value less than or equal to {0}."),
				min: h.validator.format("Please enter a value greater than or equal to {0}.")
			},
			autoCreateRanges: !1,
			prototype: {
				init: function () {
					this.labelContainer = h(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || h(this.currentForm), this.containers = h(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
					var s = this.groups = {};
					h.each(this.settings.groups, function (i, t) {
						"string" == typeof t && (t = t.split(/\s/)), h.each(t, function (t, e) {
							s[e] = i
						})
					});
					var i = this.settings.rules;

					function t(t) {
						var e = h.data(this[0].form, "validator"),
							i = "on" + t.type.replace(/^validate/, "");
						e && e.settings[i] && e.settings[i].call(e, this[0], t)
					}
					h.each(i, function (t, e) {
						i[t] = h.validator.normalizeRule(e)
					}), h(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", t).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", t), this.settings.invalidHandler && h(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
				},
				form: function () {
					return this.checkForm(), h.extend(this.submitted, this.errorMap), this.invalid = h.extend({}, this.errorMap), this.valid() || h(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
				},
				checkForm: function () {
					this.prepareForm();
					for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
					return this.valid()
				},
				element: function (t) {
					t = this.validationTargetFor(this.clean(t)), this.lastElement = t, this.prepareElement(t), this.currentElements = h(t);
					var e = !1 !== this.check(t);
					return e ? delete this.invalid[t.name] : this.invalid[t.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e
				},
				showErrors: function (e) {
					if (e) {
						for (var t in h.extend(this.errorMap, e), this.errorList = [], e) this.errorList.push({
							message: e[t],
							element: this.findByName(t)[0]
						});
						this.successList = h.grep(this.successList, function (t) {
							return !(t.name in e)
						})
					}
					this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
				},
				resetForm: function () {
					h.fn.resetForm && h(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
				},
				numberOfInvalids: function () {
					return this.objectLength(this.invalid)
				},
				objectLength: function (t) {
					var e = 0;
					for (var i in t) e++;
					return e
				},
				hideErrors: function () {
					this.addWrapper(this.toHide).hide()
				},
				valid: function () {
					return 0 === this.size()
				},
				size: function () {
					return this.errorList.length
				},
				focusInvalid: function () {
					if (this.settings.focusInvalid) try {
						h(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
					} catch (t) {}
				},
				findLastActive: function () {
					var e = this.lastActive;
					return e && 1 === h.grep(this.errorList, function (t) {
						return t.element.name === e.name
					}).length && e
				},
				elements: function () {
					var t = this,
						e = {};
					return h(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
						return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this), !(this.name in e || !t.objectLength(h(this).rules())) && (e[this.name] = !0)
					})
				},
				clean: function (t) {
					return h(t)[0]
				},
				errors: function () {
					var t = this.settings.errorClass.replace(" ", ".");
					return h(this.settings.errorElement + "." + t, this.errorContext)
				},
				reset: function () {
					this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = h([]), this.toHide = h([]), this.currentElements = h([])
				},
				prepareForm: function () {
					this.reset(), this.toHide = this.errors().add(this.containers)
				},
				prepareElement: function (t) {
					this.reset(), this.toHide = this.errorsFor(t)
				},
				elementValue: function (t) {
					var e = h(t).attr("type"),
						i = h(t).val();
					return "radio" === e || "checkbox" === e ? h("input[name='" + h(t).attr("name") + "']:checked").val() : "string" == typeof i ? i.replace(/\r/g, "") : i
				},
				check: function (e) {
					e = this.validationTargetFor(this.clean(e));
					var t, i = h(e).rules(),
						s = !1,
						n = this.elementValue(e);
					for (var o in i) {
						var r = {
							method: o,
							parameters: i[o]
						};
						try {
							if ("dependency-mismatch" === (t = h.validator.methods[o].call(this, n, e, r.parameters))) {
								s = !0;
								continue
							}
							if (s = !1, "pending" === t) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
							if (!t) return this.formatAndAdd(e, r), !1
						} catch (t) {
							throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + r.method + "' method.", t), t
						}
					}
					if (!s) return this.objectLength(i) && this.successList.push(e), !0
				},
				customDataMessage: function (t, e) {
					return h(t).data("msg-" + e.toLowerCase()) || t.attributes && h(t).attr("data-msg-" + e.toLowerCase())
				},
				customMessage: function (t, e) {
					var i = this.settings.messages[t];
					return i && (i.constructor === String ? i : i[e])
				},
				findDefined: function () {
					for (var t = 0; t < arguments.length; t++)
						if (void 0 !== arguments[t]) return arguments[t]
				},
				defaultMessage: function (t, e) {
					return this.findDefined(this.customMessage(t.name, e), this.customDataMessage(t, e), !this.settings.ignoreTitle && t.title || void 0, h.validator.messages[e], "<strong>Warning: No message defined for " + t.name + "</strong>")
				},
				formatAndAdd: function (t, e) {
					var i = this.defaultMessage(t, e.method),
						s = /\$?\{(\d+)\}/g;
					"function" == typeof i ? i = i.call(this, e.parameters, t) : s.test(i) && (i = h.validator.format(i.replace(s, "{$1}"), e.parameters)), this.errorList.push({
						message: i,
						element: t
					}), this.errorMap[t.name] = i, this.submitted[t.name] = i
				},
				addWrapper: function (t) {
					return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
				},
				defaultShowErrors: function () {
					var t, e;
					for (t = 0; this.errorList[t]; t++) {
						var i = this.errorList[t];
						this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message)
					}
					if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
						for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
					if (this.settings.unhighlight)
						for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
					this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
				},
				validElements: function () {
					return this.currentElements.not(this.invalidElements())
				},
				invalidElements: function () {
					return h(this.errorList).map(function () {
						return this.element
					})
				},
				showLabel: function (t, e) {
					var i = this.errorsFor(t);
					i.length ? (i.removeClass(this.settings.validClass).addClass(this.settings.errorClass), i.html(e)) : (i = h("<" + this.settings.errorElement + ">").attr("for", this.idOrName(t)).addClass(this.settings.errorClass).html(e || ""), this.settings.wrapper && (i = i.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(i).length || (this.settings.errorPlacement ? this.settings.errorPlacement(i, h(t)) : i.insertAfter(t))), !e && this.settings.success && (i.text(""), "string" == typeof this.settings.success ? i.addClass(this.settings.success) : this.settings.success(i, t)), this.toShow = this.toShow.add(i)
				},
				errorsFor: function (t) {
					var e = this.idOrName(t);
					return this.errors().filter(function () {
						return h(this).attr("for") === e
					})
				},
				idOrName: function (t) {
					return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
				},
				validationTargetFor: function (t) {
					return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
				},
				checkable: function (t) {
					return /radio|checkbox/i.test(t.type)
				},
				findByName: function (t) {
					return h(this.currentForm).find("[name='" + t + "']")
				},
				getLength: function (t, e) {
					switch (e.nodeName.toLowerCase()) {
						case "select":
							return h("option:selected", e).length;
						case "input":
							if (this.checkable(e)) return this.findByName(e.name).filter(":checked").length
					}
					return t.length
				},
				depend: function (t, e) {
					return !this.dependTypes[typeof t] || this.dependTypes[typeof t](t, e)
				},
				dependTypes: {
					boolean: function (t, e) {
						return t
					},
					string: function (t, e) {
						return !!h(t, e.form).length
					},
					function: function (t, e) {
						return t(e)
					}
				},
				optional: function (t) {
					var e = this.elementValue(t);
					return !h.validator.methods.required.call(this, e, t) && "dependency-mismatch"
				},
				startRequest: function (t) {
					this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
				},
				stopRequest: function (t, e) {
					this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], e && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (h(this.currentForm).submit(), this.formSubmitted = !1) : !e && 0 === this.pendingRequest && this.formSubmitted && (h(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
				},
				previousValue: function (t) {
					return h.data(t, "previousValue") || h.data(t, "previousValue", {
						old: null,
						valid: !0,
						message: this.defaultMessage(t, "remote")
					})
				}
			},
			classRuleSettings: {
				required: {
					required: !0
				},
				email: {
					email: !0
				},
				url: {
					url: !0
				},
				date: {
					date: !0
				},
				dateISO: {
					dateISO: !0
				},
				number: {
					number: !0
				},
				digits: {
					digits: !0
				},
				creditcard: {
					creditcard: !0
				}
			},
			addClassRules: function (t, e) {
				t.constructor === String ? this.classRuleSettings[t] = e : h.extend(this.classRuleSettings, t)
			},
			classRules: function (t) {
				var e = {},
					i = h(t).attr("class");
				return i && h.each(i.split(" "), function () {
					this in h.validator.classRuleSettings && h.extend(e, h.validator.classRuleSettings[this])
				}), e
			},
			attributeRules: function (t) {
				var e = {},
					i = h(t),
					s = i[0].getAttribute("type");
				for (var n in h.validator.methods) {
					var o;
					"required" === n ? ("" === (o = i.get(0).getAttribute(n)) && (o = !0), o = !!o) : o = i.attr(n), /min|max/.test(n) && (null === s || /number|range|text/.test(s)) && (o = Number(o)), o ? e[n] = o : s === n && "range" !== s && (e[n] = !0)
				}
				return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
			},
			dataRules: function (t) {
				var e, i, s = {},
					n = h(t);
				for (e in h.validator.methods) void 0 !== (i = n.data("rule-" + e.toLowerCase())) && (s[e] = i);
				return s
			},
			staticRules: function (t) {
				var e = {},
					i = h.data(t.form, "validator");
				return i.settings.rules && (e = h.validator.normalizeRule(i.settings.rules[t.name]) || {}), e
			},
			normalizeRules: function (s, n) {
				return h.each(s, function (t, e) {
					if (!1 !== e) {
						if (e.param || e.depends) {
							var i = !0;
							switch (typeof e.depends) {
								case "string":
									i = !!h(e.depends, n.form).length;
									break;
								case "function":
									i = e.depends.call(n, n)
							}
							i ? s[t] = void 0 === e.param || e.param : delete s[t]
						}
					} else delete s[t]
				}), h.each(s, function (t, e) {
					s[t] = h.isFunction(e) ? e(n) : e
				}), h.each(["minlength", "maxlength"], function () {
					s[this] && (s[this] = Number(s[this]))
				}), h.each(["rangelength", "range"], function () {
					var t;
					s[this] && (h.isArray(s[this]) ? s[this] = [Number(s[this][0]), Number(s[this][1])] : "string" == typeof s[this] && (t = s[this].split(/[\s,]+/), s[this] = [Number(t[0]), Number(t[1])]))
				}), h.validator.autoCreateRanges && (s.min && s.max && (s.range = [s.min, s.max], delete s.min, delete s.max), s.minlength && s.maxlength && (s.rangelength = [s.minlength, s.maxlength], delete s.minlength, delete s.maxlength)), s
			},
			normalizeRule: function (t) {
				if ("string" == typeof t) {
					var e = {};
					h.each(t.split(/\s/), function () {
						e[this] = !0
					}), t = e
				}
				return t
			},
			addMethod: function (t, e, i) {
				h.validator.methods[t] = e, h.validator.messages[t] = void 0 !== i ? i : h.validator.messages[t], e.length < 3 && h.validator.addClassRules(t, h.validator.normalizeRule(t))
			},
			methods: {
				required: function (t, e, i) {
					if (!this.depend(i, e)) return "dependency-mismatch";
					if ("select" === e.nodeName.toLowerCase()) {
						var s = h(e).val();
						return s && 0 < s.length
					}
					return this.checkable(e) ? 0 < this.getLength(t, e) : 0 < h.trim(t).length
				},
				email: function (t, e) {
					return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
				},
				url: function (t, e) {
					return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
				},
				date: function (t, e) {
					return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
				},
				dateISO: function (t, e) {
					return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
				},
				number: function (t, e) {
					return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
				},
				digits: function (t, e) {
					return this.optional(e) || /^\d+$/.test(t)
				},
				creditcard: function (t, e) {
					if (this.optional(e)) return "dependency-mismatch";
					if (/[^0-9 \-]+/.test(t)) return !1;
					for (var i = 0, s = 0, n = !1, o = (t = t.replace(/\D/g, "")).length - 1; 0 <= o; o--) {
						var r = t.charAt(o);
						s = parseInt(r, 10), n && 9 < (s *= 2) && (s -= 9), i += s, n = !n
					}
					return i % 10 == 0
				},
				minlength: function (t, e, i) {
					var s = h.isArray(t) ? t.length : this.getLength(h.trim(t), e);
					return this.optional(e) || i <= s
				},
				maxlength: function (t, e, i) {
					var s = h.isArray(t) ? t.length : this.getLength(h.trim(t), e);
					return this.optional(e) || s <= i
				},
				rangelength: function (t, e, i) {
					var s = h.isArray(t) ? t.length : this.getLength(h.trim(t), e);
					return this.optional(e) || s >= i[0] && s <= i[1]
				},
				min: function (t, e, i) {
					return this.optional(e) || i <= t
				},
				max: function (t, e, i) {
					return this.optional(e) || t <= i
				},
				range: function (t, e, i) {
					return this.optional(e) || t >= i[0] && t <= i[1]
				},
				equalTo: function (t, e, i) {
					var s = h(i);
					return this.settings.onfocusout && s.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
						h(e).valid()
					}), t === s.val()
				},
				remote: function (o, r, t) {
					if (this.optional(r)) return "dependency-mismatch";
					var a = this.previousValue(r);
					if (this.settings.messages[r.name] || (this.settings.messages[r.name] = {}), a.originalMessage = this.settings.messages[r.name].remote, this.settings.messages[r.name].remote = a.message, t = "string" == typeof t && {
							url: t
						} || t, a.old === o) return a.valid;
					a.old = o;
					var l = this;
					this.startRequest(r);
					var e = {};
					return e[r.name] = o, h.ajax(h.extend(!0, {
						url: t,
						mode: "abort",
						port: "validate" + r.name,
						dataType: "json",
						data: e,
						success: function (t) {
							l.settings.messages[r.name].remote = a.originalMessage;
							var e = !0 === t || "true" === t;
							if (e) {
								var i = l.formSubmitted;
								l.prepareElement(r), l.formSubmitted = i, l.successList.push(r), delete l.invalid[r.name], l.showErrors()
							} else {
								var s = {},
									n = t || l.defaultMessage(r, "remote");
								s[r.name] = a.message = h.isFunction(n) ? n(o) : n, l.invalid[r.name] = !0, l.showErrors(s)
							}
							a.valid = e, l.stopRequest(r, e)
						}
					}, t)), "pending"
				}
			}
		}), h.format = h.validator.format
	}(jQuery),
	function (s) {
		var n = {};
		if (s.ajaxPrefilter) s.ajaxPrefilter(function (t, e, i) {
			var s = t.port;
			"abort" === t.mode && (n[s] && n[s].abort(), n[s] = i)
		});
		else {
			var o = s.ajax;
			s.ajax = function (t) {
				var e = ("mode" in t ? t : s.ajaxSettings).mode,
					i = ("port" in t ? t : s.ajaxSettings).port;
				return "abort" === e ? (n[i] && n[i].abort(), n[i] = o.apply(this, arguments), n[i]) : o.apply(this, arguments)
			}
		}
	}(jQuery),
	function (n) {
		n.extend(n.fn, {
			validateDelegate: function (i, t, s) {
				return this.bind(t, function (t) {
					var e = n(t.target);
					if (e.is(i)) return s.apply(e, arguments)
				})
			}
		})
	}(jQuery),
	function (y) {
		var w = "iCheck",
			C = w + "-helper",
			x = "checkbox",
			D = "radio",
			k = "checked",
			p = "un" + k,
			I = "disabled",
			f = "determinate",
			S = "in" + f,
			E = "update",
			T = "type",
			A = "click",
			M = "touchbegin.i touchend.i",
			F = "addClass",
			P = "removeClass",
			O = "trigger",
			N = "label",
			g = "cursor",
			z = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);

		function $(t, e, i) {
			var s = t[0],
				n = /er/.test(i) ? S : /bl/.test(i) ? I : k,
				o = i == E ? {
					checked: s[k],
					disabled: s[I],
					indeterminate: "true" == t.attr(S) || "false" == t.attr(f)
				} : s[n];
			if (/^(ch|di|in)/.test(i) && !o) H(t, n);
			else if (/^(un|en|de)/.test(i) && o) W(t, n);
			else if (i == E)
				for (var r in o) o[r] ? H(t, r, !0) : W(t, r, !0);
			else e && "toggle" != i || (e || t[O]("ifClicked"), o ? s[T] !== D && W(t, n) : H(t, n))
		}

		function H(t, e, i) {
			var s = t[0],
				n = t.parent(),
				o = e == k,
				r = e == S,
				a = e == I,
				l = r ? f : o ? p : "enabled",
				h = m(t, l + v(s[T])),
				c = m(t, e + v(s[T]));
			if (!0 !== s[e]) {
				if (!i && e == k && s[T] == D && s.name) {
					var u = t.closest("form"),
						d = 'input[name="' + s.name + '"]';
					(d = u.length ? u.find(d) : y(d)).each(function () {
						this !== s && y(this).data(w) && W(y(this), e)
					})
				}
				r ? (s[e] = !0, s[k] && W(t, k, "force")) : (i || (s[e] = !0), o && s[S] && W(t, S, !1)), _(t, o, e, i)
			}
			s[I] && m(t, g, !0) && n.find("." + C).css(g, "default"), n[F](c || m(t, e) || ""), n.attr("role") && !r && n.attr("aria-" + (a ? I : k), "true"), n[P](h || m(t, l) || "")
		}

		function W(t, e, i) {
			var s = t[0],
				n = t.parent(),
				o = e == k,
				r = e == S,
				a = e == I,
				l = r ? f : o ? p : "enabled",
				h = m(t, l + v(s[T])),
				c = m(t, e + v(s[T]));
			!1 !== s[e] && (!r && i && "force" != i || (s[e] = !1), _(t, o, l, i)), !s[I] && m(t, g, !0) && n.find("." + C).css(g, "pointer"), n[P](c || m(t, e) || ""), n.attr("role") && !r && n.attr("aria-" + (a ? I : k), "false"), n[F](h || m(t, l) || "")
		}

		function L(t, e) {
			t.data(w) && (t.parent().html(t.attr("style", t.data(w).s || "")), e && t[O](e), t.off(".i").unwrap(), y(N + '[for="' + t[0].id + '"]').add(t.closest(N)).off(".i"))
		}

		function m(t, e, i) {
			if (t.data(w)) return t.data(w).o[e + (i ? "" : "Class")]
		}

		function v(t) {
			return t.charAt(0).toUpperCase() + t.slice(1)
		}

		function _(t, e, i, s) {
			s || (e && t[O]("ifToggled"), t[O]("ifChanged")[O]("if" + v(i)))
		}
		y.fn[w] = function (e, i) {
			var s = 'input[type="' + x + '"], input[type="' + D + '"]',
				n = y(),
				t = function (t) {
					t.each(function () {
						var t = y(this);
						n = t.is(s) ? n.add(t) : n.add(t.find(s))
					})
				};
			if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(e)) return e = e.toLowerCase(), t(this), n.each(function () {
				var t = y(this);
				"destroy" == e ? L(t, "ifDestroyed") : $(t, !0, e), y.isFunction(i) && i()
			});
			if ("object" != typeof e && e) return this;
			var p = y.extend({
					checkedClass: k,
					disabledClass: I,
					indeterminateClass: S,
					labelHover: !0
				}, e),
				o = p.handle,
				f = p.hoverClass || "hover",
				g = p.focusClass || "focus",
				m = p.activeClass || "active",
				v = !!p.labelHover,
				_ = p.labelHoverClass || "hover",
				b = 0 | ("" + p.increaseArea).replace("%", "");
			return o != x && o != D || (s = 'input[type="' + o + '"]'), b < -50 && (b = -50), t(this), n.each(function () {
				var s = y(this);
				L(s);
				var t, n = this,
					e = n.id,
					i = -b + "%",
					o = 100 + 2 * b + "%",
					r = {
						position: "absolute",
						top: i,
						left: i,
						display: "block",
						width: o,
						height: o,
						margin: 0,
						padding: 0,
						background: "#fff",
						border: 0,
						opacity: 0
					},
					a = z ? {
						position: "absolute",
						visibility: "hidden"
					} : b ? r : {
						position: "absolute",
						opacity: 0
					},
					l = n[T] == x ? p.checkboxClass || "i" + x : p.radioClass || "i" + D,
					h = y(N + '[for="' + e + '"]').add(s.closest(N)),
					c = !!p.aria,
					u = w + "-" + Math.random().toString(36).substr(2, 6),
					d = '<div class="' + l + '" ' + (c ? 'role="' + n[T] + '" ' : "");
				c && h.each(function () {
					d += 'aria-labelledby="', this.id ? d += this.id : (this.id = u, d += u), d += '"'
				}), d = s.wrap(d + "/>")[O]("ifCreated").parent().append(p.insert), t = y('<ins class="' + C + '"/>').css(r).appendTo(d), s.data(w, {
					o: p,
					s: s.attr("style")
				}).css(a), p.inheritClass && d[F](n.className || ""), p.inheritID && e && d.attr("id", w + "-" + e), "static" == d.css("position") && d.css("position", "relative"), $(s, !0, E), h.length && h.on(A + ".i mouseover.i mouseout.i " + M, function (t) {
					var e = t[T],
						i = y(this);
					if (!n[I]) {
						if (e == A) {
							if (y(t.target).is("a")) return;
							$(s, !1, !0)
						} else v && (/ut|nd/.test(e) ? (d[P](f), i[P](_)) : (d[F](f), i[F](_)));
						if (!z) return !1;
						t.stopPropagation()
					}
				}), s.on(A + ".i focus.i blur.i keyup.i keydown.i keypress.i", function (t) {
					var e = t[T],
						i = t.keyCode;
					return e != A && ("keydown" == e && 32 == i ? (n[T] == D && n[k] || (n[k] ? W(s, k) : H(s, k)), !1) : void("keyup" == e && n[T] == D ? !n[k] && H(s, k) : /us|ur/.test(e) && d["blur" == e ? P : F](g)))
				}), t.on(A + " mousedown mouseup mouseover mouseout " + M, function (t) {
					var e = t[T],
						i = /wn|up/.test(e) ? m : f;
					if (!n[I]) {
						if (e == A ? $(s, !1, !0) : (/wn|er|in/.test(e) ? d[F](i) : d[P](i + " " + m), h.length && v && i == f && h[/ut|nd/.test(e) ? P : F](_)), !z) return !1;
						t.stopPropagation()
					}
				})
			})
		}
	}(window.jQuery || window.Zepto),
	function (r, a, l, h) {
		function c(t, e) {
			var i = this;
			"object" == typeof e && (delete e.refresh, delete e.render, r.extend(this, e)), this.$element = r(t), !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src"));
			var s = (this.position + "").toLowerCase().match(/\S+/g) || [];
			if (s.length < 1 && s.push("center"), 1 == s.length && s.push(s[0]), "top" != s[0] && "bottom" != s[0] && "left" != s[1] && "right" != s[1] || (s = [s[1], s[0]]), this.positionX !== h && (s[0] = this.positionX.toLowerCase()), this.positionY !== h && (s[1] = this.positionY.toLowerCase()), i.positionX = s[0], i.positionY = s[1], "left" != this.positionX && "right" != this.positionX && (isNaN(parseInt(this.positionX)) ? this.positionX = "center" : this.positionX = parseInt(this.positionX)), "top" != this.positionY && "bottom" != this.positionY && (isNaN(parseInt(this.positionY)) ? this.positionY = "center" : this.positionY = parseInt(this.positionY)), this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"), navigator.userAgent.match(/(iPod|iPhone|iPad)/)) return this.imageSrc && this.iosFix && !this.$element.is("img") && this.$element.css({
				backgroundImage: "url(" + this.imageSrc + ")",
				backgroundSize: "cover",
				backgroundPosition: this.position
			}), this;
			if (navigator.userAgent.match(/(Android)/)) return this.imageSrc && this.androidFix && !this.$element.is("img") && this.$element.css({
				backgroundImage: "url(" + this.imageSrc + ")",
				backgroundSize: "cover",
				backgroundPosition: this.position
			}), this;
			this.$mirror = r("<div />").prependTo(this.mirrorContainer);
			var n = this.$element.find(">.parallax-slider"),
				o = !1;
			0 == n.length ? this.$slider = r("<img />").prependTo(this.$mirror) : (this.$slider = n.prependTo(this.$mirror), o = !0), this.$mirror.addClass("parallax-mirror").css({
				visibility: "hidden",
				zIndex: this.zIndex,
				position: "fixed",
				top: 0,
				left: 0,
				overflow: "hidden"
			}), this.$slider.addClass("parallax-slider").one("load", function () {
				i.naturalHeight && i.naturalWidth || (i.naturalHeight = this.naturalHeight || this.height || 1, i.naturalWidth = this.naturalWidth || this.width || 1), i.aspectRatio = i.naturalWidth / i.naturalHeight, c.isSetup || c.setup(), c.sliders.push(i), c.isFresh = !1, c.requestRender()
			}), o || (this.$slider[0].src = this.imageSrc), (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || 0 < n.length) && this.$slider.trigger("load")
		}! function () {
			for (var n = 0, t = ["ms", "moz", "webkit", "o"], e = 0; e < t.length && !a.requestAnimationFrame; ++e) a.requestAnimationFrame = a[t[e] + "RequestAnimationFrame"], a.cancelAnimationFrame = a[t[e] + "CancelAnimationFrame"] || a[t[e] + "CancelRequestAnimationFrame"];
			a.requestAnimationFrame || (a.requestAnimationFrame = function (t) {
				var e = (new Date).getTime(),
					i = Math.max(0, 16 - (e - n)),
					s = a.setTimeout(function () {
						t(e + i)
					}, i);
				return n = e + i, s
			}), a.cancelAnimationFrame || (a.cancelAnimationFrame = function (t) {
				clearTimeout(t)
			})
		}(), r.extend(c.prototype, {
			speed: .2,
			bleed: 0,
			zIndex: -100,
			iosFix: !0,
			androidFix: !0,
			position: "center",
			overScrollFix: !1,
			mirrorContainer: "body",
			refresh: function () {
				this.boxWidth = this.$element.outerWidth(), this.boxHeight = this.$element.outerHeight() + 2 * this.bleed, this.boxOffsetTop = this.$element.offset().top - this.bleed, this.boxOffsetLeft = this.$element.offset().left, this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
				var t, e = c.winHeight,
					i = c.docHeight,
					s = Math.min(this.boxOffsetTop, i - e),
					n = Math.max(this.boxOffsetTop + this.boxHeight - e, 0),
					o = this.boxHeight + (s - n) * (1 - this.speed) | 0,
					r = (this.boxOffsetTop - s) * (1 - this.speed) | 0;
				o * this.aspectRatio >= this.boxWidth ? (this.imageWidth = o * this.aspectRatio | 0, this.imageHeight = o, this.offsetBaseTop = r, t = this.imageWidth - this.boxWidth, "left" == this.positionX ? this.offsetLeft = 0 : "right" == this.positionX ? this.offsetLeft = -t : isNaN(this.positionX) ? this.offsetLeft = -t / 2 | 0 : this.offsetLeft = Math.max(this.positionX, -t)) : (this.imageWidth = this.boxWidth, this.imageHeight = this.boxWidth / this.aspectRatio | 0, this.offsetLeft = 0, t = this.imageHeight - o, "top" == this.positionY ? this.offsetBaseTop = r : "bottom" == this.positionY ? this.offsetBaseTop = r - t : isNaN(this.positionY) ? this.offsetBaseTop = r - t / 2 | 0 : this.offsetBaseTop = r + Math.max(this.positionY, -t))
			},
			render: function () {
				var t = c.scrollTop,
					e = c.scrollLeft,
					i = this.overScrollFix ? c.overScroll : 0,
					s = t + c.winHeight;
				this.boxOffsetBottom > t && this.boxOffsetTop <= s ? (this.visibility = "visible", this.mirrorTop = this.boxOffsetTop - t, this.mirrorLeft = this.boxOffsetLeft - e, this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed)) : this.visibility = "hidden", this.$mirror.css({
					transform: "translate3d(" + this.mirrorLeft + "px, " + (this.mirrorTop - i) + "px, 0px)",
					visibility: this.visibility,
					height: this.boxHeight,
					width: this.boxWidth
				}), this.$slider.css({
					transform: "translate3d(" + this.offsetLeft + "px, " + this.offsetTop + "px, 0px)",
					position: "absolute",
					height: this.imageHeight,
					width: this.imageWidth,
					maxWidth: "none"
				})
			}
		}), r.extend(c, {
			scrollTop: 0,
			scrollLeft: 0,
			winHeight: 0,
			winWidth: 0,
			docHeight: 1 << 30,
			docWidth: 1 << 30,
			sliders: [],
			isReady: !1,
			isFresh: !1,
			isBusy: !1,
			setup: function () {
				if (!this.isReady) {
					var e = this,
						t = r(l),
						s = r(a),
						i = function () {
							c.winHeight = s.height(), c.winWidth = s.width(), c.docHeight = t.height(), c.docWidth = t.width()
						},
						n = function () {
							var t = s.scrollTop(),
								e = c.docHeight - c.winHeight,
								i = c.docWidth - c.winWidth;
							c.scrollTop = Math.max(0, Math.min(e, t)), c.scrollLeft = Math.max(0, Math.min(i, s.scrollLeft())), c.overScroll = Math.max(t - e, Math.min(t, 0))
						};
					s.on("resize.px.parallax load.px.parallax", function () {
						i(), e.refresh(), c.isFresh = !1, c.requestRender()
					}).on("scroll.px.parallax load.px.parallax", function () {
						n(), c.requestRender()
					}), i(), n(), this.isReady = !0;
					var o = -1;
					! function t() {
						if (o == a.pageYOffset) return a.requestAnimationFrame(t), !1;
						o = a.pageYOffset, e.render(), a.requestAnimationFrame(t)
					}()
				}
			},
			configure: function (t) {
				"object" == typeof t && (delete t.refresh, delete t.render, r.extend(this.prototype, t))
			},
			refresh: function () {
				r.each(this.sliders, function () {
					this.refresh()
				}), this.isFresh = !0
			},
			render: function () {
				this.isFresh || this.refresh(), r.each(this.sliders, function () {
					this.render()
				})
			},
			requestRender: function () {
				this.render(), this.isBusy = !1
			},
			destroy: function (t) {
				var e, i = r(t).data("px.parallax");
				for (i.$mirror.remove(), e = 0; e < this.sliders.length; e += 1) this.sliders[e] == i && this.sliders.splice(e, 1);
				r(t).data("px.parallax", !1), 0 === this.sliders.length && (r(a).off("scroll.px.parallax resize.px.parallax load.px.parallax"), this.isReady = !1, c.isSetup = !1)
			}
		});
		var t = r.fn.parallax;
		r.fn.parallax = function (i) {
			return this.each(function () {
				var t = r(this),
					e = "object" == typeof i && i;
				this == a || this == l || t.is("body") ? c.configure(e) : t.data("px.parallax") ? "object" == typeof i && r.extend(t.data("px.parallax"), e) : (e = r.extend({}, t.data(), e), t.data("px.parallax", new c(this, e))), "string" == typeof i && ("destroy" == i ? c.destroy(this) : c[i]())
			})
		}, r.fn.parallax.Constructor = c, r.fn.parallax.noConflict = function () {
			return r.fn.parallax = t, this
		}, r(function () {
			r('[data-parallax="scroll"]').parallax()
		})
	}(jQuery, window, document),
	function (o) {
		var r = function (t, e) {
			if (this.element = o(t), this.format = g.parseFormat(e.format || this.element.data("date-format") || "mm.dd.yyyy"), this.picker = o(g.template).appendTo("body").on({
					click: o.proxy(this.click, this)
				}), this.isInput = this.element.is("input"), this.component = !!this.element.is(".date") && this.element.find(".add-on"), this.isInput ? this.element.on({
					focus: o.proxy(this.show, this),
					keyup: o.proxy(this.update, this)
				}) : this.component ? this.component.on("click", o.proxy(this.show, this)) : this.element.on("click", o.proxy(this.show, this)), this.minViewMode = e.minViewMode || this.element.data("date-minviewmode") || 0, "string" == typeof this.minViewMode) switch (this.minViewMode) {
				case "months":
					this.minViewMode = 1;
					break;
				case "years":
					this.minViewMode = 2;
					break;
				default:
					this.minViewMode = 0
			}
			if (this.viewMode = e.viewMode || this.element.data("date-viewmode") || 0, "string" == typeof this.viewMode) switch (this.viewMode) {
				case "months":
					this.viewMode = 1;
					break;
				case "years":
					this.viewMode = 2;
					break;
				default:
					this.viewMode = 0
			}
			this.startViewMode = this.viewMode, this.weekStart = e.weekStart || this.element.data("date-weekstart") || 0, this.weekEnd = 0 === this.weekStart ? 6 : this.weekStart - 1, this.onRender = e.onRender, this.fillDow(), this.fillMonths(), this.update(), this.showMode()
		};
		r.prototype = {
			constructor: r,
			show: function (t) {
				this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.place(), o(window).on("resize", o.proxy(this.place, this)), t && (t.stopPropagation(), t.preventDefault()), this.isInput;
				var e = this;
				o(document).on("mousedown", function (t) {
					0 == o(t.target).closest(".datepicker").length && e.hide()
				}), this.element.trigger({
					type: "show",
					date: this.date
				})
			},
			hide: function () {
				this.picker.hide(), o(window).off("resize", this.place), this.viewMode = this.startViewMode, this.showMode(), this.isInput || o(document).off("mousedown", this.hide), this.element.trigger({
					type: "hide",
					date: this.date
				})
			},
			set: function () {
				var t = g.formatDate(this.date, this.format);
				this.isInput ? this.element.prop("value", t) : (this.component && this.element.find("input").prop("value", t), this.element.data("date", t))
			},
			setValue: function (t) {
				this.date = "string" == typeof t ? g.parseDate(t, this.format) : new Date(t), this.set(), this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0), this.fill()
			},
			place: function () {
				var t = this.component ? this.component.offset() : this.element.offset();
				this.picker.css({
					top: t.top + this.height,
					left: t.left
				})
			},
			update: function (t) {
				this.date = g.parseDate("string" == typeof t ? t : this.isInput ? this.element.prop("value") : this.element.data("date"), this.format), this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0), this.fill()
			},
			fillDow: function () {
				for (var t = this.weekStart, e = "<tr>"; t < this.weekStart + 7;) e += '<th class="dow">' + g.dates.daysMin[t++ % 7] + "</th>";
				e += "</tr>", this.picker.find(".datepicker-days thead").append(e)
			},
			fillMonths: function () {
				for (var t = "", e = 0; e < 12;) t += '<span class="month">' + g.dates.monthsShort[e++] + "</span>";
				this.picker.find(".datepicker-months td").append(t)
			},
			fill: function () {
				var t = new Date(this.viewDate),
					e = t.getFullYear(),
					i = t.getMonth(),
					s = this.date.valueOf();
				this.picker.find(".datepicker-days th:eq(1)").text(g.dates.months[i] + " " + e);
				var n = new Date(e, i - 1, 28, 0, 0, 0, 0),
					o = g.getDaysInMonth(n.getFullYear(), n.getMonth());
				n.setDate(o), n.setDate(o - (n.getDay() - this.weekStart + 7) % 7);
				var r = new Date(n);
				r.setDate(r.getDate() + 42), r = r.valueOf();
				for (var a, l, h, c = []; n.valueOf() < r;) n.getDay() === this.weekStart && c.push("<tr>"), a = this.onRender(n), l = n.getFullYear(), (h = n.getMonth()) < i && l === e || l < e ? a += " old" : (i < h && l === e || e < l) && (a += " new"), n.valueOf() === s && (a += " active"), c.push('<td class="day ' + a + '">' + n.getDate() + "</td>"), n.getDay() === this.weekEnd && c.push("</tr>"), n.setDate(n.getDate() + 1);
				this.picker.find(".datepicker-days tbody").empty().append(c.join(""));
				var u = this.date.getFullYear(),
					d = this.picker.find(".datepicker-months").find("th:eq(1)").text(e).end().find("span").removeClass("active");
				u === e && d.eq(this.date.getMonth()).addClass("active"), c = "", e = 10 * parseInt(e / 10, 10);
				var p = this.picker.find(".datepicker-years").find("th:eq(1)").text(e + "-" + (e + 9)).end().find("td");
				e -= 1;
				for (var f = -1; f < 11; f++) c += '<span class="year' + (-1 === f || 10 === f ? " old" : "") + (u === e ? " active" : "") + '">' + e + "</span>", e += 1;
				p.html(c)
			},
			click: function (t) {
				t.stopPropagation(), t.preventDefault();
				var e = o(t.target).closest("span, td, th");
				if (1 === e.length) switch (e[0].nodeName.toLowerCase()) {
					case "th":
						switch (e[0].className) {
							case "prev":
							case "next":
								this.viewDate["set" + g.modes[this.viewMode].navFnc].call(this.viewDate, this.viewDate["get" + g.modes[this.viewMode].navFnc].call(this.viewDate) + g.modes[this.viewMode].navStep * ("prev" === e[0].className ? -1 : 1)), this.fill(), this.set()
						}
						break;
					case "span":
						if (e.is(".month")) {
							var i = e.parent().find("span").index(e);
							this.viewDate.setMonth(i)
						} else {
							var s = parseInt(e.text(), 10) || 0;
							this.viewDate.setFullYear(s)
						}
						0 !== this.viewMode && (this.date = new Date(this.viewDate), this.element.trigger({
							type: "changeDate",
							date: this.date,
							viewMode: g.modes[this.viewMode].clsName
						})), this.showMode(-1), this.fill(), this.set();
						break;
					case "td":
						if (e.is(".day") && !e.is(".disabled")) {
							var n = parseInt(e.text(), 10) || 1;
							i = this.viewDate.getMonth();
							e.is(".old") ? i -= 1 : e.is(".new") && (i += 1);
							s = this.viewDate.getFullYear();
							this.date = new Date(s, i, n, 0, 0, 0, 0), this.viewDate = new Date(s, i, Math.min(28, n), 0, 0, 0, 0), this.fill(), this.set(), this.element.trigger({
								type: "changeDate",
								date: this.date,
								viewMode: g.modes[this.viewMode].clsName
							})
						}
				}
			},
			mousedown: function (t) {
				t.stopPropagation(), t.preventDefault()
			},
			showMode: function (t) {
				t && (this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + t))), this.picker.find(">div").hide().filter(".datepicker-" + g.modes[this.viewMode].clsName).show()
			}
		}, o.fn.datepicker = function (s, n) {
			return this.each(function () {
				var t = o(this),
					e = t.data("datepicker"),
					i = "object" == typeof s && s;
				e || t.data("datepicker", e = new r(this, o.extend({}, o.fn.datepicker.defaults, i))), "string" == typeof s && e[s](n)
			})
		}, o.fn.datepicker.defaults = {
			onRender: function (t) {
				return ""
			}
		}, o.fn.datepicker.Constructor = r;
		var g = {
			modes: [{
				clsName: "days",
				navFnc: "Month",
				navStep: 1
			}, {
				clsName: "months",
				navFnc: "FullYear",
				navStep: 1
			}, {
				clsName: "years",
				navFnc: "FullYear",
				navStep: 10
			}],
			dates: {
				days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
				months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
			},
			isLeapYear: function (t) {
				return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
			},
			getDaysInMonth: function (t, e) {
				return [31, g.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
			},
			parseFormat: function (t) {
				var e = t.match(/[.\/\-\s].*?/),
					i = t.split(/\W+/);
				if (!e || !i || 0 === i.length) throw new Error("Invalid date format.");
				return {
					separator: e,
					parts: i
				}
			},
			parseDate: function (t, e) {
				var i, s = t.split(e.separator);
				if ((t = new Date).setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), s.length === e.parts.length) {
					for (var n = t.getFullYear(), o = t.getDate(), r = t.getMonth(), a = 0, l = e.parts.length; a < l; a++) switch (i = parseInt(s[a], 10) || 1, e.parts[a]) {
						case "dd":
						case "d":
							o = i, t.setDate(i);
							break;
						case "mm":
						case "m":
							r = i - 1, t.setMonth(i - 1);
							break;
						case "yy":
							n = 2e3 + i, t.setFullYear(2e3 + i);
							break;
						case "yyyy":
							n = i, t.setFullYear(i)
					}
					t = new Date(n, r, o, 0, 0, 0)
				}
				return t
			},
			formatDate: function (t, e) {
				var i = {
					d: t.getDate(),
					m: t.getMonth() + 1,
					yy: t.getFullYear().toString().substring(2),
					yyyy: t.getFullYear()
				};
				i.dd = (i.d < 10 ? "0" : "") + i.d, i.mm = (i.m < 10 ? "0" : "") + i.m;
				t = [];
				for (var s = 0, n = e.parts.length; s < n; s++) t.push(i[e.parts[s]]);
				return t.join(e.separator)
			},
			headTemplate: '<thead><tr><th class="prev"></th><th colspan="5" class="switch"></th><th class="next"></th></tr></thead>',
			contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
		};
		g.template = '<div class="datepicker dropdown-menu"><div class="datepicker-days"><table class=" table-condensed">' + g.headTemplate + '<tbody></tbody></table></div><div class="datepicker-months"><table class="table-condensed">' + g.headTemplate + g.contTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + g.headTemplate + g.contTemplate + "</table></div></div>"
	}(window.jQuery), jQuery(document).ready(function () {
		$(".qtyplus").click(function (t) {
			t.preventDefault(), fieldName = $(this).attr("name");
			var e = parseInt($("input[name=" + fieldName + "]").val());
			isNaN(e) ? $("input[name=" + fieldName + "]").val(1) : $("input[name=" + fieldName + "]").val(e + 1)
		}), $(".qtyminus").click(function (t) {
			t.preventDefault(), fieldName = $(this).attr("name");
			var e = parseInt($("input[name=" + fieldName + "]").val());
			!isNaN(e) && 0 < e ? $("input[name=" + fieldName + "]").val(e - 1) : $("input[name=" + fieldName + "]").val(0)
		})
	});
