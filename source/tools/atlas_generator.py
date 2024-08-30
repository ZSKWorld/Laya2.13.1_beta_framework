import sys
import json
import os
import shutil
import time
import hashlib
import random

from tqdm import tqdm
from PIL import ImageDraw
from PIL import Image as ImageModule
from PIL.Image import Image
from PIL.Image import open as openImage

class Rect:
    _pool: list = []

    def create(x: int = 0, y: int = 0, w: int = 0, h: int = 0):
        if len(Rect._pool) > 0:
            return Rect._pool.pop().setXY(x, y).setSize(w, h)
        else:
            return Rect(x, y, w, h)

    def recover(rect):
        rect.reset()
        Rect._pool.append(rect)

    def __init__(self, x: int = 0, y: int = 0, w: int = 0, h: int = 0) -> None:
        self._x: int = x
        self._y: int = y
        self._w: int = w
        self._h: int = h

    def get_x(self): return self._x
    def set_x(self, value: int): self._x = max(value, 0)

    def get_y(self): return self._y
    def set_y(self, value: int): self._y = max(value, 0)

    def get_w(self): return self._w
    def set_w(self, value: int): self._w = max(value, 0)

    def get_h(self): return self._h
    def set_h(self, value: int): self._h = max(value, 0)

    def xMax(self): return self.get_x() + self.get_w()
    def yMax(self): return self.get_y() + self.get_h()

    def setXY(self, x: int = 0, y: int = 0):
        self.set_x(x)
        self.set_y(y)
        return self

    def setSize(self, w: int = 0, h: int = 0):
        self.set_w(w)
        self.set_h(h)
        return self

    def overlaps(self, other):
        return not (self.get_x() >= other.xMax() or self.xMax() <= other.get_x() or self.get_y() >= other.yMax() or self.yMax() <= other.get_y())

    def getOverlap(self, other, out):
        if out:
            out.reset()
        else:
            out = Rect.create()
        if self.overlaps(other):
            ltX = max(self.get_x(), other.get_x())
            ltY = max(self.get_y(), other.get_y())
            rbX = min(self.xMax(), other.xMax())
            rbY = min(self.yMax(), other.yMax())
            out.setXY(ltX, ltY).setSize(rbX - ltX, rbY - ltY)
        return out

    def contain(self, other):
        return self.get_x() <= other.get_x() and self.xMax() >= other.xMax() and self.get_y() <= other.get_y() and self.yMax() >= other.yMax()

    def reset(self):
        self.set_x(0)
        self.set_y(0)
        self.set_w(0)
        self.set_h(0)

TmpRect0 = Rect()
TmpRect1 = Rect()
TmpRect2 = Rect()

class FileInfo:
    _pool: list = []

    def create(filePath: str):
        if len(FileInfo._pool) > 0:
            return FileInfo._pool.pop().init(filePath)
        else:
            return FileInfo().init(filePath)

    def recover(info):
        FileInfo._pool.append(info.reset())
    
    def init(self, filePath:str):
        # 带后缀的名字
        self.extName = os.path.basename(filePath)
        # 不带后缀的名字
        self.name = filePath.split(".")[0]
        self.filePath = filePath
        self.fileBuffer = open(filePath, "rb")
        self.md5 = hashlib.md5(self.fileBuffer.read()).hexdigest()
        return self
    
    def reset(self):
        self.extName = ""
        self.name = ""
        self.filePath = ""
        if self.fileBuffer:
            self.fileBuffer.close()
        self.fileBuffer = None
        self.md5 = ""
        return self

class TextureInfo(FileInfo):
    _pool: list = []

    def create(texPath: str, cutEmpty:bool = False):
        if len(TextureInfo._pool) > 0:
            return TextureInfo._pool.pop().init(texPath, cutEmpty)
        else:
            return TextureInfo().init(texPath, cutEmpty)

    def recover(info):
        TextureInfo._pool.append(info.reset())

    def get_w(self): return self.texture.width
    def get_h(self): return self.texture.height

    def xMax(self): return self.x + self.get_w()
    def yMax(self): return self.y + self.get_h()

    def init(self, texPath: str, cutEmpty:bool = False):
        super().init(texPath)
        self.x = 0
        self.y = 0
        self.idx = 0
        self.texture:Image = None
        self.sourceW = 0
        self.sourceH = 0
        self.spriteSourceX = 0
        self.spriteSourceY = 0
        self.cutEmpty = cutEmpty
        return self

    def setXY(self, x: int = 0, y: int = 0):
        self.x = x
        self.y = y
        return self

    def createTex(self):
        if self.texture: return
        self.texture = openImage(self.fileBuffer)
        self.fileBuffer = None

        self.sourceW = self.texture.width
        self.sourceH = self.texture.height
        
        if self.cutEmpty:
            bbox = self.texture.getbbox()
            if bbox:
                if bbox[0] > 0 or bbox[1] or bbox[2] < self.texture.width or bbox[3] < self.texture.height:
                    cropTex = self.texture.crop(bbox)
                    self.texture.close()
                    self.texture = cropTex
                    self.spriteSourceX = bbox[0]
                    self.spriteSourceY = bbox[1]

    def reset(self):
        super().reset()
        self.x = 0
        self.y = 0
        self.idx = 0
        if self.texture:
            self.texture.close()
        self.texture = None
        self.sourceW = 0
        self.sourceH = 0
        self.spriteSourceX = 0
        self.spriteSourceY = 0
        self.cutEmpty = False
        return self

class AtlasGrid:
    _pool: list = []

    def create(maxSize: int, maxSingleSize: int = 256, padding: int = 2, power2: bool = False, squared: bool = False):
        if len(AtlasGrid._pool) > 0:
            return AtlasGrid._pool.pop().init(maxSize, maxSingleSize, padding, power2, squared)
        else:
            return AtlasGrid().init(maxSize, maxSingleSize, padding, power2, squared)

    def recover(grid):
        grid.reset()
        AtlasGrid._pool.append(grid)

    def __init__(self) -> None:
        self.maxSize = 1024
        self.maxSingleSize = 256
        self.padding = 2
        self.power2 = False
        self.squared = False
        self.useArea = 0
        self.curArea: Rect = Rect.create()
        self.freeAreas: list[Rect] = list()
        self.splitAreas: list[Rect] = list()
        self.textures: list[TextureInfo] = list()

    def init(self, maxSize: int, maxSingleSize: int = 256, padding: int = 2, power2: bool = False, squared: bool = False):
        self.maxSize = maxSize
        self.maxSingleSize = maxSingleSize
        self.padding = padding
        self.power2 = power2
        self.squared = squared
        self.useArea = 0
        self.freeAreas.append(Rect.create(0, 0, self.maxSize, self.maxSize))
        return self

    def insert(self, tex: TextureInfo):
        padding, curArea, freeAreas, splitAreas = self.padding, self.curArea, self.freeAreas, self.splitAreas
        index = self._getFreeAreaIndex(tex.get_w(), tex.get_h())
        targetArea = None
        if index != -1:
            targetArea = freeAreas[index]
        if targetArea:
            texWithPadding = TmpRect0.setXY(targetArea.get_x(), targetArea.get_y()).setSize(
                tex.get_w() + padding, tex.get_h() + padding)
            count = 0
            for i in range(len(freeAreas) - 1, -1, -1):
                v = freeAreas[i]
                if v.overlaps(texWithPadding):
                    count = 0
                    if texWithPadding.get_x() - v.get_x() > 0:
                        count = count + 1
                        splitAreas.append(Rect.create(v.get_x(), v.get_y(
                        ), texWithPadding.get_x() - v.get_x(), v.get_h()))
                    if v.xMax() - texWithPadding.xMax() > 0:
                        count = count + 1
                        splitAreas.append(Rect.create(texWithPadding.xMax(
                        ), v.get_y(), v.xMax() - texWithPadding.xMax(), v.get_h()))
                    if texWithPadding.get_y() - v.get_y() > 0:
                        count = count + 1
                        splitAreas.append(Rect.create(v.get_x(), v.get_y(
                        ), v.get_w(), texWithPadding.get_y() - v.get_y()))
                    if v.yMax() - texWithPadding.yMax() > 0:
                        count = count + 1
                        splitAreas.append(Rect.create(
                            v.get_x(), texWithPadding.yMax(), v.get_w(), v.yMax() - texWithPadding.yMax()))
                    if count == 0 and (texWithPadding.get_w() < v.get_w() or texWithPadding.get_h() < v.get_h()):
                        splitAreas.append(v)
                    else:
                        Rect.recover(v)
                    topOfStack = freeAreas.pop()
                    if i < len(freeAreas):
                        freeAreas[i] = topOfStack
            self._filterSelfSubAreas(splitAreas)
            for v in splitAreas:
                freeAreas.append(v)
            splitAreas.clear()
            tex.setXY(texWithPadding.get_x(), texWithPadding.get_y())
            self.textures.append(tex)

            useW = tex.get_w() + min(self.maxSize - tex.xMax(), padding)
            useH = tex.get_h() + min(self.maxSize - tex.yMax(), padding)
            self.useArea = self.useArea + useW * useH

            curArea.setSize(max(texWithPadding.get_x() + tex.get_w(), curArea.get_w()),
                            max(texWithPadding.get_y() + tex.get_h(), curArea.get_h()))
            return True
        return False

    def useRatio(self):
        totalArea = self.maxSize * self.maxSize
        return self.useArea / totalArea * 100

    def reset(self):
        self.maxSize = 1024
        self.maxSingleSize = 256
        self.padding = 2
        self.power2 = False
        self.squared = False
        self.useArea = 0
        self.curArea.reset()
        for v in self.freeAreas:
            Rect.recover(v)
        self.freeAreas.clear()
        self.textures.clear()

    def _getFreeAreaIndex(self, width: int, height: int):
        padding, maxSize, curArea, freeAreas = self.padding, self.maxSize, self.curArea, self.freeAreas
        curW, curH = curArea.get_w(), curArea.get_h()
        index, minPower2Area, minArea, squareRate = -1, 1e8, 1e8, 0
        paddedW, paddedH = width + padding, height + padding
        for i in range(len(freeAreas) - 1, -1, -1):
            free = freeAreas[i]
            widthEnough = paddedW <= free.get_w() if free.xMax() < maxSize else width <= free.get_w()
            heigthEnough = paddedH <= free.get_h() if free.yMax() < maxSize else height <= free.get_h()
            if widthEnough and heigthEnough:
                newCurW = max(free.get_x() + width, curW)
                newCurH = max(free.get_y() + height, curH)

                newMinPower2Area = self._getNearestPower2Area(newCurW, newCurH)
                newMinArea = newCurW * newCurH
                newSquareRate = min(newCurW, newCurH) / max(newCurW, newCurH)

                if newMinPower2Area < minPower2Area:
                    index = i
                    minPower2Area = newMinPower2Area
                    minArea = newMinArea
                    squareRate = newSquareRate
                elif newMinPower2Area == minPower2Area:
                    if newMinArea < minArea:
                        index = i
                        minPower2Area = newMinPower2Area
                        minArea = newMinArea
                        squareRate = newSquareRate
                    elif newMinArea == minArea:
                        if newSquareRate > squareRate:
                            index = i
                            minPower2Area = newMinPower2Area
                            minArea = newMinArea
                            squareRate = newSquareRate
                        elif newSquareRate == squareRate:
                            if free.get_x() < freeAreas[index].get_x():
                                index = i
                                minPower2Area = newMinPower2Area
                                minArea = newMinArea
                                squareRate = newSquareRate
                            elif free.get_x() == freeAreas[index].get_x():
                                if free.get_y() < freeAreas[index].get_y():
                                    index = i
                                    minPower2Area = newMinPower2Area
                                    minArea = newMinArea
                                    squareRate = newSquareRate
        return index

    def _getNearestPower2Area(self, width:int, height:int):
        return self._getNearestPower2(width) * self._getNearestPower2(height)

    def _getNearestPower2(self, value:int):
        num = 1
        while value > num:
            num = num * 2
        return num

    def _filterSelfSubAreas(self, areas: list[Rect]):
        for i in range(len(areas) - 1, -1, -1):
            filtered = areas[i]
            for j in range(len(areas) - 1, -1, -1):
                if i != j:
                    area = areas[j]
                    if area.contain(filtered):
                        Rect.recover(filtered)
                        topOfStack = areas.pop()
                        if i < len(areas):
                            areas[i] = topOfStack
                        break

class AtlasConfig:
    def __init__(self) -> None:
        self.name = ""
        self.prefix = ""
        self.outputDir = ""
        self.maxSize = 1024
        self.maxSingleSize = 256
        self.padding = 2
        self.power2 = False
        self.squared = False
        self.cutTexEmpty = False
        self.cutAtlasEmpty = False

class AtlasGenerator:
    _inst = None

    def Inst():
        if (not AtlasGenerator._inst):
            AtlasGenerator._inst = AtlasGenerator()
        return AtlasGenerator._inst

    def __init__(self) -> None:
        self.atlasGrids: list[AtlasGrid] = list()

    def packAtlas(self, texInfos:list[TextureInfo], config: AtlasConfig):
        canPack = True
        atlasGrids = self.atlasGrids

        for v in texInfos: v.createTex()
        texInfos.sort(key=lambda x: x.get_w(), reverse=True)

        for ti in tqdm(range(len(texInfos)), unit="img", desc="计算图集位置", colour="#22FF22"):
            texInfo = texInfos[ti]
            if texInfo.get_w() > config.maxSize or texInfo.get_h() > config.maxSize:
                print(colorStr("贴图尺寸超过图集最大尺寸，打包失败！！！", 196))
                canPack = False
                break
            if texInfo.get_w() > config.maxSingleSize or texInfo.get_h() > config.maxSingleSize:
                print(colorStr("贴图尺寸超过单图最大尺寸，打包失败！！！", 196))
                canPack = False
                break
            success = False
            for i in range(len(atlasGrids)):
                success = atlasGrids[i].insert(texInfo)
                if success:
                    texInfo.idx = i
                    break
            if not success:
                grid = AtlasGrid()
                grid.init(config.maxSize, config.maxSingleSize, config.padding, config.power2, config.squared)
                success = grid.insert(texInfo)
                if success:
                    texInfo.idx = len(atlasGrids)
                else:
                    print(colorStr("贴图打入图集失败：" + texInfo.filePath, 196))
                    canPack = False
                    break
                atlasGrids.append(grid)

        if canPack:
            createDir(config.outputDir)
            atlasCfg = {}
            frames = atlasCfg["frames"] = {}
            meta = atlasCfg["meta"] = {"image":"", "prefix":config.prefix}
            # totalUseRatio = 0
            for i in tqdm(range(len(atlasGrids)), unit="img", desc="生成图集", colour="#00CC33"):
                meta["image"] = meta["image"] + (config.name + ".png" if not i else ("," + config.name + str(i) + ".png"))
                image = ImageModule.new("RGBA", (config.maxSize, config.maxSize))
                # totalUseRatio = totalUseRatio + atlasGrids[i].useRatio()
                for texInfo in atlasGrids[i].textures:
                    frames[texInfo.extName] = {
                        "frame":{"x": texInfo.x, "y": texInfo.y, "w": texInfo.get_w(), "h": texInfo.get_h(), "idx": i},
                        "sourceSize":{"w":texInfo.sourceW, "h":texInfo.sourceH},
                        "spriteSourceSize":{"x":texInfo.spriteSourceX, "y":texInfo.spriteSourceY}
                    }
                    # drawImageBorder(texInfo.texture)
                    image.paste(texInfo.texture, (texInfo.x, texInfo.y))
                # drawAreasBorder(image, atlasGrids[i].freeAreas)
                if config.cutAtlasEmpty:
                    bbox = image.getbbox()
                    imageCut = image.crop((0, 0, bbox[2], bbox[3]))
                    image.close()
                    image = imageCut
                image.save(os.path.join(config.outputDir, config.name + ("" if i == 0 else str(i)) + ".png"))
                image.close()

            # print(colorStr("图集总利用率：", 226) + colorStr(str(int(totalUseRatio / len(atlasGrids) * 100) / 100) + "%", 46))

            with open(os.path.join(config.outputDir, config.name + ".atlas"), "w+") as file:
                file.write(json.dumps(atlasCfg))

        for v in atlasGrids:
            AtlasGrid.recover(v)
        atlasGrids.clear()
        return canPack

def quickSort(arr, compare_func):
    """快排"""
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if compare_func(x, pivot) < 0]
    middle = [x for x in arr if compare_func(x, pivot) == 0]
    right = [x for x in arr if compare_func(x, pivot) > 0]
    return quickSort(left, compare_func) + middle + quickSort(right, compare_func)

def createDir(dir:str):
    if (os.path.exists(dir) == False):
        os.makedirs(dir)

def rectifyPath(path:str):
    return path.replace("\\", "/")

def drawImageBorder(image: Image):
    """为图片添加边框"""
    w, h = image.width, image.height
    draw = ImageDraw.Draw(image, image.mode)
    color = (46 if image.mode == "P" else (255, 0, 0, 255))
    draw.polygon((0, 0, w-1, 0), fill=color)
    draw.polygon((0, 0, 0, h-1), fill=color)
    draw.polygon((w-1, 0, w-1, h-1), fill=color)
    draw.polygon((0, h-1, w-1, h-1), fill=color)

def drawAreasBorder(image:Image, areas:list[Rect]):
    draw = ImageDraw.Draw(image, image.mode)
    color = (46 if image.mode == "P" else (0,255,0,255))
    for free in areas:
        if free.xMax() - 1 > 0 and free.yMax() - 1 > 0:
            draw.rectangle((free.get_x(), free.get_y(), free.xMax() - 1, free.yMax() - 1), None, color)

def colorStr(text:str, color:int = 255):
    color = min(max(color, 0), 255)
    return "\033[38;5;" + str(color) + "m" + text + "\033[0m"

argv  = sys.argv
argv.pop(0)
# 只记录 rec 版本
makeRecOnly = "-r" in argv or "-R" in argv

config = AtlasConfig()
config.maxSize = 1024
config.maxSingleSize = 1024
config.padding = 2
config.power2 = False
config.squared = False
config.cutTexEmpty = True
config.cutAtlasEmpty = True

inputRootDir = "../../laya/assets"
outputRootDir = rectifyPath(os.path.join("../../bin", ""))
outputAtlasDir = rectifyPath(os.path.join(outputRootDir, "res/atlas"))
recFilePath = rectifyPath(os.path.join(outputAtlasDir, ".rec"))
unpackFilePath = rectifyPath(os.path.join("../../bin", "unpack.json"))

unpackData:list[str]
if os.path.exists(unpackFilePath):
    with open(unpackFilePath, "r", encoding="utf-8") as file:
        unpackData = json.loads(file.read())
else:
    unpackData = list()

# 要打包得贴图后缀名
packTexSuffixs = ["png", "jpg"]
# 排除得目录
exincludeDirs = ["设计稿"]

def isUnpackDir(dirRelPath:str):
    unpackDir = False
    while dirRelPath and not unpackDir:
        unpackDir = dirRelPath in unpackData
        dirRelPath = os.path.dirname(dirRelPath)
    return unpackDir

def pack_dir_atlas(dir:str, recData:dict[str, dict[str, str]]):
    dirRelPath = rectifyPath(os.path.relpath(dir, inputRootDir))
    if dirRelPath in exincludeDirs: return

    dirName = os.path.basename(dir)
    unpackDir = isUnpackDir(dirRelPath)

    subDirs:list[str] = list()
    packTexInfos:list[TextureInfo] = list()
    unpackFileInfos:list[FileInfo] = list()

    oldPackRec = recData.get("__pack_textures")
    oldUnpackRec = recData.get("__unpack_files")
    newPackRec:dict[str, str] = dict()
    newUnpackRec:dict[str, str] = dict()

    for item in os.listdir(dir):
        item_path = rectifyPath(os.path.join(dir, item))
        if os.path.isdir(item_path):
            subDirs.append(item_path)
        elif os.path.isfile(item_path):
            item_relpath = rectifyPath(os.path.relpath(item_path, inputRootDir))
            if (item_path.split(".")[-1] in packTexSuffixs) and (not unpackDir) and (item_relpath not in unpackData):
                texInfo = TextureInfo.create(item_path, config.cutTexEmpty)
                packTexInfos.append(texInfo)
                newPackRec[texInfo.extName] = texInfo.md5
            else:
                fileInfo = FileInfo.create(item_path)
                if not oldUnpackRec or not oldUnpackRec.get(fileInfo.extName) or oldUnpackRec.get(fileInfo.extName) != fileInfo.md5:
                    unpackFileInfos.append(fileInfo)
                newUnpackRec[fileInfo.extName] = fileInfo.md5

    if makeRecOnly:
        print(colorStr("rec 搜集 => ", 243) + colorStr(dirRelPath, 247))
    else:
        needPackAtlas = True if not oldPackRec or len(oldPackRec.items()) != len(packTexInfos) else False
        for v in packTexInfos:
            if not needPackAtlas:
                needPackAtlas = oldPackRec.get(v.extName) != v.md5
        needPackAtlas = needPackAtlas and len(packTexInfos) > 0

        unpackFileCnt = len(unpackFileInfos)
        if needPackAtlas or unpackFileCnt > 0: 
            print("\n打包 => " + dirRelPath)
        else:
            print(colorStr("无需打包 => ", 243) + colorStr(dirRelPath, 247))
        if unpackFileCnt > 0:
            for i in tqdm(range(unpackFileCnt), unit="img", desc="复制不打包文件", colour="#66FF33"):
                v = unpackFileInfos[i]
                destPath = rectifyPath(os.path.join(outputRootDir, os.path.relpath(v.filePath, inputRootDir)))
                createDir(os.path.dirname(destPath))
                shutil.copy(v.filePath, destPath)

        if needPackAtlas:
            config.name = dirName or "root"
            config.prefix = dirRelPath + "/"
            config.outputDir = rectifyPath(os.path.join(outputAtlasDir, os.path.relpath(os.path.dirname(dir), inputRootDir)))
            if not AtlasGenerator.Inst().packAtlas(packTexInfos, config): 
                newPackRec = oldPackRec

        if needPackAtlas or unpackFileCnt > 0:
            print(" ")

    if len(newPackRec.items()) > 0: recData["__pack_textures"] = newPackRec
    else: recData.pop("__pack_textures", "")
    if len(newUnpackRec.items()) > 0: recData["__unpack_files"] = newUnpackRec
    else: recData.pop("__unpack_files", "")

    for v in packTexInfos: TextureInfo.recover(v)
    packTexInfos.clear()

    for v in unpackFileInfos: FileInfo.recover(v)
    unpackFileInfos.clear()

    for v in subDirs:
        subDirRelPath = rectifyPath(os.path.relpath(v, inputRootDir))
        if subDirRelPath in exincludeDirs: continue

        subDirName = os.path.basename(v)
        subRecData = recData.get(subDirName)
        if not subRecData:
            subRecData = recData[subDirName] = dict()
        pack_dir_atlas(v, subRecData)

def pack_atlas(subDir:str|list[str] = ""):
    if isinstance(subDir, list):
        for v in subDir:
            if v: pack_atlas(v)
        return
    recData: dict[str, dict[str, str]]
    if not makeRecOnly and os.path.exists(recFilePath):
        with open(recFilePath, "r", encoding="utf-8") as file:
            recData = json.loads(file.read())
    else:
        recData = dict()
    
    dirRecData = recData
    if subDir:
        subDirs = subDir.split("/")
        for v in subDirs:
            if v:
                dirRecData[v] = dirRecData.get(v) or dict()
                dirRecData = dirRecData[v]
    pack_dir_atlas(rectifyPath(os.path.join(inputRootDir, subDir)), dirRecData)
    with open(recFilePath, "w+", encoding="utf-8") as file:
        file.write(json.dumps(recData))

# for i in range(0, 256):
#     if i % 10 == 0: print()
#     print(colorStr(str(i), i), end=" ")
# input("")

try:
    timestart = time.time()
    pack_atlas("")
    if makeRecOnly:
        input("\nrec 搜集完毕！！！用时：" + str(int((time.time() - timestart) * 1e4) / 1e4) + "秒")
    else:
        input("\n打包完毕！！！用时：" + str(int((time.time() - timestart) * 1e4) / 1e4) + "秒")
except Exception as err:
    print(err)
    input(colorStr("报错啦，联系开发人员", 196))
