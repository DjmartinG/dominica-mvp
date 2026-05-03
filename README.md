# Dominica MVP — App Sala de Ventas

> Prototipo funcional de la aplicación web para sala de ventas y autocotización del proyecto **Apartamentos Dominica · CG Constructora**, construido para validar la experiencia con Esperanza (estratega marketing) antes del desarrollo definitivo en WordPress por Nativo Digital.

**Stack:** Next.js 15 + Tailwind CSS + TypeScript + Vercel

---

## ⚡ Quick Start (5 minutos)

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en local
npm run dev

# 3. Abrir en navegador
http://localhost:3000
```

Eso es todo para verlo corriendo localmente.

---

## 📦 Estructura del proyecto

```
dominica-mvp/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raíz (head, fonts, html)
│   ├── page.tsx                 # 🏠 Pantalla bienvenida
│   ├── globals.css              # Tokens CSS + tipografías + utilidades
│   ├── sala/page.tsx            # 🏢 Modo Sala (selector asesor)
│   ├── brochure/page.tsx        # 📖 Brochure interactivo (Sesión 2)
│   └── cotizar/page.tsx         # 💰 Cotizador (Sesión 3)
│
├── components/
│   ├── BannerCG.tsx             # Banner navy CG superior
│   ├── FooterDominica.tsx       # Footer con datos + redes
│   └── Logos.tsx                # LogoDominica + LogoCG (placeholders)
│
├── data/                         # JSON con la verdad del proyecto
│   ├── apartamentos.json        # 49 unidades T4 (estado, precios, áreas)
│   ├── listas-precios.json      # 8 listas × 6 colores
│   ├── depositos.json           # 11 depósitos (D-01 a D-10 + sin)
│   ├── asesores.json            # 4 asesores demo
│   ├── reglas-comerciales.json  # Descuento máx, vigencia, separación, etc.
│   └── amenidades.json          # 11 amenidades del catálogo Dominica
│
├── lib/
│   ├── design-tokens.ts         # Paleta, copy, contacto, assets URLs
│   └── utils.ts                 # cn(), formatCOP(), formatArea(), etc.
│
├── public/                       # Assets estáticos
├── tailwind.config.ts           # Paleta Dominica como Tailwind colors
├── next.config.ts               # Config (incluye dominios remotos)
├── tsconfig.json                # TypeScript config
└── package.json
```

---

## 🎨 Sistema de diseño aplicado

Todos los colores, tipografías y copy provienen del archivo `SKILL.md` del sistema de diseño Dominica oficial. Ver `lib/design-tokens.ts` para las constantes exportadas.

**Paleta principal:**
- `#006D68` Verde Caribe (primario)
- `#7BDCB5` Turquesa Frescura (secundario)
- `#0089F7` Azul Cielo (CTA)
- `#222222` Carbón (texto)
- `#FAFAFA` Crema (fondo)
- `#0B2545` Navy CG + `#C9A961` Dorado CG (co-firma corporativa)

**Fuentes:** Aquawax (display, custom de cgconstructora.com) + Roboto/Montserrat/Roboto Slab (Google Fonts).

---

## 🚀 Deploy en Vercel — Paso a paso

### Opción A: vía GitHub (recomendada, deploys automáticos)

#### 1. Subir el código a GitHub

```bash
cd dominica-mvp

# Inicializar git
git init
git add .
git commit -m "Sesión 1: setup inicial + identidad Dominica + pantalla bienvenida"

# Crear repo en github.com (web UI):
# - Nombre: dominica-mvp
# - Privacidad: privado
# - NO inicializar con README (ya lo tenemos)

# Conectar y subir
git remote add origin https://github.com/TU_USUARIO/dominica-mvp.git
git branch -M main
git push -u origin main
```

#### 2. Importar en Vercel

1. Ir a [vercel.com/new](https://vercel.com/new)
2. Click en **"Import Git Repository"**
3. Autorizar GitHub si es la primera vez
4. Seleccionar el repo `dominica-mvp`
5. Vercel detecta automáticamente que es Next.js — **no cambies nada**
6. Click en **"Deploy"**
7. Espera ~2 minutos
8. ¡Listo! Tu URL queda algo como `https://dominica-mvp-cg.vercel.app`

#### 3. Cada vez que cambies el código

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

Vercel detecta el push y redeploya automáticamente. Recibes una URL de preview por cada commit.

#### 4. Apuntar el subdominio `cotizador.cgconstructora.com` (cuando estés listo)

1. En Vercel: ir a **Project Settings → Domains**
2. Agregar dominio: `cotizador.cgconstructora.com`
3. Vercel te da un registro DNS (tipo CNAME) para apuntar
4. En tu panel DNS (donde tienes `cgconstructora.com`):
   ```
   Tipo:  CNAME
   Host:  cotizador
   Valor: cname.vercel-dns.com
   TTL:   3600
   ```
5. Esperar 5-30 min de propagación DNS
6. Vercel emite SSL automáticamente

### Opción B: vía CLI (sin GitHub)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desde la raíz del proyecto
vercel

# Seguir prompts. Primer deploy queda en preview, después:
vercel --prod
```

---

## 🧪 Probar localmente con tablet

Para que Esperanza pruebe el MVP en tu tablet sin estar conectada a internet:

```bash
# 1. Correr en modo dev escuchando en todas las interfaces
npm run dev -- -H 0.0.0.0

# 2. Encontrar tu IP local (Mac):
ipconfig getifaddr en0
# Windows:
ipconfig | findstr IPv4

# 3. Desde la tablet, en el mismo WiFi:
http://TU_IP_LOCAL:3000
```

Con el deploy en Vercel ya no necesitas esto, pero sirve para iteración rápida.

---

## 🛠 Comandos útiles

| Comando | Qué hace |
|---|---|
| `npm install` | Instala todas las dependencias (primera vez) |
| `npm run dev` | Servidor desarrollo en localhost:3000 con hot reload |
| `npm run build` | Build de producción (verifica que compile sin errores) |
| `npm start` | Corre el build de producción local (después de `build`) |
| `npm run lint` | Verifica calidad de código (ESLint) |

---

## 📝 Estado del MVP por Sesión

### ✅ Sesión 1 — Fundamentos (completada)
- Setup proyecto Next.js 15 + Tailwind + TypeScript
- Tokens del sistema de diseño Dominica
- Componentes base (BannerCG, FooterDominica, Logos)
- 6 archivos JSON con la data real del proyecto T4
- Pantalla bienvenida con identidad completa
- Modo Sala con selector de asesor
- Placeholders navegables para Brochure y Cotizador

### ⏳ Sesión 2 — Brochure interactivo
- Hero con carrusel de banners
- Sección "El Proyecto" con 4 párrafos del banco de copy
- Ubicación (Calle 70 No. 50-97 Pereira) con mapa
- Tipologías (galería con planos oficiales)
- Amenidades (grid con 11 amenidades del catálogo)
- Recorrido 360° Kuula embebido
- Etapas del proyecto

### ⏳ Sesión 3 — Cotizador funcional
- Selector apto disponible (filtrando vendidos automáticamente)
- Selección parqueadero + depósito
- 3 planes de pago (30/70, Contado, Variable)
- Validación descuentos según política
- Cálculo en tiempo real del valor neto y plan de cuotas

### ⏳ Sesión 4 — Outputs + Deploy producción
- Generación PDF de cotización
- Botón WhatsApp con mensaje pre-cargado
- Captura de lead (localStorage)
- Optimización mobile/tablet
- Documento `MVP-to-Production.md` para Nativo

---

## 🔁 Cómo iterar con feedback de Esperanza

1. Tras cada sesión, te entrego un commit + push automático en Vercel
2. Compartes la URL Vercel con Esperanza por WhatsApp/email
3. Ella prueba en su dispositivo y comenta lo que vea
4. En la siguiente sesión incorporamos sus ajustes
5. Push → nueva URL Vercel actualizada → ella valida

---

## 🐛 Troubleshooting común

### `npm install` falla
- Verifica que tienes Node.js 18.17+ instalado: `node --version`
- Borra `node_modules` y `package-lock.json` y reintenta

### Las imágenes no cargan
- Las URLs apuntan a cgconstructora.com. Si bajan el sitio, agregar imágenes localmente en `public/images/`
- Verificar que `next.config.ts` tenga el dominio en `remotePatterns`

### Las fuentes Aquawax no cargan
- Son woff2 servidas por cgconstructora.com vía `@font-face` en `globals.css`
- Si fallan, el sistema cae automáticamente a Montserrat/Arial

### Vercel falla en el build
- Correr `npm run build` localmente primero para detectar errores de TypeScript
- Logs detallados en la pestaña "Deployments" del dashboard Vercel

### Cambios no se reflejan
- En dev: hot reload debería ser automático. Si no, refrescar con Cmd/Ctrl+R
- En Vercel: cada `git push` redeploya. Verificar pestaña "Deployments"

---

## 🔐 Variables de entorno (futuras sesiones)

Cuando agreguemos email transaccional o servicios externos, crearemos `.env.local` (NO se sube a Git):

```bash
# .env.local — ejemplo (Sesión 4 en adelante)
RESEND_API_KEY=re_xxxxxxxxxxx
WHATSAPP_BUSINESS_TOKEN=xxxxxxx
```

En Vercel: Settings → Environment Variables → agregar las mismas.

---

## 👥 Roles del equipo

| Persona | Rol | Acceso necesario |
|---|---|---|
| **Martín** (CG) | Product Owner | Vercel Owner, GitHub Owner del repo |
| **Esperanza** | Estratega marketing — valida UX/copy/visual | URL Vercel del preview |
| **Nativo Digital** | Implementación final WordPress | Repo (read-only) + URL MVP final |
| **Asistente IA (yo)** | Construcción técnica del MVP | Acceso a este workspace |

---

## 📚 Documentos relacionados (en la misma carpeta)

- `01_Brief_Tecnico_App_SalaVentas_Dominica.md` — Brief para Nativo Digital
- `SKILL.md` — Sistema de diseño Dominica oficial
- `Cotizador_Dominica_T4_Marca_Oficial.xlsx` — Inventario fuente de verdad
- `DOMINICA_BRAND_EXTRACTION_REPORT.md` — Extracción completa de marca

---

## 📞 Soporte

Cualquier ajuste a este MVP se gestiona en la conversación con el asistente IA.
Cuando esté listo el handoff a Nativo Digital, ellos consultarán el código fuente como referencia para construir la versión WordPress.

---

**Versión:** 0.1.0 (Sesión 1)
**Última actualización:** Mayo 2026
**Licencia:** Propiedad de CG Constructora S.A.S.
