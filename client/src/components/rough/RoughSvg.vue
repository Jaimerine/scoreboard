<template>
    <svg
        :width="width"
        :height="height"
    >
        <slot v-if="rough" />
    </svg>
</template>

<script>
    import rough from 'roughjs';

    export default {
        name: 'RoughSvg',
        props: {
            width: String,
            height: String
        },
        data() {
            return {
                rough: null
            };
        },
        mounted() {
            this.rough = rough.svg(this.$el);
        },
        methods: {
            append(child) {
                this.$el.appendChild(child);
            },
            remove(child) {
                this.$el.removeChild(child);
            }
        }
    };
</script>
