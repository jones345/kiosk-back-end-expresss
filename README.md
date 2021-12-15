# KIOSK BACKEND API POINTS
## TESTING THE DOCTOR WEBAPP IS ON (https://kiosk-2fc4d.web.app/) will deploy on a daily or often as possible 
## will also deploy the backend on a testing server, but it will be on elastic bean for production 
## project session is an Hour after that it log out the user only on doctor
## Getting started with the project
*The backend uses mongodb as database  hence no need for database connection *
```
npm install
npm start
```
*The project run on server 5000 base url below*
```
localhost:5000/api/
```

# I Divided api points into  Auth,Profile,Consults.Apply,and events

## Auth API Points
### For Admin,users, and Doctors

#### Login end points using email and password 
```
localhost:5000/api/auth/user/signin
```

### Sign Up Endpoints for users only doctors are added by Admin of which they have to first apply, once approved the just login to the system with email and password sent to their email 

```
localhost:5000/api/auth/user/signup
```
```
        firstName: 
        lastName: 
        email: 
        idNumber:
        gender:
        password: 
```

## Auth for doctors endpoints
	@octocat :+1: This PR looks great - it's ready to merge! :shipit:
```
   localhost:5000/api/auth/user/signinDoc   
```

```
        Email: 
        password: 
```



###### The smallest heading


