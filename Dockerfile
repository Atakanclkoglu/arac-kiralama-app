# Aşama 1: Uygulamayı build etmek için node ortamı
FROM node:20-alpine AS builder

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN npm install

# Kaynak kodunu kopyala ve build et
COPY . .
RUN npm run build

# Aşama 2: Uygulamayı sunmak için hafif bir Nginx imajı
FROM nginx:alpine

# Nginx yapılandırma dosyasını kopyala (DOĞRU YERİ BURASI)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Çalışma dizinini ayarla
WORKDIR /usr/share/nginx/html

# Önceki aşamada oluşturulan build dosyalarını kopyala
COPY --from=builder /app/build .

# Nginx'in 80. portunu dışarıya aç
EXPOSE 80

# Nginx sunucusunu başlat
CMD ["nginx", "-g", "daemon off;"]