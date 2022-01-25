// This variable will store the WebGL rendering context
var gl;
var myFirstVao;
var uColor;

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

    myFirstVao = gl.createVertexArray();
    gl.bindVertexArray(myFirstVao);

    uColor = gl.getUniformLocation(program, "uColor");

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, gl.FALSE, 0, 0);

     //Enable the shader's vertex colour input and attach the active buffer
     var vColor = gl.getAttribLocation( program, "vColor" );
     gl.enableVertexAttribArray( vColor );
     gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
     gl.vertexAttribPointer( vColor, 4, gl.FLOAT, gl.FALSE, 0, 0 );

    gl.clearColor(0, 0, 0, 1);

    requestAnimationFrame(render);

};


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

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