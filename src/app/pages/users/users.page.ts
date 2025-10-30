import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  // 👇 Aqui é o ponto crítico: RouterModule precisa estar incluído
  imports: [CommonModule, IonicModule, RouterModule],
})
export class UsersPage implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any>('https://dummyjson.com/users').subscribe({
      next: (res) => {
        this.users = res.users.map((u: any) => ({
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          birthDate: this.formatDate(u.birthDate),
          image: u.image,
        }));
      },
      error: (err) => console.error('Erro ao carregar usuários', err),
    });
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
