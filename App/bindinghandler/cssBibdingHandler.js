ko.bindingHandlers.cssOnHover = {
    init: function (element, valueAccessor) {
        ko.utils.registerEventHandler(element, 'mouseenter', function () {
            var cssClassName = ko.utils.unwrapObservable(valueAccessor());
            ko.utils.toggleDomNodeCssClass(element, cssClassName, true);
        });
        ko.utils.registerEventHandler(element, 'mouseleave', function () {
            var cssClassName = ko.utils.unwrapObservable(valueAccessor());
            ko.utils.toggleDomNodeCssClass(element, cssClassName, false);
        });
    }
};