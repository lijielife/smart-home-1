<template>
  <view class="con">
    <p style="color: #333; font-size: 15px; margin-bottom: 20px;">上传你的面部图片，开启门禁人脸识别系统</p>
    <button type="primary" style="margin-bottom: 20px;" @click="handleCamera">上传面部图片</button>
    <p v-show="uploadSuccess">上传成功</p>
    <div v-show="showCamera">
      <camera
       device-position="front"
       flash="off"
       style="width: 100%; height: 300px; margin-bottom: 20px;"
       @error="error">
      </camera>
      <button type="primary" @tap="takePhoto" style="margin-bottom: 20px;">拍照</button>
      <view v-if="!!imgSrc" style="width: 100; height: 300px">
        <image :src="imgSrc" style="margin-bottom: 20px;" />
        <button type="primary" @tap="resetImage" style="margin-bottom: 20px;">重新拍摄</button>
        <button type="primary" @tap="uploadImage" style="margin-bottom: 20px;">确定并上传</button>
      </view>
      <view>
        <img v-for="(src, index) in liveImgList" :src="src" :key="index" />
      </view>
    </div>
  </view>
</template>

<script>
export default {
  name: 'Face',
  data () {
    return {
      showCamera: false,
      imgSrc: '',
      liveImgList: [],
      uploadSuccess: false
    }
  },
  methods: {
    handleCamera () {
      this.showCamera = !this.showCamera
      this.uploadSuccess = false
    },
    takePhoto () {
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: res => {
          this.imgSrc = res.tempImagePath
        }
      })
    },
    resetImage () {
      this.imgSrc = ''
    },
    uploadImage () {
      wx.uploadFile({
        url: 'https://smarthome.swpuiot.com/api/face',
        filePath: this.imgSrc,
        name: 'pic',
        formData: {
          name: 'Leo123'
        },
        success: res => {
          console.log(res)
          const data = JSON.parse(res.data)
          if (data.success) {
            this.showCamera = false
            this.imgSrc = ''
            this.uploadSuccess = true
          }
        }
      })
    },
    error (e) {
      console.log(e.detail)
    }
  },
  created () {
    wx.connectSocket({
      url: 'wss://smarthome.swpuiot.com/websocket/invade',
      method: 'GET'
    })
    wx.onSocketOpen(res => {
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketError(res => {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(res => {
      console.log('收到服务器内容')
      console.log(res.data)
      const data = JSON.parse(res.data)
      if (data.pic) {
        console.log(wx.base64ToArrayBuffer(data.pic))
      }
      // res = JSON.parse(res)
      // const data = res.pic
      // console.log(wx.base64ToArrayBuffer(data))
    })
  }
}
</script>

<style scoped>
.con {
  padding: 20px;
}
</style>
