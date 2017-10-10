#build
npm install
npm run build
mkdir .builder
cp tools/template/files .builder/template
cd .builder/template/
npm install
cd ../../
docker build . -t reactbuilder

#run
#docker run -it -p 3007-3010:3007-3010 --restart=always  reactbuilder
docker run -it -p 3007-3010:3007-3010  reactbuilder