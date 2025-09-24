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
  newTodoTitle: string | null | undefined = null;
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

  startEdit(todo: Todo) {
    if (todo?._id) {
      this.editingId = todo._id;
      this.editingTitle = todo.title;
    }
  }

  saveEdit(todo: Todo, title: string | null) {
    if (!title) return;
    todo.title = title;

    this.todosService.updateTodo(todo).subscribe({
      next: () => {
        this.editingId = null;
      },
      error: () => {
        console.error('Failed to update task');
      },
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.editingTitle = null;
  }
}
