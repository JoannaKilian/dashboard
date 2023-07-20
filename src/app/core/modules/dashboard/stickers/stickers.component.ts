import { Component } from '@angular/core';
import { Note } from 'src/app/core/models/note.models';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',
  styleUrls: ['./stickers.component.scss']
})
export class StickersComponent {

  notes: Note[] = [
    { content: 'do sth 1', edit: false },
    { content: 'do sth 2', edit: false },
    { content: '', edit: false },
  ]

  onDeleteNote(index: number) {
    if (index >= 0 && index < this.notes.length) {
      const updateArray = [...this.notes];
      updateArray.splice(index, 1);
      this.notes = updateArray
    }
  }

  onAddNote() {
    const newNote: Note = {
      content: '',
      edit: false
    }

    this.notes.push(newNote)
  }
}
