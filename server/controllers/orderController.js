import Product from "../models/Product.js";
import Order from "../models/Order.js"
import User from "../models/User.js"
import stripe from "stripe";

export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body;
        const { userId } = req;

        if (!address || !items || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        let amount = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" });
            }
            amount += product.offerPrice * item.quantity;
        }

        const tax = Math.floor(amount * 0.02);
        amount += tax;

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        });

        res.json({ success: true, message: "Order Placed Successfully!" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}


export const placeOrderStripe = async (req, res) => {
    try {
        const { items, address } = req.body;
        const { userId } = req;
        const { origin } = req.headers;

        if (!address || !items || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        let amount = 0;

        let productData = [];

        for (const item of items) {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            })
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" });
            }
            amount += product.offerPrice * item.quantity;
        }

        const tax = Math.floor(amount * 0.02);
        amount += tax;

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online"
        });

        //stripe gateway initialization
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //create line items for strip
        const line_items = productData.map((item) => ({
            price_data: {
                currency: "LKR",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.floor((item.price + item.price * 0.02) * 100)
            },
            quantity: item.quantity
        }))

        //create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                order_id: order._id.toString(),
                userId,
            }
        })

        res.json({ success: true, url: session.url });

    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}


export const stripeWebhooks = async (req, res) => {
    // Stripe Gateway Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = request.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

    } catch (error) {
        response.status(500).send(`webhook error: ${error?.message}`);
    }

    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting Session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,

            });

            const { orderId, userId } = session.data[0].metadata;
            // Mark Payment as Paid
            await Order.findByIdAndUpdate(orderId, { isPaid: true })
            // Clear user cart
            await User.findByIdAndUpdate(userId, { cartItems: {} });
            break;
        }
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting Session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,

            });

            const { orderId } = session.data[0].metadata;

            await Order.findByIdAndDelete(orderId);
            break;
        }
        default: {
            console.error(`Unhandled evedt type ${event.type}`);
            break;
        }
    }

    res.json({received:true})
}

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });

        res.status(200).json({ success: true, orders });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error?.message });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });

        res.status(200).json({ success: true, orders });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
}