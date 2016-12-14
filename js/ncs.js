// NCS for Plug.dj (PORT)

// NCSTheme URI: https://rawgit.com/bentenz5/NCS_PlugDj/master/NCSTheme.css

var svo = document.getElementsByClassName('.s-vo');

function fixvideo() {
    if ($('#room').hasClass("video-only")) {
        // If in video-only mode
        $('#vote').addClass('voteVO');
        $('#woot').addClass('wootVO');
        $('#grab').addClass('grabVO');
        $('#meh').addClass('mehVO');
    } else {
        // If not in video only mode
        $('#vote').removeClass('voteVO');
        $('#woot').removeClass('wootVO');
        $('#grab').removeClass('grabVO');
        $('#meh').removeClass('mehVO');
    }
}

window.onload = function () {
    $('.s-vo').attr('onclick', 'fixvideo');
    checkUsers();
    fixvideo();
}

var mut = new MutationObserver(function (mutation) {
    if (mutation[0].target.id === 'room')fixvideo();
});

mut.observe(document.querySelector("#room"), {attributes: true});

// INIT

var loading = true;

function notif(msg) {
    $('.ncsLoaderNotification').remove();
    $('#toast-notifications').append('<div class="notification ncs-notif-old ncsLoaderNotification" style="opacity: 1;"><div class="left"><i class="icon icon-about-white"></i></div><div class="right"><span style="top: 33.5px;">' + msg + '</span></div>');
    setTimeout(function () {
        $('.ncsLoaderNotification').remove();
    }, 5000);
}

function notifLong(msg) {
    $('.ncsLoaderNotification').remove();
    $('#toast-notifications').append('<div class="notification ncs-notif-old ncsLoaderNotification" style="opacity: 1;"><div class="left"><i class="icon icon-about-white"></i></div><div class="right"><span style="top: 33.5px;">' + msg + '</span></div>');
    setTimeout(function () {
        $('.ncsLoaderNotification').remove();
    }, 15000);
}

// IMPORT THAS ANGULAR.JS DAMN IT
//Angular should already be loaded by the loader javascript:(function(){$.getScript('https://ncs-pdj-bentenz5.c9users.io/ncs/ncs-loader.js')}());
/*setTimeout(function() {
 $('head').append('<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>');
 }, 5000);*/

var errorMsg = "It appears NCS is already running! If this is not the case please refresh and try again. If it still doesn't work, report this on github."

if (typeof NCSload !== 'undefined') {
    $('#chat-messages').append('<center style=color:#A77DC2 class="cm mention">' + errorMsg + '</center');
} else {
    var NCSload = true;
    var version = "0.0.8";
    var buildnumber = "00013";
    var versionMsg = "No, but better. :P";
    var ncApiKey = "6R9fc29cMLw615PBv98u072430tZ3E9c";
    var startUpMsg = "Welcome to NCS version " + version + " | " + versionMsg + "<br>";
    var newFeaturesMsg = "<a href='https://github.com/Satskhi/ScriptTest/blob/master/changelog.md' target='_blank'>Click here for the Changelog</a>";
    var alertMsg = "This is a BETA build. It will buggy and likely missing a literal ton of features. Also the nekos may avoid you... ;_;";
    // OBSOLETE hiddenChat = false;

// INIT STUFFS


//function init() {

    //if(loading === true) {
    //	$('#toast-notifications').append('<div class="notification ncs-notif-old ncsLoaderNotification" style="opacity: 1;"><div class="left"><i class="icon icon-about-white"></i></div><div class="right"><span style="top: 33.5px;">Loading NCS... Please wait...</span></div>');
    //}

    //if(loading === false) {
    //	$('.ncsLoaderNotification').remove();
    //	$('#toast-notifications').append('<div class="notification ncs-notif-old ncsLoaderNotification" style="opacity: 1;"><div class="left"><i class="icon icon-about-white"></i></div><div class="right"><span style="top: 33.5px;">NCS Version ' + version + ' loaded successfully!</span></div>');
    //	setTimeout(function() {
    //		$('.ncsLoaderNotification').remove();
    //	}, 5000);
    //}
//}

//init();

    // Update Check
    function updateCheck() {
        $.ajax({
            type: "GET",
            url: "https://rawgit.com/Satskhi/ScriptTest/master/latest.json"
        }).done(function (data) {
            if (data.version != version) {
                // notifLong("NCS has been updated! Refresh your page to get the latest update! | Current Version: " + version + " | New Version: " + data.version + " | <a href='" + data.changelog + "' target='_blank'>Changelog</a>");
                $('#chat-messages').append('<center style=color:#A77DC2 class="cm ncs-broadcast"><div class="mdi mdi-alert msg"></div> NCS has updated! Refresh your page to get the latest update!<br> <a href="' + data.changelog + '" target="_blank">Changelog</a> | New version: ' + data.version + '</center>');
                console.log("[NCS] Update available");
                //init();
            } else {
                console.log("[NCS] Up to date!");
                //init();
            }
        });
    }

    updateCheck();
    var updateInterval = setInterval(function () {
        updateCheck();
    }, 1800000);
}

// NCS Styles
$('head').append('<link href="https://rawgit.com/Satskhi/ScriptTest/master/css/ncs.css" rel="stylesheet" type="text/css">');
$('head').append('<link href="https://rawgit.com/Satskhi/ScriptTest/master/css/menu.css" rel="stylesheet" type="text/css">');


// Show Startup Messages
$('#chat-messages').append('<center style=color:#A77DC2 class="cm ncs-greet">' +
    [startUpMsg, newFeaturesMsg, alertMsg].join('<br>') + '</center>');

API.on(API.CHAT, afk);

var ncssettings = $.extend({
    autolike: false,
    eta: false,
    cbackground: false,
    backgroundurl: '',
    autojoin: false,
    customThemeEnabled: false,
    desktopnotifications: false,
    moderatorsongdurationalert: true,
    djalert: true,
    dlBtn: true,
    loaded: false,
    preventNavigation: false
}, (JSON.parse(localStorage.getItem('ncs-settings')) || {}));

console.info((JSON.parse(localStorage.getItem('ncs-settings')) || {}));

window.onbeforeunload = function (e) {
    localStorage.setItem('ncs-settings', JSON.stringify(ncssettings));
};

$(window).on('beforeunload', function () {
    // Remove the cookie
    var NCSLoad = false;
    // delete localStorage.NCSload;
});

// Functions and Stuffs

// PDJ Video MP3 Downloader
function grabVidId() {
    var playersrc = API.getMedia().cid;
    return playersrc;
}

function redir(uri) {
    window.open(uri);
}

function downloadThasShit() {
    //var playersrc = grabVidId();
    window.open("https://embed.yt-mp3.com/watch?v=" + API.getMedia().cid);
    console.log("[NCS] Downloaded Video!");
}

function downloadThasShitV2() {
    var uri = "https://youtube.com/watch?v=" + API.getMedia().cid;
    window.open('https://www.youtubeinmp3.com/fetch/?video=' + uri);
}

// MENU
var NCS = (function () {
    var models = {
        'tab': `<div id="ncs-menu-button" class="header-panel-button ncs-tab">
                    <span class="icon-info ncs-menu-button-info">NCS</span>
                </div>`,
        menu: `<div id="ncs-menu" style="display:none">
                <div class="ncs-menu-header list-header"><span class="title">NCS Settings</span></div>
                <div class="list staff jspScrollable" style="top: 40px !important; overflow: hidden; padding: 0px; outline: none; width: 345px; height: ${$(document).height() - 148}px" tabindex="0">
                    <div class="jspContainer" style="overflow: scroll; width: 340px; top:5px; height:${$(document).height() - 153}px">
                        <div class="jspPane" style="padding: 0px; top: 0px; left: 0px; width: 331px;">
                            <div class="group">
                                <div class="user ncs-menu-item item" id="ncs-woot-toggle" onclick="runautolike();">
                                    <i class="icon icon-check-blue ncs-menu-icon"></i>
                                    <span class="name ncs-menu-span" id="ncs-woot-toggle">Auto-Woot</span>
                                </div>
                                <div class="user ncs-theme-toggle ncs-menu-item item" onclick="ncsThemeShit();">
                                    <i class="icon icon-check-blue ncs-menu-icon"></i>
                                    <span class="name ncs-menu-span">NCS Custom Theme</span>
                                </div>
                                <div class="user ncs-join-toggle ncs-menu-item" onclick="runautojoin()">
                                    <i class="icon icon-check-blue ncs-menu-icon"></i>
                                    <span class="name ncs-menu-span">Auto-Join</span>
                                </div>
                                <div class="user ncs-eta-toggle ncs-menu-item" onclick="toggleEta()">
                                    <i class="icon icon-check-blue ncs-menu-icon"></i>
                                    <span class="name ncs-menu-span">ETA</span>
                                </div>
                                <div class="user ncs-dl-toggle ncs-menu-item" onclick="toggleDlBtn()">
                                    <i class="icon icon-check-blue ncs-menu-icon"></i>
                                    <span class="name ncs-menu-span">Download Button</span>
                                </div>
                                <div class="user ncs-bg-toggle ncs-menu-item" onclick="backgroundSelect()">
                                    <i class="icon icon-check-blue ncs-menu-icon"></i>
                                    <span class="name ncs-menu-span">Custom Background</span>
                                </div>
                                <div class="user ncs-accnav-toggle ncs-menu-item" onclick="toggleNavigation();">
                                    <i class="icon icon-check-blue ncs-menu-icon"></i>
                                    <span class="name ncs-menu-span">Accidental Navigation Prevention</span>
                                </div>
                                <div class="user ncs-update-btn ncs-menu-item" onclick="updateCheck();">
                                    <i class="icon icon-check-blue ncs-menu-icon"></i>
                                    <span class="name ncs-menu-span">Check for Updates</span>
                                </div>
                                <div class="user ncs-donate-btn ncs-menu-item" onclick="redir('https://paypal.me/CSxKING');">
                                    <i class="icon icon-check-blue ncs-menu-icon"></i>
                                    <span class="name ncs-menu-span">Donate to NCS!</span>
                                </div>
                                <div class="user ncs-report-btn ncs-menu-item" onclick="redir('https://github.com/bentenz5/NCS_PlugDj/issues')">
                                    <i class="icon icon-check-blue ncs-menu-icon"></i>
                                    <span class="name ncs-menu-span">Found an issue? Report it here!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    };

    $('#header-panel-bar').append(models.tab);
    $('#header-panel-bar').click(function () {
        setTimeout(function () {
            if (!$('#ncs-menu-button').hasClass('selected')) {
                $('#ncs-menu').hide();
            }
        })
    });
    $('#ncs-menu-button').click(function () {
        if (!$('#ncs-menu-button').hasClass('selected')) {
            $(".header-panel-button").removeClass('selected')
            $('#ncs-menu-button').addClass('selected');
            $('.app-right').children().hide();
            $('#ncs-menu').show();
        }
    });

    $('#meh').removeClass('disabled');

    $('.app-right').append(models.menu);

    $('#room').append('<span id="loli-counter">Loli count: 0</span>');
    var lolis = 0;
    API.on(API.CHAT, function (msg) {
        lolis += (msg.message.match(/loli/g) || []).length;
        $('#loli-counter').text('Loli count: ' + lolis);
        // Developer Icon
        if ([4404760, 5751501, 4881577].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('ncs-developer')).children('.msg')).children('.from').prepend('<i title="NCS Developer" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/uerI4EX.png\')">')
        }
        // VIP Icon
        if ([4537120].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('ncs-vip')).children('.msg')).children('.from').prepend('<i title="NCS VIP" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/K9qSqOX.png\')">')
        }
        // Donator Icon
        if ([5371972].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('ncs-vip')).children('.msg')).children('.from').prepend('<i title="NCS Donator" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/naLYLHV.png\')">')
        }
        // Kidyeon Gif
        if ([5371972].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('ncs-vip')).children('.msg')).children('.from').prepend('<i title="Wizardly Editor" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/7m5XynH.gif\')">')
        }
    });

    var tab = $('.dash .tray').append(models.tab);
    var back = $('#app-right').append(models.back);

    back.find('.item').append('<i class="mdi mdi-check"></i>');
    back.find('.editable').append('<i class="mdi mdi-pencil"></i>');
    //destroys friendlist
    //back.find('.header').append('<i class="mdi mdi-puzzle"></i>');

    this.elements = new (function () {

    });

    this.hideVideo = function () {

    }
    back.find('.item .hide-video').on('click', this.hideVideo);

})();


function afk(data) {
    var setafk = null;
    if (setafk === true && cd === false && data.message.indexOf('@' + API.getUser().username) !== -1) {
        API.sendChat('@' + data.message + ' [AFK] ' + afkmsg);
        cooldown();
    }
}

var prevafkmsg;
function saveResponse() {
    prevafkmsg = afkmsg;
    afkmsg = $('#afk-response').val();
    $('#afk-response').val('');
    if (afkmsg === "") {
        afkmsg = prevafkmsg;
    }
    hideNotif();
}

$('#ncs-menu').append('<span id="ncsusers">0 people using NCS in 0 rooms!</span>');

function cooldown() {
    cd = true;
    setTimeout(function () {
        cd = false;
    }, 10000);
}

function runafk() {
    if (setafk === true) { //AFK OFF
        $('#afk-responder').removeClass('active');
        $('#chat-input-field').prop('disabled', false);
        $('#chat-input-field').attr("placeholder", "Type a message and hit enter.");
        setafk = false;
    }
    else if (setafk === false) { //AFK ON
        $('#afk-responder').addClass('active');
        $('#chat-input-field').prop('disabled', true);
        $('#chat-input-field').attr("placeholder", "Disable your AFK Responder to chat!");
        setafk = true;
    }
}

function NCSafkResponseChanger() {
    showNotif('notif-afk-message');
}

if (ncssettings.autolike === true) {
    runautolike();
}

setInterval(function () {
    $('#vote').css('width', '350px');
}, 500);

function runautolike() {
    if (ncssettings.autolike === false) {
        $('#ncs-woot-toggle').children('.ncs-menu-icon').show();
        console.info('[NCS] Autolike Enabled.');
        $('#auto-woot').addClass('active');
        $('#woot').click();
        API.on(API.ADVANCE, callback);
        function callback(obj) {
            $('#woot').click();
            console.info('[NCS] Wooted track');
        }

        ncssettings.autolike = true;
    } else {
        $('#ncs-woot-toggle').children('.ncs-menu-icon').hide();
        console.info('[NCS] Autolike Disabled.');
        ncssettings.autolike = false;
    }
}


function downloadMP3() {
    $.getScript("https://musiqpad-ncs-bentenz5.c9users.io/musiqpad_port/modules/dl_mp3.js");
}

if (ncssettings.autojoin === true) {
    ncssettings.autojoin = false;
    runautojoin();
}

function customBackground() {
    if (ncssettings.cbackground === true) {

    }
}

function toggleEta() {
    if (ncssettings.eta === true) {
        $('.ncs-eta-toggle').children('.ncs-menu-icon').hide();
        ncssettings.eta = false;
        console.info('[NCS] Disabled ETA.');
    } else {
        $('.ncs-eta-toggle').children('.ncs-menu-icon').show();
        ncssettings.eta = true;
        console.info('[NCS] Enabled ETA.');
    }
}

function djAlert() {
    if (ncssettings.djalert === true) {
        console.log('[NCS] DJ Alert Enabled.');
        // If its enabled.
        API.on(API.advance, callback);
        function callback(obj) {
            djpos = API.getWaitListPosition();
            if (djpos === 0) {
                console.log('[NCS] User is next in line. Alerting.');
            }
        }
    } else {
        console.log('[NCS] DJ Alert Disabled.');
        // If its not enabled.

    }
}

function runautojoin() {
    if (ncssettings.autojoin === false) {
        $('.ncs-join-toggle').children('.ncs-menu-icon').show();
        ncssettings.autojoin = true;
        setInterval(function () {
            var pos = API.getWaitListPosition() + 1;
            if (API.getWaitList().length < 50 && pos <= 1) {
                if (pos <= 1) {
                    console.info('[NCS] User is either DJ or not in waitlist. Attempting to join.');
                    API.djJoin();
                } else if (pos >= 1) {
                    console.info('[NCS] User is still in waitlist at pos ' + pos + '. Waiting.');
                }
            } else {
                // console.warn('[NCS] Waitlist full. Waiting.');
            }
        }, 1000);
    } else if (ncssettings.autojoin === true) {
        $('.ncs-join-toggle').children('.ncs-menu-icon').hide();
        ncssettings.autojoin = false;
    }
}
function songAdvance() {
    if (ncssettings.autolike) {
        if (!$('#woot').hasClass('selected') && !$('#meh').hasClass('selected') && $('#woot').hasClass('active')) {
            $('#woot').click();
        }
    }
    if (ncssettings.autojoin === true && API.getWaitListPosition() === -1) {
        API.djJoin();
    }
}

$('#room-bg').append('<div id="newbg"></div>');
function changeBackground() {
    showNotif('notif-background');
    $('#background-input').val(ncssettings.backgroundurl);
}

if (ncssettings.cbackground === true) {
    ncssettings.cbackground = false;
    applyBackground();
}

function backgroundSelect() {
    if (ncssettings.cbackground === false) {
        console.info('[NCS] Custom Background Enabled.');
        var bgfile = prompt('Enter the link to a background. A resolution of 1600x900 is recomended.', 'https://i.imgur.com/EFXFnql.png');
        ncssettings.backgroundurl = bgfile;
        $('.room-background').css("background-image", " url('" + ncssettings.backgroundurl + "')");
        $('.ncs-bg-toggle').children('.ncs-menu-icon').show();
        ncssettings.cbackground = true;
    } else {
        console.info('[NCS] Custom Background Disabled.');
        $('.ncs-bg-toggle').children('.ncs-menu-icon').hide();
        ncssettings.cbackground = false;
        $('.room-background').css("background-image", "url('https://cdn.plug.dj/_/static/images/community/background.ea778295-651f-4bb8-bc2f-9fa7e6a81876.jpg')");
    }
}

function applyBackground() {
    if (ncssettings.cbackground === false) {
        $('.ncs-bg-toggle').children('.ncs-menu-icon').show();
        $('.room-background').css("background-image", " url('" + ncssettings.backgroundurl + "')");
        ncssettings.cbackground = true;
    }
    else {
        $('.ncs-bg-toggle').children('.ncs-menu-icon').hide();
        $('.room-background').css("background-image", "https://cdn.plug.dj/_/static/images/community/background.892bc86f530eb3f7a53a2cc60f0c0be481798175.jpg");
        ncssettings.cbackground = false;
    }
}

API.on(API.ADVANCE, checkUsers);
function checkUsers() {
    // This checks how many users on plug are using NCS and puts it in the menu.
    $.getJSON('https://ncs.fuechschen.org/plug', function (data) {
        document.getElementById('ncsusers').innerHTML = data.users + " people using NCS in " + data.rooms + " rooms!";
    })
}

// Theme Shit

ncssettings.customThemeEnabled = false;

function ncsThemeShit() {
    if (ncssettings.customThemeEnabled === false) {
        $('.ncs-theme-toggle').children('.ncs-menu-icon').show();
        setTimeout(function () {
            $('head').append('<link id="NCSTheme" rel="stylesheet" href="https://rawgit.com/Satskhi/ScriptTest/master/css/NCSTheme.css" type="text/css" />');
            $('.room-background').css('background-image','url(\'https://i.imgur.com/EFXFnql.png\')')
        }, 500);
        ncssettings.customThemeEnabled = true;
    }
    else {
        $('.ncs-theme-toggle').children('.ncs-menu-icon').hide();
        $('#NCSTheme').remove();
        ncssettings.customThemeEnabled = false;
    }
}

//ETA
function readable(total) {
    var hours = ~~(total / 3600);
    var minutes = (~~(total / 60)) % 60;
    var seconds = total % 60;
    return normalize(hours) + ':' + normalize(minutes) + ':' + normalize(seconds);
}
function normalize(number) {
    var addition = (number < 10
        ? '0'
        : '');
    return addition + number;
}

var etaAppend = 0;

var eta1 = null;
$('#dj-button').append('<span id="etacount">ETA: undefined</span>');
var ETAInterval = setInterval(function () {
    var position = API.getWaitListPosition()
    position = (position < 0) ? API.getWaitList().length : position;
    var eta = ~~((position * (3.5 * 60)) + (API.getTimeRemaining()));
    if (ncssettings.eta === true) {
        $('#etacount').show();
        eta1 = eta;
        $('#dj-button').attr('data-eta', 'ETA: ' + readable(eta));
        $('#etacount').html('ETA: ' + readable(eta1));
        $('#vote').css('width', '350px');
    } else {
        $('#etacount').hide();
    }
}, 1000);


// Fullscreen-Video fix
if ($('#room').hasClass('video-only')) {
    console.warn('[NCS] Video-Only mode is Enabled! Applying fix!');
    $('#room').removeClass('video-only');
    setTimeout(function () {
        $('#room').addClass('video-only');
    }, 500);
} else {
    console.info('[NCS] Video-Only Mode is not Enabled! No fix required!');
}

if (ncssettings.eta === true) {
    ncssettings.autojoin = false;
    runeta();
}

var eta = "";

function runeta() {
    if (ncssettings.eta === false) {
        $('#eta').addClass('active');
        ncssettings.eta = true;
    }
    else {
        $('#eta').removeClass('active');
        $('#dj-button').removeAttr('data-eta', 'ETA: ' + readable(eta));
        ncssettings.eta = false;
    }
}

function applyNCStheme() {

}

function saveResponse() {
    afkmsg = $('#afk-response').val();
    $('#afk-response').val('');
    hideNotif();
}

function saveBackground() {
    ncssettings.backgroundurl = $('#background-input').val();
    applyBackground();
    hideNotif();
}


// Hide and Show functions for notif's. name = ID of notif
function showNotif(name) {
    $('#notifications').addClass('show-notif');
    $('.notif').removeClass('show-notif');
    $('#' + name).addClass('show-notif');
}
function hideNotif() {
    $('#notifications').removeClass('show-notif');
    $('.notif').removeClass('show-notif');
}


// Desktop Notifcations by Gatt

var notifcationsEnabled = ncssettings.desktopnotifications;

function loadDesktopNotifs() {
    if (notifcationsEnabled === true) {
        if (!Notification) {
            alert('[NCS] You do not have notifications and therefore this option is not available. Please use a modern version of Chrome, Firefox, Opera or Firefox.')
        } else if (Notification.permission !== "granted") {
            Notification.requestPermission()
        }
    }

    if (notifcationsEnabled) {
        $('#chat-messages').append('<center style=color:#A77DC2 class="cm room-greet">Enabled Desktop Notifications</center>');
        $('#desktop-notifs').addClass("active");
    } else {
        $('#chat-messages').append('<center style=color:#A77DC2 class="cm room-greet">Disabled Desktop Notifications</center>');
        $('#desktop-notifs').removeClass("active");
    }
}

function toggleDesktopNotifications() {
    notifcationsEnabled = !notifcationsEnabled;
    ncssettings.desktopnotifications = notifcationsEnabled;
    if (notifcationsEnabled === true) {
        if (!Notification) {
            alert('[NCS] You do not have notifications and therefore this option is not available. Please use a modern version of Chrome, Firefox, Opera or Firefox.')
        } else if (Notification.permission !== "granted") {
            Notification.requestPermission()
        }
    }
    if (notifcationsEnabled) {
        $('#chat-messages').append('<center style=color:#A77DC2 class="cm room-greet">Enabled Desktop Notifications</center>');
        $('#desktop-notifs').addClass("active");
    } else {
        $('#chat-messages').append('<center style=color:#A77DC2 class="cm room-greet">Disabled Desktop Notifications</center>');
        $('#desktop-notifs').removeClass("active");
    }
}

var songdurationalert = true;

function loadSongDurationAlert() {
    if (songdurationalert === true) {
        if (!Notification) {
            alert('[NCS] You do not have notifications and therefore this option is not available. Please use a modern version of Chrome, Firefox, Opera or Firefox.');
        } else if (Notification.permission !== "granted") {
            Notification.requestPermission()
        }
    }
    if (songdurationalert) {
        $('#chat-messages').append('<center style=color:#A77DC2 class="cm room-greet">Enabled Song Duration Alerts</center>');
        $('#moderatorSongDurationAlert').addClass("active");
    } else {
        $('#chat-messages').append('<center style=color:#A77DC2 class="cm room-greet">Disabled Song Duration Alerts</center>');
        $('#moderatorSongDurationAlert').removeClass("active");
    }
}

function toggleDlBtn() {
    if (ncssettings.dlbtn === true) {
        $('#NCSDlBtn').remove();
        console.info('[NCS] Download Button Disabled');
        ncssettings.dlbtn = false;
        $('.ncs-dl-toggle').children('.ncs-menu-icon').hide();
    } else {
        $('#vote').append('<div id="NCSDlBtn" class="crowd-response" onclick="downloadThasShitV2();"><div class="top">Download</div><div class="bottom">MP3</div></div>');
        console.info('[NCS] Download Button Enabled');
        ncssettings.dlbtn = true;
        $('.ncs-dl-toggle').children('.ncs-menu-icon').show();
    }
}

function toggleSongDurationAlert() {
    songdurationalert = !songdurationalert;
    ncssettings.moderatorsongdurationalert = songdurationalert;
    if (songdurationalert === true) {
        if (!Notification) {
            alert('[NCS] You do not have notifications and therefore this option is not available. Please use a modern version of Chrome, Firefox, Opera or Firefox.');
        } else if (Notification.permission !== "granted") {
            Notification.requestPermission()
        }
    }
    if (songdurationalert) {
        $('#chat-messages').append('<center style=color:#A77DC2 class="cm room-greet">Enabled Song Duration Alerts</center>');
        $('#moderatorSongDurationAlert').addClass("active");
    } else {
        $('#chat-messages').append('<center style=color:#A77DC2 class="cm room-greet">Disabled Song Duration Alerts</center>');
        $('#moderatorSongDurationAlert').removeClass("active");
    }
}

var prevDJ = null;

function alertSong(data) {
    setTimeout(function () {
        if (prevDJ !== API.getDJ().un && (API.getTimeRemaining() + API.getTimeElapsed()) >= 360 && API.getDJ().un === API.getUser().un && songdurationalert === true) {
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('id', 'notifySound');
            audioElement.setAttribute('src', 'https://musiqpad.com/pads/lib/sound/mention.wav');
            audioElement.setAttribute('autoplay', 'autoplay');
            $.get();
            audioElement.play();
            setTimeout(function () {
                $("#notifySound").remove();
            }, 100);

            var notif = new Notification("Current Song is over 6 minutes", {
                icon: 'https://i.imgur.com/5ThdRUd.png',
                body: "The current song playing is over 6 minutes!"
            });
            notif.onclick = function () {
                window.focus();
                notif.close()
            };
            setTimeout(function () {
                notif.close()
            }, 6000);
        }

        prevDJ = API.getDJ().un;
    }, 1000);

}

if (ncssettings.preventNavigation) {
    window.onbeforeunload = function () {
        return 'You sure? You told us to ask this.';
    };
}

function toggleNavigation() {
    ncssettings.preventNavigation = !ncssettings.preventNavigation;
    if (ncssettings.preventNavigation) {
        $('.ncs-accnav-toggle').children('.ncs-menu-icon').show();
        window.onbeforeunload = function () {
            return 'You sure? You told us to ask this.';
        };
    } else {
        window.onbeforeunload = function () {

        };
        $('.ncs-accnav-toggle').children('.ncs-menu-icon').hide();
    }
}


// Won't edit below this line. This is Fuechschen's thing ;3

//Socket
var ncssocket = null;
var ncssockettries = 0;
function initWebSocket() {
    try {
        ncssocket = new WebSocket('wss://ncs.fuechschen.org/plug');
        ncssocket.onerror = function () {
            console.log('[NCS] WebSocket-Connection failed.');
            ncssocket.close();
            ncssockettries = ncssockettries + 1;
            setTimeout(initWebSocket, 10 * 1000);
        };
        ncssocket.onclose = function () {
            setTimeout(initWebSocket, 10 * 1000);
        };
        ncssocket.onopen = function () {
            ncssockettries = 0;
        };
        ncssocket.onmessage = function (msg) {
            if (msg.data !== 'h') {
                try {
                    var pmsg = JSON.parse(msg.data);
                    switch (pmsg.t) {
                        case 'auth':
                            ncssocket.send(JSON.stringify({
                                t: 'auth',
                                d: {room: window.location.pathname, user: API.getUser().id}
                            }));
                            break;
                        case 'broadcast':
                            switch (pmsg.d.t) {
                                case 'system':
                                    API.chatlog('[NCS] ' + pmsg.d.m);
                                    break;
                                case 'ncs_msg':
                                    $('#chat-messages').append('<center style=color:#A77DC2 class="cm ncs-greet">' + pmsg.d.m + '</center>');
                                    break;
                                default:
                                    API.chatlog('[NCS] ' + pmsg.d.m);
                                    break;
                            }
                            if (pmsg.d.a) audioElement.play();
                            console.log('[NCS] Recieving message from NCS-Staff: ' + pmsg.d.m);
                            break;
                        default:
                            break;
                    }
                } catch (e) {
                    console.log('[NCS] Recieved invalid JSON');
                }
            }
        };
    } catch (e) {
        if (ncssockettries > 4) console.log('[NCS] WebSocket-Connection failed.');
        else {
            setTimeout(initWebSocket, 10 * 1000);
            ncssockettries = ncssockettries + 1;
        }
    }
}


initWebSocket();
loading = false;
ncssettings.loaded = true;
