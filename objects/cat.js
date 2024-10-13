function renderCat(scene) {
  const loader = new THREE.OBJLoader()
  const mtlLoader = new THREE.MTLLoader()
  
  mtlLoader.load('assets/cat.mtl', (materials) => {
    materials.preload()
    loader.setMaterials(materials)
    loader.load('assets/cat.obj', (object) => {
      object.position.set(0, 10, 50)
      object.rotation.y = - Math.PI / 2
      object.scale.set(0.8, 0.8, 0.8)

      // Add event listener for keydown events
      document.addEventListener('keydown', (event) => {
        switch(event.key) {
          case 'ArrowLeft':
            if (object.position.x > -30) {
              object.position.x -= 30
            }
            break
          case 'ArrowRight':
            if (object.position.x < 30) {
              object.position.x += 30
            }
            break
        }
      })

      scene.add(object)
    })
  })
}