
const HTMLTemplate = (confirmationCode = null) => {
   return `
   <html>
   <head>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');
  
  
  * {
  margin: 0;
  padding: 0;
  box-sizing:border-box;
  font-family:"Poppins",sans-serif;
  }
  
  .container {
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  background-color:#fff;
  text-align:center;
  flex-direction:column;
  min-height:100vh;
  padding:0 1rem;
  }
  
  .container h2 {
  font-size:1.8rem;
  }
  
  .container p {
  margin:5px 0 25px;
  color:#555;
  font-size:0.9rem;
  }
  
  .container a {
  cursor:pointer;
  text-decoration:none;
  }
  
  #active-button {
  cursor:pointer;
  background: #00B4DB;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #0083B0, #00B4DB);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #0083B0, #00B4DB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
  padding:0.7rem 1.2rem;
  border-radius:6px;
  outline:none;
  border:none;
  font-size:0.9rem;
  color:#fff;
  font-weight:500;
  }
    </style>
   </head>
    <body>
    <main class="container">
    <h2>Email Activation Link</h2>
    <p>Click at the button below to make your account active, and so you can use that account to post something in chattera</p>
    <a href="http://localhost:3000/auth/confirm-email/${confirmationCode}">
      <button id="active-button">Active account</button>
    </a>
  </main>
    </body>
  </html>
   `;
}

export default HTMLTemplate;