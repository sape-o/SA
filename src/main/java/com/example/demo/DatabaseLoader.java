package com.example.demo;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.util.*;
import java.text.SimpleDateFormat;


@Component
public class DatabaseLoader implements CommandLineRunner {
    @Autowired
    private RepairInvoiceRepository repairInvoiceRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ComputerPartRepository computerrepository;
    @Autowired
    private ReceiptpartRepository receiptpartRepository;

	@Override
	public void run(String... strings) throws Exception {

        Employee e1 = new Employee("Watsamon", "Pongsupan","081-111-1111","sales","Chaiyaphum", 20, "Female", "1111111111111");
        Employee e2 = new Employee("Kanin", "Sakwattanavakin","082-222-2222","repair","Surin", 20, "Male", "2222222222222");
        Employee e3 = new Employee("Phakphum", "Phinyodom","083-333-3333","manager","Chaiyaphum", 21, "Female", "333333333333");
        Employee e4 = new Employee("Patiphan", "Winthachai","084-444-4444","sales","LA", 22, "Male", "4444444444444");
        Employee e5 = new Employee("Wariya", "Chanbuala","085-555-5555","sales","5", 20, "Female", "5555555555555");
        Employee e6 = new Employee("Pornnuttha", "Jaiprasert","086-666-6666","sales","6", 21, "Female", "6666666666666");
        Employee e7 = new Employee("Daniel", "Perkins","087-777-7777","repair","7", 23, "Male", "7777777777777");
        Employee e8 = new Employee("Nicholas", "Smith","088-888-8888","repair","8", 22, "Male", "8888888888888");
        this.employeeRepository.save(e1);
        this.employeeRepository.save(e2);
        this.employeeRepository.save(e3);
        this.employeeRepository.save(e4);
        this.employeeRepository.save(e5);
        this.employeeRepository.save(e6);
        this.employeeRepository.save(e7);
        this.employeeRepository.save(e8);

        User u1 = new User("B5800018","1",e1);
        User u2 = new User("B5800032","1",e2);
        User u3 = new User("B5803552","1",e3);
        User u4 = new User("B5813872","1",e4);
        User u5 = new User("B5815036","1",e5);
        User u6 = new User("B5823093","1",e6);
        User u7 = new User("B5800001","1",e7);
        User u8 = new User("B5800002","1",e8);
        this.userRepository.save(u1);
        this.userRepository.save(u2);
        this.userRepository.save(u3);
        this.userRepository.save(u4);
        this.userRepository.save(u5);
        this.userRepository.save(u6);
        this.userRepository.save(u7);
        this.userRepository.save(u8);

        Customer c1 = new Customer("Louise","Hall","087-1234-5678");
        Customer c2 = new Customer("Spencer","Henderson","081-1234-1234");
        this.customerRepository.save(c1);
        this.customerRepository.save(c2);
		
		
        Product p1 = new Product("Labtop","Toshiba","satellite l35","Black","Hardware","เปิดไม่ติด");
        Product p2 = new Product("Printer","Canon","g2000","Black","Hardware","หมึกสีไม่ออก");
        this.productRepository.save(p1);
        this.productRepository.save(p2);

        DateFormat newDate = new SimpleDateFormat("yyyy/MM/dd");
        Date x = newDate.parse("2017/10/06");
        Date y = newDate.parse("2017/10/12");

        RepairInvoice r1 = new RepairInvoice(x,y,c1,p1,e1,e2);
        RepairInvoice r2 = new RepairInvoice(x,y,c2,p2,e1,e2);
        this.repairInvoiceRepository.save(r1);
        this.repairInvoiceRepository.save(r2);

        //////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////////////
        // KANIN//
        /////////////////////////////////////////////////////////////////////
        ComputerPart part1 = new ComputerPart("CPU",100,0);
        ComputerPart part2 = new ComputerPart("GraphicCard",200,0);
        ComputerPart part3 = new ComputerPart("Ram",300,0);
        ComputerPart part4 = new ComputerPart("Mainboard",400,0);
        ComputerPart part5 = new ComputerPart("Harddisk",500,0);
        this.computerrepository.save(part1);
        this.computerrepository.save(part2);
        this.computerrepository.save(part3);
        this.computerrepository.save(part4);
        this.computerrepository.save(part5);

        Set<ComputerPart> computerparts = new HashSet<ComputerPart>(){
            {
                add(part1);
                add(part2);
                add(part3);
                add(part4);
                add(part5);
            }
        };

        this.receiptpartRepository.save(new Receiptpart(computerparts));



	}
}