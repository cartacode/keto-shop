const baseUrl = 'http://localhost:8080'
const apiWrapper = (url, method='GET', data=null) => {
	return new Promise((resolve, reject) => {
		// let fetchOptions = {
		// 	method: method,
		// 	credentials: 'same-origin',
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'application/json',
		// 	},

		// }

		// if (method === 'POST') {
		// 	fetchOptions.body = JSON.stringify(data);
		// }


		fetch(url)
			.then((res) => {
				console.log('res: res: ')
				return res.json()
			})
			.then((data) => {
				console.log('data: data: ', data)
				resolve(data)
			})
			.catch((err) => { 
				console.log('err: err: ', err)
				reject(err)
			})
	});
	
}

export const getProductsApi = () => {
	return apiWrapper(`${baseUrl}/products`);
}
