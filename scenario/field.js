function createField(scene, { speed, acceleration, maxSpeed }) {
  // Create a green field (plane)
  const geometry = new THREE.PlaneGeometry(150, 75)
  const grassTexture = new THREE.TextureLoader().load('assets/grass_bricks.avif')
  const grassMaterial = new THREE.MeshStandardMaterial({ map: grassTexture })
  
  const field = new THREE.Mesh(geometry, grassMaterial)
  field.rotation.x = - Math.PI / 2 // Rotate the plane to be horizontal
  field.receiveShadow = true // Permite que o chão receba sombras
  const grid_size = 2
  
  // Create a grid of grass fields
  const fields = []
  for (let i = -grid_size; i <= grid_size; i++) {
    for (let j = -grid_size; j <= grid_size; j++) {
      const fieldClone = field.clone()
      fieldClone.position.set(i * 150, 0, j * 75)
      scene.add(fieldClone)
      fields.push(fieldClone)
    }
  }

  // Animation function to move the fields
  function animateField() {
    requestAnimationFrame(animateField)
    speed += acceleration

    if (speed > maxSpeed) {
      speed = maxSpeed
    }

    fields.forEach(fieldClone => {
      fieldClone.position.z += speed
      if (fieldClone.position.z > (grid_size) * 75) {
        fieldClone.position.z -= (2 * grid_size + 1) * 75
      }
    })
  }

  animateField()
}