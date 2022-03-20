if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var mesh;

function init(){

    var scene = new THREE.Scene(); // creating new scene

    var filenames = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz']; // image order is sensitive
    var reflectionCube = new THREE.CubeTextureLoader().load(filenames.map(
        function(filename){
            return '/img/cubemap/' + filename + '.jpg';
        }
    ));
    scene.background = reflectionCube;

    var renderer = new THREE.WebGLRenderer(); 
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(60,60,60)');
    document.getElementById('webgl').appendChild(renderer.domElement);

    var camera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth/window.innerHeight, //aspect ratio
        1, // near clipping plane
        1000 // far clipping plane (the scenes border)
    );
    camera.position.x = 0; 
    camera.position.y = 0;
    camera.position.z = 40;
    camera.lookAt(new THREE.Vector3(0,0,0))
    
    var objloader = new THREE.OBJLoader();
    objloader.load('models/salamander250k.obj', function(object){
        object.scale.x = 4;
        object.scale.y = 4;
        object.scale.z = 4;

        scene.add(object);
    });    
    
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    var ambientLight = new THREE.AmbientLight( 0x404040 );
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.x = 5;
    directionalLight.position.y = 5;
    directionalLight.position.z = 3.75;
    directionalLight.position.normalize();
    scene.add( directionalLight );

    var directionalLight = new THREE.DirectionalLight( 0x808080 );
    directionalLight.position.x = - 5;
    directionalLight.position.y = 5;
    directionalLight.position.z = - 3.75;
    directionalLight.position.normalize();
    scene.add( directionalLight );

    update(renderer, scene, camera, controls); 
    return scene;
}

function update(renderer, scene, camera, controls){

    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(function() {
        update(renderer, scene, camera, controls);
    })
}

var scene = init();