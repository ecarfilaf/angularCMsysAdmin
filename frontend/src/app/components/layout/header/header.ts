import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { MatTreeModule } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
	selector: 'app-header',
	imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule, RouterLink, RouterLinkActive, RouterOutlet, MatSidenavModule, Footer, MatTreeModule, MatMenuModule],
	templateUrl: './header.html',
	styleUrl: './header.scss',
})
export class Header {
	signin() {
		console.log("Sign In clicked");
	}
	dataSource = EXAMPLE_DATA;

	childrenAccessor = (node: FoodNode) => node.children ?? [];

	hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}


const EXAMPLE_DATA: FoodNode[] = [
	{
		name: 'Admin',
		children: [{ name: 'Clients' }, { name: 'Products' }, { name: 'Orders' }],
	},
	{
		name: 'Support',
		children: [
			{
				name: 'Admin',
				children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
			},
			{
				name: 'Parameters',
				children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
			},
		],
	},
];