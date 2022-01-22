package service;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import beans.Graph;
import beans.Machine;
import beans.Marque;
import connexion.Connexion;
import dao.IDao;

public class MachineService implements IDao<Machine> {

	private MarquesService ms=new MarquesService();
    @Override
    public boolean create(Machine o) {
        String sql = "insert into machine values (null, ?, ?, ?,?)";
        try {
            PreparedStatement ps = Connexion.getInstane().getConnection().prepareStatement(sql);
            ps.setString(1, o.getReference());
            ps.setDate(2, new Date(o.getDateAchat().getTime()));
            ps.setDouble(3, o.getPrix());
            ps.setDouble(4, o.getMarque().getId());
            if (ps.executeUpdate() == 1) {
                return true;
            }
        } catch (SQLException e) {
            System.out.println("create : erreur sql : " + e.getMessage());

        }
        return false;
    }

    @Override
    public boolean delete(Machine o) {
        String sql = "delete from machine where id  = ?";
        try {
            PreparedStatement ps = Connexion.getInstane().getConnection().prepareStatement(sql);
            ps.setInt(1, o.getId());
            if (ps.executeUpdate() == 1) {
                return true;
            }
        } catch (SQLException e) {
            System.out.println("delete : erreur sql : " + e.getMessage());

        }
        return false;
    }

    @Override
    public boolean update(Machine o) {

        String sql = "update machine set reference  = ? ,dateAchat = ? , prix = ? , id_marque= ? where id  = ?";
        try {
            PreparedStatement ps = Connexion.getInstane().getConnection().prepareStatement(sql);
            ps.setString(1, o.getReference());
            ps.setDate(2, new Date(o.getDateAchat().getTime()));
            ps.setDouble(3, o.getPrix());
            ps.setInt(4, o.getMarque().getId());
            ps.setInt(5, o.getId());
            if (ps.executeUpdate() == 1) {
                return true;
            }
        } catch (SQLException e) {
            System.out.println("update : erreur sql : " + e.getMessage());

        }
        return false;
    }

    @Override
    public Machine findById(int id) {
        Machine m = null;
        String sql = "select * from machine where id  = ?";
        try {
            PreparedStatement ps = Connexion.getInstane().getConnection().prepareStatement(sql);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return new Machine(rs.getInt("id"), rs.getString("reference"), rs.getDate("dateAchat"),
                        rs.getDouble("prix"),ms.findById(rs.getInt("id_marque")));
            }

        } catch (SQLException e) {
            System.out.println("findById " + e.getMessage());
        }
        return null;
    }

    @Override
    public List<Machine> findAll() {
        List<Machine> machines = new ArrayList<Machine>();

        String sql = "select * from machine";
        try {
            PreparedStatement ps = Connexion.getInstane().getConnection().prepareStatement(sql);;
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                machines.add(new Machine(rs.getInt("id"), rs.getString("reference"), rs.getDate("dateAchat"),
                        rs.getDouble("prix"),ms.findById(rs.getInt("id_marque"))));
            }

        } catch (SQLException e) {
            System.out.println("findAll " + e.getMessage());
        }
        return machines;
    }
    
    public List<Machine> findMachineByReference(String ref) {
        List<Machine> machines = new ArrayList<Machine>();

        String sql = "select * from machine where reference =  ?";
        try {
            PreparedStatement ps = Connexion.getInstane().getConnection().prepareStatement(sql);;
            ps.setString(1, ref);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                machines.add(new Machine(rs.getInt("id"), rs.getString("reference"), rs.getDate("dateAchat"),
                        rs.getDouble("prix"),ms.findById(rs.getInt("id_marque"))));
            }

        } catch (SQLException e) {
            System.out.println("findAll " + e.getMessage());
        }
        return machines;
    }
    
    public List<String> findReference() {
        List<String> references = new ArrayList<String>();
        String sql = "select distinct(reference) as ref from machine";
        try {
            PreparedStatement ps = Connexion.getInstane().getConnection().prepareStatement(sql);;
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                references.add(rs.getString("ref"));
            }
        } catch (SQLException e) {
            System.out.println("findReference " + e.getMessage());
        }
        return references;
    }
    public List<Machine> findMachineByMarque(Marque m) {
        List<Machine> machines = new ArrayList<Machine>();

        String sql = "select * from machine where id_marque = ?";
        try {
            PreparedStatement ps = Connexion.getInstane().getConnection().prepareStatement(sql);;
            ps.setInt(1, m.getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                machines.add(new Machine(rs.getInt("id"), rs.getString("reference"), rs.getDate("dateAchat"),
                        rs.getDouble("prix"),ms.findById(rs.getInt("id_marque"))));
            }

        } catch (SQLException e) {
            System.out.println("findAll " + e.getMessage());
        }
        return machines;
    }
    public List<Machine> findMachineEntreDates(java.util.Date d1,java.util.Date d2) {
        List<Machine> machines = new ArrayList<Machine>();

        String sql = "select * from machine where dateAchat BETWEEN ? and ?";
        try {
            PreparedStatement ps = Connexion.getInstane().getConnection().prepareStatement(sql);;
            ps.setDate(1, new Date(d1.getTime()));
            ps.setDate(2, new Date(d2.getTime()));
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                machines.add(new Machine(rs.getInt("id"), rs.getString("reference"), rs.getDate("dateAchat"),
                        rs.getDouble("prix"),ms.findById(rs.getInt("id_marque"))));
            }

        } catch (SQLException e) {
            System.out.println("findAll " + e.getMessage());
        }
        return machines;
    }
    public List<Graph> graph() {
        List<Graph> counts = new ArrayList<Graph>();

        String sql = "select count(distinct(m.id)) as nbr, a.libelle as l  from machine m inner join marque a on m.id_marque=a.id GROUP by a.id ";
        try {
            PreparedStatement ps = Connexion.getInstane().getConnection().prepareStatement(sql);;
          
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
            	counts.add(new Graph(rs.getString("l"),rs.getInt("nbr")));
            }

        } catch (SQLException e) {
            System.out.println("findAll " + e.getMessage());
        }
        return counts;
    }
    public boolean findRefIdMarque(int idMar,String refe) {
      
        String sql = "select * from machine where id_marque=? and reference=?";
        try {
            PreparedStatement ps = Connexion.getInstane().getConnection().prepareStatement(sql);
            ps.setInt(1, idMar);
            ps.setString(2, refe);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return false;
            }

        } catch (SQLException e) {
            System.out.println("findAll " + e.getMessage());
        }
        return true;
    }
}
