function renderSimpleObstacle(scene, { lane, speed, acceleration, maxSpeed, startPosition }) {
    //console.log('Obstáculo renderizado com sucesso!');

    const geometry = new THREE.SphereGeometry(10, 10, 10);
    const loader = new THREE.TextureLoader();
    const texture = loader.load('assets/textura-la.avif')
    const material = new THREE.MeshBasicMaterial({map: texture});
  
    const obstacle = new THREE.Mesh(geometry, material);
    
    lane = Math.floor(Math.random() * 3) - 1;  
    obstacle.position.set(30 * lane, 10, startPosition); 
    
    obstacle.castShadow = true;
    obstacle.receiveShadow = true;
  
    scene.add(obstacle);
  
    let isColliding = false;
  
    function animateObstacle() {
      speed += acceleration;
  
      if (speed > maxSpeed) {
        speed = maxSpeed;
      }
  
      obstacle.position.z += speed;
  
      const cat = scene.getObjectByName('cat');
      if (cat && obstacle) {
        const box1 = new THREE.Box3().setFromObject(cat);
        const box2 = new THREE.Box3().setFromObject(obstacle);
  
        if (box1.intersectsBox(box2) && !isColliding) {
          isColliding = true;
  
          scene.remove(obstacle);
          cancelAnimationFrame(animateObstacle);

          const livesDisplay = document.getElementById('livesCounter');
          let newCounter = livesDisplay.innerText.length; // Conta o número de corações (♥)
          newCounter--;
  
          livesDisplay.innerHTML = '♥'.repeat(newCounter);

          //document.getElementById('livesCounter').innerText = newCounter;

          document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
              
            }
          });
  
          if (newCounter == 0) {
            const gameOverImage = document.createElement('img');
            gameOverImage.src = 'assets/gameover.jpg';
            gameOverImage.style.position = 'center';
            gameOverImage.style.transform = 'translate(0%, -90%)';
            gameOverImage.style.zIndex = '9999';
            gameOverImage.style.width = '100%'

            document.body.appendChild(gameOverImage);

            const restartButton = document.createElement('button');
            restartButton.innerText = 'Reiniciar';
            restartButton.style.position = 'absolute';
            restartButton.style.top = '70%';
            restartButton.style.left = '50%';
            restartButton.style.transform = 'translate(-50%, -50%)';
            restartButton.style.zIndex = '10000';
            restartButton.style.padding = '10px 20px';
            restartButton.style.fontSize = '16px';

            restartButton.onclick = () => {
                window.location.reload();
            };

            document.body.appendChild(restartButton);
            
          }

        }
        
      }
      
  
      if (obstacle.position.z > 75) {
        scene.remove(obstacle);
        cancelAnimationFrame(animateObstacle);
      } else {
        requestAnimationFrame(animateObstacle);
      }
    }
  
    animateObstacle();
  }
  