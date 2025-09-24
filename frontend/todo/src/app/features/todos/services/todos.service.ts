import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Todo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private _baseURL = `${environment.apiUrl}/api/todos`;
  private todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.todos$.asObservable();
  }

  fetchTodos(): void {
    this.http.get<Todo[]>(this._baseURL).subscribe({
      next: (todos) => this.todos$.next(todos),
    });
  }

  addTodo(title: string): void {
    const tempId = Date.now().toString();
    const newTodo = { _id: tempId, title, completed: false };

    this.todos$.next([...this.todos$.value, newTodo]);

    this.http.post<Todo>(this._baseURL, { title }).subscribe({
      next: (savedTodo) => {
        console.log(savedTodo);
        this.todos$.next(
          this.todos$.value.map((t) => (t._id === tempId ? savedTodo : t)),
        );
      },
      error: () => {
        this.todos$.next(this.todos$.value.filter((t) => t._id !== tempId));
      },
    });
  }
}
