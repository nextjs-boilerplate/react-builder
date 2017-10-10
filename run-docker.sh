#build
npm install
npm run build
docker build . -t reactbuilder

#run
#docker run -it -p 3007-3010:3007-3010 --restart=always  reactbuilder
docker run -it -p 3007-3010:3007-3010  reactbuilder