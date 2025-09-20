# Stage 1: Build frontend
FROM node:22 AS build-frontend
WORKDIR /app/frontend
COPY frontend-react/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend-react/ ./
RUN npm run build

# Stage 2: Build backend
FROM node:22
WORKDIR /app/backend

# Copy backend package.json and install dependencies
COPY Backend-Express-Server/package*.json ./
RUN npm install --legacy-peer-deps

# Copy backend source code
COPY Backend-Express-Server/ ./

# Copy frontend build into backend
COPY --from=build-frontend /app/frontend/dist ./frontend-dist
ENV NODE_ENV=production
# Expose backend port
EXPOSE 3001

# Start server
CMD ["node", "index.js"]
