$(document).ready(function () {
    $.ajax({
        url : "MarqueController",
        data:{op:"load"},
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
	       console.log(data);
            remplir(data);
        }
    });
    $("#add").click(function () {
	
	     var code = $("#code").val();
        var libelle = $("#libelle").val();
	    $.ajax({
            url: "MarqueController",
            data: {op:"testCode",code: code, libelle: libelle},
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
				
                restAdd(data);              
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
		
    });

function restAdd(data){
    var code = $("#code").val();
    var libelle = $("#libelle").val();
    if(code!="" && libelle!=""){
		 if(data){
			$.ajax({
	        url: "MarqueController",
	        data: {code: code, libelle: libelle},
	        type: 'POST',
	        success: function (data, textStatus, jqXHR) {
				alert("Bien Ajouter");
	            remplir(data);
	            vide();
	        },
	        error: function (jqXHR, textStatus, errorThrown) {
	            console.log(textStatus);
	        }
	    });
		}else{
			alert("Deja cette marque est inseree");
		}
	 
	}else{
		createCustomAlert("Remplir les champs")
	}
}
	
$("#mod").click(function () {
	
	  var code = $("#code").val();
        var libelle = $("#libelle").val();
	    $.ajax({
            url: "MarqueController",
            data: {op:"testCode",code: code, libelle: libelle},
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
				
                modRest(data);              
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });

    });

function modRest(data){
    var code = $("#code").val();
    var libelle = $("#libelle").val();
    var id= $("#idh").val();
        //alert(id+" "+libelle+" "+code);
	if(code!="" && libelle!=""){
		if(data){
			if(confirm("Vous etes sur de modifier cette machine?")){
				$.ajax({
		            url: "MarqueController",
		            data: {op:"mod" , code: code, libelle: libelle,id:id},
		            type: 'POST',
		            success: function (data, textStatus, jqXHR) {
						createCustomAlert("Bien Modiffier");
		                remplir(data);
		                vide();
		            },
		            error: function (jqXHR, textStatus, errorThrown) {
		                console.log(textStatus);
		            }
		       });
			}
			
		}else{
			alert("Cette modification va generer un duplication!");
		}
      
	}else{
		createCustomAlert("Selectionner une marque")
	}
}
      $("#con").on('click' , '.sup', function () {
        var indice = $(this).attr('indice'); 
        
        if(confirm("vous etes sur de supprimer ctte marqur?")){
	        restSup(indice);
		}
       

    });
function restSup(indice){
	if(indice!=""){
	 $.ajax({
            url: "MarqueController",
            data: {op: "sup", indice: indice},
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
				
                remplir(data);
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
	}else{
		createCustomAlert("Remplir les champs")
	}
}
$("#con").on('click' , '.sel', function () {
        var indice = $(this).attr('indice'); 
        
        if(indice!=""){
	 $.ajax({
            url: "MarqueController",
            data: {op: "sel", indice: indice},
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
				window.scrollTo(0, 0);
                remplir2(data);
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
	}else{
		createCustomAlert("Remplir les champs")
	}
       

    });

 $("#cl").click(function () {
        vide();
    });

window.scroll({
 top: 0, 
 left: 0, 
 behavior: 'slow' 
});


function remplir2(data) {
       $("#code").val(data.code);
       $("#libelle").val(data.libelle);
       $("#idh").val(data.id);
       
}

    function vide(){
	   $("#code").val("");
       $("#libelle").val("");
 	   $("#idh").val("");
}
    function remplir(data) {
        var ligne = "";
        for (var i = 0; i < data.length; i++) {
            ligne += "<tr><td align='center'>" + data[i].id + "</td><td align='center'>" + data[i].code + "</td><td align='center'>" + data[i].libelle + "</td><td align='center'><button class='sup far fa-trash-alt btn btn-danger' indice="+data[i].id+"></button></td><td align='center'><button class='sel fas fa-hand-pointer btn btn-success' indice="+data[i].id+"><a class='scroll-to-top rounded' href='#wrapper'></button></td></tr>";
        }
        $("#con").html(ligne);
    }
});

var ALERT_TITLE = "Attention!";
var ALERT_BUTTON_TEXT ="D'accord";

if(document.getElementById) {
    window.alert = function(txt) {
        createCustomAlert(txt);
    }
}

function createCustomAlert(txt) {
    d = document;

    if(d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
    alertObj.style.visiblity="visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));

    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() { removeCustomAlert();return false; }

    alertObj.style.display = "block";

}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}





