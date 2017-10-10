#build
npm install
npm run build
docker build . -t reactbuilder

#run
docker run -it -p 3003-3005:3003-3005 --restart=always  reactbuilder