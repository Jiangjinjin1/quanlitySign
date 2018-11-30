import fetchApi from '../config/fetch'

export const getSignList = async (params) => {
	const {
		username,
		password
	} = params
	const result = await fetchApi({
		url: '/admin/regist',
		data: {
			username,
			password
		}
	})
	return result
}
