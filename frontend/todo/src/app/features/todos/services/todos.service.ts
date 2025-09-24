import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
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

  addTodo(title: string): Observable<Todo> {
    const tempId = Date.now().toString();
    const newTodo = { _id: tempId, title, completed: false };

    this.todos$.next([...this.todos$.value, newTodo]);

    return this.http.post<Todo>(this._baseURL, { title }).pipe(
      tap({
        next: (savedTodo) => {
          this.todos$.next(
            this.todos$.value.map((t) => (t._id === tempId ? savedTodo : t)),
          );
          return savedTodo;
        },
        error: () => {
          this.todos$.next(this.todos$.value.filter((t) => t._id !== tempId));
        },
      }),
    );
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    this.todos$.next(
      this.todos$.value.map((t) =>
        t._id === updatedTodo._id ? { ...t, ...updatedTodo } : t,
      ),
    );

    return this.http
      .put<Todo>(`${this._baseURL}/${updatedTodo._id}`, updatedTodo)
      .pipe(
        tap({
          next: (savedTodo) => {
            this.todos$.next(
              this.todos$.value.map((t) =>
                t._id === savedTodo._id ? savedTodo : t,
              ),
            );
          },
          error: () => {},
        }),
      );
  }

  deleteTodo(todo: Todo) {
    const url = `${this._baseURL}/${todo._id}`;
    const hashTodos = this.todos$.value;
    this.todos$.next(this.todos$.value.filter((t) => t._id !== todo._id));

    this.http.delete(url).subscribe({
      next: () => {},
      error: () => {
        this.todos$.next(hashTodos);
      },
    });
  }
}
