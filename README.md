https://tasty-twist-food.netlify.app

### **Quick Overview** <br>

<p>TastyTwist is an Food Sales site like e-commerce. There are many type of food in this site. At first user login this site. Login sytem are two types like credentials based and google. user can see some restaurant in landing page. After click the restaurant he can see the all food are this restaurant. When click the food show a details modal for this food. user can set this product in the cart and favourite and user can order the food. After placed order user get a confimation mail and tracking the order. after delivered this food user can review this product. User can setup her profile for delevery details and request for become a seller. After user request for seller Admin get this request and review request details. If admin accepts this request user get a form for add retaurant details. After submit restaurant details form user, admin again review the restaurant detials and then admin add this restaurant on her site. Seller can manage her Restaurant products and handle order. Seller can add new product and edit or delete existing product. Seller can edit some restaurant details and delivery fee, delivery time and delivery range. Seller can see reviews and after get bad review seller can delete this review. Seller can see all payment details and see her restaurant all sales data by charts. Admin can handle seller request and manage coupons. Admin Route still has many features to implement. Like managing all the restaurants and implementing the support system and taking a certain amount of profit from the sellers.
</p> <br>

### **Technology** <br>

#### **JavaScript, React, Tailwind, Tanstack,Firebase, Express, Mongodb, Stripe**

### **Payment Gateway** <br>

<p>I use Stripe for handle payment system.</p>

### **1. JWT (json web token)** <br>

<p>Implement JWT for secure API in this project. when user login this system. server create a token and set this token to the client side cookie. When a user makes an API request from client, the API goes to the server and gets verified. if this token are valid user can interact with secure data. otherwise user will not be able to interact with secure data and they are automatically logout.
 </p>

### **2. Use Mongodb for store all data on this project** <br>

<p>All data like products, users are store in mongodb database.</p> <br>

### **3. Firebase Authentication** <br>

<p>I use firebase authentication system to authenticate users. we use two types of authentication mechanism for this project first email password based authentication and another google.</p> <br>

### **4. Role base authentication** <br>

<p>There are three types(user, seller, super admin) user in my project. They can access their own routes.</p>

### **5. Confirmation Mail** <br>

<p>User Get a confirmation mail after confim the order.</p>
