function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

var colors = ['#342224', '#73A857', '#f39c12', '#16a085', '#BDBB99'];
var currentQuote = '';
var currentAuthor = '';

function openUrl(url) {
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1, location=0, statusbar=0, menubar=0, resizeable=0');
}

function getQuote() {
    $.ajax({
        headers: {
            "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
        success: function(res) {
            if (typeof res === 'string') {
                res = JSON.parse(res);
            }

            currentQuote = res.quote;
            currentAuthor = res.author;

            if (inIframe()) {
                $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
            }

            $(".quote-text").animate({
                opacity: 0
            }, 500, function() {
                $(this).animate({
                    opacity: 1
                }, 500);
                $("#text").text(currentQuote);
            });

            $(".quote-author").animate({
                opacity: 0
            }, 500, function() {
                $(this).animate({
                    opacity: 1
                }, 500);
                $("#author").html(currentAuthor);
            });

            var color = Math.floor(Math.random() * colors.length);
            $("html").animate({
                backgroundColor: colors[color],
                color: colors[color]
            }, 1000);

            $(".button").animate({
                backgroundColor: colors[color]
            }, 1000);

        }
    });
}

$(document).ready(function() {
    getQuote();
    $('#new-quote').on('click', getQuote);
    $('#tweet-quote').on('click', function() {
        if (!inIframe()) {
            openUrl('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        }
    });
})
