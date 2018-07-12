<template>
  <div>
    <button type="primary" @click="handleCamera">上传面部图片</button>
    <div v-show="showCamera">
      <camera
       device-position="back"
       flash="off"
       style="width: 100%; height: 300px;"
       @error="error">
      </camera>
      <button type="primary" @click="takePhoto">拍照</button>
      <div v-if="!!imgSrc">
        <img :src="imgSrc" />
        <button type="primary" @click="uploadImage">确定并上传</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Face',
  data () {
    return {
      showCamera: false,
      imgSrc: ''
    }
  },
  methods: {
    handleCamera () {
      this.showCamera = !this.showCamera
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
    uploadImage () {
      wx.uploadFile({
        url: 'http://localhost:3000/api/face',
        filePath: this.imgSrc,
        name: 'facefile',
        success: res => {
          console.log(res.data)
        }
      })
    },
    error (e) {
      console.log(e.detail)
    }
  }
}
</script>

<style scoped>

</style>
