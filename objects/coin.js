function renderCoin(scene, { lane, speed, startPosition }) {
  const loader = new THREE.OBJLoader()
  
  const goldenMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFD700,
    metalness: 0.5,
    roughness: 0.1,
    // emissive: 0x222200,
    // emissiveIntensity: 1
  });

  loader.load('assets/coin.obj', (object) => {
    object.position.set(30 * lane, 10, -70 + startPosition)
    object.rotation.y = - Math.PI / 2
    object.scale.set(0.05, 0.05, 0.05)

    object.traverse( function ( child ) {
      if (child instanceof THREE.Mesh) {
        child.material = goldenMaterial
      }
    })

    scene.add(object)
    var isColliding = false;

    function animateCoin() {
      object.rotation.y += 0.05;
      object.position.z += speed;

      const cat = scene.getObjectByName('cat')

      if (cat && object) {
        var box1 = new THREE.Box3().setFromObject(cat);
        var box2 = new THREE.Box3().setFromObject(object);

        if (box1.intersectsBox(box2) && !isColliding) {
          isColliding = true;
          
          scene.remove(object)
          cancelAnimationFrame(animateCoin);

          // Update coin counter
          const counter = document.getElementById('coinCounter').innerText
          document.getElementById('coinCounter').innerText = parseInt(counter) + 1
        }
      }

      // Remove coin if it's too far
      if (object.position.z > 75) {
        scene.remove(object);
        cancelAnimationFrame(animateCoin);
      } else {
        requestAnimationFrame(animateCoin);
      }
    }

    animateCoin();
  })
}