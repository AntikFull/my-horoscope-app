document.addEventListener('DOMContentLoaded', function () {
    const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    const zodiacImagesContainer = document.getElementById('zodiac-images');
    const categoryButtonsContainer = document.getElementById('category-buttons');
    const resultDiv = document.getElementById('result');
    let currentSign = '';

    const gidMap = {
        "aries_tomorrow": "aries_tomorrow",
        "taurus_tomorrow": "taurus_tomorrow",
        "gemini_tomorrow": "gemini_tomorrow",
        "cancer_tomorrow": "cancer_tomorrow",
        "leo_tomorrow": "leo_tomorrow",
        "virgo_tomorrow": "virgo_tomorrow",
        "libra_tomorrow": "libra_tomorrow",
        "scorpio_tomorrow": "scorpio_tomorrow",
        "sagittarius_tomorrow": "sagittarius_tomorrow",
        "capricorn_tomorrow": "capricorn_tomorrow",
        "aquarius_tomorrow": "aquarius_tomorrow",
        "pisces_tomorrow": "pisces_tomorrow",
        "aries_day": "aries_day",
        "aries_week": "aries_week",
        "aries_love_week": "aries_love_week",
        "aries_love": "aries_love",
        "aries_business_week": "aries_business_week",
        "aries_business": "aries_business",
        "taurus_day": "taurus_day",
        "taurus_week": "taurus_week",
        "taurus_love_week": "taurus_love_week",
        "taurus_love": "taurus_love",
        "taurus_business_week": "taurus_business_week",
        "taurus_business": "taurus_business",
        "gemini_day": "gemini_day",
        "gemini_week": "gemini_week",
        "gemini_love_week": "gemini_love_week",
        "gemini_love": "gemini_love",
        "gemini_business_week": "gemini_business_week",
        "gemini_business": "gemini_business",
        "cancer_day": "cancer_day",
        "cancer_week": "cancer_week",
        "cancer_love_week": "cancer_love_week",
        "cancer_love": "cancer_love",
        "cancer_business_week": "cancer_business_week",
        "cancer_business": "cancer_business",
        "leo_day": "leo_day",
        "leo_week": "leo_week",
        "leo_love_week": "leo_love_week",
        "leo_love": "leo_love",
        "leo_business_week": "leo_business_week",
        "leo_business": "leo_business",
        "virgo_day": "virgo_day",
        "virgo_week": "virgo_week",
        "virgo_love_week": "virgo_love_week",
        "virgo_love": "virgo_love",
        "virgo_business_week": "virgo_business_week",
        "virgo_business": "virgo_business",
        "libra_day": "libra_day",
        "libra_week": "libra_week",
        "libra_love_week": "libra_love_week",
        "libra_love": "libra_love",
        "libra_business_week": "libra_business_week",
        "libra_business": "libra_business",
        "scorpio_day": "scorpio_day",
        "scorpio_week": "scorpio_week",
        "scorpio_love_week": "scorpio_love_week",
        "scorpio_love": "scorpio_love",
        "scorpio_business_week": "scorpio_business_week",
        "scorpio_business": "scorpio_business",
        "sagittarius_day": "sagittarius_day",
        "sagittarius_week": "sagittarius_week",
        "sagittarius_love_week": "sagittarius_love_week",
        "sagittarius_love": "sagittarius_love",
        "sagittarius_business_week": "sagittarius_business_week",
        "sagittarius_business": "sagittarius_business",
        "capricorn_day": "capricorn_day",
        "capricorn_week": "capricorn_week",
        "capricorn_love_week": "capricorn_love_week",
        "capricorn_love": "capricorn_love",
        "capricorn_business_week": "capricorn_business_week",
        "capricorn_business": "capricorn_business",
        "aquarius_day": "aquarius_day",
        "aquarius_week": "aquarius_week",
        "aquarius_love_week": "aquarius_love_week",
        "aquarius_love": "aquarius_love",
        "aquarius_business_week": "aquarius_business_week",
        "aquarius_business": "aquarius_business",
        "pisces_day": "pisces_day",
        "pisces_week": "pisces_week",
        "pisces_love_week": "pisces_love_week",
        "pisces_love": "pisces_love",
        "pisces_business_week": "pisces_business_week",
        "pisces_business": "pisces_business"
    };

    signs.forEach(sign => {
        const img = document.createElement('img');
        img.src = `images/${sign}.png`;
        img.alt = sign;
        img.onclick = () => {
            currentSign = sign;
            showCategoryButtons();
        };
        zodiacImagesContainer.appendChild(img);
    });

    function showCategoryButtons() {
        zodiacImagesContainer.style.display = 'none';
        categoryButtonsContainer.style.display = 'block';
        categoryButtonsContainer.querySelectorAll('button').forEach(button => {
            button.onclick = () => fetchHoroscope(currentSign, button.getAttribute('data-category'));
        });
    }

    async function fetchHoroscope(sign, category) {
    const key = `${sign}_${category}`;
    const sheetName = gidMap[key];

    if (!sheetName) {
        console.error('Неверное сочетание знака и категории');
        return;
    }

    const url = `https://script.google.com/macros/s/AKfycbzy5wqG-hOEXWr0TvRk4d469hWdY-xxOSqV8fma98sCGCjsFq-OmSLx8svRGoObrOI/exec?sheetName=${sheetName}`;

    console.log(`Fetching data from: ${url}`);

    // Показываем загрузочный индикатор
    document.getElementById('loadingSpinner').style.display = 'block';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка сети, статус: ${response.status}`);
        }

        const data = await response.text();
        
        const formattedData = data.split(/_-_/g).map(line => {
            if (line.trim()) {
                return `<p><span class="red-letter">${line.charAt(0)}</span>${line.slice(1)}</p>`;
            }
            return '';
        }).join('');

        console.log('Полученные данные:', formattedData);

        resultDiv.innerHTML = formattedData;
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        resultDiv.textContent = 'Ошибка при загрузке данных';
    } finally {
        // Скрываем загрузочный индикатор
        document.getElementById('loadingSpinner').style.display = 'none';
    }
}
});
