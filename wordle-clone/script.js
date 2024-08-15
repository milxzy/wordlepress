// Define possible words and select a random word
async function fetchRandomFiveLetterWord() {
    const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
    const words = await response.json();
    console.log(words[0])
    return words[0].toUpperCase();
}

// Initialize an empty array of guesses
const guesses = [];

async function startGame() {
    const selectedWord = await fetchRandomFiveLetterWord(); // Await the resolved word

    document.getElementById('guess-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        
        const guess = document.getElementById('guess').value.toUpperCase();
        const feedback = guessChecking(selectedWord, guess);
        let feedbackHtml = '';

        feedback.forEach(item => {
            feedbackHtml += `<span class="${item.status}">${item.letter}</span> `;
        });

        // Append the feedback to the bottom
        const feedbackContainer = document.getElementById('feedback-container');
        const feedbackElement = document.createElement('div');
        feedbackElement.innerHTML = feedbackHtml;
        feedbackContainer.appendChild(feedbackElement);

        document.getElementById('guess').value = ''; // Clear the input field

        // Limit to 5 rows of feedback
        if (feedbackContainer.children.length > 5) {
            alert("You've reached the maximum number of guesses! Try again.");
            feedbackContainer.removeChild(feedbackContainer.firstChild); // Remove the oldest guess
        }
    });
}

function guessChecking(selectedWord, guess) {
    const selectedWordLetters = selectedWord.split(''); // Split the selected word into an array of letters
    const guessLetters = guess.split(''); // Split the guess into an array of letters
    const feedbackArray = Array.from({ length: selectedWord.length }, (_, i) => ({
        letter: guessLetters[i],
        status: 'wrong'
    })); // Initialize feedback array with 'wrong' status

    if(guessLetters.length < 5){
        alert('Please enter 5 characters')
        return;
    }

    // Check for correct letters in the correct position
    for (let i = 0; i < selectedWord.length; i++) {
        if (guessLetters[i] === selectedWordLetters[i]) {
            feedbackArray[i].status = 'correct';
            selectedWordLetters[i] = null; // Mark this letter as processed
        }
    }

    // Check for correct letters in the wrong position
    for (let i = 0; i < selectedWord.length; i++) {
        if (feedbackArray[i].status === 'wrong') {
            const index = selectedWordLetters.indexOf(guessLetters[i]);
            if (index !== -1) {
                feedbackArray[i].status = 'present';
                selectedWordLetters[index] = null; // Mark this letter as processed
            }
        }
    }

    console.log(feedbackArray); // Output feedbackArray for debugging
    return feedbackArray;
}

startGame(); // Start the game and handle the rest
