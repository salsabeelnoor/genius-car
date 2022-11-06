import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const CheckOut = () => {
  const { _id, title, price } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };

    //call orders API
    // if (phone.length > 10) {
    //   alert("Phone number should be 10 charachters or longer");
    // }
    // else {

    // }
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("Order Placed Successfully");
          form.reset();
        }
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handlePlaceOrder} className="my-5">
        <div className="my-5">
          <h2 className="text-4xl">You are about to order: {title}</h2>
          <h4 className="text-3xl my-3">Price: {price}</h4>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input input-ghost w-full max-w-xs input-bordered"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-ghost w-full max-w-xs input-bordered"
          />
          <input
            name="phone"
            type="text"
            placeholder="Your Phone"
            required
            className="input input-ghost w-full max-w-xs input-bordered"
          />
          <input
            name="email"
            type="text"
            defaultValue={user?.email}
            readOnly
            placeholder="Your Email"
            className="input input-ghost w-full max-w-xs input-bordered"
          />
        </div>
        <textarea
          required
          name="message"
          className="textarea textarea-bordered h-24 w-full my-4"
          placeholder="Your message"
        ></textarea>
        <input className="btn" type="submit" value="Place your order" />
      </form>
    </div>
  );
};

export default CheckOut;
