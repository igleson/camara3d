#pragma strict

public var file : TextAsset;
public var sha: Shader;

var ray : Ray;
var hit : RaycastHit;
var showingHint = false;
var hint = "";

var search = "";
var fileData : String;
var lines : String[];
var lastSearch: GameObject;
var lastColor: Color;

function Start () {
	fileData = file.text;
	lines = fileData.Split("\n"[0]);

	for( l in lines ) {
		if(l == "") {
			break;
		}
	
		var lineData : String[] = (l.Trim()).Split(","[0]);
		var x : float;
	    float.TryParse(lineData[1], x);
		var y : float;
	    float.TryParse(lineData[2], y);
	    var z : float;
	    float.TryParse(lineData[3], z);

	    var sphere : GameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
		sphere.transform.position = Vector3(x*10, y*10, z*10);
		sphere.AddComponent("SphereCollider");
				
		if (lineData[4] == '"Jean Wyllys"') {
			sphere.transform.localScale = Vector3(0.8, 0.8, 0.8);
		} else if (lineData[4] == '"Luiz Couto"') {
			sphere.transform.localScale = Vector3(0.8, 0.8, 0.8);
		} else if (lineData[4] == '"Leonardo Picciani"') {
			sphere.transform.localScale = Vector3(0.8, 0.8, 0.8);
		} else if (lineData[4] == '"Carlos Sampaio"') {
			sphere.transform.localScale = Vector3(0.8, 0.8, 0.8);
		} else {
			sphere.transform.localScale = Vector3(0.3, 0.3, 0.3);
		}
		var partido = lineData[5];
		
		sphere.name = lineData[4] + " - " + partido;
		
		
		if (partido == 'pt'){
			sphere.renderer.material.color = Color.red;
		}
		else if (partido == 'pmdb'){
			sphere.renderer.material.color = Color.green;
		} else if (partido == 'psdb'){
			sphere.renderer.material.color = Color.blue;
		} else if (partido == 'psol') {
			sphere.renderer.material.color = Color.yellow;
		} else {
			var c = Color.white;
			sphere.renderer.material.shader = sha;
			sphere.transform.localScale = Vector3(0.10, 0.15, 0.15);
		}
		if (lineData[4] == 'Jair Bolsonaro') {
			sphere.transform.localScale = Vector3(0.8, 0.8, 0.8);
		}
		lastColor = sphere.renderer.material.color;
		lastSearch = sphere;
	}
}

function Update () {

	//handles movement
	var forward = Camera.allCameras[0].transform.forward;
	var move = Vector3(forward.x/forward.magnitude/15, forward.y/forward.magnitude/15, forward.z/forward.magnitude/15);
	var camera = GameObject.Find("main_camera");

	var atual = camera.transform.position;
	if (Input.GetKey (KeyCode.UpArrow)){
		camera.transform.position = Vector3(atual.x + move.x, atual.y + move.y, atual.z + move.z);
	}
	if (Input.GetKey (KeyCode.DownArrow)){
		camera.transform.position = Vector3(atual.x - move.x, atual.y - move.y, atual.z - move.z);
	}
	if (Input.GetKey(KeyCode.LeftArrow)) {
		var m = Quaternion.Euler(0, -90, 0) * move;
		camera.transform.position = Vector3(atual.x + m.x, atual.y + m.y, atual.z + m.z);
	}
	if (Input.GetKey(KeyCode.RightArrow)) {
		var m2 = Quaternion.Euler(0, 90, 0) * move;
		camera.transform.position = Vector3(atual.x + m2.x, atual.y + m2.y, atual.z + m2.z);
	}
	if(Input.GetKey(KeyCode.Space)) {
		camera.transform.position = Vector3(0, 2.02, -19.75);
		camera.transform.rotation = Quaternion.Euler(285, 181, 180);
	}
	
	//handles mouse hover on a object
	
	ray = Camera.allCameras[1].ScreenPointToRay(Input.mousePosition);
	
	if(Physics.Raycast(ray, hit)) {
		showingHint = true;
    	hint = hit.collider.name;
    } else {
   		showingHint = false;
    }
}


function OnGUI () {
	
	//handles hinst showing
	if(showingHint){
		GUI.Label (Rect (Input.mousePosition.x+15, Screen.height-Input.mousePosition.y, 100, 100), hint);
	}
	var cameraPos = Camera.allCameras[1].transform.position;
	
	GUI.Label (Rect (cameraPos.x, cameraPos.y, 100, 25), "Buscar: ");
	
	search = GUI.TextField(Rect (cameraPos.x+50, cameraPos.y, 300, 25), search, 100).ToLower();
	
	if (Event.current.keyCode == KeyCode.Return && search !== "") {
		for( l in lines ) {
			var lineData : String[] = (l.Trim()).Split(","[0]);
			if(lineData.Length < 4 ){
				break;
			}

			if(search.Length <= lineData[4].Length && lineData[4].ToLower().Substring(0, search.length).Equals(search)){//if(startWith)
				var camera = GameObject.Find("main_camera");
				var obj = GameObject.Find(lineData[4]);
				var pos = obj.transform.position;
				camera.transform.position = Vector3(pos.x-0.7, pos.y-0.7, pos.z-0.7);

				camera.transform.LookAt(obj.transform);
				if(lastSearch !== null){
					lastSearch.renderer.material.color = lastColor;
				}
				lastColor = obj.renderer.material.color;
				obj.renderer.material.color = Color.magenta;
				lastSearch = obj;
				break;
			}
		}
	}
}