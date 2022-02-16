const canvas = document.getElementById("cnv")
const cntx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height= window.innerHeight

let partcleArray = []

//handle mouse

let mouse = {
  ox:null,
  oy:null,
  radius:null
}

window.addEventListener('mousemove', e=>{ 
  mouse = {ox:e.x,oy:e.y,radius:150}
  console.log(mouse.ox,mouse.oy)
})

cntx.fillStyle = "white"
cntx.font = "30px verdana"
cntx.fillText("A",0,30)
const data = cntx.getImageData(0,0,100,100)

class Particle {
  constructor(x,y){
    this.x = x
    this.y = y
    this.size = 3
    this.baseX = this.x
    this.baseY = this.y
    this.densidy = (Math.random()*30 +1)
  }

  draw(){
    cntx.fillStyle="white"
    cntx.beginPath()
    cntx.arc(this.x,this.y,this.size,0,Math.PI*2)
    cntx.closePath()
    cntx.fill()
  }

  update(){
    let dx = mouse.ox - this.x
    let dy = mouse.oy - this.y
    let maxDistance = mouse.radius
    let distance = Math.sqrt((dx*dx) + (dy*dy))
    let forceDirX = (dx/distance)
    let forceDirY = (dy/distance)
    let force = (maxDistance - distance )/ maxDistance
    let dirX = (forceDirX * force * this.densidy)
    let dirY = (forceDirY * force * this.densidy)
  
    if(distance<mouse.radius){
      this.x -= dirX
      this.y -= dirY 
    } else this.size = 3 
  } 
}

const create = ()=>{
  particleColection = []
  
  for(let i =0; i<500;i++){
    let x = Math.random() * canvas.width
    let y = Math.random( ) * canvas.height
    particleColection.push(new Particle(x,y))
  }  
}

create()

console.log(particleColection)

const anim = () =>{
  cntx.clearRect(0,0,canvas.width,canvas.height)
  for(let i = 0; i<particleColection.length;i++){
    particleColection[i].draw()
    particleColection[i].update()
  }
    
  requestAnimationFrame(anim)    
}

anim()