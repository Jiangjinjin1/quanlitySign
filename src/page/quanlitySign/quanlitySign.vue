<template>
  <section class="quanlitySignClass">
    <div id="quanlitySign" class="quanlitySignInner">
      <!--mescroll滚动区域的基本结构-->
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <!--内容...-->
        <signlistview
          v-for="(item, index) in dataList" 
          :key="index"
          :orderInfo="item"
          :isShowSelect="isShowSelect"
          :selectedCustomers="selectedCustomers"
          @acceptSelectItems="acceptSelectItems"
        />
      </mescroll-vue>
    </div>
    <div class="footerDiv">
      <div v-if="!isShowSelect" class="footerLeft" @click="signAllPress">全部签收</div>
      <div v-if="!isShowSelect" class="footerRight" @click="quanlitySignPress">批量签收</div>
      <div v-if="isShowSelect" class="footerLeft" @click="cancelSignPress">取消签收</div>
      <div v-if="isShowSelect" class="footerSureBtn" @click="confirmSignPress">确定签收</div>
    </div>
  </section>
  
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import ui from '../../modules/ui/ui'
import {getSignList} from '../../service/signApi'
import signlistview from '../../components/signlistview'

export default {
	data () {
		return {
      mescroll: null,
      mescrollDown:{},
      mescrollUp: {
        callback: this.upCallback, 
        page: {
          num: 0, 
          size: 20 
        },
        htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
        noMoreSize: 5,
        toTop: {
          src: require("../../images/top.png"),
          offset: 1000		
        },
        empty: {
          warpId: "quanlitySign", 
          icon: require("../../images/empty.png"),
          tip: "暂无相关数据~" 
        }
      },
      dataList: [],
      isShowSelect: false,
      selectedCustomers: [],
		}
  },
  
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave()
    next()
  },

	

	components: {
    signlistview,
	},

	methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    async upCallback (page, mescroll) {
      // const arr = await getSignList({}).catch((e)=>{
      //   // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
      //   mescroll.endErr()
      // })
      const arr = [{
        waybillNo: '17834767389',
        status: '1',
        schoolName: '上海第二外语中学',
        schoolAddress: '桂平路418号',
        road: '黄埔外',
        psTime: '11-29',
      },{
        waybillNo: '17834767389',
        status: '2',
        schoolName: '上海第二外语中学',
        schoolAddress: '桂平路418号',
        road: '黄埔外',
        psTime: '11-29',
      },{
        waybillNo: '17834767389',
        status: '3',
        schoolName: '上海第二外语中学',
        schoolAddress: '桂平路418号',
        road: '黄埔外',
        psTime: '11-29',
      },{
        waybillNo: '17834767389',
        status: '1',
        schoolName: '上海第二外语中学',
        schoolAddress: '桂平路418号',
        road: '黄埔外',
        psTime: '11-29',
      },{
        waybillNo: '17834767389',
        status: '2',
        schoolName: '上海第二外语中学',
        schoolAddress: '桂平路418号',
        road: '黄埔外',
        psTime: '11-29',
      },{
        waybillNo: '17834767389',
        status: '3',
        schoolName: '上海第二外语中学',
        schoolAddress: '桂平路418号',
        road: '黄埔外',
        psTime: '11-29',
      },{
        waybillNo: '17834767389',
        status: '1',
        schoolName: '上海第二外语中学',
        schoolAddress: '桂平路418号',
        road: '黄埔外',
        psTime: '11-29',
      },{
        waybillNo: '17834767389',
        status: '2',
        schoolName: '上海第二外语中学',
        schoolAddress: '桂平路418号',
        road: '黄埔外',
        psTime: '11-29',
      },{
        waybillNo: '17834767389',
        status: '3',
        schoolName: '上海第二外语中学',
        schoolAddress: '桂平路418号',
        road: '黄埔外',
        psTime: '11-29',
      }]

      if (page.num === 1) this.dataList = []
      this.dataList = this.dataList.concat(arr)
      this.$nextTick(() => {
        mescroll.endSuccess(arr.length)
      })
    },

    quanlitySignPress() {
      this.isShowSelect = true
    },

    cancelSignPress() {
      this.isShowSelect = false
    },

    confirmSignPress() {

    },

    signAllPress() {

    },

    acceptSelectItems(item) {
      const selectedCustomers = this.selectedCustomers
      const newData = [...selectedCustomers]
      const isExist = this._.includes(newData, item)
      if (!isExist) {
        newData.push(item)
      } else {
        const index = newData.indexOf(item)
        newData.splice(index, 1)
      }
      this.selectedCustomers = newData
      console.log('this.selectedCustomers:',this.selectedCustomers)
    },

	}
}
</script>

<style scoped>
  @import '../../style/mixin';
  /*以fixed的方式固定mescroll的高度*/
  .mescroll {
    position: fixed;
    top: 0;
    bottom: 3rem;
    height: auto;
  }
  .quanlitySignClass{
    display: flex;
    flex: 1;
    flex-direction: column;
    @mixin wh 100%, 100%;
    .quanlitySignInner{
      flex: 1;
    }
    .footerDiv{
      display: flex;
      width: 100%;
      height: 2.5rem;
      .footerLeft{
        flex: 1;
        border: 1px solid #4E92DF;
        font-size: .7rem;
        color: #4E92DF;
        font-weight: 500;
        text-align: center;
        line-height: 2.5rem;
        background: white;
      }
      .footerRight{
        flex: 1;
        background: #4E92DF;
        font-size: .7rem;
        color: white;
        font-weight: 500;
        text-align: center;
        line-height: 2.5rem;
        border: 1px solid #4E92DF;
      }
      .footerSureBtn{
        flex: 1;
        background: #4E92DF;
        font-size: .7rem;
        color: white;
        font-weight: 500;
        text-align: center;
        line-height: 2.5rem;
        border: 1px solid #4E92DF;
      }
    }
  }
</style>