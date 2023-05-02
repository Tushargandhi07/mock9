# Social Media App

## Dependencies
- bcrypt (for hashing passwords)
- dotenv (to secure the environment)
- express (to run the server)
- jsonwebtoken (for authentication)
- mongoose (to connect with MongoDB)


## API's

- 1. (POST)    /user/api/register (for registration of user to the application)
- 2. (POST)    /user/api/login  (for login to the application)
- 3. (GET)     /user/api/users (for getting the data of all registered users) 
- 4. (GET)     /user/api/users/:id/friends (to see all friends of particular user)

    ### All below api needs authentication 
- 5. (POST)    /user/api/users/:id/friends (for sending friend request to particular user)
- 6. (PATCH)   /user/api/users/:id/friends/:friendId (for accept or reject friend request of a particular user)
- 7. (POST)    /post/api/posts (for creating a new post)
- 8. (GET)     /post/api/posts/:id (to see the the details of specific post)
- 9. (DELETE)  /post/api/posts/:id (to delete specific post)
