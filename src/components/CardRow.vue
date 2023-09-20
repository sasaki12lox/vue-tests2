<template>
    <div v-on:drop="droppedCard" class="card__row">
        <div v-for="card of cards" class="card">
            <StubCard v-if="typeof card == 'number'" @drop="droppedCard($event, card)"/>
            <Card v-else 
                :name="card.name" 
                :description="card.description" 
                :color="card.color" 
                @dragstart="dragStart($event, card)"
                @delete="$emit('delete__card', card.creationDate)"
            />
        </div>
    </div>
</template>

<script>
    import Card from './Card.vue';
    import StubCard from './StubCard.vue'

    export default {
        props: {
            /**@type {import('vue').Prop<import('../pages/CardHolder.vue').Card[]>} */
            cards: {
                type: Object,
                required: true
            }
        },
        emits: ['drop_card', 'delete__card'],
        components: {
            Card,
            StubCard
        },
        methods: {
            /**@param {DragEvent} event */
            droppedCard(event, newPos) {
                if(!newPos) return;
                /**@type {import('../pages/CardHolder.vue').Card} */
                const card = JSON.parse(event.dataTransfer.getData('card'));
                this.$emit('drop_card', {card, newPos});
            },
            /**
             * 
             * @param {DragEvent} event 
             * @param {import('../pages/CardHolder.vue').Card} data 
             */
            dragStart(event, data) {
                event.dataTransfer.dropEffect = 'move';
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('card', JSON.stringify(data));
            }
        }
    }
</script>

<style scoped>
    .card__row {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .card {
        width: 20%;
        max-width: 250px;
        height: 350px;
        padding:50px 0;
    }
</style>