// This variable will store the WebGL rendering context
var gl;

//WebGL State Management
////////////////////////
var mvIndex; //Shader Positioning Input
var projIndex; //Shader Projection Input
var mv; //Local Positioning Matrix
var p; //Local Projection Matrix

var colors = {
  'red':     new vec4(1, 0, 0, 1),
  'blue':    new vec4(0, 0, 1, 1),
  'green':   new vec4(0, 1, 0, 1),
  'yellow':  new vec4(1, 1, 0, 1),
  'cyan':    new vec4(0, 1, 1, 1),
  'magenta': new vec4(1, 0, 1, 1),
};

//Model Control Variables
/////////////////////////
var objectColor = colors['red']; //current color of sphere
var rotAngle = 0; //current rotation angle of scene
var rotChange = -0.5; //speed and direction of scene rotation

var uColor1 = vec3(1, 1, 1);
var uColor2 = vec3(1, 1, 1);

var uRed1 = 0.9;
var uGreen1 = 0.9;
var uBlue1 = 0.9;

var uRed2 = 0.5;
var uGreen2 = 0.5;
var uBlue2 = 0.5;

window.addEventListener("load", init);


function init() {// Set up a WebGL Rendering Context in an HTML5 Canvas
    var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");
    
    //  Configure WebGL
    //  eg. - set a clear color
    //      - turn on depth testing
    // This light gray clear colour will help you see your canvas
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    
    // Get locations of transformation matrices from shader
    mvIndex = gl.getUniformLocation(program, "mv");
    projIndex = gl.getUniformLocation(program, "p");
    
    // Send a perspective transformation to the shader
    var p = perspective(50.0, canvas.width/canvas.height, 0.5, 50.0);
    gl.uniformMatrix4fv(projIndex, gl.FALSE, flatten4x4(p));
    
    // Get locations of lighting uniforms from shader
    var uLightPosition = gl.getUniformLocation(program, "lightPosition");
    
    // Set default light direction in shader.
    gl.uniform4f(uLightPosition, 0.0, 0.0, 1.0, 0.0);
    
    // Configure uofrGraphics object
    urgl = new uofrGraphics();
    urgl.connectShader(program, "vPosition", "vNormal", "vColor");
    
   


    // Begin an animation sequence
    requestAnimationFrame(render);
    
    setupEventListeners();
};

function setupEventListeners(){
   var m = document.getElementById("colors");

   m.addEventListener("input", function(event){
      var userC1 = m.uColor1.value;
      uColor1 = userC1;
      var p = document.createElement("p");
      p.style.color = uColor1;
      //console.log(userC1);

      var userC2 = m.uColor2.value;
      uColor2 = userC2;
      var q = document.createElement("q");
      q.style.color = uColor2;

      var uRGB1 = p.style.color.match(/^.*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
      console.log(uRGB1[0]);
      uRed1 = uRGB1[1]/255.0;
      uGreen1 = uRGB1[2]/255.0;
      uBlue1 = uRGB1[3]/255.0;

      var uRGB2 = q.style.color.match(/^.*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
      console.log(uRGB2[0]);
      uRed2 = uRGB2[1]/255.0;
      uGreen2 = uRGB2[2]/255.0;
      uBlue2 = uRGB2[3]/255.0;
   })

}


function render() {
// Clear the canvas with the clear color instead of plain white,
// and also clear the depth buffer
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



//console.log(document.getElementById(uColor2));
// Draw previous mo;del state
// Notice we modularized the work a bit...
PreRenderScene();
RenderStockScene(uRed1, uGreen1, uBlue1, uRed2, uGreen2, uBlue2);
RenderScene();

// Update the model and request a new animation frame
var rotateRange = parseFloat(document.getElementById("range1").value);
rotAngle += rotChange * rotateRange;
requestAnimationFrame(render);
}

//}
// Use this to perform view transforms or other tasks
// that will affect both stock scene and detail scene
function PreRenderScene() {
    // select a default viewing transformation
    // of a 20 degree rotation about the X axis
    // then a -5 unit transformation along Z
    mv = mat4();
    mv = mult(mv, translate(0.0, 0.0, -5.0));
    mv = mult(mv, rotate(-20.0, vec3(1, 0, 0)));
 
    //Allow variable controlled rotation around local y axis.
    mv = mult(mv, rotate(rotAngle, vec3(0, 1, 0)));
 }
 
 // Function: RenderStockScene
 // Purpose:
 //     Draw a stock scene that looks like a
 //     black and white checkerboard
 function RenderStockScene(r1, g1, b1, r2, g2, b2) {
    var delta = 0.5;
 
    // define four vertices that make up a square.
    var v1 = vec4(0.0, 0.0, 0.0, 1.0);
    var v2 = vec4(0.0, 0.0, delta, 1.0);
    var v3 = vec4(delta, 0.0, delta, 1.0);
    var v4 = vec4(delta, 0.0, 0.0, 1.0);
 
 
    var color = 0;
 
    // define the two colors
    var color1 =  vec4(r1, g1, b1, 1.0)
    var color2 = vec4(r2, g2, b2, 1.0);
 
    //Make a checkerboard
    var placementX = mv;
    var placementZ;
    placementX = mult(placementX, translate(-10.0 * delta, 0.0, -10.0 * delta));
    for (var x = -10; x <= 10; x++)
    {
       placementZ = placementX;
       for (var z = -10; z <= 10; z++)
       {
          urgl.setDrawColour((color++) % 2 ? color1 : color2);
          gl.uniformMatrix4fv(mvIndex, gl.FALSE, flatten4x4(placementZ));
          urgl.drawQuad(v1, v2, v3, v4);
          placementZ = mult(placementZ, translate(0.0, 0.0, delta));
       }
       placementX = mult(placementX, translate(delta, 0.0, 0.0));
 
    }
 }
 
 // Function: RenderScene
 // Purpose:
 //     Your playground. Code additional scene details here.
 function RenderScene() {
    // draw a red sphere inside a light blue cube
 
    // Set the drawing color to red
    urgl.setDrawColour(objectColor);
 
    // Move the "drawing space" up by the sphere's radius
    // so the sphere is on top of the checkerboard
    // mv is a transformation matrix. It accumulates transformations through
    // right side matrix multiplication.
    mv = mult(mv, translate(0.0, 1.0, 0.0));
 
    // Rotate drawing space by 90 degrees around X so the sphere's poles
    // are vertical. Arguments are angle in degrees,
    // and a three part rotation axis with x, y and z components.
    mv = mult(mv, rotate(90.0, vec3(1, 0, 0)));
 
    //Send the transformation matrix to the shader
    gl.uniformMatrix4fv(mvIndex, gl.FALSE, flatten4x4(mv));
 
    // Draw a sphere.
    // Arguments are Radius, Slices, Stacks
    // Sphere is centered around current origin.
    urgl.drawSolidSphere(0.5, 20, 20);
 
 
    // when we rotated the sphere earlier, we rotated drawing space
    // and created a new "local frame"
    // to move the cube up or down we now have to refer to the z-axis
    // instead of the y-axis like we did with the sphere
    mv = mult(mv, translate(0.0, 0.0, -0.75));
 
    //Send the transformation matrix to the shader
    gl.uniformMatrix4fv(mvIndex, gl.FALSE, flatten4x4(mv));
 
    // set the drawing color to light blue
    // arguments to vec4 are red, green, blue and alpha (transparancy)
    urgl.setDrawColour(vec4(0.5, 0.5, 1.0, 1.0));
 
    // Draw the cube.
    // Argument refers to length of side of cube.
    // Cube is centered around current origin.
    urgl.drawSolidCube(0.5);
 }
 