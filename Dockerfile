FROM node:16-alpine

WORKDIR "/var/task"
COPY . /var/task
RUN npm install --omit=dev
RUN npx tsc -p ./tsconfig.json
EXPOSE 8080
CMD ["node", "dist/index.js"]

# Etapa 1: Instale as dev dependencies, incluindo TypeScript
FROM node:16-alpine AS dev-stage
WORKDIR /var/task
COPY . .
RUN npm install

# Etapa 2: Compile o código TypeScript
RUN npx tsc -p ./tsconfig.json
# Etapa 3: Crie uma imagem final menor sem dev dependencies
FROM node:16-alpine

COPY --from=dev-stage /var/task/dist /var/task
COPY --from=dev-stage /var/task/package.json /var/task/package.json
RUN npm install --omit=dev
EXPOSE 8080
CMD ["node","index.js"]