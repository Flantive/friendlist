# friendlist


curl -i -X GET -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:8080/friendlist/1 -w %{time_total}\\n

curl -i -X POST -H "Content-Type:application/json" http://localhost:8080/friendship/ -d '{"uid1": 6,"uid2": 222}' -w %{time_total}\\n

curl -i -X DELETE http://localhost:8080/friendship/875-1000 -w %{time_total}\\n