const VS = `
void main() {
    gl_Position = vec4(0.0);
}
`;
const FS = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;
export class MyRender {
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram;
    constructor() {
        this.gl = Laya.WebGLContext["mainContext"];
        const gl = this.gl;
        this.program = this.initProgram();
        console.error(VS, FS);
        gl.useProgram(this.program);
    }

    private initProgram() {
        const gl = this.gl;
        const vShader = gl.createShader(this.gl.VERTEX_SHADER);
        gl.shaderSource(vShader, VS);
        gl.compileShader(vShader);
        if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
            console.error("compile vertex shader error:" + gl.getShaderInfoLog(vShader));
            return null;
        }

        const fShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fShader, FS);
        gl.compileShader(fShader);
        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
            console.error("compile fragment shader error:" + gl.getShaderInfoLog(fShader));
            return null;
        }

        const program = gl.createProgram();
        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("link program error:" + gl.getProgramInfoLog(program));
            return null;
        }

        return program;
    }
}