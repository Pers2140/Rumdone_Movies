
$(document).ready(()=>{
returntohome();
shadow()
});


function returntohome(){
  setTimeout(function(){
    window.location ='/'
  }, 2000);
}
function shadow(e){
  var y = e.clientY;
  var x = e.clientX;
  var wrapper= document.querySelector('wrapper');

  text.style.left = x +"px";
  text.style.top = (y-50) +"px";
}

document.addEventListener('mousemove',shadow);
