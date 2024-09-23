import { Observer } from "../../../../game/event/Observer";
import { MathUtil } from "../../../../game/math/MathUtil";
import { BaseViewCtrl } from "../../../core/BaseViewCtrl";
import { UI2048Msg, UI2048View } from "../view/UI2048View";
import { ComItem2048Ctrl } from "./coms/ComItem2048Ctrl";

const enum MoveDir {
	Up,
	Bottom,
	Left,
	Right,
}

const enum ChessboardEvent {
	GameOver = "Chessboard2048_GameOver",
}

class Chessboard2048 extends Observer {
	private _row: number;
	private _col: number;
	private _cellBgs: fgui.GImage[][];
	private _cells: ComItem2048Ctrl[][];
	private _container: fgui.GComponent;
	private _moving: boolean = false;
	private _emptyPos: Laya.Vector2 = new Laya.Vector2();
	private _tempCells: ComItem2048Ctrl[] = [];
	constructor(row: number, col: number, container: fgui.GComponent) {
		super();
		this._row = row;
		this._col = col;
		this._container = container;
		this._cellBgs = new Array(row).fill(null);
		this._cells = new Array(row).fill(null);
		this._cellBgs.forEach((_, i) => this._cellBgs[i] = new Array(col).fill(null));
		this._cells.forEach((_, i) => this._cells[i] = new Array(col).fill(null));
	}

	reset() {
		this.clear();
		this.createChessboardBg();
	}

	addRandom(addCnt: number) {
		const { _row, _col, _cells, _cellBgs, _container } = this;
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
			const random = Math.random();
			const value = random < 2 / 3 ? 1 : 2;
			const cell = ComItem2048Ctrl.create(value, rowArr[addIndex], colArr[addIndex]);
			const bg = _cellBgs[rowArr[addIndex]][colArr[addIndex]];
			cell.view.setXY(bg.x, bg.y);
			_container.addChild(cell.view);
			_cells[rowArr[addIndex]][colArr[addIndex]] = cell;
			rowArr.splice(addIndex, 1);
			colArr.splice(addIndex, 1);
		}
		return true;
	}

	move(dir: MoveDir) {
		const { _row, _col, _moving } = this;
		if (_moving) return false;
		let i = 0, j = 0, moveSuccess = false;
		switch (dir) {
			case MoveDir.Up:
				for (i = 0; i < _row; i++)
					for (j = 0; j < _col; j++)
						moveSuccess = this.checkMove(i, j, dir) || moveSuccess;
				break;
			case MoveDir.Bottom:
				for (i = _row - 1; i >= 0; i--)
					for (j = 0; j < _col; j++)
						moveSuccess = this.checkMove(i, j, dir) || moveSuccess;
				break;
			case MoveDir.Left:
				for (i = 0; i < _row; i++)
					for (j = 0; j < _col; j++)
						moveSuccess = this.checkMove(i, j, dir) || moveSuccess;
				break;
			case MoveDir.Right:
				for (i = 0; i < _row; i++)
					for (j = _col - 1; j >= 0; j--)
						moveSuccess = this.checkMove(i, j, dir) || moveSuccess;
				break;
		}
		this._moving = this._moving || moveSuccess;
		this._moving && Laya.timer.once(100, this, this.onMoveCompleted);
		this._moving && Laya.timer.once(20, this, this.addRandom, [1]);
		return moveSuccess;
	}

	clear() {
		this._moving = false;
		this._tempCells.forEach(v => ComItem2048Ctrl.recover(v));
		this._tempCells.length = 0;
		Laya.timer.clearAll(this);
		this._cellBgs.forEach(v => v.forEach((v1, i) => {
			this.recoverCellBg(v1);
			v[i] = null;
		}));
		this._cells.forEach(v => v.forEach((v1, i) => {
			ComItem2048Ctrl.recover(v1);
			v[i] = null;
		}));
	}

	private addAt(row: number, col: number, value: number) {
		const { _cells, _cellBgs, _container } = this;
		const oldCell = _cells[row][col];
		if (oldCell) throw "add repeated";
		const bg = _cellBgs[row][col];
		const cell = ComItem2048Ctrl.create(value, row, col);
		cell.view.setXY(bg.x, bg.y);
		_container.addChild(cell.view);
		_cells[row][col] = cell;
	}

	/** 找一个移动方向上最远的空格子 */
	private findEmpty(row: number, col: number, dir: MoveDir) {
		const { _row, _col, _cells, _emptyPos } = this;
		_emptyPos.setValue(-1, -1);
		switch (dir) {
			case MoveDir.Up: for (let i = row - 1; i >= 0; i--) if (!_cells[i][col]) _emptyPos.setValue(i, col); else break; break;
			case MoveDir.Bottom: for (let i = row + 1; i < _row; i++) if (!_cells[i][col]) _emptyPos.setValue(i, col); else break; break;
			case MoveDir.Left: for (let i = col - 1; i >= 0; i--) if (!_cells[row][i]) _emptyPos.setValue(row, i); else break; break;
			case MoveDir.Right: for (let i = col + 1; i < _col; i++) if (!_cells[row][i]) _emptyPos.setValue(row, i); else break; break;
			default: return null;
		}
		if (_emptyPos.x == -1) return null;
		return _emptyPos;
	}

	private findMergeCell(row: number, col: number, dir: MoveDir) {
		const { _row, _col, _cells } = this;
		switch (dir) {
			case MoveDir.Up: for (let i = row - 1; i >= 0; i--) if (_cells[i][col]) return _cells[i][col]; break;
			case MoveDir.Bottom: for (let i = row + 1; i < _row; i++) if (_cells[i][col]) return _cells[i][col]; break;
			case MoveDir.Left: for (let i = col - 1; i >= 0; i--) if (_cells[row][i]) return _cells[row][i]; break;
			case MoveDir.Right: for (let i = col + 1; i < _col; i++) if (_cells[row][i]) return _cells[row][i]; break;
			default: return null;
		}
		return null;
	}

	private checkMove(row: number, col: number, dir: MoveDir) {
		const { _cells, _cellBgs, _tempCells } = this;
		let moveSuccess = false;
		const cell = _cells[row][col];
		if (!cell) return moveSuccess;
		const mergeCell = this.findMergeCell(row, col, dir);
		if (mergeCell && mergeCell.mergeValue == 0 && mergeCell.value == cell.value) {
			moveSuccess = true;
			_cells[row][col] = null;
			const { x, y } = _cellBgs[mergeCell.row][mergeCell.col];
			mergeCell.moveTarget(x, y, mergeCell.value + cell.value);
			cell.setPos(mergeCell.row, mergeCell.col);
			cell.moveTarget(x, y, -1);
			_tempCells.push(cell);
		} else {
			const empty = this.findEmpty(row, col, dir);
			if (empty) {
				moveSuccess = true;
				_cells[row][col] = null;
				const { x, y } = empty;
				_cells[x][y] = cell;
				cell.setPos(x, y);
				cell.moveTarget(_cellBgs[x][y].x, _cellBgs[x][y].y, 0);
			}
		}
		return moveSuccess;
	}

	private onMoveCompleted() {
		this._tempCells.length = 0;
		this._moving = false;
		if (this.checkOver())
			this.dispatch(ChessboardEvent.GameOver);
	}

	private checkOver() {
		const { _row, _col, _cells } = this;
		for (let i = 0; i < _row; i++) {
			for (let j = 0; j < _col; j++) {
				const cell = _cells[i][j]
				if (!cell) return false;
				if (_cells[i - 1] && _cells[i - 1][j] && _cells[i - 1][j].value == cell.value) return false;
				if (_cells[i + 1] && _cells[i + 1][j] && _cells[i + 1][j].value == cell.value) return false;
				if (_cells[i][j - 1] && _cells[i][j - 1].value == cell.value) return false;
				if (_cells[i][j + 1] && _cells[i][j + 1].value == cell.value) return false;
			}
		}
		return true;
	}

	private createChessboardBg() {
		const { _row, _col, _cellBgs, _container } = this;
		const [size, space, cellWidth] = [104, 10, 114];
		const [cw, ch] = [(_col * size + (_col - 1) * space), (_row * size + (_row - 1) * space)];
		_container.setSize(cw, ch);
		const [offsetX, offsetY] = [cw / 2, ch / 2];
		const [startX, startY] = [-((_col - 1) * size + (_col - 1) * space) / 2 + offsetX, -((_row - 1) * size + (_row - 1) * space) / 2 + offsetY];
		_cellBgs.forEach((v, i) => v.forEach((v1, j) => {
			if (!v1) {
				const cellBg = this.getCellBg();
				_container.addChild(cellBg);
				cellBg.setXY(startX + j * cellWidth, startY + i * cellWidth);
				v[j] = cellBg;
			}
		}));
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

	private recoverCellBg(item: fgui.GImage) {
		if (!item) return;
		item.removeFromParent();
		Laya.Pool.recover("Cell2048Bg", item);
	}
}

export interface UI2048Data {

}

export class UI2048Ctrl extends BaseViewCtrl<UI2048View, UI2048Data> {
	private _chessboard: Chessboard2048;

	override onAdded() {
		this.addMessage(UI2048Msg.OnBtnBackClick, this.onBtnBackClick);
		this.addMessage(UI2048Msg.OnBtnResetClick, this.onBtnResetClick);
		this._chessboard = new Chessboard2048(3, 3, this.view.com_container);
	}

	override onEnable() {
		this.onBtnResetClick();
	}

	private onBtnBackClick() {
		this.showView(ViewID.UILittleGameView);
		this.removeSelf();
		this._chessboard.clear();
	}

	private onBtnResetClick() {
		this._chessboard.reset();
		this._chessboard.addRandom(5);
	}

	@ViewKeyEvent(KeyEventType.KeyUp, Laya.Keyboard.UP)
	@ViewKeyEvent(KeyEventType.KeyUp, Laya.Keyboard.DOWN)
	@ViewKeyEvent(KeyEventType.KeyUp, Laya.Keyboard.LEFT)
	@ViewKeyEvent(KeyEventType.KeyUp, Laya.Keyboard.RIGHT)
	private onArrowKeyDown(e: Laya.Event) {
		switch (e.keyCode) {
			case Laya.Keyboard.UP: this._chessboard.move(MoveDir.Up); break;
			case Laya.Keyboard.DOWN: this._chessboard.move(MoveDir.Bottom); break;
			case Laya.Keyboard.LEFT: this._chessboard.move(MoveDir.Left); break;
			case Laya.Keyboard.RIGHT: this._chessboard.move(MoveDir.Right); break;
			default: return;
		}
	}

	@RegisterEvent(ChessboardEvent.GameOver)
	private onGameOver() {
		ShowConfirm("游戏结束", "游戏结束");
	}
}