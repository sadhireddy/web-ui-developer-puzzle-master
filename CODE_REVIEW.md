1. Added Type Notation "ReadingListItem" for item of any in removeFromReadingList, Changes made in reading-list.component.ts file.
2. Test weren't covered completely and we could increase the test coverage so, added failedRemoveFromReadingList and failedAddToReadingList scenarios to reading-list.reducer.ts file.
3. Accessibility can be improved by adding <label> to <input> tags makes easy for screen readers as this is one of the accessbility issue.
4. When you subscribe to an observable, usually we need to unsubscribe to release memory in the system. In TS files we need to implement            unsubscribe when ever a event is subscribed. Added async pipe to book search to avoid memory leak because it didn't unsubscribe after subscribing and made necessary chanes in book-search.component.html and book-search.component.ts.
5. In reading-list.effects.ts file, the parametrs inside the constructor are declared as readonly, since those parameter values cannot be changed.
6. Dynamic data in the code which needs to be externalized. All the content names such as text names, button names can be send to AEM. So it can be authored by AEM team in case of a last minute changes. To avoid code changes and redeploy the package for small changes.


Accessibility

1. Found an accessibility issue from Lighthouse so, added "aria-label" to Search Icon button in the book search Bar from book-search.component.html file.
2. Manually found an accessibility issue with Readinglist button so, added "arial-lable" as readingList in app.component.html file.
3. Added alt attribute to images tags to describe the contents of images if they aren't loaded so, made changes in book-search.component.html and reading-list.component.html.
4. Fixed lighthouse issue with "Reading List" button where it didn't have a sufficient contrast ratio so, added "$pink-dark" to background color in app.component.scss.
5. Fixed lighthouse issue where Background and foreground colors didn't have a sufficient contrast ratio so, updated color to a darker gray "$gray80" in book-search.component.scss.

TEST

1. Fixed 2 test suites conditions that were failing in reading-list.reducer.spec.ts.
2. e2e test run was successful.