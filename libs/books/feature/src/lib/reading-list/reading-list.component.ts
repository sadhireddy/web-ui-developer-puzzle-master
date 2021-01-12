import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { removeUndoFromReadingList } from '../../../../data-access/src/lib/+state/reading-list.actions';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private snackbar: MatSnackBar
    ) {}

  removeFromReadingList(item:ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    const snackbarRef = this.snackbar.open(`Removed: ${item.title}.`, 'Undo', { duration: 5000 });
    snackbarRef.onAction().pipe(take(1)).subscribe(() =>
        this.store.dispatch(removeUndoFromReadingList({ item }))
      );

  }
}
