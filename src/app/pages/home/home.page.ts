import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ShowAPIQueryResponse, ShowAPIResponse } from 'src/app/interfaces/movieApiResponse';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public movies: ShowAPIResponse[];
  public query: FormControl;
  private lastQueryValue = '';
  public error: any;

  constructor(private router: Router, public modalController: ModalController, private authService: AuthService, private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
    this.initForm();
  }

  // Methods
  async presentModal(show: ShowAPIResponse) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        'show': show
      }
    });
    return await modal.present();
  }

  onLogout() {
    this.authService.onLogout();
    this.router.navigateByUrl('/login');
  }

  onSearch() {
    if ((this.query.value === '' && this.lastQueryValue != '')) {
      this.lastQueryValue = '';
      return this.getMovies();
    }
    if (this.query.value.length < 3) return;
    this.lastQueryValue = this.query.value;
    this.movieService.getMoviesByQuery(this.query.value).subscribe((data: ShowAPIQueryResponse[]) => {
      this.movies = []
      data.forEach((element) => {
        this.movies.push(element.show);
      });
    });
  }

  getMovies() {
    this.movies = [];
    this.movieService.getAllMovies().subscribe((data) => {
      this.movies = data;
    }, (error) => {
      console.log(error);
      this.error = error;
    });
  }

  // Helpers
  initForm() {
    this.query = new FormControl('');
  }

  goToProfilePage() {
    this.router.navigateByUrl('/profile');
  }
}
