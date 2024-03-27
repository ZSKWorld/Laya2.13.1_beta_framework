export class RotateAround extends Laya.Script3D {
    target: Laya.Sprite3D;
    rSpeed = 0.05;
    override onUpdate(): void {
        if (this.target) {
            this.owner.transform.position = this.rotate(this.owner.transform.position, this.target.transform.position, new Laya.Vector3(0, 1, 0), this.rSpeed * Laya.timer.delta);
        }
    }
    private rotate(point: Laya.Vector3, cross: Laya.Vector3, axis: Laya.Vector3, angle: number) {
        const v3 = new Laya.Vector3();
        Laya.Vector3.subtract(point, cross, v3);
        const quat = new Laya.Quaternion();
        Laya.Quaternion.createFromAxisAngle(axis, angle * Math.PI / 180, quat);
        Laya.Vector3.transformQuat(v3, quat, v3);
        Laya.Vector3.add(v3, cross, v3);
        return v3;
    }
}