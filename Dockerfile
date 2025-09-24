# Stage 1: Build frontend
FROM node:22 AS build-frontend
WORKDIR /app/frontend
COPY frontend-react/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend-react/ ./
COPY frontend-react/.env.production .env
RUN npm run build

# Stage 2: Backend + frontend
FROM node:22
WORKDIR /app/backend
COPY Backend-Express-Server/package*.json ./
RUN npm install --legacy-peer-deps
COPY Backend-Express-Server/ ./
COPY --from=build-frontend /app/frontend/dist ./frontend-dist
ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001
CMD ["node", "index.js"]

