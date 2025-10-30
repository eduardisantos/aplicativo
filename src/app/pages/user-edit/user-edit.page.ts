import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class UserEditPage implements OnInit {
  form!: FormGroup;
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
  }

  loadUser() {
    this.http.get<any>(`https://dummyjson.com/users/${this.userId}`).subscribe({
      next: (user) => {
        this.form = this.fb.group({
          id: [user.id],
          firstName: [user.firstName],
          lastName: [user.lastName],
          email: [user.email],
          username: [user.username],
          password: [user.password],
          birthDate: [user.birthDate],
          bloodGroup: [user.bloodGroup],
          height: [user.height],
          weight: [user.weight],
        });
      },
      error: (err) => console.error('Erro ao carregar usuário', err),
    });
  }

  async save() {
    const data = this.form.value;
    this.http.put(`https://dummyjson.com/users/${this.userId}`, data).subscribe({
      next: async (res) => {
        const toast = await this.toastCtrl.create({
          message: 'Usuário atualizado com sucesso!',
          duration: 2000,
          color: 'success',
        });
        toast.present();
        this.router.navigateByUrl('/users');
      },
      error: async (err) => {
        const toast = await this.toastCtrl.create({
          message: 'Erro ao salvar usuário.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      },
    });
  }
}
