/**
 * Filename: main-complaint-list.js
 *
 * Main user controller which handles all the user related JS actions
 *
 * @package Require JS
 * @author Syamasundara Rao
 * @copyright(c) 2014, Janaagraha
 */

/*-----------------document ready start--------------------------*/
$(document).ready(function () {
    var paid_amount = $('#country-paid-amount').text();
    $('#country-paid-amount').html(round_off_amount(paid_amount));

    var bribe_amount = $('.total_bribe_amount').text();
    $('.total_bribe_amount').html(round_off_amount(bribe_amount));
    /* Disable submit button */
    /* $('form').submit(function () {
     $('.btn').attr('disabled', true).addClass('disabled');
     }); */
    /* Disable submit button */

    /* Get transactions list */
    $("#department_id").select_on_change();
    /* Get transactions list for Bribe hotline for in How-to detais page */
    $("#department_id_top").select_on_change({
        target: '#transaction_id_top' /* id or class where we need to append the dynamic data */
    });
    /* Get cities list */
    $("#state_id").select_on_change({
        source: 'reports/get_cities_by_state',
        /* url from where we need to fetch the dynamic data */
        target: '#city_id' /* id or class where we need to append the dynamic data */
    });
    /* Get cities list for Bribe hotline for in How-to detais page */
    $("#state_id_top").select_on_change({
        source: 'reports/get_cities_by_state',
        /* url from where we need to fetch the dynamic data */
        target: '#city_id_top' /* id or class where we need to append the dynamic data */
    });
    /* ======== Validate SMS code ======== */
    if (flashReportId) {
        $('#reportSavedSuccess').modal('show');
    }
    /* Validate SMS code */
    $('#sms-code').keyup(function (e) {
        if (e.which == 13) { // detect the enter key
            $('#sms-ver-code').click(); // fire a click,  you can do anything
        }
    });
    $("#sms-ver-code").on("click", function () {
        $("#sms-ver-code").prop('disabled', true);
        var smsCode = $.trim($("#sms-code").val());
        var config = {
            'formMethod': 'POST',
            'data': {
                'flash_report_id': flashReportId,
                'sms_code': smsCode
            },
            'source': 'reports/confirm_mobile_number_register',
            'dataType': 'JSON'
        };

        simpleAjaxCall(config).done(function (data) {
            $("#sms-ver-code").prop('disabled', false);
            if (data.status) {
                $('#reportSavedSuccess').modal('hide');

            } else {
                $('#reportSavedSuccess span.error').html('').hide();
                $('#reportSavedSuccess span.error').html('Enter valid code').css('display', 'block').show();
            }
        });
    });
    /*========== how tos start =============*/
    $('.card').click(function () {
        $.post('how_tos/get_howtos_list', {
            dept_id: $(this).attr('id')
        }, function (data) {
            $('.card-drop-down').html(data);
        });

    });
    /* ======== Validate SMS code end ======== */
    /* ============ React count =============== */
    $('.reactions').on('click', '.react_option', function () {
        var option_id = $(this).find('span').attr('option_id');
        var report_id = $(this).attr('node_id');
        var report_type_id = $(this).attr('content_type_id');
        var vote_cnt = $(this).find('.reaction_cnt').text();

        var total = parseInt(vote_cnt) + 1;
        $(this).find('.reaction_cnt').text(total);
        $(this).addClass('active');
        $('.reactions .option').removeClass('react_option');
        var url = globalConfig['baseURL'] + "how_tos/insert_rating_count";
        $.post(url, {
            option_id: option_id,
            report_id: report_id,
            report_type_id: report_type_id,
            option_votes: total
        }, function (data) {});

    });
    /* ======== Resend SMS code ======== */
    $("#resend-sms-code").on("click", function () {
        var config = {
            'formMethod': 'POST',
            'data': {
                'flash_report_id': flashReportId,
            },
            'source': 'reports/resend_sms_code',
            'dataType': 'JSON'
        };
        simpleAjaxCall(config).done(function (data) {
            if (!data.status) {
                $('#reportSavedSuccess').modal('hide');

            } else {
                alert('We can send verification code maximum 3 times');
            }
        });
    });
    /* ======== Resend SMS code end ======== */
    if (flashBribeHotlineId) {
        $('#thankYou').modal('show');
    }
    /*fetching statewise result*/
    /*fetching statewise result*/
    $('path').hover(function (event) {
            event.preventDefault();
            $(this).css("cursor", "pointer");
            $.post('home/get_state_wise_reports', {
                id: $(this).attr('id')
            }, function (data) {
                var json = jQuery.parseJSON(data);
                $(".state_name").html(json.state_name.name);
                $.each(json.bribe_reports, function (key, value) {
                    $(".total_bribe_amount").html(round_off_amount(value.amount));
                    $(".bribes_paid_cnt").html(value.paidreports);
                    $(".bribes_nt_paid_cnt").html(value.bribfighter);
                    $(".bribes_nt_asked_cnt").html(value.honestofficer);
                    $(".total_bribe_reports").html(value.totalreports);
                    $(".bribes_hotline_cnt").html(value.hotline);
                });

            });
        },
        function () {});
    $("div.alert a.close").on("click", function () {
        $(".alert-success").css('display', 'none');
    });
    setTimeout(function () {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 0
        };

        if (custom_message)
            toastr.success(custom_message);
        if (custom_error)
            toastr.error(custom_error);

    }, 1300);

    function round_off_amount(labelValue) {
        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+9
            ?
            (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
            // Six Zeroes for Millions 
            :
            Math.abs(Number(labelValue)) >= 1.0e+6   ?
            (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
            // Three Zeroes for Thousands
            : 
            Math.abs(Number(labelValue)) >= 1.0e+3
            ?
            (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
            :
            (Math.abs(Number(labelValue))).toFixed(2);
    }

    // function round_off_amount(total_bribe_paid_amount) {
    //     if (total_bribe_paid_amount >= 10000000) {
    //         total_bribe_paid_amount = total_bribe_paid_amount / 10000000;
    //         total_bribe_paid_amount = Math.round(total_bribe_paid_amount * 100) / 100;
    //         total_bribe_paid_amount = total_bribe_paid_amount + " Cr";
    //     } else if (total_bribe_paid_amount >= 100000) {
    //         total_bribe_paid_amount = total_bribe_paid_amount / 100000;
    //         total_bribe_paid_amount = Math.round(total_bribe_paid_amount * 100) / 100;
    //         total_bribe_paid_amount = total_bribe_paid_amount + " Lakh";
    //     } else if (total_bribe_paid_amount >= 1000) {
    //         total_bribe_paid_amount = total_bribe_paid_amount / 1000;
    //         total_bribe_paid_amount = Math.round(total_bribe_paid_amount * 100) / 100;
    //         total_bribe_paid_amount = total_bribe_paid_amount + " K";
    //     }
    //     return total_bribe_paid_amount;
    // }
    /* ======== Bribe hotline bottom form How-to details page ======== */
    $("form#askQuestionToggleBottom").on('submit', function (e) {
        // Prevent form submit
        e.preventDefault();
        var formReturn = true;
        var fullNameDomObj = $('#full-name');
        var emailDomObj = $('#email');
        var deptDomObj = $('#department_id');
        var transDomObj = $('#transaction_id');
        var stateDomObj = $('#state_id');
        var cityDomObj = $('#city_id');
        var descriptionDomObj = $('#description');
        var pageType = $("#page_type_bottom").val();

        var fullName = $.trim(fullNameDomObj.val());
        var email = $.trim(emailDomObj.val());
        var deptId = Number(deptDomObj.val());
        var transactionId = Number(transDomObj.val());
        var stateId = Number(stateDomObj.val());
        var cityId = Number(cityDomObj.val());
        var description = $.trim(descriptionDomObj.val());

        var emailValidate = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        var fullNameReg = /^([A-Za-z .]){3,200}$/;
        var descReg = /^([0-9a-z#]{1}[a-z0-9.,?$;<>^?:'+–{}\[\]\_\-\+\=\/\{\}\[\]@#%&\(\)\'\"\’*! \s\r\n+]{20,})$/i;

        if (fullName == "" || fullName == "Enter your Name") {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'full_name_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(fullNameDomObj, message);
            });
            formReturn = false;
        } else if (!fullNameReg.test(fullName)) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'valid_full_name',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(fullNameDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(fullNameDomObj);
        }
        if (email == "" || email == " ") {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'email_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(emailDomObj, message);
            });
            formReturn = false;
        } else if (emailValidate.test(email) == false) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'valid_email',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(emailDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(emailDomObj);
        }
        if (deptId <= 0 || isNaN(deptId)) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'dept_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(deptDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(deptDomObj);

        }
        if (stateId <= 0 || isNaN(stateId)) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'city_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(stateDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(stateDomObj);
        }
        if (description == '' || description == ' ') {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'report_desc_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(descriptionDomObj, message);
            });
            formReturn = false;
        } else if (descReg.test(description) == false) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'valid_desc',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(descriptionDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(descriptionDomObj);
        }
        if (formReturn == true) {
            $("#hot_line_submit").attr('disabled', 'disabled');
            var config = {
                'data': {
                    'site_id': globalConfig.siteId,
                    'lang_id': globalConfig.currentLangId,
                    'full_name': fullName,
                    'email': email,
                    'dept_id': deptId,
                    'transaction_id': transactionId,
                    'state_id': stateId,
                    'location_id': cityId,
                    'description': description,
                    'page_type': pageType
                },
                'source': 'reports/ajax_save_bribe_hot_line',
                'dataType': 'text'
            };
            simpleAjaxCall(config).done(function (data) {
                var jsonObj = jQuery.parseJSON(data);
                if (jsonObj) {
                    // $('#askQuestionToggleBottom').trigger("reset");
                    $('.hotline_email').html(jsonObj.email);
                    $('#thankYou').modal('show');
                    $("#hot_line_submit").attr('disabled', false);
                    // $("#askQuestionToggleBottom .chzn-select-deselect").trigger('chosen:updated');
                    $("[id*='askQuestionToggle']").find(".form-group").removeClass("has-error");
                    $("[id*='askQuestionToggle']").trigger("reset");
                    $("[id*='askQuestionToggle'] .chzn-select-deselect").trigger('chosen:updated');
                    defaultPlaceholder();
                }
                return false;
            });
        }
        return false;

    });
    /* ======== Bribe hotline bottom form How-to details page end ======== */
    /* ======== Bribe hotline top form How-to details page ======== */
    $("form#askQuestionToggleTop").on('submit', function (e) {
        // Prevent form submit
        e.preventDefault();
        var formReturn = true;
        var fullNameDomObj = $('#full-name-top');
        var emailDomObj = $('#email-top');
        var deptDomObj = $('#department_id_top');
        var transDomObj = $('#transaction_id_top');
        var stateDomObj = $('#state_id_top');
        var cityDomObj = $('#city_id_top');
        var descriptionDomObj = $('#description-top');
        var pageType = $("#page_type").val();

        var fullName = $.trim(fullNameDomObj.val());
        var email = $.trim(emailDomObj.val());
        var deptId = Number(deptDomObj.val());
        var transactionId = Number(transDomObj.val());
        var stateId = Number(stateDomObj.val());
        var cityId = Number(cityDomObj.val());
        var description = $.trim(descriptionDomObj.val());

        var emailValidate = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        var fullNameReg = /^([A-Za-z .]){3,200}$/;
        var descReg = /^([0-9a-z#]{1}[a-z0-9.,?$;<>^?:'+–{}\[\]\_\-\+\=\/\{\}\[\]@#%&\(\)\'\"\’*! \s\r\n+]{20,})$/i;

        if (fullName == "" || fullName == "Enter your Name") {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'full_name_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(fullNameDomObj, message);
            });
            formReturn = false;
        } else if (!fullNameReg.test(fullName)) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'valid_full_name',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(fullNameDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(fullNameDomObj);
        }
        if (email == "" || email == " ") {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'email_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(emailDomObj, message);
            });
            formReturn = false;
        } else if (emailValidate.test(email) == false) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'valid_email',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(emailDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(emailDomObj);
        }
        if (deptId <= 0 || isNaN(deptId)) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'dept_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(deptDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(deptDomObj);

        }
        if (stateId <= 0 || isNaN(stateId)) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'state_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(stateDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(stateDomObj);
        }
        if (description == '' || description == ' ') {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'report_desc_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(descriptionDomObj, message);
            });
            formReturn = false;
        } else if (descReg.test(description) == false) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'valid_desc',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(descriptionDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(descriptionDomObj);
        }
        if (formReturn == true) {
            $("#hot_line_submit_top").attr('disabled', 'disabled');
            var config = {
                'data': {
                    'site_id': globalConfig.siteId,
                    'lang_id': globalConfig.currentLangId,
                    'full_name': fullName,
                    'email': email,
                    'dept_id': deptId,
                    'transaction_id': transactionId,
                    'state_id': stateId,
                    'location_id': cityId,
                    'description': description,
                    page_type: pageType
                },
                'source': 'reports/ajax_save_bribe_hot_line',
                'dataType': 'text'
            };
            simpleAjaxCall(config).done(function (data) {
                var jsonObj = jQuery.parseJSON(data);
                if (jsonObj) {
                    // $('#askQuestionToggleTop').trigger("reset");
                    $('.hotline_email').html('');
                    $('.hotline_email').html(jsonObj.email);
                    $('#thankYou').modal('show');
                    $("#hot_line_submit_top").attr('disabled', false);
                    //$("#askQuestionToggleTop .chzn-select-deselect").trigger('chosen:updated');
                    $("[id*='askQuestionToggle']").find(".form-group").removeClass("has-error");
                    $("[id*='askQuestionToggle']").trigger("reset");
                    $("[id*='askQuestionToggle'] .chzn-select-deselect").trigger('chosen:updated');
                    defaultPlaceholder();
                }
                return false;
            });
        }
        return false;
    });
    /* ======== Bribe hotline top form How-to details page end ======== */
    /* ======== Legal assistance form start ======================*/
    $("#legal_asset_form").on('submit', function (e) {
        // Prevent form submit
        e.preventDefault();
        var formReturn = true;
        var fullNameDomObj = $('#full_name');
        var emailDomObj = $('#email');
        var deptDomObj = $('#dept_name');
        var transDomObj = $('#transaction_name');
        var stateDomObj = $('#state_name');
        var cityDomObj = $('#city_name');
        var descriptionDomObj = $('#description');
        var asistType = $('#legal_type');
        var otherType = $('#legal_form_type');
        var mobileNumberObj = $('#mobile_number');
        var report_id = $('#report_id').val();
        var report_type_id = $('#report_type_id').val();
        var fullName = $.trim(fullNameDomObj.val());
        var email = $.trim(emailDomObj.val());
        var deptName = $.trim(deptDomObj.val());
        var transactionName = $.trim(transDomObj.val());
        var stateName = $.trim(stateDomObj.val());
        var cityName = $.trim(cityDomObj.val());
        var description = $.trim(descriptionDomObj.val());
        var asistType = $.trim(asistType.val());
        var otherType = $.trim(otherType.val());
        var mobileNumber = Number(mobileNumberObj.val());

        var emailValidate = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        var fullNameReg = /^([A-Za-z .]){3,200}$/;
        var descReg = /^([0-9a-z#]{1}[a-z0-9.,?$;<>^?:'+–{}\[\]\_\-\+\=\/\{\}\[\]@#%&\(\)\'\"\’*! \s\r\n+]{20,})$/i;
        var mobReg = /^\d{10}$/;
        if (fullName == "" || fullName == "Enter your Name") {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'full_name_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(fullNameDomObj, message);
            });
            formReturn = false;
        } else if (!fullNameReg.test(fullName)) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'valid_full_name',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(fullNameDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(fullNameDomObj);
        }
        if (email == "" || email == " ") {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'email_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(emailDomObj, message);
            });
            formReturn = false;
        } else if (emailValidate.test(email) == false) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'valid_email',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(emailDomObj, message);
                alert(message);

            });
            formReturn = false;
        } else {
            removeError(emailDomObj);
        }
        if (mobileNumber == "" || mobileNumber == " ") {
            addError(mobileNumberObj, 'Enter mobile number');
            formReturn = false;
        } else if (mobReg.test(mobileNumber) == false) {
            addError(mobileNumberObj, 'Enter valid mobile number');
            formReturn = false;
        } else {
            removeError(mobileNumberObj);
        }
        /*if (asistType == "" || asistType == " ") {
            addError(asistType, 'Select assist type');
            formReturn = false;
        } else if (asistType == "Other" || otherType == " ") {
            addError(otherType, 'Enter valid assist type');
            formReturn = false;
        } else {
            removeError(asistType);
            removeError(otherType);
        }*/
        if (description == '' || description == ' ') {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'report_desc_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(descriptionDomObj, message);
            });
            formReturn = false;
        } else if (descReg.test(description) == false) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'valid_desc',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(descriptionDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(descriptionDomObj);
        }
        if (formReturn == true) {
            $("#send-mail-to-leagal-advisor").attr('disabled', 'disabled');
            var config = {
                'data': {
                    'full_name': fullName,
                    'email': email,
                    'dept_name': deptName,
                    'transaction_name': transactionName,
                    'state_name': stateName,
                    'city_name': cityName,
                    'description': description,
                    'mobile_number': mobileNumber,
                    'legal_type': asistType,
                    'legal_form_type': otherType,
                    'report_id': report_id,
                    'report_type_id': report_type_id
                },
                'source': 'reports/legal_form',
                'dataType': 'text'
            };
            console.log(config);
            simpleAjaxCall(config).done(function (data) {
                $('#legalHelpLine').modal('hide');
                $('#thankYouMsg').modal('show');
            });
            return false;
        }

        return false;
    });
    /* ======== ends========*/
    /* ======== Ask a question popup starts ======== */
    /* Get transactions list for Bribe hotline for in How-to detais page */
    $("#department_id_pop").select_on_change({
        target: '#transaction_id_pop' /* id or class where we need to append the dynamic data */
    });
    /* Get cities list for Bribe hotline for in How-to detais page */
    $("#state_id_pop").select_on_change({
        source: 'reports/get_cities_by_state',
        /* url from where we need to fetch the dynamic data */
        target: '#city_id_pop' /* id or class where we need to append the dynamic data */
    });

    $('#askQuestionToggleModalPopup .close').delay(30000).show(0);
    $("form#askQuestionTogglePopup").on('submit', function (e) {
        // Prevent form submit
        e.preventDefault();
        var formReturn = true;
        /* var fullNameDomObj = $('#full-name-pop');
         var emailDomObj = $('#email-pop');*/
        var deptDomObj = $('#department_id_pop');
        var transDomObj = $('#transaction_id_pop');
        /*var stateDomObj = $('#state_id_pop');
        var cityDomObj = $('#city_id_pop');*/
        var descriptionDomObj = $('#description-pop');
        var pageType = $("#page_type_pop").val();

        /*var fullName = $.trim(fullNameDomObj.val());
        var email = $.trim(emailDomObj.val());*/
        var deptId = Number(deptDomObj.val());
        var transactionId = Number(transDomObj.val());
        /* var stateId = Number(stateDomObj.val());
         var cityId = Number(cityDomObj.val());*/
        var description = $.trim(descriptionDomObj.val());

        var emailValidate = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        var fullNameReg = /^([A-Za-z .]){3,200}$/;
        var descReg = /^([0-9a-z#]{1}[a-z0-9.,?$;<>^?:'+–{}\[\]\_\-\+\=\/\{\}\[\]@#%&\(\)\'\"\’*! \s\r\n+]{20,})$/i;

        /*if (fullName == "" || fullName == "Enter your Name") {
            simpleAjaxCall({dataType: 'text', source: 'reports/get_ajax_error_message', data: {label_key: 'full_name_required', current_lang_id: globalConfig.currentLangId}}).done(function (message) {
                addError(fullNameDomObj, message);
            });
            formReturn = false;
        } else if (!fullNameReg.test(fullName)) {
            simpleAjaxCall({dataType: 'text', source: 'reports/get_ajax_error_message', data: {label_key: 'valid_full_name', current_lang_id: globalConfig.currentLangId}}).done(function (message) {
                addError(fullNameDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(fullNameDomObj);
        }*/
        /*if (email == "" || email == " ") {
            simpleAjaxCall({dataType: 'text', source: 'reports/get_ajax_error_message', data: {label_key: 'email_required', current_lang_id: globalConfig.currentLangId}}).done(function (message) {
                addError(emailDomObj, message);
            });
            formReturn = false;
        } else if (emailValidate.test(email) == false) {
            simpleAjaxCall({dataType: 'text', source: 'reports/get_ajax_error_message', data: {label_key: 'valid_email', current_lang_id: globalConfig.currentLangId}}).done(function (message) {
                addError(emailDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(emailDomObj);
        }*/
        if (deptId <= 0 || isNaN(deptId)) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'dept_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(deptDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(deptDomObj);

        }
        /*if (stateId <= 0 || isNaN(stateId)) {
            simpleAjaxCall({dataType: 'text', source: 'reports/get_ajax_error_message', data: {label_key: 'city_required', current_lang_id: globalConfig.currentLangId}}).done(function (message) {
                addError(stateDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(stateDomObj);
        }*/
        if (description == '' || description == ' ') {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'report_desc_required',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(descriptionDomObj, message);
            });
            formReturn = false;
        } else if (descReg.test(description) == false) {
            simpleAjaxCall({
                dataType: 'text',
                source: 'reports/get_ajax_error_message',
                data: {
                    label_key: 'valid_desc',
                    current_lang_id: globalConfig.currentLangId
                }
            }).done(function (message) {
                addError(descriptionDomObj, message);
            });
            formReturn = false;
        } else {
            removeError(descriptionDomObj);
        }
        if (formReturn == true) {
            $("#hot_line_submit_pop").attr('disabled', 'disabled');
            var config = {
                'data': {
                    'site_id': globalConfig.siteId,
                    'lang_id': globalConfig.currentLangId,
                    /*'full_name': fullName,
                    'email': email,*/
                    'dept_id': deptId,
                    'transaction_id': transactionId,
                    /*'state_id': stateId,
                    'location_id': cityId,*/
                    'description': description,
                    'page_type': pageType
                },
                'source': 'reports/ajax_save_bribe_hot_line_without_email',
                'dataType': 'text'
            };
            simpleAjaxCall(config).done(function (data) {
                var jsonObj = jQuery.parseJSON(data);
                $('#askQuesti onToggleModalPopup').modal('hide');
                if (jsonObj) { // $('#askQuestionToggleBottom').trigger("reset");
                    //var email = jsonObj.email;
                    $('.hotline_email').html(jsonObj.email);
                    $('#thankYou').modal('show');

                    $("#hot_line_submit_pop").attr('disabled', false);
                    // $("#askQuestionToggleBottom .chzn-select-deselect").trigger('chosen:updated');
                    $("[id*='askQuestionToggle']").find(".form-group").removeClass("has-error");
                    $("[id*='askQuestionToggle']").trigger("reset");
                    $("#askQuestionToggleModalPopup").modal('hide');
                    $("[id*='askQuestionToggle'] .chzn-select-deselect").trigger('chosen:updated');
                    defaultPlaceholder();
                }
                return false;
            });
        }
        return false;

    });
    /* ======== Ask a question popup starts ======== */
});

function defaultPlaceholder() {
    $(".chosen-single > span").each(function () {
        var placeholderName = $(this).parents(".chosen-container").siblings(".chzn-select-deselect").attr("data-placeholder");
        $(this).html(placeholderName).parent().addClass("chosen-default");
    });
}
/* End of file main-complaint-list.js */
/* Location: ./assets/js/app/complaints/main-complaint-list.js */