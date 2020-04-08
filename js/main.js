const limpiarBtn = document.querySelector('#limpiar');

limpiarBtn.addEventListener('click', () => {
    functInput.value = '';
})

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

const ayuda = document.querySelector('#help');
ayuda.addEventListener('click', handleHelpClick);

async function handleHelpClick() {
    const alert = await alertController.create({
        header: 'Ayuda',
        message: 'Grafica la funcion de distribucion de la variable aleatoria Y, que depende de X.' +
                ' Especifica el dominio (soporte) de la variable X, su funcion de densidad y la f' +
                'uncion que relaciona X e Y como Y(X)',
        buttons: [
            {
                text: 'Cerrar',
                role: 'cancel'
            }
        ]
    });

    await alert.present();
}

const ejemplo = document.querySelector('#next');
ejemplo.addEventListener('click', handleButtonClick);

async function handleButtonClick() {
    const toast = await toastController.create({color: 'dark', duration: 2000, message: 'Aun no disponible.', showCloseButton: true});

    await toast.present();
}

// if < 770 -> GRAFICOS GRANDES

var MOBILE_MODE = window.innerWidth < 770 ? true : false;

function vwToPixel(value) {
    return ((window.innerWidth * value) / 100);
}

function vhToPixel(value) {
    return ((window.innerHeight * value) / 100);
}

var my_height, my_height, result_width;

my_width = vwToPixel(MOBILE_MODE ? 90 : 39);
my_height = vhToPixel(MOBILE_MODE ? 60 : 37);
result_width = vwToPixel(MOBILE_MODE ? 90 : 22.5);


const inputY = document.querySelector('#Y-X');
const inputfx = document.querySelector('#fx-X');
const inputXfrom = document.querySelector('#X-from');
const inputXto = document.querySelector('#X-to');

// first plot
drawAllGraphs('x^2', '1/2', 'nthRoot(x, 1/2)', -1, 1);


// redraw for resize event
window.addEventListener('resize', () => {

    MOBILE_MODE = window.innerWidth < 770 ? true : false;

    my_width = vwToPixel(MOBILE_MODE ? 90 : 39.0625);
    my_height = vhToPixel(MOBILE_MODE ? 60 : 38.0849);
    result_width = vwToPixel(MOBILE_MODE ? 90 : 22.5);

    drawAllGraphs('x^2', '1/2', 'nthRoot(x, 1/2)', -1, 1);
    
});


// set all event listeners (update graphs if any input changes)
[inputY, inputfx, inputXfrom, inputXto].forEach(function (element) {
    element
        .addEventListener('ionChange', function () {
            drawAllGraphs(inputY.value, inputfx.value, inputfx.value, parseFloat(inputXfrom.value), parseFloat(inputXto.value));
        });
});

// finds all x roots for a given function as Y(X) and Y value
 function findAllXs(funcY, givenY) {
     
    //hard coded for Y = X^2
    return [-Math.sqrt(givenY), Math.sqrt(givenY)];

 }

function drawAllGraphs(funcY, funcfX, funcfY, inputXfrom, inputXto) {
    let instanceY = functionPlot({
        target: '#Y-X-graph',
        data: [
            {
                fn: funcY,
                attr: {
                    "stroke-width": 5
                },
                range: [inputXfrom, inputXto]
            }
        ],
        grid: true,
        xAxis: {
            label: 'x',
            domain: [
                inputXfrom - 1,
                inputXto + 1
            ]
        },
        yAxis: {
            label: 'y(x)',
            domain: [-0.5, 1.5]
        },
        width: my_width,
        height: my_height
    });

    let instancefx = functionPlot({
        target: '#fx-X-graph',
        data: [
            {
                fn: funcfX,
                attr: {
                    "stroke-width": 5
                },
                range: [inputXfrom, inputXto]
            }
        ],
        grid: true,
        xAxis: {
            label: 'x',
            domain: [
                inputXfrom - 1,
                inputXto + 1
            ]
        },
        yAxis: {
            label: 'fX(x)',
            domain: [-0.5, 1.5]
        },
        width: my_width,
        height: my_height
    });

    let instancefy = functionPlot({
        target: '#Fy-Y-graph',
        data: [
            {
                fn: funcfY,
                attr: {
                    "stroke-width": 5
                },
                range: [0, 1]
            }
        ],
        grid: true,
        xAxis: {
            label: 'y',
            domain: [
                -1 / 2,
                1.5
            ]
        },
        yAxis: {
            label: 'fY(y)',
            domain: [
                -1 / 2,
                1.5
            ]
        },
        width:result_width,
        height: my_height
    });

    instanceY.addLink(instancefx);
    instancefx.addLink(instanceY);

    instancefy.on('tip:update', (x,y,index) =>{

        let givenY = x;
        let allX = findAllXs(funcY,givenY);

        let myAnnotationsX = [];

        let myX;
        for (myX of allX) {
            myAnnotationsX.push({x: myX});
        };

        let myAnnotations = myAnnotationsX.concat([{y: givenY}]);

        instanceY = functionPlot({
            target: '#Y-X-graph',
            data: [
                {
                    fn: funcY,
                    attr: {
                        "stroke-width": 5
                    },
                    range: [inputXfrom, inputXto]
                }
            ],
            annotations: myAnnotations,
            grid: true,
            xAxis: {
                label: 'x',
                domain: [
                    inputXfrom - 1,
                    inputXto + 1
                ]
            },
            yAxis: {
                label: 'y(x)',
                domain: [-0.5, 1.5]
            },
            width: my_width,
            height: my_height
        });

        instancefx = functionPlot({
            target: '#fx-X-graph',
            data: [
                {
                    fn: funcfX,
                    attr: {
                        "stroke-width": 5
                    },
                    range: [inputXfrom, inputXto]
                },
                {
                    fn: funcfX,
                    color:"steelblue",
                    closed:true,
                    range: allX
                }
            ],
            annotations: myAnnotationsX,
            grid: true,
            xAxis: {
                label: 'x',
                domain: [
                    inputXfrom - 1,
                    inputXto + 1
                ]
            },
            yAxis: {
                label: 'fX(x)',
                domain: [-0.5, 1.5]
            },
            width: my_width,
            height: my_height
        });

        instanceY.addLink(instancefx);
        instancefx.addLink(instanceY);

    });

}

// function myPlotFunct(functY, xPos) {   let plot = funct;   if (funct == '')
// plot = '0';   plotInstance = functionPlot({     target: '#Y-X-graph',
// data: [{       fn: plot,       attr: { "stroke-width": 3 },
// closed:true,       range: [-9999, xPos],       skipTip: true     }, {
// fn: plot,       attr: { "stroke-width": 1 },     }],     grid:true,
// width: my_width,     height: my_height   });   let dist = functionPlot({
// target: '#fx-X-graph',     data: [{       fn: plot,       attr: {
// "stroke-width": 1 },     }],     grid:true,     width: my_width,     height:
// my_height   })   plotInstance.addLink(dist);   plotInstance.on('mousemove',
// (coords) => {     myPlotFunct(functInput.value,coords.x);   }); }; var
// plotInstance = myPlotFunct('x^2', 0); functionPlot({   target: '#fy-Y-graph',
// data: [{     fn: 'log(x)',     attr: { "stroke-width": 1 },   }],
// grid:true,   width: 425,   height: 300 });
// functInput.addEventListener('ionChange', () => {
// myPlotFunct(functInput.value, 0) });