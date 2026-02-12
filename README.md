# Baseball Quiz

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.4.

## Mock back end
Use json-server for this. 

1. Run `json-server data.json`. We have rewrite rules configured in `proxy.conf.json`. 
2. Set `env_file` in `environment.development.ts` to `"env_local_mock.json"`.  
3. Run the app with `npm run dev`.

## Local back end
1. Run the question-service locally (e.g. using liberty:dev). 
2. Set `env_file` in `environment.development.ts` to `"env_local.json"`.
3. Run the app with `npm run start`.

## Locally test multi-language
1. Build: `ng build --localize`
2. cd into `umpire-quiz-frontend\dist\umpire-quiz\browser` and run `npx http-server -p 4200`.

## Build and push
To build the app, create the docker image and push it, run:

```shell
ng build --localize --aot --output-hashing=all 
```

```shell
docker build -t bramjanssens/umpire-quiz-frontend:0.8.1 -t bramjanssens/umpire-quiz-frontend:latest .
```

```shell
docker push bramjanssens/umpire-quiz-frontend:0.8.1
docker push bramjanssens/umpire-quiz-frontend:latest
```

## Run container
To run the image, run:
```shell
docker run -p 8080:80 bramjanssens/umpire-quiz-frontend
```

## Release log

- 0.9.0
  - added difficulty filter to admin
- 0.8.1
  - fixed difficulty mapping (UMPIRE_1 -> U1 and missing difficulty)
- 0.8.0
  - Added question counter
