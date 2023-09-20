<template>
    <router-link to="/creator">
        <button class="btn btn_add" id="add_btn">Создать карточку</button>
    </router-link>
    <div>
        <CardRow 
            v-for="i in (new Array(cardsObj.rowCount)).fill(1).map((e, i) => i)" 
            :cards="getRowCard(i)" 
            @delete__card="deleteCardHandler"
            @drop_card="cardDropHandler"
        />
    </div>
</template>

<script>
    /**
     * @typedef {{
     *      name: string
     *      description: string
     *      color: string
     *      creationDate: string
     *      position: number
     * }} Card
     * 
     * @typedef {{
     *      cards: Card[]
     *      rowCount: number
     * }} CardHolder
     */

    import CardRow from '../components/CardRow.vue';

    export default {
        components: {
            CardRow
        },
        data: () => ({
            row: 0,
            /**@type {CardHolder} */
            cardsObj: {
                cards: [],
                rowCount: 1
            }
        }),
        mounted() {
            let cards = localStorage.getItem('cards');

            if (cards) {
                /**@type {CardHolder} */
                let parsedCards = JSON.parse(cards);

                if ('cards' in parsedCards) {
                    if (cards.length < 2) this.cardsObj = this.createCardHolder();

                    this.cardsObj = parsedCards;
                }
            } else 
                this.cardsObj = this.createCardHolder();
        },
        methods: {
            tryToDeleteRow() {
                for (let i = 0; i < this.cardsObj.rowCount; i++) {
                    if (this.getRowCard(i).find(e => typeof e != 'number')) continue;
                    
                    const processed = this.cardsObj.cards.sort((a,b) => a.position > b.position ? 1 : -1);

                    const index = processed.findIndex(card => card.position >= (i+1)*4);

                    console.log(index)

                    if (index != -1) {
                        for (let j = index; j < processed.length; j++) {
                            processed[j].position -= 4;
                        }
                    }

                    this.cardsObj.rowCount--;

                    localStorage.setItem('cards', JSON.stringify(this.cardsObj));

                }
            },
            deleteCardHandler(creationDate) {
                const cardIndex = this.cardsObj.cards.findIndex(e => e.creationDate == creationDate);
                this.cardsObj.cards.splice(cardIndex, 1);

                localStorage.setItem('cards', JSON.stringify(this.cardsObj));

                this.tryToDeleteRow();
            },
            /**@returns {CardHolder}*/
            createCardHolder() {
                /**@type {CardHolder} */
                const cardHolder = {
                    cards: [
                        {
                            color: '',
                            creationDate: (Date.now()).toString(),
                            description: 'Ну да, я первая карта, что тут ещё можно сказать',
                            name: 'Ну я первая',
                            position: 1
                        },
                        {
                            color: '',
                            creationDate: (Date.now() + 10).toString(),
                            description: 'Нуууу, вторая карточка',
                            name: 'Ну а я вторая',
                            position: 2
                        }
                    ],
                    rowCount: 1
                }

                localStorage.setItem('cards', JSON.stringify(cardHolder));

                return cardHolder;
            },
            /**@returns {(Card | number)[]} */
            getRowCard(curRow) {
                const cardCount = 4;
                const minN = (curRow*cardCount) + 1;
                const maxN = (curRow*cardCount) + cardCount;

                const filtered = this.cardsObj.cards.filter(card => card.position >= minN && card.position <= maxN);
                const sorted = filtered.sort((a, b) => a.position > b.position ? 1 : -1);

                if (sorted.length == cardCount) return sorted;

                const processed = [];

                for (let i = 0; i < cardCount; i++) {
                    const found = sorted.find(e => e.position == minN + i);

                    if (found) processed.push(found);
                    else processed.push(minN + i);
                }

                return processed
            },
            /**@param {{card: Card, newPos: number}} eventData*/
            cardDropHandler(eventData) {
                this.cardsObj.cards.find(e => e.creationDate == eventData.card.creationDate).position = eventData.newPos;
                
                localStorage.setItem('cards', JSON.stringify(this.cardsObj));

                this.tryToDeleteRow();
            }
        },
    }
</script>

<style scoped>
    #add_btn {
        margin: 15px;
    }
</style>