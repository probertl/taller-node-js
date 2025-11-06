const http = require('http');
const url = require('url');
const querystring = require('querystring');


// Estructura de dades: array per emmagatzemar els elements
let llistaCompra = [];


// Funció per generar HTML bàsic
function generarHTML(titol, contingut) {
 return `
<!DOCTYPE html>
<html lang="ca">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>${titol}</title>
   <style>
       body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
       h1 { color: #333; }
       form { margin: 20px 0; }
       input[type="text"] { padding: 8px; width: 300px; }
       button { padding: 8px 15px; background: #007cba; color: white; border: none; cursor: pointer; }
       button:hover { background: #005a87; }
       ul { list-style-type: none; padding: 0; }
       li { padding: 8px; margin: 5px 0; background: #f5f5f5; display: flex; justify-content: space-between; }
       .eliminar { background: #ff4444; color: white; border: none; padding: 5px 10px; cursor: pointer; }
       .eliminar:hover { background: #cc0000; }
       .missatge { padding: 10px; margin: 10px 0; border-radius: 4px; }
       .exit { background: #d4edda; color: #155724; }
       .error { background: #f8d7da; color: #721c24; }
   </style>
</head>
<body>
   <h1>${titol}</h1>
   ${contingut}
</body>
</html>
 `;
}


// Funció per mostrar la llista de la compra
function mostrarLlista() {
 if (llistaCompra.length === 0) {
   return '<p>La llista de la compra està buida.</p>';
 }


 let html = '<ul>';
 llistaCompra.forEach((item, index) => {
   html += `
     <li>
       <span>${item}</span>
       <form method="POST" action="/eliminar" style="display: inline;">
         <input type="hidden" name="index" value="${index}">
         <button type="submit" class="eliminar">Eliminar</button>
       </form>
     </li>
   `;
 });
 html += '</ul>';
 return html;
}


// Funció per processar les peticions
function processarPeticio(req, res) {
 const parsedUrl = url.parse(req.url, true);
 const pathname = parsedUrl.pathname;
 const method = req.method;


 console.log(`${method} ${pathname}`);


 // Configurar capçaleres CORS per permetre peticions des del mateix origen
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
 res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


 if (method === 'OPTIONS') {
   res.writeHead(200);
   res.end();
   return;
 }


 // Rutes de l'aplicació
 if (pathname === '/' && method === 'GET') {
   // Pàgina principal
   const contingut = `
     <form method="POST" action="/afegir">
       <input type="text" name="item" placeholder="Afegir producte a la llista..." required>
       <button type="submit">Afegir</button>
     </form>
     ${mostrarLlista()}
     <form method="POST" action="/netejar">
       <button type="submit" style="background: #ff4444;">Netejar tota la llista</button>
     </form>
   `;
  
   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
   res.end(generarHTML('Llista de la Compra', contingut));
  } else if (pathname === '/afegir' && method === 'POST') {
   // Processar afegir element
   let body = '';
   req.on('data', chunk => {
     body += chunk.toString();
   });
  
   req.on('end', () => {
     const postData = querystring.parse(body);
     const nouItem = postData.item.trim();
    
     if (nouItem) {
       llistaCompra.push(nouItem);
       console.log(`Element afegit: ${nouItem}`);
      
       // Redirigir a la pàgina principal amb missatge d'èxit
       res.writeHead(302, { 'Location': '/?missatge=Element%20afegit%20correctament' });
       res.end();
     } else {
       // Redirigir amb missatge d'error
       res.writeHead(302, { 'Location': '/?error=No%20s%27ha%20pogut%20afegir%20l%27element' });
       res.end();
     }
   });
  } else if (pathname === '/eliminar' && method === 'POST') {
   // Processar eliminar element
   let body = '';
   req.on('data', chunk => {
     body += chunk.toString();
   });
  
   req.on('end', () => {
     const postData = querystring.parse(body);
     const index = parseInt(postData.index);
    
     if (!isNaN(index) && index >= 0 && index < llistaCompra.length) {
       const elementEliminat = llistaCompra.splice(index, 1)[0];
       console.log(`Element eliminat: ${elementEliminat}`);
      
       res.writeHead(302, { 'Location': '/?missatge=Element%20eliminat%20correctament' });
       res.end();
     } else {
       res.writeHead(302, { 'Location': '/?error=Index%20no%20vàlid' });
       res.end();
     }
   });
  } else if (pathname === '/netejar' && method === 'POST') {
   // Netejar tota la llista
   llistaCompra = [];
   console.log('Llista netejada');
  
   res.writeHead(302, { 'Location': '/?missatge=Llista%20neteja%20correctament' });
   res.end();
  } else if (pathname === '/api/llista' && method === 'GET') {
   // API per obtenir la llista en format JSON
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify(llistaCompra));
  } else {
   // Pàgina no trobada
   res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
   res.end(generarHTML('Pàgina no trobada', '<p>La pàgina sol·licitada no existeix.</p>'));
 }
}


// Crear el servidor
const server = http.createServer(processarPeticio);


// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
 console.log(`Servidor escoltant al port ${PORT}`);
 console.log(`Accedeix a http://localhost:${PORT} per veure l'aplicació`);
});
