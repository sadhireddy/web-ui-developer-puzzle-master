1. There was no type specified in reading-list.component.ts
2. Test weren't covered completely and we could increase the test coverage.
3. Accessibility can be improved.
4. When you subscribe to an observable, usually we need to unsubscribe to release memory in the system. In TS files we need to implement            unsubscribe when ever a event is subscribed.
5. Types were not defined in readinglistcomponent.ts, so added readinglistitem to removeFromReadingList.
6. In reading-list.effects.ts file, the parametrs inside the constructor declared as readonly, since those parameter values cannot be changed.
7. Dynamic data in the code which needs to be externalized. All the content names such as text names, button names can be send to AEM. So by changing the content in the AEM we don't need to redeploy the code for small changes. 


Accessibility

1. Added arial-lable to button
2. Manually Found issue with readlist button and added arial-lable to it
3. Added alt to images
4. Added background color to button to fix lighthouse issue.
5. Background and Foreground colors dont have sufficient contrast ratio.

TEST

1. Fixed 2 test suites conditions that were failing in reading-list.component.ts
2. e2e test run was successful.