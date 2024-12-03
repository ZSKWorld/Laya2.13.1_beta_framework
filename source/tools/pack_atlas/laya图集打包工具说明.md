## laya图集打包工具说明

安装 tqdm 库： **`pip install tqdm`**
安装 pillow 库：**`pip install pillow`**

>脚本运行参数：
**`-r`** 重新生成rec对比文件
**`-f`** 强制打包，忽略rec版本号

>图集打包配置 **`AtlasConfig`**:
**`maxSize`** 图集最大尺寸
**`maxSingleSize`** 最大单图尺寸
**`padding`** 图集贴图间隔
**`pwoer2`** 幂次图集输出尺寸，暂未使用
**`squared`** 图集输入尽可能是正方形，暂未使用
**`cutTexEmpty`** 是否裁剪原图空白区域
**`cutAtlasEmpty`** 是否裁剪图集空白区域

>几个主要目录，根据脚本位置要适当修改：
**`inputRootDir`** 打包图集资源根目录，assets
**`outputRootDir`** 输出根目录，bin
**`outputAtlasDir`** 图集输出目录，res/atlas
**`recFilePath`** 版本对比文件路径
**`unpackFilePath`** 不打包记录文件路径
**`exincludeDirs`** 不需要处理得文件夹，如：【设计稿】

```ts 
打包方法 pack_atlas 参数是资源根目录下得文件夹相对路径
可以是单个路径或者路径数组，不填参数则打包根目录下所有图集

//无参，打包input目录下所有图集
pack_atlas() 
//单个字符串路径，只打包chs_t文件夹得图集
pack_atlas("chs_t") 
//字符串路径数组，打包数组内所有文件夹得图集
pack_atlas(["chs_t", "myres"]) 
```

