document.querySelector('#year').textContent=new Date().getFullYear();
const categoryButtons=document.querySelectorAll('[data-category]');
function showCategory(category){
 for(const button of categoryButtons)button.setAttribute('aria-pressed',String(button.dataset.category===category));
 for(const panel of document.querySelectorAll('.price-panel'))panel.hidden=panel.id!==`prices-${category}`;
 window.ScrollTrigger?.refresh();
}
for(const button of categoryButtons)button.addEventListener('click',()=>showCategory(button.dataset.category));
showCategory('digital');document.querySelector('.tabs').hidden=false;

const header=document.querySelector('header');
function updateHeader(){header.classList.toggle('scrolled',window.scrollY>20);document.querySelector('.back-top').classList.toggle('visible',window.scrollY>450);}
window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();

// Mobile navigation remains usable without JavaScript (all links are visible).
const navigation=document.querySelector('#main-navigation');
const menuToggle=document.querySelector('.menu-toggle');
const compactNavigation=window.matchMedia('(max-width: 760px)');
function setMenu(open){
 menuToggle.setAttribute('aria-expanded',String(open));
 navigation.hidden=compactNavigation.matches && !open;
 menuToggle.querySelector('span').textContent=open?'×':'☰';
}
function syncNavigation(){menuToggle.hidden=!compactNavigation.matches;setMenu(false);}
menuToggle.addEventListener('click',()=>setMenu(menuToggle.getAttribute('aria-expanded')!=='true'));
navigation.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false);});
document.addEventListener('keydown',event=>{if(event.key==='Escape' && compactNavigation.matches && !navigation.hidden){setMenu(false);menuToggle.focus();}});
document.addEventListener('click',event=>{if(compactNavigation.matches && !header.contains(event.target))setMenu(false);});
compactNavigation.addEventListener('change',syncNavigation);syncNavigation();

import {initMotion} from './motion.js';
initMotion();

import {initDepth} from './depth.js';
initDepth();
