# Kapu$ta

Kapu$ta to aplikacja do zarządzania finansami osobistymi.

## Utwórz plik `.env` w głównym katalogu projektu i ustaw zmienne środowiskowe:

```plaintext
   PORT="<dowolny_port>"
   DB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>"
   JWT_SECRET="<secret_key>"
   REFRESH_JWT_SECRET="<secret_key>"
```

## Uruchamianie aplikacji

Aplikacja będzie dostępna pod adresem: `http://localhost:<PORT>`

## Dokumentacja API

Dokumentacja API jest dostępna pod adresem:

`localhost:"<PORT>"/api-docs` 

## Strona aplikacji:

Strona aplikacji jest dostępna pod adresem:

`https://kapustaapp.vercel.app/`

## Funkcje

- Dodawanie i usuwanie przychodów oraz wydatków
- Przeglądanie historii transakcji
- Analiza miesięcznych przychodów i wydatków
- Autoryzacja użytkowników z wykorzystaniem JWT
