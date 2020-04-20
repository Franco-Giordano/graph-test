"use strict";


const bug = document.querySelector('#reportar-bug');
bug.addEventListener('click', handleBugClick);

async function handleBugClick() {
    const alert = await alertController.create({
        header: 'Reportar Error',
        message: 'Envia un mail a <strong>fgiordano@fi.uba.ar</strong> o crea un <strong>nuevo iss' +
                'ue</strong> en el repositorio de GitHub.',
        buttons: [
            {
                text: 'Enviar mail',
                handler: () => {
                    window.open("mailto:fgiordano@fi.uba.ar?subject=Reporte%20de%20Error%20-%20Graficador&body=En" +
                            "tradas%20ingresadas%3A%0D%0A-%20Y(X)%3A%20%0D%0A-%20fx(X)%3A%20%0D%0A%0D%0APasos" +
                            "%20para%20reproducir%3A%0D%0A%0D%0A%0D%0AComportamiento%20esperado%3A%0D%0A%0D%0" +
                            "A%0D%0AComportamiento%20erroneo%3A%0D%0A%0D%0A%0D%0ANavegador(Chrome%2FFirefox)%" +
                            "20y%20Plataforma(iOS%2FAndroid%2FWindows%2FLinux)%3A%0D%0A",
                    '_blank');
                }
            }, {
                text: 'Nuevo Issue en GitHub',
                handler: () => {
                    window.open('https://github.com/Franco-Giordano/graph-test/issues/new', '_blank');
                }
            }, {
                text: 'Cerrar',
                role: 'cancel'
            }
        ]
    });

    await alert.present();
}

const verEnunciado = document.querySelector('#ver-enunciado-button');
verEnunciado.addEventListener('click', createEnunciadoModal);


const ayuda = document.querySelector('#help');
ayuda.addEventListener('click', createModal);

// async function handleHelpClick() {
//     const alert = await alertController.create({
//         header: 'Ayuda',
//         message: 'Grafica la <strong>funcion de distribucion de la variable aleatoria Y</strong>, que depende de X.' +
//                 ' Trabaja con un ejemplo ya computado, detallado en la seccion Configuracion.<br>' +
//                 ' Presiona el boton de reproducir mas abajo para ver, <strong>para cada valor de P(Y<=y), la region a integrar en X.</strong>',
//         buttons: [
//             {
//                 text: 'Cerrar',
//                 role: 'cancel'
//             }
//         ]
//     });

//     await alert.present();
// }
let currentModal = null;


customElements.define('modal-page', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <ion-content fullscreen class="ion-padding">
      <ion-slides pager=true>

        <ion-slide>
            <img src="./media/equations.png"/>
            <h2>Graficador de Funciones de VAs</h2>
            <p>Esta aplicacion interactiva te permite visualizar la funcion de distribucion de una variable aleatoria expresada en funcion de otra.</p>
        </ion-slide>

        <ion-slide>
          <img src="./media/slide-2.png"/>
          <h2>Mira punto a punto el area a integrar</h2>
          <p>Grafica la <strong>funcion de distribucion de la variable aleatoria Y</strong>, que depende de X. Trabaja con un ejemplo ya computado, detallado en la seccion Configuracion.</p>
        </ion-slide>

        <ion-slide>
          <img src="./media/slide-4.png"/>
          <h2>Comienza a graficar!</h2>
          <p>Presiona el boton de reproducir mas abajo para ver, <strong>para cada valor de P(Y<=y), la region a integrar en X.</strong></p>
          <ion-button slot="end" onclick="dismissModal()" fill="clear">Cerrar ayuda</ion-button>

        </ion-slide>

      </ion-slides>
    </ion-content>
      <style>
    ion-slides {
      height: 100%;
    }

    .swiper-slide {
      display: block;
    }

    .swiper-slide h2 {
      margin-top: 1rem;
    }

    .swiper-slide img {
      max-height: 50%;
      max-width: 80%;
      margin: 60px 0 40px;
      pointer-events: none;
    }

    b {
      font-weight: 500;
    }

    p {
      padding: 0 40px;
      font-size: 14px;
      line-height: 1.5;
      color: var(--ion-color-step-600, #60646b);
    }

    p b {
      color: var(--ion-text-color, #000000);
    }
  </style>
`;
  }
});

customElements.define('modal-enunciado', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<ion-header>
  <ion-toolbar>
    <ion-title>Enunciado ` + getCurrentExcercise().displayText + `</ion-title>
    <ion-buttons slot="primary">
      <ion-button onClick="dismissModal()">
        <ion-icon slot="icon-only" name="close"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content class="ion-padding">` +
  getCurrentExcercise().enunciado  +
`</ion-content>
`;
MathJax.typeset();
  }
});



async function createEnunciadoModal() {
  const modal = await modalController.create({
    component: 'modal-enunciado',
  });

  await modal.present();
  currentModal = modal;
}


async function createModal() {
  const modal = await modalController.create({
    component: 'modal-page',
  });

  await modal.present();
  currentModal = modal;
}

function dismissModal() {
  if (currentModal) {
    currentModal.dismiss().then(() => { currentModal = null; });
  }
}