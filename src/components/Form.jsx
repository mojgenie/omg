import React, { useState } from "react";

function Form({ id, updateUserName, name, email, phone,errors, setErrors }) {
      const handleNameChange = (e) => {
    if (e.target.value === "") {
      updateUserName(id, e.target.value, "name");
      setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
      updateUserName(id, e.target.value, "name");
    }
  };

  const handleEmailChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (e.target.value === "") {
      updateUserName(id, e.target.value, "email");
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email is required" }));
    } else if (!emailRegex.test(e.target.value)) {
      updateUserName(id, e.target.value, "email");
      setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      updateUserName(id, e.target.value, "email");
    }
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = e.target.value.replace(/\D/g, "").substr(0, 10);
    const isValidPhone = formattedPhone.length === 10;

    updateUserName(id, formattedPhone, "phone");

    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: isValidPhone ? "" : "Phone number must be 10 digits",
    }));
  };
    return (
        <>
            <form className="max-w-md mx-auto px-5">
                <div className="">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="floating_first_name"
                            id="floating_first_name"
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.name ? "border-red-500" : ""}`}
                            placeholder=" "
                            required
                            onChange={handleNameChange}
                            value={name}
                        />
                        <label
                            for="floating_first_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            First name
                        </label>
                        {errors.name && (<p className="text-red-500 text-xs mt-1">{errors.name}</p>)}
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.email ? "border-red-500" : ""}`}
                        placeholder=" "
                        required
                        onChange={handleEmailChange}
                        value={email}
                    />
                    <label
                        for="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email address
                    </label>
                    {errors.email && (<p className="text-red-500 text-xs mt-1">{errors.email}</p> )}
                </div>

                <div className=" ">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="tel"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            name="floating_phone"
                            id="floating_phone"
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.phone ? "border-red-500" : ""}`}
                            placeholder=" "
                            required
                            onChange={handlePhoneChange}
                            value={phone}
                        />
                        <label
                            for="floating_phone"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Phone number (123-456-7890)
                        </label>
                        {errors.phone && (<p className="text-red-500 text-xs mt-1">{errors.phone}</p>)}
                    </div>
                </div>
            </form>
        </>
    );
}

export default Form;
