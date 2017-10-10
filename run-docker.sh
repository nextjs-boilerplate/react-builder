#build
npm install
npm run build
docker build . -t reactbuilder

#run
docker run -it -p 3003-3005:4033-4035 --restart=always  reactbuilder
#docker run -it -p 3003-3005:4033-4035  reactbuilder