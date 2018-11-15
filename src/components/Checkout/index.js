import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';
import './index.css';

const Checkout = ({ 
	name, 
	handlePaymentSuccess, 
	description, 
	amount, 
	onSuccess,
	image 
}) => {

	const Success = data => {
		onSuccess(data);
	};
		
	const CURRENCY = "USD";
	const STRIPE_PUBLISHABLE = "pk_test_mbdEOcSayIKHRgfDpXIEtD43";
	const PAYMENT_SERVER_URL = '';

	const fromUSDToCent = amount => amount * 100;


	const onToken = (amount, description) => token =>
			
		axios.post( 
			PAYMENT_SERVER_URL,
			{
				description, 
				'source': token.id,
				'currency': CURRENCY,
				'amount': amount,
				userID: localStorage.getItem('user_id')
			},{
				headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
				}
			}
		).then(res => {
			return Success(res);
		}).catch(error => console.log(error));
					
		return (
			<StripeCheckout
			name={name}
			description={description}
			image = {image}
			amount={fromUSDToCent(amount)}
			token={onToken(amount, description)}
			currency={CURRENCY}
			stripeKey={STRIPE_PUBLISHABLE}
		/>
	)
};
export default Checkout;
