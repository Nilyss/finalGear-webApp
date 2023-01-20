import { Component } from '@angular/core'

@Component({
  selector: 'app-landing',
  template: `
    <section class="section">
      <div class="landing" data-aos="flip-up">
        <!-- ********** LEFT WRAPPER ********** -->
        <div class="leftWrapper" data-aos="fade-up-right">
          <div class="landing__titleWrapper">
            <h2 class="landing__titleWrapper__title">
              Rejoignez-moi pour explorer les univers de Final Fantasy et autres
              licences emblématiques à mes côtés !
            </h2>
          </div>
          <div class="landing__finalGearOverviewWrapper">
            <p class="landing__finalGearOverviewWrapper__overview">
              Je suis un YouTuber passionné de jeux vidéo, en particulier de la
              franchise Final Fantasy. J'apprécie également les licences telles
              que Tales of, Metal Gear, Zelda, Resident Evil, Kingdom Hearts et
              bien d'autres...<br />
              <br />
              En plus de créer des vidéos sur ces titres, je réalise également
              des sessions de stream sur Twitch. J'aime partager mon expérience
              de jeu en direct avec mes abonnés et échanger avec eux sur nos
              passions communes.<br />
              <br />
              L'une de mes spécialités est de créer des vidéos de théorie sur
              Final Fantasy, mais également sur d'autres licences. J'aime
              explorer les intrigues et les personnages de ces jeux, et partager
              mes découvertes avec mes abonnés.<br />
              <br />
              Je suis également un grand adepte des vidéos de réaction. Lorsque
              de nouveaux trailers ou annonces de jeux sortent, les décryptes,
              et prends plaisir à réagir en direct à ces nouveautés et à
              discuter avec mes abonnés de leurs impressions.<br />
              <br />
              Si vous aimez les jeux vidéo, les théories sur les licences les
              plus populaires et les échanges passionnés sur ces sujets, alors
              vous êtes au bon endroit ! N'hésitez pas à explorer mon site web,
              à vous abonner à ma chaîne YouTube et autres réseaux sociaux voir
              à participer aux échanges sur notre serveur discord tout comme sur
              la chaine Twitch pour ne rien manquer de mon contenu.
            </p>
          </div>
        </div>

        <!-- ********** RIGHT WRAPPER ********** -->
        <div class="rightWrapper" data-aos="fade-down-left">
          <figure class="rightWrapper__imageWrapper">
            <img
              [src]="backgroundUrl"
              alt="multiple licence character"
              class="rightWrapper__imageWrapper__image"
            />
          </figure>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['/landing.component.scss'],
})
export class LandingComponent {
  backgroundUrl = 'https://i.imgur.com/SNL0oAb.jpg'
}
