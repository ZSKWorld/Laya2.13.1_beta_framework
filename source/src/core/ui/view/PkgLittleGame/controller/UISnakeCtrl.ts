import { MathUtil } from "../../../../game/math/MathUtil";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UISnakeMsg, UISnakeView } from "../view/UISnakeView";

export interface UISnakeData {

}

export class UISnakeCtrl extends BaseViewCtrl<UISnakeView, UISnakeData> {
	private graphes: fgui.GGraph[] = [];

	override onAdded() {
		this.addMessage(UISnakeMsg.OnBtnBackClick, this.onBtnBackClick);
		const { width, height, displayObject } = this.view;
		const graphics = displayObject.graphics;
		graphics.drawRect(0, 0, width, height, "#ffffff");
		const gridSize = 100, gridBorder = 20, gridBorderColor = "#ff0000";
		const gridXCnt = Math.floor(width / (gridSize + gridBorder));
		const gridYCnt = Math.floor(height / (gridSize + gridBorder));
		let gridX = Math.floor(-(width - gridXCnt * (gridSize + gridBorder)) / 2), gridY = Math.floor(-(height - gridYCnt * (gridSize + gridBorder)) / 2);

		while (1) {
			if (gridX < width) {
				graphics.drawLine(gridX, 0, gridX, height, gridBorderColor, gridBorder);
			}
			if (gridY < height) {
				graphics.drawLine(0, gridY, width, gridY, gridBorderColor, gridBorder);
			}
			gridX += gridSize + gridBorder;
			gridY += gridSize + gridBorder;
			if (gridX > (width + gridBorder / 2) && gridY > (height + gridBorder / 2)) {
				break;
			}
		}
	}

	override onEnable() {
		const { width, height } = this.view;
		for (let i = 0; i < 100; i++) {
			const graph = new fgui.GGraph();
			graph.setSize(50, 50);
			graph.drawRect(0, "#ffffff", MathUtil.RandomColor());
			graph.setXY(MathUtil.RandomInt(0, width - 50), MathUtil.RandomInt(0, height - 50));
			this.view.addChild(graph);
			this.graphes.push(graph);
		}
	}

	override onDisable() {
		this.graphes.forEach(v => v.dispose());
		this.graphes.length = 0;
	}

	private onBtnBackClick() {
		this.showView(ViewID.UILittleGameView);
		this.removeSelf();
	}

}