# Framework7-Facebook-Login
<p align="center">
	<img src="" style="zoom:25%;">
</p>



## :paperclip: Table of Contents

- :rocket: [Features](#rocket-features)
- :hammer: [Install & Dependencies](#hammer-install-&-dependencies)
- :video_game: [Usage](#video_game-usage)
- :page_facing_up: [API](#page_facing_up-api)



## :rocket: Features

This repository contains an easy and clean **Facebook (FB)** Login with **Framework7** and **Cordova**. Requires almost zero configuration, plug and play, with everything you need for classic use cases. 

> This repository is not meant to be seen as a standalone library but more as a basic template with all the ready-made methods needed for more generic use cases.



You can manage

- Basic user information like: id, name, email, birthdays etc
- User profile pic (picture)
- FB Access Token
- Logout 

## :hammer: Install & Dependencies

Here all you need: 

- [Apache Cordova](https://cordova.apache.org/) in order to compile your webapp into a Android - Ios App

- [Framework7](https://framework7.io/) is a **free and open source** framework to develop mobile, desktop or web apps with **native look and feel**.

- [Facebook4 Cordova Plugin](https://github.com/jeduan/cordova-plugin-facebook4) To use official and native FB SDK



To install all dependencies and create a project from scratch:

```
npm install -g cordova

npm i framework7-cli cordova -g
framework7 create --ui

cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="123456789" --variable APP_NAME="myApplication"
```

Remember to change `APP_ID` and `APP_NAME` to the correct values. `APP_ID` you will find in your Facebook Developer Portal



The `src` folder of  this project contain all the magic: 

```
.
├── _css/
│   ├── app.css
├── _js/
│   ├── routes.js
│   ├── handlers/
│   ├── ├──  fb_handler.js
```

`app.css` contains just a UI class for FB button

`routes.js` an example of usage the `fb_handler.js`

`fb_handler.js` contains all methods you need in order to use Facebook Login inside your app. 

## :video_game:  Usage

```javascript
// Import fb_handler
import fb from './handlers/fb_handler.js'

// Authenticate the user. It will open the Facebook popup asking the user if he wants to authenticate with his account.

let login_response = await fb.login()
console.log(login_response)

// Get the status of the authentication. eg. connected, with the accessToken
let login_status = await fb.get_login_status()
console.log(login_status)

// Get user basic information. eg.id, name, email
let profile_response = await fb.profile()
console.log(profile_response)

// Get user profile picture. 
let picture = await fb.picture()
console.log(picture)
```

To see a more complete example check the `routes.js` file in which there is the implementation visible in the gif at the beginning of the readme.

> jQuery is used only for UI purpose. 



## :page_facing_up: API

```javascript
// Import fb_handler
import fb from './handlers/fb_handler.js'
```



You can use the following methods: 

```javascript
/**
 * Authenticate user with facebook account
 * @param {*} permissions Array of permissions. Default is public_profile and email
 * This method store inside "fb_access_token" local_storage the response 
 */
fb.login = async(permissions = ['public_profile', 'email'])

/**
 * 
 * @param {*} fields fields of user informations. Default is id, name and email
 * @param {*} additional_permissions Graph api allows you to add other permission with the request
 * This method store inside "user" local_storage the response
 */
fb.profile = async(fields = 'id, name, email', additional_permissions = []) 

/**
 * 
 * @param {*} user_id id of user
 * @param {*} img_with size of image
 * This methor returns json array with the user profile pic informations
 * This method store inside "user_img" local_storage the response
 */
fb.picture = async(user_id = null, img_with = 500)

/**
 * Logout from facebook
 */
fb.logout = async()

/**
 * Return the facebook status session
 */
fb.get_login_status = async()

/**
 * Returns the access token from local storage
 */
fb.get_local_access_token = async ()

/**
 * Return user facebook id from local storage
 */
fb.get_local_user_id = ()

/**
 * Return user informations from local storage
 */
fb.get_local_user = ()

/**
 * Return user_img informations from local storage
 */
fb.get_local_user_img = ()
```

