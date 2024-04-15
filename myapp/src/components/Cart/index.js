import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const Cart = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const paymentHandler = (e) => {
    axios.post(`http://localhost:5000/order`, {
      amount: totalCost * 100,
      currency: "INR",
      receipt: "sdfghbfg",
    })
    .then(response => {
      const order = response.data;
      var options = {
        "key": "rzp_test_iIdXGzwGVLePDc",
        "amount": order.amount,
        "currency": "INR",
        "name": "Nanoquest LLP",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": order.id,
        "handler": function (response) {
          const body = {
            ...response
          };
          axios.post('http://localhost:5000/order/validate', body)
            .then(validateRes => {
              const jsonRes = validateRes.data;
              console.log("jsonRes", jsonRes);
            })
            .catch(error => {
              console.error("Error validating order:", error);
            });
        },
        "prefill": {
          "name": "Kavya",
          "email": "kavya@example.com",
          "contact": "9000090000"
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    })
    .catch(error => {
      console.error("Error creating order:", error);
    });
  };

  const onRemove = (course_id) => {
    const user_id = localStorage.getItem("id");
    axios.delete(`http://localhost:5000/enroll/removecourse?user_id=${user_id}&course_id=${course_id}`)
      .then(res => {
        if (res && res.data && res.data.success === true) {
          fetchEnrolledCourses();
          console.log("Course removed successfully");
        } else {
          console.error("Failed to remove course:", res.data.message);
        }
      })
      .catch(err => {
        console.error("Error removing course:", err);
      });
  };

  const clearCart = () => {
    const user_id = localStorage.getItem("id");
    axios.delete(`http://localhost:5000/enroll/clearcart?user_id=${user_id}`)
      .then(res => {
        if (res && res.data && res.data.success === true) {
          console.log("Cart cleared successfully");
          setEnrolledCourses([]);
          setTotalCost(0);
        } else {
          console.error("Failed to clear cart:", res.data.message);
        }
      })
      .catch(err => {
        console.error("Error clearing cart:", err);
      });
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = () => {
    const user_id = localStorage.getItem("id");
    axios.get(`http://localhost:5000/enroll/enrolledcourses?user_id=${user_id}`)
      .then(res => {
        if (res && res.data && res.data.success === true) {
          const courses = res.data.enrolledCourses;
          let total = 0;
          courses.forEach(course => {
            if (course.course_price !== "Free") {
              total += parseInt(course.course_price);
            }
          });
          setEnrolledCourses(courses);
          setTotalCost(total);
        } else {
          console.error("Failed to fetch enrolled courses:", res.data.message);
        }
      })
      .catch(err => {
        console.error("Error fetching enrolled courses:", err);
      });
  };

  return (
    <div className="cart-container">
      <h2 style={{textAlign: "center", fontSize: "30px", fontWeight: "500", color: "blue"}}>Cart</h2>
      {enrolledCourses.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {enrolledCourses.map(course => (
            <li key={course.id} className="cart-item">
              <p style={{fontSize: "1.3rem"}}>{course.course_name}</p>
              <p style={{fontSize: "1rem", marginTop: "10px"}}>{course.course_price}</p>
              <button className="remove-button" onClick={() => onRemove(course.course_id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p style={{fontSize: "1.3rem", fontWeight: "bold"}}>Total: {totalCost}</p>
      <button onClick={clearCart} className="clear-button">Clear Cart</button>
      <Link to="#">
        <button disabled={enrolledCourses.length === 0} className="checkout-button" onClick={(e) => paymentHandler(e)}>Checkout</button>
      </Link>
      <Link to='/courses'>
        <button className="add-more-button">Add More</button>
      </Link>
    </div>
  );
};

export default Cart;
