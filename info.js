// Assignment Requirement Document

// Project: OLX-like Classified Website

// Endpoint List:

// Create Account

// Endpoint URL: /api/users/register
// Objective: Allows users to create an account on the platform.
// HTTP Method: POST
// Input Data: User registration details (username, email, password, etc.).
// Validation: Validate input data for correctness and uniqueness.
// Response: Return a success message upon successful registration.
// Update Account

// Endpoint URL: /api/users/update
// Objective: Allows users to update their account information.
// HTTP Method: PUT
// Input Data: User details to be updated.
// Validation: Validate input data and user authentication.
// Response: Return a success message upon successful update.
// Login

// Endpoint URL: /api/users/login
// Objective: Allows users to log in to their accounts.
// HTTP Method: POST
// Input Data: User login credentials (email/username, password).
// Validation: Validate login credentials.
// Response: Return a token upon successful login for authentication.
// Post Listing

// Endpoint URL: /api/listings/create
// Objective: Allows users to create new listings for items they want to sell.
// HTTP Method: POST
// Input Data: Listing details (title, description, category, price, location, contact information).
// Validation: Validate input data, user authentication, and authorization.
// Response: Return a success message with the newly created listing ID.
// Fetch Single Listing

// Endpoint URL: /api/listings/:listingId
// Objective: Allows users to view the details of a single listing.
// HTTP Method: GET
// Input Data: Listing ID.
// Validation: Verify the existence of the listing.
// Response: Return the listing details.
// Search Items

// Endpoint URL: /api/listings/search
// Objective: Enables users to search for items based on various criteria (e.g., category, location, price).
// HTTP Method: GET
// Input Data: Search parameters (category, location, price range, keywords, etc.).
// Validation: Validate search parameters.
// Response: Return a list of matching listings.
// Update Posted Items

// Endpoint URL: /api/listings/update/:listingId
// Objective: Allows users to update the details of their posted listings.
// HTTP Method: PUT
// Input Data: Updated listing details.
// Validation: Validate input data, user authentication, and ownership of the listing.
// Response: Return a success message upon successful update.
// Delete Posted Items

// Endpoint URL: /api/listings/delete/:listingId
// Objective: Enables users to delete their posted listings.
// HTTP Method: DELETE
// Input Data: Listing ID to be deleted.
// Validation: Verify the existence of the listing and user ownership.
// Response: Return a success message upon successful deletion.
// Comment on an Item

// Endpoint URL: /api/listings/comment/:listingId
// Objective: Allows users to comment on a listing.
// HTTP Method: POST
// Input Data: Comment content and user details.
// Validation: Validate input data and the existence of the listing.
// Response: Return a success message upon successful comment submission.
// Contact Buyer for an Item

// Endpoint URL: /api/listings/contact/:listingId
// Objective: Enables users to contact the buyer/seller of a listing.
// HTTP Method: POST
// Input Data: Contact message and user details.
// Validation: Validate input data and the existence of the listing.
// Response: Return a success message upon successful contact.
// Additional Requirements:



// /api/users/register :: POST
// /api/users/update/:id :: PUT
// /api/users/login :: POST // Include session

// /api/category/create :: POST
// /api/category/:categoryId :: GET

// /api/products/create :: POST
// /api/product/:productId :: GET
// /api/product/update/:productId :: PUT
// /api/product/delete/:productId :: DELETE

// /api/product/comment/:productId  :: POST
// /api/product/contact/:productId  :: POST




// CREATE DATABASE ClassifiedApp;


// CREATE TABLE User(
// id int NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT
// username varchar(50) NOT NULL UNIQUE,
// email varchar(50) NOT NULL UNIQUE,
// passwd varchar(50) NOT NULL,
// created_on datetime,
// updated_on datetime
// );


// CREATE TABLE Category(
// id int NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
// title varchar(50) NOT NULL,
// created_on datetime,
// updated_on datetime
// );

// CREATE TABLE Products(
// id int NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT
// category_id int NOT NULL,
// title varchar(50) NOT NULL UNIQUE,
// price varchar(50) NOT NULL UNIQUE,
// paddress varchar(50) NOT NULL,
// pstatus varchar(50) NOT NULL default=1,
// created_on datetime,
// updated_on datetime,
// FOREIGN KEY(category_id) REFERENCES Category(id)

// );


// CREATE TABLE Contact(
// id int NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT
// userid int NOT NULL,
// productid int NOT NULL,
// cmessage varchar(250) NOT NULL UNIQUE,
// created_on datetime,
// updated_on datetime,
// FOREIGN KEY(userid) REFERENCES User(id)
// ,
// FOREIGN KEY(productid) REFERENCES Products(id)

// );

