/* ============================================================
   Fenómeno del Niño 2026 — index.html
   Todo el JavaScript de la landing en un solo archivo.
   Requiere GSAP + ScrollTrigger (cargados por CDN antes que este archivo).
   Orden = orden de ejecución original en el HTML.
   ============================================================ */

// ============================================================
// 1) Mapa choropleth del Perú (colorea img/peru.svg por señales)
// ============================================================
    /* ============================================================
       MAPA CHOROPLETH — lógica
       Carga img/peru.svg, colorea cada departamento por su puntaje de
       "Señales" y conecta el panel lateral (hover / foco / tap).
       ============================================================ */
    (function(){
      const DATA = {"PE-CAJ":{"name":"Cajamarca","score":9.0,"pop":1490769,"explic":"Presenta señales en 9/10 indicadores: estuvo entre las regiones más afectadas en 2017 y 2023; las emergencias fueron 3 veces mayores en los años de El Niño; 82,7% de su agricultura depende solo de la lluvia. También aparecen alertas en 63,2% de sus proyectos de prevención está abandonado o paralizado; el dengue llegó a multiplicarse por 2,0 en uno de los eventos analizados."},"PE-PIU":{"name":"Piura","score":8.0,"pop":2115587,"explic":"Presenta señales en 8/10 indicadores: estuvo entre las regiones más afectadas en 2017 y 2023; las emergencias fueron 4,7 veces mayores en los años de El Niño; 60,2% de sus proyectos de prevención está abandonado o paralizado. También aparecen alertas en el dengue llegó a multiplicarse por 6,5 en uno de los eventos analizados; las viviendas destruidas fueron 14,7 veces mayores en los años de El Niño."},"PE-LAL":{"name":"La Libertad","score":8.0,"pop":2056560,"explic":"Presenta señales en 8/10 indicadores: las emergencias fueron 4,6 veces mayores en los años de El Niño; 53,6% de sus proyectos de prevención está abandonado o paralizado; el dengue llegó a multiplicarse por 308 en uno de los eventos analizados. También aparecen alertas en la leishmaniasis aumentó 202% entre 2023 y 2024; las viviendas destruidas fueron 29,3 veces mayores en los años de El Niño."},"PE-LIM":{"name":"Lima Provincias","score":8.0,"pop":1018876,"explic":"Presenta señales en 8/10 indicadores: estuvo entre las regiones más afectadas en 2017 y 2023; las emergencias fueron 11,5 veces mayores en los años de El Niño; 60,3% de sus proyectos de prevención está abandonado o paralizado. También aparecen alertas en el dengue llegó a multiplicarse por 1063 en uno de los eventos analizados; la leishmaniasis aumentó 44% entre 2023 y 2024."},"PE-LAM":{"name":"Lambayeque","score":7.0,"pop":1404376,"explic":"Presenta señales en 7/10 indicadores: las emergencias fueron 3,8 veces mayores en los años de El Niño; 62,2% de sus proyectos de prevención está abandonado o paralizado; el dengue llegó a multiplicarse por 13 en uno de los eventos analizados. También aparecen alertas en las viviendas destruidas fueron 42,5 veces mayores en los años de El Niño; los fallecidos fueron 47,2 veces mayores en los años de El Niño."},"PE-ANC":{"name":"Áncash","score":7.0,"pop":1205998,"explic":"Presenta señales en 7/10 indicadores: estuvo entre las regiones más afectadas en 2017 y 2023; las emergencias fueron 5,4 veces mayores en los años de El Niño; el dengue llegó a multiplicarse por 8,8 en uno de los eventos analizados. También aparecen alertas en la leishmaniasis aumentó 135% entre 2023 y 2024; las viviendas destruidas fueron 23 veces mayores en los años de El Niño."},"PE-TUM":{"name":"Tumbes","score":6.0,"pop":256683,"explic":"Presenta señales en 6/10 indicadores: estuvo entre las regiones más afectadas en 2017 y 2023; las emergencias fueron 3,7 veces mayores en los años de El Niño; 57,3% de sus proyectos de prevención está abandonado o paralizado. También aparecen alertas en el dengue llegó a multiplicarse por 18 en uno de los eventos analizados; las viviendas destruidas fueron 2,5 veces mayores en los años de El Niño."},"PE-AYA":{"name":"Ayacucho","score":4.0,"pop":709570,"explic":"Presenta señales en 4/10 indicadores: 61,5% de sus proyectos de prevención está abandonado o paralizado; la leishmaniasis aumentó 35% entre 2023 y 2024; presenta dificultades de abastecimiento de GLP en su macrorregión. También aparecen alertas en está entre las regiones con mayor daño en infraestructura crítica."},"PE-AMA":{"name":"Amazonas","score":4.0,"pop":467845,"explic":"Presenta señales en 4/10 indicadores: estuvo entre las regiones más afectadas en 2017 y 2023; 83,8% de su agricultura depende solo de la lluvia; 66,7% de sus proyectos de prevención está abandonado o paralizado. También aparecen alertas en presenta dificultades de abastecimiento de GLP en su macrorregión."},"PE-PUN":{"name":"Puno","score":4.0,"pop":1232995,"explic":"Presenta señales en 4/10 indicadores: 95,4% de su agricultura depende solo de la lluvia; 58,5% de sus proyectos de prevención está abandonado o paralizado; el dengue llegó a multiplicarse por 11 en uno de los eventos analizados. También aparecen alertas en presenta dificultades de abastecimiento de GLP en su macrorregión."},"PE-ICA":{"name":"Ica","score":4.0,"pop":1033185,"explic":"Presenta señales en 4/10 indicadores: las emergencias fueron 4,7 veces mayores en los años de El Niño; 59,4% de sus proyectos de prevención está abandonado o paralizado; el dengue llegó a multiplicarse por 14 en uno de los eventos analizados. También aparecen alertas en está entre las regiones con mayor daño en infraestructura crítica."},"PE-LMA":{"name":"Lima Metropolitana","score":4.0,"pop":10129708,"explic":"Presenta señales en 4/10 indicadores: 54,4% de sus proyectos de prevención está abandonado o paralizado; el dengue llegó a multiplicarse por 80 en uno de los eventos analizados; la leishmaniasis aumentó 44% entre 2023 y 2024. También aparecen alertas en las viviendas destruidas fueron 15 veces mayores en los años de El Niño."},"PE-HUV":{"name":"Huancavelica","score":3.5,"pop":371909,"explic":"Presenta señales en 3.5/10 indicadores: 78,5% de su agricultura depende solo de la lluvia; 67,6% de sus proyectos de prevención está abandonado o paralizado; está entre las regiones con mayor daño en infraestructura crítica."},"PE-MDD":{"name":"Madre de Dios","score":3.0,"pop":208682,"explic":"Presenta señales en 3/10 indicadores: 100,0% de su agricultura depende solo de la lluvia; 66,7% de sus proyectos de prevención está abandonado o paralizado; el dengue llegó a multiplicarse por 2,6 en uno de los eventos analizados."},"PE-PAS":{"name":"Pasco","score":3.0,"pop":253223,"explic":"Presenta señales en 3/10 indicadores: 95,0% de su agricultura depende solo de la lluvia; 50,4% de sus proyectos de prevención está abandonado o paralizado; el dengue llegó a multiplicarse por 2,3 en uno de los eventos analizados."},"PE-SAM":{"name":"San Martín","score":3.0,"pop":968472,"explic":"Presenta señales en 3/10 indicadores: 82,0% de su agricultura depende solo de la lluvia; 67,0% de sus proyectos de prevención está abandonado o paralizado; el dengue llegó a multiplicarse por 2,5 en uno de los eventos analizados."},"PE-ARE":{"name":"Arequipa","score":3.0,"pop":1814396,"explic":"Presenta señales en 3/10 indicadores: 50,3% de sus proyectos de prevención está abandonado o paralizado; los fallecidos fueron 7,4 veces mayores en los años de El Niño; presenta dificultades de abastecimiento de GLP en su macrorregión."},"PE-HUC":{"name":"Huánuco","score":2.0,"pop":807612,"explic":"Presenta señales en 2/10 indicadores: 90,5% de su agricultura depende solo de la lluvia; 71,8% de sus proyectos de prevención está abandonado o paralizado."},"PE-MOQ":{"name":"Moquegua","score":2.0,"pop":194842,"explic":"Presenta señales en 2/10 indicadores: presenta dificultades de abastecimiento de GLP en su macrorregión; está entre las regiones con mayor daño en infraestructura crítica."},"PE-CUS":{"name":"Cusco","score":2.0,"pop":1379003,"explic":"Presenta señales en 2/10 indicadores: 58,7% de sus proyectos de prevención está abandonado o paralizado; presenta dificultades de abastecimiento de GLP en su macrorregión."},"PE-LOR":{"name":"Loreto","score":2.0,"pop":1032016,"explic":"Presenta señales en 2/10 indicadores: 93,8% de su agricultura depende solo de la lluvia; 84,4% de sus proyectos de prevención está abandonado o paralizado."},"PE-UCA":{"name":"Ucayali","score":2.0,"pop":624235,"explic":"Presenta señales en 2/10 indicadores: 98,0% de su agricultura depende solo de la lluvia; 65,7% de sus proyectos de prevención está abandonado o paralizado."},"PE-APU":{"name":"Apurímac","score":2.0,"pop":467380,"explic":"Presenta señales en 2/10 indicadores: 55,4% de sus proyectos de prevención está abandonado o paralizado; presenta dificultades de abastecimiento de GLP en su macrorregión."},"PE-JUN":{"name":"Junín","score":2.0,"pop":1422597,"explic":"Presenta señales en 2/10 indicadores: 80,8% de su agricultura depende solo de la lluvia; 72,7% de sus proyectos de prevención está abandonado o paralizado."},"PE-TAC":{"name":"Tacna","score":2.0,"pop":389302,"explic":"Presenta señales en 2/10 indicadores: los fallecidos fueron 2 veces mayores en los años de El Niño; presenta dificultades de abastecimiento de GLP en su macrorregión."},"PE-CAL":{"name":"Callao","score":1.0,"pop":1101911,"explic":"Presenta señales en 1/10 indicadores: el dengue llegó a multiplicarse por 720 en uno de los eventos analizados."}};

      // Escala de color secuencial (dominio 1..9), en verde-azulado (teal)
      const STOPS = [[1,'#d8efe9'],[3,'#8fd0c4'],[5,'#4aa89b'],[7,'#1f7a70'],[9,'#0b4a45']];
      const hx = c => { c=c.replace('#',''); return [parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)]; };
      const toHex = (r,g,b) => '#'+[r,g,b].map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
      function scoreColor(s){
        if(s==null) return '#e7e2da';
        if(s<=STOPS[0][0]) return STOPS[0][1];
        if(s>=STOPS[STOPS.length-1][0]) return STOPS[STOPS.length-1][1];
        for(let i=0;i<STOPS.length-1;i++){
          const [x0,c0]=STOPS[i], [x1,c1]=STOPS[i+1];
          if(s>=x0 && s<=x1){ const t=(s-x0)/(x1-x0), a=hx(c0), b=hx(c1);
            return toHex(a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t); }
        }
        return STOPS[STOPS.length-1][1];
      }
      function textOn(color){ const [r,g,b]=hx(color); return (0.299*r+0.587*g+0.114*b) > 150 ? '#141414' : '#ffffff'; }
      const fmtScore = s => (s%1 ? s.toFixed(1) : String(s)) + '/10';
      const fmtPop = n => n ? n.toLocaleString('es-PE') : '—';

      const holder = document.getElementById('mapaSvgHolder');
      const elName = document.getElementById('mpName');
      const elBadge = document.getElementById('mpBadge');
      const elPop = document.getElementById('mpPop');
      const elExplic = document.getElementById('mpExplic');
      const elNoData = document.getElementById('mlNoData');
      let svg=null, current=null;

      function select(id){
        const d = DATA[id]; if(!d) return;
        elName.textContent = d.name;
        const col = scoreColor(d.score);
        elBadge.textContent = fmtScore(d.score);
        elBadge.style.background = col;
        elBadge.style.color = textOn(col);
        elPop.textContent = 'Población: ' + fmtPop(d.pop);
        elExplic.textContent = d.explic || '';
        if(elNoData) elNoData.hidden = (id !== 'PE-PUN'); // "Sin datos / lago" solo con Puno (lago Titicaca)
        if(!svg) return;
        if(current){ const pc=svg.getElementById(current); if(pc) pc.classList.remove('is-active'); }
        const p = svg.getElementById(id);
        if(p){ p.classList.add('is-active'); p.parentNode.appendChild(p); } // traer al frente
        current = id;
      }

      fetch('./img/peru.svg')
        .then(r => { if(!r.ok) throw new Error('HTTP '+r.status); return r.text(); })
        .then(txt => {
          holder.innerHTML = txt;
          svg = holder.querySelector('svg');
          if(!svg) throw new Error('SVG no encontrado');
          svg.removeAttribute('width'); svg.removeAttribute('height');
          if(!svg.getAttribute('viewBox')) svg.setAttribute('viewBox','0 0 542.76703 792');
          svg.setAttribute('preserveAspectRatio','xMidYMid meet');
          svg.classList.add('peru-map');

          // Colorea y conecta los departamentos con data
          Object.keys(DATA).forEach(id => {
            const p = svg.getElementById(id);
            if(!p) return;
            const d = DATA[id];
            p.setAttribute('fill', scoreColor(d.score));
            p.classList.add('dep');
            p.setAttribute('tabindex','0');
            p.setAttribute('role','button');
            p.setAttribute('aria-label', d.name + ', ' + fmtScore(d.score) + ' señales');
            const pick = () => select(id);
            p.addEventListener('mouseenter', pick);
            p.addEventListener('focus', pick);
            p.addEventListener('click', pick);
            p.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pick(); } });
          });

          // Resto de trazos (lago Titicaca, etc.): neutro y sin interacción
          svg.querySelectorAll('path').forEach(p => {
            if(!p.classList.contains('dep')){ p.setAttribute('fill','#e7e2da'); p.style.pointerEvents='none'; }
          });

          select('PE-CAJ'); // arranca en el departamento con más señales
        })
        .catch(err => {
          holder.innerHTML = '<p class="mapa-err">No se pudo cargar el mapa (img/peru.svg).<br>Revisa que la página se sirva por http (no file://).</p>';
          console.error('[mapa-fen]', err);
        });
    })();
    


// ============================================================
// 2) Portada + FLIP de personajes + zig-zag + fila inferior (GSAP/ScrollTrigger)
// ============================================================
  /* ============================================================
     DATOS DE CADA PERSONAJE
     - cx, cy: centro del círculo (sistema de 793 x 2720)
     - side: lado del cuadro blanco de información ('right' | 'left')
     - info: {top} posición vertical del cuadro blanco
     - orange: {tox, toy} centro del cuadro naranja, sobre la línea
     ============================================================ */
  const FIGURE = (color)=>`<svg viewBox="0 0 40 48"><circle cx="20" cy="11" r="8" fill="${color}"/><path d="M4 48c0-9 7-16 16-16s16 7 16 16z" fill="${color}"/></svg>`;

  const STATIONS = [
    { name:"María", age: '34 años', role:"Ciudadana", region:"PIURA",
      cx:150, cy:135, side:"right", infoTop:92,
      info:"Vivo en un asentamiento humano en las afueras de Piura. Mi hija Xiomara, de 9 años, lleva tres días internada con dengue. Creo que la culpa es de un mosquito que la picó en el patio de la casa.",
      q:"¿Y si no fue el mosquito, sino la misma lluvia que golpeaba más al sur?",
      orange:{tox:289, toy:285},
      popE:"Dengue", popT:"El dengue y El Niño",
      popB:"Los casos de dengue en Piura casi se multiplicaron por 7 en 2023: de 12,150 pasaron a más de 79 mil." },

    { name:"Carlos", age: '41 años', role:"Ingeniero", region:"ÁNCASH",
      cx:352, cy:352, side:"left", infoTop:308,
      info:"Trabajo para una empresa contratista en Áncash, operando maquinaria pesada para retirar huaicos y escombros de la vía tras las lluvias. Llevo dos semanas sin volver a casa por la magnitud del daño.",
      q:"¿Y si esa misma lluvia, más al norte, costó algo más que caminos?",
      orange:{tox:497, toy:475},
      popE:"Infraestructura crítica", popT:"Huaicos y vías rotas",
      popB:"Áncash es el segundo departamento del país con carreteras y puentes destruidos por El Niño: casi 21 km por cada 100 mil habitantes." },

    { name:"Pablo", age: '29 años', role:"Transportista", region:"LAMBAYEQUE",
      cx:600, cy:562, side:"left", infoTop:520,
      info:"Soy chofer de una empresa de carga que transporta alimentos entre Chiclayo y el norte. Ese año, mi ruta habitual se volvió zona de rescate.",
      q:"¿Cuántas veces se repite esto cada año?",
      orange:{tox:380, toy:690},
      popE:"Fallecidos por El Niño", popT:"Las muertes en la carretera",
      popB:"En años de El Niño, en Lambayeque mueren 47 veces más personas que en un año normal — la cifra más alta de todo el país." },

    { name:"Daniel", age: '47 años', role:"Promotor", region:"CAJAMARCA",
      cx:188, cy:802, side:"right", infoTop:758,
      info:"Vivo en un caserío rural de Cajamarca. Soy promotor de defensa civil de mi comunidad desde hace 15 años; he visto el mismo río desbordarse más veces de las que puedo contar.",
      q:"¿En otra parte del Perú también se arruinaron sus cosechas?",
      orange:{tox:425, toy:940},
      popE:"Recurrencia de eventos", popT:"El desastre que se repite",
      popB:"En 2023, Cajamarca tuvo 55 emergencias por lluvia por cada 100 mil habitantes, la tasa más alta de todo el país." },

    { name:"Isabel", age: '52 años', role:"Comerciante", region:"LA LIBERTAD",
      cx:632, cy:1042, side:"left", infoTop:998,
      info:"Tengo un puesto de frutas en un mercado de Trujillo hace más de veinte años. Ese año no pude vender mango, mi producto más pedido, porque la cosecha de la región se malogró.",
      q:"¿Y si la cosecha no estuviera en la tierra, sino en el mar?",
      orange:{tox:390, toy:1165},
      popE:"Rendimiento de mango", popT:"La cosecha que no maduró",
      popB:"Caída de 20.2% en 2017 y 25.9% en 2023 — el único cultivo de los nueve medidos con caída repetida en los dos años de El Niño." },

    { name:"Héctor", age: '58 años', role:"Acuicultor", region:"LA LIBERTAD",
      cx:168, cy:1278, side:"right", infoTop:1234,
      info:"Tengo una concesión de conchas de abanico en la bahía de Sechura desde hace quince años. Es la peor cosecha que recuerdo.",
      q:"¿Y si el problema no es el agua que llega, sino la que nunca llegó?",
      orange:{tox:264, toy:1400},
      popE:"Concha de abanico", popT:"El mar demasiado caliente",
      popB:"La cosecha de conchas de abanico en Sechura se redujo a menos de la octava parte en un solo año (de 7 205.8 a 838.9 toneladas)." },

    { name:"Estela", age: '61 años', role:"Agricultora", region:"PUNO",
      cx:352, cy:1502, side:"right", infoTop:1458,
      info:"Cultivo papa nativa en una chacra a más de 3,800 metros de altura, sin acceso a riego. Ese año la lluvia de temporada nunca llegó.",
      q:"¿Y esa sequía tocó algo más, en otro rincón de la sierra?",
      orange:{tox:460, toy:1615},
      popE:"Sequías históricas", popT:"El sur que se seca",
      popB:"En Puno, prácticamente 19 de cada 20 chacras dependen solo de la lluvia para regarse, sin ninguna otra fuente de agua. En el verano de 1983, categoría 'extremadamente seco'." },

    { name:"Tomás", age: '47 años', role:"Fruticultor", region:"AYACUCHO",
      cx:562, cy:1722, side:"left", infoTop:1678,
      info:"Trabajo un valle interandino cerca de Huamanga cultivando frutales. Una herida que no cerraba resultó ser leishmaniasis.",
      q:"¿Y qué pasa cuando una emergencia alcanza a toda una comunidad?",
      orange:{tox:397, toy:1858},
      popE:"Leishmaniasis", popT:"La enfermedad del valle",
      popB:"Los casos de leishmaniasis en Ayacucho subieron más de un tercio en un año: de 119 a 161." },

    { name:"Cecilia", age: '44 años', role:"Directora", region:"LIMA PROVINCIAS",
      cx:238, cy:1978, side:"right", infoTop:1934,
      info:"Dirijo un colegio rural en una provincia de Lima. Mi escuela sirvió de refugio de emergencia varias veces ese año.",
      q:"¿Hasta dónde puede llegar una emergencia como esta?",
      orange:{tox:317, toy:2145},
      popE:"Emergencias El Niño vs. resto", popT:"El año que se multiplicó",
      popB:"En sus años de El Niño, Lima Provincias tuvo casi 12 veces más emergencias que en un año normal — la cifra más alta de todo el país." }
  ];

  /* Posición del silueta "Yo" (centro de la fila inferior) */
  const YO = { cx:434, cy:2300 };

  /* Fila horizontal de la parte inferior (izq. a der.).
     El elemento central 'me' es la silueta blanca "Yo". */
  const ROW = [
    {lbl:"Dengue", img:"personaje-1.png"},
    {lbl:"Infraestructura crítica", img:"personaje-2.png"},
    {lbl:"Fallecidos El Niño (anteriores)", img:"personaje-3.png"},
    {lbl:"Recurrencia eventos", img:"personaje-4.png"},
    {lbl:"Rendimiento de mango", img:"personaje-5.png"},
    {lbl:"Cosecha de concha de abanico", img:"personaje-6.png"},
    {lbl:"Sequías históricas", img:"personaje-7.png"},
    {lbl:"Leishmaniasis", img:"personaje-8.png"},
    {lbl:"Emergencias en años de El Niño vs. resto", img:"personaje-9.png"},
    {lbl:"Yo", me:true, img:"personaje-yo.png"}
  ];

  const IMG_BASE = "img/personajes/";   // carpeta de ilustraciones

  const YO_STATION = {
    region:"LIMA METROPOLITANA", role:"Yo",
    info:"Trabajo repartiendo pedidos en moto en un distrito del Cono Norte. Nunca he salido de Lima. Tuve dengue por primera vez ese año.",
    q:"Y tú, ¿estás seguro de que El Niño nunca te ha afectado?",
    popE:"Lima Metropolitana", popT:"El Niño también llega a la ciudad",
    popB:"Más de la mitad de los proyectos para prevenir desastres en Lima Metropolitana están abandonados o paralizados."
  };

  /* ============================================================
     LAYOUT VERTICAL  —  el espaciado se controla con GAP
     Cada cy, cuadro blanco y cuadro naranja se calcula a partir de aquí,
     así que subir GAP separa TODAS las estaciones de forma pareja y los
     cuadros naranjas siguen cayendo exactamente sobre la línea punteada.
     ============================================================ */
  const START_Y = 150;   // centro vertical del primer círculo
  const GAP = 420;       // ← distancia entre estaciones (da espacio a la secuencia por scroll)
  const ORANGE_F = 0.58; // posición del cuadro naranja sobre el tramo a la sgte. estación

  // Lienzo más ancho: da aire a la fila inferior para alinear las etiquetas en
  // una sola fila. El zig-zag se recentra desplazando todos los cx por igual.
  const STAGE_W = 1120;
  const CX_OFFSET = 178;
  STATIONS.forEach(s=> s.cx += CX_OFFSET);
  const YO_X = 1000;   // "Yo" al extremo derecho: destino del zig-zag y de la fila
  YO.cx = YO_X;

  /* Fila intro "Todo está conectado": los círculos arrancan aquí y vuelan
     hasta su estación del zig-zag conforme se hace scroll (FLIP). */
  const ROW_Y_INTRO = 320;                 // y del centro de los círculos en la fila intro
  const INTRO_GAP   = 380;                 // aire entre la fila intro y la 1ª estación
  const ROW_L = 24, ROW_R = STAGE_W - 60;  // extensión horizontal de la fila intro (más aire entre personas)
  STATIONS.forEach((s,i)=>{ s._rowX = Math.round(ROW_L + (ROW_R-ROW_L)*i/(STATIONS.length-1)); });
  STATIONS.forEach((s,i)=>{ s.cy = ROW_Y_INTRO + INTRO_GAP + i*GAP; });
  YO.cy = STATIONS[STATIONS.length-1].cy + Math.round(GAP*1.1);
  STATIONS.forEach((s,i)=>{
    s.infoTop = s.cy - 44;
    const nx = (i < STATIONS.length-1) ? STATIONS[i+1].cx : YO.cx;
    const ny = (i < STATIONS.length-1) ? STATIONS[i+1].cy : YO.cy;
    s.orange = { tox: Math.round(s.cx + (nx - s.cx)*ORANGE_F),
                 toy: Math.round(s.cy + (ny - s.cy)*ORANGE_F) };
  });
  // Sección final (bajo la fila de figuras), medidos desde la línea de pies YO.cy
  // Sección final: fila horizontal (Yo a la derecha), ¿Y tú?, caja roja y Lorem.
  // El cuadro naranja de esta zona es el de la estación de Cecilia (última estación).
  const YT_X    = 580, YT_DY = 330;                          // "¿Y tú?" (centro X, desfase Y bajo la fila)
  const RBOX_CX = 580, RBOX_W = 300, RBOX_DY = YT_DY + 185;  // caja roja del dato, bajo "¿Y tú?"
  const CAP_DY  = RBOX_DY + 150;                             // texto Lorem, bajo la caja roja
  const STAGE_H = YO.cy + CAP_DY + 130;                      // alto total del lienzo

  /* ============================================================
     CONSTRUCCIÓN DEL DOM
     ============================================================ */
  const stage = document.getElementById('stage');
  const svg = document.getElementById('connector');
  const SVGNS = "http://www.w3.org/2000/svg";
  const INFO_W = 250, ORANGE_W = 210, CIRCLE_R = 44;

  // El lienzo y el SVG crecen según STAGE_H (derivado de GAP)
  stage.style.height = STAGE_H + 'px';
  svg.setAttribute('viewBox', '0 0 ' + STAGE_W + ' ' + STAGE_H);
  svg.style.height = STAGE_H + 'px';

  // clipPath que "dibuja" la línea punteada conforme se hace scroll.
  // El rect crece en Y para ir destapando el trazo de arriba hacia abajo.
  // Por defecto queda a altura completa (fallback si GSAP no carga).
  const _defs = document.createElementNS(SVGNS,'defs');
  const _clip = document.createElementNS(SVGNS,'clipPath');
  _clip.setAttribute('id','lineDraw');
  _clip.setAttribute('clipPathUnits','userSpaceOnUse');
  const clipRect = document.createElementNS(SVGNS,'rect');
  clipRect.setAttribute('x','0'); clipRect.setAttribute('y','0');
  clipRect.setAttribute('width', String(STAGE_W));
  clipRect.setAttribute('height', STAGE_H);
  _clip.appendChild(clipRect); _defs.appendChild(_clip); svg.appendChild(_defs);

  function el(tag, cls, html){ const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }

  // 1) Línea punteada en zig-zag por los centros de los círculos + bajada a "Yo"
  const points = STATIONS.map(s=>[s.cx,s.cy]);
  points.push([YO.cx, YO.cy]);   // termina en el "Yo" (la línea pasa por la caja naranja de Cecilia)
  const polyD = "M " + points.map(p=>p.join(" ")).join(" L ");
  const poly = document.createElementNS(SVGNS,'path');
  poly.setAttribute('d', polyD); poly.setAttribute('class','dotted');
  poly.setAttribute('clip-path','url(#lineDraw)');
  svg.appendChild(poly);

  // 1b) Conectores punteados de la sección final (se dibujan con el scroll).
  function dline(pts){
    const d = "M " + pts.map(pt=>pt.join(" ")).join(" L ");
    const pth = document.createElementNS(SVGNS,'path');
    pth.setAttribute('d', d); pth.setAttribute('class','dotted');
    pth.setAttribute('clip-path','url(#lineDraw)'); svg.appendChild(pth);
  }
  const BEND_X = 870;  // codo de la diagonal "Yo" → "¿Y tú?" (menor = más inclinada)
  dline([[YO_X, YO.cy + 12], [BEND_X, YO.cy + YT_DY], [YT_X + 80, YO.cy + YT_DY]]);  // "Yo" → "¿Y tú?" (diagonal + horizontal)
  dline([[YT_X, YO.cy + YT_DY + 46], [YT_X, YO.cy + RBOX_DY - 14]]);               // "¿Y tú?" → caja roja

  // 2) Estaciones (círculo + botón + nombre + cuadro blanco + cuadro naranja)
  STATIONS.forEach((s, i)=>{
    const node = el('div','node');

    // círculo con la ilustración del personaje — arranca en la FILA INTRO
    // (visible al cargar) y vuela hasta su estación con el scroll.
    const circle = el('div','circle', `<img src="${IMG_BASE}personaje-${i+1}.png" alt="${s.role}">`);
    circle.style.left = s._rowX+'px'; circle.style.top = ROW_Y_INTRO+'px';
    node.appendChild(circle);

    // etiqueta de la fila intro: nombre + región (caja roja), ambos ARRIBA del personaje
    const introLbl = el('div','intro-lbl',
      `<div style="position:absolute;left:0;bottom:64px;transform:translateX(-50%);text-align:center;white-space:nowrap;">`+
        `<div style="color:#f4efe7;font:800 1.02rem/1 'Monoglyphic Bold';">${s.name}</div>`+
        `<div style="margin-top:7px;background:#ee0c0c;color:#000;font:700 .74rem/1.05 'Monoglyphic Bold';letter-spacing:.03em;padding:4px 11px;display:inline-block;">${s.region}</div>`+
      `</div>`);
    introLbl.style.left = s._rowX+'px';
    introLbl.style.top  = ROW_Y_INTRO+'px';
    node.appendChild(introLbl);
    s._introLbl = introLbl;

    // Posición horizontal del cuadro blanco (fuente única para cuadro y botón)
    const ibLeft = s.side==='right' ? (s.cx + CIRCLE_R + 8) : (s.cx - CIRCLE_R - 8 - INFO_W);

    // botón de info: anclado a la esquina superior derecha del cuadro (.infobox)
    const btn = el('button','infobtn reveal','›');
    btn.style.left = (ibLeft + INFO_W)+'px';   // borde derecho del cuadro
    btn.style.top  = (s.infoTop)+'px';         // borde superior del cuadro
    btn.dataset.idx = i;
    node.appendChild(btn);

    // nombre + rol (aparece con fade junto al personaje)
    const nw = el('div','namewrap reveal', `<div class="nm">${s.name} <br> (${s.age})</div><div class="role">${s.role}</div>`);
    nw.style.left = s.cx+'px';
    nw.style.top  = (s.cy + CIRCLE_R + 12)+'px';
    node.appendChild(nw);

    // cuadro blanco de información
    const ib = el('div','infobox reveal', `<span class="region">${s.region}.</span> ${s.info}`);
    ib.style.width = INFO_W+'px';   // ancho único de verdad: el botón siempre cae en su esquina
    ib.style.top = s.infoTop+'px';
    ib.style.left = ibLeft+'px';
    node.appendChild(ib);

    // cuadro naranja (sobre la línea)
    const ob = el('div','orangebox reveal', `<span class="q" style="margin-top:0">${s.q}</span>`);
    ob.style.left = s.orange.tox+'px';
    ob.style.top  = s.orange.toy+'px';
    ob.style.transform = 'translate(-50%,-50%)';
    ob._baseTransform = 'translate(-50%,-50%)';
    node.appendChild(ob);

    // guarda referencias para la secuencia de aparición
    s._circle = circle; s._btn = btn; s._nw = nw; s._ib = ib; s._ob = ob;

    stage.appendChild(node);
  });

  /* ── Portada "Todo está conectado" + elementos decorativos ───── */
  const stageTitle = el('div','stage-title','Todo está conectado');
  stageTitle.style.left = Math.round(STAGE_W/2)+'px';
  stageTitle.style.top  = '92px';
  stage.appendChild(stageTitle);

  // Flechas blancas entre los personajes de la fila intro
  for(let i=0;i<STATIONS.length-1;i++){
    const arw = el('div','intro-arrows');
    arw.style.left = ((STATIONS[i]._rowX + STATIONS[i+1]._rowX)/2)+'px';
    arw.style.top  = ROW_Y_INTRO+'px';
    arw.style.width='0'; arw.style.height='0';
    arw.style.borderTop='9px solid transparent';
    arw.style.borderBottom='9px solid transparent';
    arw.style.borderLeft='14px solid #ffffff';
    stage.appendChild(arw);
  }

  function decor(cls, html, cx, cy, w, h){
    const d = el('div','decor '+cls, html);
    d.style.left = (cx - w/2)+'px'; d.style.top = (cy - h/2)+'px';
    d.style.width = w+'px'; d.style.height = h+'px';
    stage.appendChild(d); return d;
  }
  const sunEl   = decor('decor-sun','',           30,           STATIONS[0].cy,       300, 300);
  const rainEl  = decor('decor-cloud', '', STAGE_W - 66, STATIONS[2].cy + 150, 240, 206);   // lluvia.png (desde CSS .decor-cloud)
  const stormEl = decor('decor-cloud', '', 60,           STATIONS[6].cy + 10,  236, 200);
  stormEl.style.background = "url('img/rayos.png') no-repeat center center/cover";   // rayos.png

  // 3) Fila inferior: figuras con los pies sobre la línea + etiquetas
  //    escalonadas (dos niveles alternados) para que no se amontonen.
  const figrow = el('div','figrow');
  const ROW_Y = YO.cy;                 // altura de la línea (pies de las figuras)
  const N9 = 9;                        // variables numeradas (1..9)
  const startX = 70, endX9 = 800;      // extensión de las 9 variables
  const step = (endX9 - startX)/(N9 - 1);
  const FIG_H = 46, FIG_ME_OFF = 36;   // desfases para apoyar los pies sobre la línea
  const LBL_BASE = 72;                 // etiquetas en una sola fila alineada
  const NUM_DY = 20;                   // número grande justo bajo la figura
  const xOf = (r,i)=> r.me ? YO_X : (startX + i*step);   // "Yo" al extremo derecho
  let figNum = 0;
  ROW.forEach((r, i)=>{
    const x = xOf(r,i);
    // figura
    const f = el('div','fig'+(r.me?' me':'')+' reveal');
    f.style.left = x+'px';
    f.style.top  = (ROW_Y - (r.me ? FIG_ME_OFF : FIG_H))+'px';
    f.innerHTML = `<img src="${IMG_BASE}${r.img}" alt="${r.lbl}">`;
    figrow.appendChild(f);
    if(r.me){ r._x = x; }
    if(!r.me){
      // número grande (1..9) + etiqueta, escalonados en dos niveles:
      // pares ARRIBA de la figura, impares ABAJO (evita que se amontonen).
      figNum++;
      const above = (figNum % 2 === 0);
      const num = el('div','fig-num reveal'+(above?' above':''), String(figNum));
      num.style.left = x+'px';
      num.style.top  = (above ? (ROW_Y - FIG_H - 10) : (ROW_Y + NUM_DY))+'px';
      figrow.appendChild(num);
      // etiqueta (el "Yo" no lleva etiqueta)
      const lab = el('div','fig-lbl reveal'+(above?' above':''), r.lbl);
      lab.style.left = x+'px';
      lab.style.top  = (above ? (ROW_Y - FIG_H - 40) : (ROW_Y + LBL_BASE))+'px';
      figrow.appendChild(lab);
    }
  });
  // línea punteada horizontal continua a la altura de los pies
  const hline = document.createElementNS(SVGNS,'line');
  hline.setAttribute('x1', 35); hline.setAttribute('y1', ROW_Y+2);
  hline.setAttribute('x2', 1085); hline.setAttribute('y2', ROW_Y+2);
  hline.setAttribute('class','dotted'); hline.setAttribute('clip-path','url(#lineDraw)'); svg.appendChild(hline);
  // flechas ▷ entre figuras consecutivas (incluye el salto hacia el "Yo")
  for(let i=0;i<ROW.length-1;i++){
    const x1 = xOf(ROW[i],i), x2 = xOf(ROW[i+1],i+1);
    const mx = (x1 + x2)/2, my = ROW_Y + 2;
    const tri = document.createElementNS(SVGNS,'path');
    tri.setAttribute('d', `M ${mx-5} ${my-6} L ${mx+6} ${my} L ${mx-5} ${my+6} Z`);
    tri.setAttribute('class','arrow'); tri.setAttribute('clip-path','url(#lineDraw)');
    svg.appendChild(tri);
  }
  stage.appendChild(figrow);

  // 4) Sección final — "¿Y tú?" + caja roja del dato + texto Lorem.
  //    (el cuadro naranja de esta zona lo aporta la estación de Cecilia)
  const yoNode = el('div','node');

  // "¿Y tú?"
  const yq = el('div','final-q reveal','¿Y, a ti?');
  yq.style.left = YT_X+'px';
  yq.style.top  = (YO.cy + YT_DY)+'px';
  yoNode.appendChild(yq);

  // caja roja con el dato
  const yob = el('div','orangebox final reveal',
    `<span class="stmt"><strong>9 variables de las 10</strong> que constituyen una catástrofe la viven millones de peruanos.</span>`);
  yob.style.width = RBOX_W+'px';
  yob.style.left  = RBOX_CX+'px';
  yob.style.top   = (YO.cy + RBOX_DY)+'px';
  yob.style.transform = 'translateX(-50%)';
  yob._baseTransform = 'translateX(-50%)';
  yoNode.appendChild(yob);

  // texto Lorem
  const ycap = el('div','final-caption reveal','');
  ycap.style.left = RBOX_CX+'px';
  ycap.style.top  = (YO.cy + CAP_DY)+'px';
  yoNode.appendChild(ycap);

  stage.appendChild(yoNode);

  // La silueta "Yo" NO lleva botón de popup (a diferencia del resto).
  const yoFigEl = figrow.querySelector('.fig.me');

  /* ============================================================
     MODAL / POPUP
     ============================================================ */
  const modal = document.getElementById('modal');
  const mContent = document.getElementById('mContent');

  // ============================================================
  // DATOS + DISEÑO DE CADA MODAL (una tarjeta por personaje)
  //   img    : ilustración en img/personajes/popups/
  //   layout : 'img-top' (imagen arriba) | 'img-bottom' (texto arriba, imagen abajo)
  //   html   : enunciado; <span class="hl"> marca lo resaltado en naranja
  //   chart  : (opcional) gráfico HTML extra — solo el de dengue no viene en la imagen
  //   source : texto de la línea "FUENTE:"
  // ============================================================
  const POP_BASE = "img/personajes/popups/";
  const DENGUE_BARS =
    '<div class="pop-bars">' +
      '<div class="pb-row"><span class="pb-label">Antes</span>' +
        '<span class="pb-bar" style="width:70px"></span>' +
        '<span class="pb-val">12,150</span></div>' +
      '<div class="pb-row"><span class="pb-label">2023</span>' +
        '<span class="pb-bar" style="width:150px"></span>' +
        '<span class="pb-val">+ 79,000</span></div>' +
    '</div>';

  // imgW → ancho de la imagen de ESE popup (editable de forma independiente
  //        por tarjeta). Acepta cualquier valor CSS: "42%", "220px", etc.
  const POPUPS = {
    0:  { img:"bg-popup-1.jpg",  imgW:"25%", layout:"img-top", chart:DENGUE_BARS,
          html:'Los casos de <span class="hl">dengue</span> en Piura casi se multiplicaron por 7 en 2023.',
          source:"Minsa" },
    1:  { img:"bg-popup-2.jpg",  imgW:"62%", layout:"img-top",
          html:'Áncash es el segundo departamento del país con carreteras y puentes destruidos por El Niño: <span class="hl">casi 21 km por cada 100 mil habitantes.</span>',
          source:"Indeci + INEI" },
    2:  { img:"bg-popup-3.jpg",  imgW:"80%", layout:"img-bottom",
          html:'En años <span class="hl">El Niño, en Lambayeque mueren 47 veces más personas por desastres</span> (inundaciones, huaicos, derrumbes) que en un año normal – la cifra más alta de todo el país.',
          source:"Indeci + INEI" },
    3:  { img:"bg-popup-4.jpg",  imgW:"42%", layout:"img-top",
          html:'“En 2023, Cajamarca <span class="hl">tuvo 55 emergencias por lluvia</span> por cada 100 mil habitantes, la tasa más alta de todo el país”',
          source:"Indeci + INEI" },
    4:  { img:"bg-popup-5.jpg",  imgW:"74%", layout:"img-top",
          html:'El único cultivo de los nueve medidos con <span class="hl">caída repetida</span> en los dos años de El Niño.',
          source:"IPE (Instituto peruano de Economía)" },
    5:  { img:"bg-popup-6.jpg",  imgW:"68%", layout:"img-top",
          html:'La cosecha de conchas de abanico en Sechura <span class="hl">se redujo a menos de la octava parte en un solo año.</span>',
          source:"PRODUCE" },
    6:  { img:"bg-popup-7.jpg",  imgW:"36%", layout:"img-top",
          html:'En Puno, <span class="hl">prácticamente 19 de cada 20 chacras dependen solo de la lluvia</span> para regarse, sin ninguna otra fuente de agua. En el verano de 1983, categoría ‘extremadamente seco’.',
          source:"IPE + Senamhi" },
    7:  { img:"bg-popup-8.jpg",  imgW:"34%", layout:"img-bottom",
          html:'Los casos de <span class="hl">leishmaniasis</span> en Ayacucho subieron más de un tercio en un año.',
          source:"Minsa" },
    8:  { img:"bg-popup-9.jpg",  imgW:"32%", layout:"img-bottom",
          html:'En los años de El Niño, <span class="hl">Lima Provincias tuvo casi 12 veces más emergencias</span> que en un año normal — la cifra más alta de todo el país',
          source:"Indeci + INEI" },
    yo: { img:"bg-popup-10.jpg", imgW:"36%", layout:"img-top",
          html:'<span class="hl">Más de la mitad</span> de los proyectos para prevenir desastres en Lima Metropolitana están abandonados o paralizados.',
          source:"IPE (Instituto peruano de Economía)" }
  };

  function buildPopup(p){
    const w    = p.imgW ? (' style="width:' + p.imgW + '"') : '';
    const fig  = '<div class="pop-fig"><img' + w + ' src="' + POP_BASE + p.img + '" alt=""></div>';
    const text = '<p class="pop-text">' + p.html + '</p>';
    const chart = p.chart || '';
    const src  = '<div class="pop-source">FUENTE: ' + p.source + '</div>';
    const body = (p.layout === 'img-bottom') ? (text + chart + fig) : (fig + text + chart);
    return body + src;
  }

  function openPopup(p){
    if(!p) return;
    mContent.innerHTML = buildPopup(p);
    modal.classList.add('open');
    mContent.scrollTop = 0;
  }
  function closePopup(){ modal.classList.remove('open'); }

  document.querySelectorAll('.infobtn').forEach(b=>{
    b.addEventListener('click', ()=>{
      const idx = b.dataset.idx;
      openPopup(idx==='yo' ? POPUPS.yo : POPUPS[+idx]);
    });
  });
  document.getElementById('mClose').addEventListener('click', closePopup);
  modal.addEventListener('click', e=>{ if(e.target===modal) closePopup(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closePopup(); });

  /* ============================================================
     ESCALADO RESPONSIVE + SCROLLTRIGGER
     ============================================================ */
  // STAGE_W definido arriba (lienzo ancho para la fila inferior)
  const wrap = document.getElementById('stageWrap');
  let curScale = 1;   // escala actual (para desfasar los reveals en px reales)

  function fit(){
    const avail = Math.min(window.innerWidth - 16, STAGE_W);
    curScale = avail / STAGE_W;
    stage.style.transform = `translateX(-50%) scale(${curScale})`;
    wrap.style.height = (STAGE_H * curScale) + 'px';
    if(window.ScrollTrigger) ScrollTrigger.refresh();
  }

  window.addEventListener('resize', fit);
  fit();

  function revealAll(){ document.querySelectorAll('.reveal').forEach(n=> n.style.opacity=1); }

  if(window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);

    // La línea punteada se dibuja de arriba hacia abajo siguiendo el scroll.
    clipRect.setAttribute('height','0');
    gsap.to(clipRect, {
      attr:{ height: STAGE_H },
      ease:'none',
      scrollTrigger:{ trigger: wrap, start:'top top', end:'bottom 80%', scrub:0.5 }
    });

    // Secuencia escalonada por scroll. Para cada personaje, todos los
    // elementos usan el MISMO ancla (su círculo) y aparecen con un desfase
    // creciente (offset en px de scroll), de modo que el orden es siempre:
    //   personaje + nombre/cargo + flecha  →  cuadro blanco  →  cuadro naranja
    // y recién después entra el siguiente personaje. Así la información no
    // sale de golpe: hay que seguir scrolleando para revelar cada parte.
    // toggleActions 'play none none reverse' => se deshace al volver a subir.
    const STEP = 150;      // px de scroll extra entre cada aparición dentro de un personaje
    const START = 'top 55%';  // cada estación se revela cuando sube al tercio superior:
                              // así en el primer scroll solo aparece la 1ª (María) y no varias a la vez

    function revealAt(node, anchor, offset){
      if(!node) return;
      gsap.set(node, { opacity:0 });
      // El desfase se multiplica por la escala actual para que el ORDEN se
      // conserve también cuando el lienzo se reduce en pantallas chicas.
      const start = offset>0 ? (()=> 'top+=' + (offset*curScale) + ' 55%') : START;
      gsap.to(node, {
        opacity:1, duration:1, ease:'power2.out',
        scrollTrigger:{ trigger: anchor, start, toggleActions:'play none none reverse' }
      });
    }

    // 1) FLIP: cada personaje vuela de la fila intro a su estación cuando ésta
    //    entra en pantalla; sus textos aparecen al llegar (ancla fija = cuadro blanco).
    STATIONS.forEach(s=>{
      gsap.fromTo(s._circle,
        { left:s._rowX, top:ROW_Y_INTRO },
        { left:s.cx, top:s.cy, ease:'power2.out',
          scrollTrigger:{ trigger:s._ib, start:'top center', end:'top 38%', scrub:0.7 } });
      revealAt(s._nw,  s._ib, 0);                // nombre y cargo
      revealAt(s._ib,  s._ib, STEP);            // cuadro blanco
      revealAt(s._btn, s._ib, STEP);            // botón de info
      revealAt(s._ob,  s._ib, STEP*2);          // cuadro naranja
    });

    // Portada: título, etiquetas y flechas se desvanecen al empezar a bajar
    gsap.to('.stage-title', { opacity:0, y:-18, ease:'none',
      scrollTrigger:{ trigger:wrap, start:'top top', end:'+=340', scrub:true } });
    gsap.to('.intro-lbl', { opacity:0, ease:'none',
      scrollTrigger:{ trigger:wrap, start:'top top', end:'+=300', scrub:true } });
    gsap.to('.intro-arrows', { opacity:0, ease:'none',
      scrollTrigger:{ trigger:wrap, start:'top top', end:'+=200', scrub:true } });

    // Decor: sol y nubes entran suave por los lados al acercarse su tramo
    gsap.fromTo(sunEl,  { x:-360, opacity:0 }, { x:0, opacity:1, ease:'power2.out',
      scrollTrigger:{ trigger:STATIONS[0]._ib, start:'top center', end:'top 42%', scrub:0.9 } });
    gsap.fromTo(rainEl, { x:360, opacity:0 },  { x:0, opacity:1, ease:'power2.out',
      scrollTrigger:{ trigger:STATIONS[2]._ib, start:'top center', end:'top 44%', scrub:0.9 } });
    gsap.fromTo(stormEl,{ x:-360, opacity:0 }, { x:0, opacity:1, ease:'power2.out',
      scrollTrigger:{ trigger:STATIONS[6]._ib, start:'top center', end:'top 44%', scrub:0.9 } });

    // 2) Fila inferior + estación "Yo" (sin botón de popup)
    document.querySelectorAll('.figrow .reveal').forEach(f=> revealAt(f, yoFigEl, 0));
    revealAt(yq,   yoFigEl, STEP);             // "¿Y tú?"
    revealAt(yob,  yoFigEl, STEP*2);           // caja roja del dato
    revealAt(ycap, yoFigEl, STEP*3);           // texto Lorem

    ScrollTrigger.refresh();
  } else {
    // Fallback: si GSAP no cargó (sin conexión / CDN bloqueado),
    // mostramos todo de forma estática para no dejar la página en blanco.
    revealAll();
  }
  


// ============================================================
// 3) Comportamiento: ocultar topbar + gate pre-scroll del stage
// ============================================================
  (function(){
    var body     = document.body;
    var topbar   = document.querySelector('.topbar');
    var heroMain = document.getElementById('hero-main');

    /* ── 2) Nada visible en el stage hasta que se empieza a hacer scroll ── */
    function releasePreScroll(){
      if(window.scrollY > 0){
        body.classList.remove('pre-scroll');
        // Recalcula los ScrollTriggers para el estado real tras el primer scroll
        if(window.ScrollTrigger) window.ScrollTrigger.refresh();
        window.removeEventListener('scroll', releasePreScroll);
      }
    }
    if(window.scrollY > 0){
      // La página cargó ya desplazada (p. ej. recarga a media altura)
      body.classList.remove('pre-scroll');
    } else {
      window.addEventListener('scroll', releasePreScroll, { passive:true });
    }

    /* ── 1) Ocultar el topbar cuando el #hero-main llega arriba ── */
    function updateTopbar(){
      if(!topbar || !heroMain) return;
      var top = heroMain.getBoundingClientRect().top;
      var h   = topbar.offsetHeight || 0;
      if(top <= h) topbar.classList.add('is-hidden');
      else         topbar.classList.remove('is-hidden');
    }
    window.addEventListener('scroll', updateTopbar, { passive:true });
    window.addEventListener('resize', updateTopbar);
    updateTopbar();
  })();
  


// ============================================================
// 4) Carga diferida del globo 3D (iframe)
// ============================================================
  /* Carga diferida del globo 3D: el iframe es pesado (three.js + GeoJSON del mundo),
     así que su src solo se asigna cuando la sección se acerca al viewport. Esto
     aligera la carga inicial del index.html y mejora el LCP. */
  (function () {
    const frame = document.getElementById('globeFrame');
    const ph    = document.getElementById('globePlaceholder');
    if (!frame || !frame.dataset.src) return;

    let started = false;
    function load() {
      if (started) return;
      started = true;
      frame.addEventListener('load', function () {
        if (ph) { ph.classList.add('hidden'); setTimeout(function () { ph.remove(); }, 700); }
      }, { once: true });
      frame.src = frame.dataset.src;
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { load(); io.disconnect(); } });
      }, { rootMargin: '300px 0px' });   // empieza a cargar ~300px antes de que sea visible
      io.observe(frame);
    } else {
      load();   // navegadores sin soporte: carga directa
    }
  })();
  


// ============================================================
// 5) Carga diferida + auto-alto del impact-panel (iframe)
// ============================================================
  /* Carga diferida + auto-alto del iframe de la herramienta de impacto */
  (function () {
    var frame = document.getElementById('impactFrame');
    if (!frame || !frame.dataset.src) return;
    var started = false;
    function load(){ if (started) return; started = true; frame.src = frame.dataset.src; }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { load(); io.disconnect(); } });
      }, { rootMargin: '400px 0px' });
      io.observe(frame);
    } else { load(); }
    window.addEventListener('message', function (e) {
      if (e.data && e.data.type === 'ipHeight' && e.data.h) { frame.style.height = e.data.h + 'px'; }
    });
  })();
  


// ============================================================
// 6) Carga diferida + auto-alto del gráfico dengue–inundación (iframe)
// ============================================================
  /* Carga diferida + auto-alto del iframe del gráfico dengue–inundación */
  (function () {
    var frame = document.getElementById('graficoFrame');
    if (!frame || !frame.dataset.src) return;
    var started = false;
    function load(){ if (started) return; started = true; frame.src = frame.dataset.src; }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { load(); io.disconnect(); } });
      }, { rootMargin: '400px 0px' });
      io.observe(frame);
    } else { load(); }
    window.addEventListener('message', function (e) {
      if (e.data && e.data.type === 'chartHeight' && e.data.h) { frame.style.height = e.data.h + 'px'; }
    });
  })();


// ============================================================
// 7) Carga diferida + auto-alto de Temas recurrentes / Advertencias (iframe)
// ============================================================
(function () {
  var frame = document.getElementById('taFrame');
  if (!frame || !frame.dataset.src) return;
  var started = false;
  function load(){ if (started) return; started = true; frame.src = frame.dataset.src; }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { load(); io.disconnect(); } });
    }, { rootMargin: '500px 0px' });
    io.observe(frame);
  } else { load(); }
  window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'taHeight' && e.data.h) { frame.style.height = e.data.h + 'px'; }
  });
})();

// ============================================================
// 8b) Carga diferida + auto-alto de Triangulación Cajamarca (iframe)
// ============================================================
(function () {
  var frame = document.getElementById('triFrame');
  if (!frame || !frame.dataset.src) return;
  var started = false;
  function load(){ if (started) return; started = true; frame.src = frame.dataset.src; }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { load(); io.disconnect(); } });
    }, { rootMargin: '500px 0px' });
    io.observe(frame);
  } else { load(); }
  window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'triHeight' && e.data.h) { frame.style.height = e.data.h + 'px'; }
  });
})();

// ============================================================
// 8) Carga diferida del widget externo "Manda tu carta" (iframe)
// ============================================================
(function () {
  var frame = document.getElementById('cartaFrame');
  if (!frame || !frame.dataset.src) return;
  var started = false;
  function load(){ if (started) return; started = true; frame.src = frame.dataset.src; }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { load(); io.disconnect(); } });
    }, { rootMargin: '500px 0px' });
    io.observe(frame);
  } else { load(); }
})();
