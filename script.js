//Grab existing HTML elements to be used 
var timeblockContainerElement = $('#timeblock-container');

//Define array to display time blocks
var timeblockArray = [
    {
        time: "9:00",
        localStorageIndex:0,
        html:'<div class="time-block row"><div class="hour">9:00am</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">9:00am</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "10:00",
        localStorageIndex:1,
        html:'<div class="time-block row"><div class="hour">10:00am</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">10:00am</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "11:00",
        localStorageIndex:2,
        html:'<div class="time-block row"><div class="hour">11:00am</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">11:00am</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "12:00",
        localStorageIndex:3,
        html:'<div class="time-block row"><div class="hour">12:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">12:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "13:00",
        localStorageIndex:4,
        html:'<div class="time-block row"><div class="hour">1:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">1:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "14:00",
        localStorageIndex:5,
        html:'<div class="time-block row"><div class="hour">2:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">2:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "15:00",
        localStorageIndex:6,
        html:'<div class="time-block row"><div class="hour">3:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">3:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "16:00",
        localStorageIndex:7,
        html:'<div class="time-block row"><div class="hour">4:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">4:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },
    {
        time: "17:00",
        localStorageIndex:8,
        html:'<div class="time-block row"><div class="hour">5:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>',  
        domObject: $('<div class="time-block row"><div class="hour">5:00pm</div><textarea></textarea><button class="saveBtn"><i class="fas fa-save"></i></button></div>)'),
    },

]

function importTimeBlocks(){
    //Check if there is content in local storage
    if(!(localStorage.length===0)){

    }


    for (let index = 0; index < timeblockArray.length; index++) {
        var currentEntry = ''
        //Check if there is existing content in local storage
        for (let j = 0; j < localStorage.length; j++) {
            const element = localStorage.getItem(j);
            if(element){
                currentEntry = element;
            }
        }
        
        const timeblockArrayElement = timeblockArray[index];
        timeblockArrayElement.domObject.children('textarea').text(currentEntry);
        timeblockContainerElement.append(timeblockArrayElement.domObject);
    }
    
}


function handleSaveItem(event){

    //Convert the button that was clicked to a jQuery DOM item
    var saveButton = $(event.target);

    //
    console.log("Saving item...")

    //
    console.log(saveButton.parent().children('textarea').text("Hello?"))
}


timeblockContainerElement.on('click', '.saveBtn',handleSaveItem);

importTimeBlocks();