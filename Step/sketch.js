//! VARIÁVEIS DO VÍDEO
var video;
var poseNet;
var pose;

//! VARIÁVEIS DA POSE
var posicaoInicialX, posicaoInicialY;
var limiteMaxY, limiteMinY;

//! VARIÁVEL DO BOTÃO DE CALIBRAR
var calibrar;

function setup() {
  createCanvas(640, 480);

  //? CARREGAR WEBCAM
  video = createCapture(VIDEO);
  video.hide();

  //? CARREGAR POSENET
  poseNet = ml5.poseNet(video, { inputResolution: 161 }, modelReady);
  poseNet.on('pose', gotPoses);

  calibrar = createButton("RECALIBRAR");
  calibrar.position(540, 20);
  calibrar.mousePressed(Recalibrar);
}

function draw() {
  image(video, 0, 0);

  fill(255, 0, 0);

  if(pose){
    //* EXIBE A LINHA QUE DEMARCA O LIMITE ENTRE CIMA/BAIXO
    line(0, limiteMaxY, width, limiteMaxY);

    //* EXIBE UM PONTO A PARTIR DO CENTRO DO QUADRIL DO USUÁRIO
    ellipse((pose.leftHip.x+pose.rightHip.x)/2, (pose.leftHip.y+pose.rightHip.y)/2, 8);

    //* BREVE VERIFICAÇÃO DA POSIÇÃO DO QUADRIL PARA DEFINIR SE USUÁRIO SUBIU OU DESCEU
      fill(255);
      textSize(25);
    if( ((pose.leftHip.y+pose.rightHip.y)/2) > limiteMaxY) text('baixo', 550, 60);
      else text('cima', 550, 60);
  }
}

//! COLETA DAS POSES DO USUÁRIO
function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    //console.log(pose);
  }
}

//! VERIFICA SE O MODELO DE VERIFICAÇÃO DAS POSES FUNCIONOU
function modelReady() {
  console.log('model ready');
  Recalibrar();
}

//! FUNÇÃO PARA CALIBRAR A POSIÇÃO DO USUÁRIO SEM A NECESSIDADE DE ATUALIZAR A PÁGINA
function Recalibrar(){
  setTimeout(()=>{
    posicaoInicialX = (pose.leftHip.x+pose.rightHip.x)/2;
    posicaoInicialY = (pose.leftHip.y+pose.rightHip.y)/2;

    limiteMaxY = posicaoInicialY-30;
  }, 5000)
}