let plantButton = document.getElementById('plantButton');
let wordInput = document.getElementById('wordInput');
let garden = document.getElementById('garden');
let petalCount = 6; // Fixed number of petals

plantButton.addEventListener('click', bloomFromInput);
wordInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') bloomFromInput();
});

function bloomFromInput() {
  let word = wordInput.value.trim();
  if (word) {
    let flower = createFlower(word);
    placeFlowerRandomly(flower);
    garden.appendChild(flower);
    wordInput.value = ''; // Clear input after bloom
  }
}

function createFlower(word) {
  let flower = document.createElement('div');
  flower.classList.add('flower');
  
  let center = document.createElement('div');
  center.classList.add('flower-center');
  flower.appendChild(center);
  
  for (let i = 0; i < petalCount; i++) {
    let petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.transform = 'rotate(' + (360 / petalCount) * i + 'deg) translate(0, -25px)';
    petal.style.backgroundColor = sentimentColor(analyzeSentiment(word));
    flower.appendChild(petal);
  }
  
  return flower;
}

function placeFlowerRandomly(flower) {
  flower.style.gridColumnStart = Math.floor(Math.random() * 5) + 1; // Random column
  flower.style.gridRowStart = Math.floor(Math.random() * 5) + 1; // Random row
}

function analyzeSentiment(word) {
  let positiveWords = [
    'happy', 'happiness', 'happier', 'happiest', 
    'amazing', 'beautiful', 'fun', 'good', 'great', 'awesome', 
    'like', 'liked', 
    'love', 'loved', 'loving',
    'joy', 'joyful', 'joyfulness',
    'peace', 'peaceful', 'peacefully',
    'excited', 'excitement', 'exciting',
    'hope', 'hopeful', 'hoped', 'hoping',
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
    'bad', 'teerible', 'sad', 'sadder', 'saddest',
    'angry', 'anger', 'angrier', 'angriest',
    'fear', 'fearful', 'feared', 'fearing',
    'hate', 'hated', 'hating', 'tire',
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

  for (let pw of positiveWords) {
    if (word.includes(pw)) return 'positive'; 
  }

  for (let nw of negativeWords) {
    if (word.includes(nw)) return 'negative'; 
  }
  
  return 'neutral';
}

function sentimentColor(sentiment) {
  if (sentiment === 'positive') return 'lightgreen';
  if (sentiment === 'negative') return 'lightcoral';
  return 'lightblue'; 
}
