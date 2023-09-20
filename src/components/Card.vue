<template>
    <div class="card__main" draggable="true">
        <div class="card__name">
            <span>
                {{ name }}
            </span>
        </div>
        <div class="card__desc">
            <span>
                {{ cardDesc }}
            </span>
        </div>
        <button class="btn_delete btn card_btn" v-on:click="$emit('delete')">Удалить</button>
    </div>
</template>

<script>
    export default {
        props: {
            /**@type {import('vue').Prop<String>} */
            description: {
                type: String,
                required: true
            },
            /**@type {import('vue').Prop<String>} */
            name: {
                type: String,
                required: true
            },
            /**@type {import('vue').Prop<String>} */
            color: {
                type: String,
                required: true
            }
        },
        emits: ['delete'],
        computed: {
            cardDesc() {
                /**@type {String} */
                let desc = this.$props.description;

                if (desc.length > 125) {
                    desc = desc.slice(0, 125) + '...';
                }

                return desc;
            }
        }
    }
</script>

<style scoped>
    .card__main {
        background-color: #80857a;
        width: 100%;
        height: 100%;
        border-radius: 15px;
        padding: 15px;
        position: relative;
    }
    .card__name {
        width: 100%;
        height: 45px;
    }
    .card__desc > span {
        word-break: normal;
        width: 187px;
    }
    .card__name > span {
        font-size: 24px;
        padding-bottom: 12px;
    }
    .card_btn {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
</style>