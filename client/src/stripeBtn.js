import React, {Fragment} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const stripeBtn = () => {
  const publishableKey = 'pk_test_JjzeOPJ8ceTQEnODF3ddpPDT00S6kfk4mN'

  const onToken = token => {
    const body = {
      amount: 999,
      token: token
    }

    axios
      .post('http://localhost:8080/payment', body)
      .then(response => {
        console.log(response)
        alert('Payment Success')
      })
      .catch(error => {
        console.log('Payment Error: ', error)
        alert('Payment Error')
      })
  }

  return (
    <StripeCheckout
      label="Checkout" //Component button text
      name="Business LLC" //Modal Header
      description="Upgrade to a premium account today."
      panelLabel="Checkout" //Submit button in modal
      amount={999} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      // image="https://www.vidhub.co" //Pop-in header image
      billingAddress={false}
    />
  )
}

export default stripeBtn
