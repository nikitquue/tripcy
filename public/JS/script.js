
var body = document.querySelector('body');
var modalAuth =document.querySelector('.modalAuth');
var regForm = document.querySelector('.registrForm');
var authForm = document.querySelector('.authorizationForm');
var modalPay = document.querySelector('.modalPay');
var modalEditExc = document.querySelector('#modalEditExc');
var modalAddExc = document.querySelector('#modalAddExc');
var modalEditGuide = document.querySelector('#modalEditGuide');
var modalAddGuide = document.querySelector('#modalAddGuide');
var modalAddSched = document.querySelector('#modalAddSched');
var modalEditSched = document.querySelector('#modalEditSched');
var modalEditSight = document.querySelector('#modalEditSight');
var modalAddSight = document.querySelector('#modalAddSight');
var modalMarkers =document.querySelector('.modalMarkers');

function ShowModalMarker(){    
    modalMarkers.style.display="flex";
    authForm.style.display='flex';    
    body.style.overflowY ="hidden";    
}
function ShowModalEditExc(){    
  modalEditExc.style.display="flex";
  body.style.overflowY ="hidden";    
}

function ShowModalAddExc(){    
  modalAddExc.style.display="flex";
  body.style.overflowY ="hidden";    
}

function ShowModalEditGuide(){    
  modalEditGuide.style.display="flex";
  body.style.overflowY ="hidden";    
}

function ShowModalAddSight(){    
  modalAddSight.style.display="flex";
  body.style.overflowY ="hidden";    
}

function ShowModalEditSight(){    
  modalEditSight.style.display="flex";
  body.style.overflowY ="hidden";    
}

function ShowModalAddGuide(){    
  modalAddGuide.style.display="flex";
  body.style.overflowY ="hidden";    
}

function ShowModalEditSched(){    
  modalEditSched.style.display="flex";
  body.style.overflowY ="hidden";    
}

function ShowModalAddSched(){    
  modalAddSched.style.display="flex";
  body.style.overflowY ="hidden";    
}

function ShowModalAuth(){    
    modalAuth.style.display="flex";
    authForm.style.display='flex';
    regForm.style.display='none';
    body.style.overflowY ="hidden";    
}
function ShowModalReg(){    
    modalAuth.style.display="flex";
    regForm.style.display='flex';
    authForm.style.display='none';
    body.style.overflowY ="hidden";    
}

window.onclick = function(event) {
    if (event.target == modalAuth) {
        modalAuth.style.display = "none";      
        body.style.overflowY="scroll";
      }  else if( event.target == modalMarkers) {
        modalMarkers.style.display = "none";      
        body.style.overflowY="scroll";
      } else if( event.target == modalPay) {
        modalPay.style.display = "none";      
        body.style.overflowY="scroll";
      } else if( event.target == modalEditExc) {
        modalEditExc.style.display = "none";      
        body.style.overflowY="scroll";
      } else if( event.target == modalAddExc) {
        modalAddExc.style.display = "none";      
        body.style.overflowY="scroll";
      } else if( event.target == modalAddGuide) {
        modalAddGuide.style.display = "none";      
        body.style.overflowY="scroll";
      } else if( event.target == modalEditGuide) {
        modalEditGuide.style.display = "none";      
        body.style.overflowY="scroll";
      } else if( event.target == modalEditSched) {
        modalEditSched.style.display = "none";      
        body.style.overflowY="scroll";
      } else if( event.target == modalAddSched) {
        modalAddSched.style.display = "none";      
        body.style.overflowY="scroll";
      } else if( event.target == modalEditSight) {
        modalEditSight.style.display = "none";      
        body.style.overflowY="scroll";
      } else if( event.target == modalAddSight) {
        modalAddSight.style.display = "none";      
        body.style.overflowY="scroll";
      }
    
}




  //Массивы содержат все картинки из папки, religiousKhImgs - экскурсия, sight1..2..n - достропримечательность (просьба соблюдать архитектуру!)
  var list1 =[
    "./religiousKhImgs/sight1/1.jpg",
    "./religiousKhImgs/sight1/2.jpg"
];
var list2 =[
    "./religiousKhImgs/sight2/1.jpg",
    "./religiousKhImgs/sight2/2.jpg"
];
var list3 =[
    "./religiousKhImgs/sight3/1.jpg",
    "./religiousKhImgs/sight3/2.jpg"
];
var counter = 0;
var counter2 = 0;
var counter3 = 0;
var counter4 = 0;
var ourEl= document.querySelector("#imgSight1");
var ourEl2= document.querySelector("#imgSight2");
var ourEl3= document.querySelector("#imgSight3");
  function SlideShow1(){
    ourEl.src=list1[counter];  
    //ourEl.classList.add('animate__animated', 'animate__fadeInLeft');
    //мейби анимация?
    if(counter< list1.length-1){
    
        counter++;
    } else {
        counter=0;
    }
        
    setTimeout("SlideShow1()", 4000);
    
  }
  function SlideShow2(){
    ourEl2.src=list2[counter2];    
    if(counter2< list2.length-1){
    
        counter2++;
    } else {
        counter2=0;
    }
        
    setTimeout("SlideShow2()", 4000);
    
  }
  function SlideShow3(){
    ourEl3.src=list3[counter3];    
    if(counter3< list3.length-1){
    
        counter3++;
    } else {
        counter3=0;
    }
        
    setTimeout("SlideShow3()", 4000);
    
  }
  function SlideShows(){
      SlideShow1();
      SlideShow2();
      SlideShow3();
  }
  //window.onload = SlideShows;

function ShowCardInfo(){
    let addBlock = document.querySelector('.addCard');
    let aBlock = document.querySelector('.achievemntsBlock');
    let activeTab = document.querySelector('#recTab');
    let unactiveTab = document.querySelector('#achieveTab');
    activeTab.style.background = "#5E53A1";
    unactiveTab.style.background="#493D91";    
    addBlock.style.display="block";
    aBlock.style.display="none";
}
  function ShowAddCard(){
      let addBlock = document.querySelector('.addCard');
      let noCard = document.querySelector('.noCard');
      addBlock.style.display = "block";
      noCard.style.display = "none";
  }
  function ShowAchievementsTab(){
    let addBlock = document.querySelector('.addCard');
      let noCard = document.querySelector('.noCard');
      let aBlock = document.querySelector('.achievemntsBlock');
      let unactiveTab = document.querySelector('#recTab');
      let activeTab = document.querySelector('#achieveTab');
      activeTab.style.background = "#5E53A1";
      unactiveTab.style.background="#493D91";

      addBlock.style.display="none";
      noCard.style.display="none";
      aBlock.style.display="block";
  }
  function ShowExTab(){
    let exBlock = document.querySelector('#exBlock');      
    let guidesBlock = document.querySelector('#guidesBlock');  
    let schedBlock = document.querySelector('#schedBlock');  
    let siBlock = document.querySelector('#siBlock');  
      let fTab = document.querySelector('#guidesTab');
      let sTab = document.querySelector('#scheduleTab');
      let tTab = document.querySelector('#sightsTab');
      let activeTab = document.querySelector('#excursionsTab');
      activeTab.style.background = "#5E53A1";
      fTab.style.background="#493D91";
      sTab.style.background="#493D91";
      tTab.style.background="#493D91";

      guidesBlock.style.display="none";
      schedBlock.style.display="none";
      siBlock.style.display="none";
      exBlock.style.display="block";
  }
  function ShowGuidesTab(){
    let exBlock = document.querySelector('#exBlock');      
    let guidesBlock = document.querySelector('#guidesBlock');  
    let schedBlock = document.querySelector('#schedBlock');  
    let siBlock = document.querySelector('#siBlock');  
      let fTab = document.querySelector('#excursionsTab');
      let sTab = document.querySelector('#scheduleTab');
      let tTab = document.querySelector('#sightsTab');
      let activeTab = document.querySelector('#guidesTab');
      activeTab.style.background = "#5E53A1";
      fTab.style.background="#493D91";
      sTab.style.background="#493D91";
      tTab.style.background="#493D91";

      guidesBlock.style.display="block";
      schedBlock.style.display="none";
      siBlock.style.display="none";
      exBlock.style.display="none";
  }
  function ShowScheduleTab(){
    let exBlock = document.querySelector('#exBlock');      
    let guidesBlock = document.querySelector('#guidesBlock');  
    let schedBlock = document.querySelector('#schedBlock');  
    let siBlock = document.querySelector('#siBlock');  
      let fTab = document.querySelector('#guidesTab');
      let sTab = document.querySelector('#excursionsTab');
      let tTab = document.querySelector('#sightsTab');
      let activeTab = document.querySelector('#scheduleTab');
      activeTab.style.background = "#5E53A1";
      fTab.style.background="#493D91";
      sTab.style.background="#493D91";
      tTab.style.background="#493D91";

      guidesBlock.style.display="none";
      schedBlock.style.display="block";
      siBlock.style.display="none";
      exBlock.style.display="none";
  }

  function ShowSightsTab(){
    let exBlock = document.querySelector('#exBlock');      
    let guidesBlock = document.querySelector('#guidesBlock');  
    let schedBlock = document.querySelector('#schedBlock');  
    let siBlock = document.querySelector('#siBlock');  
      let fTab = document.querySelector('#guidesTab');
      let sTab = document.querySelector('#excursionsTab');
      let tTab = document.querySelector('#scheduleTab');
      let activeTab = document.querySelector('#sightsTab');
      activeTab.style.background = "#5E53A1";
      fTab.style.background="#493D91";
      sTab.style.background="#493D91";
      tTab.style.background="#493D91";

      guidesBlock.style.display="none";
      schedBlock.style.display="none";
      siBlock.style.display="block";
      exBlock.style.display="none";
  }




  function ShowModalPay(){
    modalPay.style.display="flex";    
    body.style.overflowY ="hidden"; 
  }

  function PayNextStep(){
      let firstBlock =document.querySelector('.recordToExc');
      let secondBlock = document.querySelector('.chosePayBlock');
      firstBlock.style.display="none";
      secondBlock.style.display="flex";

  }  

  function ShowCashBlock(){
      let cashBlock = document.querySelector('.cashBlock');
      let cardBlock = document.querySelector('.cardBlock');
      cashBlock.style.display="flex";
      cardBlock.style.display="none";
  }
  function ShowCardBlock(){
    let cashBlock = document.querySelector('.cashBlock');
    let cardBlock = document.querySelector('.cardBlock');
    cardBlock.style.display="flex";
    cashBlock.style.display="none";
}

function ShowSuccessBlock(){
    let chosePayBlock = document.querySelector('.chosePayBlock');    
    let successBlock = document.querySelector('.successRegBlock');
    chosePayBlock.style.display="none";    
    successBlock.style.display="flex";    
}
function CloseModalPay(){
    modalPay.style.display="none";    
    body.style.overflowY ="scroll";
}