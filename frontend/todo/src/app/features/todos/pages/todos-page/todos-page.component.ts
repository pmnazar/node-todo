import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { LlmService } from '../../../../core/services/llm.service';
import { ConfirmDeleteComponent } from '../../../../shared/dialogs/confirm-delete/confirm-delete.component';
import { Todo } from '../../models/todo.model';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-page',
  imports: [FormsModule, AsyncPipe, MatDialogModule],
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosPageComponent implements OnInit {
  newTodoTitle: string | null | undefined = null;
  editingTitle: string | null = null;
  editingId: string | null = null;
  todos$: Observable<Todo[]>;

  constructor(
    private todosService: TodosService,
    private llmService: LlmService,
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

    this.llmService.parseTask(title).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.error(e);
      },
    });
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
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
        console.error('Failed to update task');
      },
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.editingTitle = null;
  }
}
