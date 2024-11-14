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

      // Add event listener for keydown events
      document.addEventListener('keydown', (event) => {
        switch(event.key) {
          case 'ArrowLeft':
          case 'a':
            if (object.position.x > -30) {
              object.position.x -= 30
            }
            break
          case 'ArrowRight':
          case 'd':
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