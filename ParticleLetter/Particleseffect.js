const canvas = document.getElementById("cnv")
const cntx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height= window.innerHeight
const posiQuociente = 10

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
cntx.font = "12px verdana"
cntx.fillText("Raimundo",0,30)
const textCordinate = cntx.getImageData(0,0,100,100)

class Particle {
  constructor(x,y){
    this.x = x
    this.y = y
    this.size = 5
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
    } else{
        if(this.x!=this.baseX){
          let dx = this.x - this.baseX
          this.x -= dx/10
        }
        if(this.y!=this.baseY){
          let dy = this.y - this.baseY
          this.y -= dy/10
        }
      
      }  
    } 
}

console.log(textCordinate.data)
const create = ()=>{
  particleColection = []
  
  for(let y =0, y1 =textCordinate.height;y<y1;y++){
    for(let x=0, x1 = textCordinate.width;x<x1;x++){
      if(textCordinate.data[(y*4*textCordinate.width)+(x*4)+3]>128){
        let posX = x +posiQuociente
        let posY = y
        particleColection.push(new Particle(posX*15,posY*15))
        console.log("funcionou")
      }
    }
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