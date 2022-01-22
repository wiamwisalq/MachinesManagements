$(document).ready(function () {
	
    $("#add").click(function () {
        var nom = $("#nom").val();
        var prenom = $("#prenom").val();
		var email = $("#email").val();
		var pass = $("#pass").val();
		var rpass = $("#rpass").val();
		var u;
		if(nom!="" && prenom!="" && email!="" && pass!="" && rpass!="" ){		         
			if(pass==rpass){
				
				$.ajax({
			        url: "UserController",
			        data: {op: "emailT", email: email},
			        type: 'POST',
			        success: function (data1, textStatus, jqXHR) {
				           if(data1==null){
					           addRest(true);
							}else{
								addRest(false);
							}
				        },
				        error: function (jqXHR, textStatus, errorThrown) {
				            console.log(textStatus);
							
				        }
   		 		});	   
				
	
			}else{
				alert("Mot de passe repeter incorrect");
			}
		}else{
			alert("Remplir tous les champs");
		}
        
        

    });

function addRest(isExist){
	var nom = $("#nom").val();
        var prenom = $("#prenom").val();
		var email = $("#email").val();
		var pass = $("#pass").val();
		var rpass = $("#rpass").val();
	
	if(isExist){
		if(emailIsValid(email)){
			$.ajax({
	            url: "UserController",
	            data: {nom: nom, prenom: prenom, email: email,pass:pass},
	            type: 'POST',
	            success: function (data, textStatus, jqXHR) {
					alert("Bien Enregestrer");
					window.location.href = "login.jsp";
	                console.log(data);
	            },
	            error: function (jqXHR, textStatus, errorThrown) {
	                console.log(textStatus);
					
	            }
	        });
		}else{
			alert("Email Invalide");
		}
			
	}else{
		alert("Email deja existe");
	}		
}

$("#login").click(function () {    
		var email = $("#email").val();
		var pass = $("#pass").val();
		
		if(email!="" && pass!=""){
			$.ajax({
	            url: "UserController",
	            data: {op:"login", email: email , pass:pass},
	            type: 'POST',
	            success: function (data, textStatus, jqXHR) {
					//alert("Bien Enregestrer");
					//alert(data);
					window.location.href = "dashboard.jsp";
	                
	            },
	            error: function (jqXHR, textStatus, errorThrown) {
	                console.log(textStatus);
	            }
	        });
				
		}else{
			alert("Remplir tous les champs");
		}
        
        

    });



$("#logout").click(function () {    
	
		$.ajax({
            url: "UserController",
            data: {op:"logout"},
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
				
				window.location.href ="login.jsp";
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
				

    });




function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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