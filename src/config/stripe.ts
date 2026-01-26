import { envVars } from "./envVars";
import Stripe from "stripe";

const stripe =new Stripe(envVars.STRIPE.STRIPE_SECRECT_KEY);

export default stripe;