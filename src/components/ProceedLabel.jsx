import React from "react";

function ProceedLabel({
    setProceed,
    proceed,
    onProceed,
    totalCount,
    totalPrice,
}) {
    return (
        <div className="flex justify-between p-5 border fixed bottom-0 w-full bg-white">
            <div>
                <p className="text-md font-extrabold">
                    ₹ <span>{totalPrice}</span>
                </p>
                <p className="`my-2 text-sm font-light text-gray-500">
                    <span className="">{totalCount}</span>
                    Ticket
                </p>
            </div>
            {proceed === false ? (
                <button
                    onClick={() => {
                        setProceed(true);
                        onProceed();
                    }}
                    type="button"
                    className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
                >
                    Confirm
                </button>
            ) : (
                <button
                    type="submit"
                    className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
                >
                    Proceed to payment
                </button>
            )}
        </div>
    );
}

export default ProceedLabel;
