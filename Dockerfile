FROM node

RUN git clone https://github.com/postor/react-builder.git && \
cd react-builder && \
npm install \
npm run build

CMD npm run start