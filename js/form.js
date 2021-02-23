
// 表單事件觸發
$('#customer').on('submit', function(e) {
    e.preventDefault(); // 停止事件發生
    var details = $('#customer').serialize(); // 表單資料排序化蒐集

    $.post('form.php', details, function(data) {
        alert('表單填寫完成!! 稍後給您電話回覆');
    });
    alert('表單填寫完成!! 稍後給您電話回覆');
});

