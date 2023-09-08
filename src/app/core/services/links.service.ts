import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from "@angular/material/dialog";
import { FieldType, FormConfig } from "../models/form-config.models";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { Link } from "../models/links.models";
import { UserService } from "./user.service";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class LinksService implements OnDestroy {

    private dataList: Link[] = [];
    private dataListSubject: BehaviorSubject<Link[]> = new BehaviorSubject<Link[]>([]);
    public data$: Observable<Link[]> = this.dataListSubject.asObservable();

    private formFields: FormConfig[] = [
        { type: FieldType.Text, label: 'Name', name: 'name', validations: [Validators.required] },
        { type: FieldType.Text, label: 'Url', name: 'url', validations: [Validators.required] },
        {
            type: FieldType.Select, label: 'Category', name: 'category', options: [
                'Social',
                'Home',
                'Phone',
                'Music',
                'School',
                'Entertiment',
                'Forum',
                'Another'
            ], validations: [Validators.required]
        },
    ];

    private url: string;
    uid: string | null;
    subscription: Subscription = new Subscription();

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        private userService: UserService,
    ) {
        this.uid = userService.getUid();
        this.url = `${environment.firebaseConfig.databaseURL}/users/${this.uid}/links/linksList.json`;
    };

    getList() {
        this.subscription.add(this.http.get<Link[]>(this.url)
            .subscribe({
                next: (response: Link[] | null) => {
                    const data = response !== null ? response : [];
                    this.dataList = data;
                    this.dataListSubject.next(data);
                },
                error: () => {
                    this.dialog.open(InfoDialogComponent, {
                        data: {
                            title: 'Error',
                            description: 'Error while fetching data',
                            type: 'error'
                        }
                    });
                }
            }))
    }

    addUniqueId(): string {
        return uuidv4();
    }

    add(item: Link) {
        const clonedList = [...this.dataList, item];
        this.dataListSubject.next(clonedList);
        this.subscription.add(this.http.put<Link[]>(this.url, clonedList)
        .subscribe(() => {
            this.dataList = clonedList;
        }))
    }

    update(updatedItem: Link) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === updatedItem.id)
        if (index !== -1) {
            clonedList[index] = updatedItem;
            this.dataListSubject.next(clonedList);
            this.subscription.add(this.http.put<Link[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
            }))
        }
    }

    delete(item: Link) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === item.id);
        if (index !== -1) {
            clonedList.splice(index, 1);
            this.dataListSubject.next(clonedList);
            this.subscription.add(this.http.put<Link[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
            }))
        }
    }

    getFormFields() {
        return this.formFields.slice()
    }

    getIcon(category: string): string {
        switch (category) {
          case 'Social':
            return 'alternate_email';
          case 'Home':
            return 'home';
          case 'Music':
            return 'music_note';
          case 'School':
            return 'school';
          case 'Phone':
            return 'phone';
          case 'Forum':
            return 'forum';
          case 'Entertiment':
            return 'casino';
          default:
            return 'link';
        }
      }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}