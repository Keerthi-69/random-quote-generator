let currentCategory = 'quote-of-the-day';

const fallbackQuotes = {
    "quote-of-the-day": [
        { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { content: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
        { content: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" }
    ],
    "friendship": [
        { content: "A real friend is one who walks in when the rest of the world walks out.", author: "Walter Winchell" },
        { content: "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'", author: "C.S. Lewis" },
        { content: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard" },
        { content: "Friendship is the only cement that will ever hold the world together.", author: "Woodrow Wilson" },
        { content: "Friends are the family you choose.", author: "Jess C. Scott" }
    ],
    "life": [
        { content: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { content: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
        { content: "Life is what happens to you while you're busy making other plans.", author: "Allen Saunders" },
        { content: "Get busy living or get busy dying.", author: "Stephen King" },
        { content: "You only live once, but if you do it right, once is enough.", author: "Mae West" }
    ],
    "love": [
        { content: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
        { content: "Where there is love there is life.", author: "Mahatma Gandhi" },
        { content: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
        { content: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
        { content: "Love is an untamed force. When we try to control it, it destroys us. When we try to imprison it, it enslaves us. When we try to understand it, it leaves us feeling lost and confused.", author: "Paulo Coelho" }
    ],
    "inspirational": [
        { content: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
        { content: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { content: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
        { content: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
    ],
    "motivational": [
        { content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        { content: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
        { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { content: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
        { content: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.", author: "Roy T. Bennett" }
    ],
    "success": [
        { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { content: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
        { content: "The secret of success is to do the common thing uncommonly well.", author: "John D. Rockefeller Jr." },
        { content: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
        { content: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" }
    ],
    "wisdom": [
        { content: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
        { content: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.", author: "Albert Einstein" },
        { content: "The fool doth think he is wise, but the wise man knows himself to be a fool.", author: "William Shakespeare" },
        { content: "By three methods we may learn wisdom: First, by reflection, which is noblest; Second, by imitation, which is easiest; and third by experience, which is the bitterest.", author: "Confucius" },
        { content: "The invariable mark of wisdom is to see the miraculous in the common.", author: "Ralph Waldo Emerson" }
    ],
    "technology": [
        { content: "It has become appallingly obvious that our technology has exceeded our humanity.", author: "Albert Einstein" },
        { content: "The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.", author: "Bill Gates" },
        { content: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
        { content: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
        { content: "The human spirit must prevail over technology.", author: "Albert Einstein" }
    ]
};

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
        console.error("Fetch error: ", error);
        // document.getElementById('quote-text').innerText = "Oops, could not fetch a quote. Try again!";
        // document.getElementById('quote-author').innerText = "";

        const fallbackCategory = fallbackQuotes[category] ? category : 'quote-of-the-day';
        const quotes = fallbackQuotes[fallbackCategory];
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quoteData = quotes[randomIndex];
        displayQuote(category, quoteData.content, quoteData.author);
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

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    
    if (email) {
        document.getElementById('username').innerText = `Welcome, ${email}`;
    } else {
        document.getElementById('username').innerText = 'Welcome, Guest';
    }
};

function signOut() {
    window.location.href = 'index.html';
}
