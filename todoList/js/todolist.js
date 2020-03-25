$(function () {
    load();
    $("#title").on("keydown", function (event) {
        if (event.keyCode == 13) {
            if ($(this).val() !== "") {
                var local = getData();
                local.push({
                    title: $(this).val(),
                    done: false
                })
                saveData(local)
                load();
            };
            $(this).val("")
        }
    });
    $("ol,ul").on("click", "a", function () {
        var data = getData();
        var index = $(this).attr("id")
        data.splice(index, 1);
        saveData(data);
        load()
    })
    $("ol,ul").on("click", "input", function () {
        var data = getData();
        var index = $(this).siblings("a").attr("id")
        data[index].done = $(this).prop("checked");
        saveData(data)
        load()
    })

    function getData() {
        if (localStorage.getItem("todolist") != null) {
            return JSON.parse(localStorage.getItem("todolist"))
        } else {
            return []
        }
    };

    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data))
    };

    function load() {
        $("ol,ul").empty()
        var data = getData()
        var todoCount = 0
        var doneCount = 0
        $.each(data, function (i, ele) {
            if (ele.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + ele.title + "</p><a href='javascript:;' id=" + i + "></a></li>")
                doneCount++
            } else {
                $("ol").prepend("<li><input type='checkbox'><p>" + ele.title + "</p><a href='javascript:;' id=" + i + "></a></li>")
                todoCount++
            }
        })
        $("#todocount").text(todoCount)
        $("#donecount").text(doneCount)
    }
})