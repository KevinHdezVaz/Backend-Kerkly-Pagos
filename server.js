 
const stripe = require('stripe')('sk_test_51KnpjyGC5CZPzSfGi95F4MeAMsHqt5Zh8M2hfRS3pInYp5pC7VfpDgHCXVfrnk0zErBA7k0Uubit55XZzryhYPhQ004eWSqxr5');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.


const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client

  console.log(items[0].amount)

  return items[0].amount;
};

app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2020-08-27'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'mxn',
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51KnpjyGC5CZPzSfGrv3rhilqycFro7CnKiCD3Tq0Kk6ybIse3gfcCHF2y10cT9wQJDdsffgd4cHgEIzyU1vOqCrp00WAeTQXg7'
  });
});