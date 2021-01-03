/**
 * @author Andrea Corriga
 * @date 03-01-2012 DD-MM-YYYY
 * @website https://andreacorriga.com
 * @repository https://github.com/AsoStrife
 */

import app from '../app.js';
var fb = {}

/**
 * Authenticate user with facebook account
 * @param {*} permissions Array of permissions. Default is public_profile and email
 * This method store inside "fb_access_token" local_storage the response 
 */
fb.login = async(permissions = ['public_profile', 'email']) => {
    
    return new Promise((resolve, reject) => {
        facebookConnectPlugin.login(permissions,
            function(response) {
                localStorage.setItem("fb_access_token", JSON.stringify(response))
                resolve(response)
            },
            function(error){
                resolve(error)
            }
        )
    }) // return new Promise()

} // fb.login

/**
 * 
 * @param {*} fields fields of user informations. Default is id, name and email
 * @param {*} additional_permissions Graph api allows you to add other permission with the request
 * This method store inside "user" local_storage the response
 */
fb.profile = async(fields = 'id, name, email', additional_permissions = []) => {    
    return new Promise((resolve, reject) => {
        facebookConnectPlugin.api(`me?fields=${fields}`, additional_permissions,
            function(response) {
                localStorage.setItem("user", JSON.stringify(response))
                resolve(response)
            }, function(error) {
                resolve(error)
            }
        )
    })

} // fb.profile

/**
 * 
 * @param {*} user_id id of user
 * @param {*} img_with size of image
 * This methor returns json array with the user profile pic informations
 * This method store inside "user_img" local_storage the response
 */
fb.picture = async(user_id = null, img_with = 500) => {
    user_id = user_id == null ? fb.get_local_user_id() : user_id
    
    return new Promise((resolve, reject) => {
        facebookConnectPlugin.api(`${user_id}/picture?width=${img_with}&redirect=false`, [],
            function(response) {
                localStorage.setItem("user_img", JSON.stringify(response))
                resolve(response)
            }, function(error) {
                resolve(error)
            }
        )
    })
     
} // fb.picture

/**
 * Logout from facebook
 */
fb.logout = async() => {
    return new Promise((resolve, reject) => {
        facebookConnectPlugin.logout(function(success){
            resolve(success)
        }, function(failure){
            resolve(failure)
        })
    })    
} // logout

/**
 * Return the facebook status session
 */
fb.get_login_status = async() => {
    return new Promise((resolve, reject) => {
        facebookConnectPlugin.getLoginStatus(function(success){
            resolve(success)
        }, function(failure){
            resolve(failure)
        })
    })    
} // get_login_status

/**
 * Returns the access token from local storage
 */
fb.get_local_access_token = async () => {
    fb_access_token = JSON.parse(localStorage.getItem("fb_access_token"))
        
    if(fb_access_token['status'] == 'connected')
        return fb_access_token['authResponse']['accessToken']
    else 
        return ''
}

/**
 * Return user facebook id from local storage
 */
fb.get_local_user_id = () => {
    let user = JSON.parse(localStorage.getItem("user"))

    if(user != null)
        return user['id']
    else 
        return ''
}   

/**
 * Return user informations from local storage
 */
fb.get_local_user = () => {
    let user = JSON.parse(localStorage.getItem("user"))

    if(user != null)
        return user
    else 
        return ''
}  

/**
 * Return user_img informations from local storage
 */
fb.get_local_user_img = () => {
    let user = JSON.parse(localStorage.getItem("user_img"))

    if(user != null)
        return user
    else 
        return ''
}  

export default fb;