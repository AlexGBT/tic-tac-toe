'use strict'

let pins = document.querySelectorAll('.pin');
let winner = {
    player: undefined,
    state: false,
};
let isOppnentTurntFlag = false;
function winnerPosChecker(pinsArray,a,b,c) {

    function Checkwinner(playerSign) {
        if (pinsArray[a] == playerSign && pinsArray[b] == playerSign && pinsArray[c] == playerSign  ) {
            pins[a].style.background = 'pink';
            pins[b].style.background = 'pink';
            pins[c].style.background = 'pink';
            winner.state = true;
            winner.player = playerSign;
            console.log(winner.player + ' is winner');
        }
    }

    Checkwinner('X');
    Checkwinner('O');
 }

function winnerChecker(pinsArray) {
    winnerPosChecker(pinsArray,0,1,2);
    winnerPosChecker(pinsArray,3,4,5);
    winnerPosChecker(pinsArray,6,7,8);
    winnerPosChecker(pinsArray,0,3,6);
    winnerPosChecker(pinsArray,1,4,7);
    winnerPosChecker(pinsArray,2,5,8);
    winnerPosChecker(pinsArray,0,4,8);
    winnerPosChecker(pinsArray,2,4,6);

}


function CheckPosition(el) {
    if (!el.innerHTML) {
        el.innerHTML = 'X';
    }
    else return 0
    let freePins = [];
    pins.forEach( function(el) {
        if (el.innerHTML == 'X') {
            freePins.push('X');
        }
        else if (el.innerHTML == 'O') {
            freePins.push('O');
        }
        else {
            freePins.push('free');
        }
    } );
    return(freePins);
}

function AI(pinsArray) {

    if (AIlogic(0,1,2,'O')) return pinsArray
    if (AIlogic(3,4,5,'O')) return pinsArray
    if (AIlogic(6,7,8,'O')) return pinsArray
    if (AIlogic(0,3,6,'O')) return pinsArray
    if (AIlogic(1,4,7,'O')) return pinsArray
    if (AIlogic(2,5,8,'O')) return pinsArray
    if (AIlogic(0,4,8,'O')) return pinsArray
    if (AIlogic(2,4,6,'O')) return pinsArray


  

    if ( pinsArray[0] != 'X' && pinsArray[1] != 'X' && pinsArray[2] == 'X' && pinsArray[3] != 'X' && pinsArray[4] != 'X' && pinsArray[5] != 'X' && pinsArray[6] == 'X' && pinsArray[7] != 'X' && pinsArray[8] != 'X' ) {
        pins[3].innerHTML = 'O';
        pinsArray[3] = 'O';
        return pinsArray
    }
       
    if ( pinsArray[0] != 'X' && pinsArray[1] != 'X' && pinsArray[2] != 'X' && pinsArray[3] != 'X' && pinsArray[4] != 'X' && pinsArray[5] == 'X' && pinsArray[6] != 'X' && pinsArray[7] == 'X' && pinsArray[8] != 'X' ) {
        pins[8].innerHTML = 'O';
        pinsArray[8] = 'O';
        return pinsArray
    }

    if ( pinsArray[0] != 'X' && pinsArray[1] != 'X' && pinsArray[2] != 'X' && pinsArray[3] != 'X' && pinsArray[4] == 'X' && pinsArray[5] != 'X' && pinsArray[6] != 'X' && pinsArray[7] != 'X' && pinsArray[8] == 'X' ) {
        pins[2].innerHTML = 'O';
        pinsArray[2] = 'O';
        return pinsArray
    }

    if (AIlogic(0,1,2,'X')) return pinsArray
    if (AIlogic(3,4,5,'X')) return pinsArray
    if (AIlogic(6,7,8,'X')) return pinsArray
    if (AIlogic(0,3,6,'X')) return pinsArray
    if (AIlogic(1,4,7,'X')) return pinsArray
    if (AIlogic(2,5,8,'X')) return pinsArray
    if (AIlogic(0,4,8,'X')) return pinsArray
    if (AIlogic(2,4,6,'X')) return pinsArray


    if (pinsArray[4] == 'free') {
        pins[4].innerHTML = 'O';
        pinsArray[4] = 'O';
        return pinsArray
    }

    for (let i = 0; i< pinsArray.length; i++) {
        if (pinsArray[i] == 'free') {
            pins[i].innerHTML = 'O';
            pinsArray[i] = 'O'
            break
        } 
    }

    return pinsArray

    function AIlogic(a,b,c,XorO){
        if (pinsArray[a] == XorO && pinsArray[b] == XorO || pinsArray[a] == XorO && pinsArray[c] == XorO || pinsArray[b] == XorO && pinsArray[c] == XorO  ) {
            if (pinsArray[a] == 'free' ) { 
                pins[a].innerHTML = 'O';
                pinsArray[a] = 'O';
                return true
            }
            if (pinsArray[b] == 'free') { 
                pins[b].innerHTML = 'O';
                pinsArray[b] = 'O';
                return true
            }
            if (pinsArray[c] == 'free') { 
                pins[c].innerHTML = 'O';
                pinsArray[c] = 'O';
                return true
            }
             
        } 
        return false
    }
}


function EndGameChecking() {
    if (winner.state == true) {
        pins.forEach( function(el){
            el.removeEventListener('click',runGame);
        });
        endGameAnimation();
        return true
    };
    return false
}


pins.forEach( function(el){
    el.addEventListener('click', runGame);
});


function runGame( {target}) {
    if (isOppnentTurntFlag) return

    let whatSetInPins = CheckPosition(target);
    winnerChecker(whatSetInPins);
    if (EndGameChecking()) return

    isOppnentTurntFlag = true;
    setTimeout( () => {
        isOppnentTurntFlag = false;
        whatSetInPins = AI(whatSetInPins);
        console.log(whatSetInPins);
        winnerChecker(whatSetInPins);
        if (EndGameChecking()) return
    },300);
    
    
}


function startNewGame() {
    winner.state = false;
    pins.forEach( function(el){
        el.innerHTML = '';
        el.style.background = 'white';
    });
    pins.forEach( function(el){
        el.addEventListener('click', runGame);
    });

    let popUpString = document.querySelector('.result');
    popUpString.classList.remove('addtoResult');
}

let NewGameButton = document.querySelector('.new-game');
NewGameButton.addEventListener('click', startNewGame);

function endGameAnimation() {
    let popUpString = document.querySelector('.result');
    if (winner.player == 'O') {
        popUpString.innerHTML = 'ХАхА Вредина проиграла!!!';
    }
    else if( winner.player == 'X' )  {
        popUpString.innerHTML = 'ТЫ выиграла, но все равно вредина!!!';
    }
    popUpString.classList.add('addtoResult');

}



 