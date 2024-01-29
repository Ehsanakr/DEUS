
  #extension GL_OES_standard_derivatives : enable

  uniform sampler2D myTexture;
  varying vec2 texcoord;
uniform vec2 iResolution;
    uniform float iTime;
  uniform vec2 iMousePos;
    uniform float iScrollProgress;
    uniform vec4 iAnimProgress;
#ifdef GL_ES
precision highp float;
#endif
 
////////// Constants 
const float PI   =      3.141592654;
#define PI          3.141592654
#define PI_2        (0.5*PI)
#define TAU         (2.0*PI)
#define SCA(a)      vec2(sin(a), cos(a))
#define ROT(a)      mat2(cos(a), sin(a), -sin(a), cos(a))

const vec4 hsv2rgb_K = vec4(1.0, 0.7, 0.1, 3.0);
vec3 hsv2rgb(vec3 c) {
  vec3 p = abs(fract(c.xxx + hsv2rgb_K.xyz) * 6.0 - hsv2rgb_K.www);
  return c.z * mix(hsv2rgb_K.xxx, clamp(p - hsv2rgb_K.xxx, 0.0, 1.0), c.y);
}
#define HSV2RGB(c)  (c.z * mix(hsv2rgb_K.xxx, clamp(abs(fract(c.xxx + hsv2rgb_K.xyz) * 6.0 - hsv2rgb_K.www) - hsv2rgb_K.xxx, 0.0, 1.0), c.y))
const vec3 sunDir       = normalize(vec3(0.0, 0.05, 1.0));
const vec3 sunCol       = vec3(0.01, 0.001, 0.001);
const float mountainPos = -20.0;

vec2 mod2(inout vec2 p, vec2 size) {
  vec2 c = floor((p + size*0.5)/size);
  p = mod(p + size*0.5,size) - size*0.5;
  return c;
}



vec3 outerSkyRender(vec3 ro, vec3 rd) {
  vec2 pi;
  vec3 col ;
  //Sun Glow Factor
  col += sunCol/pow((1.001-((dot(sunDir, rd)))), 1.);
//SkyAtmosphereColor
    col += vec3(0.02, 0.02, 0.04);

  vec3 gcol;
//middle light Horizon
 
  gcol = vec3(0.01, 0.01, 0.01);
  col += gcol/max(abs(rd.y), 0.003);

return col;
}
float rayPlane(vec3 ro, vec3 rd, vec4 p) {
  return -(dot(ro,p.xyz)+p.w)/dot(rd,p.xyz);
}
vec2 mousePos = (iMousePos.xy / iResolution.xy - 0.5) * 2.0; // Convert mouse position to normalized coordinates

float equilateralTriangle(vec2 p) {
  const float k = sqrt(3.0);
  p.x = abs(p.x) - 1.0;
  p.y = p.y - 1.0 / k;
  if (p.x + k * p.y > -0.0)
      p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
  const float epsilon = 0.001;
  vec2 dx = vec2(epsilon, 0.0);
  vec2 dy = vec2(0.0, epsilon);

  float gx = length(p + dx) - length(p - dx);
  float gy = length(p + dy) - length(p - dy);

  p.x -= clamp(p.x, -2.0, 0.0);

  return -length(p) * sign(p.y);
}
vec3 triRender(vec3 col, vec3 ro, vec3 rd, inout float maxt) {
  const vec3 tpn = normalize(vec3(0.0, 0.0, 1.0));
  const vec4 tpdim = vec4(tpn, -2.0);
  float tpd = rayPlane(ro, rd, tpdim);

  if (tpd < 0.0 || tpd > maxt) {
    return col;
  }

  vec3 pp = ro+rd*tpd;
  vec2 p = pp.xy;
  p *= 0.5;
  mousePos *= 2.0;
  const float off = -0.569;
  vec2 op = p; 
  p.y -= off;
  mousePos.y -= off-0.97;
  mousePos.x -= 0.07;
  const vec2 n = SCA(-PI/3.0);
  vec2 gp = p;
  float hoff = 0.15*dot(n, p);
  //triangle glow color
  vec3 gcol = vec3(0.01, 0.001, 0.001);
  vec2 pt = p;
  pt.y = -pt.y;
  const float zt = 1.0;
      vec2 grad;
    float dt = equilateralTriangle(p) * 1.0;
// Check if the mouse is hovering over the equilateral triangle
if (equilateralTriangle(mousePos) >= 0.0) {
    // Do something when the mouse is over the triangle
    col = dt < 0.0 ? vec3(0.0) : col;
  } else {
    // Do something when the mouse is not over the triangle
    col = dt < 0.0 ? vec3(1.0) : col;
  }
  col += (gcol/max(abs(dt), 0.001))*smoothstep(1., 0.0, dt);
  if (dt < 0.0) {
    maxt = tpd;
  }
  return col;  
}
vec3 groundRender(vec3 col, vec3 ro, vec3 rd, inout float maxt) {
  const vec3 gpn = normalize(vec3(0.0, 1.0, 0.0));
  const vec4 gpdim = vec4(0.0, 1.0, 0.0, 0.0);
  float gpd = rayPlane(ro, rd, gpdim);

  if (gpd < 0.0) {
    return col;
  }
  
  maxt = gpd;
  //Middle Horizon down multiplier
  vec3 gp     = ro + rd*gpd;
  float gpfre = 0.90 + dot(rd, gpn);
  gpfre *= gpfre;
  gpfre *= gpfre;
  
  vec3 grr = reflect(rd, gpn);
  
  vec2 ggp    = gp.xz;
  ggp.y += iTime;
  float dfy   = dFdy(ggp.y);
  float gcf = sin(ggp.x)*sin(ggp.y);
  // Tiles size
  vec2 ggn    = mod2(ggp, vec2(1.0));
  float ggd   = min(abs(ggp.x), abs(ggp.y));
//Surface lines Color
  vec3 gcol = vec3(0.005, 0.0009, 0.0009);
  float rmaxt = 1E6;
  vec3 rcol = outerSkyRender(grr, grr);
  rcol = triRender(rcol, gp, grr, rmaxt);
// Tiles fade effect
  col = gcol/max(ggd, 0.25*dfy)*exp(-0.2*gpd);
    //Middle Horizon down color

  rcol += vec3(2.0, 1.5, 1.5)*gpfre;
  rcol = 1.0*tan(rcol*0.25);
  col += rcol*gpfre;

  return col;
}

vec3 render(vec3 ro, vec3 rd) {
  float maxt = 1E6;  

  vec3 col = outerSkyRender(ro, rd);
  col = groundRender(col, ro, rd, maxt);
  col = triRender(col, ro, rd, maxt);

  return col;
}

vec3 effect(vec2 p) {
   vec3 ro = vec3(0.0+ mousePos.x/2.0 , 1.0, iAnimProgress.x-4.);
  // Field of view 
  const float fov = 1.5;
  //Camera rotation
  vec3 la = vec3(iAnimProgress.y, 1.5, 0.0);
  vec3 up = vec3(iAnimProgress.z, 1.0, 0.0);
  
  vec3 ww = normalize(la - ro);
  vec3 uu = normalize(cross(up, ww));
  vec3 vv = cross(ww, uu);
  vec3 rd = normalize(-p.x * uu + p.y * vv + fov * ww);

  return render(ro, rd);
}
///////////////////////Image effect
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 q = fragCoord/iResolution.xy;
    vec2 p = -1. + (2. * q);
    p.x *= iResolution.x/iResolution.y;
    vec3 col = effect(p);
    fragColor = vec4(col, 1.0);
}
  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }