/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

export const ENV = process.env.NODE_ENV
export const DEV = 'development'
export const PRO = 'production'
export const devHost = 'ksudi.wicp.net'
export const proHost = '106.14.246.24'
export const devImgUrl = 'ksudi.wicp.net'
export const proImgUrl = '106.14.246.24'

const newBaseURLMapping = {
	[DEV]: `http://${devHost}`,
	[PRO]: `http://${proHost}`
}

const imgBaseURLMapping = {
	[DEV]: `http://${devImgUrl}`,
	[PRO]: `http://${proImgUrl}`
}

const phpImgBaseURLMapping = {
	[DEV]: `http://${devHost}`,
	[PRO]: `http://${proHost}`
}

export const routerMode = 'hash'

export function hostURL (url = '') {
	return `${newBaseURLMapping[String(ENV)]}${url}`
}

export const imgBaseUrl = imgBaseURLMapping[String(ENV)]
export const phpImgUrl = phpImgBaseURLMapping[String(ENV)]

export default {}
