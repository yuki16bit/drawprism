FROM node:16-alpine as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ADD . /app
RUN npm install
ENV REACT_APP_ENV production
ENV REACT_APP_DEV_ENDPOINT http://localhost:8000
ENV REACT_APP_PROD_ENDPOINT https://www.drawprism.space
RUN npm run build

FROM nginx
COPY --from=build-step /app/build /usr/share/nginx/html
COPY ./nginx/drawprism-cert-chain.crt /etc/nginx/certs/
COPY ./nginx/drawprism-private.key /etc/nginx/certs/
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]