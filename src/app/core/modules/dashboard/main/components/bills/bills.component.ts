import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Bill } from 'src/app/core/models/bills.models';
import { EntityCategory } from 'src/app/core/models/category-list.models';
import { BillsService } from 'src/app/core/services/bills.service';
import { InfoDialogComponent } from 'src/app/core/shared/components/info-dialog/info-dialog/info-dialog.component';
import { AddBillDialogComponent } from './components/add-bill-dialog/add-bill-dialog.component';
import { UpdateBillDialogComponent } from './components/update-bill-dialog/update-bill-dialog.component';
import { TimeAlertService } from 'src/app/core/services/time-alert.service';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent implements OnInit, OnDestroy {


  data$: Observable<Bill[]>;
  title: EntityCategory;
  subscription: Subscription = new Subscription();

  constructor(
    private dataService: BillsService,
    public dialog: MatDialog,
    private timeAlertService: TimeAlertService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.title = "bills";
    this.dataService.getList();
    this.data$ = this.dataService.data$;
  }

  addDialog() {
    this.dialog.open(AddBillDialogComponent, {
      width: '500px',
      data: {
        title: this.title,
      }
    });
  }

  onEditHandler(bill: Bill) {
    this.dialog.open(UpdateBillDialogComponent, {
      width: '500px',
      data: {
        title: this.title,
        bill: bill,
      }
    });
  }

  onDeleteHandler(item: Bill) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: `Delete ${item.name}`,
        description: `Are you sure you want to delete ${item.name} link`,
        type: 'submit'
      }
    });
    this.subscription.add(dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.dataService.delete(item);
      }
    }))
  }

  onPaidHandler(bill: Bill) {
    const frequency: number = this.dataService.getPaymentIntervalDays(bill.frequency)
    const newDate = this.timeAlertService.addIntervalToDate(bill.date, frequency);
    const updatedBill: Bill = {
      ...bill,
      date: newDate,
    };
    
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: `Are you sure you paid ${bill.name}?`,
        description: `Extend the deadline by ${frequency} days.`,
        type: 'submit'
      }
    });
    this.subscription.add(dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.changeDetectorRef.detectChanges();
        this.dataService.update(updatedBill);
      
        this.changeDetectorRef.markForCheck();
      }
    }))
  }

  getMaxValue(frequency: string): number {
    return this.dataService.getPaymentIntervalDays(frequency);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
