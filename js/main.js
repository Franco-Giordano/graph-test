const functInput = document.querySelector('#funct');
const limpiarBtn = document.querySelector('#limpiar');

limpiarBtn.addEventListener('click', () => {
  functInput.value = '';
})

const button = document.querySelector('#login');
button.addEventListener('click', handleButtonClick);

async function handleButtonClick() {
  const toast = await toastController.create({
    color: 'dark',
    duration: 2000,
    message: 'Aun no disponible.',
    showCloseButton: true
  });

  await toast.present();
}

const my_width = 800;
const my_height = 400;

function myPlotFunct(funct, xPos) {

  let plot = funct;

  if (funct == '')
    plot = '0';

  plotInstance = functionPlot({
    target: '#Y-X',
    data: [{
      fn: plot,
      attr: { "stroke-width": 3 },
      closed:true,
      range: [-9999, xPos],
      skipTip: true
    }, {
      fn: plot,
      attr: { "stroke-width": 1 },
    }],
    grid:true,
    width: my_width,
    height: my_height
  });

  let dist = functionPlot({
    target: '#fx-X',
    data: [{
      fn: plot,
      attr: { "stroke-width": 1 },
    }],
    grid:true,
    width: my_width,
    height: my_height
  })

  plotInstance.addLink(dist);

  plotInstance.on('mousemove', (coords) => {
    myPlotFunct(functInput.value,coords.x);
  });




};

var plotInstance = myPlotFunct('x^2', 0);


functInput.addEventListener('ionChange', () => {
  myPlotFunct(functInput.value, 0)
});
