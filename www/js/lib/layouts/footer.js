
define(function(require) {
    var $ = require('zepto');

    function Footer(parent, stack) {
        this.stack = stack;
        var el = $('footer', parent);

        $('button', el).each(function() {
            var btn = $(this);
            var view = btn.data('view');
            if(view) {
                btn.click(function() {
                    $(view).get(0).open(parent.collection.models[0]);
                });
            }
        });
    }

    return Footer;
});