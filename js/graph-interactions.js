"use strict";



// resizer related code

// if < 770 -> GRAFICOS GRANDES

var MOBILE_MODE = window.innerWidth < 770 ? true : false;

function vwToPixel(value) {
    return ((window.innerWidth * value) / 100);
}

function vhToPixel(value) {
    return ((window.innerHeight * value) / 100);
}

var my_height, my_width, result_width;

my_width = vwToPixel(MOBILE_MODE ? 80 : 36);
my_height = vhToPixel(MOBILE_MODE ? 60 : 37);
result_width = vwToPixel(MOBILE_MODE ? 80 : 22.5);

// redraw for resize event
window.addEventListener('resize', () => {

    MOBILE_MODE = window.innerWidth < 770 ? true : false;

    my_width = vwToPixel(MOBILE_MODE ? 80 : 36);
    my_height = vhToPixel(MOBILE_MODE ? 60 : 37);
    result_width = vwToPixel(MOBILE_MODE ? 80 : 22.5);

    drawAllGraphs(getCurrentExcercise());
    
});


// graph related code

function Excercise (strdisplayText, stringXfrom, stringXto, stringfX, domainfx, stringY, myFY, strYfrom, strYto, funcSolveXs, enunciado) {
        this.displayText = strdisplayText;
        this.Xfrom = Number(stringXfrom);
        this.Xto = Number(stringXto);
        this.fX = stringfX;
        this.domainfx = domainfx;
        this.Y = stringY;

        this.Yfrom = Number(strYfrom);
        this.Yto = Number(strYto);

        if (typeof myFY === "string") {
            this.FY = [
                        {
                            fn: myFY,
                            attr: {
                                "stroke-width": 5
                            },
                            range: [this.Yfrom, this.Yto]
                        }
                    ];
        } else { // FY ES UNA FUNCION PARTIDA!
            this.FY = myFY;
        }
        

        this.findAllXs = funcSolveXs;
        this.enunciado = enunciado;
}

// indice del excercise coincide con su selectOption.value
var ejerciciosResueltos = [
        new Excercise("Adicional #1", "-1", "1", "1/2", [-0.5,1],"x^2", "nthRoot(x,2)","0", "1", (givenY) => {return [-Math.sqrt(givenY), Math.sqrt(givenY)];}, `Sea X una variable aleatoria continua con distribucion uniforme en (-1,1). Obtenga la funcion de distribucion de \\(Y=X^2\\)`),
        new Excercise("2.29",
            "-2", "4",
            "1/6", [-0.5, 1/3],
            "x^2",
            [{  fn: "nthRoot(x,2)/3",
                attr: {
                "stroke-width": 5
                },
                range: [0, 4], color: "steelblue"
            },
            {  fn: "(nthRoot(x,2)+2)/6",
                attr: {
                "stroke-width": 5
                },
                range: [4, 16], color: "steelblue"
            }],
            "0",
            "16",
            (givenY) => {return givenY < 4 ? [-Math.sqrt(givenY), Math.sqrt(givenY)]
                                            : [-2, Math.sqrt(givenY)];},
            `Sea X una variable aleatoria continua con distribucion uniforme en (-2,4). Obtenga la funcion de densidad de \\(Y=X^2\\)`)
]

var excerciseSelectElement = document.querySelector("#selected-exc");

// crear opciones en select item para el usuario
ejerciciosResueltos.forEach((exc, i) => {
    let selectOption = document.createElement('ion-select-option');
    selectOption.value = i;
    selectOption.textContent = exc.displayText;

    excerciseSelectElement.appendChild(selectOption);
});


// agregar placeholders
["2.31", "2.32", "2.33", "2.36"].forEach((desc, i) => {
    let selectOption = document.createElement('ion-select-option');
    selectOption.value = i + ejerciciosResueltos.length;
    selectOption.textContent = desc;
    selectOption.disabled = true;

    excerciseSelectElement.appendChild(selectOption);
});

excerciseSelectElement.value = 0;

function getCurrentExcercise() {
    return ejerciciosResueltos[excerciseSelectElement.value];
}


excerciseSelectElement.addEventListener('ionChange', () => {
    
    let selectedExc = getCurrentExcercise();

    document.querySelector('#X-from').innerHTML = selectedExc.Xfrom;
    document.querySelector('#X-to').innerHTML = selectedExc.Xto;
    document.querySelector('#fX-x').innerHTML = selectedExc.fX;
    document.querySelector('#Y-X').innerHTML = selectedExc.Y;

    drawAllGraphs(selectedExc);

});


// first plot
drawAllGraphs(ejerciciosResueltos[0]);

document.querySelector("#eval-FY").addEventListener('ionChange', () => {
    updateIntegratedArea(document.querySelector("#eval-FY").value);
})


var instancefy, instancefx, instanceY;

function drawAllGraphs(excercise) {

    var slider = document.querySelector("#eval-FY");

    slider.min = excercise.Yfrom;
    slider.max = excercise.Yto;

    var inputXfrom = Number(excercise.Xfrom);
    var inputXto = Number(excercise.Xto);

    var inputfx = excercise.fX;
    var inputY = excercise.Y;

    var funcFY = excercise.FY.concat([{fn: "0", color: "steelblue", range: [-1000, excercise.Yfrom], skipTip:true}, {fn: "1", color: "steelblue", range: [excercise.Yto, 1000], skipTip:true}]);

    instanceY = functionPlot({
        title: "Y(X)",
        target: '#Y-X-graph',
        data: [
            {
                fn: inputY,
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
            domain: [excercise.Yfrom - 1, excercise.Yto + 1]
        },
        width: my_width,
        height: my_height
    });

    instancefx = functionPlot({
        title: "Funcion de densidad de X",
        target: '#fx-X-graph',
        data: [
            {
                fn: inputfx,
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
            domain: excercise.domainfx
        },
        width: my_width,
        height: my_height
    });

    instancefy = functionPlot({
        target: '#Fy-Y-graph',
        tip: {
            xLine: true,    // dashed line parallel to y = 0
            renderer: function (x, y, index) {
              return '      y = ' + x;
            }
        },
        data: funcFY,
        grid: true,
        xAxis: {
            label: 'y',
            domain: [excercise.Yfrom - 0.5, excercise.Yto + 0.5]
        },
        yAxis: {
            label: 'FY(y)',
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

    instancefy.on('tip:update', updateIntegratedArea);

}

function updateIntegratedArea(x,y,index) {

    var currentExc = getCurrentExcercise();

    let givenY = x;
    let allX = currentExc.findAllXs(givenY);

    let myAnnotationsX = [];

    let myX;
    for (myX of allX) {
        myAnnotationsX.push({x: myX});
    };

    let myAnnotations = myAnnotationsX.concat([{y: givenY}]);

    instanceY = functionPlot({
        title: "Y(X)",
        target: '#Y-X-graph',
        data: [
            {
                fn: currentExc.Y,
                attr: {
                    "stroke-width": 5
                },
                color:"red",
                range: allX
            },
            {
                fn: currentExc.Y,
                attr: {
                    "stroke-width": 5,
                },
                color: "steelblue",
                range: [currentExc.Xfrom, allX[0]]
            },
            {
                fn: currentExc.Y,
                attr: {
                    "stroke-width": 5,
                },
                color: "steelblue",
                range: [allX[1], currentExc.Xto]
            }
        ],
        annotations: myAnnotations,
        grid: true,
        xAxis: {
            label: 'x',
            domain:  [currentExc.Xfrom - 1, currentExc.Xto + 1]
        },
        yAxis: {
            label: 'y(x)',
            domain:  [currentExc.Yfrom -1, currentExc.Yto + 1]
        },
        width: my_width,
        height: my_height
    });

    instancefx = functionPlot({
        title: "Funcion de densidad de X",
        target: '#fx-X-graph',
        data: [
            {
                fn: currentExc.fX,
                attr: {
                    "stroke-width": 5
                },
                range: [currentExc.Xfrom, currentExc.Xto]
            },
            {
                fn: currentExc.fX,
                color:"red",
                closed:true,
                range: allX
            }
        ],
        annotations: myAnnotationsX,
        grid: true,
        xAxis: {
            label: 'x',
            domain:  [currentExc.Xfrom - 1, currentExc.Xto + 1]
        },
        yAxis: {
            label: 'fX(x)',
            domain:  currentExc.domainfx
        },
        width: my_width,
        height: my_height
    });

    instanceY.addLink(instancefx);
    instancefx.addLink(instanceY);

}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

var playing = false;

const play = document.querySelector('#play');
play.addEventListener('click', handlePlayClick);

async function handlePlayClick() {

    if (playing)
        return;

    var slider = document.querySelector("#eval-FY");

    var currentExc = getCurrentExcercise();

    playing = true;
    play.disabled = true;
    let stepSize = (currentExc.Yto - currentExc.Yfrom) / 118;
    for (let i = currentExc.Yfrom; i <= (currentExc.Yto + 0.01); i += stepSize) {

        instancefy = functionPlot({
            target: '#Fy-Y-graph',
            tip: {
                xLine: true,    // dashed line parallel to y = 0
                renderer: function (x, y, index) {
                  return 'y = ' + y;
                }
            },
            data: currentExc.FY,
            annotations: [{x: i}],
            grid: true,
            xAxis: {
                label: 'y',
                domain: [currentExc.Yfrom - 0.5, currentExc.Yto + 0.5]
            },
            yAxis: {
                label: 'FY(y)',
                domain: [
                    -1 / 2,
                    1.5
                ]
            },
            width:result_width,
            height: my_height
        });

        slider.value = i;

        //instancefy.on('tip:update', updateIntegratedArea);

        await sleep(15);
    }

    // reset graphs
    drawAllGraphs(currentExc);

    play.disabled=false;
    playing=false;

}


// checkbox listener

var checkboxElement = document.querySelector("#show-solution");

checkboxElement.addEventListener('ionChange', () => {
    document.querySelector("#Fy-Y-graph").hidden = !document.querySelector("#Fy-Y-graph").hidden;
    document.querySelector("#eval-FY-item").hidden = !document.querySelector("#eval-FY-item").hidden;
});