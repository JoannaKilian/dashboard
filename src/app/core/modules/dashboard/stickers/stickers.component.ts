import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { Note } from 'src/app/core/models/note.models';
import { StickersService } from 'src/app/core/services/stickers.service';
import { InfoDialogComponent } from 'src/app/core/shared/components/info-dialog/info-dialog/info-dialog.component';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.scss']
})
export class StickersComponent implements OnInit, OnDestroy {

  notes: Note[];
  subscription: Subscription = new Subscription();
  private updateNoteSubject = new Subject<Note>();
  private deleteEmptyNoteSubject = new Subject<Note>();

  constructor(
    private dataService: StickersService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dataService.getList();
    this.subscription.add(
      this.dataService.data$.subscribe(data => {
        this.notes = data;
        console.log('data', data)
      })
    );
    this.subscription.add(
      this.updateNoteSubject
        .pipe(debounceTime(3000))
        .subscribe((note) => {
          this.dataService.update(note);
        })
    )
    this.subscription.add(
      this.deleteEmptyNoteSubject
        .pipe(debounceTime(3000))
        .subscribe((note) => {
          this.onDeleteNote(note);
        })
    )
  }

  onDeleteNote(item: Note) {
    this.dataService.delete(item);
  }

  onDragEnd(e: any, note: Note) {
    const newTop = e.source.getFreeDragPosition().x;
    const newLeft = e.source.getFreeDragPosition().y;

    note.dragPosition = {
      x: newTop,
      y: newLeft,
    }

    this.dataService.update(note);

  }

  onNoteContentChange(note: Note) {
    if (note.content === "") {
      this.deleteEmptyNoteSubject.next(note);
    } else {
      this.updateNoteSubject.next(note);
    }
  }

  onAddNote() {
    if (this.notes.length < 10) {
      this.dataService.add();
    } else {
      this.dialog.open(InfoDialogComponent, {
        data: {
          title: "Focus on the Top 10 Priorities",
          description: "Efficient Task Management advice: Limit the tasks on the board, focusing on the most important and high-priority ones.",
          type: "info"
        }
      })
    }
  }

  ngOnDestroy(): void {
    const emptyNotes = this.notes.filter(note => note.content === "");
    this.dataService.deleteEmptyItems(emptyNotes);
    this.subscription.unsubscribe();
  }
}
