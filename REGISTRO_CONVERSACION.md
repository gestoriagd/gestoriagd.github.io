# Resumen y Registro de la Conversación — Proyecto GD Gestoría®

Documento guardado localmente en el repositorio para que conserves el registro completo de decisiones, explicaciones y pasos del proyecto.

---

## 1. El Proyecto y Decisiones Iniciales

- **Brief original**: Sitio web para GD Gestoría® (Lic. Graciela Duré, Mandataria Registral Automotor Matriculada).
- **Enfoque inicial vs final**:
  - Se analizó si convenía un backend propio (Node + Express + base de datos SQLite/Postgres) o una web estática orientada a WhatsApp.
  - **Decisión acordada**: Toda la interacción va directa a WhatsApp (sin formularios con backend propio), reduciendo costos a $0 y eliminando riesgos y mantenimiento innecesario.
- **Identidad visual**:
  - Paleta oficial: Azul marino (`#0b2a5b`), Dorado (`#f5b81c`) y Blanco.
  - Tipografías: *Montserrat* e *Inter*.
  - Logo oficial extraído y QR de Instagram integrado.

---

## 2. Modificaciones Solicitadas y Aplicadas

1. **Corrección de nombre**:
   - Se actualizó de "Lic. Graciela Durá" a **"Lic. Graciela Duré"** en todas las secciones (SEO metadata, schema JSON-LD, sección Nosotros y Footer).
2. **Nueva Pregunta Frecuente (FAQ)**:
   - Se incorporó la pregunta:
     > **¿Por qué solicitan primero un Informe de Dominio?**  
     > *El primer paso de nuestra gestión es conocer la situación registral del vehículo. Para ello solicitamos un Informe de Dominio, que funciona como una verdadera “fotografía o radiografía” del vehículo: nos permite conocer su situación dominial y registral, y detectar información relevante antes de iniciar una gestión. A partir de ese informe podemos analizar el caso y asesorarte sobre el trámite que corresponde realizar, evitando iniciar gestiones innecesarias o presentar documentación incorrecta. En GD Gestoría® primero analizamos, después asesoramos y finalmente gestionamos.*

---

## 3. Arquitectura, Riesgos y Mantenimiento

### ¿Qué riesgos hay con esta forma de crear la web?
- **Seguridad**: Máxima. Al no tener base de datos, PHP ni servidores backend dinámicos, es imposible que inyecten SQL o hackeen bases de clientes. No se almacenan datos privados.
- **Costos**: $0 permanentes en GitHub Pages.
- **Disponibilidad**: Servida por la red global de Microsoft/GitHub (CDN) con 99.9% de uptime garantizado.

### ¿Cómo se hace el mantenimiento?
- **Opción fácil desde GitHub Web**: Entrar a `index.html` en el repositorio, hacer clic en el lápiz, cambiar el texto deseado y pulsar *Commit changes*.
- **Opción local**: Editar con cualquier editor en la PC, correr `node scripts/check.mjs` y hacer `git push`.

---

## 4. Pasos de Despliegue en GitHub Pages

1. **Repositorio de la Organización**:
   - Creado en: `https://github.com/gestoriagd/gestoriagd`
2. **Visibilidad**:
   - Debe ser **Público** para usar GitHub Pages gratis (Settings > Danger Zone > Change visibility > Make public).
3. **Activar Pages**:
   - Settings > Pages > Source: *Deploy from a branch*, Branch: *main* / *(root)* > Save.
4. **URL de acceso**:
   - `https://gestoriagd.github.io/gestoriagd/` (o si el repo se renombra a `gestoriagd.github.io`, la URL pasa a ser directamente `https://gestoriagd.github.io`).


---

## 5. Cómo vincular un Dominio Propio (ej. gestoriagd.com.ar)

El día que se compre un dominio propio, se vincula en solo 2 pasos:

### Paso A: En el proyecto local (con Git)
1. Se crea un archivo llamado `CNAME` (sin extensión) con el dominio adentro:
   ```powershell
   Set-Content -Path CNAME -Value "www.gestoriagd.com.ar"
   ```
2. Se comitea y sube a GitHub:
   ```powershell
   git add CNAME
   git commit -m "feat: add custom domain CNAME"
   git push origin main
   ```

### Paso B: En el proveedor de DNS donde compraste el dominio (NIC.ar, DonWeb, etc.)
En la zona DNS se agregan estos registros apuntando a GitHub Pages:
- **Registro CNAME**:
  - Host: `www`
  - Destino: `gestoriagd.github.io`
- **Registros A** (para acceso sin `www`):
  - Host: `@` (o en blanco)
  - IPs:
    - `185.199.108.153`
    - `185.199.109.153`
    - `185.199.110.153`
    - `185.199.111.153`

### Paso C: HTTPS automático
En GitHub (**Settings > Pages**), una vez propagados los DNS, se tilda **Enforce HTTPS** y GitHub emite el certificado SSL (candado verde) sin costo.
