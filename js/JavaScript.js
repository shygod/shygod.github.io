function O(i) { // 搜尋id屬性值
    return typeof i == 'object' ? i : document.getElementById(i);
}

function C(i) { // 搜尋class屬性值
    return document.getElementsByClassName(i);
}

// 圖片輪播
$('.slider').each(function() { // 巡訪每一個面板
    var $this        = $(this); // 取得目前的面板
    var $group       = $(this).find('.slide-group'); // 取得容器
    var $slides      = $(this).find('.slide'); // 以jQuery物件保存所有面板
    var buttonArray  = []; // 建立陣列保存導覽按鈕
    var currentIndex = 0; // 目前面板的索引編號
    var timeout; // 保存計時器

    function move(newIndex) { // 移動至新的內容面板
        var animateLeft, slideLeft;
    
        advance(); // 當面板移動時，再次呼叫advace()函式
    
        // 如果目前內容面板正在顯示或處於動畫效果中，則不需執行任何動作
        if ($group.is(':animated') || currentIndex === newIndex) {
            return;
        }
    
        // 自目前的內容面板中移除active類別屬性
        buttonArray[currentIndex].removeClass('active');
    
        // 將active類別屬性值加入至新內容面板
        buttonArray[newIndex].addClass('active');
    
        if (newIndex > currentIndex) { // 若新面板的索引值大於目前的索引值
            slideLeft   = '100%'; // 設定新面板位於右方
            animateLeft = '-100%'; // 設定目前面板向左移動
        } else { // 否則
            slideLeft   = '-100%'; // 設定新面板位於左方
            animateLeft = '100%'; // 設定目前面板向右移動
        }
    
        /* 定位新的內容面板位於目前面板的左方或右方 */
        $slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );
        $group.animate( {left: animateLeft}, function() { // 移動內容面板
            $slides.eq(currentIndex).css( {display: 'none'} ); // 隱藏前一個內容面板
            $slides.eq(newIndex).css( {left: 0} ); // 設定新面板的位置
            $group.css( {left: 0} ); // 設定群組內的內容面板位置
            currentIndex = newIndex; // 設定currentIndex為新的面板索引值
        });
    }

    function advance() { // 內容面板間設定一個計時器
        clearTimeout(timeout); // 清除timeout變數的計數器
        timeout = setTimeout(function() {
            if (currentIndex < ($slides.length - 1)) { // 若非最後一個面板
                move(currentIndex + 1); // 移動至下一個內容面板
            } else { // 否則
                move(0); // 移動至第一個內容面板
            }
        }, 4000); // 等待以毫秒為單位
    }

    $.each($slides, function(index) {
        // 為每個按鈕建立button元件
        var $button = $('<button type="button" class="slide-btn">&bull;</button>');
        if (index === currentIndex) { // 若索引值等於目前的面板索引值
            $button.addClass('active'); // 加入active類別屬性值
        }
        $button.on('click', function() { // 為按鈕建立事件處理器
            move(index); // 呼叫move函式
        }).appendTo('.slide-buttons'); // 加入至按鈕容器中
        buttonArray.push($button); // 加入至按鈕陣列中
    })

    advance();
});

// 摺疊面板
$('.accordion').on('click', '.accordion-control', function(e) { // 當點擊時
    e.preventDefault(); // 停止預設按鈕動作
    $(this) // 取得使用者所點擊的元件
        .next('.accordion-panel') // 選取對應的內容面板
        .not(':animated') // 若目前未設定動畫展示
        .slideToggle(); // 使用sildeToggle展開或隱藏內容面板
});


// 按下id屬性值top
$("#top").click(function(){
    jQuery("html,body").animate({ // 移動頁面至頂部
        scrollTop:0
    },1000);
});
$(window).scroll(function() {
    if ( $(this).scrollTop() > 300){
        $('#top').fadeIn("fast"); // 顯示按鈕
    } else {
        $('#top').stop().fadeOut("fast"); // 隱藏按鈕
    }
});