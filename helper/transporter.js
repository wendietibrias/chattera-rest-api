import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth: {
        user:"wendietibrias@gmail.com",
        pass:"amyphgaqmfodmymt"
    }
});

export default transporter;