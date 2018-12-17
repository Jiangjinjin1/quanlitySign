import fetchApi from '../config/fetch'

export const getSignList = async (params) => {
	const {
		page = '1',
		destcode = '170'
	} = params
	const result = await fetchApi({
		url: '/portal/frontApi/list',
		data: {
			page,
			limit: '20',
			destcode
		}
	})
	return result.obj
}

export const confirmSign = async (params) => {
	const {
		type,
		destcode = '',
		ids = ''
	} = params
	const result = await fetchApi({
		url: '/portal/frontApi/claim',
		data: {
			type,
			destcode,
			ids
		}
	})
	return result
}
