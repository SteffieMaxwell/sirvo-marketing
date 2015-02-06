  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-40613242-5']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

var hasSwiped = false;
$('#glass-movie').css('background','url("./img/spill/layer_2.jpg")');
$(document).ready(function() {
    $('body').jpreLoader({
    debugMode: true,
    splashID: "#splashlogo"
  }, function(){
      var image = 2;
      var spill = setInterval(function(){
      $("#wineglass-section").css('background','url("./img/spill/layer_'+image+'.jpg") no-repeat bottom center / 100% auto');
      image++;
      if(image > 105){
            //$("#early-access-form").css('display','block');

        $(".logo,.tagline, #early-access-form").css('display','block');
        clearInterval(spill);
      }
    }, 10);
  });
  $('#fullpage').fullpage({
        //Navigation
        menu: false,
        anchors:['welcome', 'get-going','build-culture','hack-your-job-search','connect-the-dots'],
        navigation: false,
        navigationPosition: 'left',
        navigationTooltips: ['', ''],
        slidesNavigation: false,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 500,
        autoScrolling: true,
        scrollBar: false,
        easing: 'easeInQuart',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '',
        scrollOverflow: true,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: false,

        //Design
        controlArrows: true,
        verticalCentered: true,
        resize : true,
        sectionsColor : ['#FFFFFF', '#F44500','#F44500'],
        paddingTop: '3em',
        paddingBottom: '10px',
        fixedElements: '#header, #footer',
        responsive: 0,

        //events
        onLeave: function(index, nextIndex, direction){
          if(index == 1){
            $("#header").css('display','none');
          }
          if(index == 5){
              $("#footer").css('display','none');
          }
        },
        afterLoad: function(anchorLink, index){
            if(index == 1){
              $("#early-access-form, #header").css('display','block');
            }
            if(index ==2){
              $(".get").addClass('animated lightSpeedIn');
              $(".get").css('display','block');
            }
            if(index == 3 && hasSwiped == false){
                var image = 1;
                var swipe = setInterval(function(){
                  $("#hand-section").css('background','#F44500 url("./img/hand/layer_'+image+'.jpg") no-repeat bottom right / auto auto');
                  image++;
                  if(image > 31){
                    hasSwiped = true;
                    clearInterval(swipe);
                    $("#hand-text").fadeIn(700);
                  }
                }, 20);       
            }
            if(index == 4){
              var swiped;
              bowlSection = document. getElementById('bowl-section');
              if(swiped !=true){
                $.fn.fullpage.setMouseWheelScrolling(false);
                $.fn.fullpage.setAllowScrolling(false);
              }
              bowlSection.onmousewheel = function(event){
                if(swiped != true){
                event.preventDefault();
                  var image = 2;
                  var empty = setInterval(function(){
                    $("#bowl-section").css('background','#FFFFFF url("./img/bowl/layer_'+image+'.jpg") no-repeat center center / contain');
                      $("#fullbowl-content").css('display','none');
                    image++;
                    if(image > 45){
                      clearInterval(empty);
                      var swipe = true;
                      $.fn.fullpage.setMouseWheelScrolling(true);
                      $.fn.fullpage.setAllowScrolling(true);
                      $("#emptybowl-content").css('display','block');
                    }
                  }, 20);  
                }
                return false;
              };    
            }
            if(index == 3){
                $('#fullbowl-header').css('display','block');
            }
            if(index == 5){
              $("#footer").css('display','block');
            }
        },
        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction){}
  });

$("#request-button").click( function(e){
  e.preventDefault();
  var email = $("#email").val();
  var name = $("#name").val();
  var type= $("#account").val();
  if( !validateEmail(email) || $("#name").val().length === 0){
    $("#errors").html('Please enter a valid name and email');
    return;
  }
  $("#early-access-form").css('visibility','hidden');
  $("#loading").html('Signing you up.');
  
  //GA Events
  if( type == "work" ){
    _gaq.push(['_trackEvent', 'sign up', 'access', 'work']);
  }
  if( type == "hire" ){
    _gaq.push(['_trackEvent', 'sign up', 'access', 'hire']);    
  }

  var jqxhr = $.ajax({
    type: "POST",
    url: "subscribe.php",
    data: {name: name, email: email, type: type}
  })
  .done(function(msg) {
    msg = $.parseJSON(msg);
    if(msg.result == "failure"){
      $("#loading").html('');
      $("#errors").html('');
      $("#early-access-form").css('visibility','visible');
      $("#errors").html('This email is already subscribed');
    }else{
        $("#loading").html('Thanks for registering');
      window.setTimeout( function(){
        $("#early-access-form").css("visibility",'hidden');
      },800);
    }
  })
  .fail(function() {
    $("#errors").html('');
    $("#early-access-form").css('visibility','visible');
    $("#errors").html('It looks like there was an error please try again.');
  })

  console.log(name+email);
});
//END DOM READY?
});

$(".goto-register").click( function(){
      $.fn.fullpage.moveTo(1);
      _gaq.push(['_trackEvent', 'sign up', 'register', 'streak']);
});

$("#bowl-trigger").click(function(){
       $.fn.fullpage.moveTo(1);
       _gaq.push(['_trackEvent', 'sign up', 'register', 'bowl']);
 
});
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
