# Commande Docker Compose pour Construire et Démarrer le Projet

Cette commande est utilisée pour construire et démarrer les services définis dans le fichier `docker-compose.yml` du projet. Elle garantit que les conteneurs sont construits avec les dernières modifications et s'exécutent en mode détaché.

## Explication de la Commande

- `docker compose up` : Démarre les services définis dans le fichier `docker-compose.yml`.
- `--build` : Force une reconstruction des images avant de démarrer les conteneurs.
- `-d` : Exécute les conteneurs en mode détaché (en arrière-plan).

## Utilisation

Exécutez la commande suivante dans le répertoire racine de votre projet où se trouve le fichier `docker-compose.yml` :

```docker compose up --build -d```