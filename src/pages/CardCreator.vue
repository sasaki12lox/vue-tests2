<template>
    <div class="wrapper">
        <div class="card__creator">
            <div class="card__name__input">
                <input type="text" placeholder="Название карточки" v-model="name" @input="nameInputValidation">
            </div>

            <div class="card__desc__input">
                <textarea name="" id="" cols="30" rows="10" placeholder="Описание карточки" v-model="desc" @input="descInputValidation"></textarea>
            </div>

            <div class="card__controls">
                <router-link to="/holder">
                    <button class="btn btn_delete">
                        Отменить
                    </button>
                </router-link>

                <button class="btn btn_add" v-on:click="addClickHandler">
                    Добавить
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            name: '',
            desc: ''
        }),
        methods: {
            nameInputValidation() {
                if (this.name.length >= 15) this.name = this.name.slice(0, 15); 
            },
            descInputValidation() {
                if (this.desc.length >= 125) this.desc = this.desc.slice(0, 125);
            },
            addClickHandler() {
                if (!this.desc || !this.name) return;

                const rawCardHolder = localStorage.getItem('cards');

                if (!rawCardHolder) this.$router.push('/holder');

                /**@type {import('./CardHolder.vue').CardHolder} */
                const cardHolder = JSON.parse(rawCardHolder);

                if (cardHolder.cards.length >= cardHolder.rowCount * 4) {
                    cardHolder.cards.push(this.createCard((cardHolder.rowCount*4)+1));
                    cardHolder.rowCount++;
                } else {
                    for (let i = 1; i < cardHolder.rowCount*4+1; i++) {
                        if (cardHolder.cards.find(e => e.position == i)) continue;

                        cardHolder.cards.push(this.createCard(i));
                        break;
                    }
                }

                localStorage.setItem('cards', JSON.stringify(cardHolder));


                this.$router.push('/holder');
            },
            /**
             * @param {number} position
             * @returns {import('./CardHolder.vue').Card} 
             */
            createCard(position) {
                return {
                    color: '',
                    creationDate: Date.now().toString(),
                    description: this.desc,
                    name: this.name,
                    position
                }
            }
        }
    }
</script>

<style scoped>
    .card__controls {
        display: flex;
        justify-content: space-between;
    }

    .card__name__input {
        margin-bottom: 15px;
    }

    .card__name__input input,
    .card__desc__input textarea {
        border-radius: 5px;
        padding: 5px;
        border: none;
        background-color: #999e92;
    }

    .card__name__input input:focus,
    .card__desc__input textarea:focus {
        outline: none;
    }

    .card__desc__input {
        margin-bottom: 15px;
    }
    .card__creator {
        background-color: #a5af97;
        min-width: 300px;
        min-height: 250px;
        border-radius: 15px;
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 15px;
        transform: translateX(-50%) translateY(-50%);
    }
</style>