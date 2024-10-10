document.getElementById('bloomButton').addEventListener('click', () => {
  bloomFromInput();
});

// Add event listener for the Enter key
document.getElementById('wordInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    bloomFromInput();
  }
});

function bloomFromInput() {
  const wordInput = document.getElementById('wordInput').value.trim();
  if (wordInput) {
    bloomFlower(wordInput);
    document.getElementById('wordInput').value = ''; // Clear input after bloom
  }
}

function bloomFlower(word) {
  const garden = document.getElementById('garden');
  const flower = document.createElement('div');
  flower.classList.add('flower');

  // Create flower center
  const center = document.createElement('div');
  center.classList.add('flower-center');
  flower.appendChild(center);

  // Create petals based on word length
  const petalCount = Math.min(Math.max(word.length, 5), 12); // Set a reasonable range for petals
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    // Position the petal around the center in a circle
    const angle = (360 / petalCount) * i;
    petal.style.transform = `rotate(${angle}deg) translate(0, -50px)`;

    // Set petal color based on word sentiment
    const sentiment = analyzeSentiment(word);
    petal.style.backgroundColor = sentimentColor(sentiment);

    flower.appendChild(petal);
  }

  // Try to find a non-overlapping position
  let positionFound = false;
  let attempts = 0;
  const maxAttempts = 100; // Limit the number of attempts to find a position

  while (!positionFound && attempts < maxAttempts) {
    const left = Math.random() * (garden.clientWidth - 100); // Adjust for flower width
    const top = Math.random() * (garden.clientHeight - 100); // Adjust for flower height

    // Set the position for the flower
    flower.style.left = `${left}px`;
    flower.style.top = `${top}px`;

    // Check for overlap with existing flowers
    if (!isOverlapping(garden, flower)) {
      positionFound = true;
    }

    attempts++;
  }

  // Add the flower to the garden if a valid position was found
  if (positionFound) {
    garden.appendChild(flower);
  }
}

function isOverlapping(garden, newFlower) {
    const flowers = garden.getElementsByClassName('flower');
    const newRect = newFlower.getBoundingClientRect();
    
    // Calculate effective radius based on the number of petals and their dimensions
    const petalCount = newFlower.children.length - 1; // Exclude center
    const petalWidth = 20; // width of petal
    const petalHeight = 50; // height of petal
    const flowerRadius = (petalCount > 0 ? petalCount * petalWidth / (2 * Math.PI) : 0) + (petalHeight / 2) + 10; // Adding some padding
  
    for (let flower of flowers) {
      const flowerRect = flower.getBoundingClientRect();
      
      // Calculate the distance between the centers of the flowers
      const centerX1 = newRect.x + newRect.width / 2;
      const centerY1 = newRect.y + newRect.height / 2;
      const centerX2 = flowerRect.x + flowerRect.width / 2;
      const centerY2 = flowerRect.y + flowerRect.height / 2;
  
      const dx = centerX1 - centerX2;
      const dy = centerY1 - centerY2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Check for overlap using the radius
      if (distance < flowerRadius + (flowerRadius)) {
        return true; // Overlap detected
      }
    }
    return false; // No overlap
  }
  

function analyzeSentiment(word) {
  const positiveWords = ['happy', 'love', 'joy', 'peace', 'excited'];
  const negativeWords = ['sad', 'angry', 'fear', 'hate', 'tired'];

  if (positiveWords.some(pw => word.includes(pw))) return 'positive';
  if (negativeWords.some(nw => word.includes(nw))) return 'negative';
  return 'neutral';
}

function sentimentColor(sentiment) {
  switch (sentiment) {
    case 'positive':
      return 'lightgreen';
    case 'negative':
      return 'lightcoral';
    default:
      return 'lightblue';
  }
}
