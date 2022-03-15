#version 300 es

//inputs
in vec4 vPosition;
in vec3 vNormal;

//transform uniforms
uniform mat4 p;     // perspective matrix
uniform mat4 mv;    // modelview matrix


//lighting structures
struct _light
{
  vec3 diffuse;
  //EXERCISE 1: Add specular colour member here.
  vec3 ambient;
  vec4 position;
  vec4 spotdirection;
  //EXERCISE 2: Add attenuation coefficients here
  // (tip: pack all three coefficients into a vec3)
};

struct _material
{
  vec3 diffuse;
  vec3 ambient;
  //EXERCISE 1: Add specular and shininess colour members.
};

//lighting constants
//EXERCISE 3: set the number of lights to 2
const int nLights = 1; // number of lights

//lighting uniforms
uniform bool lighting;  // to enable and disable lighting
uniform vec3 uColor;    // colour to use when lighting is disabled
uniform _light light[nLights]; // properties for the n lights
uniform _material material; // material properties

//outputs
out vec4 color;

//globals
vec4 mvPosition; // unprojected vertex position
mat4 Nm; // normal matrix
vec3 mvN; // transformed normal
vec3 N; // renormalized normal

//prototypes
vec3 lightCalc(in _light light);

void main() 
{
  //Transform the point
  mvPosition = mv*vPosition;  //mvPosition is used often
  gl_Position = p*mvPosition; 
  //Construct a normal matrix to fix non-uniform scaling issues
  Nm = transpose(inverse(mv));
  //Transform the normal
  mvN = (Nm*vec4(vNormal,0.0)).xyz;

  /// Color Calculation ///
  if (lighting == false) 
  {
    color.rgb = uColor;
    color.a = 1.0;
  }
  else
  {
    //Renormalize normal, just in case...
    N = normalize(mvN);

    //For combining colors from all lights
    color = vec4(0,0,0,1);

    //EXERCISE 3: loop through all the lights (not just light[0]
    //            and accumulate their returned rgb values in color.
    color.rgb += lightCalc(light[0]);
  }
  /// End Color Calculation ///

}

vec3 lightCalc(in _light light)
{
  //Set up light direction for positional lights
  vec3 L;

  //If the light position is a vector, use that as the direction
  float attenuation = 1.;
  if (light.position.w == 0.0) 
    L = normalize(light.position.xyz);
  //Otherwise, the direction is a vector from the current vertex to the light
  else
  {
    L = normalize(light.position.xyz - mvPosition.xyz);
    //EXERCISE 2: Calculate distance from mvPosition to light position
    //EXERCISE 2: Calculate attenuation

  }


  //EXERCISE 1: Set up eye vector
  //EXERCISE 1: Set up the half vector
  //EXERCISE 1: Calculate the Specular coefficient
  float Ks = 0.; //fixme!!

  //Calculate diffuse coefficient
  float Kd = dot(L,N);

  //If diffuse coefficient is negative, the light is behind the surface.
  if (Kd < 0.)
  {
    Kd = 0.;
    //EXERCISE 1: Set Ks to 0.
  }

  //Calculate colour for this light
  //EXERCISE 1: Add specular colour calculations
  vec3 color =  Ks /* something, something */ +
                Kd * material.diffuse * light.diffuse +
                     material.ambient * light.ambient;

  //correct for all colors being [0,255] instead of [0,1]
  //** Stupid RGB color inspectors... **
  color = color/255./255.;

  return color;
}