/// <reference path="../../Scripts/jquery-1.9.1.js" />
/// <reference path="../../Scripts/knockout-2.2.1.js" />
/// <reference path="../../Scripts/chosen.jquery.js" />


(function ($) {
ko.bindingHandlers.ChoosenHandler = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
        
        //ko.bindingHandlers.event.init(element, valueAccessor, allBindingsAccessor);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever the associated observable changes value.
        // Update the DOM element based on the supplied values here.
        var options = allBindingsAccessor().dropdownOptions || {};
        $(element).chosen(options);
    }
    };

})(jQuery);