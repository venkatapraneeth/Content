(function ($) {
    ko.bindingHandlers.AccordianHandler = {
        init: function (element, valueAccessor) {
            var options = valueAccessor().accordianOptions || {
                collapsible: true,
                heightStyle: "content",
                active: false
            };
            //$(element).attr('title', options.title);
            $(element).accordion(options);
        }
    };
})(jQuery);