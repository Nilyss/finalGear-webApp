import { Component, HostListener } from '@angular/core'

@Component({
  selector: 'app-back-to-top',
  template: `
    <div class="back-to-topWrapper">
      <div
        routerLink=""
        fragment="accueil"
        title="Haut de page"
        (click)="goToTop()"
        class="backToTopWrapper__backToTop material-symbols-outlined"
        [ngClass]="{ showBackToTop: windowScrolled }"
      >
        assistant_navigation
      </div>
    </div>
  `,
  styles: [
    '.backToTopWrapper__backToTop { position: fixed; top: 90%; right: 1%; font-size: 50px; color: #6dbbc7; cursor: pointer; opacity: 0; transition: all 200ms ease-in-out}',
    '.showBackToTop {opacity: 1; transition: all 200ms ease-in-out}',
  ],
})
export class BackToTopComponent {
  windowScrolled: boolean
  topPositionToStartShowing: number = 100

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    if (scrollPosition >= this.topPositionToStartShowing) {
      this.windowScrolled = true
    } else {
      this.windowScrolled = false
    }
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
}
