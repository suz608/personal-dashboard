# Stage 1: Build the Angular app

# Use node 24 as base image
FROM node:alpine

# Goes to the app directory
WORKDIR /app

# Copy package.json and package-lock.json 
COPY package.json package-lock.json ./

RUN npm install -g @angular/cli

# Install app dependencies
RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]

# Copy the rest of the app into the container
# COPY . .
# RUN npm run build --prod

# # Stage 2: Serve the app with Nginx
# FROM nginx:alpine

# # Copy built app from the previous stage
# COPY --from=builder /app/dist/* /usr/share/nginx/html

# # Copy custom Nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Set port environment variable
# ENV PORT=80

# # Expose the port
# EXPOSE 80

# # Run the app
# CMD ["nginx", "-g", "daemon off;"]
