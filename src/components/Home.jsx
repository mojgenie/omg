import React, { useEffect, useState } from "react";
import TicketLabel from "./TicketLabel";
import ProceedLabel from "./ProceedLabel";

function Home() {
    const [step, setStep] = useState(0);
    const [proceed, setProceed] = useState(false);

    const [tickets, setTickets] = useState([
        {
            id: 1,
            title: "Gold ",
            count: 0,
            noOf: 4,
            price: 3333,
            type: "gold",
        },
        {
            id: 2,
            title: "Gold ",
            count: 0,
            noOf: 3,
            price: 2222,
            type: "gold",
        },
        {
            id: 3,
            title: "Gold ",
            count: 0,
            noOf: 1,
            price: 999,
            type: "gold",
        },
        {
            id: 4,
            title: "Siver",
            count: 0,
            noOf: 1,
            price: 499,
            type: "silver",
        },
    ]);

    const updateCount = (itemId, count) => {
        // Create a new array with the updated value
        const updatedItems = tickets.map((item) =>
            item.id === itemId ? { ...item, count: count + 1 } : item
        );

        // Update the state with the new array
        setTickets(updatedItems);
    };
    const handleAdd = (itemId, count) => {
        // Create a new array with the updated value
        const updatedItems = tickets.map((item) =>
            item.id === itemId ? { ...item, count: count + 1 } : item
        );

        // Update the state with the new array
        setTickets(updatedItems);
    };
    const handleRemove = (itemId, count) => {
        // Create a new array with the updated value
        const updatedItems = tickets.map((item) =>
            item.id === itemId ? { ...item, count: count - 1 } : item
        );

        // Update the state with the new array
        setTickets(updatedItems);
    };

    useEffect(() => {
        console.clear();
        console.log("tickets : ", tickets);
    }, [tickets]);
    return (
        <div>
            <div class="max-w-[800px] mx-auto">
                {tickets?.map((ticket) => (
                    <TicketLabel
                        id={ticket?.id}
                        noOf={ticket?.noOf}
                        step={step}
                        setStep={setStep}
                        client:load
                        gold={ticket?.type === "gold"}
                        title={ticket?.title}
                        count={ticket?.count}
                        price={ticket?.price}
                        updateCount={updateCount}
                        handleAdd={handleAdd}
                        handleRemove={handleRemove}
                    />
                ))}
            </div>

            {tickets[0].count > 0 ||
            tickets[1].count > 0 ||
            tickets[2].count > 0 ||
            tickets[3].count > 0 ? (
                <ProceedLabel setProceed={setProceed} />
            ) : null}
        </div>
    );
}

export default Home;
