import time
import os
import random
import hashlib
import multiprocessing

# start_time=time.time()
# count = 0
# def get_page(str):
#     print('正在下载：',str)
#     global count
#     count = count + 1
#     time.sleep(count)
    
#     print('下载成功：',str)

# name_list=['xiaozi','aa','bb','cc','dd','ee','ff','gg','hh','ii','jj','kk','ll','mm','nn','oo','pp']
# # 实例化一个线程池
# pool=Pool(4)
# # 第一个参数是要阻塞的函数，第二个参数是可迭代对象
# # 如果第一个参数即阻塞函数有返回值，那么就会通过map返回回去
# pool.imap(get_page,name_list)
# pool.close()
# pool.join()
# end_time=time.time()

# print(f'消耗时间secode:{end_time-start_time}')

#------------------------------------------------------------

# start_time=time.time()


def getMD5(arr, filepath:str):
    with open(filepath, "rb") as file:
        arr.append(hashlib.md5(file.read()).hexdigest())

def getDirFiles(dir:str):
    for dirpath, dirnames, filenames in os.walk(dir):
        filepath = ""
        for item in filenames:
            filepath = dirpath + "\\" + item
            allFiles.append(filepath)
            # getMD5(filepath)

# getDirFiles("E:\\study\\IT\\Projects\\Laya\\Laya2.13.1_beta_framework\\source")
# print(len(allFiles), len(md5s), time.time() - start_time)

#------------------------------------------------------------
 
if __name__ == "__main__":
    start_time=time.time()
    allFiles = []
    # md5s = []
    md5s = multiprocessing.Manager().list()
    getDirFiles("E:\\study\\IT\\Projects\\resources\\paihunTex")

    pool = multiprocessing.Pool(processes = 3) # 维持执行的进程总数为processes，当一个进程执行完毕后会添加新的进程进去
    for item in allFiles:
        pool.apply_async(getMD5, (md5s, item, ))
    pool.close() # 调用join之前，先调用close函数，否则会出错
    pool.join()   

    # for item in allFiles:
    #     getMD5(md5s, item)
    print("Sub-process(es) done.", time.time() - start_time, len(allFiles), len(md5s)) # 执行完close后不会有新的进程加入到pool,join函数等待所有子进程结束


