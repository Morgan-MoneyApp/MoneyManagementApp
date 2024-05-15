FROM node:22-alpine
RUN npm -v
#ARG NODE_VERSION="22"
RUN #if [ "${NODE_VERSION}" != "none" ]; then su root -c "umask 0002 && apk add nodejs=${NODE_VERSION}"; fi
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
EXPOSE 8310
ENV HOST=0.0.0.0
ENV PORT=8310
COPY . .
CMD ["npm", "start"]
