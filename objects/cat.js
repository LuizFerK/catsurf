function renderCat(scene) {
  const loader = new THREE.OBJLoader()
  const mtlLoader = new THREE.MTLLoader()

  mtlLoader.load('assets/cat.mtl', (materials) => {
    materials.preload()
    loader.setMaterials(materials)
    loader.load('assets/cat.obj', (object) => {
      object.position.set(0, 10, 40)
      object.rotation.y = - Math.PI / 1
      object.scale.set(0.2, 0.2, 0.2)
      object.name = 'cat'
      // Habilitar sombras para cada mesh do modelo
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      // Add event listener for keydown events
      let targetX = object.position.x
      document.addEventListener('keydown', (event) => {
        switch(event.key) {
          case 'ArrowLeft':
          case 'a':
            if (targetX > -30) {
              targetX -= 30
            }
            break
          case 'ArrowRight':
          case 'd':
            if (targetX < 30) {
              targetX += 30
            }
            break
        }
      })

      // Animate cat movement
      function animateCatMovement() {
        object.position.x += (targetX - object.position.x) * 0.15
        requestAnimationFrame(animateCatMovement)
      }
      animateCatMovement()

      scene.add(object)
    })
  })
}