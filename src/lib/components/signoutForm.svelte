<script lang="ts">
	import { enhance } from "$app/forms";
	import {invalidateAll, goto, replaceState } from "$app/navigation";

    async function handleLogout() {
        try {
            const res = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json' // Явно указываем ожидаемый формат
                }
            });
            
            if (res.ok) {
                const data = await res.json();
                await invalidateAll();
                window.location.href = '/'
                //await //goto('/',{replaceState:true})
            } 
        }catch (error) {
            console.error('Error:', error);
            //window.location.href = '/'; // если ошибка - вручную
            }
        
    }
</script>

<!-- <form action ='/logout' method="POST" use:enhance> -->
<!-- </form> -->
<!-- это должно быть недоступно, если у юзера нет сессии -->
<button onclick={handleLogout} class="mx-2 cursor-pointer bg-blue-700 px-2 py-2 text-amber-50"
	>Выход</button
>
