
class Particle {
    static _gid: number = 0;
    id: number = ++Particle._gid;
    main: CanvasParticleDemo1;
    x: number;
    y: number;
    angle: number;
    speed: number;
    opacity: number;

    constructor(main: CanvasParticleDemo1) {
        this.main = main;
        const { width, height, particleSpeed } = main;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.angle = Math.random() * 360;
        this.speed = Math.random() * particleSpeed;
        this.opacity = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        const { width, height } = this.main;
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
        }
    }

    draw() {
        const { ctx, particleSize } = this.main;
        ctx.beginPath();
        ctx.arc(this.x, this.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ this.opacity })`;
        ctx.fill();
    }
}


export class CanvasParticleDemo1 {
    private static _inst: CanvasParticleDemo1;
    static get Inst() { return this._inst || (this._inst = new CanvasParticleDemo1()); }
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    particles: Particle[] = [];
    particleCount = 500;
    particleSpeed = 1;
    particleSize = 2;
    maxDistance = 100;
    lightningColor = "#fff";
    private animate: () => void;
    private constructor() {
        const canvas = this.canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        canvas.id = "CanvasParticleDemo1";
        const style = canvas.style;
        style.display = "block";
        style.position = "fixed";
        style.top = "0";
        style.width = "100%";
        style.height = "100%";
        style.zIndex = "-1";

        this.ctx = canvas.getContext("2d");

        this.resize();
        this.createParticles();
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        this.animate = () => {
            const { ctx, width, height, particles } = this;
            ctx.clearRect(0, 0, width, height);
            for (const particle of particles) {
                particle.update();
                particle.draw();
            }
            this.drawConnections();
            requestAnimationFrame(this.animate);
        };
        this.animate();
    }

    private createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this));
        }
    }

    private drawConnections() {
        const { particles, ctx, maxDistance, lightningColor } = this;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = lightningColor;
                    ctx.lineWidth = 0.5 * (1 - distance / maxDistance);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    private resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.particles.forEach(v => {
            v.x = Math.random() * this.width;
            v.y = Math.random() * this.height;
        });
    }
}
WindowImmit("CanvasParticleDemo1", CanvasParticleDemo1);