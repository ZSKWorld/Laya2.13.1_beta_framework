

enum MusicState {
    None,
    Start,
    During,
    End
}
class AudioInfo {
    audio: Howl;
    audio_id: number; // soundmgr中的自增参数
    priority: number;
    fix_volume: number = 1;
    loops: number = 1; // 循环次数
    complete: Laya.Handler;
    constructor(audio: Howl, audio_id: number, priority: number, loops: number = 1) {
        this.audio = audio;
        this.audio_id = audio_id;
        this.priority = priority;
        this.loops = loops;
        let self = this;
        let func = function () {
            self.onFinished();
        }
        let end = function () {
            self.onAudioEnd();
        }
        this.audio.on('end', end);
        // 如果加载或播放报错 直接return
        this.audio.once('loaderror', func);
        this.audio.once('playerror', func);
    }
    onAudioEnd() {
        if (this.loops == -1) {
            //-1循环无数次
            return;
        }
        this.loops--;
        if (this.loops > 0) {
            this.audio.play();
        } else {
            this.onFinished();
        }
    }

    stop() {
        this.audio.stop();
        this.audio.unload();
        this.audio = null;
    }
    onFinished() {
        if (this.complete) {
            this.complete.run();
            this.complete.recover();
            this.complete = null;
        }
        SoundMgr.StopAudio(this.audio_id);

    }
}
export class SoundMgr {

    private static _audio_list: Array<AudioInfo> = []; // priority有序的audio,priority相同时 后来的排前面

    private static _audioVolume: number = 0;
    private static _audioMuted: boolean = false;

    private static _music: Howl = null;
    private static _playing_music: string = '';
    private static _playing_music_volume: number = 0;

    private static _music_volume: number = 1;
    private static _musicMuted: boolean = false;
    private static _current_music: string = '';


    private static _music_state: MusicState = MusicState.None;
    private static _music_state_starttime: number = 0;
    private static _music_state_lifetime: number = 0;

    private static _character_all_volume: number = 1;
    private static _character_all_mute: boolean = false;
    private static _map_character_mute: Object = {};
    private static _map_character_volume: Object = {};

    private static _bgm_light: boolean = false;

    static _audio_rate: number = 0.75;
    static _music_rate: number = 0.75;
    static _voice_rate: number = 0.8;

    private static voiceChangeHandles: Laya.Handler[] = [];

    static get suffix(): string { return Laya.Browser.window['conch'] ? '.ogg' : '.mp3' };

    static get music_name(): string {
        // if (!this._current_music) {
        return '';
        // } else {
        // 	let name = '';
        // 	cfg.audio.bgm.forEach((data) => {
        // 		if (data.path == this._current_music) {
        // 			name = data[ 'name_' + GameMgr.client_language ];
        // 		}
        // 	})
        // 	return name;
        // }
    }

    static init() {
        let s_audiov: string = Laya.LocalStorage.getItem('audioVolume');
        if (!s_audiov || s_audiov == '') this._audioVolume = 0.5;
        else {
            let v: number = parseFloat(s_audiov);
            if (v < 0) v = 0;
            else if (v > 1) v = 1;
            this._audioVolume = v;
        }
        let s_musicv: string = Laya.LocalStorage.getItem('musicVolume');
        if (!s_musicv || s_musicv == '') this._music_volume = 0.5;
        else {
            let v: number = parseFloat(s_musicv);
            if (v < 0) v = 0;
            else if (v > 1) v = 1;
            this._music_volume = v;
        }
        let s_yuyinv: string = Laya.LocalStorage.getItem('yuyinVolume');
        if (!s_yuyinv || s_yuyinv == '') this._character_all_volume = 0.5;
        else {
            let v: number = parseFloat(s_yuyinv);
            if (v < 0) v = 0;
            else if (v > 1) v = 1;
            this._character_all_volume = v;
        }

        ///Finish3/28///

        let s_audiomute: string = Laya.LocalStorage.getItem('audioMute');
        if (!s_audiomute || s_audiomute == '') this._audioMuted = false;
        else {
            this._audioMuted = s_audiomute == 'true';
        }

        let s_musicmute: string = Laya.LocalStorage.getItem('musicMute');
        if (!s_musicmute || s_musicmute == '') this.musicMuted = false;
        else {
            this.musicMuted = s_musicmute == 'true';
        }


        ///Finish3/28///

        let s_yuyinmute: string = Laya.LocalStorage.getItem('yuyinMute');
        if (!s_yuyinmute || s_yuyinmute == '') this._character_all_mute = false;
        else {
            this._character_all_mute = s_yuyinmute == 'true';
        }


        this._map_character_mute = {};
        this._map_character_volume = {};

        Laya.timer.frameLoop(1, this, this._update);
    }

    static PlayAudio(audioID: number, loop: number = 1, volume: number = 1) {
        return null;
        // if (this._audioMuted || this._audioVolume == 0) return null;
        // let data = cfg && cfg.audio && cfg.audio.audio && cfg.audio.audio.get(audioID);
        // if (!data) {
        // 	return null;
        // }
        // let _id: number = this._audio_id;
        // this._audio_id++;

        // let _s: string = this.suffix;
        // let _audio = new Howl({
        // 	src: game.ResourceVersion.formatURL(game.Tools.localResSrc(data.path + _s)),
        // 	autoplay: true,
        // 	volume: volume * this._audioVolume * this._audio_rate,
        // 	loop: loop == -1 ? true : false,
        // })
        // let info = new AudioInfo(_audio, this._audio_id, 0, loop);
        // info.fix_volume = volume * this._audioVolume;
        // for (let i = 0; i < this._audio_list.length; i++) {
        // 	if (info.priority >= this._audio_list[ i ].priority) {
        // 		this._audio_list.splice(i, 0, info);
        // 		return info;
        // 	}
        // }
        // this._audio_list.push(info);
        // return info;
    }

    static PlayAudioByCustomInfo(obj) {
        if (obj.data || obj.parent.data) {
            let data = obj.data || obj.parent.data;
            let list_d = data.split('|');
            let p = {};
            for (let i: number = 0; i < list_d.length; i++) {
                let v = list_d[i].split(':');
                if (v[0] == 'audio') {
                    SoundMgr.PlayAudio(Number(v[1]));
                    return;
                }
            }
        }
        SoundMgr.PlayAudio(1);
    }

    static PlayVoice(voiceID: number, volume: number = 1, complete?: Laya.Handler) {
        return null;
        // if (volume <= 0) return null;
        // let data = cfg.voice.sound.get(voiceID);
        // if (!data) {
        // 	return null;
        // }
        // let _id: number = this._audio_id;
        // this._audio_id++;

        // let _s: string = this.suffix;
        // let _audio = new Howl({
        // 	src: game.ResourceVersion.formatURL(game.Tools.localResSrc('audio/sound/' + data.path + _s)),
        // 	autoplay: true,
        // 	// volume: volume * this._audioVolume * this._voice_rate,
        // 	volume: volume * this._voice_rate
        // })
        // let info = new AudioInfo(_audio, this._audio_id, 10);
        // // info.fix_volume = volume * this._audioVolume;
        // info.fix_volume = volume;
        // info.complete = complete;
        // for (let i = 0; i < this._audio_list.length; i++) {
        // 	if (info.priority >= this._audio_list[ i ].priority) {
        // 		this._audio_list.splice(i, 0, info);
        // 		return info;
        // 	}
        // }
        // this._audio_list.push(info);
        // return info;
    }
    private static _RemoveAudio(id: number): void {
        for (let i: number = 0; i < this._audio_list.length; i++) {
            if (this._audio_list[i]['audio_id'] == id) {
                var tmp = this._audio_list[i];
                tmp.stop();
                this._audio_list.splice(i--, 1);
                break;
            }
        }
    }

    private static _RemoveAudioAfterDelay(id: number, delay: number): void {
        for (let i: number = 0; i < this._audio_list.length; i++) {
            if (this._audio_list[i]['audio_id'] == id) {
                var tmp = this._audio_list[i];
                this._audio_list.splice(i--, 1);
                if (tmp && tmp.audio) {
                    let start_volume = tmp.audio._volume;
                    let start_time: number = Laya.timer.currTimer;
                    Laya.timer.frameLoop(1, tmp, () => {
                        let t: number = Laya.timer.currTimer - start_time;
                        let rate: number = t / delay;
                        if (rate >= 1) {
                            rate = 1;
                        }
                        tmp.audio.volume(start_volume - rate * start_volume);
                        if (rate >= 1) {
                            Laya.timer.clearAll(tmp);
                            tmp.stop();
                        }
                    });
                }
                break;
            }
        }
    }

    static StopAudio(id: number, delay: number = 0): void {
        if (delay == 0) {
            this._RemoveAudio(id);
        } else {
            this._RemoveAudioAfterDelay(id, delay);
        }
    }

    //只处理音乐的播放，不判断是否需要静音
    static PlayMusic(audio: string, tween_time: number = 1000): boolean {
        this._current_music = audio;
        this.onMusicChange(tween_time);
        return true;
    }

    static StopMusic(tween_time: number = 1000) {
        this._current_music = '';
        if (this._music) {
            if (tween_time <= 0) {
                this._music.unload();
                this._music = null;
                this._music_state = MusicState.None;
            } else {
                this._music_state = MusicState.End;
                this._music_state_starttime = Laya.timer.currTimer;
                this._music_state_lifetime = tween_time;
            }
        }

        this.onMusicChange(tween_time);
    }

    // 直接播放音效
    static PlayAudioDirect(audioPath: string, loop: number = 1, volume: number = 1, priority: number = 0) {
        return null;
        // if (this._audioMuted || this._audioVolume == 0) return null;
        // let _id: number = this._audio_id;
        // this._audio_id++;

        // let _s: string = this.suffix;
        // let _audio = new Howl({
        // 	src: game.ResourceVersion.formatURL(game.Tools.localResSrc(audioPath)),
        // 	autoplay: true,
        // 	volume: volume * this._audioVolume
        // })
        // let info = new AudioInfo(_audio, this._audio_id, priority);
        // info.fix_volume = volume * this._audioVolume;

        // for (let i = 0; i < this._audio_list.length; i++) {
        // 	if (info.priority > this._audio_list[ i ].priority) {
        // 		this._audio_list.splice(i, 0, info);
        // 		return this._audio_id;
        // 	}
        // }
        // this._audio_list.push(info);
        // return this._audio_id;
    }

    static setCVvolume(id: number, CVidVolume: number) {
        CVidVolume = CVidVolume < 0 ? 0 : CVidVolume > 1 ? 1 : CVidVolume;
        this._map_character_volume[id] = CVidVolume;
        Laya.LocalStorage.setItem('characterVolume' + id, CVidVolume.toString());
    }

    static getCVvolume(id: number): number {
        if (!this._map_character_volume.hasOwnProperty(id.toString())) {
            let vol: string = Laya.LocalStorage.getItem('characterVolume' + id);
            if (vol && vol != '') {
                this._map_character_volume[id] = parseFloat(vol);
            } else {
                this._map_character_volume[id] = 1;
            }
        }
        return this._map_character_volume[id];
    }

    static setCVmute(id: number, CVidMute: boolean) {
        this._map_character_mute[id] = CVidMute ? 'true' : 'false';
        Laya.LocalStorage.setItem('characterMute' + id, CVidMute ? 'true' : 'false');
    }

    static getCVmute(id: number) {
        if (!this._map_character_mute.hasOwnProperty(id.toString())) {
            let mute: string = Laya.LocalStorage.getItem('characterMute' + id);
            if (mute && mute != '') {
                this._map_character_mute[id] = mute;
            } else {
                this._map_character_mute[id] = 'false';
            }
        }
        return this._map_character_mute[id] == 'true';
    }
    ///Finish3/28///

    static set audioVolume(rate: number) {
        rate = rate < 0 ? 0 : rate > 1 ? 1 : rate;
        this._audioVolume = rate;
        Laya.LocalStorage.setItem('audioVolume', rate.toString());
    }

    static get audioVolume(): number {
        return this._audioVolume;
    }

    static set musicVolume(rate: number) {
        this._music_volume = rate;
        Laya.LocalStorage.setItem('musicVolume', rate.toString());
        if (this._music && this._music_state == MusicState.During && this._playing_music == this._current_music) {
            this._playing_music_volume = rate;
        }
    }

    static get musicVolume(): number {
        return this._music_volume;
    }


    ///Finish3/28///

    static set musicMuted(val: boolean) {
        this._musicMuted = val;
        Laya.LocalStorage.setItem('musicMute', val ? 'true' : 'false');

        // if (!BgmListMgr.initalized) return;
        // if (val) {
        // 	BgmListMgr.stopBgm();
        // } else {
        // 	if (BgmListMgr.playing_bgm == '') {
        // 		if (FightMgr.gaming) {
        // 			BgmListMgr.PlayPKBgm();
        // 		} else {
        // 			BgmListMgr.PlayLobbyBgm();
        // 		}
        // 	}
        // }
    }

    static get musicMuted(): boolean {
        return this._musicMuted;
    }

    static set audioMuted(val: boolean) {
        this._audioMuted = val;
        Laya.LocalStorage.setItem('audioMute', val ? 'true' : 'false');
    }

    static get audioMuted(): boolean {
        return this._audioMuted;
    }

    static get yuyinVolume(): number {
        return this._character_all_volume;
    }

    static set yuyinVolume(rate: number) {
        this._character_all_volume = rate;
        Laya.LocalStorage.setItem('yuyinVolume', rate.toString());
    }

    static set yuyinMuted(val: boolean) {
        this._character_all_mute = val;
        Laya.LocalStorage.setItem('yuyinMute', val ? 'true' : 'false');
    }

    static get yuyinMuted(): boolean {
        return this._character_all_mute;
    }

    static refresh_music_volume(light: boolean) {
        if (this._music && this._music_state == MusicState.During) {
            this._bgm_light = light;
        }
    }

    static onMusicChange(tween_time: number = 1000) {
        let need2play_music = this._current_music ? this._current_music : '';
        let vol = this.musicVolume ? this.musicVolume : 0;

        if (this._music) {
            this._music.unload();
            this._music = null;
        }

        // if (need2play_music) {
        // 	this._music = new Howl({
        // 		src: game.ResourceVersion.formatURL(game.Tools.localResSrc('audio/' + need2play_music)),
        // 		loop: false,
        // 		autoplay: true,
        // 		onend: function () {
        // 			SoundMgr._current_music = '';
        // 			SoundMgr._playing_music = '';
        // 			BgmListMgr.onBgmPlayOver();
        // 		}
        // 	});

        // 	BgmListMgr.onBgmChange(need2play_music);

        // 	if (this._music) {
        // 		this._playing_music = need2play_music;
        // 		this._playing_music_volume = vol;
        // 		this._music.volume(0);
        // 		this._music_state = EMusicState.start;
        // 		this._music_state_starttime = Laya.timer.currTimer;
        // 		this._music_state_lifetime = tween_time;
        // 	}
        // } else {
        // 	BgmListMgr.onBgmChange(need2play_music);
        // }

        //音乐状态改变时分发监听事件
        for (let i = 0; i < SoundMgr.voiceChangeHandles.length; i++) {
            SoundMgr.voiceChangeHandles[i] && SoundMgr.voiceChangeHandles[i].run();
        }
    }

    static registMusicChangeHandle(onMusicChangeHandle: Laya.Handler) {
        SoundMgr.voiceChangeHandles.push(onMusicChangeHandle);
    }

    static unRegistMusicChangeHandle(onMusicChangeHandle: Laya.Handler) {
        for (let i = 0; i < SoundMgr.voiceChangeHandles.length; i++) {
            if (SoundMgr.voiceChangeHandles[i] == onMusicChangeHandle) {
                SoundMgr.voiceChangeHandles.splice(i, 1);
                break;
            }
        }
    }

    private static _update() {
        if (this._music && this._music_state != MusicState.None) {
            let _playing_music_volume: number = this._playing_music_volume * this._music_rate;
            let t: number = Laya.timer.currTimer - this._music_state_starttime;
            if (this._music_state == MusicState.Start) {
                if (t >= this._music_state_lifetime) {
                    this._music_state = MusicState.During;
                    this._music.volume(_playing_music_volume);
                } else {
                    let r: number = t / this._music_state_lifetime;
                    this._music.volume(_playing_music_volume * r);
                }
                if (this._bgm_light) this._music.volume(this._music.volume() * 0.1);
            } else if (this._music_state == MusicState.End) {
                if (t >= this._music_state_lifetime) {
                    this._music_state = MusicState.None;
                    this._music.unload();
                    this._music = null;
                } else {
                    let r: number = t / this._music_state_lifetime;
                    this._music.volume(_playing_music_volume * (1 - r));
                }
                if (this._bgm_light) this._music.volume(this._music.volume() * 0.1);
            } else {
                if (this._bgm_light) this._music.volume(_playing_music_volume * 0.1);
                else this._music.volume(_playing_music_volume);
            }
        }

    }
}