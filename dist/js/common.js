$(function() {
//	$('body').fadeOut();
$('#portfolio-div').mixItUp();
$('#portfolio-div').magnificPopup({type:'image', delegate: 'a',
	gallery: {enabled: true},
});

$('.owl-carousel').owlCarousel({
	
    //Basic Speeds
    slideSpeed : 300,
    paginationSpeed : 650,
 
    //Autoplay
    autoPlay : true,
    goToFirst : true,
    goToFirstSpeed : 1000,
 
    // Navigation
    //navigation : true,
    //navigationText : ["prev","next"],
    //pagination : true,
    //paginationNumbers: true,
 
    // Responsive 
    responsive: true,
    items : 4,
    itemsDesktop : [1199,6],
    itemsDesktopSmall : [980,4],
    itemsTablet: [768,2],
    itemsMobile : [479,1],
 
    // CSS Styles
    baseClass : "owl-carousel",
    theme : "owl-theme"
});
});