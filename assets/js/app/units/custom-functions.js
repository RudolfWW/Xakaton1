/**
 * Filename: custom-functions.js
 *
 * Common functions
 *
 * @category Require JS
 * @author  Nageswara Rao S (nag.samayam@gmail.com)
 * @copyright (c) 2014 [Janaagraha] (http://janaagraha.org)
 */
/*
 * Simple ajax call
 */
function simpleAjaxCall(options) {
    /* Extend our default options with those provided.
     Note that the first argument to extend is an empty
     object � this is to keep from overriding our "defaults"
     object. */
    var defaults = {
        formMethod: 'POST',
        dataType: 'JSON',
        data: {}
    };
    var settings = $.extend({}, defaults, options);
    return $.ajax({
        type: settings['formMethod'],
        data: settings['data'],
        url: globalConfig.siteURL + settings['source'],
        dataType: settings['dataType']
    });
}
function addError(sourceObj, errorMessage) {
    sourceObj.closest('.form-group').addClass("has-error");
    sourceObj.closest('.form-group').find('.error').html(errorMessage);
}
/* Remove error message */
function removeError(sourceObj) {
    sourceObj.closest('.form-group').removeClass('has-error');
    sourceObj.closest('.form-group').find('.error').html('');
}
/* End of custom-functions.js */
/* Location: ./assets/js/app/utils/custom-functions.js */