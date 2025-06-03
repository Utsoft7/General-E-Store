import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

const generateOrderId = () => {
  return (
    "ORD-" +
    Date.now() +
    "-" +
    Math.random().toString(36).substr(2, 9).toUpperCase()
  );
};

const calculateEstimatedDelivery = () => {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  return deliveryDate;
};

export const createOrder = async (req, res) => {
  try {
    const { customerInfo, items } = req.body;

    if (!customerInfo || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Customer information and items are required",
      });
    }

    const productIds = items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== items.length) {
      return res.status(400).json({
        success: false,
        message: "Some products are no longer available",
      });
    }

    let subtotal = 0;
    const orderItems = items.map((item) => {
      const product = products.find((p) => p._id.toString() === item.productId);
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
        currency: product.currency || "USD",
        productDetails: {
          description: product.description,
          category: product.category,
          seller: {
            name: product.seller.name,
            email: product.seller.email,
            phone: product.seller.phone,
            address: product.seller.address,
            businessName: product.seller.businessName,
            businessType: product.seller.businessType,
          },
        },
      };
    });

    const tax = subtotal * 0.08;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const total = subtotal + tax + shipping;

    const newOrder = new Order({
      orderId: generateOrderId(),
      customerInfo: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.state,
        zipCode: customerInfo.zipCode,
        country: customerInfo.country || "US",
      },
      items: orderItems,
      orderSummary: {
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
      },
      status: "confirmed",
      paymentStatus: "paid",
      orderDate: new Date(),
      estimatedDelivery: calculateEstimatedDelivery(),
    });

    const savedOrder = await newOrder.save();

    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    res.status(201).json({
      success: true,
      message: "Order confirmed successfully",
      data: {
        _id: savedOrder._id,
        orderId: savedOrder.orderId,
        customerInfo: savedOrder.customerInfo,
        items: savedOrder.items,
        orderSummary: savedOrder.orderSummary,
        status: savedOrder.status,
        paymentStatus: savedOrder.paymentStatus,
        orderDate: savedOrder.orderDate,
        estimatedDelivery: savedOrder.estimatedDelivery,
        createdAt: savedOrder.createdAt,
        updatedAt: savedOrder.updatedAt,
        __v: savedOrder.__v,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCustomerOrders = async (req, res) => {
  try {
    const { email } = req.params;

    const orders = await Order.find({
      "customerInfo.email": email,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
