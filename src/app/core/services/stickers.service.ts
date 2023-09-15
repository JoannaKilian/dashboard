import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from "@angular/material/dialog";
import { InfoDialogComponent } from "../shared/components/info-dialog/info-dialog/info-dialog.component";
import { Note } from "../models/note.models";


@Injectable({
    providedIn: 'root'
})

export class StickersService {

    private dataList: Note[] = [];
    private dataListSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
    public data$: Observable<Note[]> = this.dataListSubject.asObservable();


    private url: string;

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
    ) {
        this.url = `/stickers.json`;
    };

    getList() {
        this.http.get<Note[]>(this.url)
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
            })
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
        this.http.put<Note[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
            })
    }

    update(updatedItem: Note) {
        const clonedList = [...this.dataList];
        const index = clonedList.findIndex(x => x.id === updatedItem.id)
        if (index !== -1) {
            clonedList[index] = updatedItem;
            this.dataListSubject.next(clonedList);
            this.http.put<Note[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
            })
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
        this.http.put<Note[]>(this.url, clonedList)
            .subscribe(() => {
                this.dataList = clonedList;
            })
    }
}