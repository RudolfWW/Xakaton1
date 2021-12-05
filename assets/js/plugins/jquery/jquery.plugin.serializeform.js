/*!
 jQuery serializeform plugin
 @name jquery.plugin.serializeform.js
 @author  Nageswara Rao S (nag.samayam@gmail.com)
 @version 1.0
 @date 17-04-2015
 @category jQuery Plugin
 @copyright (c) 2015 [Janaagraha] (http://janaagraha.org)
 */
 $(document).ready(function () {

    /*
     * Select on change
     *
     * Get childern of a parent in select box(dropdown)
     *
     * Useage: $("classorid").select_on_change();
     *
     * @param options default values for this plugin.
     * @param {String} [options.source = "complaints/complaint/get_categories"] url from where we need to fetch the dynamic data
     * @param {String} [options.target = "#category_select"] id or class where we need to add the dynamic options
     */
    $.fn.select_on_change = function (options) {
        /* Extend our default options with those provided.
         Note that the first argument to extend is an empty
         object � this is to keep from overriding our "defaults"
         object. */
        var settings = $.extend({}, $.fn.select_on_change.defaults, options);
        var self = $(this);
        self.on('change', function () {
            var selectedValue = self.val();
            var options = $(settings.target);
            if ('' !== selectedValue) {
                options.find('option').remove();
                $.post(globalConfig.siteURL + settings.source, {parent_id: selectedValue, lang_id: globalConfig.currentLangId}, function (data) {
                    var categoryObj = $.parseJSON(data);
                    jQuery.each(categoryObj, function (key, value) {

                        options.prepend("<option value=" + key + ">" + value + "</option>");
                    });
                    options.trigger("chosen:updated");
                });
            } else {
                /* Remove options */
                options.append("<option selected></option>");
                options.find('option').remove();
                options.trigger("chosen:updated");
            }
        });
    };

    /* select_on_change Plugin defaults � added as a property on our plugin function */

    $.fn.select_on_change.defaults = {
        source: '/reports/get_transactions_by_dept', /* url from where we need to fetch the dynamic data */
        target: '#transaction_id' /* id or class where we need to append the dynamic data */
    };

    /*  -------------------------------------------------------------------- */

});
/* End of file jquery.plugin.serializeform.js */
/* Location: ./assets/js/plugins/jquery.plugin.serializeform.js */