# test-technique : Task Manager

# Backend

## Installation & exécution locale

### 1. Se placer dans le dossier `backend/`
### 2. Créer un environnement virtuel
python -m venv venv
source venv/bin/activate
### 3. Installer les dépendances
pip install -r requirements.txt
### 4. Appliquer les migrations
python manage.py migrate
### 5. Tests unitaires
pytest task_app/tests/unit/
### 6. Lancer le serveur de développement
python manage.py runserver

## UI Swagger : 
http://localhost:8000/api/docs/


# Frontend

## Installation & exécution locale

### 1. Se placer dans le dossier `frontend/`
### 2. Installer les dépendances
npm install
### 3. Lancer le serveur de développement
npm run dev
### 4. Ouvrir le navigateur à l'adresse 
http://localhost:5173
