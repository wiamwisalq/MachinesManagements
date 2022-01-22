$(document).ready(function () {
	$.ajax({
        url : "MachineController",
        data:{op:"graph"},
        type: 'POST',
        success: function (data, textStatus, jqXHR) {
            remplir(data);
			
        }
    });
function remplir(data){
	let labels2=[];
    let data2=[];
    let colors2 = ['#49A9EA', '#36CAAB', '#34495E', '#B370CF','#755842','#F6DB95','#49A9EA', '#36CAAB', '#34495E', '#B370CF','#755842','#F6DB95'];

for (var i = 0; i < data.length; i++) {
	labels2[i]=data[i].m;
	data2[i]=data[i].nbr	
}
data2[data2.length]=0;
let myChart2 = document.getElementById("myChart2").getContext('2d');

let chart2 = new Chart(myChart2, {
    type: 'bar',
    data: {
        labels: labels2,
        datasets: [ {
            data: data2,
            backgroundColor: colors2
        }]
    },
    options: {
        title: {
            text: "Le nombre des machines par marque",
            display: true
        },
        legend: {
          display: false
        }
    }
});
}


});
