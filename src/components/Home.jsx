import React, { useEffect, useState } from "react";
import TicketLabel from "./TicketLabel";
import ProceedLabel from "./ProceedLabel";
import Form from "./Form";

function Home() {
    const [step, setStep] = useState(0);
    const [proceed, setProceed] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [users, setUsers] = useState([]);

    const [tickets, setTickets] = useState([
        {
            id: 1,
            title: "Gold ",
            count: 0,
            noOf: 4,
            price: 3333,
            type: "gold",
            tickets: 0,
        },
        {
            id: 2,
            title: "Gold ",
            count: 0,
            noOf: 3,
            price: 2222,
            type: "gold",
            tickets: 0,
        },
        {
            id: 3,
            title: "Gold ",
            count: 0,
            noOf: 1,
            price: 999,
            type: "gold",
            tickets: 0,
        },
        {
            id: 4,
            title: "Siver",
            count: 0,
            noOf: 1,
            price: 499,
            type: "silver",
            tickets: 0,
        },
    ]);

    const updateCount = (itemId, count, updateBy = 0, ticketsCout) => {
        const updatedItems = tickets.map((item) =>
            item.id === itemId
                ? { ...item, count: count + 1, tickets: ticketsCout + updateBy }
                : item
        );

        setTickets(updatedItems);
    };
    const handleAdd = (itemId, count, updateBy = 0, ticketsCout) => {
        const updatedItems = tickets.map((item) =>
            item.id === itemId
                ? { ...item, count: count + 1, tickets: ticketsCout + updateBy }
                : item
        );

        setTickets(updatedItems);
    };
    const handleRemove = (itemId, count, updateBy = 0, ticketsCout) => {
        const updatedItems = tickets.map((item) =>
            item.id === itemId
                ? { ...item, count: count - 1, tickets: ticketsCout - updateBy }
                : item
        );

        setTickets(updatedItems);
    };

    function generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    let temp = 0;
    let total_price = 0;
    const onProceed = (updateBy) => {
        // setTotalCount(0);
        // tickets.map((ticket) => {
        //     // temp = temp + ticket.count;
        //     setTotalCount((prevCount) => prevCount + ticket.count);
        // });

        const updateUserArray = () => {
            const usersArray = [];

            for (let i = 0; i < totalCount; i++) {
                const user = {
                    id: generateUniqueId(),
                    name: ``,
                    email: ``,
                    phone: ``,
                };

                usersArray.push(user);
            }

            setUsers(usersArray);
        };
        updateUserArray();
        // setTotalCount(temp);
    };
    const ticketCount = () => {};

    // Function to update the value of a specific property in the array
    const updateUserName = (userId, newValue, type) => {
        // Create a new array with the updated object
        const updatedUsers = users.map((user) => {
            if (user.id === userId && type === "name") {
                // Update the specified property (name in this case)
                return { ...user, name: newValue };
            } else if (user.id === userId && type === "email") {
                // Update the specified property (name in this case)
                return { ...user, email: newValue };
            } else if (user.id === userId && type === "phone") {
                // Update the specified property (name in this case)
                return { ...user, phone: newValue };
            }
            return user;
        });

        // Update the state with the new array
        setUsers(updatedUsers);
    };

    const updateAllUsers = () => {
        const primaryUSer = users[0];

        const updatedUsers = users.map((user) => {
            return {
                ...user,
                name: primaryUSer?.name,
                email: primaryUSer?.email,
                phone: primaryUSer?.phone,
            };
        });
        setUsers(updatedUsers);
    };

    useEffect(() => {
        setTotalCount(0);
        tickets.map((ticket) => {
            total_price = total_price + ticket.count * ticket.price;
        });

        tickets.map((ticket) => {
            // temp = temp + ticket.count;
            setTotalCount((prevCount) => prevCount + ticket.tickets);
        });

        setTotalPrice(total_price);
    }, [tickets]);

    useEffect(() => {
        console.clear();
        console.log("tickets : ", tickets);
        // console.log("totalCount : ", totalCount);
        console.log("users : ", users);
    }, [tickets, totalCount, users]);
    return (
        <div>
            <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center my-5 mb-[50px]">
                {proceed == false ? "Select your " : "Confrom your "}
                <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                    Ticket's
                </span>
            </h1>
            {proceed === true ? (
                <div>
                    {users.map((user, index) => {
                        return (
                            <>
                                <div key={index}>
                                    <p className="text-sm font-light text-gray-500 px-5 pb-5">
                                        Tiket :{index + 1}
                                    </p>
                                    <Form
                                        key={index}
                                        id={user?.id}
                                        updateUserName={updateUserName}
                                        name={user?.name}
                                        email={user?.email}
                                        phone={user?.phone}
                                    />
                                </div>

                                {index === 0 && users?.length > 1 && (
                                    <div className="px-5">
                                        <label className="relative inline-flex items-center cursor-pointer ">
                                            <input
                                                type="checkbox"
                                                value=""
                                                className="sr-only peer"
                                                onClick={() => {
                                                    updateAllUsers();
                                                }}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                Same as Tikcet : 1
                                            </span>
                                        </label>
                                    </div>
                                )}
                            </>
                        );
                    })}
                </div>
            ) : (
                <div>
                    <div className="max-w-[800px] mx-auto">
                        {tickets?.map((ticket) => (
                            <TicketLabel
                                onProceed={onProceed}
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
                                tickets={ticket.tickets}
                            />
                        ))}
                    </div>
                </div>
            )}
            {tickets[0].count > 0 ||
            tickets[1].count > 0 ||
            tickets[2].count > 0 ||
            tickets[3].count > 0 ? (
                <ProceedLabel
                    name={users.name}
                    email={users.email}
                    phone={users.phone}
                    totalCount={totalCount}
                    proceed={proceed}
                    setProceed={setProceed}
                    onProceed={onProceed}
                    totalPrice={totalPrice}
                />
            ) : null}
        </div>
    );
}

export default Home;
