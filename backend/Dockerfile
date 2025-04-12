# syntax=docker/dockerfile:1
FROM python:3.11.9

# create working dir called app (because of convention)
WORKDIR /app

# copy app source code
COPY . .

# pip install -e . is for development and needs pyproject.toml
RUN pip install --no-cache-dir -e .


# final image has a service listening on port 8000
EXPOSE 8000

# command that is run when user starts container
CMD ["fastapi", "run", "src/api/main.py", "--port", "8000"]

# build container image using Dockerfile
# docker build -t buchklub-backend:latest .
# single dot (.) -> expects Dockerfile in current directory

# to run docker image:
# docker run -p 127.0.0.1:8000:8000 backend:latest
