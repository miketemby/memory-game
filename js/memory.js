// create elements and append to container (card divs within container)
imageArray = ['image-1','image-2','image-3','image-4','image-5','image-6','image-7','image-8','image-9','image-10','image-11','image-12','image-13','image-14','image-15','image-16','image-17','image-18','image-1','image-2','image-3','image-4','image-5','image-6','image-7','image-8','image-9','image-10','image-11','image-12','image-13','image-14','image-15','image-16','image-17','image-18'];
const shuffle_button = document.querySelector('.shuffle-button')
const memCards = [...document.getElementsByClassName('tile')];
let clickCount = 0;
let tilePair = [];
let score = 0;
let shuffler = false;

const randomFacts = [
    'Real diamonds can be made from peanut butter!',
    'Your body is creating and killing 15 million red blood cells per second.',
    'Camels have three eyelids to protect themselves from blowing sand!',
    'You mostly breathe from only one nostril at a time!',
    'The dot over the letter \'i\' is called a tittle.',
    'It takes eight and a half minutes for light to get from the sun to earth.',
    'It takes a drop of ocean water more than 1,000 years to circulate around the world.',
    'The inventor of the Waffle Iron did not like waffles.'
];



// add event listener to shuffle button send clicks to shuffle function inputting cards array
shuffle_button.addEventListener('click', function() {shuffle(memCards)});

// add event listners to all cards send clicked card to clicked function
for (memCard of memCards) {
    memCard.addEventListener('click', function() {
        clicked(event.target.parentElement);
    });
}

function randomNum(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// shuffle function only shuffles once and cannot shuffle after game starts
function shuffle(a) {

    // only shuffle if they havent been shuffled
    if(!shuffler) {
        if (clickCount == 0 && score == 0) {
            let j, x, i;
            let k = 0;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }

            for(card of a) {
                k = a.indexOf(card);
                card.lastElementChild.classList.add(imageArray[k]);
            }
            // return a;
            document.querySelector('.info').textContent = 'Cards Shuffled - Good Luck!';
        }
        else {
            document.querySelector('.info').textContent = 'You cannot shuffle during a game';
        }
        shuffler = true;
    }
    else {
        document.querySelector('.info').textContent = 'You\'ve Already Shuffled!';
    }
}



// perform click action if not fliped and less than two clicked already
function clicked(element) {
    if(!element.classList.contains('tile-clicked') && clickCount<2 && !element.classList.contains('won')){
        clicks(element);
    }
    else {
        //just cos
        document.querySelector('.info').textContent = 'did you know: ' + randomFacts[randomNum(0,randomFacts.length)];;
    }
}

// performs click actions, counts clicks and ensures cards are shuffled, calles two clicks fucntions if it's a second click
function clicks(element) {

    if(!shuffler) {
        document.querySelector('.info').textContent = 'You Need To Shuffle The Cards First!';
    }
    else {
        clickCount ++;
        element.classList.add('tile-clicked');
        tilePair.push(element);
        
        if (clickCount == 2) {
            twoClicked();
        }
    }

}

// run once two tiles are clicked
// updates running score, performs match check, performs end game check
function twoClicked() {
    let firstTile;
    let secondTile;
    score++;
    // get :after content of each tiles back face 
    for(clickedTile of tilePair) {
        
        if ( tilePair.indexOf(clickedTile) == 0) {
            firstTile = window.getComputedStyle(clickedTile.lastElementChild, ':after').getPropertyValue('content');
        }
        else {
            secondTile = window.getComputedStyle(clickedTile.lastElementChild, ':after').getPropertyValue('content');
        }
    }

    // if back face content matches its a wining pair
    if (firstTile == secondTile) {
              
        for (tile of tilePair) {
            tile.classList.add('won');
        }
        score--
        setTimeout(
            function() {
                document.querySelector('.info').textContent = 'Yes!! You Got One';
            }, 1000);
        

    }
    else {
        setTimeout(
            function() {
                document.querySelector('.info').textContent = 'Awww, Not A Match';
            }, 1000);
    }

    document.querySelector('.score').textContent = score;

    // flip back over after 2 seconds
    setTimeout(
        function() { 
            for(clickedTile of tilePair) {
                clickedTile.classList.remove('tile-clicked');
            }
            clickCount = 0;
            tilePair = [];
        }, 2000);

    let gameOver = [...document.getElementsByClassName('won')].length;
        if( gameOver==36 ) {
            for (memCard of memCards) {
                memCard.classList.remove('won');
                memCard.classList.add('game-over');
                document.querySelector('.end-game').classList.add('over');
            }
            setTimeout(
                function() { 
                    reset();
                }, 7000);
        }
}

// update to perform end game stuff before running this on a timer
// performs reset actions
function reset() {
    shuffler = false;
    score = 0;
    document.querySelector('.end-game').classList.remove('over');
    for(card of memCards) {
        card.classList.remove('game-over');
        card.lastElementChild.className = 'back';
    }
}