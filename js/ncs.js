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
    $('.OmegaLoaderNotification').remove();
    $('#toast-notifications').append('<div class="notification Omega-notif-old OmegaLoaderNotification" style="opacity: 1;"><div class="left"><i class="icon icon-about-white"></i></div><div class="right"><span style="top: 33.5px;">' + msg + '</span></div>');
    setTimeout(function () {
        $('.OmegaLoaderNotification').remove();
    }, 5000);
}

function notifLong(msg) {
    $('.OmegaLoaderNotification').remove();
    $('#toast-notifications').append('<div class="notification Omega-notif-old OmegaLoaderNotification" style="opacity: 1;"><div class="left"><i class="icon icon-about-white"></i></div><div class="right"><span style="top: 33.5px;">' + msg + '</span></div>');
    setTimeout(function () {
        $('.OmegaLoaderNotification').remove();
    }, 15000);
}

// IMPORT THAS ANGULAR.JS DAMN IT
//Angular should already be loaded by the loader javascript:(function(){$.getScript('https://Omega-pdj-bentenz5.c9users.io/Omega/Omega-loader.js')}());
/*setTimeout(function() {
 $('head').append('<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>');
 }, 5000);*/

var errorMsg = "It appears Omega is already running! If this is not the case please refresh and try again. If it still doesn't work, report this on github."

if (typeof Omegaload !== 'undefined') {
    $('#chat-messages').append('<center style=color:#A77DC2 class="cm mention">' + errorMsg + '</center');
} else {
    var Omegaload = true;
    var version = "0.0.8";
    var buildnumber = "00013";
    var versionMsg = "No, but better. :P";
    var ncApiKey = "6R9fc29cMLw615PBv98u072430tZ3E9c";
    var startUpMsg = "Welcome to Omega version " + version + " | " + versionMsg + "<br>";
    var alertMsg = "This is a BETA build. It will buggy and likely missing a literal ton of features. Also the nekos may avoid you... ;_;";
    // OBSOLETE hiddenChat = false;

// INIT STUFFS


//function init() {

    //if(loading === true) {
    //	$('#toast-notifications').append('<div class="notification Omega-notif-old OmegaLoaderNotification" style="opacity: 1;"><div class="left"><i class="icon icon-about-white"></i></div><div class="right"><span style="top: 33.5px;">Loading Omega... Please wait...</span></div>');
    //}

    //if(loading === false) {
    //	$('.OmegaLoaderNotification').remove();
    //	$('#toast-notifications').append('<div class="notification Omega-notif-old OmegaLoaderNotification" style="opacity: 1;"><div class="left"><i class="icon icon-about-white"></i></div><div class="right"><span style="top: 33.5px;">Omega Version ' + version + ' loaded successfully!</span></div>');
    //	setTimeout(function() {
    //		$('.OmegaLoaderNotification').remove();
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
                // notifLong("Omega has been updated! Refresh your page to get the latest update! | Current Version: " + version + " | New Version: " + data.version + " | <a href='" + data.changelog + "' target='_blank'>Changelog</a>");
                $('#chat-messages').append('<center style=color:#A77DC2 class="cm Omega-broadcast"><div class="mdi mdi-alert msg"></div> Omega has updated! Refresh your page to get the latest update!<br> <a href="' + data.changelog + '" target="_blank">Changelog</a> | New version: ' + data.version + '</center>');
                console.log("[Omega] Update available");
                //init();
            } else {
                console.log("[Omega] Up to date!");
                //init();
            }
        });
    }

    updateCheck();
    var updateInterval = setInterval(function () {
        updateCheck();
    }, 1800000);
}

// Omega Styles
$('head').append('<link href="https://rawgit.com/Satskhi/ScriptTest/master/css/Omega.css" rel="stylesheet" type="text/css">');
$('head').append('<link href="https://rawgit.com/Satskhi/ScriptTest/master/css/menu.css" rel="stylesheet" type="text/css">');


// Show Startup Messages
$('#chat-messages').append('<center style=color:#A77DC2 class="cm Omega-greet">' +
    [startUpMsg, alertMsg].join('<br>') + '</center>');

API.on(API.CHAT, afk);

var Omegasettings = $.extend({
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
}, (JSON.parse(localStorage.getItem('Omega-settings')) || {}));

console.info((JSON.parse(localStorage.getItem('Omega-settings')) || {}));

window.onbeforeunload = function (e) {
    localStorage.setItem('Omega-settings', JSON.stringify(Omegasettings));
};

$(window).on('beforeunload', function () {
    // Remove the cookie
    var OmegaLoad = false;
    // delete localStorage.Omegaload;
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
    console.log("[Omega] Downloaded Video!");
}

function downloadThasShitV2() {
    var uri = "https://youtube.com/watch?v=" + API.getMedia().cid;
    window.open('https://www.youtubeinmp3.com/fetch/?video=' + uri);
}

// MENU
var Omega = (function () {
    var models = {
        'tab': `<div id="Omega-menu-button" class="header-panel-button Omega-tab">
                    <span class="icon-info Omega-menu-button-info">Omega</span>
                </div>`,
        menu: `<div id="Omega-menu" style="display:none">
                <div class="Omega-menu-header list-header"><span class="title">Omega Settings</span></div>
                <div class="list staff jspScrollable" style="top: 40px !important; overflow: hidden; padding: 0px; outline: none; width: 345px; height: ${$(document).height() - 148}px" tabindex="0">
                    <div class="jspContainer" style="overflow: scroll; width: 340px; top:5px; height:${$(document).height() - 153}px">
                        <div class="jspPane" style="padding: 0px; top: 0px; left: 0px; width: 331px;">
                            <div class="group">
                                <div class="user Omega-menu-item item" id="Omega-woot-toggle" onclick="runautolike();">
                                    <i class="icon icon-check-blue Omega-menu-icon"></i>
                                    <span class="name Omega-menu-span" id="Omega-woot-toggle">Auto-Woot</span>
                                </div>
                                <div class="user Omega-theme-toggle Omega-menu-item item" onclick="OmegaThemeShit();">
                                    <i class="icon icon-check-blue Omega-menu-icon"></i>
                                    <span class="name Omega-menu-span">Omega Custom Theme</span>
                                </div>
                                <div class="user Omega-join-toggle Omega-menu-item" onclick="runautojoin()">
                                    <i class="icon icon-check-blue Omega-menu-icon"></i>
                                    <span class="name Omega-menu-span">Auto-Join</span>
                                </div>
                                <div class="user Omega-eta-toggle Omega-menu-item" onclick="toggleEta()">
                                    <i class="icon icon-check-blue Omega-menu-icon"></i>
                                    <span class="name Omega-menu-span">ETA</span>
                                </div>
                                <div class="user Omega-dl-toggle Omega-menu-item" onclick="toggleDlBtn()">
                                    <i class="icon icon-check-blue Omega-menu-icon"></i>
                                    <span class="name Omega-menu-span">Download Button</span>
                                </div>
                                <div class="user Omega-bg-toggle Omega-menu-item" onclick="backgroundSelect()">
                                    <i class="icon icon-check-blue Omega-menu-icon"></i>
                                    <span class="name Omega-menu-span">Custom Background</span>
                                </div>
                                <div class="user Omega-accnav-toggle Omega-menu-item" onclick="toggleNavigation();">
                                    <i class="icon icon-check-blue Omega-menu-icon"></i>
                                    <span class="name Omega-menu-span">Accidental Navigation Prevention</span>
                                </div>
                                <div class="user Omega-update-btn Omega-menu-item" onclick="updateCheck();">
                                    <i class="icon icon-check-blue Omega-menu-icon"></i>
                                    <span class="name Omega-menu-span">Check for Updates</span>
                                </div>
                                <div class="user Omega-donate-btn Omega-menu-item" onclick="redir('https://paypal.me/CSxKING');">
                                    <i class="icon icon-check-blue Omega-menu-icon"></i>
                                    <span class="name Omega-menu-span">Donate to Omega!</span>
                                </div>
                                <div class="user Omega-report-btn Omega-menu-item" onclick="redir('https://github.com/bentenz5/Omega_PlugDj/issues')">
                                    <i class="icon icon-check-blue Omega-menu-icon"></i>
                                    <span class="name Omega-menu-span">Found an issue? Report it here!</span>
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
            if (!$('#Omega-menu-button').hasClass('selected')) {
                $('#Omega-menu').hide();
            }
        })
    });
    $('#Omega-menu-button').click(function () {
        if (!$('#Omega-menu-button').hasClass('selected')) {
            $(".header-panel-button").removeClass('selected')
            $('#Omega-menu-button').addClass('selected');
            $('.app-right').children().hide();
            $('#Omega-menu').show();
        }
    });

    $('#meh').removeClass('disabled');

    $('.app-right').append(models.menu);

    API.on(API.CHAT, function (msg) {
        // Developer Icon
        if ([4405644, 5751501, 4881577].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('Omega-developer')).children('.msg')).children('.from').prepend('<i title="Omega Developer" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/uerI4EX.png\')">')
        }
        // VIP Icon
        if ([4405644].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('Omega-vip')).children('.msg')).children('.from').prepend('<i title="Omega VIP" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/K9qSqOX.png\')">')
        }
        // Donator Icon
        if ([4405644].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('Omega-vip')).children('.msg')).children('.from').prepend('<i title="Omega Donator" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/naLYLHV.png\')">')
        }
        // Kidyeon Gif
        if ([4405644].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('Omega-vip')).children('.msg')).children('.from').prepend('<i title="Wizardly Editor" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/7m5XynH.gif\')">')
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

$('#Omega-menu').append('<span id="Omegausers">0 people using Omega in 0 rooms!</span>');

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

function OmegaafkResponseChanger() {
    showNotif('notif-afk-message');
}

if (Omegasettings.autolike === true) {
    runautolike();
}

setInterval(function () {
    $('#vote').css('width', '350px');
}, 500);

function runautolike() {
    if (Omegasettings.autolike === false) {
        $('#Omega-woot-toggle').children('.Omega-menu-icon').show();
        console.info('[Omega] Autolike Enabled.');
        $('#auto-woot').addClass('active');
        $('#woot').click();
        API.on(API.ADVANCE, callback);
        function callback(obj) {
            $('#woot').click();
            console.info('[Omega] Wooted track');
        }

        Omegasettings.autolike = true;
    } else {
        $('#Omega-woot-toggle').children('.Omega-menu-icon').hide();
        console.info('[Omega] Autolike Disabled.');
        Omegasettings.autolike = false;
    }
}


function downloadMP3() {
    $.getScript("https://musiqpad-Omega-bentenz5.c9users.io/musiqpad_port/modules/dl_mp3.js");
}

if (Omegasettings.autojoin === true) {
    Omegasettings.autojoin = false;
    runautojoin();
}

function customBackground() {
    if (Omegasettings.cbackground === true) {

    }
}

function toggleEta() {
    if (Omegasettings.eta === true) {
        $('.Omega-eta-toggle').children('.Omega-menu-icon').hide();
        Omegasettings.eta = false;
        console.info('[Omega] Disabled ETA.');
    } else {
        $('.Omega-eta-toggle').children('.Omega-menu-icon').show();
        Omegasettings.eta = true;
        console.info('[Omega] Enabled ETA.');
    }
}

function djAlert() {
    if (Omegasettings.djalert === true) {
        console.log('[Omega] DJ Alert Enabled.');
        // If its enabled.
        API.on(API.advance, callback);
        function callback(obj) {
            djpos = API.getWaitListPosition();
            if (djpos === 0) {
                console.log('[Omega] User is next in line. Alerting.');
            }
        }
    } else {
        console.log('[Omega] DJ Alert Disabled.');
        // If its not enabled.

    }
}

function runautojoin() {
    if (Omegasettings.autojoin === false) {
        $('.Omega-join-toggle').children('.Omega-menu-icon').show();
        Omegasettings.autojoin = true;
        setInterval(function () {
            var pos = API.getWaitListPosition() + 1;
            if (API.getWaitList().length < 50 && pos <= 1) {
                if (pos <= 1) {
                    console.info('[Omega] User is either DJ or not in waitlist. Attempting to join.');
                    API.djJoin();
                } else if (pos >= 1) {
                    console.info('[Omega] User is still in waitlist at pos ' + pos + '. Waiting.');
                }
            } else {
                // console.warn('[Omega] Waitlist full. Waiting.');
            }
        }, 1000);
    } else if (Omegasettings.autojoin === true) {
        $('.Omega-join-toggle').children('.Omega-menu-icon').hide();
        Omegasettings.autojoin = false;
    }
}
function songAdvance() {
    if (Omegasettings.autolike) {
        if (!$('#woot').hasClass('selected') && !$('#meh').hasClass('selected') && $('#woot').hasClass('active')) {
            $('#woot').click();
        }
    }
    if (Omegasettings.autojoin === true && API.getWaitListPosition() === -1) {
        API.djJoin();
    }
}

$('#room-bg').append('<div id="newbg"></div>');
function changeBackground() {
    showNotif('notif-background');
    $('#background-input').val(Omegasettings.backgroundurl);
}

if (Omegasettings.cbackground === true) {
    Omegasettings.cbackground = false;
    applyBackground();
}

function backgroundSelect() {
    if (Omegasettings.cbackground === false) {
        console.info('[Omega] Custom Background Enabled.');
        var bgfile = prompt('Enter the link to a background. A resolution of 1600x900 is recomended.', 'https://i.imgur.com/EFXFnql.png');
        Omegasettings.backgroundurl = bgfile;
        $('.room-background').css("background-image", " url('" + Omegasettings.backgroundurl + "')");
        $('.Omega-bg-toggle').children('.Omega-menu-icon').show();
        Omegasettings.cbackground = true;
    } else {
        console.info('[Omega] Custom Background Disabled.');
        $('.Omega-bg-toggle').children('.Omega-menu-icon').hide();
        Omegasettings.cbackground = false;
        $('.room-background').css("background-image", "url('https://cdn.plug.dj/_/static/images/community/background.ea778295-651f-4bb8-bc2f-9fa7e6a81876.jpg')");
    }
}

function applyBackground() {
    if (Omegasettings.cbackground === false) {
        $('.Omega-bg-toggle').children('.Omega-menu-icon').show();
        $('.room-background').css("background-image", " url('" + Omegasettings.backgroundurl + "')");
        Omegasettings.cbackground = true;
    }
    else {
        $('.Omega-bg-toggle').children('.Omega-menu-icon').hide();
        $('.room-background').css("background-image", "https://cdn.plug.dj/_/static/images/community/background.892bc86f530eb3f7a53a2cc60f0c0be481798175.jpg");
        Omegasettings.cbackground = false;
    }
}

API.on(API.ADVANCE, checkUsers);
function checkUsers() {
    // This checks how many users on plug are using Omega and puts it in the menu.
    $.getJSON('https://Omega.fuechschen.org/plug', function (data) {
        document.getElementById('Omegausers').innerHTML = data.users + " people using Omega in " + data.rooms + " rooms!";
    })
}

// Theme Shit

Omegasettings.customThemeEnabled = false;

function OmegaThemeShit() {
    if (Omegasettings.customThemeEnabled === false) {
        $('.Omega-theme-toggle').children('.Omega-menu-icon').show();
        setTimeout(function () {
            $('head').append('<link id="OmegaTheme" rel="stylesheet" href="https://rawgit.com/Satskhi/ScriptTest/master/css/OmegaTheme.css" type="text/css" />');
            $('.room-background').css('background-image','url(\'https://i.imgur.com/EFXFnql.png\')')
        }, 500);
        Omegasettings.customThemeEnabled = true;
    }
    else {
        $('.Omega-theme-toggle').children('.Omega-menu-icon').hide();
        $('#OmegaTheme').remove();
        Omegasettings.customThemeEnabled = false;
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
    if (Omegasettings.eta === true) {
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
    console.warn('[Omega] Video-Only mode is Enabled! Applying fix!');
    $('#room').removeClass('video-only');
    setTimeout(function () {
        $('#room').addClass('video-only');
    }, 500);
} else {
    console.info('[Omega] Video-Only Mode is not Enabled! No fix required!');
}

if (Omegasettings.eta === true) {
    Omegasettings.autojoin = false;
    runeta();
}

var eta = "";

function runeta() {
    if (Omegasettings.eta === false) {
        $('#eta').addClass('active');
        Omegasettings.eta = true;
    }
    else {
        $('#eta').removeClass('active');
        $('#dj-button').removeAttr('data-eta', 'ETA: ' + readable(eta));
        Omegasettings.eta = false;
    }
}

function applyOmegatheme() {

}

function saveResponse() {
    afkmsg = $('#afk-response').val();
    $('#afk-response').val('');
    hideNotif();
}

function saveBackground() {
    Omegasettings.backgroundurl = $('#background-input').val();
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

var notifcationsEnabled = Omegasettings.desktopnotifications;

function loadDesktopNotifs() {
    if (notifcationsEnabled === true) {
        if (!Notification) {
            alert('[Omega] You do not have notifications and therefore this option is not available. Please use a modern version of Chrome, Firefox, Opera or Firefox.')
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
    Omegasettings.desktopnotifications = notifcationsEnabled;
    if (notifcationsEnabled === true) {
        if (!Notification) {
            alert('[Omega] You do not have notifications and therefore this option is not available. Please use a modern version of Chrome, Firefox, Opera or Firefox.')
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
            alert('[Omega] You do not have notifications and therefore this option is not available. Please use a modern version of Chrome, Firefox, Opera or Firefox.');
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
    if (Omegasettings.dlbtn === true) {
        $('#OmegaDlBtn').remove();
        console.info('[Omega] Download Button Disabled');
        Omegasettings.dlbtn = false;
        $('.Omega-dl-toggle').children('.Omega-menu-icon').hide();
    } else {
        $('#vote').append('<div id="OmegaDlBtn" class="crowd-response" onclick="downloadThasShitV2();"><div class="top">Download</div><div class="bottom">MP3</div></div>');
        console.info('[Omega] Download Button Enabled');
        Omegasettings.dlbtn = true;
        $('.Omega-dl-toggle').children('.Omega-menu-icon').show();
    }
}

function toggleSongDurationAlert() {
    songdurationalert = !songdurationalert;
    Omegasettings.moderatorsongdurationalert = songdurationalert;
    if (songdurationalert === true) {
        if (!Notification) {
            alert('[Omega] You do not have notifications and therefore this option is not available. Please use a modern version of Chrome, Firefox, Opera or Firefox.');
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

if (Omegasettings.preventNavigation) {
    window.onbeforeunload = function () {
        return 'You sure? You told us to ask this.';
    };
}

function toggleNavigation() {
    Omegasettings.preventNavigation = !Omegasettings.preventNavigation;
    if (Omegasettings.preventNavigation) {
        $('.Omega-accnav-toggle').children('.Omega-menu-icon').show();
        window.onbeforeunload = function () {
            return 'You sure? You told us to ask this.';
        };
    } else {
        window.onbeforeunload = function () {

        };
        $('.Omega-accnav-toggle').children('.Omega-menu-icon').hide();
    }
}


// Won't edit below this line. This is Fuechschen's thing ;3

//Socket
var Omegasocket = null;
var Omegasockettries = 0;
function initWebSocket() {
    try {
        Omegasocket = new WebSocket('wss://Omega.fuechschen.org/plug');
        Omegasocket.onerror = function () {
            console.log('[Omega] WebSocket-Connection failed.');
            Omegasocket.close();
            Omegasockettries = Omegasockettries + 1;
            setTimeout(initWebSocket, 10 * 1000);
        };
        Omegasocket.onclose = function () {
            setTimeout(initWebSocket, 10 * 1000);
        };
        Omegasocket.onopen = function () {
            Omegasockettries = 0;
        };
        Omegasocket.onmessage = function (msg) {
            if (msg.data !== 'h') {
                try {
                    var pmsg = JSON.parse(msg.data);
                    switch (pmsg.t) {
                        case 'auth':
                            Omegasocket.send(JSON.stringify({
                                t: 'auth',
                                d: {room: window.location.pathname, user: API.getUser().id}
                            }));
                            break;
                        case 'broadcast':
                            switch (pmsg.d.t) {
                                case 'system':
                                    API.chatlog('[Omega] ' + pmsg.d.m);
                                    break;
                                case 'Omega_msg':
                                    $('#chat-messages').append('<center style=color:#A77DC2 class="cm Omega-greet">' + pmsg.d.m + '</center>');
                                    break;
                                default:
                                    API.chatlog('[Omega] ' + pmsg.d.m);
                                    break;
                            }
                            if (pmsg.d.a) audioElement.play();
                            console.log('[Omega] Recieving message from Omega-Staff: ' + pmsg.d.m);
                            break;
                        default:
                            break;
                    }
                } catch (e) {
                    console.log('[Omega] Recieved invalid JSON');
                }
            }
        };
    } catch (e) {
        if (Omegasockettries > 4) console.log('[Omega] WebSocket-Connection failed.');
        else {
            setTimeout(initWebSocket, 10 * 1000);
            Omegasockettries = Omegasockettries + 1;
        }
    }
}


initWebSocket();
loading = false;
Omegasettings.loaded = true;
