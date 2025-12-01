import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatAnchor } from "@angular/material/button";

@Component({
	selector: 'app-msgpanel',
	imports: [MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatAnchor],
	templateUrl: './msgpanel.html',
	styleUrl: './msgpanel.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Msgpanel implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<Msgpanel>,
		@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
	) { }
	ngOnInit(): void { }
}
