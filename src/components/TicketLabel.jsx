import React, { useState } from "react";

function TicketLabel({
    id,
    gold,
    silver,
    title,
    count,
    price,
    noOf,
    setStep,
    updateCount,
    handleAdd,
    handleRemove,
    onProceed,
    tickets,
    active,
    setActive,
}) {
    return (
        <div className="px-3 py-5 flex items-center justify-between m-5 shadow rounded-[25px]">
            <div>
                <h2
                    className={`text-md font-extrabold ${
                        gold ? "text-[#FF9119]" : "text-[#C0C0C0]"
                    }`}
                >
                    {title}
                    <span className="text-sm font-light text-gray-500">
                        × ({noOf} pax per ticket)
                    </span>
                </h2>
                <p className="my-2 text-sm text-gray-500">
                    ₹ <span>{price}</span>
                </p>
            </div>

            {count === 0 ? (
                <button
                    onClick={() => {
                        if (
                            active === undefined ||
                            active === null ||
                            active === id
                        ) {
                            setStep(1);
                            updateCount(id, count, noOf, tickets);
                            onProceed(noOf);
                            setActive(id);
                        }
                    }}
                    id="addButton"
                    type="button"
                    className={`text-white ${
                        gold && (active === null || active === undefined)
                            ? "bg-[#FF9119] hover:bg-[#FF9119]/80"
                            : silver &&
                              (active === null || active === undefined)
                            ? "bg-[#C0C0C0] hover:bg-[#C0C0C0]/80"
                            : "bg-[#EAECEC] hover:bg-[#EAECEC]/80"
                    }   font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2`}
                >
                    <div className="inline-flex items-center">
                        <svg
                            className="w-3.5 h-3.5 me-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 21"
                        >
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"></path>
                        </svg>
                        ADD
                    </div>
                </button>
            ) : null}

            {count !== 0 ? (
                <div
                    id="counterButton"
                    type="button"
                    className={`text-white ${
                        gold
                            ? "bg-[#FF9119] hover:bg-[#FF9119]/80"
                            : "bg-[#C0C0C0] hover:bg-[#C0C0C0]/80"
                    } focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm text-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 `}
                >
                    <div className="inline-flex items-center gap-1">
                        <span
                            className="px-5 py-2.5 cursor-pointer"
                            onClick={() => {
                                handleRemove(id, count, noOf, tickets);
                                onProceed(noOf);
                                if (count === 1) {
                                    setActive();
                                }
                            }}
                        >
                            -
                        </span>
                        {count}
                        <span
                            className="px-5 py-2.5 cursor-pointer"
                            onClick={() => {
                                handleAdd(id, count, noOf, tickets);
                                onProceed(noOf);
                            }}
                        >
                            +
                        </span>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default TicketLabel;
