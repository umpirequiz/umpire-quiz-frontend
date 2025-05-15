# Baseball Quiz

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.4.

## Mock back end
Use json-server for this. We have a data file `data.json` and routes in `routes.json`.

Run:
```console
json-server data.json --routes routes.json
```

Set `env_file` in `environment.development.ts` to `"env_local_mock.json"`.

## Local back end
Run the question-service locally (e.g. using liberty:dev). 

Set `env_file` in `environment.development.ts` to `"env_local.json"`.

## Locally test multi-language
First build: `ng build --localize`

The cd into `umpire-quiz-frontend\dist\umpire-quiz\browser` and run:

```console
npx http-server -p 4200
```


## Local build and deploy
To build the app, create the docker image and push it, run:

```shell
ng build --aot --output-hashing=all 
```

```shell
docker build -t bramjanssens/umpire-quiz-frontend . 
```
```shell
docker push bramjanssens/umpire-quiz-frontend
```

To run the image, run:
```shell
docker run -p 8080:80 bramjanssens/umpire-quiz-frontend
```
