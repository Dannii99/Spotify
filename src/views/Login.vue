<template>
    <main class="container-login">
        <div class="conten-spot" :class="{ 'animate': animate }">
            <font-awesome-icon :icon="['fab', 'spotify']" class="icon-spotify" />
            <p class="text">Spotify</p>
            <!-- HTML !-->
            <button class="btn btn-primary btn-effect rounded-lg text-base font-bold px-1 py-3" role="button" @click="next()"><span>Login</span></button>
        </div>
    </main>
</template>

<script setup lang="ts">
    import { AuthService } from "./../services/auth/authService";
    import { ref, onMounted } from 'vue'
    
    //animate
    const animate = ref(false)

    const auth = new AuthService();

    const next = () => {
        animate.value = true;
        const body = document.body;
        if (body) {
        // Modificar estilos como desees
        body.style.backgroundColor = 'white';
        body.style.transition = ' transition: all 1.2s ease-in';
        }
        setTimeout(() => {
            auth.authorization()
        }, 700);
    }

    onMounted(async () => {
        localStorage.clear();
    });

</script>

<style scoped lang="scss">
    .container-login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        .conten-spot {
            width: 100%;
            max-width: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 1;
            &.animate {
                opacity: 0;
                transition: all 1.2s ease-in;
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
                margin-bottom: 2rem;
            }
        }
    }
</style>


