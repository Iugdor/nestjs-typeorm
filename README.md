# nestjs-typeorm
A project made with NestJs and TypeORM as ORM


## Start the postgres service
``
docker-compose up -d postgres
``

## Start the pgadmin service
``
docker-compose up -d postgres
``

## Check that the docker is up
``
docker-compose ps
``

## Down the docker
``
docker-compose down
``

## Enter into the postgres service
``
docker-compose exec postgres bash
``

### Enter into the default db
``
psql -h localhost -d my_db -U root
``

