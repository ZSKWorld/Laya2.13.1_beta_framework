import { resolve } from "path";

export const __workname = process.cwd();

export const ResDir = resolve(__workname, "bin/res");
export const UiDir = resolve(__workname, "src/core/ui/ui");
export const ViewDir = resolve(__workname, "src/core/ui/view");
export const ResPathPath = resolve(__workname, "src/core/common/ResPath.ts");
export const ResPathDeclarePath = resolve(__workname, "libs_game/res_path.d.ts");
export const ResPathPathNoExt = resolve(__workname, "src/core/common/ResPath");
export const ViewIDPath = resolve(__workname, "src/core/ui/core/ViewID.ts");
export const ViewIDDeclarePath = resolve(__workname, "libs_game/view_id.d.ts");
export const BaseViewCtrlPath = resolve(__workname, "src/core/ui/core/BaseViewCtrl.ts");
export const BaseProxyPath = resolve(__workname, "src/core/ui/core/BaseProxy.ts");
export const ViewRegisterPath = resolve(__workname, "src/core/ui/core/ViewRegister.ts");
export const xlsxDir = resolve(__workname, "../策划");
export const CfgDataPath = resolve(__workname, "bin/res/config/Config.json");
export const CfgDir = resolve(__workname, "src/core/config");

export const NetDir = resolve(__workname, "src/core/net");
export const CMDInterfaceDir = resolve(NetDir, "interface/cmd");
export const NotifyInterfaceDir = resolve(NetDir, "interface/notify");
export const NetServicePath = resolve(NetDir, "NetService.ts");
export const NetServiceDeclarePath = resolve(NetDir, "INetService.d.ts");
export const ServiceObjPath = resolve(NetDir, "ServiceObj.ts");
export const NetCMDPath = resolve(NetDir, "enum/NetCMD.ts");
export const NetNotifyPath = resolve(NetDir, "enum/NetNotify.ts");
export const UserDataDir = resolve(__workname, "src/core/userData");
export const UserDataInterfaceDir = resolve(UserDataDir, "interface");
export const UserDataEventPath = resolve(UserDataDir, "UserDataEvent.ts");

//---------------------------------------------Server
export const Server_NotifyInterfaceDir = resolve(__workname, "src/core/controller/interface/notify");
export const Server_NetNotifyPath = resolve(__workname, "src/core/enum/NetNotify.ts");

//---------------------------------------------PaiHun
export const PaiHun_ExcelDir = resolve(__workname, "excel");
export const PaiHun_ExcelDeclarePath = resolve(__workname, "Lua/LuaScript/Net/ExcelDeclare.lua");
export const PaiHun_ProtoPath = resolve(__workname, "proto/client.proto");
export const PaiHun_ProtoReplacePath = resolve(__dirname, "../../data/proto_replace.jsonc");
export const PaiHun_ProtoTsDeclarePath = resolve(__workname, "Lua/LuaScript/Net/proto.d.ts");
export const PaiHun_ProtoLuaDeclarePath = resolve(__workname, "Lua/LuaScript/Net/ProtoDeclare.lua");

export const TS_MODIFY_TIP = "/** This script is generated automatically, Please do not any modify! */\n";
export const LUA_MODIFY_TIP = "---This script is generated automatically, Please do not any modify!\n";