let rotation=0;
let userName="", userPhone="";

const numberPhotos = {
  "7780223996":"vip1.jpg",
  "8501851090":"vip2.jpg",
  "9494707396":"vip3.jpg",
  "8125349688":"vip4.jpg",
  "6304078248":"vip5.jpg"
};

const results=["wish","photo","funny","dream","question"];

const funnyContent=[
  {q:"Mee friend tho emi funny jarigindi?", r:"🤣 Full comedy moment!"},
  {q:"Funny joke cheppandi", r:"😜 Crazy one!"}
];

const dreamContent=[
  {q:"2025 lo mee biggest dream enti?", r:"🌟 Perfect dream awaits!"},
  {q:"Favorite travel destination?", r:"✈️ Amazing choice!"}
];

const questionContent=[
  {q:"Evarini ekkuva miss avutunnaru?", r:"🤭 Sweet reply!"},
  {q:"Mee New Year resolution enti?", r:"💪 Strong determination!"}
];

function submitUser(){
  userName=document.getElementById("name").value.trim();
  userPhone=document.getElementById("phone").value.trim();
  if(userName===""){alert("Name enter cheyyandi"); return;}
  if(userPhone.length<10){alert("Valid phone number enter cheyyandi"); return;}
  document.getElementById("userForm").style.display="none";
  document.getElementById("interest").style.display="block";
}

function showWheel(interested){
  document.getElementById("interest").style.display="none";
  if(interested){
    document.getElementById("wheelBox").style.display="block";
  } else {
    document.getElementById("content").innerHTML="<p>Ok, maybe next time! 😊</p>";
  }
}

function spin(){
  const wheel=document.getElementById("wheel");
  const anglePerSegment = 72;
  let resultIndex=Math.floor(Math.random()*5);
  rotation += 360*4 + resultIndex*anglePerSegment + anglePerSegment/2;
  wheel.style.transform = `rotate(${rotation}deg)`;
  setTimeout(()=>showResult(resultIndex,userName,userPhone),4000);
}

// ================= RESULT =================
function showResult(i,name,phone){
  const c=document.getElementById("content");
  c.innerHTML="";
  const label=document.getElementById("result-label");

  let labelText="";
  if(results[i]=="wish") labelText="💖 Wish";
  else if(results[i]=="photo") labelText=numberPhotos[phone]?"📸 Photo":"📸 No Photo";
  else if(results[i]=="funny") labelText="😂 Funny";
  else if(results[i]=="dream") labelText="🌍 Dream";
  else labelText="🤪 Q";

  label.innerHTML=labelText;
  label.style.display="block";

  if(results[i]=="wish"){
    c.innerHTML=`<div class="frame">
      <h3>💖 Wish</h3>
      <p>Hi ${name} (${phone})</p>
      <p>May all your wishes come true ✨</p>
    </div>`;
  } 
  else if(results[i]=="photo"){
    if(numberPhotos[phone]){
      c.innerHTML=`<div class="frame">
        <img src="${numberPhotos[phone]}"
          onerror="this.onerror=null;this.src='https://via.placeholder.com/220x150?text=No+Image';">
        <p>Special memory for ${name} 📸</p>
        <p>📱 ${phone}</p>
      </div>`;
    } else {
      c.innerHTML=`<div class="frame">
        <p>Hi ${name}, no photo found 😄</p>
        <p>📱 ${phone}</p>
      </div>`;
    }
  } 
  else if(results[i]=="funny"){
    const idx=Math.floor(Math.random()*funnyContent.length);
    c.innerHTML=`<div class="frame">
      <h3>😂 Funny</h3>
      <p>${funnyContent[idx].q}</p>
      <input id="ans" placeholder="Type your answer"/>
      <button onclick="nvReply('${funnyContent[idx].r}')">Submit</button>
    </div>`;
  } 
    // ===== ALWAYS SHOW PHOTO AT LAST (EVEN IF NOT PHOTO SPIN) =====
  if(numberPhotos[phone]){
    c.innerHTML += `
      <div class="frame">
        <h3>📸 Special Photo</h3>
        <img src="${numberPhotos[phone]}"
          onerror="this.onerror=null;this.src='https://via.placeholder.com/220x150?text=No+Image';">
        <p>Best wishes for you ${name} 🎆✨</p>
      </div>`;
  } else {
    c.innerHTML += `
      <div class="frame">
        <p>📸 Photo not available</p>
        <p>But wishes are always with you 💖</p>
      </div>`;
  }

  showSpinAgain();
}

// ================= NV REPLY =================
function nvReply(reply){
  document.getElementById("content").innerHTML=
  `<div class="frame"><h3>${reply}</h3></div>`;
}

// ================= CONFETTI =================
function showConfetti(){
  const c=document.getElementById("content");
  for(let i=0;i<15;i++){
    const conf=document.createElement("div");
    conf.className="confetti";
    conf.innerHTML="🎉";
    conf.style.left=Math.random()*200+"px";
    conf.style.top=Math.random()*40+"px";
    c.appendChild(conf);
    setTimeout(()=>conf.remove(),2000);
  }
}

// ================= BONUS =================
function bonusInteraction(type){
  const c=document.getElementById("content");
  if(type=="wish") c.innerHTML+="<p>💡 Bonus: Think of one wish you really want!</p>";
  else if(type=="funny") c.innerHTML+="<p>🤣 Bonus Joke: Tomato red enduku ayyindi? Salad dressing chusindi!</p>";
  else if(type=="dream") c.innerHTML+="<p>🌟 Bonus: Today oka small step tiskondi.</p>";
  else if(type=="photo") c.innerHTML+="<p>📸 Bonus: Smile and celebrate!</p>";
  else c.innerHTML+="<p>🤪 Bonus: Share this question with a friend!</p>";
}

// ================= REAL SHARE =================
function showShareButton(){
  const c=document.getElementById("content");
  const btn=document.createElement("button");
  btn.innerText="Share Result 📲";

  btn.onclick=async ()=>{
    const text=`🎆 New Year Spin Result 🎆
Name: ${userName}
Phone: ${userPhone}
Try this fun spin 🎡✨`;

    if(navigator.share){
      try{
        await navigator.share({
          title:"New Year Spin Wishes",
          text:text,
          url:window.location.href
        });
      }catch(e){}
    }else{
      alert("Sharing not supported on this device 😔");
    }
  };
  c.appendChild(btn);
}

// ================= SPIN AGAIN =================
function showSpinAgain(){
  const c=document.getElementById("content");
  const btn=document.createElement("button");
  btn.innerText="Spin Again 🔄";
  btn.style.marginLeft="10px";
  btn.onclick=resetWheel;
  c.appendChild(btn);
}

function resetWheel(){
  document.getElementById("content").innerHTML="";
  document.getElementById("result-label").style.display="none";
  document.getElementById("wheelBox").style.display="block";
}
