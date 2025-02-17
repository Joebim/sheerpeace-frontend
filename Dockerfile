# 1️⃣ Base image with dependencies
FROM node:18.18.0-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

# 2️⃣ Builder stage - Builds the Next.js app
FROM base as builder

WORKDIR /app
COPY . .  
RUN npm install
RUN npm run build

# 3️⃣ Production stage - Runs optimized Next.js
FROM base as production
WORKDIR /app
ENV NODE_ENV=production
RUN npm ci --omit=dev 

# Security: Create a non-root user for Next.js
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Copy necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

CMD ["npm", "start"]

# 4️⃣ Development stage (for local dev)
FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . . 
CMD ["npm", "run", "dev"]
