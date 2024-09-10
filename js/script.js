'use srict';
document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.querySelector('.hamburger'),
    closeBtn = document.querySelector('.nav-menu__close'),
    overlay = document.querySelector('.overlay');
    const progressLine = document.querySelectorAll('[data-progress=""]'),
        progress = document.querySelectorAll('.skills__progress'),
        overlayModal = document.querySelector('.overlay_modal'),
        thanksModal = document.querySelector('[data-modal="thanks"]'),
        closeModalBtn = document.querySelector('.modal__close'),
        menuItems = document.querySelectorAll('.nav-menu__item');

    burgerBtn.addEventListener('click', () => {
        overlay.classList.add('overlay_active');
    });

    function closeModal (close, layout, activeClass, background, bgActiveClass) {
        close.addEventListener('click', () => {
            layout.classList.remove(activeClass);
            background.classList.remove(bgActiveClass);
        });
    }

    function overlayClick (layout, activeClass){
        layout.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-overlay')){
                layout.classList.remove(activeClass);
            }
        });
    }

    progress.forEach((value, i) => {
        progressLine[i].style.width = value.innerHTML;
    })

    const ajaxSend = async (formData) => {
        const response = await fetch("mailer/send.php", {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
        }
        return await response.text();
    };

    if (document.querySelector("form")) {
        const forms = document.querySelectorAll("form");

        forms.forEach(form => {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                const formData = new FormData(this);

                ajaxSend(formData)
                    .then((response) => {
                        console.log(response);
                        form.reset();
                    })
                    .then((data) => {
                        overlayModal.classList.add('overlay_modal_active');
                        thanksModal.classList.add('modal_active');
                    })
                    .catch((err) => console.error(err))
            });
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 1600) {
            document.querySelector('.up-arrow').style.display = 'block';
        } else {
            document.querySelector('.up-arrow').style.display = 'none';
        }
    });

    menuItems.forEach((value) => {
        closeModal(value, overlay, 'overlay_active');
    })

    new WOW().init();
    closeModal(closeModalBtn, thanksModal, 'modal_active', overlayModal, 'overlay_modal_active');
    overlayClick(overlayModal, 'overlay_modal_active');
    closeModal(closeBtn, overlay, 'overlay_active');
    overlayClick(overlay, 'overlay_active');
})
