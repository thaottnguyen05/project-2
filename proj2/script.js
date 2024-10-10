let plantButton = document.getElementById('plantButton');
let input = document.getElementById('input');
let garden = document.getElementById('garden');
let petalCount = 6; 

plantButton.addEventListener('click', displayFlower);
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') 
    displayFlower();
});


function displayFlower() {
  let userInput = input.value;
  if (userInput) {
    let flower = createFlower(userInput);
    randomPos(flower);
    garden.append(flower);
    input.value = ''; // Clear input after adding flower
  }
}

function createFlower(userInput) { 
  let flower = document.createElement('div');
  flower.classList.add('flower');

  let center = document.createElement('div');
  center.classList.add('center');

  flower.append(center);

  for (let i = 0; i < petalCount; i++) {
    let petal = document.createElement('div');
    petal.classList.add('petal');

    let angle = (360 / petalCount) * i;  
    petal.style.transform = `rotate(${angle}deg) translate(0px,-25px)`;

    petal.style.backgroundColor = petalColor(sentiment(userInput));
    flower.append(petal);
  }

  return flower; 
}

function randomPos(flower) {
  let randomColumn = Math.floor(Math.random() * 5) +1; // Start position in the grid
  let randomRow = Math.floor(Math.random() * 5) +1; // Start position in the grid
  flower.style.gridColumnStart = randomColumn;
  flower.style.gridRowStart = randomRow;
}

function sentiment(userInput) {
  let positiveWords = [
    'happy', 'happiness', 'happier', 'happiest', 'amazing', 'beautiful', 'fun',
    'love', 'loved', 'loving',
    'like', 'liked', 'liking',
    'joy', 'joyful', 'joyfulness',
    'peace', 'peaceful', 'peacefully',
    'excited', 'excitement', 'exciting',
    'hope', 'hopeful', 'hoped', 'hoping',
    'good', 'great', 'awesome', 'fantastic', 'ecstatic',
    'grateful', 'gratitude', 'gratefully',
    'success', 'successful', 'succeeded', 'succeeding',
    'brave', 'bravery', 'braver', 'bravest',
    'bright', 'brightness', 'brighter', 'brightest',
    'wonderful', 'wonderfully', 'wonder',
    'creative', 'creativity', 'creatively',
    'kind', 'kindness', 'kinder', 'kindest',
    'cheerful', 'cheerfulness', 'cheerfully',
    'strong', 'strength', 'stronger', 'strongest',
    'support', 'supportive', 'supported', 'supporting',
    'inspire', 'inspiring', 'inspired', 'inspiration',
    'delight', 'delighted', 'delightful', 'delighting',
    'caring', 'care', 'cared', 'caring',
    'motivate', 'motivated', 'motivating', 'motivation'
  ];
  let negativeWords = [
    'sad', 'sadder', 'saddest',
    'angry', 'anger', 'angrier', 'angriest',
    'fear', 'fearful', 'feared', 'fearing',
    'hate', 'hated', 'hating', 'tire',
    'bad', 'terrible', 'mad', 'sick', 'down', 
    'depressed', 'depressing', 'gloomy',
    'tired', 'tiredness', 'tiring',
    'disappoint', 'disappointed', 'disappointing',
    'worry', 'worried', 'worrying',
    'frustrate', 'frustrated', 'frustrating',
    'lonely', 'loneliness',
    'stress', 'stressed', 'stressing',
    'jealous', 'jealousy', 'more jealous',
    'regret', 'regretted', 'regretting',
    'bitter', 'bitterness', 'more bitter',
    'fail', 'failed', 'failing',
    'overwhelm', 'overwhelmed', 'overwhelming',
    'negative', 'negativity', 'more negative',
    'suffer', 'suffered', 'suffering',
    'annoy', 'annoyed', 'annoying',
    'distrust', 'distrustful', 'distrusted', 'distrusting',
    'pain', 'painful', 'pained'
  ];

  for (let x = 0; x < positiveWords.length; x++) {
    
    if (userInput.includes(positiveWords[x])) {
      return 'positive';
    }
  }

  for (let x = 0; x < negativeWords.length; x++) {
    
    if (userInput.includes(negativeWords[x])) {
      return 'negative';
    }
  }

  return 'neutral'

}

function petalColor(sentiment) {
  let color; // Declare a variable to hold the color

  if (sentiment == 'positive') {
    color = 'lightgreen'; // Set color for positive sentiment
  } else if (sentiment == 'negative') {
    color = 'lightcoral'; // Set color for negative sentiment
  } else {
    color = 'lightblue'; // Default color for neutral sentiment
  }

  return color; // Return the determined color
}