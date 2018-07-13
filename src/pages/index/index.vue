<template>
  <div class="con">
    <view class="userinfo">
      <img :src="userInfo.avatarUrl" /> {{userInfo.nickName}}
    </view>
    <button @click="initChart" style="margin-bottom: 20px;">查看实时数据</button>
    <div class="wrap">
      <mpvue-echarts lazyLoad :echarts="echarts" :onInit="handleInit" ref="echarts" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts/dist/echarts.simple.min'
import mpvueEcharts from 'mpvue-echarts'
import Fly from 'flyio/dist/npm/wx'
// import Promise from 'bluebird'

const fly = new Fly()
let chart = null

export default {
  components: { mpvueEcharts },
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      echarts,
      option: null,
      timeArr: [],
      tempArr: [],
      humArr: []
    }
  },
  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
              console.log(res.userInfo)
            }
          })
        }
      })
    },
    initChart () {
      this.getData('https://smarthome.swpuiot.com/api/getdata')
    },
    handleInit (canvas, width, height) {
      chart = echarts.init(canvas, null, { width, height })
      canvas.setChart(chart)
      chart.setOption(this.option)
      return chart
    },
    getData (url) {
      fly.get(url)
        .then(res => {
          const data = res.data
          console.log(res)
          if (data.success) {
            console.log(data.data)
            this.timeArr = []
            this.tempArr = []
            this.humArr = []
            data.data.forEach(item => {
              const date = new Date(item.time)
              this.timeArr.push(`${date.getHours()}:${date.getMinutes()}`)
              this.tempArr.push(item.temp)
              this.humArr.push(item.hum)
            })

            console.log(this.timeArr, this.tempArr, this.humArr)

            this.option = {
              backgroundColor: '#fff',
              color: ['#37A2DA', '#9FE6B8'],
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['温度', '湿度']
              },
              grid: {
                containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.timeArr
              },
              yAxis: {
                x: 'center',
                type: 'value'
              },
              series: [{
                name: '温度',
                type: 'line',
                smooth: true,
                data: this.tempArr
              }, {
                name: '湿度',
                type: 'line',
                smooth: true,
                data: this.humArr
              }]
            }

            this.$refs.echarts.init()
          }
        })
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
.con {
  padding: 10px 0;
}
.wrap {
  width: 100%;
  height: 300px;
}
.userinfo {
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.userinfo img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 20px;
}
</style>
