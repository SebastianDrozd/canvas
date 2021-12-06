import { useEffect } from "react";
import "./App.css";

function App() {
  var ctx = null;
  var canvas = null;
  const mouse = {
    x: undefined,
    y: undefined,
  };

  class Particle {
    constructor() {
      // this.x = mouse.x;
      //  this.y = mouse.y;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
    }
    draw() {
      ctx.fillStyle = "blue";

      ctx.beginPath(); //necesarry for lines
      ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  useEffect(() => {
    var particlesArray = [];
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    canvas.addEventListener("click", function (event) {
      mouse.x = event.x;
      mouse.y = event.y;
      console.log("x", mouse.x, "y", mouse.y);
    });
    canvas.addEventListener("mousemove", function (event) {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    //main animation function
    function animate() {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      handleParticles()
      requestAnimationFrame(animate);
    }

    //function to create particles
    function init() {
      for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
      }
    }
  
   //function to handle particles
    function handleParticles(){
      for(let i = 0; i< particlesArray.length;i++){
        particlesArray[i].update();
        particlesArray[i].draw();
      }
    }


    init();
    animate();
  }, []);

  return (
    <>
      <canvas id="canvas1"></canvas>
    </>
  );
}

export default App;
