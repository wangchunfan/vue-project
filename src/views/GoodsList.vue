<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <!--插槽使用-->
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <!--特殊存在未绑定-->
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a>
              </dd>
              <!--v-for 绑定格式相同数据-->
              <dd v-for="(prices,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{prices.startPrice}}
                  - {{prices.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <!--图片需要动态绑定，不能直接写src=""，这样会因页面渲染太快而导致图片未加载-->
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--遮罩层-->
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  //引用css静态资源
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import './../assets/css/login.css'
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'
  import axios from 'axios'

  export default {
    data() {
      return {
        //商品数据数组
        goodsList: [],
        //价格条件
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '2000.00'
          },
          {
            startPrice: '2000.00',
            endPrice: '5000.00'
          }
        ],
        //价格条件被选中
        priceChecked: 'all',
        //价格选择是否隐藏
        filterBy: false,
        //遮罩层
        overLayFlag: false
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread
    },
    mounted: function () {
      //获取商品数据
      this.getGoodsList()
    },
    methods: {
      //获取商品数据
      getGoodsList() {
        axios.get("/goods").then((res) => {
          console.log(res)
          var data = res.data
          this.goodsList = data.result.list
        })
      },
      //响应式布局：点击显示价格
      showFilterPop() {
        this.filterBy = true
        this.overLayFlag = true
      },
      //价格选择：菜单样式改变；响应式时：关闭价格选择，关闭遮罩层
      setPriceFilter(index){
        this.priceChecked = index
        this.closePop()
      },
      //响应式布局：点击关闭价格选择和遮罩层
      closePop(){
        this.filterBy = false
        this.overLayFlag = false
      }
    }
  }
</script>

<style scoped>

</style>
