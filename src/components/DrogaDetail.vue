<template>
    <div class="droga-detail" v-bind:class="{'is-complete': droga.completed }">
        <p>
            <input type="checkbox" v-on:change="markComplete">
            {{droga.title}}
            <button @click="$emit('del-droga', droga.id)" class="del">x</button>

        </p>
    </div>
</template>

<script>
export default {
    name: "DrogaDetail",
    props: ["droga"],
    methods: {
        markComplete(){
            this.droga.completed = !this.droga.completed
        }
    }
}
</script>

<style scoped>
.droga-detail {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
}
.is-complete{
    text-decoration: line-through;
}

.del {
    background: red;
    color: white;
    border: none;
    padding: 5px 9px;
    border-radius: 50%;
    cursor: pointer;
    float: right;
}

</style>

