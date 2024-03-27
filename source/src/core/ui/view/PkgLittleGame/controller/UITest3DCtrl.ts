import { CameraController } from "../../../../3d/CameraController";
import { RotateAround } from "../../../../3d/RotateAround";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ViewID } from "../../../core/ViewID";
import { UITest3DMsg, UITest3DView } from "../view/UITest3DView";

export interface UITest3DData {

}

export class UITest3DCtrl extends BaseViewCtrl<UITest3DView, UITest3DData> {
	private _scene: Laya.Scene3D;
	private _camera: Laya.Camera;
	private _sphere1: Laya.MeshSprite3D;
	private _sphere2: Laya.MeshSprite3D;

	override onAdded() {
		this.addMessage(UITest3DMsg.OnBtnBackClick, this.onBtnBackClick);
		this.createScene();
	}

	private onBtnBackClick() {
		this.showView(ViewID.UILittleGameView);
		this.removeSelf();
	}

	private createScene() {
		if (this._scene) return;
		this._scene = this.view.displayObject.addChild(new Laya.Scene3D());
		this._camera = this._scene.addChild(new Laya.Camera());
		const empty = this._scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere()));
		this._sphere1 = this._scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere()));
		this._sphere2 = this._scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere()));
		this._sphere1.transform.position = new Laya.Vector3(4,0,0);
		this._sphere2.transform.position = new Laya.Vector3(6,0,0);
		this._camera.addComponent(CameraController);
		const ra1 = this._sphere1.addComponent(RotateAround);
		ra1.target = empty;
		const ra2 = this._sphere2.addComponent(RotateAround);
		ra2.target = this._sphere1;
		ra2.rSpeed = ra1.rSpeed * 20;
	}


	private exit3DScene() {
		
	}
}