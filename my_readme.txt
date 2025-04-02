0.0. добавил tsx. (https://tsx.is/getting-started) 
Можно упражняться: npx tsx ./tt.ts 
При попытке установить tsx в проект с драйвером libSql
получал ошибки несовместимости версий.

0.1 Установить sql-viewer и sql-editor

1. Установить Lucia и @lucia_auth/adapter-drizzle
2. Отредактировать .env и выполнить npx drizzle-kit push
3. Создать lucia_auth.ts и связать lucia c dizzle-адаптером
    В строке const adapter = new DrizzleSQLiteAdapter(db,session,user)
    будет ошибка в части session. 
    Исправляется, если в schema.ts в строке
    ...expiresAt: integer('expires_at', { mode: 'timestamp' })
    убрать { mode: 'timestamp' } (не ясно, насколько она нужна)


2 БД
>npx drizzle-kit pull --config=drizzle-chinook.config.ts