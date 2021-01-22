const randomQuote = {}

randomQuote.$body = $('body')
randomQuote.$container = $('.container')
randomQuote.$quote = $('.quote')
randomQuote.$author = $('.author')
randomQuote.$quoteP = $('.quoteP') 

randomQuote.$btn = $('.btn')
randomQuote.$next = $('.next')
randomQuote.$tweet = $('.tweet')

let quote, author


// Call the API
randomQuote.fetchQuotes = () => {
    fetch("https://type.fit/api/quotes")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            randomQuote.firstQuote(data)
            randomQuote.getQuoteAndAuthor(data)
    });
}


// Create a method to get random colors
randomQuote.colors = () => {
    const red = Math.floor(Math.random() * 225)
    const green = Math.floor(Math.random() * 225)
    const blue = Math.floor(Math.random() * 225)

    randomQuote.$body.css('background-color', `rgba(${red}, ${green}, ${blue}, 0.8)`)
    randomQuote.$quoteP.css('color', `rgba(${red}, ${green}, ${blue}, 0.8)`)
    randomQuote.$author.css('color', `rgba(${red}, ${green}, ${blue}, 0.8)`)
    randomQuote.$btn.css('background-color', `rgba(${red}, ${green}, ${blue}, 0.8)`)
}


// Create a method to get and display the quote and author using the next button
randomQuote.getQuoteAndAuthor = (quoteData) => {    
    $('.next').on('click', function(){    
        const quoteIndex = Math.floor(Math.random() * quoteData.length)

        quote = quoteData[quoteIndex].text
        author = quoteData[quoteIndex].author

        randomQuote.$quoteP.html(quote) 
        randomQuote.$author.html(`- ${author}`) 
        randomQuote.colors()
    })
}


// Create a method that will tweet the quote
randomQuote.tweetQuote = () => {
    $('.tweet').on('click', function(){
        let quot = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
        $('#anchorTweet').attr('href', quot)
    })
}

// Method for initializing the random quote app
randomQuote.init = () => {
    randomQuote.firstQuote = (firstDisplay) => { // First display of quote on page load
        const quoteIndex = Math.floor(Math.random() * 10)

        quote = firstDisplay[quoteIndex].text
        author = firstDisplay[quoteIndex].author
                   
        randomQuote.$quoteP.html(quote) 
        randomQuote.$author.html(`- ${author}`) 
        randomQuote.colors()
    }
    randomQuote.fetchQuotes()
    randomQuote.tweetQuote()
}

$(document).ready(function(){
  randomQuote.init()
})
