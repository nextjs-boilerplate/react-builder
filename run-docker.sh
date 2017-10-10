#build
yarn
yarn build
mkdir ./.builder
cp ./tools/template/files ./.builder/ -r
mv ./.builder/files ./.builder/template
cd ./.builder/template/
yarn
cd ../../
docker build . -t reactbuilder

#run
#docker run -it -p 3007-3010:3007-3010 --restart=always  reactbuilder
docker run -it -p 3007-3010:3007-3010  reactbuilder