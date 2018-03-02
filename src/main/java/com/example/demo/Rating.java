package com.example.demo;
import lombok.Data;
import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;



@Data
@Entity
public class Rating {
	private @Id
	@GeneratedValue
	Long id;

	@OneToOne
	private RepairInvoice repairInvoice;
	@ManyToOne
	private Employee employee;

	private String employelevel1;
	private String repairlevel;
	
	private Rating() {}
	public Rating(RepairInvoice repairInvoice,Employee employee,String employelevel1,String repairlevel) {
		this.repairInvoice = repairInvoice;
		this.employee = employee;
		this.employelevel1 = employelevel1;
		this.repairlevel = repairlevel;
	}
}