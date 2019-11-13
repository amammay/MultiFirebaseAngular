import {Component, Inject} from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FIREBASE_REFERENCES} from './core/firebase/firebase.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  readonly helloWorldOne$: Observable<{ [key: string]: any }>;
  readonly helloWorldTwo$: Observable<{ [key: string]: any }>;


  constructor(
    @Inject(FIREBASE_REFERENCES.ONE_FIRESTORE) private readonly firstDb: AngularFirestore,
    @Inject(FIREBASE_REFERENCES.TWO_FIRESTORE) private readonly secondDb: AngularFirestore,
  ) {


    this.helloWorldOne$ = this.prettyPrintChanges(this.firstDb.collection('test', ref => ref
      .where('hello', '==', 'world')
      .limit(10)
    )
      .snapshotChanges());

    this.helloWorldTwo$ = this.prettyPrintChanges(this.secondDb.collection('test', ref => ref
      .where('hello', '==', 'world')
      .limit(10)
    )
      .snapshotChanges());
  }

  private prettyPrintChanges(obs: Observable<DocumentChangeAction<any>[]>) {
    return obs.pipe(
      map(documentsQueryResult =>
        documentsQueryResult.map(document => ({
          [document.payload.doc.id]: document.payload.doc.data()
        })))
    );
  }

}
