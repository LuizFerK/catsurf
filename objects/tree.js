function renderTree(scene) {
    const loader = new THREE.OBJLoader();
    const mtlLoader = new THREE.MTLLoader();
  
    // Carrega e adiciona as árvores
    mtlLoader.load('assets/tree.mtl', (materials) => {
      materials.preload();
      loader.setMaterials(materials);
  
      // Função auxiliar para adicionar árvores em posições diferentes
      function addTree(xPosition, zPositions, namePrefix) {
        zPositions.forEach((zPosition, index) => {
          loader.load('assets/tree.obj', (object) => {
            object.position.set(xPosition, 10, zPosition);
            object.scale.set(2, 2, 2);
            object.name = `${namePrefix}_${index + 1}`;//para criar um nome único para cada árvore
  
            scene.add(object);
            moveWithScene(object);  // Função para mover com o cenário
          });
        });
      }
  
      // Posições Z para as árvores
      const zPositions = [-70, -150, -230];  
  
      // Adiciona três árvores à direita e três à esquerda
      addTree(100, zPositions, 'tree_right');
      addTree(-100, zPositions, 'tree_left');
    });
  }
  
  // Função para mover as árvores com o cenário
  function moveWithScene(tree) {
    function updatePosition() {
      tree.position.z += 0.5;
  
      // Reinicia a posição Z para criar o loop
      if (tree.position.z > 70) {
        tree.position.z = -230;  //distancia entre as arvores
      }
  
      requestAnimationFrame(updatePosition);
    }
    updatePosition();
  }
  