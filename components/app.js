import {services, packages} from './data.js';
const serviceGrid = document.querySelector('#service-grid');
for (const [number, title, description, icon] of services) {
 const card = document.createElement('article');
 card.className='service-card';
 const numberEl=document.createElement('span'); numberEl.className='card-number'; numberEl.textContent=number;
 const heading=document.createElement('h3'); heading.textContent=title;
 const paragraph=document.createElement('p'); paragraph.textContent=description;
 const link=document.createElement('a'); const quotedService=Number(number)>3;link.href=quotedService?'#contact':'#pricing'; link.textContent=quotedService?`Discuss this service ${icon}`:`Explore pricing ${icon}`;
 const iconEl=document.createElement('span');iconEl.className='service-icon';iconEl.setAttribute('aria-hidden','true');iconEl.textContent=['⌘','▣','↗','◈','◎','✳'][serviceGrid.children.length] || '✳';card.append(numberEl,iconEl,heading,paragraph,link); serviceGrid.append(card);
}
function renderPrices(category) {
 const grid=document.querySelector('#price-grid'); grid.replaceChildren();
 for(const item of packages[category]) {
  const card=document.createElement('article'); card.className='price-card';
  const heading=document.createElement('h3'); heading.textContent=item.name;
  const label=document.createElement('p'); label.className='muted'; label.textContent=item.label;
  const price=document.createElement('p'); price.className='price'; price.textContent=item.price;
  const currency=document.createElement('small'); currency.textContent=' SAR'; price.append(currency);
  const list=document.createElement('ul'); for(const feature of item.features){const li=document.createElement('li');li.textContent=feature;list.append(li);}
  const link=document.createElement('a');link.className='button';link.textContent='Discuss this package ↗';link.href=`https://wa.me/966538113796?text=${encodeURIComponent(`Hello Mad Labs, I'm interested in the ${item.name} package.`)}`;
  card.append(heading,label,price,list,link);grid.append(card);
 }
}
for(const button of document.querySelectorAll('[data-category]')) button.addEventListener('click',()=>{
 for(const sibling of document.querySelectorAll('[data-category]')) sibling.setAttribute('aria-pressed',String(sibling===button));
 renderPrices(button.dataset.category);
});
document.querySelector('#year').textContent=new Date().getFullYear();
renderPrices('digital');

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
