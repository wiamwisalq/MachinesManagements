package controller;

import beans.Graph;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import beans.Machine;
import beans.Marque;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import service.MachineService;
import service.MarquesService;

/**
 *
 * @author Lachgar
 */
@WebServlet(urlPatterns = {"/MachineController"})
public class MachineController extends HttpServlet {

    private MachineService ms = new MachineService();
    private MarquesService mss=new MarquesService();
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        if (request.getParameter("op") != null) {
            if (request.getParameter("op").equals("load")) {
                response.setContentType("application/json");
                List<Machine> machines = ms.findAll();
                Gson json = new Gson();
                response.getWriter().write(json.toJson(machines));
            }else if (request.getParameter("op").equals("graph")) {
                response.setContentType("application/json");
                List<Graph> counts = ms.graph();
                Gson json = new Gson();
                response.getWriter().write(json.toJson(counts));
            }else if (request.getParameter("op").equals("loadM")) {
                response.setContentType("application/json");
                List<Marque> mar = mss.findAll();
                Gson json = new Gson();
                response.getWriter().write(json.toJson(mar));
            }else if (request.getParameter("op").equals("sup")) {
            	int n=Integer.parseInt(request.getParameter("indice"));
            	ms.delete(ms.findById(n));
                response.setContentType("application/json");
                List<Machine> ma=ms.findAll();
                Gson json = new Gson();
                response.getWriter().write(json.toJson(ma));
            }else if (request.getParameter("op").equals("sel")) {
            	int n=Integer.parseInt(request.getParameter("indice"));           	
                response.setContentType("application/json");
                Gson json = new Gson();
                response.getWriter().write(json.toJson(ms.findById(n)));
            }else if (request.getParameter("op").equals("testRefM")) {
            	String reference = request.getParameter("ref");
            	int n=Integer.parseInt(request.getParameter("id"));           	
                response.setContentType("application/json");
                Gson json = new Gson();               
                response.getWriter().write(json.toJson(ms.findRefIdMarque(n, reference)));
                
            }else if (request.getParameter("op").equals("mod")) {
            	String reference = request.getParameter("ref");
            	int n=Integer.parseInt(request.getParameter("id")); 
            	double prix = Double.parseDouble(request.getParameter("prix"));
                Date dateAchat = new Date(request.getParameter("date").replace("-", "/"));
                int idMarque = Integer.parseInt(request.getParameter("idM"));
                Machine m=ms.findById(n);
                m.setDateAchat(dateAchat);
                m.setPrix(prix);
                m.setReference(reference);
                m.setMarque(mss.findById(idMarque));
                ms.update(m);
                response.setContentType("application/json");
                List<Machine> machines = ms.findAll();
                Gson json = new Gson();
                response.getWriter().write(json.toJson(machines));
                
            }else if (request.getParameter("op").equals("r1")) {
            	
                Date d1 = new Date(request.getParameter("d1").replace("-", "/"));
                Date d2 = new Date(request.getParameter("d2").replace("-", "/"));
                
                response.setContentType("application/json");
                List<Machine> machines = ms.findMachineEntreDates(d1, d2);
                Gson json = new Gson();
                response.getWriter().write(json.toJson(machines));
                
            }else if (request.getParameter("op").equals("r2")) {
            	
            	 int idMarque = Integer.parseInt(request.getParameter("idM"));
                response.setContentType("application/json");
                List<Machine> machines = ms.findMachineByMarque(mss.findById(idMarque));
                Gson json = new Gson();
                response.getWriter().write(json.toJson(machines));
                
            }
        } else {
            String reference = request.getParameter("reference");
            double prix = Double.parseDouble(request.getParameter("prix"));
            Date dateAchat = new Date(request.getParameter("dateAchat").replace("-", "/"));
            int idMarque = Integer.parseInt(request.getParameter("idM"));
            ms.create(new Machine(reference, dateAchat, prix,mss.findById(idMarque)));

            response.setContentType("application/json");
            List<Machine> machines = ms.findAll();
            Gson json = new Gson();
            response.getWriter().write(json.toJson(machines));
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
