//Grab existing HTML elements to be used 
var timeblockContainerElement = $('#timeblock-container');
var currentDateElement = $('#currentDay')

//Define array to display time blocks
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

function importTimeBlocks(){

    for (let index = 0; index < timeblockArray.length; index++) {
        const timeblockArrayElement = timeblockArray[index];
        var currentEntry = '';
        //Check if there is existing content in local storage
        for (let j = 0; j < localStorage.length; j++) {
            const element = localStorage.getItem(j);
            if(element){
                if(index===timeblockArrayElement.localStorageIndex){
                 currentEntry = element;   
                }  
            }
        }
        
        
        timeblockArrayElement.domObject.children('textarea').text(currentEntry);
        timeblockContainerElement.append(timeblockArrayElement.domObject);
    }
    
}


function handleSaveItem(event){
    //Console readout
    console.log("Saving item...")
    
    //Convert the button that was clicked to a jQuery DOM item
    var target = $(event.target);

    if (target.hasClass("fas")){
        saveButton = $(event.target).parent();
    }else{
        saveButton = target;
    }
    
    //Get index for saved 
    var index = saveButton.parent().children('textarea').data('index');

    //Get entered text
    var text = saveButton.parent().children('textarea').val();

    localStorage.setItem(index,text);

}

function displayDate(){
    currentDateElement.text(moment().format('dddd, MMMM Do YYYY'));
}

function compareTimeBlocks(currentTime){
    timeblockArray.forEach(element => {
        let timeblockTime = moment(element.time,"h:mma");
        let timeblockHour = timeblockTime.format("H");

        //Get handle to jQuery DOM object text area
        let display = element.domObject.children('textarea');
        
        //Check if current timeblock is in the past
        if(+currentTime>+timeblockHour){
            display.removeClass("present");
            display.addClass("past");

        }else if(+currentTime<+timeblockHour){
            display.removeClass("past")
            display.addClass("future");
        }else{
            display.removeClass("future")
            display.addClass("present")
        }
    });
}

function colorCodeTimeBlocks(){
    var timeInterval = setInterval(function (){
        let currentTime = moment().format("H");
        compareTimeBlocks(currentTime); 
    }, 1000)
    
}




timeblockContainerElement.on('click', '.saveBtn',handleSaveItem);

importTimeBlocks();
displayDate();
colorCodeTimeBlocks();