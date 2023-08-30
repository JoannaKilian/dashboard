import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Validators } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from "@angular/material/dialog";
import { FieldType, FormConfig } from "../models/form-config.models";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { Note } from "../models/note.models";


@Injectable({
    providedIn: 'root'
})

export class StickersService implements OnDestroy {

    private dataList: Note[] = [];
    private dataListSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
    public data$: Observable<Note[]> = this.dataListSubject.asObservable();


    private url = 'https://dashboard-e83c7-default-rtdb.firebaseio.com/stickers.json';
    subscription: Subscription = new Subscription();

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
    ) {
    };

    getList() {
        this.subscription.add(this.http.get<Note[]>(this.url)
            .subscribe({
                next: (response: Note[] | null) => {
                    const data = response !== null ? response : [];
                    this.dataList = data;
                    this.dataListSubject.next(data);
                },
                error: () => {
                    this.dialog.open(InfoDialogComponent, {
                        data: {
                            title: 'Error',
                            description: 'Error while fetching stickers',
                            type: 'error'
                        }
                    });
                }
            }))
    }

    add() {
        const id = uuidv4();
        const note: Note = {
            id: id,
            content: '',
            dragPosition: { 
                x: this.dataList.length > 0  ? this.dataList.length*10 : 5 ,
                y: this.dataList.length > 0  ? this.dataList.length*10 : 5
            }
        };
        const clonedList = [...this.dataList, note];
        this.dataListSubject.next(clonedList);
        this.subscription.add(this.http.put<Note[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
            }))
    }

    update(updatedItem: Note) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === updatedItem.id)
        if (index !== -1) {
            clonedList[index] = updatedItem;
            this.dataListSubject.next(clonedList);
            this.subscription.add(this.http.put<Note[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
            }))
        }
    }

    delete(item: Note) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === item.id);
        clonedList.splice(index, 1);
        this.dataListSubject.next(clonedList);
        this.dataList = clonedList;
        this.http.put<Note[]>(this.url, clonedList);
    }

    deleteEmptyItems(itemList: Note[]) {
        const clonedList = [...this.dataList];
        itemList.forEach(note => {
            const index = clonedList.findIndex(x => x.id === note.id);
            clonedList.splice(index, 1);
        })
        this.dataListSubject.next(clonedList);
        this.subscription.add(this.http.put<Note[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
            }))
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}