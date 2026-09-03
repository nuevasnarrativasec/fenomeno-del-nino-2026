
      (function(){
        var sec=document.getElementById('galeria'); if(!sec) return;
        var stage=sec.querySelector('.gal-stage');
        var slides=[].slice.call(sec.querySelectorAll('.gal-slide'));
        var N=slides.length; if(!N) return;
        var domImgs=slides.map(function(s){ return s.querySelector('img'); });
        // Imágenes dedicadas y precargadas para el canvas (no dependen de loading=lazy)
        var imgs=domImgs.map(function(im){ var x=new Image(); if(im){ x.src=im.getAttribute('src'); } return x; });
        // Set MÓVIL (fade simple con fotos de img/galeria)
        var slidesM=[].slice.call(sec.querySelectorAll('.gal-slide-m'));
        var mode='';

        var canvas=document.createElement('canvas'); canvas.className='gal-canvas';
        stage.appendChild(canvas);
        var ctx=canvas.getContext('2d');

        var mqDesktop=window.matchMedia('(min-width:721px)');
        var mqReduce =window.matchMedia('(prefers-reduced-motion:reduce)');
        var glitch=false, W=0, H=0, DPR=1;

        function resize(){
          if(!glitch) return;
          DPR=Math.min(2, window.devicePixelRatio||1);
          W=stage.clientWidth; H=stage.clientHeight;
          canvas.width=Math.round(W*DPR); canvas.height=Math.round(H*DPR);
          canvas.style.width=W+'px'; canvas.style.height=H+'px';
          ctx.setTransform(DPR,0,0,DPR,0,0);
        }
        function computeMode(){
          if(mqReduce.matches) return 'static';       // reduced-motion: fotos apiladas
          return mqDesktop.matches ? 'glitch' : 'fade'; // desktop=glitch, móvil=fade simple
        }
        function updateMode(){
          mode = computeMode();
          glitch = (mode==='glitch');
          stage.classList.toggle('glitch-on', glitch);
          sec.setAttribute('data-gmode', mode);
          if(glitch) resize();
          loop();
        }

        // Copias tintadas (canal rojo / cian) para la aberración cromática. Cacheadas.
        var tintCache={};
        function tinted(idx, mode){
          var key=idx+mode, c=tintCache[key]; if(c) return c;
          var im=imgs[idx]; if(!im || !im.naturalWidth) return null;
          var oc=document.createElement('canvas'); oc.width=im.naturalWidth; oc.height=im.naturalHeight;
          var o=oc.getContext('2d'); o.drawImage(im,0,0);
          o.globalCompositeOperation='multiply';
          o.fillStyle = (mode==='r') ? '#ff0000' : '#00ffff';
          o.fillRect(0,0,oc.width,oc.height);
          tintCache[key]=oc; return oc;
        }

        function containRect(im){
          var iw=(im&&im.naturalWidth)||16, ih=(im&&im.naturalHeight)||9;
          var small=W<600;
          var padX=small?10:24, padTop=small?10:14, padBot=small?40:52;
          var availW=Math.min(W-padX*2, 1120), availH=H-padTop-padBot;
          var scale=Math.min(availW/iw, availH/ih);
          var dw=iw*scale, dh=ih*scale;
          return { dx:(W-dw)/2, dy:padTop+(availH-dh)/2, dw:dw, dh:dh };
        }
        function progress(){
          var r=sec.getBoundingClientRect();
          var total=sec.offsetHeight-window.innerHeight;
          return total>0 ? Math.min(1,Math.max(0,(-r.top)/total)) : 0;
        }

        var seed=1, lastSeedT=0;
        function rnd(n){ var x=Math.sin(seed*12.9898 + n*78.233)*43758.5453; return x-Math.floor(x); }

        function drawGlitch(i,f,g){
          if(g<0.02) return;
          var cur=imgs[i], nxt=imgs[i+1];
          var rc=containRect(cur), rn=containRect(nxt);
          // 1) desplazamiento de bandas horizontales
          var bands=Math.floor(3+g*10), y=0;
          for(var b=0;b<bands;b++){
            var bh=(H/bands)*(0.5+rnd(b)*1.2); if(y+bh>H) bh=H-y;
            var useNext = rnd(b+100) < (f*0.7+0.15);
            var im=useNext?nxt:cur, r=useNext?rn:rc;
            var dx=(rnd(b+300)-0.5)*g*W*0.05;
            if(rnd(b+200)>0.90) dx += (rnd(b+7)-0.5)*W*0.11*g;
            ctx.save(); ctx.beginPath(); ctx.rect(0,y,W,bh+0.6); ctx.clip();
            if(im&&im.naturalWidth) ctx.drawImage(im, r.dx+dx, r.dy, r.dw, r.dh);
            ctx.restore();
            y+=bh; if(y>=H) break;
          }
          // 2) aberración cromática RGB
          var ca=g*W*0.006;
          if(ca>0.5){
            var domIdx=(f<0.5)?i:i+1, dr=(f<0.5)?rc:rn;
            var rC=tinted(domIdx,'r'), cC=tinted(domIdx,'c');
            if(rC&&cC){
              ctx.globalCompositeOperation='lighter'; ctx.globalAlpha=0.38*g;
              ctx.drawImage(rC, dr.dx+ca, dr.dy, dr.dw, dr.dh);
              ctx.drawImage(cC, dr.dx-ca, dr.dy, dr.dw, dr.dh);
              ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over';
            }
          }
          // 3) scanlines / ruido
          var lines=Math.floor(g*4);
          for(var l=0;l<lines;l++){
            var ly=rnd(l+400)*H, lh=1+rnd(l+500)*2;
            ctx.fillStyle = (rnd(l+600)>0.6) ? 'rgba(60,180,165,'+(0.10+0.2*g)+')'
                                             : 'rgba(0,0,0,'+(0.14+0.22*g)+')';
            ctx.fillRect(0,ly,W,lh);
          }
          // 4) flash ocasional (muy esporádico)
          if(rnd(999)>0.965){ ctx.fillStyle='rgba(255,255,255,'+(0.03+0.07*g)+')'; ctx.fillRect(0,0,W,H); }
        }

        var raf=null;
        function draw(t){
          raf=null;
          // MÓVIL: fade simple (crossfade continuo por scroll del set .gal-slide-m). Sin rAF continuo.
          if(mode==='fade'){
            var NM=slidesM.length;
            if(NM){
              var pm=progress()*(NM-1);
              for(var j=0;j<NM;j++){ slidesM[j].style.opacity=(1-Math.min(1,Math.abs(pm-j))).toFixed(3); }
            }
            return;
          }
          if(mode!=='glitch') return;         // static: lo resuelve el CSS
          var prog=progress(), pos=prog*(N-1);
          var i=Math.min(N-1, Math.floor(pos)), f=pos-i;
          // La transición (crossfade + glitch) ocurre SOLO en el tramo final de cada segmento,
          // para dejar ver la foto limpia la mayor parte del scroll y que el glitch sea rápido.
          var T=0.34;                              // ancho del tramo de transición (fracción del segmento)
          var tf = (f<=(1-T)) ? 0 : (f-(1-T))/T;   // 0..1 dentro de la transición
          // Créditos: se mantiene el de la foto actual y solo se cruza rápido en la transición
          // (evita que se vean dos créditos solapados a la vez).
          for(var k=0;k<N;k++) slides[k].style.opacity='0';
          if(tf<0.5 || i+1>=N) slides[i].style.opacity='1';   // cambio seco en mitad del glitch
          else slides[i+1].style.opacity='1';                  // (queda enmascarado por el efecto)
          var cur=imgs[i];
          if(!cur || !cur.naturalWidth){ raf=requestAnimationFrame(draw); return; } // aún cargando: conserva el frame previo
          ctx.clearRect(0,0,W,H);
          var rc=containRect(cur); ctx.drawImage(cur,rc.dx,rc.dy,rc.dw,rc.dh);
          var hasNext = tf>0.0001 && i+1<N && imgs[i+1] && imgs[i+1].naturalWidth;
          if(hasNext){
            var nxt=imgs[i+1], rn=containRect(nxt);
            ctx.globalAlpha=tf; ctx.drawImage(nxt,rn.dx,rn.dy,rn.dw,rn.dh); ctx.globalAlpha=1;
            if(t-lastSeedT>55){ seed=Math.random()*1e9; lastSeedT=t; }
            drawGlitch(i,tf,Math.sin(Math.PI*tf)*0.8);
          }
          raf=requestAnimationFrame(draw);   // sigue animando mientras la sección esté visible
        }
        function loop(){ if(!raf) raf=requestAnimationFrame(draw); }

        var io=new IntersectionObserver(function(e){
          if(e[0].isIntersecting) loop();
          else if(raf){ cancelAnimationFrame(raf); raf=null; }
        }, {threshold:0});
        io.observe(sec);

        window.addEventListener('scroll', loop, {passive:true});
        window.addEventListener('resize', function(){ resize(); loop(); });
        if(mqDesktop.addEventListener){ mqDesktop.addEventListener('change',updateMode); mqReduce.addEventListener('change',updateMode); }
        else if(mqDesktop.addListener){ mqDesktop.addListener(updateMode); mqReduce.addListener(updateMode); }
        imgs.forEach(function(im){ if(im) im.addEventListener('load', loop); });

        updateMode();
      })();
      