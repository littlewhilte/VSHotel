<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部房间</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">房间类型</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="">全部</a>
                </li>
                <!-- 遍历房间类型-->
                <li v-for="(item,index) in subjectNestedList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="item.type"  @click="getRoomListByType(item.type)">{{item.type}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>

        <!-- 筛选条件 -->
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>

          <section class="fl">
            <ol class="js-tap clearfix">
             <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="热度" href="javascript:void(0);" @click="searchBuyCount()">价格
                <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <!-- <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格（范围）&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li> -->
              <li>
                <el-form :inline="true" class="demo-form-inline">
                    <el-date-picker
                        v-model="caDay"
                        type="daterange"
                        range-separator= "至"
                        :start-placeholder=startTime
                        :end-placeholder=endTime
                        value-format="yyyy-MM-dd"          
                        size="medium"
                        />
                </el-form>
              </li>
              <li class="c-master f-fM">
                {{caDay===null?'0':caculateDay(caDay)}}
                <p>共({{day}})天</p>
              </li>
            </ol>
          </section>
        </div>
        
        <!-- 房间数据 -->
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <!-- 有数据 -->
          <article v-if="data.total>0" class="comm-course-list">
            <ul class="of ul-flex" id="bna">
              <li v-for="item in data.roomList" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src=item.avatar class="img-responsive" :alt="item.type">
                    <div class="cc-mask">
                      <a href="#" title="预订" @click="createOrder(item.id,day)" class="comm-btn c-btn-1">预订</a>
                    </div>
                  </section>
                  <!-- 房间类型名 -->
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/room/'+item.id" :title="item.type" class="course-title fsize18 c-333" >{{item.type}}</a>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <i class="c-999 f-fA">押金{{item.deposit}}￥</i>
                      |
                      <i class="c-999 f-fA">{{item.price}}￥/天</i>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">                        
                      <el-rate
                        v-model="item.value"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                      </el-rate>
                      </i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <!-- <div class="clear"></div> -->
          </article>
        </div>

        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)">首</a>
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current-1)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current == page, undisable: data.current == page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="gotoPage(page)">{{ page }}</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current+1)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)">末</a>
            <div class="clear"/>
          </div>
        </div>
      </section>
    </section>
    <!-- /房间列表 结束 -->
  </div>
</template>


<script>
import room from '@/api/room'
import order from '@/api/order'

export default {
  data() {
    return {
      page:1, //当前页
      data:{

      },  //房间列表
      order:{
        days:this.day,//根据时间算
        total:room.price*this.days,
        createTime:""

      }, //订单
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      type:"单人间",
      searchObj: {}, // 查询表单对象
      oneIndex:-1,
      twoIndex:-1,
      buyCountSort:"",
      gmtCreateSort:"",
      priceSort:"",
      startTime:"入住日期",
      endTime:"离开日期",
      value: 3.7,
      caDay:[],
      day:"0"
    }
  },
  // asyncData({ params, error }) {
  //    return room.getRoomInfo(params.id)
  //       .then(response => {
  //         return {
  //           courseWebVo: response.data.data.courseWebVo,
  //           chapterVideoList: response.data.data.chapterVideoList,
  //           roomId:params.id
  //         }
  //       })
  //  },
  created() {
    //课程第一次查询
    this.initCourseFirst()
    //一级分类显示
    this.initSubject()
  },
  methods:{
    //1 查询第一页数据 2行4列
    initCourseFirst() {
      room.getRoomList(1,8,this.searchObj).then(response => {
        this.data = response.data.data
      })
    },

    //2 查询所有一级分类
    initSubject() {
      room.getAllSubject()
        .then(response => {
          this.subjectNestedList = response.data.data.typeList
        })
    },

    //3 分页切换的方法
    gotoPage(page) {
      room.getRoomList(page,8,this.searchObj).then(response => {
        this.data = response.data.data
      })
    },

    //4 点击某个一级分类，查询对应二级分类
    getRoomListByType() {
      //把传递index值赋值给oneIndex,为了active样式生效
      //this.oneIndex = index
      room.getRoomByType(1,8,this.type).then(response=>{
        this.data = response.data.data
      })

      //把一级分类点击id值，赋值给searchObj
      //this.searchObj.rid = rid
      //点击某个一级分类进行条件查询
      this.gotoPage(1)
    },


    //6 根据销量排序
    searchBuyCount() {
      //设置对应变量值，为了样式生效
      this.buyCountSort = "1"
      this.gmtCreateSort = ""
      this.priceSort = ""

      //把值赋值到searchObj
      this.searchObj.price = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;

      //调用方法查询
      this.gotoPage(1)
    },

    //7 最新排序
    searchGmtCreate() {
      //设置对应变量值，为了样式生效
      this.buyCountSort = ""
      this.gmtCreateSort = "1"
      this.priceSort = ""

      //把值赋值到searchObj
      this.searchObj.price = this.buyCountSort
      this.searchObj.startTime = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;

      //调用方法查询
      this.gotoPage(1)
    },

    //8 价格排序
    searchPrice() {
      //设置对应变量值，为了样式生效
      this.buyCountSort = ""
      this.gmtCreateSort = ""
      this.priceSort = "1"

      //把值赋值到searchObj
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;

      //调用方法查询
      this.gotoPage(1)
    },
    getDateTime(startTime,endTime) {
      var dateSpan, iDays;
      let sDate1 = Date.parse(getDateFilter(startTime));
      let sDate2 = Date.parse(getDateFilter(endTime));
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      days = Math.floor(dateSpan / (24 * 3600 * 1000));
    },
    // 生成订单（订单id、房间类型、天数、总计、创建时间）
    createOrder(id,day){
      order.createOrder(id,day)
      .then(response=>{
        //获取返回订单号order_no
        response.data.data.orderId
        //跳转到订单显示页面
        this.$router.push({path:'/order/'+response.data.data.orderId})
          //添加成功
          //提示信息
        //路由跳转(支付页面) redirect
        // alert("预订成功！")
      })
    },
    //计算天数
    caculateDay(caDay){
      let starttime = new Date(caDay[0])
      let endtime = new Date(caDay[1])
      starttime = new Date(starttime.getFullYear(), starttime.getMonth(), starttime.getDate())
      endtime = new Date(endtime.getFullYear(), endtime.getMonth(), endtime.getDate())
      const diff = endtime.getTime()-starttime.getTime()
      this.day = isNaN(diff/(24*60*60*1000)) ? 0: diff/(24*60*60*1000) 
    }

  }
};

</script>
<style scoped>
.ul-flex {
  display: flex;
  flex-wrap: wrap;
}
.ul-flex li {
}
.ul-flex img {
  margin: 0;
  width: 100%;
  height: 220px;
}
  .active {
    background: #bdbdbd;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-row {
    margin-bottom: 20px;
    /* &:last-child {
      margin-bottom: 0;
    } */
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>