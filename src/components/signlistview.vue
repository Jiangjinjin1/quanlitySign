<template>
  <section :class="['signlistview', isShowSelect || 'containPadding']">
    <div v-if="isShowSelect" class="selectDiv" @click="selectFn(orderInfo)">
      <img :src="selectedCustomers.includes(orderInfo)?selectImg:noSelectImg" alt="">
    </div>
    <div class="signContent" @click="toSignDetail(orderInfo)">
      <div class="sign1">
        <div class="sign1_1">签收单号：{{orderInfo.waybillNo}}</div>
        <div :class="['sign1_2',stausStyle]">{{signStatus}}</div>
      </div>
      <div class="lineSpace"></div>
      <div class="sign2">学校名称：{{orderInfo.schoolName}}</div>
      <div class="sign3">学校地址：{{orderInfo.schoolAddress}}</div>
      <div class="lineSpace"></div>
      <div class="sign4">
        <div class="sing4_1">
          <img src="../images/sign04.png" alt="">
          <div>路线：{{orderInfo.road}}</div>
        </div>
        <div class="sing4_2">
          <img src="../images/sign03.png" alt="">
          <div>路线：{{orderInfo.psTime}}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        noSelectImg: require('../images/sign01.png'),
        selectImg: require('../images/sign02.png'),
        stausStyle: '',
      }  
    },

    computed: {
      signStatus() {
        const orderInfo = this.orderInfo
        if(orderInfo.status === '1') {
          this.stausStyle = 'sign1_2_1'
          return '进行中'
        }
        if(orderInfo.status === '2') {
          this.stausStyle = 'sign1_2_2'
          return '已签收'
        }
        if(orderInfo.status === '3') {
          this.stausStyle = 'sign1_2_3'
          return '签收延误'
        }
      }
    },

    props: {
      orderInfo: Object,
      isShowSelect: Boolean,
      acceptSelectItems: Function,
      selectedCustomers: Array,
    },

    methods: {
      ...mapMutations(['RECORD_ORDER_DETAIL']),

      selectFn(item) {
        this.$emit('acceptSelectItems', item)
      },

      toSignDetail(orderInfo) {
        if(this.isShowSelect) return
        this.$router.push({name: 'signDetail'})
        this.RECORD_ORDER_DETAIL(orderInfo)
      }
    }
  }
</script>

<style scoped>
  @import '../style/mixin';
  .containPadding{
    padding-left: .75rem;
  }
  .signlistview{
    margin-bottom: .5rem;
    background: white;
    display: flex;
    width: 100%;
    .selectDiv{
      width: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: .55rem;
      img{
        @mixin wh 1rem, 1rem;
      }
    }
    .signContent{
      display: flex;
      flex-direction: column;
      flex: 1;
      .sign1{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .5rem .5rem .5rem 0;
        .sign1_1{
          font-size: .75rem;
        }
        .sign1_2{
          background: #FEF2DF;
          color: #F6BC6F;
          padding: .05rem .35rem;
          border-radius: .6rem;
          font-size: .65rem;
        }
        .sign1_2_1{
          background: #FEF2DF;
          color: #F6BC6F;
        }
        .sign1_2_2{
          background: #E6FBF6;
          color: #80E8CF;
        }
        .sign1_2_3{
          background: #FEE4E7;
          color: #FD7689;
        }
      },
      .sign2{
        padding: .5rem .5rem .5rem 0;
        font-size: .75rem;
      }
      .sign3{
        padding: .5rem .5rem .5rem 0;
        font-size: .75rem;
      }
      .sign4{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: .75rem;
        padding: .5rem 0;
        img{
          @mixin wh .8rem, .8rem;
          margin-right: .25rem;
        }
        .sing4_1{
          display: flex;
          flex: 3;
          align-items: center;
          div{
            color: #A2A2A2;
          }
        }
        .sing4_2{
          display: flex;
          flex: 4;
          align-items: center;
          div{
            color: #A2A2A2;
          }
        }
      }
    }
  }
</style>
