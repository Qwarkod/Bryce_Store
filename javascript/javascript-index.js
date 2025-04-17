document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("language-toggle");
    const elementsToTranslate = {
        saleBanner: document.getElementById("sale-banner"),
        shopNow: document.getElementById("shop-now"),
        logo: document.getElementsByClassName("logo")[0],
        aboutLink: document.getElementById("about-link"),
        contactsLink: document.getElementById("contacts-link"),
        call: document.getElementById("call"),
        calling_italitan: document.getElementById("calling-italian"),
        view: document.getElementById('view'),
        shoes_text: document.getElementById('shoes_text'),
    };

    const translations = {
        "EN": {
            saleBanner: "WINTER SALE | DISCOUNT 20%",
            shopNow: "SHOP NOW",
            logo: "Bryce Store",
            aboutLink: "About Us",
            contactsLink: "Contacts",
            call: "Clock is men's face",
            calling_italitan: "Italian watch styles are waiting for you",
            view: "View",
            shoes_text: "Shoes"
        },
        "UA": {
            saleBanner: "ЗИМОВИЙ РОЗПРОДАЖ | СКИДКА 20%",
            shopNow: "КУПУЙ ЗАРАЗ",
            logo: "Bryce Store",
            aboutLink: "Про нас",
            contactsLink: "Контакти",
            call: "Годинник — це обличчя чоловіка.",
            calling_italitan: "Італійські стилі годинників чекають на вас.",
            view: "Дивитись",
            shoes_text: "Кросівки"
        }
    };

    let currentLanguage = "UA";

    function typewriterEffect(element, newText, speed = 50) {
        const oldText = element.textContent;
        let i = oldText.length;

        // Видалення поточного тексту
        const eraseInterval = setInterval(() => {
            if (i > 0) {
                element.textContent = oldText.substring(0, i - 1);
                i--;
            } else {
                clearInterval(eraseInterval);

                // Друкуємо новий текст після паузи
                let j = 0;
                const typeInterval = setInterval(() => {
                    if (j < newText.length) {
                        element.textContent += newText[j];
                        j++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, speed);
            }
        }, speed);
    }

    toggleButton.addEventListener("click", () => {
        currentLanguage = currentLanguage === "EN" ? "UA" : "EN";
        toggleButton.textContent = currentLanguage === "EN" ? "UA" : "EN";

        Object.keys(elementsToTranslate).forEach(key => {
            typewriterEffect(elementsToTranslate[key], translations[currentLanguage][key]);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach((el) => observer.observe(el));
});


document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.cart-modal .close-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartContent = document.querySelector('.cart-content');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const notificationWarn = document.createElement('div');
    notificationWarn.classList.add('notificationWarn');
    
    const notificationSuccess = document.createElement('div');
    notificationSuccess.classList.add('notificationSuccess');

    document.body.appendChild(notificationWarn);
    document.body.appendChild(notificationSuccess);

    updateEmptyCartMessage();

    cartIcon.addEventListener('click', function() {
        cartModal.style.display = 'block';
        setTimeout(() => {
            cartModal.classList.add('show');
        }, 10); // Невелика затримка для запуску анімації
    });

    closeBtn.addEventListener('click', function() {
        cartModal.classList.remove('show');
        setTimeout(() => {
            cartModal.style.display = 'none';
        }, 300); // Затримка для завершення анімації
    });

    window.addEventListener('click', function(event) {
        if (event.target == cartModal) {
            cartModal.classList.remove('show');
            setTimeout(() => {
                cartModal.style.display = 'none';
            }, 300); // Затримка для завершення анімації
        }
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = button.parentElement;
            const itemName = item.querySelector('p').textContent;
            const itemImageSrc = item.querySelector('img').src;
            const itemPrice = item.querySelector('.price').textContent;

            // Перевірка на дублікати
            const existingItem = Array.from(cartContent.children).find(cartItem => cartItem.querySelector('p').textContent === itemName);
            if (existingItem) {
                showNotificationWarning('Товар вже є в кошику');
                return;
            }

            showNotificationSuccess('Товар успішно додано в кошик');
            addItemToCart(itemName, itemImageSrc, itemPrice);
        });
    });

    function addItemToCart(name, imageSrc, price) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${imageSrc}" alt="${name}">
            <p>${name}</p>
            <p>${price}</p>
            <div class="cart-item-buttons">
                <button id="buy-now-btn-cart">Купити</button>
                <button class="remove-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        cartContent.appendChild(cartItem);

        // Додавання функціональності видалення товару
        cartItem.querySelector('.remove-btn').addEventListener('click', function() {
            cartContent.removeChild(cartItem);
            updateCartCookie();
            updateEmptyCartMessage();
        });

        updateCartCookie();
        updateEmptyCartMessage();
    }

    function updateCartCookie() {
        const cartItems = Array.from(cartContent.children).map(cartItem => {
            return {
                name: cartItem.querySelector('p').textContent,
                imageSrc: cartItem.querySelector('img').src,
                price: cartItem.querySelectorAll('p')[1].textContent
            };
        });
        setCookie('cartItems', JSON.stringify(cartItems), 7); // Зберігаємо на 7 днів
    }

    function updateEmptyCartMessage() {
        if (cartContent.children.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
        }
    }

    function showNotificationWarning(message) {
        notificationWarn.textContent = message;
        notificationWarn.style.display = 'block';
        setTimeout(() => {
            notificationWarn.classList.add('show');
        }, 10); 
        setTimeout(() => {
            notificationWarn.classList.remove('show');
            setTimeout(() => {
                notificationWarn.style.display = 'none';
            }, 500); 
        }, 3000); 
    }

    function showNotificationSuccess(message) {
        notificationSuccess.textContent = message;
        notificationSuccess.style.display = 'block';
        setTimeout(() => {
            notificationSuccess.classList.add('show');
        }, 10); 
        setTimeout(() => {
            notificationSuccess.classList.remove('show');
            setTimeout(() => {
                notificationSuccess.style.display = 'none';
            }, 500); 
        }, 3000); 
    }

    function showDiscountModal(item) {
        const discountModal = document.getElementById('discount-modal');
        const discountItemImg = document.getElementById('discount-item-img');
        const discountItemName = document.getElementById('discount-item-name');
        const discountItemOldPrice = document.getElementById('discount-item-old-price');
        const discountItemNewPrice = document.getElementById('discount-item-new-price');
        const closeDiscountBtn = document.querySelector('.close-discount-btn');
    
        const oldPrice = parseFloat(item.price.replace('₴', '').replace(',', ''));
        const discount = 0.05; // 5% discount
        const newPrice = oldPrice * (1 - discount);
    
        discountItemImg.src = item.imageSrc;
        discountItemName.textContent = item.name;
        discountItemOldPrice.textContent = `₴ ${oldPrice.toFixed(2)}`;
        discountItemNewPrice.textContent = `₴ ${newPrice.toFixed(2)}`;
    
        discountModal.style.display = 'block';
    
        closeDiscountBtn.addEventListener('click', function() {
            discountModal.style.display = 'none';
        });
    
        window.addEventListener('click', function(event) {
            if (event.target == discountModal) {
                discountModal.style.display = 'none';
            }
        });
    }

    function getRandomNumber() {
        return Math.floor(Math.random() * 2) + 1;
    }

    const savedCartItems = getCookie('cartItems');
    if (savedCartItems) {
        const cartItems = JSON.parse(savedCartItems);
        cartItems.forEach(item => {
            addItemToCart(item.name, item.imageSrc, item.price);
        });

        const randomNumber = getRandomNumber();
        if (randomNumber === 1) {
            showDiscountModal(cartItems[0]);
        }
    }
});

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}


