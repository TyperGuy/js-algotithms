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
  mouse = {ox:e.x,oy:e.y,radius:200}
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
    cntx.ard(this.x,this.y,this.size,0,Math.PI*2)
    cntx.closePath()
    cntx.fill()
  }
}