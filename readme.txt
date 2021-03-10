# Installation Frontend Guide

# Make .env in backend/src/
Add SECRET_KEY = 'w+1&@v6kq(qn1!oqk=b45#@=7)8ku0y9sd^n3=&ki9u^v_gwe6'

# Installation Backhand Guide
cd backend
virtualenv env
source env/bin/activate
pip install -r requirements.txt
cd src
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser // create super user
python manage.py runserver

#Running backend
go to src directory in env
pip install
