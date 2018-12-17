import axios from 'axios'
import queryString from 'query-string'
import ui from '../modules/ui/ui'
import {
	hostURL
} from './env'
import responseBack from './responseBack'

const instance = axios.create({
	baseURL: hostURL(),
	timeout: 30000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
	}
})

instance.interceptors.request.use(function (config) {
	ui.loading()
	return config
}, function (error) {
	ui.toast({title: '', msg: error.message})
	return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
	const newResponse = response.data
	ui.hideLoading()
	if (!newResponse.success) {
		ui.toast({title: '', msg: newResponse.msg})
		return Promise.reject(newResponse.msg)
	}
	return newResponse
}, function (error) {
	ui.hideLoading()
	if (error && error.response) {
		const statusValue = responseBack(error.response.status)
		ui.toast({title: '', msg: statusValue})
	}

	return Promise.reject(error)
})

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch (url, params = {}) {
	return new Promise((resolve, reject) => {
		instance.get(url, {
			params: params
		})
			.then(response => {
				resolve(response.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch (url, data = {}) {
	return new Promise((resolve, reject) => {
		instance.patch(url, data)
			.then(response => {
				resolve(response.data)
			}, err => {
				reject(err)
			})
	})
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put (url, data = {}) {
	return new Promise((resolve, reject) => {
		instance.put(url, data)
			.then(response => {
				resolve(response.data)
			}, err => {
				reject(err)
			})
	})
}

/**
 * 封装uploadFile请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function uploadFile (params) {
	const {
		url = '',
		data = {}
	} = params
	return new Promise((resolve, reject) => {
		instance.post(url, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then(response => {
			resolve(response.data)
		}, err => {
			reject(err)
		})
	})
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export default function post (params) {
	const {
		url = '',
		data = {}
	} = params
	return new Promise((resolve, reject) => {
		instance.post(url, queryString.stringify(data))
			.then(response => {
				resolve(response)
			}, err => {
				reject(err)
			})
	})
}
