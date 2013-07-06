(function ($) {
    var windowUrl = window.URL || window.webkitURL;
    ko.bindingHandlers.FileUpload = {
        init: function (element, valueAccessor) {
            $(element).change(function () {
                var file = this.files[0];
                if (ko.isObservable(valueAccessor())) {
                    valueAccessor()(file);
                }
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var file = ko.utils.unwrapObservable(valueAccessor());
            var bindings = allBindingsAccessor();
            if (bindings.fileObjectURL && ko.isObservable(bindings.fileObjectURL)) {
                var oldUrl = bindings.fileObjectURL();
                if (oldUrl) {
                    windowUrl.revokeObjectURL(oldUrl);
                }
                bindings.fileObjectURL(file && windowUrl.createObjectURL(file));
            }

            if (bindings.fileBinaryData && ko.isObservable(bindings.fileBinaryData)) {
                if (!file) {
                    bindings.fileBinaryData(null);
                } else {
                    var reader = new window.FileReader();
                    reader.onload = function (e) {
                        bindings.fileBinaryData(e.target.result);
                    };
                    reader.readAsBinaryString(file);
                }
            }
        }
    };
})(jQuery);