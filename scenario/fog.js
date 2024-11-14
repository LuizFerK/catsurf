function addFog(scene) {
  const fogColor = new THREE.Color('#000000')  // Light gray color
  const fogNear = 170  // Start of fog
  const fogFar = 240   // End of fog
  scene.fog = new THREE.Fog(fogColor, fogNear, fogFar)

  // Set the background color to match the fog
  scene.background = fogColor
}