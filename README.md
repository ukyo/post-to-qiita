#Usage

```html
<textarea rows="10" id="text"></textarea>
<button id="post">post to qiita</button>
```

```js
window.Intent = window.Intent || window.WebKitIntent;
window.navigator.startActivity = window.navigator.startActivity || window.navigator.webkitStartActivity;

document.getElementById('post').addEventListener('click', function(e) {
    var intent = new Intent(
        'http://webintents.org/save',
        'text/plain',
        document.getElementById('text').value);

    window.navigator.startActivity(intent);
});
```