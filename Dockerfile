FROM oven/bun:1
WORKDIR /usr/src/app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
ENV NODE_ENV=production PORT=5173 ORIGIN=http://localhost:8000
EXPOSE 3000
CMD ["bun", "run", "build/index.js"]
