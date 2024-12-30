"use client";

import { useSelector } from "react-redux";
import Image from "next/image";
const OrderHisatory = () => {
  const { allOrders, userDeliveryAddress } = useSelector(
    (state) => state.orderDetailsContainerSlice
  );

  if (allOrders.length === 0) {
    return (
      <div>
        <h1>Order History Empty </h1>
      </div>
    );
  }

  return (
    <div className="w-[100%] flex gap-3">
      <div className="basis-[70%] ">
        {allOrders.map((mapProp) => (
          <OrdersCart orderProp={mapProp} />
        ))}
      </div>
      <div>
        {/* --------- order location */}
        <div className="basis-[30%] flex flex-col justify-end ">
          <h1 className="text-[1.6rem] font-bold ">Delivery Address</h1>
          <p className="font-bold">Name: {userDeliveryAddress?.fullname}</p>
          <div className="flex gap-2">
            <p className="font-semibold text-[0.8rem] text-[#6e747b]">
              Email: {userDeliveryAddress?.email}{" "}
            </p>
            <p className="font-semibold text-[0.8rem] text-[#6e747b]">
              Ph No:{userDeliveryAddress?.phoneNumber}{" "}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold text-[0.8rem] text-[#6e747b]">
              State: {userDeliveryAddress?.state}
            </p>
            <p className="font-semibold text-[0.8rem] text-[#6e747b]">
              City: {userDeliveryAddress?.city}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold text-[0.8rem] text-[#6e747b]">
              Pin Code: {userDeliveryAddress.pinCode}
            </p>
            <p className="font-semibold text-[0.8rem] text-[#6e747b]">
              Land Mark:{userDeliveryAddress.landMark}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrdersCart = ({ orderProp }) => {
  return (
    <div className="w-[100%] mb-3">
      <div className="flex">
        <div>
          <Image
            src={orderProp?.thumbnail}
            alt={orderProp?.title}
            width={100}
            height={100}
            loading="lazy"
          />
        </div>

        <div>
          <h1 className="text-[1.3rem] font-bold"> {orderProp?.title}</h1>
          <p className="font-semibold text-[0.8rem] text-[#6e747b]">
            Warranty: {orderProp?.warrantyInformation}
          </p>
          <p className="font-semibold text-[0.8rem] text-[#6e747b]">
            Shipment In: {orderProp?.shippingInformation}
          </p>
          <p className="font-semibold text-[0.8rem] text-[#6e747b]">
            Description: {orderProp?.description}
          </p>
          <p className="font-semibold">Price: ${orderProp?.price}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderHisatory;
