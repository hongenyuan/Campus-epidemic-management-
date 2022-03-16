  ajax = function (options) {
        var defaults = {
            type: 'get',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                name: 'hey',
                age: 18
            },
            error: function (data, xhr) {
                console.log('发生错误' + data);
                console.log(xhr)
            }
        };
        window.Object.assign(defaults, options);
        var xhr = new XMLHttpRequest();
        var params = '';
        for (var k in defaults.data) {
            params += k + '=' + defaults.data[k] + '&';
        };
        params = params.substr(0, params.length - 1);
        if (
            defaults.type == 'get') {
            defaults.url = defaults.url + '?' + params;
        };
        xhr.open(
            defaults.type,
            defaults.url);
        if (
            defaults.type == 'post') {
            var contentType = defaults.header['Content-Type'];
            xhr.setRequestHeader('Content-type', contentType);
            if (contentType == 'application/json') {
                xhr.send(JSON.stringify(defaults.data));
            } else {
                xhr.send(params);
            }
        } else {
            xhr.send();
        }
        xhr.onload = function () {
            var responseText = xhr.responseText;
            var contentType = xhr.getResponseHeader('Content-Type');
            if (contentType.includes('application/json')) {
                responseText = JSON.parse(responseText);
            }
            if (xhr.status == 200) {
                defaults.success(responseText, xhr);
            } else {
                defaults.error(responseText, xhr);
            }
        }
    }