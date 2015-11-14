var notify = function () {
    'use strict';
    // 设置基本样式
    var isShadow = true,
        fontSizeSmall = '18px',
        fontSizeBig = '24px',
        delay = 0.3,
        alertSuccess = '#2ecc71',
        alertDanger = '#e74c3c',
        alertWarning = '#f39c12',
        alertInfo = '#3498db',
        alertWrapId = 'notifyWrap',
        alertContentId = 'notifyContent',
        alertTextId = 'notifyText';
    // 创建提示元素
    var alertWrap = document.createElement('div');
    alertWrap.id = alertWrapId;
    alertWrap.style.position = 'fixed';
    alertWrap.style.top = '0';
    alertWrap.style.left = '0';
    alertWrap.style.zIndex = '9999';
    alertWrap.style.width = '100%';
    alertWrap.style.height = 'auto';
    alertWrap.style.display = 'none';
    alertWrap.style.backgroundColor = '#fff';
    alertWrap.style.textAlign = 'center';
    alertWrap.style.cursor = 'default';
    alertWrap.style.MozTransition = '';
    alertWrap.style.WebkitTransition = '';
    alertWrap.style.transition = '';
    var alertContent = document.createElement('div');
    alertContent.id = alertContentId;
    alertContent.style.padding = '20px';
    alertContent.style.display = 'block';
    alertContent.verticalAlign = 'middle';
    alertWrap.appendChild(alertContent);

    // 创建提示内容
    var alertText = document.createElement('span');
    alertText.id = alertTextId;
    alertText.style.color = '#fff';
    if (window.innerWidth <= 600) {
        alertText.style.fontSize = fontSizeSmall;
    } else {
        alertText.style.fontSize = fontSizeBig;
    }
    window.addEventListener('resize',function () {
        if (window.innerWidth <= 600) {
            alertText.style.fontSize = fontSizeSmall;
        } else {
            alertText.style.fontSize = fontSizeBig;
        }
    });
    alertContent.appendChild(alertText);
    document.body.appendChild(alertWrap);
    var height = 0,
        isShow = false,
        timeout0,
        timeout1,
        timeout2,
        clickedCounter = 0;
    function alert(type,message,time) {
        clickedCounter++;
        timeout0 = setTimeout(function () {
            clickedCounter--;
        },(delay*1000+10));
        if (clickedCounter === 1) {
            if (isShow) {
                clearTimeout(timeout1);
                clearTimeout(timeout2);
                hide(function () {
                    show(type,message,time);
                });
            } else {
                show(type,message,time);
            }
        }
    }
    function show(type,message,time) {
        isShow = true;
        var duration = 0;
        if (typeof time === 'undefined') {
            duration = 3000;
        } else if(time < 1) {
            duration = 1000;
        } else {
            duration = time*1000;
        }
        switch (type) {
            case 1:
                alertWrap.style.backgroundColor = alertSuccess;
                break;
            case 2:
                alertWrap.style.backgroundColor = alertWarning;
                break;
            case 3:
                alertWrap.style.backgroundColor = alertDanger;
                break;
            case 4:
                alertWrap.style.backgroundColor = alertInfo;
                break;
            default:

        }
        alertText.innerHTML = message;
        alertWrap.style.top = '-10000px';
        alertWrap.style.display = 'block';
        alertWrap.style.top = '-'+alertWrap.offsetHeight-5+'px';
        timeout1 = setTimeout(function () {
            if (isShadow) {
                alertWrap.style.boxShadow = '0px 0px 10px 0px rgba(0,0,0,0.5)';
            }
            alertWrap.style.MozTransition = 'all ' + delay +'s ease';
            alertWrap.style.WebkitTransition = 'all ' + delay + 's ease';
            alertWrap.style.transition = 'all ' + delay +'s ease';
            alertWrap.style.top = 0;
            timeout2 = setTimeout(function () {
                hide(function () {

                });
            },duration);
        },20);
    }
    function hide(callback) {
        alertWrap.style.top = '-' + alertWrap.offsetHeight - 5 + 'px';
        setTimeout(function() {
            if (isShadow) { alertWrap.style.boxShadow = ''; }
            alertWrap.style.MozTransition = '';
            alertWrap.style.WebkitTransition = '';
            alertWrap.style.transition = '';
            alertWrap.style.top = '-10000px';
            isShow = false;
            callback();

        }, (delay * 1000 + 10));

    }
    return {
        alert: alert
    };

}();
