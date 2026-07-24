  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{ threshold:0.15 });
  revealEls.forEach(el=>io.observe(el));

  // floating atmosphere: gold dust, tiny molecules, microbes, DNA fragments
  const field = document.getElementById('particles');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dustCount = reduced ? 0 : 20;
  for(let i=0;i<dustCount;i++){
    const p = document.createElement('div');
    p.className='particle';
    const size = 2 + Math.random()*3;
    p.style.width = size+'px';
    p.style.height = size+'px';
    p.style.left = Math.random()*100+'vw';
    p.style.bottom = (-10 - Math.random()*20)+'px';
    p.style.animationDuration = (14 + Math.random()*16)+'s';
    p.style.animationDelay = (Math.random()*16)+'s';
    field.appendChild(p);
  }
  const motifs = [
    '<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="4" cy="8" r="2" fill="none" stroke="#9C5A34" stroke-width="1"/><circle cx="12" cy="8" r="2" fill="none" stroke="#9C5A34" stroke-width="1"/><path d="M6 8H10" stroke="#9C5A34" stroke-width="1"/></svg>',
    '<svg width="14" height="18" viewBox="0 0 14 18"><path d="M3 1 Q9 5 3 9 Q9 13 3 17" fill="none" stroke="#A8792F" stroke-width="1"/><path d="M3 5H8 M3 9H8 M3 13H8" stroke="#A8792F" stroke-width="0.8"/></svg>',
    '<svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7 Q4 2 8 4 Q12 6 10 10 Q8 13 4 11 Q1 9 2 7Z" fill="none" stroke="#8B4A2B" stroke-width="1"/></svg>'
  ];
  const motifCount = reduced ? 0 : 10;
  for(let i=0;i<motifCount;i++){
    const p = document.createElement('div');
    p.style.position='absolute';
    p.style.opacity='0';
    p.style.left = Math.random()*100+'vw';
    p.style.bottom = (-10 - Math.random()*20)+'px';
    p.style.animation = 'drift linear infinite';
    p.style.animationDuration = (20 + Math.random()*18)+'s';
    p.style.animationDelay = (Math.random()*18)+'s';
    p.innerHTML = motifs[i % motifs.length];
    field.appendChild(p);
  }

  // closing reflection: gentle gold dust + tiny stars, confined to the frame
  const reflectionField = document.getElementById('reflectionParticles');
  if(reflectionField){
    const dustN = reduced ? 0 : 14;
    for(let i=0;i<dustN;i++){
      const d = document.createElement('div');
      d.className = 'r-dust';
      const size = 2 + Math.random()*2.5;
      d.style.width = size+'px';
      d.style.height = size+'px';
      d.style.left = Math.random()*100+'%';
      d.style.bottom = (Math.random()*60)+'px';
      d.style.animationDuration = (10 + Math.random()*10)+'s';
      d.style.animationDelay = (Math.random()*10)+'s';
      reflectionField.appendChild(d);
    }
    const sparkN = reduced ? 0 : 10;
    for(let i=0;i<sparkN;i++){
      const s = document.createElement('div');
      s.className = 'r-spark';
      s.style.left = Math.random()*100+'%';
      s.style.top = Math.random()*100+'%';
      s.style.animationDuration = (2.5 + Math.random()*3)+'s';
      s.style.animationDelay = (Math.random()*4)+'s';
      reflectionField.appendChild(s);
    }
  }
