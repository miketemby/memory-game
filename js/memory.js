// create elements and append to container (card divs within container)
const imageArrayEasy = ['image-1','image-2','image-8','image-9','image-10','image-12','image-14','image-18','image-1','image-2','image-8','image-9','image-10','image-12','image-14','image-18'];
const imageArrayHard = ['image-1','image-2','image-3','image-4','image-5','image-6','image-7','image-8','image-9','image-10','image-11','image-12','image-13','image-14','image-15','image-16','image-17','image-18','image-1','image-2','image-3','image-4','image-5','image-6','image-7','image-8','image-9','image-10','image-11','image-12','image-13','image-14','image-15','image-16','image-17','image-18'];
const imageArrayMayhem = ['mayhem-1','mayhem-2','mayhem-3','mayhem-4','mayhem-5','mayhem-6','mayhem-7','mayhem-8','mayhem-9','mayhem-10','mayhem-11','mayhem-12','mayhem-13','mayhem-14','mayhem-15','mayhem-16','mayhem-17','mayhem-18','mayhem-1','mayhem-2','mayhem-3','mayhem-4','mayhem-5','mayhem-6','mayhem-7','mayhem-8','mayhem-9','mayhem-10','mayhem-11','mayhem-12','mayhem-13','mayhem-14','mayhem-15','mayhem-16','mayhem-17','mayhem-18'];
const reset_button = document.querySelector('#reset-button')
const easy_button = document.querySelector('#easy-button')
const hard_button = document.querySelector('#hard-button')
const memory_master_button = document.querySelector('#master-button')
const mayhem_button = document.querySelector('#mayhem-button')
const modal = document.getElementById('endgame-modal');
const span = document.getElementsByClassName("close")[0];
const modal_content = document.querySelector('.modal-content');
let _replay = document.querySelector('#modal-reset-button');;
let memCards = [];
let clickCount = 0;
let tilePair = [];
let score = 0;
let shuffler = false;
let tileDiv;
let frontDiv;
let backDiv; 
let mainSection = document.querySelector('.main');
let mode;
let mayhemTimerID;
let start = true;
let stars = '';
let startRating;
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

// default mode when page is opened
easy();

star_rating(score, 8);
document.querySelector('#star-rating').innerHTML = '';
document.querySelector('#star-rating').insertAdjacentHTML('afterbegin', stars);

// add event listener to reset button and run whichever mode we are in
reset_button.addEventListener('click', function() {
    reset();

});

// add event listener to mode button send clicks to mode function 
easy_button.addEventListener('click', function() {
    easy();
});

// add event listener to mode button send clicks to mode function 
hard_button.addEventListener('click', function() {
    hard();
});

// add event listener to mode button send clicks to mode function 
memory_master_button.addEventListener('click', function() {
    memoryMaster();
});

// add event listener to mode button send clicks to mode function 
mayhem_button.addEventListener('click', function() {
    mayhem();
});

_replay.addEventListener('click', function() {
    reset();
});


// add event listners to all cards send clicked card to clicked function

function setMemCards() {

    // stop mayhem timer

    clearInterval(mayhemTimerID);

    memCards = [...document.getElementsByClassName('tile')];

    for (memCard of memCards) {
        memCard.addEventListener('click', function() {
            clicked(event.target.parentElement);
        });
    }

    shuffle(memCards);

}

// easy mode - (default) adds 16 tiles
function easy() {
    if(start) {

        const buttons = document.getElementsByClassName('mode-button');
            for (button of buttons) {
                button.classList.remove('selected');
            }
        document.getElementById('easy-button').classList.add('selected'); 

        document.querySelector('.info').textContent = 'Basic 16 tile memory game - childs play really';

        mode = 'easy';

        //remove all childred first
        mainSection.innerHTML = '';

        for (let i = 0; i < 16; i++) {

            tileDiv = document.createElement('div');
            tileDiv.classList.add('tile');
            tileDiv.classList.add('easy');

            frontDiv = document.createElement('div');
            frontDiv.classList.add('front');
        
            backDiv = document.createElement('div');
            backDiv.classList.add('back');
            tileDiv.appendChild(frontDiv);
            tileDiv.appendChild(backDiv);
            mainSection.appendChild(tileDiv);
            }
        
        //reset things so game starts again
        clickCount = 0;
        tilePair = [];
        score = 0;

        // set new array and add new eventlisteners
        setMemCards();

    } else {
        document.querySelector('.info').textContent = 'You cannot change modes mid game - reset first';
    }

}

//hard mode function - adds 36 tiles
function hard() {
    if(start) {

        const buttons = document.getElementsByClassName('mode-button');
        for (button of buttons) {
            button.classList.remove('selected');
        }
        document.getElementById('hard-button').classList.add('selected'); 

        document.querySelector('.info').textContent = '36 tiles with some tricky images - look out';

        mode = 'hard';

        //remove all childred first
        mainSection.innerHTML = '';

        for (let i = 0; i < 36; i++) {

            tileDiv = document.createElement('div');
            tileDiv.classList.add('tile');

            frontDiv = document.createElement('div');
            frontDiv.classList.add('front');
        
            backDiv = document.createElement('div');
            backDiv.classList.add('back');
            tileDiv.appendChild(frontDiv);
            tileDiv.appendChild(backDiv);
            mainSection.appendChild(tileDiv);
            }

        //reset things so game starts again
        clickCount = 0;
        tilePair = [];
        score = 0;

        // set new array and add new eventlisteners
        setMemCards();

    } else {
        document.querySelector('.info').textContent = 'You cannot change modes mid game - reset first';
    }
}


// 36 tiles
// randome set of images on front of cards as well
function memoryMaster() {
    if(start) {

        const buttons = document.getElementsByClassName('mode-button');
        for (button of buttons) {
            button.classList.remove('selected');
        }
        document.getElementById('master-button').classList.add('selected'); 

        document.querySelector('.info').textContent = '36 tiles with random distracting images on the front side too - good luck!';

        mode = 'ninja';

        //remove all childred first
        mainSection.innerHTML = '';

        for (let i = 0; i < 36; i++) {

            tileDiv = document.createElement('div');
            tileDiv.classList.add('tile');

            frontDiv = document.createElement('div');
            frontDiv.classList.add('front');
        
            backDiv = document.createElement('div');
            backDiv.classList.add('back');
            tileDiv.appendChild(frontDiv);
            tileDiv.appendChild(backDiv);
            mainSection.appendChild(tileDiv);
            }

        //reset things so game starts again
        clickCount = 0;
        tilePair = [];
        score = 0;

        // set new array and add new eventlisteners
        setMemCards();

        // set front images
        frontImages();
            
    } else {
        document.querySelector('.info').textContent = 'You cannot change modes mid game - reset first';
    }
}

// 36 tiles
// randome set of images on front of cards as well
// every 30 seconds all the tiles rearrange
function mayhem() {

    if(start) {    

        const buttons = document.getElementsByClassName('mode-button');
        for (button of buttons) {
            button.classList.remove('selected');
        }
        document.getElementById('mayhem-button').classList.add('selected'); 
        
        document.querySelector('.info').textContent = 'Mwahahahahaha - Your tiles will re-arrange every 30 seconds ...good luck!';
        mode = 'mayhem';

        //remove all childred first
        mainSection.innerHTML = '';

        for (let i = 0; i < 36; i++) {

            tileDiv = document.createElement('div');
            tileDiv.classList.add('tile');

            frontDiv = document.createElement('div');
            frontDiv.classList.add('front');
        
            backDiv = document.createElement('div');
            backDiv.classList.add('back');
            tileDiv.appendChild(frontDiv);
            tileDiv.appendChild(backDiv);
            mainSection.appendChild(tileDiv);
        }

        //reset things so game starts again
        clickCount = 0;
        tilePair = [];
        score = 0;

        // set new array and add new eventlisteners
        setMemCards();

        // set front images
        frontImages();

    } else {
        document.querySelector('.info').textContent = 'You cannot change modes mid game - reset first';
    }
}

function mayhemTimer() {

    document.querySelector('.main').classList.toggle('mayhem')
    
    setTimeout(
        function() { 

        const currentCards = [...document.getElementsByClassName('tile')];

        // shuffle memcards array 
        let newPosi, holder, currentPos;
        let shuffleArray = [];
        let k = 0;

        // shuffler 2.0! updated shuffle logic works much better that old logic 
        // create a truely random array of new positions to switch with
        for (currentPos = currentCards.length - 1; currentPos >= 0; currentPos--) {
            newPosi = Math.floor(Math.random() * (currentCards.length));
            shuffleArray.push(newPosi);
        }

        //swap tiles arround with new positions
        for (card of currentCards) {

            currentPos = currentCards.indexOf(card);
            newPosi = shuffleArray[currentPos];
            holder = card;                

            currentCards[currentPos] = currentCards[newPosi];
            currentCards[newPosi] = holder;

        }

        mainSection.innerHTML = '';

        for (card of currentCards) {

            mainSection.appendChild(card);
        }
        document.querySelector('.main').classList.toggle('mayhem')
    }, 3000);

}

function randomNum(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// shuffle function only shuffles once and cannot shuffle after game starts
function shuffle(a) {
        
    if (clickCount == 0 && score == 0) {
        let newPosi, holder, currentPos;
        let shuffleArray = [];
        let k = 0;

        // shuffler 2.0! updated shuffle logic works much better that old logic 
        // create a truely random array of new positions to switch with
        for (currentPos = a.length - 1; currentPos >= 0; currentPos--) {
            newPosi = Math.floor(Math.random() * (a.length));
            shuffleArray.push(newPosi);
        }

        //swap tiles arround with new positions
        for (item of a) {

            currentPos = a.indexOf(item);
            newPosi = shuffleArray[currentPos];
            holder = item;                

            a[currentPos] = a[newPosi];
            a[newPosi] = holder;

        }

        // add images to backs of cards, clearing any existing images just in case
        
        if (mode == 'easy') {
            
            for(card of a) {

                k = a.indexOf(card);
                card.lastElementChild.className = 'back';
                card.lastElementChild.classList.add(imageArrayEasy[k]);

            }
        } else if (mode == 'hard') {

            for(card of a) {

                k = a.indexOf(card);
                card.lastElementChild.className = 'back';
                card.lastElementChild.classList.add(imageArrayHard[k]);

            }
        } else if (mode == 'ninja') {

            for(card of a) {

                k = a.indexOf(card);
                card.lastElementChild.className = 'back';
                card.lastElementChild.classList.add(imageArrayHard[k]);

            }
        } else if (mode == 'mayhem') {

            for(card of a) {

                k = a.indexOf(card);
                card.lastElementChild.className = 'back';
                card.lastElementChild.classList.add(imageArrayHard[k]);

            }
            
            // add random front images
            frontImages();

        } else {

            //error handling
        }

        // document.querySelector('.info').textContent = 'Cards Shuffled - Good Luck!';
    }
    else {
        document.querySelector('.info').textContent = 'You cannot shuffle during a game';
    }
    
}

function frontImages() {

    let newPosi, holder, currentPos;
    let shuffleArray = [];
    let k = 0;

    // shuffle front image array (4 times to be sure)
    for (i =0; i < 4; i++) {
        shuffleArray = [];
        for (currentPos = imageArrayMayhem.length - 1; currentPos >= 0; currentPos--) {
            newPosi = Math.floor(Math.random() * (imageArrayMayhem.length));
            shuffleArray.push(newPosi);
        }

    }

    //swap images arround with new positions
    for (image of imageArrayMayhem) {

        currentPos = imageArrayMayhem.indexOf(image);
        newPosi = shuffleArray[currentPos];
        holder = image;                

        imageArrayMayhem[currentPos] = imageArrayMayhem[newPosi];
        imageArrayMayhem[newPosi] = holder;

    }

    for(tile of memCards) {

        k = memCards.indexOf(tile);
        tile.firstElementChild.className = 'front';
        tile.firstElementChild.classList.add(imageArrayMayhem[k]);

    }


}

function isInt(n) {
    return n % 1 === 0;
}

function star_rating(score, total) {
    stars = '';
    let yourStars = 0;
    let subStars = 0;
    let emptyStars = 0;

    if (mode == 'easy') {

        if(!(score - total <=0) ) {
            subStars = (score - total) / .8;
            yourStars = 10 - subStars;
            whole = Math.floor( yourStars );
            emptyStars = 10 - Math.ceil( yourStars );
        } else {

            emptyStars = 0;
            whole = 10;

        }
        


    } else {

        if(!(score - total <=0) ) {
            subStars = (score - total) / 1.8;
            yourStars = 10 - subStars;
            whole = Math.floor( yourStars );
            emptyStars = 10 - Math.ceil( yourStars );
        } else {

            emptyStars = 0;
            whole = 10;
        }
    }

    if(emptyStars >= 9) {

        stars += '<i class="fas fa-star"></i>';

        for (let i = 0; i < 9; i++) {
            stars += '<i class="far fa-star"></i>';
        }

    } else {

        for (let i = 0; i < whole; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if(!isInt(yourStars)) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
    }

    stars = '<span class="stars">'+stars+'</span>';

    return stars;
}

// perform click action if not fliped and less than two clicked already
function clicked(element) {
    if(!element.classList.contains('tile-clicked') && clickCount<2 && !element.classList.contains('won')){
        clicks(element);
    }
    else {
        //just cos - if a player tries to turn over more than two cards, or clicks the same card twice, they get a random fact
        document.querySelector('.info').textContent = 'did you know: ' + randomFacts[randomNum(0,randomFacts.length-1)];;
    }
}

// performs click actions, counts clicks and ensures cards are shuffled, calles two clicks fucntions if it's a second click
function clicks(element) {
    
    // start timer if this is the first click of the game
    if(start) {
        stopwatch.start();
        start = false;

        if(mode == 'mayhem') {

            // start mayhem timer
            mayhemTimerID = setInterval(function() {mayhemTimer()},30000);
        }
    }

    clickCount ++;
    element.classList.add('tile-clicked');
    tilePair.push(element);
    
    if (clickCount == 2) {
        twoClicked();
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

    if(mode == 'easy') {
        
        star_rating(score, 8);
        document.querySelector('#star-rating').innerHTML = '';
        document.querySelector('#star-rating').insertAdjacentHTML('afterbegin', stars);
    } else {

        star_rating(score, 18);
        document.querySelector('#star-rating').innerHTML = '';
        document.querySelector('#star-rating').insertAdjacentHTML('afterbegin', stars);
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
        }, 1400);

    let gameOver = [...document.getElementsByClassName('won')].length;
        
        if(mode == 'easy') {

            if( gameOver==16 ) {
                for (memCard of memCards) {
                    memCard.classList.remove('won');
                    memCard.classList.add('game-over');
                    
                }

                modal.style.display = "block";

                star_rating(score, 8);
                
                const winText = '<h1>Contratulations!</h1><p>You completed ' + '<strong class="mode">'+mode+'</strong>' + ' mode in ' + score + ' turns</p><p>Your time was:</p>';

                // STAR RATING TO ADD full star: <i class="fas fa-star"></i> not full star; <i class="far fa-star"></i> half star: <i class="fas fa-star-half-alt"></i>


                modal_content.insertAdjacentHTML('afterbegin', winText);
                modal_content.insertAdjacentHTML('beforeend', stars);

                stopwatch.clear();
                stopwatch.lap();
                stopwatch.stop();

            }

        } else {

            if( gameOver==36 ) {
                for (memCard of memCards) {
                    memCard.classList.remove('won');
                    memCard.classList.add('game-over');
                    
                }

                modal.style.display = "block";
                    
                star_rating(score, 18);

                const winText = '<h1>Contratulations!</h1><p>You completed ' + '<strong class="mode">'+mode+'</strong>' + ' mode in ' + score + ' turns</p><p>Your time was:</p>';

                modal_content.insertAdjacentHTML('afterbegin', winText);

                stopwatch.lap();
                stopwatch.stop();

            }

        }


}

// update to perform end game stuff before running this on a timer
// performs reset actions
function reset() {

    for(card of memCards) {
        card.classList.remove('game-over');
        card.lastElementChild.className = 'back';
    }
    score = 0;

    star_rating(score, 8);
    document.querySelector('#star-rating').innerHTML = '';
    document.querySelector('#star-rating').insertAdjacentHTML('afterbegin', stars);
    start = true;
    stopwatch.clear();
    stopwatch.stop();
    stopwatch.reset();
    modal.style.display = "none";
    const defaultTxt = '<ul class="results"></ul><button type="button" id="modal-reset-button" class="reset-button">REPLAY?</button>';
    modal_content.innerHTML = '';
    modal_content.insertAdjacentHTML('afterbegin', defaultTxt);
    stopwatch = new Stopwatch(
        document.querySelector('.stopwatch'),
        document.querySelector('.results'));
    
    _replay = document.querySelector('#modal-reset-button');
    _replay.addEventListener('click', function() {
        reset();
    });

    switch(mode) {
        case 'easy':
            easy();
            break;
        case 'hard':
            hard();
            break;
        case 'ninja':
            memoryMaster();
            break;
        case 'mayhem':
            clearInterval(mayhemTimerID);
            mayhem();
            break;
        default:
            easy()
    }
    document.querySelector('.score').textContent = score;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        reset();
    }
}


