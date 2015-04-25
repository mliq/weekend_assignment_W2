var i = 0, shuffledArray, groupArray, groupCounter, string, displayCounter = 0, delay = 0, size = 0, number = 0;
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

function groupBySize(groupSize, arr){
    // Empty array one by one, sorting into groupsize groups.
    groupArray = [];
    groupCounter = 0;
    while(arr.length > 0) {
        groupArray[groupCounter] = [];
        for (i = 0; i < groupSize; i++){
            if(arr.length > 0) {
                groupArray[groupCounter].push(arr.pop());
            }
        }
        groupCounter++;
    }
    return groupArray;
}

function groupByNumber(groupNumber, arr){
    // Determine the number of groups we need.
    var size = Math.floor(arr.length / groupNumber);
    groupArray = groupBySize(size, arr);

    // Put extra names into distribute array.
    var distribute = [];

    // Cycle until groupArray is correct length
    while(groupArray.length > groupNumber) {
        distribute = groupArray.pop();
    }
    // Now add until distribute is empty
    i = 0;
    while (distribute.length != 0 ){
        groupArray[i].push(distribute.pop());
        i++;
    }
    return groupArray;
}

function groupByNumberAndSize(num,sz,arr){
    var newArray = [];
    // If both settings exist
    if(num != 0 && sz != 0){
        // Stop when you reach the end of the names though?
        // Create num arrays
        for(i = 0; i < num; i++){
            newArray[i] = [];
            // Add sz names to each
            for(j = 0; j < sz; j++){
                newArray[i].push(arr.shift());
            }
        }
    }
    // If only Number exists
    else if(sz==0){
        sz = Math.floor(arr.length/num);
        // Create num arrays
        for(i = 0; i < num; i++){
            newArray[i] = [];
            // Add names to each
            for(j = 0; j < sz; j++){
                newArray[i].push(arr.shift());
            }
        }
    }
    // If only Size exists
    else {
        num = Math.floor(arr.length/sz);
        for(i = 0; i < num; i++){
            newArray[i] = [];
            // Add names to each
            for(j = 0; j < sz; j++){
                newArray[i].push(arr.shift());
            }
        }
    }
    return newArray;
}

function display(groupArray){

    // Clear display if 2nd display.
    if(displayCounter!=0) {
        $('.results').fadeOut(2000);
        delay = 2000;
    }
    window.setTimeout(function () {
        $('.results').empty();
        // Write Group Columns
        for (i = 0; i < groupArray.length; i++) {
            string = "<div class = 'groupColumn'>Team " + (i + 1) + ":<br>";
            for (j = 0; j < groupArray[i].length; j++) {
                string += groupArray[i][j] + "<br>";
            }
            string += "</div>";
            $('.results').append(string);
        }
        $('.results').fadeIn(2000).css('display', 'inline-block');
        //$('.results').css('height',groupArray.length*50+'px').show();
    }, delay);
    displayCounter++;
}

$(document).ready(function(){

    // Number button functionality
    $('.number').on('click',function(){

        // Determine if button is number or size setter.
        if ($(this).data('size') != undefined) {
            // Only act if setting is a change:
            if(size != $(this).data('size')){
                // Toggle selector class off for previous
                $(this).siblings('.selected').toggleClass('selected');
                // Set size variable
                size = $(this).data('size');
                // Toggle selector class for new setting.
                $(this).toggleClass('selected');
            }
        } else{
            // Only act if setting is a change:
            if(number != $(this).data('number')){
                // Toggle selector class off for previous
                $(this).siblings('.selected').toggleClass('selected');
                // Set number variable
                number = $(this).data('number');
                // Toggle selector class for new setting.
                $(this).toggleClass('selected');
            }
        }
    });

    // Generate button functionality
    $('.generate').on('click', function(){
        if(size == 0 && number == 0){
            alert("Please pick the number of teams or the size of teams you want created");
        } else {
            // Shuffle names array, store in shuffledArray variable, call groupArray function, pass to display function
            shuffledArray = shuffle(namesArray);
            groupArray = groupByNumberAndSize(number,size,shuffledArray);
            display(groupArray);

            //// If only one option is selected:
            //if(size == 0 || number == 0) {
            //    // if option by size, call appropriate function:
            //    if (size != 0) {
            //        groupArray = groupBySize(size, shuffledArray);
            //    }
            //    else {
            //        groupArray = groupByNumber(number, shuffledArray);
            //    }
            }
    });

});