0. Установить sql-viewer и sql-editor
1. Установить Lucia и @lucia_auth/adapter-drizzle
2. Отредактировать .env и выполнить npx drizzle-kit push
3. Создать lucia_auth.ts и связать lucia c dizzle-адаптером
    В строке const adapter = new DrizzleSQLiteAdapter(db,session,user)
    будет ошибка в части session. 
    Исправляется, если в schema.ts в строке
    ...expiresAt: integer('expires_at', { mode: 'timestamp' })
    убрать { mode: 'timestamp' } (не ясно, насколько она нужна)
