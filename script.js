const PHONE='16615268966';
const choices=document.querySelectorAll('#choices button');
const guideText=document.getElementById('guideText');
const guideSms=document.getElementById('guideSms');
const guidance={
"Won't start":"Vehicle will not start — request mobile diagnostics / starting-system troubleshooting.",
"Warning light / running rough":"Warning light or rough running — request vehicle diagnostics to identify the issue.",
"Brake issue":"Brake concern — request brake-system inspection/service.",
"Suspension / steering issue":"Suspension or steering concern — request suspension/handling inspection.",
"Engine issue":"Engine concern — request engine diagnostics; motor rebuild work is available when appropriate.",
"Transmission issue":"Transmission concern — request drivetrain/transmission inspection; transmission rebuild work is available when appropriate.",
"Something else":"Other mechanical concern — describe the symptoms in the service request so Edgar can review it."
};
choices.forEach(btn=>btn.addEventListener('click',()=>{choices.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const text=guidance[btn.dataset.choice];guideText.textContent=text;guideSms.classList.remove('disabled');guideSms.href=`sms:+${PHONE}?&body=${encodeURIComponent("Hi Edgar, I used the service guide on your website. "+text+" My vehicle is: [YEAR] [MAKE] [MODEL]. My area is: [CITY/AREA].")}`}));
const form=document.getElementById('serviceForm');
const emailBtn=document.getElementById('emailBtn');
function buildMessage(data){return `Hi Edgar, I'd like to request mobile service.\n\nVehicle: ${data.year} ${data.make} ${data.model}\nArea: ${data.area}\nService: ${data.service}\nDetails: ${data.details||'Not provided'}\n\nPlease let me know availability and next steps.`}
form.addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(form).entries());const msg=buildMessage(data);emailBtn.href=`mailto:?subject=${encodeURIComponent("Edgar's Garage Service Request - "+data.year+" "+data.make+" "+data.model)}&body=${encodeURIComponent(msg)}`;window.location.href=`sms:+${PHONE}?&body=${encodeURIComponent(msg)}`});
form.addEventListener('input',()=>{const data=Object.fromEntries(new FormData(form).entries());if(data.year||data.make||data.model){const msg=buildMessage(data);emailBtn.href=`mailto:?subject=${encodeURIComponent("Edgar's Garage Service Request")}&body=${encodeURIComponent(msg)}`}});
