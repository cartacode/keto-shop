const baseUrl = 'http://localhost:8080'
export const apiWrapper = (url, method='GET', data=null) => {
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
			.then((res) => res.json())
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});
	
}

export const getProductsApi = () => {
	return apiWrapper(`${baseUrl}/products`);
}
