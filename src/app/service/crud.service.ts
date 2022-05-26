import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';
import { environment as ENV } from '../../environments/environment';

/**
 * @description This service is used to perform CRUD operations on the database
 * @exports CrudService
 * @author Raul E. Aguirre H @ysp0lur
 */
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http : HttpClient) {}

  addTask(task : Task) : Observable<Task> {
    return this.http.post<Task>(`${ENV.URL}/add-todo`,task);
  }

  getAllTask() : Observable<Task[]> {
    return this.http.get<Task[]>(`${ENV.URL}/todos`);
  }

  deleteTask(task : Task) : Observable<Task> {
    return this.http.delete<Task>(`${ENV.URL}/delete-todo/${task._id}`);
  }

  editTask(task : Task) : Observable<Task> {
    return this.http.put<Task>(`${ENV.URL}/edit-todo/${task._id}`,task);
  }

}
