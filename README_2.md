
The link below explain box.position.set()
https://stackoverflow.com/questions/14223249/how-can-i-set-the-position-of-a-mesh-before-i-add-it-to-the-scene-in-three-js

set is defined in the Vector3 class definition. In order to find it you must navigate like so: Mesh > Object3d > Object3d.position > Vector3 > Vector3.set
