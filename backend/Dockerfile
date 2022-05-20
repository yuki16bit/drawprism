FROM python:3.8
WORKDIR /app
ADD . /app
RUN pip install pipenv
RUN pipenv install --deploy
ENV FLASK_ENV production
CMD ["pipenv", "run", "gunicorn", "-c", "./gunicorn.conf.py", "wsgi:app"]