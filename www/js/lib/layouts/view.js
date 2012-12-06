
define(function(require) {
    var $ = require('zepto');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var anims = require('./anim');
    var Header = require('./header');
    var Footer = require('./footer');

    var globalStack = [];

    var BasicView = Backbone.View.extend({
        initialize: function() {
            this._stack = [];
            
            var p = $(this.el).parents('x-view').get(0);
            if(p) {
                this.parent = p.view;
            }

            this.initMarkup();
        },

        initMarkup: function() {
            // TODO: clean this up and simplify expansion
            var el = $(this.el);

            if(el.children('header').length) {
                this.header = new Header(this);
                el.children('header').remove();
            }

            if(el.children('footer').length) {
                this.footer = new Footer(this);
                el.children('footer').remove();
            }

            // We need to manipulate all of the child nodes, including
            // text nodes
            var nodes = Array.prototype.slice.call(el[0].childNodes);
            var contents = $(nodes);

            if(!contents.length) {
                el.append('<div class="contents"></div>');
            }
            else {
                contents.wrapAll('<div class="contents"></div>');
            }

            if(this.header) {
                el.prepend(this.header.el);
            }

            if(this.footer) {
                el.append(this.footer.el);
            }

            this.onResize();
        },

        onResize: function() {
            var el = $(this.el);
            var appEl = el.parent();
            var appHeight = appEl.height();

            // Width
            el.width(appEl.width());

            // Height (minus the header and footer)
            var height = (el.children('header').height() +
                          el.children('footer').height());
            el.children('.contents').css({ height: appHeight - height });

            if(this.header) {
                this.header.setTitle(this.header.getTitle());
            }
        },

        setTitle: function() {
            if(!this.header) {
                return;
            }

            var titleField = this.options.titleField || 'title';
            var model = this.model;
            var text;

            if(this.getTitle) {
                text = this.getTitle();
            }
            else if(model && model.get(titleField)) {
                text = model.get(titleField);
            }
            else {
                // Since the header may have changed (buttons, etc),
                // reorient the header anyway
                text = this.header.getTitle();
            }

            this.header.setTitle(text);
        },

        open: function(model, anim) {
            anim = anim || 'instant';
            var stack = this.parent ? this.parent._stack : globalStack;

            if(stack.indexOf(this.el) !== -1) {
                // It's already in the stack, do nothing
                return;
            }

            if(anims[anim]) {
                anims[anim](this.el);
            }
            else {
                console.log('WARNING: invalid animation: ' + anim);
            }

            if(stack.length && this.header) {
                this.header.addBack(this);
            }
            else if(this.header) {
                this.header.removeBack();
            }

            stack.push(this.el);
            this.model = model;
            this.setTitle();

            // This method fires when this view appears in the app, so bind
            // the render function to the current model's change event
            if(this.model) {
                this.model.on('change', _.bind(this.render, this));
            }

            this.render();
        },

        openAlone: function(model, anim) {
            anim = anim || 'instant';
            anims[anim](this.el);

            if(this.header) {
                this.header.removeBack();
            }

            this.model = model;
            this.setTitle();
        },

        close: function(anim) {
            anim = anim || 'instantOut';
            var stack = this.parent ? this.parent._stack : globalStack;
            var lastIdx = stack.length - 1;

            if(stack[lastIdx] == this.el) {
                stack.pop();
            }
            
            anims[anim](this.el);
            this.model = null;
        },
        
        render: function() {
            var model = this.model;

            if(this.options.render) {
                this.options.render.call(this.el, model);
            }
            else {
                console.log('[BasicView] WARNING: No render function ' +
                            'available. Set one on the "render" property ' +
                            'of the x-view.');
            }
        }
    });

    xtag.register('x-view', {
        onCreate: function() {
            this.view = new BasicView({ el: this });

            var _this = this;
            if(this.dataset.first == 'true') {
                this.view.open();
            }
        },
        getters: {
            model: function() {
                return this.view.model;
            }
        },
        setters: {
            titleField: function(name) {
                this.view.options.titleField = name;
            },
            render: function(func) {
                this.view.options.render = func;
            },
            getTitle: function(func) {
                this.view.getTitle = function() {
                    // It should be called with "this" as the element,
                    // not the view, since that's what it looks like
                    // from the user perspective
                    return func.call(this.el);
                };
            },
            model: function(model) {
                this.view.model = model;
            }
        },
        methods: {
            open: function(model) {
                this.view.open(model);
            },
            close: function() {
                this.view.close();
            }
        }
    });

    window.onresize = function() {
        // TODO: figure out better way to do this
        var els = 'x-view, x-listview';
        $(els).each(function() {
            // if(!stack.find(this)) {
            //     $(this).css({ zIndex: 0 });
            // }
            
            this.view.onResize();
        });
    };

    return {
        BasicView: BasicView
    };
});