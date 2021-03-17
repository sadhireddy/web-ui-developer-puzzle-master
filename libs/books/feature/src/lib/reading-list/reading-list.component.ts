import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { markAsRead } from '../../../../data-access/src/lib/+state/reading-list.actions';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  isFinished(item){
    this.store.dispatch(markAsRead({item}));
  }

  removeFromReadingList(item:ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
}
