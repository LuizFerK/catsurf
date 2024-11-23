function renderTree(scene, { speed, acceleration, maxSpeed }) {
    const loader = new THREE.OBJLoader()
    const mtlLoader = new THREE.MTLLoader()
  
    // Carrega e adiciona as árvores
    mtlLoader.load('assets/tree.mtl', (materials) => {
      materials.preload()
      loader.setMaterials(materials)
  
      // Função auxiliar para adicionar árvores em posições diferentes
      function addTree(xPosition, zPositions, namePrefix) {
        zPositions.forEach((zPosition, index) => {
          loader.load('assets/tree.obj', (object) => {
            object.position.set(xPosition, 5, zPosition)
            object.scale.set(2, 2, 2)
            object.name = `${namePrefix}_${index + 1}`//para criar um nome único para cada árvore
            // Habilitar sombras para todas as partes da árvore
            object.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.castShadow = true    // Árvores projetam sombras
                child.receiveShadow = true // Árvores podem receber sombras
              }
            })
            scene.add(object)
            moveWithScene(object, speed, acceleration)  // Função para mover com o cenário
          })
        })
      }
  
      // Posições Z para as árvores
      const gap = -100
      const trees = 4
      const zPositions = []
      for (let i = 0; i < trees; i++) {
        zPositions.push(50 + gap * i)
      }
  
      // Adiciona 4 árvores à direita e 4 à esquerda
      addTree(100, zPositions, 'tree_right')
      addTree(-100, zPositions, 'tree_left')
    })
  }
  
  // Função para mover as árvores com o cenário
  function moveWithScene(tree, speed, acceleration) {
    function updatePosition() {
      speed += acceleration

      if (speed > maxSpeed) {
        speed = maxSpeed
      }

      tree.position.z += speed
  
      // Reinicia a posição Z para criar o loop
      if (tree.position.z > 100) {
        tree.position.z = -300  //distancia entre as arvores
      }
  
      requestAnimationFrame(updatePosition)
    }
    updatePosition()
  }
  