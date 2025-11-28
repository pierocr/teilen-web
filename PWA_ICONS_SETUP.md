# Guía para Generar Iconos PWA

La implementación de PWA está completa, pero necesitas generar los iconos en diferentes tamaños para que funcione correctamente.

## Iconos Requeridos

Debes crear los siguientes iconos en la carpeta `public/icons/`:

### Iconos Estándar
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png ⭐ (Requerido por Chrome)
- icon-384x384.png
- icon-512x512.png ⭐ (Requerido por Chrome)

### Iconos Maskable (para Android adaptativo)
- icon-maskable-192x192.png
- icon-maskable-512x512.png

## Herramientas Gratuitas para Generar Iconos

### Opción 1: PWA Asset Generator (Recomendado)
```bash
# Instalar globalmente
npm install -g pwa-asset-generator

# Generar todos los iconos automáticamente desde tu logo
pwa-asset-generator public/logo_teilen.webp public/icons \
  --icon-only \
  --opaque false \
  --padding "calc(50vh - 20%) calc(50vw - 20%)"
```

### Opción 2: Online (Sin instalación)
1. Ve a [https://www.simicart.com/manifest-generator.html/](https://www.simicart.com/manifest-generator.html/)
2. Sube `public/logo_teilen.webp`
3. Descarga el ZIP con todos los iconos
4. Extrae los archivos a `public/icons/`

### Opción 3: RealFaviconGenerator
1. Ve a [https://realfavicongenerator.net/](https://realfavicongenerator.net/)
2. Sube `public/logo_teilen.webp`
3. Configura las opciones PWA
4. Descarga el paquete completo
5. Copia los iconos a `public/icons/`

### Opción 4: Favicon.io
1. Ve a [https://favicon.io/favicon-converter/](https://favicon.io/favicon-converter/)
2. Sube tu logo
3. Descarga los iconos generados
4. Renómbralos según la lista de arriba

## Creación Manual con ImageMagick

Si prefieres hacerlo manualmente con ImageMagick (gratis):

```bash
# Instalar ImageMagick
brew install imagemagick  # macOS
# o
sudo apt-get install imagemagick  # Linux

# Generar todos los tamaños
convert public/logo_teilen.webp -resize 72x72 public/icons/icon-72x72.png
convert public/logo_teilen.webp -resize 96x96 public/icons/icon-96x96.png
convert public/logo_teilen.webp -resize 128x128 public/icons/icon-128x128.png
convert public/logo_teilen.webp -resize 144x144 public/icons/icon-144x144.png
convert public/logo_teilen.webp -resize 152x152 public/icons/icon-152x152.png
convert public/logo_teilen.webp -resize 192x192 public/icons/icon-192x192.png
convert public/logo_teilen.webp -resize 384x384 public/icons/icon-384x384.png
convert public/logo_teilen.webp -resize 512x512 public/icons/icon-512x512.png

# Para maskable icons (con padding del 20%)
convert public/logo_teilen.webp -resize 154x154 -gravity center -extent 192x192 -background white public/icons/icon-maskable-192x192.png
convert public/logo_teilen.webp -resize 410x410 -gravity center -extent 512x512 -background white public/icons/icon-maskable-512x512.png
```

## Verificar la Instalación

1. Asegúrate de que la carpeta `public/icons/` contenga todos los iconos
2. Ejecuta el proyecto: `npm run dev`
3. Abre Chrome DevTools → Application → Manifest
4. Verifica que todos los iconos aparezcan correctamente
5. Prueba el botón "Install app" en Chrome

## ¿Qué Hace Cada Archivo?

- **manifest.json**: Define la configuración de la PWA (nombre, colores, iconos)
- **sw.js**: Service Worker para cache y funcionalidad offline
- **PWAInstaller.tsx**: Componente que registra el service worker
- **layout.tsx**: Incluye los meta tags PWA y el link al manifest

## Testing en Lighthouse

Una vez que agregues los iconos, ejecuta Lighthouse:
1. Chrome DevTools → Lighthouse
2. Selecciona "Progressive Web App"
3. Verás que pasas todas las checks de PWA ✅

## Notas Importantes

- Los iconos maskable deben tener padding del 20% para verse bien en Android
- El color de fondo del manifest (#ffffff) debe coincidir con el background de tus iconos
- El theme color (#019a57) aparecerá en la barra de estado del navegador móvil
- En producción, el service worker se registrará automáticamente
- En desarrollo, el service worker NO se registra (por seguridad)
