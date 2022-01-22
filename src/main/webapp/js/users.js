
$(document).ready(function () {
$("#add").click(function () {
        var nom = $("#nom").val();
        var prenom = $("#prenom").val();
        var email = $("#email").val();
        var pass = $("#pass").val();
        var rpass = $("#rpass").val();
        alert(nom+" "+prenom+" "+email+" "+pass+" "+rpass);
        $.ajax({
            url: "UserController",
            data: {nom: nom, prenom: prenom, email: email,pass:pass},
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                remplir(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });

    });
});