let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let keys = { rup: 0, rleft: 0, rright: 0, bup: 0, bleft: 0, bright: 0}
let redGrounded = 'y', bluGrounded = 'y'

canvas.width = window.innerWidth
canvas.height = window.innerHeight/4


let redFront = new Image()
redFront.src = './images/redFront.png'
let redRight = new Image()
redRight.src = './images/redRight.png'
let redLeft = new Image()
redLeft.src = './images/redLeft.png'

let bluFront = new Image()
bluFront.src = './images/bluFront.png'
let bluRight = new Image()
bluRight.src = './images/bluRight.png'
let bluLeft = new Image()
bluLeft.src = './images/bluLeft.png'

let g = 1.4

blu = {
image: bluLeft,
  x: (3*canvas.width)/4-12/300*canvas.width,
  y: canvas.height-24/300*canvas.width,
  xv: 2/300*canvas.width,
  yv: 5/300*canvas.width,
  w: 24/300*canvas.width,
  h: 24/300*canvas.width,
}

red = {
image: redRight,
  x: canvas.width/4-12/300*canvas.width,
  y: canvas.height-24/300*canvas.width,
  xv: 2/300*canvas.width,
  yv: 5/300*canvas.width,
  w: 24/300*canvas.width,
  h: 24/300*canvas.width,
}

requestAnimationFrame(gameLoop)


function gameLoop(timer){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'ivory'
  ctx.font = '30px Arial'
  ctx.fillText('use ASDW, and ARROW keys, to move the little cucumbers',canvas.width/5.5,canvas.height/4)
  //ctx.fillRect(canvas.width/128,canvas.height/32,canvas.width-(canvas.width/64),canvas.height-(canvas.height/16))
  createFloor(0,canvas.height-10,canvas.width,10)
  redMove()
  bluMove()
  requestAnimationFrame(gameLoop)
}


function redMove(){
  if (keys.rleft){
    if(red.x+(red.w)/6> 0){
      red.x -= red.xv
      red.image = redLeft
    }
  }
  if (keys.rright){
    if(red.x + (3*red.w)/4 < canvas.width){
      red.x += red.xv
      red.image = redRight
    }
  }
  if (keys.rup){
    redGrounded = 'n'
  }
  if(redGrounded === 'n'){
    red.y -= red.yv - g/2
    red.yv -= g
    if(red.yv<-15)red.yv = -15
  }

  ctx.drawImage(red.image, red.x, red.y, red.w, red.h)
}

function bluMove(){
  if (keys.bleft){
    if(blu.x+(blu.w)/6> 0){
      blu.x -= blu.xv
      blu.image = bluLeft
    }
  }
  if (keys.bright){
    if(blu.x + (3*blu.w)/4 < canvas.width){
      blu.x += blu.xv
      blu.image = bluRight
    }
  }
  if (keys.bup){
    bluGrounded = 'n'
  }
  if(bluGrounded === 'n'){
    blu.y -= blu.yv - g/2
    blu.yv -= g
    if(blu.yv<-15)blu.yv = -15
  }

  ctx.drawImage(blu.image, blu.x, blu.y, blu.w, blu.h)
}

function createFloor(x,y,width,height){
  ctx.fillStyle = '#617965'
  ctx.fillRect(x,y,width,height)
  if((red.x+red.w/2>x-1/300*canvas.width)&&(red.x+red.w/2<x+width-1/300*canvas.width)){
    console.log('x in')
    if(((red.y+24/300*canvas.width)<(y+height))&&((red.y+24/300*canvas.width)>(y-1/300*canvas.width))){
      console.log('y in')
      if(redGrounded==='n'){
        redGrounded = 'y'
        red.yv = 5/300*canvas.width
        red.y = y-23/300*canvas.width
      }
    }
    if(((red.y)<(y+height))&&((red.y)>(y-1/300*canvas.width))){
      console.log('y in')
      if(redGrounded==='n'){
        red.yv = -0.5/300*canvas.width
      }
    }
  }
  if((blu.x+blu.w/2>x-1/300*canvas.width)&&(blu.x+blu.w/2<x+width-1/300*canvas.width)){
    console.log('x in')
    if(((blu.y+24/300*canvas.width)<(y+height))&&((blu.y+24/300*canvas.width)>(y-1/300*canvas.width))){
      console.log('y in')
      if(bluGrounded==='n'){
        bluGrounded = 'y'
        blu.yv = 5/300*canvas.width
        blu.y = y-23/300*canvas.width
      }
    }
    if(((blu.y)<(y+height))&&((blu.y)>(y-1/300*canvas.width))){
      console.log('y in')
      if(bluGrounded==='n'){
        blu.yv = -0.5/300*canvas.width
      }
    }
  }
}

function fallFloor(x,y,width,height){
  if((red.x+red.w/2>x-1/300*canvas.width)&&(red.x+red.w/2<x+width-1/300*canvas.width)){
    console.log('x out')
    console.log(red.y,red.y+24/300*canvas.width,y)
    if(((red.y+24/300*canvas.width)<(y+height))&&((red.y+24/300*canvas.width)>(y-1/300*canvas.width))){
      console.log('y out')
      if(redGrounded==='y'){
        redGrounded = 'n'
        red.yv = 0
      }
    }
  }
  if((blu.x+blu.w/2>x-1/300*canvas.width)&&(blu.x+blu.w/2<x+width-1/300*canvas.width)){
    console.log('x out')
    console.log(blu.y,blu.y+24/300*canvas.width,y)
    if(((blu.y+24/300*canvas.width)<(y+height))&&((blu.y+24/300*canvas.width)>(y-1/300*canvas.width))){
      console.log('y out')
      if(bluGrounded==='y'){
        bluGrounded = 'n'
        blu.yv = 0
      }
    }
  }
}

window.onkeydown = (e) => keyChange(e, 1)
window.onkeyup = (e) => keyChange(e, 0)


function keyChange (e, val) {
  e.preventDefault()
  console.log(e.key, val)
  if (e.key.toLowerCase() === 'arrowup') keys.rup = val
  if (e.key.toLowerCase() === 'arrowright') keys.rright = val
  if (e.key.toLowerCase() === 'arrowleft') keys.rleft = val
  if (e.key.toLowerCase() === 'w') keys.bup = val
  if (e.key.toLowerCase() === 'd') keys.bright = val
  if (e.key.toLowerCase() === 'a') keys.bleft = val
}