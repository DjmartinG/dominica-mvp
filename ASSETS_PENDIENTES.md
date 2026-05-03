# Assets Pendientes para Completar Bloque 3 al 100%

> Lo que necesitamos pedir a Triple A / equipo de diseño / fotografía profesional
> para llevar el MVP al nivel premium 100%.

---

## 🎬 Hero Video (Mejora #11 — Alto impacto)

**Qué necesitamos:** 1 video MP4 de 20-40 segundos con render aéreo del proyecto Dominica completo (las 5 torres + amenidades + ubicación). En loop seamless (que el final empate con el inicio).

**Especificaciones técnicas:**
- Formato: `.mp4` (codec H.264) o `.webm` (codec VP9)
- Resolución: **1920×1080** mínimo (Full HD), idealmente **3840×2160** (4K) para retina
- Bitrate: 5-10 Mbps (balance calidad/peso)
- Duración: 20-40 segundos
- Sin audio (los hero videos siempre van mute)
- Tamaño objetivo: **<8 MB** (para carga rápida)
- Naming: `hero-aerial-dominica.mp4`

**Contenido sugerido del video:**
1. Apertura aérea sobre Pereira con city skyline (3s)
2. Transición a vista cenital del conjunto Dominica con las 5 torres (5s)
3. Descenso suave hacia las amenidades (piscina, terrazas) (10s)
4. Recorrido por interior renderizado (lobby, vista desde balcón) (10s)
5. Cierre con plano frontal del proyecto y atardecer caribeño (5s)

**Dónde se usará:** Background del Hero en portada y brochure, reemplazando el carrusel de banners estáticos actual.

**Dónde subirlo cuando lo tengamos:**
- Subir a `public/videos/hero-aerial-dominica.mp4` en el repo
- O hostear en Vimeo/CDN externo y referenciar la URL

---

## 📸 Fotografía Lifestyle (Mejora #12 — Alto impacto)

**Qué necesitamos:** 5-8 fotografías profesionales o renders de alta calidad mostrando **personas disfrutando los espacios**, no solo el producto vacío.

**Composiciones sugeridas:**

1. **Pareja en balcón al atardecer** mirando hacia el horizonte de Pereira con copas de vino. Prox apto Dominica.

2. **Familia en piscina caribeña** (padres con niños, ambiente cálido tropical). Reemplaza la foto actual de piscina vacía.

3. **Personas trabajando en coworking** (1-2 personas con laptops, café, luz natural). Llenaría el placeholder actual.

4. **Grupo en terraza BBQ** al atardecer, brindando, parrilla. Llenaría placeholder actual.

5. **Yoga/meditación en terraza solarium** (mujer en pose, vista al horizonte). Estilo wellness/lifestyle.

6. **Lobby con concierge atendiendo cliente** (interacción humana, no espacio frío).

7. **Niños jugando en cancha multipropósito** (alegría, vida, comunidad).

8. **Pareja mayor en cava** (copas, ambiente íntimo, estilo de vida sofisticado).

**Especificaciones técnicas:**
- Formato: `.jpg` o `.webp` (para web optimization)
- Resolución mínima: **2400×1600px** (8 megapíxeles)
- Aspect ratios: **16:9** (horizontal hero), **4:5** (vertical card), **1:1** (cuadrado grid)
- Estilo: Luz natural cálida, tonos caribeños/dorados, profundidad de campo
- Personas: Diverso (edades, estilos), feliz, natural — NO modelos posados rígidos
- Naming: `lifestyle-balcon-atardecer.jpg`, `lifestyle-piscina-familia.jpg`, etc.

**Dónde se usarán:**
- Hero del brochure (reemplazar banners actuales)
- Cards de amenidades (reemplazar fallbacks "Render próximo")
- Sección "El Proyecto" como imagen principal
- Modal detalle de amenidades

---

## 🖼 Renders Específicos por Amenidad (Mejora #12 secundaria)

Las siguientes amenidades NO tienen imagen oficial (actualmente muestran fallback con icono):

1. **Coworking** — Espacio con escritorios, conectividad, plantas
2. **Zona BBQ** — Parrilla, mesa exterior, mobiliario tropical
3. **Cancha Multipropósito** — Cancha visible, líneas, redes
4. **Sala de Cine** — Sillones, pantalla, ambiente acogedor
5. **Salón de Juegos** — Mesa de pool/futbolín, ambiente social
6. **Terraza Ofuro** — Tina ofuro tradicional, vista, plantas

Para cada una idealmente: **1 foto/render principal** (1600×1067px mínimo, JPG).

---

## 🏷 Logo Dominica versión Color (Pendiente desde Sesión 1)

Actualmente solo tenemos el logo blanco (`blanco.png` para fondos oscuros). Falta:

- **Logo Dominica color** (sobre fondo claro): PNG con transparencia, idealmente SVG vectorial
- Resolución mínima: 1200×500px

**Dónde se usará:** Modo Sala (selector asesor sobre fondo crema), cotizador en cliente, footer en versión clara.

---

## 📝 Cómo me los pasas

Cuando tengas los assets:

1. **Subir cada uno** al repo del proyecto en estas rutas:
   ```
   dominica-mvp/public/videos/hero-aerial-dominica.mp4
   dominica-mvp/public/images/lifestyle/balcon-atardecer.jpg
   dominica-mvp/public/images/lifestyle/piscina-familia.jpg
   ...etc
   dominica-mvp/public/images/amenidades/coworking.jpg
   dominica-mvp/public/images/amenidades/bbq.jpg
   ...etc
   dominica-mvp/public/images/logo-dominica-color.png
   ```

2. **Avisame en chat** y yo:
   - Actualizo `data/amenidades.json` con las nuevas URLs
   - Reemplazo banner.jpg estático por video en HeroCarousel
   - Actualizo design-tokens.ts con la URL del logo color
   - Actualizo Logos.tsx para usar la versión color cuando aplique

---

## 🔁 Mientras conseguimos los assets

El MVP funciona PERFECTAMENTE sin estos assets — solo se ven los placeholders elegantes con iconos. Esperanza puede validar la experiencia completa hoy mismo. Los assets son para "rematar" el nivel premium.

**Prioridad sugerida** (en caso de presupuesto limitado):
1. Logo color (1 día, gratis si lo hace tu diseñador) — **CRÍTICO**
2. 2-3 fotos lifestyle hero (1 día de fotógrafo) — **ALTO IMPACTO**
3. Renders de las 6 amenidades faltantes (Triple A) — **MEDIO IMPACTO**
4. Hero video aéreo (productora 3D) — **WOW FACTOR pero caro**

---

**Documento generado:** Mayo 2026
**Versión MVP relacionada:** v0.3 (post-Bloque 3 sin assets externos)
