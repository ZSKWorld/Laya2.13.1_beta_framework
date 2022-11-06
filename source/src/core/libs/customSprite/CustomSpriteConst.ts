//顶点着色器   直接使用的是laya官方自带的
export const SpriteVS = `
    attribute vec4 posuv;
    attribute vec4 attribColor;
    attribute vec4 attribFlags;
    attribute vec4 clipDir;
    attribute vec2 clipRect;
    attribute vec4 posuv2;
    uniform vec4 clipMatDir;
    uniform vec2 clipMatPos;
    varying vec2 cliped;
    uniform vec2 size;
    uniform vec2 clipOff;
    #ifdef WORLDMAT
        uniform mat4 mmat;
    #endif
    #ifdef MVP3D
        uniform mat4 u_MvpMatrix;
    #endif
    varying vec4 v_texcoordAlpha;
    varying vec4 v_color;
    varying float v_useTex;
    void main() {
        vec4 pos = vec4(posuv.xy,0.,1.);
        #ifdef WORLDMAT
            pos=mmat*pos;
        #endif
        vec4 pos1  =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,0.,1.0);
        #ifdef MVP3D
            gl_Position=u_MvpMatrix*pos1;
        #else
            gl_Position=pos1;
        #endif
        v_texcoordAlpha.xy = posuv.zw;
        v_texcoordAlpha.z = attribColor.a/255.0;
        v_color = attribColor/255.0;
        v_color.xyz*=v_color.w;
        v_useTex = attribFlags.r/255.0;
        float clipw = length(clipMatDir.xy);
        float cliph = length(clipMatDir.zw);
        vec2 clpos = clipMatPos.xy;
        #ifdef WORLDMAT
        if(clipOff[0]>0.0){
            clpos.x+=mmat[3].x;
            clpos.y+=mmat[3].y;
        }
        #endif
        vec2 clippos = pos.xy - clpos;

        if(clipw>20000. && cliph>20000.)
            cliped = vec2(0.5,0.5);
        else {
            cliped=vec2( dot(clippos,clipMatDir.xy)/clipw/clipw, dot(clippos,clipMatDir.zw)/cliph/cliph);
        }
    }
`;
//片元着色器  一个简单的功能 根据噪图 过滤掉低于阈值的颜色
export const PS_CS1: string = `
    precision mediump float;
    uniform float u_Time;
    uniform float u_LightWidth;
    uniform sampler2D texture;
    uniform sampler2D u_NoiseTex;
    varying vec4 v_color;
    varying vec4 v_texcoordAlpha;
    void main(){
        vec4 noiseC;
        if(u_LightWidth > 0.0){
            vec2 rangeX = vec2(0.0,u_LightWidth)+(sin(u_Time/500.0) + 1.0) / 2.0*(1.0+u_LightWidth+0.1)-u_LightWidth-0.05;
            if(v_texcoordAlpha.x >= rangeX.x && v_texcoordAlpha.x <= rangeX.y){
                noiseC = texture2D(u_NoiseTex, v_texcoordAlpha.xy);
            }
        }
        gl_FragColor = texture2D(texture, v_texcoordAlpha.xy) + noiseC;
    }
`;