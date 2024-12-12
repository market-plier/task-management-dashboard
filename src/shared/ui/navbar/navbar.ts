import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.html',
    styleUrls: ['./navbar.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        RouterLink,
        RouterLinkActive,
        MatIcon,
        MatToolbar,
    ],
})
export class NavBar {}
