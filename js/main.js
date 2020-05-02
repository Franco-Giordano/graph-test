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
                    window.open("mailto:fgiordano@fi.uba.ar?subject=Reporte%20de%20Error%20-%20Graficador",
                    '_blank');
                }
            }, {
                text: 'Nuevo Issue en GitHub',
                handler: () => {
                    window.open('https://github.com/Franco-Giordano/proba-graph/issues/new', '_blank');
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
            <ion-button slot="end" onclick="dismissModal()" fill="clear">Cerrar ayuda</ion-button>
            <ion-button slot="end" onclick="siguiente()" fill="clear">Ver mas</ion-button>
        </ion-slide>

        <ion-slide>
          <img src="./media/choose-excercise.gif"/>
          <h2>Trabaja con ejercicios resueltos</h2>
          <p>Primero elegi el ejercicio a trabajar en la seccion Configuracion, o mira el enunciado a trabajar.</p>
          <ion-button slot="end" onclick="anterior()" fill="clear">Anterior</ion-button>
          <ion-button slot="end" onclick="siguiente()" fill="clear">Siguiente</ion-button>
        </ion-slide>

        <ion-slide>
          <img src="./media/animate-area.gif" style="max-height: 70%;max-width: 80%; margin: 10px 0 10px;"/>
          <h2>Visualiza el area a integrar</h2>
          <p>Desplazate sobre los distintos valores de Y y su funcion de distribucion. El area en rojo indicara, para ese valor de Y, que area integrar para obtener \\(F_Y(y)\\)</p>
          <ion-button slot="end" onclick="anterior()" fill="clear">Anterior</ion-button>
          <ion-button slot="end" onclick="siguiente()" fill="clear">Siguiente</ion-button> <br><br><br><br>
        </ion-slide>

        <ion-slide>
          <img src="./media/slide-4.png"/>
          <h2>Comienza a graficar!</h2>
          <p>Si queres ocultar el grafico de \\(F_Y(y)\\), simplemente desactiva la opcion 'Mostrar solucion'.</p>
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
      padding-bottom: 50px;
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

    .swiper-slide ion-button {
      margin: 0px 0 500px;
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
MathJax.typeset();

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

function siguiente() {
    document.querySelector("ion-slides").slideNext();
}

function anterior() {
    document.querySelector("ion-slides").slidePrev();
}

function dismissModal() {
  if (currentModal) {
    currentModal.dismiss().then(() => { currentModal = null; });
  }
}