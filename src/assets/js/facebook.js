
export function initFacebook() {
    window.fbAsyncInit = function() {
        FB.init({
          appId            : '472438607090092',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v3.0'
        });
        FB.AppEvents.logPageView();
    
      };
     
       (function(d, s, id){
          console.log('INIT FACEBOOK');
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {  
            return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'))
}
export function sharePost(postId) {
    console.log(postId);
        // let url = 'www.google.com';
        // // e.preventDefault();
        // var facebookWindow = window.open(
        //   'https://www.facebook.com/sharer/sharer.php?u=https://4woman.ec/#/details/1611628378857',
        //   'facebook-popup',
        //   'height=300,width=300'
        // );
        // if (facebookWindow.focus) {
        //   facebookWindow.focus();
        // }
        // return false;
     FB.ui(
       {
         
         method: 'share',
         href:'https://inspirapmc.com/sharepost/'+ postId,
         //action_type: 'og.shares',
          // action_properties: JSON.stringify({
          //     object: {
          //         'og:url': overrideLink,
          //         'og:title': overrideTitle,
          //         'og:image': overrideImage,
          //         'og:description': overridedescription
          //     }
          // })
     });
  }

