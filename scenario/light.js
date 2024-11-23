function addLight(scene) {
  // Add some ambient light
  const ambientLight = new THREE.AmbientLight(0xFF4500, 0.5);
  scene.add(ambientLight);

    
  // Add a directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(100, 300, -100); 
  directionalLight.castShadow = true; 

  // Configuração do mapa de sombras
  directionalLight.shadow.mapSize.width = 2048;  
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 500;

  // Volume de sombras
  directionalLight.shadow.camera.left = -150;
  directionalLight.shadow.camera.right = 150;
  directionalLight.shadow.camera.top = 150;
  directionalLight.shadow.camera.bottom = -150;

  scene.add(directionalLight);

}