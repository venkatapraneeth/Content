(function ($) {
    ko.bindingHandlers.TooltipHandler = {
        init: function (element, valueAccessor) {
            var options = valueAccessor().tooltipOptions || {};
            $(element).attr('title', options.title);
            $(element).tooltip(options);
        }
    };
})(jQuery);