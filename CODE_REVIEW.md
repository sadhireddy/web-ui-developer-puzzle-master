1. There was no type specified in reading-list.component.ts
2. Test weren't covered completely and we could increase the test coverage.
3. Accessibility can be improved.
4. Few selectors are being subscribed and its good to unsubscribe.
5. Types was not defined in readinglistcomponent.ts, so added readinglistitem to removeFromReadingList. 

Accessibility

1. Added arial-lable to button
2. Manually Found issue with readlist button and added arial-lable to it
3. Added alt to images
4. Added background color to button to fix lighthouse issue.
5. Background and Foreground colors dont have sufficient contrast ratio.

TEST

1. Fixed 2 test suites conditions that were failing in reading-list.component.ts
2. e2e test run was successful.