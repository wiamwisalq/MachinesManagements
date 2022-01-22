package beans;

public class Graph {

	public String m;
	public int nbr;
	public Graph(String m, int nbr) {
		super();
		this.m = m;
		this.nbr = nbr;
	}
	@Override
	public String toString() {
		return "Graph [m=" + m + ", nbr=" + nbr + "]";
	}
	
	
}
