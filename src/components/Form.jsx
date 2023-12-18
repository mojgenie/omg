import React, { useState } from "react";

function Form({ id, updateUser, name, email, phone, setErrors }) {
  
 const ValidateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors(emailRegex.test(email))
    return emailRegex.test(email)
  }

   const ValidatePhone = (phone) => {
    const formattedPhone = phone.replace(/\D/g, "").substr(0, 10);
    const isValidPhone = formattedPhone.length === 10;
    return isValidPhone
 }

  const handlePhoneChange = (e) => {
    const formattedPhone = e.target.value.replace(/\D/g, "").substr(0, 10);
    const isValidPhone = formattedPhone.length === 10;
    updateUser(id, formattedPhone, "phone");
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: isValidPhone,
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
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${name ?'' : "border-red-500"}`}
                            placeholder=" "
                            required
                            onChange={(e)=>updateUser(id, e.target.value, "name")}
                            value={name}
                        />
                        <label
                            htmlFor="floating_first_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            First name
                        </label>
                        {name ?'': (<p className="text-red-500 text-xs mt-1">Name Required</p>)}
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${ValidateEmail(email) ?'' : "border-red-500"}`}
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        placeholder=" "
                        required
                        onChange={(e)=>updateUser(id, e.target.value, "email")}
                        value={email}
                    />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email address
                    </label>
                    {email === '' ?(<p className="text-red-500 text-xs mt-1">Email required</p> ):ValidateEmail(email)?'':<p className="text-red-500 text-xs mt-1">Not a valid email</p> }
                </div>

                <div className=" ">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="tel"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            name="floating_phone"
                            id="floating_phone"
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${ValidatePhone(phone) ?'' : "border-red-500"}`}
                            placeholder=" "
                            required
                            onChange={handlePhoneChange}
                            value={phone}
                        />
                        <label
                            htmlFor="floating_phone"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Phone number (123-456-7890)
                        </label>
                        {phone ? ValidatePhone(phone)?'':<p className="text-red-500 text-xs mt-1">Not a valid phone</p>:(<p className="text-red-500 text-xs mt-1">Phone required</p> ) }
                    </div>
                </div>
            </form>
        </>
    );
}

export default Form;
