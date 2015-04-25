var i = 0, groupSize, shuffledArray, groupArray, groupCounter;
var namesArray = ["Erik", "Alicia", "Brian", "Casie", "Chelsea", "Clare", "Cody", "Jeanne", "Kaitlin", "Kelly", "Michael", "Luke", "Mary", "Aaron", "Michelle", "Rom", "Steve", "Terry", "Tracy", "Vince"];

function shuffle(array){
    // Fisher-Yates shuffle courtesy of: http://bost.ocks.org/mike/shuffle/

    newArray = array.slice(0);
    // initializes m as our array iterator, t as a temporary storage for the 'card' we are taking out of the 'deck', i will be a random index where we will place our 'card'.
    var m = newArray.length, t, i;

    //shuffle array.length times
    while (m) {
        // Pick a random number 0-1, multiply by remaining element count, decrement remaining element count, round down to whole integer. Essentially, choose a random place to put the current array index m.
        i = Math.floor(Math.random() * m--);

        // Store current array index m value in t.
        t = newArray[m];
        // Store the randomly chosen index value into the currently iterating index space.
        newArray[m] = newArray[i];
        // store the original currently iterating index value into the randomly chosen index space.
        newArray[i] = t;
    }
    return newArray;
}

function groupMaker(groupSize, namesArray){
    // shuffle names array;
    shuffledArray = shuffle(namesArray);

    // Empty array one by one, sorting into groupsize groups.
    groupArray = [];
    groupCounter=0;
    while(shuffledArray.length > 0) {
        groupArray[groupCounter] = [];
        for (i = 0; i < groupSize; i++){
            if(shuffledArray.length > 0) {
                groupArray[groupCounter].push(shuffledArray.pop());
            }
        }
        groupCounter++;
    }
}

function display(){
    for(i = 0; i < groupArray.length; i++) {
        $('.results').append("<div class = 'groupColumn'>");
        for (j = 0; j < groupArray[i].length; j++){
            $('.results').append(groupArray[i][j]);
        }
        $('.results').append("</div>");
    }
}

$(document).ready(function(){

    $('.generate').on('click',function(){
        // Get groupsize from button text.
        groupSize=$(this).text();
        // Call groupMaker()
        groupMaker(groupSize, namesArray);
        // Call display()
        display();
    });




});