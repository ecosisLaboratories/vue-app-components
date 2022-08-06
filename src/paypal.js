import { loadScript } from '@paypal/paypal-js'

export default async function PayPalButton() {
  try {
    paypal = await loadScript({ "client-id": "sb" });
    return paypal.Buttons.driver("vue", Vue);
  } catch (e) {
    console.log(e)
  }
}
