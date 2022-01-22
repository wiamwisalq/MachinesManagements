package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import beans.Graph;
import beans.Machine;
import beans.User;
import service.UserService;

/**
 * Servlet implementation class UserController
 */
@WebServlet("/UserController")
public class UserController extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private UserService us;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserController() {
        super();
        us=new UserService();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session=request.getSession(true);
		if (request.getParameter("op") != null) {
            if (request.getParameter("op").equals("login")) {
            	String email = request.getParameter("email");
                String pass = request.getParameter("pass");
                User u=us.findByEmailPass(email, pass);
                
                if(u!=null) {
                	
                	session.setAttribute("nom",u.getNom());
                	session.setAttribute("prenom",u.getPrenom().toString());
                	response.setContentType("application/json");           
                    Gson json = new Gson();
                    response.getWriter().write(json.toJson(us.findByEmailPass(email, pass)));
                }
                
            }else if (request.getParameter("op").equals("emailT")) {
            	 String email = request.getParameter("email"); 
            	 User u=us.findByEmail(email);         	 
            	 response.setContentType("application/json");           
                 Gson json = new Gson();
                 response.getWriter().write(json.toJson(u));
            }else if (request.getParameter("op").equals("logout")) {
             session.setAttribute("nom", "");
             session.setAttribute("prenom", "");
           	 session.invalidate();
           	 request.getSession(false);
           	 //session.close();
          
           	 response.setContentType("application/json");           
             Gson json = new Gson();
             response.getWriter().write(json.toJson("done"));
           }
        } else {
            String nom = request.getParameter("nom");
            String prenom = request.getParameter("prenom");
            String email = request.getParameter("email");
            String pass = request.getParameter("pass");
            User u=new User(nom, prenom, email, pass);
            us.create(u);           
            response.setContentType("application/json");           
            Gson json = new Gson();
            response.getWriter().write(json.toJson(u));
        }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
