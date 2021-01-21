<template>
  <div class="notations">
    <div class="player">
      <div
        class="player__header"
        :class="playerHeaderClass"
      >
        <div class="player__img player__img--absolute slider" :class="sliderClass">
          <button class="player__button player__button--absolute--nw playlist" @click="handleCollapse">
            <img src="http://physical-authority.surge.sh/imgs/icon/playlist.svg" alt="playlist-icon">
          </button>

          <button class="player__button player__button--absolute--center play" @click="handlePlay">
            <img v-show="!getCurrentPlayStatus" src="http://physical-authority.surge.sh/imgs/icon/play.svg" alt="play-icon">
            <img v-show="getCurrentPlayStatus" src="http://physical-authority.surge.sh/imgs/icon/pause.svg" alt="pause-icon">
          </button>

          <div
            class="slider__content"
            :style="{
              'transform': sliderContentTransform
            }"
          >
            <img
              v-for="imageItem in notationList"
              :key="`img${imageItem.detail.name}`"
              :src="imageItem.detail.image"
              class="img slider__img"
              alt="cover"
            >
          </div>
        </div>

        <div class="player__controls" :class="playControlClass">
          <button class="player__button back" @click="handlePre">
            <img class="img" src="http://physical-authority.surge.sh/imgs/icon/back.svg" alt="back-icon">
          </button>

          <transition name="opacity">
            <p class="player__context slider__context" @click="handleExpand">
              <strong class="slider__name">
                {{ getCurrentNotation.detail.author }}
              </strong>
              <span class="player__title slider__title">
                <span
                  :class="{
                    'text-wrap': getCurrentNotation.detail.name.length > 5
                  }"
                >{{ getCurrentNotation.detail.name }}</span>
              </span>
            </p>
          </transition>

          <button class="player__button next" @click="handleNext">
            <img class="img" src="http://physical-authority.surge.sh/imgs/icon/next.svg" alt="next-icon">
          </button>

          <div class="progress">
            <div class="progress__filled" />
          </div>
        </div>
      </div>
      <ul class="player__playlist list">
        <li v-for="(songItem, songIndex) in notationList" :key="`song${songIndex}`" class="player__song" @click="handlePlay(songIndex)">
          <img class="player__img img" src="http://physical-authority.surge.sh/imgs/1.jpg" alt="cover">
          <p class="player__context">
            <b class="player__song-name">{{ songItem.detail.name }}</b>
            <span class="flex">
              <span class="player__title">{{ songItem.detail.author }}</span>
              <span class="player__song-time" />
            </span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, computed } from 'vue';
import notations from '@/lib/notations.ts'
import { NotationItem } from '@/constant/types';
import { notationStore } from '@/store/modules/notation.ts';
import { isNumber } from 'lodash'

export default {
  setup() {
    const state = reactive<{
      currentTime: number;
      duration: number;
      notationList: Array<NotationItem>;
      playerHeaderClass: Array<string>;
      playControlClass: Array<string>;
      sliderClass: Array<string>;
    }>({
      currentTime: 0,
      duration: 0,
      notationList: notations,
      playerHeaderClass: [],
      playControlClass: [],
      sliderClass: [],
    })

    const handleExpand = () => {
      state.playerHeaderClass.push('open-header')
      state.playControlClass.push('move')
      state.sliderClass.push('open-slider')
    }

    const handleCollapse = () => {
      state.playerHeaderClass.pop()
      state.playControlClass.pop()
      state.sliderClass.pop()
    }

    const getCurrentNotation = computed(() => {
      return notationStore.getCurrentNotation
    });

    const getCurrentPlayStatus = computed(() => {
      return notationStore.getPlayStatus
    });

    const handleNext = () => {
      let nextIndex = notationStore.getCurrentNotationIndex + 1
      if (nextIndex === notations.length) {
        nextIndex = 0
      }
      notationStore.commitCurrentNotation(nextIndex)
    }

    const handlePre = () => {
      let preIndex = notationStore.getCurrentNotationIndex - 1
      if (preIndex === -1) {
        preIndex = 0
      }
      notationStore.commitCurrentNotation(preIndex)
    }

    const handlePlay = (index: number) => {
      if (isNumber(index)) {
        notationStore.playNotation(index)
        return
      }
      if (getCurrentPlayStatus.value) {
        notationStore.pauseNotation()
      } else {
        notationStore.playNotation(notationStore.getCurrentNotationIndex)
      }
    }

    const sliderContentTransform = computed(() => {
      const sliderWidth = 100
      const left = notationStore.getCurrentNotationIndex * sliderWidth
      return `translate3d(-${left}%, 0, 0)`
    })

    onMounted(() => {
      // add elements
      const bgBody = ['#e5e7e9', '#ff4545', '#f8ded3', '#ffc382', '#f5eda6', '#ffcbdc', '#dcf3f3'];
      const body = document.body;
      // eslint-disable-next-line
      const player = document.querySelector('.player') as any;
      // const playerHeader = player.querySelector('.player__header');
      // const playerControls = player.querySelector('.player__controls');
      const playerPlayList = player.querySelectorAll('.player__song');
      const playerSongs = player.querySelectorAll('.audio');

      // const playButton = player.querySelector('.play');
      // const nextButton = player.querySelector('.next');
      // const backButton = player.querySelector('.back');

      // const playlistButton = player.querySelector('.playlist');
      const slider = player.querySelector('.slider');
      const sliderContext = player.querySelector('.slider__context');
      const sliderName = sliderContext.querySelector('.slider__name');
      const sliderTitle = sliderContext.querySelector('.slider__title');
      const sliderContent = slider.querySelector('.slider__content');
      const sliderContentLength = playerPlayList.length - 1;
      const sliderWidth = 100;
      let left = 0;
      let count = 0;
      let song = playerSongs[count];
      let isPlay = false;
      // const pauseIcon = playButton.querySelector("img[alt = 'pause-icon']");
      // const playIcon = playButton.querySelector("img[alt = 'play-icon']");
      const progress = player.querySelector('.progress');
      // const progresFilled = progres.querySelector('.progres__filled');
      let isMove = false;

      function changeSliderContext() {
        // sliderContext.style.animationName = 'opacity';

        sliderName.textContent = playerPlayList[count].querySelector('.player__title').textContent;
        sliderTitle.textContent = playerPlayList[count].querySelector('.player__song-name').textContent;

        if (sliderName.textContent.length > 16) {
          const textWrap = document.createElement('span');
          textWrap.className = 'text-wrap';
          textWrap.innerHTML = sliderName.textContent + '   ' + sliderName.textContent;
          sliderName.innerHTML = '';
          sliderName.append(textWrap);
        }

        if (sliderTitle.textContent.length >= 18) {
          const textWrap = document.createElement('span');
          textWrap.className = 'text-wrap';
          textWrap.innerHTML = sliderTitle.textContent + '    ' + sliderTitle.textContent;
          sliderTitle.innerHTML = '';
          sliderTitle.append(textWrap);
        }
      }

      function changeBgBody() {
        body.style.backgroundColor = bgBody[count];
      }

      function selectSong() {
        song = playerSongs[count];

        for (const item of playerSongs) {
          if (item !== song) {
            item.pause();
            item.currentTime = 0;
          }
        }

        if (isPlay) song.play();
      }

      function next() {
        if (count === sliderContentLength) {
          return
        }

        left += sliderWidth;
        left = Math.min(left, (sliderContentLength) * sliderWidth);
        sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
        count++;

        changeSliderContext();
        changeBgBody();
        selectSong();
      }

      // function back() {
      //   if (count === 0) {
      //     return
      //   }
      //
      //   left -= sliderWidth;
      //   left = Math.max(0, left);
      //   sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
      //   count--;
      // }

      // function playSong() {
      //   if (song.paused) {
      //     song.play();
      //     // playIcon.style.display = 'none';
      //     // pauseIcon.style.display = 'block';
      //   } else {
      //     song.pause();
      //     isPlay = false;
      //     // playIcon.style.display = '';
      //     // pauseIcon.style.display = '';
      //   }
      // }

      function progressUpdate() {
        // const progressFilledWidth = (state.currentTime / state.duration) * 100 + '%';
        // progressFilled.style.width = progressFilledWidth;

        if (state.duration === state.currentTime) {
          next();
        }
        if (count === sliderContentLength && song.currentTime === song.duration) {
          // playIcon.style.display = 'block';
          // pauseIcon.style.display = '';
          isPlay = false;
        }
      }

      function scurb(e: MouseEvent) {
        // If we use e.offsetX, we have trouble setting the song time, when the mousemove is running
        const currentTime = ((e.clientX - progress.getBoundingClientRect().left) / progress.offsetWidth) * song.duration;
        song.currentTime = currentTime;
      }

      function durationSongs() {
        const min = state.duration / 60;
        let minStr = ''
        if (min < 10) {
          minStr = '0' + min;
        } else {
          minStr = '' + min
        }

        const sec = state.duration % 60;
        let secStr = ''
        if (sec < 10) {
          secStr = '0' + sec;
        } else {
          secStr = '' + sec;
        }

        const playerSongTime = `${minStr}:${secStr}`;
        player.querySelector('.player__song-time').append(playerSongTime);
      }

      // changeSliderContext();

      // add events
      // sliderContext.addEventListener('click', handleExpand);
      // sliderContext.addEventListener('animationend', () => {
      //   sliderContext.style.animationName = ''
      // });
      // playlistButton.addEventListener('click', handleCollapse);

      // nextButton.addEventListener('click', next);

      // backButton.addEventListener('click', () => {
      //   back();
      //   changeSliderContext();
      //   changeBgBody();
      //   selectSong();
      // });

      // playButton.addEventListener('click', () => {
      //   isPlay = true;
      //   playSong();
      // });

      playerSongs.forEach((song: { addEventListener: (arg0: string, arg1: { (): void; (): void }) => void }) => {
        song.addEventListener('loadeddata', durationSongs);
        song.addEventListener('timeupdate', progressUpdate);
      });

      progress.addEventListener('mousedown', (e: MouseEvent) => {
        scurb(e);
        isMove = true;
        song.muted = true;
      });

      document.addEventListener('mousemove', (e: MouseEvent) => isMove && scurb(e));

      document.addEventListener('mouseup', () => {
        isMove = false
        // song.muted = false;
      });

      document.ondragstart = () => {
        return false
      };
    })

    return {
      ...toRefs(state),
      sliderContentTransform,
      getCurrentNotation,
      getCurrentPlayStatus,
      handleExpand,
      handleCollapse,
      handleNext,
      handlePre,
      handlePlay,
    }
  },
}
</script>

<style lang="less">
@import (reference) '../style/notationFont';

.notations {
  box-sizing: border-box ;
  --parent-height : 20em ;
  --duration: 1s ;
  --duration-text-wrap: 12s 1.5s cubic-bezier(0.82, 0.82, 1, 1.01) ;
  --cubic-header: var(--duration) cubic-bezier(0.71, 0.21, 0.3, 0.95) ;
  --cubic-slider : var(--duration) cubic-bezier(0.4, 0, 0.2, 1) ;
  --cubic-play-list : .35s var(--duration) cubic-bezier(0, 0.85, 0.11, 1.64) ;
  --cubic-slider-context : cubic-bezier(1, -0.01, 1, 1.01) ;
}

.notations *,
.notations *::before,
.notations *::after {
  box-sizing: inherit ;
}

.notations{
  margin: 0 ;
  height: 100% ;
  display: flex ;
  user-select: none ;
  align-items: center ;
  justify-content: center ;
  font-family: 'Quicksand', sans-serif ;
  -webkit-tap-highlight-color: transparent ;
  transition: background-color  var(--cubic-slider) ;
}

.img {
  width: 100% ;
  display: block ;
  object-fit: cover ;
}

.list {
  margin: 0 ;
  padding: 0 ;
  list-style-type: none ;
}

.flex {
  display: flex ;
  align-items: center ;
  justify-content: space-between ;
}

.uppercase{
  text-transform: uppercase ;
}

.player {
  width: 17.15em ;
  display: flex ;
  overflow: hidden ;
  font-size: 1.22em ;
  border-radius: 1.35em ;
  flex-direction: column ;
  background-color: white ;
  height: 100%;
}

.player__header {
  z-index: 1 ;
  gap: 0 .4em ;
  width: 100% ;
  display: flex;
  height: 5.85em ;
  flex-shrink: 0 ;
  position: relative;
  align-items: flex-start ;
  border-radius: inherit ;
  justify-content: flex-end ;
  background-color: white  ;
  padding: .95em 0.6em 0 1.2em ;
  box-shadow: 0 2px 6px 1px #0000001f ;
  transition: height var(--cubic-header), box-shadow var(--duration), padding var(--duration) ease-in-out ;
}

.player__header.open-header {
  height: 100% ;
  padding-left: 0 ;
  padding-right: 0 ;
  box-shadow: unset ;
}

.player__img {
  width: 3.2em ;
  height: 3.2em ;
  border-radius: 1.32em ;
}

.player__img--absolute {
  top: 1.4em ;
  left: 1.2em ;
  position: absolute ;
}

.slider {
  flex-shrink: 0 ;
  overflow: hidden ;
  transition: width var(--cubic-header), height var(--cubic-header), top var(--cubic-header), left var(--cubic-header);
}

.slider.open-slider{
  top: 0 ;
  left: 0 ;
  width: 100% ;
  height: 14.6em ;
}

.slider__content {
  display: flex ;
  height: 100% ;
  transition: transform var(--cubic-slider);
}

.slider__img {
  filter: brightness(75%) ;
}

.slider__name,
.slider__title {
  overflow: hidden ;
  white-space: nowrap ;
}

.text-wrap {
  display: block ;
  white-space: pre ;
  width: fit-content ;
  animation: text-wrap var(--duration-text-wrap) infinite ;
}

@keyframes text-wrap {
  75%{
    transform: translate3d(-51.5%, 0, 0) ;
  }

  100%{
    transform: translate3d(-51.5%, 0, 0) ;
  }
}

.player__button {
  all: unset ;
  z-index: 100 ;
  width: 2.5em ;
  height: 2.5em ;
  cursor: pointer ;
}

.playlist {
  transform: scale(0) ;
  transition: transform calc(var(--duration) / 2) ;
}

.slider.open-slider .playlist {
  transform: scale(1) ;
  transition: transform var(--cubic-play-list) ;
}

.player__button--absolute--nw {
  top: 5.5% ;
  left: 5.5% ;
  position: absolute ;
}

.player__button--absolute--center {
  top: 0 ;
  left: 0 ;
  right: 0 ;
  bottom: 0 ;
  margin: auto ;
  position: absolute ;
}

.player__controls {
  width: 77% ;
  gap: .5em 0 ;
  display: flex ;
  flex-wrap: wrap ;
  align-items: center ;
  will-change: contents ;
  align-content: center ;
  justify-content: center ;
  transition: transform var(--cubic-header) , width var(--cubic-header) ;
}

.player__controls.move {
  width: 88% ;
  transform: translate3d(-1.1em , calc(var(--parent-height) - 153%) , 0) ;
}

.player__context {
  margin: 0 ;
  width: 100% ;
  display: flex ;
  line-height: 1.8 ;
  flex-direction: column ;
  justify-content: center ;
  text-transform: capitalize ;
}

.slider__context {
  width: 56.28% ;
  cursor: pointer ;
  text-align: center ;
  padding-bottom: .2em ;
  will-change: contents ;
  transition: width var(--cubic-header) ;
  //animation: calc(var(--duration) / 2) var(--cubic-slider-context) ;
}

.opacity-enter-to, .opacity-leave-to {
  animation: opacity calc(var(--duration) / 2) var(--cubic-slider-context);
}

@keyframes opacity {
  0% {
    opacity: 0 ;
  }

  90%{
    opacity: 1 ;
  }
}

.player__controls.move .slider__context{
  width: 49.48% ;
}

.player__title {
  font-size: .7em ;
  font-weight: bold ;
  color: #00000086 ;
}

.progress {
  width: 90% ;
  height: .25em ;
  cursor: pointer ;
  border-radius: 1em ;
  background-color: #e5e7ea ;
  transition: width var(--cubic-header) ;
}

.player__controls.move .progress{
  width: 98% ;
}

.progress__filled {
  width: 0% ;
  height: 100% ;
  display: flex ;
  position: relative ;
  align-items: center ;
  border-radius: inherit ;
  background-color: #78adfe ;
}

.progress__filled::before {
  right: 0 ;
  width: .35em ;
  content: " " ;
  height: .35em ;
  border-radius: 50% ;
  position: absolute ;
  background-color: #5781bd ;
}

.player__playlist {
  height: 100% ;
  overflow: auto ;
  padding: 1.05em .9em 0 1.2em ;
}

.player__playlist::-webkit-scrollbar {
  width: 0 ;
}

.player__song {
  /*     gap: 0 .65em ; */
  display: flex ;
  cursor: pointer ;
  margin-bottom: .5em ;
  padding-bottom: .7em ;
  border-bottom: .1em solid #d8d8d859 ;
}

.player__song .player__context {
  line-height: 1.5 ;
  margin-left: .65em ;
}

.player__song-name {
  font-size: .88em ;
  text-align: left;
}

.player__song-time {
  font-size: .65em ;
  font-weight: bold ;
  color: #00000079 ;
  height: fit-content ;
  align-self: flex-end ;
}

.audio {
  display: none !important ;
}

</style>
