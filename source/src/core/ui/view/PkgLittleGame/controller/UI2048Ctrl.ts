import { MathUtil } from "../../../../game/math/MathUtil";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { ViewID } from "../../../core/ViewID";
import { UI2048Msg, UI2048View } from "../view/UI2048View";
import { ComItem2048Ctrl } from "./coms/ComItem2048Ctrl";

export interface UI2048Data {

}

export class UI2048Ctrl extends BaseViewCtrl<UI2048View, UI2048Data> {
	private _row = 5;
	private _col = 5;
	private _cellBgs: fgui.GImage[][] = [];
	private _cells: ComItem2048Ctrl[][] = [];

	override onAdded() {
		this.addMessage(UI2048Msg.OnBtnBackClick, this.onBtnBackClick);
	}

	override onEnable() {
		this.resetChessboard();
		this.addCell(3);
	}

	private onBtnBackClick() {
		this.showView(ViewID.UILittleGameView);
		this.removeSelf();
	}

	private resetChessboard() {
		const { _row, _col, _cells, _cellBgs, view } = this;
		const [size, space] = [104, 10];
		const [startX, startY] = [-((_row - 1) * size + (_row - 1) * space) / 2, -((_col - 1) * size + (_col - 1) * space) / 2];
		for (let i = 0; i < _row; i++) {
			_cells[i] = _cells[i] || [];
			_cells[i].forEach(this.recoverCell, this);
			_cells[i].length = 0;

			const rowArr = _cellBgs[i] = _cellBgs[i] || [];
			for (let j = 0; j < _col; j++) {
				if (!rowArr[j]) {
					const cellBg = this.getCellBg();
					view.com_container.addChild(cellBg);
					cellBg.setXY(startX + i * 114, startY + j * 114);
					rowArr.push(cellBg);
				}
			}
		}
	}

	private addCell(addCnt: number) {
		const { _row, _col, _cells, _cellBgs, view } = this;
		const rowArr: number[] = [];
		const colArr: number[] = [];
		for (let i = 0; i < _row; i++) {
			for (let j = 0; j < _col; j++) {
				if (!_cells[i][j]) {
					rowArr.push(i);
					colArr.push(j);
				}
			}
		}
		if (rowArr.length < addCnt) return false;
		for (let i = 0; i < addCnt; i++) {
			const addIndex = MathUtil.RandomInt(0, rowArr.length - 1);
			const cell = this.getCell();
			cell.value = 2 ** MathUtil.RandomInt(0, 3);
			const bg = _cellBgs[rowArr[addIndex]][colArr[addIndex]];
			cell.view.setXY(bg.x, bg.y);
			view.com_container.addChild(cell.view);
			_cells[rowArr[addIndex]][colArr[addIndex]] = cell;
			rowArr.splice(addIndex, 1);
			colArr.splice(addIndex, 1);
		}
		return true;

	}

	private getCellBg() {
		const bg: fgui.GImage = Laya.Pool.getItemByCreateFun("Cell2048Bg", () => {
			const result = fgui.UIPackage.createObjectFromURL("ui://vx9zwserqjdo2c");
			result.setSize(104, 104);
			result.setPivot(0.5, 0.5, true);
			return result;
		});
		return bg;
	}

	private recoverCellBg(cellBg:fgui.GImage) {
		Laya.Pool.recover("Cell2048Bg", cellBg);
	}

	private getCell() {
		const cell: ComItem2048Ctrl = Laya.Pool.getItemByCreateFun("ComItem2048Ctrl", () => {
			const result = this.createView(ViewID.ComItem2048View);
			result.view.setPivot(0.5, 0.5, true);
			return result;
		});
		return cell;
	}

	private recoverCell(cell:ComItem2048Ctrl) {
		Laya.Pool.recover("ComItem2048Ctrl", cell);
	}
}