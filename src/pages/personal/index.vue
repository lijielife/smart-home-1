<template>
  <div>
    <!-- <button @click="getVideo">查看实时视频</button> -->
    <view class="section tc">
      <!-- <video id="myVideo"
        src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
        controls
        style="width: 100%; height: 300px;">
      </video> -->
      <live-player src="rtmp://39.108.174.87/live/livestream" mode="RTC" autoplay @statechange="statechange" @error="error" style="width: 300px; height: 225px;" />
    </view>
  </div>
</template>

<script>
export default {
  name: 'Personal',
  data () {
    return {

    }
  },
  methods: {
    statechange (e) {
      console.log('live-player code:')
    },
    error (e) {
      console.error('live-player error:')
    }
  }
}
</script>
