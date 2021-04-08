import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import * as ReadingListActions from './reading-list.actions';
import { HttpClient } from '@angular/common/http';
import { ReadingListItem, Book } from '@tmo/shared/models';
import { catchError, concatMap, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.loadReadingList),
      fetch({
        run: () => {
          return this.http
            .get<ReadingListItem[]>('/api/reading-list')
            .pipe(
              map(data =>
                ReadingListActions.loadReadingListSuccess({ list: data })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ReadingListActions.loadReadingListError({ error });
        }
      })
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      optimisticUpdate({
        run: ({ book }) => {
          return this.http.post('/api/reading-list', book).pipe(
            map(() =>
              ReadingListActions.confirmedAddToReadingList({book}),
              // this.snackBar.open(`Added: ${book.title}.`, 'Undo', { duration: 5000 })
              ),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
          );
        },
        undoAction: ({ book }) => {
          return ReadingListActions.failedAddToReadingList({
            book
          });
        }
      })
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      optimisticUpdate({
        run: ({ item }) => {
          return this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
            map(() =>
              ReadingListActions.confirmedRemoveFromReadingList({
                item
              })
            )
          );
        },
        undoAction: ({ item }) => {
          return ReadingListActions.failedRemoveFromReadingList({
            item
          });
        }
      })
    )
  );

  undoRemoveBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedRemoveFromReadingList),
      concatMap(({ item }) => {
        return this.snackBarOperation(
          item.title + ' has been removed from Reading List.',
          'Undo'
        )
          .onAction()
          .pipe(
            map(() =>
              ReadingListActions.addToReadingList({
                book: { ...item, id: item.bookId },
              })
            )
          );
      })
    )
  );

  undoAddBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.confirmedAddToReadingList),
      concatMap(({ book }) => {
        return this.snackBarOperation(
          book.title + ' has been added to Reading List.',
          'Undo'
        )
          .onAction()
          .pipe(
            map(() =>
              ReadingListActions.removeFromReadingList({
                item: { ...book, bookId: book.id },
              })
            )
          );
      })
    )
  );

  snackBarOperation(message: string, action: string) {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngrxOnInitEffects() {
    return ReadingListActions.loadReadingList();
  }

  constructor(private actions$: Actions, private http: HttpClient, private snackBar: MatSnackBar) {}
}



