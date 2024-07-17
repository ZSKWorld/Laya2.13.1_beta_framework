import { MathUtil } from "../../../../game/math/MathUtil";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UISnakeMsg, UISnakeView } from "../view/UISnakeView";

class Snake extends Laya.Script {
	index = 0;
	private _speed = 1.25;
	private _direction = new Laya.Vector2(1, 0);
	private _bodyDelta = 20;
	private _initBodyLen = 500;
	private _body: fgui.GObject[] = [];
	private _bodyPos: Laya.Vector2[] = [];
	private _moveCompensate: number = 0;
	override onStart() {
		const { _initBodyLen, _body, _bodyPos, _bodyDelta, gowner } = this;
		const { x, y } = gowner;
		_body.push(gowner);
		_bodyPos.push(new Laya.Vector2(x, y));
		const index = gowner.parent.getChildIndex(gowner);
		for (let i = 1; i <= _initBodyLen; i++) {
			const body = Snake.getBody();
			body.setXY(x - i * _bodyDelta, y);
			gowner.parent.addChildAt(body, index);
			_body.push(body);
			_bodyPos.push(new Laya.Vector2(body.x, body.y));
		}
		Laya.timer.frameLoop(1, this, this.doUpdate)
	}

	doUpdate() {
		const { index, _speed, _direction, _body, _bodyPos, _bodyDelta } = this;
		const { mouseX, mouseY } = Laya.stage;
		const headPos = _bodyPos[0];
		let tempSpeed = _speed + this._moveCompensate, moveDelta = 0;
		let moveComponsate = 0;
		while (tempSpeed > 0) {
			moveDelta = Math.min(tempSpeed, _speed, _bodyDelta);
			tempSpeed -= moveDelta;
			const { x: dx, y: dy } = _direction;
			_direction.setValue(mouseX - headPos.x + index * 100, mouseY - headPos.y);
			_direction.normalize();
			_direction.x = MathUtil.Lerp(dx, _direction.x, 0.3);
			_direction.y = MathUtil.Lerp(dy, _direction.y, 0.3);
			_direction.normalize();
			const dirLenSquared = (_direction.x * moveDelta) ** 2 + (_direction.y * moveDelta) ** 2;
			if (dirLenSquared >= _bodyDelta) {
				_direction.scale(moveDelta);
				const lastPos = _bodyPos.pop();
				lastPos.setValue(headPos.x, headPos.y);
				_bodyPos.splice(1, 0, lastPos);
			} else if (moveComponsate >= _bodyDelta) {
				const lastPos = _bodyPos.pop();
				lastPos.setValue(headPos.x, headPos.y);
				_bodyPos.splice(1, 0, lastPos);
			} else {
				moveComponsate += moveDelta;
			}
			headPos.x += _direction.x * moveDelta;
			headPos.y += _direction.y * moveDelta;
		}
		this._moveCompensate = moveComponsate;
		_bodyPos.forEach((v, i) => {
			_body[i].setXY(v.x, v.y);
		});
	}

	static getBody(randomColor: boolean = false) {
		const body = new fgui.GGraph();
		body.setSize(50, 50);
		body.setPivot(0.5, 0.5, true);
		if (randomColor) body.drawEllipse(1, "#000000", MathUtil.RandomColor());
		else body.drawEllipse(1, "#000000", "#ffffff");
		return body;
	}
}


export interface UISnakeData {

}

export class UISnakeCtrl extends BaseViewCtrl<UISnakeView, UISnakeData> {
	private _snakes: Snake[] = [];
	override onAdded() {
		this.addMessage(UISnakeMsg.OnBtnBackClick, this.onBtnBackClick);
		this.drawGrid();
	}

	private drawGrid() {
		const { width, height, displayObject } = this.view;
		const graphics = displayObject.graphics;
		graphics.clear();
		const gridSize = 30, gridBorder = 2, halfGridBorder = gridBorder / 2, gridBorderColor = "#ff0000";
		const maxWidth = Math.ceil(width / (gridSize + gridBorder)) * (gridSize + gridBorder) + gridBorder;
		const maxHeight = Math.ceil(height / (gridSize + gridBorder)) * (gridSize + gridBorder) + gridBorder;
		let drawX = (width - maxWidth) / 2;
		let drawY = (height - maxHeight) / 2;
		while (true) {
			drawX += halfGridBorder;
			drawY += halfGridBorder;
			if (drawX <= maxWidth) graphics.drawLine(drawX, 0, drawX, height, gridBorderColor, gridBorder);
			if (drawY <= maxHeight) graphics.drawLine(0, drawY, width, drawY, gridBorderColor, gridBorder);
			drawX += gridSize + halfGridBorder;
			drawY += gridSize + halfGridBorder;
			if (drawX > maxWidth && drawY >= maxHeight) break;
		}
	}

	override onEnable() {
		for (let i = 0; i < 1; i++) {
			const snake = Snake.getBody(true).addComponent(Snake);
			snake.index = i;
			snake.gowner.setXY(Math.random() * 1080, Math.random() * 1920);
			this.view.addChild(snake.gowner);
			this._snakes.push(snake);
		}
	}

	override onDisable() {

	}

	private onBtnBackClick() {
		this.showView(ViewID.UILittleGameView);
		this.removeSelf();
	}

}