# Auditoría de Diseño · MVP Dominica
## Plan de mejoras inspirado en inmobiliarias premium de Dubai

**Fecha:** Mayo 2026 · **Versión:** 1.0
**Referentes analizados:** Emaar Properties, Sobha Realty, Aldar Properties

---

## 10 Patrones Premium Identificados

| # | Patrón | Visto en | Aplicabilidad Dominica |
|---|---|---|---|
| 1 | **Hero Video Dinámico** | Emaar, Sobha, Aldar | Render aéreo del proyecto en loop como fondo |
| 2 | **Tipografía Serif Elegante (Headlines)** | Sobha, Aldar | Cambiar H1 a Playfair Display o Cormorant |
| 3 | **Fotografía Lifestyle (no solo producto)** | Emaar, Aldar | Personas disfrutando amenidades, no solo edificios |
| 4 | **Navegación Ghost (top transparente)** | Emaar, Sobha | Banner CG transparente hasta scroll |
| 5 | **Espacio Blanco Agresivo** | Todos | py-20 a py-32 entre secciones |
| 6 | **CTAs Sutiles (outline + hover reveal)** | Aldar, Emaar | Cards modo outline en hero |
| 7 | **Datos Numéricos Tipografía Statement** | Emaar, Sobha | Stats en text-4xl con serif |
| 8 | **Overlay Inteligente (no opaco)** | Todos | Reducir overlay 40% → 25% |
| 9 | **Footer Estructurado Limpio** | Aldar | Reducir italics, mantener jerarquía |
| 10 | **Microinteracciones Sutiles** | Todos | Hover lift, shadow elevation, transitions 300-400ms |

---

## Auditoría por Pantalla

### Portada (8 hallazgos)
1. Banner CG superior muy pesado (debería ser ghost)
2. Logo Dominica en hero muy grande (cederle espacio al H1)
3. H1 en sans-serif (necesita serif premium)
4. Overlay posiblemente >40% (foto se pierde)
5. Sección stats sin respiración (py-6 muy comprimido)
6. Cards Modo Sala/Web muy prominentes (deberían ser outline)
7. Slogan italic completo (italics parcial sería más elegante)
8. CTA flotante azul cielo muy fuerte (sutil cuando no en foco)

### Brochure (8 hallazgos)
1. Hero carrusel: indicadores podrían ser más claros (numeración 1/3 + flechas)
2. Overlay del carrusel demasiado opaco
3. Secciones comprimidas (sin py vertical suficiente)
4. Headers en MAYÚSCULAS (Title Case con serif sería más premium)
5. Cards amenidades sin hover state distintivo
6. Lightbox podría ser más smooth
7. Iframe Kuula sin marco premium
8. Timeline de etapas muy plano

### Cotizador (3 hallazgos)
1. Estructura técnica sólida ✓
2. Spacing correcto ✓
3. Falta jerarquía en el resumen económico (number statement)

---

## Top 15 Mejoras Priorizadas

### 🟢 Quick Wins (Alto impacto, bajo esfuerzo) — Bloque 1

| # | Mejora | Pantalla | Esfuerzo | Impacto |
|---|---|---|---|---|
| 1 | H1 Hero a Serif elegante (Playfair Display) | Portada | Bajo | **Alto** |
| 2 | Aumentar py vertical secciones (py-6→py-20) | Brochure | Bajo | **Alto** |
| 3 | Reducir tamaño logo Dominica hero (h-24→h-16) | Portada | Bajo | Medio |
| 4 | Reducir overlay hero (40%→25%) | Portada+Brochure | Bajo | Medio |
| 5 | Stats numéricos en text-4xl + serif | Portada | Bajo | Medio |

### 🟡 Mejora Media (Alto impacto, esfuerzo medio) — Bloque 2

| # | Mejora | Pantalla | Esfuerzo | Impacto |
|---|---|---|---|---|
| 6 | Banner CG ghost (transparente hasta scroll) | Global | Medio | **Alto** |
| 7 | Cards Modo Sala/Web a outline blanco | Portada | Medio | **Alto** |
| 8 | Hover lift + shadow en cards amenidades | Brochure | Bajo | Medio |
| 9 | Italics parcial en slogan ("isla caribeña") | Portada | Bajo | Bajo |
| 10 | Línea separadora sutil entre secciones | Brochure | Bajo | Medio |

### 🔴 Ambicioso (Alto impacto, alto esfuerzo) — Bloque 3

| # | Mejora | Pantalla | Esfuerzo | Impacto |
|---|---|---|---|---|
| 11 | Hero Video Background (render 3D loop) | Portada | **Alto** | **Alto** |
| 12 | Fotografía lifestyle (personas + vistas) | Portada+Brochure | Alto | Alto |
| 13 | Marco premium dorado en iframe Kuula | Brochure | Medio | Bajo |
| 14 | Timeline etapas con iconos decorativos | Brochure | Medio | Medio |
| 15 | Resumen económico con number statement | Cotizador | Medio | Medio |
