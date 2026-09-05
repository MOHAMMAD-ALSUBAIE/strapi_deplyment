            docker pull "$DOCKER_USERNAME/strapi-deployment:latest"
            docker stop projects-strapi-1 || true
            docker rm projects-strapi-1 || true
            docker run -d --name projects-strapi-1 \
              --network projects_default \
              --env-file /srv/strapi/.env \
              -p 1337:1337 \
              "$DOCKER_USERNAME/strapi-deployment:latest"
            docker image prune -f