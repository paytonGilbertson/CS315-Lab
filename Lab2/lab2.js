// This variable will store the WebGL rendering context
var gl;

//Uniform Color Index
var uColor;

<<<<<<< HEAD
//Vertex Array Objects (VAOs)
var flatArrays, smoothArrays;

// Shader Programs
var smoothProgram, flatProgram;

var bgStripes = [
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

var leftLens = circleLeft(25);
var rightLens = circleRight(50);


var bgTeal = vec4(0.4941176471, 0.6117647059, 0.6, 1.0);


=======
>>>>>>> parent of 98e2598 (Added background and basic glasses)
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

<<<<<<< HEAD
    //configure WebGL
    gl.clearColor(0.4941176471, 0.6117647059, 0.6, 1.0);

    // Load and inistialize shaders
    var smoothProgram = initShaders(gl, "vertex-shader", "fragment-shader");
    var flatProgram = initShaders(gl, "flat-vertex-shader", "fragment-shader");
    //gl.useProgram(program);
=======
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //Triangle
    var points =
        [
            vec2(0.0, 0.0),
            vec2(0.5, 0.0),
            vec2(0.5, 0.5),
            vec2(-0.5, 0.5),
            vec2(-1.0, 0.0),
            vec2(-0.5, -0.5),

            vec2(0.0, 0.0),
            vec2(0.5, 0.0),
            vec2(0.5, 0.5),
            vec2(-0.5, 0.5),
            vec2(-1.0, 0.0),
            vec2(-0.5, -0.5)

        ];


        var colors =
        [
            vec4(1.0, 0.0, 0.0, 1.0), //Red
            vec4(0.0, 1.0, 0.0, 1.0), //Green
            vec4(0.0, 0.0, 1.0, 1.0), //Blue
            vec4(1.0, 1.0, 0.0, 1.0), //Yellow
            vec4(0.0, 1.0, 1.0, 1.0), //Cyan
            vec4(1.0, 0.0, 1.0, 1.0), //Magenta

            vec4(1,1,1,1),
            vec4(1,1,1,1),
            vec4(1,1,1,1),
            vec4(1,1,1,1),
            vec4(1,1,1,1),
            vec4(1,1,1,1)
        ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
>>>>>>> parent of 98e2598 (Added background and basic glasses)

    smoothArrays = gl.createVertexArray();
    gl.bindVertexArray(smoothArrays);



<<<<<<< HEAD
    // Load data into GPU data buffers

    /* Position Buffer */
    var smoothPositions = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, smoothPositions);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(smoothPositions), gl.STATIC_DRAW);

    // Associate shader atributes with corresponding data buffers
        var smoothvPosition = gl.getAttribLocation(smoothProgram, "vPosition");
        gl.enableVertexAttribArray(smoothvPosition);
        gl.vertexAttribPointer(smoothvPosition, 2, gl.FLOAT, gl.FALSE, 0, 0);



    /* Color Buffer */
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    //gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    // Enable the shader's vertex color input and attach the active buffer
    var vColor = gl.getAttribLocation(smoothProgram, "vColor");
    gl.enableVertexAttribArray(vColor);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, gl.FALSE, 0, 0);

    // Allocate a VAO to manage buffer connections to the shader
    flatArrays = gl.createVertexArray();
    gl.bindVertexArray(flatArrays);

    // Points to draw with UNIFORM COLORS
    var flatPoints = [];

    /*
        INSERT CONCATS FOR STRIPES AND BASIC GLASSES FRAME HERE
    */
    flatPoints = flatPoints.concat(bgStripes);

    
    leftLens.start = flatPoints.length;
    flatPoints = flatPoints.concat(leftLens);
    rightLens.start = flatPoints.length;
    flatPoints = flatPoints.concat(rightLens);


    // Create a buffer for vertex positions, make it active, and copy the data to it
    var flatPositions = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, flatPositions);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(flatPoints), gl.STATIC_DRAW);

    // Associate shader attributes with corresponding data buffers
    var flatvPosition = gl.getAttribLocation(flatProgram, "vPosition");
    gl.enableVertexAttribArray(flatvPosition);
    gl.vertexAttribPointer(flatvPosition, 2, gl.FLOAT, gl.FALSE, 0, 0);

    // Get addresses of shader uniforms
    uColor = gl.getUniformLocation(flatProgram, "uColor");
    ////// End of flat shader

=======
     //Enable the shader's vertex colour input and attach the active buffer
     var vColor = gl.getAttribLocation( program, "vColor" );
     gl.enableVertexAttribArray( vColor );
     gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
     gl.vertexAttribPointer( vColor, 4, gl.FLOAT, gl.FALSE, 0, 0 );

    gl.clearColor(0, 0, 0, 1);
>>>>>>> parent of 98e2598 (Added background and basic glasses)

    requestAnimationFrame(render);

};


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
<<<<<<< HEAD
    // Background Stripes

    // draw flat shading with color uniform
    gl.useProgram(flatProgram);
    gl.bindVertexArray(flatArrays);

    // colors
    var bgWhite = vec4(0.7647058824, 0.7137254902, 0.6862745098, 1);
    var glassesFrame = vec4( 1, 0.7, 0.75, 1);

    gl.uniform4fv(uColor, bgWhite);
    for(var startNum = bgStripes.start; startNum > bgStripes.length; startNum += 4)
    {
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
    }
    gl.uniform4fv(uColor, glassesFrame);
    gl.drawArrays(gl.TRIANGLE_STRIP, leftLens.start, leftLens.length);
    gl.drawArrays(gl.TRIANGLE_STRIP, rightLens.start, rightLens.length);

=======
>>>>>>> parent of 98e2598 (Added background and basic glasses)

    gl.uniform4f(uColor, 1, 1, 0, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    var green = vec4(0, .5, 0, 1);
    gl.uniform4fv(uColor, flatten(green));

    gl.lineWidth(10);
    gl.drawArrays(gl.LINE_LOOP, 6, 3);

    gl.lineWidth(5);
    gl.drawArrays(gl.LINE_LOOP, 9, 3);

    //gl.enable(gl.CULL_FACE);

};

function circle(sides) {
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
            vertices.push(vec2(Math.cos(i / sides * 2 * Math.PI), Math.sin(i / sides * 2 * Math.PI)));
        }
    }
    return vertices;
}