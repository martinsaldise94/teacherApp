# IMPORTANTE. NO SE POR QUE ME ESTABA DANDO PROBLEMAS CON EL TOKEN
# EStas son las consultas sin usarlo. EN las lineas 37,38 y 39 he dejado comentado el isAuth para que funcionesn
#  Si los descomentas, tenemos la ruta protegida


# Users nuevos con POST

curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{
       "email": "profe5@escuela.com",
       "password": "hola",
       "type": "user",
       "active": true
     }'


curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{
       "email": "profe6@escuela.com",
       "password": "adios",
       "type": "user",
       "active": true
     }'


 # Teachers nuevos con POST    

 curl -X POST http://localhost:3000/api/teachers \
     -H "Content-Type: application/json" \
     -d '{
        "dni": "66666666F",
       "name": "Justin",
       "last_name": "Gaethje",
       "date_of_birth": "1991-05-15",
       "user_id": 6
     }'

      curl -X POST http://localhost:3000/api/teachers \
     -H "Content-Type: application/json" \
     -d '{
        "dni": "77777777G",
       "name": "Alex",
       "last_name": "Pereira",
       "date_of_birth": "1991-05-15",
       "user_id": 7
     }'

# Students nuevos con POST

curl -X POST http://localhost:3000/api/students \
     -H "Content-Type: application/json" \
     -d '{
       "dni": "10000011A",
       "name": "Joseph",
       "last_name": "Joestar",
       "date_of_birth": "1935-01-01",
       "teacher_id": 6
     }'

curl -X POST http://localhost:3000/api/students \
     -H "Content-Type: application/json" \
     -d '{
       "dni": "10000012B",
       "name": "Arthur",
       "last_name": "MOrgan",
       "date_of_birth": "1856-01-01",
       "teacher_id": 7
     }'

curl -X POST http://localhost:3000/api/students \
     -H "Content-Type: application/json" \
     -d '{
       "dni": "10000013C",
       "name": "Cristiano",
       "last_name": "Ronaldo",
       "date_of_birth": "1983-01-01",
       "teacher_id": 1
     }'

curl -X POST http://localhost:3000/api/students \
     -H "Content-Type: application/json" \
     -d '{
       "dni": "10000014M",
       "name": "Mario",
       "last_name": "Bros",
       "date_of_birth": "1975-01-01",
       "teacher_id": 5
     }'

# Ver todos los registros

curl -X GET http://localhost:3000/api/users
curl -X GET http://localhost:3000/api/teachers
curl -X GET http://localhost:3000/api/students

# Ver registros concretos

curl -X GET http://localhost:3000/api/users/5
curl -X GET http://localhost:3000/api/teachers/2
curl -X GET http://localhost:3000/api/students/7

# Actualizar registros

curl -X PUT http://localhost:3000/api/users/3 \
     -H "Content-Type: application/json" \
     -d '{
       "active": false
     }'

curl -X PUT http://localhost:3000/api/teachers/6 \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Manolo"
     }'

curl -X PUT http://localhost:3000/api/students/4 \
     -H "Content-Type: application/json" \
     -d '{
       "name": "SInNombre"
     }'

# BOrrar algun registro  


curl -X DELETE http://localhost:3000/api/students/3

curl -X DELETE http://localhost:3000/api/users/3 # NO funciona porque tiene teacher asociado
curl -X DELETE http://localhost:3000/api/teachers/3 # NO funciona porque tiene student asociado

# Peticiones con resrticcion

curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{
       "email": "mailchungo",         
       "password": "password123",
       "type": "user",
       "active": true
     }' #mail malo

     curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{      
       "password": "password123",
       "type": "user",
       "active": true
     }' #faltan campos

     curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{
       "email": "jefe@escuela.com",         
       "password": "password123",
       "type": "user",
       "active": true
     }' 
     # repetido el mail

    # ver alumnos de cada prfesor

  curl -X GET http://localhost:3000/api/teachers/3/students # sale que esta inactivo
  curl -X GET http://localhost:3000/api/teachers/5/students

  # ver si está activo y que devuelva el campo active

  curl -X GET http://localhost:3000/api/users/5/active

curl -X POST http://localhost:3000/api/users/5/active #COmo este está activo, me devuelve un mensaje informando , se diferencia del get en que ahí devuelve un JSON


 curl -X POST http://localhost:3000/api/users/3/active #Devuelve los datos y activa al usuario, que antes no estaba


#  Ahora protegemos las rutas de /api. Primero conseguimos el token

curl -X POST http://localhost:3000/api/token \
     -H "Content-Type: application/json" \
     -d '{
       "username": "jefe@escuela.com",
       "password": "admin"
     }'

# Hacemos un nuevo user usando el token, ya que si no no me deja

curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiamVmZUBlc2N1ZWxhLmNvbSJ9LCJpYXQiOjE3Njk0MTU1NzgsImV4cCI6MTc2OTQxNjQ3OH0.8lkexp6aRREW9yx2oDATRuGpxmUUgHaCrRQCyxwTfqo" \
     -d '{
       "email": "profe8@escuela.com",
       "password": "oli",
       "type": "user",
       "active": true
     }'
# actualizo
curl -X PUT http://localhost:3000/api/users/6 \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiamVmZUBlc2N1ZWxhLmNvbSJ9LCJpYXQiOjE3Njk0MTU1NzgsImV4cCI6MTc2OTQxNjQ3OH0.8lkexp6aRREW9yx2oDATRuGpxmUUgHaCrRQCyxwTfqo" \
     -d '{
       "email": "mailnuev@escuela.com"
     }'

curl -X GET http://localhost:3000/api/users #no funciona porque no tengo el token