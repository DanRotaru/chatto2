class TankViewer {
    constructor(params) {
        this.element = params.element;
        this.garage = params.garage;

        
        this.excluded = /(box.*|fmnt.*|muzzle.*|laser|rocket|exh_.*|smk_.*|boundbox|shell)/i;
        /*
            {
                0: camera animation,
                1: paint,
                2: paint_animation,
                3: meshes rotation (turret, hull, floor)
                4: nope
            }
        */
        this.animationFrames = [false, false, false, false, false],
        this.rotateAnimation = [false, false];
            this.tracksUrl = '/assets/garage/garage/trucks.webp',
            this.dataUrl = '/assets/garage/garage/',
            this.readyState = 0,
            this.colorFrames = {
                currentFrame: 0,
                currentFrameX: 0,
                currentFrameY: 0
            },
            this.colorParams = {};
            this.meshes = {
                'turret': [],
                'hull': [],
                'floor': [],
                'hullMount': ''
            },
            this.continueAnimation = true,
            this.rotateinterval = false,
            this.three = {
                scene: false,
                camera: false,
                element: false,
                renderer: false,
                radian: 0,
                radian1: 0,
                hullTexture: false,
                turretTexture: false,
                cameraOnce: false,
                elW: 0,
                elH: 0,
                hullRotation: [0, 0, 0],
                turretRotation: [0, 0, 0],
                floorRotation: [0, 0, 0],
                updateCamera: () => {
                    // console.log(this);
                    if (!this.continueAnimation) {
                        // console.log(this.continueAnimation);
                        setTimeout(() => {
                            this.animationFrames[0] = requestAnimationFrame(this.three.updateCamera);
                        }, 500);
                        return false;
                    }
                    this.animationFrames[0] = requestAnimationFrame(this.three.updateCamera);

                    let cameraPosX = -131;
                    let cameraPosY = 293;
                    this.three.hullTexture.needsUpdate = true;
                    this.three.turretTexture.needsUpdate = true;
                    this.three.renderer.render(this.three.scene, this.three.camera);
                    this.three.camera.position.x = cameraPosX + cameraPosX * Math.cos(this.three.radian) / 4;
                    this.three.camera.position.y = cameraPosY + cameraPosY * Math.sin(this.three.radian) / 4;
                    this.three.radian += 0.01;
                    this.three.camera.lookAt(new THREE.Vector3(-470, 50, -2231));
                }
            },
            this.manager = new THREE.LoadingManager();
            this.manager.onLoad = function(){
                // console.log('er');
            }

            this.init = async (params) => {
                // return;
                // if(document.domain !== "chatto2.herokuapp.com") return false;
                let hull = params.hull;
                let turret = params.turret;
                let color = params.color;

                if (this.animationFrames[0]) {
                    cancelAnimationFrame(this.animationFrames[0]);
                }
                if (this.animationFrames[1]) {
                    cancelAnimationFrame(this.animationFrames[1]);
                }
                if (this.animationFrames[2]) {
                    cancelAnimationFrame(this.animationFrames[2]);
                }

                if (color[1].animated) {
                    this.colorParams = {
                        frameWidth: color[1].frameWidth,
                        frameHeight: color[1].frameHeight,
                        numFrames: color[1].numFrames,
                        fps: color[1].fps,
                    };
                    this.startUpdatingFrames();
                }

                this.element.innerHTML = '';

                let hullCanvas = document.createElement('canvas');
                let hullTexture = new THREE.Texture(hullCanvas);
                hullTexture.minFilter = THREE.LinearFilter;
                this.three.hullTexture = hullTexture;

                let turretCanvas = document.createElement('canvas');
                let turretTexture = new THREE.Texture(turretCanvas);
                turretTexture.minFilter = THREE.LinearFilter;
                this.three.turretTexture = turretTexture;

                this.createTexture(hullCanvas, hull, color);
                this.createTexture(turretCanvas, turret, color);

                this.three.scene = new THREE.Scene();
                this.three.camera = new THREE.PerspectiveCamera(65, this.element.offsetWidth / this.element.offsetHeight, 1, 100000000);
                this.three.renderer = new THREE.WebGLRenderer({
                    'antialias': true,
                    'alpha': true,
                    'premultipliedAlpha': true
                });
                this.three.renderer.setClearColor(0x1c2325, 1); // the default,
                this.three.renderer.setPixelRatio(window.devicePixelRatio);
                this.three.renderer.shadowMap.enabled = false;
                // renderer.gammaOutput = true;
                // renderer.gammaFactor = 1;
                // renderer.shadowMap.enabled = false;
                // renderer.autoClear = false;
                let objLoader = new THREE.OBJLoader();
                let textureLoader = new THREE.TextureLoader();

                //resize
                let w = await this.element.offsetWidth;
                let h = this.element.offsetHeight;
                this.three.elW = w;
                this.three.elH = h;
                this.three.renderer.setSize(w, h);
                this.three.camera.aspect = w / h;
                this.three.camera.updateProjectionMatrix();
                // console.log(this.element, w);

                this.three.renderer.setClearColor(0, 0);
                this.three.renderer.setSize(this.element.clientWidth, this.element.clientHeight);
                this.element.appendChild(this.three.renderer.domElement);

                this.three.camera.position.x = -131;
                this.three.camera.position.y = 293;
                this.three.camera.position.z = -2736;

                let loadGarage = new Promise(resolve => {
                    objLoader.load(this.dataUrl + 'model.obj', object => {
                        let meshes = [];
                        object.traverse(object3d => {
                            if (object3d instanceof THREE.Mesh) {
                                meshes.push(object3d);
                            }
                        });
                        meshes[0].geometry.computeBoundingSphere();
                        for (let i = meshes.length - 1; i >= 0; i--) {
                            let mesh = meshes[i];

                            if (/(light.*|cam.*)/i.test(mesh.name)) {
                                continue;
                            }
                            else if (mesh.name == 'Sky0_14') {
                                mesh.material = new THREE.MeshBasicMaterial({
                                    map: textureLoader.load(this.dataUrl + 'sky1.webp')
                                });
                                mesh.position.y = -1500;
                            }
                            else if (mesh.name == 'bg0_13') {
                                mesh.material = new THREE.MeshBasicMaterial({
                                    map: textureLoader.load(this.dataUrl + 'bg1.webp')
                                });
                            }
                            else if (mesh.name == 'room0_8') {
                                mesh.material = new THREE.MeshBasicMaterial({
                                    map: textureLoader.load(this.dataUrl + 'gar1.webp')
                                });
                            }
                            else if (mesh.name == 'belt_L_10' || mesh.name == 'belt_R_11') {
                                this.meshes.floor.push(mesh);
                                let texture = textureLoader.load(this.dataUrl + 'race1.webp');
                                texture.wrapS = THREE.RepeatWrapping;
                                texture.wrapT = THREE.RepeatWrapping;
                                texture.repeat.set(1, 1);

                                mesh.material = new THREE.MeshBasicMaterial({
                                    map: texture
                                });
                            }
                            else if (mesh.name == 'tnk_base_9') {
                                this.meshes.floor.push(mesh);
                                mesh.material = new THREE.MeshBasicMaterial({
                                    map: textureLoader.load(this.dataUrl + 'pl2.webp')
                                });
                            }
                            else if (mesh.name == 'tnk_plat_7') {
                                mesh.material = new THREE.MeshBasicMaterial({
                                    map: textureLoader.load(this.dataUrl + 'pl1.webp')
                                });
                            }
                            else if (mesh.name == 'floor0_6') {
                                mesh.material = new THREE.MeshBasicMaterial({
                                    map: textureLoader.load(this.dataUrl + 'flr.webp')
                                });
                            }
                            else if (mesh.name == 'transp1_3' || mesh.name == 'transp2_12') {
                                mesh.material = new THREE.MeshBasicMaterial({
                                    map: textureLoader.load(this.dataUrl + 'bl.webp'),
                                    alphaTest: 0.5
                                });
                            }

                            resolve(
                                mesh.material.transparent = true,
                                mesh.position.x = -meshes[0].geometry.boundingSphere.center.x,
                                mesh.position.y = 0,
                                mesh.position.z = -meshes[0].geometry.boundingSphere.center.z,
                                this.three.scene.add(mesh)
                            )
                            
                        }
                    });
                });
                await loadGarage;

                let turretPosY = 0;
                let turretPosX = 0;
                let turretPosZ = 0;
                let loadHull = new Promise(resolve => {
                    objLoader.load(hull + 'model.obj', object => {
                        let meshes = [];
                        object.traverse(object3d => {
                            if (object3d instanceof THREE.Mesh) {
                                meshes.push(object3d);
                            }
                        });
                        meshes[0].geometry.computeBoundingSphere();

                        for (let i = meshes.length - 1; i >= 0; i--) {
                            let mesh = meshes[i];
                            if (this.excluded.test(mesh.name))
                                continue;

                            if (/[lr]track/i.test(mesh.name)) {
                                let trackTexture = textureLoader.load(this.tracksUrl);
                                trackTexture.minFilter = THREE.LinearFilter;
                                trackTexture.wrapS = THREE.RepeatWrapping;
                                trackTexture.wrapT = THREE.RepeatWrapping;
                                trackTexture.repeat.set(1, 1);

                                mesh.material = new THREE.MeshBasicMaterial({
                                    map: trackTexture
                                });
                            } else {
                                mesh.material = new THREE.MeshBasicMaterial({
                                    map: hullTexture
                                });
                            }

                            mesh.position.x = -meshes[0].geometry.boundingSphere.center.x - 460;
                            mesh.position.y = 22.3;
                            mesh.position.z = -meshes[0].geometry.boundingSphere.center.z - 2200;

                            if (mesh.name.toLowerCase().indexOf('mount') !== -1) {
                                let mount = new THREE.Box3().setFromObject(mesh);
                                this.meshes.hullMount = mount;
                                resolve(
                                    turretPosX = (mount.min.x + mount.max.x) / 2,
                                    turretPosY = mount.min.y,
                                    turretPosZ = (mount.min.z + mount.max.z) / 2
                                );
                            } else {
                                this.three.scene.add(mesh);
                            }
                            this.meshes.hull.push(mesh);
                        }
                    });
                });
                await loadHull;

                let loadTurret = new Promise(resolve => {
                    objLoader.load(turret + 'model.obj', object => {
                        let meshes = [];
                        object.traverse(object3d => {
                            if (object3d instanceof THREE.Mesh) {
                                meshes.push(object3d);
                            }
                        });
                        meshes[0].geometry.computeBoundingSphere();
                        for (let i = meshes.length - 1; i >= 0; i--) {
                            let mesh = meshes[i];
                            if (this.excluded.test(mesh.name))
                                continue;

                            mesh.material = new THREE.MeshBasicMaterial({
                                map: turretTexture
                            });
                            mesh.position.x = turretPosX;
                            mesh.position.y = turretPosY;
                            mesh.position.z = turretPosZ;

                           
                            resolve(
                                this.three.scene.add(mesh),
                                this.meshes.turret.push(mesh)
                            );
                        }
                    });
                });
                await loadTurret;

                
                this.three.updateCamera(this);
                

                this.rotate(this);
                this.mouse(this);
                // this.autoRotate(this);
                if(params.cb) params.cb();
            },

            this.install = async (params) => {
                let hull = params.hull;
                let turret = params.turret;
                let color = params.color;

                if (this.animationFrames[0]) {
                    cancelAnimationFrame(this.animationFrames[0]);
                }
                if (this.animationFrames[1]) {
                    cancelAnimationFrame(this.animationFrames[1]);
                }
                if (this.animationFrames[2]) {
                    cancelAnimationFrame(this.animationFrames[2]);
                }

                if (color[1].animated) {
                    this.colorParams = {
                        frameWidth: color[1].frameWidth,
                        frameHeight: color[1].frameHeight,
                        numFrames: color[1].numFrames,
                        fps: color[1].fps,
                    };
                    this.startUpdatingFrames();
                }


                let hullCanvas = document.createElement('canvas');
                let hullTexture = new THREE.Texture(hullCanvas);
                hullTexture.minFilter = THREE.LinearFilter;
                this.three.hullTexture = hullTexture;

                let turretCanvas = document.createElement('canvas');
                let turretTexture = new THREE.Texture(turretCanvas);
                turretTexture.minFilter = THREE.LinearFilter;
                this.three.turretTexture = turretTexture;

                let turretName = this.three.scene.getObjectByName('turret');
                let hullName = this.three.scene.getObjectByName('hull');

                for(let m of this.meshes.turret) this.three.scene.remove(m)
                for(let m of this.meshes.hull) this.three.scene.remove(m)
                this.meshes.turret.length = 0;
                this.meshes.hull.length = 0;


                this.createTexture(hullCanvas, hull, color);
                this.createTexture(turretCanvas, turret, color);


                let objLoader = new THREE.OBJLoader( this.manager );
                let textureLoader = new THREE.TextureLoader();

                let turretPosY = 0;
                let turretPosX = 0;
                let turretPosZ = 0;
                

                let loadHull = new Promise(resolve => {
                    objLoader.load(hull + 'model.obj', object => {
                        let meshes = [];
                        object.traverse(object3d => {
                            if (object3d instanceof THREE.Mesh) {
                                meshes.push(object3d);
                            }
                        });
                        meshes[0].geometry.computeBoundingSphere();

                        for (let i = meshes.length - 1; i >= 0; i--) {
                            let mesh = meshes[i];
                            if (this.excluded.test(mesh.name))
                                continue;

                            if (/[lr]track/i.test(mesh.name)) {
                                let trackTexture = textureLoader.load(this.tracksUrl);
                                trackTexture.minFilter = THREE.LinearFilter;
                                trackTexture.wrapS = THREE.RepeatWrapping;
                                trackTexture.wrapT = THREE.RepeatWrapping;
                                trackTexture.repeat.set(1, 1);

                                mesh.material = new THREE.MeshBasicMaterial({
                                    map: trackTexture
                                });
                            } else {
                                mesh.material = new THREE.MeshBasicMaterial({
                                    map: hullTexture
                                });
                            }

                            mesh.position.x = -meshes[0].geometry.boundingSphere.center.x - 460;
                            mesh.position.y = 22.3;
                            mesh.position.z = -meshes[0].geometry.boundingSphere.center.z - 2200;

                            if (mesh.name.toLowerCase().indexOf('mount') !== -1) {
                                let mount = new THREE.Box3().setFromObject(mesh);
                                this.meshes.hullMount = mount;
                                resolve(
                                    turretPosX = (mount.min.x + mount.max.x) / 2,
                                    turretPosY = mount.min.y,
                                    turretPosZ = (mount.min.z + mount.max.z) / 2
                                );
                            } else {
                                this.three.scene.add(mesh);
                            }
                            this.meshes.hull.push(mesh);
                        }
                    });
                });
                await loadHull;
                
                let loadTurret = new Promise(resolve => {
                    objLoader.load(turret + 'model.obj', object => {
                        let meshes = [];
                        object.traverse(object3d => {
                            if (object3d instanceof THREE.Mesh) {
                                meshes.push(object3d);
                            }
                        });
                        meshes[0].geometry.computeBoundingSphere();
                        for (let i = meshes.length - 1; i >= 0; i--) {
                            let mesh = meshes[i];
                            if (this.excluded.test(mesh.name))
                                continue;

                            mesh.material = new THREE.MeshBasicMaterial({
                                map: turretTexture
                            });

                            mesh.position.x = turretPosX;
                            mesh.position.y = turretPosY;
                            mesh.position.z = turretPosZ;

                            resolve(this.three.scene.add(mesh),
                            this.meshes.turret.push(mesh));
                        }

                    });
                });
                await loadTurret;

                let turretMesh = this.meshes.turret;
                let hullMesh = this.meshes.hull;
                let floorMesh = this.meshes.floor;

                for (let i = 0; i < turretMesh.length; i++) {
                    if (typeof turretMesh[i].rotation !== "undefined")
                        turretMesh[i].rotation.y = this.three.turretRotation[i];
                }
                for (let i = 0; i < hullMesh.length; i++) {
                    if (typeof hullMesh[i].rotation !== "undefined")
                        hullMesh[i].rotation.y = this.three.hullRotation[i];
                }
                for (let i = 0; i < floorMesh.length; i++) {
                    if (typeof floorMesh[i].rotation !== "undefined")
                        floorMesh[i].rotation.y = this.three.floorRotation[i];
                }

                this.turretF();

                cancelAnimationFrame(this.animationFrames[0]);
                this.three.updateCamera(this);
            },

            this.turretF = function () {
                let turretMesh = this.meshes.turret;
                let hullMesh = this.meshes.hull;
                for (let i = 0; i < hullMesh.length; i++) {
                    if (hullMesh[i].name.toLowerCase().indexOf('mount') !== -1) {
                        let mount = new THREE.Box3().setFromObject(hullMesh[i]);
                        this.meshes.hullMount = mount;
                        for (let j = 0; j < turretMesh.length; j++) {
                            if (typeof turretMesh[j].rotation !== "undefined")
                                turretMesh[j].position.x = (mount.min.x + mount.max.x) / 2;
                            if (typeof turretMesh[j].rotation !== "undefined")
                                turretMesh[j].position.y = mount.min.y;
                            if (typeof turretMesh[j].rotation !== "undefined")
                                turretMesh[j].position.z = (mount.min.z + mount.max.z) / 2;
                        }
                    }
                }
            },
            this.rotate = function (viewer) {
                if (!viewer.continueAnimation)
                    return false;
                let turretMesh = viewer.meshes.turret;
                let hullMesh = viewer.meshes.hull;
                let floorMesh = viewer.meshes.floor;
                document.addEventListener('keydown', function (e) {
                    if(e.target.tagName !== 'BODY') return false;
                    if (!viewer.continueAnimation)
                        return false;
                    let key = e.code;
                    let speed = 0.05;
                    
                    if (key == "KeyZ") {
                        for (let i = 0; i < turretMesh.length; i++) {
                            if (typeof turretMesh[i].rotation !== "undefined")
                                turretMesh[i].rotation.y -= speed;
                        }
                    }
                    else if (key == "KeyX") {
                        for (let i = 0; i < turretMesh.length; i++) {
                            if (typeof turretMesh[i].rotation !== "undefined")
                                turretMesh[i].rotation.y += speed;
                        }
                    }
                    else if (key == "KeyC") {
                        for (let i = 0; i < turretMesh.length; i++) {
                            if (typeof turretMesh[i].rotation !== "undefined")
                                turretMesh[i].rotation.y = 0;
                        }
                    }
                    else if (key == "KeyA") {
                        for (let i = 0; i < hullMesh.length; i++) {
                            if (typeof hullMesh[i].rotation !== "undefined")
                                hullMesh[i].rotation.y -= speed;
                        }
                        for (let i = 0; i < floorMesh.length; i++) {
                            if (typeof floorMesh[i].rotation !== "undefined")
                                floorMesh[i].rotation.y -= speed;
                        }
                        viewer.turretF();
                    }
                    else if (key == "KeyD") {
                        for (let i = 0; i < hullMesh.length; i++) {
                            if (typeof hullMesh[i].rotation !== "undefined")
                                hullMesh[i].rotation.y += speed;
                        }
                        for (let i = 0; i < floorMesh.length; i++) {
                            if (typeof floorMesh[i].rotation !== "undefined")
                                floorMesh[i].rotation.y += speed;
                        }
                        viewer.turretF();
                    }
                    else if (key == "KeyF") {
                        for (let i = 0; i < hullMesh.length; i++) {
                            if (typeof hullMesh[i].rotation !== "undefined")
                                hullMesh[i].rotation.y = 0;
                        }
                        for (let i = 0; i < floorMesh.length; i++) {
                            if (typeof floorMesh[i].rotation !== "undefined")
                                floorMesh[i].rotation.y = 0;
                        }
                    }
                    else if (key == "KeyG") {
                        for (let i = 0; i < hullMesh.length; i++) {
                            if (typeof hullMesh[i].rotation !== "undefined")
                                hullMesh[i].lookAt({ x: 0, y: 0, z: 0 });
                        }
                        viewer.turretF();
                    }
                });
            },
            this.rotateM = (meshes, speed, direction) => {
                for (let i = 0; i < meshes.length; i++) {
                    if (typeof meshes[i].rotation !== "undefined")
                        if(direction) meshes[i].rotation.y += speed;
                        else meshes[i].rotation.y -= speed;
                }
            },
            this.mouse = function (viewer) {
                if (!this.continueAnimation)
                    return false;
                let turretMesh = this.meshes.turret;
                let hullMesh = this.meshes.hull;
                let floorMesh = this.meshes.floor;
                let isDragging = false;
                let prevX = -1;
                let toleft = false;

                let mouseClickX = 0;
                let mouseClickY = 0;

                function onMouseMove(e) {
                    // console.log(e);
                    e.preventDefault();
                    // let halfWidth = window.innerWidth/2, halfHeight = window.innerHeight/2;
                    // let mouseX = e.clientX;
                    // let mouseY = e.clientY;
                    // console.log({mouseClickX, mouseClickY});
                    // console.log({mouseX, mouseY});
                    
                    // if(e.target.tagName !== 'CANVAS') return false;
                    if (!viewer.continueAnimation)
                        return false;
                    // console.log(e);
                    
                    // requestAnimationFrame(onMouseMove);
                    let speed = 0.01;
                    // let speed = 0.003;
                    speed = Math.sin(speed);
                    if (prevX == -1) {
                        prevX = e.pageX;
                        return false;
                    }
                    if (prevX > e.pageX) {
                        toleft = true;
                        viewer.rotateM(turretMesh, speed);
                        viewer.rotateM(hullMesh, speed);
                        viewer.rotateM(floorMesh, speed);
                        viewer.turretF();
                    }
                    else if (prevX < e.pageX) {
                        toleft = false;
                        viewer.rotateM(turretMesh, speed, 1);
                        viewer.rotateM(hullMesh, speed, 1);
                        viewer.rotateM(floorMesh, speed, 1);
                        viewer.turretF();
                    }
                    prevX = e.pageX;
                    viewer.animationFrames[3] = requestAnimationFrame(function(){
                        // onMouseMove(e);
                    });
                }
                document.addEventListener('mousedown', function (e) {
                    // console.log('down');
                    if(e.target.tagName !== 'CANVAS') return false;
                    mouseClickX = e.clientX;
                    mouseClickY = e.clientY;
                    startDrag();

                    function finishDrag(e) {
                        // if(e.target.tagName !== 'CANVAS') return false;
                        if (!isDragging)
                            return;
                        // requestAnimationFrame(finishDrag);
                        let speed = 0.1;

                        viewer.three.turretRotation.length = 0;
                        viewer.three.hullRotation.length = 0;
                        viewer.three.floorRotation.length = 0;
                        for (let i = 0; i < turretMesh.length; i++) {
                            if (typeof turretMesh[i].rotation !== "undefined")
                                viewer.three.turretRotation[i] = turretMesh[i].rotation.y;
                        }
                        for (let i = 0; i < hullMesh.length; i++) {
                            if (typeof hullMesh[i].rotation !== "undefined")
                                viewer.three.hullRotation[i] = hullMesh[i].rotation.y;
                        }
                        for (let i = 0; i < floorMesh.length; i++) {
                            if (typeof floorMesh[i].rotation !== "undefined")
                                viewer.three.floorRotation[i] = floorMesh[i].rotation.y;
                        }

                        isDragging = false;
                        cancelAnimationFrame(viewer.animationFrames[3]);
                        document.removeEventListener('mousemove', onMouseMove);

                        // this.rotateinterval = setInterval(function(){
                        //     if(toleft){
                        //         for(let i = 0; i < turretMesh.length; i++){
                        //             if(typeof turretMesh[i].rotation !== "undefined") turretMesh[i].rotation.y -= speed;
                        //         }
                        //         for(let i = 0; i < hullMesh.length; i++){
                        //             if(typeof hullMesh[i].rotation !== "undefined") hullMesh[i].rotation.y -= speed;
                        //         }
                        //         for(let i = 0; i < floorMesh.length; i++){
                        //             if(typeof floorMesh[i].rotation !== "undefined") floorMesh[i].rotation.y -= speed;
                        //         }
                        //     }
                        //     else{
                        //         for(let i = 0; i < turretMesh.length; i++){
                        //             if(typeof turretMesh[i].rotation !== "undefined") turretMesh[i].rotation.y += speed;
                        //         }
                        //         for(let i = 0; i < hullMesh.length; i++){
                        //             if(typeof hullMesh[i].rotation !== "undefined") hullMesh[i].rotation.y += speed;
                        //         }
                        //         for(let i = 0; i < floorMesh.length; i++){
                        //             if(typeof floorMesh[i].rotation !== "undefined") floorMesh[i].rotation.y += speed;
                        //         }
                        //     }
                        // }, 1000/60); 
                        // setTimeout(() => {
                        //     clearInterval(this.rotateinterval);
                        //     this.rotateinterval = false;
                        // }, 500);
                    }

                    function startDrag() {
                        if (isDragging)
                            return;
                        if (!viewer.continueAnimation)
                            return false;
                        document.removeEventListener('mousemove', onMouseMove);
                        document.addEventListener('mouseup', finishDrag);
                        document.addEventListener('mousemove', onMouseMove);
                        isDragging = true;
                    };
                });
                // document.addEventListener('mouseup', function() {
                //     console.log('up');
                // });
            },
            this.autoRotate = () => {
                if (!this.continueAnimation)
                    return false;
                let turretMesh = this.meshes.turret;
                let hullMesh = this.meshes.hull;
                let floorMesh = this.meshes.floor;
                let speed = 0.003;
                speed = Math.sin(speed) / 4;

                for (let i = 0; i < turretMesh.length; i++) {
                    if (typeof turretMesh[i].rotation !== "undefined")
                        turretMesh[i].rotation.y -= speed;
                }
                for (let i = 0; i < hullMesh.length; i++) {
                    if (typeof hullMesh[i].rotation !== "undefined")
                        // hullMesh[i].rotation.y -= speed;
                        hullMesh[i].rotation.y -= speed;
                        // this.three.radian1 += 0.01;
                }
                for (let i = 0; i < floorMesh.length; i++) {
                    if (typeof floorMesh[i].rotation !== "undefined")
                        floorMesh[i].rotation.y -= speed;
                }
                this.turretF();
                // this.three.hullTexture.needsUpdate = true;
                // this.three.turretTexture.needsUpdate = true;
                // this.three.renderer.render(this.three.scene, this.three.camera);
                // this.three.camera.position.x = cameraPosX + cameraPosX * Math.cos(this.three.radian) / 4;
               

                this.animationFrames[3] = requestAnimationFrame(this.autoRotate);
            },
            this.createTexture = (canvas, itemUrl, colorUrl) => {
                if (this.readyState >= 2) {
                    this.readyState = 0;
                }
                let lightmap = new Image;
                lightmap.onload = () => {
                    let color = new Image;
                    color.onload = () => {
                        let details = new Image;
                        details.onload = () => {
                            canvas.width = lightmap.width;
                            canvas.height = lightmap.height;

                            if (colorUrl[1].animated == '0') {
                                let context2d = canvas.getContext('2d');
                                let pattern = context2d.createPattern(color, 'repeat');
                                context2d.globalCompositeOperation = 'hard-light';
                                context2d.fillStyle = pattern;
                                context2d.fillRect(0, 0, lightmap.width, lightmap.height);
                                context2d.drawImage(lightmap, 0, 0);
                                context2d.globalCompositeOperation = 'source-over';
                                context2d.drawImage(details, 0, 0);
                            } else {
                                this.readyState++;

                                let frameWidth = colorUrl[1].frameWidth;
                                let frameHeight = colorUrl[1].frameHeight;
                                this.colorParams.numFramesX = color.width / frameWidth;
                                this.colorParams.numFramesY = color.height / frameHeight;

                                let anim = () => {
                                    if (!this.continueAnimation) {
                                        setTimeout(() => {
                                            this.animationFrames[1] = requestAnimationFrame(anim);
                                        }, 500);
                                        return false;
                                    }
                                    this.animationFrames[1] = requestAnimationFrame(anim);
                                    if (!(this.readyState < 2)) {
                                        let colorImage = document.createElement('canvas');
                                        colorImage.width = frameWidth;
                                        colorImage.height = frameHeight;
                                        colorImage.getContext('2d').drawImage(color, -Math.floor(this.colorFrames.currentFrameX * frameWidth), -Math.floor(this.colorFrames.currentFrameY * frameHeight));

                                        let context2d = canvas.getContext('2d');
                                        context2d.clearRect(0, 0, lightmap.width, lightmap.height);
                                        context2d.globalCompositeOperation = 'hard-light';
                                        context2d.fillStyle = context2d.createPattern(colorImage, 'repeat');
                                        context2d.fillRect(0, 0, lightmap.width, lightmap.height);
                                        context2d.drawImage(lightmap, 0, 0);
                                        context2d.globalCompositeOperation = 'source-over';
                                        context2d.drawImage(details, 0, 0);
                                    }
                                };
                                anim();
                            }
                        };
                        details.src = itemUrl + 'details.png';
                    };
                    color.src = colorUrl[0];
                };
                lightmap.src = itemUrl + 'lightmap.jpg';
            },
            this.startUpdatingFrames = () => {
                let clock = new THREE.Clock();
                let delta = 0;
                let anim = () => {
                    if (!this.continueAnimation) {
                        setTimeout(() => {
                            this.animationFrames[2] = requestAnimationFrame(anim);
                        }, 500);
                        return false;
                    }
                    this.animationFrames[2] = requestAnimationFrame(anim);
                    delta += clock.getDelta();
                    if (delta > (1 / this.colorParams.fps) && this.readyState >= 2) {
                        this.colorFrames.currentFrame++;
                        this.colorFrames.currentFrameX++;
                        if (this.colorFrames.currentFrameX >= this.colorParams.numFramesX) {
                            this.colorFrames.currentFrameX = 0;
                            this.colorFrames.currentFrameY++;
                        }
                        if (this.colorFrames.currentFrameY >= this.colorParams.numFramesY || this.colorFrames.currentFrame >= this.colorParams.numFrames) {
                            this.colorFrames.currentFrame = 0;
                            this.colorFrames.currentFrameX = 0;
                            this.colorFrames.currentFrameY = 0;
                        }

                        delta = delta % (1 / this.colorParams.fps);
                    }
                };
                anim();
            };
    }
}
THREE.WindowResize = () => {
	let callback = () => {
        // console.log(viewer1.three.element, document.getElementById('garageViewer2'));
        // if(viewer2.three.element == document.getElementById('garageViewer2')) return false;
        
        
	};
	window.addEventListener('resize', callback, false);
	return {
		stop() {
			window.removeEventListener('resize', callback);
		}
	};
};