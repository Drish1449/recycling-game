// Game items database
const items = [
    {
        name: "Plastic Water Bottle",
        image: "https://cdn.pixabay.com/photo/2016/11/29/08/41/bottle-1868532_640.jpg",
        category: "recyclable"
    },
    {
        name: "Pizza Box",
        image: "https://cdn.pixabay.com/photo/2017/01/22/19/20/pizza-2000615_640.jpg",
        category: "not-recyclable"
    },
    {
        name: "Aluminum Can",
        image: "https://cdn.pixabay.com/photo/2014/09/26/19/51/drink-462776_640.jpg",
        category: "recyclable"
    },
    {
        name: "Battery",
        image: "https://cdn.pixabay.com/photo/2013/07/13/01/22/battery-155427_640.png",
        category: "special"
    },
    {
        name: "Glass Bottle",
        image: "https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_640.png",
        category: "recyclable"
    },
    {
        name: "Plastic Bag",
        image: "https://cdn.pixabay.com/photo/2017/06/20/22/14/plastic-2427623_640.jpg",
        category: "special"
    },
    {
        name: "Used Napkin",
        image: "https://cdn.pixabay.com/photo/2016/03/27/22/22/napkin-1284638_640.jpg",
        category: "not-recyclable"
    },
    {
        name: "Newspaper",
        image: "https://cdn.pixabay.com/photo/2014/08/08/20/51/newspaper-414224_640.jpg",
        category: "recyclable"
    },
    {
        name: "Styrofoam Cup",
        image: "https://cdn.pixabay.com/photo/2014/08/08/20/51/cup-414225_640.jpg",
        category: "not-recyclable"
    },
    {
        name: "Electronics",
        image: "https://cdn.pixabay.com/photo/2014/09/20/13/52/board-453758_640.jpg",
        category: "special"
    }
];

// Game variables
let currentItemIndex = 0;
let score = 0;
let gameItems = [...items];
let currentItem = null;

// DOM elements
const itemImage = document.getElementById('item-image');
const itemName = document.getElementById('item-name');
const scoreDisplay = document.getElementById('score');
const progressDisplay = document.getElementById('progress');
const feedbackDisplay = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const recyclableBtn = document.getElementById('recyclable');
const notRecyclableBtn = document.getElementById('not-recyclable');
const specialBtn = document.getElementById('special');

// Initialize game
function initGame() {
    score = 0;
    currentItemIndex = 0;
    gameItems = shuffleArray([...items]);
    updateScore();
    showNextItem();
}

// Show next item
function showNextItem() {
    if (currentItemIndex >= 10) {
        // Game over
        itemImage.src = "";
        itemName.textContent = "Game Over!";
        feedbackDisplay.textContent = `Your final score is ${score}/10`;
        feedbackDisplay.className = "feedback";
        nextBtn.style.display = "none";
        return;
    }

    currentItem = gameItems[currentItemIndex];
    itemImage.src = currentItem.image;
    itemName.textContent = currentItem.name;
    feedbackDisplay.textContent = "";
    feedbackDisplay.className = "feedback";
    nextBtn.style.display = "none";
    enableButtons();
}

// Handle user choice
function handleChoice(selectedCategory) {
    disableButtons();
    
    if (selectedCategory === currentItem.category) {
        score++;
        feedbackDisplay.textContent = "Correct! " + getFeedbackMessage(currentItem);
        feedbackDisplay.className = "feedback correct";
    } else {
        feedbackDisplay.textContent = `Incorrect. ${currentItem.name} is ${formatCategory(currentItem.category)}. ` + getFeedbackMessage(currentItem);
        feedbackDisplay.className = "feedback incorrect";
    }
    
    updateScore();
    nextBtn.style.display = "inline-block";
    currentItemIndex++;
}

// Helper functions
function updateScore() {
    scoreDisplay.textContent = score;
    progressDisplay.textContent = `${currentItemIndex + 1}/10`;
}

function disableButtons() {
    recyclableBtn.disabled = true;
    notRecyclableBtn.disabled = true;
    specialBtn.disabled = true;
}

function enableButtons() {
    recyclableBtn.disabled = false;
    notRecyclableBtn.disabled = false;
    specialBtn.disabled = false;
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function formatCategory(category) {
    return category === "recyclable" ? "recyclable" : 
           category === "not-recyclable" ? "not recyclable" : 
           "requires special handling";
}

function getFeedbackMessage(item) {
    const messages = {
        "recyclable": "This item can be placed in your regular recycling bin after cleaning.",
        "not-recyclable": "This item should be placed in the trash.",
        "special": "This item requires special handling. Check with your local recycling center."
    };
    return messages[item.category];
}

// Event listeners
recyclableBtn.addEventListener('click', () => handleChoice('recyclable'));
notRecyclableBtn.addEventListener('click', () => handleChoice('not-recyclable'));
specialBtn.addEventListener('click', () => handleChoice('special'));
nextBtn.addEventListener('click', showNextItem);

// Start the game
initGame();