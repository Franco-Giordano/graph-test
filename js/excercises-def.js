
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

// missing: "2.32", "2.33", "2.36"
// indice del excercise coincide con su selectOption.value
// new Excercise (strdisplayText, stringXfrom, stringXto, stringfX, VerticalDomainfx, stringY, myFY, strYfrom, strYto, funcSolveXs, enunciado)
var ejerciciosResueltos = [
        new Excercise("Adicional #1",
            "-1", "1",
            "1/2", [-0.5,1],
            "x^2", "nthRoot(x,2)","0", "1",
            (givenY) => {return [-Math.sqrt(givenY), Math.sqrt(givenY)];},
            `Sea X una variable aleatoria continua con distribucion uniforme en (-1,1). Obtenga la funcion de distribucion de \\(Y=X^2\\)`),
        new Excercise("2.29",
            "-2", "4",
            "1/6", [-0.2, 1/3],
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
            `Sea X una variable aleatoria continua con distribucion uniforme en (-2,4). Obtenga la funcion de densidad de \\(Y=X^2\\)`),

        new Excercise("2.31", "4", "8", 
            "1/4", [-0.2, 0.4],
            "(x-6)^2 + 6", "nthRoot(x-6, 2)/2",
            "6", "10",
            (givenY) => {return [6-Math.sqrt(givenY-6), 6+Math.sqrt(givenY-6)]},
            `La cantidad a producir es una variable aleatoria X con distribucion uniforme en (4,8), mientras que el costo sera de \\(Y=(X-6)^2+6\\). Calcule \\(P(Y>9)\\).<br>
            <br>
            Notas:<br>
            &emsp;- \\(P(Y>9) = 1 - P(Y\\leq 9) = 1 - F_Y(9)\\)<br>
            &emsp;- La relacion entre X e Y es equivalente a la mencionada por el ejercicio original: \\(Y=(X-6)^2+6 \\equiv (X-4)(X-8) + 10\\)`
            ),

        new Excercise("2.32 - A", "0", "1",
            "6 * x * (1-x)", [-0.1, 2],
            "4/3 * PI * x^3", "-2 * (3x/(4*PI)) + 3 * nthRoot(3x/(4*PI), 3/2)",
            "0", "4.188790205",
            (givenY) => {return [0, Math.pow(3*givenY/(4*3.1415926535), 1/3)]},
            `El radio X de una esfera en cm se considera una variable aleatoria continua. 
            Supongamos que X tiene una funcion de densidad de probabilidad \\(f_X(x) = 6x(1-x)\\mathbb{1}_{(0,1)(x)}\\) <br>
            <br>
            Item A) Obtenga la funcion de densidad de probabilidad del volumen Y.<br>
            <br>
            Nota:<br>
            &emsp;- Volumen de una esfera: \\(Y = \\frac{4\\pi}{3} \\cdot X^3\\)`
            )
]

/* new Excercise (strdisplayText, stringXfrom, stringXto,
        stringfX, VerticalDomainfx,
        stringY, myFY,
        strYfrom, strYto,
        funcSolveXs,
        enunciado)

*/
