# llista-compra-express
Llista de la compra amb express

npm intall

mongodb+srv://<db_username>:<db_password>@cluster0.pdbng6o.mongodb.net/?appName=Cluster0

mongodb+srv://usuari:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0

### 3.5.1 Mostrar una col·leció
Mostrar tots els productes:
db.productes.find()

Mostrar tots els productes en un formatejat més llegible:
db.productes.find().pretty()

### 3.5.2 Cercar un registre específic
Cercar un producte pel nom exacte:
db.productes.find({ nom: "orxata" })

Cercar amb expressió regular (case insensitive):
db.productes.find({ nom: /orxata/i })

Cercar productes que comencin per "or":
db.productes.find({ nom: /^or/ })

### 3.5.3. Afegir un nou registre
Inserir un sol producte:
db.productes.insertOne({ nom: "fartons" })

Inserir múltiples productes:
db.productes.insertMany([
    { nom: "napolitana" },
    { nom: "xuxo" },
    { nom: "xurro" }
])

### 3.5.5 Esborrar un registre
Esborrar un sol producte:
db.productes.deleteOne({ nom: "fartons" })

Esborrar múltiples productes:
db.productes.deleteMany({ nom: /^fart/ })



### ltres operacions útils
Comptar documents (registres)
db.productes.countDocuments()

Ordenar resultats
db.productes.find().sort({ nom: 1 })  // ASC
db.productes.find().sort({ nom: -1 }) // DESC

Limitar resultats
db.productes.find().limit(5)

