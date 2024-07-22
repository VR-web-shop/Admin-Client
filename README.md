# Admin Client
Admin Client

## Install 

1. Setup Environment Variables
```
$ cp .env.example .env
```

2. Setup NPM Registry
Replace `YOUR_PERSONAL_TOKEN` with a classic personal token with `package:read` access.
```
$ cp .npmrc.example .npmrc
```

3. Install Dependencies
```
$ npm install
```

## Usage
```
npm run dev
```

## Docker
1. Setup Environment Variables
```
$ cp .env.example .env
```

2. Setup npmrc File
```
$ cp .npmrc.example .npmrc
```

3. Build Docker Image
```
$ docker build -t adminclient:v1.0 .
```

4. Run Docker Container
```
$ docker run -p 5173:5173 adminclient:v1.0
```

## Docker Compose
1. Setup Environment Variables
```
$ cp .env.example .env
```

2. Setup npmrc File
```
$ cp .npmrc.example .npmrc
```

3. Build Docker Image
```
$ docker build -t adminclient:v1.0 .
```

4. Save the image to a tar file
```
$ docker save -o adminclient.tar adminclient:v1.0
```

5. Load the image into Docker
```
$ docker load -i adminclient.tar
```

6. Run Docker Compose
```
$ docker compose up
```
