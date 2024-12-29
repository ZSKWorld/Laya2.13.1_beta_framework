precision mediump float;
uniform float u_Time;
uniform float u_LightWidth;
uniform sampler2D texture;
uniform sampler2D u_NoiseTex;
varying vec4 v_color;
varying vec4 v_texcoordAlpha;
void main() {
    vec2 center = vec2(0.5, 0.5);

    float dis = distance(center, v_texcoordAlpha.xy);
    if(dis >= 0.2 && dis <= 0.4) {
        float y = 1.0 - (dis - 0.2) / 0.2;
        float dotV = acos(dot(normalize(v_texcoordAlpha.xy - center), normalize(vec2(0.5, 1.0) - center))) / 3.1415926;
        float x = dotV / 2.0;
        if(v_texcoordAlpha.x > 0.5)
            x = 1.0 - x;
            // x = x * 360.0 * 3.1415926 * dis * (y / 2.0 + 0.5) / 180.0 / (2.0 * 3.1415926 * 0.2);
        if(x > u_LightWidth)
            discard;
        if(x < 0.2 || x > 0.8)
            x = x / u_LightWidth;
            // x = x + y;
        gl_FragColor = texture2D(texture, vec2(x, y));
            // gl_FragColor = vec4(x,0.0,0.0,1.0);
    } else
        discard;
}