import React, { useState, useEffect } from "react";
import "../AddCustomer/AddCustomer.css"; // Reusing the existing CSS
import { toast } from "react-toastify";
import { useAuth } from "../../api/auth";

const AddTransaction = () => {
  const { user, API } = useAuth();

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    customerId: "",
    datetime: getCurrentDateTime(),
    amountWithdrawn: "",
    txnDoneBy: user._id,
    earnings: "",
    bank: "",
    remark: "",
    txnApp: "",
    txnId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (formData.c_id) {
        checkCustomerExists();
      }
    }, 300); // Debounce time in milliseconds

    return () => clearTimeout(delayDebounceFn);
  }, [formData.customerId]); // Re-run effect if Aadhaar number changes

  const checkCustomerExists = async () => {
    try {

      const response = await fetch(
        `${API}/api/checkCustomerExists/${formData.customerId}`
      );
     
      const res_data = await response.json();

      if (response.ok) {
        setFormData((prevState) => ({
          ...prevState,
          customerExists: res_data.exists,
        }));
        if (res_data.exists) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Customer Already Exists!",
          });
        }
      } else {
        // toast.error(
        //   res_data.extraDetails ? res_data.extraDetails : res_data.message
        // );

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res_data.extraDetails
            ? res_data.extraDetails
            : res_data.message,
        });
      }
    } catch (error) {
      console.error("Error checking customer existence:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user) {
        toast.error("Pehle Login Karo");
        return;
      }
console.log("form dtat", formData)

      // const response = await fetch(`${API}/api/AddTransaction`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      // const resData = await response.json();

      // if (response.ok) {
      //   toast.success("Transaction added successfully");
      // } else {
      //   toast.error(
      //     resData.extraDetails ? resData.extraDetails : resData.message
      //   );
      // }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="add-c-data">
        <div className="form-container">
          <h1 style={{ marginBottom: "10px" }}>Add Transaction Data:</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="inputbox">
                <input
                  type="text"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  required
                />
                <span>Customer ID</span>
              </div>
              <div className="inputbox">
                <input
                  type="datetime-local"
                  name="datetime"
                  value={formData.datetime}
                  onChange={handleChange}
                  required
                />
                <span
                  style={{
                    backgroundColor: "white",
                    margin: "2px",
                    width: "60%",
                  }}
                >
                  Date and Time
                </span>
              </div>
            </div>

            <div className="form-group"><div className="inputbox">
                <input
                  type="text"
                  name="bank"
                  value={formData.bank}
                  onChange={handleChange}
                  required
                />
                <span>Bank</span>
              </div>
              
              <div className="inputbox">
                <input
                  type="text"
                  name="txnId"
                  value={formData.txnId}
                  onChange={handleChange}
                  required
                />
                <span>Transaction Id</span>
              </div>
            </div>

            <div className="form-group">
              <div className="inputbox">
                <input
                  type="number"
                  name="amountWithdrawn"
                  value={formData.amountWithdrawn}
                  onChange={handleChange}
                  required
                />
                <span>Amount Withdrawn</span>
              </div><div className="inputbox">
                <input
                  type="number"
                  name="earnings"
                  value={formData.earnings}
                  onChange={handleChange}
                  required
                />
                <span>Earnings</span>
              </div>
              
            </div>

            <div className="form-group">
              <div className="inputbox">
                <input
                  type="text"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                 placeholder="(if any)"
                />
                <span>Remark</span>
              </div>
              <div className="inputbox">
                <select
                  name="txnApp"
                  value={formData.txnApp}
                  onChange={handleChange}
                  required
                >
                  <option value="ZeeshanPaynearby">Zeeshan(Paynearby)</option>
                  <option value="MummyPaynearby">Mummy(Paynearby)</option>
                  <option value="ZeeshanSpiceMoney">Z Spice Money</option>
                </select>
                <span>Transaction App</span>
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { AddTransaction };
