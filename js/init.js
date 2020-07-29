/* ==================================================
   Google Analytics
================================================== */
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-54963833-1', 'auto');
  ga('send', 'pageview');
jQuery(function($){
	"use strict";
var GAEA = window.GAEA || {};

/* ==================================================
   SuperFish menu
================================================== */
	GAEA.SuperFish = function() {
		$('.sf-menu').superfish({
			  delay: 200,
			  animation: {opacity:'show', height:'show'},
			  speed: 'fast',
			  cssArrows: false,
			  disableHI: true
		});
		$(".main-navigation > ul > li:has(ul)").find("a:first").append(" <i class='fa fa-angle-down'></i>");
		$(".main-navigation > ul > li > ul > li:has(ul)").find("a:first").append(" <i class='fa fa-angle-right'></i>");
		$(".main-navigation > ul > li > ul > li > ul > li:has(ul)").find("a:first").append(" <i class='fa fa-angle-right'></i>");
	}
/* ==================================================
   Sticky Navigation
================================================== */	
	GAEA.StickyNav = function() {
		if($("body").hasClass("boxed"))
			return false;
		if ($(window).width() > 992){
			$(".lower-header").sticky({topSpacing:0});
		}
	}
/* ==================================================
   IsoTope Portfolio
================================================== */
		GAEA.IsoTope = function() {	
		$("ul.sort-source").each(function() {

			var source = $(this);
			var destination = $("ul.sort-destination[data-sort-id=" + $(this).attr("data-sort-id") + "]");

			if(destination.get(0)) {

				$(window).load(function() {

					destination.isotope({
						itemSelector: ".grid-item",
						layoutMode: 'sloppyMasonry'
					});

					source.find("a").click(function(e) {

						e.preventDefault();

						var $this = $(this),
							filter = $this.parent().attr("data-option-value");

						source.find("li.active").removeClass("active");
						$this.parent().addClass("active");

						destination.isotope({
							filter: filter
						});

						if(window.location.hash != "" || filter.replace(".","") != "*") {
							self.location = "#" + filter.replace(".","");
						}

						return false;

					});
					
					$(window).bind("hashchange", function(e) {

						var hashFilter = "." + location.hash.replace("#",""),
							hash = (hashFilter == "." || hashFilter == ".*" ? "*" : hashFilter);

						source.find("li.active").removeClass("active");
						source.find("li[data-option-value='" + hash + "']").addClass("active");

						destination.isotope({
							filter: hash
						});

					});

					var hashFilter = "." + (location.hash.replace("#","") || "*");

					var initFilterEl = source.find("li[data-option-value='" + hashFilter + "'] a");

					if(initFilterEl.get(0)) {
						source.find("li[data-option-value='" + hashFilter + "'] a").click();
					} else {
						source.find("li:first-child a").click();
					}

				});
			}

		});
		$(window).load(function() {
			var IsoTopeCont = $(".isotope-grid");
			IsoTopeCont.isotope({
				itemSelector: ".grid-item",
				layoutMode: 'sloppyMasonry'
			});
			if ($(".grid-holder").length > 0){	
				var $container_blog = $('.grid-holder');
				$container_blog.isotope({
				itemSelector : '.grid-item'
				});
		
				$(window).resize(function() {
				var $container_blog = $('.grid-holder');
				$container_blog.isotope({
					itemSelector : '.grid-item'
				});
				});
			}
		});
	}
	
// Home border column
// Image Hover icons for gallery items
$(document).ready(function(){});
$(window).load(function(){
	$(".format-standard").each(function(){
		$(this).find(".media-box").append("<span class='zoom'><i class='fa fa-plus'></i></span>");
	});
});
// Centering the dropdown menus
$(".main-navigation ul li").mouseover(function() {
	 var the_width = $(this).find("a").width();
	 var child_width = $(this).find("ul").width();
	 var width = parseInt((child_width - the_width)/2);
	$(this).find("ul").css('left', -width);
});
// Any Button Scroll to section
$('.scrollto').click(function(){
	$.scrollTo( this.hash, 800, { easing:'easeOutQuint' });
	return false;
});
/* ==================================================
	Scroll to Top
================================================== */
	GAEA.scrollToTop = function(){
		var windowWidth = $(window).width(),
			didScroll = false;
	
		var $arrow = $('#back-to-top');
	
		$arrow.click(function(e) {
			$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
			e.preventDefault();
		})
	
		$(window).scroll(function() {
			didScroll = true;
		});
	
		setInterval(function() {
			if( didScroll ) {
				didScroll = false;
	
				if( $(window).scrollTop() > 200 ) {
					$arrow.fadeIn();
				} else {
					$arrow.fadeOut();
				}
			}
		}, 250);
	}
/* ==================================================
   Flex Slider
================================================== */
	GAEA.FlexSlider = function() {
		$('.flexslider').each(function(){
				var carouselInstance = $(this); 
				var carouselAutoplay = carouselInstance.attr("data-autoplay") == 'yes' ? true : false
				var carouselPagination = carouselInstance.attr("data-pagination") == 'yes' ? true : false
				var carouselArrows = carouselInstance.attr("data-arrows") == 'yes' ? true : false
				var carouselDirection = carouselInstance.attr("data-direction") ? carouselInstance.attr("data-direction") : "horizontal"
				var carouselStyle = carouselInstance.attr("data-style") ? carouselInstance.attr("data-style") : "fade"
				var carouselSpeed = carouselInstance.attr("data-speed") ? carouselInstance.attr("data-speed") : "5000"
				var carouselPause = carouselInstance.attr("data-pause") == 'yes' ? true : false
				
				carouselInstance.flexslider({
					animation: carouselStyle,
					easing: "swing",               
					direction: carouselDirection,       
					slideshow: carouselAutoplay,              
					slideshowSpeed: carouselSpeed,         
					animationSpeed: 600,         
					initDelay: 0,              
					randomize: false,            
					pauseOnHover: carouselPause,       
					controlNav: carouselPagination,           
					directionNav: carouselArrows,            
					prevText: "",          
					nextText: ""
				});
		});
	}
/* ==================================================
   Init Functions
================================================== */
$(document).ready(function(){
	GAEA.scrollToTop();
	GAEA.SuperFish();
	GAEA.StickyNav();
	GAEA.FlexSlider();
	GAEA.IsoTope();
});
});
/* ==================================================
   Init Functions
================================================== */
$(document).ready(function() {
	$(".left_sidebar p").click(function(){
			$(".left_sidebar ul").slideToggle();
		});
	$(".left_sidebar .accordion-toggle").click(function(){
	$(this).next().slideToggle().parent().siblings().children("ul").slideUp();
	return false;
})
});
$(document).ready(function() {
$('#menu-toggle').click(function(){
			$(this).toggleClass("opened");
			$(".main-navigation").slideToggle(500);
		});
		$(window).resize(function(){
			if($("#menu-toggle").hasClass("opened")){
				$(".main-navigation").css("display","block");
			}
			});
});

          
