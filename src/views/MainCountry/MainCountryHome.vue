<template>
    <div class="main-country-home" >
        <transition name="bottom-bar">
            <BottomBar v-if="isBottomBar" :country="route.params.id"/>
        </transition>
        <div class="wrapper" :class="{ 'trigger-bottom-bar' : isBottomBar }" >
            <span>COUNTRY</span>
            <h1>{{route.params.id}}</h1>
        </div>
        <button @click="isBottomBar = !isBottomBar" :class="{ 'trigger-bottom-bar' : isBottomBar }" >{{isBottomBar ? 'CLOSE' : 'CLICK'}}</button>

    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, ref } from '@vue/runtime-core'
import { store } from '../../store'


import BottomBar from '../../components/MainPost/BottomBar.vue'

export default {
    name: 'MainCountryHome',
    components:{
        BottomBar,
    },
    setup(){
        const route = useRoute()
        const isBottomBar = ref(false)

        onMounted(() => {
            store.commit('clearCountryData')
            store.commit('clearCompareData')
        })

        return {
            route,
            isBottomBar
        }
    }
}
</script>

<style lang="scss" scoped>
.main-country-home{
    .bottom-bar-enter-active,
    .bottom-bar-leave-active {
        transition: all 0.5s ease;
    }

    .bottom-bar-enter-from,
    .bottom-bar-leave-to {
        transform: translatey(100px);
        opacity: 0;
    }

    &::after{
        content: '';
        box-shadow: 0px 0px 131px -31px rgba(0,0,0,0.75) inset;
        -webkit-box-shadow: 0px 0px 131px -31px rgba(0,0,0,0.75) inset;
        -moz-box-shadow: 0px 0px 131px -31px rgba(0,0,0,0.75) inset;
        position: absolute;
        z-index: 4;
    }

    

    .wrapper{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50% , -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        transition: .5s;

        &.trigger-bottom-bar{
            top: 25%;
        }

        h1{
            text-transform: uppercase;
            font-family: var(--secondary--font);
            font-size: 6rem;
            font-weight: 700;
            color: #fff;
            letter-spacing: 1rem;

            @media (max-width: 1000px) {
                font-size: 5rem;
                font-weight: 700;
                letter-spacing: 10px;
            }

            @media (max-width: 560px) {
                font-size: 3rem;
            }
        }
        span{
            font-size: 1.5rem;
            letter-spacing: .5rem;
            color: #fff;
            @media (max-width: 560px) {
                font-size: 0.85rem;
            }
        }

    }
    button{
        z-index: 5;
        position: absolute;
        left: 50%;
        top: 80%;
        transform: translateX(-50%);
        font-family: var(--secondary--font);
        font-size: 2rem;
        padding: .5rem 2rem;
        cursor: pointer;
        background-color: rgb(255, 255, 255);
        transition: .25s;
        border: none;
        background-color: #fff;
        color: #000;
        font-weight: 1000;
        mix-blend-mode: screen;

        &.trigger-bottom-bar{
            top: 90%;
        }

        &:hover {
            background-color: rgb(240, 64, 64);
            mix-blend-mode: normal;
            color: #fff;
        }

    }
}
</style>
