document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const cardsContainer = document.getElementById('cards-container');
    const modal = document.getElementById('code-modal');
    const closeModal = document.querySelector('.close-modal');
    const tabs = document.querySelectorAll('.tab');
    const scrollTop = document.getElementById('scrollTop');
    
    // Initialize theme
    document.body.classList.remove('light-mode');
    localStorage.setItem('darkMode', 'enabled');
    
    // Theme toggle
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.remove('light-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.add('light-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Create cards
    for (let i = 1; i <= 50; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-button', i);
        card.style.animationDelay = `${i * 0.05}s`;
        
        const cardPreview = document.createElement('div');
        cardPreview.className = 'card-preview';
        
        const button = document.createElement('button');
        button.className = `btn-${i}`;
        button.textContent = 'Button';
        
        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = `Button ${i}`;
        
        cardPreview.appendChild(button);
        card.appendChild(cardPreview);
        card.appendChild(cardTitle);
        
        card.addEventListener('click', function() {
            const buttonType = this.getAttribute('data-button');
            openModal(buttonType);
        });
        
        cardsContainer.appendChild(card);
    }
    
    // Scroll handling
    function checkScroll() {
        const cards = document.querySelectorAll('.card');
        const windowHeight = window.innerHeight;
        
        cards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 100) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
        
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    }
    
    checkScroll();
    window.addEventListener('scroll', checkScroll);
    
    // Scroll to top
    scrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Modal functions
    function openModal(buttonType) {
        const buttonPreview = document.getElementById('button-preview');
        const htmlCode = document.getElementById('html-code');
        const cssCode = document.getElementById('css-code');
        
        buttonPreview.innerHTML = '';
        
        // الحصول على كود HTML بشكل صحيح
        const buttonHTML = `<button class="btn-${buttonType}">Button</button>`;
        
        // الحصول على كود CSS كامل
        let buttonCSS = getFullButtonCSS(buttonType);
        
        // إنشاء زر المعاينة
        const previewButton = document.createElement('button');
        previewButton.className = `btn-${buttonType}`;
        previewButton.textContent = 'Button';
        buttonPreview.appendChild(previewButton);
        
        // تعيين المحتوى بشكل صحيح
        htmlCode.textContent = buttonHTML;
        cssCode.textContent = buttonCSS;
        
        // إضافة أرقام الأسطر
        updateLineNumbers('html-code');
        updateLineNumbers('css-code');
        
        // تلوين الكود
        hljs.highlightElement(htmlCode);
        hljs.highlightElement(cssCode);
        
        // تحديث عنوان المودال
        document.querySelector('.modal-title').textContent = `Button ${buttonType}`;
        
        // إظهار المودال
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // إعادة تعيين أزرار النسخ
        resetCopyButtons();
    }
    
    function getFullButtonCSS(buttonType) {
        // إرجاع CSS كامل لكل زر مع جميع الخصائص والهوفر والأنيميشن
        const cssMap = {
 1: `.btn-1 {
    background: linear-gradient(135deg, #ff6b6b, #ffa8a8);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-1::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.btn-1:hover::before {
    width: 300px;
    height: 300px;
}

.btn-1:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(255, 107, 107, 0.4);
}`,

    2: `.btn-2 {
    background: transparent;
    color: #8a2be2;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-2::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #8a2be2;
    transition: left 0.5s;
    z-index: -1;
}

.btn-2:hover::before {
    left: 0;
}

.btn-2:hover {
    color: white;
    transform: scale(1.05);
}`,

    3: `.btn-3 {
    background: linear-gradient(135deg, #74b9ff, #0984e3);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 0;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(116, 185, 255, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-3:hover {
    animation: pixelate 0.3s steps(8) forwards;
    box-shadow: 0 15px 30px rgba(116, 185, 255, 0.4);
}

@keyframes pixelate {
    0% { border-radius: 0; }
    25% { border-radius: 5px; }
    50% { border-radius: 10px; }
    75% { border-radius: 15px; }
    100% { border-radius: 20px; }
}`,

    4: `.btn-4 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-4 {
    color: #333333;
}

.btn-4:hover {
    background: #8a2be2;
    color: white;
    box-shadow: 0 0 25px #8a2be2;
    transform: scale(1.1);
}`,

    5: `.btn-5 {
    background: linear-gradient(90deg, #ff6b6b, #ffa8a8, #74b9ff, #0984e3, #a29bfe, #fd79a8);
    background-size: 400% 400%;
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation: gradientShift 3s ease infinite;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    font-weight: 600;
}

.btn-5:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
    animation-duration: 1s;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}`,

    6: `.btn-6 {
    background: transparent;
    color: #f0f0f0;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    font-weight: 600;
}

.light-mode .btn-6 {
    color: #333333;
}

.btn-6::before, .btn-6::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #8a2be2;
    border-radius: 8px;
    transition: all 0.3s;
}

.btn-6::after {
    border: 2px solid #4b0082;
    transform: translate(5px, 5px);
}

.btn-6:hover::before {
    transform: translate(-3px, -3px);
}

.btn-6:hover::after {
    transform: translate(8px, 8px);
}

.btn-6:hover {
    color: #8a2be2;
}`,

    7: `.btn-7 {
    background: linear-gradient(135deg, #00cec9, #00b894);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(0, 206, 201, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-7:hover {
    animation: pulse 1s infinite;
    box-shadow: 0 15px 30px rgba(0, 206, 201, 0.4);
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}`,

    8: `.btn-8 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-8 {
    color: #333333;
}

.btn-8:hover {
    color: white;
    background: #8a2be2;
    box-shadow: 0 0 0 10px rgba(138, 43, 226, 0.2),
                0 0 0 20px rgba(138, 43, 226, 0.1),
                0 0 0 30px rgba(138, 43, 226, 0.05);
}`,

    9: `.btn-9 {
    background: linear-gradient(135deg, #fd79a8, #e84393);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(253, 121, 168, 0.3);
    transform-style: preserve-3d;
    perspective: 1000px;
    font-weight: 600;
}

.btn-9:hover {
    transform: rotateY(15deg) rotateX(10deg);
    box-shadow: 0 15px 30px rgba(253, 121, 168, 0.4);
}`,

    10: `.btn-10 {
    background: transparent;
    color: #8a2be2;
    border: 3px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    box-shadow: 0 8px 25px rgba(138, 43, 226, 0.3);
}

.light-mode .btn-10 {
    color: #8a2be2;
    border-color: #8a2be2;
}

.btn-10::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #8a2be2, #4b0082, #9b30ff);
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: -1;
    transform: skewX(-15deg);
}

.btn-10::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
        transparent, 
        rgba(255, 255, 255, 0.3), 
        transparent, 
        rgba(255, 255, 255, 0.2), 
        transparent);
    transform: rotate(45deg);
    transition: all 0.8s ease;
    opacity: 0;
}

.btn-10:hover::before {
    left: 0;
    transform: skewX(0deg);
}

.btn-10:hover::after {
    opacity: 1;
    animation: shine 1.5s ease-in-out;
}

.btn-10:hover {
    color: white;
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 20px 40px rgba(138, 43, 226, 0.5),
                0 0 0 5px rgba(138, 43, 226, 0.1),
                0 0 0 10px rgba(138, 43, 226, 0.05);
    border-color: transparent;
    letter-spacing: 2px;
}

.btn-10:active {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 15px 30px rgba(138, 43, 226, 0.4),
                0 0 0 3px rgba(138, 43, 226, 0.1);
}

@keyframes shine {
    0% {
        transform: rotate(45deg) translateX(-100%);
    }
    100% {
        transform: rotate(45deg) translateX(100%);
    }
}

.dark-mode .btn-10 {
    text-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
}

.dark-mode .btn-10:hover {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
}`,

    11: `.btn-11 {
    background: linear-gradient(135deg, #a29bfe, #6c5ce7);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(162, 155, 254, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-11::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
}

.btn-11:hover::before {
    left: 100%;
}

.btn-11:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(162, 155, 254, 0.4);
}`,

    12: `.btn-12 {
    background: transparent;
    color: #00fffc;
    border: 2px solid #00fffc;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    text-shadow: 0 0 5px #00fffc;
    box-shadow: 0 0 10px #00fffc, inset 0 0 10px #00fffc;
    font-weight: 600;
}

.btn-12:hover {
    background: #00fffc;
    color: #121212;
    text-shadow: none;
    box-shadow: 0 0 20px #00fffc, 0 0 40px #00fffc;
    transform: scale(1.05);
}`,

    13: `.btn-13 {
    background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
    color: #2d3436;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(253, 203, 110, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-13::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(45deg);
    transition: all 0.3s;
}

.btn-13:hover::after {
    transform: rotate(45deg) translate(50%, 50%);
}

.btn-13:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(253, 203, 110, 0.4);
}`,

    14: `.btn-14 {
    background: linear-gradient(135deg, #dfe6e9, #b2bec3);
    color: #2d3436;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(178, 190, 195, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-14:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(178, 190, 195, 0.4);
}

.btn-14:active {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(178, 190, 195, 0.4);
}`,

    15: `.btn-15 {
    background: linear-gradient(135deg, #8a2be2 0%, #6a11cb 100%);
    color: #ffffff;
    border: none;
    padding: 16px 40px;
    font-size: 16px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    overflow: hidden;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    box-shadow: 
        0 4px 15px rgba(138, 43, 226, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.light-mode .btn-15 {
    background: linear-gradient(135deg, #8a2be2 0%, #6a11cb 100%);
    color: #ffffff;
    box-shadow: 
        0 4px 20px rgba(138, 43, 226, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.btn-15::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
        transparent, 
        rgba(255, 255, 255, 0.2), 
        transparent
    );
    transition: left 0.7s ease;
    z-index: 1;
}

.btn-15::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #9d4edd 0%, #7b2cbf 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
}

.btn-15:hover {
    transform: translateY(-2px);
    box-shadow: 
        0 8px 25px rgba(138, 43, 226, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    color: #ffffff;
}

.btn-15:hover::before {
    left: 100%;
}

.btn-15:hover::after {
    opacity: 1;
}

.btn-15:active {
    transform: translateY(0);
    box-shadow: 
        0 2px 10px rgba(138, 43, 226, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.1s ease;
}

.btn-15:focus {
    outline: none;
    box-shadow: 
        0 0 0 3px rgba(138, 43, 226, 0.3),
        0 4px 15px rgba(138, 43, 226, 0.3);
}

@keyframes clickWave {
    0% {
        box-shadow: 
            0 0 0 0 rgba(138, 43, 226, 0.7),
            0 4px 15px rgba(138, 43, 226, 0.3);
    }
    70% {
        box-shadow: 
            0 0 0 10px rgba(138, 43, 226, 0),
            0 4px 15px rgba(138, 43, 226, 0.3);
    }
    100% {
        box-shadow: 
            0 0 0 0 rgba(138, 43, 226, 0),
            0 4px 15px rgba(138, 43, 226, 0.3);
    }
}`,

    16: `.btn-16 {
    background: linear-gradient(135deg, #fd79a8, #e84393);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(253, 121, 168, 0.3);
    font-weight: 600;
}

.btn-16:hover {
    transform: rotate(360deg);
    box-shadow: 0 15px 30px rgba(253, 121, 168, 0.4);
}`,

    17: `.btn-17 {
    background: transparent;
    color: #00ff88;
    border: 2px solid #00ff88;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-17 {
    color: #008c46;
    border: 2px solid #008c46;
}

.btn-17::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00ff88;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -1;
}

.btn-17::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(0, 255, 136, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.5s ease;
    z-index: -1;
}

.btn-17:hover::before {
    opacity: 1;
}

.btn-17:hover::after {
    width: 300px;
    height: 300px;
}

.btn-17:hover {
    color: #001a0f;
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
}

.btn-17:active {
    transform: translateY(0);
}`,

    18: `.btn-18 {
    background: linear-gradient(135deg, #74b9ff, #0984e3);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(116, 185, 255, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-18::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: left 0.5s;
}

.btn-18:hover::before {
    left: 100%;
}

.btn-18:hover {
    transform: translateX(10px);
    box-shadow: 0 15px 30px rgba(116, 185, 255, 0.4);
}`,

    19: `.btn-19 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-19 {
    color: #333333;
}

.btn-19:hover {
    color: white;
    background: #8a2be2;
    box-shadow: 0 10px 20px rgba(138, 43, 226, 0.3),
    0 15px 30px rgba(138, 43, 226, 0.2),
    0 20px 40px rgba(138, 43, 226, 0.1);
}`,

    20: `.btn-20 {
    background: linear-gradient(135deg, #00cec9, #00b894);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(0, 206, 201, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-20:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 30px rgba(0, 206, 201, 0.4);
}`,

    21: `.btn-21 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-21 {
    color: #333333;
}

.btn-21:hover {
    animation: shake 0.5s;
    background: #8a2be2;
    color: white;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}`,

    22: `.btn-22 {
    background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
    color: #2d3436;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(253, 203, 110, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-22:hover {
    animation: glow 1s infinite alternate;
    box-shadow: 0 15px 30px rgba(253, 203, 110, 0.4);
}

@keyframes glow {
    from { box-shadow: 0 0 10px #fdcb6e; }
    to { box-shadow: 0 0 20px #fdcb6e, 0 0 30px #fdcb6e; }
}`,

    23: `.btn-23 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-23 {
    color: #333333;
}

.btn-23:hover {
    transform: scale(0.95);
    background: #8a2be2;
    color: white;
}`,

    24: `.btn-24 {
    background: linear-gradient(135deg, #a29bfe, #6c5ce7);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(162, 155, 254, 0.3);
    animation: float 3s ease-in-out infinite;
    font-weight: 600;
}

.btn-24:hover {
    animation: float 1s ease-in-out infinite;
    box-shadow: 0 15px 30px rgba(162, 155, 254, 0.4);
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}`,

    25: `.btn-25 {
    background: transparent;
    color: #ff6b35;
    border: 2px solid #ff6b35;
    padding: 16px 38px;
    font-size: 17px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    overflow: hidden;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.light-mode .btn-25 {
    color: #cc552a;
    border: 2px solid #cc552a;
}

.btn-25::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #ff6b35, #ff8e53);
    transform: translateX(-100%) skewX(-15deg);
    transition: transform 0.6s ease;
    z-index: -1;
}

.btn-25::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
        transparent, 
        rgba(255, 255, 255, 0.3), 
        transparent
    );
    transition: left 0.8s ease;
    z-index: 1;
}

.btn-25:hover::before {
    transform: translateX(0) skewX(-15deg);
}

.btn-25:hover::after {
    left: 100%;
}

.btn-25:hover {
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 107, 53, 0.4);
    border-color: transparent;
}

.btn-25:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
}`,

    26: `.btn-26 {
    background: linear-gradient(135deg, #fd79a8, #e84393);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(253, 121, 168, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-26::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.btn-26:hover::before {
    width: 300px;
    height: 300px;
}

.btn-26:hover {
    transform: rotate(180deg);
    box-shadow: 0 15px 30px rgba(253, 121, 168, 0.4);
}`,

    27: `.btn-27 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-27 {
    color: #333333;
}

.btn-27::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #8a2be2;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -1;
}

.btn-27:hover::before {
    opacity: 1;
}

.btn-27:hover {
    color: white;
    animation: spark 0.5s;
}

@keyframes spark {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}`,

    28: `.btn-28 {
    background: linear-gradient(135deg, #74b9ff, #0984e3);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(116, 185, 255, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-28:hover {
    animation: wave 1s infinite;
    box-shadow: 0 15px 30px rgba(116, 185, 255, 0.4);
}

@keyframes wave {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}`,

    29: `.btn-29 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-29 {
    color: #333333;
}

.btn-29::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #8a2be2;
    transform: scale(0);
    transition: transform 0.3s;
    z-index: -1;
}

.btn-29:hover::before {
    transform: scale(1);
}

.btn-29:hover {
    color: white;
    transform: scale(1.1);
}`,

    30: `.btn-30 {
    background: linear-gradient(135deg, #00cec9, #00b894);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(0, 206, 201, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-30:hover {
    animation: fall 0.5s;
    box-shadow: 0 15px 30px rgba(0, 206, 201, 0.4);
}

@keyframes fall {
    0% { transform: translateY(0); }
    50% { transform: translateY(10px); }
    100% { transform: translateY(0); }
}`,

    31: `.btn-31 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-31 {
    color: #333333;
}

.btn-31:hover {
    animation: spin 0.5s;
    background: #8a2be2;
    color: white;
}

@keyframes spin {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
}`,

    32: `.btn-32 {
    background: linear-gradient(135deg, #a29bfe, #6c5ce7);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(162, 155, 254, 0.3);
    animation: heartbeat 2s infinite;
    font-weight: 600;
}

.btn-32:hover {
    animation: heartbeat 0.5s infinite;
    box-shadow: 0 15px 30px rgba(162, 155, 254, 0.4);
}

@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}`,

    33: `.btn-33 {
    background: transparent;
    color: #2be2d4;
    border: 2px solid #2be2d4;
    padding: 16px 38px;
    font-size: 17px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-33 {
    color: #1a8a80;
    border: 2px solid #1a8a80;
}

.btn-33::before {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #2be2d4, #1a8a80);
    transition: top 0.6s ease;
    z-index: -1;
}

.btn-33::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(43, 226, 212, 0.1);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
}

.btn-33:hover::before {
    top: 0;
}

.btn-33:hover::after {
    opacity: 1;
}

.btn-33:hover {
    color: #001f1c;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(43, 226, 212, 0.4);
    border-color: transparent;
}

.btn-33:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(43, 226, 212, 0.3);
}`,

    34: `.btn-34 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-34 {
    color: #333333;
}

.btn-34:hover {
    animation: colorChange 1s infinite;
    background: #8a2be2;
    color: white;
}

@keyframes colorChange {
    0% { border-color: #8a2be2; }
    50% { border-color: #4b0082; }
    100% { border-color: #8a2be2; }
}`,

    35: `.btn-35 {
    background: linear-gradient(135deg, #fd79a8, #e84393);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(253, 121, 168, 0.3);
    font-weight: 600;
}

.btn-35:hover {
    animation: bounce 0.5s;
    box-shadow: 0 15px 30px rgba(253, 121, 168, 0.4);
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}`,

    36: `.btn-36 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-36 {
    color: #333333;
}

.btn-36::before,
.btn-36::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: #8a2be2;
    transition: all 0.4s ease;
    left: 0;
}

.btn-36::before {
    top: 0;
    transform: scaleX(0);
}

.btn-36::after {
    bottom: 0;
    transform: scaleX(0);
}

.btn-36:hover::before,
.btn-36:hover::after {
    transform: scaleX(1);
}

.btn-36:hover {
    color: #8a2be2;
    letter-spacing: 1px;
    background: rgba(138, 43, 226, 0.1);
}`,

    37: `.btn-37 {
    background: linear-gradient(135deg, #74b9ff, #0984e3);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(116, 185, 255, 0.3);
    font-weight: 600;
}

.btn-37:hover {
    transform: rotate(45deg) scale(1.1);
    box-shadow: 0 15px 30px rgba(116, 185, 255, 0.4);
}`,

    38: `.btn-38 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-38 {
    color: #333333;
}

.btn-38:hover {
    animation: shadowRotate 1s infinite;
    background: #8a2be2;
    color: white;
}

@keyframes shadowRotate {
    0% { box-shadow: 0 0 10px #8a2be2; }
    25% { box-shadow: 10px 0 10px #8a2be2; }
    50% { box-shadow: 0 10px 10px #8a2be2; }
    75% { box-shadow: -10px 0 10px #8a2be2; }
    100% { box-shadow: 0 0 10px #8a2be2; }
}`,

    39: `.btn-39 {
    background: linear-gradient(135deg, #00cec9, #00b894);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(0, 206, 201, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-39::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transition: left 0.5s;
}

.btn-39:hover::before {
    left: 100%;
}

.btn-39:hover {
    transform: skewX(-10deg);
    box-shadow: 0 15px 30px rgba(0, 206, 201, 0.4);
}`,

    40: `.btn-40 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-40 {
    color: #333333;
}

.btn-40::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #8a2be2;
    transform: scale(0);
    transition: transform 0.3s;
    z-index: -1;
}

.btn-40:hover::before {
    transform: scale(1);
}

.btn-40:hover {
    color: white;
    animation: colorExplosion 0.5s;
}

@keyframes colorExplosion {
    0% { background: #8a2be2; }
    50% { background: #4b0082; }
    100% { background: #8a2be2; }
}`,

    41: `.btn-41 {
    background: linear-gradient(135deg, #a29bfe, #6c5ce7);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(162, 155, 254, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-41::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.btn-41:hover::before {
    width: 300px;
    height: 300px;
}

.btn-41:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 30px rgba(162, 155, 254, 0.4);
}`,

    42: `.btn-42 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-42 {
    color: #333333;
}

.btn-42::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #8a2be2;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -1;
}

.btn-42:hover::before {
    opacity: 1;
}

.btn-42:hover {
    color: white;
    filter: brightness(1.2);
}`,

    43: `.btn-43 {
    background: linear-gradient(135deg, #fd79a8, #e84393);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(253, 121, 168, 0.3);
    font-weight: 600;
}

.btn-43:hover {
    animation: wobble 0.5s;
    box-shadow: 0 15px 30px rgba(253, 121, 168, 0.4);
}

@keyframes wobble {
    0%, 100% { transform: rotate(0); }
    25% { transform: rotate(-5deg); }
    75% { transform: rotate(5deg); }
}`,

    44: `.btn-44 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-44 {
    color: #333333;
}

.btn-44:hover {
    background: #8a2be2;
    color: white;
    box-shadow: 0 0 20px #8a2be2,
    0 0 40px #8a2be2,
    0 0 60px #8a2be2;
}`,

    45: `.btn-45 {
    background: linear-gradient(135deg, #74b9ff, #0984e3);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(116, 185, 255, 0.3);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.btn-45::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transform: skewX(-45deg);
    transition: left 0.5s;
}

.btn-45:hover::before {
    left: 100%;
}

.btn-45:hover {
    transform: skewX(10deg);
    box-shadow: 0 15px 30px rgba(116, 185, 255, 0.4);
}`,

    46: `.btn-46 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-46 {
    color: #333333;
}

.btn-46:hover {
    animation: quickPulse 0.3s infinite;
    background: #8a2be2;
    color: white;
}

@keyframes quickPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}`,

    47: `.btn-47 {
    background: linear-gradient(135deg, #00cec9, #00b894);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(0, 206, 201, 0.3);
    font-weight: 600;
}

.btn-47:hover {
    animation: continuousSpin 1s infinite linear;
    box-shadow: 0 15px 30px rgba(0, 206, 201, 0.4);
}

@keyframes continuousSpin {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
}`,

    48: `.btn-48 {
    background: transparent;
    color: #00D4FF;
    border: 2px solid #00D4FF;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-48 {
    color: #0088AA;
    border: 2px solid #0088AA;
}

.btn-48::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00D4FF;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.btn-48:hover::before {
    opacity: 1;
}

.btn-48:hover {
    color: #001F29;
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(0, 212, 255, 0.5);
}`,

    49: `.btn-49 {
    background: linear-gradient(135deg, #a29bfe, #6c5ce7);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(162, 155, 254, 0.3);
    font-weight: 600;
}

.btn-49:hover {
    animation: verticalBounce 0.5s;
    box-shadow: 0 15px 30px rgba(162, 155, 254, 0.4);
}

@keyframes verticalBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
}`,

    50: `.btn-50 {
    background: transparent;
    color: #f0f0f0;
    border: 2px solid #8a2be2;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    font-weight: 600;
}

.light-mode .btn-50 {
    color: #333333;
}

.btn-50::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #8a2be2;
    transform: scale(0);
    transition: transform 0.3s;
    z-index: -1;
}

.btn-50:hover::before {
    transform: scale(1);
}

.btn-50:hover {
    color: white;
    animation: finalGlow 1s infinite alternate;
}

@keyframes finalGlow {
    from { box-shadow: 0 0 10px #8a2be2; }
    to { box-shadow: 0 0 20px #8a2be2, 0 0 30px #8a2be2; }
}`
        };
        
        return cssMap[buttonType] || `.btn-${buttonType} {
    background: linear-gradient(135deg, #8a2be2, #4b0082);
    color: white;
    border: none;
    padding: 15px 35px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(138, 43, 226, 0.3);
    font-weight: 600;
}

.btn-${buttonType}:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(138, 43, 226, 0.4);
}`;
    }
    
    function updateLineNumbers(codeId) {
        const codeElement = document.getElementById(codeId);
        const codeBlock = codeElement.closest('.code-block');
        const lineNumbers = codeBlock.querySelector('.line-numbers');
        
        const code = codeElement.textContent;
        const lines = code.split('\n');
        
        let lineNumbersHTML = '';
        lines.forEach((line, index) => {
            lineNumbersHTML += `<div class="line-number">${index + 1}</div>`;
        });
        
        lineNumbers.innerHTML = lineNumbersHTML;
    }
    
    function resetCopyButtons() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(btn => {
            btn.classList.remove('copied');
            btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            btn.style.background = '';
        });
    }
    
    function initializeCopyButtons() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const codeElement = document.getElementById(targetId);
                const code = codeElement.textContent;
                
                // إعادة تعيين جميع أزرار النسخ أولاً
                resetCopyButtons();
                
                // نسخ النص
                navigator.clipboard.writeText(code).then(() => {
                    this.classList.add('copied');
                    this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    this.style.background = '#00b894';
                    
                    setTimeout(() => {
                        this.classList.remove('copied');
                        this.innerHTML = '<i class="fas fa-copy"></i> Copy';
                        this.style.background = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = code;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    this.classList.add('copied');
                    this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    this.style.background = '#00b894';
                    
                    setTimeout(() => {
                        this.classList.remove('copied');
                        this.innerHTML = '<i class="fas fa-copy"></i> Copy';
                        this.style.background = '';
                    }, 2000);
                });
            });
        });
    }
    
    // إغلاق المودال
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // تبديل التبويبات
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // إعادة تعيين أزرار النسخ عند تبديل التبويبات
            resetCopyButtons();
        });
    });
    
    // تهيئة أزرار النسخ
    initializeCopyButtons();
});


    // المشورع مصمم ومطور بواسطة منصة z5code للمشاريع والمكوانت الجاهزة واداوات المصممين المجانية تماما
    // z5code.blogspot.com
    // تمت اضافة التعليقات لتهسيل معرفة أجزاء الكود