/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

(function() {
	// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	if (!String.prototype.trim) {
		(function() {
			// Make sure we trim BOM and NBSP
			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function() {
				return this.replace(rtrim, '');
			};
		})();
	}

	[].slice.call( document.querySelectorAll( '.input-field' ) ).forEach( function( inputEl ) {
		// in case the input is already filled..
		if( inputEl.value.trim() !== '' ) {
			classie.add( inputEl.parentNode, 'input-filled' );
		}

		// events:
		inputEl.addEventListener( 'focus', onInputFocus );
		inputEl.addEventListener( 'blur', onInputBlur );
	} );

	function onInputFocus( ev ) {
		classie.add( ev.target.parentNode, 'input-filled' );
	}

	function onInputBlur( ev ) {
		if( ev.target.value.trim() === '' ) {
			classie.remove( ev.target.parentNode, 'input-filled' );
		}
	}
})();




$(function () {

  $.getJSON('scripts/forexLandingPageQ4/data.json', function (data) {
    var params = {
      container: document.getElementById('lottie'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: data,
      assetsPath: "scripts/forexLandingPageQ4/"
    };
    var anim;
    anim = bodymovin.loadAnimation(params);
  })
})

$(function () {
    $('.phone-holder').each(function (i, element) {

        var uid = $(element).attr('id');

        var modelId = $(element).attr('data-model-id');
        var validationMessage = $(element).attr('data-validation-message');
        var defaultCountry = $(element).attr('data-default-country');
        $("#" + uid + " > #" + modelId).intlTelInput({
            initialCountry: defaultCountry,
            numberType: 'MOBILE',
            autoHideDialCode: true,
            nationalMode: false,
            autoPlaceholder: "polite",
            preferredCountries: ["gb", "ae", "sa", "cn", "ru", "sp", "it", "pl"],
            //utilsScript: "js/utils.js",
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
        /*var validationName = "isValidNumber" + uid;
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
        }*/
		
    });
});

$(document).ready(function() {
	//FOR RADIO BUTTONS STYLE
	$('.radio-inline').append('<span class="control_indicator"></span>');
	
	//FREE DEMO BUTTON
	$(document).on('click', '#free-demo', function(e){
		e.preventDefault();
		var target = $('#contactUs h2.title');
		
		if (target.length) {
			$('html,body').animate({
			scrollTop: target.offset().top
		}, 1000);
		
		$(this).blur();
		return false;
		}
	});
});