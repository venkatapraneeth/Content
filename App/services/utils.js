define(['models'],
    function (models) {

        function mapToObservable(dto) {
            var mapped = {};
            for (prop in dto) {
                if (dto.hasOwnProperty(prop)) {
                    mapped[prop] = ko.observable(dto[prop]);
                }
            }
            return mapped;
        };

        var utils = {
            mapToObservable: mapToObservable
        }

        return utils;
    }
)