import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppProvider'

function Orders() {
  const [orders, setOrders] = useState([]);
  const { axios } = useAppContext();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      console.log(data)
      if (data.success) {
        setOrders(data.orders)
      }
    } catch (error) {
      console.log(error?.message);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  console.log(orders)
  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order, index) => (
          <div key={index} className="flex flex-col md:items-center md:flex-row gap-5 justify-between
           p-5 w-full rounded-md border border-gray-300">
            <div className="flex gap-5">
              <div>
                {order.items.map((item, index) => (
                  <div key={index} className={`flex flex-col max-w-80 ${index > 0 && "mt-4"}`}>
                    <p className="font-medium">
                      {item.product.name}{" "}<span className={"text-primary"}>x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm md:text-base text-black/60">
              <p className='text-black/80'>{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}, {order.address.city}</p>
              <p> {order.address.state}, {order.address.zipcode}, {order.address.country}</p>
              <p></p>
              <p>{order.address.phone}</p>
            </div>

            <p className="font-medium text-lg my-auto">Rs.{order.amount}</p>

            <div className="flex flex-col text-sm md:text-base text-black/60">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders