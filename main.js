status="";
objects = [];

function preload(){
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);   
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelloaded(){
    console.log("madelloaded");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }

}

function draw(){
    image(video, 0, 0, 380, 380);
     if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResults);
        for(i = 0; i<objects.length; i++){
            if(objectDetector < 0){
                document.getElementById("number_objects").innerHTML = "Person Not Found";
                play(mum.mp3);
            }
            else{
                document.getElementById("number_objects").innerHTML = "Person Found";
                stop(mum.mp3);
            }
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_objects").innerHTML = "Number of Objects are :"+objects.length;
            percent = floor(objects[i].confidence * 100);
            fill(r, g, b);
            text(objects[i].label+ " " + percent+ "%", objects[i].x , objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
                }
     }

}
