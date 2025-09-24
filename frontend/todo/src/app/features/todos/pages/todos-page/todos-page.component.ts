import { AsyncPipe } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of, tap } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todos-page',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss',
})
export class TodosPageComponent implements OnInit {
  newTodoTitle: string | null = null;
  editingTitle: string | null = null;
  editingId: string | null = null;
  todos$: Observable<Todo[]>;

  constructor(private todosService: TodosService) {
    this.todos$ = this.todosService.getTodos();
  }

  ngOnInit(): void {
    this.todosService.fetchTodos();
  }

  addTodo() {
    const title = this.newTodoTitle?.trim();
    if (!title) return;

    this.todosService.addTodo(title);
  }

  deleteTodo(todo: Todo) {}

  toggle(todo: Todo) {}

  startEdit(todo: Todo) {}

  saveEdit(todo: Todo) {}

  cancelEdit() {}
}
