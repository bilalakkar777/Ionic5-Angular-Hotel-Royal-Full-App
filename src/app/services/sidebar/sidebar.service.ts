import { Injectable } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root"
})
export class SidebarService {
	private isOpened: boolean = false;

	constructor(private menu: MenuController, private router: Router) {}

	/**
	 * Toggles the sidebar menu
	 */
	toggleMenu(): void {
		this.menu.toggle();
	}

	/**
	 * Closes the sidebar menu
	 */
	closeMenu(): void {
		this.menu.close();
	}

	/**
	 * Checks if the sidebar menu is opened or not
	 */
	isMenuOpened(): boolean {
		return this.isOpened;
	}
}
