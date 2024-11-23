// objetosnao configurados para ter sombrad
function addShadow(scene, renderer) {
    // Definindo a luz direcional, que irá projetar sombras
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(10, 10, 10) 
    light.castShadow = true // permitindo a projeção de sombra
    scene.add(light)
    
    // Ajuste das sombras da luz
    light.shadow.mapSize.width = 1024 
    light.shadow.mapSize.height = 1024 
    light.shadow.camera.near = 0.1     
    light.shadow.camera.far = 100
   
    scene.traverse(function (object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true 
        object.receiveShadow = true 
      }
    })
    

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap 
  }
  