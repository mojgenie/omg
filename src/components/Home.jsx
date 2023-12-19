import React, { useEffect, useRef, useState } from "react";
import TicketLabel from "./TicketLabel";
import ProceedLabel from "./ProceedLabel";
import Form from "./Form";
import { ValidateEmail, ValidatePhone, generateUniqueId, scrollToTargetDiv } from "../util";
import addTicket from "../api";
import toast from 'react-hot-toast';

function Home() {
    const targetDivRef = useRef(null);
    const clickCountRef = useRef(0);
    const [step, setStep] = useState(0);
    const [proceed, setProceed] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [users, setUsers] = useState([]);
    const [active, setActive] = useState(null);
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
            title: "silver ",
            count: 0,
            noOf: 1,
            price: 499,
            type: "silver",
            tickets: 0,
        },
    ]);
    const [errors, setErrors] = useState(false);
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(false);

    const transFormUsers = () => {
        setFlag(true)
        const UsersNotEmpty = users && users.every(user => Object.values(user).every(value => value !== ""));
        if (UsersNotEmpty && !errors) {
            const firstUser = users[0];
            const formData = {
                ticket_type: tickets.find((ticket) => ticket.id === active)?.id || '',
                ticket_one: {
                    name: firstUser.name || '',
                    email: firstUser.email || '',
                    ph_no: firstUser.phone || '',
                },
                ...(users.length > 1 && {
                    other_tickets: users.slice(1).map((user) => ({
                        name: user?.name,
                        email: user?.email,
                        ph_no: user?.phone,
                    })),
                }),
            };

            addTicket(formData, setLoading);
        }
    };

    const updateCount = (itemId, count, updateBy = 0, ticketsCout) => {
        const updatedItems = tickets.map((item) =>
            item.id === itemId
                ? { ...item, count: count + 1, tickets: ticketsCout + updateBy }
                : item
        );
        setTickets(updatedItems);
    };

    const notify = () => {
        toast.error(`Maximum ${totalCount} Ticket.` );
        setTimeout(() => {
            clickCountRef.current = 0;
        }, 2000);
    }

    const handleAdd = (itemId, count, updateBy = 0, ticketsCout) => {
        if (ticketsCout + updateBy <= 21) {
            const updatedItems = tickets.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        count: count + 1,
                        tickets: ticketsCout + updateBy,
                    }
                    : item
            );
            setTickets(updatedItems);
        }
        else {
            clickCountRef.current += 1;
            if (clickCountRef.current === 1) {
                notify();
            }
        }
    };

    const handleRemove = (itemId, count, updateBy = 0, ticketsCout) => {
        const updatedItems = tickets.map((item) =>
            item.id === itemId
                ? { ...item, count: count - 1, tickets: ticketsCout - updateBy }
                : item
        );
        setTickets(updatedItems);
    };

    let total_price = 0;
    const onProceed = () => {
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
    };

    const updateUser = (userId, newValue, type) => {
        const updatedUsers = users.map((user) => {
            if (user.id === userId && type === "name") {
                return { ...user, name: newValue };
            } else if (user.id === userId && type === "email") {
                return { ...user, email: newValue };
            } else if (user.id === userId && type === "phone") {
                return { ...user, phone: newValue };
            }
            return user;
        });
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
            setTotalCount((prevCount) => prevCount + ticket.tickets);
        });

        setTotalPrice(total_price);
    }, [tickets]);

    useEffect(() => {
        setErrors(false)
        users.map((user) => {
            if (user.name === '' || user.email === '' || !ValidateEmail(user.email) || !ValidatePhone(user.phone)) {
                setErrors(true)
            }
        })
    }, [users]);

    useEffect(() => {
        scrollToTargetDiv(targetDivRef)
    }, [])

    useEffect(() => {
        scrollToTargetDiv(targetDivRef)
    }, [targetDivRef])

    useEffect(() => {
        const disableBackButton = () => {
            window.history.pushState(null, null, document.URL);
            window.addEventListener('popstate', () => {
                setProceed(false)
                window.history.pushState(null, null, document.URL);
            });
        };
        disableBackButton();
        return () => {
            window.removeEventListener('popstate', () => {
                window.history.pushState(null, null, document.URL);
            });
        };
    }, []);

    return (
        <div>
            <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center my-5 mb-[50px]">
                {proceed == false ? "Select your " : "confirm your "}
                <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                    Tickets
                </span>
            </h1>
            {proceed === true ? (
                <div>
                    {users?.map((user, index) => {
                        return (
                            <div key={index}>
                                <div ref={targetDivRef}>
                                    <p className="text-sm font-light text-gray-500 px-5 pb-5">
                                        Ticket :{index + 1}
                                    </p>
                                    <Form
                                        key={user?.id}
                                        id={user?.id}
                                        updateUser={updateUser}
                                        name={user?.name}
                                        email={user?.email}
                                        phone={user?.phone}
                                        ValidateEmail={ValidateEmail}
                                        ValidatePhone={ValidatePhone}
                                        flag={flag}
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
                                                Same as Ticket : 1
                                            </span>
                                        </label>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>
                    <div className="max-w-[800px] mx-auto">
                        {tickets?.map((ticket, index) => (
                            <TicketLabel
                                key={index}
                                onProceed={onProceed}
                                id={ticket?.id}
                                noOf={ticket?.noOf}
                                step={step}
                                setStep={setStep}
                                client:load
                                gold={ticket?.type === "gold"}
                                silver={ticket?.type === "silver"}
                                title={ticket?.title}
                                count={ticket?.count}
                                price={ticket?.price}
                                updateCount={updateCount}
                                handleAdd={handleAdd}
                                handleRemove={handleRemove}
                                tickets={ticket.tickets}
                                active={active}
                                setActive={setActive}
                                setTickets={setTickets}

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
                    totalCount={totalCount}
                    proceed={proceed}
                    setProceed={setProceed}
                    onProceed={onProceed}
                    totalPrice={totalPrice}
                    toPayment={transFormUsers}
                    loading={loading}
                />
            ) : null}
        </div>
    );
}

export default Home;
