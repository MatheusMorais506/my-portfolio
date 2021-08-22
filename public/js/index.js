const form = document.getElementById('contact-form');

const formEvent = form.addEventListener("submit", (event) => {
    event.preventDefault();

    let mail = new FormData(form);

    sendMail(mail);
})

const sendMail = (mail) => {

    fetch("https://my-portfolio-3bz2nd3yl-matheusmorais506.vercel.app/send", {
        method: "post",
        body: mail,
    }).then((response) => {
        return response.json();
    });
};