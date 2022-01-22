$(document).ready(function () {
	$.ajax({
        url : "MachineController",
        data:{op:"load"},
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
		
            remplir4(data);
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
$("#rech2").click(function () {
        
	   var idMarque=$("#marques").val();
       $.ajax({
            url: "MachineController",
            data: {op:"r2" , idM: idMarque},
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
	        remplir4(data);
			
			console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
   		 });

        
    });
	$("#rech").click(function () {
        var d1 = $("#d1").val();
        var d2 = $("#d2").val();
        
        $.ajax({
            url: "MachineController",
            data: {op:"r1", d1 : d1 , d2 : d2 },
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                remplir4(data);
				
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });

    });
	
$("#lst").click(function () {
		 $.ajax({
        url : "MachineController",
        data:{op:"load"},
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
		
            remplir4(data);
            //console.log(data);
        }
    });
	});
	
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
                remplir4(data);               
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
	}else{
		createCustomAlert("Remplir les champs")
	}
       
}
	 function remplir4(data) {
        var ligne = "";
        for (var i = 0; i < data.length; i++) {
            ligne += "<tr><td>" + data[i].id + "</td><td>" + data[i].reference + "</td><td>" + data[i].dateAchat + "</td><td>" + data[i].prix + "</td><td>" + data[i].marque.libelle  + "</td><td align='center'><button class='sup far fa-trash-alt btn btn-danger' indice="+data[i].id+"></button></td></tr>";
        }
        $("#con").html(ligne);
    }
    function remplir2(data) {
        var ligne = "<option value='-1'>--Selectionner un Marque--</option>";
        for (var i = 0; i < data.length; i++) {
            ligne += "<option value='"+data[i].id+"'>"+data[i].code+"-"+data[i].libelle+"</option>";
        }
        $("#marques").html(ligne);
		$("#marques").val($("#marques option:first").val());
    }
    
});