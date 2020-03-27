const functInput = document.querySelector('#funct');

const my_width = 800;
const my_height = 400;

function myPlotFunct(funct, xPos) {

  let plot = funct;

  if (funct == '')
    plot = '0';

  plotInstance = functionPlot({
    target: '#graph',
    data: [{
      fn: plot,
      attr: { "stroke-width": 3 },
      closed:true,
      range: [-9999, xPos]
    }, {
      fn: plot,
      attr: { "stroke-width": 1 },
    }],
    grid:true,
    width: my_width,
    height: my_height
  })

  plotInstance.on('mousemove', (coords) => {
    console.log(xPos)
    myPlotFunct(functInput.value,coords.x);
  });

};

var plotInstance = myPlotFunct('x^2', 0);


functInput.addEventListener('ionChange', ()=> {
  myPlotFunct(functInput.value, 0);
});
