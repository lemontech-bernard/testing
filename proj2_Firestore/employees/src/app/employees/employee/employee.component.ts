import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  //create an object for the employee service class
  //create an object for the ngx-toaster service class
  constructor( private service: EmployeeService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  //typescript optional parameters (?) are nullable
  resetForm(form?: NgForm){
    if(form != null)  
      form.resetForm();
    //initialize the property(s) values
    this.service.formData = {
      EmpID: null,
      FullName: '',
      EmpCode: '',
      Mobile: '',
      EmpPosition: '' 
    }
  }

  //Submit click event
  onSubmit(form: NgForm){
    //determine whether it is create new record or update existing record based on EmpID
    console.log(form.value.EmpID);
    if(form.value.EmpID == null) {
      this.insertData(form);
    } else {
      this.updateData(form);
    }
  }

  //add data to Web API
  insertData(form: NgForm) {
    this.service.postEmployee(form.value).subscribe(response => {
      //show toastr message
      //- first parameter: message
      //- second paramter: title
      this.toastr.success('Added Successfully', '')

      this.resetForm(form);
      this.service.loadList();
    });
  }

  //update data to Web API
  updateData(form: NgForm) {
    this.service.putEmployee(form.value).subscribe(response => {
      //show toastr message
      //- first parameter: message
      //- second paramter: title
      this.toastr.info('Updated Successfully', '')

      this.resetForm(form);
      this.service.loadList();
    });
  }

}
