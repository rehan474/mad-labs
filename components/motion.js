// Adapted from Creovibe Home 1. Libraries are from the user-supplied package.
export function initMotion(){
 const ticker=document.querySelector('.ticker');
 const text=ticker.textContent;const track=document.createElement('div');track.className='ticker-track';
 for(let i=0;i<2;i++){const span=document.createElement('span');span.textContent=text;track.append(span);}ticker.replaceChildren(track);
 function start(){
  const {gsap,ScrollTrigger,ScrollSmoother}=window;
  if(!gsap || !ScrollTrigger)return;
  gsap.registerPlugin(ScrollTrigger);
  if(ScrollSmoother)gsap.registerPlugin(ScrollSmoother);
  const media=gsap.matchMedia();
  media.add({motion:'(prefers-reduced-motion: no-preference)',desktop:'(min-width: 1101px) and (hover: hover) and (pointer: fine)'},context=>{
   if(!context.conditions.motion)return;
   let smoother;
   if(context.conditions.desktop && ScrollSmoother){
    document.documentElement.style.scrollBehavior='auto';
    smoother=ScrollSmoother.create({wrapper:'#smooth-wrapper',content:'#smooth-content',smooth:1.35,effects:true,smoothTouch:0,ignoreMobileResize:true});
   }
   for(const heading of document.querySelectorAll('.words-in')){
    const original=heading.textContent;
    heading.setAttribute('aria-label',original);
    const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);const nodes=[];
    if(!heading.querySelector('.word'))while(walker.nextNode())nodes.push(walker.currentNode);
    for(const node of nodes){
     const fragment=document.createDocumentFragment();
     for(const part of node.textContent.split(/(\s+)/)){
      if(!part.trim()){fragment.append(document.createTextNode(part));continue;}
      const word=document.createElement('span');word.className='word';word.textContent=part;word.setAttribute('aria-hidden','true');fragment.append(word);
     }node.replaceWith(fragment);
    }
    gsap.from(heading.querySelectorAll('.word'),{duration:.4,delay:.3,opacity:0,rotationX:10,x:50,transformOrigin:'top center -50',stagger:.1,scrollTrigger:{trigger:heading,start:'top 90%',once:true}});
   }
   for(const element of document.querySelectorAll('.section-heading,.service-card,.price-card,.process article,.hero-button,.hero-bottom,.faq details,.contact h2')){
    gsap.from(element,{opacity:0,y:30,duration:.4,delay:.15,ease:'power2.out',scrollTrigger:{trigger:element,start:'top 90%',once:true}});
   }
   for(const container of document.querySelectorAll('.image-reveal')){
    const timeline=gsap.timeline({scrollTrigger:{trigger:container,start:'top 85%',once:true}});
    timeline.from(container,{clipPath:'inset(0 100% 0 0)',duration:1.5,ease:'power2.out'}).from(container.querySelector('img'),{scale:1.3,xPercent:12,duration:1.5,ease:'power2.out'},0);
   }
   for(const title of document.querySelectorAll('.section h2')){
    gsap.fromTo(title,{color:'#ff6b00'},{color:'#f6f5f1',ease:'none',scrollTrigger:{trigger:title,start:'top 80%',end:'top 40%',scrub:true}});
   }
   const onAnchor=event=>{
    const link=event.target.closest('a[href^="#"]');if(!link || !smoother)return;
    const id=link.getAttribute('href');const target=id.length>1?document.getElementById(id.slice(1)):null;
    if(!target)return;
    event.preventDefault();
    const offset=document.querySelector('header').getBoundingClientRect().height+20;
    smoother.scrollTo(Math.max(0,smoother.offset(target,'top top')-offset),true);
    history.pushState(null,'',id);
    const original=target.getAttribute('tabindex');target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
    target.addEventListener('blur',()=>{if(original===null)target.removeAttribute('tabindex');else target.setAttribute('tabindex',original);},{once:true});
   };
   document.addEventListener('click',onAnchor);
   if(location.hash && smoother){const target=document.getElementById(location.hash.slice(1));if(target)smoother.scrollTo(Math.max(0,smoother.offset(target,'top top')-120),false);}
   ScrollTrigger.refresh();
   return()=>{document.removeEventListener('click',onAnchor);smoother?.kill();document.documentElement.style.removeProperty('scroll-behavior');};
  });
 }
 if(document.readyState==='complete')start();else window.addEventListener('load',start,{once:true});
}
