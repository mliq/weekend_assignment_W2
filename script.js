var i = 0, shuffledArray, groupArray, groupCounter, string, option = "number", groupNumber = "0";
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
            if(shuffledArray.length > 0) {
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

function display(groupArray){
    // Clear display
    $('.results').empty();
    // Write Group Columns
    for(i = 0; i < groupArray.length; i++) {
        string = "<div class = 'groupColumn'>Team " + (i+1) + ":<br>";
        for (j = 0; j < groupArray[i].length; j++){
            string += groupArray[i][j] + "<br>";
        }
        string += "</div>";
        $('.results').append(string);
    }
    $('.results').css('display','inline-block');
    //$('.results').css('height',groupArray.length*50+'px').show();
}

$(document).ready(function(){

    // Options button functionality
    $('.option').on('click', function(){
        // Set option and toggle class, but only if not the current option:
        if(option !=$(this).data('id')) {
            option = $(this).data('id');
            // Change color
            $('.option').toggleClass('selected');
        }
    });

    // Number button functionality
    $('.number').on('click',function(){

        // Set groupNumber and toggle class, but only if not the current option:
        if(groupNumber !=$(this).text()) {
            // Change color of previous selection
            $('.number.selected').toggleClass('selected');
            // Set variable
            groupNumber=$(this).text();
            // Change color of new selection
            $(this).toggleClass('selected');
        }
    });

    // Generate button functionality
    $('.generate').on('click', function(){
        if(groupNumber == "0" && option == "number"){
            alert("Please pick the number of teams you want created");
        }
        if(groupNumber == "0" && option == "size"){
            alert("Please pick the size of teams you want created");
        }
        if(groupNumber != "0") {
            // Shuffle names array, store in shuffledArray variable
            shuffledArray = shuffle(namesArray);
            // if option by size, call appropriate function:
            if (option == "size") {
                groupArray = groupBySize(groupNumber, shuffledArray);
            }
            else {
                groupArray = groupByNumber(groupNumber, shuffledArray);
            }
            // Call display()
            display(groupArray);
        }
    });

});