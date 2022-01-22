<% if (session.getAttribute("nom") != "") { %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title></title>

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">
        <script src="script.js" type="text/javascript"></script>
       <script src="script/jquery-3.3.1.min.js" type="text/javascript"></script>
        <script src="script/recherche.js" type="text/javascript"></script>
        
    <!-- Custom styles for this template-->
    <link href="css/sb-admin-2.css" rel="stylesheet">
    <link href="alertStyle.css" rel="stylesheet">
</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">
    
       <%@include file="template/sidebar.jsp" %>
        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

       
            <!-- Main Content -->
            <div id="content" >
            
             <%@include file="template/header1.jsp" %>
                <div class="container-fluid">
                   <div class="row">
                        <div class="col-sm-3">
                        
                        </div>
                        <div class="col-sm-6">
                    		<div class="card shadow mb-4" style="background-color: #FCF1EE;">
                    		<div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold" style="color: #6F0000;">Enter Les donnees:</h6>
                        </div>
                    		<div class="card-body">
                           <input id="idh" type="hidden" value="">
                          	<form class="user">
                                 <div class="form-group">
                                     <input type="date" class="form-control form-control-user"
                                         id="d1">
                                 </div>
                                 <div class="form-group">
                                     <input type="date" class="form-control form-control-user"
                                         id="d2" >
                                 </div>
                                 <div class="p-3"></div>
                                 <a id="rech" class="btn btn-primary btn-user btn-block">
                                     Chercher
                                 </a>
                                 <a id="lst" class="btn btn-primary btn-user btn-block" >
                                     Lister Tous
                                 </a>
                                 
                             </form>
                    </div>
                    </div>
                 </div>
                 
 			 </div>   

                    <!-- DataTales Example -->
                    <div class="card shadow mb-4" style="background-color: #FCF1EE;">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold " style="color: #6F0000;">Gestion des Marques</h6>
                        </div>
                        
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered"  width="100%" cellspacing="0">
                                    <thead> 
                                        <tr>
                                            <th align="center">ID</th>
                                            <th align="center">Reference</th>
                                            <th align="center">Date D'achat</th>
                                            <th align="center">Prix</th>
                                            <th align="center">Marque</th>
                                            <th align="center">Supprimer</th>
                                            
                                            
                                        </tr>
                                    </thead>
                                    
                                    <tbody id="con">
                                        
                                     
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
       

        </div>
        <!-- End of Content Wrapper -->

    </div>


  <%@include file="template/footer1.jsp" %>
  <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>

    <!-- Page level plugins -->
    <script src="vendor/chart.js/Chart.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="js/demo/chart-area-demo.js"></script>
    <script src="js/demo/chart-pie-demo.js"></script>

</body>

</html>
<% } else {%>
    <c:redirect url="http://localhost:8084/MachineTest/login.jsp"/>
    
<% } %>