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
                <li v-for="(item,index) in subjectNestedList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="item.title"  @click="searchRoom(item.type)">{{item.type}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <!-- <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(item,index) in subSubjectList" :key="index" :class="{active:twoIndex==index}">
                  <a :title="item.type" href="#" @click="searchTwo(item.id,index)">{{item.type}}</a>
                </li>
              </ul>
            </dd>
          </dl> -->
          <div class="clear"></div>
        </section>
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
                <a title="热度" href="javascript:void(0);" @click="searchBuyCount()">销量
                <span :class="{hide:buyCountSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                <span :class="{hide:gmtCreateSort==''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article v-if="data.total>0" class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="item in roomList" :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img src="https://hotel-1.oss-cn-beijing.aliyuncs.com/2021/04/06/%E7%AE%A1%E7%90%86%E5%91%98%E5%A4%B4%E5%83%8F.jpeg" class="img-responsive" :alt="item.type">
                    <div class="cc-mask">
                      <a href="/room/1" title="查看详情" class="comm-btn c-btn-1">查看详情</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/room/'+item.id" :title="item.type" class="course-title fsize18 c-333">{{item.type}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span v-if="Number(item.price)===0" class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">9634人学习</i>
                      |
                      <i class="c-999 f-fA">9634评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
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
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import room from '@/api/room'

export default {
  data() {
    return {
      page:1, //当前页
      data:{},  //房间列表
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表

      searchObj: {}, // 查询表单对象

      oneIndex:-1,
      twoIndex:-1,
      buyCountSort:"",
      gmtCreateSort:"",
      priceSort:""
    }
  },
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
        this.data = response.data
      })
    },

    //4 点击某个一级分类，查询对应二级分类
    searchRoom(type) {
      //把传递index值赋值给oneIndex,为了active样式生效
      //this.oneIndex = index
      room.getRoomByType(type).then(response=>{
        this.data = response.data.roomList
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
      this.searchObj.buyCountSort = this.buyCountSort
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
      this.searchObj.buyCountSort = this.buyCountSort
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
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
    }

  }
};
</script>
<style scoped>
  .active {
    background: #bdbdbd;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
</style>