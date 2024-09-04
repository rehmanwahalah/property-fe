import axios, { CancelTokenStatic, CancelTokenSource } from 'axios'
import { baseURL } from '../constant/env.constant'


export class HttpService {
	CancelToken: CancelTokenStatic
	source: CancelTokenSource

	constructor() {
		this.CancelToken = axios.CancelToken
		this.source = this.CancelToken.source()
	}

	/**
	 * Set Token On Header
	 * @param token
	 */
	static setToken(token: string | any): void {

		(axios as any).defaults.headers['Authorization'] = `Bearer ${token}`
	}

	/**
	 * Fetch data from server
	 * @param url Endpoint link
	 * @return Promise
	 */
	protected get = async (url: string, params?: any): Promise<any> => {
		const test = await axios.get(`${baseURL}/${url}`, {
			params,
			cancelToken: this.source.token,
		})

		
		return test
	}
	/**
	 * Write data over server
	 * @param url Endpoint link
	 * @param body Data to send over server
	 * @return Promise
	 */
	protected post = async (url: string, body: any, options = {}): Promise<any> => {

		const test = await axios.post(`${baseURL}/${url}`, body, {
			...options,
			cancelToken: this.source.token,
		})
		
		return test
	}

	/**
	 * Delete Data From Server
	 * @param url Endpoint link
	 * @param params Embed as query params
	 * @return Promise
	 */
	protected delete = (url: string, params?: any, data?: any): Promise<any> =>
		axios.delete(`${baseURL}/${url}`, { params, data })

	/**
	 * Update data on server
	 * @param url Endpoint link
	 * @param body Data to send over server
	 * @param params Embed as query params
	 * @return Promise
	 */
	protected put = (url: string, body?: any, params?: any): Promise<any> =>
		axios.put(`${baseURL}/${url}`, body, {
			...params,
			cancelToken: this.source.token,
		})

	private updateCancelToken() {
		this.source = this.CancelToken.source()
	}

	cancel = () => {
		this.source.cancel('Explicitly cancelled HTTP request')
		this.updateCancelToken()
	}
}
