$(function () {
    $('.phone-holder').each(function (i, element) {

        var uid = $(element).attr('id');

        var modelId = $(element).attr('data-model-id');
        var validationMessage = $(element).attr('data-validation-message');
        var defaultCountry = $(element).attr('data-default-country');
        console.log(uid)
        $("#" + uid + " > #" + modelId).intlTelInput({
            initialCountry: defaultCountry,
            numberType: 'MOBILE',
            autoHideDialCode: true,
            nationalMode: false,
            autoPlaceholder: "polite",
            preferredCountries: ["gb", "ae", "sa", "cn", "ru", "sp", "it", "pl"],
            utilsScript: "bower_components/intl-tel-input/build/js/utils.js",
            customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
                return "Phone number";
            }
        });

        $("#" + uid).closest("form").find(".country select").change(function () {

            if ($("#" + uid + " #" + modelId).intlTelInput("getNumber") != "") return;

            var countryData = $.fn.intlTelInput.getCountryData();
            var selectedCountry = null;
            for (i = 0; i < countryData.length; i++) {
                if (countryData[i].name.indexOf($(this).val()) === 0) {
                    selectedCountry = countryData[i].iso2;
                    break;
                }
            }
            if (selectedCountry) {
                $("#" + uid + " #" + modelId).intlTelInput("setCountry", selectedCountry);
            }
        });
        var validationName = "isValidNumber" + uid;
        $.validator.addMethod(validationName, function (value, element, params) {
            var isValid = $("#" + uid + " #" + modelId).intlTelInput("isValidNumber");
            return isValid;
        }, validationMessage);
        var className = "checkValidNumber" + uid;
        console.log($.validator.classRuleSettings[className]);

        $.validator.classRuleSettings[className] = {};
        $.validator.classRuleSettings[className][validationName] = true;


        var countryName = $.grep($("#" + uid + " #" + modelId).intlTelInput.getCountryData(),
            function (s) { return s.iso2 == defaultCountry.toLowerCase() })[0].name.replace(/ \([^\)]+\)/g, '');
        if (countryName) {
            $("#" + uid).closest("form").find(".country select").val(countryName);
            $("#" + uid).closest("form").find(".country input[type=hidden]").val(countryName);
        }


    });
});