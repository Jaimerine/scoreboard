import { camelCase, toNumber } from "lodash"; // using lodash as a helper for camelcasing the attrs

export const putAttrsToObj = {
    computed: {
        putAttrsToObj: function() {
            const attrs = this.$attrs;
            let obj = {};
            for (const [key, value] of Object.entries(attrs)) {
                console.log("attr", key, value)
                obj[camelCase(key)] = isNaN(value) ? value : toNumber(value);
            }
            console.log(obj)
            return obj;
        }
    }
};