// script.js

let selectedEnvelope = null;

let envelopes = document.querySelectorAll(".envelope");
envelopes.forEach(function(env, index){
  env.addEventListener("click", function(){
    envelopes.forEach(e => e.classList.remove("selected"));
    env.classList.add("selected");
    selectedEnvelope = index + 1; // which envelope is clicked
    console.log("Selected Envelope: " + selectedEnvelope);
    
    // Save to localStorage for next page
    localStorage.setItem("selectedEnvelope", selectedEnvelope);
  });
});

let nextBtn = document.querySelector(".nextBtn");
nextBtn.addEventListener("click", function(){
  if(selectedEnvelope !== null){
    window.location.href = "write.html"; // go to letter writing page
  } else {
    alert("Please select an envelope first!");
  }
});

// envelopes.js or script.js
document.addEventListener("DOMContentLoaded", function() {
  const nextBtn = document.querySelector(".nextBtn");

  nextBtn.addEventListener("click", function() {
    const selectedEnvelope = localStorage.getItem("selectedEnvelope");
    if (!selectedEnvelope) {
      alert("Please select an envelope first!");
      return;
    }
    window.location.href = "write.html";
  });
});

function sendLetter(){

document.getElementById("resultSection").style.display="block";

let letter = document.getElementById("letterPaper");
let envelope = document.getElementById("envelopeImg");


}