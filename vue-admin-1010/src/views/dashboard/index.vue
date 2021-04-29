<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-select v-model="searchObj.type" clearable placeholder="请选择">
          <el-option label="用户登录数统计" value="login_num"/>
          <el-option label="用户注册数统计" value="register_num"/>
          <el-option label="每日订单数统计" value="order_view_num"/>
          <el-option label="每日房间数统计" value="room_num"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>

      <el-button
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">查询</el-button>
    </el-form>

    <div class="chart-container">
      <div id="chart" class="chart" style="height:400px;width:70%" />
      
    </div>
    <div>
      <div id="Bingchart" class="chart" style="heigth:400px;width:100%"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sta from '@/api/statistic'
import * as echarts from 'echarts'
import daily from '@/api/daily'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data(){
    return{
      day:'',
      searchObj: {
        //默认的图
        type: 'register_num',
        begin: '2017-04-01',
        end: '2021-04-27'
      },
      btnDisabled: false,
      chart: null,
      title: '',
      xData: [],
      yData: []
    }
  },
  created(){
    //显示默认的折线图（订单生成数量趋势）和饼状图（入住天数统计显示）
     this.showChart()
     //Bingchart.showBingChart()
  },
  methods:{
    create(){
      sta.createStatisticData(this.day)
      .then(response=>{
        this.$message({
          type:'success',
          message:'生成数据成功！'
        })
        //跳转到显示页面
        //this.$router.push()
      })
    },
    //显示图表
    showChart() {
      this.initChartData()
    },

    showBingChart(){
      //Bingchart.initChartData()
    },
    // 准备图表数据
    initChartData() {
      daily.showChart(this.searchObj).then(response => {
          // 数据
          this.yData = response.data.dataList
          // 横轴时间
          this.xData = response.data.dateList

          // 当前统计类别
          switch (this.searchObj.type) {
            case 'register_num':
              this.title = '用户注册数统计'
              break
            case 'login_num':
              this.title = '用户登录数统计'
              break
            case 'order_view_num':
              this.title = '订单统计数统计'
              break
            case 'room_num':
              this.title = '每日房间数统计'
              break
          }
          this.setChart()
        })
    },
    // 设置图标参数
    setChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('chart'))
      //var Bingchart = echarts.init(document.getElementById('Bingchart'))

      // console.log(this.chart)

      // 指定图表的配置项和数据
      var option = {
        title: {
            text: this.title
        }, 
        tooltip: {
          trigger: 'axis'
        },       
        // x轴是类目轴（离散数据）,必须通过data设置类目数据
        xAxis: {
          type: 'category',
          data: this.xData
        },
        // y轴是数据轴（连续数据）
        yAxis: {
          type: 'value'
        },
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: [{
          // 系列中的数据内容数组
          data: this.yData,
          // 折线图
          type: 'line'
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff'
          },
          borderColor: '#90979c'
        },
        {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }]
      }
      this.chart.setOption(option)
      //Bingchart.setOption(option)
      }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
