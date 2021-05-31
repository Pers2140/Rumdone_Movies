$(document).ready(() => {

  //$('.intro').hide().fadeIn(3000)
  change_words();
});



//scrolling effect
// function scroll_effect(){
//  $(window).on('scroll',()=>{
//    if($(this).scrollTop()>100){
//         grow($('.skill-bar:nth-child(2)'),260)
//         grow($('.skill-bar:nth-child(4)'),220)
//         grow($('.skill-bar:nth-child(6)'),290)
//         grow($('.skill-bar:nth-child(8)'),250)
//         $('.card').animate({opacity:"1"},2000);
//    }
//  })
// }
//**************************//
//scrolling effect



//changing the words in intro
function change_words() {

  var change = $('#change');
  var words = ['Dynamic websites', '🖧Networking🖧', 'Technology', 'Making apps', '⚙️Gadgets⚙️', '🕹️Gaming🕹️', 'Designing'];


  setInterval(function next() {
    var num = Math.floor((Math.random() * 6) + 0);
    change.text(words[num]);
    change.animate({ 'opacity': '100' }, 10000);
    //console.log(num)
  }, 3400);
}
//**************************//
//changing the words in intro



//animating skills bar
// function grow(bar,val){
//   bar.animate({width:val.toString()},2000)
// }
//**************************//
//animating skills bar
