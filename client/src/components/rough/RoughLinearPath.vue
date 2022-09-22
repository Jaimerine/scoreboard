<script>
    import element from "../../mixins/element.js";

    export default {
        name: 'RoughLinearPath',
        mixins: [ element ],
        props: {
            points: {
                type: Array,
                required: true
            }
        },
        methods: {
            handler(forceRender = false) {
                this.createElement('linearPath', [this.points], forceRender);
            }
        }
    };
</script>
