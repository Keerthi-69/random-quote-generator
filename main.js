let currentCategory = 'quote-of-the-day';

async function fetchQuote(category) {
    currentCategory = category;

    let apiUrl;
    if (category === 'quote-of-the-day') {
        apiUrl = 'https://api.quotable.io/random';
    } else {
        apiUrl = `https://api.quotable.io/quotes?tags=${category}`;
    }
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        let quoteData;
        if (category === 'quote-of-the-day') {
            quoteData = data;
        } else {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            quoteData = data.results[randomIndex];
        }

        displayQuote(category, quoteData.content, quoteData.author);
        
    } catch (error) {
        document.getElementById('quote-text').innerText = "Oops, could not fetch a quote. Try again!";
        document.getElementById('quote-author').innerText = "";
        console.error("Fetch error: ", error);
    }

    setActiveButton(category);
}


function displayQuote(category, quote, author) {
    const categoryText = category === 'quote-of-the-day' ? 'Quote of the Day' : `${capitalize(category)} Quote`;
    
    document.getElementById('quote-category').innerText = categoryText;
    document.getElementById('quote-text').innerText = quote;
    document.getElementById('quote-author').innerText = `- ${author}`;
}

function capitalize(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

function setActiveButton(category) {
    const buttons = document.querySelectorAll('.category-buttons button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`${category}-btn`).classList.add('active');
}

window.onload = () => {
    fetchQuote('quote-of-the-day');
};
