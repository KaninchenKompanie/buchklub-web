FROM python:3.11

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY ./scripts/start.sh ./scripts/start_reload.sh ./scripts/prestart.sh /scripts/
RUN chmod +x /scripts/start.sh /scripts/start_reload.sh ./scripts/prestart.sh

COPY ./src /src
WORKDIR /src/

EXPOSE 80

# Copy poetry.lock* in case it doesn't exist in the repo
COPY ./pyproject.toml /src/

# Allow installing dev dependencies to run tests
ARG INSTALL_DEV=false
RUN bash -c "if [ $INSTALL_DEV == 'true' ] ; then pip install -e . ; else pip install . ; fi"

ENV PYTHONPATH=/src

COPY ./alembic.ini /src/

# Run the start script, it will check for an /api/prestart.sh script (e.g. for migrations)
# And then will start Gunicorn with Uvicorn
CMD ["/scripts/start.sh"]

