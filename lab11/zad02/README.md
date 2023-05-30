## Budowanie obrazu:
`docker build -t piterson25/baza_danych:latest ./baza_danych`

`docker push piterson25/baza_danych:latest`

`docker build -t piterson25/mikroserwis_a:latest ./mikroserwis_a`

`docker push piterson25/mikroserwis_a:latest`

`docker build -t piterson25/mikroserwis_b:latest ./mikroserwis_b`

`docker push piterson25/mikroserwis_b:latest`

## Kubernetes:
`kubectl apply -f mikroserwis_a_deployment.yaml`

`kubectl apply -f mikroserwis_a_service.yaml`

`kubectl apply -f mikroserwis_b_deployment.yaml`

`kubectl apply -f mikroserwis_b_service.yaml`

`kubectl apply -f baza_danych_deployment.yaml`

`kubectl apply -f baza_danych_pvc.yaml`

`kubectl get pods`

`kubectl get services`