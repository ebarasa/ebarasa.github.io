$(document).ready(function() {
    "use strict";

    /***************************************************************************/
            /* NAVIGATION  */
    /***************************************************************************/
   
      $('.button-collapse').sideNav();
 
    /**************************************************************************
                 SKILL BAR 
    **************************************************************************/

    $(".determinate").each(function(){
      var width = $(this).text();
      $(this).css("width", width)
        .empty()
        .append('<i class="fa fa-circle"></i>');                
    });


    /**************************************************************************
             BLOG POST 
    **************************************************************************/
  
    jQuery(window).on('load', function(){ var $ = jQuery;
        $('.blog').masonry({
          itemSelector: '.blog-post',
          columnWidth: '.blog-post',
          percentPosition: true
        });
    });


    var height = $('.caption').height();
        if($(window).width()){
          $('#featured').css('height', height);   
          $('#featured img').css('height', height);   
        }


    /*************************************************************************
                TOOLTIP
    **************************************************************************/
    $('.tooltipped').tooltip({delay: 50});

    /**************************************************************************
        WOW INIT
    **************************************************************************/

    var wow = new WOW({ mobile: false });
    wow.init();

    /***************************************************************************
          CONTACT FORM
    ***************************************************************************/

    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });
    function submitForm(){
    // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        
        $.ajax({
            type: "POST",
            url: "process.php",
            data: "name=" + name + "&email=" + email + "&message=" + message,
            success : function(text){
                if (text == "success"){
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false,text);
                }
            }
        });
    }
    function formSuccess(){
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Sent!")
    }
    function formError(){
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
        function(){
            $(this).removeClass();
        });
    }
    function submitMSG(valid, msg){
        if(valid){
            var msgClasses = "h3 text-center fadeInUp animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    
    
    /**************************************************************************
       Projects
    **************************************************************************/
    
    $('.sa-view-project-detail').on('click', function(event) {
        event.preventDefault();
        var href          = $(this).attr('href') + ' ' + $(this).attr('data-action'),
            dataShow      = $('#project-gallery-view'),
            dataShowMeta  = $('#project-gallery-view meta'),
            dataHide      = $('#portfolio-item'),
            preLoader     = $('#loader'),
            backBtn       = $('#back-button'),
            filterBtn     = $('#filter-button');

        dataHide.animate( { 'marginLeft':'-120%' }, { duration: 400, queue: false } );
        filterBtn.animate( { 'marginLeft':'-120%' }, { duration: 400, queue: false } );
        dataHide.fadeOut(400);
        filterBtn.fadeOut(400);
        setTimeout( function() { preLoader.show(); }, 400);
        setTimeout( function() {
            dataShow.load( href, function() {
                dataShowMeta.remove();
                preLoader.hide();
                dataShow.fadeIn(600);
                backBtn.fadeIn(600);
            });
        },800);
    });

    $('#back-button').on('click', function(event) {
        event.preventDefault();
        var dataShow    = $('#portfolio-item'),
            dataHide    = $('#project-gallery-view'),
            filterBtn   = $('#filter-button');

        $("[data-animate]").each( function() {
            $(this).addClass($(this).attr('data-animate'));
        });

        dataHide.fadeOut(400);
        $(this).fadeOut(400);
        setTimeout(function(){
            dataShow.animate( { 'marginLeft': '0' }, { duration: 400, queue: false } );
            filterBtn.animate( { 'marginLeft': '0' }, { duration: 400, queue: false } );
            dataShow.fadeIn(400);
            filterBtn.fadeIn(400);
        },400);
        setTimeout(function(){
            dataShow.find('.fadeInRight, .fadeInLeft, .fadeInUp, .fadeInDown').removeClass('fadeInRight').removeClass('fadeInLeft').removeClass('fadeInUp').removeClass('fadeInDown');
        },1500);
    });

});
