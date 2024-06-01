// Settings object for configuring the behavior of a carousel/slider component
export const settings = {
  dots: true, // Show navigation dots
  infinite: true, // Enable infinite loop
  speed: 500, // Transition speed in milliseconds
  slidesToShow: 4, // Number of slides to show at a time
  slidesToScroll: 1, // Number of slides to scroll per action
  responsive: [ // Responsive settings based on viewport width
    {
      breakpoint: 1024, // Breakpoint at 1024px viewport width
      settings: {
        slidesToShow: 3, // Adjust slides to show at this breakpoint
        slidesToScroll: 1, // Adjust slides to scroll per action at this breakpoint
        infinite: true, // Enable infinite loop at this breakpoint
        dots: true // Show navigation dots at this breakpoint
      }
    },
    {
      breakpoint: 600, // Breakpoint at 600px viewport width
      settings: {
        slidesToShow: 2, // Adjust slides to show at this breakpoint
        slidesToScroll: 1, // Adjust slides to scroll per action at this breakpoint
        initialSlide: 2 // Initial slide index at this breakpoint
      }
    },
    {
      breakpoint: 480, // Breakpoint at 480px viewport width
      settings: {
        slidesToShow: 1, // Adjust slides to show at this breakpoint
        slidesToScroll: 1 // Adjust slides to scroll per action at this breakpoint
      }
    }
  ]
};
