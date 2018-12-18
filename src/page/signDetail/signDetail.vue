<template>
  <section class="signDetailview">
    <div class="signContent">
      <div class="sign1">
				<div class="sign1_1_contain">
					<div class="backClass" @click="goBack">	
						<icon name="backBlack" class="backClassIcon"/>
					</div>
					<div class="sign1_1">签收单号：{{''}}</div>
				</div>
        <div :class="['sign1_2',stausStyle]">{{signStatus}}</div>
      </div>
      <div class="lineSpace"></div>
      <div class="sign2">学校名称：<span class="sign2span">{{orderInfo.destname}}</span></div>
      <div class="sign3">学校地址：<span class="sign3span">{{orderInfo.addr}}</span></div>
      <div class="sign3">书包总数：<span class="sign3span">{{orderInfo.num}}</span></div>
      <div class="sign4">
        <div class="sing4_1">
          <img src="../../images/sign04.png" alt="">
          <div>路线：{{orderInfo.route}}</div>
        </div>
        <div class="sing4_2">
          <img src="../../images/sign03.png" alt="">
          <div>路线：{{orderInfo.dispdate}}</div>
        </div>
      </div>
      <div class="lineSpaceDashed"></div>
      <div class="mingxi">
        <div class="mingxiTitle"><span>明细</span></div>
        <div class="minxiLiebiao">
          <div class="minxiLiebiao_1">
            <div class="minxiLiebiao_1_1 ellipsis">
              书包名称：<span>{{orderInfo.goods}}</span>
            </div>
            <div class="minxiLiebiao_1_2">{{orderInfo.num}}份</div>
          </div>
          <div class="minxiLiebiao_2">
            <div class="minxiLiebiao_2_1 ellipsis">{{orderInfo.receiver}}</div>
            <div class="minxiLiebiao_2_2">{{orderInfo.phone}}</div>
          </div>
          <div class="lineSpaceDashed"></div>
        </div>
      </div>
    </div>
		<div class="footerSureBtn" @click="confirmSignPress">确定签收</div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import ui from '../../modules/ui/ui'
import {confirmSign} from '../../service/signApi'

export default {
	data () {
		return {
			orderInfo: {},
			stausStyle: '',
		}
	},

	created() {
		this.initData()
	},

	computed: {
		...mapState(['orderDetail', 'addressId']),

		signStatus() {
			const orderInfo = this.orderInfo
			if(orderInfo.state === '0') {
				this.stausStyle = 'sign1_2_1'
				return '未签收'
			}
			if(orderInfo.state === '1') {
				this.stausStyle = 'sign1_2_2'
				return '已签收'
			}
			// if(orderInfo.state === '3') {
			// 	this.stausStyle = 'sign1_2_3'
			// 	return '签收延误'
			// }
		},
	},

	components: {

	},

	methods: {

		initData() {
			this.orderInfo = this.orderDetail
		},

		async confirmSignPress() {
      const result = await confirmSign({
        type: 'PART',
        destcode: this.addressId, 
        ids: this.orderInfo.id || '',
      })

      if(result.success) {
        ui.toast({title: '', msg: '签收成功'})
        this.$router.go(-1)
      }
		},
		
		goBack() {
			this.$router.go(-1)
		}
		
	}
}
</script>

<style scoped>
	@import '../../style/mixin';
	.footerSureBtn{
		background: #4E92DF;
		font-size: .7rem;
		color: white;
		font-weight: 500;
		text-align: center;
		line-height: 2.5rem;
		border: 1px solid #4E92DF;
	}
		
	.signDetailview{
		display: flex;
		flex-direction: column;
		@mixin wh 100%, 100%;
		flex: 1;
    
    .signContent{
			border-radius: 5px;
			margin: .5rem;
			padding-left: .75rem;
      display: flex;
      flex-direction: column;
			flex: 1;
			background: white;
			.sign1_1_contain{
				display: flex;
        justify-content: space-between;
        align-items: center;
			}
      .sign1{
        display: flex;
        justify-content: space-between;
        align-items: center;
				padding: .5rem .5rem .5rem 0;
				.backClass{
					width: 1.5rem;
					.backClassIcon{
						width: .7rem;
						height: .7rem;
					}
				}
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
        .sign2span{
          font-size: .75rem;
          color: #a2a2a2;
        }
      }
      .sign3{
        padding: .5rem .5rem .5rem 0;
        font-size: .75rem;
        .sign3span{
          font-size: .75rem;
          color: #a2a2a2;
        }
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

      .mingxi{
        display: flex;
        flex-direction: column;
        margin-top: .5rem;
        padding-right: .25rem;
        .mingxiTitle{
          border-left: .25rem solid #4E92DF;
          font-size: 0.75rem;
          span{
            padding-left: .25rem;
          }
        }
        .minxiLiebiao{
          display: flex;
          flex-direction: column;

          .minxiLiebiao_1{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: .25rem 0;

            .minxiLiebiao_1_1{
              flex: 1;
              font-size: .75rem;
              span{
                font-size: .75rem;
                color: #a2a2a2;
              }
            }
            .minxiLiebiao_1_2{
              font-size: 0.75rem;
              color: #FC5167;
            }
          }
          .minxiLiebiao_2{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: .25rem 0;
            .minxiLiebiao_2_1{
              flex: 1;
              font-size: .75rem;
            }
            .minxiLiebiao_2_2{
              font-size: 0.75rem;
              color: #FC5167;
            }
          }
        }
      }

    }
  }
  
</style>