function mOver(num) {
    document.images['link' + num].src = eval('active' + num + '.src');

}

function mOut(num) {
    document.images['link' + num].src = eval('normal' + num + '.src');
}

if (document.images) {
    normal1 = new Image(190, 29);
    normal1.src = "../Оболочка/images/01a.gif";
    active1 = new Image(190, 29);
    active1.src = "../Оболочка/images/01p.gif";

    normal2 = new Image(190, 29);
    normal2.src = "../Оболочка/images/02a.gif";
    active2 = new Image(190, 29);
    active2.src = "../Оболочка/images/02p.gif";

    normal21 = new Image(190, 29);
    normal21.src = "../Оболочка/images/02a_1.gif";
    active21 = new Image(190, 29);
    active21.src = "../Оболочка/images/02p_1.gif";

    normal22 = new Image(190, 29);
    normal22.src = "../Оболочка/images/02a_2.gif";
    active22 = new Image(190, 29);
    active22.src = "../Оболочка/images/02p_2.gif";

    normal3 = new Image(190, 29);
    normal3.src = "../Оболочка/images/03a.gif";
    active3 = new Image(190, 29);
    active3.src = "../Оболочка/images/03p.gif";

    normal31 = new Image(190, 29);
    normal31.src = "../Оболочка/images/03a_1.gif";
    active31 = new Image(190, 29);
    active31.src = "../Оболочка/images/03p_1.gif";

    normal32 = new Image(190, 29);
    normal32.src = "../Оболочка/images/03a_2.gif";
    active32 = new Image(190, 29);
    active32.src = "../Оболочка/images/03p_2.gif";

    normal33 = new Image(190, 29);
    normal33.src = "../Оболочка/images/03a_3.gif";
    active33 = new Image(190, 29);
    active33.src = "../Оболочка/images/03p_3.gif";

    normal34 = new Image(190, 29);
    normal34.src = "../Оболочка/images/03a_4.gif";
    active34 = new Image(190, 29);
    active34.src = "../Оболочка/images/03p_4.gif";

    normal35 = new Image(190, 29);
    normal35.src = "../Оболочка/images/03a_5.gif";
    active35 = new Image(190, 29);
    active35.src = "../Оболочка/images/03p_5.gif";

    normal36 = new Image(190, 29);
    normal36.src = "../Оболочка/images/03a_6.gif";
    active36 = new Image(190, 29);
    active36.src = "../Оболочка/images/03p_6.gif";

    normal37 = new Image(190, 29);
    normal37.src = "../Оболочка/images/03a_7.gif";
    active37 = new Image(190, 29);
    active37.src = "../Оболочка/images/03p_7.gif";

    normal4 = new Image(190, 29);
    normal4.src = "../Оболочка/images/04a.gif";
    active4 = new Image(190, 29);
    active4.src = "../Оболочка/images/04p.gif";

    normal5 = new Image(190, 29);
    normal5.src = "../Оболочка/images/05a.gif";
    active5 = new Image(190, 29);
    active5.src = "../Оболочка/images/05p.gif";

    normal6 = new Image(190, 29);
    normal6.src = "../Оболочка/images/06a.gif";
    active6 = new Image(190, 29);
    active6.src = "../Оболочка/images/06p.gif";

    normal7 = new Image(190, 29);
    normal7.src = "../Оболочка/images/07a.gif";
    active7 = new Image(190, 29);
    active7.src = "../Оболочка/images/07p.gif";

    normal8 = new Image(190, 29);
    normal8.src = "../Оболочка/images/08a.gif";
    active8 = new Image(190, 29);
    active8.src = "../Оболочка/images/08p.gif";
}

var hidePostImg = false;

function initPost(context) {
    initSpoilers(context);
}

function initPostImages(context) {
    if (hidePostImg) return;
    var $in_spoilers = $('div.sp-body var.postImg', context);
    $('var.postImg', context).not($in_spoilers).each(function () {
        var $v = $(this);
        var src = $v.attr('title');
        var $img = $('<img src="' + src + '" class="' + $v.attr('className') + '" alt="pic" />');
        $img = fixPostimage($img);
        var maxW = ($v.hasClass('postImgAligned')) ? postImgAligned_MaxWidth : postImg_MaxWidth;
        $img.bind('click', function () {
            return imgFit(this, maxW);
        });
        if (user.opt_js.i_aft_l) {
            $('#preload').append($img);
            $v.html(loading_icon);
            if ($.Browser.msie) {
                $v.after('<wBr>');
            }
            $img.one('load', function () {
                imgFit(this, maxW);
                $v.empty().append(this);
            });
        } else {
            $img.one('load', function () {
                imgFit(this, maxW)
            });
            $v.empty().append($img);
            if ($.Browser.msie) {
                $v.after('<wBr>');
            }
        }
    });
}

function initSpoilers(context) {
    $('div.sp-body', context).each(function () {
        var $sp_body = $(this);
        var name = $.trim(this.title);
        this.title = '';
        var $sp_head = $('<div class="sp-head folded clickable">' + name + '</div>');
        $sp_head.insertBefore($sp_body).click(function (e) {
            if (!$sp_body.hasClass('inited')) {
                initPostImages($sp_body);
                var $sp_fold_btn = $('<div class="sp-fold clickable"></div>').click(function () {
                    $.scrollTo($sp_head, {duration: 200, axis: 'y', offset: -200});
                    $sp_head.click().animate({opacity: 0.1}, 500).animate({opacity: 1}, 700);
                });
                $sp_body.prepend('<div class="clear"></div>').append('<div class="clear"></div>').append($sp_fold_btn).addClass('inited');
            }
            if (e.shiftKey) {
                e.stopPropagation();
                e.shiftKey = false;
                var fold = $(this).hasClass('unfolded');
                $('div.sp-head', $($sp_body.parents('td')[0])).filter(function () {
                    return $(this).hasClass('unfolded') ? fold : !fold
                }).click();
            } else {
                $(this).toggleClass('unfolded');
                $sp_body.slideToggle('fast');
            }
        });
    });
}
