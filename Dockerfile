FROM node

ADD . /react-builder

CMD cd /react-builder && npm run start