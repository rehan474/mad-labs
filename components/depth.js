// Pointer depth is a progressive enhancement; touch and reduced-motion stay static.
export function initDepth(){
 const preference=window.matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)');
 let cleanup=()=>{};
 function sync(){
  cleanup();if(!preference.matches)return;
  const disposers=[];
  for(const frame of document.querySelectorAll('.tilt-frame')){
   const card=frame.querySelector('.depth-card');let pending=0;
   const move=event=>{
    if(event.pointerType==='touch')return;
    const rect=frame.getBoundingClientRect();
    const x=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));
    const y=Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height));
    cancelAnimationFrame(pending);pending=requestAnimationFrame(()=>{
     card.style.setProperty('--tilt-x',`${(0.5-y)*8}deg`);card.style.setProperty('--tilt-y',`${(x-0.5)*10}deg`);
     card.style.setProperty('--light-x',`${x*100}%`);card.style.setProperty('--light-y',`${y*100}%`);frame.classList.add('depth-active');
    });
   };
   const reset=()=>{cancelAnimationFrame(pending);frame.classList.remove('depth-active');for(const name of ['--tilt-x','--tilt-y','--light-x','--light-y'])card.style.removeProperty(name);};
   frame.addEventListener('pointermove',move,{passive:true});frame.addEventListener('pointerleave',reset);frame.addEventListener('pointercancel',reset);
   disposers.push(()=>{frame.removeEventListener('pointermove',move);frame.removeEventListener('pointerleave',reset);frame.removeEventListener('pointercancel',reset);reset();});
  }
  cleanup=()=>{disposers.forEach(dispose=>dispose());cleanup=()=>{};};
 }
 preference.addEventListener('change',sync);sync();
}
