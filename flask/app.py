from flask import Flask, request, jsonify 
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+mysqlconnector://root:@localhost:5000/test"
#messi2040:codoacodo2023@messi2040.mysql.pythonanywhere-services.com/messi2040$messi2050"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Registrados(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    mail = db.Column(db.String(100), unique=True)
    clave = db.Column(db.String(50))
    

    def __init__(self, nombre, mail, clave):
        self.nombre = nombre
        self.mail = mail
        self.clave = clave
        

with app.app_context():
    db.create_all()

@app.route("/")
def index():
    return f"app web para registrar fanaticos de MeSSi"

@app.route("/registro", methods=["POST"] )
def registro():
    nombre_recibido = request.json["nombre"]
    mail_recibido = request.json["mail"]
    clave_recibido = request.json["clave"]
    

    nuevo_registro = Registrados(nombre_recibido, mail_recibido, clave_recibido)

    db.session.add(nuevo_registro)
    db.session.commit()
    return "solicitud de post recibida"

@app.route("/registrados", methods=["GET"] )
def productos():
    all_registros = Registrados.query.all()

    data_serializada = []

    for objeto in all_registros:
        data_serializada.append({"id":objeto.id, "nombre":objeto.nombre, "mail":objeto.mail, "clave":objeto.clave})

    return jsonify(data_serializada)

@app.route("/update/<id>", methods=["PUT"] )
def update(id):
    registrado = Registrados.query.get(id)
    nombre = request.json["nombre"]
    mail = request.json["mail"]
    clave = request.json["clave"]
   

    registrado.nombre = nombre
    registrado.mail = mail
    registrado.clave = clave
    
    db.session.commit()
    
    data_serializada = [{"id":registrado.id, "nombre":registrado.nombre, "mail":registrado.mail, "clave":registrado.clave}]
    return jsonify(data_serializada)

@app.route("/borrar/<id>", methods = ["DELETE"])
def borrar(id):
    print(id)
    registrado = Registrados.query.get(id)

    db.session.delete(registrado)
    db.session.commit()

    data_serializada = [{"id":registrado.id, "nombre":registrado.nombre, "mail":registrado.mail, "clave":registrado.clave}]
    return jsonify(data_serializada)
    



if __name__ == "__main__":
    app.run(debug=True)




