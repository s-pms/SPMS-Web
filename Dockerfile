# 构建阶段
FROM node:20-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制yarn.lock和package.json文件
COPY package.json yarn.lock ./

# 安装依赖
# 配置网络超时并安装依赖
RUN yarn config set network-timeout 300000 -g && \
    yarn install --ignore-engines

# 复制源代码
COPY . .

# 构建生产版本
RUN yarn run production

# 生产阶段
FROM nginx:alpine

# 复制构建产物到nginx目录
COPY --from=build /app/dist /usr/share/nginx/html

# 复制nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]