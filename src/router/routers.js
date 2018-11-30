// const Home = r => require.ensure([], () => r(require('../page/home/home1')), 'home1')
const Home = () => import('../page/home/home1')
const QuanlitySign = () => import('../page/quanlitySign/quanlitySign')
const SignDetail = () => import('../page/signDetail/signDetail')

export default [
	{
		path: '',
		redirect: '/quanlitySign'
	},
	{
		path: '/quanlitySign',
		component: QuanlitySign,
		meta: {
			title: '派送列表',
			index: 0
		}
	},
	{
		path: '/signDetail',
		component: SignDetail,
		meta: {
			title: '派送详情',
			index: 1
		}
	},
	{
		path: '/home1',
		component: Home
	}
]
