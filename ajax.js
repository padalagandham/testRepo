var feature = (function() {
    var resObj = {};
    var validationRules = {
        firstName: {
            min: 1,
            max: 100,
            regExp: /^[a-zA-Z\s]*$/,
            required: true
        },
        address1: {
            min: 1,
            max: 100,
            regExp: /^[a-zA-Z0-9\s]*$/,
            required: true
        },
        address2: {
            min: 1,
            max: 100,
            regExp: /^[a-zA-Z0-9\s]*$/,
            required: false
        },
        city: {
            min: 1,
            max: 50,
            regExp: /^[a-zA-Z\s]*$/,
            required: true
        },
        select: {
            min: 2,
            max: 2,
            regExp: /^[a-zA-Z\s]*$/,
            required: true
        },
        zipcode: {
            min: 5,
            max: 5,
            regExp: /^[0-9\s]*$/,
            required: true
        }
    };

    var getLabel = function(id, obj) {
        var obj = obj || resObj;
        if (obj.hasOwnProperty('id')) {
            if (obj.id === id) {
                return obj.label;
            } else if (obj.hasOwnProperty('nodes')) {
                for (var i = 0; i < obj.nodes.length; i++) {
                    var returnVal = getLabel(id, obj.nodes[i]);
                    if (returnVal) {
                        return returnVal;
                    }
                }
            }
        }
    }

    var resetForm = function() {
        $('input', "#userInputForm").not('input[type=submit], input[type=reset]').each(function() {
            $(this).removeClass('error').next("small").removeClass('error');
        });
    }

    var makeRequest = function() {
        $.getJSON({
            url: 'http://localhost:8080/data.json',
            success: function(data) {
                resObj = data;
                console.log("============== getLabel ", feature.getLabel(4));
            }
        });
    }

    var validate = function() {
        var valid = true;
        $('input', "#userInputForm").not('input[type=submit], input[type=reset]').each(function() {
            var el = $(this),
                name = el.attr('name'),
                val = el.val();
            rules = validationRules[name];
            if (rules.required && (val.length < rules.min || val.length > rules.max || !rules.regExp.test(val))) {
                valid = false;
                el.addClass('error').next("small").addClass('error');
            } else {
                el.removeClass('error').next("small").removeClass('error');
            }
        });

        return valid;
    }

    var init = function() {
        $("#makeRequest").click(makeRequest);
        $("#userInputForm").submit(function(e) {
            return validate(e);
        });
        $("input[type='reset']").on("click", resetForm);

    }

    return {
        init: init,
        getLabel: getLabel
    };
})();

$(document).ready(function() {
    feature.init();
});