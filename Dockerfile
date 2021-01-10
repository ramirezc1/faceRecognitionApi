FROM node:14.15.4

WORKDIR /usr/faceRecognitionApi

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]