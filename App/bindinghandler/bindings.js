define([
	'durandal/system',
    'jquery',
        '../../Scripts/chosen.jquery',
        '../../Scripts/jquery-ui-1.10.3.custom.min',
        'bootStrap'
], function (system, $) {

    'use strict';

    return {
        init: init
    };

    function init() {

        // a custom binding to handle the enter key (could go in a separate library)
        ko.bindingHandlers.enterKey = {
            init: function (element, valueAccessor, allBindingsAccessor, data) {
                var wrappedHandler, newValueAccessor;

                // wrap the handler with a check for the enter key
                wrappedHandler = function (data, event) {
                    if (event.keyCode === 13) {
                        valueAccessor().call(this, data, event);
                    }
                };

                // create a valueAccessor with the options that we would want to pass to the event binding
                newValueAccessor = function () {
                    return {
                        keyup: wrappedHandler
                    };
                };

                // call the real event binding's init function
                ko.bindingHandlers.event.init(element, newValueAccessor, allBindingsAccessor, data);
            }
        };


        ko.bindingHandlers.TestHandler = {
            init: function (element, valueAccessor, allBindingsAccessor, data) {
                $(element).val('Hi');
            },
            update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                // This will be called once when the binding is first applied to an element,
                // and again whenever the associated observable changes value.
                // Update the DOM element based on the supplied values here.
                var t1 = $(element).val();
                $(element).val("Hello" + t1);
            }
        };


        ko.bindingHandlers.ChoosenHandler = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                // This will be called when the binding is first applied to an element
                // Set up any initial state, event handlers, etc. here
                var options = allBindingsAccessor().dropdownOptions || {};
                $(element).chosen({ disable_search_threshold: 10 });

                // call the real event binding's init function
                ko.bindingHandlers.event.init(element,valueAccessor, allBindingsAccessor);

            }
            //,
            //update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //    // This will be called once when the binding is first applied to an element,
            //    // and again whenever the associated observable changes value.
            //    // Update the DOM element based on the supplied values here.
            //}

        };


        ko.bindingHandlers.DateBindingHandler = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                // This will be called when the binding is first applied to an element
                // Set up any initial state, event handlers, etc. here
                var options = allBindingsAccessor().dropdownOptions || {};
                $(element).chosen({ disable_search_threshold: 10 });

                // call the real event binding's init function
                ko.bindingHandlers.event.init(element, valueAccessor, allBindingsAccessor);

            }
            //,
            //update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            
            //}

        };
        


        ko.bindingHandlers.TooltipHandler = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                // This will be called when the binding is first applied to an element
                // Set up any initial state, event handlers, etc. here
                var options = allBindingsAccessor().tooltipOptions || {};
                $(element).tooltip(options);

                // call the real event binding's init function
                ko.bindingHandlers.event.init(element, valueAccessor, allBindingsAccessor);

            }
            //,
            //update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //    // This will be called once when the binding is first applied to an element,
            //    // and again whenever the associated observable changes value.
            //    // Update the DOM element based on the supplied values here.
            //}

        };

    }

});