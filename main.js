document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       ハンバーガーメニュー
       ========================================= */
    const hamburger = document.getElementById('js-hamburger');
    const nav = document.getElementById('js-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // 開閉トグル
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');

        // メニューが開いているときはスクロール禁止（オプション）
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            // CSSでスマホ用メニュー表示スタイルを追加適用するためのクラス
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'fixed';
            nav.style.top = '70px';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.height = 'calc(100vh - 70px)';
            nav.style.background = '#fff';
            nav.style.padding = '20px';
            nav.style.zIndex = '999';
        } else {
            document.body.style.overflow = '';
            nav.style.display = ''; // CSSのメディアクエリに任せる
        }
    });

    // リンククリック時に閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 769) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
                nav.style.display = '';
            }
        });
    });

    // リサイズ時にスタイルリセット
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 769) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
            nav.style.display = '';
        }
    });

    /* =========================================
       スムーススクロール（補正付き）
       ========================================= */
    const headerHeight = 70; // ヘッダーの高さ

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================================
       フォーム簡易バリデーション & 送信ダミー
       ========================================= */
    const form = document.getElementById('js-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 簡易チェック（HTML5のrequired属性でもチェックされるが念のためJSでも）
        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        const email = form.email.value.trim();

        if (!name || !phone || !email) {
            alert('必須項目を入力してください。');
            return;
        }

        // メール形式チェック（簡易）
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert('正しいメールアドレスの形式で入力してください。');
            return;
        }

        // 送信完了メッセージ
        alert('ご応募ありがとうございます！\n担当者より3日以内にご連絡いたします。');
        form.reset();
    });

});
