import app from './app.js';
import HomePage from '../pages/home.f7.html';
import fb from './handlers/fb_handler.js';

let $ = require( "jquery" );

var routes = [
  {
    path: '/',
    component: HomePage,
    on:{
      pageInit: async function (event, page) {
        
        
        $('.fb-login').on('click', async function(){
          let login_response = await fb.login()
          let login_status = await fb.get_login_status()
          let profile_response = await fb.profile()
          let picture = await fb.picture()

          page.router.refreshPage()
        })
        
        $('.fb-logout').on('click', async function(){
          console.log("click")
          let logout = await fb.logout()

          localStorage.removeItem('fb_access_token')
          localStorage.removeItem('user')
          localStorage.removeItem('user_img')

          page.router.refreshPage()
        })

        let fb_access_token = JSON.parse(localStorage.getItem("fb_access_token"))

        if(fb_access_token == null){
          $('.fb-login').show()
          $('.fb-logout').hide()
        }
        else{
          let user = JSON.parse(localStorage.getItem("user"))
          let user_img = JSON.parse(localStorage.getItem("user_img"))

          $('.fb-login').hide()
          $('.fb-logout').show()
          $('.fb-profile-pic').attr("src", user_img['data']['url']);
          $('.fb-name').html(user['name'])
          $('.fb-email').html(user['email'])
          $('.fb-id').html(user['id'])
        }

      } // page init
    }
  },
];

export default routes;