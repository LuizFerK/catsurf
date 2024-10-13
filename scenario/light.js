function addLight(scene) {
  // Add some ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
    
  // Add a directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(0, 1, 1).normalize()
  scene.add(directionalLight)
}