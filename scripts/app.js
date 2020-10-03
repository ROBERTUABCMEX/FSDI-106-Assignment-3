var visible = false;
var important = false;
var UI ={}; //INICIALIZADOR OBJETO

var hide="fas fa-eye-slash";
var visi="fas fa-eye";


var taskList = [];

function showDetails(){
    //console.log("btn clicked!!!");
    var vh = "";

    if(!visible){
        vh =  `<i id="eyes" class="${hide}" ></i>`;
        visible=true;
        UI.btnShow.html(vh+" Hide details");
        UI.secForm.removeClass("invisible");

    }
    else{
        vh =  `<i id="eyes" class="${visi}" ></i>`;
        visible=false;
        UI.btnShow.html(vh+" Show details");
        UI.secForm.addClass("invisible");

    }

}

function toogleImportant(){
    if(!important){
        UI.btnImportant.removeClass("far").addClass("fas active");
        //UI.btnImportant.removeClass("btn-light");
        //UI.btnImportant.addClass("btn-danger");       
        important=true;
    }else{
        UI.btnImportant.removeClass("fas active").addClass("far");
        //UI.btnImportant.removeClass("btn-danger");
        //UI.btnImportant.addClass("btn-light").addClass("active");
        important=false;
    }

}

function clearInputs(){
        $(".control").val("");
}

function SaveTask(){
    var Title = UI.txtTitle.val();
    var Date = UI.txtDate.val();
    var Description = UI.txtDescription.val();
    var Alert = UI.txtAlert.val();
    var Location = UI.txtLocation.val();  

    var task = new Task(Title,important, Date, Description, Alert, Location);

    taskList.push(task);

   

    $.ajax({
        url: 'http://fsdi.azurewebsites.net/api/tasks', 
        type: 'POST',
        data:  JSON.stringify(task),
        contentType: "application/json",
        success: function(response){
            //console.log("Pass:",response);
            UI.boxAlert.removeClass("hide");
            setTimeout(function(){
                UI.boxAlert.addClass("hide");
            },3000);
        },
        error: function(details){
            console.log("error:", details);
        }

    });

    clearInputs();

    testGet();

}

function testGet(){
    $.ajax({
       

        url: 'http://fsdi.azurewebsites.net/api/tasks', 
        type: 'GET',
        success: function(response){
            console.log("Pass:",response);

            var text = ""; 
            response.forEach((dato) =>{
                text+=`<div class="container containerData"> 
                Id:${dato.id} | Title:${dato.title} | Description:${dato.description}
                | Important:${dato.important}  | User:${dato.user} 
                </div>`;
            });

            document.getElementById("listData").innerHTML=text;


        },
        error: function(details){
            console.log("error:", details);
        }

    });
}


function test(a){

    a={}
    console.log("Modifica", a);
}


function init(){
    var Title = "this is a main page!!";
    //console.log(Title);
    

    
    UI = {
        btnShow: $("#btnShow"),
        btnImportant: $("#btnImportant"),
        secForm: $("#section-Form"),
        btnSave: $("#btnSave"),
        txtTitle: $("#txtTitle"),
        btnImportant: $("#btnImportant"),
        txtDate: $("#txtDate"),
        txtDescription: $("#txtDescription"),
        txtAlert: $("#txtAlert"),
        txtLocation: $("#txtLocation"),
        boxAlert: $("#alert")

    }

    
    UI.btnShow.click(showDetails);
    UI.btnImportant.click(toogleImportant);

    UI.btnSave.click(SaveTask);
    
    testGet();

      
}


window.onload = init;

