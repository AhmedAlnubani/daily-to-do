import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DailyTasksService } from './daily-task.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-daily-tasks',
  templateUrl: './daily-tasks.component.html',
  styleUrl: './daily-tasks.component.scss'
})
export class DailyTasksComponent {
  //#region  Properties
  dataSource = new MatTableDataSource<any>();
  tableData: any;
  taskForm: FormGroup;
  displayedColumns: any = ['name', 'priority', 'status', 'startDate', 'dueDate', 'action']
  date: { year: number; month: number };
  dataForm: any;
  model1: string;
  public model2: string;
  public searchDataValue = '';
  priorityList = [
    { value: 'Low', text: 'Low' },
    { value: 'Height', text: 'Height' },
    { value: 'Normal', text: 'Normal' }
  ];
  statusList = [
    { value: 'Open', text: 'Open' },
    { value: 'Completed', text: 'Completed' },
    { value: 'InProgress', text: 'InProgress' }
  ];
  //#endregion  Properties

  //#region  constructor
  constructor(fb: FormBuilder,private route: Router,private service: DailyTasksService) { }
  //#endregion  constructor
  
  //#region  Functions
  ngOnInit() {
    this.buildForm();
    this.getAllTasks();
  }
  Logout() {
    this.route.navigate(['/login']);
  }
  getAllTasks() {
    this.service.getAll().subscribe((res: any) => {
      setTimeout(() => {
        debugger
        this.tableData = res;
        this.dataSource = new MatTableDataSource(this.tableData);
      }, 0);

    })
  }

  reset() {
    this.dataForm = [];
    this.taskForm.reset();
    this.buildForm()
  }

  edit(data: any) {
    this.dataForm = data;
    this.buildForm();
  }

  delete(id: any) {
    Swal.fire({
      title: "Do you want to delete task?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "confirm",

    }).then((result) => {

      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((res: any) => {
          this.tableData = this.tableData.filter((it: any) => it.id != id);
          this.dataSource = new MatTableDataSource(this.tableData);
        })

      }
    });
  }

  buildForm() {
    var startDate = new Date(this.dataForm?.startDate);
    var dueDate = new Date(this.dataForm?.dueDate);

    var sday = new NgbDate(startDate.getFullYear(), startDate.getMonth() + 1 , startDate.getDate());
    var dday = new NgbDate(dueDate.getFullYear(), dueDate.getMonth() + 1 , dueDate.getDate());


    this.taskForm = new FormGroup({
      name: new FormControl(this.dataForm?.name || '', [Validators.required]),
      priority: new FormControl(this.dataForm?.priority || 'Low', [Validators.required]),
      status: new FormControl(this.dataForm?.status || 'Open', [Validators.required]),
      startDate: new FormControl(sday, [Validators.required]),
      dueDate: new FormControl(dday, [Validators.required]),
      description: new FormControl(this.dataForm?.description || ''),
      id: new FormControl(this.dataForm?.id)
    })
  }

  onSubmit() {
    
    //let data = this.taskForm.value
   
    let startDate = new Date(this.taskForm.value?.startDate['year'] + '-' + this.taskForm.value?.startDate['month'] + '-' + this.taskForm.value?.startDate['day']);
    let dueDate = new Date( this.taskForm.value?.dueDate['year'] + '-' + this.taskForm.value?.dueDate['month'] +'-' +this.taskForm.value?.dueDate['day']);
    
     startDate.setDate(startDate.getDate() + 1);
     dueDate.setDate(dueDate.getDate() + 1);
    
    const objData = {
      id: this.taskForm.value?.id,
      name: this.taskForm.value?.name,
      priority: this.taskForm.value?.priority,
      status: this.taskForm.value?.status,
      description: this.taskForm.value?.description,
      startDate: startDate,
      dueDate: dueDate
    }

    if (this.taskForm.value?.id) {
      let rus = this.service.update(objData).subscribe((res: any) => {
        this.tableData.map((it: any) => {
          if (it.id === res.id) {
            it.dueDate = res.dueDate.replace('Z','')
            it.id = res.id
            it.name = res.name
            it.priority = res.priority;
            it.startDate = res.startDate.replace('Z','');
            it.status = res.status;
            it.description = res.description
          }
        })
        alert('Success')
        this.dataSource = new MatTableDataSource(this.tableData);
      });
    }
    else {
      this.service.add(objData).subscribe((res: any) => {debugger
        this.taskForm.reset()
        this.dataForm = []
        res.startDate = res.startDate.replace('Z','');
        res.dueDate = res.dueDate.replace('Z','');
        this.tableData.push(res);
        alert('Success')
        this.dataSource = new MatTableDataSource(this.tableData);
      });
    }

  }
  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.tableData = this.dataSource.filteredData;
  }

  //#endregion  Functions
}
