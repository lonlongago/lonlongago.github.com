$.fn.extend({
    _opt: {
        placeholader: "请输入文章正文内容",
        validHtml: [],
        limitSize: 3,
        showServer: !1
    },
    artEditor: function(e) {
        var t = this,
        a = {
            "-webkit-user-select": "text",
            "user-select": "text",
            "overflow-y": "auto",
            "text-break": "brak-all",
            outline: "none",
            cursor: "text"
        };
        $(this).css(a).attr("contenteditable", !0),
        t._opt = $.extend(t._opt, e);
        try {
            $(t._opt.imgTar).on("change",
            function(e) {
                var a = e.target.files[0];
                if (e.target.value = "", Math.ceil(a.size / 1024 / 1024) > t._opt.limitSize) return void console.error("文件太大");
                var r = new FileReader;
                r.readAsDataURL(a),
                r.onload = function(e) {
                    var r = e.target.result,
                    o = new Image;
                    if (o.src = e.target.result, t._opt.compressSize && Math.ceil(a.size / 1024 / 1024) > t._opt.compressSize && setTimeout(function() {
                        r = t.compressHandler(o)
                    },
                    10), t._opt.showServer) return void t.upload(r,a);
                    var i = '<img src="' + r + '" style="max-width:100%;" />';
                    t.insertImage(i)
                }
            }),
            t.placeholderHandler(),
            t.pasteHandler()
        } catch(e) {
            console.log(e)
        }
        t._opt.formInputId && $("#" + t._opt.formInputId)[0] && $(t).on("input",
        function() {
            $("#" + t._opt.formInputId).val(t.getValue())
        }),
        $(this).on("input click",
        function() {
            return setTimeout(function() {
                var e = window.getSelection ? window.getSelection() : document.selection;
                t.range = e.createRange ? e.createRange() : e.getRangeAt(0)
            },
            10),
            !1
        }),
        !/firefox/.test(navigator.userAgent.toLowerCase()) && this._opt.breaks && $(this).keydown(function(e) {
            if (13 === e.keyCode) return document.execCommand("insertHTML", !1, "<br/><br/>"),
            !1
        })
    },
    compressHandler: function(e) {
        var t, a = document.createElement("canvas"),
        r = a.getContext("2d"),
        o = document.createElement("canvas"),
        i = o.getContext("2d"),
        n = (e.src.length, e.width),
        l = e.height; (t = n * l / 4e6) > 1 ? (t = Math.sqrt(t), n /= t, l /= t) : t = 1,
        a.width = n,
        a.height = l,
        r.fillStyle = "#fff",
        r.fillRect(0, 0, a.width, a.height);
        var s;
        if ((s = n * l / 1e6) > 1) {
            s = ~~ (Math.sqrt(s) + 1);
            var c = ~~ (n / s),
            p = ~~ (l / s);
            o.width = c,
            o.height = p;
            for (var d = 0; d < s; d++) for (var g = 0; g < s; g++) i.drawImage(e, d * c * t, g * p * t, c * t, p * t, 0, 0, c, p),
            r.drawImage(o, d * c, g * p, c, p)
        } else r.drawImage(e, 0, 0, n, l);
        var h = a.toDataURL("image/jpeg", .1);
        return o.width = o.height = a.width = a.height = 0,
        h
    },
    upload: function(e,x) {
        var t = this,
        a = t._opt.uploadField || "uploadfile",
        r = $.extend(t._opt.data, {});
        r[a] = e,
        formData = new FormData();   //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数
        console.log(x);
        console.log(e)
        var s = dataURLtoBlob(e);
//      s.name = 
        console.log(s)
        //convertBase64UrlToBlob函数是将base64编码转换为Blob
        formData.append("wangEditorH5File",x);  //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同
        $.ajax({
            url: t._opt.uploadUrl,
            type: "post",
            data: formData,
            cache: !1,
            contentType: false,  
            processData: false,
        }).then(function(e) {
            var a = t._opt.uploadSuccess(e);
            if (a) {
                var r = '<img src="' + a + '" style="max-width:100%;" />';
                t.insertImage(r)
            } else console.log("地址为空啊!大兄弟", a)
        },
        function(e) {
            t._opt.uploadError(e.status, e)
        });
//      function convertBase64UrlToBlob(urlData){
//          var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
//          //处理异常,将ascii码小于0的转换为大于0
//          var ab = new ArrayBuffer(bytes.length);
//          var ia = new Uint8Array(ab);
//          for (var i = 0; i < bytes.length; i++) {
//              ia[i] = bytes.charCodeAt(i);
//          }
//          return new Blob( [ab] , {type : 'image/jpeg'});
//      }
        function dataURLtoBlob(dataurl) {
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
              u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], {type:mime});
        }
    },
    insertImage: function(e) {
        $(this).focus();
        var t, a = window.getSelection ? window.getSelection() : document.selection;
        if (this.range ? (t = this.range, this.range = null) : t = a.createRange ? a.createRange() : a.getRangeAt(0), window.getSelection) {
            t.collapse(!1);
            for (var r = t.createContextualFragment(e), o = r.lastChild; o && "br" == o.nodeName.toLowerCase() && o.previousSibling && "br" == o.previousSibling.nodeName.toLowerCase();) {
                var i = o;
                o = o.previousSibling,
                r.removeChild(i)
            }
            t.insertNode(t.createContextualFragment("<br/>")),
            t.insertNode(r),
            o && (t.setEndAfter(o), t.setStartAfter(o)),
            a.removeAllRanges(),
            a.addRange(t)
        } else t.pasteHTML(e),
        t.collapse(!1),
        t.select();
        this._opt.formInputId && $("#" + this._opt.formInputId)[0] && $("#" + this._opt.formInputId).val(this.getValue())
    },
    pasteHandler: function() {
        var e = this;
        $(this).on("paste",
        function(t) {
            console.log(t.clipboardData.items);
            var a = $(this).html();
            console.log(a),
            valiHTML = e._opt.validHtml,
            a = a.replace(/_moz_dirty=""/gi, "").replace(/\[/g, "[[-").replace(/\]/g, "-]]").replace(/<\/ ?tr[^>]*>/gi, "[br]").replace(/<\/ ?td[^>]*>/gi, "&nbsp;&nbsp;").replace(/<(ul|dl|ol)[^>]*>/gi, "[br]").replace(/<(li|dd)[^>]*>/gi, "[br]").replace(/<p [^>]*>/gi, "[br]").replace(new RegExp("<(/?(?:" + valiHTML.join("|") + ")[^>]*)>", "gi"), "[$1]").replace(new RegExp('<span([^>]*class="?at"?[^>]*)>', "gi"), "[span$1]").replace(/<[^>]*>/g, "").replace(/\[\[\-/g, "[").replace(/\-\]\]/g, "]").replace(new RegExp("\\[(/?(?:" + valiHTML.join("|") + "|img|span)[^\\]]*)\\]", "gi"), "<$1>"),
            /firefox/.test(navigator.userAgent.toLowerCase()) || (a = a.replace(/\r?\n/gi, "<br>")),
            $(this).html(a)
        })
    },
    placeholderHandler: function() {
        var e = this,
        t = /<img\s*([\w]+=(\"|\')([^\"\']*)(\"|\')\s*)*\/?>/;
        $(this).on("focus",
        function() {
            $.trim($(this).text()) === e._opt.placeholader && $(this).html("")
        }).on("blur",
        function() {
            $.trim($(this).text()) || t.test($(this).html()) || $(this).html('<div class="placeholader" style="pointer-events: none;">' + e._opt.placeholader + "</div>")
        }),
        $.trim($(this).text()) || t.test($(this).html()) || $(this).html('<div class="placeholader" style="pointer-events: none;">' + e._opt.placeholader + "</div>")
    },
    getValue: function() {
        return $(this).html()
    },
    setValue: function(e) {
        $(this).html(e)
    }
});