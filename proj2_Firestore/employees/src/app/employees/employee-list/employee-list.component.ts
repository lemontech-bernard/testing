import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  //define a object for the employee service class
  constructor( private service: EmployeeService,
    private toastr: ToastrService) { }

  ngOnInit() {
    //call the loadList function
    this.service.loadList();
  }

  //edit/update data
  editData(emp: Employee){
    //populate entry form with the chosen employee data
    //this.service.formData = emp;  //this updates the list entry simultaneously during updating the data, so instead use the ff:
    this.service.formData = Object.assign({}, emp);
    //-first parameter: target (no target)
    //-second parameter: employee object
  }

  //delete data
  deleteData(id: number){
    //check for user confirmation
    if(confirm('Are you sure to delete this record?')){
      this.service.deleteEmployee(id).subscribe(response =>{
        this.toastr.warning('Deleted Successfully','');
        this.service.loadList()
      });
    }
  }

}
