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
    $('#toast-notifications').append('<div class="notification omega-notif-old OmegaLoaderNotification" style="opacity: 1;"><div class="left"><i class="icon icon-about-white"></i></div><div class="right"><span style="top: 33.5px;">' + msg + '</span></div>');
    setTimeout(function () {
        $('.OmegaLoaderNotification').remove();
    }, 5000);
}

function notifLong(msg) {
    $('.OmegaLoaderNotification').remove();
    $('#toast-notifications').append('<div class="notification omega-notif-old OmegaLoaderNotification" style="opacity: 1;"><div class="left"><i class="icon icon-about-white"></i></div><div class="right"><span style="top: 33.5px;">' + msg + '</span></div>');
    setTimeout(function () {
        $('.OmegaLoaderNotification').remove();
    }, 15000);
}

var errorMsg = "It appears OmegaWootTheme is already running! If this is not the case please refresh and try again."

if (typeof OmegaLoad !== 'undefined') {
    $('#chat-messages').append('<center style=color:#A77DC2 class="cm mention">' + errorMsg + '</center');
} else {
    var OmegaLoad = true;
    var version = "0.0.8";
    var buildnumber = "00013";
    var versionMsg = "It's alive!";
    var startUpMsg = versionMsg + "<br>" + "<br>" + "Welcome to OmegaWootTheme version " + version + "<br>";
    var alertMsg = "This is a BETA build." + "<br>" +  "It will buggy and likely missing a literal ton of features.";



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
$('head').append('<link href="https://rawgit.com/Satskhi/ScriptTest/master/omegatest/omega.css" rel="stylesheet" type="text/css">');
$('head').append('<link href="https://rawgit.com/Satskhi/ScriptTest/master/omegatest/menu.css" rel="stylesheet" type="text/css">');


// Show Startup Messages
$('#chat-messages').append('<center style=color:#A77DC2 class="cm omega-greet">' +
    [startUpMsg, alertMsg].join('<br>') + '</center>');

API.on(API.CHAT, afk);

var omegasettings = $.extend({
    autolike: false,
    eta: false,
    autojoin: false,
    desktopnotifications: false,
    moderatorsongdurationalert: true,
    djalert: true,
    dlBtn: true,
    loaded: false,
    preventNavigation: false
}, (JSON.parse(localStorage.getItem('omega-settings')) || {}));

console.info((JSON.parse(localStorage.getItem('omega-settings')) || {}));

window.onbeforeunload = function (e) {
    localStorage.setItem('omega-settings', JSON.stringify(omegasettings));
};

$(window).on('beforeunload', function () {
    // Remove the cookie
    var OmegaLoad = false;
    // delete localStorage.OmegaLoad;
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
var NCS = (function () {
    var models = {
        'tab': `<div id="omega-menu-button" class="header-panel-button omega-tab">
                    <span class="icon-info omega-menu-button-info">NCS</span>
                </div>`,
        menu: `<div id="omega-menu" style="display:none">
                <div class="omega-menu-header list-header"><span class="title">NCS Settings</span></div>
                <div class="list staff jspScrollable" style="top: 40px !important; overflow: hidden; padding: 0px; outline: none; width: 345px; height: ${$(document).height() - 148}px" tabindex="0">
                    <div class="jspContainer" style="overflow: scroll; width: 340px; top:5px; height:${$(document).height() - 153}px">
                        <div class="jspPane" style="padding: 0px; top: 0px; left: 0px; width: 331px;">
                            <div class="group">
                                <div class="user omega-menu-item item" id="omega-woot-toggle" onclick="runautolike();">
                                    <i class="icon icon-check-blue omega-menu-icon"></i>
                                    <span class="name omega-menu-span" id="omega-woot-toggle">Auto-Woot</span>
                                </div>
                                <div class="user omega-join-toggle omega-menu-item" onclick="runautojoin()">
                                    <i class="icon icon-check-blue omega-menu-icon"></i>
                                    <span class="name omega-menu-span">Auto-Join</span>
                                </div>
                                <div class="user omega-eta-toggle omega-menu-item" onclick="toggleEta()">
                                    <i class="icon icon-check-blue omega-menu-icon"></i>
                                    <span class="name omega-menu-span">ETA</span>
                                </div>
                                <div class="user omega-dl-toggle omega-menu-item" onclick="toggleDlBtn()">
                                    <i class="icon icon-check-blue omega-menu-icon"></i>
                                    <span class="name omega-menu-span">Download Button</span>
                                </div>
                                <div class="user omega-accnav-toggle omega-menu-item" onclick="toggleNavigation();">
                                    <i class="icon icon-check-blue omega-menu-icon"></i>
                                    <span class="name omega-menu-span">Accidental Navigation Prevention</span>
                                </div>
                                <div class="user omega-update-btn omega-menu-item" onclick="updateCheck();">
                                    <i class="icon icon-check-blue omega-menu-icon"></i>
                                    <span class="name omega-menu-span">Check for Updates</span>
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
            if (!$('#omega-menu-button').hasClass('selected')) {
                $('#omega-menu').hide();
            }
        })
    });
    $('#omega-menu-button').click(function () {
        if (!$('#omega-menu-button').hasClass('selected')) {
            $(".header-panel-button").removeClass('selected')
            $('#omega-menu-button').addClass('selected');
            $('.app-right').children().hide();
            $('#omega-menu').show();
        }
    });

    $('#meh').removeClass('disabled');

    $('.app-right').append(models.menu);

    API.on(API.CHAT, function (msg) {
        // Developer Icon
        if ([4405644, 5751501, 4881577].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('omega-developer')).children('.msg')).children('.from').prepend('<i title="Omega Developer" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/uerI4EX.png\')">')
        }
        // VIP Icon
        if ([4405644].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('omega-vip')).children('.msg')).children('.from').prepend('<i title="Omega VIP" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/K9qSqOX.png\')">')
        }
        // Donator Icon
        if ([4405644].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('omega-vip')).children('.msg')).children('.from').prepend('<i title="Omega Donator" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/naLYLHV.png\')">')
        }
        // Kidyeon Gif
        if ([4405644].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('omega-vip')).children('.msg')).children('.from').prepend('<i title="Wizardly Editor" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/7m5XynH.gif\')">')
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

if (omegasettings.autolike === true) {
    runautolike();
}

setInterval(function () {
    $('#vote').css('width', '350px');
}, 500);

function runautolike() {
    if (omegasettings.autolike === false) {
        $('#omega-woot-toggle').children('.omega-menu-icon').show();
        console.info('[Omega] Autolike Enabled.');
        $('#auto-woot').addClass('active');
        $('#woot').click();
        API.on(API.ADVANCE, callback);
        function callback(obj) {
            $('#woot').click();
            console.info('[Omega] Wooted track');
        }

        omegasettings.autolike = true;
    } else {
        $('#omega-woot-toggle').children('.omega-menu-icon').hide();
        console.info('[Omega] Autolike Disabled.');
        omegasettings.autolike = false;
    }
}

if (omegasettings.autojoin === true) {
    omegasettings.autojoin = false;
    runautojoin();
}



function toggleEta() {
    if (omegasettings.eta === true) {
        $('.omega-eta-toggle').children('.omega-menu-icon').hide();
        omegasettings.eta = false;
        console.info('[Omega] Disabled ETA.');
    } else {
        $('.omega-eta-toggle').children('.omega-menu-icon').show();
        omegasettings.eta = true;
        console.info('[Omega] Enabled ETA.');
    }
}

function djAlert() {
    if (omegasettings.djalert === true) {
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
    if (omegasettings.autojoin === false) {
        $('.omega-join-toggle').children('.omega-menu-icon').show();
        omegasettings.autojoin = true;
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
    } else if (omegasettings.autojoin === true) {
        $('.omega-join-toggle').children('.omega-menu-icon').hide();
        omegasettings.autojoin = false;
    }
}
function songAdvance() {
    if (omegasettings.autolike) {
        if (!$('#woot').hasClass('selected') && !$('#meh').hasClass('selected') && $('#woot').hasClass('active')) {
            $('#woot').click();
        }
    }
    if (omegasettings.autojoin === true && API.getWaitListPosition() === -1) {
        API.djJoin();
    }
}



API.on(API.ADVANCE);


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
    if (omegasettings.eta === true) {
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

if (omegasettings.eta === true) {
    omegasettings.autojoin = false;
    runeta();
}

var eta = "";

function runeta() {
    if (omegasettings.eta === false) {
        $('#eta').addClass('active');
        omegasettings.eta = true;
    }
    else {
        $('#eta').removeClass('active');
        $('#dj-button').removeAttr('data-eta', 'ETA: ' + readable(eta));
        omegasettings.eta = false;
    }
}

function saveResponse() {
    afkmsg = $('#afk-response').val();
    $('#afk-response').val('');
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

var notifcationsEnabled = omegasettings.desktopnotifications;

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
    omegasettings.desktopnotifications = notifcationsEnabled;
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
    if (omegasettings.dlbtn === true) {
        $('#OmegaDlBtn').remove();
        console.info('[Omega] Download Button Disabled');
        omegasettings.dlbtn = false;
        $('.omega-dl-toggle').children('.omega-menu-icon').hide();
    } else {
        $('#vote').append('<div id="OmegaDlBtn" class="crowd-response" onclick="downloadThasShitV2();"><div class="top">Download</div><div class="bottom">MP3</div></div>');
        console.info('[Omega] Download Button Enabled');
        omegasettings.dlbtn = true;
        $('.omega-dl-toggle').children('.omega-menu-icon').show();
    }
}

function toggleSongDurationAlert() {
    songdurationalert = !songdurationalert;
    omegasettings.moderatorsongdurationalert = songdurationalert;
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

if (omegasettings.preventNavigation) {
    window.onbeforeunload = function () {
        return 'You sure? You told us to ask this.';
    };
}

function toggleNavigation() {
    omegasettings.preventNavigation = !omegasettings.preventNavigation;
    if (omegasettings.preventNavigation) {
        $('.omega-accnav-toggle').children('.omega-menu-icon').show();
        window.onbeforeunload = function () {
            return 'You sure? You told us to ask this.';
        };
    } else {
        window.onbeforeunload = function () {

        };
        $('.omega-accnav-toggle').children('.omega-menu-icon').hide();
    }
}



loading = false;
omegasettings.loaded = true;
