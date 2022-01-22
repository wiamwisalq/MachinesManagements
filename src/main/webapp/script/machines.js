$(document).ready(function () {
    $.ajax({
        url : "MachineController",
        data:{op:"load"},
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
		
            remplir(data);
            //console.log(data);
        }
    });
    $.ajax({
        url : "MachineController",
        data:{op:"loadM"},
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
		
            remplir2(data);
        }
    });
    $("#add").click(function () {
        var reference = $("#ref").val();
        var dateAchat = $("#dateA").val();
        var prix = $("#prix").val();
		var idMarque=$("#marques").val();
		$.ajax({
            url: "MachineController",
            data: {op:"testRefM" , ref: reference, id:idMarque},
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
				addRest(data);				
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });

      

    });
function addRest(data){
	var reference = $("#ref").val();
        var dateAchat = $("#dateA").val();
        var prix = $("#prix").val();
		var idMarque=$("#marques").val();
	if(data){
		  $.ajax({
            url: "MachineController",
            data: {reference: reference, dateAchat: dateAchat, prix: prix, idM:idMarque},
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
				alert("Bien Ajouter");
                remplir(data);
				vider();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
	}else{
		alert("Deja inserer cette machine dans cette marque");
	}
}
function refMarqueValable( id, ref){
	
	$.ajax({
            url: "MachineController",
            data: {op:"testRefM" , ref: ref, id:id},
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
				console.log(data);	
				return data;
				
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
}
	
	 $("#con").on('click' , '.sup', function () {
		var indice = $(this).attr('indice'); 
        if (confirm("vous etes sur de supprimer ctte machine?") == true) {
    		suppRest(indice);
  		} 

    });
function suppRest(indice){
	 
        if(indice!=""){
	 $.ajax({
            url: "MachineController",
            data: {op: "sup", indice: indice},
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
				alert("Bien supprimer");
				console.log(data);				
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
            url: "MachineController",
            data: {op: "sel", indice: indice},
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
				window.scrollTo(0, 0);
                remplirChamp(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
	}else{
		createCustomAlert("Remplir les champs")
	}
    });

$("#mod").click(function () {


	var reference = $("#ref").val();
        var dateAchat = $("#dateA").val();
        var prix = $("#prix").val();
		var idMarque=$("#marques").val();
		$.ajax({
            url: "MachineController",
            data: {op:"testRefM" , ref: reference, id:idMarque},
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
				
				modRest0(data);				
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    });
function modRest0(data){
	if(data){
		if(confirm("Vous etes sur de modifier cette machine?")){
		restMod();
		}
	}else{
		alert("Cette marque a deja la machine suivante");
	}
	
}
function restMod(){
        var reference = $("#ref").val();
        var dateAchat = $("#dateA").val();
        var prix = $("#prix").val();
        var id= $("#idh").val();
		var idMarque=$("#marques").val();
		console.log(refMarqueValable(idMarque,reference));
		if(reference!="" && prix!="" && idMarque!=-1){
			
		       $.ajax({
		            url: "MachineController",
		            data: {op:"mod" , ref: reference,date:dateAchat,prix:prix,id:id, idM:idMarque},
		            type: 'POST',
		            success: function (data, textStatus, jqXHR) {
			        remplir(data);
					vider();
					//console.log(data);
		            },
		            error: function (jqXHR, textStatus, errorThrown) {
		                console.log(textStatus);
		            }
	       		 });
			
		}else{
			alert("Remplire tous les champs");
		}
        
}


 $("#cle").click(function () {
        vider();
    });
window.scroll({
 top: 0, 
 left: 0, 
 behavior: 'slow' 
});
	function vider(){
		$("#ref").val("");
        $("#dateA").val(new Date);
        $("#prix").val("");
		$("#marques").val("-1").change();
		$("#idh").val("");
	}
	function remplirChamp(data){
		$("#ref").val(data.reference);
        $("#dateA").val(formatDate(data.dateAchat));
        $("#prix").val(data.prix);
		$("#marques").val(data.marque.id.toString()).change();
		$("#idh").val(data.id);
	}
	
	function remplir2(data) {
        var ligne = "<option value='-1'>--Selectionner un Marque--</option>";
        for (var i = 0; i < data.length; i++) {
            ligne += "<option value='"+data[i].id+"'>"+data[i].code+"-"+data[i].libelle+"</option>";
        }
        $("#marques").html(ligne);
		$("#marques").val($("#marques option:first").val());
    }

    function remplir(data) {
        var ligne = "";
        for (var i = 0; i < data.length; i++) {
            ligne += "<tr><td>" + data[i].id + "</td><td>" + data[i].reference + "</td><td>" + data[i].dateAchat + "</td><td>" + data[i].prix + "</td><td>" + data[i].marque.libelle  + "</td><td align='center'><button class='sup far fa-trash-alt btn btn-danger' indice="+data[i].id+"></button></td><td align='center'><button class='sel fas fa-hand-pointer btn btn-success' indice="+data[i].id+"></button></td></tr>";
        }
        $("#con").html(ligne);
    }

	function formatDate(date) {
		var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();		
		if (month.length < 2)
		month = '0' + month;
		if (day.length < 2)
		day = '0' + day;
		return [year, month, day].join('-');
	}
	
	
});











