FROM node:18 as development
WORKDIR /usr/src/app
COPY . .
RUN npm install

FROM node:18 as build
WORKDIR /app
COPY package.json .
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine as production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
