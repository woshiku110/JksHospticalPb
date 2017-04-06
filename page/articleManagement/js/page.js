window.onload = function() {
    getSecondColumn();
    var rowNum = parseInt((getWindowSize().y - 360) / 42);
    var t = new Table("middle", 0, 8);
    document.getElementById("middle").tableObject = t;
    t.setColWidth(["1%", "20%", "10%", "14%", "30%", "6%", "3%", "16"]);
    t.setHead(["", "标题", "所属栏目", "置顶", "日期", "", "操作", ""]);
    t.setTemplate(["", "[1]", "[3]", function (data) {
        console.log(data);
        var c = document.createElement('a');
        c.setAttribute("class", "button");
        c.innerText = "置顶";
        c.style.fontSize = 14 + "px";
        c.onclick = function () {
            topArticle(data[0]);
            function fresh() {
                window.location.reload();
            };
            fresh();
        }
        return c;
    }, "[6]", function (data) {
        var a = document.createElement('a');
        var title = document.getElementById('title');
        var author = document.getElementById('author');
        var abstract = document.getElementById('abstract');
        a.setAttribute("class", "button");
        a.innerText = "编辑";
        a.style.fontSize = 14 + "px";
        a.onclick = function () {
            addClick(false, data);
            dialog(true);
           /* var message = document.getElementById('message').contentWindow.document.getElementsByClassName('ke-container')[0];
            message.style.width = 804 + 'px';
            var widthW = document.getElementById('message').contentWindow.document.getElementsByClassName('ke-edit')[0];
            var messageaa = document.getElementById('message').contentWindow.document.getElementsByClassName('ke-edit-iframe')[0];
            widthW.style.height = 434 + 'px';
            messageaa.style.height = 434 + 'px';*/
            title.value = data[1];
            author.value = data[2];
            abstract.value = data[5];
        };
        return a;
    }, "", function (data) {
        var b = document.createElement('a');
        b.setAttribute("class", "button");
        b.innerText = "删除";
        b.style.fontSize = 14 + "px";
        b.onclick = function () {
            t.remove("rowId_" + data[0]);
            deleteArticle(data[0]);
        };
        return b;
    }]);
    getArticleList();
    getAllClassify();
    //图片
    document.getElementById('picture').addEventListener('change', function (e) {
        var files = this.files;
        var img = new Image();
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function (e) {
            var mb = (e.total / 1024) / 1024;
            if (mb >= 2) {
                alert('文件大小大于2M');
                return;
            }
            img.src = this.result;
            img.style.width = "100%";
            img.style.height = "100%";
            document.getElementById('pictureB').style.width = "100px";
            document.getElementById('pictureB').style.height = "100px";
            document.getElementById('pictureB').innerHTML = '';
            document.getElementById('pictureB').appendChild(img);
        }
    });
};