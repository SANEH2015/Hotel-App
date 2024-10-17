import React, { useState } from 'react';
import Footer from '../component/Footer';

const PaymentPage = () => {
  const [cartItems, setCartItems] = useState([
    { name: "Product 1", price: 15 },
    { name: "Product 2", price: 5 },
    { name: "Product 3", price: 8 },
    { name: "Product 4", price: 2 },
  ]);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container mx-auto p-4">
      

      <div className="flex flex-wrap -mx-4">
        {/* Billing Address Form */}
        <div className="w-full md:w-3/4 px-4">
          <div className="bg-gray-100 p-6 border rounded-lg">
            <form action="/action_page.php">
              {/* Billing Address Section */}
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-4">Billing Address</h3>

                {/* Full Name */}
                <label htmlFor="fname" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input type="text" id="fname" name="firstname" placeholder="John M. Doe" className="w-full p-3 border border-gray-300 rounded-md mb-4" />

                {/* Email */}
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input type="text" id="email" name="email" placeholder="john@example.com" className="w-full p-3 border border-gray-300 rounded-md mb-4" />

                {/* Address */}
                <label htmlFor="adr" className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <input type="text" id="adr" name="address" placeholder="542 W. 15th Street" className="w-full p-3 border border-gray-300 rounded-md mb-4" />

                {/* City */}
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <input type="text" id="city" name="city" placeholder="New York" className="w-full p-3 border border-gray-300 rounded-md mb-4" />

                {/* State & Zip */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                      State
                    </label>
                    <input type="text" id="state" name="state" placeholder="NY" className="w-full p-3 border border-gray-300 rounded-md mb-4" />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="zip" className="block text-sm font-semibold text-gray-700 mb-2">
                      Zip
                    </label>
                    <input type="text" id="zip" name="zip" placeholder="10001" className="w-full p-3 border border-gray-300 rounded-md mb-4" />
                  </div>
                </div>
              </div>

              {/* Payment Information Section */}
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-4">Payment</h3>
                <label htmlFor="fname" className="block text-sm font-semibold text-gray-700 mb-2">Accepted Cards</label>
                <div className="flex mb-4">
                  <i className="fa fa-cc-visa text-blue-700 mr-2 text-2xl"></i>
                  <i className="fa fa-cc-amex text-blue-500 mr-2 text-2xl"></i>
                  <i className="fa fa-cc-mastercard text-red-600 mr-2 text-2xl"></i>
                  <i className="fa fa-cc-discover text-orange-600 text-2xl"></i>
                </div>

                <label htmlFor="cname" className="block text-sm font-semibold text-gray-700 mb-2">
                  Name on Card
                </label>
                <input type="text" id="cname" name="cardname" placeholder="John More Doe" className="w-full p-3 border border-gray-300 rounded-md mb-4" />

                <label htmlFor="ccnum" className="block text-sm font-semibold text-gray-700 mb-2">
                  Credit card number
                </label>
                <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" className="w-full p-3 border border-gray-300 rounded-md mb-4" />

                <label htmlFor="expmonth" className="block text-sm font-semibold text-gray-700 mb-2">
                  Exp Month
                </label>
                <input type="text" id="expmonth" name="expmonth" placeholder="September" className="w-full p-3 border border-gray-300 rounded-md mb-4" />

                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="expyear" className="block text-sm font-semibold text-gray-700 mb-2">
                      Exp Year
                    </label>
                    <input type="text" id="expyear" name="expyear" placeholder="2018" className="w-full p-3 border border-gray-300 rounded-md mb-4" />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="cvv" className="block text-sm font-semibold text-gray-700 mb-2">
                      CVV
                    </label>
                    <input type="text" id="cvv" name="cvv" placeholder="352" className="w-full p-3 border border-gray-300 rounded-md mb-4" />
                  </div>
                </div>
              </div>

              <label className="inline-flex items-center mb-4">
                <input type="checkbox" name="sameadr" className="form-checkbox text-green-600" />
                <span className="ml-2 text-sm">Shipping address same as billing</span>
              </label>

              <input type="submit" value="Continue to checkout" className="w-full bg-green-600 text-white p-3 rounded-md cursor-pointer hover:bg-green-700" />
            </form>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="w-full md:w-1/4 px-4">
          <div className="bg-gray-100 p-6 border rounded-lg">
            <h4 className="text-xl font-medium">Cart <span className="float-right text-black"><i className="fa fa-shopping-cart"></i> <b>{cartItems.length}</b></span></h4>
            {cartItems.map((item, index) => (
              <p key={index} className="flex justify-between text-sm">
                <a href="#" className="text-blue-600">{item.name}</a> 
                <span className="text-gray-700">${item.price}</span>
              </p>
            ))}
            <hr className="my-4" />
            <p className="flex justify-between text-lg font-bold">Total <span className="text-black">${totalAmount}</span></p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PaymentPage;
