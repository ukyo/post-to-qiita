var ENDPOINT = 'https://qiita.com/api/v1/';
var token = localStorage.token;
var intent = window.intent || window.webkitIntent;
var $ = document.querySelector.bind(document);

function show(element) {
    element.classList.remove('disabled');
}

function hide(element) {
    element.classList.add('disabled');
}

function val(selector) {
    return $(selector).value;
}

onload = function() {
    var form = $('form');
    var iframe = $('iframe');
    var cover = $('#cover');
    var error = $('#error');
    var finish = $('#finish');
    var qiitaButton = $('#qiita');
    var closeButton = $('#close');

    show(token ? iframe : form);

    function showError(xhr) {
        error.textContent = JSON.parse(xhr.responseText).message;
        show(error);
        setTimeout(hide.bind(null, error), 3000);
    }

    function showFinish(xhr) {
        qiitaButton.onclick = function() {
            chrome.tabs.create({
                url: JSON.parse(xhr.responseText).url
            });
        };

        closeButton.onclick = function() {
            intent.postResult('success');
        };

        show(finish);
    }
    
    $('#auth').onclick = function(e) {
        e.preventDefault();

        var xhr = new XMLHttpRequest;
        xhr.open('POST', ENDPOINT + 'auth');
        xhr.onload = function() {
            if(xhr.status !== 200) return showError(xhr);

            localStorage.token = token = JSON.parse(xhr.responseText).token;
            hide(form);
            show(iframe);
        };
        var fd = new FormData;
        fd.append('url_name', val('#url_name'));
        fd.append('password', val('#password'));
        xhr.send(fd);
    };

    onmessage = function(e) {
        show(cover);

        var data = e.data;
        data.token = token;
        data.body = intent.data;

        var xhr = new XMLHttpRequest;
        xhr.open('POST', ENDPOINT + 'items');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            hide(cover);
            (xhr.status === 201 ? showFinish : showError)(xhr);
        };
        xhr.send(JSON.stringify(data));
    };
};