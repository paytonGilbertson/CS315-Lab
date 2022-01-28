// This variable will store the WebGL rendering context
var gl;
var myFirstVao;
var uColor;

var leftLens = circleLeft(25);
var rightLens = circleRight(50);


var bgTeal = vec4(0.4941176471, 0.6117647059, 0.6, 1.0);
var bgWhite = vec4(0.7647058824, 0.7137254902, 0.6862745098, 1);

var glassesFrame = vec4( 1, 0.7, 0.75, 1);

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

    var points =
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

        var colors =
        [
            bgWhite, bgWhite, bgWhite, bgWhite, bgWhite, bgWhite, bgWhite, bgWhite, bgWhite, bgWhite, bgWhite, bgWhite, bgWhite, bgWhite, 
        ];

    leftLens.start = points.length;
    points = points.concat(leftLens);
    rightLens.start = points.length;
    points = points.concat(rightLens);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    myFirstVao = gl.createVertexArray();
    gl.bindVertexArray(myFirstVao);

    uColor = gl.getUniformLocation(program, "uColor");

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
    //var bgWhite = vec4(0.7647058824, 0.7137254902, 0.6862745098, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // Background Stripes
    gl.uniform4f(uColor, 0.7647058824, 0.7137254902, 0.6862745098, 1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 4, 4);    
    gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 12, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 16, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 20, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 24, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 28, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 32, 4);
    gl.drawArrays(gl.TRIANGLE_STRIP, 36, 4);

    gl.uniform4fv(uColor, flatten(glassesFrame));
    gl.drawArrays(gl.TRIANGLE_STRIP, leftLens.start, leftLens.length);
    gl.drawArrays(gl.TRIANGLE_STRIP, rightLens.start, rightLens.length);

console.log(glassesFrame);

};

function circleLeft(sides) {
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
            vertices.push(vec2(Math.cos((i / sides * 2 * Math.PI))*0.3-0.45, Math.sin((i / sides * 2 * Math.PI))*0.3));
            vertices.push(vec2(Math.cos(i / sides * 2 * Math.PI)*0.4-0.45, Math.sin(i / sides * 2 * Math.PI)*0.4));

        }
    }
    return vertices;
}

function circleRight(sides) {
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
            vertices.push(vec2(Math.cos((i / sides * 2 * Math.PI))*0.3+0.45, Math.sin((i / sides * 2 * Math.PI))*0.3));
            vertices.push(vec2(Math.cos(i / sides * 2 * Math.PI)*0.4+0.45, Math.sin(i / sides * 2 * Math.PI)*0.4));

        }
    }
    return vertices;
}