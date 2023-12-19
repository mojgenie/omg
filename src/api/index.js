import axios from "axios";

const addTicket = async (formData, setLoading) => {
    console.log("AddTicket ~ formData :: ", formData)
    // setLoading(true)
    // axios.post('https://app.omyglamore.com/api/add-tickets', formData, {
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    // }).then((response) => {
    //     if (response.status === 200) {
    //         const responseData = response.data;
    //         window.location.href = responseData.payment_url;
    //     }
    // }).catch(() => {
    //     alert('something went wrong');
    //     setLoading(false)
    // }).finally(() => {

    // })

};

export default addTicket