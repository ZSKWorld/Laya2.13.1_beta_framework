import { BaseViewCtrl } from "../../core/BaseViewCtrl";
import { UIUtility } from "../../tool/UIUtility";
import { ChatMsg, RenderChatMsgView } from "../../view/PkgMain/Renders/RenderChatMsgView";
import { UIChatMsg, UIChatView } from "../../view/PkgMain/UIChatView";

export interface UIChatData {

}

export class UIChatCtrl extends BaseViewCtrl<UIChatView, UIChatData>{
  private _msgs: ChatMsg[] = [
    { uid: "", text: "asdk卢卡斯京东方垃圾收到付款了阿萨" },
    { uid: "", text: "破次数多了" },
    { uid: "", text: "看到阿基尔访问交流奥斯陆冬季福娃欸附件，的发票未发觉囧士大夫开始。司搭街坊评委覅上岛咖啡看见你" },
    { uid: "", text: "的时刻弗兰克喷雾剂覅位科技局马克思的佛山短发女生快递费！！！！" },
    { uid: "", text: "撒旦发射点JFK了？" },
    { uid: "", text: "2165大发是否sd4f64sdf1w6e4f8e" },
  ];

  override onAwake(): void {
    this.addMessageListener(UIChatMsg.OnBtnSendClick, this.onBtnSendClick);
    this.addMessageListener(UIChatMsg.OnBtnBackClick, this.onBtnBackClick);
  }

  override onEnable(): void {
    this.refreshMsgList();
  }

  override onDisable(): void {

  }

  override onDestroy(): void {

  }

  private refreshFriendList() {

  }

  private refreshMsgList() {
    UIUtility.setList(this.view.ListMsg, this._msgs.length, this, this.onMsgListRenderer);
  }

  private onMsgListRenderer(index: number, item: RenderChatMsgView) {
    if (index % 2 == 0) this._msgs[ index ].uid = this.userData.uid;
    item.refresh(this._msgs[ index ]);
  }

  private onBtnSendClick(): void {
    const str = "sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5sdf5as3d5时等非阿瑟东发啊是5对方6啊手动阀手动阀31♯方三顿饭四5";
    const temp = str.substring(0, (Math.random() * str.length) << 0);
    if (!temp) return;
    this._msgs.push({ uid: "", text: temp });
    this.refreshMsgList();
    this.view.ListMsg.scrollToView(this._msgs.length - 1, true);
  }

  private onBtnBackClick(): void {
    this.removeSelf();
  }

}