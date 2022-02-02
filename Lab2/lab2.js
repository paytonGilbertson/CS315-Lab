// This variable will store the WebGL rendering context
var gl;
var myFirstVao;
var uColor;

var leftLens = circle(50, 0.3, -0.45, 0.3, 0.0, 0.4, -0.45, 0.4, 0.0);
var rightLens = circle(50, 0.3, 0.45, 0.3, 0.0, 0.4, 0.45, 0.4, 0.0);
var leftFill = circle(50, 0.35, -0.45, 0.35, 0.0, 0.4, -0.45, 0.4, 0.0);
var rightFill = circle(50, 0.35, 0.45, 0.35, 0.0, 0.4, 0.45, 0.4, 0.0);


var bgTeal = vec4(0.4941176471, 0.6117647059, 0.6, 1.0);
var bgWhite = vec4(0.7647058824, 0.7137254902, 0.6862745098, 1);

var glassesFrame = vec4(0.98, 0.5, 0.55, 0.9);

var wordCLR = vec4(0.6, 0, 0.4, 1);

var points =
    [

    ];

var colors =
    [

    ];



var bgStripeCoords =
    [
        vec2(-0.95, 1.0),
        vec2(-0.95, -1.0),
        vec2(-0.85, 1.0),
        vec2(-0.85, -1.0),

        vec2(-0.75, 1.0),
        vec2(-0.75, -1.0),
        vec2(-0.65, 1.0),
        vec2(-0.65, -1.0),

        vec2(-0.55, 1.0),
        vec2(-0.55, -1.0),
        vec2(-0.45, 1.0),
        vec2(-0.45, -1.0),

        vec2(-0.35, 1.0),
        vec2(-0.35, -1.0),
        vec2(-0.25, 1.0),
        vec2(-0.25, -1.0),

        vec2(-0.15, 1.0),
        vec2(-0.15, -1.0),
        vec2(-0.05, 1.0),
        vec2(-0.05, -1.0),

        vec2(0.05, 1.0),
        vec2(0.05, -1.0),
        vec2(0.15, 1.0),
        vec2(0.15, -1.0),

        vec2(0.25, 1.0),
        vec2(0.25, -1.0),
        vec2(0.35, 1.0),
        vec2(0.35, -1.0),

        vec2(0.45, 1.0),
        vec2(0.45, -1.0),
        vec2(0.55, 1.0),
        vec2(0.55, -1.0),

        vec2(0.65, 1.0),
        vec2(0.65, -1.0),
        vec2(0.75, 1.0),
        vec2(0.75, -1.0),

        vec2(0.85, 1.0),
        vec2(0.85, -1.0),
        vec2(0.95, 1.0),
        vec2(0.95, -1.0)
    ];

var noseBar = [
    vec2(-0.065, 0.05),
    vec2(-0.065, -0.01),
    vec2(-0.04, 0.065),
    vec2(-0.03, 0.0),
    vec2(0.0, 0.075),
    vec2(0.01, 0.0),
    vec2(0.04, 0.065),
    vec2(0.02, -0.0),
    vec2(0.065, 0.05),
    vec2(0.065, -0.01)
];

var wings = [
    vec2(0.85, 0.0),
    vec2(0.93, 0.025),

    vec2(0.8, 0.2),
    vec2(0.87, 0.23),

    vec2(0.65, 0.35),
    vec2(0.72, 0.375),
    vec2(0.76, 0.4),

    vec2(0.8, -0.22),
    vec2(0.87, -0.2),

    vec2(0.65, -0.35),
    vec2(0.745, -0.33),


    vec2(-0.85, 0.0),
    vec2(-0.93, 0.025),

    vec2(-0.8, 0.2),
    vec2(-0.87, 0.23),

    vec2(-0.65, 0.35),
    vec2(-0.72, 0.375),
    vec2(-0.76, 0.4),

    vec2(-0.8, -0.22),
    vec2(-0.87, -0.2),

    vec2(-0.65, -0.35),
    vec2(-0.745, -0.33),

];

var lensStripes = [
    vec2(-0.7, 0.0),
    vec2(-0.3, 0.0),

    vec2(-0.65, 0.12),
    vec2(-0.29, 0.01),

    vec2(-0.52, 0.2),
    vec2(-0.28, 0.02),

    vec2(-0.4, 0.24),
    vec2(-0.27, 0.03),

    vec2(-0.28, 0.21),
    vec2(-0.26, 0.04),

    vec2(-0.65, -0.12),
    vec2(-0.29, -0.01),

    vec2(-0.52, -0.2),
    vec2(-0.28, -0.02),

    vec2(-0.4, -0.24),
    vec2(-0.27, -0.03),

    vec2(-0.28, -0.21),
    vec2(-0.26, -0.04),


    vec2(0.2, 0.0),
    vec2(0.6, 0.0),

    vec2(0.25, 0.12),
    vec2(0.61, 0.01),

    vec2(0.38, 0.24),
    vec2(0.62, 0.02),

    vec2(0.5, 0.26),
    vec2(0.63, 0.03),

    vec2(0.62, 0.21),
    vec2(0.64, 0.04),

    vec2(0.25, -0.12),
    vec2(0.61, -0.01),

    vec2(0.38, -0.24),
    vec2(0.62, -0.02),

    vec2(0.5, -0.26),
    vec2(0.63, -0.03),

    vec2(0.62, -0.21),
    vec2(0.64, -0.04)
];

var words = [
    //S
    vec2(-0.8, 0.8),
    vec2(-0.875, 0.9),

    vec2(-0.875, 0.9),
    vec2(-0.95, 0.8),

    vec2(-0.95, 0.8),
    vec2(-0.8, 0.7),

    vec2(-0.8, 0.7),
    vec2(-0.875, 0.6),

    vec2(-0.875, 0.6),
    vec2(-0.95, 0.7),

    //P
    vec2(-0.75, 0.6),
    vec2(-0.75, 0.9),

    vec2(-0.75, 0.9),
    vec2(-0.65, 0.9),

    vec2(-0.64, 0.89),
    vec2(-0.64, 0.8),

    vec2(-0.75, 0.79),
    vec2(-0.65, 0.79),

    //E
    vec2(-0.6, 0.9),
    vec2(-0.6, 0.6),

    vec2(-0.6, 0.9),
    vec2(-0.5, 0.9),

    vec2(-0.6, 0.75),
    vec2(-0.525, 0.75),

    vec2(-0.6, 0.6),
    vec2(-0.5, 0.6),

    //C
    vec2(-0.375, 0.9),
    vec2(-0.45, 0.9),

    vec2(-0.45, 0.9),
    vec2(-0.45, 0.6),

    vec2(-0.375, 0.6),
    vec2(-0.45, 0.6),

    //T
    vec2(-0.25, 0.9),
    vec2(-0.35, 0.9),

    vec2(-0.3, 0.9),
    vec2(-0.3, 0.6),

    //R
    vec2(-0.2, 0.6),
    vec2(-0.2, 0.9),

    vec2(-0.2, 0.9),
    vec2(-0.1, 0.9),

    vec2(-0.1, 0.89),
    vec2(-0.1, 0.8),

    vec2(-0.2, 0.79),
    vec2(-0.1, 0.79),

    vec2(-0.2, 0.81),
    vec2(-0.1, 0.605),

    //E
    vec2(-0.05, 0.9),
    vec2(-0.05, 0.6),

    vec2(-0.05, 0.9),
    vec2(0.05, 0.9),

    vec2(-0.05, 0.75),
    vec2(0.025, 0.75),

    vec2(-0.05, 0.6),
    vec2(0.05, 0.6),

    //S
    vec2(0.25, 0.8),
    vec2(0.175, 0.9),

    vec2(0.175, 0.9),
    vec2(0.1, 0.8),

    vec2(0.1, 0.8),
    vec2(0.225, 0.7),

    vec2(0.225, 0.7),
    vec2(0.175, 0.6),

    vec2(0.175, 0.6),
    vec2(0.1, 0.7),

    //P
    vec2(0.3, 0.6),
    vec2(0.3, 0.9),

    vec2(0.3, 0.9),
    vec2(0.4, 0.9),

    vec2(0.4, 0.89),
    vec2(0.4, 0.8),

    vec2(0.3, 0.79),
    vec2(0.4, 0.79),

    //E
    vec2(0.45, 0.9),
    vec2(0.45, 0.6),

    vec2(0.45, 0.9),
    vec2(0.55, 0.9),

    vec2(0.45, 0.75),
    vec2(0.525, 0.75),

    vec2(0.45, 0.6),
    vec2(0.55, 0.6),

    //C
    vec2(0.6, 0.9),
    vec2(0.7, 0.9),

    vec2(0.6, 0.9),
    vec2(0.6, 0.6),

    vec2(0.6, 0.6),
    vec2(0.7, 0.6),

    //S
    vec2(0.875, 0.8),
    vec2(0.8, 0.9),

    vec2(0.8, 0.9),
    vec2(0.725, 0.8),

    vec2(0.725, 0.8),
    vec2(0.875, 0.7),

    vec2(0.875, 0.7),
    vec2(0.8, 0.6),

    vec2(0.8, 0.6),
    vec2(0.725, 0.7),
];

var dots = [
    vec2(0.1, 0.0),
    vec2(-0.2, 0.25),
    vec2(0.5, 0.37),
    vec2(-0.75, -0.2),
    vec2(-0.6, 0.3),
    vec2(0.6, -0.3),
    vec2(-0.2, -0.2),
    vec2(0.4, 0.32),
    vec2(-0.3, 0.3),
    vec2(-0.6, -0.3),
    vec2(-0.78, 0.05),
    vec2(0.81, 0.1829),
    vec2(0.13099, 0.09543),
    vec2(0.8199, 0.234),
    vec2(0.25566, 0.339),
    vec2(0.41226, 0.31701),
    vec2(0.26, -0.30),
    vec2(0.3, -0.3),
    vec2(0.53, -0.32),
    vec2(0.11, -0.17),
    vec2(0.15, 0.19),
    vec2(-0.1, -0.04),
    vec2(-0.75, 0.15),
    vec2(-0.68, 0.30),
    vec2(-0.72, -0.32),
    vec2(-0.5, -0.37),
    vec2(-0.45, 0.35),
    vec2(-0.53, 0.37),
    vec2(-0.14, 0.08),
    vec2(-0.31, -0.35),
    vec2(-0.79, -0.05),
];

window.addEventListener("load", init);
function init() {
    //find canvas by id name
    var canvas = document.getElementById("gl-canvas");

    //get webgl RC and do some minimal error checking
    gl = canvas.getContext("webgl2"); // basic webGL2 context
    //gl = canvas.getContext("webgl2", {antialias:false}); // WebGL2 context with an option
    if (!gl) {
        //This is friendlier than an alert dialog like we use in the template
        alert("Cannot get WebGL2 Rendering Context");
    }

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);



    bgStripeCoords.start = points.length;
    points = points.concat(bgStripeCoords);
    leftLens.start = points.length;
    points = points.concat(leftLens);
    rightLens.start = points.length;
    points = points.concat(rightLens);
    noseBar.start = points.length;
    points = points.concat(noseBar);
    wings.start = points.length;
    points = points.concat(wings);
    leftFill.start = points.length;
    points = points.concat(leftFill);
    rightFill.start = points.length;
    points = points.concat(rightFill);
    lensStripes.start = points.length;
    points = points.concat(lensStripes);
    words.start = points.length;
    points = points.concat(words);
    dots.start = points.length;
    points = points.concat(dots);

    for (var i = 0; i < bgStripeCoords.length; i++) {
        colors = colors.concat(bgWhite);
    }

    for (var i = 0; i < leftLens.length; i++) {
        colors = colors.concat(glassesFrame);
    }
    for (var i = 0; i < rightLens.length; i++) {
        colors = colors.concat(glassesFrame);
    }
    for (var i = 0; i < noseBar.length; i++) {
        colors = colors.concat(glassesFrame);
    }
    for (var i = 0; i < wings.length; i++) {
        colors = colors.concat(glassesFrame);
    }
    colors = colors.concat(vec4(0, 0, 1, 1));
    colors = colors.concat(vec4(0, 0, 1, 1));

    for (var i = 0; i < leftFill.length - 2; i++) {
        colors = colors.concat(vec4(1, 1, 1, 1));
    }
    colors = colors.concat(vec4(0.7, 0, 1, 1));
    colors = colors.concat(vec4(0.7, 0, 1, 1));

    for (var i = 0; i < rightFill.length - 2; i++) {
        colors = colors.concat(vec4(1, 1, 1, 1));
    }
    for (var i = 0; i < lensStripes.length; i++) {
        console.log(i % 2);
        if (i % 2 == 0) {
            colors = colors.concat(vec4(0, 0, 0, 1));
        }
        else {
            colors = colors.concat(vec4(1, 1, 1, 1));
        }
    }
    for (var i = 0; i < words.length; i++) {
        colors = colors.concat(wordCLR);
    }
    for (var i = 0; i < dots.length; i++) {
        colors = colors.concat(vec4(Math.random(), 0, Math.random(), 0.75))
    }

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    myFirstVao = gl.createVertexArray();
    gl.bindVertexArray(myFirstVao);

    uColor = gl.getUniformLocation(program, "uColor");
    uPSize = gl.getUniformLocation(program, "uPSize");

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, gl.FALSE, 0, 0);

    //Enable the shader's vertex colour input and attach the active buffer
    var vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, gl.FALSE, 0, 0);

    gl.clearColor(0.4941176471, 0.6117647059, 0.6, 1.0);

    requestAnimationFrame(render);

};


function render() {
    console.log();
    gl.clear(gl.COLOR_BUFFER_BIT);
    // Background Stripes
    for (var i = 0; i < bgStripeCoords.length; i += 4) {
        gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
    }

    // Glasses
    gl.drawArrays(gl.TRIANGLE_FAN, leftFill.start, leftFill.length);
    gl.drawArrays(gl.TRIANGLE_FAN, rightFill.start, rightFill.length);
    gl.drawArrays(gl.TRIANGLE_STRIP, leftLens.start, leftLens.length);
    gl.drawArrays(gl.TRIANGLE_STRIP, rightLens.start, rightLens.length);
    gl.drawArrays(gl.TRIANGLE_STRIP, noseBar.start, noseBar.length);
    gl.uniform1f(uPSize, 25.0);
    gl.drawArrays(gl.POINTS, wings.start, wings.length);
    gl.lineWidth(2.5);
    gl.drawArrays(gl.LINES, lensStripes.start, lensStripes.length);
    gl.lineWidth(7.5);
    gl.drawArrays(gl.LINES, words.start, words.length);
    gl.uniform1f(uPSize, 5);
    gl.drawArrays(gl.POINTS, dots.start, dots.length);


};

function circle(sides, xMult1, xAdd1, yMult1, yAdd1, xMult2, xAdd2, yMult2, yAdd2) {
    var vertices = []; // create empty array
    if (sides < 3) {
        console.log("function circle: Not enough sides to make a polygon.");
    }
    else {
        if (sides > 10000) {
            sides = 10000;
            console.log("function circle: Sides limited to 10,000.");
        }
        for (var i = sides; i >= 0; i--) {
            vertices.push(vec2(Math.cos((i / sides * 2 * Math.PI)) * xMult1 + xAdd1, Math.sin((i / sides * 2 * Math.PI)) * yMult1 + yAdd1));
            vertices.push(vec2(Math.cos(i / sides * 2 * Math.PI) * xMult2 + xAdd2, Math.sin(i / sides * 2 * Math.PI) * yMult2 + yAdd2));

        }
    }
    return vertices;
}
