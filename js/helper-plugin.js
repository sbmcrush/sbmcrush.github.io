// Sticky Plugin v1.0.0 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 2/12/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//       It will only set the 'top' and 'position' of your element, you
//       might need to adjust the width in some cases.

(function($) {
    var defaults = {
        topSpacing: 0,
        bottomSpacing: 0,
        className: 'is-sticky',
        wrapperClassName: 'sticky-wrapper',
        center: false,
        getWidthFrom: ''
    }, 
    $window = $(window), 
    $document = $(document), 
    sticked = [], 
    windowHeight = $window.height(), 
    scroller = function() {
        var scrollTop = $window.scrollTop(), 
        documentHeight = $document.height(), 
        dwh = documentHeight - windowHeight, 
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;
        
        for (var i = 0; i < sticked.length; i++) {
            var s = sticked[i], 
            elementTop = s.stickyWrapper.offset().top, 
            etse = elementTop - s.topSpacing - extra;
            
            if (scrollTop <= etse) {
                if (s.currentTop !== null) {
                    s.stickyElement
                    .css('position', '')
                    .css('top', '');
                    s.stickyElement.parent().removeClass(s.className);
                    s.currentTop = null;
                }
            } 
            else {
                var newTop = documentHeight - s.stickyElement.outerHeight() 
                - s.topSpacing - s.bottomSpacing - scrollTop - extra;
                if (newTop < 0) {
                    newTop = newTop + s.topSpacing;
                } else {
                    newTop = s.topSpacing;
                }
                if (s.currentTop != newTop) {
                    s.stickyElement
                    .css('position', 'fixed')
                    .css('top', newTop);
                    
                    if (typeof s.getWidthFrom !== 'undefined') {
                        s.stickyElement.css('width', $(s.getWidthFrom).width());
                    }
                    
                    s.stickyElement.parent().addClass(s.className);
                    s.currentTop = newTop;
                }
            }
        }
    }, 
    resizer = function() {
        windowHeight = $window.height();
    }, 
    methods = {
        init: function(options) {
            var o = $.extend(defaults, options);
            return this.each(function() {
                var stickyElement = $(this);
                
                var stickyId = stickyElement.attr('id');
                var wrapper = $('<div></div>')
                .attr('id', stickyId + '-sticky-wrapper')
                .addClass(o.wrapperClassName);
                stickyElement.wrapAll(wrapper);
                
                if (o.center) {
                    stickyElement.parent().css({width: stickyElement.outerWidth(),marginLeft: "auto",marginRight: "auto"});
                }
                
                if (stickyElement.css("float") == "right") {
                    stickyElement.css({"float": "none"}).parent().css({"float": "right"});
                }
                
                var stickyWrapper = stickyElement.parent();
                stickyWrapper.css('height', stickyElement.outerHeight());
                sticked.push({
                    topSpacing: o.topSpacing,
                    bottomSpacing: o.bottomSpacing,
                    stickyElement: stickyElement,
                    currentTop: null,
                    stickyWrapper: stickyWrapper,
                    className: o.className,
                    getWidthFrom: o.getWidthFrom
                });
            });
        },
        update: scroller
    };

    // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
    if (window.addEventListener) {
        window.addEventListener('scroll', scroller, false);
        window.addEventListener('resize', resizer, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scroller);
        window.attachEvent('onresize', resizer);
    }
    
    $.fn.sticky = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }
    };
    $(function() {
        setTimeout(scroller, 0);
    });
})(jQuery);

/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time license fee
 * http://metafizzy.co/#licenses
 *
 * Copyright 2012 David DeSandro / Metafizzy
 */
(function(a, b, c) {
    "use strict";
    var d = a.document, e = a.Modernizr, f = function(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    }, g = "Moz Webkit O Ms".split(" "), h = function(a) {
        var b = d.documentElement.style, c;
        if (typeof b[a] == "string")
            return a;
        a = f(a);
        for (var e = 0, h = g.length; e < h; e++) {
            c = g[e] + a;
            if (typeof b[c] == "string")
                return c
        }
    }, i = h("transform"), j = h("transitionProperty"), k = {csstransforms: function() {
            return !!i
        },csstransforms3d: function() {
            var a = !!h("perspective");
            if (a) {
                var c = " -o- -moz- -ms- -webkit- -khtml- ".split(" "), d = "@media (" + c.join("transform-3d),(") + "modernizr)", e = b("<style>" + d + "{#modernizr{height:3px}}" + "</style>").appendTo("head"), f = b('<div id="modernizr" />').appendTo("html");
                a = f.height() === 3, f.remove(), e.remove()
            }
            return a
        },csstransitions: function() {
            return !!j
        }}, l;
    if (e)
        for (l in k)
            e.hasOwnProperty(l) || e.addTest(l, k[l]);
    else {
        e = a.Modernizr = {_version: "1.6ish: miniModernizr for Isotope"};
        var m = " ", n;
        for (l in k)
            n = k[l](), e[l] = n, m += " " + (n ? "" : "no-") + l;
        b("html").addClass(m)
    }
    if (e.csstransforms) {
        var o = e.csstransforms3d ? {translate: function(a) {
                return "translate3d(" + a[0] + "px, " + a[1] + "px, 0) "
            },scale: function(a) {
                return "scale3d(" + a + ", " + a + ", 1) "
            }} : {translate: function(a) {
                return "translate(" + a[0] + "px, " + a[1] + "px) "
            },scale: function(a) {
                return "scale(" + a + ") "
            }}, p = function(a, c, d) {
            var e = b.data(a, "isoTransform") || {}, f = {}, g, h = {}, j;
            f[c] = d, b.extend(e, f);
            for (g in e)
                j = e[g], h[g] = o[g](j);
            var k = h.translate || "", l = h.scale || "", m = k + l;
            b.data(a, "isoTransform", e), a.style[i] = m
        };
        b.cssNumber.scale = !0, b.cssHooks.scale = {set: function(a, b) {
                p(a, "scale", b)
            },get: function(a, c) {
                var d = b.data(a, "isoTransform");
                return d && d.scale ? d.scale : 1
            }}, b.fx.step.scale = function(a) {
            b.cssHooks.scale.set(a.elem, a.now + a.unit)
        }, b.cssNumber.translate = !0, b.cssHooks.translate = {set: function(a, b) {
                p(a, "translate", b)
            },get: function(a, c) {
                var d = b.data(a, "isoTransform");
                return d && d.translate ? d.translate : [0, 0]
            }}
    }
    var q, r;
    e.csstransitions && (q = {WebkitTransitionProperty: "webkitTransitionEnd",MozTransitionProperty: "transitionend",OTransitionProperty: "oTransitionEnd otransitionend",transitionProperty: "transitionend"}[j], r = h("transitionDuration"));
    var s = b.event, t = b.event.handle ? "handle" : "dispatch", u;
    s.special.smartresize = {setup: function() {
            b(this).bind("resize", s.special.smartresize.handler)
        },teardown: function() {
            b(this).unbind("resize", s.special.smartresize.handler)
        },handler: function(a, b) {
            var c = this, d = arguments;
            a.type = "smartresize", u && clearTimeout(u), u = setTimeout(function() {
                s[t].apply(c, d)
            }, b === "execAsap" ? 0 : 100)
        }}, b.fn.smartresize = function(a) {
        return a ? this.bind("smartresize", a) : this.trigger("smartresize", ["execAsap"])
    }, b.Isotope = function(a, c, d) {
        this.element = b(c), this._create(a), this._init(d)
    };
    var v = ["width", "height"], w = b(a);
    b.Isotope.settings = {resizable: !0,layoutMode: "masonry",containerClass: "isotope",itemClass: "isotope-item",hiddenClass: "isotope-hidden",hiddenStyle: {opacity: 0,scale: .001},visibleStyle: {opacity: 1,scale: 1},containerStyle: {position: "relative",overflow: "hidden"},animationEngine: "best-available",animationOptions: {queue: !1,duration: 800},sortBy: "original-order",sortAscending: !0,resizesContainer: !0,transformsEnabled: !0,itemPositionDataEnabled: !1}, b.Isotope.prototype = {_create: function(a) {
            this.options = b.extend({}, b.Isotope.settings, a), this.styleQueue = [], this.elemCount = 0;
            var c = this.element[0].style;
            this.originalStyle = {};
            var d = v.slice(0);
            for (var e in this.options.containerStyle)
                d.push(e);
            for (var f = 0, g = d.length; f < g; f++)
                e = d[f], this.originalStyle[e] = c[e] || "";
            this.element.css(this.options.containerStyle), this._updateAnimationEngine(), this._updateUsingTransforms();
            var h = {"original-order": function(a, b) {
                    return b.elemCount++, b.elemCount
                },random: function() {
                    return Math.random()
                }};
            this.options.getSortData = b.extend(this.options.getSortData, h), this.reloadItems(), this.offset = {left: parseInt(this.element.css("padding-left") || 0, 10),top: parseInt(this.element.css("padding-top") || 0, 10)};
            var i = this;
            setTimeout(function() {
                i.element.addClass(i.options.containerClass)
            }, 0), this.options.resizable && w.bind("smartresize.isotope", function() {
                i.resize()
            }), this.element.delegate("." + this.options.hiddenClass, "click", function() {
                return !1
            })
        },_getAtoms: function(a) {
            var b = this.options.itemSelector, c = b ? a.filter(b).add(a.find(b)) : a, d = {position: "absolute"};
            return c = c.filter(function(a, b) {
                return b.nodeType === 1
            }), this.usingTransforms && (d.left = 0, d.top = 0), c.css(d).addClass(this.options.itemClass), this.updateSortData(c, !0), c
        },_init: function(a) {
            this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(a)
        },option: function(a) {
            if (b.isPlainObject(a)) {
                this.options = b.extend(!0, this.options, a);
                var c;
                for (var d in a)
                    c = "_update" + f(d), this[c] && this[c]()
            }
        },_updateAnimationEngine: function() {
            var a = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, ""), b;
            switch (a) {
                case "css":
                case "none":
                    b = !1;
                    break;
                case "jquery":
                    b = !0;
                    break;
                default:
                    b = !e.csstransitions
            }
            this.isUsingJQueryAnimation = b, this._updateUsingTransforms()
        },_updateTransformsEnabled: function() {
            this._updateUsingTransforms()
        },_updateUsingTransforms: function() {
            var a = this.usingTransforms = this.options.transformsEnabled && e.csstransforms && e.csstransitions && !this.isUsingJQueryAnimation;
            a || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale), this.getPositionStyles = a ? this._translate : this._positionAbs
        },_filter: function(a) {
            var b = this.options.filter === "" ? "*" : this.options.filter;
            if (!b)
                return a;
            var c = this.options.hiddenClass, d = "." + c, e = a.filter(d), f = e;
            if (b !== "*") {
                f = e.filter(b);
                var g = a.not(d).not(b).addClass(c);
                this.styleQueue.push({$el: g,style: this.options.hiddenStyle})
            }
            return this.styleQueue.push({$el: f,style: this.options.visibleStyle}), f.removeClass(c), a.filter(b)
        },updateSortData: function(a, c) {
            var d = this, e = this.options.getSortData, f, g;
            a.each(function() {
                f = b(this), g = {};
                for (var a in e)
                    !c && a === "original-order" ? g[a] = b.data(this, "isotope-sort-data")[a] : g[a] = e[a](f, d);
                b.data(this, "isotope-sort-data", g)
            })
        },_sort: function() {
            var a = this.options.sortBy, b = this._getSorter, c = this.options.sortAscending ? 1 : -1, d = function(d, e) {
                var f = b(d, a), g = b(e, a);
                return f === g && a !== "original-order" && (f = b(d, "original-order"), g = b(e, "original-order")), (f > g ? 1 : f < g ? -1 : 0) * c
            };
            this.$filteredAtoms.sort(d)
        },_getSorter: function(a, c) {
            return b.data(a, "isotope-sort-data")[c]
        },_translate: function(a, b) {
            return {translate: [a, b]}
        },_positionAbs: function(a, b) {
            return {left: a,top: b}
        },_pushPosition: function(a, b, c) {
            b = Math.round(b + this.offset.left), c = Math.round(c + this.offset.top);
            var d = this.getPositionStyles(b, c);
            this.styleQueue.push({$el: a,style: d}), this.options.itemPositionDataEnabled && a.data("isotope-item-position", {x: b,y: c})
        },layout: function(a, b) {
            var c = this.options.layoutMode;
            this["_" + c + "Layout"](a);
            if (this.options.resizesContainer) {
                var d = this["_" + c + "GetContainerSize"]();
                this.styleQueue.push({$el: this.element,style: d})
            }
            this._processStyleQueue(a, b), this.isLaidOut = !0
        },_processStyleQueue: function(a, c) {
            var d = this.isLaidOut ? this.isUsingJQueryAnimation ? "animate" : "css" : "css", f = this.options.animationOptions, g = this.options.onLayout, h, i, j, k;
            i = function(a, b) {
                b.$el[d](b.style, f)
            };
            if (this._isInserting && this.isUsingJQueryAnimation)
                i = function(a, b) {
                    h = b.$el.hasClass("no-transition") ? "css" : d, b.$el[h](b.style, f)
                };
            else if (c || g || f.complete) {
                var l = !1, m = [c, g, f.complete], n = this;
                j = !0, k = function() {
                    if (l)
                        return;
                    var b;
                    for (var c = 0, d = m.length; c < d; c++)
                        b = m[c], typeof b == "function" && b.call(n.element, a, n);
                    l = !0
                };
                if (this.isUsingJQueryAnimation && d === "animate")
                    f.complete = k, j = !1;
                else if (e.csstransitions) {
                    var o = 0, p = this.styleQueue[0], s = p && p.$el, t;
                    while (!s || !s.length) {
                        t = this.styleQueue[o++];
                        if (!t)
                            return;
                        s = t.$el
                    }
                    var u = parseFloat(getComputedStyle(s[0])[r]);
                    u > 0 && (i = function(a, b) {
                        b.$el[d](b.style, f).one(q, k)
                    }, j = !1)
                }
            }
            b.each(this.styleQueue, i), j && k(), this.styleQueue = []
        },resize: function() {
            this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout()
        },reLayout: function(a) {
            this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, a)
        },addItems: function(a, b) {
            var c = this._getAtoms(a);
            this.$allAtoms = this.$allAtoms.add(c), b && b(c)
        },insert: function(a, b) {
            this.element.append(a);
            var c = this;
            this.addItems(a, function(a) {
                var d = c._filter(a);
                c._addHideAppended(d), c._sort(), c.reLayout(), c._revealAppended(d, b)
            })
        },appended: function(a, b) {
            var c = this;
            this.addItems(a, function(a) {
                c._addHideAppended(a), c.layout(a), c._revealAppended(a, b)
            })
        },_addHideAppended: function(a) {
            this.$filteredAtoms = this.$filteredAtoms.add(a), a.addClass("no-transition"), this._isInserting = !0, this.styleQueue.push({$el: a,style: this.options.hiddenStyle})
        },_revealAppended: function(a, b) {
            var c = this;
            setTimeout(function() {
                a.removeClass("no-transition"), c.styleQueue.push({$el: a,style: c.options.visibleStyle}), c._isInserting = !1, c._processStyleQueue(a, b)
            }, 10)
        },reloadItems: function() {
            this.$allAtoms = this._getAtoms(this.element.children())
        },remove: function(a, b) {
            this.$allAtoms = this.$allAtoms.not(a), this.$filteredAtoms = this.$filteredAtoms.not(a);
            var c = this, d = function() {
                a.remove(), b && b.call(c.element)
            };
            a.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({$el: a,style: this.options.hiddenStyle}), this._sort(), this.reLayout(d)) : d()
        },shuffle: function(a) {
            this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), this.reLayout(a)
        },destroy: function() {
            var a = this.usingTransforms, b = this.options;
            this.$allAtoms.removeClass(b.hiddenClass + " " + b.itemClass).each(function() {
                var b = this.style;
                b.position = "", b.top = "", b.left = "", b.opacity = "", a && (b[i] = "")
            });
            var c = this.element[0].style;
            for (var d in this.originalStyle)
                c[d] = this.originalStyle[d];
            this.element.unbind(".isotope").undelegate("." + b.hiddenClass, "click").removeClass(b.containerClass).removeData("isotope"), w.unbind(".isotope")
        },_getSegments: function(a) {
            var b = this.options.layoutMode, c = a ? "rowHeight" : "columnWidth", d = a ? "height" : "width", e = a ? "rows" : "cols", g = this.element[d](), h, i = this.options[b] && this.options[b][c] || this.$filteredAtoms["outer" + f(d)](!0) || g;
            h = Math.floor(g / i), h = Math.max(h, 1), this[b][e] = h, this[b][c] = i
        },_checkIfSegmentsChanged: function(a) {
            var b = this.options.layoutMode, c = a ? "rows" : "cols", d = this[b][c];
            return this._getSegments(a), this[b][c] !== d
        },_masonryReset: function() {
            this.masonry = {}, this._getSegments();
            var a = this.masonry.cols;
            this.masonry.colYs = [];
            while (a--)
                this.masonry.colYs.push(0)
        },_masonryLayout: function(a) {
            var c = this, d = c.masonry;
            a.each(function() {
                var a = b(this), e = Math.ceil(a.outerWidth(!0) / d.columnWidth);
                e = Math.min(e, d.cols);
                if (e === 1)
                    c._masonryPlaceBrick(a, d.colYs);
                else {
                    var f = d.cols + 1 - e, g = [], h, i;
                    for (i = 0; i < f; i++)
                        h = d.colYs.slice(i, i + e), g[i] = Math.max.apply(Math, h);
                    c._masonryPlaceBrick(a, g)
                }
            })
        },_masonryPlaceBrick: function(a, b) {
            var c = Math.min.apply(Math, b), d = 0;
            for (var e = 0, f = b.length; e < f; e++)
                if (b[e] === c) {
                    d = e;
                    break
                }
            var g = this.masonry.columnWidth * d, h = c;
            this._pushPosition(a, g, h);
            var i = c + a.outerHeight(!0), j = this.masonry.cols + 1 - f;
            for (e = 0; e < j; e++)
                this.masonry.colYs[d + e] = i
        },_masonryGetContainerSize: function() {
            var a = Math.max.apply(Math, this.masonry.colYs);
            return {height: a}
        },_masonryResizeChanged: function() {
            return this._checkIfSegmentsChanged()
        },_fitRowsReset: function() {
            this.fitRows = {x: 0,y: 0,height: 0}
        },_fitRowsLayout: function(a) {
            var c = this, d = this.element.width(), e = this.fitRows;
            a.each(function() {
                var a = b(this), f = a.outerWidth(!0), g = a.outerHeight(!0);
                e.x !== 0 && f + e.x > d && (e.x = 0, e.y = e.height), c._pushPosition(a, e.x, e.y), e.height = Math.max(e.y + g, e.height), e.x += f
            })
        },_fitRowsGetContainerSize: function() {
            return {height: this.fitRows.height}
        },_fitRowsResizeChanged: function() {
            return !0
        },_cellsByRowReset: function() {
            this.cellsByRow = {index: 0}, this._getSegments(), this._getSegments(!0)
        },_cellsByRowLayout: function(a) {
            var c = this, d = this.cellsByRow;
            a.each(function() {
                var a = b(this), e = d.index % d.cols, f = Math.floor(d.index / d.cols), g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2, h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
                c._pushPosition(a, g, h), d.index++
            })
        },_cellsByRowGetContainerSize: function() {
            return {height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top}
        },_cellsByRowResizeChanged: function() {
            return this._checkIfSegmentsChanged()
        },_straightDownReset: function() {
            this.straightDown = {y: 0}
        },_straightDownLayout: function(a) {
            var c = this;
            a.each(function(a) {
                var d = b(this);
                c._pushPosition(d, 0, c.straightDown.y), c.straightDown.y += d.outerHeight(!0)
            })
        },_straightDownGetContainerSize: function() {
            return {height: this.straightDown.y}
        },_straightDownResizeChanged: function() {
            return !0
        },_masonryHorizontalReset: function() {
            this.masonryHorizontal = {}, this._getSegments(!0);
            var a = this.masonryHorizontal.rows;
            this.masonryHorizontal.rowXs = [];
            while (a--)
                this.masonryHorizontal.rowXs.push(0)
        },_masonryHorizontalLayout: function(a) {
            var c = this, d = c.masonryHorizontal;
            a.each(function() {
                var a = b(this), e = Math.ceil(a.outerHeight(!0) / d.rowHeight);
                e = Math.min(e, d.rows);
                if (e === 1)
                    c._masonryHorizontalPlaceBrick(a, d.rowXs);
                else {
                    var f = d.rows + 1 - e, g = [], h, i;
                    for (i = 0; i < f; i++)
                        h = d.rowXs.slice(i, i + e), g[i] = Math.max.apply(Math, h);
                    c._masonryHorizontalPlaceBrick(a, g)
                }
            })
        },_masonryHorizontalPlaceBrick: function(a, b) {
            var c = Math.min.apply(Math, b), d = 0;
            for (var e = 0, f = b.length; e < f; e++)
                if (b[e] === c) {
                    d = e;
                    break
                }
            var g = c, h = this.masonryHorizontal.rowHeight * d;
            this._pushPosition(a, g, h);
            var i = c + a.outerWidth(!0), j = this.masonryHorizontal.rows + 1 - f;
            for (e = 0; e < j; e++)
                this.masonryHorizontal.rowXs[d + e] = i
        },_masonryHorizontalGetContainerSize: function() {
            var a = Math.max.apply(Math, this.masonryHorizontal.rowXs);
            return {width: a}
        },_masonryHorizontalResizeChanged: function() {
            return this._checkIfSegmentsChanged(!0)
        },_fitColumnsReset: function() {
            this.fitColumns = {x: 0,y: 0,width: 0}
        },_fitColumnsLayout: function(a) {
            var c = this, d = this.element.height(), e = this.fitColumns;
            a.each(function() {
                var a = b(this), f = a.outerWidth(!0), g = a.outerHeight(!0);
                e.y !== 0 && g + e.y > d && (e.x = e.width, e.y = 0), c._pushPosition(a, e.x, e.y), e.width = Math.max(e.x + f, e.width), e.y += g
            })
        },_fitColumnsGetContainerSize: function() {
            return {width: this.fitColumns.width}
        },_fitColumnsResizeChanged: function() {
            return !0
        },_cellsByColumnReset: function() {
            this.cellsByColumn = {index: 0}, this._getSegments(), this._getSegments(!0)
        },_cellsByColumnLayout: function(a) {
            var c = this, d = this.cellsByColumn;
            a.each(function() {
                var a = b(this), e = Math.floor(d.index / d.rows), f = d.index % d.rows, g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2, h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
                c._pushPosition(a, g, h), d.index++
            })
        },_cellsByColumnGetContainerSize: function() {
            return {width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth}
        },_cellsByColumnResizeChanged: function() {
            return this._checkIfSegmentsChanged(!0)
        },_straightAcrossReset: function() {
            this.straightAcross = {x: 0}
        },_straightAcrossLayout: function(a) {
            var c = this;
            a.each(function(a) {
                var d = b(this);
                c._pushPosition(d, c.straightAcross.x, 0), c.straightAcross.x += d.outerWidth(!0)
            })
        },_straightAcrossGetContainerSize: function() {
            return {width: this.straightAcross.x}
        },_straightAcrossResizeChanged: function() {
            return !0
        }}, b.fn.imagesLoaded = function(a) {
        function h() {
            a.call(c, d)
        }
        function i(a) {
            var c = a.target;
            c.src !== f && b.inArray(c, g) === -1 && (g.push(c), --e <= 0 && (setTimeout(h), d.unbind(".imagesLoaded", i)))
        }
        var c = this, d = c.find("img").add(c.filter("img")), e = d.length, f = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", g = [];
        return e || h(), d.bind("load.imagesLoaded error.imagesLoaded", i).each(function() {
            var a = this.src;
            this.src = f, this.src = a
        }), c
    };
    var x = function(b) {
        a.console && a.console.error(b)
    };
    b.fn.isotope = function(a, c) {
        if (typeof a == "string") {
            var d = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var c = b.data(this, "isotope");
                if (!c) {
                    x("cannot call methods on isotope prior to initialization; attempted to call method '" + a + "'");
                    return
                }
                if (!b.isFunction(c[a]) || a.charAt(0) === "_") {
                    x("no such method '" + a + "' for isotope instance");
                    return
                }
                c[a].apply(c, d)
            })
        } else
            this.each(function() {
                var d = b.data(this, "isotope");
                d ? (d.option(a), d._init(c)) : b.data(this, "isotope", new b.Isotope(a, this, c))
            });
        return this
    }
})(window, jQuery);

/*
 * Isotope custom layout mode that extends masonry in order to work with percentage-sized columns
 */

(function(window, $) {
    $.extend($.Isotope.prototype, {
        _sloppyMasonryReset: function() {
            // layout-specific props
            var containerSize = this.element.width(), 
            segmentSize = this.options.sloppyMasonry && this.options.sloppyMasonry.columnWidth || 
            // or use the size of the first item, i.e. outerWidth
            this.$filteredAtoms.outerWidth(true) || 
            // if there's no items, use size of container
            containerSize;
            this.sloppyMasonry = {
                cols: Math.round(containerSize / segmentSize),
                columnWidth: segmentSize
            };
            var i = this.sloppyMasonry.cols;
            this.sloppyMasonry.colYs = [];
            while (i--) {
                this.sloppyMasonry.colYs.push(0);
            }
        },
        _sloppyMasonryLayout: function($elems) {
            var instance = this, props = instance.sloppyMasonry;
            $elems.each(function() {
                var $this = $(this), 
                // how many columns does this brick span
                colSpan = Math.round($this.outerWidth(true) / props.columnWidth);
                colSpan = Math.min(colSpan, props.cols);
                if (colSpan === 1) {
                    // if brick spans only one column,
                    // just like singleMode
                    instance._sloppyMasonryPlaceBrick($this, props.colYs);
                } else {
                    // brick spans more than one column
                    // how many different places could
                    // this brick fit horizontally
                    var groupCount = props.cols + 1 - colSpan, groupY = [], groupColY, i;

                    // for each group potential
                    // horizontal position
                    for (i = 0; i < groupCount; i++) {
                        // make an array of colY values
                        // for that one group
                        groupColY = props.colYs.slice(i, i + colSpan);
                        // and get the max value of the
                        // array
                        groupY[i] = Math.max.apply(Math, groupColY);
                    }
                    
                    instance._sloppyMasonryPlaceBrick($this, groupY);
                }
            });
        },
        _sloppyMasonryPlaceBrick: function($brick, setY) {
            // get the minimum Y value from the columns
            var minimumY = Math.min.apply(Math, setY), shortCol = 0;

            // Find index of short column, the first from the left
            for (var i = 0, len = setY.length; i < len; i++) {
                if (setY[i] === minimumY) {
                    shortCol = i;
                    break;
                }
            }

            // position the brick
            var x = this.sloppyMasonry.columnWidth * shortCol, y = minimumY;
            this._pushPosition($brick, x, y);

            // apply setHeight to necessary columns
            var setHeight = minimumY + $brick.outerHeight(true), setSpan = this.sloppyMasonry.cols + 1 - len;
            for (i = 0; i < setSpan; i++) {
                this.sloppyMasonry.colYs[shortCol + i] = setHeight;
            }
        
        },
        _sloppyMasonryGetContainerSize: function() {
            var containerHeight = Math.max.apply(Math, this.sloppyMasonry.colYs);
            return {
                height: containerHeight
            };
        },
        _sloppyMasonryResizeChanged: function() {
            return true;
        }
    });
})(this, this.jQuery);


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing, 
{
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0)
            return b;
        if (t == d)
            return b + c;
        if ((t /= d / 2) < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } 
        else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } 
        else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0)
            return b;
        if ((t /= d / 2) == 2)
            return b + c;
        if (!p)
            p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } 
        else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1)
            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined)
            s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined)
            s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined)
            s = 1.70158;
        if ((t /= d / 2) < 1)
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2)
            return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f() {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        var args = arguments, newarr;
        args.callee = args.callee.caller;
        newarr = [].slice.call(args);
        if (typeof console.log === 'object')
            log.apply.call(console.log, console, newarr);
        else
            console.log.apply(console, newarr);
    }
};

// make it safe to use console.log always
(function(a) {
    function b() {
    }
    for (var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), d; !!(d = c.pop()); ) {
        a[d] = a[d] || b;
    }
})
(function() {
    try {
        console.log();
        return window.console;
    } catch (a) {
        return (window.console = {});
    }
}());
/*
 * jQuery Superfish Menu Plugin - v1.7.4
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */

;
(function(e) {
    "use strict";
    var s = function() {
        var s = {bcClass: "sf-breadcrumb",menuClass: "sf-js-enabled",anchorClass: "sf-with-ul",menuArrowClass: "sf-arrows"}, o = function() {
            var s = /iPhone|iPad|iPod/i.test(navigator.userAgent);
            return s && e(window).load(function() {
                e("body").children().on("click", e.noop)
            }), s
        }(), n = function() {
            var e = document.documentElement.style;
            return "behavior" in e && "fill" in e && /iemobile/i.test(navigator.userAgent)
        }(), t = function(e, o) {
            var n = s.menuClass;
            o.cssArrows && (n += " " + s.menuArrowClass), e.toggleClass(n)
        }, i = function(o, n) {
            return o.find("li." + n.pathClass).slice(0, n.pathLevels).addClass(n.hoverClass + " " + s.bcClass).filter(function() {
                return e(this).children(n.popUpSelector).hide().show().length
            }).removeClass(n.pathClass)
        }, r = function(e) {
            e.children("a").toggleClass(s.anchorClass)
        }, a = function(e) {
            var s = e.css("ms-touch-action");
            s = "pan-y" === s ? "auto" : "pan-y", e.css("ms-touch-action", s)
        }, l = function(s, t) {
            var i = "li:has(" + t.popUpSelector + ")";
            e.fn.hoverIntent && !t.disableHI ? s.hoverIntent(u, p, i) : s.on("mouseenter.superfish", i, u).on("mouseleave.superfish", i, p);
            var r = "MSPointerDown.superfish";
            o || (r += " touchend.superfish"), n && (r += " mousedown.superfish"), s.on("focusin.superfish", "li", u).on("focusout.superfish", "li", p).on(r, "a", t, h)
        }, h = function(s) {
            var o = e(this), n = o.siblings(s.data.popUpSelector);
            n.length > 0 && n.is(":hidden") && (o.one("click.superfish", !1), "MSPointerDown" === s.type ? o.trigger("focus") : e.proxy(u, o.parent("li"))())
        }, u = function() {
            var s = e(this), o = d(s);
            clearTimeout(o.sfTimer), s.siblings().superfish("hide").end().superfish("show")
        }, p = function() {
            var s = e(this), n = d(s);
            o ? e.proxy(f, s, n)() : (clearTimeout(n.sfTimer), n.sfTimer = setTimeout(e.proxy(f, s, n), n.delay))
        }, f = function(s) {
            s.retainPath = e.inArray(this[0], s.$path) > -1, this.superfish("hide"), this.parents("." + s.hoverClass).length || (s.onIdle.call(c(this)), s.$path.length && e.proxy(u, s.$path)())
        }, c = function(e) {
            return e.closest("." + s.menuClass)
        }, d = function(e) {
            return c(e).data("sf-options")
        };
        return {hide: function(s) {
                if (this.length) {
                    var o = this, n = d(o);
                    if (!n)
                        return this;
                    var t = n.retainPath === !0 ? n.$path : "", i = o.find("li." + n.hoverClass).add(this).not(t).removeClass(n.hoverClass).children(n.popUpSelector), r = n.speedOut;
                    s && (i.show(), r = 0), n.retainPath = !1, n.onBeforeHide.call(i), i.stop(!0, !0).animate(n.animationOut, r, function() {
                        var s = e(this);
                        n.onHide.call(s)
                    })
                }
                return this
            },show: function() {
                var e = d(this);
                if (!e)
                    return this;
                var s = this.addClass(e.hoverClass), o = s.children(e.popUpSelector);
                return e.onBeforeShow.call(o), o.stop(!0, !0).animate(e.animation, e.speed, function() {
                    e.onShow.call(o)
                }), this
            },destroy: function() {
                return this.each(function() {
                    var o, n = e(this), i = n.data("sf-options");
                    return i ? (o = n.find(i.popUpSelector).parent("li"), clearTimeout(i.sfTimer), t(n, i), r(o), a(n), n.off(".superfish").off(".hoverIntent"), o.children(i.popUpSelector).attr("style", function(e, s) {
                        return s.replace(/display[^;]+;?/g, "")
                    }), i.$path.removeClass(i.hoverClass + " " + s.bcClass).addClass(i.pathClass), n.find("." + i.hoverClass).removeClass(i.hoverClass), i.onDestroy.call(n), n.removeData("sf-options"), void 0) : !1
                })
            },init: function(o) {
                return this.each(function() {
                    var n = e(this);
                    if (n.data("sf-options"))
                        return !1;
                    var h = e.extend({}, e.fn.superfish.defaults, o), u = n.find(h.popUpSelector).parent("li");
                    h.$path = i(n, h), n.data("sf-options", h), t(n, h), r(u), a(n), l(n, h), u.not("." + s.bcClass).superfish("hide", !0), h.onInit.call(this)
                })
            }}
    }();
    e.fn.superfish = function(o) {
        return s[o] ? s[o].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof o && o ? e.error("Method " + o + " does not exist on jQuery.fn.superfish") : s.init.apply(this, arguments)
    }, e.fn.superfish.defaults = {popUpSelector: "ul,.sf-mega",hoverClass: "sfHover",pathClass: "overrideThisToUse",pathLevels: 1,delay: 800,animation: {opacity: "show"},animationOut: {opacity: "hide"},speed: "normal",speedOut: "fast",cssArrows: !0,disableHI: !1,onInit: e.noop,onBeforeShow: e.noop,onShow: e.noop,onBeforeHide: e.noop,onHide: e.noop,onIdle: e.noop,onDestroy: e.noop}, e.fn.extend({hideSuperfishUl: s.hide,showSuperfishUl: s.show})
})(jQuery);

/**
 * jQuery ScrollTo
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3
 */

;
(function($) {
    var h = $.scrollTo = function(a, b, c) {
        $(window).scrollTo(a, b, c)
    };
    h.defaults = {axis: 'xy',duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,limit: true};
    h.window = function(a) {
        return $(window)._scrollable()
    };
    $.fn._scrollable = function() {
        return this.map(function() {
            var a = this, isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
            if (!isWin)
                return a;
            var b = (a.contentWindow || a).document || a.ownerDocument || a;
            return /webkit/i.test(navigator.userAgent) || b.compatMode == 'BackCompat' ? b.body : b.documentElement
        })
    };
    $.fn.scrollTo = function(e, f, g) {
        if (typeof f == 'object') {
            g = f;
            f = 0
        }
        if (typeof g == 'function')
            g = {onAfter: g};
        if (e == 'max')
            e = 9e9;
        g = $.extend({}, h.defaults, g);
        f = f || g.duration;
        g.queue = g.queue && g.axis.length > 1;
        if (g.queue)
            f /= 2;
        g.offset = both(g.offset);
        g.over = both(g.over);
        return this._scrollable().each(function() {
            if (!e)
                return;
            var d = this, $elem = $(d), targ = e, toff, attr = {}, win = $elem.is('html,body');
            switch (typeof targ) {
                case 'number':
                case 'string':
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                        targ = both(targ);
                        break
                    }
                    targ = $(targ, this);
                    if (!targ.length)
                        return;
                case 'object':
                    if (targ.is || targ.style)
                        toff = (targ = $(targ)).offset()
            }
            $.each(g.axis.split(''), function(i, a) {
                var b = a == 'x' ? 'Left' : 'Top', pos = b.toLowerCase(), key = 'scroll' + b, old = d[key], max = h.max(d, a);
                if (toff) {
                    attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
                    if (g.margin) {
                        attr[key] -= parseInt(targ.css('margin' + b)) || 0;
                        attr[key] -= parseInt(targ.css('border' + b + 'Width')) || 0
                    }
                    attr[key] += g.offset[pos] || 0;
                    if (g.over[pos])
                        attr[key] += targ[a == 'x' ? 'width' : 'height']() * g.over[pos]
                } else {
                    var c = targ[pos];
                    attr[key] = c.slice && c.slice(-1) == '%' ? parseFloat(c) / 100 * max : c
                }
                if (g.limit && /^\d+$/.test(attr[key]))
                    attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
                if (!i && g.queue) {
                    if (old != attr[key])
                        animate(g.onAfterFirst);
                    delete attr[key]
                }
            });
            animate(g.onAfter);
            function animate(a) {
                $elem.animate(attr, f, g.easing, a && function() {
                    a.call(this, e, g)
                })
            }
        }).end()
    };
    h.max = function(a, b) {
        var c = b == 'x' ? 'Width' : 'Height', scroll = 'scroll' + c;
        if (!$(a).is('html,body'))
            return a[scroll] - $(a)[c.toLowerCase()]();
        var d = 'client' + c, html = a.ownerDocument.documentElement, body = a.ownerDocument.body;
        return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d])
    };
    function both(a) {
        return typeof a == 'object' ? a : {top: a,left: a}
    }
})(jQuery);


