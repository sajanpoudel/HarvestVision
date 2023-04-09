const Contact = () =>{
    return             <section>
    <h2 className="heading2">Contact Us</h2>
    <form id="contact-form" className="login_card">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required/>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required/>

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="submit">Send</button>
    </form>
</section>
} 
export default Contact