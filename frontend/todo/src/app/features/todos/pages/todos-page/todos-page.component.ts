import { AsyncPipe } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of, tap } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Todo } from '../../models/todo.model';
import { ConfirmDeleteComponent } from '../../../../shared/dialogs/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-todos-page',
  imports: [FormsModule, AsyncPipe, MatDialogModule],
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss',
})
export class TodosPageComponent implements OnInit {
  newTodoTitle: string | null | undefined = null;
  editingTitle: string | null = null;
  editingId: string | null = null;
  todos$: Observable<Todo[]>;

  constructor(
    private todosService: TodosService,
    private dialog: MatDialog,
  ) {
    this.todos$ = this.todosService.getTodos();
  }

  ngOnInit(): void {
    this.todosService.fetchTodos();
  }

  addTodo() {
    const title = this.newTodoTitle?.trim();
    if (!title) return;

    this.todosService.addTodo(title).subscribe({
      next: () => {
        this.newTodoTitle = null;
      },
    });
  }

  deleteTodo(todo: Todo) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe({
      next: (confirmed) => {
        if (confirmed) this.todosService.deleteTodo(todo);
      },
    });
  }

  toggle(event: Event, todo: Todo) {
    const input = event.target as HTMLInputElement;

    todo.completed = input.checked;

    this.todosService.updateTodo(todo).subscribe({
      next: () => {
        this.editingId = null;
      },
      error: () => {
        console.error('Failed to update task');
      },
    });
  }

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
