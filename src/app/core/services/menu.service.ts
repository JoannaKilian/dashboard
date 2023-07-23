import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getCurrentIndex() {
    return this.currentIndex.asObservable();
  }

  setCurrentIndex(index: number) {
    this.currentIndex.next(index);
  }
}
