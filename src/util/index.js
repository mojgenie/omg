const ValidateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

const ValidatePhone = (phone) => {
    const formattedPhone = phone.replace(/\D/g, "").substr(0, 10);
    const isValidPhone = formattedPhone.length === 10;
    return isValidPhone
}

const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

    const scrollToTargetDiv = (targetDivRef) => {
        if (targetDivRef.current) {
            targetDivRef.current.scrollIntoView({
                behavior: 'smooth', // You can adjust the scroll behavior
                block: 'start',     // You can adjust the vertical alignment
            });
        }
    };
export { ValidateEmail, ValidatePhone, generateUniqueId,scrollToTargetDiv }