import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private crudService : CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

/**
 * @description This method is used to get all the task from the database
 * @returns void
 * @memberof DashboardComponent
 * @author Raul E Aguirre H @ysp0lur
 */
  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, () => {
      alert("Unable to get list of tasks");
    });
  }

  /**
 * @description This method is used to add a new task to the database
 * @returns void
 * @memberof DashboardComponent
 * @author Raul E Aguirre H @ysp0lur
 */
  addTask() {
    this.taskObj.name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(() => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert(err);
    })
  }

/**
* @description This methos id used to edit a task
* @returns void
* @memberof DashboardComponent
* @author Raul E Aguirre H @ysp0lur
*/
  editTask() {
    this.taskObj.name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(() => {
      this.ngOnInit();
    }, () => {
      alert("Failed to update task");
    })
  }

  /**
   * @description This method is used to delete a task
   * @param etask: Task
   * @returns void
   * @memberof DashboardComponent
   * @author Raul E Aguirre H @ysp0lur
   */
  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe( () => {
      this.ngOnInit();
    }, () => {
      alert("Failed to delete task");
    });
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.name;
  }
}
