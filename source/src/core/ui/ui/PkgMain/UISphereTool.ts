/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BtnCheck from "./BtnCheck";
import CmbDongFu from "./CmbDongFu";

export default class UISphereTool extends fgui.GComponent {

	public ctrlState:fgui.Controller;
	public c1:fgui.Controller;
	public BtnBg:fgui.GGraph;
	public BtnClearLog:fgui.GButton;
	public BtnHFJL:fgui.GButton;
	public BtnCreate:fgui.GButton;
	public BtnClear:fgui.GButton;
	public BtnPercent:BtnCheck;
	public Ipt0:fgui.GTextInput;
	public Ipt1:fgui.GTextInput;
	public Ipt2:fgui.GTextInput;
	public Ipt3:fgui.GTextInput;
	public Ipt4:fgui.GTextInput;
	public Ipt5:fgui.GTextInput;
	public Ipt6:fgui.GTextInput;
	public Ipt7:fgui.GTextInput;
	public Ipt8:fgui.GTextInput;
	public Ipt9:fgui.GTextInput;
	public Ipt10:fgui.GTextInput;
	public Ipt11:fgui.GTextInput;
	public Ipt12:fgui.GTextInput;
	public Ipt13:fgui.GTextInput;
	public Ipt14:fgui.GTextInput;
	public Ipt15:fgui.GTextInput;
	public Ipt16:fgui.GTextInput;
	public Ipt17:fgui.GTextInput;
	public Ipt18:fgui.GTextInput;
	public Ipt19:fgui.GTextInput;
	public Ipt20:fgui.GTextInput;
	public Ipt21:fgui.GTextInput;
	public Ipt22:fgui.GTextInput;
	public Ipt23:fgui.GTextInput;
	public Ipt24:fgui.GTextInput;
	public Ipt25:fgui.GTextInput;
	public Ipt26:fgui.GTextInput;
	public Ipt27:fgui.GTextInput;
	public Ipt28:fgui.GTextInput;
	public BtnCheck0:BtnCheck;
	public BtnCheck1:BtnCheck;
	public BtnCheck2:BtnCheck;
	public BtnCheck3:BtnCheck;
	public BtnCheck4:BtnCheck;
	public BtnCheck5:BtnCheck;
	public BtnCheck6:BtnCheck;
	public BtnCheck7:BtnCheck;
	public BtnCheck8:BtnCheck;
	public BtnCheck9:BtnCheck;
	public BtnCheck10:BtnCheck;
	public BtnCheck11:BtnCheck;
	public BtnCheck12:BtnCheck;
	public BtnCheck13:BtnCheck;
	public BtnCheck14:BtnCheck;
	public BtnCheck15:BtnCheck;
	public BtnCheck16:BtnCheck;
	public BtnCheck17:BtnCheck;
	public BtnCheck18:BtnCheck;
	public BtnCheck19:BtnCheck;
	public BtnCheck20:BtnCheck;
	public BtnCheck21:BtnCheck;
	public BtnCheck22:BtnCheck;
	public BtnCheck23:BtnCheck;
	public BtnCheck24:BtnCheck;
	public BtnCheck25:BtnCheck;
	public BtnCheck26:BtnCheck;
	public BtnCheck27:BtnCheck;
	public BtnCheck28:BtnCheck;
	public Ipt31:fgui.GTextInput;
	public Ipt32:fgui.GTextInput;
	public BtnCheck31:BtnCheck;
	public BtnCheck32:BtnCheck;
	public BtnAdd:fgui.GButton;
	public BtnSubmit:fgui.GButton;
	public BtnRemove:fgui.GButton;
	public BtnRemoveAll:fgui.GButton;
	public TxtContent:fgui.GRichTextField;
	public CmbItem:CmbDongFu;
	public Ipt30:fgui.GTextInput;
	public Ipt29:fgui.GTextInput;
	public static URL:string = "ui://vith2b66e3vt1v";

	public static createInstance():UISphereTool {
		return <UISphereTool>(fgui.UIPackage.createObject("PkgMain", "UISphereTool"));
	}

	protected override onConstruct():void {
		this.ctrlState = this.getControllerAt(0);
		this.c1 = this.getControllerAt(1);
		this.BtnBg = <fgui.GGraph>(this.getChildAt(0));
		this.BtnClearLog = <fgui.GButton>(this.getChildAt(1));
		this.BtnHFJL = <fgui.GButton>(this.getChildAt(2));
		this.BtnCreate = <fgui.GButton>(this.getChildAt(8));
		this.BtnClear = <fgui.GButton>(this.getChildAt(9));
		this.BtnPercent = <BtnCheck>(this.getChildAt(10));
		this.Ipt0 = <fgui.GTextInput>(this.getChildAt(69));
		this.Ipt1 = <fgui.GTextInput>(this.getChildAt(70));
		this.Ipt2 = <fgui.GTextInput>(this.getChildAt(71));
		this.Ipt3 = <fgui.GTextInput>(this.getChildAt(72));
		this.Ipt4 = <fgui.GTextInput>(this.getChildAt(73));
		this.Ipt5 = <fgui.GTextInput>(this.getChildAt(74));
		this.Ipt6 = <fgui.GTextInput>(this.getChildAt(75));
		this.Ipt7 = <fgui.GTextInput>(this.getChildAt(76));
		this.Ipt8 = <fgui.GTextInput>(this.getChildAt(77));
		this.Ipt9 = <fgui.GTextInput>(this.getChildAt(78));
		this.Ipt10 = <fgui.GTextInput>(this.getChildAt(79));
		this.Ipt11 = <fgui.GTextInput>(this.getChildAt(80));
		this.Ipt12 = <fgui.GTextInput>(this.getChildAt(81));
		this.Ipt13 = <fgui.GTextInput>(this.getChildAt(82));
		this.Ipt14 = <fgui.GTextInput>(this.getChildAt(83));
		this.Ipt15 = <fgui.GTextInput>(this.getChildAt(84));
		this.Ipt16 = <fgui.GTextInput>(this.getChildAt(85));
		this.Ipt17 = <fgui.GTextInput>(this.getChildAt(86));
		this.Ipt18 = <fgui.GTextInput>(this.getChildAt(87));
		this.Ipt19 = <fgui.GTextInput>(this.getChildAt(88));
		this.Ipt20 = <fgui.GTextInput>(this.getChildAt(89));
		this.Ipt21 = <fgui.GTextInput>(this.getChildAt(90));
		this.Ipt22 = <fgui.GTextInput>(this.getChildAt(91));
		this.Ipt23 = <fgui.GTextInput>(this.getChildAt(92));
		this.Ipt24 = <fgui.GTextInput>(this.getChildAt(93));
		this.Ipt25 = <fgui.GTextInput>(this.getChildAt(94));
		this.Ipt26 = <fgui.GTextInput>(this.getChildAt(95));
		this.Ipt27 = <fgui.GTextInput>(this.getChildAt(96));
		this.Ipt28 = <fgui.GTextInput>(this.getChildAt(97));
		this.BtnCheck0 = <BtnCheck>(this.getChildAt(98));
		this.BtnCheck1 = <BtnCheck>(this.getChildAt(99));
		this.BtnCheck2 = <BtnCheck>(this.getChildAt(100));
		this.BtnCheck3 = <BtnCheck>(this.getChildAt(101));
		this.BtnCheck4 = <BtnCheck>(this.getChildAt(102));
		this.BtnCheck5 = <BtnCheck>(this.getChildAt(103));
		this.BtnCheck6 = <BtnCheck>(this.getChildAt(104));
		this.BtnCheck7 = <BtnCheck>(this.getChildAt(105));
		this.BtnCheck8 = <BtnCheck>(this.getChildAt(106));
		this.BtnCheck9 = <BtnCheck>(this.getChildAt(107));
		this.BtnCheck10 = <BtnCheck>(this.getChildAt(108));
		this.BtnCheck11 = <BtnCheck>(this.getChildAt(109));
		this.BtnCheck12 = <BtnCheck>(this.getChildAt(110));
		this.BtnCheck13 = <BtnCheck>(this.getChildAt(111));
		this.BtnCheck14 = <BtnCheck>(this.getChildAt(112));
		this.BtnCheck15 = <BtnCheck>(this.getChildAt(113));
		this.BtnCheck16 = <BtnCheck>(this.getChildAt(114));
		this.BtnCheck17 = <BtnCheck>(this.getChildAt(115));
		this.BtnCheck18 = <BtnCheck>(this.getChildAt(116));
		this.BtnCheck19 = <BtnCheck>(this.getChildAt(117));
		this.BtnCheck20 = <BtnCheck>(this.getChildAt(118));
		this.BtnCheck21 = <BtnCheck>(this.getChildAt(119));
		this.BtnCheck22 = <BtnCheck>(this.getChildAt(120));
		this.BtnCheck23 = <BtnCheck>(this.getChildAt(121));
		this.BtnCheck24 = <BtnCheck>(this.getChildAt(122));
		this.BtnCheck25 = <BtnCheck>(this.getChildAt(123));
		this.BtnCheck26 = <BtnCheck>(this.getChildAt(124));
		this.BtnCheck27 = <BtnCheck>(this.getChildAt(125));
		this.BtnCheck28 = <BtnCheck>(this.getChildAt(126));
		this.Ipt31 = <fgui.GTextInput>(this.getChildAt(132));
		this.Ipt32 = <fgui.GTextInput>(this.getChildAt(133));
		this.BtnCheck31 = <BtnCheck>(this.getChildAt(134));
		this.BtnCheck32 = <BtnCheck>(this.getChildAt(135));
		this.BtnAdd = <fgui.GButton>(this.getChildAt(138));
		this.BtnSubmit = <fgui.GButton>(this.getChildAt(139));
		this.BtnRemove = <fgui.GButton>(this.getChildAt(140));
		this.BtnRemoveAll = <fgui.GButton>(this.getChildAt(141));
		this.TxtContent = <fgui.GRichTextField>(this.getChildAt(144));
		this.CmbItem = <CmbDongFu>(this.getChildAt(146));
		this.Ipt30 = <fgui.GTextInput>(this.getChildAt(147));
		this.Ipt29 = <fgui.GTextInput>(this.getChildAt(149));
	}
}