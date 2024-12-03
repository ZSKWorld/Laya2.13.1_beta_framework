import os
import speech_recognition as sr
from moviepy.editor import VideoFileClip

# 选择视频文件
# 视频文件路径或文件名
video_path = "C:\\Users\\Administrator\\Desktop\\video.mp4"

# 使用VideoFileClip函数创建一个VideoFileClip对象，用于处理视频文件
video = VideoFileClip(video_path)

# 使用audio方法从VideoFileClip对象中提取音频
audio = video.audio
index = 0
start = 0
duration = audio.duration
while start < duration:
    end = min(start + 21 * 60, duration)
    sub_audio = audio.subclip(start, end)
    sub_audio.write_audiofile("C:\\Users\\Administrator\\Desktop\\audio" + str(index) + ".mp3")
    start = end
    index = index + 1
    # sub_audio.close()
# audio.write_audiofile("C:\\Users\\Administrator\\Desktop\\audio.mp3")
video.close()
audio.close()

# sub_audio1 = audio.subclip(0, 960)
# sub_audio2 = audio.subclip(960)
# # 使用write_audiofile方法将提取的音频保存到文件中
# # 音频文件输出路径或文件名
# audio_path1 = "C:\\Users\\Administrator\\Desktop\\audio.mp3"
# audio_path2 = "C:\\Users\\Administrator\\Desktop\\audio2.mp3"
# sub_audio1.write_audiofile(audio_path1)
# sub_audio2.write_audiofile(audio_path2)

# # 创建Recognizer对象，用于处理音频文件
# recognizer = sr.Recognizer()

# # 使用Recognizer对象的record方法读取音频文件
# with sr.AudioFile(audio_path) as source:
#     audio = recognizer.record(source)

# # 语音识别
# text = recognizer.recognize_google(audio, language='zh-CN')
# print(text)

# # 清理临时文件
# os.remove(audio_path)
