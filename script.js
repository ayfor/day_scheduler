//Grab existing HTML elements to be used 
var timeblockContainerElement = $('#timeblock-container');
var currentDateElement = $('#currentDay')

//Define array to display time blocks and create jQuery objects for each entry with referable index
var timeblockArray = [
    {
        time: "9:00am",
        localStorageIndex:0,
        html:'<div class="time-block row"><div class="hour">9:00am</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">9:00am</div><textarea data-index=0></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "10:00am",
        localStorageIndex:1,
        html:'<div class="time-block row"><div class="hour">10:00am</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">10:00am</div><textarea data-index=1></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "11:00am",
        localStorageIndex:2,
        html:'<div class="time-block row"><div class="hour">11:00am</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">11:00am</div><textarea data-index=2></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "12:00pm",
        localStorageIndex:3,
        html:'<div class="time-block row"><div class="hour">12:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">12:00pm</div><textarea data-index=3></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "1:00pm",
        localStorageIndex:4,
        html:'<div class="time-block row"><div class="hour">1:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">1:00pm</div><textarea data-index=4></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "2:00pm",
        localStorageIndex:5,
        html:'<div class="time-block row"><div class="hour">2:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">2:00pm</div><textarea data-index=5></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "3:00pm",
        localStorageIndex:6,
        html:'<div class="time-block row"><div class="hour">3:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">3:00pm</div><textarea data-index=6></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "4:00pm",
        localStorageIndex:7,
        html:'<div class="time-block row"><div class="hour">4:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">4:00pm</div><textarea data-index=7></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "5:00pm",
        localStorageIndex:8,
        html:'<div class="time-block row"><div class="hour">5:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">5:00pm</div><textarea data-index=8></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },

]

//Function that reads data from local storage and uses the timeblockArray to display the timeblock elements 
function importTimeBlocks(){

    for (let index = 0; index < timeblockArray.length; index++) {
        const timeblockArrayElement = timeblockArray[index];
        let currentEntry = '';

        //Check if there is existing content in local storage
        for (let j = 0; j < localStorage.length; j++) {
           let storageItem = localStorage.getItem(index);

            //If the storage item exists set it as the current entry to be the stored text
           if(storageItem){
               currentEntry = storageItem;
           }
        }
        
        //set current entry to appropriate 
        timeblockArrayElement.domObject.children('textarea').text(currentEntry);
        timeblockContainerElement.append(timeblockArrayElement.domObject);
    }
    
}

//Function called whenever a save button is clicked on a time block
function handleSaveItem(event){
    //Console readout
    //console.log("Saving item...")
    
    //Convert the button that was clicked to a jQuery DOM item
    var target = $(event.target);

    //Check if the save icon is clicked instead of the button itself and adjust handle accordingly
    if (target.hasClass("fas")){
        saveButton = $(event.target).parent();
    }else{
        saveButton = target;
    }
    
    //Get index for data save from data attribute 
    var index = saveButton.parent().children('textarea').data('index');

    //Get entered text for timeblock
    var text = saveButton.parent().children('textarea').val();

    //Enter item into local storage
    localStorage.setItem(index,text);

}

//Function displays current date on the screen using Moment js
function displayDate(){
    //Get current date 
    currentDateElement.text(moment().format('dddd, MMMM Do YYYY'));
}

//Function compares time blocks to current time to color code them properly
//Called as a helper function from colorCodeTimeBlocks()
function compareTimeBlocks(currentTime){
    //For each element in the array, check the current time against the time block data and change classes accordingly
    timeblockArray.forEach(element => {
        let timeblockTime = moment(element.time,"h:mma");
        let timeblockHour = timeblockTime.format("H");

        //Get handle to jQuery DOM object text area
        let display = element.domObject.children('textarea');
        
        //Check if current timeblock is in the past
        if(+currentTime>+timeblockHour){
            display.removeClass("present");
            display.addClass("past");
            //Next, check if timeblock is in the future
        }else if(+currentTime<+timeblockHour){
            display.removeClass("past")
            display.addClass("future");

            //Else, timeblock must be in the preset
        }else{
            display.removeClass("future")
            display.addClass("present")
        }
    });
}

//Function that updates the color coding of the timeblocks using a time interval and Moment js
function colorCodeTimeBlocks(){
    //Every second, check if the timeblock color coding should change
    var timeInterval = setInterval(function (){
        let currentTime = moment().format("H");
        compareTimeBlocks(currentTime); 
    }, 1000)
    
}

//Event deleagation for timeblock save buttons
timeblockContainerElement.on('click', '.saveBtn',handleSaveItem);

//Call starting functions for display
importTimeBlocks();
displayDate();
colorCodeTimeBlocks();