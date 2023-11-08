<template>
    <div class="container-button">
        <font-awesome-icon :icon="['fab', 'spotify']" class="icon-spotify" />
        <p class="text">Spotify</p>
        <button @click="auth.authorization()">Login</button>
    </div>
</template>

<script setup lang="ts">
    import { AuthService } from "./../services/auth/authService";
    import { ref, onMounted } from 'vue'

    const auth = new AuthService();

    onMounted(async () => {
        localStorage.clear();
    });

</script>

<style scoped lang="scss">

    .container-button {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & button {
            width: 300px;
            padding: 1rem;
            font-weight: bold;
            background-color: var(--primary);
            color: var(--white);
            border-radius: 8px;
            border: none;
            &:hover {
                background-color: var(--secondary);
            }
        }

        & .icon-spotify {
            font-size: 7rem;
            margin-bottom: 0;
            color: var(--primary);
        }
        & .text {
            font-family: 'Proxima-nova-semibold';
           /*  font-family: 'Agbalumo'; */
            color: var(--white);
            font-size: 3rem;
            margin-bottom: 3rem;
        }
    }
</style>