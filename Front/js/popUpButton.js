$(function () {
    $('.c-ym').datepicker({
        showOnlyMonths: true,
        dateFormat: "yy/mm"
    });
});
let app = {};

$('.p-anchor01 a[href*="#"]').click(function () {
    var elmHash = $(this).attr('href');
    var pos = $(elmHash).offset().top - 55;
    $('body,html').animate({ scrollTop: pos }, 500);
    return false;
});


app.modal = {};

app.modal.open = function (modalId) {
    $(modalId).closest('.l-modal').addClass('is-visible');
    $('body').css('overflow-y', 'hidden'); 
};

app.modal.close = function (modalId) {
    $(modalId).closest('.l-modal').removeClass('is-visible');
    $('body').css('overflow-y', 'auto'); 
};

$(function () {
    $(document).on('click', '.l-modal__close, .l-modal__close-btn', function (e) {
        const modalId = '#' + $(this).closest('.l-modal').prop('id');
        app.modal.close(modalId);
        e.stopPropagation();
        return false;
    });
});

$(function () {
    $('.l-pagetop').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    $(window).on('scroll', function () {
        var sc = $(this).scrollTop();
        if (sc > 10) {
            $('.l-pagetop').addClass('is-active');
        } else {
            $('.l-pagetop').removeClass('is-active');
        }
    });

    $(document).on('change', '.c-form-file input:file', function () {
        if ($(this).val() === '') {
            $(this).siblings('.c-form-file__value').text('');
        } else {
            const files = $(this).prop('files');
            let filesArray = [];
            for (let i = 0; i < files.length; i++) {
                filesArray.push(files[i].name);
            }
            $('.c-form-file__value').text(filesArray.join(', '));
        }
    });

    var ddArea = $('.c-form-file-drop');
    ddArea.on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).addClass('is-over');
    });
    ddArea.on('dragleave', function (e) {
        e.stopPropagation();
        e.preventDefault();
        ddArea.removeClass('is-over');
    });
    ddArea.on('drop', function (e) {
        e.preventDefault();
        ddArea.removeClass('is-over');
    });

    $('a.l-nav__link.is-drawer').on('click', () => {
        // $('a.l-nav__link.is-drawer').on('click', (e) => {
        $('.l-nav__item').removeClass('menu-open');
        // sessionStorage.gloval_isactive = $(e.currentTarget).data('cat');
        $('.nav-treeview.l-nav__cat').hide();
        $('.table').css('width', '100%');
    });
    const $body = $('body');
    $('.sidebar .l-nav__item').on('click', () => {
        if ($('body').hasClass('sidebar-collapse')) {
            $body.removeClass('sidebar-collapse');
            $('.table').css('width', '100%');
        }
    });
});

$(function () {
    const parent = $('.js-radio');
    let text = parent.find('input[name=ymd]');
    let mailParent = parent.find('.js-mail');
    let radioMail = mailParent.find('fieldset');
    let mailFlg = false;

    parent.find('input[name=student_submit]:radio').change(function () {
        let radioValue = parent.find('input[name=student_submit]:checked');
        if (radioValue.val() === 'on') {

            text.prop('disabled', false);
            if (mailFlg) {
                mailParent.removeClass('u-event-none');
                radioMail.prop('disabled', false);

            }
        } else {
            text.prop('disabled', true);
            radioMail.prop('disabled', true);
            console.log("hoge");
            if (!mailParent.hasClass('u-event-none')) {
                mailParent.addClass('u-event-none');
            }

        }

    });

    $(text).change(function () {
        if (text.val() != "") {
            let textDate = text.val().split('/');
            let date = new Date(Number(textDate[0]), Number(textDate[1]) - 1, Number(textDate[2]));
            let todayDate = new Date(new Date().toDateString());
            let termDay = (date - todayDate) / 86400000;
            // 日付差
            if (termDay >= 8) {
                radioMail.prop('disabled', false);
                mailParent.removeClass('u-event-none');
                mailFlg = true;
            } else {
                radioMail.prop('disabled', true);
                if (!mailParent.hasClass('u-event-none')) {
                    mailParent.addClass('u-event-none');
                }
                mailFlg = false;
            }
        }
    });

});


$('td:has(input[type=checkbox])').on('click', function (e) {
    let checkBox = $(this).find('input[type=checkbox]');
    checkBox.prop('checked', !checkBox.prop('checked'));
    checkBox.trigger('change');
});
$('th:has(input[type=checkbox])').on('click', function (e) {
    let checkBoxTh = $(this).find('input[type=checkbox]');
    checkBoxTh.prop('checked', !checkBoxTh.prop('checked'));
    checkBoxTh.trigger('change');
});

$(function () {
    $('#check-all').on('click', function () {
        $("input[name='chk[]']").prop('checked', this.checked);
    });
    $("input[name='chk[]']").on('click', function () {
        if ($('.boxes :checked').length == $('.boxes :input').length) {
            $('#check-all').prop('checked', true);
        } else {
            $('#check-all').prop('checked', false);
        }
    });
    //table
    $('#check-all-table').on('change', function () {
        $("input[name='chk-table[]']").prop('checked', this.checked);
    });
    $("input[name='chk-table[]']").on('change', function () {
        if ($('#boxes-table :checked').length == $('#boxes-table :input').length) {
            $('#check-all-table').prop('checked', true);
        } else {
            $('#check-all-table').prop('checked', false);
        }
    });
});



app.getDeviceType = function () {
    if (window.innerWidth < 600) {
        return 'sp';
    } else if (window.innerWidth < 769) {
        return 'tabS';
    } else if (window.innerWidth < 1025) {
        return 'tab';
    } else {
        return 'pc';
    }
};


$(function () {
    $('.p-theme-filter > h2').on('click', function () {
        const modal = $(this).closest('.p-list-add');
        const filter = modal.find('.p-theme-filter');
        const curHeight = filter.height();
        const autoHeight = filter.css('height', 'auto').height();

        modal.toggleClass('is-open-filter');
        if (modal.hasClass('is-open-filter') === true) {
            filter.height(curHeight).animate({ height: autoHeight }, 200);
        } else {
            filter.animate({ height: 40 }, 200);
        }
    });


    $(window).on('resize', function () {
        $('.p-list-add').removeClass('is-open-filter');

        if (app.getDeviceType() === 'pc') {
            $('.p-theme-filter').css('height', 'auto');
        } else {
            $('.p-theme-filter').css('height', 40);
        }
    });
});


$(function () {
    $('.p-selected-theme > h2').on('click', function (e) {
        $(this).closest('.p-list-add').toggleClass('is-open-selected');
        e.stopPropagation();
        return false;
    });

    $('.p-list-add .l-modal__container').on('click', function (e) {
        if ($('.p-list-add ').hasClass('is-open-selected') === true) {
            $(this).closest('.p-list-add').removeClass('is-open-selected');
            e.stopPropagation();
            return false;
        }
    });

    $('.p-selected-theme').on('click', function (e) {
        e.stopPropagation();
        return false;
    });
});


$(function () {

    $(document).on('click', '.p-theme-filter__clear', function (e) {
        $('.p-theme-filter__conditions input:checkbox').prop('checked', false);
    });


    $(document).on('click', '.p-selected-theme__delete', function (e) {
        const themeId = $(this).data('themeId');
        $(this).closest('li').remove();

        
        const tgt = $('.p-theme-card[data-themeId="' + themeId + '"]');
        tgt.find('.p-theme-card__check input').prop('checked', false);
    });
});

$('.p-theme-card-list').each(function () {
    for (let i = 0; i < 20; i++) {
        $('<li class="is-filler">').appendTo(this);
    }
});

jQuery(function (a) {
    a(".js-accordion-trigger").click(function () {
        a(this).children("dt").toggleClass("is-active-accordion");
        a(this).children("dd").slideToggle()
    })
});

$(window).on("load resize", function () {
    $('.table').css('width', '100%');
});

$('#select-extract').on('change', () => {
    const selectVal = $('#select-extract').val();
    if (selectVal === '選択してください') {
        $('fieldset').prop('disabled', true);
    } else {
        $('fieldset').prop('disabled', false);
    }
})

$('#select-theme').on('change', (e) => {
    const selectVal = $('#select-theme').val();
    const themeFieldModal1 = $(e.target).parents('.select-theme-modal').find('fieldset');
    if (selectVal === '1') {
        themeFieldModal1.prop('disabled', true);
    } else {
        themeFieldModal1.prop('disabled', false);
    }
})

$(function () {
    $('.btn-clear').on('click', function (e) {
        const themeFieldModal = $(e.target).parents('.p-form01').find('fieldset');
        themeFieldModal.prop('disabled', true);
        // $('.p-form01').find('input[type=checkbox]').prop('checked',false);
        $('.p-form01 input[type="checkbox"]').removeAttr("checked").prop("checked", false).change();
    })
});
const value1 = $('.input-theme').val();
const value2 = $('.input-theme2').val();
const themeFieldModal = $('.p-form01 .input-theme-modal').find('fieldset');
function check(value1, value2) {
    flg = false;
    if (value1 !== '' || value2 !== "") {
        flg = true;
    }
    return flg;
}
$('.input-theme , .input-theme2').on('keyup', () => {
    const result = check();
    if (result) {
        themeFieldModal.prop("disabled", false);
    } else {
        themeFieldModal.prop("disabled", true);
    }
    $('.input-theme , input-theme2').trigger('keyup');
})

$('input[name="card-checkbox"]').on('change', (e) => {
    const themeField = $(e.target).parents('.p-theme-card').find('fieldset');
    themeField.prop('disabled', !themeField.prop('disabled'));
});
