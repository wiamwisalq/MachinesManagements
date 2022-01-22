package controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import beans.Graph;
import beans.Machine;
import beans.Marque;
import service.MarquesService;

/**
 * Servlet implementation class MarqueController
 */
@WebServlet("/MarqueController")
public class MarqueController extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private MarquesService ms;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MarqueController() {
        super();
        ms=new MarquesService();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("op") != null) {
            if (request.getParameter("op").equals("load")) {
                response.setContentType("application/json");
                List<Marque> marques = ms.findAll();
                Gson json = new Gson();
                response.getWriter().write(json.toJson(marques));
            }else if (request.getParameter("op").equals("sup")) {
            	int n=Integer.parseInt(request.getParameter("indice"));
            	ms.delete(ms.findById(n));
                response.setContentType("application/json");
                List<Marque> ma=ms.findAll();
                Gson json = new Gson();
                response.getWriter().write(json.toJson(ma));
            }else if (request.getParameter("op").equals("sel")) {
            	int n=Integer.parseInt(request.getParameter("indice"));           	
                response.setContentType("application/json");
                Gson json = new Gson();
                response.getWriter().write(json.toJson(ms.findById(n)));
            }else if (request.getParameter("op").equals("mod")) {
            	String code = request.getParameter("code");
                String libelle = request.getParameter("libelle");
            	int id=Integer.parseInt(request.getParameter("id"));  
            	Marque m=ms.findById(id);
            	m.setCode(code);
            	m.setLibelle(libelle);
            	ms.update(m);
                response.setContentType("application/json");
                List<Marque> ma=ms.findAll();
                Gson json = new Gson();
                response.getWriter().write(json.toJson(ma));
            }else if (request.getParameter("op").equals("testCode")) {
            	String code = request.getParameter("code");
                String libelle = request.getParameter("libelle");
                response.setContentType("application/json");
                Gson json = new Gson();
                response.getWriter().write(json.toJson(ms.findByCodeL(code,libelle)));
            }
        } else {
            String code = request.getParameter("code");
            String libelle = request.getParameter("libelle");
            
            ms.create(new Marque(code, libelle));
            response.setContentType("application/json");
            List<Marque> marques = ms.findAll();
            Gson json = new Gson();
            response.getWriter().write(json.toJson(marques));
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
