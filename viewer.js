// Good resource for editing objects live in threejs:
// threejs.org/editor/


function main(){
    // main scene for the object
    var scene = new THREE.Scene();

    var box = generateBox(1,1,3); // is generated at 0,0,0
    box.name = 'box1';
    box.translateZ(-1.5); // box is now at 0,0,0 here you can translate an object through space
    box.position.y = box.geometry.parameters.height/2;
    
    var floor = generateFloor(10, 10);
    floor.name = 'floor';
    floor.rotation.x = Math.PI/2;
    floor.add(box)
    
    var pointLight = generatePointLight(0xffffff, 1);
    pointLight.position.y = 5;

    scene.add(pointLight);
    scene.add(floor);
    scene = loadScene(scene);

    // point of view
    var camera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth/window.innerHeight, //aspect ratio
        1, // near clipping plane
        1000 // far clipping plane (the scenes border)
    );
    camera.position.x = 5;
    camera.position.y = 5;
    camera.position.z = 5;
    camera.lookAt(new THREE.Vector3(0,0,-5))

    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(60,60,60)');
    document.getElementById('webgl').appendChild(renderer.domElement);

    console.log(scene);

    update(renderer, scene, camera); 
    
}
function loadScene(scene){
    var loader = new THREE.ObjectLoader();
    loader. load("scene.json", function(obj){
        scene.add(obj);
    },
    function(x){
        console.log(x.loaded / x.total*100 + '% loaded');
    },
    function(err){
        console.log('Error: could not import scene')
    });
    return scene;
}

function generateFloor(w, d){
   var geo = new THREE.PlaneGeometry(w, d);
   var mat = new THREE.MeshPhongMaterial({
        color: 'rgb(100,100,100)',
        side: THREE.DoubleSide
   });
   var mesh = new THREE.Mesh(geo, mat);
   mesh.receiveShadow = true;
   return mesh;
}

function generateBox(w, h, d){
    var geo = new THREE.BoxGeometry(w, h, d);
    var mat = new THREE.MeshPhongMaterial({
        color: 'rgb(100,100,100)'
    });
    var mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    return mesh;
}

function generatePointLight(color, intensity){
    var light = new THREE.PointLight(color, intensity);
    light.castShadow = true;
    return light;
}


function update(renderer, scene, camera){
    renderer.render(scene, camera);

    var floor = scene.getObjectByName('floor');
    floor.rotation.y += 0.002;

    scene.traverse(function(child){
        //floor.position.x += 0.01;
    });

    requestAnimationFrame(function() {
        update(renderer, scene, camera);
    });
}


var scene = main();


