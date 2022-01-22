package service;

import java.util.Date;
import java.util.Iterator;

import beans.Graph;
import beans.Machine;
import beans.Marque;
import beans.User;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		
		MarquesService ms=new MarquesService();
		MachineService mchs=new MachineService();
		UserService us=new UserService();
		//Marque m1=new Marque("plz", "plzzz");
		//ms.create(m1);
		
		
		
		//System.out.println(mchs.findRefIdMarque(5, "RRRR"));
		System.out.println(us.findByEmail("wiam12laqssir@gmail.com"));
	}

}
