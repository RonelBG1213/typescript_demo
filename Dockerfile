FROM mcr.microsoft.com/playwright:v1.58.2-noble AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
CMD ["npx", "playwright", "test", "--project=chromium"]