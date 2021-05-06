<template>
  <div>
    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
            <div class="swiper-slide" style="background: #040B1B;">
                <a target="_blank">
                    <img src="~/assets/photo/banner/gallery08.jpg" alt="首页banner">
                </a>
            </div>
            <div class="swiper-slide" style="background: #040B1B;">
                <a target="_blank">
                    <img src="~/assets/photo/banner/gallery02.jpg" alt="首页banner">
                </a>
            </div>
            <div class="swiper-slide" style="background: #040B1B;">
                <a target="_blank">
                    <img src="~/assets/photo/banner/gallery11.jpg" alt="首页banner">
                </a>
            </div>
            <div class="swiper-slide" style="background: #040B1B;">
                <a target="_blank">
                    <img src="~/assets/photo/banner/gallery02.jpg" alt="首页banner">
                </a>
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </div>
    <!-- 幻灯片 结束 -->
     <div id="aCoursesList">
      <!-- 景点 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门景点</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li>
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        src="~/assets/photo/views/天安门.png"
                        class="img-responsive"
                        alt="天安门广场"
                      >
                      <div class="cc-mask">
                        <a href="https://you.ctrip.com/sight/beijing1/228.html" title="了解详情" class="comm-btn c-btn-1">了解详情</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a href="https://you.ctrip.com/sight/beijing1/228.html" title="天安门广场" class="course-title fsize18 c-333">天安门广场</a>
                    </h3>
                    <!-- <el-rate
                      width="80%"
                      v-model="value"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate> -->
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">￥60</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">253241人去过</i>
                        |
                        <i class="c-999 f-fA">103234评论</i>
                      </span>
                    </section>
                  </div>
                </li>
                <li>
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        src="~/assets/photo/views/天坛.png"
                        class="img-responsive"
                        alt="天坛"
                    >
                      <div class="cc-mask">
                        <a href="https://you.ctrip.com/sight/beijing1/233.html" title="了解详情" class="comm-btn c-btn-1">了解详情</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a href="https://you.ctrip.com/sight/beijing1/233.html" title="天坛" class="course-title fsize18 c-333">天坛</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">￥45</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">18432人去过</i>
                        |
                        <i class="c-999 f-fA">12000评论</i>
                      </span>
                    </section>
                  </div>
                </li>
                <li>
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        src="~/assets/photo/views/长城.png"
                        class="img-responsive"
                        alt="长城"
                      >
                      <div class="cc-mask">
                        <a href="https://you.ctrip.com/sight/beijing1/230.html" title="了解详情" class="comm-btn c-btn-1">了解详情</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a href="https://you.ctrip.com/sight/beijing1/230.html" title="长城" class="course-title fsize18 c-333">长城</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">￥40</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">200432人去过</i>
                        |
                        <i class="c-999 f-fA">164332评论</i>
                      </span>
                    </section>
                  </div>
                </li>
                <li>
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        src="~/assets/photo/views/水立方.jpeg"
                        class="img-responsive"
                        alt="水立方"
                      >
                      <div class="cc-mask">
                        <a href="https://you.ctrip.com/sight/beijing1/52627.html" title="了解详情" class="comm-btn c-btn-1">了解详情</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a href="https://you.ctrip.com/sight/beijing1/52627.html" title="水立方" class="course-title fsize18 c-333">水立方</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">￥168</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">12256人去过</i>
                        |
                        <i class="c-999 f-fA">25126评论</i>
                      </span>
                    </section>
                  </div>
                </li>
                <li>
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        src="~/assets/photo/views/圆明园.jpeg"
                        class="img-responsive"
                        alt="圆明园"
                      >
                      <div class="cc-mask">
                        <a href="https://you.ctrip.com/sight/beijing1/5208.html" title="了解详情" class="comm-btn c-btn-1">了解详情</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a
                        href="https://you.ctrip.com/sight/beijing1/5208.html"
                        title="圆明园"
                        class="course-title fsize18 c-333"
                      >圆明园</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">￥60</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">131237人去过</i>
                        |
                        <i class="c-999 f-fA">137124评论</i>
                      </span>
                    </section>
                  </div>
                </li>
                <li>
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        src="~/assets/photo/views/颐和园.jpeg"
                        class="img-responsive"
                        alt="颐和园"
                      >
                      <div class="cc-mask">
                        <a href="https://you.ctrip.com/sight/beijing1/231.html" title="了解详情" class="comm-btn c-btn-1">了解详情</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a href="https://you.ctrip.com/sight/beijing1/231.html" title="颐和园" class="course-title fsize18 c-333">颐和园</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">

                        <i class="c-fff fsize12 f-fA">￥30</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">125321人去过</i>
                        |
                        <i class="c-999 f-fA">12532评论</i>
                      </span>
                    </section>
                  </div>
                </li>
                <li>
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        src="~/assets/photo/views/北海公园.jpeg"
                        class="img-responsive"
                        alt="北海公园"
                      >
                      <div class="cc-mask">
                        <a href="https://you.ctrip.com/sight/beijing1/232.html" title="了解详情" class="comm-btn c-btn-1">了解详情</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a href="https://you.ctrip.com/sight/beijing1/232.html" title="北海公园" class="course-title fsize18 c-333">北海公园</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">￥69</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">123123人去过</i>
                        |
                        <i class="c-999 f-fA">12332评论</i>
                      </span>
                    </section>
                  </div>
                </li>
                <li>
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        src="~/assets/photo/views/南锣古巷.jpeg"
                        class="img-responsive"
                        alt="南锣古巷"
                      >
                      <div class="cc-mask">
                        <a href="https://you.ctrip.com/sight/beijing1/64955.html" title="了解详情" class="comm-btn c-btn-1">了解详情</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a href="https://you.ctrip.com/sight/beijing1/64955.html" title="南锣古巷" class="course-title fsize18 c-333">南锣鼓巷</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">341233人去过</i>
                        |
                        <i class="c-999 f-fA">3412评论</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="https://you.ctrip.com/place/beijing1.html" title="全部景点" class="comm-btn c-btn-2">全部景点</a>
            </section>
          </div>
        </section>
      </div>
      <!-- 景点 结束 -->
    </div>
  </div>
</template>
<script>
import banner from '@/api/banner'
import index from '@/api/index'
export default {
data () {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: '.swiper-pagination'//分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: '.swiper-button-next',//下一页dom节点
          prevEl: '.swiper-button-prev'//前一页dom节点
        }
      },
      //banner数组
      bannerList:[],

      viewList:[],
      value:4.5
    }
  },
  created(){
    // this.getBannerList()
  },
  methods :{
    // getBannerList(){
    //   banner.getBannerList()
    //   .then(response=>{
    //     this.bannerList = response.data.data.list
    //   })
    // },

    // getIndexList(){
    //   index.getIndexData()
    //   .then(reponse=>{
    //     this.viewList = reponse.data.data.list
    //   })
    // }
  }
}
</script>